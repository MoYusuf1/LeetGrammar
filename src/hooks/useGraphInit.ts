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

/** Hydrate engine + chunks from a JSON snapshot. */
function hydrateFromSnapshot(
  engine: import('@/engine/graph-engine').GraphEngine,
  chunks: import('@/engine/chunk-store').ChunkStore,
  snapshot: GraphSnapshot & { chunks: import('@/engine/types').Chunk[] }
) {
  engine.clear();
  chunks.clear();
  for (const node of snapshot.nodes) {
    try { engine.addNode(node); } catch { /* ignore duplicates */ }
  }
  for (const edge of snapshot.edges) {
    try { engine.addEdge(edge); } catch { /* ignore duplicates */ }
  }
  for (const c of snapshot.constructions) {
    try { engine.addConstruction(c); } catch { /* ignore duplicates */ }
  }
  chunks.fromArray(snapshot.chunks);
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
      // ─── Step 1: Try Supabase (canonical cloud graph) ─────────────────────
      if (isSupabaseConfigured) {
        try {
          setLoading(true);
          const { data, error } = await getSupabase().rpc('get_full_graph');
          if (!error && data && data.meta?.node_count > 0) {
            hydrateFromSnapshot(engine, chunks, {
              nodes: data.nodes,
              edges: data.edges,
              constructions: data.constructions,
              chunks: data.chunks,
            });
            // Persist to SQLite cache for faster next load
            try {
              await useGraphStore.getState().saveToSQLite();
            } catch {
              // Cache failure is non-fatal
            }
            setLoading(false);
            // Still fall through to Textbook B ingestion
          } else {
            if (error) {
              // eslint-disable-next-line no-console
              console.warn('[useGraphInit] Supabase graph unavailable:', error.message);
            }
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('[useGraphInit] Supabase RPC failed:', err);
        } finally {
          setLoading(false);
        }
      }

      // ─── Step 2: Try local SQLite cache ───────────────────────────────────
      if (engine.stats.nodes === 0) {
        try {
          await persistence.init();
          const stats = persistence.stats();
          if (stats && stats.nodes > 0) {
            setLoading(true);
            await useGraphStore.getState().loadFromSQLite();
            setLoading(false);
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
        await useGraphStore.getState().saveToSQLite();
      } catch {
        // Persistence failed, but graph is still usable in memory
      }
    }

    bootstrap();
  }, [engine, chunks, persistence, setLoading]);
}
