import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles, Zap } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const RAZORPAY_KEY = "rzp_test_SCBCmIkI6a5W48";

const plans = [
  {
    name: "Free",
    price: "₹0",
    icon: Zap,
    features: ["5 links", "5 basic themes", "clickbio branding", "Ads on bio page"],
    key: "free",
  },
  {
    name: "Basic",
    price: "₹99",
    period: "/month",
    icon: Star,
    features: ["10 links", "10 themes (basic + standard)", "Analytics dashboard", "Background upload", "No ads", "No branding"],
    key: "basic",
    amount: 9900, // paise
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    icon: Sparkles,
    features: ["Unlimited links", "All 15 themes", "Full analytics", "Background upload", "Custom styling", "No ads", "No branding", "Priority support"],
    key: "pro",
    highlighted: true,
    amount: 19900,
  },
];

const PricingPage = () => {
  const { subscription, plan } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
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
      handler: async (response: any) => {
        // Update subscription in database
        if (subscription) {
          await supabase
            .from("subscriptions")
            .update({ plan: targetPlan, status: "active" })
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

    const rzp = new (window as any).Razorpay(options);
    rzp.on("payment.failed", () => {
      navigate("/payment-failed");
    });
    rzp.open();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2">Pricing</h1>
      <p className="text-muted-foreground text-sm mb-8">Choose the plan that fits your needs.</p>

      <div className="grid md:grid-cols-3 gap-5 max-w-3xl">
        {plans.map((p, i) => {
          const isCurrent = plan === p.key;
          const Icon = p.icon;
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border p-6 transition-all ${
                p.highlighted
                  ? "border-primary bg-card shadow-[0_0_30px_hsl(142,72%,50%/0.1)]"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`h-4 w-4 ${p.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                <h3 className="font-display font-bold text-lg">{p.name}</h3>
              </div>
              {p.highlighted && (
                <span className="text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="flex items-baseline gap-1 mt-3 mb-6">
                <span className="text-3xl font-display font-bold">{p.price}</span>
                {p.period && <span className="text-muted-foreground text-sm">{p.period}</span>}
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
                  onClick={() => handleUpgrade(p.key, p.amount!)}
                >
                  Upgrade to {p.name}
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center max-w-lg mx-auto">
        Payments are securely processed by Razorpay. You can cancel anytime.
      </p>
    </motion.div>
  );
};

export default PricingPage;
