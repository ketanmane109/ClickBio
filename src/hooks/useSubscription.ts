import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Subscription = {
  id: string;
  user_id: string;
  plan: "free" | "basic" | "pro";
  status: string;
};

const TESTING_MODE = true; // Unlock all features for testing

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setSubscription(data as Subscription | null);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const plan = subscription?.plan || "free";

  // In testing mode, unlock everything
  if (TESTING_MODE) {
    return {
      subscription,
      plan,
      isPaid: true,
      isPro: true,
      isBasic: true,
      maxLinks: Infinity,
      loading,
      testingMode: true,
    };
  }

  const isPaid = (plan === "basic" || plan === "pro") && subscription?.status === "active";
  const isPro = plan === "pro" && subscription?.status === "active";
  const isBasic = plan === "basic" && subscription?.status === "active";
  const maxLinks = isPro ? Infinity : isBasic ? 10 : 5;

  return { subscription, plan, isPaid, isPro, isBasic, maxLinks, loading, testingMode: false };
}
