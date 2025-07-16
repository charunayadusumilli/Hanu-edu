// Domain configuration utilities for hanu-consulting.com deployment
export const getDomainConfig = () => {
  const origin = window.location.origin;
  const hostname = window.location.hostname;
  
  // Check if we're in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Check if we're on the custom domain hanu-consulting.com
  const isCustomDomain = hostname === 'hanu-consulting.com' || hostname === 'www.hanu-consulting.com';
  
  // Force HTTPS for custom domain
  const secureOrigin = isCustomDomain && !origin.startsWith('https:') 
    ? origin.replace('http:', 'https:') 
    : origin;
  
  return {
    origin: secureOrigin,
    hostname,
    isProduction,
    isCustomDomain,
    redirectUrl: `${secureOrigin}/`,
    apiUrl: secureOrigin,
    authRedirectUrl: `${secureOrigin}/auth/callback`,
    siteUrl: isCustomDomain ? 'https://hanu-consulting.com' : secureOrigin
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
  return `${config.siteUrl}${path}`;
};

// Get callback URL for authentication
export const getAuthCallbackUrl = () => {
  const config = getDomainConfig();
  return `${config.siteUrl}/auth/callback`;
};

// Get proper site URL for Supabase auth configuration
export const getSiteUrl = () => {
  const config = getDomainConfig();
  return config.siteUrl;
};

// Check if domain is secure (HTTPS)
export const isDomainSecure = () => {
  const config = getDomainConfig();
  return config.origin.startsWith('https:') || config.hostname === 'localhost';
};