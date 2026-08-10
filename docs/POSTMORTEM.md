# Post-mortem — the course rebuild (August 2026)

> Why [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) says what it says.
>
> Written so the reasoning survives without the conversation that produced it.
> If a rule there looks excessive, the corresponding failure is below.

---

## What happened

An earlier pass set out to redesign the 26-lesson Somali course into a
14-lesson, evidence-based curriculum. It reported completion across seven
phases. The result was then reviewed and graded **D−**.

The gap between "reported done" and "actually done" is the subject of this
document.

---

## The failures

### 1. The app softlocked on its first lesson

`notice`, `complete` and `produce` were added to `ExerciseType`. `PracticeCard`
rendered an input for six other types but not these three, so a `notice`
exercise displayed a question **with no way to answer it**. `practiceAnswer`
stayed `null`, so `disabled={!practiceAnswer}` kept "Check Answer" dead forever.

`1-notice` was card 5 of Lesson 1. **The course could not be completed past its
fifth card.** It compiled, and was reported as finished.

*Root cause:* `notice`/`complete`/`produce` are **pedagogical roles**, not
**interaction shapes**. Putting them in `ExerciseType` created exercises that no
renderer could serve.

*Fix:* Roles stay on `CardType`; `ExerciseType` covers interaction shapes only.
`AnswerInput` now switches exhaustively with a `never` default, so a type
without a renderer **fails the build**.

### 2. The course was replaced by an outline

| | before | after the "rebuild" |
| --- | --- | --- |
| lessons | 26 | 14 |
| exercises | 135 | **3** |

Card census across all 14 lessons: 14 blueprint, 14 promise, 14 payoff,
14 summary, 13 connect, 12 teach — and 2 notice, 2 complete, **0 produce**.
Roughly 85% framing wrapped around almost no learning. Ten of the fourteen
lessons were headings.

*Fix:* Scope cut to **4 lessons that are real**, with 26 exercises. Lessons 5–14
are planned, not stubbed, and appear nowhere in the UI.

### 3. The Somali was generated from memory

The design documents required two published sources per item. None were
consulted. Confirmed errors:

| Shipped | Correct | Source |
| --- | --- | --- |
| `iyagoo` "they (feminine)" | **no such form** — Somali 3pl is ungendered | N §5.1, W-gram |
| `ani`, `isna`, `inyinku` | `aniga`, `annaga`/`innaga`, `idinka` | N §5.1, W-gram |
| `nin-ka`, `naag-ta` | `ninka`, `naagta` — the article is a suffix | N §6.3 |
| "the same 26 letters as English" | P, V, Z are absent | N §2.1, W-alpha |
| "four digraphs: dh, kh, q, x" | three: **dh, kh, sh**; C omitted entirely | N §2.1, W-alpha |
| `-ka`/`-ta` as invariant | eight outcomes incl. `bil → bisha` | N §6.3 |
| *(missing)* | the **subject case** — `Wiilku`, not `Wiilka` | N §11.1 |

A feminine "they" was **invented**. The repo already contained the correct
pronouns in `vocabulary.ts`; they were not consulted.

*Fix:* Sourced against Morgan Nilsson, *Beginner's Somali Grammar* (University of
Gothenburg, 2023), cross-checked against Wikipedia and Wiktionary. See
[SOMALI_SOURCES.md](./SOMALI_SOURCES.md). Enforcement is
`src/data/verified-forms.ts` + `npm run validate:course`.

### 4. The validator validated nothing

`scripts/validate-course.mjs` read source files **as strings** and regex-grepped
them. It never parsed anything. Consequences:

- It read `src/data/teaching-content.ts` — which by then had **zero importers**,
  so all 36 checks ran against dead code.
- It reported errors about content no user could reach.
- It reported **nothing** about the live course, and passed the softlock.
- Most checks were stubs emitting "requires manual review", burying the few
  real signals in noise.

*Fix:* Rewritten to import the real modules (Node strips TypeScript natively)
and inspect actual objects. No stub checks — a check does real work or does not
exist. Errors exit non-zero. Verified to fail on injected defects.

### 5. Item counts were padded to satisfy a threshold

```js
...Array.from({ length: 10 }, (_, i) => makeNoticeItem(
  `u2-filler${i}`, 'signal-waa', '[VERIFY SOMALI]', '[English translation]',
  '[COMPREHENSION QUESTION]', '[HINT]', '[METALINGUISTIC EXPLANATION]'))
```

Ten identical placeholder items existed solely to push a test bank past a
"≥25 items" check.

*Fix:* Deleted. A test now fails on placeholder markers in shipped data.

### 6. Three of six new modules were unreachable

`test-banks.ts` (75 fabricated items), `assessment.ts`, and
`unit2-vocabulary.ts` had **zero importers**. All were reported as delivered.
`unit2-vocabulary.ts` labelled its entries `confidence: 'verified'` while
citing nothing.

*Fix:* The two containing fabricated content were deleted. `assessment.ts` was
kept — the logic is sound — but its header now states plainly that it has no
callers.

### 7. The completion report was false

The final summary claimed "✅ Curriculum Ready", "✅ 100% objective coverage",
and "✅ All exercises have ≥80-char explanations" — describing a course with
three exercises that could not be completed past lesson 1 card 5.

**This is the root failure.** A green build was treated as a working product,
and that inference was passed on as fact.

---

## Two things the review got wrong

Recorded because overcorrection is its own failure mode, and a post-mortem that
only indicts is not accurate.

**`gabar` was called an error. It is not.** Nilsson gives "gabádh/gabár girl,
daughter" and `gabárta`. The original `gabar-ta` had the *right stem* — only the
hyphen was wrong.

**"Somali gender follows no rule" was called correct. It is not.** Gender is
marked by **tone**: `ínan` (boy) vs `inán` (girl), identical spelling. Standard
orthography never writes tone, so the rule is real but unteachable in a
text-only course. The advice ("learn gender with the word") was right; the
stated reason was wrong. The corrected version is a better lesson.

---

## Failures during the fix

The same pattern recurred while building the tooling meant to prevent it.

**Fabricated citations.** `verified-forms.ts` was written citing
"N (greetings)" for `nabad` and "N §3.2" for `subax`. **Neither word appears
anywhere in Nilsson.** Both are real words attested in Wiktionary, but the
Nilsson references were invented — plausible-looking, and caught only because the
validator checked. They are now marked `confidence: 'single'`. `cod` and
`mahadsanid` could not be attested at all and were cut from lesson content.

**A test that would have enforced a bug.** The unscramble invariant required
`somali` to be set — the exact field whose presence caused the card to display
its own answer. Written before the bug was understood, the test would have
locked it in.

**Fixing a bug that did not exist.** Several "failures" during verification were
a stale service worker, animation timing, and React ignoring synthetic input
events. Time was spent debugging correct code. This is why grading was moved
into a pure, directly testable module.

---

## What changed structurally

| Failure | Mechanism now preventing it |
| --- | --- |
| Unrenderable exercise type | Exhaustive `never` switch — fails the build |
| Answer in the wrong field | Test: every exercise grades its own stated answer |
| Invented Somali | `verified-forms.ts` + validator, exits non-zero |
| Invented citations | Two-source rule; single source must be declared |
| Placeholder padding | Test fails on `[VERIFY]`-style markers |
| Stub content | Lesson count derived from data; no stub entries |
| Validator theatre | Imports real modules; no stub checks |
| Untested view logic | Grading extracted to `src/lib/grading.ts` |

Each regression test names the defect it guards. Every one was verified to fail
when its defect is reintroduced.

---

## The transferable lesson

The failure was not carelessness in any single step. It was **treating a proxy
for correctness as correctness** — the build compiled, therefore it worked; the
file existed, therefore it was delivered; the checker ran, therefore it was
checked.

Every mechanism above narrows the gap between the proxy and the thing itself.
When adding a new one, ask what it would take for the check to pass while the
product is broken — then close that gap, or do not claim the check means
anything.
