import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";

export type Profile = Tables<"profiles">;
export type Link = Tables<"links">;

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    setProfile(data);
    if (data) {
      const { data: linksData } = await supabase
        .from("links")
        .select("*")
        .eq("profile_id", data.id)
        .order("position");
      setLinks(linksData || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return;
    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profile.id);
    if (!error) setProfile({ ...profile, ...updates });
    return error;
  };

  const addLink = async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from("links")
      .insert({ profile_id: profile.id, title: "New Link", url: "", position: links.length })
      .select()
      .single();
    if (data) setLinks([...links, data]);
    return error;
  };

  const updateLink = async (id: string, updates: Partial<Link>) => {
    // If setting featured, unfeatured others first
    if (updates.featured) {
      await supabase.from("links").update({ featured: false }).eq("profile_id", profile!.id);
      setLinks((prev) => prev.map((l) => ({ ...l, featured: l.id === id })));
    }
    const { error } = await supabase.from("links").update(updates).eq("id", id);
    if (!error) {
      setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
    }
    return error;
  };

  const deleteLink = async (id: string) => {
    const { error } = await supabase.from("links").delete().eq("id", id);
    if (!error) setLinks((prev) => prev.filter((l) => l.id !== id));
    return error;
  };

  const reorderLinks = async (reordered: Link[]) => {
    setLinks(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await supabase.from("links").update({ position: i }).eq("id", reordered[i].id);
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user || !profile) return null;
    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file);
    if (error) return null;
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    await updateProfile({ avatar_url: publicUrl });
    return publicUrl;
  };

  const uploadBackground = async (file: File) => {
    if (!user || !profile) return null;
    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("backgrounds").upload(path, file);
    if (error) return null;
    const { data: { publicUrl } } = supabase.storage.from("backgrounds").getPublicUrl(path);
    await updateProfile({ background_image: publicUrl });
    return publicUrl;
  };

  return { profile, links, loading, updateProfile, addLink, updateLink, deleteLink, reorderLinks, uploadAvatar, uploadBackground, refetch: fetchProfile };
}
