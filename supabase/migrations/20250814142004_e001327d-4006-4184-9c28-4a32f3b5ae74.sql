-- Fix security issue: Restrict access to user_analytics table
-- This table contains sensitive user study patterns, assessment scores, and learning topics

-- Enable Row Level Security on user_analytics table if not already enabled
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Drop any existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can view user analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Public can view user analytics" ON public.user_analytics;

-- Create secure RLS policies for user_analytics table
-- Users can only view their own analytics data
CREATE POLICY "Users can view their own analytics data" 
ON public.user_analytics 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can only insert their own analytics data
CREATE POLICY "Users can insert their own analytics data" 
ON public.user_analytics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own analytics data
CREATE POLICY "Users can update their own analytics data" 
ON public.user_analytics 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Admins can view all analytics data for legitimate business purposes
CREATE POLICY "Admins can view all analytics data" 
ON public.user_analytics 
FOR SELECT 
USING (is_admin_user());

-- Service role can manage analytics data for system operations
CREATE POLICY "Service role can manage analytics data" 
ON public.user_analytics 
FOR ALL 
USING (auth.role() = 'service_role');

-- Add comment to document security measures
COMMENT ON TABLE public.user_analytics IS 'Contains sensitive user study data - access restricted to data owner and authorized admins only';