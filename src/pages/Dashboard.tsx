import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Zap, Plus, Trash2, GripVertical, BarChart3, Sparkles, Eye, ExternalLink, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

interface BioLink {
  id: string;
  title: string;
  url: string;
  clicks: number;
  featured: boolean;
}

const initialLinks: BioLink[] = [
  { id: "1", title: "My Portfolio", url: "https://example.com", clicks: 234, featured: false },
  { id: "2", title: "YouTube Channel", url: "https://youtube.com", clicks: 189, featured: false },
  { id: "3", title: "Free Newsletter", url: "https://newsletter.com", clicks: 412, featured: true },
  { id: "4", title: "Book a Call", url: "https://cal.com", clicks: 87, featured: false },
];

const aiSuggestions = [
  "Add a YouTube link to grow subscribers",
  "Add a WhatsApp link for direct messages",
  "Add a newsletter signup to build your list",
  "Add a Gumroad link to sell digital products",
];

const Dashboard = () => {
  const [links, setLinks] = useState<BioLink[]>(initialLinks);
  const [name, setName] = useState("Ketan");
  const [bio, setBio] = useState("Creator · Builder · Helping you grow online 🚀");
  const [theme, setTheme] = useState<"dark" | "gradient" | "minimal">("dark");
  const [aiNiche, setAiNiche] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
  const [generatedBio, setGeneratedBio] = useState("");

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0);
  const topLink = [...links].sort((a, b) => b.clicks - a.clicks)[0];

  const addLink = () => {
    setLinks([...links, { id: Date.now().toString(), title: "New Link", url: "", clicks: 0, featured: false }]);
  };

  const removeLink = (id: string) => setLinks(links.filter((l) => l.id !== id));

  const updateLink = (id: string, field: keyof BioLink, value: string | boolean) => {
    setLinks(links.map((l) => {
      if (l.id === id) {
        if (field === "featured" && value === true) {
          return { ...l, featured: true };
        }
        return { ...l, [field]: value };
      }
      if (field === "featured" && value === true) {
        return { ...l, featured: false };
      }
      return l;
    }));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(links);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setLinks(items);
  };

  const generateBio = () => {
    const bios = [
      `${aiNiche} enthusiast sharing ${aiKeywords}. Let's connect and grow together! 🚀`,
      `Helping you master ${aiNiche}. ${aiKeywords} | Building in public ✨`,
      `${aiNiche} creator passionate about ${aiKeywords}. Join the journey 🎯`,
    ];
    setGeneratedBio(bios[Math.floor(Math.random() * bios.length)]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <Zap className="h-4 w-4 text-primary" />
            BioForge
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/ketan" className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> Preview
              </Link>
            </Button>
            <Button variant="hero" size="sm">Publish</Button>
          </div>
        </div>
      </header>

      <div className="container py-8 max-w-3xl">
        <Tabs defaultValue="links">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="links">Links</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai">AI Tools</TabsTrigger>
          </TabsList>

          {/* LINKS TAB */}
          <TabsContent value="links">
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Display Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Bio</label>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={2} />
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Your Links</h3>
              <Button size="sm" onClick={addLink}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Link
              </Button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="links">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                    {links.map((link, index) => (
                      <Draggable key={link.id} draggableId={link.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="rounded-xl border border-border bg-card p-4"
                          >
                            <div className="flex items-start gap-3">
                              <div {...provided.dragHandleProps} className="pt-2.5 text-muted-foreground cursor-grab">
                                <GripVertical className="h-4 w-4" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <Input
                                  value={link.title}
                                  onChange={(e) => updateLink(link.id, "title", e.target.value)}
                                  placeholder="Link title"
                                  className="font-medium"
                                />
                                <Input
                                  value={link.url}
                                  onChange={(e) => updateLink(link.id, "url", e.target.value)}
                                  placeholder="https://..."
                                  className="text-sm"
                                />
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Star className={`h-3.5 w-3.5 ${link.featured ? "text-primary" : "text-muted-foreground"}`} />
                                    <label className="text-xs text-muted-foreground">Featured</label>
                                    <Switch
                                      checked={link.featured}
                                      onCheckedChange={(v) => updateLink(link.id, "featured", v)}
                                    />
                                  </div>
                                  <Button variant="ghost" size="icon" onClick={() => removeLink(link.id)} className="h-8 w-8">
                                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </TabsContent>

          {/* APPEARANCE TAB */}
          <TabsContent value="appearance">
            <h3 className="font-display font-semibold mb-4">Choose Theme</h3>
            <div className="grid grid-cols-3 gap-4">
              {([
                { id: "dark" as const, label: "Dark", preview: "bg-[hsl(0,0%,5%)]" },
                { id: "gradient" as const, label: "Gradient", preview: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]" },
                { id: "minimal" as const, label: "Minimal", preview: "bg-[hsl(0,0%,98%)]" },
              ]).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`rounded-xl border-2 p-1 transition-colors ${
                    theme === t.id ? "border-primary" : "border-border"
                  }`}
                >
                  <div className={`${t.preview} rounded-lg h-32 flex items-end p-3`}>
                    <span className={`text-xs font-display font-semibold ${t.id === "minimal" ? "text-[hsl(0,0%,10%)]" : "text-[hsl(0,0%,96%)]"}`}>
                      {t.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* ANALYTICS TAB */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
                <p className="text-3xl font-display font-bold">{totalClicks}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground mb-1">Top Link</p>
                <p className="text-lg font-display font-bold truncate">{topLink?.title}</p>
                <p className="text-sm text-primary">{topLink?.clicks} clicks</p>
              </div>
            </div>

            <h3 className="font-display font-semibold mb-4">Link Performance</h3>
            <div className="space-y-3">
              {[...links].sort((a, b) => b.clicks - a.clicks).map((link) => (
                <div key={link.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{link.title}</p>
                      <p className="text-xs text-muted-foreground">{link.url}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-display font-bold">{link.clicks}</p>
                    <p className="text-xs text-muted-foreground">clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* AI TAB */}
          <TabsContent value="ai">
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
                    <Button size="sm" variant="outline" onClick={() => setBio(generatedBio)}>
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
                      <Button size="sm" variant="ghost" onClick={addLink}>
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
