@AGENTS.md

## Claude Code specifics

Everything above is tool-neutral and shared with other agents. Keep it that way —
add Claude-only instructions here, not to `AGENTS.md`.

- The `source-a-form` skill loads `docs/SOURCING.md` on demand. Other agents are
  pointed at that file directly.
- A `Stop` hook in `.claude/settings.json` runs `npm run gates` when `src/` or
  `scripts/` has uncommitted changes, and blocks the turn if they fail. It is a
  safety net, not a substitute for running the gates yourself.
- `.claude/rules/` holds two path-scoped rules that load only when you touch
  matching files: visual conventions for components and CSS, content rules for
  `src/data/`. Other agents get the same material by following the links in
  `AGENTS.md` — keep the two in step.
