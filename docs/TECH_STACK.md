# Technology Stack

> **Status:** `accepted` (Tier 2)  
> **Last Updated:** 2026-05-10  
> **Version:** 1.0

## Philosophy

Add technology reluctantly. Each dependency must earn its place in bundle size and maintenance. We write custom code only where off-the-shelf tools fail our specific needs.

---

## Current Stack (Preserved)

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | React | 19.2 | UI |
| Language | TypeScript | 5.9 | Type safety |
| Build Tool | Vite | 7.2 | Bundling |
| Router | React Router | 7.6 | SPA navigation |
| Styling | Tailwind CSS | 3.4 | CSS |
| Components | shadcn/ui + Radix | latest | UI primitives |
| Animation | Framer Motion | 12.38 | Transitions |
| Validation | Zod | 4.3 | Schema validation |
| Icons | Lucide React | 0.562 | Icons |

---

## Additions for Tier 2

### Phase 0: Foundation (Now)

| Tech | Purpose | Cost | Notes |
|------|---------|------|-------|
| **Zustand** | Global graph + UI state | ~1KB | No provider hell; devtools available |
| **Vitest** | Unit testing | Dev-only | Mandatory for graph engine |
| **Prettier** | Code formatting | Dev-only | Long overdue |
| **nanoid** | ID generation | ~100B | Collision-free node/edge IDs |

### Phase 1: Graph Engine (Weeks 2-6)

| Tech | Purpose | Cost | Notes |
|------|---------|------|-------|
| **Custom engine** (`src/engine/`) | Property graph + construction hypergraph | Our code | ~500-1000 lines of TypeScript |
| **hash-wasm** | SHA-256 for chunk CIDs | ~5KB | Sync hashing without `crypto.subtle` async |
| **Comlink** | Web Worker RPC | ~2KB | Offload graph queries from main thread |

**Why custom engine?**
- Browser graph DBs (Graphology, Cytoscape.js) handle binary graphs well but lack hyperedge support
- Our hybrid model is too specific for off-the-shelf tools
- 1000 lines of TypeScript is less complexity than fighting an ORM

### Phase 2: Multi-Textbook + Persistence (Weeks 6-12)

| Tech | Purpose | Cost | Notes |
|------|---------|------|-------|
| **SQLite WASM** (`sql.js`) | Client-side persistence | ~1MB lazy | SQL for graph queries; recursive CTEs for traversals |
| **absurd-sql** | IndexedDB-backed SQLite | Same | Better persistence across sessions |

**Why SQLite over IndexedDB?**
- SQL is expressive for graph traversals (`WITH RECURSIVE`)
- Can store embeddings as `FLOAT[]` and do vector math
- Migration path to PostgreSQL if we ever add a backend

### Phase 3: Search (Weeks 12-18)

| Tech | Purpose | Cost | Notes |
|------|---------|------|-------|
| **transformers.js** | Local embeddings | ~25MB lazy | `all-MiniLM-L6-v2` quantized; runs entirely client-side |
| **hnswlib** or custom HNSW | Vector index | ~200KB | ANN search over concept embeddings |

**Why not call OpenAI?**
- Offline requirement
- Privacy (user search queries stay local)
- Cost (zero ongoing API fees)

### Phase 4: Polish (Future)

| Tech | Purpose | When |
|------|---------|------|
| **Capacitor** | Mobile app wrapper | After web is solid |
| **Playwright** | E2E tests | Add now if possible |

---

## Rejected for Tier 2

| Tech | Why Rejected |
|------|-------------|
| **Merkle-CRDT libraries** | No sync requirement yet; add when multi-user editing arrives |
| **Sheaf/topology libraries** | Mathematical overhead exceeds practical value at this scale |
| **Neo4j (server)** | Violates offline-first; adds hosting cost |
| **RxDB / PouchDB** | Document model fights our graph structure |
| **GraphQL** | No server to query; our traversals are internal |
| **Redux Toolkit** | Zustand is sufficient |
| **Next.js** | No SSR needed; adds complexity |

---

## Bundle Budget (Tier 2)

| Phase | Initial Bundle | Lazy Chunks | 3G Load Target |
|-------|---------------|-------------|----------------|
| Phase 0 | 400KB | — | <2s |
| Phase 1 | 500KB | — | <2s |
| Phase 2 | 600KB | SQLite: 1MB | <3s |
| Phase 3 | 700KB | Embeddings: 25MB | <3s + on-demand |

---

## Related

- [ADR-005: Pragmatic Hypergraph](./adr/005-pragmatic-hypergraph.md)
- [ROADMAP.md](./ROADMAP.md)
