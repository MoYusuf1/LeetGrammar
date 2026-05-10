/**
 * Initializes the knowledge graph with seed data on first load.
 *
 * Strategy:
 * 1. Try to load from SQLite (persistent storage)
 * 2. If empty, seed from Textbook A (base) for immediate usability
 * 3. Async fetch full swarm knowledge graph (~1 MB) and batch-ingest
 * 4. Ingest Textbook B on top
 * 5. Persist to SQLite for next time
 */

import { useEffect, useRef } from 'react';
import { useGraphStore } from '@/stores/graph-store';
import { seedNodes, seedEdges, seedConstructions, seedChunks } from '@/data/graph-seed';
import {
  textbookBNodes,
  textbookBEdges,
  textbookBConstructions,
  textbookBChunks,
  textbookBId,
} from '@/data/textbook-b-seed';
import { ingestTextbook } from '@/engine/ingestion';

let globalBootstrapStarted = false;

export function useGraphInit() {
  const initialized = useRef(false);
  const { engine, chunks, addNode, addEdge, addConstruction, persistence, setLoading } =
    useGraphStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (engine.stats.nodes > 0) {
      return; // Already has data
    }

    if (globalBootstrapStarted) return;
    globalBootstrapStarted = true;

    async function bootstrap() {
      // ─── Step 1: Try loading from SQLite ──────────────────────────────────
      try {
        await persistence.init();
        const stats = persistence.stats();
        if (stats && stats.nodes > 0) {
          setLoading(true);
          await useGraphStore.getState().loadFromSQLite();
          setLoading(false);
          return;
        }
      } catch {
        // SQLite not available or empty — proceed to seed
      }

      // ─── Step 2: Seed Textbook A (base) ───────────────────────────────────
      chunks.fromArray(seedChunks);
      for (const node of seedNodes) {
        if (!engine.hasNode(node.id)) {
          try {
            addNode(node);
          } catch {
            /* ignore duplicates */
          }
        }
      }
      for (const edge of seedEdges) {
        try {
          addEdge(edge);
        } catch {
          /* ignore duplicates */
        }
      }
      for (const c of seedConstructions) {
        try {
          addConstruction(c);
        } catch {
          /* ignore duplicates */
        }
      }

      // ─── Step 3: Async fetch & ingest swarm data ──────────────────────────
      try {
        setLoading(true);
        const res = await fetch('/somali-knowledge-graph.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Batch-import nodes to avoid any frame drops on slower devices
        const BATCH = 300;
        for (let i = 0; i < data.nodes.length; i += BATCH) {
          const batch = data.nodes.slice(i, i + BATCH);
          for (const node of batch) {
            if (!engine.hasNode(node.id)) {
              try {
                addNode(node);
              } catch {
                /* ignore */
              }
            }
          }
          if (i + BATCH < data.nodes.length) {
            await new Promise((r) => setTimeout(r, 0));
          }
        }

        for (const edge of data.edges) {
          try {
            addEdge(edge);
          } catch {
            /* ignore orphans / duplicates */
          }
        }
        for (const c of data.constructions) {
          try {
            addConstruction(c);
          } catch {
            /* ignore */
          }
        }
        if (data.chunks?.length) {
          chunks.fromArray(data.chunks);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[useGraphInit] Swarm data unavailable, using seeds only:', err);
      } finally {
        setLoading(false);
      }

      // ─── Step 4: Ingest Textbook B ────────────────────────────────────────
      ingestTextbook(engine, chunks, {
        textbookId: textbookBId,
        chunks: textbookBChunks,
        nodes: textbookBNodes,
        edges: textbookBEdges,
        constructions: textbookBConstructions,
      });

      // ─── Step 5: Persist to SQLite ────────────────────────────────────────
      try {
        await useGraphStore.getState().saveToSQLite();
      } catch {
        // Persistence failed, but graph is still usable in memory
      }
    }

    bootstrap();
  }, [engine, chunks, addNode, addEdge, addConstruction, persistence, setLoading]);
}
