import { useParams } from "react-router-dom";
import { ExternalLink, Play, Star } from "lucide-react";
import { useState } from "react";

type Theme = "dark" | "gradient" | "minimal";

const sampleProfiles: Record<string, {
  name: string;
  bio: string;
  avatar: string;
  links: { title: string; url: string; featured?: boolean }[];
  youtubeEmbed?: string;
  theme: Theme;
}> = {
  ketan: {
    name: "Ketan",
    bio: "Creator · Builder · Helping you grow online 🚀",
    avatar: "🚀",
    links: [
      { title: "My Portfolio", url: "#" },
      { title: "YouTube Channel", url: "#" },
      { title: "Free Newsletter", url: "#", featured: true },
      { title: "Book a Call", url: "#" },
      { title: "My Course", url: "#" },
    ],
    youtubeEmbed: "dQw4w9WgXcQ",
    theme: "dark",
  },
};

const themeStyles: Record<Theme, { bg: string; fg: string; btn: string; btnHover: string; accent: string; featured: string }> = {
  dark: {
    bg: "bg-[hsl(var(--bio-dark-bg))]",
    fg: "text-[hsl(var(--bio-dark-fg))]",
    btn: "bg-[hsl(var(--bio-dark-btn))] text-[hsl(var(--bio-dark-fg))]",
    btnHover: "hover:bg-[hsl(var(--bio-dark-accent))] hover:text-[hsl(var(--bio-dark-bg))]",
    accent: "text-[hsl(var(--bio-dark-accent))]",
    featured: "bg-[hsl(var(--bio-dark-accent))] text-[hsl(var(--bio-dark-bg))]",
  },
  gradient: {
    bg: "bg-gradient-to-br from-[hsl(270,60%,20%)] to-[hsl(300,50%,15%)]",
    fg: "text-[hsl(var(--bio-gradient-fg))]",
    btn: "bg-[hsl(var(--bio-gradient-btn))]/60 text-[hsl(var(--bio-gradient-fg))] backdrop-blur",
    btnHover: "hover:bg-[hsl(var(--bio-gradient-accent))] hover:text-[hsl(var(--bio-gradient-fg))]",
    accent: "text-[hsl(var(--bio-gradient-accent))]",
    featured: "bg-[hsl(var(--bio-gradient-accent))] text-[hsl(var(--bio-gradient-fg))]",
  },
  minimal: {
    bg: "bg-[hsl(var(--bio-minimal-bg))]",
    fg: "text-[hsl(var(--bio-minimal-fg))]",
    btn: "bg-[hsl(var(--bio-minimal-btn))] text-[hsl(var(--bio-minimal-fg))]",
    btnHover: "hover:bg-[hsl(var(--bio-minimal-accent))] hover:text-[hsl(var(--bio-minimal-bg))]",
    accent: "text-[hsl(var(--bio-minimal-accent))]",
    featured: "bg-[hsl(var(--bio-minimal-accent))] text-[hsl(var(--bio-minimal-bg))]",
  },
};

const PublicProfile = () => {
  const { username } = useParams<{ username: string }>();
  const profile = sampleProfiles[username || ""] || sampleProfiles.ketan;
  const [currentTheme] = useState<Theme>(profile.theme);
  const t = themeStyles[currentTheme];

  return (
    <div className={`min-h-screen ${t.bg} ${t.fg} flex justify-center`}>
      <div className="w-full max-w-md px-6 py-12">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-muted/20 border-2 border-current/20 flex items-center justify-center text-3xl mb-4">
            {profile.avatar}
          </div>
          <h1 className="font-display text-xl font-bold">{profile.name}</h1>
          <p className="text-sm opacity-70 mt-1 text-center">{profile.bio}</p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {profile.links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              className={`block w-full py-3.5 px-4 rounded-xl text-center text-sm font-medium transition-all duration-200 ${
                link.featured
                  ? `${t.featured} font-bold shadow-lg`
                  : `${t.btn} ${t.btnHover}`
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {link.featured && <Star className="h-4 w-4" />}
                {link.title}
                <ExternalLink className="h-3 w-3 opacity-50" />
              </span>
            </a>
          ))}
        </div>

        {/* YouTube Embed */}
        {profile.youtubeEmbed && (
          <div className="mt-8 rounded-xl overflow-hidden aspect-video bg-muted/10">
            <iframe
              src={`https://www.youtube.com/embed/${profile.youtubeEmbed}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded video"
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs opacity-40">Powered by BioStack</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
