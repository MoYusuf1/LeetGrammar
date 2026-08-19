# State of play

> Where the course actually stands, what is deliberately unfinished, and what
> comes next. **Last updated:** 2026-08-18. Now the inventory only — the plan and the
> debt live in their own files, linked below.
>
> **Starting cold?** Read [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) (the
> rules), then [ADDING_CONTENT.md](./ADDING_CONTENT.md) (how to grow the
> course), then run `npm run fetch:sources` so citations resolve — it will
> tell you which source PDFs you need to supply. Nothing in this project
> depends on a previous session's state.
>
> Numbers here are checkable — run the commands in
> [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md#the-three-gates) rather than
> trusting this file if it looks stale.

---
## What exists

An **8-lesson Somali course** in 2 units, local-only, no accounts, progress in
`localStorage`. Every Somali form in it is source-verified.

| Lesson | Title | Cards | Exercises | Teaches |
| --- | --- | --- | --- | --- |
| 1 | Sounds & Spelling | 12 | 5 | alphabet; no P/V/Z; dh/kh/sh; the throat letters **c** and **x**; doubled vowels |
| 2 | Naming Things | 15 | 6 | noun gender; why it is invisible in writing; reading gender off the "the" form |
| 3 | Saying "The" | 17 | 9 | the article is a suffix; all eight assimilation outcomes; no indefinite article |
| 4 | I, You, He, She | 15 | 6 | eight pronouns; inclusive/exclusive "we"; short subject pronouns; the subject marker |
| 5 | The Signal Words | 17 | 7 | `waa` plain statement; `baa`/`ayaa` spotlight what precedes; `waxa` spotlights what ends the sentence |
| 6 | Squishing | 15 | 5 | signals fuse with short pronouns — `wuu`, `way`, `waxay`, and the irregular `wuxuu` |
| 7 | Action Words | 15 | 6 | present-tense endings on `keen`; why `-aa` alone cannot say who, and how the signal settles it |
| 8 | Putting It In Order | 16 | 6 | the action word lands last; the signal hugs the verb; `waxa` sends the spotlight past it |

**Totals:** 121 authored cards · 50 exercises · 32% production.
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

The bank production conversions (design rule `E9`) were **verified in the
browser**: Unit 1's composed test was driven end to end and scored 30/32 (94%,
pass), with every one of its 15 production items rendering an input and grading
real typed text. The commit that made those conversions could not check this —
worth knowing that the routine exists and is documented in
[ADDING_CONTENT.md](./ADDING_CONTENT.md).

### The interface

Rebuilt from scratch on 2026-08-13/14. The previous UI was inherited from the
template this project started as — LeetCode's orange `#ffa116` on near-black,
`--easy`/`--medium`/`--hard` difficulty tokens, `.lc-row`, `.node-glow`, and a
Novice→Grandmaster rank ladder. None of it was chosen for a language course.

What it is now, and the reasoning that is not recoverable from the code:

- **iOS, monochrome, system theme only.** Black and white with neutral greys —
  Apple's own `#F2F2F7`/`#3C3C43` were dropped because they carry a blue cast.
  No theme toggle: `prefers-color-scheme` decides, the way an iOS app does.
- **Type is Apple's scale under Apple's names** (11/12/13/15/16/17/20/22/28/34,
  body at 17). `-apple-system` first, so real SF Pro on Apple hardware and Inter
  elsewhere — Apple does not license SF as a webfont. Somali is set in **New
  York**, Apple's system serif, so the target language has its own voice while
  still being an iPhone font.
- **Right and wrong are not colour-coded.** The palette has no hue, so the ✓/✕
  glyph and the wording carry the verdict. This is better for a colourblind
  learner than the green/red it replaced; do not "restore" colour without saying
  what it buys.
- **Glass is on floating chrome only** — the ⋯/close circles and the toolbar
  capsules, never on cards. It is a mimic: blur, saturation, a specular top
  edge. Real Liquid Glass needs an SVG displacement map fed into
  `backdrop-filter`, which Chromium supports and **Firefox and Safari do not**.
  Safari is every iPhone, so the real version would be invisible to the audience
  it is for.
- **A lesson is a deck of steps, paged from a Safari-style toolbar.**
  Consecutive passive cards merge into one step
  (`src/components/lesson/steps.ts`), and a passive step has **no button at
  all** — a button appears only where the lesson demands something, which took
  the course from 179 button presses to 62. Swipe was built and then removed;
  see UI_CONVENTIONS for why.
- **Home is a contents page** — no cards, chevrons, containers or fills. State
  is carried by ink weight: done recedes, current is full ink and marked.

Routes: `/learn` is home; lesson, homework and unit test are full-screen task
views entered and closed. (`/worksheet` was deleted in Aug 2026.) Landing,
Profile, Glossary and the lesson index were deleted — the glossary became a sheet opened from inside a
lesson, where a learner actually meets a term.

Full visual conventions, and the list of things already tried and rejected, are
in [UI_CONVENTIONS.md](./UI_CONVENTIONS.md). Read it before changing anything
visual.

**The blueprint is drawn, not typeset.** `blueprintSlot` had been a typed field
on every card since the beginning and nothing ever read it, so the sentence
shape rendered as box-drawing ASCII in a `<pre>` that overflowed a phone screen.
It is now four real segments that highlight the slot from the data.

### Supporting state

| | |
| --- | --- |
| Verified-form registry | **109** forms (**98** with 2+ citations; 4 derived on a rule; 7 single-source) |
| Vocabulary entries | 95, of which **90** are 2-source verified |
| Unit test banks | Unit 1: 32 items · Unit 2: 26 authored + 13 carried back = 39 |
| Bank production mix | Unit 1 **47%** · Unit 2 **46%** (target 60% — see debt 8) |
| Tests | 109, across 7 files |
| Validator | 22 checks passing, 0 errors, 4 open warnings |
| Sources | 8 keys: Nilsson, **Orwin**, 2 Wikipedia pages, Wiktionary, + 3 dictionaries (`JF`, `SA`, `AW`) |
| Deployment | Vercel, auto-deploys from `main` |

---

## What is deliberately *not* built

**Lessons 9–14 are planned, not written.** [COURSE_DESIGN.md](./COURSE_DESIGN.md)
describes a 14-lesson target; that is the design, not the state. They appear
nowhere in the UI — no stub rows, no "coming soon".

This is a reversal of an earlier decision to build all 14 at once, which produced
ten empty lessons and three exercises. The choice was **narrow and correct over
broad and decorative**. See [POSTMORTEM.md](./POSTMORTEM.md).

`MAX_LESSON_ID` derives from the lesson array, so adding a lesson to
`AUTHORED_LESSONS` is the only step needed to surface it.

---

---

## Where everything else lives

This file is the inventory: what exists right now. Two companions carry the
rest, so answering "what is next" no longer means reading all of it.

| Question | File |
| --- | --- |
| What should I work on next? What needs a human decision? | **[PLAN.md](./PLAN.md)** |
| What is broken or unfinished, and why is it still open? | **[DEBT.md](./DEBT.md)** |

---

## Reading order for someone new

1. [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) — the rules, and the gates
2. This file — what exists and what is next
2b. [ADDING_CONTENT.md](./ADDING_CONTENT.md) — how to grow the course, and
    [LESSON_CONVENTIONS.md](./LESSON_CONVENTIONS.md) — how a lesson is written
3. [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) — the linguistic facts and citations
4. [POSTMORTEM.md](./POSTMORTEM.md) — why the rules exist
5. [COURSE_DESIGN.md](./COURSE_DESIGN.md) — the pedagogical design target.
   **Amended August 2026**; read the `Correction` and `Tension` blocks in §1.16,
   §3.1 and §3.2 before trusting anything older than them. The full research
   review and the options behind each decision are in git at `28ce3566`.

Then read `src/data/authored-lessons.ts`. It is the course.
