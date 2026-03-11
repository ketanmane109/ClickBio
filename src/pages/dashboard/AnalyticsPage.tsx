import { ExternalLink } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const links = [
  { title: "Free Newsletter", url: "https://newsletter.com", clicks: 412 },
  { title: "My Portfolio", url: "https://example.com", clicks: 234 },
  { title: "YouTube Channel", url: "https://youtube.com", clicks: 189 },
  { title: "Book a Call", url: "https://cal.com", clicks: 87 },
];

const dailyData = [
  { day: "Mon", clicks: 120 },
  { day: "Tue", clicks: 98 },
  { day: "Wed", clicks: 145 },
  { day: "Thu", clicks: 167 },
  { day: "Fri", clicks: 189 },
  { day: "Sat", clicks: 134 },
  { day: "Sun", clicks: 69 },
];

const totalClicks = links.reduce((s, l) => s + l.clicks, 0);
const topLink = links[0];

const AnalyticsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Analytics</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
          <p className="text-3xl font-display font-bold">{totalClicks}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Top Link</p>
          <p className="text-lg font-display font-bold truncate">{topLink.title}</p>
          <p className="text-sm text-primary">{topLink.clicks} clicks</p>
        </div>
      </div>

      {/* Daily chart */}
      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <h3 className="font-display font-semibold mb-4">Daily Traffic</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dailyData}>
            <XAxis dataKey="day" tick={{ fill: "hsl(0,0%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(0,0%,55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(0,0%,7%)",
                border: "1px solid hsl(0,0%,16%)",
                borderRadius: "8px",
                color: "hsl(0,0%,96%)",
              }}
            />
            <Bar dataKey="clicks" fill="hsl(142,72%,50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="font-display font-semibold mb-4">Link Performance</h3>
      <div className="space-y-3">
        {links.map((link) => (
          <div key={link.title} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{link.title}</p>
                <p className="text-xs text-muted-foreground">{link.url}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-display font-bold">{link.clicks}</p>
              <p className="text-xs text-muted-foreground">clicks</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
