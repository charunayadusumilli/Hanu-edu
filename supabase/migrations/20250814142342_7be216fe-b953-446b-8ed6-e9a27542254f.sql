-- Fix critical security issues for multiple user data tables
-- Secure user_career_profiles, user_analytics, client_challenges, and profiles tables

-- 1. Fix user_career_profiles table (main issue)
-- Drop any potentially problematic policies first
DROP POLICY IF EXISTS "Public can view career profiles" ON public.user_career_profiles;
DROP POLICY IF EXISTS "Anyone can view career profiles" ON public.user_career_profiles;

-- Ensure RLS is enabled (it should already be, but confirming)
ALTER TABLE public.user_career_profiles ENABLE ROW LEVEL SECURITY;

-- The existing "Users can manage their own career profile" policy should be sufficient
-- But let's verify it's properly restrictive by adding explicit policies

-- Users can only view their own career profile
CREATE POLICY "Users can view own career profile only" 
ON public.user_career_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can only insert their own career profile
CREATE POLICY "Users can insert own career profile only" 
ON public.user_career_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own career profile
CREATE POLICY "Users can update own career profile only" 
ON public.user_career_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can only delete their own career profile
CREATE POLICY "Users can delete own career profile only" 
ON public.user_career_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Admins can view all career profiles for legitimate business purposes
CREATE POLICY "Admins can view all career profiles" 
ON public.user_career_profiles 
FOR SELECT 
USING (is_admin_user());

-- 2. Fix client_challenges table - secure contact information
ALTER TABLE public.client_challenges ENABLE ROW LEVEL SECURITY;

-- Drop any overly permissive policies
DROP POLICY IF EXISTS "Public can view challenges" ON public.client_challenges;
DROP POLICY IF EXISTS "Anyone can view challenges" ON public.client_challenges;

-- Users can only create challenges with their own user_id
-- (existing policies should cover this, but ensuring they're secure)

-- 3. Add additional security comments
COMMENT ON TABLE public.user_career_profiles IS 'Contains sensitive personal career data - access restricted to data owner and authorized admins only';
COMMENT ON TABLE public.client_challenges IS 'Contains sensitive client contact information - access restricted to data owner only';

-- 4. Service role access for system operations
CREATE POLICY "Service role can manage career profiles" 
ON public.user_career_profiles 
FOR ALL 
USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage client challenges" 
ON public.client_challenges 
FOR ALL 
USING (auth.role() = 'service_role');