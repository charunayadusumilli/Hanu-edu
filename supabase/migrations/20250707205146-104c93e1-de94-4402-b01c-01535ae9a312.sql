-- Create challenges table for client challenge submissions
CREATE TABLE public.client_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  company_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  challenge_title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  urgency TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  supporting_documents_urls TEXT[],
  status TEXT NOT NULL DEFAULT 'submitted',
  assigned_expert_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.client_challenges ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own challenges" 
ON public.client_challenges 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own challenges" 
ON public.client_challenges 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" 
ON public.client_challenges 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create experts table
CREATE TABLE public.experts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialties TEXT[] NOT NULL,
  industries TEXT[] NOT NULL,
  experience_years INTEGER,
  hourly_rate INTEGER,
  availability_status TEXT DEFAULT 'available',
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for experts
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view experts" 
ON public.experts 
FOR SELECT 
USING (true);

-- Create articles table for knowledge base
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time_minutes INTEGER,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for articles
ALTER TABLE public.articles ENABLE ROW_LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (published_at IS NOT NULL);

-- Insert sample experts
INSERT INTO public.experts (name, title, specialties, industries, experience_years, hourly_rate, bio) VALUES
('Sarah Chen', 'Senior Strategy Consultant', ARRAY['Digital Transformation', 'Process Optimization'], ARRAY['Technology', 'Finance'], 8, 250, 'Specialized in helping tech companies scale their operations efficiently.'),
('Michael Rodriguez', 'AI Implementation Expert', ARRAY['AI Strategy', 'Machine Learning'], ARRAY['Healthcare', 'Manufacturing'], 12, 300, 'Leading expert in AI adoption across various industries.'),
('Emma Thompson', 'Change Management Specialist', ARRAY['Organizational Change', 'Leadership Development'], ARRAY['Consulting', 'Retail'], 10, 200, 'Helping organizations navigate complex transformations.');

-- Insert sample articles
INSERT INTO public.articles (title, content, category, read_time_minutes, author) VALUES
('Digital Transformation Best Practices', 'Comprehensive guide to successful digital transformation initiatives...', 'Strategy', 5, 'Sarah Chen'),
('AI Implementation Roadmap', 'Step-by-step guide to implementing AI solutions in your organization...', 'Technology', 8, 'Michael Rodriguez'),
('Change Management Guide', 'Essential strategies for managing organizational change effectively...', 'Operations', 12, 'Emma Thompson');

-- Add trigger for updated_at
CREATE TRIGGER update_client_challenges_updated_at
BEFORE UPDATE ON public.client_challenges
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();