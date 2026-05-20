/**
 * Curriculum engine — prerequisite path generation and validation.
 */

import type { GraphEngine } from './graph-engine';
import type { Node, EdgeType } from './types';

export interface LearningPath {
  target: Node;
  prerequisites: Node[];
  path: Node[]; // ordered from first to learn → target
  estimatedMinutes: number;
}

export interface CurriculumValidation {
  valid: boolean;
  cycles: string[][];
  orphanedNodes: Node[];
  disconnectedComponents: number;
}

/**
 * Generate a learning path: ordered list of concepts to learn
 * before reaching the target, based on REQUIRES edges.
 */
export function generateLearningPath(
  engine: GraphEngine,
  targetNodeId: string,
  knownNodeIds: string[] = []
): LearningPath | null {
  const target = engine.getNode(targetNodeId);
  if (!target) return null;

  // Get all prerequisites recursively
  const allPrereqs = engine.getPrerequisiteClosure(targetNodeId);

  // Filter out already-known concepts
  const unknownPrereqs = allPrereqs.filter((n) => !knownNodeIds.includes(n.id));

  // Topological sort: order prerequisites so each concept comes after its own prerequisites
  const ordered = topologicalSort(engine, [target, ...unknownPrereqs]);

  // Estimate time: 5 min per concept + 3 min per prerequisite edge
  const edgeCount = countPrerequisiteEdges(engine, ordered);
  const estimatedMinutes = ordered.length * 5 + edgeCount * 3;

  return {
    target,
    prerequisites: unknownPrereqs,
    path: ordered,
    estimatedMinutes,
  };
}

/**
 * Topological sort of nodes based on REQUIRES edges.
 * Uses Kahn's algorithm.
 */
function topologicalSort(engine: GraphEngine, nodes: Node[]): Node[] {
  const nodeSet = new Set(nodes.map((n) => n.id));
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  // Initialize
  for (const node of nodes) {
    inDegree.set(node.id, 0);
    adj.set(node.id, []);
  }

  // Build adjacency from REQUIRES edges
  for (const node of nodes) {
    const edges = engine.getEdgesFrom(node.id, { type: 'REQUIRES' as EdgeType });
    for (const edge of edges) {
      if (nodeSet.has(edge.to)) {
        adj.get(node.id)!.push(edge.to);
        inDegree.set(edge.to, (inDegree.get(edge.to) ?? 0) + 1);
      }
    }
  }

  // Kahn's algorithm
  const queue: string[] = [];
  for (const [id, degree] of inDegree) {
    if (degree === 0) queue.push(id);
  }

  const result: Node[] = [];
  while (queue.length > 0) {
    const id = queue.shift()!;
    const node = engine.getNode(id);
    if (node) result.push(node);

    for (const neighbor of adj.get(id) ?? []) {
      const newDegree = (inDegree.get(neighbor) ?? 0) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}

function countPrerequisiteEdges(engine: GraphEngine, nodes: Node[]): number {
  const nodeSet = new Set(nodes.map((n) => n.id));
  let count = 0;
  for (const node of nodes) {
    const edges = engine.getEdgesFrom(node.id, { type: 'REQUIRES' as EdgeType });
    count += edges.filter((e) => nodeSet.has(e.to)).length;
  }
  return count;
}

/**
 * Validate the curriculum graph.
 */
export function validateCurriculum(engine: GraphEngine): CurriculumValidation {
  const cycles = engine.detectCycles('REQUIRES' as EdgeType);

  // Find orphaned nodes: nodes with no incoming or outgoing edges
  const allNodes = engine.getAllNodes();
  const lessonAndConceptNodes = allNodes.filter(
    (n) => n.type === 'CONCEPT' || n.type === 'LESSON'
  );

  const orphanedNodes = lessonAndConceptNodes.filter((n) => {
    const out = engine.getEdgesFrom(n.id);
    const inn = engine.getEdgesTo(n.id);
    return out.length === 0 && inn.length === 0;
  });

  // Count disconnected components (rough estimate via BFS)
  const visited = new Set<string>();
  let components = 0;
  for (const node of allNodes) {
    if (visited.has(node.id)) continue;
    components++;
    const stack = [node.id];
    while (stack.length > 0) {
      const id = stack.pop()!;
      if (visited.has(id)) continue;
      visited.add(id);
      const edges = [...engine.getEdgesFrom(id), ...engine.getEdgesTo(id)];
      for (const edge of edges) {
        stack.push(edge.from === id ? edge.to : edge.from);
      }
    }
  }

  return {
    valid: cycles.length === 0 && orphanedNodes.length === 0,
    cycles,
    orphanedNodes,
    disconnectedComponents: components,
  };
}

/**
 * Find the shortest learning path between two concepts.
 * Uses BFS on the reversed prerequisite graph.
 */
export function shortestPath(
  engine: GraphEngine,
  fromNodeId: string,
  toNodeId: string
): Node[] | null {
  // BFS from target backwards through REQUIRES edges
  const queue: Array<{ id: string; path: string[] }> = [
    { id: toNodeId, path: [toNodeId] },
  ];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const { id, path } = queue.shift()!;
    if (id === fromNodeId) {
      return path.reverse().map((nid) => engine.getNode(nid)!).filter(Boolean);
    }
    if (visited.has(id)) continue;
    visited.add(id);

    // Walk backwards: who requires this node?
    const edges = engine.getEdgesTo(id, { type: 'REQUIRES' as EdgeType });
    for (const edge of edges) {
      if (!visited.has(edge.from)) {
        queue.push({ id: edge.from, path: [...path, edge.from] });
      }
    }
  }

  return null;
}
