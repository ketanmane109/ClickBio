import { Link } from "react-router-dom";
import { Smartphone, Users, Globe, Clock, Share2, TrendingUp, BarChart3, Lock, MousePointerClick, CalendarDays, Activity } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "framer-motion";
import './AnalyticsPage.css';
import { useProfile } from "@/hooks/useProfile";

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"];

const AnalyticsPage = () => {
  const analytics = useAnalytics();
  const { isPro } = useSubscription();
  const { links } = useProfile();

  const isLoading = analytics.loading;
  const hasData = analytics.hasData && links.length > 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full"
        />
        <p className="text-muted-foreground font-medium animate-pulse">Loading insights...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-12 pb-10 max-w-6xl mx-auto"
    >
      {/* A. Performance Overview */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl shadow-inner border border-blue-500/20">
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Performance Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Clicks */}
          <Card className="relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute -right-6 -top-6 p-4 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-500">
              <MousePointerClick className="w-32 h-32" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Clicks</CardDescription>
              <CardTitle className="text-5xl font-display font-black mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">{analytics.totalClicks.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mt-4">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-semibold px-2.5 py-0.5">All Time</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Growth */}
          <Card className="relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute -right-6 -top-6 p-4 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-500">
              <TrendingUp className="w-32 h-32" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Weekly Growth</CardDescription>
              <CardTitle className={`text-5xl font-display font-black mt-2 ${analytics.weeklyGrowth > 0 ? 'bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent' : 'text-foreground'}`}>
                {analytics.weeklyGrowth > 0 ? '+' : ''}{analytics.weeklyGrowth.toFixed(1)}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted/50 rounded-full h-2 mt-5 overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(Math.abs(analytics.weeklyGrowth), 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-2 rounded-full ${analytics.weeklyGrowth > 0 ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-primary'}`} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Unique Visitors */}
          <Card className="relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-card/50 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="absolute -right-6 -top-6 p-4 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.05] transition-all duration-500">
              <Users className="w-32 h-32" />
            </div>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Unique Visitors</CardDescription>
              <CardTitle className="text-5xl font-display font-black mt-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {isPro ? analytics.uniqueVisitors.toLocaleString() : '---'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isPro ? (
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg inline-flex">
                  <span className="text-purple-500 font-bold">{analytics.returningVisitors}</span> returning visitors
                </div>
              ) : (
                <Badge variant="secondary" className="mt-4 px-3 py-1 font-semibold text-xs border border-primary/20 bg-primary/5 text-primary">👑 Pro Feature</Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Traffic Chart */}
        <Card className="border-border/40 bg-card/60 backdrop-blur-xl shadow-xl overflow-hidden group">
          <CardHeader className="border-b border-border/40 bg-muted/10 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>
              Traffic Overview (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {hasData ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.daily7Days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                      cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorClicks)" activeDot={{ r: 6, fill: '#3b82f6', stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed border-border/50 rounded-2xl bg-muted/5">
                <BarChart3 className="h-12 w-12 mb-4 opacity-20 text-primary" />
                <p className="font-semibold text-lg text-foreground">No traffic data yet</p>
                <p className="text-sm opacity-80 mt-1">Share your link to generate analytics.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* B. Link Performance */}
      <section className="space-y-6 pt-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl shadow-inner border border-emerald-500/20">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Link Performance</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Top Links List */}
          <Card className="xl:col-span-2 border-border/40 bg-card/60 backdrop-blur-xl shadow-xl overflow-hidden">
            <CardHeader className="border-b border-border/40 bg-muted/10 pb-4">
              <CardTitle className="text-lg font-bold">Top Performing Links</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {analytics.topLinks.length > 0 ? (
                <div className="space-y-4">
                  {analytics.topLinks.slice(0, 5).map((link, i) => (
                    <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl bg-background/50 border border-border/40 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-500/30 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center font-bold text-sm shadow-inner">
                             #{i+1}
                           </div>
                           <span className="font-semibold text-foreground text-base group-hover:text-emerald-500 transition-colors">{link.title}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-xl text-foreground">{link.clicks.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Clicks</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(2, (link.clicks / Math.max(analytics.totalClicks, 1)) * 100)}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="py-12 text-center text-muted-foreground bg-muted/5 rounded-2xl border border-dashed border-border/50 font-medium">
                   No links clicked yet.
                 </div>
              )}
            </CardContent>
          </Card>

          {/* CTR & Avg Clicks */}
          <div className="space-y-6">
            <Card className="border-border/40 bg-card/60 backdrop-blur-xl relative overflow-hidden h-[calc(50%-0.75rem)] shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Click-Through Rate</CardDescription>
                <CardTitle className="text-5xl font-display font-black mt-2">
                  {isPro ? `${analytics.ctr}%` : '---'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isPro ? (
                  <div className="mt-5">
                    <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(analytics.ctr, 100)}%` }}
                        transition={{ duration: 1 }}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" 
                      />
                    </div>
                  </div>
                ) : (
                  <Badge variant="secondary" className="mt-4 px-3 py-1 font-semibold text-xs border border-primary/20 bg-primary/5 text-primary">👑 Pro Feature</Badge>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/60 backdrop-blur-xl relative overflow-hidden h-[calc(50%-0.75rem)] shadow-lg group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Avg Clicks / Link</CardDescription>
                <CardTitle className="text-5xl font-display font-black mt-2">
                  {analytics.topLinks.length > 0 
                    ? Math.round(analytics.totalClicks / analytics.topLinks.length) 
                    : 0}
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="text-sm font-semibold text-muted-foreground mt-5 bg-muted/30 px-3 py-2 rounded-lg inline-flex">
                   Across <span className="text-foreground mx-1">{analytics.topLinks.length}</span> active links
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* C. Audience Insights */}
      <section className="space-y-6 pt-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 rounded-xl shadow-inner border border-purple-500/20">
            <Globe className="w-5 h-5 text-purple-500" />
          </div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Audience Insights</h2>
          {!isPro && <Badge variant="outline" className="ml-2 font-bold px-2 py-0.5 border-primary/30 text-primary bg-primary/5 shadow-sm">PRO</Badge>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Devices Pie Chart */}
          <Card className={`border-border/40 bg-card/60 backdrop-blur-xl shadow-xl transition-all ${!isPro ? 'opacity-70 grayscale-[0.5]' : 'hover:shadow-2xl hover:-translate-y-1 duration-300'}`}>
            <CardHeader className="border-b border-border/40 bg-muted/5 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-500" />
                Devices
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isPro ? (
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={analytics.devices} 
                        dataKey="clicks" 
                        nameKey="device" 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={65} 
                        outerRadius={85} 
                        paddingAngle={6}
                        cornerRadius={6}
                      >
                        {analytics.devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', fontWeight: 600 }} 
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[220px] flex items-center justify-center flex-col gap-3 text-muted-foreground bg-muted/10 rounded-xl border border-dashed border-border/50">
                  <div className="p-3 bg-background rounded-full border border-border shadow-sm">
                    <Lock className="w-6 h-6 opacity-60" />
                  </div>
                  <span className="font-semibold text-foreground">Available on Pro</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Countries List */}
          <Card className={`border-border/40 bg-card/60 backdrop-blur-xl shadow-xl transition-all ${!isPro ? 'opacity-70 grayscale-[0.5]' : 'hover:shadow-2xl hover:-translate-y-1 duration-300'}`}>
            <CardHeader className="border-b border-border/40 bg-muted/5 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isPro ? (
                analytics.countries.length > 0 ? (
                  <div className="space-y-5">
                    {analytics.countries.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex flex-col gap-2.5">
                        <div className="flex justify-between items-end text-sm">
                          <span className="font-semibold text-foreground flex items-center gap-2">
                            <span className="text-muted-foreground w-4">{i+1}.</span> {item.country}
                          </span>
                          <span className="font-bold text-foreground bg-muted px-2 py-0.5 rounded-md text-xs">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-1.5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-1.5 rounded-full" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[220px] flex items-center justify-center text-center text-muted-foreground bg-muted/5 rounded-xl border border-dashed border-border/50 font-medium p-4">
                    No audience insights available yet
                  </div>
                )
              ) : (
                <div className="h-[220px] flex items-center justify-center flex-col gap-3 text-muted-foreground bg-muted/10 rounded-xl border border-dashed border-border/50">
                  <div className="p-3 bg-background rounded-full border border-border shadow-sm">
                    <Lock className="w-6 h-6 opacity-60" />
                  </div>
                  <span className="font-semibold text-foreground">Available on Pro</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Traffic Sources Pie */}
          <Card className={`border-border/40 bg-card/60 backdrop-blur-xl shadow-xl transition-all ${!isPro ? 'opacity-70 grayscale-[0.5]' : 'hover:shadow-2xl hover:-translate-y-1 duration-300'}`}>
            <CardHeader className="border-b border-border/40 bg-muted/5 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Share2 className="w-4 h-4 text-pink-500" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isPro ? (
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={analytics.trafficSources} 
                        dataKey="percentage" 
                        nameKey="source" 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={50} 
                        outerRadius={85}
                        paddingAngle={4}
                        cornerRadius={4}
                      >
                        {analytics.trafficSources.map((entry, index) => (
                          <Cell key={`source-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', fontWeight: 600 }} 
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[220px] flex items-center justify-center flex-col gap-3 text-muted-foreground bg-muted/10 rounded-xl border border-dashed border-border/50">
                  <div className="p-3 bg-background rounded-full border border-border shadow-sm">
                    <Lock className="w-6 h-6 opacity-60" />
                  </div>
                  <span className="font-semibold text-foreground">Available on Pro</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* D. Activity Insights */}
      <section className="space-y-6 pt-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 rounded-xl shadow-inner border border-orange-500/20">
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <h2 className="text-2xl font-display font-bold tracking-tight">Activity Insights</h2>
          {!isPro && <Badge variant="outline" className="ml-2 font-bold px-2 py-0.5 border-primary/30 text-primary bg-primary/5 shadow-sm">PRO</Badge>}
        </div>

        <Card className={`border-border/40 bg-card/60 backdrop-blur-xl shadow-xl overflow-hidden transition-all ${!isPro ? 'opacity-70 grayscale-[0.5]' : ''}`}>
          <CardHeader className="border-b border-border/40 bg-muted/5 pb-4">
             <CardTitle className="text-lg font-bold">Peak Interaction Hours</CardTitle>
             <CardDescription className="font-medium mt-1">When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {isPro ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[...analytics.peakHours.slice(0, 12)].sort((a, b) => parseInt(a.hour) - parseInt(b.hour))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} />
                    <Tooltip 
                      cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid hsl(var(--border))', background: 'hsl(var(--card))', fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                    />
                    <Area type="monotone" dataKey="clicks" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#areaGradient)" activeDot={{ r: 6, fill: '#f97316', stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center flex-col gap-4 text-muted-foreground bg-muted/10 rounded-2xl border border-dashed border-border/50">
                <div className="p-4 bg-background rounded-full border border-border shadow-md">
                  <Lock className="w-8 h-8 opacity-60" />
                </div>
                <div className="text-center max-w-sm">
                  <p className="text-xl font-bold text-foreground">Unlock Activity Insights</p>
                  <p className="text-sm font-medium opacity-80 mt-2 leading-relaxed">Upgrade to Pro to see precisely when your audience is most active and optimize your posting schedule.</p>
                </div>
                <Button variant="hero" className="mt-4 rounded-full px-8 shadow-lg shadow-primary/20" asChild>
                  <Link to="/dashboard/pricing">Upgrade Plan</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Empty State / Tier Locked */}
      {!hasData && !isLoading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center py-24 rounded-3xl border border-dashed border-border/80 bg-muted/5 shadow-inner mt-8"
        >
          <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-border">
            <BarChart3 className="h-12 w-12 text-primary/60" />
          </div>
          <h3 className="text-3xl font-display font-bold mb-3 tracking-tight">Analytics Await</h3>
          <p className="text-muted-foreground max-w-md mx-auto text-lg mb-8 font-medium">
            Add your first links and share your profile. Your traffic insights will magically appear right here.
          </p>
          <Button size="lg" variant="hero" asChild className="rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/25">
            <Link to="/dashboard/links">Add Some Links</Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalyticsPage;
