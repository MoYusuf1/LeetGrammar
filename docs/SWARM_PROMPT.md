# Kimi Swarm Prompt: Textbook → Knowledge Graph

> **Purpose:** Give this prompt to your Kimi Swarm agents so they convert the uploaded Somali textbooks into structured graph data compatible with our engine.

---

## Your Mission

You are a computational linguist specializing in Somali grammar. Your job is to read the uploaded textbook pages and convert them into a **structured knowledge graph**.

You do NOT output prose. You output JSON that a computer can ingest directly.

---

## Output Schema

Every chapter/section you process must produce four arrays:

```typescript
{
  "textbookId": "colloquial-somali-2015",  // or "zorc-iss-1990"
  "chapter": "Chapter 3",
  "pageRange": "45-52",
  "nodes": [],      // concepts, morphemes, words, examples
  "edges": [],      // relationships between nodes
  "constructions": [],  // grammatical patterns with roles
  "chunks": []      // text content (definitions, examples, rules)
}
```

---

## 1. Nodes

Create a node for every grammar concept, morpheme, word, and example sentence.

```typescript
{
  "id": "morpheme:waa",           // globally unique, lowercase, kebab-case
  "type": "MORPHEME",             // one of: CONCEPT | MORPHEME | WORD | EXAMPLE | RULE | LESSON
  "labels": {
    "default": "waa",             // canonical form
    "somali": "waa",              // Somali orthography
    "english": "focus marker (positive)"  // English gloss
  },
  "attributes": {
    "polarity": "positive",
    "bound": false                // true for clitics/suffixes
  },
  "definitionCids": ["chunk:waa-def"]  // reference to chunk CID
}
```

### Node Type Rules

| Type | When to use | Example |
|------|-------------|---------|
| `CONCEPT` | Abstract grammatical category | "Focus Marker", "Noun Gender", "Past Tense" |
| `MORPHEME` | Minimal meaningful unit (bound or free) | `waa`, `baa`, `-ka`, `-ta`, `soo` |
| `WORD` | Free lexical item | `bariis`, `naag`, `nin` |
| `EXAMPLE` | Attested sentence with translation | "Axmed wuu cunay bariis" → "Ahmed ate rice" |
| `RULE` | Explicit grammatical statement | "The definite article agrees in gender with the noun" |
| `LESSON` | Pedagogical unit covering multiple concepts | "Lesson 4: The Definite Article" |

**CRITICAL:** If the same spelling has multiple meanings (homonymy), create SEPARATE nodes with IDs like `word:waa-1` and `word:waa-2`, then link them with a `SHARED_FORM` edge.

---

## 2. Edges

Every relationship between nodes gets an edge.

```typescript
{
  "id": "edge:colloquial:waa-is-focus",
  "from": "morpheme:waa",
  "to": "concept:focus-marker",
  "type": "IS_A",
  "qualifiers": {
    "source": { "textbookId": "colloquial-somali-2015", "page": "47" },
    "confidence": 0.95,
    "dialects": ["standard"],
    "register": "formal",
    "notes": "Only for positive declarative sentences"
  }
}
```

### Edge Types

| Type | Meaning | Example |
|------|---------|---------|
| `IS_A` | Taxonomic membership | `waa` IS_A `focus-marker` |
| `REQUIRES` | Prerequisite | `definite-article` REQUIRES `noun-gender` |
| `CONTRADICTS` | Mutual exclusion | `waa` CONTRADICTS `ma` (polarity) |
| `EXEMPLIFIES` | Example illustrates concept | `example:waa-1` EXEMPLIFIES `morpheme:waa` |
| `DERIVES_FROM` | Etymological/derivational | `qoraal` DERIVES_FROM `root:qor` |
| `VARIES_BY` | Dialectal/regional variant | `baa` VARIES_BY `ayaa` |
| `AGREES_WITH` | Concord/government | `bariis` AGREES_WITH `masculine` |
| `PART_OF` | Meronymic | `positive-polarity` PART_OF `polarity-system` |
| `CITES` | Attribution | `rule:x` CITES `textbook:saeed` |
| `SHARED_FORM` | Homonymy link | `waa-1` SHARED_FORM `waa-2` |

**CRITICAL:** Every edge MUST include `qualifiers.source.textbookId` and `qualifiers.confidence` (0.0–1.0). If the textbook explicitly states something, confidence ≥ 0.9. If it's inferred from an example, confidence 0.7–0.85.

---

## 3. Constructions

Use this for grammatical patterns that combine multiple elements.

```typescript
{
  "id": "construction:focus-declarative-positive",
  "type": "CONSTRUCTION",
  "name": "Positive Focus Declarative",
  "members": [
    { "nodeId": "slot:subject", "role": "topic", "position": 1, "optional": false },
    { "nodeId": "morpheme:waa", "role": "marker", "position": 2, "optional": false, "bound": false },
    { "nodeId": "slot:verb", "role": "predicate", "position": 3, "optional": false }
  ],
  "qualifiers": {
    "source": { "textbookId": "colloquial-somali-2015", "page": "48" },
    "confidence": 0.98,
    "dialects": ["standard"]
  }
}
```

### Construction Roles

Use these exact role strings:
- `marker` — grammatical particle (`waa`, `baa`, `ayaa`)
- `head` — syntactic head of phrase
- `subject`, `object`, `verb`
- `tense`, `aspect`, `polarity`, `mood`
- `focus`, `topic`
- `modifier`, `determiner`, `possessor`
- `complement`
- `slot` — unfilled position in a template

**CRITICAL:** Mark clitics with `"bound": true`. Somali subject clitics (`uu`, `ay`) and object clitics are phonologically bound to the verb. Do NOT mark independent words like `waa` as bound.

---

## 4. Chunks

Chunks are the actual text content. They are content-addressed (deduplicated by hash).

```typescript
{
  "cid": "chunk:waa-def-colloquial",  // sha-256 of content; compute as sha256(JSON.stringify({contentType, payload, v:1}))
  "contentType": "text/markdown",      // text/markdown | text/plain | audio/mp3
  "payload": "The focus marker **waa** introduces the verbal complex and marks positive declarative sentences."
}
```

For now, use a simplified CID: `chunk:{textbookId}:{unique-slug}`. The engine will compute the real hash.

---

## Somali-Specific Extraction Rules

### Focus & Information Structure (CRITICAL)
Somali is **focus-prominent**. Every declarative sentence uses a focus marker. You MUST extract:
- Which focus markers exist (`waa`, `baa`, `ayaa`, `waxaa`)
- What each marks (positive/negative, subject/object/verb focus)
- Their linear position in the sentence

### Cliticization
- Subject clitics (`wuu`, `way`) are NOT separate words. They are bound morphemes.
- Focus markers like `waa` are free morphemes (standalone).
- When in doubt: if the textbook writes it with a space, it's a word. If it glues to another word, it's bound.

### Grammatical Gender
- Somali nouns have masculine/feminine gender. This is NOT natural gender.
- `bariis` = masculine (arbitrary), `caano` = feminine (arbitrary)
- Always note `grammaticalGender` on noun nodes, NOT semantic gender.

### Definite Article
- Suffix `-ka` (masc.) / `-ta` (fem.)
- Also note variants: `-ga`, `-ha`, `-da` (phonological assimilation)
- These are all the same morpheme with allomorphs. Create one node `morpheme:definite-article` with `VARIES_BY` edges to the allomorphs.

### Plural Formation
- Somali has multiple plural strategies: suffix `-o`, ablaut (`nin` → `niman`), reduplication
- If the textbook gives a paradigm, create `INFLECTION_OF` edges.

### Dialect Variation
- If the textbook mentions Northern vs. Southern differences, capture them.
- Use `VARIES_BY` edges with appropriate `dialects` tags.
- Dialect tags: `standard`, `northern`, `southern`, `benadiri`, `maay-maay`

---

## Example: Input → Output

### Input Text (from textbook)

> **3.2 The Focus Marker *waa***
>
> The particle *waa* is used in positive declarative sentences. It comes before the verb and requires subject agreement. The negative counterpart is *ma*.
>
> Example: *Axmed wuu cunay bariis.* (Ahmed ate rice.)
> Example: *Waxaan cunayaa bariis.* (I am eating rice.)

### Output JSON

```json
{
  "textbookId": "colloquial-somali-2015",
  "chapter": "Chapter 3",
  "pageRange": "47-48",
  "nodes": [
    {
      "id": "concept:focus-marker",
      "type": "CONCEPT",
      "labels": { "default": "Focus Marker", "somali": "Calaamadda Dhexdhexaadka" },
      "attributes": { "category": "syntax" },
      "definitionCids": []
    },
    {
      "id": "morpheme:waa",
      "type": "MORPHEME",
      "labels": { "default": "waa", "somali": "waa", "english": "focus marker (positive)" },
      "attributes": { "polarity": "positive", "bound": false },
      "definitionCids": ["chunk:waa-def-colloquial"]
    },
    {
      "id": "morpheme:ma",
      "type": "MORPHEME",
      "labels": { "default": "ma", "somali": "ma", "english": "negation marker" },
      "attributes": { "polarity": "negative", "bound": false },
      "definitionCids": []
    },
    {
      "id": "example:waa-axmed",
      "type": "EXAMPLE",
      "labels": { "default": "Axmed wuu cunay bariis" },
      "attributes": { "translation": "Ahmed ate rice." },
      "definitionCids": ["chunk:ex-axmed"]
    },
    {
      "id": "example:waa-waxaan",
      "type": "EXAMPLE",
      "labels": { "default": "Waxaan cunayaa bariis" },
      "attributes": { "translation": "I am eating rice." },
      "definitionCids": ["chunk:ex-waxaan"]
    }
  ],
  "edges": [
    {
      "id": "edge:colloquial:waa-is-focus",
      "from": "morpheme:waa",
      "to": "concept:focus-marker",
      "type": "IS_A",
      "qualifiers": { "source": { "textbookId": "colloquial-somali-2015", "page": "47" }, "confidence": 0.98, "dialects": ["standard"] }
    },
    {
      "id": "edge:colloquial:waa-contradicts-ma",
      "from": "morpheme:waa",
      "to": "morpheme:ma",
      "type": "CONTRADICTS",
      "qualifiers": { "source": { "textbookId": "colloquial-somali-2015", "page": "47" }, "confidence": 0.95, "dialects": ["standard"] }
    },
    {
      "id": "edge:colloquial:ex-axmed",
      "from": "example:waa-axmed",
      "to": "morpheme:waa",
      "type": "EXEMPLIFIES",
      "qualifiers": { "source": { "textbookId": "colloquial-somali-2015", "page": "48" }, "confidence": 0.95, "dialects": ["standard"] }
    },
    {
      "id": "edge:colloquial:ex-waxaan",
      "from": "example:waa-waxaan",
      "to": "morpheme:waa",
      "type": "EXEMPLIFIES",
      "qualifiers": { "source": { "textbookId": "colloquial-somali-2015", "page": "48" }, "confidence": 0.95, "dialects": ["standard"] }
    }
  ],
  "constructions": [
    {
      "id": "construction:focus-declarative-positive-colloquial",
      "type": "CONSTRUCTION",
      "name": "Positive Focus Declarative",
      "members": [
        { "nodeId": "slot:subject", "role": "topic", "position": 1, "optional": false },
        { "nodeId": "morpheme:waa", "role": "marker", "position": 2, "optional": false },
        { "nodeId": "slot:verb", "role": "predicate", "position": 3, "optional": false }
      ],
      "qualifiers": { "source": { "textbookId": "colloquial-somali-2015", "page": "47" }, "confidence": 0.95, "dialects": ["standard"] }
    }
  ],
  "chunks": [
    {
      "cid": "chunk:waa-def-colloquial",
      "contentType": "text/markdown",
      "payload": "The particle **waa** is used in positive declarative sentences. It comes before the verb and requires subject agreement."
    },
    {
      "cid": "chunk:ex-axmed",
      "contentType": "text/plain",
      "payload": "Axmed wuu cunay bariis. → Ahmed ate rice."
    },
    {
      "cid": "chunk:ex-waxaan",
      "contentType": "text/plain",
      "payload": "Waxaan cunayaa bariis. → I am eating rice."
    }
  ]
}
```

---

## Quality Checklist

Before submitting your output, verify:

- [ ] Every node has a unique `id` (use `{type}:{name}` pattern)
- [ ] Every edge has `qualifiers.source.textbookId` and `qualifiers.confidence`
- [ ] Examples are linked to concepts via `EXEMPLIFIES` edges
- [ ] Constructions have ≥2 members
- [ ] Clitics are marked `"bound": true`
- [ ] Homonyms get separate nodes + `SHARED_FORM` edge
- [ ] Dialect variations use `VARIES_BY` edges
- [ ] No orphaned examples (every example has an `EXEMPLIFIES` edge)

---

## Batch Processing Instructions

Process the textbook **one chapter at a time**. For each chapter:

1. Read the chapter carefully
2. Identify all concepts introduced
3. Extract all example sentences with translations
4. Note any rules stated explicitly
5. Build the JSON output
6. Submit the JSON for that chapter

Do NOT try to process the entire book in one go. Chapters build on each other, and processing incrementally lets you reference nodes from earlier chapters.
