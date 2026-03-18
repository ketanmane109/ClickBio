import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, GripVertical, Star, Copy, Upload, Eye } from "lucide-react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "framer-motion";
import UpgradeModal from "@/components/UpgradeModal";

const BioPageEditor = () => {
  const { profile, links, loading, updateProfile, addLink, updateLink, deleteLink, reorderLinks, uploadAvatar } = useProfile();
  const { isPro } = useSubscription();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Debounce helper
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const debouncedUpdate = useCallback((key: string, fn: () => void) => {
    if (debounceTimers.current[key]) clearTimeout(debounceTimers.current[key]);
    debounceTimers.current[key] = setTimeout(fn, 300);
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  if (!profile) return <p className="text-muted-foreground">Profile not found</p>;

  const maxLinks = isPro ? Infinity : 5;
  const canAddLink = links.length < maxLinks;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(links);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    reorderLinks(items);
  };

  const copyPageLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
    toast.success("Page link copied!");
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadAvatar(file);
    if (url) toast.success("Avatar uploaded!");
    else toast.error("Upload failed");
  };

  const handleAddLink = () => {
    if (!canAddLink) { setShowUpgrade(true); return; }
    addLink();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Bio Builder</h1>
        <div className="flex gap-2">
          {profile.username && (
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="h-3.5 w-3.5 mr-1" /> {showPreview ? "Editor" : "Preview"}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={copyPageLink}>
            <Copy className="h-3.5 w-3.5 mr-1" /> Copy Link
          </Button>
        </div>
      </div>

      {showPreview && profile.username ? (
        <div className="rounded-xl border border-border overflow-hidden" style={{ height: "600px" }}>
          <iframe src={`/${profile.username}`} className="w-full h-full" title="Live Preview" />
        </div>
      ) : (
        <>
          {/* Avatar */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-1.5 block">Profile Photo</label>
            <div className="flex items-center gap-4">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full object-cover border border-border" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl">👤</div>
              )}
              <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                <Upload className="h-3.5 w-3.5 mr-1" /> Upload
              </Button>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Display Name</label>
              <Input
                value={profile.name || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  debouncedUpdate("name", () => updateProfile({ name: val }));
                }}
                defaultValue={profile.name || ""}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Bio</label>
              <Textarea
                defaultValue={profile.bio || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  debouncedUpdate("bio", () => updateProfile({ bio: val }));
                }}
                rows={2}
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold">
              Your Links {!isPro && <span className="text-xs text-muted-foreground">({links.length}/{maxLinks})</span>}
            </h3>
            <Button size="sm" onClick={handleAddLink}>
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
                        <div ref={provided.innerRef} {...provided.draggableProps} className="rounded-xl border border-border bg-card p-4">
                          <div className="flex items-start gap-3">
                            <div {...provided.dragHandleProps} className="pt-2.5 text-muted-foreground cursor-grab">
                              <GripVertical className="h-4 w-4" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <Input
                                defaultValue={link.title}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  debouncedUpdate(`title-${link.id}`, () => updateLink(link.id, { title: val }));
                                }}
                                placeholder="Link title"
                                className="font-medium"
                              />
                              <Input
                                defaultValue={link.url}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  debouncedUpdate(`url-${link.id}`, () => updateLink(link.id, { url: val }));
                                }}
                                placeholder="https://..."
                                className="text-sm"
                              />
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Star className={`h-3.5 w-3.5 ${link.featured ? "text-primary" : "text-muted-foreground"}`} />
                                  <label className="text-xs text-muted-foreground">Featured</label>
                                  <Switch checked={link.featured} onCheckedChange={(v) => updateLink(link.id, { featured: v })} />
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => deleteLink(link.id)} className="h-8 w-8">
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

          {links.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">No links yet. Click "Add Link" to get started.</p>
            </div>
          )}
        </>
      )}

      <UpgradeModal open={showUpgrade} onOpenChange={setShowUpgrade} />
    </motion.div>
  );
};

export default BioPageEditor;
