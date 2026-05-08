import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Clock, Eye } from "lucide-react";

const AnalyticsPreviewSection = () => {
  return (
    <section id="analytics" className="py-24 bg-background/50 backdrop-blur-sm">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <BarChart3 className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real insights for growth</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Track what works and optimize your strategy</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="group bg-card/70 backdrop-blur-xl rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all h-[200px] flex flex-col items-center justify-center"
          >
            <TrendingUp className="h-12 w-12 text-primary mb-4 group-hover:rotate-12 transition-transform" />
            <h3 className="font-semibold mb-2 text-center">Top Links</h3>
            <p className="text-sm text-muted-foreground text-center">Which links get the most clicks</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="group bg-card/70 backdrop-blur-xl rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all h-[200px] flex flex-col items-center justify-center"
          >
            <Users className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-2 text-center">Audience</h3>
            <p className="text-sm text-muted-foreground text-center">Visitor trends and patterns</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="group bg-card/70 backdrop-blur-xl rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all h-[200px] flex flex-col items-center justify-center"
          >
            <Eye className="h-12 w-12 text-primary mb-4 group-hover:animate-pulse" />
            <h3 className="font-semibold mb-2 text-center">Live Views</h3>
            <p className="text-sm text-muted-foreground text-center">Real-time page visits</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="group bg-card/70 backdrop-blur-xl rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all h-[200px] flex flex-col items-center justify-center"
          >
            <Clock className="h-12 w-12 text-primary mb-4 group-hover:rotate-180 transition-transform duration-1000" />
            <h3 className="font-semibold mb-2 text-center">Time Analytics</h3>
            <p className="text-sm text-muted-foreground text-center">When your audience is active</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsPreviewSection;

