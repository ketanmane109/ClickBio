INSERT INTO storage.buckets (id, name, public) VALUES ('backgrounds', 'backgrounds', true);

CREATE POLICY "Users can upload backgrounds" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'backgrounds');
CREATE POLICY "Public can read backgrounds" ON storage.objects FOR SELECT USING (bucket_id = 'backgrounds');
CREATE POLICY "Users can delete own backgrounds" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'backgrounds');