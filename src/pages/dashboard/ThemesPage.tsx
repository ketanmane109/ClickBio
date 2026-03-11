import { useState } from "react";

const ThemesPage = () => {
  const [theme, setTheme] = useState<"dark" | "gradient" | "minimal" | "glass">("dark");

  const themes = [
    { id: "dark" as const, label: "Dark Creator", preview: "bg-[hsl(0,0%,5%)]", fg: "text-[hsl(0,0%,96%)]" },
    { id: "gradient" as const, label: "Gradient Neon", preview: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]", fg: "text-[hsl(0,0%,96%)]" },
    { id: "minimal" as const, label: "Minimal", preview: "bg-[hsl(0,0%,98%)]", fg: "text-[hsl(0,0%,10%)]" },
    { id: "glass" as const, label: "Glass", preview: "bg-gradient-to-br from-[hsl(210,40%,15%)] to-[hsl(220,30%,25%)]", fg: "text-[hsl(0,0%,96%)]" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Themes</h1>
      <div className="grid grid-cols-2 gap-4">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`rounded-xl border-2 p-1 transition-colors ${
              theme === t.id ? "border-primary" : "border-border"
            }`}
          >
            <div className={`${t.preview} rounded-lg h-36 flex items-end p-4`}>
              <span className={`text-sm font-display font-semibold ${t.fg}`}>
                {t.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemesPage;
