// Domain Verification and Testing Script
// This script tests all aspects of the custom domain deployment

import { supabase } from '@/integrations/supabase/client';
import { getDomainConfig, validateDomainConfig } from './domain-config';

interface VerificationResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

export class DomainVerification {
  private results: VerificationResult[] = [];
  private config = getDomainConfig();

  // Test 1: Domain Configuration
  async testDomainConfig(): Promise<VerificationResult> {
    try {
      const isValid = validateDomainConfig();
      const expectedDomain = 'hanu-consulting.com';
      
      if (!isValid) {
        return {
          test: 'Domain Configuration',
          status: 'FAIL',
          message: 'Domain configuration validation failed',
          details: { config: this.config }
        };
      }

      if (!this.config.hostname.includes(expectedDomain)) {
        return {
          test: 'Domain Configuration',
          status: 'FAIL',
          message: `Expected domain ${expectedDomain}, got ${this.config.hostname}`,
          details: { config: this.config }
        };
      }

      return {
        test: 'Domain Configuration',
        status: 'PASS',
        message: 'Domain configuration is correct',
        details: { config: this.config }
      };
    } catch (error) {
      return {
        test: 'Domain Configuration',
        status: 'FAIL',
        message: 'Domain configuration test failed',
        details: { error: error.message }
      };
    }
  }

  // Test 2: SSL Certificate
  async testSSLCertificate(): Promise<VerificationResult> {
    try {
      const isSecure = this.config.origin.startsWith('https:');
      
      if (!isSecure) {
        return {
          test: 'SSL Certificate',
          status: 'FAIL',
          message: 'SSL certificate not active - site not using HTTPS',
          details: { origin: this.config.origin }
        };
      }

      return {
        test: 'SSL Certificate',
        status: 'PASS',
        message: 'SSL certificate is active',
        details: { origin: this.config.origin }
      };
    } catch (error) {
      return {
        test: 'SSL Certificate',
        status: 'FAIL',
        message: 'SSL certificate test failed',
        details: { error: error.message }
      };
    }
  }

  // Test 3: Supabase Connection
  async testSupabaseConnection(): Promise<VerificationResult> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1);

      if (error) {
        return {
          test: 'Supabase Connection',
          status: 'FAIL',
          message: 'Supabase connection failed',
          details: { error: error.message }
        };
      }

      return {
        test: 'Supabase Connection',
        status: 'PASS',
        message: 'Supabase connection is working',
        details: { connection: 'active' }
      };
    } catch (error) {
      return {
        test: 'Supabase Connection',
        status: 'FAIL',
        message: 'Supabase connection test failed',
        details: { error: error.message }
      };
    }
  }

  // Test 4: Authentication Configuration
  async testAuthConfig(): Promise<VerificationResult> {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        return {
          test: 'Authentication Configuration',
          status: 'WARNING',
          message: 'Authentication configuration issue detected',
          details: { error: error.message }
        };
      }

      return {
        test: 'Authentication Configuration',
        status: 'PASS',
        message: 'Authentication configuration is working',
        details: { session: data.session ? 'active' : 'none' }
      };
    } catch (error) {
      return {
        test: 'Authentication Configuration',
        status: 'FAIL',
        message: 'Authentication configuration test failed',
        details: { error: error.message }
      };
    }
  }

  // Test 5: Domain Validation Function
  async testDomainValidation(): Promise<VerificationResult> {
    try {
      const { data, error } = await supabase.rpc('validate_domain_access', {
        domain_url: this.config.origin
      });

      if (error) {
        return {
          test: 'Domain Validation Function',
          status: 'FAIL',
          message: 'Domain validation function failed',
          details: { error: error.message }
        };
      }

      if (!data) {
        return {
          test: 'Domain Validation Function',
          status: 'FAIL',
          message: 'Domain validation function returned false',
          details: { domain: this.config.origin, result: data }
        };
      }

      return {
        test: 'Domain Validation Function',
        status: 'PASS',
        message: 'Domain validation function is working',
        details: { domain: this.config.origin, result: data }
      };
    } catch (error) {
      return {
        test: 'Domain Validation Function',
        status: 'FAIL',
        message: 'Domain validation function test failed',
        details: { error: error.message }
      };
    }
  }

  // Test 6: Security Headers
  async testSecurityHeaders(): Promise<VerificationResult> {
    try {
      const response = await fetch(this.config.origin);
      const headers = response.headers;

      const securityHeaders = {
        'X-Frame-Options': headers.get('X-Frame-Options'),
        'X-Content-Type-Options': headers.get('X-Content-Type-Options'),
        'X-XSS-Protection': headers.get('X-XSS-Protection'),
        'Strict-Transport-Security': headers.get('Strict-Transport-Security'),
        'Content-Security-Policy': headers.get('Content-Security-Policy')
      };

      const missingHeaders = Object.entries(securityHeaders)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (missingHeaders.length > 0) {
        return {
          test: 'Security Headers',
          status: 'WARNING',
          message: `Missing security headers: ${missingHeaders.join(', ')}`,
          details: { headers: securityHeaders, missing: missingHeaders }
        };
      }

      return {
        test: 'Security Headers',
        status: 'PASS',
        message: 'All security headers are present',
        details: { headers: securityHeaders }
      };
    } catch (error) {
      return {
        test: 'Security Headers',
        status: 'FAIL',
        message: 'Security headers test failed',
        details: { error: error.message }
      };
    }
  }

  // Test 7: DNS Resolution
  async testDNSResolution(): Promise<VerificationResult> {
    try {
      const response = await fetch(`https://dns.google/resolve?name=${this.config.hostname}&type=A`);
      const dnsData = await response.json();

      if (dnsData.Status !== 0) {
        return {
          test: 'DNS Resolution',
          status: 'FAIL',
          message: 'DNS resolution failed',
          details: { dns: dnsData }
        };
      }

      const hasARecord = dnsData.Answer?.some((record: any) => record.type === 1);
      if (!hasARecord) {
        return {
          test: 'DNS Resolution',
          status: 'FAIL',
          message: 'No A record found for domain',
          details: { dns: dnsData }
        };
      }

      return {
        test: 'DNS Resolution',
        status: 'PASS',
        message: 'DNS resolution is working',
        details: { dns: dnsData }
      };
    } catch (error) {
      return {
        test: 'DNS Resolution',
        status: 'FAIL',
        message: 'DNS resolution test failed',
        details: { error: error.message }
      };
    }
  }

  // Run all tests
  async runAllTests(): Promise<VerificationResult[]> {
    console.log('🔍 Starting domain verification tests...');
    
    const tests = [
      this.testDomainConfig(),
      this.testSSLCertificate(),
      this.testSupabaseConnection(),
      this.testAuthConfig(),
      this.testDomainValidation(),
      this.testSecurityHeaders(),
      this.testDNSResolution()
    ];

    this.results = await Promise.all(tests);
    
    // Log results
    console.log('\n📊 Domain Verification Results:');
    console.log('=====================================');
    
    this.results.forEach((result, index) => {
      const icon = result.status === 'PASS' ? '✅' : result.status === 'WARNING' ? '⚠️' : '❌';
      console.log(`${icon} ${result.test}: ${result.message}`);
      
      if (result.details && result.status !== 'PASS') {
        console.log(`   Details:`, result.details);
      }
    });
    
    const passCount = this.results.filter(r => r.status === 'PASS').length;
    const warnCount = this.results.filter(r => r.status === 'WARNING').length;
    const failCount = this.results.filter(r => r.status === 'FAIL').length;
    
    console.log('\n📈 Summary:');
    console.log(`   ✅ Passed: ${passCount}`);
    console.log(`   ⚠️  Warnings: ${warnCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    
    if (failCount === 0) {
      console.log('\n🎉 All critical tests passed! Your domain is ready for production.');
    } else {
      console.log('\n🚨 Some tests failed. Please review the issues above.');
    }

    return this.results;
  }

  // Get summary
  getSummary() {
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const warnings = this.results.filter(r => r.status === 'WARNING').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    
    return {
      total: this.results.length,
      passed,
      warnings,
      failed,
      isReady: failed === 0
    };
  }
}

// Export convenience function
export const verifyDomain = async () => {
  const verifier = new DomainVerification();
  const results = await verifier.runAllTests();
  return {
    results,
    summary: verifier.getSummary()
  };
};