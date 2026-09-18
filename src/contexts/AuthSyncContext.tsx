import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { getRedirectResult, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, type User } from 'firebase/auth';
import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firebaseConfigured, googleProvider } from '@/lib/firebase';
import { mergeProgress, snapshotProgress } from '@/lib/progress-sync';
import { useProgressStore } from '@/stores/progress-store';

export type SyncState = 'local' | 'syncing' | 'synced' | 'offline' | 'error';
type ContextValue = { user: User | null; ready: boolean; syncState: SyncState; signIn: () => Promise<void>; signOutUser: () => Promise<void>; retry: () => void };
const Context = createContext<ContextValue | null>(null);

export function AuthSyncProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!firebaseConfigured);
  const [syncState, setSyncState] = useState<SyncState>(firebaseConfigured ? 'syncing' : 'local');
  const applyingRemote = useRef(false);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!auth) return;
    getRedirectResult(auth).catch(() => setSyncState('error'));
    return onAuthStateChanged(auth, (next) => { setUser(next); setReady(true); setSyncState(next ? 'syncing' : 'local'); });
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    const ref = doc(db, 'users', user.uid);
    let stopStore: (() => void) | undefined;
    let alive = true;
    (async () => {
      try {
        setSyncState(navigator.onLine ? 'syncing' : 'offline');
        const current = snapshotProgress(useProgressStore.getState());
        const snap = await getDoc(ref);
        const merged = mergeProgress(current, snap.exists() ? snap.data().progress : undefined);
        applyingRemote.current = true;
        useProgressStore.setState(merged);
        applyingRemote.current = false;
        await setDoc(ref, { schemaVersion: 7, progress: merged, updatedAt: serverTimestamp() }, { merge: true });
        if (!alive) return;
        stopStore = useProgressStore.subscribe((state) => {
          if (applyingRemote.current) return;
          setSyncState(navigator.onLine ? 'syncing' : 'offline');
          void setDoc(ref, { schemaVersion: 7, progress: snapshotProgress(state), updatedAt: serverTimestamp() }, { merge: true })
            .then(() => setSyncState(navigator.onLine ? 'synced' : 'offline'))
            .catch(() => setSyncState(navigator.onLine ? 'error' : 'offline'));
        });
        setSyncState(navigator.onLine ? 'synced' : 'offline');
      } catch { setSyncState(navigator.onLine ? 'error' : 'offline'); }
    })();
    const stopRemote = onSnapshot(ref, { includeMetadataChanges: true }, (snap) => {
      if (!snap.exists() || snap.metadata.hasPendingWrites) return;
      applyingRemote.current = true;
      useProgressStore.setState(mergeProgress(useProgressStore.getState(), snap.data().progress));
      applyingRemote.current = false;
      setSyncState(snap.metadata.fromCache && !navigator.onLine ? 'offline' : 'synced');
    }, () => setSyncState(navigator.onLine ? 'error' : 'offline'));
    const online = () => setRetryToken((n) => n + 1);
    const offline = () => setSyncState('offline');
    window.addEventListener('online', online); window.addEventListener('offline', offline);
    return () => { alive = false; stopStore?.(); stopRemote(); window.removeEventListener('online', online); window.removeEventListener('offline', offline); };
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
