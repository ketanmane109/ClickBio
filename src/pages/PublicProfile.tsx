import { useParams } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";

type Profile = Tables<"profiles">;
type Link = Tables<"links">;

const themeStyles: Record<string, { bg: string; fg: string; btn: string; btnHover: string; featured: string }> = {
  dark: {
    bg: "bg-[hsl(0,0%,5%)]", fg: "text-[hsl(0,0%,96%)]",
    btn: "bg-[hsl(0,0%,14%)] text-[hsl(0,0%,96%)]", btnHover: "hover:bg-[hsl(142,72%,50%)] hover:text-[hsl(0,0%,3%)]",
    featured: "bg-[hsl(142,72%,50%)] text-[hsl(0,0%,3%)]",
  },
  minimal: {
    bg: "bg-[hsl(0,0%,98%)]", fg: "text-[hsl(0,0%,10%)]",
    btn: "bg-[hsl(0,0%,92%)] text-[hsl(0,0%,10%)]", btnHover: "hover:bg-[hsl(0,0%,10%)] hover:text-[hsl(0,0%,98%)]",
    featured: "bg-[hsl(0,0%,10%)] text-[hsl(0,0%,98%)]",
  },
  gradient: {
    bg: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]", fg: "text-[hsl(0,0%,100%)]",
    btn: "bg-[hsl(270,50%,35%)]/60 text-[hsl(0,0%,100%)] backdrop-blur", btnHover: "hover:bg-[hsl(300,70%,60%)]",
    featured: "bg-[hsl(300,70%,60%)] text-[hsl(0,0%,100%)]",
  },
  glass: {
    bg: "bg-gradient-to-br from-[hsl(210,40%,15%)] to-[hsl(220,30%,25%)]", fg: "text-[hsl(0,0%,96%)]",
    btn: "bg-[hsl(0,0%,100%)]/10 text-[hsl(0,0%,96%)] backdrop-blur-md border border-[hsl(0,0%,100%)]/20", btnHover: "hover:bg-[hsl(0,0%,100%)]/20",
    featured: "bg-[hsl(142,72%,50%)] text-[hsl(0,0%,3%)]",
  },
  neon: {
    bg: "bg-[hsl(260,100%,5%)]", fg: "text-[hsl(280,100%,70%)]",
    btn: "bg-[hsl(280,100%,20%)] text-[hsl(280,100%,70%)] border border-[hsl(280,100%,50%)]/30", btnHover: "hover:bg-[hsl(280,100%,50%)] hover:text-[hsl(0,0%,100%)]",
    featured: "bg-[hsl(280,100%,60%)] text-[hsl(0,0%,100%)] shadow-[0_0_20px_hsl(280,100%,60%)]",
  },
  pastel: {
    bg: "bg-[hsl(330,50%,95%)]", fg: "text-[hsl(330,30%,25%)]",
    btn: "bg-[hsl(330,40%,88%)] text-[hsl(330,30%,25%)]", btnHover: "hover:bg-[hsl(330,50%,80%)]",
    featured: "bg-[hsl(330,60%,65%)] text-[hsl(0,0%,100%)]",
  },
  clean: {
    bg: "bg-[hsl(0,0%,100%)]", fg: "text-[hsl(0,0%,15%)]",
    btn: "bg-[hsl(0,0%,96%)] text-[hsl(0,0%,15%)] border border-[hsl(0,0%,88%)]", btnHover: "hover:bg-[hsl(0,0%,90%)]",
    featured: "bg-[hsl(0,0%,15%)] text-[hsl(0,0%,100%)]",
  },
  bold: {
    bg: "bg-[hsl(0,80%,50%)]", fg: "text-[hsl(0,0%,100%)]",
    btn: "bg-[hsl(0,0%,100%)]/20 text-[hsl(0,0%,100%)] border border-[hsl(0,0%,100%)]/30", btnHover: "hover:bg-[hsl(0,0%,100%)] hover:text-[hsl(0,80%,50%)]",
    featured: "bg-[hsl(0,0%,100%)] text-[hsl(0,80%,50%)] font-bold",
  },
  instagram: {
    bg: "bg-gradient-to-br from-[hsl(45,100%,55%)] via-[hsl(340,80%,55%)] to-[hsl(280,80%,55%)]", fg: "text-[hsl(0,0%,100%)]",
    btn: "bg-[hsl(0,0%,100%)]/25 text-[hsl(0,0%,100%)] backdrop-blur-md", btnHover: "hover:bg-[hsl(0,0%,100%)]/40",
    featured: "bg-[hsl(0,0%,100%)] text-[hsl(340,80%,45%)]",
  },
  gold: {
    bg: "bg-[hsl(40,30%,10%)]", fg: "text-[hsl(45,80%,60%)]",
    btn: "bg-[hsl(45,50%,20%)] text-[hsl(45,80%,60%)] border border-[hsl(45,80%,40%)]/30", btnHover: "hover:bg-[hsl(45,80%,50%)] hover:text-[hsl(40,30%,10%)]",
    featured: "bg-gradient-to-r from-[hsl(45,80%,50%)] to-[hsl(35,90%,55%)] text-[hsl(40,30%,10%)]",
  },
};

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;
      const { data: profileData } = await supabase
        .from("profiles").select("*").eq("username", username).single();
      if (!profileData) { setNotFound(true); setLoading(false); return; }
      setProfile(profileData);

      // Check if user is on free plan (show ads)
      const { data: sub } = await supabase
        .from("subscriptions").select("plan, status").eq("user_id", profileData.user_id).single();
      const isPaid = sub && (sub.plan === "basic" || sub.plan === "pro") && sub.status === "active";
      setShowAd(!isPaid);

      const { data: linksData } = await supabase
        .from("links").select("*").eq("profile_id", profileData.id).order("position");
      setLinks(linksData || []);
      setLoading(false);
    };
    fetchProfile();
  }, [username]);

  const handleClick = async (linkId: string, url: string) => {
    await supabase.rpc("record_click", { p_link_id: linkId, p_referrer: document.referrer || "" });
    window.open(url, "_blank", "noopener");
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;
  if (notFound || !profile) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground"><p>Profile not found</p></div>;

  const t = themeStyles[profile.theme || "dark"] || themeStyles.dark;
  const featuredLink = links.find((l) => l.featured);
  const regularLinks = links.filter((l) => !l.featured);

  return (
    <div
      className={`min-h-screen ${t.bg} ${t.fg} flex justify-center`}
      style={profile.background_image ? {
        backgroundImage: `url(${profile.background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      } : undefined}
    >
      {profile.background_image && <div className="absolute inset-0 bg-black/40" />}
      <div className="w-full max-w-md px-6 py-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center mb-8">
          {profile.avatar_url ? (
            <img src={profile.avatar_url} alt={profile.name || ""} className="w-24 h-24 rounded-full object-cover border-2 border-current/20 mb-4 shadow-lg" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-current/10 border-2 border-current/20 flex items-center justify-center text-4xl mb-4">👤</div>
          )}
          <h1 className="font-display text-xl font-bold">{profile.name || username}</h1>
          {profile.bio && <p className="text-sm opacity-70 mt-1 text-center max-w-xs">{profile.bio}</p>}
        </motion.div>

        {featuredLink && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            onClick={() => handleClick(featuredLink.id, featuredLink.url)}
            className={`block w-full py-4 px-4 rounded-xl text-center text-sm font-bold transition-all duration-200 cursor-pointer mb-4 shadow-lg ${t.featured}`}
          >
            <span className="flex items-center justify-center gap-2">
              <Star className="h-4 w-4" /> {featuredLink.title} <ExternalLink className="h-3 w-3 opacity-50" />
            </span>
          </motion.button>
        )}

        <div className="space-y-3">
          {regularLinks.map((link, i) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => handleClick(link.id, link.url)}
              className={`block w-full py-3.5 px-4 rounded-xl text-center text-sm font-medium transition-all duration-200 cursor-pointer ${t.btn} ${t.btnHover}`}
            >
              <span className="flex items-center justify-center gap-2">
                {link.title} <ExternalLink className="h-3 w-3 opacity-50" />
              </span>
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center">
          {showAd && (
            <div className="mb-4 rounded-lg border border-current/10 bg-current/5 px-4 py-3">
              <p className="text-xs opacity-50 mb-1">Advertisement</p>
              <p className="text-sm font-medium opacity-70">Create your own bio page for free</p>
              <a href="/" className="text-xs text-primary underline opacity-80">Get started with BioSpark →</a>
            </div>
          )}
          <p className="text-xs opacity-40">Powered by BioSpark</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;