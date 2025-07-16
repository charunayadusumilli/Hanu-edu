-- Fix remaining RLS and search path issues
-- Add missing RLS policies for tables without any policies

-- Fix any remaining function search path issues
CREATE OR REPLACE FUNCTION public.generate_verification_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
    -- Generate a simple verification code
    RETURN upper(substring(md5(random()::text), 1, 8));
END;
$function$;

-- Add RLS policies for tables that have RLS enabled but no policies
-- Check for any tables that might need policies

-- Add policy for referral_codes table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'referral_codes') THEN
        -- Enable RLS if not already enabled
        ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;
        
        -- Add policy for referral codes
        DROP POLICY IF EXISTS "Users can view their own referral codes" ON public.referral_codes;
        CREATE POLICY "Users can view their own referral codes" 
        ON public.referral_codes 
        FOR SELECT 
        USING (auth.uid() = user_id);
        
        DROP POLICY IF EXISTS "Users can insert their own referral codes" ON public.referral_codes;
        CREATE POLICY "Users can insert their own referral codes" 
        ON public.referral_codes 
        FOR INSERT 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Add policy for rate_limits table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'rate_limits') THEN
        -- Enable RLS if not already enabled
        ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
        
        -- Add policy for rate limits
        DROP POLICY IF EXISTS "Users can view their own rate limits" ON public.rate_limits;
        CREATE POLICY "Users can view their own rate limits" 
        ON public.rate_limits 
        FOR SELECT 
        USING (auth.uid() = user_id);
        
        DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;
        CREATE POLICY "Service role can manage rate limits" 
        ON public.rate_limits 
        FOR ALL 
        USING (auth.role() = 'service_role');
    END IF;
END $$;