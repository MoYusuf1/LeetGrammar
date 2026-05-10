# Data Model Specification

> **Status:** `accepted` (Tier 2)  
> **Version:** 1.0  
> **Last Updated:** 2026-05-10

## 1. Overview

We use a **hybrid model**: a property graph for most relationships, and a specialized hypergraph structure **only for grammatical constructions**.

This gives us clean n-ary construction modeling without the complexity of a full hypergraph database.

---

## 2. Core Types

### 2.1 Node

```typescript
interface Node {
  id: string;        // e.g., "concept:grammar:focus-marker:waa"
  type: NodeType;
  labels: {
    default: string;
    somali?: string;
    english?: string;
    transliteration?: string;
  };
  attributes: Record<string, unknown>;
  definitionCids: string[]; // content-addressed definitions
}
```

**Node Types:**
- `CONCEPT` — Abstract grammatical category
- `MORPHEME` — Minimal unit (bound or free)
- `WORD` — Lexical item
- `EXAMPLE` — Attested sentence
- `RULE` — Explicit statement
- `LESSON` — Pedagogical unit
- `TEXTBOOK` — Source
- `CONSTRUCTION` — Syntactic pattern (also stored as node, expanded via members)

### 2.2 Edge (Binary)

```typescript
interface Edge {
  id: string;
  from: string;      // node ID
  to: string;        // node ID
  type: EdgeType;
  qualifiers: Qualifiers;
}
```

**Edge Types:**
- `REQUIRES` — Prerequisite (forms DAG)
- `CONTRADICTS` — Mutual exclusion
- `DERIVES_FROM` — Etymological source
- `EXEMPLIFIES` — Example illustrates concept
- `CITES` — Attribution
- `IS_A` — Taxonomic
- `PART_OF` — Meronymic
- `VARIES_BY` — Dialectal variant

### 2.3 Construction (Hyperedge)

```typescript
interface Construction {
  id: string;
  type: "CONSTRUCTION";
  name: string;
  members: Array<{
    nodeId: string;
    role: ConstructionRole;
    position?: number; // linear order if applicable
    optional?: boolean;
  }>;
  qualifiers: Qualifiers;
}
```

**Construction Roles:**
- `marker` — grammatical particle
- `head` — syntactic head
- `subject`, `object`, `verb`
- `tense`, `aspect`, `polarity`, `mood`
- `focus`, `topic`
- `modifier`, `determiner`, `possessor`
- `complement`

**Why separate Construction from Edge?**
Constructions are the ONE place n-ary relations are natural and frequent. Everything else is cleaner as a binary edge.

### 2.4 Chunk

```typescript
interface Chunk {
  cid: string;       // sha-256 of payload
  contentType: "text/markdown" | "text/plain" | "audio/mp3";
  payload: string;   // actual content
}
```

Stored in a `Map<CID, Chunk>`. Nodes reference chunks, not inline text.

### 2.5 Qualifiers

```typescript
interface Qualifiers {
  source: {
    textbookId: string;
    page?: string;
    chapter?: string;
  };
  confidence: number; // 0.0 - 1.0
  dialects: Dialect[];
  register?: "formal" | "informal" | "poetic" | "religious";
  era?: string;       // e.g., "pre-1970s", "modern"
  notes?: string;
}
```

---

## 3. Concrete Examples

### Focus Marker `waa`

```typescript
// Nodes
{ id: "morpheme:waa", type: "MORPHEME", labels: { default: "waa", english: "focus marker (positive)" } }
{ id: "concept:positive-polarity", type: "CONCEPT", labels: { default: "Positive Polarity" } }
{ id: "construction:focus-positive", type: "CONSTRUCTION", labels: { default: "Positive Focus Construction" } }

// Binary edges
{ from: "morpheme:waa", to: "concept:positive-polarity", type: "IS_A", qualifiers: { source: { textbookId: "saeed-1999" }, confidence: 0.98, dialects: ["standard"] } }

// Construction (hyperedge)
{
  id: "construction:focus-positive-001",
  type: "CONSTRUCTION",
  name: "Positive Declarative Focus",
  members: [
    { nodeId: "morpheme:waa", role: "marker", position: 1 },
    { nodeId: "concept:positive-polarity", role: "polarity" },
    { nodeId: "concept:declarative-mood", role: "mood" }
  ],
  qualifiers: { source: { textbookId: "saeed-1999", page: "45" }, confidence: 0.95, dialects: ["standard", "northern"] }
}
```

### Prerequisite Chain

```typescript
{ from: "lesson:u1-noun-system", to: "lesson:u0-sounds", type: "REQUIRES", qualifiers: { source: { textbookId: "saeed-1999" }, confidence: 1.0, dialects: ["standard"] } }
```

### Multi-Textbook Attribution

```typescript
// Same concept, different sources
{ from: "morpheme:waa", to: "concept:focus-marker", type: "IS_A", qualifiers: { source: { textbookId: "saeed-1999" }, confidence: 0.98, dialects: ["standard"] } }
{ from: "morpheme:waa", to: "concept:focus-marker", type: "IS_A", qualifiers: { source: { textbookId: "textbook-b" }, confidence: 0.92, dialects: ["standard", "southern"] } }
```

When rendering, the wiki page groups edges by `source.textbookId` and shows both attributions.

---

## 4. ID Scheme

```
concept:{domain}:{name}           concept:grammar:focus-marker
morpheme:{word}                   morpheme:waa
word:{lexeme}                     word:bariis
example:{hash-slice}              example:a3f7d2
rule:{domain}:{number}            rule:grammar:004
lesson:unit-{n}:{slug}            lesson:unit-1:noun-system
textbook:{slug}:{year}            textbook:saeed:1999
construction:{slug}-{n}           construction:focus-positive-001
```

---

## 5. Validation Rules

1. **Acyclic prerequisites:** `REQUIRES` edges must form a DAG. Cycles break the build.
2. **No orphaned examples:** Every `EXAMPLE` node must have at least one `EXEMPLIFIES` edge.
3. **Confidence bounds:** `confidence` ∈ [0, 1].
4. **Dialect coverage:** `CONCEPT` nodes should have edges in at least one dialect.
5. **CID integrity:** Chunk hash must match payload.
6. **Construction completeness:** Every `Construction` must have at least 2 members.

---

## 6. Migration from Flat Data

Current:
```typescript
{
  id: 'u1',
  title: 'The Noun System',
  lessonIds: [3,4,5,6,7,8],
  prerequisites: ['u0']
}
```

Target:
```typescript
Node: { id: "lesson:unit-1:noun-system", type: "LESSON", labels: { default: "The Noun System" } }
Edges:
  { from: "lesson:unit-1:noun-system", to: "lesson:unit-0:sounds", type: "REQUIRES", ... }
  { from: "lesson:unit-1:noun-system", to: "lesson:lesson-3", type: "PART_OF", ... }
  // ... etc
```

Migration is script-driven (`scripts/migrate.ts`).

---

## Related

- [RFC-001: Hypergraph Schema v1](./rfc/001-hypergraph-schema.md)
- [ADR-005: Pragmatic Hypergraph](./adr/005-pragmatic-hypergraph.md)
- [LANGUAGE_DESIGN.md](./LANGUAGE_DESIGN.md)
