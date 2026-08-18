## Read this first

**Before changing lesson content or the lesson player, read
[docs/WORKING_AGREEMENT.md](docs/WORKING_AGREEMENT.md).** It is short, and every
rule in it exists because its absence shipped a specific bug.

**Before changing anything visual, read
[docs/UI_CONVENTIONS.md](docs/UI_CONVENTIONS.md).** It records the settled taste
of this app — iOS, black and white, flat, nothing on screen that is not needed —
and, more usefully, a list of what has already been tried and rejected. Do not
re-propose a gradient, a coloured accent, a swipe gesture or a bento grid
without reading why they went.

The three things most likely to bite you:

1. **A green build does not mean the app works.** The worst bug in this project's
   history — the first lesson being impossible to complete — compiled cleanly and
   passed every check that existed. If a change is visible in the browser, open
   the browser and drive it. The app uses `HashRouter`: `/#/lesson/1`.
2. **No Somali reaches a learner unless `src/data/verified-forms.ts` has it**
   with two sources. `npm run validate:course` enforces this and exits non-zero.
   Do not invent a citation — that has already happened here once.
3. **Cut what you cannot source.** Do not soften it, do not stub it. Placeholder
   markers (`[VERIFY]`, `[TODO]`) fail a test.

Gates — all four, every time:

```bash
npm run build && npx vitest run && npm run validate:course && npm run lint
```

Current state, known debt and open questions:
[docs/STATE_OF_PLAY.md](docs/STATE_OF_PLAY.md).
Why the rules exist: [docs/POSTMORTEM.md](docs/POSTMORTEM.md).

`src/data/authored-lessons.ts` is the course — the only source of lesson content.

Sourcing a Somali form is a procedure, not a fact — it lives in the
`source-a-form` skill, which loads on demand. Start with
`node scripts/lookup.mjs <word>`; never hand-roll a grep over `sources/*.txt`.

`rg`/`grep` are the right tools for everything else here — the repo is 44 files.
There is no codebase graph; one existed and was removed after it went stale for
68 commits without anyone noticing.
