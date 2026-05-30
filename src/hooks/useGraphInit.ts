/**
 * Initializes the knowledge graph on first load.
 *
 * Database-first architecture:
 * 1. Supabase RPC — canonical graph from cloud (single source of truth)
 * 2. Local SQLite cache — offline performance only
 * 3. If both empty, the app waits for data (no static fallbacks)
 * 4. Persist successful loads to SQLite cache
 */

import { useEffect, useRef } from 'react';
import { useGraphStore } from '@/stores/graph-store';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getFullGraph } from '@/lib/supabase/lesson-queries';
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
        // ─── Step 1: Supabase RPC (canonical cloud graph) ─────────────────────
        if (isSupabaseConfigured) {
          try {
            const snapshot = await withTimeout(
              getFullGraph(),
              8000,
              'Supabase RPC'
            );
            if (snapshot !== 'timeout' && snapshot.meta?.node_count > 0) {
              hydrateFromSnapshot(engine, chunks, {
                nodes: snapshot.nodes,
                edges: snapshot.edges,
                constructions: snapshot.constructions,
                chunks: snapshot.chunks,
              });
              // Persist to SQLite cache for faster next load
              try {
                await withTimeout(useGraphStore.getState().saveToSQLite(), 5000, 'SQLite save');
              } catch {
                // Cache failure is non-fatal
              }
            }
          } catch {
            // Supabase RPC failed — fall through to SQLite
          }
        }

        // ─── Step 2: Local SQLite cache ───────────────────────────────────────
        if (engine.stats.nodes === 0) {
          try {
            await withTimeout(persistence.init(), 5000, 'SQLite init');
            const stats = persistence.stats();
            if (stats && stats.nodes > 0) {
              await withTimeout(useGraphStore.getState().loadFromSQLite(), 5000, 'SQLite load');
            }
          } catch {
            // SQLite not available or empty — graph stays empty
          }
        }

        // ─── Step 3: No static seeds ──────────────────────────────────────────
        // Database-first: if Supabase and SQLite are both empty, the app
        // shows a loading / connect state. No silent fallbacks to hardcoded data.

        // ─── Step 4: Persist to SQLite cache ──────────────────────────────────
        if (engine.stats.nodes > 0) {
          try {
            await withTimeout(useGraphStore.getState().saveToSQLite(), 5000, 'SQLite save');
          } catch {
            // Persistence failed, but graph is still usable in memory
          }
        }
      } finally {
        done();
      }
    }

    bootstrap();
  }, [engine, chunks, persistence, setLoading]);
}
