# Technology Stack

> **Status:** local-only, no backend
> **Last Updated:** 2026-08-07

## Philosophy

Add technology reluctantly. Each dependency must earn its place in bundle size and
maintenance. The app is a static Somali lesson course — it doesn't need a backend,
accounts, or a graph engine to do that.

---

## Current Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | React | 19.2 | UI |
| Language | TypeScript | 5.9 | Type safety |
| Build Tool | Vite | 7.2 | Bundling |
| Router | React Router | 7.6 | SPA navigation |
| State | Zustand | 5.0 | Progress store, persisted to `localStorage` |
| Styling | Tailwind CSS | 3.4 | CSS |
| Components | shadcn/ui + Radix | latest | UI primitives |
| Animation | Framer Motion | 12.38 | Transitions |
| Forms/validation | react-hook-form + Zod | latest | Forms |
| Testing | Vitest | 4.1 | Unit tests |
| Icons | Lucide React | 0.562 | Icons |

## Data model

All lesson content is static TypeScript data, generated from `COURSE.md` by
`scripts/course-to-app.cjs` into `src/data/teaching-content.ts`, plus hand-curated
`src/data/vocabulary.ts`. There is no database and no network call in the learning
flow. Progress (completed lessons, streak, XP, SRS cards, card position) lives in
one Zustand store (`src/stores/progress-store.ts`) persisted to `localStorage`.

## Removed (formerly "Tier 2 Pragmatic Hypergraph")

An earlier plan added a Supabase-backed knowledge-graph engine (`src/engine/`),
content-addressed chunk storage (`hash-wasm`), a SQLite-WASM persistence layer
(`sql.js`), and account-based cloud sync (`@supabase/supabase-js`). None of it
was part of the actual learning flow, and the Supabase sync layer had drifted out
of sync with the real schema (querying tables that didn't exist in the tracked
migration). All of it — the engine, the graph pages, Supabase, and those three
dependencies — was removed. See `docs/PONYTAIL_DEBT.md` for the removal log.

## Explicitly rejected

| Tech | Why Rejected |
|------|-------------|
| Any backend/database | Content is static; progress is local. Nothing here needs a server. |
| Neo4j / graph DBs | No graph left to store. |
| GraphQL | No server to query. |
| Redux Toolkit | Zustand is sufficient. |
| Next.js | No SSR needed; adds complexity. |
