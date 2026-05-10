# ADR-005: Pragmatic Hypergraph (Tier 2 Architecture)

> **Status:** `accepted`  
> **Date:** 2026-05-10  
> **Deciders:** Development team  
> **Supersedes:** Research-grade vision in ARCHITECTURE.md v0.1

## Context

We evaluated three architectural tiers:
1. **Tier 1 (Simple Property Graph):** Binary edges only. Fastest to build, but n-ary grammatical constructions become awkward.
2. **Tier 2 (Pragmatic Hypergraph):** Property graph for most relations; hyperedges reserved for grammatical constructions. Balanced complexity.
3. **Tier 3 (Research Stack):** Full hypergraph + Merkle-CRDTs + sheaf theory + TDA. Powerful but 6-12 months of build time before users benefit.

We will ingest **5 textbooks** over the next 1-2 years. We need multi-source attribution and clean construction modeling, but we are a small team building a learning app, not a distributed systems research lab.

## Decision

We adopt **Tier 2: The Pragmatic Hypergraph**.

Specifically:
- **Property graph** for prerequisites, citations, contrasts, derivations, and most relationships
- **Hyperedges** reserved for grammatical constructions (n-ary patterns with roles)
- **Edge qualifiers** (`source`, `confidence`, `dialect`, `register`) as first-class properties
- **Content-addressed chunks** for deduplication, but NO Merkle-CRDT sync layer (yet)
- **Dialect tags + filtering** instead of sheaf theory
- **Cycle detection** instead of persistent homology for curriculum validation

## Consequences

### Positive
- Buildable in **6-8 weeks** for Phase 1 by a solo developer
- Clean representation of Somali constructions (focus markers, agreement patterns, relative clauses)
- Multi-textbook attribution works via edge qualifiers
- Still possible to upgrade to Merkle-CRDTs later without rewriting
- Graph queries remain comprehensible

### Negative
- Some n-ary relations (outside constructions) still require reified nodes
- No automatic mathematical consistency checking across dialects
- No formal proof of curriculum completeness

### Acceptable Tradeoffs
- We will manually review dialect contradictions rather than proving them via sheaf Laplacians
- We will use simple DFS for cycle detection rather than TDA
- Sync, if ever needed, will start with JSON export/import

## What We Are Explicitly NOT Building (Yet)

| Feature | Why Deferred | Path Back If Needed |
|---------|-------------|---------------------|
| Merkle-CRDT sync | Single-user app; no sync needed now | Add CID-based sync layer later |
| Sheaf consistency | Dialect tags handle 95% of use cases | Formal sheaf layer can be added as validation module |
| Persistent homology | Cycle detection is sufficient for DAG validation | TDA library can be plugged into build pipeline |
| Neuro-symbolic inference | No training data yet; rule-based explanations suffice | Add GNN layer once we have 10k+ user interactions |
| Simplicial neural networks | Massive overkill for exercise generation | Template-based generation first; ML later |

## Related

- [ARCHITECTURE.md](../ARCHITECTURE.md)
- [DATA_MODEL.md](../DATA_MODEL.md)
- [LANGUAGE_DESIGN.md](../LANGUAGE_DESIGN.md)
