import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ThemesPage = () => {
  const { profile, updateProfile, loading } = useProfile();

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const themes = [
    { id: "dark", label: "Dark Creator", preview: "bg-[hsl(0,0%,5%)]", fg: "text-[hsl(0,0%,96%)]" },
    { id: "gradient", label: "Gradient Neon", preview: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]", fg: "text-[hsl(0,0%,96%)]" },
    { id: "minimal", label: "Minimal", preview: "bg-[hsl(0,0%,98%)]", fg: "text-[hsl(0,0%,10%)]" },
    { id: "glass", label: "Glass", preview: "bg-gradient-to-br from-[hsl(210,40%,15%)] to-[hsl(220,30%,25%)]", fg: "text-[hsl(0,0%,96%)]" },
  ];

  const handleSelect = async (id: string) => {
    await updateProfile({ theme: id });
    toast.success("Theme updated!");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-6">Themes</h1>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleSelect(t.id)}
            className={`rounded-xl border-2 p-1 transition-colors ${
              profile?.theme === t.id ? "border-primary" : "border-border"
            }`}
          >
            <div className={`${t.preview} rounded-lg h-36 flex items-end p-4`}>
              <span className={`text-sm font-display font-semibold ${t.fg}`}>{t.label}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ThemesPage;
