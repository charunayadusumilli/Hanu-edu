// Domain configuration utilities for deployment
export const getDomainConfig = () => {
  const origin = window.location.origin;
  const hostname = window.location.hostname;
  
  // Check if we're in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Check if we're on a custom domain (not localhost or .vercel.app)
  const isCustomDomain = !hostname.includes('localhost') && 
                        !hostname.includes('vercel.app') && 
                        !hostname.includes('netlify.app');
  
  return {
    origin,
    hostname,
    isProduction,
    isCustomDomain,
    redirectUrl: `${origin}/`,
    apiUrl: origin
  };
};

// Validate domain configuration
export const validateDomainConfig = () => {
  const config = getDomainConfig();
  
  // In production, ensure we're not on localhost
  if (config.isProduction && config.hostname.includes('localhost')) {
    console.error('Domain configuration error: localhost in production');
    return false;
  }
  
  // Ensure we have a valid origin
  if (!config.origin || config.origin === 'null') {
    console.error('Domain configuration error: invalid origin');
    return false;
  }
  
  return true;
};

// Get auth redirect URL based on environment
export const getAuthRedirectUrl = (path: string = '/') => {
  const config = getDomainConfig();
  return `${config.origin}${path}`;
};