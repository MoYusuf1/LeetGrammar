/**
 * JSON export/import for the knowledge graph.
 *
 * Uses a portable JSON format that can be shared, versioned, and re-imported.
 */

import type { GraphSnapshot, Chunk } from './types';

export interface PortableGraph {
  version: number;
  exportedAt: string;
  nodes: GraphSnapshot['nodes'];
  edges: GraphSnapshot['edges'];
  constructions: GraphSnapshot['constructions'];
  chunks: Chunk[];
}

/**
 * Export a graph snapshot + chunks to a portable JSON object.
 */
export function exportToJSON(snapshot: GraphSnapshot, chunks: Chunk[]): PortableGraph {
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    nodes: snapshot.nodes,
    edges: snapshot.edges,
    constructions: snapshot.constructions,
    chunks,
  };
}

/**
 * Import a portable JSON object.
 * Returns null if version is incompatible.
 */
export function importFromJSON(data: unknown): PortableGraph | null {
  if (typeof data !== 'object' || data === null) return null;
  const graph = data as Partial<PortableGraph>;

  if (graph.version !== 1) return null;
  if (!Array.isArray(graph.nodes)) return null;
  if (!Array.isArray(graph.edges)) return null;
  if (!Array.isArray(graph.constructions)) return null;
  if (!Array.isArray(graph.chunks)) return null;

  return graph as PortableGraph;
}

/**
 * Download a JSON object as a file.
 */
export function downloadJSON(data: object, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Read a file and parse it as JSON.
 */
export function readJSONFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(JSON.parse(e.target?.result as string));
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

/**
 * Download SQLite database as a binary file.
 */
export function downloadSQLite(data: Uint8Array, filename: string): void {
  const blob = new Blob([data as unknown as BlobPart], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Read a file as Uint8Array.
 */
export function readBinaryFile(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(new Uint8Array(e.target?.result as ArrayBuffer));
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
