# LeetGrammar

A Somali grammar course for one adult learning alone, built so that every
instructional choice traces to published evidence and every Somali form traces
to two published sources.

Text-only. Local-only — no accounts, no backend, progress in `localStorage`.
**8 lessons in 2 units**, 121 cards, 50 exercises, 58 unit-test items,
109 source-verified forms.

---

## What this delivers, and what it does not

Most language software is vague about this. Being specific is the first
pedagogical decision here, because it is what makes every other one evaluable.

**It delivers two things.**

1. **Formula literacy.** Given a written Somali sentence in the taught patterns,
   you can say what each piece is doing — which word is the subject, which is
   the signal, which is being spotlighted, why the verb is where it is.
2. **Decoding fluency.** You can read written Somali aloud, accurately, at
   speed.

**It does not deliver, and does not claim to:**

- **Comprehension of authentic Somali text.** That needs
  [3,000–4,000 word families for 95% coverage](https://onlinelibrary.wiley.com/doi/10.1111/j.1540-4781.2011.01146.x).
  This course teaches a fraction of that and always will.
- **Listening comprehension.** It is text-only by design.
- **Speaking.** Never in scope.

The honest framing: **this app makes the formula legible and the spelling
readable. Comprehension comes from reading and listening done elsewhere.** It is
an on-ramp, and an on-ramp is a real thing to be.

Why the on-ramp is worth building rather than skipping:
[aural decoding predicts ~47% of the variance in L2 listening comprehension](https://www.researchgate.net/publication/391446594_Aural_Decoding_and_Comprehension_in_L2_Listening),
and Somali orthography is
[near-perfectly phonemic](https://en.wikipedia.org/wiki/Somali_Latin_alphabet) —
one-to-one consonants, long vowels written doubled, no letters for sounds the
language lacks. **Decoding Somali is a closed problem**, unlike decoding English.
Solving it is a large, cheap win toward listening that happens off the app.

For scale: FSI puts Somali at roughly
[1,100 class hours](https://www.fsi-language-courses.org/blog/fsi-language-difficulty/)
to professional working proficiency. A 14-lesson app is not that, and says so.

## The learner, and the constraint that shapes everything

One person, building this for himself.

- **Adult, analytical, wants the explicit rule.** Wants *the formula*.
- **No teacher.** All feedback has to be built into the material.
- **No native speaker available to check anything, ever.** Confirmed, not
  assumed — including for a one-off audit of the ~100 forms actually taught.
- **Somali is genuinely hard for English speakers**: verb-final tendencies, a
  focus-particle system with no English equivalent, four noun cases, gender
  agreement, gender polarity.

That third constraint is two problems, and separating them changed the project.

**Feedback — does a human need to correct you?** No.
[Computer-mediated corrective feedback shows a large overall effect, d = 1.21](https://journals.sagepub.com/doi/abs/10.1177/07356331211064066),
with computer-assisted instruction outperforming face-to-face in these
comparisons. This half is close to solved, and the design document used to
overstate its cost.

**Content truth — is the Somali correct?** This half does not move, and it is
why the sourcing discipline below is as heavy as it is.

---

## The evidence base

Eighteen findings, each of which decides something concrete. This is not a
reading list appended to a finished product; the course structure is downstream
of it, and where the evidence changed, the course changed.

### What to teach, and how much

| Finding | Evidence | What it decided |
|---|---|---|
| **Explicit beats implicit, strongly** | [Norris & Ortega (2000)](https://onlinelibrary.wiley.com/doi/abs/10.1111/0023-8333.00136); [Goo et al.](https://benjamins.com/catalog/sibil.48.18goo), 34 studies | State the rule plainly. Never make the learner infer and hope. |
| **Depth beats breadth** | [Schwartz et al. (2009)](https://onlinelibrary.wiley.com/doi/10.1002/sce.20328) — depth-present students held an edge equal to two-thirds of a year of instruction; breadth alone showed *no* advantage | Narrow permanently to ~14 lessons taught properly. Advanced topics are out of scope, not deferred. |
| **Working memory holds ~4 items** | Cowan; Mayer's segmenting principle | Hard cap: one grammar point and ≤4 new items per lesson. |
| **Mobile learning works, with a floor** | MALL meta-analyses, e.g. [g = 0.792 for listening](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9479751/) | Design the *session*, not just the lesson: 5–10 focused minutes, always cleanly resumable. |

### How to introduce it

| Finding | Evidence | What it decided |
|---|---|---|
| **Advance organizers — the largest effect here** | [Luiten, Ames & Ackerson (1980)](https://journals.sagepub.com/doi/abs/10.3102/00028312017002211), 135 studies; [112-study meta-analysis](https://www.tandfonline.com/doi/abs/10.1080/00220973.1983.11011862). **Graphic 1.24, prose 0.80** | Every lesson opens with the same running sentence diagram, with today's box highlighted. The biggest numbers in the whole base are about *delivery*, not content. |
| **Worked examples first, then fade** | [Cognitive load theory](https://link.springer.com/article/10.1007/s11251-009-9102-0); the expertise-reversal effect | Never jump to blank-page production. Ladder: notice → complete → produce. |
| **Block first, interleave later** | [Hwang (2025)](https://onlinelibrary.wiley.com/doi/10.1111/lang.12659), "*Undesirable* Difficulty of Interleaved Practice" — below a threshold of prior achievement, early interleaving prevents form–meaning associations forming at all | In-lesson practice is blocked on one point. Interleaving is withheld until homework. |

### How to make it stick

| Finding | Evidence | What it decided |
|---|---|---|
| **Only two techniques rate "high utility"** | [Dunlosky et al. (2013)](https://journals.sagepub.com/doi/abs/10.1177/1529100612453266) rated ten. Only **practice testing** and **distributed practice** scored high. Rereading, highlighting and summarising — what most self-study is — scored **low** | Homework and tests are the highest-leverage component, not a bolt-on. |
| **Retrieval beats restudy; cumulative testing works** | [Cumulative tests](https://onlinelibrary.wiley.com/doi/10.1002/tesq.3391) folding old material into new enhance L2 vocabulary learning | Tests are a learning event. Cumulative by default. |
| **Spacing works; don't over-engineer it** | [Kim & Webb (2022)](https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12479) — 98 effect sizes, N = 3,411. Medium-to-large for vocabulary *and* grammar. Equal and expanding intervals were **statistically equivalent** | Simple fixed intervals. An SM-2 implementation was written, never called, and deleted. |
| **Successive relearning** | [Rawson & Dunlosky](https://www.retrievalpractice.org/strategies/2018/successive-relearning) — one correct recall in each of three spaced sessions produced **more than twice** the recall of three correct recalls in one session; [holds on real course exams](https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.3699) | Homework carry-back and spaced review are **one mechanism**, not two. Carry-back draws from the review queue. |
| **Interval size scales with the retention target** | [Cepeda et al. (2008)](https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf), N > 1,350 — optimal gap ≈ 20% of the retention interval at weeks, falling to 5–10% at a year | The target here is *permanent*, so the ladder runs 1, 3, 7, 21, 60, 180, 365 days **and then annually, forever. Nothing graduates.** |

### The Somali-specific part

| Finding | Evidence | What it decided |
|---|---|---|
| **"First noun = subject" is a Somali trap** | [VanPatten's Input Processing](https://en.wikipedia.org/wiki/Input_Processing_theory). The First Noun Principle predicts a learner reads *Cuntada baa gabadhu cunaysay* as "the food was eating the girl" | **The most distinctive claim in the design.** Particle lessons must use structured input where the particle is the *only* disambiguator, engineered so word-order guessing fails. |
| **Structured input, not the explanation, does the work** | [Processing instruction beat traditional instruction](https://www.researchgate.net/publication/236032459_The_effectiveness_of_processing_instruction_on_L2_grammar_acquisition_A_meta-analysis) on comprehension *and* production, where TI gained only production; [the benefit came from the structured-input activities, not the explicit information](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/abs/explanation-versus-structured-input-in-processing-instruction/CADC0357472A2FF7A8195A3A58A8E602) | A lesson short on cards cuts explanation before it cuts structured input. **This sits in unresolved tension with "explicit beats implicit" above, and the design says so rather than picking a winner.** |
| **Metalinguistic feedback wins, especially for features absent from L1** | [Meta-analysis](https://link.springer.com/article/10.1186/s40862-020-00097-9) | Never "try again" — always *why*. Somali particles have no English analogue, which is exactly the case where this matters most. |
| **Errors entrench and resurface** | [Hypercorrection literature](https://link.springer.com/article/10.3758/s13423-011-0173-y): corrections decay, and on delayed tests learners reproduce the original error | With no native speaker to ever catch a mistake, wrong Somali learned now doesn't merely fail to help — it competes with the correct form indefinitely. This is the whole basis of the sourcing rules. |

### Measurement

| Finding | Evidence | What it decided |
|---|---|---|
| **Recall > recognition; production > reception** | [Retrieval format research](https://www.degruyterbrill.com/document/doi/10.1515/iral-2015-0022/html) | Multiple choice is the weakest tool available. Current mix: **32% production, 68% choice**, against a 76%-MCQ starting point. |
| **Mastery learning** | [36 studies, average effect 0.59](https://www.structural-learning.com/post/mastery-learning), with higher thresholds yielding greater gains | 85% criterion on unit tests, with correctives targeting the specific failed objectives. |
| **Screens comprehend worse than paper** | Clinton 2019 (n=29), Delgado 2018 (n=54), Díaz 2024 (n=49), plus a [network meta-analysis](https://link.springer.com/article/10.1007/s10639-025-13843-8). Mechanism: a metacognitive deficit — readers are *overconfident* on screens | The one real cost of going mobile-first. Mitigation is frequent forced retrieval, which punctures the illusion of understanding. |

---

## The lesson loop

Every lesson opens the same way — about 45 seconds, three cards:

```
BLUEPRINT   the running sentence diagram, today's box highlighted   (graphic AO, 1.24)
CONNECT     "Last lesson gave you X. Today we add Y."               (prior-knowledge activation)
PROMISE     one concrete Somali sentence you'll build by the end
```

Then, per grammar point — **one point, ≤4 new items**:

```
1. PREDICT     guess before the rule is revealed
2. EXPLAIN     the rule, in plain English, stated directly
3. SHOW        worked example, fully annotated
4. NOTICE      structured input — the answer hinges on the target form
5. COMPLETE    partially scaffolded production
6. PRODUCE     full production, no scaffold
7. FEEDBACK    metalinguistic explanation every time, right or wrong
8. PAYOFF      build the exact sentence promised at the start
```

And above the lesson: **homework** (mixed retrieval, ~30% carried back),
**unit test** (cumulative, 85% criterion), **correctives** (the failed
objectives only), **spaced review** (fixed intervals, permanent).

### What that looks like in practice

Lesson 5 teaches the signal system, and it is the clearest demonstration of the
§1.10 claim. The learner meets:

```
Sahra baa salaamaysa saaxiibkeed.      → SAHRA is greeting her friend.
Sahra waxa ay salaamaysaa saaxiibkeed. → Sahra is greeting her FRIEND.
```

Identical words. Opposite meaning. **Nothing but the particle distinguishes
them** — which is the design's prescription, implemented literally.

Then a notice item: *Gabadhu bariiska baa cuntay* — "The girl ate the rice."
Which words are spotlighted? The First-Noun heuristic answers "Gabadhu". The
answer is "bariiska". The explanation names the trap outright: *"the girl is the
first thing in the sentence and the one doing the eating, and she is **not** the
spotlight. Reaching for the first noun is the habit to break."*

And the over-correction is guarded too — elsewhere in the same lesson,
`Sahra baa …` puts the spotlight *on* the first noun, so "never pick the first
noun" is broken as well. Both errors, not just the obvious one.

---

## The three layers

| Layer | What it is | Scored? | Gates? |
|---|---|---|---|
| **1 — Lesson practice** | One point at a time, blocked, unlimited attempts, immediate metalinguistic feedback | No | No |
| **2 — Homework** | ~12 items mixing this lesson with whatever the review queue says is due. Production-weighted | Recorded, **not shown** | No |
| **3 — Unit test** | ~30 items, cumulative across prior units. 85% criterion, correctives on failure | Yes | **No — see below** |

Two of these carry deliberate deviations, both recorded as such.

**Homework shows no grade.** The learner writes these items, so a percentage
measures how well they remember their own authoring, and self-assessment bias
runs the wrong way at this proficiency —
[lower-proficiency learners overestimate](https://onlinelibrary.wiley.com/doi/10.1111/flan.12379).
What replaces the score is the part that can be acted on: the forms they did not
produce.

The good news is larger than the bad. Student-generated questions produce
medium-to-large effects and
[beat restudy, group discussion and summarising](https://rightquestion.org/resources/research-on-the-impact-of-student-questions-on-learning/),
*regardless of the quality of the questions generated*. **Authoring this course
is itself one of the better-evidenced things the learner can do with the time.**

**The unit test keeps the 85% criterion and drops the lock.** The mastery
literature identifies the criterion and the correctives as the active
ingredients, and both are kept. What went is the block on proceeding, which has
no evidence base for one adult studying alone who can simply stop using the app.
**This is a deviation from the evidence, not an application of it, and is
documented that way.**

---

## How correctness is enforced

The binding constraint — no native speaker, ever — means nothing downstream
catches a wrong form. So it is caught upstream, mechanically.

**Two independent sources per form**, recorded in `src/data/verified-forms.ts`.
Current state: **109 registry forms, 98 with two or more.**

"Independent" is defined, not assumed, because six dictionaries arriving at once
makes it *feel* as though everything has two sources:

- Two citations of one author are one source.
- **Shared authorship across works is shared authorship** — the Hippocrene
  dictionary lists Martin Orwin as a co-author, and Orwin is already a source,
  so it counts as the same one.
- Same publisher is a caution.
- **Unknown provenance is not a source.**
- Somali lexicography descends from few root works, so two dictionaries agreeing
  is weaker evidence than it looks. Prefer a grammar plus a dictionary.
- **Machine translation is never a source** — not Google Translate, not an app,
  not an LLM. Somali is low-resource, so these systems train on the same small
  pool this project already draws from; citing one is circular. An
  [audit of 205 web-crawled language corpora](https://aclanthology.org/2022.tacl-1.4/)
  found at least 15 with no usable text and a significant fraction under 50%
  acceptable quality, concentrated in exactly this tier of language. And a
  translator cannot decline — it can never answer the only question being asked.

One source was rejected outright: an *English–Jiddu–Somali* dictionary.
[Jiiddu is a separate language](https://en.wikipedia.org/wiki/Jiiddu_language),
not a dialect, and the most divergent of the Digil varieties. A file that must
never be cited is safer absent.

### The validator

`npm run validate:course` runs 25 checks and exits non-zero on any error.
It enforces, among others:

- every Somali form in an answer or in prose is registry-verified (`S1`, `S2`)
- no banned linguistics jargon in learner-facing text (`L1`)
- no lesson passes more than three cards without retrieval (`T2`)
- every objective is tested (`E3`); every test item targets a taught objective (`U3`)
- unit tests are genuinely cumulative (`A4`); homework genuinely carries back (`A3`)
- no production item answers with a single-source form (`S6`)

It also emits warnings it deliberately cannot resolve — items answerable by
word-order guessing (`E10`), and examples using unintroduced vocabulary (`V6`).
**These are named as the two places real defects are most likely to slip
through, and manual review of them is a required authoring step.**

### The gates

```bash
npm run gates
```

All four, every time. 109 tests. Lint is at zero errors and that is the
baseline, not an aspiration.

**A green build does not mean the app works.** The worst bug in this project's
history — the first lesson being impossible to complete — compiled cleanly and
passed every check that existed. Anything visible in the browser gets driven in
the browser.

---

## Where the design turned out to be wrong

A method nobody has tested against its own claims is a method nobody has tested.
In August 2026 the design was reviewed against research it did not cite, and the
eight existing lessons were evaluated against four falsifiable criteria written
and committed *before* anything was examined. Findings:

- **PREDICT-before-EXPLAIN was justified by a mechanism that does not hold.**
  The pretesting literature splits factual from conceptual:
  [factual pretesting improves learning, conceptual pretesting does not](https://link.springer.com/article/10.1007/s10648-023-09814-5),
  and conceptual pretest errors are **more** likely to be repeated on the final
  test. Rule-inference prompts are conceptual, so the old justification ran
  backwards. The step stays on the attentional rationale, which is what the
  evidence supports.
- **The print worksheet was justified by a finding about prose comprehension**
  and was a vocabulary recall grid. It had also never once been printed. Deleted.
- **Homework was booked as measurement** without anyone noticing the learner
  wrote the items.
- **The blueprint could not say what the design specified.** Its slot field held
  one value, but the design's own table says Lesson 2 fills *two* boxes — so one
  box was never claimed by anything while Lesson 8 told the learner "every box
  is filled."
- **`waa` was only ever shown in a sentence English translates with "is"**,
  so nothing stopped a learner concluding `waa` means "is".

All are fixed. The evaluation itself returned **4 / 4 pass, no method-level
failure** — with one honest weakness: whether explanation adds anything on top
of structured input cannot be settled by inspection, and needs an A/B
unavailable at n = 1.

---

## Honest limitations

Kept in the design document too, and worth stating up front:

- **No Somali-specific instructional research exists.** Everything here
  generalises from other languages, mostly English-as-L2 and European languages.
- **No native speaker will ever check this content.** Two-source verification
  and confidence tagging reduce the risk; they do not eliminate it. This remains
  the single largest threat to the project.
- **Several findings come from abstracts and meta-analytic summaries**, not full
  texts. Treat directions as reliable and magnitudes as indicative.
- **Effect sizes across different outcome measures are not comparable.** Do not
  rank interventions by the numbers in the tables above.
- **The validator cannot check whether teaching is *good*.** It checks
  structure, density, language, format ratios and sourcing — all necessary, none
  sufficient. A lesson can pass every check and still explain badly.
- **Thresholds are calibrated to known defects**, not derived from research.
- **5 of 95 vocabulary entries still lack a second source**, down from 52.
  Known, tracked, and each remaining one is a specific problem rather than an
  undone lookup — see `docs/SOMALI_SOURCES.md`.

---

## Running it

```bash
npm install
npm run dev
```

The app uses `HashRouter`: lessons are at `/#/lesson/1` through `/#/lesson/8`.

## The documentation

`src/data/authored-lessons.ts` is the course. It is the only source of lesson
content.

| Document | Purpose |
|---|---|
| [docs/WORKING_AGREEMENT.md](docs/WORKING_AGREEMENT.md) | **Read before changing anything.** The rules and the gates |
| [docs/COURSE_DESIGN.md](docs/COURSE_DESIGN.md) | The single source of truth for teaching design |
| [docs/STATE_OF_PLAY.md](docs/STATE_OF_PLAY.md) | What exists, known debt, what is next |
| [docs/SOMALI_SOURCES.md](docs/SOMALI_SOURCES.md) | Every linguistic fact, with citations and the independence policy |
| [docs/POSTMORTEM.md](docs/POSTMORTEM.md) | Why the rules exist — the failures that produced them |
| [docs/LESSON_CONVENTIONS.md](docs/LESSON_CONVENTIONS.md) | How a lesson is written |
| [docs/UI_CONVENTIONS.md](docs/UI_CONVENTIONS.md) | Settled visual taste, and what has been tried and rejected |
