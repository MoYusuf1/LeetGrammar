# LeetSomali Documentation

> **Purpose:** This directory is the single source of truth for architectural intentions, technical decisions, and long-term roadmap planning. Every significant design choice is documented here before (or as) it is implemented.

## Navigation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Holistic system design: the knowledge hypergraph, sheaf logic, and storage layers |
| [TECH_STACK.md](./TECH_STACK.md) | Current stack inventory, proposed additions, and migration rationale |
| [ROADMAP.md](./ROADMAP.md) | Phased implementation plan with milestones and success criteria |
| [DATA_MODEL.md](./DATA_MODEL.md) | The hypergraph schema: entities, hyperedges, relations, and qualifiers |
| [GLOSSARY.md](./GLOSSARY.md) | Definitions for graph theory, topological, and linguistic terms used throughout |
| [LANGUAGE_DESIGN.md](./LANGUAGE_DESIGN.md) | Somali-specific linguistic design concepts: polysemy, constructions, register, dictionary integration |

## Decision Records

We use [Architecture Decision Records (ADRs)](./adr/) to capture significant technical choices. Each ADR explains the context, decision, consequences, and reversibility.

- [ADR-001: Hypergraph over Relational Model](./adr/001-hypergraph-over-relational.md)
- [ADR-002: Client-First Architecture with Offline Sync](./adr/002-client-first-architecture.md)
- [ADR-003: Content-Addressed Storage with Merkle-CIDs](./adr/003-content-addressing.md)
- [ADR-004: Unified Hybrid Index for Search](./adr/004-unified-hybrid-index.md)

## RFCs & Proposals

Larger design proposals that need review before implementation live in [RFCs](./rfc/).

- [RFC-001: Hypergraph Schema v1](./rfc/001-hypergraph-schema.md)

## Research Notes

Cutting-edge papers, articles, and concepts we are evaluating live in [Research](./research/).

## Conventions

- **Dates:** ISO 8601 (`2026-05-10`)
- **Status tags:** `proposed`, `accepted`, `deprecated`, `superseded`
- **Updates:** When an ADR is superseded, mark it as such and link to the replacement
