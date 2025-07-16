-- Clean up conflicting RLS policies on subscribers table
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Users can create their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "insert_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can update their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscribers;
DROP POLICY IF EXISTS "select_own_subscription" ON public.subscribers;
DROP POLICY IF EXISTS "update_own_subscription" ON public.subscribers;

-- Create clean, simple RLS policies
CREATE POLICY "Anyone can subscribe" ON public.subscribers
FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Users can view their own subscriptions" ON public.subscribers
FOR SELECT TO public USING (auth.uid() = user_id OR auth.email() = email);

CREATE POLICY "Users can update their own subscriptions" ON public.subscribers
FOR UPDATE TO public USING (auth.uid() = user_id OR auth.email() = email);