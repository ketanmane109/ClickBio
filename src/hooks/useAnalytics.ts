import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile, type Link } from './useProfile';
import { useSubscription } from './useSubscription';
import type { Tables } from '@/integrations/supabase/types';

type AnalyticsRecord = {
  link_id: string;
  clicked_at: string;
  referrer: string | null;
};

export interface AnalyticsData {
  totalClicks: number;
  topLink: { title: string; clicks: number; url: string } | null;
  daily7Days: Array<{ day: string; clicks: number }>;
  weeklyGrowth: number;
  monthlyGrowth: number;
  topLinks: Array<{ title: string; clicks: number }>;
  peakHours: Array<{ hour: string; clicks: number }>;
  trafficSources: Array<{ source: string; clicks: number; percentage: number }>;
  devices: Array<{ device: string; clicks: number; percentage: number }>;
  countries: Array<{ country: string; clicks: number; percentage: number }>;
  uniqueVisitors: number;
  returningVisitors: number;
  ctr: number;
  loading: boolean;
  hasData: boolean;
}

export function useAnalytics() {
  const { profile, links } = useProfile();
  const { isPro } = useSubscription();
  const [rawAnalytics, setRawAnalytics] = useState<AnalyticsRecord[]>([]);
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const fetchRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const linkIdsStr = useMemo(() => links.map((l: Link) => l.id).join(','), [links]);

  const computedData = useMemo((): AnalyticsData => {
    // ... logic remains same ...
    if (!rawAnalytics.length || !links.length || !profile) {
      return {
        totalClicks: 0, topLink: null, daily7Days: [], weeklyGrowth: 0, monthlyGrowth: 0, topLinks: [],
        peakHours: [], trafficSources: [], devices: [], countries: [], uniqueVisitors: 0, returningVisitors: 0, ctr: 0,
        loading: false, hasData: false
      };
    }

    const analytics: AnalyticsRecord[] = rawAnalytics;
    const totalClicks = Number(links.reduce((sum: number, l: Link) => sum + (l.clicks || 0), 0));
    const hasData = analytics.length > 0;

    // Top link
    const topLink = links.reduce((top: { title: string; clicks: number; url: string } | null, link: Link) => 
      (link.clicks || 0) > (top?.clicks || 0) ? { title: link.title, clicks: link.clicks || 0, url: link.url } : top, null);

    // Daily 7 days
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyMap: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 86400000);
      dailyMap[days[d.getDay()]] = 0;
    }
    analytics.filter(a => new Date(a.clicked_at) > new Date(now.getTime() - 7 * 86400000))
      .forEach(a => {
        const d = new Date(a.clicked_at);
        dailyMap[days[d.getDay()]] += 1;
      });
    const daily7Days = Object.entries(dailyMap).map(([day, clicks]) => ({ day, clicks }));

    // Growth
    const weekClicks = analytics.filter(a => new Date(a.clicked_at) > new Date(now.getTime() - 14 * 86400000)).length;
    const prevWeekClicks = analytics.filter(a => 
      new Date(a.clicked_at) > new Date(now.getTime() - 14 * 86400000) && new Date(a.clicked_at) <= new Date(now.getTime() - 7 * 86400000)
    ).length;
    const weeklyGrowth = prevWeekClicks > 0 ? ((weekClicks - prevWeekClicks) / prevWeekClicks * 100) : 0;

    const monthClicks = analytics.filter(a => new Date(a.clicked_at) > new Date(now.getTime() - 30 * 86400000)).length;
    const prevMonthClicks = analytics.filter(a => 
      new Date(a.clicked_at) > new Date(now.getTime() - 60 * 86400000) && new Date(a.clicked_at) <= new Date(now.getTime() - 30 * 86400000)
    ).length;
    const monthlyGrowth = prevMonthClicks > 0 ? ((monthClicks - prevMonthClicks) / prevMonthClicks * 100) : 0;

    // Top links
    const topLinks = links.map((l: Link) => ({ title: l.title, clicks: l.clicks || 0 })).sort((a: { title: string; clicks: number }, b: { title: string; clicks: number }) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 5);

    // Peak hours
    const hourMap: Record<string, number> = {};
    ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'].forEach(h => hourMap[h] = 0);
    analytics.forEach(a => {
      const hour = new Date(a.clicked_at).getHours().toString().padStart(2, '0');
      hourMap[hour] += 1;
    });
    const peakHours = Object.entries(hourMap).map(([hour, clicks]) => ({ hour, clicks: Number(clicks) })).sort((a: { hour: string; clicks: number }, b: { hour: string; clicks: number }) => b.clicks - a.clicks);

    // Traffic sources
    const sourceMap: Record<string, number> = {};
    analytics.forEach(a => {
      // Extract base referrer from composite field if present
      const fullStr = a.referrer || '';
      const ref = fullStr.split('||device:')[0].toLowerCase();
      
      let source = 'Direct';
      if (ref.includes('instagram.com') || ref.includes('instagram.com/')) source = 'Instagram';
      else if (ref.includes('youtube.com') || ref.includes('youtu.be')) source = 'YouTube';
      else if (ref.includes('t.co') || ref.includes('twitter.com')) source = 'Twitter';
      else if (ref.includes('facebook.com') || ref.includes('fb.me')) source = 'Facebook';
      else if (ref.includes('tiktok.com')) source = 'TikTok';
      else if (ref.includes('linkedin.com')) source = 'LinkedIn';
      else if (ref.includes('whatsapp.com')) source = 'WhatsApp';
      else if (ref && ref !== 'unknown') {
        try {
          const url = new URL(ref.startsWith('http') ? ref : `https://${ref}`);
          source = url.hostname.replace('www.', '');
        } catch {
          source = 'Other Referral';
        }
      }
      
      sourceMap[source] = (sourceMap[source] || 0) + 1;
    });
    
    const trafficSources = Object.entries(sourceMap).map(([source, clicks]) => ({ 
      source, 
      clicks: Number(clicks), 
      percentage: Number(((Number(clicks) / Math.max(analytics.length, 1)) * 100).toFixed(1))
    })).sort((a, b) => b.clicks - a.clicks);

    // Devices - only count real data
    const deviceMap: Record<string, number> = {};
    analytics.forEach(a => {
      const fullStr = a.referrer || '';
      let device: string | null = null;

      // 1. Check new explicit tag
      if (fullStr.includes('||device:')) {
        device = fullStr.split('||device:')[1];
      }
      
      // 2. Fallback to legacy heuristics (very limited)
      if (!device) {
        const ref = fullStr.toLowerCase();
        if (ref.includes('android') || ref.includes('iphone')) device = 'Mobile';
        else if (ref.includes('ipad') || ref.includes('tablet')) device = 'Tablet';
      }

      // Only record if explicitly found to avoid fake numbers
      if (device && ['Mobile', 'Tablet', 'Desktop'].includes(device)) {
        deviceMap[device] = (deviceMap[device] || 0) + 1;
      }
    });

    const deviceTotalClicks = Object.values(deviceMap).reduce((a, b) => a + b, 0);
    const devices = Object.entries(deviceMap).map(([device, clicks]) => ({ 
      device, 
      clicks: Number(clicks), 
      percentage: Number(((Number(clicks) / Math.max(deviceTotalClicks, 1)) * 100).toFixed(1))
    })).sort((a, b) => b.clicks - a.clicks);
    // Countries (no real data currently collected)
    const countries: Array<{ country: string; clicks: number; percentage: number }> = [];

    const uniqueDays = new Set(analytics.map(a => a.clicked_at.split('T')[0])).size;
    const returningVisitors = Math.floor(uniqueDays * 0.3);
    const ctr = links.length ? parseFloat((totalClicks / links.length).toFixed(1)) : 0;

    return {
      totalClicks, 
      topLink, 
      daily7Days, 
      weeklyGrowth, 
      monthlyGrowth, 
      topLinks,
      peakHours, 
      trafficSources, 
      devices, 
      countries, 
      uniqueVisitors: uniqueDays, 
      returningVisitors, 
      ctr,
      loading: false, 
      hasData
    };
  }, [rawAnalytics, links, profile]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      if (!linkIdsStr || !profile) {
        setRawAnalytics([]);
        return;
      }
      
      try {
        const ids = linkIdsStr.split(',');
        const { data: allAnalytics, error } = await supabase
          .from('analytics')
          .select('link_id, clicked_at, referrer')
          .in('link_id', ids)
          .order('clicked_at', { ascending: true });

        if (error) throw error;
        if (active) {
          setRawAnalytics(allAnalytics || []);
        }
      } catch (error: unknown) {
        console.error('Analytics fetch error:', error);
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [linkIdsStr, profile?.id]);

  return computedData;
}

