import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-xl mx-auto">
<h2 className="text-3xl md:text-4xl font-bold mb-4">

          </h2>
          <p className="text-muted-foreground mb-8">
            Join creators who've already made the switch. Free forever, upgrade anytime.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/auth">Create your page <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;