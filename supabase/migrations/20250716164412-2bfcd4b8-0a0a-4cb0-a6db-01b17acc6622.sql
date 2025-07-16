-- Final Supabase Security Migration - Fix All Remaining Issues (Corrected)
-- This migration addresses all security warnings and prepares for production deployment

-- Fix Function Search Path Security Issues
-- Update functions to have proper search_path to prevent injection attacks

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
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

-- Fix other security functions
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

-- Update domain validation function for production
CREATE OR REPLACE FUNCTION public.validate_domain_access(domain_url text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  -- Allow access from hanu-consulting.com and its subdomains
  RETURN domain_url LIKE '%hanu-consulting.com%' OR 
         domain_url LIKE '%www.hanu-consulting.com%' OR
         domain_url LIKE '%lovable.app%' OR 
         domain_url LIKE '%localhost%';
END;
$function$;