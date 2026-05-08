import { motion } from "framer-motion";
import { Palette, BarChart3, Smartphone, Image, Activity } from "lucide-react";

const features = [
  { icon: Palette, title: "Themes", desc: "Premium themes with dark, light, gradient and glassmorphism styles." },
  { icon: BarChart3, title: "Analytics", desc: "Complete link analytics dashboard with click tracking and insights." },
  { icon: Smartphone, title: "Mobile-friendly bio page", desc: "Perfectly responsive design that looks stunning on all devices." },
  { icon: Image, title: "Background upload", desc: "Upload custom backgrounds to personalize your bio page." },
  { icon: Activity, title: "Advanced analytics", desc: "Detailed visitor insights, growth metrics and performance data." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
Premium features for <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">creators</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">Powerful tools to build, customize, and grow your online presence.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
<f.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-200" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
