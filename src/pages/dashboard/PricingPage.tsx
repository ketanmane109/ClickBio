import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "framer-motion";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: ["5 links", "2 basic themes", "BioSpark branding", "Ads on bio page"],
    key: "free",
  },
  {
    name: "Basic",
    price: "₹99",
    period: "/month",
    features: ["10 links", "All 10 themes", "Analytics dashboard", "No ads", "No branding"],
    key: "basic",
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    features: ["Unlimited links", "All 10 themes", "Full analytics", "Custom background", "No ads", "No branding", "Priority support"],
    key: "pro",
    highlighted: true,
  },
];

const PricingPage = () => {
  const { subscription, plan } = useSubscription();

  const handleUpgrade = (targetPlan: string) => {
    toast.info("Payment integration coming soon! Contact support to upgrade.");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2">Pricing</h1>
      <p className="text-muted-foreground mb-8">Choose the plan that fits your needs.</p>

      <div className="grid md:grid-cols-3 gap-6 max-w-3xl">
        {plans.map((p) => {
          const isCurrent = plan === p.key;
          return (
            <div
              key={p.name}
              className={`rounded-xl border p-6 ${p.highlighted ? "border-primary bg-card glow" : "border-border bg-card"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-bold text-xl">{p.name}</h3>
                {p.highlighted && <Star className="h-4 w-4 text-primary" />}
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold">{p.price}</span>
                {p.period && <span className="text-muted-foreground text-sm">{p.period}</span>}
              </div>
              <ul className="space-y-2 mb-6">
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
                <Button variant={p.highlighted ? "hero" : "outline"} className="w-full" onClick={() => handleUpgrade(p.key)}>
                  Upgrade to {p.name}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default PricingPage;