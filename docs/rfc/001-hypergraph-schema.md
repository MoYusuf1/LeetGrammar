# RFC-001: Hypergraph Schema v1

> **Status:** `draft`  
> **Author:** Development Team  
> **Date:** 2026-05-10

## Summary

This RFC proposes the initial schema for the LeetSomali Knowledge Hypergraph. It defines the node types, relation types, and hyperedge role vocabularies needed to represent Somali grammar at the granularity required for pedagogical use.

## Motivation

Our current flat data model (`lessons.ts`, `grammarTopics.ts`) cannot:
- Represent multi-way grammatical agreement
- Attribute facts to specific textbooks
- Support dialectal variation
- Enable cross-concept discovery ("other rules that use the definite article")

We need a schema that is:
1. **Linguistically faithful** — matches how Somali grammar actually works
2. **Pedagogically useful** — supports lesson generation and progress tracking
3. **Extensible** — new textbooks, dialects, and theories can be added without schema changes

## Proposal

### Node Type Hierarchy

```
Node
├── LinguisticEntity
│   ├── CONCEPT (abstract categories)
│   ├── MORPHEME (bound/unbound minimal units)
│   ├── WORD (free lexical items)
│   ├── CONSTRUCTION (syntactic patterns)
│   └── PHONEME (sound units)
├── PedagogicalEntity
│   ├── EXAMPLE (attested sentences)
│   ├── EXERCISE (practice items)
│   ├── LESSON (curriculum units)
│   └── PATH (ordered curriculum sequences)
├── SourceEntity
│   ├── TEXTBOOK (published sources)
│   ├── PAPER (academic articles)
│   └── USER_CONTENT (community contributions)
└── MetaEntity
    ├── DIALECT (language varieties)
    ├── ERA (time periods)
    └── REGISTER (formal, informal, etc.)
```

### Relation Type Catalog

| Relation | Arity | Role Vocabulary | Example |
|----------|-------|-----------------|---------|
| `CONSTRUCTS` | 2-n | `result`, `component-1`, `component-2`, ... | Focus marker + polarity → sentence type |
| `REQUIRES` | 2 | `target`, `prerequisite` | Lesson 14 requires Lesson 7 |
| `EXEMPLIFIES` | 2 | `concept`, `example` | Example sentence illustrates focus marker |
| `CONTRADICTS` | 2 | `proposition-a`, `proposition-b` | Waa contradicts Ma in polarity |
| `DERIVES_FROM` | 2 | `derived`, `source` | Colloquial form derives from classical |
| `AGREES_WITH` | 2-n | `controller`, `target` | Verb agrees with subject in person/number |
| `GOVERNS` | 2 | `governor`, `dependent` | Preposition governs genitive case |
| `VARIES_BY` | 2 | `standard-form`, `variant` | Northern dialect variant |
| `CITES` | 2 | `claim`, `source` | Rule attributed to Saeed 1999 |
| `IS_A` | 2 | `instance`, `category` | Waa is-a focus-marker |
| `PART_OF` | 2 | `part`, `whole` | Clitic is part of word phrase |

### Role Vocabulary (Grammar-Specific)

These roles are used within hyperedges to label participant nodes:

- `marker` — grammatical particle
- `head` — syntactic head of a phrase
- `dependent` — syntactic dependent
- `subject` — grammatical subject
- `object` — grammatical object
- `verb` — verbal predicate
- `tense` — tense specification
- `aspect` — aspect specification
- `polarity` — positive/negative
- `mood` — declarative, interrogative, imperative
- `focus` — focused element
- `topic` — topicalized element
- `modifier` — adjectival/adverbial modifier
- `determiner` — article/demonstrative
- `possessor` — genitive possessor
- `complement` — clausal complement

### Temporal Annotation

Every hyperedge MAY carry a `valid` field:

```typescript
interface TemporalRange {
  from?: ISO8601Date | "eternal";
  to?: ISO8601Date | "eternal";
}
```

Examples:
- `{ from: "1970-01-01", to: "1990-12-31" }` — Colonial-era usage
- `{ from: "1999-01-01", to: "eternal" }` — Standard since Saeed's textbook

### Dialect Annotation

Every node and edge MUST declare applicable dialects:

```typescript
type DialectTag =
  | "standard"
  | "northern:maxaa-tiri"
  | "southern:maxaa-tiri"
  | "benadiri"
  | "maay-maay"
  | "digiil"
  | string; // extensible
```

Dialects form a hierarchy. `northern:maxaa-tiri` is a specialization of `standard`. Queries for `standard` include specializations unless explicitly excluded.

## Example: Complete Hyperedge

```json
{
  "id": "edge:constructs:grammar:focus-positive-001",
  "relation": "CONSTRUCTS",
  "members": [
    { "nodeId": "node:morpheme:waa", "role": "marker", "position": 1 },
    { "nodeId": "node:concept:positive-polarity", "role": "polarity", "position": 0 },
    { "nodeId": "node:concept:declarative-mood", "role": "mood", "position": 0 },
    { "nodeId": "node:construction:focus-positive", "role": "result", "position": 2 }
  ],
  "qualifiers": {
    "source": {
      "type": "TEXTBOOK",
      "nodeId": "node:textbook:saeed-1999",
      "citation": "Chapter 4, p. 45"
    },
    "confidence": 0.98,
    "frequency": 0.85
  },
  "valid": { "from": "1999-01-01", "to": "eternal" },
  "dialects": ["standard", "northern:maxaa-tiri"]
}
```

## Open Questions

1. **Should we allow hyperedges on hyperedges?** (Meta-statements: "Textbook B disagrees with this construction rule")
2. **How do we represent intonation/phonological patterns?** As audio chunk CIDs linked via `REALIZED_AS` edges?
3. **Should constructions have internal structure?** e.g., a `focus-construction` hyperedge contains ordered slots that themselves reference other constructions.
4. **How do we version the schema itself?** If we add a new relation type in 2027, old graphs must still validate.

## Implementation Plan

1. Define TypeScript interfaces in `src/engine/types.ts`
2. Build JSON Schema for validation
3. Write migration script from current `lessons.ts` format
4. Create seed data for `u0` and `u1`
5. Unit tests for schema validation

## Decision Process

This RFC is open for comment until 2026-05-17. After that, it will be accepted, revised, or rejected based on the implementation experience of the Phase 1 prototype.
