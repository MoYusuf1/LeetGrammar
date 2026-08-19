# Working agreement

> How to change this repo without reintroducing the failures in
> [POSTMORTEM.md](./POSTMORTEM.md). Every rule below exists because its absence
> shipped a specific bug. None of them are style preferences.

Read this before touching lesson content or the lesson player.

---

## The five rules

### 1. A green build is not evidence the app works

`tsc` passing means the types line up. It does not mean a learner can finish a
lesson. The worst bug in this project's history — Lesson 1 being impossible to
complete — compiled cleanly, passed every check that existed, and was reported
as done.

**If a change is observable in the browser, open the browser and drive it.**
Not "it should work" — click through the actual cards.

```bash
npm run dev    # then http://localhost:3000/#/lesson/1
```

### 2. Verify logic in tests, use the browser for looks

Corollary to rule 1, and the more useful half.

Grading logic used to live inside `LessonCards.tsx`, so the only way to check it
was to drive the UI. When an unscramble graded correct answers as wrong, it took
many rounds to tell a real bug from browser-automation flakiness — animation
timing, a stale service worker, and React rejecting synthetic input events all
produced identical-looking "failures".

Grading now lives in [`src/lib/grading.ts`](../src/lib/grading.ts) with direct
tests. **Pure logic belongs outside components.** Use the browser to confirm it
*looks* right, not to determine whether it *is* right.

### 3. Cut what you cannot source. Do not soften it, do not stub it

The previous course had 14 lessons. Ten were headings with no content, and the
Somali in the other four was generated from memory — including a feminine "they"
that does not exist in the language.

Scope was cut to 4 lessons that are real. **A narrow course that is correct beats
a broad one that is decorative.** If a fact is needed and cannot be sourced,
remove the fact and the sentence around it.

Placeholders (`[VERIFY]`, `[TODO]`, `[HINT]`) are banned in shipped data and a
test fails on them. Ten auto-generated `[VERIFY SOMALI]` items were once added
purely to push an item count past a validator threshold.

### 4. A test that cannot fail is decoration — prove it bites

After writing a regression test, **inject the original defect and confirm it
fails**, then revert. Do this every time.

```bash
# the actual procedure used
cp src/data/authored-lessons.ts /tmp/bak
# ...introduce the defect...
npx vitest run          # expect failures naming the defect
cp /tmp/bak src/data/authored-lessons.ts
npx vitest run          # expect green
```

Same for the validator (`npm run validate:course`). It once ran 36 checks
against source files it read as *strings*, reporting errors about deleted
content while passing a course whose first lesson softlocked.

Every regression test in `src/tests/` carries a comment naming the defect it
guards. Read that comment before relaxing an assertion.

### 5. No Somali reaches a learner unless the registry has it

[`src/data/verified-forms.ts`](../src/data/verified-forms.ts) is the gate.
`npm run validate:course` checks every Somali string in exercise answers and
lesson prose against it and **exits non-zero** on anything missing.

Two sources minimum. One source is allowed but must be declared
`confidence: 'single'` so thin sourcing is visible rather than implied.

**Do not invent a citation.** While building this very gate, two entries were
added citing sections of Nilsson where the words do not appear. Fabricating a
citation is the same failure as fabricating a word, one level up — and it is
harder to catch, because it looks like diligence.

---

## The gates

Run `npm run gates` before saying anything is done. One command, so no agent
has to remember the list:

| Command | Catches |
| --- | --- |
| `npm run build` | type errors; an `ExerciseType` with no renderer |
| `npx vitest run` | exercise shape, grading, placeholders, course structure |
| `npm run validate:course` | sourcing, jargon, exercise mix, objective coverage |
| `npm run lint` | **zero** errors is the baseline |

Lint used to report ~10 errors, all in vendored shadcn `ui/*` boilerplate; that
directory is gone. Zero is now the baseline — a lint error is yours, and there
is no pre-existing noise to hide it.

---

## Adding lesson content

1. **Source it first.** Two independent sources. Record them in
   [SOMALI_SOURCES.md](./SOMALI_SOURCES.md). Read the independence rules there
   before counting two — "two books" and "two sources" are not the same thing.
2. **Add to the registry** — `src/data/verified-forms.ts`, with the source keys.
3. **Write the lesson** in `src/data/authored-lessons.ts`.
4. **Run the gates** (`npm run gates`).
5. **Open the browser and complete the lesson**, including every new exercise.

### Machine translation is never a source

**Do not verify a Somali form with Google Translate, a translation app, or an
LLM — including the one you are talking to.** Not as a first source, not as a
tiebreak, not "just to sanity-check."

Three reasons, any one sufficient:

- **It is not independent.** Somali is low-resource. Translation systems train
  on the same small pool this project already draws from, so citing one is
  circular — it *defeats* the two-source rule rather than failing it.
- **The training data for these languages is known to be bad.** An audit of 205
  web-crawled language corpora found at least 15 with no usable text at all and
  a significant fraction under 50% acceptable quality, concentrated in exactly
  this tier of language.
- **A translator cannot say no.** Feed it something malformed and it returns
  fluent English with no signal anything was wrong. The one thing a checker must
  do is decline, and this is the one thing it structurally cannot do.

An LLM will also produce plausible *citations* for its plausible Somali. That is
not hypothetical here — it is [how the invented citations in this project's
history got there](./SOMALI_SOURCES.md), and it is what
[POSTMORTEM.md](./POSTMORTEM.md) exists to record.

Corpora are different and are allowed: a concordance shows attested usage rather
than generating text. See COURSE_DESIGN's "The learner" section.

### Exercise authoring rules

- `question`, `hint`, and `explanation` are required on every exercise.
- **Choice types** (`multiple_choice`, `fill_blank`, `matching`) put the answer
  in `correctAnswer`, which must be one of `options`.
- **Everything else** puts it in `answer`. `isAnswerCorrect()` reads `answer`
  and nothing else.
- **Never set `somali` on an `unscramble`.** That field renders above the word
  bank; on a reordering exercise it hands over the answer. A test enforces this.
- `answer` may be an array when Somali genuinely has variants (`gabadha` /
  `gabarta`). All entries are accepted.
- Card `type` is a *pedagogical role* (`notice`, `complete`, `produce`).
  Exercise `type` is an *interaction shape*. Do not mix them — conflating the
  two is what caused the Lesson 1 softlock.

### Plain-language rule

Linguistics jargon is banned from learner-facing text and the validator fails on
it. The list is [`src/data/banned-terms.ts`](../src/data/banned-terms.ts);
`/glossary` bridges the plain terms to the technical ones for learners using
outside resources.

Say "the t-type ending", not "the feminine determiner suffix".

---

## Environment gotchas

Each of these cost real debugging time. They are not hypothetical.

**A service worker serves stale bundles.** This caused at least three
false bug reports — code that was already fixed appeared broken, and the dev
server was serving the *correct* file the whole time. It will do the same to you
after a deploy. When behaviour contradicts the source:

```js
// in the page console
(await navigator.serviceWorker.getRegistrations()).forEach(r => r.unregister());
(await caches.keys()).forEach(k => caches.delete(k));
```
Then open a **new tab** — reloading the existing one is not always enough.

**The app uses `HashRouter`.** URLs are `http://localhost:3000/#/lesson/1`.
Navigating to `/lesson/1` silently renders the landing page instead.

**React ignores programmatic `input.value`.** Scripted typing via the native
setter did not register; the "Check Answer" button stayed disabled and looked
like a bug. Use real typed input when testing free-response exercises.

**The validator imports TypeScript directly.** Node ≥22 strips types natively,
so `scripts/validate-course.mjs` imports `../src/data/*.ts` and inspects real
objects. No build step, no parsing. Keep it that way — the previous
regex-over-strings approach is what made it useless.

**The reference grammar is a PDF.** `WebFetch` cannot read it. Run
`npm run fetch:sources`, which downloads it and runs `pdftotext -layout` into
the gitignored `sources/`. Every `N §x.y` citation resolves to a `§` heading in
that file. Do not rely on an extract left over from a previous session — the
command is the source of truth, so any tool or person can reproduce it cold.

**The lesson player animates card transitions.** Those animations need
`requestAnimationFrame`, which a hidden or headless browser never fires, so
`AnimatePresence mode="wait"` never swaps the next card in: the counter
advances over frozen content and it looks exactly like a softlock. Before
driving the player, set `localStorage.setItem('lg-motion', 'off')` and reload.
See `src/lib/reduced-motion.ts` and docs/ADDING_CONTENT.md.

---

## Repository shape

| Path | Role |
| --- | --- |
| `src/data/authored-lessons.ts` | **The course.** Only source of lesson content |
| `src/data/verified-forms.ts` | Sourcing gate — every Somali form + citations |
| `src/data/vocabulary.ts` | Per-lesson vocab decks |
| `src/data/types.ts` | Card / exercise / lesson types |
| `src/lib/grading.ts` | Answer checking (pure, tested) |
| `src/components/lesson/LessonCards.tsx` | The lesson player |
| `scripts/validate-course.mjs` | Content quality gate |

`MAX_LESSON_ID` and `LESSON_LIST` are **derived** from `AUTHORED_LESSONS`. They
cannot drift. Do not hardcode a lesson count anywhere — a stale "26 lessons"
string survived in the landing page long after the course had four.
