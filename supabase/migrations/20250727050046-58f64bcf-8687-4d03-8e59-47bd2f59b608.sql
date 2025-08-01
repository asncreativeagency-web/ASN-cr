-- Fix function search path for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Update RLS policies to restrict to authenticated users only
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can insert their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can view their project updates" ON public.project_updates;
DROP POLICY IF EXISTS "Users can view their own inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Users can insert their own inquiries" ON public.contact_inquiries;
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can insert their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;

-- Create secure RLS policies for authenticated users only
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own projects" 
ON public.projects 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects" 
ON public.projects 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON public.projects 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their project updates" 
ON public.project_updates 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = project_updates.project_id 
    AND projects.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view their own inquiries" 
ON public.contact_inquiries 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Anonymous can insert inquiries" 
ON public.contact_inquiries 
FOR INSERT 
TO anon
WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can insert their own inquiries" 
ON public.contact_inquiries 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own messages" 
ON public.messages 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages" 
ON public.messages 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages" 
ON public.messages 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);