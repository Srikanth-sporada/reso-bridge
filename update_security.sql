-- Drop the insecure public policy
DROP POLICY "Allow public read access" ON public.courses;

-- Create a secure policy that only allows authenticated users to view courses
CREATE POLICY "Allow authenticated read access" ON public.courses
    FOR SELECT
    USING (auth.role() = 'authenticated');
