/**
 * SQLite-based persistence for the knowledge graph.
 *
 * Lazy-loaded: SQLite WASM is only fetched when persistence is first used.
 */

import type { GraphEngine } from './graph-engine';
import type { ChunkStore } from './chunk-store';
import type { Node, Edge, Construction, Chunk } from './types';

let SQL: import('sql.js').SqlJsStatic | null = null;

async function getSQL() {
  if (SQL) return SQL;
  const sqlModule = await import('sql.js');
  SQL = await sqlModule.default({
    locateFile: (file) => `/${file}`,
  });
  return SQL;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  labels TEXT NOT NULL,
  attributes TEXT NOT NULL,
  definition_cids TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS edges (
  id TEXT PRIMARY KEY,
  from_id TEXT NOT NULL,
  to_id TEXT NOT NULL,
  type TEXT NOT NULL,
  qualifiers TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS constructions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  members TEXT NOT NULL,
  qualifiers TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chunks (
  cid TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  payload TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_edges_from ON edges(from_id);
CREATE INDEX IF NOT EXISTS idx_edges_to ON edges(to_id);
CREATE INDEX IF NOT EXISTS idx_edges_type ON edges(type);
`;

function serializeQualifiers(q: Edge['qualifiers'] | Construction['qualifiers']): string {
  return JSON.stringify(q);
}

function deserializeQualifiers(json: string): Edge['qualifiers'] {
  return JSON.parse(json);
}

export class GraphPersistence {
  private db: import('sql.js').Database | null = null;
  private sql: import('sql.js').SqlJsStatic | null = null;
  private ready = false;

  async init(): Promise<void> {
    if (this.ready) return;
    this.sql = await getSQL();
    this.db = new this.sql.Database();
    this.db.run(SCHEMA);
    this.ready = true;
  }

  isReady(): boolean {
    return this.ready;
  }

  /**
   * Persist the entire graph to SQLite.
   */
  async save(engine: GraphEngine, chunkStore: ChunkStore): Promise<void> {
    await this.init();
    const db = this.db!;

    db.run('BEGIN TRANSACTION');
    try {
      // Clear existing data
      db.run('DELETE FROM nodes');
      db.run('DELETE FROM edges');
      db.run('DELETE FROM constructions');
      db.run('DELETE FROM chunks');

      // Save nodes
      const nodeStmt = db.prepare(
        'INSERT INTO nodes (id, type, labels, attributes, definition_cids) VALUES (?, ?, ?, ?, ?)'
      );
      for (const node of engine.getAllNodes()) {
        nodeStmt.run([
          node.id,
          node.type,
          JSON.stringify(node.labels),
          JSON.stringify(node.attributes),
          JSON.stringify(node.definitionCids),
        ]);
      }
      nodeStmt.free();

      // Save edges
      const edgeStmt = db.prepare(
        'INSERT INTO edges (id, from_id, to_id, type, qualifiers) VALUES (?, ?, ?, ?, ?)'
      );
      const snapshot = engine.toSnapshot();
      for (const edge of snapshot.edges) {
        edgeStmt.run([
          edge.id,
          edge.from,
          edge.to,
          edge.type,
          serializeQualifiers(edge.qualifiers),
        ]);
      }
      edgeStmt.free();

      // Save constructions
      const consStmt = db.prepare(
        'INSERT INTO constructions (id, name, members, qualifiers) VALUES (?, ?, ?, ?)'
      );
      for (const c of snapshot.constructions) {
        consStmt.run([c.id, c.name, JSON.stringify(c.members), serializeQualifiers(c.qualifiers)]);
      }
      consStmt.free();

      // Save chunks
      const chunkStmt = db.prepare(
        'INSERT INTO chunks (cid, content_type, payload) VALUES (?, ?, ?)'
      );
      for (const chunk of chunkStore.values()) {
        chunkStmt.run([chunk.cid, chunk.contentType, chunk.payload]);
      }
      chunkStmt.free();

      db.run('COMMIT');
    } catch (err) {
      db.run('ROLLBACK');
      throw err;
    }
  }

  /**
   * Load the graph from SQLite into the engine.
   */
  async load(engine: GraphEngine, chunkStore: ChunkStore): Promise<void> {
    await this.init();
    const db = this.db!;

    engine.clear();
    chunkStore.clear();

    // Load nodes
    const nodeResult = db.exec('SELECT id, type, labels, attributes, definition_cids FROM nodes');
    if (nodeResult.length > 0 && nodeResult[0].values) {
      for (const row of nodeResult[0].values) {
        const node: Node = {
          id: row[0] as string,
          type: row[1] as Node['type'],
          labels: JSON.parse(row[2] as string),
          attributes: JSON.parse(row[3] as string),
          definitionCids: JSON.parse(row[4] as string),
        };
        engine.addNode(node);
      }
    }

    // Load edges
    const edgeResult = db.exec('SELECT id, from_id, to_id, type, qualifiers FROM edges');
    if (edgeResult.length > 0 && edgeResult[0].values) {
      for (const row of edgeResult[0].values) {
        const edge: Edge = {
          id: row[0] as string,
          from: row[1] as string,
          to: row[2] as string,
          type: row[3] as Edge['type'],
          qualifiers: deserializeQualifiers(row[4] as string),
        };
        try {
          engine.addEdge(edge);
        } catch {
          // Node might be missing due to partial data
        }
      }
    }

    // Load constructions
    const consResult = db.exec('SELECT id, name, members, qualifiers FROM constructions');
    if (consResult.length > 0 && consResult[0].values) {
      for (const row of consResult[0].values) {
        const c: Construction = {
          id: row[0] as string,
          type: 'CONSTRUCTION',
          name: row[1] as string,
          members: JSON.parse(row[2] as string),
          qualifiers: deserializeQualifiers(row[3] as string),
        };
        try {
          engine.addConstruction(c);
        } catch {
          // Members might be missing
        }
      }
    }

    // Load chunks
    const chunkResult = db.exec('SELECT cid, content_type, payload FROM chunks');
    if (chunkResult.length > 0 && chunkResult[0].values) {
      for (const row of chunkResult[0].values) {
        const chunk: Chunk = {
          cid: row[0] as string,
          contentType: row[1] as Chunk['contentType'],
          payload: row[2] as string,
        };
        chunkStore.fromArray([chunk]);
      }
    }
  }

  /**
   * Export the SQLite database as a Uint8Array (for download).
   */
  exportDatabase(): Uint8Array | null {
    if (!this.db) return null;
    return this.db.export();
  }

  /**
   * Import a SQLite database from a Uint8Array.
   */
  async importDatabase(data: Uint8Array): Promise<void> {
    this.sql = await getSQL();
    this.db = new this.sql.Database(data);
    this.ready = true;
  }

  /**
   * Get stats about the persisted data.
   */
  stats(): { nodes: number; edges: number; constructions: number; chunks: number } | null {
    if (!this.db) return null;
    const nodeCount = this.db.exec('SELECT COUNT(*) FROM nodes')[0]?.values[0][0] as number;
    const edgeCount = this.db.exec('SELECT COUNT(*) FROM edges')[0]?.values[0][0] as number;
    const consCount = this.db.exec('SELECT COUNT(*) FROM constructions')[0]?.values[0][0] as number;
    const chunkCount = this.db.exec('SELECT COUNT(*) FROM chunks')[0]?.values[0][0] as number;
    return { nodes: nodeCount, edges: edgeCount, constructions: consCount, chunks: chunkCount };
  }
}
