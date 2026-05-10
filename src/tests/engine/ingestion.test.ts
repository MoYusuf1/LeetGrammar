import { describe, it, expect, beforeEach } from 'vitest';
import { GraphEngine } from '@/engine/graph-engine';
import { ChunkStore } from '@/engine/chunk-store';
import { ingestTextbook, generateDiffReport } from '@/engine/ingestion';
import type { TextbookPayload } from '@/engine/ingestion';

function makePayload(textbookId: string): TextbookPayload {
  return {
    textbookId,
    chunks: [
      { cid: 'chunk-1', contentType: 'text/plain', payload: 'Definition A' },
      { cid: 'chunk-2', contentType: 'text/plain', payload: 'Definition B' },
    ],
    nodes: [
      { id: 'node:concept:a', type: 'CONCEPT', labels: { default: 'Concept A' }, attributes: {}, definitionCids: ['chunk-1'] },
      { id: 'node:concept:b', type: 'CONCEPT', labels: { default: 'Concept B' }, attributes: {}, definitionCids: ['chunk-2'] },
    ],
    edges: [
      { id: `edge:${textbookId}:a-b`, from: 'node:concept:a', to: 'node:concept:b', type: 'REQUIRES', qualifiers: { source: { textbookId }, confidence: 0.9, dialects: ['standard'] } },
    ],
    constructions: [],
  };
}

describe('ingestTextbook', () => {
  let engine: GraphEngine;
  let chunks: ChunkStore;

  beforeEach(() => {
    engine = new GraphEngine();
    chunks = new ChunkStore();
  });

  it('ingests a new textbook from scratch', () => {
    const result = ingestTextbook(engine, chunks, makePayload('textbook-a'));
    expect(result.addedNodes).toHaveLength(2);
    expect(result.addedEdges).toHaveLength(1);
    expect(result.addedChunks).toHaveLength(2);
    expect(result.existingNodes).toHaveLength(0);
  });

  it('deduplicates chunks', async () => {
    const payload = makePayload('textbook-a');
    // Pre-load chunks into store
    chunks.fromArray(payload.chunks);
    expect(chunks.size).toBe(2);
    const result = ingestTextbook(engine, chunks, payload);
    // All chunks already exist, so none are "added"
    expect(result.addedChunks.length).toBe(0);
    expect(chunks.size).toBe(2);
  });

  it('marks existing nodes on second ingestion', () => {
    ingestTextbook(engine, chunks, makePayload('textbook-a'));
    const result = ingestTextbook(engine, chunks, {
      ...makePayload('textbook-b'),
      edges: [
        { id: 'edge:b:a-b', from: 'node:concept:a', to: 'node:concept:b', type: 'REQUIRES', qualifiers: { source: { textbookId: 'textbook-b' }, confidence: 0.85, dialects: ['standard'] } },
      ],
    });
    expect(result.existingNodes).toHaveLength(2);
    expect(result.addedEdges).toHaveLength(1);
    expect(result.conflictingEdges).toHaveLength(1); // confidence differs by >0.2
  });

  it('detects multi-source nodes', () => {
    ingestTextbook(engine, chunks, makePayload('textbook-a'));
    const result = ingestTextbook(engine, chunks, {
      ...makePayload('textbook-b'),
      nodes: [
        { id: 'node:concept:a', type: 'CONCEPT', labels: { default: 'Concept A' }, attributes: {}, definitionCids: ['chunk-1'] },
      ],
      edges: [
        { id: 'edge:b:a-b', from: 'node:concept:a', to: 'node:concept:b', type: 'REQUIRES', qualifiers: { source: { textbookId: 'textbook-b' }, confidence: 0.95, dialects: ['standard'] } },
      ],
    });
    expect(result.multiSourceNodes.length).toBeGreaterThan(0);
    expect(result.multiSourceNodes[0].sources).toContain('textbook-a');
    expect(result.multiSourceNodes[0].sources).toContain('textbook-b');
  });

  it('generates a diff report', () => {
    const result = ingestTextbook(engine, chunks, makePayload('textbook-a'));
    const report = generateDiffReport(result);
    expect(report).toContain('Ingestion Report');
    expect(report).toContain('**New nodes:** 2');
  });
});
