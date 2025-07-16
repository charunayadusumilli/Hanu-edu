-- Phase 1: Fix Function Search Path Issues
-- Update all functions to have proper search_path security settings

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

-- Phase 2: Create missing essential tables
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

-- Phase 3: Enable RLS and create policies for new tables
-- Enable RLS for all new tables
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Phase 4: Update domain configuration
-- Update admin configurations for proper domain handling
INSERT INTO public.admin_configurations (config_type, config_value, created_by) 
VALUES 
  ('site_url', 'https://hanu-consulting.com', NULL),
  ('allowed_domains', 'hanu-consulting.com,www.hanu-consulting.com,dahqblnyckleyoaodnbl.supabase.co', NULL),
  ('auth_redirect_url', 'https://hanu-consulting.com/auth/callback', NULL)
ON CONFLICT (config_type) DO UPDATE SET
  config_value = EXCLUDED.config_value,
  updated_at = now();

-- Phase 5: Add performance indexes
CREATE INDEX IF NOT EXISTS idx_referral_codes_user_id ON public.referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON public.referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_rate_limits_user_action ON public.rate_limits(user_id, action);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_date ON public.user_analytics(user_id, date);

-- Phase 6: Clean up profile data
UPDATE public.profiles SET 
  last_activity_at = COALESCE(last_activity_at, now()),
  login_count = COALESCE(login_count, 0)
WHERE last_activity_at IS NULL OR login_count IS NULL;