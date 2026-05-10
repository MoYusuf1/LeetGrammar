# Roadmap

> **Status:** `living document`  
> **Last Updated:** 2026-05-10  
> **Architecture:** Tier 2 Pragmatic Hypergraph

## Phase 0: Foundation (Weeks 1-2)
**Goal:** Engineering hygiene and state decoupling.

- [ ] Add Vitest, Prettier, Playwright
- [ ] Enable `strict: true` in TypeScript
- [ ] Add Zustand
- [ ] Create `src/engine/` with core types (`Node`, `Edge`, `Construction`, `Chunk`)
- [ ] Write unit tests for basic graph ops
- [ ] Migrate `useProgress` to Zustand store

**Success Criteria:**
- Engine code >80% coverage
- Zero regression in existing features
- Bundle increase <50KB

---

## Phase 1: Graph Engine + Wiki (Weeks 3-8)
**Goal:** A working graph that powers a wiki-style concept explorer.

- [ ] Implement `GraphEngine`:
  - Node/edge CRUD
  - BFS/DFS traversal with edge-type filters
  - Construction hypergraph (members + roles)
- [ ] Implement `ChunkStore` (content-addressed Map)
- [ ] Define schema: `CONCEPT`, `MORPHEME`, `WORD`, `EXAMPLE`, `RULE`, `LESSON`, `TEXTBOOK`
- [ ] Migrate `u0` (Sounds & Greetings) and `u1` (Noun System) to graph
- [ ] Build `WikiPage` component:
  - Displays concept definition
  - Lists related concepts (graph neighbors)
  - Shows examples grouped by source textbook
  - Renders prerequisite chain
- [ ] Build `ConceptGraph` mini-visualization (force-directed or tree)

**Success Criteria:**
- All `u0` and `u1` content queryable via graph API
- Wiki page renders for any concept
- "Related concepts" links work bidirectionally
- Traversal queries <50ms on target device

---

## Phase 2: Multi-Textbook Ingestion (Weeks 9-14)
**Goal:** Ingest a second textbook and surface attribution.

- [ ] Build ingestion script:
  - Parse textbook content into chunks
  - Extract entities and edges
  - Deduplicate chunks by CID
- [ ] Ingest Textbook B
- [ ] Build diff/conflict UI:
  - "Saeed says X; Textbook B says Y"
  - Confidence badges per source
  - Toggle sources on/off
- [ ] Add `qualifiers.source` to all edges
- [ ] Build textbook filter: "Show me only Saeed's view"

**Success Criteria:**
- Two textbooks coexist
- Deduplication reduces storage vs. raw copy
- User can see which source an explanation came from
- No manual data entry for Textbook B ingestion

---

## Phase 3: Persistence + Curriculum (Weeks 15-20)
**Goal:** Survive reloads and generate lesson paths from the graph.

- [ ] Add SQLite WASM backend (lazy-loaded)
  - `nodes`, `edges`, `constructions`, `chunks` tables
  - Recursive CTE for prerequisite closure
- [ ] Build `PrerequisiteEngine`:
  - Given a target concept, compute required pre-concepts
  - Detect cycles (build failure)
  - Generate shortest lesson path from user's current knowledge
- [ ] Add export/import (JSON dump of graph)
- [ ] Add Web Worker for heavy traversals

**Success Criteria:**
- Graph persists across reloads
- "Start here → learn these → reach goal" path generation works
- Build fails if prerequisite cycle detected

---

## Phase 4: Search + Discovery (Weeks 21-28)
**Goal:** Find anything instantly.

- [ ] Build inverted index over chunks
- [ ] Integrate `transformers.js` for embeddings
- [ ] Build HNSW vector index for concepts
- [ ] Global search bar:
  - Full-text results
  - Semantic results ("emphasis" → `waa`, `baa`, `ayaa`)
  - Graph-aware (boost concepts user has prerequisites for)
- [ ] Concept map visualization

**Success Criteria:**
- Search returns relevant concepts in <100ms
- Semantic queries work without keyword matching
- Concept map renders smoothly at 60fps

---

## Phase 5: Exercise Generation + Adaptation (Months 7-9)
**Goal:** The app generates practice from graph patterns.

- [ ] Template-based exercise generation from constructions
  - Focus marker exercises from `FocusConstruction` hyperedges
  - Agreement exercises from `AgreesWith` edges
- [ ] Knowledge gap detection:
  - Track user mistakes per concept
  - Suggest review of prerequisite concepts
- [ ] Adaptive lesson paths:
  - User weak on focus markers → inject focus marker review
  - User strong on nouns → skip ahead

**Success Criteria:**
- Generated exercises are linguistically valid
- Adaptive paths measurably improve retention (track via local analytics)

---

## Phase 6: Dialects + Advanced Attribution (Months 10-12)
**Goal:** Handle Somali's rich dialectal variation.

- [ ] Dialect tagging on all nodes/edges:
  - `standard`, `northern`, `southern`, `benadiri`, `maay-maay`
- [ ] Dialect comparison UI:
  - "In Standard Somali, use `waa`. In Northern, `baa` here is also acceptable."
- [ ] Register tagging: formal, informal, poetic, religious
- [ ] Temporal tagging: "This form was common pre-1990s"

**Success Criteria:**
- User can filter entire app by dialect
- Dialect differences are surfaced, not hidden
- No contradictions shown as "errors" — shown as "variation"

---

## Phase 7: Sync + Mobile (Year 2)
**Goal:** Multi-device, contributions, native feel.

- [ ] Evaluate whether Merkle-CRDTs are actually needed
- [ ] If yes, add CID-based sync layer
- [ ] User-generated annotations (highlights, notes)
- [ ] Capacitor wrapper for iOS/Android
- [ ] P2P sync via WebRTC (stretch)

---

## Backlog

- Audio pronunciation graph (phoneme → morpheme → word)
- OCR for scanning physical textbooks
- Conversational tutoring (WebLLM, only if devices can handle it)
- Spaced repetition tied to graph traversal
- Community wiki contributions with moderation

---

## Review Cadence

Monthly review of this roadmap. Architectural changes require an ADR.
