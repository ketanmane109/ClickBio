import { motion } from "framer-motion";
import { Link2, Palette, BarChart3, Sparkles, GripVertical, Smartphone } from "lucide-react";

const features = [
  { icon: Link2, title: "Bio Page Builder", desc: "Add links, photos, bios, and media embeds. Your page, your rules." },
  { icon: Palette, title: "Beautiful Themes", desc: "Choose from dark, gradient, or minimal themes. Switch in one click." },
  { icon: GripVertical, title: "Drag & Drop", desc: "Reorder your links with simple drag and drop. No code needed." },
  { icon: BarChart3, title: "Link Analytics", desc: "Track clicks, top links, and daily engagement on your dashboard." },
  { icon: Sparkles, title: "AI Bio Generator", desc: "Enter your niche and keywords. AI writes your perfect bio instantly." },
  { icon: Smartphone, title: "Mobile First", desc: "Pages load fast and look stunning on every phone and screen size." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to <span className="text-gradient">stand out</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Powerful tools to build, customize, and grow your online presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
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
