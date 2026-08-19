---
paths:
  - "src/data/authored-lessons.ts"
  - "src/data/vocabulary.ts"
  - "src/data/verified-forms.ts"
  - "src/data/unit-tests.ts"
---

# You are touching learner-facing content

Two documents own this: **[docs/LESSON_CONVENTIONS.md](../../docs/LESSON_CONVENTIONS.md)**
for how the prose sounds, and **[docs/ADDING_CONTENT.md](../../docs/ADDING_CONTENT.md)**
for the mechanics. Read the relevant one before writing.

**No Somali reaches a learner unless `verified-forms.ts` has it with two
independent sources.** The `source-a-form` skill has the procedure; start with
`node scripts/lookup.mjs <word>`. Do not invent a citation — that has happened
here, and it is the failure [POSTMORTEM.md](../../docs/POSTMORTEM.md) exists to
record.

Cut what you cannot source. Do not soften it, do not stub it. `[VERIFY]` and
`[TODO]` markers fail a test.

Authoring traps that have each caused a real bug:

- **Card `type` is a pedagogical role** (`notice`, `complete`, `produce`).
  **Exercise `type` is an interaction shape.** Conflating them caused the Lesson
  1 softlock — the worst bug this project has had.
- **Choice types** (`multiple_choice`, `fill_blank`, `matching`) put the answer
  in `correctAnswer`, which must be one of `options`. Everything else uses
  `answer`, and `isAnswerCorrect()` reads `answer` only.
- **Never set `somali` on an `unscramble`** — that field renders above the word
  bank and hands over the answer. A test enforces this.
- **No linguistics jargon** in learner-facing text. Say "the t-type ending", not
  "the feminine determiner suffix". The validator fails on the banned list.
- **An item must not contain its own answer.** An exercise once asked which
  throat letter `libaax` ends with, printed the word, and offered `x` as an
  option. No gate catches this; only reading it does.

Run `npm run gates` when done, then **open the browser and complete the lesson**,
including every new exercise. Three softlocks have passed build, tests and the
validator.
