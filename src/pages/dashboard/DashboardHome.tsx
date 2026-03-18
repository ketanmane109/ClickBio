import { BarChart3, Link2, Sparkles, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "framer-motion";

const DashboardHome = () => {
  const { profile, links, loading } = useProfile();
  const { isPro } = useSubscription();
  const totalClicks = links.reduce((s, l) => s + l.clicks, 0);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Welcome, {profile?.name || "Creator"}! {isPro ? "🚀 Pro Plan" : "Free Plan"}</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">Total Clicks</p>
          </div>
          <p className="text-3xl font-display font-bold">{totalClicks}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">Active Links</p>
          </div>
          <p className="text-3xl font-display font-bold">{links.length}</p>
        </div>
      </div>

      <h2 className="font-display font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link to="/dashboard/bio" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <Link2 className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">Bio Builder</p>
          <p className="text-xs text-muted-foreground">Add links, update bio</p>
        </Link>
        <Link to="/dashboard/analytics" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <BarChart3 className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">Analytics</p>
          <p className="text-xs text-muted-foreground">Track link clicks</p>
        </Link>
        <Link to="/dashboard/ai" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <Sparkles className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">AI Tools</p>
          <p className="text-xs text-muted-foreground">{isPro ? "Generate content" : "Pro only"}</p>
        </Link>
        <Link to="/dashboard/pricing" className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors">
          <CreditCard className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">{isPro ? "Manage Plan" : "Upgrade to Pro"}</p>
          <p className="text-xs text-muted-foreground">{isPro ? "You're on Pro" : "Unlock all features"}</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
