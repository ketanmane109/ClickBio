import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "FREE PLAN",
    price: "₹0",
    desc: "Perfect to get started",
    features: ["5 links", "5 basic themes", "ClickBio branding", "Ads on bio page"],
    cta: "Current Plan", 
    highlighted: false,
  },
  {
    name: "STANDARD PLAN", 
    price: "₹99",
    period: "/month",
    desc: "Best for growing creators",
    features: ["10 links", "10 themes", "Analytics dashboard", "Background upload", "No ads"],
    cta: "Choose Standard",
    highlighted: false,
  },
  {
    name: "PRO PLAN",
    price: "₹199",
    period: "/month",
    desc: "Everything you need",
    features: ["Unlimited links", "All themes", "Advanced analytics", "Background upload", "No ads"],
    cta: "Choose Pro",
    highlighted: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium plans for <span className="text-gradient">every creator</span>
          </h2>
          <p className="text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`group relative rounded-3xl border-2 p-8 h-full flex flex-col transition-all duration-300 overflow-hidden ${
                plan.highlighted 
                ? "border-primary/50 bg-card shadow-xl shadow-primary/20 scale-105 z-10" 
                : "border-border/50 bg-card hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 left-0 bg-primary/10 py-1 text-center text-xs font-semibold text-primary">
                  MOST POPULAR
                </div>
              )}
              <h3 className={`font-display font-bold text-2xl mb-1 ${plan.highlighted ? "mt-4" : ""}`}>{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-display font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground font-medium">{plan.period}</span>}
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.highlighted ? "default" : "outline"} 
                className={`w-full mt-auto h-12 text-base font-semibold group-hover:scale-[1.02] transition-all ${
                  plan.highlighted ? "glow bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-background/50 backdrop-blur-sm"
                }`} 
                asChild
              >
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

