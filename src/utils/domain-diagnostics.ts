// Domain diagnostics utilities for troubleshooting connection issues
import { supabase } from '@/integrations/supabase/client';
import { getDomainConfig } from './domain-config';

export interface DomainDiagnostics {
  timestamp: string;
  domain: string;
  origin: string;
  isCustomDomain: boolean;
  supabaseConnection: boolean;
  authStatus: 'authenticated' | 'unauthenticated' | 'loading';
  errors: string[];
  recommendations: string[];
}

export const runDomainDiagnostics = async (): Promise<DomainDiagnostics> => {
  const config = getDomainConfig();
  const errors: string[] = [];
  const recommendations: string[] = [];
  
  // Check Supabase connection
  let supabaseConnection = false;
  try {
    const { data, error } = await supabase.from('profiles').select('id').limit(1);
    supabaseConnection = !error;
    if (error) {
      errors.push(`Supabase connection error: ${error.message}`);
      recommendations.push('Check Supabase configuration and network connectivity');
    }
  } catch (err) {
    errors.push(`Supabase connection failed: ${err}`);
    recommendations.push('Verify Supabase URL and API key configuration');
  }
  
  // Check auth status
  let authStatus: 'authenticated' | 'unauthenticated' | 'loading' = 'loading';
  try {
    const { data: { session } } = await supabase.auth.getSession();
    authStatus = session ? 'authenticated' : 'unauthenticated';
  } catch (err) {
    errors.push(`Auth check failed: ${err}`);
    authStatus = 'unauthenticated';
  }
  
  // Domain-specific checks
  if (config.isProduction && config.hostname.includes('localhost')) {
    errors.push('Production environment detected localhost domain');
    recommendations.push('Configure proper production domain in Supabase dashboard');
  }
  
  if (!config.isCustomDomain && config.isProduction) {
    recommendations.push('Consider using a custom domain for production');
  }
  
  // Check for mixed content issues
  if (config.origin.startsWith('https://') && window.location.protocol === 'http:') {
    errors.push('Mixed content detected - HTTPS origin with HTTP protocol');
    recommendations.push('Ensure all connections use HTTPS');
  }
  
  return {
    timestamp: new Date().toISOString(),
    domain: config.hostname,
    origin: config.origin,
    isCustomDomain: config.isCustomDomain,
    supabaseConnection,
    authStatus,
    errors,
    recommendations
  };
};

// Log diagnostics to console for debugging
export const logDomainDiagnostics = async () => {
  const diagnostics = await runDomainDiagnostics();
  
  console.group('🔍 Domain Diagnostics');
  console.log('Timestamp:', diagnostics.timestamp);
  console.log('Domain:', diagnostics.domain);
  console.log('Origin:', diagnostics.origin);
  console.log('Custom Domain:', diagnostics.isCustomDomain);
  console.log('Supabase Connection:', diagnostics.supabaseConnection);
  console.log('Auth Status:', diagnostics.authStatus);
  
  if (diagnostics.errors.length > 0) {
    console.group('❌ Errors');
    diagnostics.errors.forEach(error => console.error(error));
    console.groupEnd();
  }
  
  if (diagnostics.recommendations.length > 0) {
    console.group('💡 Recommendations');
    diagnostics.recommendations.forEach(rec => console.info(rec));
    console.groupEnd();
  }
  
  console.groupEnd();
  
  return diagnostics;
};