# State of play

> Where the course actually stands, what is deliberately unfinished, and what
> comes next. **Last updated:** 2026-08-09, at commit `311e1f4e` on `main`.
>
> Numbers here are checkable — run the commands in
> [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md#the-three-gates) rather than
> trusting this file if it looks stale.

---

## What exists

A **4-lesson Somali course**, local-only, no accounts, progress in
`localStorage`. Every Somali form in it is source-verified.

| Lesson | Title | Cards | Exercises | Teaches |
| --- | --- | --- | --- | --- |
| 1 | Sounds & Spelling | 11 | 5 | alphabet; no P/V/Z; dh/kh/sh; the throat letters **c** and **x**; doubled vowels |
| 2 | Naming Things | 14 | 6 | noun gender; why it is invisible in writing; reading gender off the "the" form |
| 3 | Saying "The" | 16 | 9 | the article is a suffix; all eight assimilation outcomes; no indefinite article |
| 4 | I, You, He, She | 14 | 6 | eight pronouns; inclusive/exclusive "we"; short subject pronouns; the subject marker |

**Totals:** 55 authored cards · 26 exercises · 31% production.
Learners see one extra card per lesson — a vocabulary deck injected at runtime.

The course lands on **`Wiilku waa macallin.`** ("The boy is a teacher."), a
sentence taken from the reference grammar in which every part is something the
learner built: `wiil` + the `-ka` article + the `-u` subject marker + `waa`.

### Supporting state

| | |
| --- | --- |
| Verified-form registry | **69** forms (67 with 2+ sources) |
| Vocabulary entries | 79, of which **21** are sourced |
| Tests | 30, across 2 files |
| Validator | 10 checks passing, 0 errors, 2 open warnings |

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

### 2. `src/lib/assessment.ts` has no callers 🟡

Mastery gating (85%), correctives routing and spaced review are implemented and
untested by use. **Nothing imports the module.** Its header says so.

It was kept rather than deleted because the unit test below needs it. If that
work is not going to happen, delete the file instead — an engine with no callers
that looks finished is precisely how this codebase went wrong before.

### 3. `nabad` and `subax` rest on a single source ⚪

Real words, attested in Wiktionary, not present in the reference grammar.
Declared `confidence: 'single'` rather than being passed off as verified.

### 4. `COURSE.md` and `scripts/course-to-app.cjs` are orphaned ⚪

`COURSE.md` is 9,399 lines and was the source for the deleted
`teaching-content.ts`. Its Somali has the same class of problems as the content
generated from it — e.g. `Walaalkaa xaal iska kuule?` glossed as "My name is
Amina. How is your brother?", where the Somali and English do not correspond.

Both are **untouched** and were deliberately excluded from deletion: `COURSE.md`
may be hand-written and is the only prose record of the wider course plan. It is
not wired to anything.

### 5. ~10 lint errors ⚪

All in `src/components/ui/*` shadcn boilerplate, all pre-existing. No file under
`src/data`, `src/lib`, `src/pages` or `src/components/lesson` contributes.

---

## Next step: the unit test (Phase 4)

The one planned piece of work not yet done.

1. Build a unit test bank for lessons 1–4, drawing **only** on
   `verified-forms.ts`. The previous four test banks were fabricated and were
   deleted.
2. Cover every objective declared across the four lessons.
3. Wire [`assessment.ts`](../src/lib/assessment.ts) to it — scoring, the 85%
   mastery gate, correctives routing for failed objectives.
4. Surface it in the UI after Lesson 4.

Constraints that apply: no placeholder items, no padding an item count to hit a
threshold, and every Somali string registry-verified. See
[WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md).

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
3. [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) — the linguistic facts and citations
4. [POSTMORTEM.md](./POSTMORTEM.md) — why the rules exist
5. [COURSE_DESIGN.md](./COURSE_DESIGN.md) — the pedagogical design target

Then read `src/data/authored-lessons.ts`. It is the course.
