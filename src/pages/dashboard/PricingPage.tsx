import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Zap } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: {
    email: string;
  };
  theme: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayInstance {
  on: (event: string, callback: () => void) => void;
  open: () => void;
}

const RAZORPAY_KEY = "rzp_test_SCBCmIkI6a5W48";

const plans = [
  {
    name: "FREE",
    price: "₹0",
    icon: Zap,
    features: [
      "5 links",
      "5 basic themes", 
      "ClickBio branding",
      "Ads on bio page"
    ],
    key: "free",
  },
  {
    name: "STANDARD",
    price: "₹99",
    period: "/month",
    icon: Star,
    features: [
      "10 links",
      "10 themes (basic + standard)",
      "Analytics dashboard",
      "Background upload",
      "No ads"
    ],
    key: "basic",
    amount: 9900, // paise
  },
  {
    name: "PRO",
    price: "₹199",
    period: "/month",
    icon: Sparkles,
    features: [
      "Unlimited links",
      "All themes",
      "Advanced analytics", 
      "Background upload",
      "No ads"
    ],
    key: "pro",
    highlighted: true,
    amount: 19900,
  },
];

const PricingPage = () => {
  const result = useSubscription();
  const subscription = result?.subscription;
  const plan = result?.plan;
  const loading = result?.loading ?? false;
  const error = result?.error;
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async (targetPlan: string, amount: number) => {
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Failed to load payment gateway. Please try again.");
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount,
      currency: "INR",
      name: "clickbio",
      description: `${targetPlan.charAt(0).toUpperCase() + targetPlan.slice(1)} Plan - Monthly`,
      prefill: {
        email: user?.email || "",
      },
      theme: {
        color: "#22c55e",
      },
      handler: async (response: RazorpayResponse) => {
        // Update subscription in database
        if (subscription) {
          const nowStr = new Date().toISOString();
          const expiresStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
          await supabase
            .from("subscriptions")
            .update({ 
              plan: targetPlan, 
              status: "active",
              plan_type: targetPlan,
              billing_cycle: "monthly",
              subscribed_at: nowStr,
              expires_at: expiresStr,
              is_active: true
            })
            .eq("user_id", user?.id);
        }
        navigate("/payment-success?plan=" + targetPlan);
      },
      modal: {
        ondismiss: () => {
          toast.info("Payment cancelled");
        },
      },
    };

    const rzp = new (window.Razorpay as new (options: RazorpayOptions) => RazorpayInstance)(options);
    rzp.on("payment.failed", () => {
      navigate("/payment-failed");
    });
    rzp.open();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto py-20">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="h-96 rounded-3xl border-2 border-border/50 animate-pulse bg-gradient-to-br from-muted to-background" />
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive max-w-md mx-auto mt-8">
        <h3 className="font-semibold mb-2">Pricing temporarily unavailable</h3>
        <p>Failed to load plans: {error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2">Pricing</h1>
      <p className="text-muted-foreground text-sm mb-8">Choose the plan that fits your needs.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {plans.map((p, i) => {
          const isCurrent = plan === p.key;
          const Icon = p.icon;
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
              className={`group h-full rounded-3xl border-2 p-8 transition-all relative hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-primary/10 ${
                p.key === 'free' ? 'border-border/50 bg-card' :
                p.key === 'basic' ? 'border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20' :
                'border-primary/50 bg-primary/5 dark:bg-primary/10 shadow-xl ring-1 ring-primary/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${p.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-display font-bold text-lg text-card-foreground">{p.name}</h3>
              </div>
              {p.highlighted && (
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Most Popular
                </motion.span>
              )}
              <div className="relative z-10 pt-4">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-display font-black text-card-foreground ${p.highlighted ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent" : ""}`}>{p.price}</span>
                  {p.period && <span className="text-muted-foreground text-lg font-medium">{p.period}</span>}
                </div>
                <span className="text-sm text-muted-foreground font-medium block mt-1">per month</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <Button variant="outline" className="w-full" disabled>Current Plan</Button>
              ) : p.key === "free" ? (
                <Button variant="outline" className="w-full" disabled>Free Forever</Button>
              ) : (
                <Button
                  variant={p.highlighted ? "hero" : "default"}
                  className="w-full"
                  onClick={() => handleUpgrade(p.key as "basic" | "pro", (p.amount as number) || 0)}
                >
                  Upgrade to {p.name}
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PricingPage;

