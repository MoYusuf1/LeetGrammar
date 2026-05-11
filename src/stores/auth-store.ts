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
  isAdmin: boolean;

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
  isAdmin: false,

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setSyncStatus: (syncStatus) => set({ syncStatus }),
  setLastSyncedAt: (lastSyncedAt) => set({ lastSyncedAt }),

  signOut: async () => {
    if (!isSupabaseConfigured) return;
    try {
      await getSupabase().auth.signOut();
      set({ user: null, session: null, syncStatus: 'idle', lastSyncedAt: null, isAdmin: false });
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
      const user = data.session?.user ?? null;

      // Load admin status if user is logged in
      let isAdmin = false;
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .maybeSingle();
        isAdmin = profile?.is_admin ?? false;

        // Fallback: if no admins exist at all, make this user admin
        if (!isAdmin) {
          const { data: admins } = await supabase
            .from('profiles')
            .select('id')
            .eq('is_admin', true)
            .limit(1);
          if (!admins || admins.length === 0) {
            await supabase
              .from('profiles')
              .upsert({ id: user.id, email: user.email, is_admin: true }, { onConflict: 'id' });
            isAdmin = true;
          }
        }
      }

      set({
        session: data.session,
        user,
        isAdmin,
        isLoading: false,
      });

      // Listen for auth state changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        const newUser = session?.user ?? null;
        let newAdmin = false;
        if (newUser) {
          const { data: p } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', newUser.id)
            .maybeSingle();
          newAdmin = p?.is_admin ?? false;

          // Same fallback for auth state changes
          if (!newAdmin) {
            const { data: admins } = await supabase
              .from('profiles')
              .select('id')
              .eq('is_admin', true)
              .limit(1);
            if (!admins || admins.length === 0) {
              await supabase
                .from('profiles')
                .upsert({ id: newUser.id, email: newUser.email, is_admin: true }, { onConflict: 'id' });
              newAdmin = true;
            }
          }
        }
        set({
          session,
          user: newUser,
          isAdmin: newAdmin,
          isLoading: false,
        });
      });
    } catch {
      set({ isLoading: false });
    }
  },
}));
