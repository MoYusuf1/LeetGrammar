# Teaching Options — a decision memo

> **Subordinate to [COURSE_DESIGN.md](./COURSE_DESIGN.md).** That document is the
> single source of truth for teaching design and stays that way. This one is a
> review of it against research published or found since it was written, plus
> options for twelve open questions.
>
> **This document has a lifespan.** Once the decisions below are taken, the
> accepted ones fold into COURSE_DESIGN.md and this file is deleted. If it is
> still here in six months, the decisions were not taken.
>
> **Status:** decided. Every recommended option was taken — see Part C for the
> decision record and Part D for the plan. Parts A and B are kept as the
> reasoning behind the decisions; they are the thing that gets folded into
> COURSE_DESIGN.md, and they are why each decision is not re-arguable without
> new evidence.

---

## Summary for the impatient

The design in COURSE_DESIGN.md is better evidenced than most commercial language
software. Sixteen cited findings, honest limitations, and every delivery choice
traced to one of them. **The problem is not that the method is unproven in
general.** It is that five specific pieces are unvalidated, and one of them is
contradicted by evidence the document does not cite.

| # | Piece | Verdict |
|---|---|---|
| 1 | **PREDICT before EXPLAIN** | **Contradicted** for conceptual content. §A1 |
| 2 | **The print worksheet** | Wrong mechanism, and never once used. Cut. §A2 |
| 3 | **Homework as measurement** | Invalid while you author the items. §A3 |
| 4 | **The blueprint** | Untestable until Lesson 5 exists. §A4 |
| 5 | **EXPLAIN's weight in the loop** | Genuine conflict in your own evidence. §A5 |
| + | **Successive relearning** | Missing, and it is the strongest single technique available. §A6 |

And one reality check that changes what the app is for: **the stated goal is a
1,100-hour goal, and this is a 14-lesson app.** §B7.

---

# Part A — What the research says about the design as it stands

## A1. PREDICT before EXPLAIN is contradicted for the kind of content you teach

COURSE_DESIGN §3.1 calls this ordering "deliberate and load-bearing," justified
by §1.16 (screen overconfidence) and §1.12 (hypercorrection). The mechanism
invoked is the pretesting / prequestion effect.

That literature has moved, and not in your favour:

- A [multilevel meta-analysis of prequestions (2025)](https://link.springer.com/article/10.1007/s10648-025-10075-7)
  found prequestions helped learning of **the specific information asked about**,
  with **no evidence of a general benefit** for other material in the same lesson.
- The [Educational Psychology Review review of prequestioning and pretesting
  effects](https://link.springer.com/article/10.1007/s10648-023-09814-5) reports
  the sharper finding: **factual pretesting improved learning; conceptual
  pretesting did not enhance conceptual learning.** Worse, **conceptual pretest
  errors were significantly more likely to be repeated on the final test** than
  factual ones. Where feedback did help conceptual items, the review attributes
  the gain to memorisation of the specific item rather than understanding.

Your PREDICT cards are conceptual. "Guess which word marks the subject" is not
a fact-retrieval prompt, it is a rule-inference prompt. The literature says that
is the case where pretesting does not deliver, **and where the wrong guess is
most likely to survive to the final test** — which is your §1.12 hypercorrection
worry running in reverse, against you.

This does not mean delete PREDICT. It means the justification currently written
down is wrong, and the step should either be re-aimed at factual prompts
(*"which of these letters is not used in Somali?"* — factual, fine) or kept for
the attentional reason only (it directs attention to the target form in the
material that follows), which is the mechanism the review actually supports.

**This is the single clearest "your document says X, the research says not-X" in
the whole review.**

## A2. The worksheet's stated mechanism is wrong; a better one is available

§1.16 justifies print as "the deep-reading channel," from the screen-inferiority
meta-analyses. That justification does not survive contact with what you built:
screen inferiority is a finding about **comprehension of continuous prose**. Your
worksheet is a vocabulary recall grid. It is not prose, so the finding does not
apply to it.

But there is a better justification sitting right there:

- The [2024 meta-analysis of handwritten vs typed notes](https://eric.ed.gov/?id=EJ1430416&pg=50&q=g)
  (24 studies) found a real but **small** achievement advantage for handwriting,
  **Hedges' g = 0.248** — while typing won decisively on volume recorded
  (g = 0.919). On its own this is a thin reed.
- The L2-specific finding is much better aimed: [writing target words by hand
  directs attention to word *form*](https://euroslajournal.org/articles/10.22599/jesla.44),
  and produces superior word learning compared with focusing on word meaning —
  because semantic elaboration consumes the processing resources that word-form
  encoding needs. Hand-copying letter strings builds memory traces for visual
  identification and gives a better foundation for **letter–sound mapping**.

That last clause is the one that matters, because of A-level fact about your
target language: **Somali orthography is near-perfectly phonemic.** Consonants
have [one-to-one grapheme–phoneme correspondence](https://en.wikipedia.org/wiki/Somali_Latin_alphabet),
long vowels are written doubled, and the alphabet deliberately excludes p, v and
z because the sounds do not exist. Letter–sound mapping in Somali is a *solvable
problem*, unlike in English, and handwriting is the intervention that builds it.

**So the worksheet has a real job — but it is the opposite of the one it does
now.** It currently asks you to write *English* meanings next to Somali words.
The evidence says the value is in writing the *Somali* by hand.

**Resolved: cut it.** The feature has never been printed, not once, in its
entire existence. That settles it ahead of any argument about mechanism. A
printable artifact that is never printed is not a weakly-justified feature, it
is an unreachable one — the same category as the 53 shadcn components and the
SM-2 engine, both deleted in the commit immediately before this memo was
written. The word-form evidence above is real and stays on the record, because
it is the strongest available justification for **a** handwriting channel; it is
just not a justification for *this* one, which was built for a different reason
and used zero times. If a handwriting channel is ever wanted, build it against
the word-form rationale directly and put it where the learner already is.

## A3. Homework cannot be measurement while you author the items

Nothing in COURSE_DESIGN addresses this and it undercuts Layer 2 and Layer 3,
which §1.2 identifies as the highest-leverage components you have.

The good news first, because it is better than I expected:

- Student-generated questions are **not** a pedagogical liability. Ebersbach et
  al. (2020) found instructing learners to generate questions from material
  yields **medium to large effects** on comprehension, recall and problem
  solving. [Question generation beat individual restudy, group discussion, and
  summarising](https://rightquestion.org/resources/research-on-the-impact-of-student-questions-on-learning/)
  for retention of lecture material, and gains appeared **regardless of the
  quality of the questions generated**.
- Separately, the generation effect gives self-produced content a retention
  advantage over read content of roughly **d = 0.40**.

So authoring items is itself one of the better things you could be doing. **The
act of writing the homework is a learning event with a decent effect size.**

The bad news is narrower and still real: retrieval practice depends on retrieval
being effortful, and the [benefit varies with item
difficulty](https://web.colby.edu/memoryandlanguagelab/files/2018/09/2018-Minear-Coane-et-al.-JEPLMC.pdf).
An item whose answer, distractors and source lesson you personally chose last
Tuesday is not an effortful retrieval. **Authoring is good instruction and bad
measurement**, and your architecture currently books it as measurement.

The self-assessment literature closes the trap: the consistent pattern is a
[Dunning–Kruger one — **lower-proficiency learners
overestimate**](https://onlinelibrary.wiley.com/doi/10.1111/flan.12379), and you
are a lower-proficiency learner assessing yourself with instruments you wrote.
Accuracy does improve markedly when the skill being assessed is **clear and
detailed** rather than global, which is a usable lever.

## A4. The blueprint is untestable until Lesson 5 exists

Your own open question. The research does not resolve it, but it does say the
device is well-founded: graphic advance organizers are the largest effect in
your document (1.24), and STATE_OF_PLAY is right that it currently only ever
highlights WHO. **No amount of further reading will settle this. Only Lesson 5
will.**

## A5. There is a real conflict inside your own evidence base

§1.1 says explicit instruction beats implicit, strongly, and the whole delivery
model follows from it: *state the rule plainly, don't make him infer.*

But the processing-instruction literature that §1.10 leans on says something
uncomfortable about that:

- [Processing instruction produced significant gains in **both** comprehension
  and production, while traditional instruction gained only
  production](https://www.researchgate.net/publication/236032459_The_effectiveness_of_processing_instruction_on_L2_grammar_acquisition_A_meta-analysis) —
  only PI improved learners' *interpretation* of the target forms.
- And the replication finding: [**the benefit came from the structured input
  activities, not from the explicit
  explanation**](https://www.cambridge.org/core/journals/studies-in-second-language-acquisition/article/abs/explanation-versus-structured-input-in-processing-instruction/CADC0357472A2FF7A8195A3A58A8E602).
  Strip the explanation out and learners still gain.

Your §1.1 and your §1.10 are pulling in opposite directions and the document
does not notice. This is not fatal — explicit instruction is well supported
across the wider literature, and the learner profile ("adult, analytical, wants
the formula") is exactly the profile that benefits from it. But it means
**NOTICE, the structured-input step, is carrying more weight than its position
in your loop suggests**, and EXPLAIN is carrying less. Currently EXPLAIN is step
2 of 8 and NOTICE is step 4 of 8, given one card each.

## A6. Successive relearning is missing, and it is the best thing available

Your Layers 2 and 4 (homework carry-back, spaced review) are two mechanisms
doing overlapping jobs. The literature has a single named technique that is
exactly their union, with a startling effect size:

**Successive relearning** = retrieval practice to a criterion (at least one
correct recall) **in each of multiple spaced sessions**. Rawson & Dunlosky found
that [recalling items correctly once in each of three spaced sessions produced
**more than twice** the recall of getting each item right three times in one
session](https://www.retrievalpractice.org/strategies/2018/successive-relearning).
Three relearning sessions appear sufficient for most of the benefit. It
[improved performance on real course
exams](https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.3699), not just lab
tasks.

Your §1.2 already names practice testing and distributed practice as the only
two high-utility techniques in Dunlosky's review. Successive relearning is the
protocol for **doing both at once**, and you have the pieces already
(`lib/review.ts` intervals, `lib/homework.ts` carry-back). They are just not
wired to each other.

While we are here: your fixed intervals (1, 3, 7, 14, 30, 60, 90 days) are
reasonable but arbitrary. [Cepeda et al. (2008), N > 1,350](https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf)
give a principle instead — the optimal gap is a **proportion of the retention
interval you actually want**: ~20% for a retention target of a few weeks,
falling to ~5–10% for a one-year target. If you want to still know this in a
year, the late intervals should be *much* longer than 90 days.

---

# Part B — Options, question by question

Each option lists what backs it. Recommendations are marked **▶**.

## The worksheet (Q1–Q3)

| | Option | Backing |
|---|---|---|
| A ▶ | **Cut it.** The deep-reading justification does not apply to a recall grid, and the general handwriting advantage is small (g = 0.248). | The absence of evidence for *this artifact*; POSTMORTEM's own rule about unreachable finished-looking things. **Decided: it has never been printed.** |
| B | **Keep, re-justify, and flip the direction.** The learner writes the **Somali** by hand, prompted by English. Re-file it under word-form encoding and letter–sound mapping, not deep reading. | Handwriting directs attention to word form and beats meaning-focus for L2 word learning; hand-copying builds letter–sound mapping; Somali's phonemic orthography makes that mapping learnable. |
| C | **Convert to free recall** — a blank sheet, "write everything you remember from Lesson 3." | Free recall beats cued for breadth of retention and raises self-efficacy and situational interest — **but** cued recall is the better fit for novices, and you are a novice. |
| D | **Make it genuinely the deep-reading channel** — printed prose explanation, no blanks. | Screen-inferiority meta-analyses apply to prose, so this would be the honest version of the current claim. But then it is not a worksheet, and it competes with the lesson itself. |

**▶ A.** B was the recommendation on the evidence, and it lost to a fact. Asked
whether the worksheet had ever actually been printed, the answer was **no** —
which is the condition stated in Q2, and it decides this without reference to
mechanism. Cut the route, the page, the composer, the menu entry and the print
stylesheet.

Note what is being deleted: the print/screen split landed two days before this
memo, in `d36082c9`. Recent work is not a reason to keep an unused feature — the
sunk cost is already sunk either way — but it is worth naming, because the same
instinct that built it will want to defend it.

## Author = learner (Q4–Q5)

| | Option | Backing |
|---|---|---|
| A ▶ | **Rebook authoring as instruction. Stop scoring homework.** Layer 2 becomes explicitly a learning event, not a measurement. | Student-generated questions produce medium-to-large gains and beat restudy, discussion and summarising — *regardless of question quality*. Generation effect d ≈ 0.40. |
| B ▶ | **Impose a minimum authoring→sitting delay** to restore retrieval difficulty. Set it from the retention target rather than by feel. | Retrieval benefit depends on retrieval difficulty; Cepeda's gap ≈ 20% of the retention interval gives a principled number (6-month target → ~5 weeks minimum). |
| C | **Generate surface variants from authored schemas** so the specific item is unseen even when the pattern is not. | Removes item-level foreknowledge while preserving objective coverage. Real build cost; `lib/homework.ts` already composes, so it is an extension not a rewrite. |
| D ▶ | **Add one measurement you did not write.** A Nilsson exercise, a graded text, a page of Orwin — anything external. | This is the only true test available. Self-assessment accuracy is worst exactly at your proficiency level, and improves when the assessed skill is specific and detailed. |

**▶ A + B + D.** C when the item bank is big enough to be worth automating.

Note what A actually buys you: it means **writing lessons is not a detour from
learning Somali — it is one of the better-evidenced things you could be doing
with the time.** That reframes the whole project.

## What "done" means, and listening (Q6–Q7)

The reality check first, because it constrains every option:

- FSI puts Somali at roughly [**1,100 class hours** to professional working
  proficiency](https://www.fsi-language-courses.org/blog/fsi-language-difficulty/)
  (S-3/R-3). Sources disagree on whether that is Category III or IV; they agree
  on the hours.
- Reading authentic text needs [**95% lexical coverage ≈ 3,000–4,000 word
  families**, 98% ≈ 6,000–8,000](https://onlinelibrary.wiley.com/doi/10.1111/j.1540-4781.2011.01146.x).
  Your planned vocabulary track is ~500 words. Beginners below the threshold
  need graded material — there is no way around it.
- Listening: [aural decoding predicts **46.9% of the variance** in L2 listening
  comprehension](https://www.researchgate.net/publication/391446594_Aural_Decoding_and_Comprehension_in_L2_Listening),
  and orthographic knowledge feeds listening through decoding.

**So "real speech becomes parseable" is not a goal this app can deliver, and the
document should stop implying it can.** But the app can deliver the input to it,
and the phonemic-orthography fact makes that unusually tractable.

| | Option | Backing |
|---|---|---|
| A ▶ | **Formula literacy.** Done = "given any written Somali sentence in the taught patterns, I can say what each piece is doing." | Matches D3/§1.11 depth-over-breadth. Achievable in 14 lessons. Directly measurable. |
| B ▶ | **Decoding fluency**, as a second, timed criterion. Done = "I can read written Somali aloud accurately at speed." | Aural decoding predicts ~47% of listening variance; Somali's one-to-one orthography makes this a closed problem, unlike in English. This is the highest-leverage bridge to the listening you do elsewhere. |
| C | **Graded-reader on-ramp.** Done = can read a simple text unaided. | Extensive reading with graded readers: d = 1.48 pre-post, [d = 0.57 against control](https://onlinelibrary.wiley.com/doi/10.1002/tesq.157); a broader meta-analysis puts it at d = 0.41. Strong evidence — but needs the 3,000-word track, i.e. a different and much larger project. |
| D | **One concrete artifact.** Pick a real text and make parsing it the finish line. | Goal-setting research: specific, proximal, challenging, self-set goals raise motivation and self-efficacy; distal-internal goals predict deeper L2 engagement. |

**▶ A + B, with C and listening explicitly declared out of scope.** Write the
out-of-scope line into COURSE_DESIGN. An app that says "I make the formula
legible and the spelling readable; comprehension comes from reading and
listening you do elsewhere" is honest and still valuable.

## Deepen four, or build the signal system (Q8)

| | Option | Backing |
|---|---|---|
| A | **Build all of Unit 2** (lessons 5–8) as a processing-instruction unit. | PI is *the* intervention for exactly this problem class; PI improved comprehension where traditional instruction did not. |
| B | **Deepen Unit 1.** More items, more depth, no new grammar. | §1.11 depth-over-breadth. But it tests nothing you are unsure about — you already believe Unit 1 works. |
| C ▶ | **Build Lesson 5 (`waa`) alone, as a method prototype.** Not a unit. Its purpose is to answer the method question, not to ship content. | Teachability hypothesis: instruction helps when aimed at *the next stage*, and stages cannot be skipped — Unit 1 established WHO, so SIGNAL is next. It is also the only way to test the blueprint (A4) and the §1.10 First-Noun hypothesis, which is the most Somali-specific claim in your whole design. |

**▶ C.** This is the direct answer to "no lessons until the method is proven" —
build the one lesson whose job is to prove the method.

## Five surfaces, one learner (Q9) and homework vs spaced review (Q11)

These are one question. See §A6.

| | Option | Backing |
|---|---|---|
| A ▶ | **Merge homework and spaced review into a successive-relearning queue.** An objective leaves the queue after N correct retrievals in N *separate* sessions. One surface, not two. | Rawson & Dunlosky: >2× recall vs the same retrievals massed. Combines the only two high-utility techniques in your §1.2. |
| B | **Cheapest correct fix:** leave both, but make homework carry-back draw *from* the due-review queue, so they are one mechanism with two faces. | Same logic, a fraction of the work. Removes the double-counting without a redesign. |
| C | **Re-derive the intervals from a stated retention target** instead of using 1/3/7/14/30/60/90. | Cepeda: optimal gap ≈ 20% of retention interval at weeks, 5–10% at a year. Your current late intervals are too short for a multi-year target. |

**▶ B now, A when Lesson 5 lands, C alongside either.**

On session budgeting: §1.15's 5–10 minute target is a *floor for engagement*,
not a cap. The real constraint is that five surfaces competing for one learner's
attention means some surface always loses. Merging two of them is the fix.

## The 85% gate (Q10)

| | Option | Backing |
|---|---|---|
| A | **Keep 85% and keep the lock.** | A [meta-analysis of 36 mastery-learning studies found an average effect of **0.59**, with higher mastery thresholds yielding greater gains](https://www.structural-learning.com/post/mastery-learning). Typical optimal levels are 80–85%. The evidence is for genuinely gated designs. |
| B ▶ | **Keep 85% as a stated criterion; remove the hard lock.** Show "not yet mastered" and route to correctives, but let him proceed. | Preserves the criterion-referenced standard and the correctives loop — which the mastery literature identifies as the active ingredients — while dropping the one element that has no evidence base for a solo adult learner: the punishment. |
| C | **Lower to 80%.** | Within the supported band, but gives up gains for no clear reason. Weakest option. |

**▶ B, with the deviation recorded.** Be honest in the doc that the mastery
evidence comes from gated classroom designs, so B trades a little evidence for
adherence. That is a defensible trade for an n-of-1 learner who can simply
uninstall the app. It is not a research-backed improvement, and should not be
written up as one.

## No native speaker, ever (Q12)

The document treats this as one problem. **It is two, and they have very
different answers.**

**Feedback** — is a human needed to correct you? The evidence says no, and
emphatically: [computer-mediated corrective feedback shows a **large overall
effect, d = 1.21**](https://journals.sagepub.com/doi/abs/10.1177/07356331211064066),
with computer-assisted instruction outperforming face-to-face in these
comparisons. Your §1.7 commitment to metalinguistic explanation on every item is
the well-supported version of this. **This half of the constraint is close to
solved, and COURSE_DESIGN overstates the cost.**

**Content truth** — is the Somali correct? No amount of good feedback design
helps if the form being reinforced is wrong, and §1.12's hypercorrection finding
means a wrong form learned now competes with the right one indefinitely.

| | Option | Backing |
|---|---|---|
| A | **Status quo:** two published sources per form, validator-enforced. | Already built and working. Reduces but does not eliminate risk, as your own limitations section says. |
| B | ~~**One-time native-speaker audit of the forms actually taught**~~ — ~100 forms, an hour or two of someone's time. | **Unavailable.** Asked directly; the answer was *impossible*. The axiom holds even at taught-forms scale. |
| C ▶ | **Add audio verification** for taught forms. | Somali's phonemic orthography means written form and pronunciation are **mutually checkable** — a recording confirms spelling in a way it could not for English. Recorded course audio is published material, so it satisfies the two-source rule as an *independent* channel rather than a second textbook citation. Supports the decoding-fluency goal (§B7) at the same time. |
| D ▶▶ | **A corpus.** `soWaC`, 71M words of Somali web text, POS-tagged. Attestation and frequency, not lexicography. | See §B12b — this is a genuinely different *kind* of evidence and the closest available substitute for a speaker. |
| E ▶ | **A real dictionary.** Zorc & Osman, *Somali–English Dictionary with English Index* (Dunwoody Press, 3rd ed. 1993). | You do not currently have one. See §B12c. |
| F | ~~**Machine translation**~~ — Google Translate, an app, an LLM. | **Rejected.** See §B12a. Structurally cannot do the job and can quietly make things worse. |

**▶ Split the constraint in the document, then C.** The split still stands and is
the more important half: **feedback is close to solved** (d = 1.21 for
computer-mediated corrective feedback, outperforming face-to-face), and
COURSE_DESIGN overstates its cost. That is a real win and should be written
down.

Content truth is the half that does not move. B is off the table, so the
two-source rule and "cut what you cannot source" stay exactly as load-bearing as
they are — arguably more so, since nothing downstream will ever catch an error
they let through. Audio is worth having precisely because a phonemic orthography
makes sound and spelling check each other. `docs/Colloquial Somali.pdf` is a
course book from a series that ships audio; if that audio is obtainable it does
double duty as verification and as decoding practice.

But audio is not the biggest thing available. See below.

### B12a. Machine translation — rejected, and it is worth being precise about why

The obvious idea is to check forms against Google Translate, a translation app,
or an LLM. It fails for three separate reasons, any one of which is sufficient.

**1. It is not an independent source; it is the same sources, laundered.** Somali
is low-resource. Systems that translate it are trained largely on web crawl and
on the small pool of parallel text that exists for such languages — for Somali,
heavily religious material. Verifying a form against MT and then citing it is
circular: if the error is in the training data, MT reproduces it and you have
converted an unverified form into a "sourced" one. **That is worse than having
no second source, because it defeats the check rather than failing it.**

**2. The training data for exactly these languages is known to be bad.**
[*Quality at a Glance: An Audit of Web-Crawled Multilingual Datasets*
(TACL 2022)](https://aclanthology.org/2022.tacl-1.4/) manually audited 205
language corpora across CCAligned, ParaCrawl, WikiMatrix, OSCAR and mC4. **At
least 15 corpora contained no usable text at all**, a significant fraction had
**under 50% acceptable-quality sentences**, and 82 were mislabelled or used
ambiguous language codes. The failures concentrate in low-resource languages —
the category Somali is in. Published BLEU scores for Somali look respectable in
places, but those are in-domain fine-tuned evaluations, and a good score on
religious parallel text says nothing about whether an isolated noun's gender is
right.

**3. Most fundamentally: MT is a generator, not a validator.** Your question is
*"is this correct Somali?"* A translation system will never answer that. Feed it
a malformed sentence and it returns a fluent English guess, with no signal that
anything was wrong. It cannot decline. The one thing you need from a checker —
the ability to say *no* — is the one thing it structurally cannot do.

The same applies to asking an LLM, including me. I will produce plausible Somali
and plausible citations for it. **That is precisely how the invented citations
in this project's history got there** (see the top of SOMALI_SOURCES.md), and it
is why POSTMORTEM exists.

### B12b. A corpus — the actual answer, and better than what this memo proposed

A dictionary tells you what a lexicographer claims. A **corpus** tells you what
Somalis actually wrote. That is a different kind of evidence, and it is the
closest thing to a native speaker that is available without one.

[**soWaC**](https://www.sketchengine.eu/sowac-somali-corpus/) — 71 million words
of Somali web text, crawled 2016, POS-tagged against Universal Dependencies,
searchable through Sketch Engine's concordancer with word sketches, frequency
lists and n-grams. Free 30-day trial; subscriptions from about €4.85.

It answers questions your current sources cannot:

- **Does this form actually occur?** Zero hits in 71M words is a strong signal
  to cut, whatever a grammar says.
- **Which of two competing spellings is standard?** This is exactly the
  `hadii` / `haddii` question from D2 — and note what you already did there: you
  counted 31-to-1 inside `COURSE.md` and called it "the signal, not a verdict."
  **That was a corpus study run against the wrong corpus.** soWaC lets you run
  the same method against real Somali instead of against the document you
  already suspect.
- **Is this collocation real, or did I construct it?** The highest-risk content
  you produce is example sentences you assembled yourself from individually
  verified parts. Your own validator flags this as `E10`/`V6` and calls manual
  review of them "the highest-value human check available." A concordance is
  that check, partially automated.

**The asymmetry is what makes it usable despite being imperfect.** An unreliable
resource can be worthless for confirming and still excellent for *dis*confirming.
soWaC cannot certify that a sentence you wrote is good Somali. It can tell you a
form appears nowhere in 71 million words — and that is enough to trigger the rule
you already have: **cut what you cannot source.**

### B12c. A dictionary — you do not actually have one

Worth noticing from your own source table: `N` is a grammar, `O` is a course
book, `W-alpha` and `W-gram` are Wikipedia articles, `Wikt` is Wiktionary.
**There is no dictionary in the list.** The standard reference is
[Zorc & Osman, *Somali–English Dictionary with English Index*](https://glottolog.org/resource/reference/id/32959)
(Dunwoody Press, 3rd ed. 1993), which carries grammatical information alongside
definitions — gender, plurals, the things your lessons turn on.

One caution, and it is the same one your validator already encodes as check
**S5** ("cites one author twice rather than two independent sources"): Somali
lexicography descends from a small number of root works, and Wiktionary's Somali
entries are substantially compiled from them. **Zorc + Wiktionary may be one
source counted twice.** Treat a dictionary as a strong first source, not as an
automatic second one.

---

# Part C — Decisions taken

Every recommended option in Part B was taken. Recorded here so they are not
re-argued; each links to the reasoning that would have to be overturned first.

| # | Question | Decision | Was |
|---|---|---|---|
| 1–3 | Print worksheet | **Cut it.** Never printed once. The word-form evidence stays on record as the justification for a future handwriting channel, but not for this artifact. | §A2, Q1–3 opt. A |
| 4–5 | Author = learner | **Homework is instruction, not measurement.** Score recorded, not presented as a verdict. Minimum delay between authoring an item and sitting it. One external measure added. | §A3, Q4–5 opts. A+B+D |
| 6–7 | What "done" means | **Formula literacy + decoding fluency.** Comprehension of authentic text and listening are **out of scope**, stated explicitly. | §B7, opts. A+B |
| 8 | Deepen vs. extend | **Neither yet. Build Lesson 5 (`waa`) alone, as a method prototype.** | §A4, Q8 opt. C |
| 9, 11 | Five surfaces / review overlap | **Carry-back draws from the due-review queue** now; full successive-relearning queue once Lesson 5 lands. Intervals re-derived from a stated retention target. | §A6, Q9/11 opts. B→A, +C |
| 10 | The 85% gate | **Keep 85% as a criterion, remove the hard lock.** Recorded as a deliberate deviation from the evidence, not an improvement on it. | Q10 opt. B |
| 12 | No native speaker | **Split the constraint in two.** Feedback: solved, and COURSE_DESIGN overstates its cost. Content truth: an audit was ruled impossible, but the constraint is **weaker than stated** — a 71M-word corpus and a real dictionary are both available. **Machine translation is rejected outright.** | Q12, split + opts. D, E, C; F rejected |

Two of these are deviations from the evidence rather than applications of it, and
are marked as such wherever they land in COURSE_DESIGN:

- **Removing the mastery lock (Q10)** trades a supported design element for
  adherence in an n-of-1 learner who can uninstall the app. Defensible, not
  research-backed.

The worksheet conditional recorded here has since **resolved to cut** — it was
never printed. See §A2.

## The retention target

Stated plainly: **learn Somali for good.** Permanent retention, not a
course-shaped one. Two consequences, both concrete:

1. **The interval ladder must not terminate.** Cepeda's optimal gap is a
   proportion of the retention interval you actually want — ~20% at a few weeks,
   falling to ~5–10% at a year. Extrapolated to permanent retention, the gaps
   keep widening and the schedule never graduates an item out; it just gets
   sparse. The current ladder stops at 90 days, which encodes a target of
   roughly a year. Replace its tail: **1, 3, 7, 21, 60, 180, 365 days, then
   annually, forever.**
2. **Nothing ever leaves the queue.** "Mastered" becomes a state that decays
   back into the rota rather than an exit. This is a change of intent, not of
   algorithm — §1.4's fixed intervals still stand, because Kim & Webb found
   equal and expanding schedules statistically equivalent. What changes is the
   ladder's *span*, which is a separate question from its *shape*.

This also retires an assumption nobody had written down: that finishing the
course is the end state. For a permanent-retention target it is the *start* of
the maintenance regime, and the app has to still be useful on the day there are
no new lessons left.

---

# Part D — The plan

Four phases. Phases 1 and 2 touch no lesson content, which is the point: they
are the corrections that must land *before* anything is authored, so that
Lesson 5 tests the method rather than the method's bugs.

## Phase 1 — Correct the design document. No code, no content.

Amend COURSE_DESIGN.md. This is where Parts A and B of this memo get folded in
and this file gets deleted.

1. **Re-aim PREDICT** (§A1). Either restrict it to factual prompts, or keep it
   on the attentional justification alone. Delete the claim that it is
   load-bearing via hypercorrection — that is the part the evidence contradicts.
2. **Record the worksheet's deletion and why** (§A2). Out: "the deep-reading
   channel," and the feature with it. Keep the word-form / letter–sound-mapping
   evidence on the record as the justification for a *future* handwriting
   channel, so the idea is not lost with the artifact.
3. **Add successive relearning** as a new evidence item (§A6), and note that it
   supersedes the Layer 2 / Layer 4 split.
4. **Add the scale reality** as a new evidence item: lexical thresholds, the
   ~1,100-hour figure, aural decoding's share of listening variance.
5. **Record the §1.1 vs §1.10 conflict** (§A5) rather than resolving it, and
   reweight NOTICE accordingly in the §3.1 loop.
6. **Rebook Layer 2** in §3.2: instruction, not measurement.
7. **Split the native-speaker constraint** into feedback vs content truth.
8. **Write the scope statement**: what this app delivers, and what it does not.
9. **Record the retention target** — permanent — and its two consequences: a
   ladder that never terminates, and no exit state. Note explicitly that
   finishing the course is the beginning of maintenance, not the end.
10. **Delete `TEACHING_OPTIONS.md`.** COURSE_DESIGN is the single source of truth
    and having two documents on teaching design is the exact thing its header
    forbids.

## Phase 2 — Make the code match. Small changes, all to existing features.

11. **Delete the worksheet.** `src/pages/Worksheet.tsx`, `src/lib/worksheet.ts`,
    the `/worksheet/:id` route in `App.tsx`, the menu entry in `LessonMenu.tsx`,
    the print block in `index.css`, and any reference in `Homework.tsx` and
    `LessonCards.tsx`. Same discipline as the last commit: if nothing reaches
    it, it goes, and the docs that promised it a future go with it.
12. **Homework rebooked** — stop presenting the score as a verdict; keep
    recording it. `recordPracticeScore` stays, its presentation changes.
13. **Carry-back draws from the due queue** — `lib/homework.ts` selects from
    `reviewSchedule` rather than picking independently. One mechanism, two
    faces.
14. **Interval ladder extended for permanent retention** — `lib/review.ts` goes
    to 1, 3, 7, 21, 60, 180, 365 and then annual, with no terminal state. Items
    do not graduate out of the rota.
15. **Unit test lock removed**, 85% criterion kept and still shown, correctives
    routing unchanged.

**Gate:** `npm run build && npx vitest run && npm run validate:course && npm run lint`,
all four green, plus drive it in the browser. A green build is not evidence the
app works — that is the first rule in CLAUDE.md and it exists because of this
exact category of change.

## Phase 3 — Lesson 5 (`waa`), as a method prototype.

Its purpose is not content. It is the only instrument that can answer four
questions:

- Does the blueprint pay off once a second slot lights up?
- Does structured input where the particle is the **only** disambiguator defeat
  the First-Noun default? (§1.10 — the most distinctive claim in the design)
- Does NOTICE carry more weight than EXPLAIN? (§A5)
- Does the loop survive a concept with no English analogue?

16. **Write the kill criteria first.** Before a single card. What result would
    make you change the method? Without this the phase produces a lesson and no
    information, and self-assessment bias runs against you precisely here.
17. **Source the forms** — two independent published sources each, into
    `verified-forms.ts`. `npm run validate:course` enforces it and exits
    non-zero. Anything unsourceable gets cut, not softened. This rule is now
    the *only* thing standing between a wrong form and permanent entrenchment
    (§1.12), because no human will ever review it.
18. **Build it processing-instruction-first** — structured input weighted above
    explanation, engineered so word-order guessing fails.
19. **Drive it in the browser.** `/#/lesson/5`, start to finish, including
    homework.

## Phase 4 — Evaluate, then decide.

20. Sit the lesson against the Phase 3 kill criteria.
21. **Then** decide Unit 2: build it, change the method, or stop.

## Running alongside, whenever

22. **Trial the corpus.** Sketch Engine gives 30 days free. Run the existing
    `verified-forms.ts` through soWaC's concordancer and see what it says about
    forms already shipped — that is a real test of both the corpus's usefulness
    and the current content, at zero cost and before Lesson 5 depends on it.
    Re-run the `hadii`/`haddii` check against 71M words while you are there.
23. **Get Zorc & Osman.** The source list has no dictionary in it. Add it as a
    source type, and mind check `S5` when counting it against Wiktionary.
24. **Investigate audio for the taught forms.** `docs/Colloquial Somali.pdf` is
    from a series that ships recordings; if that audio is obtainable it verifies
    spelling against pronunciation — which works in Somali precisely because the
    orthography is phonemic — and feeds the decoding-fluency goal at the same
    time. May not be gettable; scope before committing.

**Not a source, ever:** machine translation, translation apps, and LLMs
(including me) as attestation for a Somali form. §B12a. Worth writing into
WORKING_AGREEMENT as a rule rather than leaving as a preference, because it is
the failure this project has already had once.

## Explicitly not doing

- **The vocabulary track.** At ~500 words it cannot reach a comprehension
  threshold, so its job needs redefining (word-form and decoding practice, not
  coverage) before it is worth building.
- **An SM-2 replacement.** Successive relearning needs a session counter and a
  criterion, not an algorithm. The engine was deleted for good reasons.
- **Deepening Unit 1.** It tests nothing that is uncertain.
- **Lessons 6–14.** Not until Phase 4 says the method survived.

---

# Part E — Six dictionaries arrived. What changes, and what does not.

Added to `docs/` after this memo was written. Assessed before use, because the
one thing worse than too few sources is several that turn out to be one.

## E1. What they are

| Source | Type | Text layer | Verdict |
|---|---|---|---|
| **Jawahir Abdulla Farah**, *Somali Learner's Dictionary / Qaamuuska Barashada* (HAAN Associates, 1992) | EN→SO, learner-oriented, with a pronunciation guide | **Yes** — clean, ~17.5k chars per 20pp | **Best of the batch.** Real publisher, learner-aimed, immediately usable. |
| **Suleiman Mohamoud Adam**, *New Student Dictionary / Dikshaneeriga Cusub ee Ardayda* (HAAN Publishing, 1999) | EN→SO student dictionary | Yes | Usable. Library-digitised (Boston Public Library / Internet Archive). |
| **Nicholas Awde et al.**, *Somali–English / English–Somali Dictionary & Phrasebook* (Hippocrene, 1999) | Bidirectional + phrasebook | Yes | ⚠️ **Co-authored by Martin Orwin** — who is already source `O`. See E3. |
| **Abdirahman Farah**, *Somali–English Dictionary* (A.A. Farah, 1995) | SO→EN, 248pp | **No — image only** | Needs OCR. The only SO→EN full dictionary here, so possibly worth the cost. |
| **Salim Alio Ibro**, *English — Jiddu — Somali Mini-dictionary* (1998) | Trilingual, 110pp | **No — image only** | ❌ **Do not use.** See E2. |
| **"Trebor Hog"**, *Somali English Lexicon* (Truth Ltd, 2018) | SO→EN lexicon, large | Yes | ⚠️ Quarantine pending provenance. See E4. |

## E2. The Jiddu dictionary is a source for a different language

**Jiiddu is not a dialect of Standard Somali — it is classified as a separate
language.** It belongs to the Digil cluster, and of the Digil varieties [Jiddu is
the most incomprehensible to Benadir and Northern
speakers](https://en.wikipedia.org/wiki/Jiiddu_language). Standard Somali —
which is what this course teaches, and what Nilsson and Orwin describe — is
Northern (Maxaa-tiri).

A form taken from the Jiddu column and taught as Somali would be wrong in
exactly the way §1.12 says is unrecoverable: entrenched, and with nothing
downstream to catch it. **Remove it from `docs/`, or the day will come when it
is used by accident.**

## E3. Awde is not independent of Orwin

The Hippocrene volume's title page lists **Nicholas Awde, Cabdulqaadir Xaaji Cali
Xaaji Axmed, and Martin Orwin**. Orwin is already source `O` — *Colloquial
Somali* is the second grammar this project added specifically to stop relying on
Nilsson alone.

Citing Awde and Orwin as two sources for a form is precisely the failure your
validator already detects for Nilsson under check **S5** ("cites one author twice
rather than two independent sources"), which currently flags nine forms. Awde is
usable, but **it counts as the same source as `O`.**

## E4. "Trebor Hog / Truth Ltd" needs provenance before it is trusted

The lexicon is substantial and the entries sampled look like real Somali —
`aabbe (mg) : father`, `dhiig (mg) : blood`. But:

- The author name and publisher have no lexicographic footprint.
- The EPUB metadata carries no date, description, rights or source statement.
- Its grammatical codes (`mg`, `fk`, `s`, `f`) are **not in its own abbreviation
  table**, which lists a conventional set (`m`, `f`, `n`, `v`, `adj`…) that the
  entries do not use. A dictionary whose notation is undocumented cannot be cited
  precisely, and precise citation is the whole mechanism here.
- Its shape — `somali : english (pos)`, one sense per line, heavily repeated
  headwords — reads like a database export rather than a compiled dictionary.

That last point is the risk: **if it was compiled from web sources, citing it
alongside Wiktionary is one source counted twice**, and if it was compiled from
machine translation it is the §B12a failure in book form. Quarantine until the
notation and provenance are established. It is not unusable, it is unverified.

## E5. The thing that did NOT change: Lesson 5

**All six are dictionaries. None is a grammar.**

Phase 3 builds Lesson 5, the signal system — `waa` / `baa` / `waxa` / `ma`. That
is a grammar problem, and `SOMALI_SOURCES.md §7` already records that the two
existing grammars **disagree** about it: Nilsson calls `waa` one thing, Orwin
another, and the memo notes both readings are defensible.

**No dictionary adjudicates that.** A lexicon can tell you `waa` exists; it
cannot tell you whether it is a classifier or a declarative particle, and that
distinction is what Lesson 5 has to teach. The critical path is unchanged, and
six new books do not shorten it by a day.

If anything is wanted for Lesson 5, it is a **third grammar** — Saeed's *Somali
Reference Grammar* or Puglielli — not a seventh dictionary.

## E6. The thing that did change: the S3 gap is now cheap to close

`npm run validate:course` currently reports:

```
⚠ S3  52 of 95 vocabulary entries lack 2 sources (43 verified).
      These are shown in lesson vocab decks.
```

**Fifty-two words are on screen, in front of the learner, under-sourced right
now.** That is not future content — it is a live correctness gap in shipped
material, and it is purely lexical, which is exactly what six dictionaries fix.

This is worth distinguishing sharply from the vocabulary *track*, which stays
deferred (§D, "explicitly not doing"). Sourcing words already shown ≠ building
new content. The first is repair and is now cheap; the second still needs its
job redefined.

Same for **S4**'s eleven single-source registry forms.

## E7. The new risk: independence accounting

Six dictionaries makes it *feel* as though everything now has two sources. It
does not, and the failure mode is silent:

- Awde contains Orwin (E3).
- Two are HAAN (Adam 1999, Jawahir Farah 1992) — same publisher, possibly shared
  editorial lineage.
- Trebor Hog's provenance is unknown and could derive from any of the others, or
  from Wiktionary, which is already source `Wikt` (E4).
- Somali lexicography descends from a small number of root works in any case.

**The two-source rule can be hollowed out by adding sources faster than the
independence policy.** That is the one way this batch of books makes the project
worse, and it is entirely avoidable by writing the policy first.

## E8. What this does to the corpus recommendation (§B12b)

Split it:

- **For lexical verification** — six dictionaries substantially cover what soWaC
  would have been used for. The corpus is now a *nice-to-have* here, not the
  headline.
- **For collocation and example-sentence checking** — unchanged, and still the
  only thing that touches it. Your `E10` / `V6` warnings are about sentences you
  *assembled*, and no dictionary validates an assembly. That was always the
  corpus's strongest use; it is now its main one.

Zorc & Osman (§B12c) drops in priority — you now have four usable dictionaries —
but stays the best single one if a definitive reference is ever wanted.

## E9. Housekeeping

- `.gitignore` covers `docs/**/*.pdf` but **not `.epub`**. The lexicon is
  currently untracked-and-committable; add `docs/**/*.epub`.
- `scripts/fetch-sources.mjs` knows only Nilsson and Orwin. Any source that gets
  registered needs an entry there, or extraction stays manual and undocumented.
- Two sources need OCR before they can be cited at all. Somali OCR must be
  spot-checked on `x`, `c`, `q`, `dh` and doubled vowels — an OCR error is
  indistinguishable from a spelling variant, and would enter the registry as
  fact.

## E10. Revised plan

Phases 1–4 are **unchanged**. This adds one parallel workstream, ordered so the
policy precedes the sources.

**Phase S — Sourcing. Runs alongside Phases 1–2; must complete before Phase 3
authors anything.**

- **S-1. Write the independence policy first.** What counts as two sources when
  publishers, compilers and lexicographic lineages overlap. Extend check `S5`
  to cover shared authorship across works, not just repeated citations of one
  author. **Nothing gets registered before this exists.**
- **S-2. Delete the Jiddu dictionary** from `docs/` (E2).
- **S-3. Register the three clean sources** in `SOMALI_SOURCES.md` and
  `fetch-sources.mjs`: Jawahir Farah 1992, Adam 1999, and Awde 1999 **tagged as
  non-independent of `O`**.
- **S-4. Quarantine Trebor Hog** pending provenance and notation (E4).
- **S-5. Close S3 and S4** — source the 52 shipped vocabulary entries and the 11
  thin registry forms. This is repair of live content, not new content.
- **S-6. OCR Abdirahman Farah 1995** only if S-5 leaves gaps. It is the only
  SO→EN full dictionary in the batch, but OCR cost is real and its value is
  conditional.
- **S-7. `.gitignore` the EPUB.**

**Unchanged in "explicitly not doing":** the vocabulary *track*. More
dictionaries make sourcing cheaper; they do not make the pedagogical case for
500 words stronger. §B7's lexical-threshold arithmetic is untouched.

**Added to "would actually help":** a third grammar. Six dictionaries do nothing
for the signal system, and the signal system is the whole of Phase 3.

---

# Honest limitations of this memo

Written in the spirit of COURSE_DESIGN's own limitations section, because the
same discipline applies.

- **Most findings here come from abstracts, meta-analysis summaries and
  secondary sources, not full texts.** The prequestion meta-analysis (EPR 2025)
  is paywalled and I read its abstract and summaries only. Treat the direction
  of each finding as reliable and the exact magnitudes as indicative.
- **The pretesting critique in §A1 rests on a distinction — factual vs
  conceptual — that I have not seen operationalised.** It is possible your
  PREDICT cards fall on the factual side more often than I assume. Worth
  checking against the actual cards before acting.
- **The handwriting evidence is weaker than the L2 word-form evidence.** §A2's
  recommendation leans on the latter. If the word-form finding does not
  replicate, option A (cut the worksheet) becomes correct.
- **No Somali-specific instructional research exists.** COURSE_DESIGN already
  says this and it remains true. Everything here generalises from other
  languages, mostly English-as-L2 and European languages.
- **The FSI hour figure is a classroom figure** for professional working
  proficiency with instructors, and does not transfer cleanly to solo study at a
  much lower target. It is a scale check, not a prediction.
- **Effect sizes across different outcome measures are not comparable.** The
  d = 1.21 for computer-mediated feedback and the g = 0.248 for handwriting are
  measuring different things on different populations. Do not rank interventions
  by these numbers.
- **Successive relearning's headline result is from factual material** (course
  concepts, vocabulary pairs). Grammar rules are conceptual. The technique
  should transfer, but the "more than twice" figure probably does not.
- **soWaC is not a balanced corpus.** It is a 2016 web crawl weighted towards
  news, politics and religious sites, so register is skewed and it will contain
  the same non-standard spellings it is meant to adjudicate. Frequency ratios
  from it are evidence, not verdicts — the same standard D2 already applies to
  the `hadii`/`haddii` count. Its POS tagging is a Universal-Dependencies parse
  of a morphologically rich language and should be treated as approximate.
- **A corpus shows what occurs, not what is correct.** Absence across 71M words
  is a strong negative signal; presence is a weak positive one. It cannot
  validate a sentence you constructed, only the pieces you built it from.
- **I have not used soWaC.** The recommendation rests on its published
  description, not on having run a query against it. Trial it before relying on
  it — that is why it is step 22 and not a precondition for Lesson 5.
