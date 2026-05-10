# ADR-003: Content-Addressed Storage with Merkle-CIDs

> **Status:** `accepted`  
> **Date:** 2026-05-10  
> **Deciders:** Development team

## Context

As we ingest multiple textbooks, we will have massive duplication of identical definitions and examples. We also want immutable history and efficient sync.

Options:
1. **Location-addressed:** Files stored by path (`/textbook-a/chapter-1/section-2.txt`)
2. **Content-addressed:** Files stored by hash of their content

## Decision

All **content chunks** are content-addressed using SHA-256 CIDs. The hypergraph stores references (pointers) to chunks, not inline content.

## Consequences

### Positive
- **Deduplication:** Identical sentences from two textbooks share one CID. Storage savings compound.
- **Integrity:** Corruption is detectable (hash mismatch).
- **Immutability:** Editing a chunk creates a new CID; history is preserved.
- **Efficient sync:** Syncing two graphs only requires exchanging missing CIDs.
- **Verifiability:** Users can cryptographically verify that a textbook hasn't been tampered with.

### Negative
- **Indirection overhead:** Every read requires a hash lookup.
- **Garbage collection:** Unreferenced CIDs accumulate unless we track reference counts.
- **No native browser support:** We implement CID computation in WASM/JS.

### Implementation

```typescript
// Chunk: the atomic content unit
interface Chunk {
  cid: string; // sha-256 hex
  contentType: string;
  payload: string;
}

// Node: references chunks by CID
interface Node {
  id: string; // UUID, NOT a CID (nodes mutate)
  definitionCids: string[];
}
```

Chunk store is a simple hash map: `Map<CID, Chunk>`.

## Related

- [DATA_MODEL.md](../DATA_MODEL.md)
- [ADR-002: Client-First Architecture](./002-client-first-architecture.md)
