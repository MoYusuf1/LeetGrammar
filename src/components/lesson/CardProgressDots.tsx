/**
 * Card Progress Dots — Shows position in the lesson card stack.
 * Mobile-first: small dots, touch-friendly tap targets.
 *
 * Completed dots are tappable to step back; upcoming ones are not, because
 * skipping ahead past a retrieval card would defeat the point of it being there
 * (design rule S5).
 */

interface CardProgressDotsProps {
  total: number;
  current: number;
  completed: Set<number>;
  onDotClick?: (index: number) => void;
}

export default function CardProgressDots({ total, current, completed, onDotClick }: CardProgressDotsProps) {
  return (
    <div
      className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2"
      aria-label={`Card ${current + 1} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = completed.has(i);
        const isCurrent = i === current;

        return (
          <button
            key={i}
            onClick={() => isCompleted && onDotClick?.(i)}
            disabled={!isCompleted && !isCurrent}
            aria-label={`Card ${i + 1}${isCompleted ? ', done' : ''}`}
            /* The hit area is the button; the visible mark is the inner span.
               A 6px dot is not a tap target — this keeps the row slim while
               staying tappable on a phone. */
            className="group flex h-6 flex-shrink-0 items-center px-[1px]"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-5 bg-accent'
                  : isCompleted
                    ? 'w-1.5 bg-accent'
                    : 'w-1.5 bg-border-strong'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
