
-- Remove the overly permissive INSERT policy on analytics
-- Click recording is handled by the record_click SECURITY DEFINER function
DROP POLICY "Anyone can insert analytics (public clicks)" ON public.analytics;
