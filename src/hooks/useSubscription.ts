import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Subscription {
  id: string;
  user_id: string;
  plan: "free" | "basic" | "pro";
  status: "active" | "inactive" | "cancelled" | "trial";
  created_at?: string;
  updated_at?: string;
}

const TESTING_MODE = false;

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      const { data, error: fetchError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();


      // If no subscription found (PGRST116), create one
      if (fetchError?.code === 'PGRST116' || !data) {
        console.log('Creating free subscription for user');
        const { data: newSub, error: createError } = await supabase
          .from("subscriptions")
          .insert({
            user_id: user.id,
            plan: "free",
            status: "active"
          })
          .select()
          .single();
        
        if (createError) {
          // If table doesn't exist, just set as free without error
          console.log('Subscriptions table may not exist, defaulting to free plan');
          setSubscription({ id: "", user_id: user.id, plan: "free", status: "active" });
          setError(null);
          setLoading(false);
          return;
        }
        
        setSubscription(newSub as Subscription);
        setError(null);
        setLoading(false);
        return;
      }

      if (fetchError) {
        throw fetchError;
      }

      setSubscription(data as Subscription);
      setError(null);
    } catch (err: unknown) {
      console.error("Subscription fetch failed:", err);
      // Default to free plan on any error - don't block the user
      setSubscription({ id: "", user_id: user.id, plan: "free", status: "active" });
      setError(null); // Clear error to allow normal usage
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const plan = subscription?.plan || "free";

  // In testing mode, unlock everything
  if (TESTING_MODE) {
    return {
      subscription,
      plan,
      isPaid: true,
      isPro: true,
      isBasic: true,
      maxLinks: Infinity as number,
      loading,
      error,
      testingMode: true,
    };
  }


  const isPaid = (plan === "basic" || plan === "pro") && subscription?.status === "active";
  const isPro = plan === "pro" && subscription?.status === "active";
  const isBasic = plan === "basic" && subscription?.status === "active";
  const maxLinks = isPro ? Infinity : isBasic ? 10 : 5;

  return { 
    subscription, 
    plan, 
    isPaid, 
    isPro, 
    isBasic, 
    maxLinks, 
    loading, 
    error,
    testingMode: false 
  };
}

