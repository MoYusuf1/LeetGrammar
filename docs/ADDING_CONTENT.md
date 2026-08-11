# Adding content

> The repeatable procedure for growing the course: another lesson, another
> unit, or just more practice on something that needs more practice.
>
> The rule this page exists to enforce: **adding content is additive.** If you
> find yourself editing a list of lesson numbers, a unit range, or a UI file to
> make new content appear, stop — that is a bug in the structure, not a step in
> the recipe. It has happened twice and is now checked.

Read [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) first. Everything here
assumes its five rules, especially rule 5: **no Somali ships unless
`verified-forms.ts` has it.**

---

## What is derived, and therefore free

You never register these. They compute from the lessons themselves:

| Thing | Derived from |
| --- | --- |
| Which units exist (`UNITS`) | the distinct `unitId`s in `AUTHORED_LESSONS` |
| Which lessons are in a unit | `lesson.unitId` |
| `MAX_LESSON_ID`, `LESSON_LIST` | `AUTHORED_LESSONS` |
| Unit sections on `/learn` | `UNITS` |
| Unit-test unlock gating | `isUnitComplete()` over the unit's lessons |
| Which lesson an objective belongs to | the lesson that declares it |

So authoring a lesson with `unitId: 2` makes Unit 2 appear on `/learn`, with
its own section and unlock gating, with no other edit. That is verified: a
synthetic Lesson 5 was injected and the page went from "4 lessons across 1
unit" to "5 lessons across 2 units" with no code change.

---

## Recipe 1 — more practice in an existing lesson

The common case: a rule needs more reps.

1. Source the Somali first (see *Sourcing* below). Skip nothing here.
2. Open `src/data/authored-lessons.ts`, find the lesson, add a card to `cards`:

```ts
{
  id: '3-complete-5',              // unique; convention is <lesson>-<role>-<n>
  type: 'complete',                // pedagogical role: notice | complete | produce
  exercise: {
    id: '3-ex-complete-5',
    type: 'fill_blank',            // interaction shape — NOT the same as card type
    objectiveIds: ['article-assimilation'],
    question: '...',
    options: [...], correctAnswer: '...',   // choice types
    hint: '...',                   // required, never generic
    explanation: '...',            // required, explains the rule
  },
}
```

3. Run the three gates.

**Card `type` is a pedagogical role; exercise `type` is an interaction shape.**
Conflating the two is what caused the Lesson 1 softlock. `notice` → comprehend
only, `complete` → scaffolded production, `produce` → unscaffolded.

Structure checks that will push back: `T1` wants the lesson to still open on a
blueprint and close on a payoff/summary; `E2` wants ≥4 exercises; `S5`-style
density rules dislike long runs with no retrieval.

---

## Recipe 2 — more items in a unit test bank

The bank is separate from lesson practice, and lives in its own file per unit
so it can grow without any other file growing.

1. Open `src/data/unit-banks/unit-N.ts`.
2. Append to the items array. Read the three rules in that file's header first —
   registry-verified Somali, machine-gradable, and **not a verbatim copy of a
   lesson question** (a test made of the exercises you just did measures recall
   of those exercises; a test asserts this and `src/tests/unit-tests.test.ts`
   enforces it).
3. Run the gates. `U1` checks the Somali, `U3` checks objective coverage.

**Adding items is how the retake gap gets fixed.** Right now a retake serves
the same items in the same order, so a learner can fail, read the answers off
the results screen, and pass by recall. That is a *content* shortage, not a
code one: with 32 items over 13 objectives there is no second pool to draw
from. Roughly double the bank and a retake can serve genuinely fresh items.

Per-objective floor is 2 items (`U3`). Two means one miss fails that objective
— deliberate, since correctives is a short revision pass, not a penalty. Three
or four is better for the load-bearing rules.

---

## Recipe 3 — a new lesson in an existing unit

1. Source everything.
2. Add `const LESSON_N: Lesson = { id: N, unitId: <existing>, ... }` in
   `authored-lessons.ts`.
3. Add it to the `AUTHORED_LESSONS` array.
4. Label any new objectives in `src/data/objectives.ts`.
5. Add test-bank items covering the new objectives (Recipe 2) — `U3` fails
   without them.
6. Gates, then **open the browser and complete the lesson**.

Nothing else. The lessons page, unit membership and gating all follow.

---

## Recipe 4 — a whole new unit

1. Author its lessons with the new `unitId` (Recipe 3 for each).
2. Create `src/data/unit-banks/unit-N.ts` exporting `UNIT_N_TEST: TestBank`.
   Copy the header rules from `unit-1.ts`.
3. In `src/data/unit-tests.ts` add exactly two things: the import, and an entry
   in `TEST_BANKS`. Add a name in `UNIT_NAMES` in the same file.

That is the entire registration. `U5` warns while a unit is half-registered —
lessons but no bank, or no name — so an unfinished unit is visible rather than
silent. It is a **warning, not an error**, because authoring lessons before
their bank is the normal order of work.

---

## Sourcing — the part that is not optional

Every Somali form, in any recipe, before it is written into a lesson:

1. Find it in **two independent sources**. The keys in use are in
   [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) (`N` = Nilsson, `W-alpha`,
   `W-gram`, `Wikt`).
2. Record the fact and its citations in `SOMALI_SOURCES.md`.
3. Add the form to `src/data/verified-forms.ts` with those source keys.
4. Only then author it.

One source is allowed but must be declared `confidence: 'single'` so thin
sourcing is visible rather than implied.

**Do not invent a citation.** Two entries once cited sections of Nilsson where
the words do not appear. Fabricating a citation is the same failure as
fabricating a word, one level up, and harder to catch because it looks like
diligence.

What the gate covers: answers, word banks, and — since the choice-answer hole
was closed — the correct answer of multiple-choice, fill-blank and matching
items. Distractor options are deliberately *wrong* Somali and are exempt; they
are the mistake being tested and are never shown as correct.

---

## The gates, every time

```bash
npm run build && npx vitest run && npm run validate:course
```

And if the change is visible in the browser, **open the browser and drive it**.
A green build is not evidence the app works — the worst bug in this project's
history compiled cleanly and passed every check that existed.

If the browser shows stale content after an edit, it is the service worker:

```js
(await navigator.serviceWorker.getRegistrations()).forEach(r => r.unregister());
(await caches.keys()).forEach(k => caches.delete(k));
```

Then open a **new tab** — reloading the existing one is not always enough.

---

## When you add a check

New content sometimes reveals that an invariant was never enforced. When you
add a check, **prove it bites**: inject the defect it guards against, watch it
fail, then revert. A check that has never failed is decoration. Every check in
`validate-course.mjs` and every regression test in `src/tests/` was verified
this way, and several were found to be silently useless by doing it.
