/**
 * Auth Store — Zustand wrapper around Supabase Auth.
 *
 * Manages session state, user profile, and sync status.
 * Works in guest mode when Supabase is not configured.
 */

import { create } from 'zustand';
import type { User, Session } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  syncStatus: SyncStatus;
  lastSyncedAt: string | null;
  isConfigured: boolean;

  // Actions
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setSyncStatus: (status: SyncStatus) => void;
  setLastSyncedAt: (date: string | null) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  syncStatus: 'idle',
  lastSyncedAt: null,
  isConfigured: isSupabaseConfigured,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setSyncStatus: (syncStatus) => set({ syncStatus }),
  setLastSyncedAt: (lastSyncedAt) => set({ lastSyncedAt }),

  signOut: async () => {
    if (!isSupabaseConfigured) return;
    try {
      await getSupabase().auth.signOut();
      set({ user: null, session: null, syncStatus: 'idle', lastSyncedAt: null });
    } catch {
      // Silently fail in guest mode
    }
  },

  initialize: async () => {
    if (!isSupabaseConfigured) {
      set({ isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const supabase = getSupabase();

      // Check existing session
      const { data } = await supabase.auth.getSession();
      set({
        session: data.session,
        user: data.session?.user ?? null,
        isLoading: false,
      });

      // Listen for auth state changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          session,
          user: session?.user ?? null,
          isLoading: false,
        });
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));
