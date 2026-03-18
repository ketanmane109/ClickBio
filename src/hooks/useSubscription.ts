import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type Subscription = {
  id: string;
  user_id: string;
  plan: "free" | "pro";
  status: string;
};

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

  const isPro = subscription?.plan === "pro" && subscription?.status === "active";

  return { subscription, isPro, loading };
}
