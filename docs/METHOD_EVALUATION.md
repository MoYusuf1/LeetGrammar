# Method evaluation — kill criteria

> **Written before the evidence, on purpose.** The criteria below are committed
> in their own commit, ahead of any examination of Lessons 5–8. If they were
> written afterwards they would be written to fit what was found — which is
> precisely the self-assessment bias COURSE_DESIGN §3.2 warns about, running at
> full strength because the author of the lessons and the judge of them are the
> same person.
>
> **This document has a lifespan.** Criteria now, findings next, then a verdict
> folded into COURSE_DESIGN / STATE_OF_PLAY and this file deleted.
>
> **Status:** complete. **4 / 4 pass. No method-level failures.** Four
> lesson-level findings, none blocking. See Part 2.

---

## What is being judged, and what is not

Phase 3 exists because **the method has never been evaluated**, not because the
content is missing. Lessons 1–8 already exist. The instrument for judging the
method is therefore Lessons 5–8 — the signal system — because that is where the
design's most distinctive claims are actually load-bearing.

The distinction that governs every finding below:

| Finding | Means | Response |
|---|---|---|
| **Lesson-level** | This lesson does the method badly | Fix the lesson. The method stands. |
| **Method-level** | The method, done correctly, produced this | Change COURSE_DESIGN. |

Conflating the two is how a design survives evidence it should not survive. Every
finding must be filed as one or the other, explicitly.

---

## Q1 — Does the blueprint pay off once a second slot lights up?

**The claim.** §1.13: graphic advance organizers are the largest effect in the
document (1.24). The blueprint is that organizer. Its job is to frame new
material *before* it arrives and to activate prior knowledge (Gagné event 3), not
to decorate.

**PASS** requires all three:

1. The L5 blueprint card is **not** the L2 card with a different box shaded. It
   must carry information the earlier one did not — what is now filled, what is
   being added.
2. A `connect` step exists and names the specific prior lesson and what it
   yielded, per §3.1's `0b`. "Last lesson: X. That gave you ___."
3. The `promise` (`0c`) is a concrete Somali sentence the learner will be able to
   build, and the lesson actually closes it (`payoff`, step 8).

**FAIL — lesson-level.** Any of the three missing but reparable in the content.

**FAIL — method-level.** If the blueprint carries no per-lesson information *by
construction* — i.e. `blueprintSlot` is a single enum with nowhere to record what
came before — then the device cannot do an organizer's job however it is
authored, and §1.13's effect size is not being collected.

---

## Q2 — Does structured input defeat the First-Noun default?

**The claim.** §1.10 is the most Somali-specific assertion in the whole design.
VanPatten's First Noun Principle predicts a learner reads *Cuntada baa gabadhu
cunaysay* as "the food was eating the girl." The design's response: *"Particle
lessons must use structured input where the particle is the only disambiguator,
engineered so word-order guessing fails."*

**The test is already written down.** LESSON_CONVENTIONS §3.1b requires it as a
step: **answer every notice item using only the wrong heuristic, and confirm you
get it wrong.** Validator check `E10` flags this class and explicitly cannot
automate it.

**PASS.** Applying "the first noun is the subject" (and, separately, "the first
thing mentioned is what the sentence is about") to every `notice` item in
Lessons 5–8 yields a **wrong** answer on the items that teach the particle. The
particle must be the only thing that disambiguates.

**FAIL — lesson-level.** Some items are guessable by word order; the rest are
sound. Rewrite the guessable ones.

**FAIL — method-level.** If items where the particle is the sole disambiguator
turn out to be *unauthorable* at this vocabulary level — because every available
sentence has a word-order cue, or because the registry lacks the forms to build a
minimal pair — then §1.10's prescription cannot be met by a beginner course and
the design must say so rather than continue asserting it.

This is the single most important question here. **If Q2 fails at method level,
the course's central premise fails with it**, because the signal system is the
reason this project exists.

---

## Q3 — Does NOTICE carry more weight than EXPLAIN?

**The claim.** The tension recorded in §3.1. §1.1 says explicit instruction wins;
the processing-instruction replication found the gain came from structured input
and that stripping the explanation changed nothing. The practical consequence
written into the design: *"a lesson short on cards should cut explanation before
it cuts structured input."*

**The number already in hand:** 23 `teach` cards to 21 `notice` across the eight
lessons; Lesson 5 is 4 `teach` to 3 `notice`. Card count alone settles nothing —
it is a proxy, and a weak one.

**PASS.** Removing the `teach` cards from Lesson 5 would leave the `notice` items
still able to teach the distinction — the structured input carries the
form-meaning mapping and explanation summarises it. Judged by reading, and stated
as a specific claim about specific cards, not as an impression.

**FAIL — lesson-level.** The `notice` items only make sense once the rule has
been stated, i.e. they are comprehension checks on the explanation rather than
the place the mapping is built. Reparable by rewriting the items.

**FAIL — method-level.** If notice items *cannot* be built to carry the mapping
without a prior rule statement for this material, then §3.1's ordering is right
and the recorded tension resolves in favour of §1.1. **That is a real possible
outcome and it should be recorded as a finding, not treated as a defeat.** The
tension was recorded precisely because it is unresolved.

---

## Q4 — Does the loop survive a concept with no English analogue?

**The claim.** The learner profile names the focus-particle system as having *no
English equivalent*. D4 requires plain English with zero jargon. Those two
constraints fight each other: the plain-language rule is easiest to satisfy by
reaching for an English analogy, and the analogy will be false.

**PASS** requires both:

1. `waa` / `baa` / `ayaa` / `waxa` are taught **on their own terms** — by what
   they do to a Somali sentence — rather than by equation with an English
   construction. A contrast drawn against English is fine ("English does this
   with stress; Somali uses a word") — an *equation* is not ("`waa` is 'is'").
2. No jargon, per D4. Validator-enforced and currently passing, so this is a
   read-through confirmation rather than an open question.

**FAIL — lesson-level.** A false analogy is present and removable.

**FAIL — method-level.** If the concept **cannot** be taught in plain English
without a false analogy — if every draft either reaches for English or reaches
for jargon — then D4 and the signal system are in genuine conflict, and D4's
"technical terms confined to a glossary" needs a stated exception rather than
silent violation.

Note the asymmetry with §1.12: a false analogy is worse than a hard sentence.
Hypercorrection says the wrong model, learned now, competes with the right one
indefinitely, and nothing downstream will catch it.

---

## What would make me stop

Recorded so it cannot be softened later:

- **Q2 failing at method level** stops new content. The signal system is the
  project's reason for existing; if its central instructional claim cannot be
  met, authoring Unit 3 would be building on it anyway.
- **Two or more method-level failures** means the loop in §3.1 is wrong as a
  whole, not locally, and COURSE_DESIGN Part 3 needs rewriting before anything
  else.
- **All four passing** is a real possible result and would mean the method is
  sound and Phase 4 proceeds to Unit 3. It should not be treated as suspicious
  merely because it is the comfortable outcome — but it does require that the Q2
  heuristic test was actually *run*, item by item, and not asserted.

## What is explicitly not being judged

- Whether the Somali is correct. That is sourcing, it is enforced elsewhere, and
  no reading of a lesson tests it.
- Whether the lessons are engaging.
- Whether four lessons are enough to learn the signal system. That is a scope
  question answered in §2.0.

---

# Part 2 — Findings

Evidence gathered after the criteria above were committed (`44c0771b`). Method
under test: Lessons 5–8, read in full plus driven in the browser.

## Verdict table

| | Question | Verdict | Findings |
|---|---|---|---|
| Q1 | Blueprint pays off | **PASS** | 2, both component/content-level |
| Q2 | Structured input defeats First-Noun | **PASS, strongly** | 1 minor |
| Q3 | NOTICE outweighs EXPLAIN | **PASS on the criterion** | the stronger question is unanswerable here |
| Q4 | Survives a concept with no English analogue | **PASS** | 1, and it matters |

**No method-level failure.** COURSE_DESIGN Part 3 stands. Phase 4 proceeds.

---

## Q2 — the heuristic test, run item by item

This is the one that decides whether anything else matters, and the criteria
required it be *run* rather than asserted. Every focus-position item in Lessons
5–8, answered using only "the first noun is what the sentence is about":

| Item | Sentence | Heuristic says | Correct | Heuristic |
|---|---|---|---|---|
| `l5-n1` | `Gabadhu bariiska baa cuntay` | Gabadhu (the girl) | **bariiska** (the rice) | **fails ✓** |
| `l5-n3` | `Sahra waxa ay salaamaysaa saaxiibkeed` | Sahra | **saaxiibkeed** | **fails ✓** |
| `l5-n2` | `Sahra baa salaamaysa saaxiibkeed` | Sahra | **baa** | fails, but see F4 |

`l5-n1` is the design's §1.10 example made into an item, and its explanation
names the trap outright: *"the girl is the first thing in the sentence and the
one doing the eating, and she is **not** the spotlight. Reaching for the first
noun is the habit to break."*

**The over-correction is guarded too**, which I did not expect. An item set where
the answer is never the first noun would teach "never pick the first noun" —
wrong in the opposite direction, and §1.12 says it would entrench just as hard.
But `5-complete-1`, `5-produce-2` and `5-payoff` all put the spotlight **on**
Sahra, the first noun, via `Sahra baa …`. Both errors are broken.

And the minimal pair at the centre of the lesson:

```
Sahra baa salaamaysa saaxiibkeed.      → SAHRA is greeting her friend.
Sahra waxa ay salaamaysaa saaxiibkeed. → Sahra is greeting her FRIEND.
```

Identical words. Opposite meaning. Nothing but the particle distinguishes them.
That is *literally* the design's prescription — "structured input where the
particle is the only disambiguator, engineered so word-order guessing fails" —
and it is the promise, the payoff and the final production item.

**§1.10 is not an aspiration in this course. It is implemented.**

## Q1 — the blueprint

All three pass conditions met. The L5 card is not the L2 card reshaded: it
positions the new slot against the old (*"The SIGNAL sits right after WHO"*), and
L6 explicitly says *"Same box as last time."* `connect` names the specific prior
gain with actual forms (*"You can fill the WHO box — wiil, wiilka, Wiilku,
isaga"*), and L6's names the exact sentence L5 ended on. The `promise` is
concrete and `payoff` closes it in as many words: *"That was the promise, and you
just did it."*

Rendering verified in the browser: at L5, SIGNAL is white-on-black
(`bg-accent`/`text-accent-ink`) against the other three at 8% fill and 30% label.
The advance is real and legible.

## Q3 — NOTICE vs EXPLAIN

The criterion asked whether `notice` items *could* carry the form-meaning mapping
without a prior rule statement. `l5-n1` demonstrably could: it presents a
sentence, invites a wrong answer, and builds the mapping in the feedback rather
than restating a rule already given. So the criterion passes, and the
method-level failure condition (that such items are unauthorable for this
material) does not hold.

**But the stronger question cannot be answered by inspection, and it is honest to
say so.** Lesson 5 follows §3.1's loop exactly — teach, then notice — so it never
withholds explanation. Whether the explanation *adds* anything, which is what the
processing-instruction replication puts in doubt, would need an A/B this project
cannot run at n = 1 with the author as learner. **Q3's tension stays recorded and
open.** The practical guidance in §3.1 (cut explanation before structured input)
stands as the right default, unproven.

On the raw ratio: L5's 4 `teach` to 3 `notice` is not padding. The four are a
framing card plus one each for `waa`, `baa`, `waxa` — which is exactly §1.14's
cap of ≤4 new items. There is nothing to cut.

## Q4 — a concept with no English analogue

Passes. The framing card **contrasts** rather than equates:

> *"English emphasises a word by saying it louder… Somali does not do this.
> Volume carries no meaning here. Instead a small word — the signal — goes into
> the sentence… The signal does a job English hands to your tone of voice."*

That is a *functional* mapping — both languages mark focus, by different means —
which is true cross-linguistically, not a false form equation. It is the
permitted form under the criterion. No jargon anywhere; D4 holds.

---

# Part 3 — The four findings

All lesson- or component-level. None blocks Phase 4.

**F1 — The blueprint has no "completed" state.** At Lesson 5, `WHO` renders
identically to `WHAT` and `DO`: 8% fill, 30% label. But WHO is *finished* and
WHAT has never been touched. The organizer distinguishes current from
not-current, and nothing else. The `connect` prose carries the completion
("You can fill the WHO box"), but §1.13 rates graphic organizers at 1.24 against
prose at 0.80 — the information is in the weaker channel. Three states are
needed where there are two. *Component fix, `Blueprint.tsx`, no content.*

**F2 — `WHAT` never lights, in any lesson.** Across the eight authored lessons
`blueprintSlot` is WHO ×3, SIGNAL ×2, DO ×2, **WHAT ×0**. The spine shows a
four-part formula and the course fills three parts of it. Either Unit 3 or 4
claims WHAT, or the blueprint is promising a box that does not exist. Worth
settling before more lessons are written on top of it. *Content/scope decision.*

**F3 — `waa` is only ever exemplified copularly, and that is the risky one.**
Its sole Lesson 5 example is `Wiilku waa macallin` — "The boy is a teacher."
Nothing in the lesson says `waa` is not the verb "to be", and a learner has every
reason to conclude it. The card is careful (*"use waa when you would say the
English sentence evenly"* — prosody, not copula), but careful is not the same as
closed. `SOMALI_SOURCES §7` already records that Nilsson and Orwin **disagree**
about `waa`'s analysis, which is exactly the kind of ambiguity a learner will
resolve wrongly and permanently (§1.12). The first non-copular `waa` a learner
meets is `way keentaa` in Lesson 7, two lessons later and not flagged as a
correction. *Content fix: one non-copular `waa` example in Lesson 5, sourced.*

**F4 — `l5-n2`'s hint gives it away positionally.** *"It is not the name and not
the long word. It is the short one sitting second."* That answers the item
without any knowledge of what `baa` does. The item is form-recognition wearing a
`notice` label — legitimate as a step, but it contributes nothing to the §1.10
defence while occupying one of the three notice slots. *Minor. Rewrite the hint.*

---

# Part 4 — What this means

The method survives its own test. Against the standard set before looking:
**Q2 did not fail at method level**, so new content is not blocked; **fewer than
two method-level failures**, so §3.1's loop is not rewritten.

The comfortable outcome, and the criteria anticipated that — so, for the record:
the Q2 heuristic test was run item by item and the table above is the working,
not a summary of an impression. The strongest evidence is the thing I expected to
find missing and did not: the over-correction guard in F-Q2. Content that breaks
*both* the First-Noun default and its mirror image is a stronger implementation
of §1.10 than the design document actually asks for.

The honest weakness is Q3. It passes its criterion and the criterion turns out to
be the weaker half of the question. Nothing available at n = 1 fixes that.

**Recommended order:** F3 first — it is the only finding that can entrench a
wrong model. Then F1, then F4. F2 is a scope decision for Phase 4 rather than a
repair.
