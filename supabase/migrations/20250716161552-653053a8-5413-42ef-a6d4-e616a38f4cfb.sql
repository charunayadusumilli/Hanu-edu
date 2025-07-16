-- Phase 1: Fix Function Search Path Issues
-- Update all functions to have proper search_path security settings

-- Fix generate_referral_code function
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  referral_code text;
BEGIN
  -- Generate a random 8-character referral code
  SELECT array_to_string(ARRAY(
    SELECT substr('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', ((random()*(36-1)+1)::integer), 1)
    FROM generate_series(1, 8)
  ), '') INTO referral_code;
  
  RETURN referral_code;
END;
$function$;

-- Fix auto_generate_referral_code function
CREATE OR REPLACE FUNCTION public.auto_generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Generate referral code if not already set
  IF NEW.referral_code IS NULL THEN
    INSERT INTO public.referral_codes (code, user_id)
    VALUES (generate_referral_code(), NEW.id);
    
    UPDATE public.profiles 
    SET referral_code = (SELECT code FROM public.referral_codes WHERE user_id = NEW.id ORDER BY created_at DESC LIMIT 1)
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Fix set_certificate_verification_code function
CREATE OR REPLACE FUNCTION public.set_certificate_verification_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  IF NEW.verification_code IS NULL THEN
    NEW.verification_code = generate_verification_code();
  END IF;
  RETURN NEW;
END;
$function$;

-- Fix track_user_login function
CREATE OR REPLACE FUNCTION public.track_user_login(user_uuid uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.profiles 
  SET 
    last_login_at = now(),
    login_count = COALESCE(login_count, 0) + 1,
    last_activity_at = now()
  WHERE id = user_uuid;
END;
$function$;

-- Fix update_job_quality_score function
CREATE OR REPLACE FUNCTION public.update_job_quality_score()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $function$
BEGIN
  NEW.quality_score := calculate_job_quality_score(
    NEW.title,
    NEW.description,
    NEW.company,
    NEW.salary_min,
    NEW.salary_max,
    NEW.requirements,
    NEW.benefits
  );
  RETURN NEW;
END;
$function$;

-- Phase 2: Add Missing RLS Policies
-- Add policies for tables that have RLS enabled but no policies

-- Add RLS policies for referral_codes table if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'referral_codes' AND table_schema = 'public') THEN
    -- Enable RLS if not already enabled
    ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can view their own referral codes" ON public.referral_codes;
    DROP POLICY IF EXISTS "Users can create their own referral codes" ON public.referral_codes;
    DROP POLICY IF EXISTS "Service can manage referral codes" ON public.referral_codes;
    
    -- Create new policies
    CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
      FOR SELECT USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can create their own referral codes" ON public.referral_codes
      FOR INSERT WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Service can manage referral codes" ON public.referral_codes
      FOR ALL USING (auth.role() = 'service_role'::text);
  END IF;
END $$;

-- Add RLS policies for rate_limits table if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'rate_limits' AND table_schema = 'public') THEN
    -- Enable RLS if not already enabled
    ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can view their own rate limits" ON public.rate_limits;
    DROP POLICY IF EXISTS "Service can manage rate limits" ON public.rate_limits;
    
    -- Create new policies
    CREATE POLICY "Users can view their own rate limits" ON public.rate_limits
      FOR SELECT USING (auth.uid() = user_id);
    
    CREATE POLICY "Service can manage rate limits" ON public.rate_limits
      FOR ALL USING (auth.role() = 'service_role'::text);
  END IF;
END $$;

-- Add RLS policies for user_analytics table if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_analytics' AND table_schema = 'public') THEN
    -- Enable RLS if not already enabled
    ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
    
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Users can view their own analytics" ON public.user_analytics;
    DROP POLICY IF EXISTS "Users can insert their own analytics" ON public.user_analytics;
    DROP POLICY IF EXISTS "Users can update their own analytics" ON public.user_analytics;
    DROP POLICY IF EXISTS "Service can manage analytics" ON public.user_analytics;
    
    -- Create new policies
    CREATE POLICY "Users can view their own analytics" ON public.user_analytics
      FOR SELECT USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert their own analytics" ON public.user_analytics
      FOR INSERT WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update their own analytics" ON public.user_analytics
      FOR UPDATE USING (auth.uid() = user_id);
    
    CREATE POLICY "Service can manage analytics" ON public.user_analytics
      FOR ALL USING (auth.role() = 'service_role'::text);
  END IF;
END $$;

-- Phase 3: Create missing tables for better functionality
-- Create referral_codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code text NOT NULL UNIQUE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  used_count integer DEFAULT 0,
  max_uses integer DEFAULT NULL,
  expires_at timestamp with time zone DEFAULT NULL,
  is_active boolean DEFAULT true
);

-- Enable RLS for referral_codes
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Create policies for referral_codes
CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own referral codes" ON public.referral_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service can manage referral codes" ON public.referral_codes
  FOR ALL USING (auth.role() = 'service_role'::text);

-- Create rate_limits table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  window_start timestamp with time zone NOT NULL,
  count integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, action, window_start)
);

-- Enable RLS for rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policies for rate_limits
CREATE POLICY "Users can view their own rate limits" ON public.rate_limits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can manage rate limits" ON public.rate_limits
  FOR ALL USING (auth.role() = 'service_role'::text);

-- Create user_analytics table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  time_studied integer DEFAULT 0,
  assessments_completed integer DEFAULT 0,
  average_score numeric DEFAULT NULL,
  topics_studied text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS for user_analytics
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for user_analytics
CREATE POLICY "Users can view their own analytics" ON public.user_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON public.user_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics" ON public.user_analytics
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service can manage analytics" ON public.user_analytics
  FOR ALL USING (auth.role() = 'service_role'::text);

-- Phase 4: Update domain configuration functions
-- Create domain validation function
CREATE OR REPLACE FUNCTION public.validate_domain_access(domain_url text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Allow access from hanu-consulting.com and its subdomains
  RETURN domain_url LIKE '%hanu-consulting.com%' OR 
         domain_url LIKE '%lovable.app%' OR 
         domain_url LIKE '%localhost%';
END;
$function$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Create triggers for updated_at columns
CREATE TRIGGER update_user_analytics_updated_at
  BEFORE UPDATE ON public.user_analytics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Phase 5: Ensure proper project configuration
-- Update admin configurations for proper domain handling
INSERT INTO public.admin_configurations (config_type, config_value, created_by) 
VALUES 
  ('site_url', 'https://hanu-consulting.com', NULL),
  ('allowed_domains', 'hanu-consulting.com,www.hanu-consulting.com,dahqblnyckleyoaodnbl.supabase.co', NULL),
  ('auth_redirect_url', 'https://hanu-consulting.com/auth/callback', NULL)
ON CONFLICT (config_type) DO UPDATE SET
  config_value = EXCLUDED.config_value,
  updated_at = now();

-- Ensure proper indexing for performance
CREATE INDEX IF NOT EXISTS idx_referral_codes_user_id ON public.referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON public.referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_action ON public.rate_limits(user_id, action);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_date ON public.user_analytics(user_id, date);

-- Clean up any inconsistent data
UPDATE public.profiles SET 
  last_activity_at = COALESCE(last_activity_at, now()),
  login_count = COALESCE(login_count, 0)
WHERE last_activity_at IS NULL OR login_count IS NULL;