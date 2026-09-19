import { describe, expect, it } from 'vitest';
import { startProgressSync, type ProgressSyncDeps, type SyncState } from '@/lib/sync-engine';
import type { UserProgress } from '@/stores/progress-store';

const base = (over: Partial<UserProgress> = {}): UserProgress => ({
  completedLessons: [], streak: 0, lastStudyDate: '', practiceScores: {}, activityLog: [],
  lessonCardPositions: {}, unitTestResults: {}, reviewSchedule: {}, exerciseProgress: {}, ...over,
});

const flush = () => new Promise((r) => setTimeout(r, 0));

interface Harness {
  deps: ProgressSyncDeps;
  states: SyncState[];
  saved: UserProgress[];
  remoteApply: (progress: Partial<UserProgress>, fromCache: boolean) => void;
  remoteFail: () => void;
  setOnline: (online: boolean) => void;
  changeLocal: (over: Partial<UserProgress>) => void;
  localListenerCount: () => number;
  unsubscribed: { local: boolean; remote: boolean };
}

/**
 * Fake edges for the sync engine. `setLocal` notifies the local listener
 * synchronously because zustand does — that is exactly the echo the
 * applyingRemote guard exists to swallow.
 */
function makeHarness(options: {
  remote?: Partial<UserProgress>;
  online?: boolean;
  loadRemote?: ProgressSyncDeps['loadRemote'];
  saveRemote?: ProgressSyncDeps['saveRemote'];
  initialLocal?: UserProgress;
} = {}): Harness {
  let local = options.initialLocal ?? base();
  let online = options.online ?? true;
  const localListeners = new Set<(state: UserProgress) => void>();
  const h: Harness = {
    states: [],
    saved: [],
    unsubscribed: { local: false, remote: false },
    remoteApply: () => {},
    remoteFail: () => {},
    setOnline: (v) => { online = v; },
    changeLocal: (over) => {
      local = { ...local, ...over };
      for (const l of localListeners) l(local);
    },
    localListenerCount: () => localListeners.size,
    deps: {
      loadRemote: options.loadRemote ?? (async () => options.remote),
      saveRemote: options.saveRemote ?? (async (p) => { h.saved.push(p); }),
      watchRemote: (apply, fail) => {
        h.remoteApply = apply;
        h.remoteFail = fail;
        return () => { h.unsubscribed.remote = true; };
      },
      getLocal: () => local,
      setLocal: (progress) => {
        local = { ...local, ...progress };
        for (const l of localListeners) l(local);
      },
      watchLocal: (listener) => {
        localListeners.add(listener);
        return () => { localListeners.delete(listener); h.unsubscribed.local = true; };
      },
      isOnline: () => online,
      setState: (s) => { h.states.push(s); },
    },
  };
  return h;
}

describe('first sign-in', () => {
  it('merges local and remote, writes the merge back, and settles synced', async () => {
    const h = makeHarness({
      initialLocal: base({ completedLessons: [1], practiceScores: { 1: 70 } }),
      remote: base({ completedLessons: [2], practiceScores: { 1: 90 } }),
    });
    startProgressSync(h.deps);
    await flush();
    expect(h.deps.getLocal().completedLessons).toEqual([1, 2]);
    expect(h.deps.getLocal().practiceScores[1]).toBe(90);
    expect(h.saved).toHaveLength(1);
    expect(h.saved[0].completedLessons).toEqual([1, 2]);
    expect(h.states.at(-1)).toBe('synced');
  });

  it('saves the local snapshot as-is when the account has no document yet', async () => {
    const h = makeHarness({ initialLocal: base({ completedLessons: [3] }), remote: undefined });
    startProgressSync(h.deps);
    await flush();
    expect(h.saved).toHaveLength(1);
    expect(h.saved[0].completedLessons).toEqual([3]);
  });

  it('reports an online load failure as error, an offline one as offline', async () => {
    const failing = async (): Promise<undefined> => { throw new Error('firestore down'); };
    const online = makeHarness({ loadRemote: failing });
    startProgressSync(online.deps);
    await flush();
    expect(online.states.at(-1)).toBe('error');

    const offline = makeHarness({ loadRemote: failing, online: false });
    startProgressSync(offline.deps);
    await flush();
    expect(offline.states.at(-1)).toBe('offline');
  });
});

describe('push on local change', () => {
  it('pushes a snapshot for every later store change', async () => {
    const h = makeHarness({ remote: undefined });
    startProgressSync(h.deps);
    await flush();
    h.changeLocal({ completedLessons: [4] });
    await flush();
    expect(h.saved).toHaveLength(2);
    expect(h.saved[1].completedLessons).toEqual([4]);
    expect(h.states.slice(-2)).toEqual(['syncing', 'synced']);
  });

  it('a failed push is an error online and offline without network', async () => {
    let fail = false;
    const h = makeHarness({
      remote: undefined,
      saveRemote: async (p) => {
        if (fail) throw new Error('write rejected');
        h.saved.push(p);
      },
    });
    startProgressSync(h.deps);
    await flush();
    fail = true;
    h.changeLocal({ streak: 2 });
    await flush();
    expect(h.states.at(-1)).toBe('error');

    h.setOnline(false);
    h.changeLocal({ streak: 3 });
    await flush();
    expect(h.states.at(-1)).toBe('offline');
  });
});

describe('the remote-apply guard', () => {
  it('a remote snapshot applies to the store without bouncing back as a push', async () => {
    const h = makeHarness({ remote: undefined });
    startProgressSync(h.deps);
    await flush();
    expect(h.saved).toHaveLength(1);
    h.remoteApply(base({ completedLessons: [7] }), false);
    expect(h.deps.getLocal().completedLessons).toEqual([7]);
    // The store notified its listeners synchronously; the guard swallowed it.
    expect(h.saved).toHaveLength(1);
    expect(h.states.at(-1)).toBe('synced');
  });

  it('a cached snapshot while offline reads as offline', async () => {
    const h = makeHarness({ remote: undefined });
    startProgressSync(h.deps);
    await flush();
    h.setOnline(false);
    h.remoteApply(base(), true);
    expect(h.states.at(-1)).toBe('offline');
  });

  it('a listener error is error online and offline without network', async () => {
    const h = makeHarness({ remote: undefined });
    startProgressSync(h.deps);
    await flush();
    h.remoteFail();
    expect(h.states.at(-1)).toBe('error');
    h.setOnline(false);
    h.remoteFail();
    expect(h.states.at(-1)).toBe('offline');
  });
});

describe('teardown', () => {
  it('unsubscribes both watchers', async () => {
    const h = makeHarness({ remote: undefined });
    const stop = startProgressSync(h.deps);
    await flush();
    stop();
    expect(h.unsubscribed.local).toBe(true);
    expect(h.unsubscribed.remote).toBe(true);
  });

  it('a teardown mid-load leaves no store subscription behind', async () => {
    let resolveLoad: (v: Partial<UserProgress> | undefined) => void = () => {};
    const h = makeHarness({
      loadRemote: () => new Promise((res) => { resolveLoad = res; }),
    });
    const stop = startProgressSync(h.deps);
    stop();
    resolveLoad(base({ completedLessons: [1] }));
    await flush();
    expect(h.localListenerCount()).toBe(0);
    expect(h.saved).toHaveLength(1); // the merged write-back still landed
  });
});
