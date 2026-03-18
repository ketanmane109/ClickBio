import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, Lightbulb, Hash, MessageSquare, Flame } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import UpgradeModal from "@/components/UpgradeModal";

type ToolType = "bio" | "hooks" | "captions" | "hashtags" | "ideas";

const tools: { id: ToolType; label: string; icon: typeof Sparkles; placeholder: string; description: string }[] = [
  { id: "bio", label: "AI Bio Generator", icon: Sparkles, placeholder: "e.g. fitness coach, tech reviewer", description: "Generate an optimized bio for your profile" },
  { id: "hooks", label: "Viral Hook Generator", icon: Flame, placeholder: "e.g. productivity tips for students", description: "Create attention-grabbing hooks for your content" },
  { id: "captions", label: "Caption Generator", icon: MessageSquare, placeholder: "e.g. launching my new course", description: "Write engaging captions for your posts" },
  { id: "hashtags", label: "Hashtag Generator", icon: Hash, placeholder: "e.g. fitness, workout, healthy", description: "Get trending hashtags for maximum reach" },
  { id: "ideas", label: "Content Ideas", icon: Lightbulb, placeholder: "e.g. cooking, vegan recipes", description: "Get fresh content ideas for your niche" },
];

const AIToolsPage = () => {
  const { updateProfile } = useProfile();
  const { isPro, loading: subLoading } = useSubscription();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolType>("bio");
  const [input, setInput] = useState("");
  const [tone, setTone] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  if (subLoading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  if (!isPro) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold mb-2">AI Tools — Pro Only</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">Upgrade to Pro to unlock 5 powerful AI creator tools.</p>
        <Button variant="hero" onClick={() => setShowUpgrade(true)}>Upgrade to Pro</Button>
        <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
      </motion.div>
    );
  }

  const generate = async () => {
    if (!input.trim()) return;
    setGenerating(true);
    setResults([]);
    try {
      const { data, error } = await supabase.functions.invoke("ai-tools", {
        body: { type: activeTool, input, tone },
      });
      if (error) throw error;
      setResults(data.results || []);
    } catch {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const useBio = async (text: string) => {
    await updateProfile({ bio: text });
    toast.success("Bio updated!");
  };

  const currentTool = tools.find((t) => t.id === activeTool)!;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-6">AI Tools</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {tools.map((t) => (
          <Button
            key={t.id}
            variant={activeTool === t.id ? "hero" : "outline"}
            size="sm"
            onClick={() => { setActiveTool(t.id); setResults([]); setInput(""); }}
          >
            <t.icon className="h-3.5 w-3.5 mr-1" /> {t.label}
          </Button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-2">
          <currentTool.icon className="h-5 w-5 text-primary" />
          <h3 className="font-display font-semibold">{currentTool.label}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{currentTool.description}</p>

        <div className="space-y-3 mb-4">
          <Input
            placeholder={currentTool.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {(activeTool === "bio" || activeTool === "captions") && (
            <Input placeholder="Tone (e.g. professional, casual, witty)" value={tone} onChange={(e) => setTone(e.target.value)} />
          )}
          <Button variant="hero" size="sm" onClick={generate} disabled={!input.trim() || generating}>
            <Sparkles className="h-3.5 w-3.5 mr-1" /> {generating ? "Generating..." : "Generate"}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="rounded-lg bg-muted p-3 flex items-start justify-between gap-2">
                <p className="text-sm flex-1">{r}</p>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyText(r)}>
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  {activeTool === "bio" && (
                    <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => useBio(r)}>
                      Use
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIToolsPage;
