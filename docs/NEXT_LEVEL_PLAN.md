# LeetGrammar next-level plan: text-first, no audio

**Date:** 2026-09-18  
**Constraint accepted:** no audio. This plan does not treat listening or speaking as hidden future work. It focuses the product on what a text-first course can genuinely do well: reading comprehension, sentence decoding, written production, text-based interaction, cultural interpretation, and durable learning.

## Product thesis

LeetGrammar should become the best **text-first Somali comprehension course** it can be, not an incomplete imitation of a four-skills classroom.

The credible promise is:

> Learn to decode common written Somali, understand how sentence signals organize meaning, and respond in short, accurate written Somali.

Media remains a long-term application only where transcripts or captions exist. The product should not claim spoken comprehension, listening proficiency, pronunciation training, or speaking ability without direct instruction and assessment in those modes.

## North-star outcomes

By the end of the implemented core, a learner should be able to:

1. **Decode:** identify WHO, SIGNAL, WHAT, and DO in an unfamiliar but level-appropriate written sentence.
2. **Comprehend:** state the gist and supported details of a short caption, message, or paragraph.
3. **Interpret:** explain how a form or signal changes emphasis or meaning in a minimal contrast.
4. **Interact in writing:** ask, answer, clarify, and repair in a bounded text exchange.
5. **Present in writing:** produce a short connected message for a named purpose and audience, then revise it from feedback.
6. **Transfer:** apply a learned strategy to new vocabulary and an unseen text rather than only repeat lesson sentences.
7. **Learn independently:** use the course’s decoding, retrieval, and error-review routines without being told each time.

These are course outcomes, not ACTFL or CEFR proficiency claims. Each must have direct evidence in the same mode.

## Non-goals

- Audio, pronunciation, or speaking instruction.
- Claims about understanding uncaptioned spoken Somali.
- Open-ended AI conversation presented as interpersonal competence.
- Culture-fact cards detached from a source text or communicative purpose.
- Six more grammar lessons before the current course proves transfer.
- More screens as a proxy for depth.

## Workstreams

### 1. Outcome and assessment spine

Create a course outcome registry with observable can-do statements, evidence requirements, and mappings to lesson objectives, homework, unit tests, and capstones.

**Deliverables**

- `course-outcomes.ts`: 6–8 course outcomes with IDs, plain-language can-do statements, and assessment modes.
- Lesson outcomes rewritten as learner performances, not content labels.
- Alignment report that fails when an outcome has no direct assessment or an assessment targets no declared outcome.
- Learner-facing “You can now…” evidence on results screens.

**Gate**

Every claimed outcome maps to at least two learning opportunities, one delayed retrieval, and one transfer assessment. No audio/speaking claim exists.

### 2. Unseen reading transfer

Add short, sourced text sets that require the existing grammar in new combinations. Begin with captions and messages, then move to 3–6 sentence microtexts.

**Task sequence**

1. commit to gist before glosses,
2. mark the sentence blueprint,
3. answer detail/inference questions,
4. explain one signal contrast,
5. write a short response,
6. revisit a parallel unseen text later.

**Content rules**

- Source, permission, audience, region, and register are recorded.
- Vocabulary support appears after first commitment, not before.
- At least one distractor must punish the known wrong heuristic.
- The final item uses new nouns or a new context while preserving the taught structure.

**Gate**

A learner can pass a fresh parallel text, not merely the lesson specimen. Unit tests include unseen reading sets.

### 3. Text-based information gaps

Create one valid interaction type the product can support without pretending to hear speech. A learner receives partial written information and must ask or answer to complete a goal.

**First formats**

- choose the correct question for missing information,
- compose a short question from a constrained bank,
- read a reply and identify whether it answered the question,
- choose or type a clarification/repair,
- complete a two-sided message sequence with delayed context reveal.

This is simulated written interaction, not proof of free interpersonal proficiency. Label it accurately.

**Gate**

Success requires meaning exchange and repair, not only producing a target form. At least one path includes an ambiguous or insufficient reply.

### 4. Short connected writing

Move production beyond isolated sentences with bounded 2–5 sentence tasks.

**Task types**

- caption a scene from supplied facts,
- reply to a short message,
- introduce and describe a person/place using verified forms,
- compare two sentence interpretations,
- summarize a microtext in English first, then produce a short Somali response where supported.

**Rubric**

Score task completion, comprehensibility, organization/cohesion, and control of taught forms. Grammar accuracy is one dimension, not the entire grade. Early tasks use checklists and model comparison; later tasks save drafts and revisions. Human review is required before claiming valid open-ended scoring.

**Gate**

Each unit ends with one connected-writing artifact and one revision. Do not auto-score unrestricted prose as definitively correct.

### 5. Culture through text and context

Add culture only through sourced texts, images, captions, or messages with identifiable context.

**Every cultural task records**

- source and permission,
- creator/community perspective,
- region and register where known,
- what the learner can infer from the text,
- what remains unknown,
- a comparison question that avoids ranking one culture against another.

**Gate**

No “fun fact” stands alone. Every cultural element changes interpretation, audience choice, register, or communicative response.

### 6. Meta-teaching across Lessons 5–8

Extend the Learning move pattern already built for Lessons 1–4.

- **Lesson 5:** find the signal before assigning roles; test against a second-noun spotlight.
- **Lesson 6:** unpack a fused form into signal + person, then rebuild it.
- **Lesson 7:** use agreement between the signal and verb ending as an error-checking cue.
- **Lesson 8:** hold the action word until the sentence end; revise the provisional parse when a signal redirects emphasis.

Each card must be followed by a new-material exercise that requires the strategy. A strategy explanation with no transfer item does not count.

### 7. Quality, access, and trust

- Resolve, relabel, or remove the seven single-source registry forms and five under-sourced vocabulary entries.
- Add qualified Somali speaker/teacher review when available; record dialect and register judgments separately from source attestation.
- Audit keyboard navigation, screen reader names/order, 200% zoom, reduced motion, short screens, and tablet/desktop resizing.
- Fix the unit-test retake hole so a shown answer is not served unchanged.
- Preserve explicit implemented/planned labels in docs and UI.
- Keep free-only hosting and Firebase usage within current free-tier constraints; no paid dependency is assumed by this plan.

## Phased roadmap

### Phase 0: stabilize and measure (1–2 focused work cycles)

1. Confirm the production scroll-reset fix and close the current bug.
2. Merge the collegiate audit and this plan after review.
3. Add course-outcome registry and alignment checks.
4. Freeze headline metrics: implemented lessons, exercises, production share, source status, transfer tasks, connected-writing artifacts.
5. Add baseline analytics that preserve privacy: task completion, attempt count, error category, hint use, delayed transfer result. No engagement streak is a learning metric.

**Exit gate:** every current claim has a mapped measure; production has no known lesson-navigation blocker.

### Phase 1: vertical slice in Lessons 1, 5, and 8

Build the full text-first model before expanding breadth.

| Lesson | New evidence |
| --- | --- |
| 1 | unfamiliar three-sentence text; gist/detail; blueprint markup; short response; delayed parallel text |
| 5 | minimal contrast in a new caption/message; signal interpretation; clarification choice; explanation of emphasis |
| 8 | 4–6 sentence microtext; sentence-order decoding; bounded reply; short connected-writing revision |

Add one contextual/cultural source across the slice, not one per screen. Add the text information-gap prototype and the first analytic writing rubric.

**Exit gate:** all three lessons demonstrate transfer on unseen text; a learner produces and revises connected writing; the information gap cannot be passed by form matching alone.

### Phase 2: assessment redesign

1. Add unseen reading sets to both unit tests.
2. Raise Unit 2’s production share where sourcing permits; keep Unit 1 honest rather than padding.
3. Add alternate retake pools before showing answers.
4. Separate practice feedback from summative results.
5. Report outcome-level evidence, not only percent correct.
6. Add delayed transfer to homework/review.

**Exit gate:** seeing a results screen cannot make the immediate retake trivial; every unit measures comprehension and transfer, not only form recognition.

### Phase 3: retrofit all eight lessons

Apply the proven vertical-slice template to Lessons 2–4 and 6–7:

- one explicit transfer text,
- one strategy-to-new-material link,
- one bounded written response,
- one delayed parallel item,
- contextual vocabulary inside sentences rather than a large isolated list.

Refactor vocabulary decks so introduced words are fewer, contextual, and recycled. Keep the full registry as a reference, not a lesson-sized burden.

**Exit gate:** all eight lessons have direct evidence for their can-do outcome and no lesson depends on one specimen sentence alone.

### Phase 4: decide whether to expand to Lessons 9–14

Only proceed if Phases 1–3 improve unseen transfer and connected writing without unacceptable completion or error patterns.

Author new lessons with the proven template, sourcing pass first. If a topic cannot support a meaningful text, interaction, or writing use, it is not ready to become a lesson.

**Exit gate:** new content expands function and text range, not only the grammar inventory.

## Scoreboard

Track learning evidence, not activity volume.

| Metric | Current | Next gate |
| --- | ---: | ---: |
| Implemented lessons with unseen transfer text | 0/8 | 3/8, then 8/8 |
| Lessons with explicit Learning move | 4/8 | 8/8 |
| Lessons with connected writing | 0/8 | 3/8, then 8/8 |
| Lessons with delayed parallel transfer | 0/8 | 3/8, then 8/8 |
| Course exercises that are production | 35% | trend upward where valid; no padding target |
| Unit tests with unseen reading set | 0/2 | 2/2 |
| Unit tests with alternate retake pool | 0/2 | 2/2 |
| Two-source vocabulary entries | 90/95 | 95/95 or explicitly cut/labeled |
| Two-source/derived registry forms | 102/109 | 109/109 or explicitly cut/labeled |
| Known critical accessibility failures | unknown | 0 after formal audit |

## Immediate next sprint

1. Add outcome registry and alignment test.
2. Write the Lesson 1 unseen microtext specification using only verified forms before writing content.
3. Design the text information-gap state model and one Lesson 5 prototype.
4. Define the connected-writing rubric and self-review checklist.
5. Add Learning move cards plus transfer items to Lessons 5–8.
6. Build alternate retake selection before expanding unit banks.
7. Run the accessibility audit and capture defects as gates or tracked debt.

## Decision rule

The project advances when learners can do more with **unseen text**, not when the repository contains more lessons. If a change improves card count, grammar coverage, or visual polish but does not improve comprehension, transfer, written interaction, or durable recall, it is not “next level.”
