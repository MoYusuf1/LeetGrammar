/**
 * Content-addressed chunk storage.
 *
 * Chunks are deduplicated by SHA-256 hash (CID).
 * Two identical definitions from different textbooks share one CID.
 */

import { sha256 } from 'hash-wasm';
import type { Chunk, ContentType } from './types';

export class ChunkStore {
  private store = new Map<string, Chunk>();

  /**
   * Compute CID for a payload.
   */
  static async computeCid(payload: string, contentType: ContentType): Promise<string> {
    const data = JSON.stringify({ contentType, payload, v: 1 });
    return sha256(data);
  }

  /**
   * Add a chunk. Returns the CID (existing or new).
   */
  async add(contentType: ContentType, payload: string): Promise<string> {
    const cid = await ChunkStore.computeCid(payload, contentType);
    if (!this.store.has(cid)) {
      this.store.set(cid, { cid, contentType, payload });
    }
    return cid;
  }

  /**
   * Retrieve a chunk by CID.
   */
  get(cid: string): Chunk | undefined {
    return this.store.get(cid);
  }

  /**
   * Check if a CID exists.
   */
  has(cid: string): boolean {
    return this.store.has(cid);
  }

  /**
   * Get all CIDs.
   */
  keys(): IterableIterator<string> {
    return this.store.keys();
  }

  /**
   * Get all chunks.
   */
  values(): IterableIterator<Chunk> {
    return this.store.values();
  }

  /**
   * Number of stored chunks.
   */
  get size(): number {
    return this.store.size;
  }

  /**
   * Clear all chunks.
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Export all chunks for serialization.
   */
  toArray(): Chunk[] {
    return Array.from(this.store.values());
  }

  /**
   * Import chunks (e.g., from JSON dump).
   */
  fromArray(chunks: Chunk[]): void {
    for (const chunk of chunks) {
      this.store.set(chunk.cid, chunk);
    }
  }
}
