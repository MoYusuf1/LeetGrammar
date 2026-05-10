/**
 * Zustand store for the knowledge graph.
 * Wraps GraphEngine and ChunkStore with reactive state + persistence.
 */

import { create } from 'zustand';
import { GraphEngine } from '@/engine/graph-engine';
import { ChunkStore } from '@/engine/chunk-store';
import { GraphPersistence } from '@/engine/persistence';
import { exportToJSON, downloadJSON, downloadSQLite } from '@/engine/export-import';
import type {
  Node,
  Edge,
  Construction,
  NodeType,
  EdgeType,
  TraversalOptions,
  GraphSnapshot,
} from '@/engine/types';

interface GraphState {
  engine: GraphEngine;
  chunks: ChunkStore;
  persistence: GraphPersistence;
  isPersisted: boolean;
  isLoading: boolean;

  // Actions
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  addConstruction: (construction: Construction) => void;
  removeConstruction: (id: string) => void;

  // Queries
  getNode: (id: string) => Node | undefined;
  getNodesByType: (type: NodeType) => Node[];
  getEdgesFrom: (nodeId: string, options?: { type?: EdgeType }) => Edge[];
  getEdgesTo: (nodeId: string, options?: { type?: EdgeType }) => Edge[];
  getConstructionsForNode: (nodeId: string) => Construction[];
  traverseBFS: (startNodeId: string, options?: TraversalOptions) => Node[];
  getPrerequisiteClosure: (nodeId: string) => Node[];
  findNodesByLabel: (query: string) => Node[];

  // Persistence
  saveToSQLite: () => Promise<void>;
  loadFromSQLite: () => Promise<void>;
  exportToJSON: () => void;
  exportToSQLite: () => Promise<void>;
  importFromJSON: (data: GraphSnapshot & { chunks: import('@/engine/types').Chunk[] }) => void;

  // Stats
  stats: { nodes: number; edges: number; constructions: number };
}

export const useGraphStore = create<GraphState>((set, get) => {
  const engine = new GraphEngine();
  const chunks = new ChunkStore();
  const persistence = new GraphPersistence();

  const refresh = () =>
    set({
      engine,
      chunks,
      stats: engine.stats,
    });

  return {
    engine,
    chunks,
    persistence,
    isPersisted: false,
    isLoading: false,

    addNode: (node) => {
      engine.addNode(node);
      refresh();
    },

    removeNode: (id) => {
      engine.removeNode(id);
      refresh();
    },

    addEdge: (edge) => {
      engine.addEdge(edge);
      refresh();
    },

    removeEdge: (id) => {
      engine.removeEdge(id);
      refresh();
    },

    addConstruction: (construction) => {
      engine.addConstruction(construction);
      refresh();
    },

    removeConstruction: (id) => {
      engine.removeConstruction(id);
      refresh();
    },

    getNode: (id) => engine.getNode(id),
    getNodesByType: (type) => engine.getNodesByType(type),
    getEdgesFrom: (nodeId, options) => engine.getEdgesFrom(nodeId, options),
    getEdgesTo: (nodeId, options) => engine.getEdgesTo(nodeId, options),
    getConstructionsForNode: (nodeId) => engine.getConstructionsForNode(nodeId),
    traverseBFS: (startNodeId, options) => engine.traverseBFS(startNodeId, options),
    getPrerequisiteClosure: (nodeId) => engine.getPrerequisiteClosure(nodeId),
    findNodesByLabel: (query) => engine.findNodesByLabel(query),

    saveToSQLite: async () => {
      set({ isLoading: true });
      try {
        await persistence.save(engine, chunks);
        set({ isPersisted: true, isLoading: false });
      } catch {
        set({ isLoading: false });
      }
    },

    loadFromSQLite: async () => {
      set({ isLoading: true });
      try {
        await persistence.load(engine, chunks);
        set({ isPersisted: true, isLoading: false });
        refresh();
      } catch {
        set({ isLoading: false });
      }
    },

    exportToJSON: () => {
      const snapshot = engine.toSnapshot();
      const data = exportToJSON(snapshot, chunks.toArray());
      downloadJSON(data, `leet-somali-graph-${new Date().toISOString().split('T')[0]}.json`);
    },

    exportToSQLite: async () => {
      await get().saveToSQLite();
      const data = persistence.exportDatabase();
      if (data) {
        downloadSQLite(data, `leet-somali-graph-${new Date().toISOString().split('T')[0]}.db`);
      }
    },

    importFromJSON: (data) => {
      engine.clear();
      chunks.clear();
      for (const node of data.nodes) {
        try { engine.addNode(node); } catch { /* ignore */ }
      }
      for (const edge of data.edges) {
        try { engine.addEdge(edge); } catch { /* ignore */ }
      }
      for (const c of data.constructions) {
        try { engine.addConstruction(c); } catch { /* ignore */ }
      }
      chunks.fromArray(data.chunks);
      set({ isPersisted: false });
      refresh();
    },

    stats: engine.stats,
  };
});
