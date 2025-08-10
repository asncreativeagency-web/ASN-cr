-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  true,
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy for uploading resumes (anyone can upload)
CREATE POLICY "Allow public to upload resumes" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'resumes');

-- Create policy for viewing resumes (only authenticated users can view)
CREATE POLICY "Allow authenticated users to view resumes" ON storage.objects
    FOR SELECT USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Create policy for updating resumes (only authenticated users can update)
CREATE POLICY "Allow authenticated users to update resumes" ON storage.objects
    FOR UPDATE USING (bucket_id = 'resumes' AND auth.role() = 'authenticated');

-- Create policy for deleting resumes (only authenticated users can delete)
CREATE POLICY "Allow authenticated users to delete resumes" ON storage.objects
    FOR DELETE USING (bucket_id = 'resumes' AND auth.role() = 'authenticated'); 