/**
 * The lesson toolbar — Safari's bottom bar, applied to a lesson.
 *
 * Back and forward chevrons sit bottom-left exactly where Safari puts them, so
 * the gesture nobody could find is now a control everybody already knows. The
 * primary action, when the lesson has one, sits bottom-right as a pill.
 *
 * SWIPE IS GONE. It was unreliable for two reasons that were both real bugs —
 * the drag surface was only as tall as the text, so most of the screen was
 * dead, and dragElastic was low enough that the card barely followed the
 * finger. Rather than tune a hidden affordance, the affordance became visible.
 * Nothing here depends on a gesture or an animation completing, which is also
 * what the reduced-motion and headless-browser cases need.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface LessonToolbarProps {
  canBack: boolean;
  canForward: boolean;
  onBack: () => void;
  onForward: () => void;
  /** Rendered as a pill on the right when the step demands something. */
  action?: { label: string; onClick: () => void; disabled?: boolean };
}

export default function LessonToolbar({
  canBack,
  canForward,
  onBack,
  onForward,
  action,
}: LessonToolbarProps) {
  return (
    <div className="glass glass-bottom sticky bottom-0 z-20 flex-shrink-0 px-2 pt-2">
      <div className="mx-auto flex max-w-column items-center gap-1">
        <ToolbarButton label="Back" onClick={onBack} disabled={!canBack}>
          <ChevronLeft className="h-6 w-6" />
        </ToolbarButton>
        <ToolbarButton label="Forward" onClick={onForward} disabled={!canForward}>
          <ChevronRight className="h-6 w-6" />
        </ToolbarButton>

        <div className="flex-1" />

        {action && (
          <button
            onClick={action.onClick}
            disabled={action.disabled}
            className={`pressable rounded-full px-6 py-2.5 text-callout font-semibold ${
              action.disabled
                ? 'cursor-not-allowed bg-fill text-label-3'
                : 'bg-accent text-accent-ink'
            }`}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

function ToolbarButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full text-label transition-opacity active:opacity-40 disabled:opacity-25"
    >
      {children}
    </button>
  );
}
