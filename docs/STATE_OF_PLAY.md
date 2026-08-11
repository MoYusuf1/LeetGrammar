# State of play

> Where the course actually stands, what is deliberately unfinished, and what
> comes next. **Last updated:** 2026-08-11, after Lesson 5 and Unit 2 landed.
>
> **Starting cold?** Read [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) (the
> rules), then [ADDING_CONTENT.md](./ADDING_CONTENT.md) (how to grow the
> course), then run `npm run fetch:sources` so citations resolve. Nothing in
> this project depends on a previous session's state.
>
> Numbers here are checkable — run the commands in
> [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md#the-three-gates) rather than
> trusting this file if it looks stale.

---

## What exists

A **5-lesson Somali course** in 2 units, local-only, no accounts, progress in
`localStorage`. Every Somali form in it is source-verified.

| Lesson | Title | Cards | Exercises | Teaches |
| --- | --- | --- | --- | --- |
| 1 | Sounds & Spelling | 11 | 5 | alphabet; no P/V/Z; dh/kh/sh; the throat letters **c** and **x**; doubled vowels |
| 2 | Naming Things | 14 | 6 | noun gender; why it is invisible in writing; reading gender off the "the" form |
| 3 | Saying "The" | 16 | 9 | the article is a suffix; all eight assimilation outcomes; no indefinite article |
| 4 | I, You, He, She | 14 | 6 | eight pronouns; inclusive/exclusive "we"; short subject pronouns; the subject marker |
| 5 | The Signal Words | 17 | 7 | `waa` plain statement; `baa`/`ayaa` spotlight what precedes; `waxa` spotlights what ends the sentence |

**Totals:** 72 authored cards · 33 exercises · 30% production.
Learners see one extra card per lesson — a vocabulary deck injected at runtime.

The course lands on **`Wiilku waa macallin.`** ("The boy is a teacher."), a
sentence taken from the reference grammar in which every part is something the
learner built: `wiil` + the `-ka` article + the `-u` subject marker + `waa`.

After Lesson 4, a **Unit 1 Test** is unlocked: 32 machine-gradable items drawn
from `verified-forms.ts`, covering all 13 objectives across the four lessons.
85% passes; missing an objective routes the learner through a short
correctives set for that objective alone, not the whole test again. Entry
point is a row on `/learn`, gated by `isUnitComplete()`; route is
`/#/unit-test/1`.

### Supporting state

| | |
| --- | --- |
| Verified-form registry | **84** forms (76 with 2+ sources, 67 independently) |
| Vocabulary entries | 84, of which **26** are sourced |
| Unit test banks | Unit 1: 32 items · Unit 2: 9 items |
| Tests | 63, across 3 files |
| Validator | 15 checks passing, 0 errors, 2 open warnings |

---

## What is deliberately *not* built

**Lessons 5–14 are planned, not written.** [COURSE_DESIGN.md](./COURSE_DESIGN.md)
describes a 14-lesson target; that is the design, not the state. They appear
nowhere in the UI — no stub rows, no "coming soon".

This is a reversal of an earlier decision to build all 14 at once, which produced
ten empty lessons and three exercises. The choice was **narrow and correct over
broad and decorative**. See [POSTMORTEM.md](./POSTMORTEM.md).

`MAX_LESSON_ID` derives from the lesson array, so adding a lesson to
`AUTHORED_LESSONS` is the only step needed to surface it.

---

## Known debt

### 1. 58 of 79 vocabulary entries have no sources 🔴

The largest outstanding content problem. These words **are shown to learners** in
every lesson's vocab deck, and they are not verified. The validator reports the
count on every run and will keep doing so.

The 21 that are sourced are the pronouns (confirmed against two sources) and the
nouns whose gender and definite form are attested in the grammar.

*To fix:* verify against two sources, record in [SOMALI_SOURCES.md](./SOMALI_SOURCES.md),
add `confidence` + `sources` to the entry in `src/data/vocabulary.ts`.

### 2. `nabad` and `subax` rest on a single source ⚪

Real words, attested in Wiktionary, not present in the reference grammar.
Declared `confidence: 'single'` rather than being passed off as verified.

### 3. `COURSE.md` and `scripts/course-to-app.cjs` are orphaned ⚪

`COURSE.md` is 9,399 lines and was the source for the deleted
`teaching-content.ts`. Its Somali has the same class of problems as the content
generated from it — e.g. `Walaalkaa xaal iska kuule?` glossed as "My name is
Amina. How is your brother?", where the Somali and English do not correspond.

Both are **untouched** and were deliberately excluded from deletion: `COURSE.md`
may be hand-written and is the only prose record of the wider course plan. It is
not wired to anything.

### 4. ~10 lint errors ⚪

All in `src/components/ui/*` shadcn boilerplate, all pre-existing. No file under
`src/data`, `src/lib`, `src/pages` or `src/components/lesson` contributes.

---

## Phase 4 (the unit test) — done

Previously the one planned piece of work not yet done; now built and routed:

1. ✅ Unit test bank for lessons 1–4, drawn only from `verified-forms.ts`
   (`src/data/unit-tests.ts`, 32 items).
2. ✅ Covers every objective declared across the four lessons — enforced by
   validator check U3.
3. ✅ [`assessment.ts`](../src/lib/assessment.ts) wired to it: scoring, the 85%
   mastery gate, correctives routing for failed objectives. No longer a
   caller-less module.
4. ✅ Surfaced in the UI: a gated row on `/learn` after Lesson 4, route
   `/#/unit-test/:id`, page at `src/pages/UnitTest.tsx`.

What backs the claims `unit-tests.ts` makes in its own header:
- Validator checks **U0–U4** (`scripts/validate-course.mjs`) cover the bank —
  answers, word banks, jargon, objective coverage, and that no bank targets an
  unwritten unit. All six were proven to bite by injecting the defect they
  guard against and confirming the check fails, then reverting.
- `src/tests/unit-tests.test.ts` (31 tests) covers gradability, shape, and the
  "no bank question repeats a lesson question verbatim" claim. The
  load-bearing ones — empty/partial response scoring, correctives dedup, the
  no-lessons-never-complete guard, the no-repeat guard — were each proven to
  bite the same way.
- Verified end-to-end in the browser per Rule 1: locked → all 4 lessons done →
  unlocked → intro → 32-item test → results (score, per-objective breakdown,
  missed items) → correctives → back to results.

### What Phase 4 did *not* deliver

Measured against the Phase 3 "Assessment engine" Definition of Done in
[COURSE_DESIGN.md](./COURSE_DESIGN.md#part-10--per-phase-specification):

| DoD item | State |
| --- | --- |
| `A1` bank ≥25 items | ✅ 32 |
| `A2` bank covers 100% of unit objectives | ✅ check U3 |
| `A5` 85% threshold in one constant | ✅ `MASTERY_THRESHOLD` |
| `A6` correctives target only failed objectives | ✅ tested |
| Gating not bypassable by direct URL | ✅ page checks `isUnitComplete()` |
| **Retake serves *different* items** | ❌ identical items, same order |
| **`E9` ≥60% production in test banks** | ❌ bank is 31% production / 62% MCQ |
| **`A3` homework layer (Layer 2)** | ❌ not built at all |
| **SRS / spaced review no longer orphaned** | ❌ still no callers |

The two that matter pedagogically:

- **Retake is not a retest.** The results screen shows every missed item with
  its correct answer, and retaking serves those same 32 items in the same
  order. A learner can fail, read the answers, and pass by recall of the
  screen. Fixing this needs *more sourced items*, not just code — with 32
  items over 13 objectives there is no second pool to draw from.
- **The bank is 62% multiple choice.** §1.8 of the design calls MCQ "the
  weakest tool available" and the whole overhaul was motivated partly by the
  old course being 76% MCQ. 62% is an improvement and still roughly the
  inverse of the ≥60%-production target. No check enforces this on banks.

---

## Where this sits in the overall plan

Two numbering schemes have been in use and they do not line up. Against the
design's seven phases in
[COURSE_DESIGN.md Part 7](./COURSE_DESIGN.md#part-7--execution-plan):

| Phase | Work | State |
| --- | --- | --- |
| 1 | Data model + glossary + validator | ✅ done |
| **2** | **Unit 2 — Lessons 5–8, the sentence formula** | 🟡 **Lesson 5 done; 6, 7, 8 not started** |
| 3 | Assessment engine | 🟡 built for Units 1–2; gaps above |
| 4 | Unit 1 — Lessons 1–4 | ✅ done |
| 5 | Vocabulary track (~500 words, sourced) | ❌ 26 of 84 sourced |
| 6 | Units 3–4 — Lessons 9–14 | ❌ not started |
| 7 | Retire `COURSE.md` + generator | ❌ still present |

Unit 2 is the spine — "the direct fix for the original complaint", the unit
the design says should go deepest (§1.11). Lesson 5 gives the learner the
SIGNAL box: they can now read a flat Somali sentence and say which word it is
about. They still cannot build a full sentence, because verbs are Lesson 7.

### Next step: Lesson 6 — Squishing

**The sourcing is already done**, which is the usual blocker. Nilsson's §5.1
fusion table is recorded in [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) §7 and the
forms are in the registry: `wuu`, `way`, `wuxuu`, `waxay` with two independent
sources; `buu`, `bay` single-sourced and declared.

```
wáa aan → wáan      wáxa aan → wáxaan       baa aan → baan
wáa uu  → wúu       wáxa uu  → wúxuu        baa uu  → buu
wáa ay  → wáy       wáxa ay  → wáxay        baa ay  → bay
```

Lesson 5 already sets it up — its closing card promises exactly this, and its
`waxa ay` card flags the fusion without teaching it. Follow Recipe 3 in
[ADDING_CONTENT.md](./ADDING_CONTENT.md); add items to
`src/data/unit-banks/unit-2.ts` for any new objectives, or `U3` fails.

After that: Lesson 7 (verbs — needed before any full sentence can be built) and
Lesson 8 (the whole shape). Both need fresh sourcing.

---

## Open questions — these need a human decision

**Should `haweeney` replace `naag` as the primary word for "woman"?**
`naag` is the standard dictionary form, correctly feminine, and Lesson 2 leans on
the `nin`/`naag` contrast to teach gender. But `haweeney` is more respectful, and
sources note `naag` can read as casual or belittling in some contexts. Current
choice is to teach `naag` with a register note. *This is a judgement about tone
and audience, not a fact to look up.*

**Delete `COURSE.md` and the generator?** See debt item 4. Nothing depends on
them. Kept pending a decision on whether the prose has value.

**Deepen four lessons, or extend to five and beyond?** The four cover the WHO box
of the sentence formula. The natural next unit is the signal system
(`waa`/`baa`/`waxa`/`ma`) — the original motivation for the redesign, since those
markers had been stranded at lesson 20. Either is defensible; extending costs
sourcing effort per lesson.

**Is the four-box blueprint (`WHO | SIGNAL | WHAT | DO`) still the right spine?**
It currently only ever highlights WHO, since Unit 1 is entirely about that slot.
It pays off from Lesson 5 onward, and is unproven until then.

---

## Reading order for someone new

1. [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) — the rules, and the gates
2. This file — what exists and what is next
2b. [ADDING_CONTENT.md](./ADDING_CONTENT.md) — how to grow the course, and
    [LESSON_CONVENTIONS.md](./LESSON_CONVENTIONS.md) — how a lesson is written
3. [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) — the linguistic facts and citations
4. [POSTMORTEM.md](./POSTMORTEM.md) — why the rules exist
5. [COURSE_DESIGN.md](./COURSE_DESIGN.md) — the pedagogical design target

Then read `src/data/authored-lessons.ts`. It is the course.
