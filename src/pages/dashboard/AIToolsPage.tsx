import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, BarChart3, Plus } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

const aiSuggestions = [
  { text: "Add a YouTube link to grow subscribers", title: "YouTube Channel", url: "https://youtube.com/" },
  { text: "Add a WhatsApp link for direct messages", title: "WhatsApp", url: "https://wa.me/" },
  { text: "Add a newsletter signup to build your list", title: "Newsletter", url: "" },
  { text: "Add a Gumroad link to sell digital products", title: "My Store", url: "https://gumroad.com/" },
];

const AIToolsPage = () => {
  const { profile, updateProfile, addLink } = useProfile();
  const [aiNiche, setAiNiche] = useState("");
  const [aiTone, setAiTone] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
  const [generatedBio, setGeneratedBio] = useState("");
  const [generating, setGenerating] = useState(false);

  const generateBio = async () => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-bio", {
        body: { niche: aiNiche, tone: aiTone, keywords: aiKeywords },
      });
      if (error) throw error;
      setGeneratedBio(data.bio);
    } catch {
      // Fallback to local generation
      const bios = [
        `${aiNiche} enthusiast sharing ${aiKeywords}. Let's connect and grow together! 🚀`,
        `Helping you master ${aiNiche}. ${aiKeywords} | Building in public ✨`,
        `${aiNiche} creator passionate about ${aiKeywords}. Join the journey 🎯`,
      ];
      setGeneratedBio(bios[Math.floor(Math.random() * bios.length)]);
    } finally {
      setGenerating(false);
    }
  };

  const useBio = async () => {
    if (!generatedBio) return;
    await updateProfile({ bio: generatedBio });
    toast.success("Bio updated!");
  };

  const addSuggestedLink = async (title: string, url: string) => {
    await addLink();
    toast.success(`"${title}" link added! Edit it in Bio Page.`);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-6">AI Tools</h1>

      <div className="space-y-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold">AI Bio Generator</h3>
          </div>
          <div className="space-y-3 mb-4">
            <Input placeholder="Your niche (e.g. fitness, tech, music)" value={aiNiche} onChange={(e) => setAiNiche(e.target.value)} />
            <Input placeholder="Tone (e.g. professional, casual, witty)" value={aiTone} onChange={(e) => setAiTone(e.target.value)} />
            <Input placeholder="Keywords (e.g. coaching, tutorials, vlogs)" value={aiKeywords} onChange={(e) => setAiKeywords(e.target.value)} />
            <Button variant="hero" size="sm" onClick={generateBio} disabled={!aiNiche || !aiKeywords || generating}>
              <Sparkles className="h-3.5 w-3.5 mr-1" /> {generating ? "Generating..." : "Generate Bio"}
            </Button>
          </div>
          {generatedBio && (
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm mb-3">{generatedBio}</p>
              <Button size="sm" variant="outline" onClick={useBio}>Use this bio</Button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold">Smart Link Suggestions</h3>
          </div>
          <div className="space-y-2">
            {aiSuggestions.map((s) => (
              <div key={s.text} className="flex items-center justify-between rounded-lg bg-muted p-3">
                <p className="text-sm">{s.text}</p>
                <Button size="sm" variant="ghost" onClick={() => addSuggestedLink(s.title, s.url)}>
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIToolsPage;
