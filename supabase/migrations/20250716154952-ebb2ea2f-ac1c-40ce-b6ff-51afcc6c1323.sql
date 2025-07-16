-- Fresh setup with proper existence checks
-- Drop and recreate types to ensure clean state
DO $$
BEGIN
    -- Drop existing types if they exist
    DROP TYPE IF EXISTS public.user_role CASCADE;
    DROP TYPE IF EXISTS public.admin_role CASCADE;
    DROP TYPE IF EXISTS public.onboarding_step CASCADE;
    DROP TYPE IF EXISTS public.experience_level CASCADE;
    DROP TYPE IF EXISTS public.job_type CASCADE;
    DROP TYPE IF EXISTS public.application_status CASCADE;
END $$;

-- Create fresh types
CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin', 'expert');
CREATE TYPE public.admin_role AS ENUM ('employee', 'admin', 'super_admin');
CREATE TYPE public.onboarding_step AS ENUM ('profile_setup', 'preferences', 'completed');
CREATE TYPE public.experience_level AS ENUM ('entry', 'mid', 'senior', 'executive');
CREATE TYPE public.job_type AS ENUM ('full_time', 'part_time', 'contract', 'freelance');
CREATE TYPE public.application_status AS ENUM ('applied', 'screening', 'interview', 'offer', 'rejected', 'withdrawn');

-- Update profiles table structure to match new requirements
ALTER TABLE public.profiles 
  ALTER COLUMN role TYPE user_role USING role::user_role,
  ALTER COLUMN onboarding_step TYPE onboarding_step USING onboarding_step::onboarding_step;

-- Ensure all essential functions exist with proper security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    first_name, 
    last_name,
    phone,
    auth_provider
  )
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
$$;

-- Ensure admin function exists
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND is_active = true
    AND role IN ('admin', 'super_admin')
  );
$$;

-- Create domain validation function for security
CREATE OR REPLACE FUNCTION public.validate_domain_access(domain_url text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Allow access from hanu-consulting.com and its subdomains
  RETURN domain_url LIKE '%hanu-consulting.com%' OR 
         domain_url LIKE '%lovable.app%' OR 
         domain_url LIKE '%localhost%';
END;
$$;

-- Update triggers to ensure they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add sample data for immediate functionality
INSERT INTO public.experts (name, title, bio, specialties, industries, experience_years, hourly_rate, profile_image_url)
VALUES 
  ('Dr. Sarah Chen', 'AI & Digital Transformation Expert', 'Former Tesla AI director with 15+ years in autonomous systems and digital transformation.', 
   ARRAY['Artificial Intelligence', 'Machine Learning', 'Digital Transformation'], 
   ARRAY['Technology', 'Automotive', 'Energy'], 15, 350.00, '/placeholder.svg'),
  ('Marcus Rodriguez', 'Maritime Technology Specialist', 'Naval architect and technology consultant specializing in smart shipping solutions.',
   ARRAY['Maritime Technology', 'IoT Systems', 'Automation'], 
   ARRAY['Maritime', 'Logistics', 'Technology'], 12, 280.00, '/placeholder.svg'),
  ('Elena Volkov', 'Energy Transition Consultant', 'Energy sector veteran focused on renewable integration and smart grid technologies.',
   ARRAY['Renewable Energy', 'Smart Grids', 'Energy Policy'], 
   ARRAY['Energy', 'Utilities', 'Government'], 18, 320.00, '/placeholder.svg')
ON CONFLICT DO NOTHING;

-- Add sample articles
INSERT INTO public.articles (title, content, category, author, read_time_minutes)
VALUES 
  ('The Future of AI in Maritime Operations', 'Artificial intelligence is revolutionizing maritime operations through predictive maintenance, autonomous navigation, and optimized route planning...', 
   'Maritime Technology', 'Dr. Sarah Chen', 8),
  ('Energy Grid Modernization: A Comprehensive Guide', 'Smart grid technologies are transforming how we distribute and consume energy. This comprehensive guide explores the key components...', 
   'Energy Innovation', 'Elena Volkov', 12),
  ('Digital Transformation Strategies for Traditional Industries', 'Legacy industries are embracing digital transformation to remain competitive. Here are proven strategies for successful modernization...', 
   'Digital Strategy', 'Marcus Rodriguez', 10)
ON CONFLICT DO NOTHING;