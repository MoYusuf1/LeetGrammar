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
 * It also could not do the one thing it existed for. `blueprintSlot` has been a
 * typed field on the card all along — 'WHO' | 'SIGNAL' | 'WHAT' | 'DO' — and
 * nothing ever read it, so no lesson could actually show you which box it was
 * filling in. Now the highlight comes from the data.
 *
 * The ASCII is stripped from the prose by stripBoxArt() rather than removed
 * from the content, because lesson content is source-verified data and this is
 * a presentation problem.
 */

const SLOTS = ['WHO', 'SIGNAL', 'WHAT', 'DO'] as const;

export type BlueprintSlot = (typeof SLOTS)[number];

/** True if a line is box-drawing art rather than prose. */
function isBoxArt(line: string): boolean {
  return /[┌│└─┬┴┐┘├┤┼]/.test(line);
}

/**
 * Splits blueprint card content into the art (discarded) and the prose.
 * Returns the prose with the leading box removed and blank edges trimmed.
 */
export function stripBoxArt(content: string): string {
  return content
    .split('\n')
    .filter((line) => !isBoxArt(line))
    .join('\n')
    .trim();
}

export default function Blueprint({ slot }: { slot?: BlueprintSlot }) {
  return (
    <div
      className="flex overflow-hidden rounded-lg"
      role="img"
      aria-label={
        slot
          ? `Sentence shape: WHO, SIGNAL, WHAT, DO. This lesson fills the ${slot} box.`
          : 'Sentence shape: WHO, SIGNAL, WHAT, DO.'
      }
    >
      {SLOTS.map((s) => {
        const active = s === slot;
        return (
          <span
            key={s}
            aria-hidden
            className={`flex-1 py-2.5 text-center text-caption2 font-semibold uppercase tracking-wider ${
              active ? 'bg-accent text-accent-ink' : 'bg-fill text-label-3'
            }`}
          >
            {s}
          </span>
        );
      })}
    </div>
  );
}
