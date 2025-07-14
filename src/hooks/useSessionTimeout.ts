import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes
const WARNING_DURATION = 5 * 60 * 1000; // 5 minutes before timeout

export function useSessionTimeout() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    // Only set timeout if user is authenticated
    if (user) {
      // Set warning timeout
      warningRef.current = setTimeout(() => {
        toast({
          title: "Session Expiring Soon",
          description: "Your session will expire in 5 minutes. Please save your work.",
          variant: "destructive",
        });
      }, TIMEOUT_DURATION - WARNING_DURATION);

      // Set logout timeout
      timeoutRef.current = setTimeout(() => {
        toast({
          title: "Session Expired",
          description: "You have been logged out due to inactivity.",
          variant: "destructive",
        });
        signOut();
      }, TIMEOUT_DURATION);
    }
  };

  useEffect(() => {
    if (user) {
      // Reset timeout on user activity
      const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      
      const resetTimeoutHandler = () => {
        resetTimeout();
      };

      // Add event listeners
      events.forEach(event => {
        document.addEventListener(event, resetTimeoutHandler, true);
      });

      // Initial timeout setup
      resetTimeout();

      // Cleanup
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, resetTimeoutHandler, true);
        });
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (warningRef.current) {
          clearTimeout(warningRef.current);
        }
      };
    }
  }, [user, signOut, toast]);

  return { resetTimeout };
}