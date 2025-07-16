import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getAuthRedirectUrl, validateDomainConfig, getSiteUrl, isDomainSecure } from '@/utils/domain-config';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Validate domain configuration on startup
    if (!validateDomainConfig()) {
      console.error('Domain configuration validation failed');
    }
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Log successful auth events (disabled for now)
        // if (event === 'SIGNED_IN' && session?.user) {
        //   SecurityLogger.logAuthAttempt(true, session.user.email || 'unknown', 'Successful sign in');
        // }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // Log authentication attempt (disabled for now)
    // await SecurityLogger.logAuthAttempt(!error, email, error?.message);
    
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Validate domain configuration
      if (!validateDomainConfig()) {
        const error = new Error('Invalid domain configuration');
        // await SecurityLogger.logAuthAttempt(false, email, 'Invalid domain configuration');
        return { error };
      }
      
      // Ensure secure connection for custom domain
      if (!isDomainSecure()) {
        const error = new Error('Secure connection required for authentication');
        // await SecurityLogger.logAuthAttempt(false, email, 'Insecure connection');
        return { error };
      }
      
      // Get proper site URL for hanu-consulting.com
      const siteUrl = getSiteUrl();
      const redirectUrl = `${siteUrl}/auth/callback`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            first_name: fullName.split(' ')[0],
            last_name: fullName.split(' ').slice(1).join(' '),
          }
        }
      });
      
      // Log registration attempt (disabled for now)
      // await SecurityLogger.logAuthAttempt(!error, email, error?.message);
      
      return { error };
    } catch (error: any) {
      // await SecurityLogger.logAuthAttempt(false, email, error.message);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}