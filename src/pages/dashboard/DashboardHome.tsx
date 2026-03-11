import { BarChart3, ExternalLink, Link2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Total Clicks", value: "922", icon: BarChart3 },
  { label: "Active Links", value: "4", icon: Link2 },
];

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="h-4 w-4 text-primary" />
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
            <p className="text-3xl font-display font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          to="/dashboard/bio"
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <Link2 className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">Edit Bio Page</p>
          <p className="text-xs text-muted-foreground">Add links, update bio</p>
        </Link>
        <Link
          to="/dashboard/analytics"
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <BarChart3 className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">View Analytics</p>
          <p className="text-xs text-muted-foreground">Track link clicks</p>
        </Link>
        <Link
          to="/dashboard/ai"
          className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
        >
          <Sparkles className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium">AI Tools</p>
          <p className="text-xs text-muted-foreground">Generate bios & suggestions</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
