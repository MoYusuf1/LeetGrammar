# State of play

> Where the course actually stands, what is deliberately unfinished, and what
> comes next. **Last updated:** 2026-08-12, after Layer 2 (homework) was built.
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

### Supporting state

| | |
| --- | --- |
| Verified-form registry | **106** forms (97 with 2+ sources; 4 rule-derived) |
| Vocabulary entries | 95, of which **43** are 2-source verified |
| Unit test banks | Unit 1: 32 items · Unit 2: 26 authored + 13 carried back = 39 |
| Bank production mix | Unit 1 **47%** · Unit 2 **46%** (target 60% — see debt 8) |
| Tests | 83, across 4 files |
| Validator | 21 checks passing, 0 errors, 4 open warnings |
| Sources | 5 keys: Nilsson, **Orwin**, 2 Wikipedia pages, Wiktionary |

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

## Known debt

### 1. 52 of 95 vocabulary entries lack two sources 🔴

Was 60 with *no* citation at all. A pass against Orwin's Somali-English
glossary and Nilsson's wordlists took fully-verified entries from 35 to 43 and
gave most of the rest a real single-source citation instead of nothing. Method,
traps and findings: [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) §10.

**It found a real error.** The deck taught `aabo` for "father". Neither grammar
contains that spelling — both have `aabbe`, which our own registry already
carried with two sources. Corrected.

**This number will not reach zero with the current books.** Nilsson and Orwin
are grammars; their wordlists exist to illustrate rules, so most vocabulary can
only ever reach one source there. Closing the gap needs a dictionary pass —
Wiktionary is already a source key and is the obvious next step. `fadlan`,
`ilmo` and `masjid` appear in neither grammar under any spelling and need
either a dictionary citation or cutting.

### 2. 9 registry forms rest on a single source ⚪

Down from 18. Orwin's fusion tables on p.21 and p.93 were read on the page and
resolved eight forms in one pass — `waad`, `baan`, `baad`, `buu`, `bay`,
`ayaan`, `ayaad`, `ayuu` — on top of `nabad`, `subax`, `waan`, `ayay` earlier.
Under **S6** those are now producible rather than read-only.

Of the nine left, **seven genuinely cannot be resolved** with the two grammars
in hand: four come from Nilsson's focus example and are absent from Orwin, three
come from Orwin's word-order examples and are absent from Nilsson. They need a
third source, not more searching. The two winnable ones (`waxaan`, `waxaad`)
have their exact leads recorded in [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) §9.

### 3. Retention layer — Layer 2 built, spacing still open 🟡

§1.2 rates exactly two techniques "high utility": practice testing and
**distributed practice**. The course had the first twice over (in-lesson
practice, unit test) and none of the second.

**Homework now exists** — `src/lib/homework.ts`, page at `/#/homework/:id`,
offered on each completed lesson row. 12 items, **33% carried back** from
earlier lessons, 67–100% production for lessons 3+, immediate metalinguistic
feedback, scored via `recordPracticeScore` and **gating nothing**. Retrying
serves a completely different set (0/12 overlap), deterministically.

Items are *composed* from material that already exists rather than authored,
the same decision as unit-test carry-back: nothing new to source and nothing a
future author can forget. Check `A3` enforces the 30% floor and 11 tests cover
the rest; both proven to bite.

This is also where **interleaving** starts (§1.5) — in-lesson practice is
blocked deliberately, and homework is the first place lessons are mixed.
Verified in the browser: Lesson 5's homework served a Lesson 3 item
(`magaalo → magaalada`) badged "From earlier", and the set completed 12/12.

**Still open: spacing.** `getNextReviewDate` and `getItemsDueForReview` remain
without callers, so nothing *schedules* a return — the learner has to choose to
open homework. Fixed-interval review (§1.4) is the remaining half of debt 3.

### 4. Retrieval density — resolved ✅

Design rule `S5` allows no run of more than three cards without retrieval
(§1.16: passive scrolling is the weakest mode, forced recall the antidote). It
was specified as an **error** in Part 9 and never implemented, so nothing
measured it for eight lessons. Check **T2** does, and now **fails the build**
rather than warning, because the course complies.

Two causes, both fixed:

- **The vocabulary deck was injected after card 0**, turning the compliant
  opening blueprint → connect → promise → predict into four passive cards.
  Lessons 5–8 were written to the rule and breached it anyway, and because the
  breach lived only in the injected flow, nothing reading `lesson.cards` could
  see it. The deck now lands after the *second* retrieval card — a position
  chosen by measuring four candidates, not guessing.
- **Lessons 1–4 had no `predict` card at all.** That is the whole reason they
  breached where 5–8 did not; the beat simply predates the convention. Each now
  opens blueprint → (connect) → promise → predict, matching Unit 2. The cards
  are real predictions on already-sourced material, not filler: L2 asks where
  gender hides given that `guri` and `magaalo` look alike, L3 asks what happened
  between `guri` and `guriga`.

Proven to bite by deleting one `predict` card: T2 fails and names the lesson.
If it ever fails again, add a retrieval card — do not raise the threshold.

### 5. The Part 11 rubric had never been applied ⚪

The design says to score every lesson, pass being **≥17/20 with no dimension at
zero**. No lesson had ever been scored. Lesson 5 — the strongest one, and the
unit's flagship — scored **15/20 with one zero**, so it failed on both counts.
After the two fixes below it scores **17/20 with no zeros, which is a pass**,
though only just:

| | Dimension | Score | Why |
| --- | --- | --- | --- |
| R1 | Blueprint | 2 | present, SIGNAL highlighted, advances one step |
| R2 | Connection | 2 | names what was gained and what is being added |
| R3 | Promise → payoff | 2 | the promised discrimination is tested, then closed word for word |
| R4 | Cognitive load | 2 | two new items, each with its own card |
| R5 | Plain language | 2 | no jargon; reads like ordinary English |
| R6 | **Structured input** | ~~1~~ → **2** | fixed; see below |
| R7 | **Retrieval density** | ~~0~~ → **1** | fixed to exactly 3 cards; 2 needs ≤2 |
| R8 | Feedback | 2 | every explanation names the rule and why the distractor tempts |
| R9 | Production weight | 1 | 2 of 7 items (29%); a strict read of "mostly MCQ" would give 0 |
| R10 | Sourcing | 1 | four forms in the shown examples rest on a single source |

**R6 was the finding that mattered, and it is now fixed.** §1.10 is the most Somali-specific claim in
the whole evidence base: learners default to reading the *first noun* as the
subject, and particle lessons must be engineered so that guessing by word order
fails. Lesson 5's first notice item asks which word `baa` spotlights in
*Sahra baa salaamaysa saaxiibkeed* — and the answer is **Sahra, the first
noun**. A learner applying exactly the wrong heuristic gets it right. The
`waxa` item two cards later did discriminate, since its answer is the last
word, but half the structured input rewarded the habit the course exists to
break.

It now uses Orwin's p.93 example **Gabadhu bariiska baa cuntay** ("The girl ate
*the rice*"), where the spotlight falls on the **second** noun. Confirmed in
the browser: answering with the first noun — the girl, who is also the subject
and the one doing the eating — is rejected. The wrong strategy now produces the
wrong answer.

No script can check this. `E10` was specified as a warning precisely because it
resists automation, which is why the design calls manual review of it "the
highest-value human check available". It is now a required step in
[LESSON_CONVENTIONS.md](./LESSON_CONVENTIONS.md) §3.1b: **answer every notice
item using only the wrong heuristic, and confirm you get it wrong.**

### 6. `COURSE.md` and `scripts/course-to-app.cjs` are orphaned ⚪

`COURSE.md` is 9,399 lines and was the source for the deleted
`teaching-content.ts`. Its Somali has the same class of problems as the content
generated from it — e.g. `Walaalkaa xaal iska kuule?` glossed as "My name is
Amina. How is your brother?", where the Somali and English do not correspond.

Both are **untouched** and were deliberately excluded from deletion: `COURSE.md`
may be hand-written and is the only prose record of the wider course plan. It is
not wired to anything.

### 7. ~10 lint errors ⚪

All in `src/components/ui/*` shadcn boilerplate, all pre-existing. No file under
`src/data`, `src/lib`, `src/pages` or `src/components/lesson` contributes.

### 8. Test banks sit at 47% / 46% production against a 60% target ⚪

Check `E9` now measures this every run and warns. It reports two figures,
because they answer different questions: what the bank *author* wrote, and
what the learner actually sits after carry-back folds in earlier-unit items.

A pass over both banks converted every item that could honestly be flipped —
`u1-t29` (`wiilku`), `u2-t01` (`waa`), `u2-t05` (`ayaa`), `u2-t15` (`keennaa`)
— which is what moved the numbers from 44%/35%. What is left does **not** come
apart with more authoring effort:

- **Unit 1 is capped by its subject matter.** Most remaining recognition items
  answer with an English proposition — "every noun has a gender", "gender is a
  grammar label, not a fact about the object", "only the last word of the
  subject" — because the objective *is* a fact about the language, with nothing
  to type. The alphabet and digraph items would have to be answered with bare
  letters (`x`, `sh`), which are not registry forms and so cannot be a typed
  answer under rule 1.
- **One item was deliberately left alone.** `u1-t06` teaches vowel length by
  picking `libaax` out of a list. Asking the learner to type "lion" instead
  tests whether they remember the word, not whether they double the vowel; and
  any prompt that supplies the pronunciation hands them the doubling. A worse
  item that scores better on E9 is the wrong trade.
- **Unit 2 is capped by sourcing, not authoring.** Its three best remaining
  candidates — the `Sahra baa salaamaysa saaxiibkeed` focus item, the `cabbay`
  word-order item, the `koob` imperative — all answer with forms that rest on a
  single source, so check `S6` correctly refuses them as typed answers. They
  become convertible the moment those forms get a second source, which is
  **exactly the blocked list in debt item 2**. Flipping all three would put
  Unit 2 at 58%.

So the honest reading is that ~60% is reachable for Unit 2 via source work, and
is probably not reachable for Unit 1 at all. Raising the E9 threshold or
failing the build on it would push an author toward writing the bad `u1-t06`
variant — which is how the old validator became decoration. It stays a warning.

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
| **`E9` ≥60% production in test banks** | 🟡 47% / 46%, now measured by check `E9` |
| **`A3` homework layer (Layer 2)** | ❌ not built at all |
| **SRS / spaced review no longer orphaned** | ❌ still no callers |

The two that matter pedagogically:

- **Retake is not a retest.** The results screen shows every missed item with
  its correct answer, and retaking serves those same 32 items in the same
  order. A learner can fail, read the answers, and pass by recall of the
  screen. Fixing this needs *more sourced items*, not just code — with 32
  items over 13 objectives there is no second pool to draw from.
- **The banks are still recognition-heavy.** §1.8 of the design calls MCQ "the
  weakest tool available" and the whole overhaul was motivated partly by the
  old course being 76% MCQ. The banks now run 47% and 46% production against a
  60% target, and check `E9` reports both figures every run rather than
  leaving the gap invisible. Why the last 13 points are hard: debt item 5.

---

## The plan

### What changed, and why the original sequencing no longer fits

[COURSE_DESIGN Part 7](./COURSE_DESIGN.md#part-7--execution-plan) sequenced the
build by *content* — units in order, on the assumption that a lesson could be
written once someone sat down to write it. That assumption was wrong, and the
correction is the most useful thing this project has learned:

**Sourcing gates content, and it decides what a lesson can say.** Twice now the
sources changed a lesson after it was planned. Lesson 5 lost `ma`, because one
grammar could not attest it. Lesson 8 lost the claim "Somali is SOV", because
one grammar explicitly denies it. Neither was discoverable from the design; both
were discoverable in an afternoon of reading. So **every content phase now opens
with a sourcing pass, and its outcome is allowed to reshape the phase.**

Four more rules fall out of the same experience:

1. **For morphology, source the rule; for vocabulary, you need a dictionary.**
   Grammars illustrate rules with a handful of example words. That is enough to
   license a whole paradigm (the `derived` tier, check `S7`) and nowhere near
   enough for breadth — which is why 52 vocabulary entries still lack a second
   source and no amount of re-reading Nilsson will fix it.
2. **A target the content cannot reach gets measured, not chased.** Unit 1's
   production ceiling is structural: its objectives are facts *about* the
   language, with nothing to type. `E9` reports the number every run and warns.
   Padding items to clear a threshold is the failure the postmortem describes.
3. **Drive it in the browser.** Three softlocks so far passed build, tests and
   validator. The routine is in [ADDING_CONTENT.md](./ADDING_CONTENT.md).
4. **Write for a cold reader.** Another tool picked this repo up mid-stream and
   continued correctly, which only worked because the docs carried the
   reasoning and not just the result.

### Where the phases stand

| Phase | Work | State |
| --- | --- | --- |
| 1 | Data model + glossary + validator | ✅ |
| 2 | Unit 2 — Lessons 5–8 | ✅ |
| 3 | Assessment engine | 🟡 tests, gating, correctives, cumulative done; **retake pool, homework, SRS open** |
| 4 | Unit 1 — Lessons 1–4 | ✅ |
| 5 | Vocabulary track | ❌ blocked on a dictionary, not on effort |
| 6 | Units 3–4 — Lessons 9–14 | ❌ Unit 3 sourced and ready; Unit 4 unverified |
| 7 | Retire `COURSE.md` + generator | ❌ trivial, deferred on purpose |

### Sequence from here

**A — Unit 3 (Lessons 9–11).** The next real gain, and sourcing is confirmed
rather than assumed: both grammars cover past tense, negation and questions
substantially. This is also where `ma` finally gets taught, closing the promise
Lesson 5's docstring made when it cut it.

One decision to make before authoring, recorded under Open Questions below:
**which comes first, negation or questions.** The design says negation (10) then
questions (11); Orwin introduces `ma` the other way round, as the interrogative
classifier long before the negative. Since the same written word does both jobs,
the order decides which meaning the learner meets first.

**B — Close the retake hole.** Unit 3 makes this worse rather than better: every
new unit is another test whose results screen shows all the answers and whose
retake serves the same items. Fixing it needs roughly double the items per
objective — content, not code — so it is cheapest to do *while* authoring Unit 3
rather than after.

**C — The dictionary pass.** 52 vocabulary entries, plus the seven registry
forms that two grammars cannot resolve. Wiktionary is already a source key.
This is mechanical and can run in the background of anything else.

**D — Unit 4 (Lessons 12–14), sourcing pass first.** Adjectives and prepositions
are well covered in both grammars. **Numerals are the thin spot** — Orwin
mentions them barely, so check that before planning Lesson 13, not after.
Expect Unit 4 to be more lexical than Unit 2 or 3, which means the vocabulary
constraint bites harder here than it has so far.

**E — Cleanup.** `COURSE.md` retirement, the ten vendored lint errors, doc
consolidation. All flat-cost, none of it gets worse by waiting, and it should
not displace A–D.

### Deliberately not planned

The homework layer (design Layer 2) and SRS wiring remain unbuilt. Both are real
gaps against the design, and both are flat-cost: they read from banks that will
exist anyway, so building them earlier buys nothing. Revisit once Unit 3 has
landed and there is more material for them to work on.

## Open questions — these need a human decision

**Does Unit 3 teach negation before questions, or the other way round?**
`ma` is written identically in both roles, because tone is not written, so
whichever comes first is the meaning the learner will reach for by default.
COURSE_DESIGN puts negation at Lesson 10 and questions at 11; Orwin introduces
`ma` as the interrogative classifier on p.15, long before the negative. Both
orders are defensible and the sources do not settle it — it is a teaching
judgement about which default is less harmful to unlearn later.


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
