// Domain testing utilities for hanu-consulting.com
import { supabase } from '@/integrations/supabase/client';
import { getDomainConfig, validateDomainConfig } from './domain-config';

export interface DomainTestResult {
  test: string;
  passed: boolean;
  message: string;
  details?: any;
}

export const runDomainTests = async (): Promise<DomainTestResult[]> => {
  const results: DomainTestResult[] = [];
  
  // Test 1: Domain configuration validation
  try {
    const isValid = validateDomainConfig();
    results.push({
      test: 'Domain Configuration',
      passed: isValid,
      message: isValid ? 'Domain configuration is valid' : 'Domain configuration failed validation'
    });
  } catch (error) {
    results.push({
      test: 'Domain Configuration',
      passed: false,
      message: 'Domain configuration test failed',
      details: error
    });
  }

  // Test 2: HTTPS enforcement
  const config = getDomainConfig();
  results.push({
    test: 'HTTPS Enforcement',
    passed: config.origin.startsWith('https:') || config.hostname === 'localhost',
    message: config.origin.startsWith('https:') 
      ? 'HTTPS is properly enforced' 
      : 'HTTPS enforcement may be missing'
  });

  // Test 3: Custom domain detection
  results.push({
    test: 'Custom Domain Detection',
    passed: config.isCustomDomain,
    message: config.isCustomDomain 
      ? 'Custom domain hanu-consulting.com detected' 
      : 'Custom domain not detected'
  });

  // Test 4: Supabase connection
  try {
    const { data, error } = await supabase.auth.getSession();
    results.push({
      test: 'Supabase Connection',
      passed: !error,
      message: !error ? 'Supabase connection successful' : 'Supabase connection failed',
      details: error
    });
  } catch (error) {
    results.push({
      test: 'Supabase Connection',
      passed: false,
      message: 'Supabase connection test failed',
      details: error
    });
  }

  // Test 5: Authentication flow
  try {
    const { data, error } = await supabase.auth.getUser();
    results.push({
      test: 'Authentication Flow',
      passed: !error,
      message: !error ? 'Authentication flow working' : 'Authentication flow has issues',
      details: error
    });
  } catch (error) {
    results.push({
      test: 'Authentication Flow',
      passed: false,
      message: 'Authentication flow test failed',
      details: error
    });
  }

  return results;
};

export const getDomainStatus = () => {
  const config = getDomainConfig();
  return {
    ...config,
    isSecure: config.origin.startsWith('https:'),
    isCustomDomain: config.hostname === 'hanu-consulting.com' || config.hostname === 'www.hanu-consulting.com',
    supabaseUrl: 'https://cscemxwbqxbgdapzdtbb.supabase.co',
    expectedSiteUrl: 'https://hanu-consulting.com'
  };
};