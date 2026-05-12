/**
 * Initializes the knowledge graph on first load.
 *
 * Strategy (priority order):
 * 1. Supabase RPC — fetch canonical graph from cloud (one round-trip)
 * 2. Local SQLite — cached graph from previous session
 * 3. Static seeds — fallback for offline / no-config scenarios
 * 4. Ingest Textbook B on top of whatever loaded
 * 5. Persist to SQLite cache for next time
 */

import { useEffect, useRef } from 'react';
import { useGraphStore } from '@/stores/graph-store';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { seedNodes, seedEdges, seedConstructions, seedChunks } from '@/data/graph-seed';
import {
  textbookBNodes,
  textbookBEdges,
  textbookBConstructions,
  textbookBChunks,
  textbookBId,
} from '@/data/textbook-b-seed';
import { ingestTextbook } from '@/engine/ingestion';
import type { GraphSnapshot } from '@/engine/types';

let globalBootstrapStarted = false;

/** Normalize snake_case fields from Supabase RPC to camelCase. */
function normalizeNode(node: any): import('@/engine/types').Node {
  return {
    id: node.id,
    type: node.type,
    labels: node.labels ?? (node.label ? { default: node.label } : { default: node.id }),
    attributes: node.attributes ?? {},
    definitionCids: node.definitionCids ?? node.definition_cids ?? [],
  };
}

function normalizeEdge(edge: any): import('@/engine/types').Edge {
  return {
    id: edge.id,
    from: edge.from ?? edge.from_id ?? edge.from_node,
    to: edge.to ?? edge.to_id ?? edge.to_node,
    type: edge.type,
    qualifiers: edge.qualifiers ?? {},
  };
}

function normalizeConstruction(c: any): import('@/engine/types').Construction {
  return {
    id: c.id,
    type: 'CONSTRUCTION',
    name: c.name,
    members: c.members ?? [],
    qualifiers: c.qualifiers ?? {},
  };
}

function normalizeChunk(chunk: any): import('@/engine/types').Chunk {
  return {
    cid: chunk.cid,
    contentType: chunk.contentType ?? chunk.content_type ?? 'text/plain',
    payload: chunk.payload,
  };
}

/** Hydrate engine + chunks from a JSON snapshot. */
function hydrateFromSnapshot(
  engine: import('@/engine/graph-engine').GraphEngine,
  chunks: import('@/engine/chunk-store').ChunkStore,
  snapshot: GraphSnapshot & { chunks: import('@/engine/types').Chunk[] }
) {
  engine.clear();
  chunks.clear();
  for (const node of snapshot.nodes) {
    try { engine.addNode(normalizeNode(node)); } catch { /* ignore duplicates */ }
  }
  for (const edge of snapshot.edges) {
    try { engine.addEdge(normalizeEdge(edge)); } catch { /* ignore duplicates */ }
  }
  for (const c of snapshot.constructions) {
    try { engine.addConstruction(normalizeConstruction(c)); } catch { /* ignore duplicates */ }
  }
  chunks.fromArray(snapshot.chunks.map(normalizeChunk));
}

/** Race an async operation against a timeout. */
async function withTimeout<T>(promise: PromiseLike<T>, ms: number, label: string): Promise<T | 'timeout'> {
  const timeout = new Promise<'timeout'>((_, reject) =>
    setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
  );
  try {
    return await Promise.race([promise, timeout]);
  } catch {
    return 'timeout';
  }
}

export function useGraphInit() {
  const initialized = useRef(false);
  const { engine, chunks, persistence, setLoading } = useGraphStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (engine.stats.nodes > 0) {
      return; // Already has data
    }

    if (globalBootstrapStarted) return;
    globalBootstrapStarted = true;

    async function bootstrap() {
      setLoading(true);
      const done = () => {
        setLoading(false);
      };

      try {
        // ─── Step 1: Try Supabase (canonical cloud graph) ─────────────────────
        if (isSupabaseConfigured) {
          try {
            const rpcResult = await withTimeout(
              getSupabase().rpc('get_full_graph'),
              8000,
              'Supabase RPC'
            );
            if (rpcResult !== 'timeout' && rpcResult.data && rpcResult.data.meta?.node_count > 0) {
              hydrateFromSnapshot(engine, chunks, {
                nodes: rpcResult.data.nodes,
                edges: rpcResult.data.edges,
                constructions: rpcResult.data.constructions,
                chunks: rpcResult.data.chunks,
              });
              // Persist to SQLite cache for faster next load
              try {
                await withTimeout(useGraphStore.getState().saveToSQLite(), 5000, 'SQLite save');
              } catch {
                // Cache failure is non-fatal
              }
            }
          } catch {
            // Supabase RPC failed — fall through to SQLite / seeds
          }
        }

        // ─── Step 2: Try local SQLite cache ───────────────────────────────────
        if (engine.stats.nodes === 0) {
          try {
            await withTimeout(persistence.init(), 5000, 'SQLite init');
            const stats = persistence.stats();
            if (stats && stats.nodes > 0) {
              await withTimeout(useGraphStore.getState().loadFromSQLite(), 5000, 'SQLite load');
            }
          } catch {
            // SQLite not available or empty — proceed to seeds
          }
        }

        // ─── Step 3: Static seeds (last resort) ───────────────────────────────
        if (engine.stats.nodes === 0) {
          chunks.fromArray(seedChunks);
          for (const node of seedNodes) {
            if (!engine.hasNode(node.id)) {
              try { engine.addNode(node); } catch { /* ignore */ }
            }
          }
          for (const edge of seedEdges) {
            try { engine.addEdge(edge); } catch { /* ignore */ }
            }
          for (const c of seedConstructions) {
            try { engine.addConstruction(c); } catch { /* ignore */ }
          }
        }

        // ─── Step 4: Ingest Textbook B ────────────────────────────────────────
        ingestTextbook(engine, chunks, {
          textbookId: textbookBId,
          chunks: textbookBChunks,
          nodes: textbookBNodes,
          edges: textbookBEdges,
          constructions: textbookBConstructions,
        });

        // ─── Step 5: Persist to SQLite cache ──────────────────────────────────
        try {
          await withTimeout(useGraphStore.getState().saveToSQLite(), 5000, 'SQLite save');
        } catch {
          // Persistence failed, but graph is still usable in memory
        }
      } finally {
        done();
      }
    }

    bootstrap();
  }, [engine, chunks, persistence, setLoading]);
}
