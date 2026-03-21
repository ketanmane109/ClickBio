import { motion } from "framer-motion";

const testimonials = [
  { name: "Sarah K.", handle: "@sarahcreates", text: "clickbio replaced 3 tools for me. My page looks incredible and it took 2 minutes to set up.", avatar: "🎨" },
  { name: "Marcus J.", handle: "@marcusfitness", text: "The analytics dashboard alone is worth it. I finally know which links my audience actually clicks.", avatar: "💪" },
  { name: "Priya M.", handle: "@priyamusic", text: "Set up my page in under 2 minutes. The themes are gorgeous and it works perfectly on mobile.", avatar: "🎵" },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by <span className="text-gradient">creators</span></h2>
          <p className="text-muted-foreground">Join thousands building their brand with clickbio.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{t.avatar}</div>
                <div>
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.handle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;