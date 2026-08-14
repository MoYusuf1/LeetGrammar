/**
 * Glossary — a sheet, not a page.
 *
 * WHY IT MOVED: as /glossary it was a destination a learner had to think to
 * visit, which is the opposite of when it is useful. The glossary exists
 * because lesson text is deliberately jargon-free (the validator fails on
 * banned terms — see src/data/banned-terms.ts), so the moment a learner needs
 * it is the moment they meet "the t-type ending" here and "feminine determiner
 * suffix" in a grammar book somewhere else. So it opens from inside the lesson.
 *
 * Per Part 4 of COURSE_DESIGN.md: technical terms are demoted to the glossary —
 * zero in lesson text, one optional aside per lesson naming the technical term.
 */

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { getBannedTermsWithReplacements } from '@/data/banned-terms';

export default function GlossarySheet({ onClose }: { onClose: () => void }) {
  const terms = getBannedTermsWithReplacements();

  /* Escape closes, and the page behind must not scroll while it is open —
     otherwise dragging the sheet scrolls the lesson underneath on mobile. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Close glossary"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Glossary"
        className="relative flex max-h-[85dvh] w-full max-w-column flex-col rounded-t-2xl bg-elevated  animate-sheet-up sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4">
          <div>
            <h2 className="text-title3 font-semibold text-label">Glossary</h2>
            <p className="mt-1 text-footnote text-label-2">
              Plain words on the left are what this course says. The technical names are
              what you will meet in grammar books and videos. You never need them here.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-label-3 transition-colors hover:bg-fill hover:text-label"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-2 pb-[calc(1.25rem+var(--safe-b))]">
          <dl className="divide-y divide-separator">
            {terms.map((term, i) => (
              <div key={i} className="py-3.5">
                <dt className="text-body font-semibold text-label">{term.plain}</dt>
                <dd className="mt-0.5 text-footnote text-label-2">
                  grammar books call this{' '}
                  <span className="font-medium text-accent">{term.technical}</span>
                </dd>
                {term.note && (
                  <dd className="mt-2 rounded-lg bg-fill px-3 py-2 text-footnote text-label-2">
                    {term.note}
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
