import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, BarChart3, Plus } from "lucide-react";

const aiSuggestions = [
  "Add a YouTube link to grow subscribers",
  "Add a WhatsApp link for direct messages",
  "Add a newsletter signup to build your list",
  "Add a Gumroad link to sell digital products",
];

const AIToolsPage = () => {
  const [aiNiche, setAiNiche] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
  const [generatedBio, setGeneratedBio] = useState("");

  const generateBio = () => {
    const bios = [
      `${aiNiche} enthusiast sharing ${aiKeywords}. Let's connect and grow together! 🚀`,
      `Helping you master ${aiNiche}. ${aiKeywords} | Building in public ✨`,
      `${aiNiche} creator passionate about ${aiKeywords}. Join the journey 🎯`,
    ];
    setGeneratedBio(bios[Math.floor(Math.random() * bios.length)]);
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">AI Tools</h1>

      <div className="space-y-8">
        {/* AI Bio Generator */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold">AI Bio Generator</h3>
          </div>
          <div className="space-y-3 mb-4">
            <Input placeholder="Your niche (e.g. fitness, tech, music)" value={aiNiche} onChange={(e) => setAiNiche(e.target.value)} />
            <Input placeholder="Keywords (e.g. coaching, tutorials, vlogs)" value={aiKeywords} onChange={(e) => setAiKeywords(e.target.value)} />
            <Button variant="hero" size="sm" onClick={generateBio} disabled={!aiNiche || !aiKeywords}>
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Generate Bio
            </Button>
          </div>
          {generatedBio && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm mb-3">{generatedBio}</p>
              <Button size="sm" variant="outline">
                Use this bio
              </Button>
            </div>
          )}
        </div>

        {/* Smart Suggestions */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold">Smart Link Suggestions</h3>
          </div>
          <div className="space-y-2">
            {aiSuggestions.map((s) => (
              <div key={s} className="flex items-center justify-between rounded-lg bg-muted p-3">
                <p className="text-sm">{s}</p>
                <Button size="sm" variant="ghost">
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPage;
