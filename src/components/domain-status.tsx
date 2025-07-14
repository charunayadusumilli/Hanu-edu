import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { runDomainTests, getDomainStatus, DomainTestResult } from '@/utils/domain-testing';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export function DomainStatus() {
  const [testResults, setTestResults] = useState<DomainTestResult[]>([]);
  const [domainStatus, setDomainStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDomainStatus(getDomainStatus());
  }, []);

  const runTests = async () => {
    setLoading(true);
    try {
      const results = await runDomainTests();
      setTestResults(results);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  if (!domainStatus) return null;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Domain Status Dashboard</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Current Domain</h3>
            <p className="text-sm text-muted-foreground">{domainStatus.hostname}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Origin</h3>
            <p className="text-sm text-muted-foreground">{domainStatus.origin}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Custom Domain</h3>
            <Badge variant={domainStatus.isCustomDomain ? "default" : "secondary"}>
              {domainStatus.isCustomDomain ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Secure Connection</h3>
            <Badge variant={domainStatus.isSecure ? "default" : "destructive"}>
              {domainStatus.isSecure ? 'HTTPS' : 'HTTP'}
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Expected Configuration</h3>
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm"><strong>Site URL:</strong> {domainStatus.expectedSiteUrl}</p>
            <p className="text-sm"><strong>Supabase URL:</strong> {domainStatus.supabaseUrl}</p>
            <p className="text-sm"><strong>Redirect URL:</strong> {domainStatus.expectedSiteUrl}/auth/callback</p>
          </div>
        </div>

        <Button onClick={runTests} disabled={loading} className="w-full mb-4">
          {loading ? 'Running Tests...' : 'Run Domain Tests'}
        </Button>

        {testResults.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Test Results</h3>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(result.passed)}
                  <span className="font-medium">{result.test}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{result.message}</p>
                  {result.details && (
                    <p className="text-xs text-red-500 mt-1">
                      {typeof result.details === 'string' ? result.details : JSON.stringify(result.details)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}