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
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfigured, googleProvider } from '@/lib/firebase';
import { startProgressSync, type SyncState } from '@/lib/sync-engine';
import type { UserProgress } from '@/stores/progress-store';
import { useProgressStore } from '@/stores/progress-store';

export type { SyncState };
type ContextValue = { user: User | null; ready: boolean; syncState: SyncState; signIn: () => Promise<void>; signOutUser: () => Promise<void>; retry: () => void };
const Context = createContext<ContextValue | null>(null);

export function AuthSyncProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!firebaseConfigured);
  const [syncState, setSyncState] = useState<SyncState>(firebaseConfigured ? 'syncing' : 'local');
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!auth) return;
    getRedirectResult(auth).catch(() => setSyncState('error'));
    return onAuthStateChanged(auth, (next) => { setUser(next); setReady(true); setSyncState(next ? 'syncing' : 'local'); });
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    const ref = doc(db, 'users', user.uid);
    const stopSync = startProgressSync({
      loadRemote: async () => {
        const snap = await getDoc(ref);
        return snap.exists() ? (snap.data().progress as Partial<UserProgress>) : undefined;
      },
      saveRemote: (progress) =>
        setDoc(ref, { schemaVersion: 8, progress, updatedAt: serverTimestamp() }, { merge: true }),
      watchRemote: (apply, fail) =>
        onSnapshot(ref, { includeMetadataChanges: true }, (snap) => {
          // Pending writes are this client's own echo, not new remote state.
          if (!snap.exists() || snap.metadata.hasPendingWrites) return;
          apply(snap.data().progress as Partial<UserProgress>, snap.metadata.fromCache);
        }, fail),
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
      if (!auth) throw new Error('Firebase is not configured');
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
    signOutUser: async () => { if (auth) await signOut(auth); },
    retry: () => setRetryToken((n) => n + 1),
  }), [user, ready, syncState]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthSync() { const value = useContext(Context); if (!value) throw new Error('useAuthSync must be inside AuthSyncProvider'); return value; }
