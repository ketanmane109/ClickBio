import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { themeStyles } from "@/utils/themes";

const showcaseThemes = [
  { id: "pearl-white", name: "Pearl White" },
  { id: "aurora-glass", name: "Aurora Glass" },
  { id: "tiktok-creator", name: "TikTok Creator" },
  { id: "lilac-dream", name: "Lilac Dream" },
  { id: "dreamwave", name: "Dreamwave" },
  { id: "cyberpunk-x", name: "Cyberpunk X" },
];

const ThemePreviewCard = ({ id, name }: { id: string, name: string }) => {
  const styles = themeStyles[id];
  if (!styles) return null;

  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div className={`relative w-full max-w-[260px] aspect-[1/2] rounded-[2.5rem] border-[8px] border-zinc-900 bg-black p-1 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:shadow-primary/20`}>
        <div className={`w-full h-full rounded-[2rem] overflow-hidden flex flex-col items-center pt-8 px-4 relative ${styles.bg}`}>
          
          {/* Top Notch Area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-b-xl z-20" />
          
          {/* Profile Image */}
          <div className={`relative z-10 w-16 h-16 rounded-full bg-current/10 border-2 border-current/20 mb-3 mt-2 flex items-center justify-center shadow-lg overflow-hidden ${styles.fg}`}>
            <img src="/logo.svg" alt="ClickBio" className="w-8 h-8 object-contain" />
          </div>
          
          <h3 className={`font-display font-bold text-sm mb-1 z-10 ${styles.fg}`}>@ClickBio</h3>
          <p className={`text-[10px] mb-5 text-center z-10 opacity-70 ${styles.fg}`}>Premium Creator Tools</p>

          {/* Link Buttons */}
          <div className="w-full space-y-2 z-10">
            {["Website", "YouTube", "Instagram", "Contact"].map((label, idx) => (
              <div
                key={label}
                className={`w-full py-2.5 px-3 rounded-xl text-center text-[11px] font-semibold transition-all shadow-sm flex items-center justify-center ${idx === 0 ? styles.featured : styles.btn} ${styles.fg}`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <h3 className="font-display font-semibold mt-6 text-center text-lg">{name}</h3>
    </div>
  );
};

const ThemesPreviewSection = () => {
  return (
    <section id="themes" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group transition-all duration-300 hover:scale-110 hover:bg-primary/20">
            <Palette className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">Premium Theme Collection</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Dark, light, gradient, glass — find your perfect style with 50+ expertly crafted creator themes.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 px-4 md:px-8 max-w-6xl mx-auto">
          {showcaseThemes.map((demo, i) => (
            <motion.div 
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <ThemePreviewCard id={demo.id} name={demo.name} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemesPreviewSection;

