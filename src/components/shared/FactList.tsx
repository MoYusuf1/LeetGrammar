/**
 * The intro fact table — "Questions 12 · Hints off · To pass 85%".
 *
 * A definition list inside an elevated card, rows separated by a hairline.
 * Both task intros (unit test, homework) built this by hand; FactList is
 * the card and FactRow is one fact.
 */

import type { ReactNode } from 'react';

export function FactList({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <dl className={`overflow-hidden rounded-xl bg-elevated ${className}`}>{children}</dl>;
}

export function FactRow({ label, value, first }: { label: string; value: string; first?: boolean }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 px-4 py-3 ${
        first ? '' : 'border-t border-separator'
      }`}
    >
      <dt className="text-footnote text-label-2">{label}</dt>
      <dd className="text-right text-footnote font-medium text-label">{value}</dd>
    </div>
  );
}
