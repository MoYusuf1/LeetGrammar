import { describe, it, expect, beforeEach } from 'vitest';
import { ChunkStore } from '@/engine/chunk-store';

describe('ChunkStore', () => {
  let store: ChunkStore;

  beforeEach(() => {
    store = new ChunkStore();
  });

  it('computes consistent CIDs', async () => {
    const cid1 = await ChunkStore.computeCid('hello', 'text/plain');
    const cid2 = await ChunkStore.computeCid('hello', 'text/plain');
    expect(cid1).toBe(cid2);
    expect(cid1).toHaveLength(64); // SHA-256 hex
  });

  it('computes different CIDs for different content', async () => {
    const cid1 = await ChunkStore.computeCid('hello', 'text/plain');
    const cid2 = await ChunkStore.computeCid('world', 'text/plain');
    expect(cid1).not.toBe(cid2);
  });

  it('computes different CIDs for different content types', async () => {
    const cid1 = await ChunkStore.computeCid('hello', 'text/plain');
    const cid2 = await ChunkStore.computeCid('hello', 'text/markdown');
    expect(cid1).not.toBe(cid2);
  });

  it('adds and retrieves a chunk', async () => {
    const cid = await store.add('text/plain', 'Somali focus marker');
    const chunk = store.get(cid);
    expect(chunk).toBeDefined();
    expect(chunk!.payload).toBe('Somali focus marker');
    expect(chunk!.contentType).toBe('text/plain');
  });

  it('deduplicates identical chunks', async () => {
    const cid1 = await store.add('text/plain', 'duplicate content');
    const cid2 = await store.add('text/plain', 'duplicate content');
    expect(cid1).toBe(cid2);
    expect(store.size).toBe(1);
  });

  it('stores different chunks separately', async () => {
    await store.add('text/plain', 'chunk A');
    await store.add('text/plain', 'chunk B');
    expect(store.size).toBe(2);
  });

  it('checks existence with has()', async () => {
    const cid = await store.add('text/plain', 'test');
    expect(store.has(cid)).toBe(true);
    expect(store.has('nonexistent')).toBe(false);
  });

  it('clears all chunks', async () => {
    await store.add('text/plain', 'A');
    await store.add('text/plain', 'B');
    store.clear();
    expect(store.size).toBe(0);
  });

  it('exports and imports chunks', async () => {
    await store.add('text/plain', 'Hello');
    await store.add('text/markdown', '# Title');

    const exported = store.toArray();
    expect(exported).toHaveLength(2);

    const newStore = new ChunkStore();
    newStore.fromArray(exported);
    expect(newStore.size).toBe(2);
    expect(newStore.get(exported[0].cid)?.payload).toBe('Hello');
  });
});
