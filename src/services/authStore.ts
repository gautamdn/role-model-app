import { create } from 'zustand';
import { supabase } from './supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,

  initialize: async () => {
    try {
      set({ isLoading: true });

      // Get current session
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Fetch user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({
          user: profile ? {
            id: session.user.id,
            email: session.user.email || '',
            created_at: profile.created_at,
            subscription_tier: profile.subscription_tier || 'free',
            subscription_expires_at: profile.subscription_expires_at,
          } : null,
          isAuthenticated: !!profile,
          isLoading: false,
        });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          set({
            user: profile ? {
              id: session.user.id,
              email: session.user.email || '',
              created_at: profile.created_at,
              subscription_tier: profile.subscription_tier || 'free',
              subscription_expires_at: profile.subscription_expires_at,
            } : null,
            isAuthenticated: !!profile,
          });
        } else if (event === 'SIGNED_OUT') {
          set({ user: null, isAuthenticated: false });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ isLoading: false, error: 'Failed to initialize authentication' });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false, error: error.message });
        return { error: error.message };
      }

      if (data.user) {
        // Create profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            subscription_tier: 'free',
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign up failed';
      set({ isLoading: false, error: message });
      return { error: message };
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ isLoading: false, error: error.message });
        return { error: error.message };
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Sign in failed';
      set({ isLoading: false, error: message });
      return { error: message };
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      await supabase.auth.signOut();
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ isLoading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ isLoading: true, error: null });

      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        set({ isLoading: false, error: error.message });
        return { error: error.message };
      }

      set({ isLoading: false });
      return { error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Password reset failed';
      set({ isLoading: false, error: message });
      return { error: message };
    }
  },

  clearError: () => set({ error: null }),
}));
