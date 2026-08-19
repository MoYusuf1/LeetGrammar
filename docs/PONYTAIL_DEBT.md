# Ponytail Debt — over-engineering & structural cleanup log

Running list of structures that go against ponytail's "least code that works / one
source of truth" principle. **Quick fixes are done inline as they're found.** This
file is only for **major** items that need a dedicated task.

Severity: 🔴 high (correctness/drift risk) · 🟡 medium (duplication) · ⚪ low (tidy-up)
Status: ✅ done · 🔄 partial · 🔎 reassessed (no action)

---

## ✅ 1. 🔴 Three sources of truth for lesson "resume position" — FIXED

The same datum — which card a learner is on — was stored three independent ways:

| Where | Mechanism | Was used by |
|-------|-----------|-------------|
| `LessonCards.tsx` | localStorage `lesson-card-pos-${id}` (written directly) | the lesson player (only writer) |
| `progress-store.ts` | zustand `lessonCardPositions` + `get/set/clearLessonCardPosition` | `Lessons.tsx` ("resume at card N") |
| `useLessonProgress.ts` | localStorage `lesson-card-positions` + its own Supabase sync | nobody (dead code) |

`Lessons.tsx` read the store, but `LessonCards` never wrote to it — so "resume" was
always 0.

**Fix applied:**
- `LessonCards.tsx` now reads/writes the canonical zustand store
  (`getLessonCardPosition` / `setLessonCardPosition` / `clearLessonCardPosition`),
  which already cloud-syncs via `cloud-sync.ts`. Removed its ad-hoc localStorage key.
- Deleted dead `src/hooks/useLessonProgress.ts` (no importers).
- Removed the now-orphaned `getLessonProgress` / `upsertLessonProgress` /
  `deleteLessonProgress` + `LessonProgressRow` from `lib/supabase/lesson-queries.ts`
  (the `lesson_progress` table path was only used by that dead hook).

Single source of truth now: the progress store.

---

## ✅ 2. 🟡 Parallel type shapes — FIXED (once the surrounding systems were gone)

- **Fixed:** `VocabNoun` and `VocabVerb` in `workbook.ts` were byte-identical
  (`{ somali, meaning }`). Collapsed to one `VocabEntry`.
- **Originally deliberately not done, later revisited:** `PracticeExercise`
  (teaching-content, MCQ) vs `WorkbookDrill` (workbook, 10-variant drill) vs
  `Exercise` (drill-content) were called "genuinely different shapes" and left
  separate. That calculus changed once Problems/Roadmap/Workbook's standalone
  pages were retired (see item 4): `PracticeExercise` was broadened with
  `unscramble` / `translate` / `marker_identification` variants (the 3 of
  Workbook's 10 drill types that added real value beyond what
  `multiple_choice`/`fill_blank` already covered), and a representative set of
  Workbook's hand-authored drills was hand-ported into the matching lessons in
  `teaching-content.ts` (word order → Lesson 13, prepositions → Lesson 7,
  connectors → Lesson 17, focus markers → Lesson 20, full-sentence review →
  Lesson 26). `drill-content.ts`'s `Exercise` type was deleted outright with
  the rest of the dead `Learn.tsx` system. One `PracticeExercise` union now
  covers everything; `WorkbookDrill`/`workbook.ts` is gone.

---

## 🔎 3. Generated data blobs re-declare interfaces — REASSESSED, NO ACTION

Original claim was overstated. On inspection, interfaces are **not** duplicated
across the generated files: `teaching-content.ts` declares its own; `drill-content.ts`
declares `Exercise`/`LevelData`; `generated-levels.ts` just aliases
`_DrillExercise = Exercise`. The only trait is large JSON-in-source, which is a normal
and acceptable pattern for generated content. No refactor warranted.

---

## Notes on the vocab + worksheet work (kept lean on purpose)

- `src/data/vocabulary.ts` is a standalone data file + accessors — deliberately not
  merged into the auto-generated `teaching-content.ts` (the converter overwrites it).
- Per-lesson vocab is injected into the existing card flow at runtime in `LessonCards`.
- Worksheets are **derived** from existing data (`buildWorksheet` = lesson vocab +
  authored practice exercises). One page serves both interactive and print/PDF.

---

## ✅ 4. 🔴 Dormant graph/hypergraph system + Supabase — REMOVED

The app carried a second, unused generation of itself: a Supabase-backed
"knowledge hypergraph" (`src/engine/`, `graph-store.ts`, the `Concepts/
Curriculum/Ingest/Quiz/Review/StudyHub/Wiki` pages) plus the account/cloud-sync
layer underneath it (`auth-store.ts`, `cloud-sync.ts`, `lib/supabase/*`). None of
it was part of the actual learning flow — `useGraphInit.ts` was a literal stub —
and the Supabase sync had already drifted from the real schema (`lesson-queries.ts`
queried `learner_concept_states`/`review_logs`, tables that don't exist in the one
tracked migration; `cloud-sync.ts` pushed to a `user_progress` table that also
doesn't exist there).

**Removed:** the engine, the graph/Supabase pages and stores, all Supabase
wiring (`@supabase/supabase-js`, `supabase/` migrations), `hash-wasm`/`sql.js`
(engine-only deps), the already-dead `Learn.tsx` + `src/components/learn/` +
`useLearnData.ts`/`drill-content.ts`/`generated-levels.ts`/`level-store.ts`
(commented out of `App.tsx`, zero live importers even before this pass), and the
docs describing the hypergraph vision (`ARCHITECTURE.md`, `DATA_MODEL.md`,
`GLOSSARY.md`, `LANGUAGE_DESIGN.md`, `ROADMAP.md`, `SWARM_PROMPT.md`,
`INTEGRATION_PLAN_v2.md`, `SUPABASE_SETUP.md`, ADRs 001–005, RFC-001,
`docs/data/v2/*`).

**Since deleted:** `createCard`/`reviewCard` (SM-2 primitives) were extracted
from `src/engine/srs.ts` into `src/lib/srs.ts` and kept — no graph dependency,
harmless, and plausibly useful for a future vocab spaced-review feature. Their
store methods `reviewConcept`/`getSrsCard`/`initSrsCard` were flagged **orphaned**
here (their only caller, `Quiz.tsx`, was gone) with the note: delete them if the
vocab feature isn't built.

That call was taken. `src/lib/srs.ts`, the three store methods and the `srsCards`
map are all gone; spaced review uses the fixed intervals in `lib/review.ts`. The
flag worked exactly as intended — it kept a dead engine from rotting quietly for
another year. See DEBT.md §9.

The app is now fully local: no accounts, no network calls, progress in
`localStorage` only. See `docs/TECH_STACK.md`.

---

## 🔎 5. Resume-position hydration race — FOUND, NOT FIXED (pre-existing, out of scope)

While browser-testing the overhaul, found that `LessonCards.tsx`'s `cardIndex`
initializer (`useState(() => useProgressStore.getState().getLessonCardPosition(...))`)
can read the progress store **before** Zustand's `persist` middleware finishes
rehydrating from `localStorage` on a genuinely fresh page load (not an in-app
navigation — those are fine, since the store is already hydrated by the time a
user clicks into a lesson). On a hard reload while mid-lesson, this resets
`cardIndex` to 0 — and worse, the position-sync effect then **overwrites** the
saved position back to 0, so a real user who refreshes mid-lesson loses their
place. This predates this overhaul (same mechanism as the "✅ 1." fix above,
untouched by it) and wasn't caught before because it only manifests on a hard
reload of a mid-lesson URL, not normal SPA navigation.

Fix shape: gate the initial `cardIndex` read on the store's hydration flag
(`persist`'s `onRehydrateStorage`/`hasHydrated()` pattern) instead of reading
`getState()` synchronously at mount.

## ⚪ 6. `PracticeCard`'s answer-correctness check needed punctuation normalization — FIXED

Ported `unscramble` answers (from `workbook.ts`) end in a period ("Cali wuu
cunay."), but the word-tap UI can only ever produce space-joined words with no
trailing punctuation — so a perfectly correct tap sequence was marked wrong.
Fixed by normalizing both sides (lowercase, trim, collapse whitespace, strip
trailing `.?!`) in `isAnswerCorrect` — see `normalizeAnswer` in
`LessonCards.tsx`. Also fixed a stale-closure bug in `UnscrambleExercise`
where rapid consecutive taps could lose words (switched `tap`/`reset` to
functional `setState` updates).
