import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UpgradeModal from "@/components/UpgradeModal";

const themes = [
  // Basic themes (free)
  { id: "dark", label: "Dark Creator", tier: "free", preview: "bg-[hsl(0,0%,5%)]", fg: "text-[hsl(0,0%,96%)]", accent: "hsl(142,72%,50%)", btnPreview: "bg-[hsl(0,0%,14%)]" },
  { id: "minimal", label: "Minimal Light", tier: "free", preview: "bg-[hsl(0,0%,98%)]", fg: "text-[hsl(0,0%,10%)]", accent: "hsl(0,0%,10%)", btnPreview: "bg-[hsl(0,0%,92%)]" },
  { id: "bw", label: "Black & White", tier: "free", preview: "bg-[hsl(0,0%,0%)]", fg: "text-[hsl(0,0%,100%)]", accent: "hsl(0,0%,100%)", btnPreview: "bg-[hsl(0,0%,15%)]" },
  { id: "softgray", label: "Soft Gray", tier: "free", preview: "bg-[hsl(220,10%,94%)]", fg: "text-[hsl(220,10%,20%)]", accent: "hsl(220,50%,50%)", btnPreview: "bg-[hsl(220,10%,88%)]" },
  { id: "simplegradient", label: "Simple Gradient", tier: "free", preview: "bg-gradient-to-b from-[hsl(220,30%,15%)] to-[hsl(240,20%,8%)]", fg: "text-[hsl(0,0%,96%)]", accent: "hsl(220,80%,60%)", btnPreview: "bg-[hsl(220,30%,22%)]" },

  // Standard themes (basic+)
  { id: "neon", label: "Dark Neon", tier: "basic", preview: "bg-[hsl(260,100%,5%)]", fg: "text-[hsl(280,100%,70%)]", accent: "hsl(280,100%,60%)", btnPreview: "bg-[hsl(280,100%,20%)]" },
  { id: "gradient", label: "Purple Gradient", tier: "basic", preview: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]", fg: "text-[hsl(0,0%,100%)]", accent: "hsl(300,70%,60%)", btnPreview: "bg-[hsl(270,50%,30%)]/60" },
  { id: "glass", label: "Blue Glass", tier: "basic", preview: "bg-gradient-to-br from-[hsl(210,40%,15%)] to-[hsl(220,30%,25%)]", fg: "text-[hsl(0,0%,96%)]", accent: "hsl(210,80%,60%)", btnPreview: "bg-[hsl(0,0%,100%)]/10" },
  { id: "sunset", label: "Orange Sunset", tier: "basic", preview: "bg-gradient-to-br from-[hsl(30,80%,55%)] to-[hsl(350,70%,45%)]", fg: "text-[hsl(0,0%,100%)]", accent: "hsl(45,90%,65%)", btnPreview: "bg-[hsl(0,0%,100%)]/20" },
  { id: "nature", label: "Green Nature", tier: "basic", preview: "bg-gradient-to-b from-[hsl(140,30%,15%)] to-[hsl(160,25%,10%)]", fg: "text-[hsl(140,40%,85%)]", accent: "hsl(140,60%,55%)", btnPreview: "bg-[hsl(140,30%,20%)]" },

  // Premium themes (pro only)
  { id: "glassmorphism", label: "Glassmorphism", tier: "pro", preview: "bg-gradient-to-br from-[hsl(240,30%,20%)] to-[hsl(280,25%,15%)]", fg: "text-[hsl(0,0%,100%)]", accent: "hsl(240,80%,70%)", btnPreview: "bg-[hsl(0,0%,100%)]/10" },
  { id: "gold", label: "Luxury Gold", tier: "pro", preview: "bg-[hsl(40,30%,8%)]", fg: "text-[hsl(45,80%,60%)]", accent: "hsl(45,80%,55%)", btnPreview: "bg-[hsl(45,50%,15%)]" },
  { id: "instagram", label: "Instagram Creator", tier: "pro", preview: "bg-gradient-to-br from-[hsl(45,100%,55%)] via-[hsl(340,80%,55%)] to-[hsl(280,80%,55%)]", fg: "text-[hsl(0,0%,100%)]", accent: "hsl(340,80%,60%)", btnPreview: "bg-[hsl(0,0%,100%)]/25" },
  { id: "youtube", label: "YouTube Creator", tier: "pro", preview: "bg-[hsl(0,0%,7%)]", fg: "text-[hsl(0,0%,96%)]", accent: "hsl(0,80%,50%)", btnPreview: "bg-[hsl(0,75%,45%)]" },
  { id: "pastel", label: "Pastel Dream", tier: "pro", preview: "bg-gradient-to-br from-[hsl(330,50%,92%)] to-[hsl(270,40%,90%)]", fg: "text-[hsl(330,30%,25%)]", accent: "hsl(300,50%,55%)", btnPreview: "bg-[hsl(330,40%,85%)]" },
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
              {tier === "free" ? "Basic" : tier === "basic" ? "Standard" : "Premium"} Themes
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {groupedThemes[tier].map((t) => {
              const isActive = profile?.theme === t.id;
              return (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreviewTheme(t)}
                  className={`rounded-xl border-2 transition-all duration-200 overflow-hidden group ${
                    isActive ? "border-primary shadow-[0_0_16px_hsl(142,72%,50%/0.2)]" : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className={`${t.preview} h-24 flex flex-col items-center justify-center gap-1.5 p-3 relative`}>
                    {/* Mini preview mockup */}
                    <div className="w-6 h-6 rounded-full bg-current/20 border border-current/20" />
                    <div className={`w-16 h-2 rounded-full ${t.btnPreview}`} />
                    <div className={`w-14 h-2 rounded-full ${t.btnPreview} opacity-70`} />
                    {isActive && (
                      <div className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="bg-card px-3 py-2 text-left">
                    <p className={`text-xs font-display font-semibold truncate ${t.fg.includes("100") || t.fg.includes("96") ? "text-foreground" : "text-foreground"}`}>{t.label}</p>
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
              <div className={`${previewTheme.preview} rounded-3xl overflow-hidden shadow-2xl`}>
                <div className="px-6 py-10 flex flex-col items-center min-h-[420px]">
                  <div className="w-20 h-20 rounded-full bg-current/15 border-2 border-current/20 mb-3" />
                  <div className={`font-display font-bold text-lg ${previewTheme.fg}`}>Your Name</div>
                  <div className={`text-xs opacity-60 mt-1 ${previewTheme.fg}`}>Creator & Designer</div>
                  <div className="w-full mt-6 space-y-2.5">
                    {["My Website", "YouTube Channel", "Latest Blog"].map((label) => (
                      <div key={label} className={`w-full py-3 rounded-xl text-center text-sm font-medium ${previewTheme.btnPreview} ${previewTheme.fg}`}>
                        {label}
                      </div>
                    ))}
                  </div>
                  <p className={`text-[10px] opacity-30 mt-auto pt-6 ${previewTheme.fg}`}>Powered by clickbio</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => setPreviewTheme(null)}>
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button variant="hero" className="flex-1" onClick={() => handleSelect(previewTheme)}>
                  <Check className="h-4 w-4 mr-1" /> Apply Theme
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ThemesPage;
