/**
 * Simulated second textbook seed data.
 * Represents an alternative pedagogical source with some overlap,
 * some differences, and some novel content.
 */

import type { Node, Edge, Construction, Chunk } from '@/engine/types';

function q(textbookId: string, confidence = 0.9, dialects: string[] = ['standard']) {
  return {
    source: { textbookId },
    confidence,
    dialects,
  };
}

export const textbookBId = 'textbook-b-2020';

// ─── Chunks ─────────────────────────────────────────────────────────────────

export const textbookBChunks: Chunk[] = [
  {
    cid: 'def:waa:focus-marker:b',
    contentType: 'text/markdown',
    payload: '**Waa** is a positive declarative particle that emphasizes the predicate. Unlike *baa*, it does NOT follow the focused constituent directly. Instead, it introduces the verbal complex.',
  },
  {
    cid: 'def:focus-marker-general',
    contentType: 'text/markdown',
    payload: 'Focus in Somali is marked by particles that shift emphasis to different parts of the sentence. The choice of particle depends on polarity and register.',
  },
  {
    cid: 'def:ayaa:detailed',
    contentType: 'text/markdown',
    payload: '**Ayaa** is the most common focus marker in spoken Somali. It is a variant of *baa* and is preferred in Southern and Standard dialects.',
  },
  {
    cid: 'def:definite-article:b',
    contentType: 'text/markdown',
    payload: 'Definiteness is expressed by suffixes: **-ka/-ga** (masc.) and **-ta/-da** (fem.). The choice between -k-/-g- and -t-/-d- depends on phonological assimilation to the noun stem.',
  },
  {
    cid: 'def:case-marking',
    contentType: 'text/markdown',
    payload: 'Somali nouns show case through tone patterns and suffix alternations: nominative, accusative, and genitive.',
  },
  {
    cid: 'ex:waa-3',
    contentType: 'text/plain',
    payload: 'Waxaan cunay bariis. → I ate rice. (Neutral, no special focus)',
  },
  {
    cid: 'ex:ayaa-1',
    contentType: 'text/plain',
    payload: 'Axmed ayaa cunay bariis. → AHMED ate rice. (Focus on subject)',
  },
  {
    cid: 'ex:case-1',
    contentType: 'text/plain',
    payload: 'bariiska → bariis + ka (the rice, nominative/accusative)',
  },
];

// ─── Nodes (new or overlapping) ─────────────────────────────────────────────

export const textbookBNodes: Node[] = [
  // Overlapping concepts with different definitions
  {
    id: 'concept:focus-marker',
    type: 'CONCEPT',
    labels: { default: 'Focus Marker', somali: 'Calaamadda Dhexdhexaadka' },
    attributes: { category: 'syntax', unit: 'u2' },
    definitionCids: ['def:focus-marker-general'],
  },
  {
    id: 'morpheme:waa',
    type: 'MORPHEME',
    labels: { default: 'waa', somali: 'waa', english: 'focus marker (positive)' },
    attributes: { polarity: 'positive', bound: false },
    definitionCids: ['def:waa:focus-marker:b'],
  },
  {
    id: 'morpheme:ayaa',
    type: 'MORPHEME',
    labels: { default: 'ayaa', somali: 'ayaa', english: 'focus marker (most common)' },
    attributes: { polarity: 'neutral', bound: false, variantOf: 'baa' },
    definitionCids: ['def:ayaa:detailed'],
  },
  {
    id: 'morpheme:ka',
    type: 'MORPHEME',
    labels: { default: '-ka', somali: '-ka', english: 'the (masc. definite article)' },
    attributes: { gender: 'masculine', bound: true },
    definitionCids: ['def:definite-article:b'],
  },
  {
    id: 'morpheme:ta',
    type: 'MORPHEME',
    labels: { default: '-ta', somali: '-ta', english: 'the (fem. definite article)' },
    attributes: { gender: 'feminine', bound: true },
    definitionCids: ['def:definite-article:b'],
  },
  // Novel concept not in Textbook A
  {
    id: 'concept:case-marking',
    type: 'CONCEPT',
    labels: { default: 'Case Marking', somali: 'Calaamadda Kiiska' },
    attributes: { category: 'morphology', unit: 'u1' },
    definitionCids: ['def:case-marking'],
  },
  // Examples
  {
    id: 'example:waa-3',
    type: 'EXAMPLE',
    labels: { default: 'Waxaan cunay bariis' },
    attributes: { translation: 'I ate rice.' },
    definitionCids: ['ex:waa-3'],
  },
  {
    id: 'example:ayaa-1',
    type: 'EXAMPLE',
    labels: { default: 'Axmed ayaa cunay bariis' },
    attributes: { translation: 'AHMED ate rice.' },
    definitionCids: ['ex:ayaa-1'],
  },
  {
    id: 'example:case-1',
    type: 'EXAMPLE',
    labels: { default: 'bariiska (case)' },
    attributes: { translation: 'the rice (nominative)', breakdown: 'bariis + ka' },
    definitionCids: ['ex:case-1'],
  },
];

// ─── Edges ──────────────────────────────────────────────────────────────────

export const textbookBEdges: Edge[] = [
  // Taxonomic (some overlap, some new)
  { id: 'edge:b:is-a-waa', from: 'morpheme:waa', to: 'concept:focus-marker', type: 'IS_A', qualifiers: q(textbookBId, 0.95) },
  { id: 'edge:b:is-a-ayaa', from: 'morpheme:ayaa', to: 'concept:focus-marker', type: 'IS_A', qualifiers: q(textbookBId, 0.97) },
  { id: 'edge:b:ka-is-def', from: 'morpheme:ka', to: 'concept:definite-article', type: 'IS_A', qualifiers: q(textbookBId, 0.98) },
  { id: 'edge:b:ta-is-def', from: 'morpheme:ta', to: 'concept:definite-article', type: 'IS_A', qualifiers: q(textbookBId, 0.98) },

  // New prerequisite: case marking requires noun gender
  { id: 'edge:b:req-gender-case', from: 'concept:case-marking', to: 'concept:noun-gender', type: 'REQUIRES', qualifiers: q(textbookBId, 1.0) },

  // Examples
  { id: 'edge:b:ex-waa3', from: 'example:waa-3', to: 'morpheme:waa', type: 'EXEMPLIFIES', qualifiers: q(textbookBId, 0.9) },
  { id: 'edge:b:ex-ayaa1', from: 'example:ayaa-1', to: 'morpheme:ayaa', type: 'EXEMPLIFIES', qualifiers: q(textbookBId, 0.95) },
  { id: 'edge:b:ex-case1', from: 'example:case-1', to: 'concept:case-marking', type: 'EXEMPLIFIES', qualifiers: q(textbookBId, 0.92) },

  // Textbook B emphasizes that ayaa is more common than baa
  { id: 'edge:b:ayaa-common', from: 'morpheme:ayaa', to: 'morpheme:baa', type: 'VARIES_BY', qualifiers: q(textbookBId, 0.88, ['standard', 'southern']) },
];

// ─── Constructions ──────────────────────────────────────────────────────────

export const textbookBConstructions: Construction[] = [
  {
    id: 'construction:focus-ayaa-subject',
    type: 'CONSTRUCTION',
    name: 'Subject Focus with Ayaa',
    members: [
      { nodeId: 'morpheme:ayaa', role: 'marker', position: 2, optional: false },
      { nodeId: 'concept:masculine', role: 'topic', position: 1, optional: false },
    ],
    qualifiers: q(textbookBId, 0.94),
  },
];
