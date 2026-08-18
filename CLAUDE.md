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

## Looking up a Somali form

**Don't hand-roll a grep-and-regex search over `sources/*.txt`.** Run
`node scripts/lookup.mjs <word>` — it searches all extracted sources at once and
resolves printed folios per book, so you don't have to compute a PDF↔printed
offset by hand (it drifts within a single book; see
[docs/SOMALI_SOURCES.md](docs/SOMALI_SOURCES.md)). Full method, traps, and what
still needs a page read: `docs/SOMALI_SOURCES.md`.

This repo is small (44 files, ~9k lines) — `rg`/`grep` are the right tool for
everything else. There is no codebase graph here; a prior one existed and was
removed because it silently went stale for 68 commits before anyone noticed.
