import { useMemo } from 'react';
import { Download, LogOut, RefreshCw, X } from 'lucide-react';
import { useAuthSync } from '@/contexts/AuthSyncContext';
import { snapshotProgress } from '@/lib/progress-sync';
import { useProgressStore } from '@/stores/progress-store';

const labels = { local: 'On this device', syncing: 'Syncing', synced: 'Synced', offline: 'Offline', error: 'Needs attention' } as const;

export default function ProfileSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, ready, syncState, signIn, signOutUser, retry } = useAuthSync();
  const progress = useProgressStore();
  const bestScore = useMemo(() => Math.max(0, ...Object.values(progress.unitTestResults ?? {}).map((r) => r.bestPercentage)), [progress.unitTestResults]);
  if (!open) return null;
  const download = () => {
    const blob = new Blob([JSON.stringify({ schemaVersion: 7, exportedAt: new Date().toISOString(), progress: snapshotProgress(progress) }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `leetgrammar-progress-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url);
  };
  return (
    <div className="profile-sheet fixed inset-0 z-50 overflow-y-auto bg-bg" role="dialog" aria-modal="true" aria-labelledby="profile-title">
      <div className="profile-panel">
      <header className="glass glass-top sticky top-0 z-10 flex h-14 items-center justify-between px-4 pt-safe-t">
        <button onClick={onClose} aria-label="Close profile" className="grid h-10 w-10 place-items-center rounded-full active:bg-fill"><X size={22}/></button>
        <h1 id="profile-title" className="text-headline font-semibold">{!user && ready ? 'Sign in' : 'Profile'}</h1><span className="w-10" />
      </header>
      <main className="mx-auto max-w-[38rem] px-5 pb-[calc(3rem+var(--safe-b))] pt-8">
        {!ready ? <p className="text-center text-label-2">Loading account…</p> : !user ? (
          /* Sign in, and nothing else. The demo decode and the course pitch
             used to live here; the learner asked for a screen that says what
             it is and offers the one action. */
          <section className="flex min-h-[70dvh] flex-col justify-center">
            <div className="text-center">
              <h2 className="text-title1 font-bold tracking-tight">Sign in</h2>
              <p className="mx-auto mt-3 max-w-sm text-body leading-relaxed text-label-2">
                Sync your lessons and review schedule across devices.
              </p>
            </div>

            <div className="mx-auto mt-8 w-full max-w-sm">
              <button onClick={() => void signIn()} className="w-full rounded-xl bg-accent px-5 py-3.5 text-headline font-semibold text-accent-ink active:opacity-70">Continue with Google</button>
              <p className="mt-4 text-center text-caption1 leading-relaxed text-label-3">
                Progress already on this device merges on first sign-in. No password is stored by LeetGrammar.
              </p>
              <p className="mt-2 text-center text-caption1 leading-relaxed text-label-3">
                It works without an account too. Everything simply stays on this device.
              </p>
            </div>
          </section>
        ) : (
          <>
            <section className="flex flex-col items-center text-center">
              {user.photoURL ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="h-24 w-24 rounded-full bg-fill object-cover" /> : <div className="grid h-24 w-24 place-items-center rounded-full bg-fill text-title1 font-semibold">{(user.displayName || user.email || 'L').slice(0,1).toUpperCase()}</div>}
              <h2 className="mt-4 text-title2 font-bold">{user.displayName || 'Learner'}</h2><p className="mt-1 text-footnote text-label-2">{user.email}</p>
              <button onClick={syncState === 'error' ? retry : undefined} className="mt-4 inline-flex items-center gap-2 rounded-full bg-fill px-3 py-1.5 text-footnote font-medium"><span className={`h-2 w-2 rounded-full ${syncState === 'synced' ? 'bg-label' : 'bg-label-3'}`} />{labels[syncState]}{syncState === 'error' && <RefreshCw size={14}/>}</button>
            </section>
            <section className="mt-10"><p className="mb-2 pl-4 text-caption2 uppercase tracking-wider text-label-3">Learning</p><div className="list-group grid grid-cols-2">
              <Stat label="Day streak" value={progress.streak}/><Stat label="Lessons" value={progress.completedLessons.length}/><Stat label="Active days" value={new Set(progress.activityLog).size}/><Stat label="Best unit test" value={`${bestScore}%`}/>
            </div></section>
            <section className="mt-8"><p className="mb-2 pl-4 text-caption2 uppercase tracking-wider text-label-3">Your data</p><div className="list-group">
              <button onClick={download} className="list-row flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-fill"><Download size={19}/><span>Download my data</span></button>
              <button onClick={() => void signOutUser()} className="list-row flex w-full items-center gap-3 px-4 py-3.5 text-left active:bg-fill"><LogOut size={19}/><span>Sign out</span></button>
            </div><p className="mt-3 px-4 text-caption1 leading-relaxed text-label-3">Signing out keeps this device's local copy. Sign in again to resume cloud sync.</p></section>
          </>
        )}
      </main>
      </div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string | number }) { return <div className="border-b border-r border-separator px-4 py-5"><p className="text-title1 font-semibold tabular-nums">{value}</p><p className="mt-1 text-footnote text-label-2">{label}</p></div>; }
