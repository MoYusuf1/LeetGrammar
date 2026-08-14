/**
 * Stripping the sentence-blueprint ASCII out of lesson prose.
 *
 * Lives apart from Blueprint.tsx so that file only exports a component —
 * mixing components and plain functions in one module breaks React Fast
 * Refresh, which silently degrades to a full reload during development.
 *
 * The lesson data prepends a box-drawing constant to blueprint card content:
 *
 *   ┌──────┬────────┬────────┬──────┐
 *   │ WHO  │ SIGNAL │  WHAT  │  DO  │
 *   └──────┴────────┴────────┴──────┘
 *
 * It is removed at render time rather than edited out of the content, because
 * lesson content is source-verified data and this is a presentation concern.
 * Only that one constant in the whole course uses box-drawing characters.
 */

/** True if a line is box-drawing art rather than prose. */
function isBoxArt(line: string): boolean {
  return /[┌│└─┬┴┐┘├┤┼]/.test(line);
}

/** The prose of a blueprint card, with the ASCII diagram removed. */
export function stripBoxArt(content: string): string {
  return content
    .split('\n')
    .filter((line) => !isBoxArt(line))
    .join('\n')
    .trim();
}
