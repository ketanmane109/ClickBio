import { useParams } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { motion } from "framer-motion";

type Profile = Tables<"profiles">;
type Link = Tables<"links">;

import { themeStyles } from "@/utils/themes";

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
      className={`min-h-screen ${t.bg} ${t.fg} flex justify-center overflow-x-hidden relative`}
      style={profile.background_image ? {
        backgroundImage: `url(${profile.background_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      } : undefined}
    >
      {/* Decorative blurred blobs for gradient themes */}
      {(!profile.background_image && profile.theme?.includes('gradient')) && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[120px] pointer-events-none" />
        </>
      )}

      {profile.background_image && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}
      <div className="w-full max-w-[600px] px-6 py-16 relative z-10 flex flex-col min-h-screen">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="flex flex-col items-center mb-10">
          
          {/* Animated Profile Ring */}
          <div className="relative group mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
            <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.name || ""} className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-4xl">👤</div>
              )}
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight">{profile.name || username}</h1>
          <p className="text-sm font-medium opacity-70 mt-1 mb-3">@{username}</p>
          {profile.bio && <p className="text-base opacity-80 mt-2 text-center max-w-sm leading-relaxed">{profile.bio}</p>}
        </motion.div>

        <div className="space-y-4 flex-1 w-full max-w-md mx-auto">
          {featuredLink && (
            <motion.button
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              onClick={() => handleClick(featuredLink.id, featuredLink.url)}
              className={`group relative flex w-full items-center justify-center py-4 px-6 rounded-2xl text-center text-[15px] font-semibold transition-all duration-300 cursor-pointer overflow-hidden ${t.featured}`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Star className="h-5 w-5 animate-pulse" /> {featuredLink.title}
              </span>
              <div className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <ExternalLink className="h-4 w-4" />
              </div>
            </motion.button>
          )}

          {regularLinks.map((link, i) => (
            <motion.button
              key={link.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.05), duration: 0.5 }}
              onClick={() => handleClick(link.id, link.url)}
              className={`group relative flex w-full items-center justify-center py-4 px-6 rounded-2xl text-center text-[15px] font-medium transition-all duration-300 cursor-pointer overflow-hidden ${t.btn} ${t.btnHover}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {link.title}
              </span>
              <div className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <ExternalLink className="h-4 w-4 opacity-70" />
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-16 text-center pb-8"
        >
          {showAd && (
            <div className="mb-8 rounded-2xl border border-current/10 bg-current/5 px-6 py-5 backdrop-blur-sm max-w-sm mx-auto transition-transform hover:scale-[1.02]">
              <div className="w-10 h-10 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-3">
                 <img src="/logo.svg" alt="ClickBio" className="w-5 h-5 opacity-80 object-contain" />
              </div>
              <p className="text-sm font-semibold opacity-90 mb-1">Create your own link in bio</p>
              <p className="text-xs opacity-60 mb-3">Join thousands of creators using ClickBio.</p>
              <a href="/" className="inline-block px-4 py-2 rounded-full bg-white text-black text-xs font-bold shadow-sm hover:shadow-md transition-shadow">Get started for free</a>
            </div>
          )}
          <a href="/" className="inline-flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <img src="/logo.svg" alt="ClickBio Logo" className="w-4 h-4 opacity-70 object-contain" />
            <span className={`text-xs font-semibold tracking-widest uppercase ${t.fg}`}>ClickBio</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicProfile;
