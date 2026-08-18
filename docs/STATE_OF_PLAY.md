# State of play

> Where the course actually stands, what is deliberately unfinished, and what
> comes next. **Last updated:** 2026-08-18, after the sourcing pass (phase S).
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
| Verified-form registry | **109** forms (**102** with 2+ independent sources; 7 single-source) |
| Vocabulary entries | 95, of which **90** are 2-source verified |
| Unit test banks | Unit 1: 32 items · Unit 2: 26 authored + 13 carried back = 39 |
| Bank production mix | Unit 1 **47%** · Unit 2 **46%** (target 60% — see debt 8) |
| Tests | 109, across 7 files |
| Validator | 21 checks passing, 0 errors, 4 open warnings |
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

## Known debt

### 1. 5 of 95 vocabulary entries lack two sources 🟡

Was 60 with *no* citation at all, then 52. Three dictionaries arrived in August
2026 and the pass against them, both grammars and Wiktionary took it to **5**.
Registry: 109 forms, 102 with two or more independent sources. Method, traps and
findings: [SOMALI_SOURCES.md](./SOMALI_SOURCES.md).

What remains is listed under the plan below; none of the five is a lookup that
simply has not been done yet.

**It found a real error.** The deck taught `aabo` for "father". Neither grammar
contains that spelling — both have `aabbe`, which our own registry already
carried with two sources. Corrected.

**This number will not reach zero with the current books.** Nilsson and Orwin
are grammars; their wordlists exist to illustrate rules, so most vocabulary can
only ever reach one source there. Closing the gap needs a dictionary pass —
Wiktionary is already a source key and is the obvious next step. `fadlan`,
`ilmo` and `masjid` appear in neither grammar under any spelling and need
either a dictionary citation or cutting.

### 2. 7 registry forms rest on a single source ⚪

Down from 18. Orwin's fusion tables on p.21 and p.93 were read on the page and
resolved eight forms in one pass — `waad`, `baan`, `baad`, `buu`, `bay`,
`ayaan`, `ayaad`, `ayuu` — on top of `nabad`, `subax`, `waan`, `ayay` earlier.
Under **S6** those are now producible rather than read-only.

Run `npm run validate:course` for the live list; check **S4** prints it. As of
this writing: `waxaan`, `waxaad`, `saaxiibkeed`, `saaxiibteed`, `salaamaysa`,
`salaamaysaa`, `gabadhu`, `bariiska`, `tegey`, `cabbay`, `koob`.

Most **genuinely cannot be resolved** with the two grammars in hand: some come
from Nilsson's focus example and are absent from Orwin, others from Orwin's
word-order examples and are absent from Nilsson. They need a third source, not
more searching. The two winnable ones (`waxaan`, `waxaad`) have their exact
leads recorded in [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) §9.

> This count said "9" for a while after `gabadhu` and `bariiska` arrived with
> the Lesson 5 R6 fix. Trust the validator over this file.

### 3. Retention layer — built ✅

§1.2 rates exactly two techniques "high utility": practice testing and
**distributed practice**. The course had the first twice over (in-lesson
practice, unit test) and none of the second. Both halves now exist.

**Homework (Layer 2)** — `src/lib/homework.ts`, page at `/#/homework/:id`.
12 items, **33% carried back** from earlier lessons, 67–100% production for
lessons 3+, immediate metalinguistic feedback, scored and **gating nothing**.
Items are *composed* from existing verified material rather than authored, so
there is nothing new to source and nothing a future author must remember.
Check `A3` enforces the carry-back floor. This is also where **interleaving**
starts (§1.5) — in-lesson practice is blocked deliberately, and homework is the
first place lessons mix.

**Spaced review** — `src/lib/review.ts`. Finishing a lesson puts it into a
fixed-interval rota (1, 3, 7, 14, 30, 60, 90 days per §1.4); `/learn` shows what
is due, most overdue first, and doing that lesson's homework advances it. The
review count is passed to `composeHomework` as the attempt, so the fourth
return of Lesson 3 is not the first one again.

**Fixed intervals, not SM-2.** `lib/srs.ts` implements SM-2 with ease factors
and is deliberately unused: §1.4 found equal and expanding intervals
statistically equivalent, so the design rules out expanding schedules as costing
more for nothing — and SM-2 needs a per-item quality rating this course has
nowhere to collect. Debt 9 covers what remains of that file.

Verified in the browser: with lessons 2 and 3 backdated, `/learn` shows
"2 lessons are due for review · Start with lesson 3 — it has been the longest",
and only those two carry the due indicator.

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

### 6. `COURSE.md` is orphaned ⚪

`COURSE.md` is 9,399 lines and was the source for the deleted
`teaching-content.ts`. Its Somali has the same class of problems as the content
generated from it — e.g. `Walaalkaa xaal iska kuule?` glossed as "My name is
Amina. How is your brother?", where the Somali and English do not correspond.

`scripts/course-to-app.cjs`, the generator, is **deleted** — it was code with no
caller. `COURSE.md` is **kept**, deliberately: it may be hand-written and is the
only prose record of the wider course plan. It is not wired to anything, and
deleting a prose record is the one call worth leaving to a human.

### 7. Lint errors — resolved ✅

Was ~10, all in vendored `src/components/ui/*` shadcn boilerplate. That
directory is deleted (nothing imported any of its 53 components), and
`npm run lint` now reports **zero errors**. Keep it there.

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
| **`A3` homework layer (Layer 2)** | ✅ built — see debt 3 |
| **SRS / spaced review no longer orphaned** | ✅ scheduled review is wired; `lib/srs.ts` stays unused *by design* — debt 9 |

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
   enough for breadth — which is why 52 vocabulary entries lacked a second
   source until three dictionaries arrived, and no amount of re-reading Nilsson
   would have fixed it. The dictionary pass took that to 5.
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
| 3 | Assessment engine | 🟡 tests, gating, correctives, cumulative, homework and spaced review all done; **retake pool still open** |
| 4 | Unit 1 — Lessons 1–4 | ✅ |
| 5 | Vocabulary track | ❌ blocked on a dictionary, not on effort |
| 6 | Units 3–4 — Lessons 9–14 | ❌ Unit 3 sourced and ready; Unit 4 unverified |
| 7 | Retire `COURSE.md` + generator | ❌ trivial, deferred on purpose |

### Sequence from here

Everything through the sourcing pass is done. What follows is ordered by what
unblocks what, not by what is most interesting.

**0 — Drive the UI at a phone viewport, and settle debt 10.** Partly done: the
lesson player, homework, unit test, blueprint states and every route have now
been driven in a real browser, and several defects came out of it that no gate
caught — an item that printed its own answer, `*italic*` rendering as literal
asterisks, a blueprint box no lesson filled. **But all of that was at a desktop
viewport.** The specific things only a phone decides are still open: whether the
feedback sheet obscures the answer on a short screen, and whether the floating
glass circles clear the Dynamic Island. Set `localStorage.setItem('lg-motion','off')`
first; routine in [ADDING_CONTENT.md](./ADDING_CONTENT.md).

**1 — Take four decisions that cost nothing now and get expensive later.** All
four are under Open Questions below; three are judgement calls and one is a
purchase.

- **Negation before questions, or the reverse?** `ma` is written identically for
  both, so whichever is taught first becomes the learner's default reading.
  Blocking for Lesson 10/11.
- **Get a third grammar** — Saeed or Puglielli. This is the real Unit 3 blocker
  and it is *not* lexical: Nilsson and Orwin disagree about `waa`, and no
  dictionary adjudicates a grammar dispute. Six dictionaries did not shorten the
  path to Unit 3 by a day.
- `haweeney` vs `naag`, and whether `COURSE.md` (9,399 orphaned lines) is
  deleted. Both low-stakes, neither blocking.

**2 — Unit 3 (Lessons 9–11): past tense, negation, questions.** Sourcing pass
first, and let its outcome reshape the lessons — that rule has already changed
two lessons after they were planned. This is where `ma` finally gets taught,
closing the promise Lesson 5's docstring made when it cut it.

Two things fall out of that sourcing pass for free:

- **The past-tense rule closes `tegey` and `cabbay`.** Both stems are already
  confirmed (`tag` at Awde p.48, `cab` at p.25); the only missing piece is a
  double-attested rule, which Lesson 9 has to establish anyway. They then join
  the derived tier like `keentaa`, taking the vocabulary gap from 5 to 3.
- **Orwin's own past-tense `waa` examples are already located** and recorded in
  [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) §7: `Ninku waa toosay`, `Bariisku waa
  karay`, `Gabadhu waa tagtay`. They were deliberately not used in Lesson 5
  because Unit 2 teaches only the present. Unit 3 is where they belong — verify
  on the page first, the Orwin dump is OCR and damaged nearby.

**3 — Close the retake hole while authoring Unit 3, not after.** Every test
shows all answers on its results screen and then serves identical items on
retake. The fix is roughly double the items per objective — content, not code —
so it is cheapest written alongside the Unit 3 bank.

**4 — Unit 4 (Lessons 12–14), sourcing pass first.** Adjectives and prepositions
are well covered in both grammars. **Numerals are the flagged thin spot** —
Orwin barely mentions them, so check before planning Lesson 13, not after.
Expect Unit 4 to be the most lexical unit yet, which is where the three new
dictionaries finally earn their place in content rather than repair.

**5 — Standing debt. Opportunistic, never scheduled ahead of 1–4.**

- **A free `E9` win is available now.** `koob` gained its second source in
  `4389ceb3`, so the Unit 2 bank's `koob` imperative item is convertible to
  production immediately.
- The remaining 5 vocabulary and 7 registry thin forms: none is an undone
  lookup. Two want the past-tense rule, five are compositional, three are absent
  from every source consulted.
- Debt 13 (`**` meaning both "Somali" and "emphasis") needs a content marker
  plus a validator check, and unblocks debt 14 and the language-forward home
  screen.
- `E9` production targets: Unit 1 is structurally capped near 47% and should be
  measured rather than chased; Unit 2 reaches ~58% once the fusion forms resolve.
### Deliberately not planned

Nothing from the original Layer 2 / SRS gap remains — both landed (debt 3). The
open items are all in "Known debt" below; there is no separate unplanned pile.

## Open questions — these need a human decision

**Should a third grammar be acquired before Unit 3 is authored?** Saeed's
*Somali Reference Grammar* or Puglielli. This is the one open question with a
price tag rather than a judgement, and it is the actual Unit 3 blocker.

The August 2026 dictionary pass made the shape of the problem clear: three new
dictionaries took the vocabulary gap from 52 to 5 and did **nothing** for Unit 3,
because Unit 3's content is grammar. §7 below records that Nilsson and Orwin
disagree about what `waa` even is, and a dictionary cannot adjudicate that. Where
the two grammars are the only sources, "two independent sources" means "both of
them agree" — with no tiebreak when they do not, and no third opinion when one is
silent. Nilsson's §12.3 entry for `waa` ends with the author's own note, *"Add
examples!"*.

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

**~~Deepen four lessons, or extend to five and beyond?~~ — the question was
stale when asked.** Lessons 5–8 already exist (see "What exists" above), so
there was never a fork here. What is real: **the method has never been
evaluated**, and the material to evaluate it with is already written.

**~~Is the four-box blueprint still the right spine?~~ — ANSWERED (Aug 2026):
yes, and it is now telling the truth.** This question used to read "it currently
only ever highlights WHO... it pays off from Lesson 5 onward, and is unproven
until then." That premise was wrong — the device had been advancing since Unit 2
shipped — but investigating it turned up a real defect underneath.

`blueprintSlot` was a *single* value, so a lesson could claim exactly one box.
COURSE_DESIGN §4B.1's own progression table says Lesson 2 adds "**WHO / WHAT**
can hold a noun" and Lesson 3 "those **boxes** can be made definite", both
plural — so the data model could not express what the design specified.
Consequence: **`WHAT` was never claimed by any lesson**, while Lesson 8's
blueprint card told the learner "Every box is filled." The spine asserted
something false, on the highest-effect device in the design (§1.13, 1.24).

Fixed: the field takes a list, Lessons 2 and 3 claim `WHO` and `WHAT` as the
design always said they did, and the progression is now

```
 L2–3  WHO + WHAT      L5–6  SIGNAL      L7–8  DO
```

with nothing unclaimed at the end. `src/tests/blueprint.test.ts` guards both
properties: every box is filled by something, and Lesson 8's claim is true by
the time it is made.

So the blueprint is not waiting on new content to be tested. **It is waiting on
somebody opening it.** Same for the other three method questions:

1. Does the blueprint pay off once a second slot lights up? — L5 and L6 light
   SIGNAL. Drive them.
2. Does structured input where the particle is the **only** disambiguator defeat
   the First-Noun default (COURSE_DESIGN §1.10)? This is the most
   Somali-specific claim in the whole design, and Lesson 5 is precisely the test
   of it. Never checked.
3. Does NOTICE carry more weight than EXPLAIN (§3.1, the recorded tension)?
   **This one already has a number.** Card counts across the eight lessons run
   23 `teach` to 21 `notice` — near parity. If the processing-instruction
   literature is right that structured input does the work and explanation adds
   little, that ratio is wrong and should tilt toward `notice`. Lesson 5 alone
   is 4 `teach` to 3 `notice`.
4. Does the lesson loop survive a concept with no English analogue? — the signal
   system *is* that concept, and it shipped. Read it and judge.

**Kill criteria still get written first.** The change is that the thing being
judged already exists, so this costs a reading and a browser session rather than
an authoring cycle.

**What Unit 3 will need, and six new dictionaries do not provide.** Grammar, not
lexis. §7 below records that Nilsson and Orwin **disagree** about `waa`. A
dictionary attests that a word exists; it cannot adjudicate classifier versus
declarative particle. What would help is a **third grammar** — Saeed or
Puglielli — not a seventh dictionary.

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

### 9. `lib/srs.ts` — deleted ✅

An SM-2 implementation with ease factors and quality ratings, wired to
`srsCards` in the store and called by nothing. The open question was whether the
vocabulary track (Phase 5) would want per-word scheduling; the answer taken was
no — spaced review uses the fixed intervals in `lib/review.ts`, because §1.4
found expanding schedules no better and more expensive, and SM-2 needs a
self-rated quality per item this course never collects.

Deleted along with `srsCards` and its three store methods. An engine with no
callers that looks finished is exactly what [POSTMORTEM.md](./POSTMORTEM.md) is
about, so it went rather than lingering as a decision nobody would make.

If per-word scheduling is ever wanted, write it against the real requirement
then; it is in git history.

### 10. The whole interface is unverified in a browser 🔴

**Downgraded from 🔴 in August 2026: most of it has now been driven**, in the
in-app browser, at a **desktop viewport (1280×720)**. The lesson player, the
homework flow end to end, the unit test, the blueprint's three states across
Lessons 2/5/8, and every route were all exercised.

It was worth doing exactly as rule 1 predicts. Things that passed build, 109
tests and 21 validator checks and were still broken on screen: an exercise that
printed its own answer in the question, `*italic*` rendering as literal
asterisks across 47 spans, and a blueprint box no lesson ever filled while
Lesson 8 told the learner "every box is filled".

**What is still unverified is specifically the phone.** Those need a narrow
viewport and nothing else will settle them:

- whether the feedback sheet obscures the answer on a short screen
- whether the floating glass circles clear the Dynamic Island
- whether the toolbar's tap targets are reachable one-handed

The swipe-threshold question that used to sit here is **gone, not unanswered**:
swipe was built and then removed (see UI_CONVENTIONS), so there is no gesture to
fight iOS Safari's edge-back. The worksheet named above is deleted.

Drive `/#/learn`, then a full lesson, at a phone viewport, with
`localStorage.setItem('lg-motion','off')` first. Routine in
[ADDING_CONTENT.md](./ADDING_CONTENT.md).

### 11. localStorage hydration ✅ confirmed

**Settled in August 2026, and it was the test harness, not the app.** The
suspicion was that the store hydrated from defaults and persisted empties back
over seeded state — which, if real, would mean a learner's progress vanished on
reload.

It does not. Across the sourcing and verification work, state was seeded into
`leet-somali-progress-v7` and the page reloaded many times, and every field
survived: `completedLessons`, `lessonCardPositions`, `reviewSchedule`,
`practiceScores`. A homework run recorded 8% and a lesson advanced to its
three-day review rung, both of which were still there after a hard reload. The
persisted shape also matched `partialize` exactly after the store was slimmed —
no `xp`, no `srsCards`, no `dailyGoal`.

The original symptom was a race: seeding `localStorage` *after* the store had
already hydrated. Seed first, then load the page.

### 12. The service worker used to pin devices to a dead build ✅ fixed

Recorded because it cost two deploys and will be tempting to "simplify" back.
`public/sw.js` was cache-first over everything with a constant cache name, and
it precached `/index.html`. Since that HTML names the content-hashed asset
bundles, any device that cached it once kept loading the old JS and CSS forever;
the activate handler only deleted caches whose name differed from `CACHE_NAME`,
which never changed, so nothing was ever purged.

The rule now: **HTML is network-first, hashed `/assets/*` are cache-first**,
nothing is precached, and `CACHE_VERSION` is bumped when the file changes. This
is the production form of the stale-bundle trap in
[WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md).

### 13. `**` in lesson content means two different things ⚪

Blocks the strongest available typographic signal. `authored-lessons.ts` uses
`**` both to mark a Somali form (`**waxa**`, `**guriga**`, `**-ka**`) and for
ordinary English emphasis (`**not**`, `**WHO**`, `**SIGNAL**`, `**DO**` — the
blueprint labels). Since the serif is reserved for Somali, rendering all bold in
it would teach that "not" is a Somali word, so `<Somali>` is applied only where
the data structurally guarantees it: the `somali` field, unscramble word banks,
vocab entries and answer keys.

Fixing it means giving the content its own marker for Somali plus a validator
check that `**` never wraps a registry form. Content work — not to be done
casually.

### 14. Lessons have no signature form ⚪

Wanted for a language-forward home screen (each lesson fronted by its key Somali
word, set large). **It cannot be derived** — most lessons' `correctAnswer` is an
English proposition, so picking the most frequent value yields "It is
masculine", "Hold the vowel longer", `v`, `x`; only Lesson 5 (`baa`) and Lesson
6 (`wuxuu`) produce anything usable. It needs a hand-authored field per lesson
plus a check that each form is registry-verified.

`blueprintSlot` is the reliable alternative and is already populated
(— / WHO / WHO / WHO / SIGNAL / SIGNAL / DO / DO), so a sentence-shaped home is
buildable today at no content cost.
