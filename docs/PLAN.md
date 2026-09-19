# The plan

> What happens next and in what order, plus the decisions that need a human.
> **Last updated:** 2026-09-19 — Unit 3 shipped (Lessons 9–11) after the September resequencing.
>
> **Split out of STATE_OF_PLAY.md in Aug 2026**, because "what is next" was the
> most common question asked of that file and answering it meant paying for the
> full inventory and every debt item.
>
> The debt this acts on: [DEBT.md](./DEBT.md).
> What exists today: [STATE_OF_PLAY.md](./STATE_OF_PLAY.md).

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
| 6 | Units 3–4 — Lessons 9–14 | 🟡 Unit 3 ✅ shipped Sept 2026 (Lessons 9–11: describing, number, relation words); Unit 4 (past/negation/questions, Lessons 12–14) sourced but unbuilt |
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
  Blocking for Unit 4 (now Lessons 13/14).
- ~~**Get a third grammar**~~ — **DONE (Sept 2026).** Saeed's *Somali*
  (Benjamins, 1999) is in the source system as `SG` and carries Unit 3's
  adjective, numeral and preposition citations. It did not adjudicate the
  `waa` dispute — that question is still open below and now belongs to Unit 4.
- `haweeney` vs `naag`, and whether `COURSE.md` (9,399 orphaned lines) is
  deleted. Both low-stakes, neither blocking.

**2 — Unit 3 (Lessons 9–11): describing, number, and relation words — ✅
shipped 2026-09-19.** This unit was resequenced with the user's approval
(sequence A): COURSE_DESIGN had past tense/negation/questions here, but the
sourcing audit found that block gated on the `ma` teaching-order question and
a `waa` dispute between the grammars, while describing/counting/relation
words were fully attestable once Saeed arrived. What shipped: three flow-2
lessons, nine objectives, a 24-item test bank with three fresh items per
objective, correctives coverage from the same bank, a genuinely-unseen
transfer item (`u3-t18`), and the Syllabus roadmap renumbering. Past tense,
negation and questions moved to Unit 4 (item 4 below).

Two things fall out of that sourcing pass for free:

- **The past-tense rule closes `tegey` and `cabbay`.** Both stems are already
  confirmed (`tag` at Awde p.48, `cab` at p.25); the only missing piece is a
  double-attested rule, which Lesson 12 has to establish anyway. They then join
  the derived tier like `keentaa`, taking the vocabulary gap from 5 to 3.
- **Orwin's own past-tense `waa` examples are already located** and recorded in
  [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) §7: `Ninku waa toosay`, `Bariisku waa
  karay`, `Gabadhu waa tagtay`. They were deliberately not used in Lesson 5
  because Unit 2 teaches only the present. Unit 4 is where they belong — verify
  on the page first, the Orwin dump is OCR and damaged nearby.

**3 — Close the retake hole — Unit 3 done, Units 1–2 still open.** Unit 3's
bank carries three fresh items per objective, and `composeUnitTest` rotates
bank order per attempt, so a retake is not the same run with the same layout.
Every test still shows all answers on its results screen, and Units 1–2 still
sit at two items per objective — doubling those banks remains the open part.

**4 — Unit 4 (Lessons 12–14): past tense, negation, questions — the old
planned Unit 3.** Sourcing pass first, and let its outcome reshape the
lessons. This is where `ma` finally gets taught, closing the promise Lesson
5's docstring made when it cut it. The negation-before-questions question
below is now this unit's fork.

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

---

## Open questions — these need a human decision

**~~Should a third grammar be acquired before Unit 3 is authored?~~ —
ANSWERED (Sept 2026): yes, and it happened.** Saeed's *Somali* (1999) is
registered as `SG`. The rest of this entry still stands as the reasoning:

The August 2026 dictionary pass made the shape of the problem clear: three new
dictionaries took the vocabulary gap from 52 to 5 and did **nothing** for Unit 3,
because Unit 3's content is grammar. §7 below records that Nilsson and Orwin
disagree about what `waa` even is, and a dictionary cannot adjudicate that. Where
the two grammars are the only sources, "two independent sources" means "both of
them agree" — with no tiebreak when they do not, and no third opinion when one is
silent. Nilsson's §12.3 entry for `waa` ends with the author's own note, *"Add
examples!"*.

**Does Unit 4 teach negation before questions, or the other way round?**
`ma` is written identically in both roles, because tone is not written, so
whichever comes first is the meaning the learner will reach for by default.
The design puts negation at Lesson 13 and questions at 14; Orwin introduces
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

---

## Phase 4 (the unit test) — done

Previously the one planned piece of work not yet done; now built and routed:

1. ✅ Unit test bank for lessons 1–4, drawn only from `verified-forms.ts`
   (`src/data/unit-tests.ts`, 32 items).
2. ✅ Covers every objective declared across the four lessons — enforced by
   validator check U3.
3. ✅ [`assessment`](../src/lib/assessment/index.ts) wired to it: scoring, the 85%
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
