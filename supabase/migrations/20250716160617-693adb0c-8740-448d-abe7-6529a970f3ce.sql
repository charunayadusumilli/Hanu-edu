-- Create security logging tables
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  resource_type text,
  resource_id text,
  metadata jsonb DEFAULT '{}',
  risk_level text DEFAULT 'low',
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.auth_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_type text NOT NULL,
  success boolean,
  email text,
  failure_reason text,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_attempts ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY IF NOT EXISTS "Users can view own security logs" ON public.security_audit_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Service role can insert security logs" ON public.security_audit_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Service role can insert auth attempts" ON public.auth_attempts
  FOR INSERT WITH CHECK (true);

-- Add necessary RLS policies for profiles
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Add necessary RLS policies for other tables
CREATE POLICY IF NOT EXISTS "Anyone can view experts" ON public.experts
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Anyone can view published articles" ON public.articles
  FOR SELECT USING (published_at IS NOT NULL);

CREATE POLICY IF NOT EXISTS "Anyone can view published courses" ON public.courses
  FOR SELECT USING (is_published = true);

CREATE POLICY IF NOT EXISTS "Users can view own challenges" ON public.client_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can create own challenges" ON public.client_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own challenges" ON public.client_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- Create necessary trigger functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, first_name, last_name, phone, auth_provider)
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();