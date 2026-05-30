/**
 * GraphEngine — Tier 2 Pragmatic Hypergraph
 *
 * Property graph for binary relations.
 * Construction hypergraph for n-ary grammatical patterns.
 */

import type {
  Node,
  Edge,
  Construction,
  NodeType,
  EdgeType,
  ConstructionRole,
  TraversalOptions,
  GraphSnapshot,
} from './types';

export class GraphEngine {
  private nodes = new Map<string, Node>();
  private edges = new Map<string, Edge>();
  private constructions = new Map<string, Construction>();

  // Adjacency indexes for fast traversal
  private outEdges = new Map<string, Set<string>>();
  private inEdges = new Map<string, Set<string>>();

  // ─── Nodes ──────────────────────────────────────────────────────────────────

  addNode(node: Node): void {
    if (this.nodes.has(node.id)) {
      throw new Error(`Node with id "${node.id}" already exists`);
    }
    // Defensive: normalize snake_case fields and ensure arrays
    const rawLabels = (node as any).labels;
    const rawLabel = (node as any).label;
    const normalized: Node = {
      id: node.id,
      type: node.type,
      labels: rawLabels ?? (rawLabel ? { default: rawLabel } : { default: node.id }),
      attributes: (node as any).attributes ?? {},
      definitionCids: (node as any).definitionCids ?? (node as any).definition_cids ?? [],
    };
    this.nodes.set(normalized.id, normalized);
    this.outEdges.set(normalized.id, new Set());
    this.inEdges.set(normalized.id, new Set());
  }

  getNode(id: string): Node | undefined {
    return this.nodes.get(id);
  }

  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  removeNode(id: string): void {
    const node = this.nodes.get(id);
    if (!node) return;

    // Remove connected edges
    const out = this.outEdges.get(id) ?? new Set();
    const inn = this.inEdges.get(id) ?? new Set();
    for (const edgeId of out) this.removeEdge(edgeId);
    for (const edgeId of inn) this.removeEdge(edgeId);

    // Remove constructions where this node is a member
    for (const [cid, c] of this.constructions) {
      if (c.members.some((m) => m.nodeId === id)) {
        this.constructions.delete(cid);
      }
    }

    this.nodes.delete(id);
    this.outEdges.delete(id);
    this.inEdges.delete(id);
  }

  getNodesByType(type: NodeType): Node[] {
    return Array.from(this.nodes.values()).filter((n) => n.type === type);
  }

  getAllNodes(): Node[] {
    return Array.from(this.nodes.values());
  }

  // ─── Edges ──────────────────────────────────────────────────────────────────

  addEdge(edge: Edge): void {
    // Defensive: normalize snake_case fields
    const from = (edge as any).from ?? (edge as any).from_id;
    const to = (edge as any).to ?? (edge as any).to_id;
    if (!this.nodes.has(from)) {
      throw new Error(`Source node "${from}" does not exist`);
    }
    if (!this.nodes.has(to)) {
      throw new Error(`Target node "${to}" does not exist`);
    }
    if (this.edges.has(edge.id)) {
      throw new Error(`Edge with id "${edge.id}" already exists`);
    }

    const normalized: Edge = {
      id: edge.id,
      from,
      to,
      type: edge.type,
      qualifiers: (edge as any).qualifiers ?? {},
    };

    this.edges.set(normalized.id, normalized);
    this.outEdges.get(normalized.from)!.add(normalized.id);
    this.inEdges.get(normalized.to)!.add(normalized.id);
  }

  getEdge(id: string): Edge | undefined {
    return this.edges.get(id);
  }

  removeEdge(id: string): void {
    const edge = this.edges.get(id);
    if (!edge) return;
    this.edges.delete(id);
    this.outEdges.get(edge.from)?.delete(id);
    this.inEdges.get(edge.to)?.delete(id);
  }

  getEdgesFrom(nodeId: string, options?: { type?: EdgeType }): Edge[] {
    const edgeIds = this.outEdges.get(nodeId) ?? new Set();
    let result = Array.from(edgeIds).map((id) => this.edges.get(id)!);
    if (options?.type) {
      result = result.filter((e) => e.type === options.type);
    }
    return result;
  }

  getEdgesTo(nodeId: string, options?: { type?: EdgeType }): Edge[] {
    const edgeIds = this.inEdges.get(nodeId) ?? new Set();
    let result = Array.from(edgeIds).map((id) => this.edges.get(id)!);
    if (options?.type) {
      result = result.filter((e) => e.type === options.type);
    }
    return result;
  }

  getEdgesBetween(from: string, to: string): Edge[] {
    const out = this.outEdges.get(from) ?? new Set();
    return Array.from(out)
      .map((id) => this.edges.get(id)!)
      .filter((e) => e.to === to);
  }

  // ─── Constructions ──────────────────────────────────────────────────────────

  addConstruction(construction: Construction): void {
    // Validate all member nodes exist
    for (const member of construction.members) {
      if (!this.nodes.has(member.nodeId)) {
        throw new Error(
          `Construction member node "${member.nodeId}" does not exist`
        );
      }
    }
    if (construction.members.length < 2) {
      throw new Error('Construction must have at least 2 members');
    }
    this.constructions.set(construction.id, construction);
  }

  getConstruction(id: string): Construction | undefined {
    return this.constructions.get(id);
  }

  removeConstruction(id: string): void {
    this.constructions.delete(id);
  }

  getConstructionsForNode(nodeId: string): Construction[] {
    return Array.from(this.constructions.values()).filter((c) =>
      c.members.some((m) => m.nodeId === nodeId)
    );
  }

  getConstructionsByRole(role: ConstructionRole): Construction[] {
    return Array.from(this.constructions.values()).filter((c) =>
      c.members.some((m) => m.role === role)
    );
  }

  getAllConstructions(): Construction[] {
    return Array.from(this.constructions.values());
  }

  // ─── Traversal ──────────────────────────────────────────────────────────────

  /**
   * Breadth-first traversal from a starting node.
   * Returns nodes reachable within maxDepth, filtered by edge qualifiers.
   */
  traverseBFS(startNodeId: string, options: TraversalOptions = {}): Node[] {
    const { edgeTypes, maxDepth = Infinity, dialects, minConfidence = 0 } = options;

    const visited = new Set<string>();
    const result: Node[] = [];
    const queue: Array<{ nodeId: string; depth: number }> = [
      { nodeId: startNodeId, depth: 0 },
    ];

    while (queue.length > 0) {
      const { nodeId, depth } = queue.shift()!;
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);

      const node = this.nodes.get(nodeId);
      if (!node) continue;
      if (nodeId !== startNodeId) {
        result.push(node);
      }

      if (depth >= maxDepth) continue;

      const edgeIds = this.outEdges.get(nodeId) ?? new Set();
      for (const edgeId of edgeIds) {
        const edge = this.edges.get(edgeId);
        if (!edge) continue;
        if (edgeTypes && !edgeTypes.includes(edge.type)) continue;
        if (minConfidence > 0 && edge.qualifiers.confidence < minConfidence) continue;
        if (dialects && dialects.length > 0) {
          const hasDialect = edge.qualifiers.dialects.some((d) => dialects.includes(d));
          if (!hasDialect) continue;
        }
        queue.push({ nodeId: edge.to, depth: depth + 1 });
      }
    }

    return result;
  }

  /**
   * Get prerequisite closure: all nodes reachable via REQUIRES edges.
   */
  getPrerequisiteClosure(nodeId: string): Node[] {
    return this.traverseBFS(nodeId, { edgeTypes: ['REQUIRES'] });
  }

  /**
   * Detect cycles in REQUIRES edges.
   * Returns array of cycle paths, or empty array if DAG is valid.
   */
  detectCycles(edgeType: EdgeType = 'REQUIRES'): string[][] {
    const cycles: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    const path: string[] = [];

    const dfs = (nodeId: string): void => {
      visited.add(nodeId);
      recursionStack.add(nodeId);
      path.push(nodeId);

      const edgeIds = this.outEdges.get(nodeId) ?? new Set();
      for (const edgeId of edgeIds) {
        const edge = this.edges.get(edgeId);
        if (!edge || edge.type !== edgeType) continue;

        if (recursionStack.has(edge.to)) {
          // Found cycle
          const cycleStart = path.indexOf(edge.to);
          cycles.push([...path.slice(cycleStart), edge.to]);
        } else if (!visited.has(edge.to)) {
          dfs(edge.to);
        }
      }

      path.pop();
      recursionStack.delete(nodeId);
    };

    for (const nodeId of this.nodes.keys()) {
      if (!visited.has(nodeId)) {
        dfs(nodeId);
      }
    }

    return cycles;
  }

  // ─── Search ─────────────────────────────────────────────────────────────────

  findNodesByLabel(query: string): Node[] {
    const lower = query.toLowerCase();
    return Array.from(this.nodes.values()).filter((n) =>
      Object.values(n.labels).some((label) =>
        label?.toLowerCase().includes(lower)
      )
    );
  }

  // ─── Serialization ──────────────────────────────────────────────────────────

  toSnapshot(): GraphSnapshot {
    return {
      nodes: this.getAllNodes(),
      edges: Array.from(this.edges.values()),
      constructions: this.getAllConstructions(),
      chunks: [], // chunks are stored separately in ChunkStore
    };
  }

  loadSnapshot(snapshot: Omit<GraphSnapshot, 'chunks'>): void {
    this.clear();
    for (const node of snapshot.nodes) {
      this.addNode(node);
    }
    for (const edge of snapshot.edges) {
      this.addEdge(edge);
    }
    for (const c of snapshot.constructions) {
      this.addConstruction(c);
    }
  }

  clear(): void {
    this.nodes.clear();
    this.edges.clear();
    this.constructions.clear();
    this.outEdges.clear();
    this.inEdges.clear();
  }

  // ─── Stats ──────────────────────────────────────────────────────────────────

  get stats() {
    return {
      nodes: this.nodes.size,
      edges: this.edges.size,
      constructions: this.constructions.size,
    };
  }
}
