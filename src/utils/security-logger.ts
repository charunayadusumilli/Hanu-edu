import { supabase } from '@/integrations/supabase/client';

interface SecurityEvent {
  action: string;
  resource_type?: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
}

export class SecurityLogger {
  static async logEvent(event: SecurityEvent) {
    try {
      // Only log if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('security_audit_logs')
        .insert({
          user_id: user.id,
          action: event.action,
          resource_type: event.resource_type,
          resource_id: event.resource_id,
          metadata: event.metadata || {},
          risk_level: event.risk_level || 'low',
          ip_address: null, // Will be populated by RLS policy or trigger
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Failed to log security event:', error);
      }
    } catch (error) {
      console.error('Security logging error:', error);
    }
  }

  static async logAuthAttempt(success: boolean, email?: string, failureReason?: string) {
    try {
      const { error } = await supabase
        .from('auth_attempts')
        .insert({
          attempt_type: 'login',
          success,
          email,
          failure_reason: failureReason,
          ip_address: null, // Will be populated by RLS policy or trigger
          user_agent: navigator.userAgent
        });

      if (error) {
        console.error('Failed to log auth attempt:', error);
      }
    } catch (error) {
      console.error('Auth logging error:', error);
    }
  }

  static async logFormSubmission(formType: string, success: boolean, errorMessage?: string) {
    const metadata = {
      form_type: formType,
      success,
      error_message: errorMessage,
      timestamp: new Date().toISOString()
    };

    await this.logEvent({
      action: 'form_submission',
      resource_type: 'form',
      resource_id: formType,
      metadata,
      risk_level: success ? 'low' : 'medium'
    });
  }
}