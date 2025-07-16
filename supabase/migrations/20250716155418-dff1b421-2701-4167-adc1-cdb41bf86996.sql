-- Comprehensive fresh setup for Hanu Consulting
-- Ensure all required types exist
DO $$
BEGIN
    -- Create types only if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin', 'expert');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admin_role') THEN
        CREATE TYPE public.admin_role AS ENUM ('employee', 'admin', 'super_admin');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'onboarding_step') THEN
        CREATE TYPE public.onboarding_step AS ENUM ('profile_setup', 'preferences', 'completed');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'experience_level') THEN
        CREATE TYPE public.experience_level AS ENUM ('entry', 'mid', 'senior', 'executive');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'job_type') THEN
        CREATE TYPE public.job_type AS ENUM ('full_time', 'part_time', 'contract', 'freelance');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
        CREATE TYPE public.application_status AS ENUM ('applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn');
    END IF;
END $$;

-- Ensure profiles table has all required RLS policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Instructors can view student profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Instructors can view student profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() 
      AND p.role IN ('instructor', 'admin')
    )
  );

-- Ensure client_challenges table has proper RLS
DROP POLICY IF EXISTS "Users can view their own challenges" ON public.client_challenges;
DROP POLICY IF EXISTS "Users can create their own challenges" ON public.client_challenges;
DROP POLICY IF EXISTS "Users can update their own challenges" ON public.client_challenges;

CREATE POLICY "Users can view their own challenges" ON public.client_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own challenges" ON public.client_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" ON public.client_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- Ensure experts table has proper RLS
DROP POLICY IF EXISTS "Anyone can view experts" ON public.experts;
DROP POLICY IF EXISTS "Users can manage their own expert profile" ON public.experts;

CREATE POLICY "Anyone can view experts" ON public.experts
  FOR SELECT USING (true);

CREATE POLICY "Users can manage their own expert profile" ON public.experts
  FOR ALL USING (auth.uid() = user_id);

-- Ensure admin_users table has proper RLS
DROP POLICY IF EXISTS "Users can view their own admin profile" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can manage admin users" ON public.admin_users;

CREATE POLICY "Users can view their own admin profile" ON public.admin_users
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage admin users" ON public.admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au
      WHERE au.user_id = auth.uid() 
      AND au.role IN ('admin', 'super_admin')
      AND au.is_active = true
    )
  );

-- Ensure security_audit_logs table has proper RLS
DROP POLICY IF EXISTS "Users can view own security logs" ON public.security_audit_logs;
DROP POLICY IF EXISTS "Service role only access" ON public.security_audit_logs;

CREATE POLICY "Users can view own security logs" ON public.security_audit_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role only access" ON public.security_audit_logs
  FOR ALL USING (auth.role() = 'service_role');

-- Ensure auth_rate_limits table has proper RLS
DROP POLICY IF EXISTS "No direct access to auth rate limits" ON public.auth_rate_limits;

CREATE POLICY "No direct access to auth rate limits" ON public.auth_rate_limits
  FOR SELECT USING (false);

-- Ensure articles table has proper RLS
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;

CREATE POLICY "Anyone can view published articles" ON public.articles
  FOR SELECT USING (published_at IS NOT NULL);

-- Clear existing sample data before inserting fresh data
DELETE FROM public.experts;
DELETE FROM public.articles;

-- Add fresh sample data for immediate functionality
INSERT INTO public.experts (name, title, bio, specialties, industries, experience_years, hourly_rate, profile_image_url)
VALUES 
  ('Dr. Sarah Chen', 'AI & Digital Transformation Expert', 'Former Tesla AI director with 15+ years in autonomous systems and digital transformation. Specializes in implementing AI solutions for enterprise-scale operations.', 
   ARRAY['Artificial Intelligence', 'Machine Learning', 'Digital Transformation', 'Autonomous Systems'], 
   ARRAY['Technology', 'Automotive', 'Energy', 'Manufacturing'], 15, 350.00, '/placeholder.svg'),
  ('Marcus Rodriguez', 'Maritime Technology Specialist', 'Naval architect and technology consultant specializing in smart shipping solutions and IoT integration for maritime operations.',
   ARRAY['Maritime Technology', 'IoT Systems', 'Automation', 'Naval Architecture'], 
   ARRAY['Maritime', 'Logistics', 'Technology', 'Shipping'], 12, 280.00, '/placeholder.svg'),
  ('Elena Volkov', 'Energy Transition Consultant', 'Energy sector veteran focused on renewable integration and smart grid technologies with extensive policy and implementation experience.',
   ARRAY['Renewable Energy', 'Smart Grids', 'Energy Policy', 'Sustainability'], 
   ARRAY['Energy', 'Utilities', 'Government', 'Clean Tech'], 18, 320.00, '/placeholder.svg'),
  ('David Kim', 'Fintech & Capital Markets Expert', 'Former Goldman Sachs VP specializing in digital banking transformation and blockchain implementation.',
   ARRAY['Financial Technology', 'Blockchain', 'Digital Banking', 'Risk Management'], 
   ARRAY['Finance', 'Banking', 'Capital Markets', 'Technology'], 14, 400.00, '/placeholder.svg');

-- Add fresh sample articles
INSERT INTO public.articles (title, content, category, author, read_time_minutes)
VALUES 
  ('The Future of AI in Maritime Operations', 'Artificial intelligence is revolutionizing maritime operations through predictive maintenance, autonomous navigation, and optimized route planning. This comprehensive analysis explores how leading shipping companies are implementing AI solutions to reduce costs, improve safety, and enhance operational efficiency across global supply chains.', 
   'Maritime Technology', 'Dr. Sarah Chen', 8),
  ('Energy Grid Modernization: A Comprehensive Guide', 'Smart grid technologies are transforming how we distribute and consume energy. This comprehensive guide explores the key components of modern energy infrastructure, including renewable integration, demand response systems, and the critical role of energy storage in creating resilient power networks.', 
   'Energy Innovation', 'Elena Volkov', 12),
  ('Digital Transformation Strategies for Traditional Industries', 'Legacy industries are embracing digital transformation to remain competitive in an increasingly connected world. Here are proven strategies for successful modernization, including technology adoption frameworks, change management approaches, and measuring ROI on digital initiatives.', 
   'Digital Strategy', 'Marcus Rodriguez', 10),
  ('Capital Markets in the Digital Age', 'The financial services landscape is evolving rapidly with the emergence of DeFi, digital assets, and algorithmic trading. This analysis examines how traditional capital markets are adapting to digital disruption and what it means for institutional investors and market participants.', 
   'Financial Technology', 'David Kim', 15);