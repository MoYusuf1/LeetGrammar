/**
 * Should the UI animate?
 *
 * Two reasons this exists, and both matter.
 *
 * 1. **Accessibility.** Somebody who has asked their OS for reduced motion
 *    should not be shown 300px sliding cards.
 *
 * 2. **The app has to be verifiable.** Rule 1 of the working agreement is
 *    "open the browser and drive it", and the lesson player made that
 *    impossible in a headless or hidden browser: `AnimatePresence mode="wait"`
 *    holds the outgoing card until its exit animation finishes, the exit
 *    animation is driven by `requestAnimationFrame`, and a browser that is not
 *    compositing frames never fires rAF. The card counter advanced while the
 *    card content never changed — indistinguishable from a real softlock, and
 *    it cost a full debugging pass to tell the two apart.
 *
 * Correctness must not depend on an animation completing. With motion off the
 * player renders the current card directly, so advancing works whether or not
 * anything is painting.
 *
 * Any automation tool can switch it off with no rebuild and no flag:
 *
 *     localStorage.setItem('lg-motion', 'off');   // then reload
 *
 * Set it back with `localStorage.removeItem('lg-motion')`. See
 * docs/ADDING_CONTENT.md for where this fits in the verification routine.
 */

const STORAGE_KEY = 'lg-motion';

export function prefersNoMotion(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === 'off') return true;
  } catch {
    /* localStorage can throw in private-mode browsers; fall through to the query */
  }
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}
