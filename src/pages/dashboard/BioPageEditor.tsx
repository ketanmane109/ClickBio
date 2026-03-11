import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical, Star, Copy } from "lucide-react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";

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

const BioPageEditor = () => {
  const [links, setLinks] = useState<BioLink[]>(initialLinks);
  const [name, setName] = useState("Ketan");
  const [bio, setBio] = useState("Creator · Builder · Helping you grow online 🚀");

  const addLink = () => {
    setLinks([...links, { id: Date.now().toString(), title: "New Link", url: "", clicks: 0, featured: false }]);
  };

  const removeLink = (id: string) => setLinks(links.filter((l) => l.id !== id));

  const updateLink = (id: string, field: keyof BioLink, value: string | boolean) => {
    setLinks(links.map((l) => {
      if (l.id === id) {
        if (field === "featured" && value === true) return { ...l, featured: true };
        return { ...l, [field]: value };
      }
      if (field === "featured" && value === true) return { ...l, featured: false };
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

  const copyPageLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/ketan`);
    toast.success("Page link copied!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">My Bio Page</h1>
        <Button variant="outline" size="sm" onClick={copyPageLink}>
          <Copy className="h-3.5 w-3.5 mr-1" /> Copy Link
        </Button>
      </div>

      <div className="space-y-4 mb-8">
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
    </div>
  );
};

export default BioPageEditor;
