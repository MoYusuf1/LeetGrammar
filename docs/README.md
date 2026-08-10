# LeetGrammar Documentation

> **Start here.** LeetGrammar is a local-only Somali grammar course — no
> accounts, no backend, progress in `localStorage`.
>
> **Current state: 4 lessons, all source-verified.** See
> [STATE_OF_PLAY.md](./STATE_OF_PLAY.md) for exact numbers and what is next.

## Navigation

| Document | Purpose |
|----------|---------|
| [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md) | **Read before changing anything.** The rules, the three gates, environment gotchas |
| [STATE_OF_PLAY.md](./STATE_OF_PLAY.md) | What exists, known debt, next step, open questions |
| [SOMALI_SOURCES.md](./SOMALI_SOURCES.md) | Verified linguistic facts with citations |
| [POSTMORTEM.md](./POSTMORTEM.md) | Why the rules exist — the failures that produced them |
| [COURSE_DESIGN.md](./COURSE_DESIGN.md) | Pedagogical design target (**broader than what is built**) |
| [TECH_STACK.md](./TECH_STACK.md) | Stack inventory and philosophy |
| [PONYTAIL_DEBT.md](./PONYTAIL_DEBT.md) | Over-engineering / structural cleanup log |

## The three gates

```bash
npm run build            # types; an ExerciseType with no renderer
npx vitest run           # exercise shape, grading, placeholders, structure
npm run validate:course  # sourcing, jargon, exercise mix, objective coverage
```

All three must pass. None of them, alone or together, proves a learner can
finish a lesson — **open the browser and drive it.** The worst bug in this
project's history compiled cleanly and passed every check that existed at the
time.

## Where the course lives

`src/data/authored-lessons.ts` is the only source of lesson content.
`src/data/verified-forms.ts` is the sourcing gate: no Somali reaches a learner
unless it is in that registry with citations.

## History

An earlier iteration pursued a Supabase-backed "knowledge hypergraph"
architecture (property graph + construction hypergraph, multi-textbook
ingestion, graph-aware SRS). That system was never part of the learning flow and
was removed — see [PONYTAIL_DEBT.md](./PONYTAIL_DEBT.md).

A later pass rebuilt the course as 14 lessons and reported it complete. It was
not: the first lesson could not be finished, the whole course held three
exercises, and the Somali was generated from model memory rather than sourced.
It was cut back to 4 lessons that are real, and the tooling in the gates above
was added so that "done" is checkable rather than asserted. See
[POSTMORTEM.md](./POSTMORTEM.md).
