-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    cover_letter TEXT NOT NULL,
    resume_url TEXT,
    resume_filename TEXT,
    position_applied TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'shortlisted', 'rejected', 'hired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON public.job_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting job applications (anyone can apply)
CREATE POLICY "Allow public to insert job applications" ON public.job_applications
    FOR INSERT WITH CHECK (true);

-- Create policy for viewing job applications (only authenticated users can view)
CREATE POLICY "Allow authenticated users to view job applications" ON public.job_applications
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy for updating job applications (only authenticated users can update)
CREATE POLICY "Allow authenticated users to update job applications" ON public.job_applications
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_job_applications_updated_at 
    BEFORE UPDATE ON public.job_applications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 