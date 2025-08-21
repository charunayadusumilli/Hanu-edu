-- Fix RLS policies on client_inquiries table
DROP POLICY IF EXISTS "Users can view own inquiries" ON public.client_inquiries;
DROP POLICY IF EXISTS "Anyone can view inquiries" ON public.client_inquiries;
DROP POLICY IF EXISTS "Public can view inquiries" ON public.client_inquiries;

-- Allow users to insert their own inquiries (including anonymous users for public forms)
CREATE POLICY "Anyone can create inquiries"
  ON public.client_inquiries
  FOR INSERT
  WITH CHECK (true);

-- Allow only the owner to view their own inquiries (if they have user_id)
CREATE POLICY "Users can view own inquiries"
  ON public.client_inquiries
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow admins to view all inquiries
CREATE POLICY "Admins can view all inquiries"
  ON public.client_inquiries
  FOR SELECT
  USING (is_admin_user());

-- Allow admins to update inquiries (for status changes, etc.)
CREATE POLICY "Admins can update inquiries"
  ON public.client_inquiries
  FOR UPDATE
  USING (is_admin_user());