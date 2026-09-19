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
          <section className="flex min-h-[70dvh] flex-col items-center justify-center">
            <h2 className="text-title1 font-bold tracking-tight">Sign in</h2>
            <button
              onClick={() => void signIn()}
              className="mt-8 flex w-full max-w-sm items-center justify-center gap-3 rounded-xl bg-accent px-5 py-3.5 text-headline font-semibold text-accent-ink active:opacity-70"
            >
              <GoogleMark />
              <span>Sign in with Google</span>
            </button>
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

function GoogleMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.87h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.33 2.98-7.35Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.98-.9 6.63-2.42l-3.24-2.51c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.59A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.39 13.9A6 6 0 0 1 6.08 12c0-.66.11-1.3.31-1.9V7.51H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.49l3.35-2.59Z" />
      <path fill="#EA4335" d="M12 5.97c1.47 0 2.79.5 3.83 1.5l2.87-2.88A9.63 9.63 0 0 0 12 2a10 10 0 0 0-8.96 5.51l3.35 2.59C7.18 7.73 9.39 5.97 12 5.97Z" />
    </svg>
  );
}
