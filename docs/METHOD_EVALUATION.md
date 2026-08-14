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
> **Status:** criteria set. No evidence gathered.

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
