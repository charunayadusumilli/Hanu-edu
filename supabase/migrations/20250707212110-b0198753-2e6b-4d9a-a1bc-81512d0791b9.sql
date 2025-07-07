-- Create the missing generate_referral_code function
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS text
LANGUAGE plpgsql
AS $function$
DECLARE
  referral_code text;
BEGIN
  -- Generate a random 8-character referral code
  SELECT array_to_string(ARRAY(
    SELECT substr('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', ((random()*(36-1)+1)::integer), 1)
    FROM generate_series(1, 8)
  ), '') INTO referral_code;
  
  RETURN referral_code;
END;
$function$;

-- Also create the referral_codes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  used_count integer DEFAULT 0
);

-- Enable RLS on referral_codes
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- Create policy for referral codes
CREATE POLICY "Users can view their own referral codes" ON public.referral_codes
FOR SELECT USING (auth.uid() = user_id);