-- Add missing RLS policies for tables that need them
-- Add policies for referral_codes table
CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own referral codes" ON public.referral_codes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service can manage referral codes" ON public.referral_codes
  FOR ALL USING (auth.role() = 'service_role'::text);

-- Add policies for rate_limits table
CREATE POLICY "Users can view their own rate limits" ON public.rate_limits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service can manage rate limits" ON public.rate_limits
  FOR ALL USING (auth.role() = 'service_role'::text);

-- Add policies for user_analytics table
CREATE POLICY "Users can view their own analytics" ON public.user_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analytics" ON public.user_analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analytics" ON public.user_analytics
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service can manage analytics" ON public.user_analytics
  FOR ALL USING (auth.role() = 'service_role'::text);