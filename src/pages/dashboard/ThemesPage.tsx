import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpgradeModal from "@/components/UpgradeModal";
import { themeStyles, FREE_THEMES, STANDARD_THEMES, PRO_THEMES } from "@/utils/themes";

// Badge mappings for themes
const badgeMap: Record<string, { icon: string; label: string }> = {
  "minimal-white": { icon: "⭐", label: "Creator Favorite" },
  "ocean-creator": { icon: "🔥", label: "Popular" },
  "cyber-violet": { icon: "✨", label: "New" },
  "black-diamond": { icon: "👑", label: "Premium" },
  "royal-gold": { icon: "👑", label: "Luxury" },
  "neon-matrix": { icon: "🚀", label: "Trending" },
  "youtube-creator": { icon: "⭐", label: "Creator Favorite" },
  "instagram-elite": { icon: "🔥", label: "Popular" },
  "pure-amoled": { icon: "⭐", label: "Creator Favorite" },
  "dreamwave": { icon: "✨", label: "New" },
  "aurora-wave": { icon: "🚀", label: "Trending" },
  "glass-creator": { icon: "🔥", label: "Trending" },
  "liquid-glass": { icon: "👑", label: "Premium" },
  "carbon-black-pro": { icon: "⭐", label: "Trending" },
};

function formatLabel(id: string) {
  if (id === 'bw') return 'Black & White';
  return id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const themes = [
  ...FREE_THEMES.map(id => ({ id, label: formatLabel(id), tier: "free" })),
  ...STANDARD_THEMES.map(id => ({ id, label: formatLabel(id), tier: "basic" })),
  ...PRO_THEMES.map(id => ({ id, label: formatLabel(id), tier: "pro" })),
];

type Theme = typeof themes[0];

const TESTING_MODE = false;

const tierOrder = { free: 0, basic: 1, pro: 2 };
const tierLabel: Record<string, string> = { free: "Free", basic: "Basic", pro: "Pro" };

const ThemesPage = () => {
  const { profile, updateProfile, loading } = useProfile();
  const { plan, isPaid, isPro } = useSubscription();
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const canUseTheme = (tier: string) => {
    if (TESTING_MODE) return true;
    if (tier === "free") return true;
    if (tier === "basic") return isPaid; // basic or pro
    if (tier === "pro") return isPro;
    return false;
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const handleSelect = async (theme: Theme) => {
    if (!canUseTheme(theme.tier)) {
      setPreviewTheme(null);
      setShowUpgrade(true);
      return;
    }
    await updateProfile({ theme: theme.id });
    toast.success(`Theme "${theme.label}" applied!`);
    setPreviewTheme(null);
  };

  const groupedThemes = {
    free: themes.filter(t => t.tier === "free"),
    basic: themes.filter(t => t.tier === "basic"),
    pro: themes.filter(t => t.tier === "pro"),
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-display font-bold">Themes</h1>
        {TESTING_MODE && (
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            ✨ All unlocked for testing
          </span>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-8">Choose a theme for your public bio page.</p>

      {(["free", "basic", "pro"] as const).map((tier) => (
        <div key={tier} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {tier === "free" ? "Free" : tier === "basic" ? "Standard (₹99)" : "Premium Pro (₹199)"} Themes
            </h2>
            {tier !== "free" && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                tier === "pro" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
              }`}>
                {tierLabel[tier]}
                {TESTING_MODE && " · unlocked"}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {groupedThemes[tier].map((t) => {
              const isActive = profile?.theme === t.id;
              const locked = !canUseTheme(t.tier);
              const badge = badgeMap[t.id];
              const styles = themeStyles[t.id] || themeStyles["minimal-white"];
              
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: locked ? 1.02 : 1.04, y: -4 }}
                  whileTap={{ scale: locked ? 0.98 : 0.96 }}
                  onClick={() => locked ? setShowUpgrade(true) : setPreviewTheme(t)}
                  className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden group relative flex flex-col ${
                    isActive ? "border-primary shadow-[0_0_20px_hsl(142,72%,50%/0.25)] ring-1 ring-primary/30" : "border-border/60 hover:border-primary/40 hover:shadow-xl"
                  } ${locked ? "opacity-95 hover:border-border/80" : ""}`}
                >
                  {/* Preview Area */}
                  <div className={`${styles.bg} h-40 flex flex-col items-center justify-center gap-2.5 p-4 relative w-full ${locked ? "overflow-hidden" : ""}`}>
                    
                    {/* Premium Lock Overlay Effects */}
                    {locked && (
                      <>
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px] z-10 transition-all duration-500 group-hover:bg-background/70 group-hover:backdrop-blur-sm" />
                        {/* Crown Icon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-6">
                          <div className="bg-primary/20 p-2.5 rounded-full border border-primary/30 mb-1 shadow-[0_0_20px_hsl(142,72%,50%/0.4)]">
                            <Lock className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        {/* Upgrade text */}
                        <div className="absolute top-1/2 left-0 right-0 text-center z-20 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                          <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/30 shadow-lg">
                            Upgrade to Pro
                          </span>
                        </div>
                      </>
                    )}
                    
                    {/* Theme preview elements (hidden behind blur but visible) */}
                    <div className={`${locked ? "blur-[3px] opacity-30 flex flex-col items-center justify-center w-full transition-all duration-500 group-hover:blur-md" : "flex flex-col items-center justify-center w-full"}`}>
                      <div className={`w-8 h-8 rounded-full bg-current/20 border-2 border-current/20 mb-2 ${styles.fg}`} />
                      <div className={`w-24 h-3 rounded-full ${styles.btn.split(' ')[0]} ${styles.btn.includes('border') ? 'border border-current/20' : ''} shadow-sm`} />
                      <div className={`w-20 h-3 rounded-full mt-2 ${styles.btn.split(' ')[0]} opacity-70 ${styles.btn.includes('border') ? 'border border-current/20' : ''} shadow-sm`} />
                      <div className={`w-20 h-3 rounded-full mt-2 ${styles.btn.split(' ')[0]} opacity-50 ${styles.btn.includes('border') ? 'border border-current/20' : ''} shadow-sm`} />
                    </div>
                    
                    {/* Active checkmark */}
                    {isActive && !locked && (
                      <div className="absolute top-3 right-3 bg-primary rounded-full p-1 shadow-lg border border-primary-foreground/20">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    
                    {/* Lock icon (for locked themes in normal state) */}
                    {locked && (
                      <div className="absolute top-3 left-3 z-10 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <Lock className="h-4 w-4 text-white/90 drop-shadow-md" />
                      </div>
                    )}
                    
                    {/* Badge (for unlocked themes with badges) */}
                    {badge && !locked && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-background/90 backdrop-blur-md border border-border shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                          {badge.icon} {badge.label}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Card footer */}
                  <div className="bg-card px-4 py-3 text-center border-t border-border/40 w-full mt-auto relative z-20">
                    <p className={`text-sm font-display font-bold truncate transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary/80'}`}>
                      {t.label}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Theme Preview Modal */}
      <AnimatePresence>
        {previewTheme && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setPreviewTheme(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Phone-shaped preview */}
              <div className={`${themeStyles[previewTheme.id]?.bg || ""} rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-zinc-900 bg-black`}>
                <div className="px-6 py-10 flex flex-col items-center min-h-[460px] relative">
                  
                  {/* Notch */}
                  <div className="absolute top-0 w-24 h-5 bg-zinc-900 rounded-b-xl"></div>

                  <div className="w-20 h-20 rounded-full bg-current/15 border-2 border-current/20 mb-3 mt-4" />
                  <div className={`font-display font-bold text-lg ${themeStyles[previewTheme.id]?.fg}`}>Your Name</div>
                  <div className={`text-xs opacity-60 mt-1 mb-6 ${themeStyles[previewTheme.id]?.fg}`}>Creator & Designer</div>
                  
                  <div className="w-full space-y-3">
                    <div className={`w-full py-3 px-4 rounded-xl text-center text-sm font-semibold shadow-lg ${themeStyles[previewTheme.id]?.featured}`}>
                      🌟 Featured Content
                    </div>
                    {["My Website", "YouTube Channel", "Latest Blog"].map((label) => (
                      <div key={label} className={`w-full py-3 px-4 rounded-xl text-center text-sm font-medium ${themeStyles[previewTheme.id]?.btn} ${themeStyles[previewTheme.id]?.fg}`}>
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-8 pb-2 flex items-center justify-center gap-2">
                    <img src="/logo.svg" alt="logo" className="w-3 h-3 opacity-50 grayscale" />
                    <p className={`text-[10px] font-semibold uppercase tracking-widest opacity-50 ${themeStyles[previewTheme.id]?.fg}`}>ClickBio</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1 rounded-xl h-11" onClick={() => setPreviewTheme(null)}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button variant="hero" className="flex-1 rounded-xl h-11" onClick={() => handleSelect(previewTheme)}>
                  <Check className="h-4 w-4 mr-1" /> Apply Theme
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </motion.div>
  );
};

export default ThemesPage;
