/**
 * Card Progress Dots — Shows position in the lesson card stack.
 * Mobile-first: small dots, touch-friendly tap targets.
 */

import { Check } from 'lucide-react';

interface CardProgressDotsProps {
  total: number;
  current: number;
  completed: Set<number>;
  onDotClick?: (index: number) => void;
}

export default function CardProgressDots({ total, current, completed, onDotClick }: CardProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar py-1">
      {Array.from({ length: total }, (_, i) => {
        const isCompleted = completed.has(i);
        const isCurrent = i === current;

        return (
          <button
            key={i}
            onClick={() => isCompleted && onDotClick?.(i)}
            disabled={!isCompleted && i !== current}
            className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${
              isCurrent
                ? 'bg-[#ffa116] w-5 h-2 rounded-full'
                : isCompleted
                ? 'bg-[#22c55e]'
                : 'bg-[#ffffff15]'
            } ${isCompleted ? 'cursor-pointer hover:bg-[#22c55e80]' : 'cursor-default'}`}
          >
            {isCompleted && (
              <div className="w-full h-full flex items-center justify-center">
                <Check size={6} className="text-[#0f0f0f]" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
