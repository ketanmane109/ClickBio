import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneMockup from "@/components/PhoneMockup";

const HeroSection = () => {
  return (
    <section className="relative hero-gradient pt-32 pb-20 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              AI-Powered Creator Platform
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              Your links,{" "}
              <span className="text-gradient">your brand,</span>
              <br />
              one page.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Build a stunning bio page and unlock AI tools to grow your audience. Everything creators need, in one place.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/auth">Start for free <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/ketan">See example</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">No credit card required · Set up in 60 seconds</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:flex justify-center">
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default HeroSection;
