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
  const status = subscription?.status || "active";

  const planType = (subscription as any)?.plan_type || plan;
  const billingCycle = (subscription as any)?.billing_cycle || (plan === "free" ? "forever_free" : "monthly");
  
  const subscribedAtStr = (subscription as any)?.subscribed_at || subscription?.updated_at || subscription?.created_at;
  const subscribedAt = subscribedAtStr ? new Date(subscribedAtStr) : null;

  let expiryDate: Date | null = null;
  if ((subscription as any)?.expires_at) {
    expiryDate = new Date((subscription as any).expires_at);
  } else if (subscribedAt && plan !== "free") {
    expiryDate = new Date(subscribedAt);
    expiryDate.setMonth(expiryDate.getMonth() + 1); // fallback to 1 month after purchase
  }

  const today = new Date();
  const daysRemaining = expiryDate 
    ? Math.max(0, Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))) 
    : 0;

  const isActive = (subscription as any)?.is_active ?? (status === "active");
  const isExpired = plan !== "free" && expiryDate ? today > expiryDate : false;

  // Effective plan after considering expiration (auto-downgrade to free if expired or inactive)
  const effectivePlan = (isExpired || !isActive) ? "free" : plan;

  // In testing mode, unlock everything
  if (TESTING_MODE) {
    return {
      subscription,
      plan: "pro" as const,
      isPaid: true,
      isPro: true,
      isBasic: true,
      maxLinks: Infinity as number,
      loading,
      error,
      testingMode: true,
      billingCycle: "monthly",
      subscribedAt: new Date(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      daysRemaining: 30,
      isExpired: false
    };
  }

  const isPaid = (effectivePlan === "basic" || effectivePlan === "pro") && isActive;
  const isPro = effectivePlan === "pro" && isActive;
  const isBasic = effectivePlan === "basic" && isActive;
  const maxLinks = isPro ? Infinity : isBasic ? 10 : 5;

  return {
    subscription,
    plan: effectivePlan,
    isPaid,
    isPro,
    isBasic,
    maxLinks,
    loading,
    error,
    testingMode: false,
    billingCycle,
    subscribedAt,
    expiryDate,
    daysRemaining,
    isExpired
  };
}

