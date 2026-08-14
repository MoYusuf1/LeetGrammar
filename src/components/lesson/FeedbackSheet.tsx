/**
 * Answer feedback — a sheet that rises over the card.
 *
 * Feedback used to be a bordered block appended below the question, which
 * pushed the layout down and read as more page rather than as a response. iOS
 * confirms an action with something that comes up from the bottom and owns the
 * moment, so this does that: the card stays visible behind it, so the learner
 * can still see what they answered while reading why.
 *
 * The continue button lives INSIDE the sheet. That is the point — on a passive
 * card there is no button at all, so a button appearing means "you did
 * something and here is the result".
 *
 * Right and wrong are not carried by color (the palette is monochrome). The
 * glyph and the wording carry it, which also happens to work for a colorblind
 * learner.
 */

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import type { ReactNode } from 'react';

export interface FeedbackSheetProps {
  /** Null when the item is self-graded and there is no verdict to give. */
  correct: boolean | null;
  /** "Correct", "Not quite — the answer is guriga", etc. */
  heading: ReactNode;
  explanation: ReactNode;
  continueLabel: string;
  onContinue: () => void;
}

export default function FeedbackSheet({
  correct,
  heading,
  explanation,
  continueLabel,
  onContinue,
}: FeedbackSheetProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3">
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 38 }}
        role="status"
        aria-live="polite"
        className="w-full max-w-column rounded-t-2xl bg-elevated px-5 pb-[calc(1rem+var(--safe-b))] pt-5 shadow-[0_-8px_40px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-start gap-2.5">
          {correct !== null && (
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink"
            >
              {correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-body font-semibold text-label">{heading}</p>
            <p className="mt-1 text-subhead text-label-2">{explanation}</p>
          </div>
        </div>

        <button
          onClick={onContinue}
          autoFocus
          className="pressable mt-5 w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink"
        >
          {continueLabel}
        </button>
      </motion.div>
    </div>
  );
}
