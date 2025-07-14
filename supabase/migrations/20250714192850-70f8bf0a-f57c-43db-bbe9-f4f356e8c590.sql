-- Phase 1: Database Cleanup - Remove duplicate RLS policies and optimize
-- This will clean up the massive policy duplication causing Supabase warnings

-- Drop all duplicate and conflicting policies systematically
DROP POLICY IF EXISTS "Users can view their own assessments" ON public.user_assessments;
DROP POLICY IF EXISTS "Users can create their own assessments" ON public.user_assessments;
DROP POLICY IF EXISTS "Users can update their own assessments" ON public.user_assessments;

DROP POLICY IF EXISTS "Users can view their own education" ON public.user_education;
DROP POLICY IF EXISTS "Users can manage their own education" ON public.user_education;

DROP POLICY IF EXISTS "Users can view their own job match scores" ON public.job_match_scores;
DROP POLICY IF EXISTS "Users can update their own job match scores" ON public.job_match_scores;

DROP POLICY IF EXISTS "Public can view discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can create their own discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can update their own discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can delete their own discussions" ON public.assessment_discussions;
DROP POLICY IF EXISTS "Users can manage own discussions" ON public.assessment_discussions;

DROP POLICY IF EXISTS "Users can view their own admin profile" ON public.admin_users;
DROP POLICY IF EXISTS "Admin can manage admin users" ON public.admin_users;

DROP POLICY IF EXISTS "Users can join study groups" ON public.study_group_members;
DROP POLICY IF EXISTS "Users can leave study groups" ON public.study_group_members;
DROP POLICY IF EXISTS "Users can leave their own group memberships" ON public.study_group_members;
DROP POLICY IF EXISTS "Anyone can view study group members" ON public.study_group_members;

DROP POLICY IF EXISTS "Users can view their own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Users can create their own certificates" ON public.certificates;
DROP POLICY IF EXISTS "Users can delete recent certificates" ON public.certificates;
DROP POLICY IF EXISTS "System can create certificates" ON public.certificates;
DROP POLICY IF EXISTS "Service can manage certificates" ON public.certificates;

DROP POLICY IF EXISTS "Users can create assessment attempts" ON public.assessment_attempts;
DROP POLICY IF EXISTS "Users can view their assessment attempts" ON public.assessment_attempts;

-- Create single, optimized policies for each table
CREATE POLICY "Users can manage their own assessments" ON public.user_assessments
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own education" ON public.user_education
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own job match scores" ON public.job_match_scores
FOR ALL USING (auth.uid() = user_id OR is_admin_user());

CREATE POLICY "Public can view discussions" ON public.assessment_discussions
FOR SELECT USING (true);

CREATE POLICY "Users can manage own discussions" ON public.assessment_discussions
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage admin users" ON public.admin_users
FOR ALL USING (is_admin_user());

CREATE POLICY "Users can view their own admin profile" ON public.admin_users
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage study group memberships" ON public.study_group_members
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view study group members" ON public.study_group_members
FOR SELECT USING (true);

CREATE POLICY "Users can manage their own certificates" ON public.certificates
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service can manage certificates" ON public.certificates
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can manage their own assessment attempts" ON public.assessment_attempts
FOR ALL USING (auth.uid() = user_id);

-- Optimize indexes for better policy performance
CREATE INDEX IF NOT EXISTS idx_user_assessments_user_id ON public.user_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_education_user_id ON public.user_education(user_id);
CREATE INDEX IF NOT EXISTS idx_job_match_scores_user_id ON public.job_match_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_discussions_user_id ON public.assessment_discussions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON public.admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_user_id ON public.study_group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_user_id ON public.assessment_attempts(user_id);

-- Create optimized security definer function for domain validation
CREATE OR REPLACE FUNCTION public.validate_domain_access(domain_url text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Allow access from hanu-consulting.com and its subdomains
  RETURN domain_url LIKE '%hanu-consulting.com%' OR 
         domain_url LIKE '%lovable.app%' OR 
         domain_url LIKE '%localhost%';
END;
$$;