import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useState } from "react";
import UpgradeModal from "@/components/UpgradeModal";

const themes = [
  { id: "dark", label: "Dark Creator", preview: "bg-[hsl(0,0%,5%)]", fg: "text-[hsl(0,0%,96%)]", free: true },
  { id: "minimal", label: "Minimal", preview: "bg-[hsl(0,0%,98%)]", fg: "text-[hsl(0,0%,10%)]", free: true },
  { id: "gradient", label: "Gradient Neon", preview: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]", fg: "text-[hsl(0,0%,96%)]", free: false },
  { id: "glass", label: "Glass", preview: "bg-gradient-to-br from-[hsl(210,40%,15%)] to-[hsl(220,30%,25%)]", fg: "text-[hsl(0,0%,96%)]", free: false },
  { id: "neon", label: "Neon", preview: "bg-[hsl(260,100%,5%)]", fg: "text-[hsl(280,100%,70%)]", free: false },
  { id: "pastel", label: "Pastel", preview: "bg-[hsl(330,50%,95%)]", fg: "text-[hsl(330,30%,25%)]", free: false },
  { id: "clean", label: "Clean White", preview: "bg-[hsl(0,0%,100%)]", fg: "text-[hsl(0,0%,15%)]", free: false },
  { id: "bold", label: "Bold Creator", preview: "bg-[hsl(0,80%,50%)]", fg: "text-[hsl(0,0%,100%)]", free: false },
  { id: "instagram", label: "Instagram", preview: "bg-gradient-to-br from-[hsl(45,100%,55%)] via-[hsl(340,80%,55%)] to-[hsl(280,80%,55%)]", fg: "text-[hsl(0,0%,100%)]", free: false },
  { id: "gold", label: "Premium Gold", preview: "bg-[hsl(40,30%,10%)]", fg: "text-[hsl(45,80%,60%)]", free: false },
];

const ThemesPage = () => {
  const { profile, updateProfile, loading } = useProfile();
  const { isPaid } = useSubscription();
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const handleSelect = async (theme: typeof themes[0]) => {
    if (!theme.free && !isPaid) {
      setShowUpgrade(true);
      return;
    }
    await updateProfile({ theme: theme.id });
    toast.success("Theme updated!");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-6">Themes</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((t) => {
          const locked = !t.free && !isPaid;
          return (
            <button
              key={t.id}
              onClick={() => handleSelect(t)}
              className={`rounded-xl border-2 p-1 transition-colors relative ${
                profile?.theme === t.id ? "border-primary" : "border-border"
              } ${locked ? "opacity-70" : ""}`}
            >
              <div className={`${t.preview} rounded-lg h-28 flex items-end p-3`}>
                <span className={`text-xs font-display font-semibold ${t.fg}`}>{t.label}</span>
              </div>
              {locked && (
                <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1">
                  <Lock className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </motion.div>
  );
};

export default ThemesPage;