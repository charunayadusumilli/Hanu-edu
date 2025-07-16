-- Security Fix Migration: Add missing RLS policies and fix function security

-- Fix 1: Add RLS policies for api_configurations table
CREATE POLICY "Only admins can manage API configurations" 
ON public.api_configurations 
FOR ALL 
USING (is_admin_user());

-- Fix 2: Add RLS policies for auth_attempts table  
CREATE POLICY "Service role can manage auth attempts"
ON public.auth_attempts
FOR ALL
USING (auth.role() = 'service_role');

CREATE POLICY "Admins can view auth attempts"
ON public.auth_attempts
FOR SELECT
USING (is_admin_user());

-- Fix 3: Update function search paths for security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
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

-- Fix 4: Update other security-sensitive functions
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.check_admin_role(user_uuid uuid, required_role admin_role)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE user_id = user_uuid 
        AND role = required_role 
        AND is_active = true
    );
$$;

CREATE OR REPLACE FUNCTION public.auto_generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
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
$$;

-- Fix 5: Ensure rate limiting tables have proper security
CREATE POLICY "No public access to rate limits"
ON public.rate_limits
FOR ALL
USING (false);

CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
USING (auth.role() = 'service_role');

-- Fix 6: Add security event logging policy
CREATE POLICY "Service role can insert security logs"
ON public.security_audit_logs
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Fix 7: Ensure admin audit logs are secure
CREATE POLICY "Service role can insert admin audit logs"
ON public.admin_audit_logs
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

-- Add comment for manual security settings
COMMENT ON SCHEMA public IS 'Security Migration Complete - Manual Steps Required:
1. Enable leaked password protection in Supabase Auth settings
2. Review and configure email rate limiting
3. Enable advanced threat protection if available';