# AGENTS.md

Instructions for any coding agent working in this repository. Tool-neutral by
design: Kimi Code, Codex, Cursor and others read this file directly; Claude Code
reads it via an `@AGENTS.md` import in `CLAUDE.md`.

**Keep this file tool-agnostic.** Anything specific to one agent belongs in that
agent's own config, and should point back here rather than restating.

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

## Gates

Run all four before calling any change done:

```bash
npm run gates
```

That is `build && vitest && validate:course && lint`. Run it as one command so
no agent has to remember the list.

## Sourcing a Somali form

A procedure, not a fact: **[docs/SOURCING.md](docs/SOURCING.md)**. Read it before
adding any vocabulary or lesson content.

Start with `node scripts/lookup.mjs <word>` — never hand-roll a grep over
`sources/*.txt`.

## Finding your way around

`rg`/`grep` are the right tools here — the repo is 44 files, ~9k lines. There is
no codebase graph; one existed and was removed after it went stale for 68
commits without anyone noticing.

`src/data/authored-lessons.ts` is the course — the only source of lesson content.

Current state, known debt and open questions:
[docs/STATE_OF_PLAY.md](docs/STATE_OF_PLAY.md).
Why the rules exist: [docs/POSTMORTEM.md](docs/POSTMORTEM.md).
