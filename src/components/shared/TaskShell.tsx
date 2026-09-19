/**
 * A task view: full-screen over /learn, closed rather than navigated back.
 * The X is the affordance because a task is a thing you finish or abandon,
 * not a page in a hierarchy.
 *
 * Unit test, homework and correctives all used to keep their own copy of
 * this header; the copies differed only by whether the title could truncate
 * and whether a second row (the test progress bar) could hang below it.
 */

import type { ReactNode } from 'react';
import { X } from 'lucide-react';

export interface TaskShellProps {
  children: ReactNode;
  onClose: () => void;
  title: string;
  /** Right-aligned counter, e.g. "3/12". */
  progress?: string;
  /** A second row inside the glass header — the test progress bar lives here. */
  below?: ReactNode;
}

export default function TaskShell({ children, onClose, title, progress, below }: TaskShellProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg">
      <header className="glass glass-top sticky top-0 z-20 px-4 pt-safe-t">
        <div className="mx-auto flex max-w-column items-center gap-3 py-2.5">
          <button
            onClick={onClose}
            aria-label="Close"
            className="-ml-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-label-3 transition-colors hover:bg-fill hover:text-label"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
          <span className="min-w-0 flex-1 truncate text-footnote font-medium text-label">{title}</span>
          {progress && (
            <span className="flex-shrink-0 text-caption2 tabular-nums text-label-3">{progress}</span>
          )}
        </div>
        {below && <div className="mx-auto max-w-column pb-3">{below}</div>}
      </header>

      <main className="mx-auto w-full max-w-column flex-1 px-4 pb-[calc(1.5rem+var(--safe-b))] pt-5">
        {children}
      </main>
    </div>
  );
}
