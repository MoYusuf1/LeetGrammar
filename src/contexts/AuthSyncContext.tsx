/**
 * AUTH + SYNC — the React shell around two plain pieces of logic.
 *
 * This component owns only what is genuinely React or browser: the auth-state
 * listener, the online/offline window events, the retry token, and the
 * sign-in/sign-out actions. Everything about *how* progress syncs — the
 * first-sign-in merge, the remote-apply guard, push-on-change — lives in
 * `lib/sync-engine.ts` and is unit-tested there without React. The merge rules
 * themselves are `lib/progress-sync.ts`.
 */

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getRedirectResult, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, type User } from 'firebase/auth';
import { auth, db, googleProvider } from '@/infrastructure/firebase/client';
import { FirestoreProgressRepository } from '@/infrastructure/firebase/progress-repository';
import { startProgressSync, type SyncState } from '@/lib/sync-engine';
import { useProgressStore } from '@/stores/progress-store';

export type { SyncState };
type ContextValue = { user: User | null; ready: boolean; syncState: SyncState; signIn: () => Promise<void>; signOutUser: () => Promise<void>; retry: () => void };
const Context = createContext<ContextValue | null>(null);

export function AuthSyncProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>('syncing');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    getRedirectResult(auth).catch(() => setSyncState('error'));
    return onAuthStateChanged(auth, (next) => { setUser(next); setReady(true); setSyncState(next ? 'syncing' : 'local'); });
  }, []);

  useEffect(() => {
    if (!user) return;
    const repository = new FirestoreProgressRepository(db, user.uid);
    const stopSync = startProgressSync({
      loadRemote: () => repository.load(),
      saveRemote: (progress) => repository.save(progress),
      watchRemote: (apply, fail) => repository.watch(apply, fail),
      getLocal: () => useProgressStore.getState(),
      setLocal: (progress) => useProgressStore.setState(progress),
      watchLocal: (listener) => useProgressStore.subscribe(listener),
      isOnline: () => navigator.onLine,
      setState: setSyncState,
    });
    const online = () => setRetryToken((n) => n + 1);
    const offline = () => setSyncState('offline');
    window.addEventListener('online', online); window.addEventListener('offline', offline);
    return () => { stopSync(); window.removeEventListener('online', online); window.removeEventListener('offline', offline); };
  }, [user, retryToken]);

  const value = useMemo<ContextValue>(() => ({
    user, ready, syncState,
    signIn: async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : '';
        if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
          await signInWithRedirect(auth, googleProvider);
          return;
        }
        throw error;
      }
    },
    signOutUser: async () => signOut(auth),
    retry: () => setRetryToken((n) => n + 1),
  }), [user, ready, syncState]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthSync() { const value = useContext(Context); if (!value) throw new Error('useAuthSync must be inside AuthSyncProvider'); return value; }
