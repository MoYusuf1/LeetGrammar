## Read this first

**Before changing lesson content or the lesson player, read
[docs/WORKING_AGREEMENT.md](docs/WORKING_AGREEMENT.md).** It is short, and every
rule in it exists because its absence shipped a specific bug.

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

Gates — all three, every time:

```bash
npm run build && npx vitest run && npm run validate:course
```

Current state, known debt and open questions:
[docs/STATE_OF_PLAY.md](docs/STATE_OF_PLAY.md).
Why the rules exist: [docs/POSTMORTEM.md](docs/POSTMORTEM.md).

`src/data/authored-lessons.ts` is the course — the only source of lesson content.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
