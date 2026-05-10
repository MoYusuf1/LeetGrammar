/**
 * Initializes the knowledge graph with seed data on first load.
 *
 * Strategy:
 * 1. Try to load from SQLite (persistent storage)
 * 2. If empty, seed from Textbook A + Textbook B
 * 3. After seeding, save to SQLite for next time
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

export function useGraphInit() {
  const initialized = useRef(false);
  const { engine, chunks, addNode, addEdge, addConstruction, persistence } = useGraphStore();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (engine.stats.nodes > 0) {
      return; // Already has data (e.g., from a previous render)
    }

    async function bootstrap() {
      // ─── Step 1: Try loading from SQLite ──────────────────────────────────
      try {
        await persistence.init();
        const stats = persistence.stats();
        if (stats && stats.nodes > 0) {
          await useGraphStore.getState().loadFromSQLite();
          return;
        }
      } catch {
        // SQLite not available or empty — proceed to seed
      }

      // ─── Step 2: Seed Textbook A (base) ───────────────────────────────────
      chunks.fromArray(seedChunks);
      for (const node of seedNodes) {
        try { addNode(node); } catch { /* ignore duplicates */ }
      }
      for (const edge of seedEdges) {
        try { addEdge(edge); } catch { /* ignore duplicates */ }
      }
      for (const c of seedConstructions) {
        try { addConstruction(c); } catch { /* ignore duplicates */ }
      }

      // ─── Step 3: Ingest Textbook B ────────────────────────────────────────
      ingestTextbook(engine, chunks, {
        textbookId: textbookBId,
        chunks: textbookBChunks,
        nodes: textbookBNodes,
        edges: textbookBEdges,
        constructions: textbookBConstructions,
      });

      // ─── Step 4: Persist to SQLite ────────────────────────────────────────
      try {
        await useGraphStore.getState().saveToSQLite();
      } catch {
        // Persistence failed, but graph is still usable in memory
      }
    }

    bootstrap();
  }, [engine, chunks, addNode, addEdge, addConstruction, persistence]);
}
