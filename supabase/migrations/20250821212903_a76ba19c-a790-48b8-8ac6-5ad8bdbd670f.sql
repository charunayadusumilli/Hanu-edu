-- Clean up and secure user_analytics table RLS policies
-- Drop all existing policies to avoid conflicts
DROP POLICY IF EXISTS "Service can manage analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "System can manage analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can create their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can update their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can view own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can view their own analytics" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can view their own analytics data" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can insert their own analytics data" ON public.user_analytics;
DROP POLICY IF EXISTS "Users can update their own analytics data" ON public.user_analytics;
DROP POLICY IF EXISTS "Admins can view all analytics data" ON public.user_analytics;
DROP POLICY IF EXISTS "Service role can manage analytics data" ON public.user_analytics;

-- Create secure, non-overlapping policies
-- Users can only view their own analytics data
CREATE POLICY "Users can view own analytics only"
  ON public.user_analytics
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own analytics data
CREATE POLICY "Users can insert own analytics only"
  ON public.user_analytics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own analytics data
CREATE POLICY "Users can update own analytics only"
  ON public.user_analytics
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own analytics data
CREATE POLICY "Users can delete own analytics only"
  ON public.user_analytics
  FOR DELETE
  USING (auth.uid() = user_id);

-- Admins can view all analytics (for admin dashboard purposes)
CREATE POLICY "Admins can view all analytics"
  ON public.user_analytics
  FOR SELECT
  USING (is_admin_user());

-- Service role can manage all analytics (for system operations)
CREATE POLICY "Service role can manage all analytics"
  ON public.user_analytics
  FOR ALL
  USING (auth.role() = 'service_role'::text)
  WITH CHECK (auth.role() = 'service_role'::text);