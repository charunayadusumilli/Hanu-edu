-- Create missing tables only (enums already exist)
CREATE TABLE IF NOT EXISTS public.profiles (
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

CREATE TABLE IF NOT EXISTS public.experts (
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

CREATE TABLE IF NOT EXISTS public.client_challenges (
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

CREATE TABLE IF NOT EXISTS public.courses (
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

CREATE TABLE IF NOT EXISTS public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author text,
  category text NOT NULL,
  read_time_minutes integer,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Insert sample data
INSERT INTO public.experts (name, title, bio, specialties, industries, experience_years, hourly_rate) 
VALUES
('Dr. Sarah Chen', 'AI Strategy Consultant', 'Leading AI transformation expert with 15+ years in enterprise AI implementation', 
 ARRAY['Artificial Intelligence', 'Machine Learning', 'Digital Transformation'], 
 ARRAY['Technology', 'Healthcare', 'Finance'], 15, 350),
('Michael Rodriguez', 'Maritime Operations Expert', 'Former Navy Captain with extensive experience in maritime logistics',
 ARRAY['Maritime Operations', 'Logistics', 'Supply Chain'], 
 ARRAY['Maritime', 'Shipping', 'Defense'], 20, 275),
('Dr. Amanda Foster', 'Energy Transition Specialist', 'Renewable energy expert helping organizations transition to sustainable solutions',
 ARRAY['Renewable Energy', 'Sustainability', 'Energy Policy'], 
 ARRAY['Energy', 'Utilities', 'Government'], 12, 300),
('James Park', 'Capital Markets Analyst', 'Investment banking veteran specializing in market analysis and financial strategy',
 ARRAY['Financial Analysis', 'Investment Strategy', 'Risk Management'], 
 ARRAY['Finance', 'Banking', 'Investment'], 18, 400)
ON CONFLICT DO NOTHING;

INSERT INTO public.articles (title, content, author, category, read_time_minutes) 
VALUES
('The Future of AI in Maritime Operations', 'Artificial intelligence is revolutionizing maritime operations through predictive maintenance, autonomous navigation, and optimized route planning.', 'Dr. Sarah Chen', 'Technology', 8),
('Sustainable Energy Solutions for Modern Enterprises', 'As businesses worldwide commit to carbon neutrality, understanding renewable energy implementation becomes crucial for competitive advantage.', 'Dr. Amanda Foster', 'Energy', 12),
('Capital Market Trends 2024', 'The global capital markets are experiencing unprecedented changes driven by digital transformation and regulatory evolution.', 'James Park', 'Finance', 10)
ON CONFLICT DO NOTHING;