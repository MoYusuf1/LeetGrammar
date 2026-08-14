/**
 * Lesson options — the sheet behind the ⋯ button.
 *
 * WHY A MENU. The lesson used to carry a top bar holding a close button, a row
 * of progress dots, a counter and a glossary icon — four controls competing
 * with the card, on a screen whose whole job is one card. Everything except
 * "leave" and "where am I" moved in here, which is where iOS puts the things
 * you need occasionally and not now.
 *
 * "Back a card" lives here because the progress dots used to be the only way to
 * step backwards, and replacing them with a plain progress line would have
 * silently removed the capability.
 */

import { useEffect } from 'react';
import { ChevronLeft, BookA, Printer, X } from 'lucide-react';

export interface LessonMenuProps {
  onClose: () => void;
  onBackACard?: () => void;
  onGlossary: () => void;
  onWorksheet: () => void;
  onLeave: () => void;
}

export default function LessonMenu({
  onClose,
  onBackACard,
  onGlossary,
  onWorksheet,
  onLeave,
}: LessonMenuProps) {
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
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Lesson options"
        className="animate-sheet-up relative w-full max-w-column px-3 pb-[calc(0.75rem+var(--safe-b))]"
      >
        <div className="overflow-hidden rounded-xl bg-elevated">
          {onBackACard && (
            <Item icon={<ChevronLeft className="h-5 w-5" />} label="Back a card" onClick={onBackACard} />
          )}
          <Item icon={<BookA className="h-5 w-5" />} label="Glossary" onClick={onGlossary} />
          <Item icon={<Printer className="h-5 w-5" />} label="Print a worksheet" onClick={onWorksheet} />
          <Item icon={<X className="h-5 w-5" />} label="Leave lesson" onClick={onLeave} />
        </div>

        <button
          onClick={onClose}
          className="pressable mt-2 w-full rounded-xl bg-elevated py-3.5 text-body font-semibold text-label"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Item({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="list-row flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-left active:bg-fill"
    >
      <span className="flex-shrink-0 text-label-2">{icon}</span>
      <span className="text-body text-label">{label}</span>
    </button>
  );
}
