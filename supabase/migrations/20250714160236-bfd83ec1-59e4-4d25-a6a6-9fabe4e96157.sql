-- Fix Supabase RLS Policy Warnings - Complete Cleanup
-- Phase 1: Remove duplicate and conflicting policies

-- Clean up assessment_discussions table (has 10+ overlapping policies)
DROP POLICY IF EXISTS "Anyone can view assessment discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Anyone can view discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can view assessment discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can view discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Authenticated users can create discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can create discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can insert their own discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can update own discussions" ON public.assessment_discussions;

-- Create single, comprehensive policies for assessment_discussions
CREATE POLICY "Public can view discussions" ON public.assessment_discussions
FOR SELECT USING (true);

CREATE POLICY "Users can manage own discussions" ON public.assessment_discussions
FOR ALL USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Clean up admin_users table (has conflicting policies)
DROP POLICY IF EXISTS "Admin users can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage all admin users" ON public.admin_users;

-- Keep only essential admin_users policies
-- (Keep existing "Admin can manage admin users", "Users can view their own admin profile")

-- Clean up study_group_members (has many duplicate policies)
DROP POLICY IF EXISTS "Users can join groups" ON public.study_group_members;
DROP POLICY IF EXISTS "Users can leave groups" ON public.study_group_members;
DROP POLICY IF EXISTS "Users can view group memberships" ON public.study_group_members;
DROP POLICY IF EXISTS "Users can view study group members" ON public.study_group_members;

-- Keep simplified study_group_members policies
-- (Keep existing "Anyone can view study group members", "Users can join study groups", etc.)

-- Clean up jobs table (has many overlapping policies)
DROP POLICY IF EXISTS "Anyone can view jobs" ON public.jobs;
DROP POLICY IF EXISTS "Anyone can view published jobs" ON public.jobs;
DROP POLICY IF EXISTS "Public can view jobs" ON public.jobs;

-- Keep single public access policy for jobs
-- (Keep existing "Admin can manage jobs" and simplified public access)

-- Clean up certificates table (has overlapping policies)
DROP POLICY IF EXISTS "Users can view own certificates" ON public.certificates;

-- Keep essential certificates policies
-- (Keep "Users can view their own certificates", "Users can create their own certificates", etc.)

-- Clean up job_match_scores (has conflicting policies)
DROP POLICY IF EXISTS "Users can view their own job matches" ON public.job_match_scores;

-- Keep comprehensive job_match_scores policy
-- (Keep "Users can update their own job match scores", "Users can view their own job match scores")

-- Clean up user_assessments (has overlapping policies)
DROP POLICY IF EXISTS "Users can manage own assessments" ON public.user_assessments;

-- Keep specific user_assessments policies
-- (Keep individual SELECT, INSERT, UPDATE policies for clarity)

-- Clean up user_education (has duplicate policies)
DROP POLICY IF EXISTS "Users can manage own education" ON public.user_education;

-- Keep specific user_education policy
-- (Keep "Users can manage their own education")

-- Phase 2: Optimize security definer functions for better policy performance
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

-- Phase 3: Add missing constraints and indexes for policy efficiency
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_career_profiles_user_id 
ON public.user_career_profiles(user_id);

CREATE INDEX IF NOT EXISTS idx_client_challenges_user_id 
ON public.client_challenges(user_id);

CREATE INDEX IF NOT EXISTS idx_assessment_attempts_user_id 
ON public.assessment_attempts(user_id);

-- Phase 4: Ensure all user-data policies are consistent
-- Update any remaining policies to use consistent patterns

-- Fix admin_configurations to use proper admin check
DROP POLICY IF EXISTS "Admin users can manage configurations" ON public.admin_configurations;
CREATE POLICY "Admins can manage configurations" ON public.admin_configurations
FOR ALL USING (is_admin_user());

-- Ensure proper policy for process_flows (remove duplicate)
DROP POLICY IF EXISTS "Admin can manage process flows" ON public.process_flows;
-- Keep "Admins can manage process flows" and "Employees can view process flows"

-- Ensure proper policy for screen_flows (remove duplicate) 
DROP POLICY IF EXISTS "Admin can manage screen flows" ON public.screen_flows;
-- Keep "Admins can manage screen flows" and "Employees can view screen flows"

-- Clean up admin_audit_logs (remove duplicate policies)
DROP POLICY IF EXISTS "Admin can manage admin audit logs" ON public.admin_audit_logs;
-- Keep "Super admins can view all audit logs" and "Users can view their own audit logs"

-- Ensure security_audit_logs has proper admin access
DROP POLICY IF EXISTS "Admin can view security audit logs" ON public.security_audit_logs;
CREATE POLICY "Admins can view security audit logs" ON public.security_audit_logs
FOR SELECT USING (is_admin_user());

-- Final cleanup: Remove any remaining over-broad service policies where not needed
-- Keep service role access only where absolutely necessary for system operations