# ADR-002: Client-First Architecture with Offline Sync

> **Status:** `accepted`  
> **Date:** 2026-05-10  
> **Deciders:** Development team

## Context

We need to decide where the knowledge graph lives and how users access it.

Options:
1. **Server-centric:** Backend API + database (PostgreSQL, Neo4j, etc.)
2. **Client-first:** Entire graph runs in the browser; optional sync
3. **Hybrid:** Server is source of truth; client caches aggressively

## Decision

**Client-first.** The canonical knowledge graph runs in the user's browser. Sync is peer-to-peer or cloud-optional, not cloud-dependent.

## Consequences

### Positive
- **Offline by default:** Works in low-connectivity environments (critical for Somali diaspora users).
- **Privacy:** User progress and notes never leave their device unless they choose to sync.
- **Latency:** Zero network round-trips for queries.
- **Cost:** No server infrastructure to maintain.
- **Longevity:** App works even if the project stops being maintained (no dead backend).

### Negative
- **Initial download:** Large knowledge bases require significant first load.
- **Compute limits:** Complex graph algorithms are bounded by user's device.
- **Collaboration harder:** No central source of truth for multi-user features.
- **Security:** User-generated content can't be centrally moderated without a relay.

### Mitigations
- Lazy loading: Load grammar units on demand, not all at once.
- Web Workers: Offload graph computation from the main thread.
- WASM SQLite: Handle datasets up to ~100MB efficiently.
- Merkle-CRDT sync: Eventually-consistent collaboration without a central server.
- If a backend is ever needed, it acts as a **sync relay**, not the source of truth.

## Alternatives Considered

### Server-Centric
- Rejected: Ongoing hosting costs.
- Rejected: Network dependency undermines accessibility.
- Rejected: User data centralization conflicts with privacy goals.

### Hybrid (Server Source of Truth)
- Rejected: Too complex for current stage. We can add a sync relay later without changing the architecture.

## Related

- [ADR-003: Content-Addressed Storage](./003-content-addressing.md)
- [TECH_STACK.md](../TECH_STACK.md)
