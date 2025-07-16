-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin');

-- Create onboarding steps enum
CREATE TYPE public.onboarding_step AS ENUM ('profile_setup', 'preferences', 'verification', 'completed');

-- Create admin roles enum
CREATE TYPE public.admin_role AS ENUM ('employee', 'admin', 'super_admin');

-- Create experience levels enum
CREATE TYPE public.experience_level AS ENUM ('entry', 'mid', 'senior', 'executive');

-- Create job types enum
CREATE TYPE public.job_type AS ENUM ('full_time', 'part_time', 'contract', 'internship');

-- Create application status enum
CREATE TYPE public.application_status AS ENUM ('pending', 'reviewed', 'interview_scheduled', 'interview_completed', 'offer_extended', 'accepted', 'rejected', 'withdrawn');

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  phone text,
  full_name text,
  first_name text,
  last_name text,
  avatar_url text,
  bio text,
  learning_goals text[],
  experience_level text,
  interests text[],
  role user_role DEFAULT 'student',
  onboarding_step onboarding_step DEFAULT 'profile_setup',
  phone_verified boolean DEFAULT false,
  email_verified boolean DEFAULT false,
  email_verified_at timestamptz,
  last_login_at timestamptz,
  login_count integer DEFAULT 0,
  terms_accepted_at timestamptz,
  privacy_accepted_at timestamptz,
  is_active boolean DEFAULT true,
  last_activity_at timestamptz DEFAULT now(),
  email_verification_token text,
  preferred_theme text DEFAULT 'system',
  referral_code text,
  referred_by_code text,
  auth_provider text DEFAULT 'email',
  provider_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create experts table
CREATE TABLE public.experts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  title text NOT NULL,
  bio text,
  profile_image_url text,
  experience_years integer,
  hourly_rate integer,
  specialties text[] NOT NULL,
  industries text[] NOT NULL,
  availability_status text DEFAULT 'available',
  created_at timestamptz DEFAULT now()
);

-- Create client_challenges table
CREATE TABLE public.client_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  industry text NOT NULL,
  challenge_title text NOT NULL,
  description text NOT NULL,
  budget_range text,
  timeline text,
  urgency text,
  contact_email text NOT NULL,
  contact_phone text,
  supporting_documents_urls text[],
  assigned_expert_id uuid REFERENCES experts(id),
  status text DEFAULT 'submitted',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  difficulty text,
  duration_weeks integer,
  price integer DEFAULT 0,
  instructor_id uuid REFERENCES auth.users(id),
  thumbnail_url text,
  video_intro_url text,
  prerequisites text[],
  learning_objectives text[],
  category text,
  is_published boolean DEFAULT false,
  total_modules integer DEFAULT 0,
  total_lessons integer DEFAULT 0,
  average_rating numeric DEFAULT 0,
  total_enrollments integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sample data for experts
INSERT INTO public.experts (name, title, bio, specialties, industries, experience_years, hourly_rate) VALUES
('Dr. Sarah Chen', 'AI Strategy Consultant', 'Leading AI transformation expert with 15+ years in enterprise AI implementation', 
 ARRAY['Artificial Intelligence', 'Machine Learning', 'Digital Transformation'], 
 ARRAY['Technology', 'Healthcare', 'Finance'], 15, 350),
('Michael Rodriguez', 'Maritime Operations Expert', 'Former Navy Captain with extensive experience in maritime logistics and operations',
 ARRAY['Maritime Operations', 'Logistics', 'Supply Chain'], 
 ARRAY['Maritime', 'Shipping', 'Defense'], 20, 275),
('Dr. Amanda Foster', 'Energy Transition Specialist', 'Renewable energy expert helping organizations transition to sustainable energy solutions',
 ARRAY['Renewable Energy', 'Sustainability', 'Energy Policy'], 
 ARRAY['Energy', 'Utilities', 'Government'], 12, 300),
('James Park', 'Capital Markets Analyst', 'Investment banking veteran specializing in market analysis and financial strategy',
 ARRAY['Financial Analysis', 'Investment Strategy', 'Risk Management'], 
 ARRAY['Finance', 'Banking', 'Investment'], 18, 400);

-- Create sample courses
INSERT INTO public.courses (title, description, difficulty, duration_weeks, price, category, is_published) VALUES
('Introduction to AI for Business', 'Learn how artificial intelligence can transform your business operations', 'Beginner', 4, 299, 'Technology', true),
('Maritime Safety and Compliance', 'Comprehensive course on maritime safety regulations and best practices', 'Intermediate', 6, 399, 'Maritime', true),
('Renewable Energy Fundamentals', 'Understanding the basics of renewable energy systems and implementation', 'Beginner', 5, 249, 'Energy', true),
('Financial Risk Management', 'Advanced techniques for managing financial risks in volatile markets', 'Advanced', 8, 599, 'Finance', true);

-- Create articles table
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text,
  category text NOT NULL,
  read_time_minutes integer,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create sample articles
INSERT INTO public.articles (title, content, author, category, read_time_minutes) VALUES
('The Future of AI in Maritime Operations', 'Artificial intelligence is revolutionizing maritime operations...', 'Dr. Sarah Chen', 'Technology', 8),
('Sustainable Energy Solutions for Modern Enterprises', 'As businesses worldwide commit to carbon neutrality...', 'Dr. Amanda Foster', 'Energy', 12),
('Capital Market Trends 2024', 'The global capital markets are experiencing unprecedented changes...', 'James Park', 'Finance', 10),
('Digital Transformation in Traditional Industries', 'Legacy industries are embracing digital transformation...', 'Michael Rodriguez', 'Technology', 15);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for experts
CREATE POLICY "Anyone can view experts" ON public.experts
  FOR SELECT USING (true);

-- Create RLS policies for client_challenges
CREATE POLICY "Users can view their own challenges" ON public.client_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own challenges" ON public.client_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" ON public.client_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for courses
CREATE POLICY "Anyone can view published courses" ON public.courses
  FOR SELECT USING (is_published = true);

-- Create RLS policies for articles
CREATE POLICY "Anyone can view published articles" ON public.articles
  FOR SELECT USING (published_at IS NOT NULL);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, first_name, last_name, phone, auth_provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name', 
      NEW.raw_user_meta_data->>'name',
      CONCAT(
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        CASE 
          WHEN NEW.raw_user_meta_data->>'first_name' IS NOT NULL 
          AND NEW.raw_user_meta_data->>'last_name' IS NOT NULL 
          THEN ' ' 
          ELSE '' 
        END,
        COALESCE(NEW.raw_user_meta_data->>'last_name', '')
      ),
      SPLIT_PART(NEW.email, '@', 1)
    ),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.phone,
    COALESCE(NEW.raw_user_meta_data->>'auth_provider', 'email')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_client_challenges_updated_at
  BEFORE UPDATE ON public.client_challenges
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();