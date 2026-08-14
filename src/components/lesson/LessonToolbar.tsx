/**
 * The lesson toolbar — built the way Safari and Notes build theirs.
 *
 * THE SHAPE IS THE POINT. Neither app puts bare buttons on a tinted band. They
 * float ROUNDED GLASS CAPSULES over the content, each capsule holding a row of
 * related icons:
 *
 *   Safari:  ( ‹  › )   ( url  ⟳ )   ( ⋯ )
 *   Notes:   ( ☑  📎  ✎  ✨ )              ( ✏︎ )
 *
 * So the bar itself is transparent and the capsules carry the glass. The
 * previous version had it backwards — a glass strip across the whole width with
 * two naked chevrons sitting on it, which reads as a toolbar from a different
 * operating system.
 *
 * ADDING MORE LATER IS THE EASY CASE, DELIBERATELY. <ToolbarGroup> is a
 * capsule and <ToolbarButton> is an item in it; a new action is one more button
 * inside the group, and a second capsule is one more <ToolbarGroup>. That is
 * the Notes arrangement and it extends without redesign.
 */

import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface LessonToolbarProps {
  canBack: boolean;
  canForward: boolean;
  onBack: () => void;
  onForward: () => void;
  /** The one thing the step demands, when it demands anything. */
  action?: { label: string; onClick: () => void; disabled?: boolean };
}

/** A floating glass capsule holding one or more toolbar items. */
export function ToolbarGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass pointer-events-auto flex items-center gap-0.5 rounded-full p-1">
      {children}
    </div>
  );
}

/** An icon item inside a capsule. */
export function ToolbarButton({
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
      className="flex h-10 w-11 items-center justify-center rounded-full text-label transition-opacity active:opacity-40 disabled:opacity-25"
    >
      {children}
    </button>
  );
}

export default function LessonToolbar({
  canBack,
  canForward,
  onBack,
  onForward,
  action,
}: LessonToolbarProps) {
  return (
    /* Fixed and transparent, so content passes behind the capsules the way it
       does behind Safari's. The scroll pane pads itself to clear this. */
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 px-3 pb-[calc(0.5rem+var(--safe-b))] pt-2">
      {/* The wrappers stay click-through so the empty strip between the capsules
          does not swallow taps and scrolls meant for the content behind it.
          Only the controls themselves take pointer events. */}
      <div className="pointer-events-none mx-auto flex max-w-column items-center gap-2">
        <ToolbarGroup>
          <ToolbarButton label="Back" onClick={onBack} disabled={!canBack}>
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.25} />
          </ToolbarButton>
          <ToolbarButton label="Forward" onClick={onForward} disabled={!canForward}>
            <ChevronRight className="h-[22px] w-[22px]" strokeWidth={2.25} />
          </ToolbarButton>
        </ToolbarGroup>

        <div className="flex-1" />

        {action && (
          <button
            onClick={action.onClick}
            disabled={action.disabled}
            className={`pressable pointer-events-auto rounded-full px-6 py-3 text-callout font-semibold ${
              action.disabled ? 'glass text-label-3' : 'bg-accent text-accent-ink'
            }`}
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
