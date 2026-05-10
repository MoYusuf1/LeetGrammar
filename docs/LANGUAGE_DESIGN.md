# Language-Specific Design Concepts

> **Status:** `accepted` (living document)  
> **Last Updated:** 2026-05-10  
> **Scope:** Design principles for representing Somali grammar, lexicon, and pedagogy in a software system

---

## 1. The Lexicon-Grammar Continuum

**The trap:** Most language apps treat "dictionary" and "grammar" as separate silos. This is a false dichotomy that breaks down completely in Somali.

**The reality:** In Somali, many grammatical functions are expressed through lexical choice:
- Focus markers (`waa`, `baa`, `ayaa`) are particles with lexical identity
- Postpositions (`ku`, `ka`, `la`) are grammaticalized nouns
- Tense/aspect is often carried by auxiliary verbs (`yahay`, `jiray`)
- Definiteness is a suffix, not a free word

**Design implication:** Our graph must not separate "grammar nodes" from "dictionary nodes." A word like `waa` is simultaneously a dictionary entry (lexeme) and a grammar node (focus marker). It should be ONE node with multiple edge types.

```
morpheme:waa
├── IS_A → concept:focus-marker
├── IS_A → concept:positive-polarity-marker
├── DERIVES_FROM → concept:copula-waxay (diachronic)
├── PART_OF → construction:focus-positive
└── VARIES_BY → morpheme:waxay (dialectal variant)
```

---

## 2. Polysemy, Homonymy, and Sense Disambiguation

**The problem:** Many Somali words have multiple senses that share a form:
- `waa` = focus marker (positive) vs. distant past tense marker
- `ka` = from, with, about (different postpositional senses)
- `soo` = hither, back, again (directional/aspectual)

**The naive approach:** One node per orthographic form. This collapses distinct senses and creates false connections.

**The correct approach:** One node per **sense**, linked by a `HOMONYM_OF` or `SHARED_FORM` edge. Each sense has its own definition, grammatical behavior, and construction membership.

```
word:waa-1 (focus marker, positive polarity)
word:waa-2 (past tense marker, distant past)
  └── SHARED_FORM → word:waa-1
```

**UI implication:** The dictionary view shows all senses. The grammar view links to the specific sense. Search results disambiguate.

---

## 3. Construction Grammar Over Rule Lists

**The trap:** Traditional grammars present rules as prose: "The focus marker `waa` is used for positive declarative sentences."

**The reality:** Speakers don't memorize rules. They learn **constructions**—prefabricated patterns with slots:

```
[Subject] [waa] [Verb-Past] —> "Waxaan cunay bariis"
```

**Design implication:** Our hypergraph is built around constructions, not rules. A "rule" in a textbook becomes a `Construction` node with members and slots. The wiki can still DISPLAY it as prose, but the underlying data is structural.

```typescript
{
  id: "construction:focus-declarative",
  members: [
    { nodeId: "slot:subject", role: "topic", optional: false },
    { nodeId: "morpheme:waa", role: "marker", position: 2 },
    { nodeId: "slot:verb", role: "predicate", optional: false }
  ]
}
```

---

## 4. Grammatical Gender vs. Natural Gender

**The trap:** Assume masculine/feminine maps to male/female.

**The reality in Somali:**
- Gender is largely arbitrary for inanimates (`bariis` is masculine, `caano` is feminine)
- Some nouns have double gender with meaning differences (`gacan` masculine = hand, feminine = handle)
- Natural gender is marked by distinct lexemes (`inan` boy / `inan` girl — same form! Actually `inan` vs `gabar`)

**Design implication:**
- `grammaticalGender` is an attribute on noun nodes (`MASC`, `FEM`, `BOTH`)
- `naturalGender` is a separate attribute on animate nouns
- Agreement edges (`AGREES_WITH`) reference the grammatical gender, NOT semantics
- We MUST surface this distinction in the UI or English speakers will be confused

---

## 5. Focus, Topic, and Information Structure

Somali is a **focus-prominent language**. This is not a minor feature—it shapes almost every sentence.

**Key concepts to model:**
- **Focus markers** (`waa`, `baa`, `ayaa`) — what is new/emphasized
- **Topic** — what the sentence is about (often fronted, no marker)
- **Given vs. New** — previously mentioned vs. introduced
- **Predicate focus vs. Argument focus** — "John ate THE BREAD" vs. "JOHN ate the bread"

**Design implication:** This cannot be an afterthought. Our `Construction` model must have a `focus` role and a `topic` role from day one. Example sentences should be annotated for information structure, not just translated.

```typescript
{
  members: [
    { nodeId: "word:Axmed", role: "topic" },      // known entity
    { nodeId: "morpheme:waa", role: "focus-marker" },
    { nodeId: "word:cunay", role: "verb" },        // focused: the new info
    { nodeId: "word:bariis", role: "object" }
  ]
}
```

**Pedagogical implication:** Beginners should learn focus constructions BEFORE complex verb morphology, because you can't produce a grammatical Somali sentence without them.

---

## 6. Cliticization and Prosodic Domains

**The trap:** Treat clitics as separate words.

**The reality:** Subject clitics (`uu`, `ay`), object clitics (`-ko`, `-to`), and focus markers cliticize phonologically to the preceding or following word. Their orthographic separation is conventional, not phonological.

- `wuu keenay` = `wuu` (focus+3sg.masc) + `keenay` (brought)
- The `uu` is not an independent word; it's prosodically bound

**Design implication:**
- Model clitics as `MORPHEME` nodes, not `WORD` nodes
- Constructions should mark clitics as bound (`bound: true`)
- Dictionary view should show host+clitic combinations as collocations
- Do NOT teach users that `wuu` is a "word" in the English sense

---

## 7. Etymology and Loanword Networks

Somali has absorbed vocabulary from:
- Arabic (religious, administrative, abstract terms)
- Italian (colonial era: technology, administration)
- English (modern: technology, education)
- Oromo, Swahili (regional trade)

**Design implication:**
- `DERIVES_FROM` edges should track etymological sources
- Loanwords should link to their source language node
- Semantic shift should be documented: Arabic `kitaab` → Somali `buug` (not a direct loan, but cognate domain)
- The dictionary view should optionally show etymology

```
word:buug (book)
  └── DERIVES_FROM → language:arabic:kitaab (with note: "semantic domain cognate, not direct loan")
word:radio
  └── DERIVES_FROM → language:italian:rádio
```

---

## 8. Inflectional and Derivational Morphology

**Inflection:** Grammatical changes to a word (tense, number, case, person)
- Verbs: `keen` (bring) → `keenay` (brought) → `keenaysaa` (is bringing)
- Nouns: `naag` (woman) → `naagta` (the woman) → `naago` (women)

**Derivation:** Creating new words from roots
- `qor` (write) → `qoraal` (writing) → `qoraa` (writer) → `maqor` (written, passive)

**Design implication:**
- Store **citation forms** as canonical nodes
- Inflected forms can be:
  - Generated on-the-fly by a morphology engine (preferred for regular forms)
  - Stored as separate nodes with `INFLECTION_OF` edges (for irregulars)
- Derivational chains should be explicit in the graph

```
root:qor
├── DERIVATION → word:qoraal (nominalization)
├── DERIVATION → word:qoraa (agentive)
└── INFLECTION → word:qoray (past tense, regular)
```

---

## 9. Collocations and Multi-Word Expressions

Somali has many expressions that are not compositional:
- `madax bannaan` (free head = independent)
- `indho la'aan` (without eyes = blind)
- `af garas` (mouth + wisdom = eloquent)

**Design implication:**
- These are `CONSTRUCTION` nodes, not just word sequences
- Each part contributes a role, but the whole has an idiomatic meaning
- The dictionary should surface collocations when looking up constituent words

---

## 10. Register, Formality, and Pragmatics

**Register levels in Somali:**
- **Formal/Religious:** Heavy Arabic loans, classical constructions
- **Standard:** Neutral, used in media and education
- **Informal/Colloquial:** Clitic reductions, slang, code-switching
- **Poetic:** Archaic vocabulary, metrical constraints
- **Diaspora:** Code-switching with English, neologisms

**Design implication:**
- Every edge has a `register` qualifier
- Examples should be tagged by register
- The app should default to `standard` but allow exploration
- WARNING: Do not present religious register as "more correct" — descriptive, not prescriptive

---

## 11. Orthographic Variation

**The problem:** Somali uses the Latin alphabet, but there are romanization variations for dialects and pre-1972 orthography.

**Design implication:**
- Nodes store a canonical orthographic form
- `ALTERNATE_FORM` edges capture spelling variants
- Search should normalize: searching "sh" should find "sh" and "ch" variants if they exist
- For audio-first words, store phonemic representation

---

## 12. Animacy and Person Hierarchies

Somali grammar respects an animacy hierarchy that affects:
- Pronoun choice
- Verb agreement patterns
- Possessive constructions
- Politeness strategies

**Hierarchy (roughly):** 1st person > 2nd person > 3rd human > 3rd animate > 3rd inanimate

**Design implication:**
- Noun nodes should have `animacy` attributes
- Agreement edges may need `hierarchy` annotations
- Politeness constructions (e.g., plural pronouns for singular respectful reference) should be explicit

---

## 13. Fuzzy Boundaries and Prototype Theory

**The trap:** Assume linguistic categories have sharp edges.

**The reality:**
- Is `waa` a "verb" or a "particle"? It's prototype-particle but behaves verbally in some contexts.
- Is `soo` a "directional" or an "aspect marker"? Both, depending on construction.
- Category membership is gradient, not binary.

**Design implication:**
- Allow `IS_A` edges with confidence < 1.0
- Use `PROTOTYPE_OF` edges: "`waa` is the prototypical focus marker"
- Show borderline cases in the wiki: "`ayaa` is like `waa` but differs in X, Y, Z"
- Resist the urge to force everything into a taxonomy

---

## 14. Prescriptive vs. Descriptive Tension

**The conflict:**
- Textbook A (academic): "`waa` requires subject agreement in Standard Somali"
- Textbook B (practical): "Just put `waa` before the verb, learners will pick up agreement naturally"
- Native speaker forum: "Actually, in my family we say it differently..."

**Design implication:**
- The graph is **descriptive** by default
- Every edge is attributed to a source with confidence
- The UI can toggle between "strict mode" (high-confidence, standard-only) and "exploration mode" (all sources, all dialects)
- Never present one textbook as "the truth"

---

## 15. Dictionary Integration (Future-Proofing)

When we add the dictionary, it should not be a separate module. It should be a **view over the same graph**.

### Dictionary Entry = Materialized View

```typescript
// Looking up "keenay" in the dictionary
dictionaryView("keenay"):
  ├── Citation form: keen (bring)
  ├── Part of speech: VERB
  ├── Inflection: PAST TENSE, 3SG MASC
  ├── Definition: "he brought"
  ├── Constructions where it appears: [focus-construction, relative-clause...]
  ├── Collocations: [keen soo, keen hoos...]
  ├── Etymology: Cushitic root * keen
  └── Register: standard
```

All of this data ALREADY exists in our graph as nodes and edges. The dictionary is just a different query.

### Lexical Entry Schema (for when we add it)

```typescript
interface LexicalEntry {
  id: string;              // e.g., "lex:keen"
  citationForm: string;    // canonical form
  partOfSpeech: POS;
  grammaticalGender?: Gender; // for nouns
  animacy?: Animacy;
  senses: Array<{
    definition: string;    // chunk CID
    gloss: string;         // English equivalent
    register: Register[];
    dialects: Dialect[];
    examples: string[];    // example node IDs
    constructions: string[]; // construction IDs
  }>;
  inflectionalParadigm?: Paradigm;
  derivations: string[];   // derived word IDs
  etymology?: Etymology;
}
```

---

## 16. Audio, Prosody, and Pitch Accent

Somali is a **pitch-accent language** (often described as having tone). Most textbooks ignore this because it's hard to represent in writing.

**Design implication (Phase 2+):**
- Store audio chunks for citation forms
- Annotate pitch patterns: `H` (high), `L` (low), `HL` (falling)
- Minimal pairs distinguished by tone only: `báriis` vs. `baríis`
- The graph should have `PHONEME` and `TONAL_PATTERN` nodes
- This is a differentiator: most apps ignore Somali tone entirely

---

## 17. Summary: Design Principles for Somali

| Principle | Rationale |
|-----------|-----------|
| **Lexicon = Grammar** | No silos. `waa` is both dictionary entry and grammar node. |
| **Sense-level granularity** | Homonyms get separate nodes linked by `SHARED_FORM`. |
| **Construction-first** | Rules are surface phenomena; constructions are the deep structure. |
| **Information structure is primary** | Focus/topic must be modeled from day one. |
| **Attribution over authority** | Every fact has a source. No "the" correct answer. |
| **Dialect is dimension, not exception** | Northern, Southern, Benadiri, Maay Maay are first-class. |
| **Morphology is generative** | Regular inflections computed; only irregulars stored. |
| **Register matters** | Formal, informal, poetic, religious are all valid. |
| **Fuzzy categories** | Confidence scores on taxonomic edges. Prototypes, not absolutes. |

---

## Related

- [DATA_MODEL.md](./DATA_MODEL.md)
- [RFC-001: Hypergraph Schema v1](./rfc/001-hypergraph-schema.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
