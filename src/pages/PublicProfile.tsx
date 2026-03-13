import { useParams } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";

type Profile = Tables<"profiles">;
type Link = Tables<"links">;
type Theme = string;

const themeStyles: Record<string, { bg: string; fg: string; btn: string; btnHover: string; featured: string }> = {
  dark: {
    bg: "bg-[hsl(var(--bio-dark-bg))]",
    fg: "text-[hsl(var(--bio-dark-fg))]",
    btn: "bg-[hsl(var(--bio-dark-btn))] text-[hsl(var(--bio-dark-fg))]",
    btnHover: "hover:bg-[hsl(var(--bio-dark-accent))] hover:text-[hsl(var(--bio-dark-bg))]",
    featured: "bg-[hsl(var(--bio-dark-accent))] text-[hsl(var(--bio-dark-bg))]",
  },
  gradient: {
    bg: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]",
    fg: "text-[hsl(var(--bio-gradient-fg))]",
    btn: "bg-[hsl(var(--bio-gradient-btn))]/60 text-[hsl(var(--bio-gradient-fg))] backdrop-blur",
    btnHover: "hover:bg-[hsl(var(--bio-gradient-accent))] hover:text-[hsl(var(--bio-gradient-fg))]",
    featured: "bg-[hsl(var(--bio-gradient-accent))] text-[hsl(var(--bio-gradient-fg))]",
  },
  minimal: {
    bg: "bg-[hsl(var(--bio-minimal-bg))]",
    fg: "text-[hsl(var(--bio-minimal-fg))]",
    btn: "bg-[hsl(var(--bio-minimal-btn))] text-[hsl(var(--bio-minimal-fg))]",
    btnHover: "hover:bg-[hsl(var(--bio-minimal-accent))] hover:text-[hsl(var(--bio-minimal-bg))]",
    featured: "bg-[hsl(var(--bio-minimal-accent))] text-[hsl(var(--bio-minimal-bg))]",
  },
  glass: {
    bg: "bg-gradient-to-br from-[hsl(210,40%,15%)] to-[hsl(220,30%,25%)]",
    fg: "text-[hsl(0,0%,96%)]",
    btn: "bg-[hsl(0,0%,100%)]/10 text-[hsl(0,0%,96%)] backdrop-blur-md border border-[hsl(0,0%,100%)]/20",
    btnHover: "hover:bg-[hsl(0,0%,100%)]/20",
    featured: "bg-[hsl(142,72%,50%)] text-[hsl(0,0%,3%)]",
  },
};

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (!profileData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(profileData);
      const { data: linksData } = await supabase
        .from("links")
        .select("*")
        .eq("profile_id", profileData.id)
        .order("position");
      setLinks(linksData || []);
      setLoading(false);
    };
    fetchProfile();
  }, [username]);

  const handleClick = async (linkId: string, url: string) => {
    await supabase.rpc("record_click", { p_link_id: linkId, p_referrer: document.referrer || "" });
    window.open(url, "_blank", "noopener");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        <p>Profile not found</p>
      </div>
    );
  }

  const t = themeStyles[profile.theme || "dark"] || themeStyles.dark;

  return (
    <div className={`min-h-screen ${t.bg} ${t.fg} flex justify-center`}>
      <div className="w-full max-w-md px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-8">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name || ""} className="w-20 h-20 rounded-full object-cover border-2 border-current/20 mb-4" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-muted/20 border-2 border-current/20 flex items-center justify-center text-3xl mb-4">
              👤
            </div>
          )}
          <h1 className="font-display text-xl font-bold">{profile.name || username}</h1>
          {profile.bio && <p className="text-sm opacity-70 mt-1 text-center">{profile.bio}</p>}
        </motion.div>

        <div className="space-y-3">
          {links.map((link, i) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleClick(link.id, link.url)}
              className={`block w-full py-3.5 px-4 rounded-xl text-center text-sm font-medium transition-all duration-200 cursor-pointer ${
                link.featured ? `${t.featured} font-bold shadow-lg` : `${t.btn} ${t.btnHover}`
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {link.featured && <Star className="h-4 w-4" />}
                {link.title}
                <ExternalLink className="h-3 w-3 opacity-50" />
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs opacity-40">Powered by BioForge</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
