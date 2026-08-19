# Known debt

> **Last updated:** 2026-08-18, when this was split out of STATE_OF_PLAY.
>
> Every open problem in the course and the app, with why it is open. Items
> marked ✅ are resolved and kept because the reasoning is worth not
> rediscovering.
>
> **Split out of STATE_OF_PLAY.md in Aug 2026.** Items 9–14 had drifted below
> that file's "Reading order for someone new" section, so anyone reading
> top-down stopped before reaching them.
>
> The plan that acts on these: [PLAN.md](./PLAN.md).
> What exists today: [STATE_OF_PLAY.md](./STATE_OF_PLAY.md).

---

### 1. 5 of 95 vocabulary entries lack two sources 🟡

Was 60 with *no* citation at all, then 52. Three dictionaries arrived in August
2026 and the pass against them, both grammars and Wiktionary took it to **5**.
Registry: 109 forms, 98 with two or more independent citations (4 more are
derived forms resting on a rule, 7 are genuinely thin). Method, traps and
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
