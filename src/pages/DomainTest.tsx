import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { verifyDomain } from '@/utils/domain-verification';

interface TestResult {
  test: string;
  status: 'PASS' | 'FAIL' | 'WARNING';
  message: string;
  details?: any;
}

export default function DomainTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [summary, setSummary] = useState<any>(null);

  const runTests = async () => {
    setIsLoading(true);
    try {
      const { results: testResults, summary: testSummary } = await verifyDomain();
      setResults(testResults);
      setSummary(testSummary);
    } catch (error) {
      console.error('Domain verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS': return 'bg-green-100 text-green-800 border-green-200';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'FAIL': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASS': return '✅';
      case 'WARNING': return '⚠️';
      case 'FAIL': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Domain Verification Test
            </h1>
            <p className="text-muted-foreground">
              Test your custom domain deployment for hanu-consulting.com
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔍 Domain Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button 
                  onClick={runTests} 
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? 'Running Tests...' : 'Run Domain Tests'}
                </Button>
                
                {summary && (
                  <div className="flex gap-2 text-sm">
                    <span className="text-green-600">✅ {summary.passed}</span>
                    <span className="text-yellow-600">⚠️ {summary.warnings}</span>
                    <span className="text-red-600">❌ {summary.failed}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {summary && (
            <Alert className={`mb-6 ${summary.isReady ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
              <AlertDescription className="flex items-center gap-2">
                {summary.isReady ? (
                  <>
                    <span className="text-green-600">🎉</span>
                    <span className="font-medium text-green-800">
                      All critical tests passed! Your domain is ready for production.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-yellow-600">⚠️</span>
                    <span className="font-medium text-yellow-800">
                      Some tests failed. Please review the issues below.
                    </span>
                  </>
                )}
              </AlertDescription>
            </Alert>
          )}

          {results.length > 0 && (
            <div className="grid gap-4">
              {results.map((result, index) => (
                <Card key={index} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg">{getStatusIcon(result.status)}</span>
                          <h3 className="font-semibold text-lg">{result.test}</h3>
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{result.message}</p>
                        
                        {result.details && result.status !== 'PASS' && (
                          <details className="mt-3">
                            <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                              Show Details
                            </summary>
                            <pre className="mt-2 p-3 bg-muted rounded-md text-xs overflow-x-auto">
                              {JSON.stringify(result.details, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {results.length === 0 && !isLoading && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">
                  <p className="text-lg mb-2">Ready to test your domain?</p>
                  <p className="text-sm">
                    Click "Run Domain Tests" to verify your hanu-consulting.com deployment
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}