/**
 * The sentence blueprint — WHO · SIGNAL · WHAT · DO.
 *
 * WAS ASCII ART. The lesson data prepends a box-drawing constant to blueprint
 * card content:
 *
 *   ┌──────┬────────┬────────┬──────┐
 *   │ WHO  │ SIGNAL │  WHAT  │  DO  │
 *   └──────┴────────┴────────┴──────┘
 *
 * which the player rendered inside a <pre> in a monospace font. On a phone that
 * overflowed the screen and cut the sentence beside it in half, and it looked
 * like a terminal in the middle of an iOS app.
 *
 * The ASCII is stripped from the prose by stripBoxArt() rather than removed
 * from the content, because lesson content is source-verified data and this is
 * a presentation problem.
 *
 * THREE STATES, NOT TWO. It first rendered current-versus-everything-else, so
 * at Lesson 5 the WHO box — finished three lessons ago — looked identical to
 * WHAT, which nothing had touched. The learner could see where they were and
 * not what they owned, which is half of what an advance organizer is for: §1.13
 * puts graphic organizers at 1.24 against prose at 0.80, and the completion was
 * only ever stated in the prose beside it.
 *
 *   current    the box this lesson fills        accent, full contrast
 *   done       filled by an earlier lesson      readable, quiet
 *   empty      no lesson has filled it yet      faint
 *
 * `done` is derived from the course data by slotsCompletedBefore(), never
 * stored, so it cannot drift from what the lessons actually teach.
 */

import { BLUEPRINT_SLOTS, type BlueprintSlot } from '@/data/types';

export type { BlueprintSlot };

export default function Blueprint({
  slot,
  done = [],
}: {
  /** The box or boxes this lesson fills. */
  slot?: BlueprintSlot | BlueprintSlot[];
  /** Boxes filled by earlier lessons. */
  done?: BlueprintSlot[];
}) {
  const current = new Set(slot ? (Array.isArray(slot) ? slot : [slot]) : []);
  // A box being filled right now is never also "done" — current wins.
  const earlier = new Set(done.filter((s) => !current.has(s)));

  const label = current.size
    ? `Sentence shape: WHO, SIGNAL, WHAT, DO. This lesson fills ${[...current].join(' and ')}.` +
      (earlier.size ? ` Already filled: ${[...earlier].join(', ')}.` : '')
    : 'Sentence shape: WHO, SIGNAL, WHAT, DO.';

  return (
    <div className="flex overflow-hidden rounded-lg" role="img" aria-label={label}>
      {BLUEPRINT_SLOTS.map((s) => {
        const state = current.has(s) ? 'current' : earlier.has(s) ? 'done' : 'empty';
        return (
          <span
            key={s}
            aria-hidden
            className={`flex-1 py-2.5 text-center text-caption2 font-semibold uppercase tracking-wider ${
              state === 'current'
                ? 'bg-accent text-accent-ink'
                : state === 'done'
                  ? 'bg-fill text-label'
                  : 'bg-fill text-label-3'
            }`}
          >
            {s}
          </span>
        );
      })}
    </div>
  );
}
