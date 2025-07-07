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