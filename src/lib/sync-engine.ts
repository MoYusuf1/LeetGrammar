/**
 * SYNC ENGINE — the pure half of account sync.
 *
 * AuthSyncContext used to interleave three concerns in one React effect: the
 * first-sign-in merge, the guard that keeps an incoming remote write from
 * bouncing straight back out as a local change, and the push of every later
 * local change to Firestore. None of that logic is React — it only needs a
 * handful of impure edges (read remote, write remote, watch both sides, know
 * whether we are online) — so it lives here as plain functions over injected
 * dependencies and is unit-tested without React, Firebase, or a network.
 * `contexts/AuthSyncContext.tsx` is left as the thin wiring layer: auth state,
 * browser online/offline events, and the Firebase-backed implementations of
 * the edges below.
 *
 * THE GUARD IS THE LOAD-BEARING PART
 *
 * Applying a remote snapshot to the store *is a store change*. Without the
 * `applyingRemote` flag, the store subscription would see its own echo and
 * push it straight back to Firestore — a pointless write at best, and a
 * feedback loop between two devices at worst. Every remote application goes
 * through `applyRemote`, which holds the flag for exactly the duration of the
 * store write; the local-change listener drops anything that arrives while it
 * is held.
 */

import { mergeProgress, snapshotProgress } from '@/lib/progress-sync';
import type { UserProgress } from '@/domain/progress/types';

export type SyncState = 'local' | 'syncing' | 'synced' | 'offline' | 'error';

export interface ProgressSyncDeps {
  /** The account's stored progress; undefined when no document exists yet. */
  loadRemote: () => Promise<Partial<UserProgress> | undefined>;
  /** Persist a full snapshot to the account document. */
  saveRemote: (progress: UserProgress) => Promise<void>;
  /**
   * Watch the account document. `apply` fires for snapshots that carry real
   * server state (the adapter skips pending local writes); `fromCache` marks
   * an offline read. `fail` fires on a listener error. Returns an unsubscribe.
   */
  watchRemote: (
    apply: (progress: Partial<UserProgress>, fromCache: boolean) => void,
    fail: () => void,
  ) => () => void;
  getLocal: () => UserProgress;
  setLocal: (progress: UserProgress) => void;
  /** Fires on every local store change; returns an unsubscribe. */
  watchLocal: (listener: (state: UserProgress) => void) => () => void;
  isOnline: () => boolean;
  setState: (state: SyncState) => void;
}

/**
 * Run one sync session for a signed-in user: merge local with the account
 * copy, write the merged state back, then keep both sides in step until the
 * returned teardown runs (sign-out, account switch, or a retry).
 *
 * State transitions mirror the network reality they describe: `syncing` while
 * a write is in flight, `synced` once it lands, `offline` when the browser
 * says there is no network, and `error` only for a failure while online — a
 * failure while offline is just offline.
 */
export function startProgressSync(deps: ProgressSyncDeps): () => void {
  let applyingRemote = false;
  let alive = true;
  let stopLocal: (() => void) | undefined;

  const applyRemote = (progress: Partial<UserProgress>) => {
    applyingRemote = true;
    deps.setLocal(mergeProgress(deps.getLocal(), progress));
    applyingRemote = false;
  };

  void (async () => {
    try {
      deps.setState(deps.isOnline() ? 'syncing' : 'offline');
      const current = snapshotProgress(deps.getLocal());
      const remote = await deps.loadRemote();
      const merged = mergeProgress(current, remote);
      applyRemote(merged);
      await deps.saveRemote(merged);
      // A teardown during the initial exchange must not leave a store
      // subscription behind pushing to a document nobody owns any more.
      if (!alive) return;
      stopLocal = deps.watchLocal((state) => {
        if (applyingRemote) return;
        deps.setState(deps.isOnline() ? 'syncing' : 'offline');
        void deps.saveRemote(snapshotProgress(state))
          .then(() => deps.setState(deps.isOnline() ? 'synced' : 'offline'))
          .catch(() => deps.setState(deps.isOnline() ? 'error' : 'offline'));
      });
      deps.setState(deps.isOnline() ? 'synced' : 'offline');
    } catch {
      deps.setState(deps.isOnline() ? 'error' : 'offline');
    }
  })();

  const stopRemote = deps.watchRemote(
    (progress, fromCache) => {
      applyRemote(progress);
      deps.setState(fromCache && !deps.isOnline() ? 'offline' : 'synced');
    },
    () => deps.setState(deps.isOnline() ? 'error' : 'offline'),
  );

  return () => {
    alive = false;
    stopLocal?.();
    stopRemote();
  };
}
