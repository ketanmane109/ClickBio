import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const AnalyticsPage = () => {
  const { profile, links, loading } = useProfile();
  const [dailyData, setDailyData] = useState<{ day: string; clicks: number }[]>([]);

  useEffect(() => {
    if (!profile) return;
    const fetchAnalytics = async () => {
      const linkIds = links.map((l) => l.id);
      if (linkIds.length === 0) return;

      const { data } = await supabase
        .from("analytics")
        .select("clicked_at")
        .in("link_id", linkIds)
        .gte("clicked_at", new Date(Date.now() - 7 * 86400000).toISOString())
        .order("clicked_at");

      if (!data) return;

      const dayMap: Record<string, number> = {};
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000);
        dayMap[days[d.getDay()]] = 0;
      }
      data.forEach((a) => {
        const d = new Date(a.clicked_at);
        const key = days[d.getDay()];
        dayMap[key] = (dayMap[key] || 0) + 1;
      });
      setDailyData(Object.entries(dayMap).map(([day, clicks]) => ({ day, clicks })));
    };
    fetchAnalytics();
  }, [profile, links]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const totalClicks = links.reduce((s, l) => s + l.clicks, 0);
  const topLink = links.length ? links.reduce((a, b) => (a.clicks > b.clicks ? a : b)) : null;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
          <p className="text-3xl font-display font-bold">{totalClicks}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Top Link</p>
          <p className="text-lg font-display font-bold truncate">{topLink?.title || "—"}</p>
          {topLink && <p className="text-sm text-primary">{topLink.clicks} clicks</p>}
        </div>
      </div>

      {dailyData.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-6 mb-8">
          <h3 className="font-display font-semibold mb-4">Daily Traffic (Last 7 days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dailyData}>
              <XAxis dataKey="day" tick={{ fill: "hsl(0,0%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(0,0%,7%)", border: "1px solid hsl(0,0%,16%)", borderRadius: "8px", color: "hsl(0,0%,96%)" }} />
              <Bar dataKey="clicks" fill="hsl(142,72%,50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <h3 className="font-display font-semibold mb-4">Link Performance</h3>
      <div className="space-y-3">
        {links.map((link) => (
          <div key={link.id} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{link.title}</p>
                <p className="text-xs text-muted-foreground truncate">{link.url}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-display font-bold">{link.clicks}</p>
              <p className="text-xs text-muted-foreground">clicks</p>
            </div>
          </div>
        ))}
        {links.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Add links to see analytics</p>}
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;
