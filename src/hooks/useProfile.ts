import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Tables } from "@/integrations/supabase/types";
import { themeStyles } from "@/utils/themes";

const getErrorMessage = (err: unknown): string =>
  err instanceof Error ? err.message : typeof err === "string" ? err : "An unexpected error occurred";

export type Profile = Tables<"profiles">;
export type Link = Tables<"links">;

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLinks([]);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (fetchError) throw fetchError;

      if (!data) {
        // Auto-create profile if not found
        console.log("Profile not found, auto-creating...");
        const { error: createError } = await supabase
          .from("profiles")
          .insert({
            user_id: user.id,
            username: user.email ? user.email.split('@')[0].replace(/\./g, '') : 'user',
            name: user.email ? user.email.split('@')[0] : 'User',
          });
        
        if (createError) throw createError;

        // Refetch after creation
        const { data: newData, error: refetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (refetchError) throw refetchError;
        setProfile(newData);
        
        // No links for new profile
        setLinks([]);
      } else {
        setProfile(data);
        
        // AUTO-MIGRATE LEGACY/INVALID THEMES
        if (data.theme && !themeStyles[data.theme]) {
          console.log(`Migrating invalid theme "${data.theme}" to "minimal-light"`);
          // Fire-and-forget local state correction and remote DB fix
          supabase.from("profiles").update({ theme: "minimal-light" }).eq("id", data.id).then(({ error }) => {
            if (!error) {
              setProfile(prev => prev ? { ...prev, theme: "minimal-light" } : prev);
            }
          });
        }
        
        // Fetch links
        const { data: linksData, error: linksError } = await supabase
          .from("links")
          .select("*")
          .eq("profile_id", data.id)
          .order("position");
        
        if (linksError) console.error("Links fetch failed:", linksError);
        else setLinks(linksData || []);
      }
    } catch (err: unknown) {
      console.error("Profile fetch/create failed:", err);
      const message = getErrorMessage(err);
      setError(message);
      setProfile(null);
      setLinks([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return { error: "No profile" };
    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", profile.id);
      
      if (error) throw error;
      
      setProfile({ ...profile, ...updates });
      setError(null);
      return null;
    } catch (err: unknown) {
      console.error("Profile update failed:", err);
      const message = getErrorMessage(err);
      setError(message);
      return { error: message };
    }
  };

  const addLink = async (): Promise<{ error: string } | null> => {
    if (!profile) return { error: "No profile" };
    try {
      const { data, error } = await supabase
        .from("links")
        .insert({ profile_id: profile.id, title: "New Link", url: "", position: links.length })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) setLinks([...links, data as Link]);
      return null;
    } catch (err: unknown) {
      console.error("Add link failed:", err);
      return { error: getErrorMessage(err) };
    }
  };

  const updateLink = async (id: string, updates: Partial<Link>) => {
    try {
      // If setting featured, unfeature others first
      if (updates.featured) {
        await supabase.from("links").update({ featured: false }).eq("profile_id", profile!.id);
        setLinks((prev) => prev.map((l) => ({ ...l, featured: l.id === id })));
      }
      
      const { error } = await supabase.from("links").update(updates).eq("id", id);
      
      if (error) throw error;
      
      setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
      return null;
    } catch (err: unknown) {
      console.error("Update link failed:", err);
      return { error: getErrorMessage(err) };
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase.from("links").delete().eq("id", id);
      if (error) throw error;
      
      setLinks((prev) => prev.filter((l) => l.id !== id));
      return null;
    } catch (err: unknown) {
      console.error("Delete link failed:", err);
      return { error: getErrorMessage(err) };
    }
  };

  const reorderLinks = async (reordered: Link[]) => {
    try {
      setLinks(reordered);
      for (let i = 0; i < reordered.length; i++) {
        await supabase.from("links").update({ position: i }).eq("id", reordered[i].id);
      }
      return null;
    } catch (err: unknown) {
      console.error("Reorder links failed:", err);
      return { error: getErrorMessage(err) };
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user || !profile) return null;
    try {
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
      await updateProfile({ avatar_url: publicUrl });
      return publicUrl;
    } catch (err: unknown) {
      console.error("Avatar upload failed:", err);
      return null;
    }
  };

  const uploadBackground = async (file: File) => {
    if (!user || !profile) return null;
    try {
      const path = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from("backgrounds").upload(path, file);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from("backgrounds").getPublicUrl(path);
      await updateProfile({ background_image: publicUrl });
      return publicUrl;
    } catch (err: unknown) {
      console.error("Background upload failed:", err);
      return null;
    }
  };

  return { 
    profile, 
    links, 
    loading, 
    error,
    updateProfile, 
    addLink, 
    updateLink, 
    deleteLink, 
    reorderLinks, 
    uploadAvatar, 
    uploadBackground, 
    refetch: fetchProfile 
  };
}

