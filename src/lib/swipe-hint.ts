/**
 * Whether to play the swipe hint.
 *
 * A swipe is a hidden affordance: nothing on screen says the gesture exists.
 * The researched fix is HINT MOTION — briefly preview the movement itself, so
 * the learner associates the gesture with what it does. A label reading "swipe
 * to continue" is the weaker version of the same idea, because it describes the
 * gesture instead of demonstrating it.
 *
 * SHOWN ONCE, NOT FOREVER. The same guidance is clear that hints should fire
 * when the learner first reaches the moment and then stop; a hint that replays
 * on every card stops being a hint and becomes a tic. So the first successful
 * swipe retires it permanently.
 *
 * Failing open matters more than remembering: if storage is unavailable the
 * hint plays, because an unteachable gesture is worse than a repeated one.
 */

const KEY = 'lg-swiped';

export function hasSwipedBefore(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}

export function rememberSwipe(): void {
  try {
    localStorage.setItem(KEY, '1');
  } catch {
    /* private mode — the hint will play again, which is the safe failure */
  }
}
