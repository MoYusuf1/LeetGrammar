# System Architecture

> **Status:** `accepted` (Tier 2 Pragmatic Hypergraph)  
> **Last Updated:** 2026-05-10  
> **Version:** 1.0

## 1. Vision Statement

LeetSomali is a **pedagogical knowledge graph** for the Somali language. Lessons, wiki pages, and exercises are **materialized views** over a unified graph that can ingest and attribute facts to multiple textbooks.

We are NOT building a mathematical model for its own sake. We are building a tool that makes Somali grammar learnable, queryable, and multi-perspective.

## 2. Architectural Layers (Tier 2)

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: PRESENTATION                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Wiki View│ │Path View │ │ Concept  │ │ Dialect      │   │
│  │          │ │(DAG)     │ │ Explorer │ │ Filter       │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: QUERY & SEARCH                                     │
│  ┌──────────────┐ ┌──────────────┐ ┌─────────────────────┐  │
│  │ Inverted     │ │ Vector       │ │ Graph Traversal     │  │
│  │ Index (FTS)  │ │ Index (HNSW) │ │ (adjacency + roles) │  │
│  └──────────────┘ └──────────────┘ └─────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: KNOWLEDGE GRAPH                                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  PROPERTY GRAPH + CONSTRUCTION HYPERGRAPH                ││
│  │  • Nodes: Words, Concepts, Examples, Rules, Lessons      ││
│  │  • Edges: Binary relations with qualifiers               ││
│  │  • Hyperedges: N-ary grammatical constructions only      ││
│  │  • Qualifiers: {source, confidence, dialect, register}   ││
│  └─────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────┐│
│  │  CONTENT-ADDRESSED CHUNK STORE                           ││
│  │  • Deduplicated definitions, examples, explanations      ││
│  │  • Referenced by hash, but NOT a full Merkle-DAG (yet)   ││
│  └─────────────────────────────────────────────────────────┘│
└────────────────────────┬────────────────────────────────────┘
                         │
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: INGESTION                                          │
│  Textbook A ──┐                                             │
│  Textbook B ──┼──► Parser ──► Graph Builder                 │
│  Textbook C ──┘              ──► Chunk Deduplicator         │
│                                     ▼                       │
│                              Conflict Reporter              │
│                              (edge-level diff)              │
└─────────────────────────────────────────────────────────────┘
```

## 3. Design Principles

1. **Graph-native queries:** Every UI view is a query, not a static file.
2. **Attributed facts:** Every edge knows which textbook it came from and how confident that source is.
3. **Construction-first:** The hypergraph exists primarily to model grammatical constructions cleanly.
4. **Immutable chunks:** Content is deduplicated by hash; edits create new chunks.
5. **Offline by default:** The graph runs client-side; sync is a future add-on.
6. **Dialect as dimension:** Every node/edge is tagged; queries filter by dialect.

## 4. Key Subsystems

### 4.1 Graph Engine
A custom TypeScript engine with two storage modes:

**Property Graph (default):**
```typescript
interface Node { id, type, labels, attributes }
interface Edge { id, from, to, type, qualifiers }
```

**Construction Hypergraph (specialized):**
```typescript
interface Construction {
  id, type: "CONSTRUCTION",
  members: Array<{ nodeId, role, position }>,
  qualifiers
}
```

**Why hybrid?** Prerequisites (`requires`), citations (`cites`), and contrasts (`contradicts`) are naturally binary. A construction like `Focus + Positive + Declarative → Valid Sentence` is naturally n-ary. We use the right tool for each job.

### 4.2 Chunk Store
Simple content-addressed hash map:
```typescript
Map<CID, Chunk>
```
- Chunks are definitions, example sentences, and rule statements
- Two identical examples from different textbooks share one CID
- Nodes reference chunks by CID, not by inline text

**NOT a Merkle-DAG.** We compute CIDs for deduplication, but we don't build a cryptographic DAG of history. If we need that later, we add it without changing the graph schema.

### 4.3 Qualifier System
Every edge carries:
```typescript
interface Qualifiers {
  source: { textbookId, page?, chapter? };
  confidence: number; // 0.0 - 1.0
  dialects: Dialect[];
  register?: "formal" | "informal" | "poetic" | "religious";
  notes?: string;
}
```

When rendering a wiki page for `waa`, we query all edges and group by `source`. The UI shows:
- "Saeed (1999) says..."
- "Textbook B (2020) adds..."
- "Note: Northern dialect uses `baa` here instead"

### 4.4 Search Layer (Phase 4)
Three indexes, queried independently or in combination:
1. **Inverted index:** Term → chunks (for exact search)
2. **Vector index:** Concept embeddings for semantic similarity
3. **Adjacency index:** Node neighbors for graph traversal

**No unified query planner yet.** We manually compose searches: `vectorSearch("emphasize")` → `graph.getNeighbors(results, { type: "EXEMPLIFIES" })`.

### 4.5 Curriculum Validator (Simple)
- Run DFS on `REQUIRES` edges to detect cycles (bad curriculum)
- Ensure every `LESSON` node has at least one reachable `EXAMPLE`
- Ensure every `CONCEPT` has at least one `DEFINITION` chunk
- This is 50 lines of code, not TDA.

## 5. Data Flow

### Ingesting a Textbook
```
Textbook ──► Segmenter ──► Extractor (concepts, examples, rules)
                                   │
                                   ▼
                            ┌──────────────┐
                            │ Chunk Builder│
                            │ (deduplicate)│
                            └──────┬───────┘
                                   ▼
                            ┌──────────────┐
                            │ Graph Builder│
                            │ (nodes +     │
                            │  edges +     │
                            │  constructions)
                            └──────┬───────┘
                                   ▼
                            ┌──────────────┐
                            │ Diff Reporter│
                            │ (new edges   │
                            │  vs. existing)│
                            └──────────────┘
```

### Rendering a Lesson
```
Lesson ID ──► Query target concepts ──► Get prerequisites (DAG traversal)
                                              │
                                              ▼
                                       Get construction hyperedges
                                              │
                                              ▼
                                       Pull example chunks by CID
                                              │
                                              ▼
                                       Assemble React props
```

## 6. Multi-Textbook Strategy

| Scenario | How We Handle It |
|----------|-----------------|
| Same definition, different wording | Same CID; two edges pointing to it |
| Conflicting definitions | Two edges with different `source` qualifiers; UI shows both with labels |
| One textbook covers a topic others don't | Node exists with edges only from that source |
| Example sentences vary by textbook | Each example is a chunk; edges attribute to source |
| Dialect differences | Same construction, different `dialects` array on edges |

## 7. Failure Modes

| Risk | Mitigation |
|------|------------|
| Graph too large for memory | Lazy-load units; SQLite WASM backend |
| Textbook ingestion conflicts | Manual review UI; confidence scoring |
| Slow search | Inverted index in Web Worker; vector quantization |
| Schema drift | JSON Schema validation; unit tests for all graph operations |

## 8. Related Documents

- [DATA_MODEL.md](./DATA_MODEL.md) — Schema specifics
- [TECH_STACK.md](./TECH_STACK.md) — Implementation technologies
- [ROADMAP.md](./ROADMAP.md) — Delivery phases
- [LANGUAGE_DESIGN.md](./LANGUAGE_DESIGN.md) — Somali-specific design concepts
- [ADR-005: Pragmatic Hypergraph](./adr/005-pragmatic-hypergraph.md)
