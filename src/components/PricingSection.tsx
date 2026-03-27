import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    desc: "Get started with the basics",
    features: ["Up to 5 links", "2 basic themes", "clickbio branding", "Ads on bio page"],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "₹99",
    period: "/mo",
    desc: "Grow your creator brand",
    features: ["Up to 10 links", "All 10 themes", "Analytics dashboard", "No ads", "No branding"],
    cta: "Go Basic",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/mo",
    desc: "Everything, unlimited",
    features: ["Unlimited links", "All 10 themes", "Full analytics", "Custom background", "No ads", "No branding", "Priority support"],
    cta: "Go Pro",
    highlighted: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`rounded-xl border p-8 ${plan.highlighted ? "border-primary bg-card glow" : "border-border bg-card"}`}
            >
              <h3 className="font-display font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? "hero" : "outline"} className="w-full" asChild>
                <Link to="/auth">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;