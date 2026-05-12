# Integration Plan: v2 Schema → LeetSomali App

## Research Summary

### Current State (v1)
- **No real lesson page exists.** Learn → `/workbook/level/:id` (static drills only)
- **All content hardcoded** in `src/data/workbook.ts` (7 levels, ~140 drills)
- **DB schema:** Migrations 0001–0010 with JSONB blobs (`labels`, `attributes`, `qualifiers`)
- **Graph data:** Loaded via RPC `get_full_graph()` into in-memory engine + SQLite cache
- **User data:** `profiles`, `user_progress`, `workbook_attempts`, `learner_concept_states`, `review_logs`

### v2 State (in `docs/` only)
- **Clean relational schema** (`schema.sql`): 14 tables, normalized columns, no JSONB blobs
- **Seed data** (`seed.sql`): 1,055 rows, zero orphans, 11 lessons, 330 nodes, 57 chunks
- **Types + queries** (`types.ts`, `queries.ts`): 17 types, 14 query helpers, 7 RPCs
- **Not integrated anywhere** — no `src/lib/supabase/`, no migration, no frontend consumption

### Critical Gap
- v2 `schema.sql` **drops all existing tables** and recreates them with different columns
- v2 `seed.sql` replaces all data — existing user progress would be lost
- Domain files (`domain_*.sql`) use **v1 JSONB format** and are incompatible with v2 schema

---

## Integration Options

### Option A: Additive Sidecar (Recommended for Production)

**Philosophy:** Leave the existing v1 schema completely untouched. Create v2 tables alongside it, seed only pedagogical content, and let the frontend query v2 while v1 tables stay for backward compatibility.

**Migration:** `0011_v2_lessons_sidecar.sql`
```sql
-- NEW tables only (no breaking changes to existing tables)
CREATE TABLE graph_lessons (...)
CREATE TABLE lesson_chunks (...)
CREATE TABLE content_edges (...)
CREATE TABLE concept_edges (...)
CREATE TABLE exercise_items (...)
CREATE TABLE exercise_concepts (...)

-- v2-compatible views over existing tables (optional)
CREATE VIEW v2_graph_nodes AS
  SELECT id, type, labels->>'default' as label_default, ...
  FROM graph_nodes;
```

**What gets seeded:**
- `graph_lessons`: 11 rows (Colloquial Units 1-4, Zorc Chapters 2-4, 8, 12)
- `lesson_chunks`: 77 rows
- `content_edges`: 93 rows (TEACHES/DEFINES/EXEMPLIFIES)
- `concept_edges`: 339 rows (REQUIRES/IS_A/PART_OF) — seeded independently from existing `graph_edges`
- `exercise_items` + `exercise_concepts`: from v2 seed

**What stays as-is:**
- `graph_nodes` (v1 JSONB format) — still queried by `get_full_graph()` RPC
- `graph_edges` (v1 format) — still queried by graph engine
- `graph_chunks` (v1 format) — still used by StudyHub
- `graph_exercises` (v1 format) — still used by problem drills
- `user_progress`, `workbook_attempts`, `learner_concept_states`, `review_logs`

**Frontend changes:**
1. Create `src/lib/supabase/v2-types.ts` + `v2-queries.ts`
2. Create `src/hooks/useGraphLessons.ts` — fetches from `graph_lessons` + `lesson_chunks`
3. Create `src/pages/Lesson.tsx` — renders lesson content from v2 tables
4. Update `src/pages/Learn.tsx` — replace mock grid with real v2 lesson grid
5. Add `/lesson/:id` route
6. Keep `/workbook/level/:id` for legacy workbook drills

**Pros:**
- Zero risk to existing user data
- Zero risk to existing graph engine / StudyHub / Review tabs
- Can A/B test v2 lessons alongside v1 workbook
- Easy rollback (just don't render v2 components)

**Cons:**
- Two parallel schemas to maintain temporarily
- `graph_nodes`/`graph_chunks` data is duplicated between v1 and v2 seeds
- Concept IDs in v2 seed may diverge from v1 concept IDs over time

**Estimated effort:** 4–6 hours

---

### Option B: Clean Slate v2 (Fastest for Development)

**Philosophy:** Nuke the dev database, apply v2 schema fresh, seed with clean data, and rebuild the frontend to use only v2 tables.

**Steps:**
1. Run `v2/schema.sql` → drops all tables, creates v2 schema
2. Run `v2/seed.sql` → 1,055 clean rows
3. Run `v2/rpc_functions.sql` → replaces RPCs
4. Copy `v2/types.ts` → `src/lib/supabase/types.ts`
5. Copy `v2/queries.ts` → `src/lib/supabase/queries.ts`
6. Rewrite `useHybridProgress.ts` to use v2 queries
7. Create `Lesson.tsx` page
8. Update `Learn.tsx` to render v2 lesson grid
9. Sunset `src/data/workbook.ts`, `src/data/lessons-complete.ts`

**Pros:**
- Cleanest code — no adapters, no dual schemas
- All v2 features work immediately (full-text search, prerequisite chains, recommended lessons)
- Frontend code is simplest

**Cons:**
- **DESTROYS all existing user data** (progress, review logs, profiles)
- Breaks the graph engine (`graph-store.ts`) which expects v1 table format
- Breaks `get_full_graph()` RPC which returns v1 shapes
- Breaks StudyHub, Quiz, Review tabs until they're rewritten
- The `domain_*.sql` files in v2/ are v1-format and won't work
- Requires rewriting ~8 frontend files at once

**Estimated effort:** 8–12 hours (plus fixing everything that breaks)

---

### Option C: Gradual Bridge (Most Complex, Best Long-term)

**Philosophy:** Migrate the existing v1 schema in-place to v2 format, preserving all user data and graph content.

**Phase 1 — Schema Transformation:**
```sql
-- Migrate graph_nodes JSONB → normalized columns
ALTER TABLE graph_nodes ADD COLUMN label_default TEXT, ...;
UPDATE graph_nodes SET label_default = labels->>'default', ...;
ALTER TABLE graph_nodes DROP COLUMN labels, DROP COLUMN attributes;

-- Split graph_edges into concept_edges + content_edges
INSERT INTO concept_edges SELECT ... FROM graph_edges WHERE type IN ('REQUIRES','IS_A',...);
INSERT INTO content_edges SELECT ... FROM graph_edges WHERE type IN ('TEACHES','DEFINES',...);
DROP TABLE graph_edges;

-- etc.
```

**Phase 2 — Data Migration:**
- Extract `graph_exercises.content` JSONB into `exercise_items` rows
- Extract `graph_exercises.concept_ids` into `exercise_concepts` junction
- Migrate `graph_chunks.qualifiers` into `chunk_type`, `source_page`, `lesson_id`
- Create `graph_lessons` from chunk qualifiers (DISTINCT textbook+chapter)
- Create `lesson_chunks` from chunk → lesson mappings

**Phase 3 — Frontend Updates:**
- Same as Option A but with v2 as the ONLY schema
- Update graph engine to read normalized columns
- Update RPCs to return v2 shapes

**Pros:**
- Single source of truth — no duplication
- All historical user data preserved
- Clean long-term architecture

**Cons:**
- **Extremely complex** — requires careful data migration scripts
- High risk of data corruption during migration
- Any bug in the migration is hard to undo
- The `graph-store.ts` engine and `get_full_graph()` RPC must be rewritten
- Takes 2–3x longer than Option A

**Estimated effort:** 16–24 hours

---

## Honest Recommendation

**Start with Option A (Additive Sidecar).**

Here's why:
1. You already have users with progress data
2. The graph engine (`graph-store.ts`) is a significant piece of code that works today
3. You don't know if the v2 lesson content is actually good until users interact with it
4. Option A lets you ship a `/lesson/:id` page powered by v2 data within a day
5. Once v2 lessons prove valuable, you can migrate v1 → v2 incrementally (Option C later)

**The specific approach I'd take:**

1. Write `0011_v2_lessons_sidecar.sql` — create only the NEW v2 tables
2. Seed `graph_lessons`, `lesson_chunks`, `graph_chunks` (v2 format), `content_edges`, `concept_edges`, `graph_exercises` (v2 format), `exercise_items`, `exercise_concepts` from your v2 seed
3. Copy/adapt `v2/types.ts` and `v2/queries.ts` into `src/lib/supabase/`
4. Build `src/pages/Lesson.tsx` + update `Learn.tsx` to show v2 lessons
5. Keep the old workbook as a fallback / advanced tab

This gives you:
- A working Learn → Lesson flow by tomorrow
- No risk to existing users
- A clear path to Option C later

---

## Files to Create/Modify (Option A)

### New Files
```
supabase/migrations/0011_v2_lessons_sidecar.sql
src/lib/supabase/v2-types.ts
src/lib/supabase/v2-queries.ts
src/hooks/useGraphLessons.ts
src/pages/Lesson.tsx
src/components/LessonContent.tsx
src/components/LessonGrid.tsx
```

### Modified Files
```
src/App.tsx              (add /lesson/:id route)
src/pages/Learn.tsx      (replace mock grid with LessonGrid)
src/types/index.ts       (add LessonView, LessonSection exports)
```

### Preserved (No Changes)
```
src/engine/*             (graph engine stays on v1 tables)
src/stores/graph-store.ts
src/stores/progress-store.ts
src/hooks/useGraphInit.ts
src/hooks/useGraphSrs.ts
src/pages/WorkbookLevel.tsx
src/data/workbook.ts
```
