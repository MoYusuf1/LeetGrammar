# LeetGrammar Documentation

> **Purpose:** This directory tracks technical decisions and structural debt for the app.

## Navigation

| Document | Purpose |
|----------|---------|
| [TECH_STACK.md](./TECH_STACK.md) | Current stack inventory and philosophy |
| [PONYTAIL_DEBT.md](./PONYTAIL_DEBT.md) | Running log of over-engineering / structural cleanup |

## History

An earlier iteration of this app pursued a Supabase-backed "knowledge hypergraph"
architecture (property graph + construction hypergraph, multi-textbook ingestion,
graph-aware SRS). That system (`src/engine/`, the `Concepts/Curriculum/Ingest/
Quiz/Review/StudyHub/Wiki` pages, and the Supabase schema behind them) was never
part of the actual learning flow and was removed — see `docs/PONYTAIL_DEBT.md` for
the removal log. The app is now local-only: one 26-lesson card course, static data,
progress persisted to `localStorage`, no accounts.
