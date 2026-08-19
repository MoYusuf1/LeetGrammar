# Course Design — Single Source of Truth

> **The only document for teaching-overhaul design.** What we teach, how we teach it, how
> we talk about it, and when. If an idea about the course lives anywhere else, it's stale.
>
> (`PONYTAIL_DEBT.md` stays separate: it tracks *code* debt, not teaching design.)
>
> **Status:** design settled, four core decisions made (Part 0), **amended August 2026**
> after a research review — see the `Correction` and `Tension` blocks in §1.16, §3.1 and
> §3.2, plus new §1.17, §1.17b, §1.18, §2.0 and §2.0b. The review itself lived in
> `TEACHING_OPTIONS.md`, which was folded in here and deleted; it is in git history at
> commit `28ce3566` if the full reasoning and options are wanted.
>
> ### ⚠️ Built scope is narrower than this document
>
> This is the *design target*: 14 lessons in 4 units. **What is actually built is
> 8 lessons in 2 units** — Unit 1 (Sounds, Naming Things, Saying "The", Pronouns
> & Subject Marker) and Unit 2 (The Signal Words, Squishing, Action Words,
> Putting It In Order). See `src/data/authored-lessons.ts`, which is
> authoritative for what exists, and `STATE_OF_PLAY.md` for the inventory.
>
> *This block said "4 lessons in 1 unit" until August 2026, long after Unit 2
> shipped. It was believed and acted on. If you are reading a claim about scope
> in this document, check it against the data before building on it.*
>
> The narrowing was deliberate. A previous pass produced all 14 lessons as
> mostly-empty stubs — 3 exercises across the whole course, unverified Somali,
> and a first lesson that could not be completed. Scope was cut to what could be
> sourced and finished properly. Lessons 5–14 below are **planned, not written**,
> and are represented nowhere in the UI.
>
> Sourcing rules referenced here are enforced by `npm run validate:course`
> against `src/data/verified-forms.ts`; see `docs/SOMALI_SOURCES.md`.

---

# Part 0 — Decisions made

Four decisions, taken together, define the project. They are mutually reinforcing:
**a clean rebuild of a smaller, verified, plain-language course.**

| # | Decision | Consequence |
|---|---|---|
| **D1** | **Retire the converter.** Author all lesson content directly as TypeScript. | `scripts/course-to-app.cjs` is deleted. `COURSE.md` stops being the pipeline source and becomes reference material only. |
| **D2** | **Author fresh from verified sources** rather than auditing existing text. | Nothing inherits an unknown error rate. Every Somali form traces to ≥2 published sources. |
| **D3** | **Narrow permanently to a core course** (~14 lessons). | Advanced topics are out of scope, not deferred. No half-finished material. |
| **D4** | **Plain English only**, technical terms confined to a separate glossary page. | Zero linguistics jargon in lesson text. Opt-in bridge for outside resources. |

### Why these, specifically

**D1** — The converter doesn't just lose fidelity, it *fabricates*. Traced a broken item
(`['Hadii aad ____ cun, ____ buu', 'imaan.']`) back to a **teaching** slide about verb
moods: the script split a sentence at a comma and offered the halves as multiple-choice
options. It also can't express anything the new model requires — per-item metalinguistic
feedback, objective tags, or the notice→complete→produce ladder.

**D2** — `COURSE.md` uses `Hadii` **31 times** and `Haddii` **once**;
[Wiktionary](https://en.wiktionary.org/wiki/haddii) gives *haddii* as the word for "if"
and lists no single-d variant. With no native speaker available ever, auditing 271KB of
unknown-provenance text costs more than authoring less text from known-good sources.

**D3** — See §1.11. Depth outperformed breadth by roughly two-thirds of a year of
instruction; breadth alone showed *no* advantage.

**D4** — Measured jargon in learner-facing text: agreement ×59, register ×21, imperative
×19, interrogative ×17, subjunctive ×14, copular ×13, topicalization ×12. The learner was
being asked to acquire English linguistics terminology as a prerequisite to Somali.

---

## The learner

One person, building this for himself.

- **Not a Somali speaker**, and **no native speaker available to check anything — ever.**
  Confirmed as impossible, not merely difficult, including for a one-off audit of the
  hundred-odd forms actually taught. **But this is two constraints, and only one binds —
  see below.**
- **Adult, analytical, wants explicit rules.** Wants *the formula*.
- **Text-only.** Listening happens outside, on YouTube. The app's job is to make the
  formula legible enough that real speech becomes parseable.
- **No teacher.** All feedback must be built into the material.
- **Somali is genuinely hard for English speakers**: SOV word order, a focus-particle
  system with *no English equivalent*, four noun cases, gender agreement, gender polarity.

### The missing native speaker is two problems, not one

Treating them as one made the whole thing look hopeless. Separated, one is nearly solved and
the other is the real risk.

**Feedback — does a human need to correct the learner?** No, and the evidence is strong:
[computer-mediated corrective feedback shows a large overall effect, **d = 1.21**, with
computer-assisted instruction outperforming
face-to-face](https://journals.sagepub.com/doi/abs/10.1177/07356331211064066) in these
comparisons. §1.7's commitment to metalinguistic explanation on every item is the
well-supported version of this. **This document previously overstated the cost of the
missing teacher.**

**Content truth — is the Somali itself correct?** This is the part that does not move, and
§1.12 is why it matters: a wrong form learned now competes with the right one indefinitely,
and nothing downstream will ever catch it. The two-source rule and *cut what you cannot
source* are therefore **more** load-bearing than they look, not less.

What partially substitutes, in order of value:

- **A corpus.** Dictionaries record what a lexicographer claims; a corpus records what
  Somalis wrote. [soWaC](https://www.sketchengine.eu/sowac-somali-corpus/) is 71M words of
  Somali web text, POS-tagged, with a concordancer. It is far better at *dis*confirming than
  confirming — a form absent from 71M words triggers the rule we already have — and it is
  the only thing that touches the highest-risk content we produce: **example sentences we
  assembled ourselves**, which validator checks `E10`/`V6` flag and cannot automate. Note
  that the `hadii`/`haddii` finding in D2 was already a corpus study, run against the wrong
  corpus.
- **Dictionaries**, with independence accounted for. See `SOMALI_SOURCES.md`.
- **Audio**, if obtainable. A phonemic orthography means recordings and spelling check each
  other, which would not work for English.

**Never a source: machine translation, translation apps, or an LLM.** Not a preference — a
rule, recorded in `WORKING_AGREEMENT.md`. Somali is low-resource; the systems are trained on
the same small pool this project already draws from, so citing them is circularity that
*defeats* the two-source check rather than failing it. [An audit of 205 web-crawled language
corpora](https://aclanthology.org/2022.tacl-1.4/) found at least 15 with no usable text and
a significant fraction under 50% acceptable quality, concentrated in exactly this tier of
language. And structurally, a translator is a generator: it cannot decline, so it can never
answer the only question being asked of it.

---

# Part 1 — The evidence base

Everything downstream traces to one of these.

### 1.1 Explicit instruction beats implicit — strongly
[Norris & Ortega (2000)](https://onlinelibrary.wiley.com/doi/abs/10.1111/0023-8333.00136)
found focused instruction produces **large** gains, explicit beating implicit;
[Goo et al.](https://benjamins.com/catalog/sibil.48.18goo) (34 studies through 2011)
replicated it. **→ State the rule plainly. Don't make the learner infer and hope.**

### 1.2 Practice testing and distributed practice are the *only* two "high utility" techniques
[Dunlosky et al. (2013)](https://journals.sagepub.com/doi/abs/10.1177/1529100612453266)
rated ten techniques; only **practice testing** and **distributed practice** scored *high*.
Rereading, highlighting, summarizing — what most self-study is — scored **low**.
**→ Homework and tests are the highest-leverage component, not a bolt-on.**

### 1.3 Retrieval beats restudying; cumulative testing works
Retrieval [outperforms repeated study](https://blog.techtranslab.com/en/retrieval-practice-language-learning);
[cumulative tests](https://onlinelibrary.wiley.com/doi/10.1002/tesq.3391) folding old
material into new enhance L2 vocabulary learning. **→ Tests are a learning event.
Cumulative by default.**

### 1.4 Spacing works; don't over-engineer it
[Kim & Webb (2022)](https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12479) — 98
effect sizes, N = 3,411 — **medium-to-large** effect for vocabulary *and grammar*. Longer
intervals won on delayed tests. **Equal and expanding intervals were statistically
equivalent.** **→ Use simple fixed intervals. Expanding schedules aren't proven better and
cost far more to build.**

### 1.5 Interleaving is NOT unconditionally good
[Hwang (2025)](https://onlinelibrary.wiley.com/doi/10.1111/lang.12659) — "***Undesirable***
Difficulty of Interleaved Practice" — found that below a threshold of prior achievement,
early interleaving **prevents learners forming solid form–meaning associations at all**.
Interleaving benefits are also weaker for explicit, rule-based content. *(Paywalled;
working from abstract + secondary summaries.)*
**→ Block first, interleave later.** A beginner is exactly the at-risk learner here.

### 1.6 Worked examples first, then fade
[Cognitive load theory](https://link.springer.com/article/10.1007/s11251-009-9102-0):
novices learn better from worked examples; the **expertise reversal effect** means that
same guidance hurts later. Prescription: **adaptive fading**.
**→ Never jump to blank-page production.**

### 1.7 Explicit/metalinguistic feedback wins — especially for features absent from English
[Meta-analysis](https://link.springer.com/article/10.1186/s40862-020-00097-9): explicit
correction and metalinguistic explanation beat implicit recasts, *particularly* for
features **absent from the learner's L1**.
**→ Somali particles have no English analogue. Never "try again" — always *why*.**

### 1.8 Recall > recognition; production > reception
[Retrieval format research](https://www.degruyterbrill.com/document/doi/10.1515/iral-2015-0022/html):
recall beats recognition; productive practice builds *both* productive and receptive
knowledge. **→ Multiple choice is the weakest tool available.** Currently 76% of our items.

### 1.9 Mastery learning: gate on prerequisites
Bloom's mastery learning: effect sizes **0.50–0.94**. Criterion threshold (**80–90%**),
formative assessment, **correctives** on the specific unmet objectives, reassessment.
**→ Unit tests gate. Failure routes to targeted remediation.**

### 1.10 Input Processing: "first noun = subject" is a Somali trap
[VanPatten](https://en.wikipedia.org/wiki/Input_Processing_theory) identifies learner
defaults. Two matter enormously:
- **Primacy of Meaning** — learners process meaning before form; function words get
  filtered out.
- **First Noun Principle** — learners assume the first noun is the subject.

**→ The most Somali-specific finding here.** Both are actively wrong for Somali. Particles
*are* function words carrying the core signal — Primacy of Meaning predicts they get
**discarded as noise**, which plausibly explains "the markers seem random." And in
*Cuntada baa gabadhu cunaysay* ("the food, the girl was eating") the first noun is the
**object** — First Noun predicts reading it as *"the food was eating the girl."*
**Particle lessons must use structured input where the particle is the only disambiguator,
engineered so word-order guessing fails.**

### 1.11 Depth beats breadth — substantially
[Schwartz et al. (2009)](https://onlinelibrary.wiley.com/doi/10.1002/sce.20328): students
who covered **at least one topic in depth** (a month or more) earned higher later grades.
Breadth-without-depth showed **no advantage**, and a significant **disadvantage** in
biology. Depth-present/breadth-absent students held an edge equal to **two-thirds of a
year of instruction**.
**→ Direct basis for D3.** A narrow course taught properly beats 26 lessons taught thinly.

### 1.12 Errors entrench and resurface
The [hypercorrection literature](https://link.springer.com/article/10.3758/s13423-011-0173-y)
finds high-confidence errors *are* correctable short-term — but corrections decay, and on
delayed tests learners **reproduce the original error**.
**→ Direct basis for D2.** With no native speaker to ever catch a mistake, wrong Somali
learned now doesn't merely fail to help — it competes with the correct form indefinitely.

### 1.13 How you introduce material — the largest effect sizes here
[Luiten, Ames & Ackerson (1980)](https://journals.sagepub.com/doi/abs/10.3102/00028312017002211)
(N = 135 studies) and a [112-study meta-analysis](https://www.tandfonline.com/doi/abs/10.1080/00220973.1983.11011862)
found **advance organizers** — a framing structure presented *before* new material —
reliably improve learning and retention. Effect sizes by type: **graphic organizers 1.24,
expository (prose) organizers 0.80.** Activating prior knowledge beforehand isn't
motivational garnish; it *prepares the cognitive architecture that makes meaningful
learning possible*.

**→ These are the biggest numbers in this document, and they're about delivery, not
content.** A structural/visual organizer beats a prose preamble by a wide margin. Every
lesson must open with one.

### 1.14 Working memory holds ~4 items, not 7
Cowan's work puts real working-memory capacity at **3–5 slots (~4)**, not the folk-wisdom
7±2. Mayer's **Segmenting Principle**: people learn better when a continuous lesson is
broken into learner-paced segments.

**→ Hard cap on new material per lesson.** Current lessons carry 8–14 teach cards each —
far over budget. Card-by-card UI already satisfies segmenting; the *content density* does
not.

### 1.15 Mobile learning works, with a session-length floor
MALL meta-analyses report **large** effects (e.g. [g = 0.792 for listening](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9479751/);
large for speaking), with **intervention duration a significant moderator**. One study set
**≥5 minutes** as the threshold for "meaningfully active" engagement in a single session.

**→ Design the session, not just the lesson.** Target 5–10 focused minutes, always
cleanly resumable.

### 1.16 Screens comprehend worse than paper — and the mechanism is overconfidence
Multiple independent meta-analyses (Clinton 2019, n=29; Delgado 2018, n=54; Díaz 2024,
n=49; plus a [network meta-analysis](https://link.springer.com/article/10.1007/s10639-025-13843-8)
comparing smartphones specifically) find **screen inferiority** for comprehension. The
differences are modest but consistent. Mechanism: a **metacognitive deficit** — readers are
*overconfident* on screens, believing they understood when they didn't. The "shallowing
hypothesis" adds that habitual fragmented phone use trains shallow processing by default.

**→ The one real pedagogical cost of going mobile-first.** But the mitigation is something
we already committed to: **retrieval practice directly punctures the illusion of
understanding**. Passive reading on a phone is the weakest possible mode; frequent forced
retrieval is the fix.

> **Correction (Aug 2026).** This section used to end by saying the finding "independently
> justifies the existing print/worksheet feature as the deep-reading channel." **It does
> not.** Screen inferiority is a result about comprehension of *continuous prose*; the
> worksheet was a vocabulary recall grid, so the finding never applied to it. The worksheet
> has been deleted — it had also never once been printed. What survives is §1.17b: there is
> a real case for a handwriting channel, it is about word form rather than deep reading, and
> nothing currently implements it.

### 1.17 Successive relearning — retrieval and spacing are stronger combined
§1.2 names practice testing and distributed practice as the only two high-utility
techniques. **Successive relearning is the protocol for doing both at once**: retrieval to a
criterion (at least one correct recall) in *each of several spaced sessions*. Rawson &
Dunlosky found that [recalling an item correctly once in each of three spaced sessions
produced **more than twice** the recall of getting it right three times in one
session](https://www.retrievalpractice.org/strategies/2018/successive-relearning); three
sessions capture most of the benefit, and the effect [holds on real course
exams](https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.3699).

On interval size, [Cepeda et al. (2008), N > 1,350](https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf)
give a principle rather than a ladder: the optimal gap is a **proportion of the retention
interval you actually want** — ~20% at a few weeks, falling to 5–10% at a year.

**→ Homework carry-back and spaced review are not two mechanisms. They are one, done
badly.** Merge them. And see §2.0: the retention target is *permanent*, which sets how far
the ladder has to run.

### 1.17b Handwriting builds word form — the case for a channel we do not have
The [2024 meta-analysis of handwritten vs typed notes](https://eric.ed.gov/?id=EJ1430416&pg=50&q=g)
(24 studies) found a small achievement advantage for handwriting, **g = 0.248**, while
typing won on volume recorded (g = 0.919). Thin on its own. The L2-specific finding is
better aimed: [writing target words by hand directs attention to word
*form*](https://euroslajournal.org/articles/10.22599/jesla.44) and beats meaning-focus for
word learning, because semantic elaboration consumes the resources word-form encoding
needs. Hand-copying letter strings also builds **letter–sound mapping**.

That last part matters here specifically: **Somali orthography is near-perfectly phonemic** —
[one-to-one consonants](https://en.wikipedia.org/wiki/Somali_Latin_alphabet), long vowels
written doubled, no p/v/z because the sounds do not exist. Letter–sound mapping in Somali is
a *solvable problem*, unlike in English.

**→ If a handwriting channel is ever built, build it on this, and put it where the learner
already is.** The deleted worksheet was not that; it asked for English meanings, when the
evidence says the value is in writing the Somali.

### 1.18 The scale of the target, stated honestly
Three numbers that between them decide what this app can claim:

- FSI puts Somali at roughly [**1,100 class hours**](https://www.fsi-language-courses.org/blog/fsi-language-difficulty/)
  to professional working proficiency. That is a classroom figure at a far higher target,
  so it is a scale check, not a prediction — but it is the right order of magnitude.
- Reading authentic text needs [**95% lexical coverage ≈ 3,000–4,000 word families**, 98% ≈
  6,000–8,000](https://onlinelibrary.wiley.com/doi/10.1111/j.1540-4781.2011.01146.x). The
  planned vocabulary track is ~500 words. Below threshold, graded material is not optional.
- Listening: [aural decoding predicts **46.9% of the variance** in L2 listening
  comprehension](https://www.researchgate.net/publication/391446594_Aural_Decoding_and_Comprehension_in_L2_Listening),
  and orthographic knowledge feeds listening through decoding.

**→ "Making real speech parseable" is not something fourteen lessons deliver, and this
document will stop implying it does — see §2.0.** But the third number is the opening: a
phonemic orthography makes decoding a closed problem, and decoding is the bridge to the
listening that happens elsewhere.

---

# Part 2 — WHAT we teach

## 2.0 What "done" means, and what this app is not for

Previously unstated, which made every other decision unevaluable.

**The app delivers two things:**

1. **Formula literacy.** Given a written Somali sentence in the taught patterns, the learner
   can say what each piece is doing. This is what D3 and §1.11 buy — depth over breadth,
   fourteen lessons taught properly.
2. **Decoding fluency.** The learner can read written Somali aloud, accurately, at speed.
   Justified by §1.18: aural decoding carries ~47% of listening variance, and Somali's
   phonemic orthography makes this a closed problem rather than an endless one.

**The app does not deliver, and will not claim to:**

- **Comprehension of authentic Somali text.** That needs 3,000–4,000 word families (§1.18).
  The course teaches a fraction of that and always will.
- **Listening comprehension.** It is text-only by design. Listening happens on YouTube.
- **Speaking.** Never in scope.

The honest framing: *this app makes the formula legible and the spelling readable.
Comprehension comes from reading and listening done elsewhere.* It is an on-ramp, and an
on-ramp is a real thing to be.

## 2.0b The retention target is permanent

Stated by the learner, and it changes the shape of the app rather than a constant in it:
**learn Somali for good.**

Two consequences:

1. **The interval ladder does not terminate.** Per §1.17, gap size scales with the retention
   interval you actually want. A ladder stopping at 90 days encodes a target of about a
   year. For permanent retention it must keep widening — 1, 3, 7, 21, 60, 180, 365 days,
   then annually, indefinitely. This does not conflict with §1.4: Kim & Webb found equal and
   expanding schedules equivalent, which is about the ladder's *shape*. What changes is its
   *span*.
2. **Nothing graduates.** "Mastered" is a state that decays back into the rota, not an exit.

And the consequence nobody had written down: **finishing the course is not the end state, it
is the start of the maintenance regime.** The app has to still be useful on the day there
are no lessons left. Any design that assumes a completion event is wrong.

## 2.1 Two tracks, deliberately decoupled

The old design tied vocabulary 1:1 to lessons. With a 14-lesson core that would mean
**~36 new words per lesson** — far beyond what a single session can absorb, and it would
squander the spacing benefit (§1.4) by massing words into one card.

So: **grammar and vocabulary run as two interlocking tracks.**

| Track | Unit | Pacing |
|---|---|---|
| **Grammar** | 14 lessons in 4 units | Sequential, mastery-gated |
| **Vocabulary** | ~500 words | Spaced-repetition track, ~8–10 new words per session, independent of lesson position |

They interlock rather than nest: lesson examples draw only on vocabulary already
introduced, but finishing a lesson doesn't require finishing a word batch.

Per-word scheduling has **no engine waiting for it**. This paragraph used to
promise that the vocabulary track would finally use the SM-2 `srsCards`
primitives in `progress-store.ts`; that engine was deleted instead, because
keeping a finished-looking implementation alive on the strength of a future
phase is the exact failure `POSTMORTEM.md` records. If this track is built,
write its scheduling against what it actually needs — starting from the
fixed intervals in `lib/review.ts`, which is what lesson review already uses.

## 2.2 Vocabulary sourcing

**Coverage reality:** top 1,000 words ≈ 95% of *spoken* language; 2,000 ≈ 96%; 5,000 ≈ 98%.
500 words is a real first milestone (Zipf's law) but **is not fluency** — the app should
say so rather than oversell it.

**No frequency ground truth exists.** Two real Somali corpora exist (soWaC; *Bangiga Af
Soomaaliga*, 18.9M tokens) but both sit behind Sketch Engine's paid tooling. Public "top
500" pages ([learn101.org](http://learn101.org/somali_voc500.php)) are **topic-organized
phrasebooks**, not frequency rankings. We must *construct* a defensible list.

**Three converging signals**, in priority order:
1. **Structural necessity** — function words (pronouns, particles, prepositions,
   conjunctions) are frequent *by construction*.
2. **Semantic core** — the [Wiktionary Somali Swadesh list](https://en.wiktionary.org/wiki/Appendix:Somali_Swadesh_list)
   (~207 core concepts) as an academically-vetted floor.
3. **Practical coverage** — survival vocabulary.

**Per D2, every word requires ≥2 independent published sources** before inclusion.
Candidates: Wiktionary entries (readable HTML), the
[Lexilogos aggregator](https://www.lexilogos.com/english/somali_dictionary.htm) (points to
*Qaamuuska Af-Soomaaliga* by Puglielli & Mansuur). Several PDF dictionaries found (KASC,
"opentran" 3500-list) **could not be parsed by available tooling** — recorded as
known-but-inaccessible rather than silently dropped.

Every word carries a **confidence tag** — `verified` (2+ sources), `single-source`,
`uncertain` — **surfaced in the UI, not buried.** As exposure grows the learner's own
intuition becomes a real validation signal, and tagging makes specific words correctable
later instead of requiring a full re-audit.

---

# Part 3 — HOW we teach it

## 3.1 The lesson loop

The original loop started at "explain," which skipped
[Gagné's](https://www.niu.edu/citl/resources/guides/instructional-guide/gagnes-nine-events-of-instruction.shtml)
first three events entirely — and event 3 (*stimulate recall of prior learning*) is
precisely the mechanism that makes lessons feel connected rather than like a list. Fixed:

**Every lesson opens (≈45 seconds, three cards max):**

```
0a. BLUEPRINT   the running sentence-shape diagram,       (§1.13 graphic AO = 1.24)
                with today's slot highlighted
0b. CONNECT     "Last lesson: X. That gave you ___.       (§1.13 prior-knowledge
                Today we add ___."                         activation; Gagné 3)
0c. PROMISE     one concrete sentence you'll be able to    (Gagné 2 — objective,
                build by the end — in Somali               stated as a capability)
```

**Then, per grammar point (max one point + ≤4 new items per lesson — §1.14):**

```
1. PREDICT      guess before the rule is revealed         (§1.16 punctures screen
                                                           overconfidence; §1.12
                                                           hypercorrection)
2. EXPLAIN      plain-English rule, stated directly       (§1.1)
3. SHOW         worked example, fully annotated           (§1.6)
4. NOTICE       structured input — comprehend only;       (§1.10)
                the answer hinges on the target form
5. COMPLETE     partially-scaffolded production           (§1.6)
6. PRODUCE      full production, no scaffold              (§1.8)
                — steps 4–6 BLOCKED on this one point     (§1.5)
7. FEEDBACK     metalinguistic explanation every time,    (§1.7)
                whether right or wrong
8. PAYOFF       build the exact sentence promised in 0c   (closes the loop)
```

**Above the lesson:**

```
9.  HOMEWORK    mixed retrieval across this lesson,       (§1.2, 1.3)
                +30% carried back — first interleaving
10. UNIT TEST   cumulative, criterion-referenced 85%      (§1.3, 1.9)
11. CORRECTIVES remediate missed objectives only,         (§1.9)
                then retest with fresh items
12. SPACED      prior units resurface, fixed intervals    (§1.4)
    REVIEW
```

Two orderings are deliberate and load-bearing:

- **PREDICT before EXPLAIN.** It directs attention to the target form in the material that
  immediately follows, which is the mechanism the prequestion literature actually supports.
  It costs one tap. **See the correction below — the justification here used to be
  different and was wrong.**
- **6 → 9.** Interleaving is withheld until each piece is blocked-practiced to solidity
  (§1.5).

> **Correction (Aug 2026) — PREDICT.** This step was previously justified by claiming a
> wrong high-confidence guess "produces the hypercorrection benefit (§1.12)" and antidotes
> screen overconfidence (§1.16). **The pretesting literature does not support that for the
> content this course teaches.** The [EPR review of prequestioning and pretesting
> effects](https://link.springer.com/article/10.1007/s10648-023-09814-5) finds that factual
> pretesting improved learning while **conceptual pretesting did not enhance conceptual
> learning** — and that **conceptual pretest errors were significantly more likely to be
> repeated on the final test**. A 2025 [multilevel meta-analysis of
> prequestions](https://link.springer.com/article/10.1007/s10648-025-10075-7) adds that the
> benefit is confined to the specific information asked about, with no general lesson-wide
> gain.
>
> Rule-inference prompts ("guess which word marks the subject") are conceptual. For those,
> the old justification runs *backwards* — §1.12's hypercorrection concern becomes an
> argument against, not for. **PREDICT stays, on the attentional rationale only, and
> factual prompts are preferred over rule-inference ones where a lesson allows the
> choice.**

> **Tension worth knowing about — EXPLAIN vs NOTICE.** §1.1 says explicit instruction wins,
> and the whole delivery model follows from it. But the processing-instruction literature
> that §1.10 rests on found that [the benefit came from the **structured input activities**,
> not from the explicit
> explanation](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/abs/explanation-versus-structured-input-in-processing-instruction/CADC0357472A2FF7A8195A3A58A8E602) —
> strip the explanation and learners still gain — and that [PI improved comprehension where
> traditional instruction improved only
> production](https://www.researchgate.net/publication/236032459_The_effectiveness_of_processing_instruction_on_L2_grammar_acquisition_A_meta-analysis).
>
> These two findings pull against each other and this document does not resolve them. What
> follows practically: **NOTICE carries more weight than its position in the list suggests,
> and EXPLAIN less.** A lesson short on cards should cut explanation before it cuts
> structured input. Lesson 5 is the test of this.

## 3.2 The reinforcement architecture

Three layers with genuinely different jobs.

**Layer 1 — Lesson Practice** (inside lesson, blocked)
One point at a time; ladder notice → complete → produce; immediate metalinguistic
feedback. **Not scored, not gated.** Unlimited attempts. This is learning, not measurement.

**Layer 2 — Homework** (end of every lesson, first interleaving)
~10–15 items across all points from the lesson, plus **~30% carried back** from earlier
lessons. Production-weighted; minimal MCQ. Recorded but **not presented as a verdict**, and
does not gate. Retryable with fresh items.

> **Homework is instruction, not measurement — because the learner writes it.** Nothing in
> this document used to acknowledge that the author and the learner are the same person.
> Retrieval practice needs retrieval to be effortful, and an item whose answer and
> distractors you chose yourself is not. Self-assessment bias runs the same way: the
> consistent finding is that [lower-proficiency learners
> **overestimate**](https://onlinelibrary.wiley.com/doi/10.1111/flan.12379).
>
> The good news is larger than the bad. Student-generated questions produce **medium-to-large
> effects** on comprehension and recall and [beat restudy, group discussion and
> summarising](https://rightquestion.org/resources/research-on-the-impact-of-student-questions-on-learning/),
> *regardless of the quality of the questions generated*. **Authoring this course is itself
> one of the better-evidenced things the learner can do with the time.**
>
> Three consequences: the score is recorded but never shown as a judgement; a **minimum
> delay** separates authoring an item from sitting it (§1.17 gives the principle — a
> proportion of the retention target); and at least one measure must come from **outside**
> what the learner wrote — a Nilsson exercise, a graded text, a page of Orwin.

**Layer 3 — Unit Test** (end of unit, cumulative)
~25–30 items: this unit's objectives **plus** cumulative items from prior units.
**85% is the criterion**, and below it the learner is routed to **correctives** targeting
the specific failed objectives, then **retest with different items**.

> **The criterion stays; the hard lock goes.** Mastery learning is well supported — [36
> studies, average effect 0.59, with higher thresholds yielding greater
> gains](https://www.structural-learning.com/post/mastery-learning) — and the active
> ingredients it identifies are the *criterion* and the *correctives*, both of which are
> kept. What is dropped is the block on proceeding.
>
> **This is a deviation from the evidence, not an application of it.** The mastery research
> comes from gated classroom designs. It is traded for adherence in a solo adult learner who
> can simply stop using the app, and it should not be written up as an improvement.

**Cross-cutting — Spaced Review**
Merged with Layer 2's carry-back rather than run alongside it (§1.17): carry-back draws
from the due queue, so one mechanism has two faces. Intervals run to the permanent-retention
ladder in §2.0b, and no item graduates out.

---

# Part 4 — DELIVERY: plain English only (D4)

## 4.1 Rules

1. **No technical terms in lesson text.** Not demoted, not parenthesized — absent.
2. **Never define a term with another term.** Lead with a Somali example and what it *does*.
3. **Concepts still get names — plain ones**, used consistently. You can't say "the thing
   where the verb ending changes based on who's doing it" fifty times.
4. **A standalone glossary page** maps plain names → technical ones, for cross-referencing
   YouTube, dictionaries, or Nilsson's grammar. Opt-in, never required, never inline.
5. **Test the concept, never the term.** No item may ask "what is the subjunctive?" Items
   ask the learner to recognize or produce actual Somali. **Mechanically checkable against
   the item bank.**

## 4.2 Term translation

| Technical | Plain (used in lessons) |
|---|---|
| agreement | **matching** — the verb matches who's doing it |
| subjunctive | **the -o form** (wishes / purpose) |
| imperative | **command form** |
| interrogative | **question form** |
| copular / predicate nominative | **linking** — `X waa Y` = "X is Y" |
| existential | **"there is / there are"** |
| topicalization | **fronting** — putting it first for emphasis |
| derivational morphology | **word-building** |
| register | **formal vs. casual** |
| particle | **signal word** |
| determiner | **the/a/this/that words** |
| transitive / intransitive | **takes an object / doesn't** |
| nominative / absolutive | **subject form / base form** |
| morpheme | **word piece** |
| modality | **wants, musts & maybes** |
| aspect | **finished vs. ongoing** |

For the four particles, reuse the old workbook's plain names — they were a good instinct:
**`waa` = statement · `baa`/`ayaa` = focus · `waxa` = spotlight · `ma`/`miy-` = question.**

*Open question, deferred:* the case system (nominative/absolutive) may be droppable
entirely for this course — taught as "the subject form has a different ending," never named.

---

# Part 4B — The Blueprint: how lessons cohere into units

**The problem this solves.** A course can be correctly sequenced and still feel like a
list of unrelated topics. What makes a unit *feel* like a unit is a single visible thing
that grows. Per §1.13, a **graphic** advance organizer (ES **1.24**) substantially
outperforms a prose one (0.80) — so the connective tissue should be a *diagram the learner
sees every single lesson*, not a paragraph explaining how things relate.

**The device.** One running sentence-shape diagram — the **Blueprint** — opens every
lesson, with today's contribution highlighted. It is the same four boxes all course long:

```
┌───────┬────────┬────────┬──────┐
│  WHO  │ SIGNAL │  WHAT  │  DO  │
└───────┴────────┴────────┴──────┘
   Cali     wuu              cunay
```

This *is* "the formula." Every lesson adds exactly one thing to it, and the learner can
always see how much of the shape they now own.

## 4B.1 Blueprint progression

Each unit gets a one-line identity, and every lesson is a visible move within it.

| Unit | Identity | Lesson | What it adds to the Blueprint |
|---|---|---|---|
| **1** | **Fill the boxes** | 1 Sounds | *(pre-blueprint — learning to read the pieces)* |
| | | 2 Naming Things | `WHO` / `WHAT` can hold a noun |
| | | 3 The, A, This, That | those boxes can be made definite |
| | | 4 Pronouns | `WHO` can be a pronoun instead |
| **2** ⭐ | **Assemble the shape** | 5 The Four Signals | **`SIGNAL`** — the box that makes Somali *Somali* |
| | | 6 Squishing | `SIGNAL` fuses with `WHO` → `wuu`, `bay`, `wuxuu` |
| | | 7 Action Words | **`DO`** — and it matches `WHO` |
| | | 8 Building a Sentence | the **full shape**, and how `SIGNAL` reorders the boxes |
| **3** | **Bend the shape** | 9 When It Happens | `DO` changes for time |
| | | 10 Saying "Not" | `SIGNAL` goes negative |
| | | 11 Asking Questions | `SIGNAL` becomes a question |
| **4** | **Decorate the boxes** | 12 Describing Words | `WHO`/`WHAT` can carry a description |
| | | 13 Numbers & Amounts | `WHO`/`WHAT` can carry a count |
| | | 14 Where & With What | a new `WHERE` box |

**Note what this reveals about Unit 3.** Negation and questions belong together not because
a syllabus says so, but because in Somali **both operate on the same slot** — the signal.
Tense operates on the verb slot. That's a real structural grouping the learner can *see*,
which is exactly the "intuitive and palatable" property being asked for. The unit names
follow from the structure rather than being imposed on it.

## 4B.2 Delivery rules that follow

1. **One idea per card.** Non-negotiable (§1.14 segmenting).
2. **≤4 new items per lesson.** Working memory holds ~4 (§1.14). Current lessons carry
   8–14 teach cards — they must shrink, not just get rewritten.
3. **Retrieval at least every third card.** Passive scrolling on a phone is the weakest
   possible mode (§1.16); frequent forced recall is the antidote.
4. **Predict before reveal**, wherever a rule is about to be stated (§1.16, §1.12).
5. **Every lesson opens on the Blueprint and closes on the promised sentence.** The learner
   should never wonder why they're being shown something.
6. **Each lesson names its move in plain words** — "today the SIGNAL box goes negative" —
   not "today: negation."

## 4B.3 Mobile-first constraints (D: mobile-first)

| Constraint | Rule | Source |
|---|---|---|
| Session length | Lessons sized for **5–10 focused minutes**; always resumable mid-lesson | §1.15 (≥5 min = meaningful engagement) |
| Screen size | Blueprint must be legible at **360 px wide** — a compact stacked row, never a wide tree or table | practical |
| Interaction | All actions thumb-reachable at the bottom; no horizontal scroll, no pinch-zoom, no hover-dependent UI | practical |
| Typing | Production items must accept **short** typed answers; long free-text is punishing on a phone keyboard — prefer word-tap assembly (`unscramble`) where the target is a full sentence | §1.8 (keep production) + practical |
| Reading depth | Screens comprehend worse than paper (§1.16) — so **the app is the retrieval channel**. ~~Print/worksheets are the deep-reading channel~~ — **retracted, see the §1.16 correction**: that finding is about continuous prose and the worksheet was a recall grid. The worksheet is deleted; §1.17b has the case for a handwriting channel if one is ever built | §1.16, §1.17b |
| Interruption | Assume every session can be interrupted at any card — never lose state, never require finishing a lesson in one sitting | practical (existing resume feature) |

---

# Part 5 — The core course (D3)

14 lessons, 4 units. Scope is **permanent**, not deferred — advanced topics are out.

The test for inclusion: *can the learner parse and build a real Somali sentence without
it?* If yes, it's out.

| Unit | # | Lesson | Why it's core |
|---|---|---|---|
| **1** — Building blocks | 1 | Sounds & Spelling | Can't read anything without it |
| | 2 | Naming Things | Nouns + he-words/she-words |
| | 3 | The, A, This, That | Noun phrases |
| | 4 | I, You, He, She, We, They | Pronouns — direct setup for Unit 2 |
| **2** — The sentence formula ⭐ | 5 | The Four Sentence Signals | `waa`/`baa`/`waxa`/`ma` — the thing that makes Somali feel random |
| | 6 | Squishing Signals & Pronouns | `wuu`/`way`/`baan`/`wuxuu` — fusion |
| | 7 | Action Words | Verbs + person matching |
| | 8 | Building a Sentence | SOV, and how signals reorder it |
| **3** — Saying more | 9 | When It Happens | Tense |
| | 10 | Saying "Not" | Negation — too frequent to omit |
| | 11 | Asking Questions | Questions |
| **4** — Filling it out | 12 | Describing Words | Adjectives |
| | 13 | Numbers & Amounts | Numerals |
| | 14 | Where & With What | Prepositions |

**Unit 2 is the spine.** It's where "the formula" gets assembled, it's the direct fix for
the original complaint, and per §1.11 it's the unit that should go deepest.

**Cut permanently:** mood/modality, verb extensions & voice, irregular verb forms,
copular/existential as a separate topic, conjunctions & discourse, adverbs, complex
sentences, topicalization/register, derivational morphology, semantic fields,
texts & discourse.

---

# Part 6 — What changes in the app

| Area | Current | Target |
|---|---|---|
| Content source | `COURSE.md` → generator → `teaching-content.ts` | hand-authored TypeScript; generator deleted |
| Card flow | intro → vocab → teach → practice → summary | adds `notice` + `example`; practice becomes a blocked ladder |
| Practice items | 76% multiple-choice, 92/121 filler hints | production-weighted, every item with real metalinguistic feedback |
| Language | jargon throughout | plain English; separate glossary page |
| Assessment | in-lesson practice only | 3 layers + gating unit tests + correctives |
| Progression | any lesson, any time | mastery-gated at unit boundaries |
| Vocabulary | 1:1 with lessons | independent track — **deferred**, see §2.0; at ~500 words it cannot reach a comprehension threshold, so its job needs redefining as word-form and decoding practice first |
| Lesson opening | straight into content | Blueprint → connect-to-last → promised sentence |
| Lesson density | 8–14 teach cards | **≤4 new items**, one idea per card |
| Card types | intro/vocab/teach/practice/summary | + `blueprint`, `predict`, `notice`, `payoff` |
| Data model | `PracticeExercise` on cards | + objective tags, unit definitions, test banks, confidence tags, blueprint state per lesson |

The `PracticeExercise` union added in the last overhaul (`unscramble`, `translate`,
`marker_identification`) maps cleanly onto the format ladder — that groundwork holds up.

---

# Part 7 — Execution plan

> ⚠️ **The live sequencing is in
> [PLAN.md](./PLAN.md), not here.** The phases below
> are the original plan and are kept because their *rationale* still holds —
> notably why Unit 2 was built first. What they get wrong is the assumption
> that content is limited by authoring effort. It is limited by **sourcing**,
> which twice changed what a lesson could say after it was planned. STATE_OF_PLAY
> carries the revised order and the rules that came out of that.


Sequenced so nothing is built twice, and so the teaching model is validated on real
content before it's applied fourteen times.

| Phase | Work | Rationale |
|---|---|---|
| **1** | **Data model + glossary.** Define the authored-content types (objectives, exercise ladder, feedback, confidence tags, units, test banks). Write the plain↔technical glossary page. | Everything else is authored *into* this shape. Getting it wrong means re-authoring. |
| **2** | **Build Unit 2 first (Lessons 5–8)** — the sentence formula — fully: teaching loop, homework, unit test, correctives. | ⭐ The spine, the original complaint, and the deepest unit per §1.11. Validates the whole model on the hardest content before committing to the rest. |
| **3** | **Assessment engine.** Homework runner, unit tests, mastery gating, correctives, spaced review. | Needs Phase 2's real items to build against rather than hypothetical ones. |
| **4** | **Unit 1 (Lessons 1–4).** | Prerequisites for Unit 2, but simpler content — safer to author *after* the model is proven. |
| **5** | **Vocabulary track.** ~500 words, 2-source verified, confidence-tagged, SRS-paced. | Independent of grammar authoring; can run parallel from Phase 2 onward. |
| **6** | **Units 3–4 (Lessons 9–14).** | Straightforward application of a proven model. |
| **7** | **Retire `COURSE.md` + `course-to-app.cjs`.** Keep COURSE.md as unreferenced archive or delete. | Only once nothing depends on it. |

**Phase 2 before Phase 1's dependents is deliberate**: building the hardest, most
important unit first surfaces model problems while they're still cheap to fix.

---

# Part 8 — Root cause analysis (why guardrails, not guidelines)

Four five-why chains on the defects found in the audit. They converge, which is the
point.

**Chain A — "the course feels scrambled"**
1. *Why?* Focus particles are used unexplained in examples from Lesson 1 onward.
2. *Why?* They aren't formally taught until Lesson 20.
3. *Why?* Lesson 20 is a "Special Topics" bucket holding whatever didn't fit elsewhere.
4. *Why?* The sequence mirrors a **reference grammar's** organization (morphology →
   syntax → discourse), which is an *indexing* order, not an *acquisition* order.
5. *Why?* No teaching model was chosen before content was authored.
   **→ Root cause: content preceded method.**

**Chain B — "76% of exercises are multiple-choice with filler hints"**
1. *Why?* `course-to-app.cjs` emits MCQ for nearly everything.
2. *Why?* It infers items from prose by splitting sentences on punctuation.
3. *Why?* It has no model of what an item *is* — no objective, no answer type, no feedback.
4. *Why?* It was written to convert *slides*, and slides have no item schema.
5. *Why?* No item specification existed to convert *toward*.
   **→ Root cause: no data model for assessment.**

**Chain C — "learner-facing text is full of linguistics jargon"**
1. *Why?* Terms like *predicate nominative*, *subjunctive*, *topicalization* appear raw.
2. *Why?* COURSE.md was written in a linguist's register.
3. *Why?* It was organized around describing Somali completely.
4. *Why?* The implicit audience was someone who already knows grammar terminology.
5. *Why?* No reader model was ever written down.
   **→ Root cause: no defined audience.**

**Chain D — "items exist that are literally unanswerable"**
(duplicate options; a sentence split into two "choices"; an option containing a blank)
1. *Why?* Malformed items shipped.
2. *Why?* Nothing rejected them.
3. *Why?* There is no validation of content, only of TypeScript types.
4. *Why?* Content correctness was assumed to follow from the generator being correct.
5. *Why?* No acceptance criteria existed for content.
   **→ Root cause: no validation gate.**

**Convergence.** Every chain terminates in a *missing specification*, not a missing
effort. That is why Parts 9–12 exist and why they are written as **machine-checked
invariants rather than advice**. Advice is what produced the current state.

**Consequence for implementation:** the implementing model must be able to *prove*
compliance, not assert it. Every rule below is either script-checkable or scored against
an explicit rubric.

---

# Part 9 — Invariants and automated validation

## 9.1 The contract

Phase 1 must deliver `scripts/validate-course.mjs`, wired as:

```bash
npm run validate:course
```

**Behavior:** exits `0` only if every `ERROR`-severity check passes. Prints violations
grouped by check ID with file and lesson/item locators. Warnings print but do not fail.
CI-equivalent: this must be run and pass before any phase is considered complete.

**The checks and the data model are built together in Phase 1.** A check that can't be
expressed is a signal the data model is missing a field.

## 9.2 Check suite

Severity: **E** = error (blocks), **W** = warning (review required, doesn't block).

### Structure — every lesson has the same skeleton

| ID | Sev | Rule | Guards against | Source |
|---|---|---|---|---|
| `S1` | E | Card index 0 is type `blueprint` | Lesson opens without its organizer | §1.13 |
| `S2` | E | Card index 1 is type `connect` (except Lesson 1) | Lessons feel disconnected | §1.13, Gagné 3 |
| `S3` | E | Card index 2 is type `promise` | Learner doesn't know why they're here | Gagné 2 |
| `S4` | E | Final content card is type `payoff` | Promise never closed | Part 4B.2 |
| `S5` | E | No run of >3 consecutive cards without a retrieval card | Passive scrolling | §1.16 |
| `S6` | E | `lesson.newItems.length ≤ 4` | Working-memory overload | §1.14 |
| `S7` | E | `lesson.objectives.length ≥ 1` | Untargetable correctives | §1.9 |
| `S8` | E | Every objective has ≥3 items in the bank | Correctives can't retest | §1.9 |
| `S9` | W | Total cards per lesson between 8 and 18 | Session length drift | §1.15 |

### Language — plain English only (D4)

| ID | Sev | Rule | Guards against |
|---|---|---|---|
| `L1` | E | Zero occurrences of any banned term in any learner-facing string | Jargon regression |
| `L2` | E | Banned list is defined in one place and imported by the checker | Drift between doc and check |
| `L3` | E | Glossary page defines every banned term with its plain equivalent | Learner stranded on outside resources |
| `L4` | W | No learner-facing sentence exceeds 25 words | Mobile readability |

**Banned term list (initial).** Case-insensitive, word-boundary matched:
`agreement`(as grammar sense), `nominative`, `absolutive`, `genitive`, `vocative`,
`copular`, `copula`, `predicate nominative`, `existential`, `morphology`, `morpheme`,
`derivational`, `inflection`, `inflected`, `declarative`, `interrogative`, `imperative`,
`subjunctive`, `optative`, `topicalization`, `topicalize`, `clitic`, `determiner`,
`particle`, `lexeme`, `modality`, `aspectual`, `transitive`, `intransitive`, `valence`,
`register`(as style sense), `polarity`.

*Note on collisions:* `agreement` and `register` have ordinary English senses. The checker
must match the grammar sense only — implement as a literal-string denylist over
learner-facing fields, with a per-string allowlist escape hatch that requires a written
justification field. **An allowlist entry without justification is an `E`.**

### Exercise quality

| ID | Sev | Rule | Guards against | Source |
|---|---|---|---|---|
| `E1` | E | `multiple_choice` ≤ 25% of all items | Weakest format dominating (currently 76%) | §1.8 |
| `E2` | E | Every MCQ has ≥3 options | Coin-flip items (9 exist today) | audit |
| `E3` | E | No MCQ has duplicate options | Unanswerable items (2 exist today) | audit |
| `E4` | E | `correctAnswer` is present in `options` | Unanswerable | audit |
| `E5` | E | No two items share an identical `hint` string | Filler hints (92/121 today) | §1.7 |
| `E6` | E | Every item's `explanation` ≥ 80 chars **and** names the rule | "Correct!" as feedback | §1.7 |
| `E7` | E | Every item has ≥1 objective tag | Correctives can't target | §1.9 |
| `E8` | E | No option contains `___` unless type is `fill_blank` | Malformed parse artifacts | audit |
| `E9` | E | Production items ≥60% of homework and unit-test banks | Recognition-heavy assessment | §1.8 |
| `E10` | W | Every `notice` item is answerable *only* via the target form | Word-order guessing succeeds | §1.10 |

`E10` is a warning because full automation is infeasible; it carries a rubric line instead
(R6) and requires human/model sign-off per lesson.

### Vocabulary and Somali correctness

| ID | Sev | Rule | Guards against | Source |
|---|---|---|---|---|
| `V1` | E | Every word has `confidence ∈ {verified, single-source, uncertain}` | Untracked reliability | D2 |
| `V2` | E | Every `verified` word has ≥2 distinct `sources` entries | Confidence inflation | D2 |
| `V3` | E | Every word has ≥1 `sources` entry | Unsourced content | D2 |
| `V4` | E | No string matches the known-error denylist (e.g. `Hadii` → `Haddii`) | Known-bad forms reappearing | §1.12, audit |
| `V5` | E | Every Somali string uses only Somali orthographic characters | Encoding/typo artifacts | practical |
| `V6` | W | Lesson examples use only vocabulary introduced at or before that lesson | Unknown words in examples | §1.14 |
| `V7` | E | UI surfaces `single-source`/`uncertain` markers | Hidden uncertainty | D2 |

`V6` is a warning because inflected forms defeat naive matching; implement as a
lemma-based check with a declared exceptions list.

### Assessment

| ID | Sev | Rule | Guards against | Source |
|---|---|---|---|---|
| `A1` | E | Every unit has a test bank of ≥25 items | Untestable unit | §3.2 |
| `A2` | E | Unit test bank covers 100% of that unit's objectives | Blind spots in gating | §1.9 |
| `A3` | E | Homework: ≥30% carry-back items from prior lessons | No cumulative retrieval | §1.3 |
| `A4` | E | Unit tests include items from **all prior units** | Not actually cumulative | §1.3 |
| `A5` | E | Mastery threshold is exactly 85% and defined in one constant | Silent drift | §1.9 |
| `A6` | E | Failing a unit test yields correctives for **only** failed objectives | "Reread everything" | §1.9 |

---

# Part 10 — Per-phase specification

Each phase is complete only when **Definition of Done** is fully satisfied *and*
`npm run validate:course` exits 0.

### Phase 1 — Data model + glossary + validator

**Goal.** Make every later phase mechanically checkable.

**Deliverables**
- `src/data/types.ts` — authored-content types. Must include, at minimum:
  `Lesson { id, unitId, title, blueprintState, newItems[], objectives[], cards[] }`;
  `Card` discriminated union incl. `blueprint | connect | promise | predict | teach |
  notice | practice | payoff | summary`;
  `Item { id, type, objectiveIds[], prompt, options?, answer, hint, explanation }`;
  `VocabWord { …, confidence, sources[] }`;
  `Unit { id, name, identity, lessonIds[], testBankId }`.
- `src/data/banned-terms.ts` — single source for `L1`/`L2`.
- `scripts/validate-course.mjs` — implements every check in Part 9.
- `npm run validate:course` script entry.
- Glossary page + route (`/glossary`), satisfying `L3`.

**Definition of Done**
1. Every check in Part 9 is implemented, including warnings.
2. Validator runs against *current* content and **reports the known defects** — 76% MCQ,
   92 duplicate hints, 9 sub-3-option items, 2 duplicate-option items, jargon counts.
   *If it reports zero violations on today's content, the validator is wrong.*
3. Glossary covers 100% of the banned list.

**Anti-patterns**
- Weakening a check so current content passes. **The validator must fail loudly at first.**
- Adding fields the checks don't use, or checks the model can't express.

### Phase 2 — Unit 2 (Lessons 5–8), the spine

**Goal.** Build the hardest, most important unit first, to validate the model while it's
still cheap to change.

**Deliverables.** Four lessons fully authored; Unit 2 test bank (≥25 items); homework banks
per lesson; all Somali 2-source verified.

**Definition of Done**
1. `validate:course` exits 0 for lessons 5–8 and the Unit 2 bank.
2. Each lesson scores ≥17/20 on the Part 11 rubric with **no zeros**.
3. Blueprint state advances exactly one step per lesson, matching the Part 4B.1 table.
4. Every Somali form has ≥2 sources recorded; `V2` passes.
5. A learner completing 5–8 can build the sentence promised in each lesson's `promise`
   card — verified by that sentence appearing as a `payoff` item.

**Anti-patterns**
- Authoring lessons 1–4 first because they're easier. Ordering is deliberate.
- Teaching all four particles in Lesson 5. `S6` caps new items at 4 — `waa`/`baa`/`waxa`/`ma`
  is exactly 4 and leaves no budget for their fused forms, which is why fusion is Lesson 6.

### Phase 3 — Assessment engine

**Goal.** Make Layers 2 and 3 real.

**Deliverables.** Homework runner; unit-test runner; mastery gating at 85%; correctives
routing; fixed-interval spaced review via `lib/review.ts`.

**Definition of Done**
1. `A1`–`A6` pass.
2. Failing a unit test at <85% produces correctives for **only** the failed objectives —
   verified by an automated test with a synthetic failure.
3. Retaking a unit test serves **different items** for the same objectives.
4. `PONYTAIL_DEBT.md` item 4 is closed (SRS functions no longer orphaned).
5. Progress gating cannot be bypassed by direct URL navigation.

### Phase 4 — Unit 1 (Lessons 1–4)
Same DoD as Phase 2, for lessons 1–4. Lesson 1 is exempt from `S2` (no prior lesson).

### Phase 5 — Vocabulary track
**Definition of Done:** `V1`–`V7` pass across ~500 words; SRS pacing introduces ≤10 new
words per session; UI shows confidence markers; word list is decoupled from lesson
completion.

### Phase 6 — Units 3–4 (Lessons 9–14)
Same DoD as Phase 2. **Unit 3 must make the shared-slot insight explicit** — negation and
questions both act on `SIGNAL` — in the unit's `identity` string and in each lesson's
`connect` card.

### Phase 7 — Retire the old pipeline
**Definition of Done:** `scripts/course-to-app.cjs` deleted; `COURSE.md` no longer
referenced by any code path; `src/data/teaching-content.ts` (generated) removed; build,
lint, tests, and `validate:course` all green.

---

# Part 11 — Per-lesson rubric

Score every lesson. **Pass = ≥17/20 with no dimension scoring 0.**

| # | Dimension | 0 | 1 | 2 |
|---|---|---|---|---|
| R1 | **Blueprint** | absent | present but static | present, today's slot highlighted, advances exactly one step |
| R2 | **Connection** | no reference to prior lesson | mentions it | names what was gained and what's being added |
| R3 | **Promise→payoff** | no promise | promise but no matching payoff | promised sentence is buildable and appears as a payoff item |
| R4 | **Cognitive load** | >4 new items | exactly 4, densely packed | ≤4, each with its own card |
| R5 | **Plain language** | any banned term | none, but phrasing is technical | none, reads like high-school English |
| R6 | **Structured input** | no `notice` items | present but answerable by word order | answerable **only** via the target form (§1.10) |
| R7 | **Retrieval density** | >3 cards between retrievals | exactly 3 | ≤2 |
| R8 | **Feedback** | "Correct/Incorrect" only | explains the answer | explains the **rule** and why the distractor is wrong |
| R9 | **Production weight** | mostly MCQ | mixed | ≥60% production items |
| R10 | **Sourcing** | unsourced Somali | 1 source | ≥2 sources per form |

**Why 17 and not 20:** demanding a perfect score on every lesson incentivizes gaming the
rubric rather than teaching well. 17 with no zeros permits two dimensions at "adequate"
while making any outright failure blocking.

**Why no dimension may score 0:** each 0 corresponds to a defect class found in the audit.
A zero anywhere means the lesson reproduces a known failure.

---

# Part 12 — Gold-standard reference

> ⚠️ **The Somali below is ILLUSTRATIVE STRUCTURE ONLY and is NOT yet 2-source verified.**
> Do not copy these forms into shipped content. Per D2, every form must be independently
> verified before use. This example demonstrates *shape*, not *content*.

**Lesson 5 — The Four Sentence Signals** (Unit 2, `newItems: [waa, baa, waxa, ma]`)

```
CARD 0  blueprint
        ┌───────┬────────┬────────┬──────┐
        │  WHO  │ SIGNAL │  WHAT  │  DO  │
        └───────┴────▲───┴────────┴──────┘
                  today
CARD 1  connect
        "Last lesson you learned the words for I, you, he, she.
         That fills the WHO box. Today: the box right after it —
         the one that has no English equivalent at all."

CARD 2  promise
        "By the end of this lesson you'll know why these two
         sentences mean different things, even though the words
         are identical."

CARD 3  predict        ← retrieval (§1.16)
        Two sentences, same words, different signal.
        "Which one means 'It was ALI who ate'?"  [guess before rule]

CARD 4  teach          ← rule, plain English
        "Somali marks what a sentence is DOING with a small word
         before the verb. There are four. Swap the signal, and the
         meaning changes without moving a single other word."

CARD 5  teach          ← worked example, annotated (§1.6)
CARD 6  notice         ← retrieval; answerable ONLY via signal (§1.10)
CARD 7  notice         ← retrieval
CARD 8  complete       ← scaffolded production
CARD 9  produce        ← full production
CARD 10 payoff         ← the exact sentence from CARD 2
CARD 11 summary
```

**Checks this satisfies:** `S1`(card 0) `S2`(1) `S3`(2) `S4`(10) `S5`(retrieval at 3,6,7,8,9
— max gap 2) `S6`(4 new items) `S7`/`S8`(objectives tagged).
**Rubric:** R1=2, R2=2, R3=2, R4=2, R7=2.

**Why this lesson stops at four signals.** `S6` caps new items at 4. The fused forms
(`wuu`, `bay`, `wuxuu`) are four *more* items — putting them here would be 8, double the
working-memory budget (§1.14). That is the entire reason Lesson 6 exists as a separate
lesson rather than a section of Lesson 5. **This is the canonical example of a structural
rule driving curriculum design rather than the reverse.**

---

# Honest limitations

- **Hwang (2025) is paywalled.** Block-then-interleave is consistent with the broader
  cognitive-load literature, but I have not read the full method.
- **All effect sizes generalize from other languages** — mostly English-as-L2 and European
  languages. I found **zero Somali-specific instructional research**.
- **Schwartz et al. (2009) is high-school science**, not language learning. The
  depth-over-breadth principle is broadly supported, but that specific effect size doesn't
  transfer directly.
- **85% mastery and item counts (10–15, 25–30) are conventional defaults**, not tuned here.
- **Spiral curriculum was deliberately not invoked.** Bruner's spiral is the obvious frame
  for the Blueprint, but research reports **no clear empirical evidence for its overall
  effect** on learning. The Blueprint is instead justified by its component mechanisms,
  each independently supported: graphic advance organizers (§1.13), prior-knowledge
  activation (§1.13), and distributed revisiting (§1.4). If the spiral framing is wrong,
  the device still stands.
- **Advance-organizer effect sizes (1.24 / 0.80) come from a 1980s meta-analytic
  tradition** with known variance in how "advance organizer" was operationalized across
  studies (Mayer noted this). The direction of the finding is robust; the precise
  magnitudes should be treated as indicative.
- **Screen-inferiority effects are consistent but modest**, and some analyses conclude
  learners can overcome them. It's a reason to lean on retrieval and keep the print
  channel — not a reason to doubt mobile-first.
- **The `Hadii`/`Haddii` finding is strong but not proof.** Wiktionary lists *haddii* and
  no single-d variant; it does not explicitly declare *hadii* wrong. A 31-to-1 split
  against the dictionary form is the signal, not a verdict.
- **No native speaker will ever check this content.** Two-source verification and
  confidence tagging reduce the risk; they do not eliminate it. This remains the single
  largest threat to the project.
- **The validator cannot check whether teaching is *good*.** It checks structure, density,
  language, format ratios, and sourcing — all necessary, none sufficient. A lesson can pass
  every check in Part 9 and still explain badly. The Part 11 rubric covers some of that gap
  (R6, R8), but rubric scoring is a judgment call, and a weaker model will score itself
  generously. **Treat rubric self-scores as claims to spot-check, not as evidence.**
- **`E10` and `V6` are warnings, not errors, because they resist automation.** These are
  the two most likely places for real defects to slip through: items answerable by
  word-order guessing (the exact §1.10 failure the course exists to fix), and examples
  using unintroduced vocabulary. Manual review of these two is the highest-value human
  check available.
- **Thresholds in Part 9 are calibrated to today's known defects**, not derived from
  research: MCQ ≤25% (vs. 76% today), explanation ≥80 chars (vs. ~90 average today, where
  length is padding not substance), rubric pass ≥17/20. They are deliberately set where
  current content clearly fails. Expect to tune them once real authored lessons exist.

Added with the August 2026 amendments:

- **Much of the new evidence comes from abstracts and meta-analytic summaries, not full
  texts.** The 2025 prequestion meta-analysis is paywalled. Treat directions as reliable and
  magnitudes as indicative — the same standard already applied to §1.13's effect sizes.
- **The factual/conceptual distinction driving the §3.1 PREDICT correction has not been
  checked against the actual cards.** It is possible more of them are factual than assumed.
  Worth auditing before the correction is acted on further.
- **Effect sizes across different outcome measures are not comparable.** d = 1.21 for
  computer-mediated feedback and g = 0.248 for handwriting measure different things on
  different populations. Do not rank interventions by these numbers.
- **Successive relearning's headline result is from factual material** — course concepts and
  vocabulary pairs. Grammar rules are conceptual. The technique should transfer; the "more
  than twice" figure probably does not.
- **The corpus has not been used.** The soWaC recommendation rests on its published
  description. It is also a 2016 web crawl skewed to news, politics and religious sites, so
  it contains the same non-standard spellings it would be used to adjudicate, and its
  Universal-Dependencies parse of a morphologically rich language should be treated as
  approximate. Absence in it is a strong negative signal; presence is a weak positive one.
- **§2.0's scope statement is a judgement, not a finding.** The research constrains what is
  achievable; it does not decide what this project is for. That was the learner's call.
