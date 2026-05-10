/**
 * Seed data for the LeetSomali Knowledge Graph.
 * Populates u0 (Sounds & Greetings) and u1 (Noun System).
 */

import type { Node, Edge, Construction, Chunk } from '@/engine/types';

// ─── Helper to create a standard qualifier ─────────────────────────────────

function q(textbookId: string, confidence = 0.95, dialects: string[] = ['standard']) {
  return {
    source: { textbookId },
    confidence,
    dialects,
  };
}

// ─── Chunks (content-addressed definitions and examples) ────────────────────

export const seedChunks: Chunk[] = [
  {
    cid: 'def:waa:focus-marker',
    contentType: 'text/markdown',
    payload: 'The focus marker **waa** is used in positive declarative sentences to mark what is new or emphasized. It follows the focused element and requires subject agreement.',
  },
  {
    cid: 'def:baa:focus-marker',
    contentType: 'text/markdown',
    payload: 'The focus marker **baa** (or **ayaa**) is used to mark the focused element in both positive and negative contexts. Unlike **waa**, it immediately follows the focused constituent.',
  },
  {
    cid: 'def:noun-gender',
    contentType: 'text/markdown',
    payload: 'Somali nouns have two grammatical genders: masculine and feminine. Gender is not predictable from meaning for inanimate objects.',
  },
  {
    cid: 'def:definite-article',
    contentType: 'text/markdown',
    payload: 'The definite article is a suffix: **-ka** (masculine) and **-ta** (feminine). It attaches directly to the noun stem.',
  },
  {
    cid: 'def:plural-formation',
    contentType: 'text/markdown',
    payload: 'Somali plurals are formed by stem changes (ablaut), suffixes (-o, -yaal), or reduplication. The plural form must be learned with the noun.',
  },
  {
    cid: 'def:somali-alphabet',
    contentType: 'text/markdown',
    payload: 'The Somali Latin alphabet has 26 letters, including **c** (ʕ), **x** (ħ), **kh** (x), and digraphs **sh**, **dh**, **gh**.',
  },
  {
    cid: 'ex:waa-1',
    contentType: 'text/plain',
    payload: 'Axmed wuu cunay bariis. → Ahmed ate rice. (Focus on the action)',
  },
  {
    cid: 'ex:waa-2',
    contentType: 'text/plain',
    payload: 'Bariis baa Axmed cunay. → Ahmed ate RICE. (Focus on the object)',
  },
  {
    cid: 'ex:greeting-1',
    contentType: 'text/plain',
    payload: 'Ma nabad baa? → Is there peace? (How are you?)',
  },
  {
    cid: 'ex:definite-article-1',
    contentType: 'text/plain',
    payload: 'bariis + ka → bariiska (the rice, masculine)',
  },
  {
    cid: 'ex:definite-article-2',
    contentType: 'text/plain',
    payload: 'naag + ta → naagta (the woman, feminine)',
  },
  {
    cid: 'ex:plural-1',
    contentType: 'text/plain',
    payload: 'naag → naago (women, -o suffix)',
  },
  {
    cid: 'ex:plural-2',
    contentType: 'text/plain',
    payload: 'nin → niman (men, ablaut plural)',
  },
];

// ─── Nodes ──────────────────────────────────────────────────────────────────

export const seedNodes: Node[] = [
  // ── u0: Sounds & Greetings ──
  {
    id: 'concept:somali-alphabet',
    type: 'CONCEPT',
    labels: { default: 'Somali Alphabet', somali: 'Alifbeetada Soomaaliga' },
    attributes: { category: 'phonology', unit: 'u0' },
    definitionCids: ['def:somali-alphabet'],
  },
  {
    id: 'concept:greetings',
    type: 'CONCEPT',
    labels: { default: 'Greetings', somali: 'Salaama' },
    attributes: { category: 'pragmatics', unit: 'u0' },
    definitionCids: [],
  },

  // ── u1: Noun System ──
  {
    id: 'concept:noun-gender',
    type: 'CONCEPT',
    labels: { default: 'Noun Gender', somali: 'Jinsiga Magaca' },
    attributes: { category: 'morphology', unit: 'u1' },
    definitionCids: ['def:noun-gender'],
  },
  {
    id: 'concept:masculine',
    type: 'CONCEPT',
    labels: { default: 'Masculine', somali: 'Rag' },
    attributes: { category: 'gender', unit: 'u1' },
    definitionCids: [],
  },
  {
    id: 'concept:feminine',
    type: 'CONCEPT',
    labels: { default: 'Feminine', somali: 'Dheddig' },
    attributes: { category: 'gender', unit: 'u1' },
    definitionCids: [],
  },
  {
    id: 'concept:definite-article',
    type: 'CONCEPT',
    labels: { default: 'Definite Article', somali: 'Qodobka Magaca' },
    attributes: { category: 'morphology', unit: 'u1' },
    definitionCids: ['def:definite-article'],
  },
  {
    id: 'morpheme:ka',
    type: 'MORPHEME',
    labels: { default: '-ka', somali: '-ka', english: 'the (masc. definite article)' },
    attributes: { gender: 'masculine', bound: true },
    definitionCids: [],
  },
  {
    id: 'morpheme:ta',
    type: 'MORPHEME',
    labels: { default: '-ta', somali: '-ta', english: 'the (fem. definite article)' },
    attributes: { gender: 'feminine', bound: true },
    definitionCids: [],
  },
  {
    id: 'concept:plural-formation',
    type: 'CONCEPT',
    labels: { default: 'Plural Formation', somali: 'Tirada Badan' },
    attributes: { category: 'morphology', unit: 'u1' },
    definitionCids: ['def:plural-formation'],
  },

  // ── Cross-cutting: Focus Markers ──
  {
    id: 'concept:focus-marker',
    type: 'CONCEPT',
    labels: { default: 'Focus Marker', somali: 'Calaamadda Dhexdhexaadka' },
    attributes: { category: 'syntax', unit: 'u2' },
    definitionCids: [],
  },
  {
    id: 'morpheme:waa',
    type: 'MORPHEME',
    labels: { default: 'waa', somali: 'waa', english: 'focus marker (positive)' },
    attributes: { polarity: 'positive', bound: false },
    definitionCids: ['def:waa:focus-marker'],
  },
  {
    id: 'morpheme:baa',
    type: 'MORPHEME',
    labels: { default: 'baa', somali: 'baa', english: 'focus marker' },
    attributes: { polarity: 'neutral', bound: false },
    definitionCids: ['def:baa:focus-marker'],
  },
  {
    id: 'morpheme:ayaa',
    type: 'MORPHEME',
    labels: { default: 'ayaa', somali: 'ayaa', english: 'focus marker (variant)' },
    attributes: { polarity: 'neutral', bound: false, variantOf: 'baa' },
    definitionCids: [],
  },

  // ── Examples ──
  {
    id: 'example:waa-1',
    type: 'EXAMPLE',
    labels: { default: 'Axmed wuu cunay bariis' },
    attributes: { translation: 'Ahmed ate rice.' },
    definitionCids: ['ex:waa-1'],
  },
  {
    id: 'example:waa-2',
    type: 'EXAMPLE',
    labels: { default: 'Bariis baa Axmed cunay' },
    attributes: { translation: 'Ahmed ate RICE.' },
    definitionCids: ['ex:waa-2'],
  },
  {
    id: 'example:greeting-1',
    type: 'EXAMPLE',
    labels: { default: 'Ma nabad baa?' },
    attributes: { translation: 'How are you?' },
    definitionCids: ['ex:greeting-1'],
  },
  {
    id: 'example:definite-1',
    type: 'EXAMPLE',
    labels: { default: 'bariiska' },
    attributes: { translation: 'the rice', breakdown: 'bariis + ka' },
    definitionCids: ['ex:definite-article-1'],
  },
  {
    id: 'example:definite-2',
    type: 'EXAMPLE',
    labels: { default: 'naagta' },
    attributes: { translation: 'the woman', breakdown: 'naag + ta' },
    definitionCids: ['ex:definite-article-2'],
  },
  {
    id: 'example:plural-1',
    type: 'EXAMPLE',
    labels: { default: 'naago' },
    attributes: { translation: 'women', breakdown: 'naag + o' },
    definitionCids: ['ex:plural-1'],
  },
  {
    id: 'example:plural-2',
    type: 'EXAMPLE',
    labels: { default: 'niman' },
    attributes: { translation: 'men', breakdown: 'nin → niman (ablaut)' },
    definitionCids: ['ex:plural-2'],
  },

  // ── Words (for future dictionary) ──
  {
    id: 'word:bariis',
    type: 'WORD',
    labels: { default: 'bariis', somali: 'bariis', english: 'rice' },
    attributes: { gender: 'masculine', animacy: 'inanimate' },
    definitionCids: [],
  },
  {
    id: 'word:naag',
    type: 'WORD',
    labels: { default: 'naag', somali: 'naag', english: 'woman' },
    attributes: { gender: 'feminine', animacy: 'human' },
    definitionCids: [],
  },
  {
    id: 'word:nin',
    type: 'WORD',
    labels: { default: 'nin', somali: 'nin', english: 'man' },
    attributes: { gender: 'masculine', animacy: 'human' },
    definitionCids: [],
  },
];

// ─── Edges ──────────────────────────────────────────────────────────────────

export const seedEdges: Edge[] = [
  // Taxonomic
  { id: 'edge:is-a-waa', from: 'morpheme:waa', to: 'concept:focus-marker', type: 'IS_A', qualifiers: q('saeed-1999', 0.98) },
  { id: 'edge:is-a-baa', from: 'morpheme:baa', to: 'concept:focus-marker', type: 'IS_A', qualifiers: q('saeed-1999', 0.98) },
  { id: 'edge:is-a-ayaa', from: 'morpheme:ayaa', to: 'concept:focus-marker', type: 'IS_A', qualifiers: q('saeed-1999', 0.95) },
  { id: 'edge:ka-is-def', from: 'morpheme:ka', to: 'concept:definite-article', type: 'IS_A', qualifiers: q('saeed-1999', 0.99) },
  { id: 'edge:ta-is-def', from: 'morpheme:ta', to: 'concept:definite-article', type: 'IS_A', qualifiers: q('saeed-1999', 0.99) },

  // Gender
  { id: 'edge:gender-masc', from: 'concept:masculine', to: 'concept:noun-gender', type: 'PART_OF', qualifiers: q('saeed-1999', 1.0) },
  { id: 'edge:gender-fem', from: 'concept:feminine', to: 'concept:noun-gender', type: 'PART_OF', qualifiers: q('saeed-1999', 1.0) },

  // Contrasts
  { id: 'edge:waa-vs-baa', from: 'morpheme:waa', to: 'morpheme:baa', type: 'CONTRADICTS', qualifiers: q('saeed-1999', 0.9) },
  { id: 'edge:ka-vs-ta', from: 'morpheme:ka', to: 'morpheme:ta', type: 'CONTRADICTS', qualifiers: q('saeed-1999', 0.95) },

  // Variation
  { id: 'edge:baa-varies', from: 'morpheme:baa', to: 'morpheme:ayaa', type: 'VARIES_BY', qualifiers: q('saeed-1999', 0.92, ['standard', 'southern']) },

  // Prerequisites (curriculum DAG)
  { id: 'edge:req-alphabet-greetings', from: 'concept:greetings', to: 'concept:somali-alphabet', type: 'REQUIRES', qualifiers: q('saeed-1999', 1.0) },
  { id: 'edge:req-alphabet-gender', from: 'concept:noun-gender', to: 'concept:somali-alphabet', type: 'REQUIRES', qualifiers: q('saeed-1999', 1.0) },
  { id: 'edge:req-gender-article', from: 'concept:definite-article', to: 'concept:noun-gender', type: 'REQUIRES', qualifiers: q('saeed-1999', 1.0) },
  { id: 'edge:req-gender-plural', from: 'concept:plural-formation', to: 'concept:noun-gender', type: 'REQUIRES', qualifiers: q('saeed-1999', 1.0) },
  { id: 'edge:req-article-focus', from: 'concept:focus-marker', to: 'concept:definite-article', type: 'REQUIRES', qualifiers: q('saeed-1999', 0.9) },

  // Examples illustrate concepts
  { id: 'edge:ex-waa1', from: 'example:waa-1', to: 'morpheme:waa', type: 'EXEMPLIFIES', qualifiers: q('saeed-1999', 0.95) },
  { id: 'edge:ex-waa2', from: 'example:waa-2', to: 'morpheme:baa', type: 'EXEMPLIFIES', qualifiers: q('saeed-1999', 0.95) },
  { id: 'edge:ex-greeting', from: 'example:greeting-1', to: 'concept:greetings', type: 'EXEMPLIFIES', qualifiers: q('saeed-1999', 0.9) },
  { id: 'edge:ex-def1', from: 'example:definite-1', to: 'morpheme:ka', type: 'EXEMPLIFIES', qualifiers: q('saeed-1999', 0.98) },
  { id: 'edge:ex-def2', from: 'example:definite-2', to: 'morpheme:ta', type: 'EXEMPLIFIES', qualifiers: q('saeed-1999', 0.98) },
  { id: 'edge:ex-plural1', from: 'example:plural-1', to: 'concept:plural-formation', type: 'EXEMPLIFIES', qualifiers: q('saeed-1999', 0.95) },
  { id: 'edge:ex-plural2', from: 'example:plural-2', to: 'concept:plural-formation', type: 'EXEMPLIFIES', qualifiers: q('saeed-1999', 0.95) },

  // Word → gender agreement
  { id: 'edge:bariis-masc', from: 'word:bariis', to: 'concept:masculine', type: 'AGREES_WITH', qualifiers: q('saeed-1999', 0.95) },
  { id: 'edge:naag-fem', from: 'word:naag', to: 'concept:feminine', type: 'AGREES_WITH', qualifiers: q('saeed-1999', 0.95) },
  { id: 'edge:nin-masc', from: 'word:nin', to: 'concept:masculine', type: 'AGREES_WITH', qualifiers: q('saeed-1999', 0.95) },
];

// ─── Constructions ──────────────────────────────────────────────────────────

export const seedConstructions: Construction[] = [
  {
    id: 'construction:focus-positive-declarative',
    type: 'CONSTRUCTION',
    name: 'Positive Focus Declarative',
    members: [
      { nodeId: 'morpheme:waa', role: 'marker', position: 2, optional: false },
      { nodeId: 'concept:masculine', role: 'topic', position: 1, optional: false },
    ],
    qualifiers: q('saeed-1999', 0.95),
  },
  {
    id: 'construction:definite-noun-masc',
    type: 'CONSTRUCTION',
    name: 'Definite Noun (Masculine)',
    members: [
      { nodeId: 'word:bariis', role: 'head', position: 1, optional: false },
      { nodeId: 'morpheme:ka', role: 'determiner', position: 2, optional: false, bound: true },
    ],
    qualifiers: q('saeed-1999', 0.99),
  },
  {
    id: 'construction:definite-noun-fem',
    type: 'CONSTRUCTION',
    name: 'Definite Noun (Feminine)',
    members: [
      { nodeId: 'word:naag', role: 'head', position: 1, optional: false },
      { nodeId: 'morpheme:ta', role: 'determiner', position: 2, optional: false, bound: true },
    ],
    qualifiers: q('saeed-1999', 0.99),
  },
];
