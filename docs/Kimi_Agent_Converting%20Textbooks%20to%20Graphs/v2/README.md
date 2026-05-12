# Somali Grammar v2 — Clean Relational Schema + Seed

## What Changed

### Schema: JSONB → First-Class Columns

| v1 (old) | v2 (new) |
|----------|----------|
| `labels JSONB` | `label_default`, `label_somali`, `label_english` TEXT |
| `attributes JSONB` | `pos`, `gender`, `bound`, `polarity`, `verb_class`, `dialect` columns |
| `qualifiers JSONB` on edges | `source_page`, `source_textbook`, `confidence` columns |
| `content JSONB` on exercises | `instruction` TEXT + `exercise_items` table |
| No lessons table | `graph_lessons` with sort_key + `lesson_chunks` ordering |

No more `su'aasha`-style escaping bugs. No more JSONB blobs. Just relational data.

## Files

| File | Size | Purpose |
|------|------|---------|
| `schema.sql` | 11 KB | **Run first** — 12 tables, indexes, RLS, triggers |
| `seed.sql` | 304 KB | **Run second** — 1,055 rows, deduplicated, zero orphans |
| `rpc_functions.sql` | 11 KB | **Run third** — 7 PostgreSQL RPC functions |
| `types.ts` | 6.5 KB | TypeScript interfaces matching every table |
| `queries.ts` | 12 KB | Query helpers: `getLesson`, `getConceptDetail`, `submitReview`, etc. |

## Setup (3 steps)

```bash
psql $DATABASE_URL -f schema.sql   # nukes old tables, creates new
psql $DATABASE_URL -f seed.sql     # 1,055 clean rows
psql $DATABASE_URL -f rpc_functions.sql  # SRS + frontier + stats
```

Then copy `types.ts` and `queries.ts` into `src/lib/supabase/`.

## Seed Contents

| Table | Rows | What |
|-------|------|------|
| `graph_lessons` | 11 | Colloquial Units 1-4, Zorc Chapters 2-4, 8, 12 |
| `graph_nodes` | 274 | 63 concepts, 47 morphemes, 100 words, 77 examples, 19 rules |
| `graph_chunks` | 57 | Dialogues, grammar explanations, vocabulary lists, paradigms |
| `lesson_chunks` | 77 | Section ordering within lessons |
| `concept_edges` | 339 | REQUIRES, IS_A, CONTRADICTS, PART_OF, etc. |
| `content_edges` | 93 | TEACHES, DEFINES, EXEMPLIFIES links |
| `graph_exercises` | 32 | Problem sets with difficulty ratings |
| `exercise_items` | 115 | Individual prompt/answer/hint rows |
| `exercise_concepts` | 56 | Which concepts each exercise tests |

## Golden Path Coverage

1. **Focus & Information Structure** — `waa`, `baa`, `ayaa`, `waxaa`, `ma` (focus markers)
2. **Tense & Aspect** — past, present progressive, future, optative, negative imperative
3. **Noun System** — gender, definite article (`-ka`/`-ta`), plurals, genitive, possessives
4. **Syntax** — SOV order, subject/object clitics, preposition fusion, directionals
5. **Colloquial Somali Units 1-4** — Full pedagogical content (dialogues, vocab, grammar, exercises)

## Key Queries

```typescript
// Learn: get a lesson with all content in order
const lesson = await getLesson(supabase, "lesson:colloquial:unit-01");

// Concept: detail with textbook sources
const concept = await getConceptDetail(supabase, "concept:focus-marker");

// Roadmap: what's ready to learn
const frontier = await getLearningFrontier(supabase, userId);

// SRS: submit a review
const result = await submitReview(supabase, {
  userId, conceptId, rating: 3, studyTimeSeconds: 45
});
```
