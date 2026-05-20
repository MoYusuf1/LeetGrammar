/**
 * Textbook ingestion engine.
 *
 * Merges a new textbook into the existing knowledge graph.
 * Handles deduplication, conflict detection, and attribution.
 */

import type { GraphEngine } from './graph-engine';
import type { ChunkStore } from './chunk-store';
import type { Node, Edge, Construction, Chunk } from './types';

export interface IngestionResult {
  /** Nodes that were newly added */
  addedNodes: Node[];
  /** Edges that were newly added */
  addedEdges: Edge[];
  /** Constructions that were newly added */
  addedConstructions: Construction[];
  /** Chunks that were newly added (deduplicated) */
  addedChunks: Chunk[];
  /** Nodes that already existed (same ID) */
  existingNodes: Node[];
  /** Edges that conflict with existing edges */
  conflictingEdges: EdgeConflict[];
  /** Nodes with multiple definitions from different sources */
  multiSourceNodes: MultiSourceNode[];
}

export interface EdgeConflict {
  existingEdge: Edge;
  newEdge: Edge;
  type: 'contradiction' | 'different_qualifiers' | 'different_confidence';
}

export interface MultiSourceNode {
  node: Node;
  sources: string[];
}

export interface TextbookPayload {
  textbookId: string;
  chunks: Chunk[];
  nodes: Node[];
  edges: Edge[];
  constructions: Construction[];
}

export function ingestTextbook(
  engine: GraphEngine,
  chunkStore: ChunkStore,
  payload: TextbookPayload
): IngestionResult {
  const result: IngestionResult = {
    addedNodes: [],
    addedEdges: [],
    addedConstructions: [],
    addedChunks: [],
    existingNodes: [],
    conflictingEdges: [],
    multiSourceNodes: [],
  };

  // ─── Step 1: Ingest chunks ────────────────────────────────────────────────

  for (const chunk of payload.chunks) {
    if (!chunkStore.has(chunk.cid)) {
      chunkStore.fromArray([chunk]);
      result.addedChunks.push(chunk);
    }
  }

  // Note: chunkStore.fromArray bypasses add() dedup, but we check .has() first

  // ─── Step 2: Ingest nodes ─────────────────────────────────────────────────

  for (const node of payload.nodes) {
    if (engine.hasNode(node.id)) {
      result.existingNodes.push(node);

      // Check if this node now has multiple definition sources
      const existingNode = engine.getNode(node.id)!;
      const existingSources = getNodeSources(engine, node.id);
      const newSource = payload.textbookId;
      if (!existingSources.includes(newSource)) {
        result.multiSourceNodes.push({
          node: existingNode,
          sources: [...existingSources, newSource],
        });
      }
    } else {
      engine.addNode(node);
      result.addedNodes.push(node);
    }
  }

  // ─── Step 3: Ingest edges ─────────────────────────────────────────────────

  for (const edge of payload.edges) {
    // Check for conflicts with existing edges between same nodes of same type
    const existingEdges = engine.getEdgesBetween(edge.from, edge.to).filter(
      (e) => e.type === edge.type
    );

    if (existingEdges.length > 0) {
      for (const existing of existingEdges) {
        const conflictType = classifyConflict(existing, edge);
        if (conflictType) {
          result.conflictingEdges.push({
            existingEdge: existing,
            newEdge: edge,
            type: conflictType,
          });
        }
      }
    }

    // Add the new edge regardless (multi-source attribution)
    try {
      engine.addEdge(edge);
      result.addedEdges.push(edge);
    } catch {
      // Edge ID collision — skip (shouldn't happen with namespaced IDs)
    }
  }

  // ─── Step 4: Ingest constructions ─────────────────────────────────────────

  for (const construction of payload.constructions) {
    try {
      engine.addConstruction(construction);
      result.addedConstructions.push(construction);
    } catch {
      // Construction ID collision — skip
    }
  }

  return result;
}

/**
 * Get all unique textbook sources that have edges connected to this node.
 */
function getNodeSources(engine: GraphEngine, nodeId: string): string[] {
  const sources = new Set<string>();
  const outEdges = engine.getEdgesFrom(nodeId);
  const inEdges = engine.getEdgesTo(nodeId);
  for (const e of [...outEdges, ...inEdges]) {
    sources.add(e.qualifiers.source.textbookId);
  }
  return Array.from(sources);
}

/**
 * Classify the relationship between an existing edge and a new edge.
 * Returns undefined if they are compatible (not conflicting).
 */
function classifyConflict(
  existing: Edge,
  incoming: Edge
): 'contradiction' | 'different_qualifiers' | 'different_confidence' | undefined {
  // Same direction, same type, but different target/source
  if (existing.type === 'CONTRADICTS' && incoming.type === 'CONTRADICTS') {
    // Two CONTRADICTS edges between same nodes is fine (symmetric)
    return undefined;
  }

  // Confidence difference > 0.2
  if (Math.abs(existing.qualifiers.confidence - incoming.qualifiers.confidence) > 0.2) {
    return 'different_confidence';
  }

  // Dialect differences
  const existingDialects = new Set(existing.qualifiers.dialects);
  const incomingDialects = new Set(incoming.qualifiers.dialects);
  const hasDialectOverlap = [...existingDialects].some((d) => incomingDialects.has(d));
  if (!hasDialectOverlap && existingDialects.size > 0 && incomingDialects.size > 0) {
    // Same edge claim but for completely different dialects — not a contradiction, just variation
    return 'different_qualifiers';
  }

  // Same claim, same dialects, but different confidence — mild conflict
  if (existing.qualifiers.confidence !== incoming.qualifiers.confidence) {
    return 'different_confidence';
  }

  return undefined;
}

/**
 * Generate a human-readable diff report from ingestion results.
 */
export function generateDiffReport(result: IngestionResult): string {
  const lines: string[] = [];

  lines.push(`# Ingestion Report`);
  lines.push('');
  lines.push(`- **New nodes:** ${result.addedNodes.length}`);
  lines.push(`- **New edges:** ${result.addedEdges.length}`);
  lines.push(`- **New constructions:** ${result.addedConstructions.length}`);
  lines.push(`- **New chunks:** ${result.addedChunks.length}`);
  lines.push(`- **Existing nodes:** ${result.existingNodes.length}`);
  lines.push(`- **Conflicts:** ${result.conflictingEdges.length}`);
  lines.push(`- **Multi-source nodes:** ${result.multiSourceNodes.length}`);
  lines.push('');

  if (result.conflictingEdges.length > 0) {
    lines.push(`## Conflicts`);
    lines.push('');
    for (const conflict of result.conflictingEdges) {
      lines.push(`- **${conflict.type}** between ${conflict.existingEdge.from} → ${conflict.existingEdge.to}`);
      lines.push(`  - Existing: ${conflict.existingEdge.qualifiers.source.textbookId} (confidence: ${conflict.existingEdge.qualifiers.confidence})`);
      lines.push(`  - Incoming: ${conflict.newEdge.qualifiers.source.textbookId} (confidence: ${conflict.newEdge.qualifiers.confidence})`);
    }
    lines.push('');
  }

  if (result.multiSourceNodes.length > 0) {
    lines.push(`## Multi-Source Nodes`);
    lines.push('');
    for (const ms of result.multiSourceNodes) {
      lines.push(`- **${ms.node.labels.default}**: ${ms.sources.join(', ')}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}
