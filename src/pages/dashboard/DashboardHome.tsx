import { BarChart3, Link2, CreditCard, LayoutTemplate, Settings, ExternalLink, ArrowUpRight, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DashboardHome = () => {
  const { profile, links, loading } = useProfile();
  const { plan, isPaid } = useSubscription();
  const [copied, setCopied] = useState(false);

  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0);
  const topLinks = [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 3);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const planLabel = plan === "pro" ? "🚀 Pro" : plan === "basic" ? "⭐ Standard" : "Free";

  let completionScore = 20; // base score for signing up
  if (profile?.username) completionScore += 20;
  if (profile?.avatar_url) completionScore += 20;
  if (profile?.bio) completionScore += 20;
  if (links.length > 0) completionScore += 20;

  const profileUrl = profile?.username ? `https://clickbio.in/${profile.username}` : "";

  const copyLink = () => {
    if (!profileUrl) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10 max-w-5xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">Welcome back, {profile?.name?.split(' ')[0] || "Creator"}! 👋</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            You are on the <span className="font-semibold text-foreground bg-primary/10 px-2 py-0.5 rounded-md text-xs">{planLabel}</span> plan.
          </p>
        </div>
        
        {profileUrl && (
          <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-xl border border-border/50">
            <span className="text-sm text-muted-foreground pl-3 truncate max-w-[200px]">{profileUrl.replace('https://', '')}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background shadow-sm rounded-lg" onClick={copyLink}>
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button variant="default" size="sm" className="h-8 rounded-lg shadow-sm" asChild>
              <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                Visit <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-lg"><BarChart3 className="h-5 w-5 text-blue-500" /></div>
            <p className="text-sm font-semibold text-muted-foreground">Total Clicks</p>
          </div>
          <p className="text-4xl font-display font-bold">{totalClicks.toLocaleString()}</p>
        </div>
        
        <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500/10 rounded-lg"><Link2 className="h-5 w-5 text-purple-500" /></div>
            <p className="text-sm font-semibold text-muted-foreground">Active Links</p>
          </div>
          <p className="text-4xl font-display font-bold">{links.length}</p>
        </div>

        {/* Profile Completion */}
        <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-transparent p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">Profile Setup</span>
            </div>
            <span className="text-sm font-bold text-primary">{completionScore}%</span>
          </div>
          <Progress value={completionScore} className="h-2 mb-3 bg-primary/10" />
          {completionScore < 100 && (
            <p className="text-xs text-muted-foreground mt-2">
              {!profile?.avatar_url ? "Add a profile picture" : !profile?.bio ? "Add a short bio" : "Add more links"} to complete your profile.
            </p>
          )}
          {completionScore === 100 && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-2">Looking good! Your profile is complete.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-display font-bold flex items-center gap-2">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/dashboard/bio" className="group rounded-2xl border border-border/50 bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0"><ArrowUpRight className="h-5 w-5 text-primary" /></div>
              <div className="p-2.5 bg-primary/10 rounded-xl w-max mb-4"><Link2 className="h-5 w-5 text-primary" /></div>
              <p className="font-semibold text-lg mb-1">Manage Links</p>
              <p className="text-sm text-muted-foreground">Add or organize your bio links</p>
            </Link>
            
            <Link to="/dashboard/themes" className="group rounded-2xl border border-border/50 bg-card p-5 hover:border-emerald-500/50 hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0"><ArrowUpRight className="h-5 w-5 text-emerald-500" /></div>
              <div className="p-2.5 bg-emerald-500/10 rounded-xl w-max mb-4"><LayoutTemplate className="h-5 w-5 text-emerald-500" /></div>
              <p className="font-semibold text-lg mb-1">Change Theme</p>
              <p className="text-sm text-muted-foreground">Customize your page design</p>
            </Link>

            <Link to="/dashboard/analytics" className="group rounded-2xl border border-border/50 bg-card p-5 hover:border-blue-500/50 hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0"><ArrowUpRight className="h-5 w-5 text-blue-500" /></div>
              <div className="p-2.5 bg-blue-500/10 rounded-xl w-max mb-4"><BarChart3 className="h-5 w-5 text-blue-500" /></div>
              <p className="font-semibold text-lg mb-1">View Analytics</p>
              <p className="text-sm text-muted-foreground">See how your links perform</p>
            </Link>

            <Link to="/dashboard/settings" className="group rounded-2xl border border-border/50 bg-card p-5 hover:border-purple-500/50 hover:shadow-lg transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0"><ArrowUpRight className="h-5 w-5 text-purple-500" /></div>
              <div className="p-2.5 bg-purple-500/10 rounded-xl w-max mb-4"><Settings className="h-5 w-5 text-purple-500" /></div>
              <p className="font-semibold text-lg mb-1">Settings</p>
              <p className="text-sm text-muted-foreground">Manage profile and account</p>
            </Link>
          </div>
        </div>

        {/* Recent Performance */}
        <div className="space-y-4">
          <h2 className="text-xl font-display font-bold flex items-center gap-2">Top Links</h2>
          <div className="rounded-2xl border border-border/50 bg-card p-5">
            {topLinks.length > 0 ? (
              <div className="space-y-4">
                {topLinks.map((link, i) => (
                  <div key={link.id} className="flex items-center justify-between gap-3 border-b border-border/40 last:border-0 pb-3 last:pb-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-foreground">{link.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                    </div>
                    <div className="bg-primary/5 text-primary px-2.5 py-1 rounded-lg text-xs font-bold border border-primary/10">
                      {link.clicks || 0}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Link2 className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No link data yet.</p>
                <Link to="/dashboard/bio" className="text-primary text-sm hover:underline mt-1 block">Add your first link</Link>
              </div>
            )}
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default DashboardHome;