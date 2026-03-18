import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "framer-motion";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: ["5 links", "2 basic themes", "Basic bio page", "Community support"],
    current: "free",
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    features: [
      "Unlimited links",
      "All 10 themes",
      "Full analytics dashboard",
      "AI Bio Generator",
      "Viral Hook Generator",
      "Caption Generator",
      "Hashtag Generator",
      "Content Ideas",
      "No branding",
      "Priority support",
    ],
    current: "pro",
    highlighted: true,
  },
];

const PricingPage = () => {
  const { subscription, isPro } = useSubscription();

  const handleUpgrade = () => {
    toast.info("Payment integration coming soon! Contact support to upgrade.");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2">Pricing</h1>
      <p className="text-muted-foreground mb-8">Choose the plan that fits your needs.</p>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
        {plans.map((plan) => {
          const isCurrent = subscription?.plan === plan.current;
          return (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 ${
                plan.highlighted ? "border-primary bg-card glow" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-bold text-xl">{plan.name}</h3>
                {plan.highlighted && <Sparkles className="h-4 w-4 text-primary" />}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <Button variant="outline" className="w-full" disabled>Current Plan</Button>
              ) : plan.highlighted ? (
                <Button variant="hero" className="w-full" onClick={handleUpgrade}>Upgrade to Pro</Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>Free Forever</Button>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PricingPage;
