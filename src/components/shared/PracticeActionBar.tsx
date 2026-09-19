/**
 * The sticky bottom bar for practice surfaces: "Check answer" until the
 * item is checked, then a continue action. The glass strip sticks to the
 * viewport bottom so the action is reachable however long the item is.
 *
 * Homework and the unit test's correctives each had a copy.
 */

interface PracticeActionBarProps {
  checked: boolean;
  canCheck: boolean;
  onCheck: () => void;
  onNext: () => void;
  /** Label for the continue action on the last item ("Finish", "Back to results"). */
  lastLabel: string;
  isLast: boolean;
}

export default function PracticeActionBar({
  checked,
  canCheck,
  onCheck,
  onNext,
  lastLabel,
  isLast,
}: PracticeActionBarProps) {
  return (
    <div className="glass glass-bottom sticky bottom-0 -mx-4 mt-6 px-4 pt-3">
      {checked ? (
        <button
          onClick={onNext}
          className="pressable w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
        >
          {isLast ? lastLabel : 'Continue'}
        </button>
      ) : (
        <button
          onClick={onCheck}
          disabled={!canCheck}
          className={`pressable w-full rounded-xl py-4 text-body font-semibold transition-colors ${
            canCheck
              ? 'bg-accent text-accent-ink hover:opacity-90'
              : 'cursor-not-allowed bg-fill text-label-3'
          }`}
        >
          Check answer
        </button>
      )}
    </div>
  );
}
