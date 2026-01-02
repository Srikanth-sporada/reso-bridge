-- Create the courses table
CREATE TABLE public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    color TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access to everyone
CREATE POLICY "Allow public read access" ON public.courses
    FOR SELECT
    USING (true);

-- Insert dummy data (matches the previous server implementation)
INSERT INTO public.courses (title, description, color) VALUES
('Introduction to Programming', 'Learn the basics of computer programming using Python.', 'from-blue-500'),
('Basics of Web Development', 'Understand HTML, CSS, and basic JavaScript to build websites.', 'from-green-500'),
('Data Structures Fundamentals', 'Master arrays, linked lists, stacks, and queues.', 'from-purple-500'),
('Getting Started with Databases', 'Introduction to SQL and NoSQL databases.', 'from-yellow-500');
