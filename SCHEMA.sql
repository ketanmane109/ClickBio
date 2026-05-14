-- ============================================================
-- BioSpark — Full Supabase SQL Schema
-- Copy-paste this into your Supabase SQL editor after export.
-- ============================================================

-- 1. PROFILES TABLE
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  name text DEFAULT '',
  bio text DEFAULT '',
  avatar_url text DEFAULT '',
  background_image text DEFAULT '',
  theme text DEFAULT 'dark',
  video_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own profile" ON public.profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 2. LINKS TABLE
CREATE TABLE public.links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text DEFAULT 'New Link',
  url text DEFAULT '',
  position integer DEFAULT 0,
  clicks integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Links are viewable by everyone" ON public.links FOR SELECT USING (true);
CREATE POLICY "Users can insert their own links" ON public.links FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid())
);
CREATE POLICY "Users can update their own links" ON public.links FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own links" ON public.links FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid())
);

-- 3. ANALYTICS TABLE
CREATE TABLE public.analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid NOT NULL REFERENCES public.links(id) ON DELETE CASCADE,
  referrer text DEFAULT '',
  clicked_at timestamptz DEFAULT now()
);

ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view analytics for their own links" ON public.analytics FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM links l JOIN profiles p ON l.profile_id = p.id
    WHERE l.id = analytics.link_id AND p.user_id = auth.uid()
  )
);

-- 4. SUBSCRIPTIONS TABLE
CREATE TABLE public.subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan text DEFAULT 'free',
  plan_type text DEFAULT 'free',
  status text DEFAULT 'active',
  billing_cycle text DEFAULT 'monthly',
  subscribed_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own subscription" ON public.subscriptions FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- 5. FUNCTIONS

-- Auto-create profile + subscription on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, name)
  VALUES (NEW.id, LOWER(REPLACE(SPLIT_PART(NEW.email, '@', 1), '.', '')), SPLIT_PART(NEW.email, '@', 1));
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Record link click (used via supabase.rpc)
CREATE OR REPLACE FUNCTION public.record_click(p_link_id uuid, p_referrer text DEFAULT '')
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  UPDATE public.links SET clicks = clicks + 1 WHERE id = p_link_id;
  INSERT INTO public.analytics (link_id, referrer) VALUES (p_link_id, p_referrer);
END;
$$;

-- 6. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('backgrounds', 'backgrounds', true);

CREATE POLICY "Users can upload avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Public can read avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload backgrounds" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'backgrounds');
CREATE POLICY "Public can read backgrounds" ON storage.objects FOR SELECT USING (bucket_id = 'backgrounds');
CREATE POLICY "Users can delete own backgrounds" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'backgrounds');
