# ADR-001: Hypergraph over Relational Model

> **Status:** `accepted`  
> **Date:** 2026-05-10  
> **Deciders:** Development team

## Context

We need a data model for Somali grammatical knowledge that can:
- Represent complex multi-way relationships (e.g., subject-verb-object-focus agreement)
- Ingest multiple textbooks with conflicting or complementary explanations
- Support querying like "find all constructions where `waa` appears with past tense"
- Evolve over time as linguistic understanding deepens

Options considered:
1. Relational tables (PostgreSQL/SQLite schema)
2. Property graph (Neo4j-style nodes and edges)
3. Document store (MongoDB-style nested objects)
4. **Knowledge hypergraph (n-ary relations with roles)**

## Decision

We will build a **custom knowledge hypergraph** as our canonical data model.

## Consequences

### Positive
- **Expressiveness:** Can represent "waa + positive + declarative + 3rd-person → valid sentence" as a single hyperedge with 4 members.
- **Multi-source:** Different textbooks can attach hyperedges to the same nodes without collision.
- **Query power:** Traversals can filter by role ("find me everything where `waa` is the FOCUS_MARKER").
- **Extensibility:** New relation types and roles can be added without schema migrations.

### Negative
- **No off-the-shelf database:** We must build the engine ourselves (or wrap SQLite with hypergraph semantics).
- **Learning curve:** Team must understand hypergraph concepts.
- **Performance unknown:** Hyperedge traversal is more complex than binary edge lookup.

### Mitigations
- Phase 1 runs entirely in-memory with simple data structures (Map + Array).
- Phase 3 persists to SQLite with a relational projection of the hypergraph.
- Comprehensive unit tests from day one.

## Alternatives Considered

### Relational Model
- Rejected: Join tables for n-ary relations become unwieldy.
- Rejected: Schema changes required for every new relation type.

### Property Graph (Neo4j-style)
- Rejected: Forces n-ary relations into reified nodes ("WaaUsage" node connected to 4 other nodes), which obscures the grammar.
- Rejected: Requires backend infrastructure; we are client-first.

### Document Store
- Rejected: Encourages denormalization. Multiple textbooks would duplicate content.
- Rejected: Poor traversal performance for graph queries.

## Related

- [DATA_MODEL.md](../DATA_MODEL.md)
- [RFC-001: Hypergraph Schema v1](../rfc/001-hypergraph-schema.md)
