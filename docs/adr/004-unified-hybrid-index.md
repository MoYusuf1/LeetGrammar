# ADR-004: Unified Hybrid Index for Search

> **Status:** `proposed`  
> **Date:** 2026-05-10  
> **Deciders:** Pending implementation

## Context

Users need to find concepts via:
- Exact text search ("waa")
- Semantic search ("how to emphasize")
- Structural search ("constructions using past tense + negative")

Options:
1. **Pure full-text:** Lunr, FlexSearch, or SQLite FTS
2. **Pure vector:** Pinecone, Milvus, or HNSW in browser
3. **Dual system:** Maintain separate text and vector indexes; join at query time
4. **Unified hybrid index:** Single system where graph traversal and vector search cooperate

## Decision

We will build a **unified hybrid index** combining:
- **Inverted index** (full-text) over chunk content
- **HNSW vector index** over concept embeddings
- **Adjacency index** over hypergraph structure

The query planner decides which index(es) to use based on the query.

## Consequences

### Positive
- **Rich queries:** "Find concepts semantically similar to 'emphasis' that are prerequisites of Lesson 14"
- **Performance:** Graph traversal prunes vector search space (and vice versa).
- **Single source of truth:** One indexing pipeline.

### Negative
- **Complexity:** Query planning is non-trivial.
- **Memory:** Three indexes in memory is heavier than one.

### Mitigations
- Phase 4 implements this. Phases 1-3 use simpler separate indexes.
- Vector index uses scalar quantization to reduce memory.
- Indexes are built lazily (only index visited/searched concepts initially).

## Related

- [TECH_STACK.md](../TECH_STACK.md)
- [ROADMAP.md](../ROADMAP.md) — Phase 4
