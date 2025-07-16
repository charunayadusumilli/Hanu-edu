-- Security Fix Migration: Add missing RLS policies and fix function security (corrected)

-- Fix 1: Add RLS policies for api_configurations table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'api_configurations' 
        AND policyname = 'Only admins can manage API configurations'
    ) THEN
        CREATE POLICY "Only admins can manage API configurations" 
        ON public.api_configurations 
        FOR ALL 
        USING (is_admin_user());
    END IF;
END $$;

-- Fix 2: Add RLS policies for auth_attempts table  
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'auth_attempts' 
        AND policyname = 'Service role can manage auth attempts'
    ) THEN
        CREATE POLICY "Service role can manage auth attempts"
        ON public.auth_attempts
        FOR ALL
        USING (auth.role() = 'service_role');
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'auth_attempts' 
        AND policyname = 'Admins can view auth attempts'
    ) THEN
        CREATE POLICY "Admins can view auth attempts"
        ON public.auth_attempts
        FOR SELECT
        USING (is_admin_user());
    END IF;
END $$;

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

-- Fix 5: Add security event logging policy
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'security_audit_logs' 
        AND policyname = 'Service role can insert security logs'
    ) THEN
        CREATE POLICY "Service role can insert security logs"
        ON public.security_audit_logs
        FOR INSERT
        WITH CHECK (auth.role() = 'service_role');
    END IF;
END $$;

-- Fix 6: Ensure admin audit logs are secure
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'admin_audit_logs' 
        AND policyname = 'Service role can insert admin audit logs'
    ) THEN
        CREATE POLICY "Service role can insert admin audit logs"
        ON public.admin_audit_logs
        FOR INSERT
        WITH CHECK (auth.role() = 'service_role');
    END IF;
END $$;