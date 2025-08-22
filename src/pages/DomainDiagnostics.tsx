import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Globe } from 'lucide-react';
import { runDomainTests, getDomainStatus } from '@/utils/domain-testing';
import { verifyDomain } from '@/utils/domain-verification';
import type { DomainTestResult } from '@/utils/domain-testing';

interface VerificationResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

export default function DomainDiagnostics() {
  const [testResults, setTestResults] = useState<DomainTestResult[]>([]);
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [domainStatus, setDomainStatus] = useState(getDomainStatus());

  const runAllTests = async () => {
    setIsRunning(true);
    try {
      // Run domain tests
      const tests = await runDomainTests();
      setTestResults(tests);

      // Run domain verification
      const { results } = await verifyDomain();
      setVerificationResults(results);

      // Update domain status
      setDomainStatus(getDomainStatus());
    } catch (error) {
      console.error('Error running domain tests:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (status: string | boolean) => {
    if (status === 'PASS' || status === true) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (status === 'WARNING') {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    } else {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string | boolean) => {
    if (status === 'PASS' || status === true) return 'text-green-600';
    if (status === 'WARNING') return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTimestamp = () => {
    return new Date().toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Domain Diagnostics</h1>
          <p className="text-muted-foreground">
            Comprehensive diagnostics for hanu-consulting.com deployment and connectivity
          </p>
        </div>

        {/* Current Domain Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Current Domain Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Hostname:</span>
                    <Badge variant="outline">{domainStatus.hostname}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Origin:</span>
                    <Badge variant="outline">{domainStatus.origin}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Custom Domain:</span>
                    <Badge variant={domainStatus.isCustomDomain ? 'default' : 'secondary'}>
                      {domainStatus.isCustomDomain ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>HTTPS Secure:</span>
                    <Badge variant={domainStatus.isSecure ? 'default' : 'destructive'}>
                      {domainStatus.isSecure ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Expected Site URL:</span>
                    <Badge variant="outline">{domainStatus.expectedSiteUrl}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Supabase URL:</span>
                    <Badge variant="outline">{domainStatus.supabaseUrl}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Build Timestamp:</span>
                    <Badge variant="outline">{formatTimestamp()}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Controls */}
        <div className="mb-6">
          <Button onClick={runAllTests} disabled={isRunning} className="w-full md:w-auto">
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Running Diagnostics...
              </>
            ) : (
              'Run Domain Diagnostics'
            )}
          </Button>
        </div>

        {/* Results */}
        {(testResults.length > 0 || verificationResults.length > 0) && (
          <div className="space-y-6">
            {/* Domain Tests */}
            {testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Domain Configuration Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.passed)}
                            <span className="font-medium">{result.test}</span>
                          </div>
                          <Badge variant={result.passed ? 'default' : 'destructive'}>
                            {result.passed ? 'PASS' : 'FAIL'}
                          </Badge>
                        </div>
                        <p className={`text-sm ${getStatusColor(result.passed)}`}>
                          {result.message}
                        </p>
                        {result.details && (
                          <div className="mt-2 p-2 bg-muted rounded text-xs">
                            <pre>{JSON.stringify(result.details, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verification Tests */}
            {verificationResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Domain Verification Tests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verificationResults.map((result, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.status)}
                            <span className="font-medium">{result.test}</span>
                          </div>
                          <Badge 
                            variant={
                              result.status === 'PASS' ? 'default' : 
                              result.status === 'WARNING' ? 'secondary' : 'destructive'
                            }
                          >
                            {result.status}
                          </Badge>
                        </div>
                        <p className={`text-sm ${getStatusColor(result.status)}`}>
                          {result.message}
                        </p>
                        {result.details && (
                          <div className="mt-2 p-2 bg-muted rounded text-xs">
                            <pre>{JSON.stringify(result.details, null, 2)}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Common Issues & Solutions:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• If custom domain shows "No", check DNS A records point to 185.158.133.1</li>
                  <li>• If HTTPS shows "No", wait 24-48 hours for SSL certificate provisioning</li>
                  <li>• If Supabase connection fails, check network/firewall settings</li>
                  <li>• Clear browser cache and try hard refresh (Ctrl+F5)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* No Results Message */}
        {testResults.length === 0 && verificationResults.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Click "Run Domain Diagnostics" to start testing your domain configuration.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}