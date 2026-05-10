import { describe, it, expect, beforeEach } from 'vitest';
import { GraphEngine } from '@/engine/graph-engine';
import type { Node, Edge, Construction } from '@/engine/types';

function makeNode(id: string, type: Node['type'], defaultLabel: string): Node {
  return {
    id,
    type,
    labels: { default: defaultLabel },
    attributes: {},
    definitionCids: [],
  };
}

function makeEdge(
  id: string,
  from: string,
  to: string,
  type: Edge['type'],
  overrides: Partial<Edge['qualifiers']> = {}
): Edge {
  return {
    id,
    from,
    to,
    type,
    qualifiers: {
      source: { textbookId: 'test' },
      confidence: 0.9,
      dialects: ['standard'],
      ...overrides,
    },
  };
}

function makeConstruction(
  id: string,
  name: string,
  members: Construction['members']
): Construction {
  return {
    id,
    type: 'CONSTRUCTION',
    name,
    members,
    qualifiers: {
      source: { textbookId: 'test' },
      confidence: 0.9,
      dialects: ['standard'],
    },
  };
}

describe('GraphEngine', () => {
  let engine: GraphEngine;

  beforeEach(() => {
    engine = new GraphEngine();
  });

  describe('Nodes', () => {
    it('adds and retrieves a node', () => {
      const node = makeNode('n1', 'CONCEPT', 'Focus Marker');
      engine.addNode(node);
      expect(engine.getNode('n1')).toEqual(node);
    });

    it('throws on duplicate node id', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      expect(() => engine.addNode(makeNode('n1', 'MORPHEME', 'B'))).toThrow();
    });

    it('filters nodes by type', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'Concept'));
      engine.addNode(makeNode('n2', 'MORPHEME', 'Morpheme'));
      engine.addNode(makeNode('n3', 'CONCEPT', 'Another'));
      expect(engine.getNodesByType('CONCEPT')).toHaveLength(2);
      expect(engine.getNodesByType('MORPHEME')).toHaveLength(1);
    });

    it('removes a node and its connected edges', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      engine.addNode(makeNode('n2', 'CONCEPT', 'B'));
      engine.addEdge(makeEdge('e1', 'n1', 'n2', 'REQUIRES'));
      engine.removeNode('n1');
      expect(engine.getNode('n1')).toBeUndefined();
      expect(engine.getEdge('e1')).toBeUndefined();
    });
  });

  describe('Edges', () => {
    beforeEach(() => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      engine.addNode(makeNode('n2', 'CONCEPT', 'B'));
    });

    it('adds an edge between existing nodes', () => {
      const edge = makeEdge('e1', 'n1', 'n2', 'REQUIRES');
      engine.addEdge(edge);
      expect(engine.getEdge('e1')).toEqual(edge);
    });

    it('throws if source node missing', () => {
      expect(() =>
        engine.addEdge(makeEdge('e1', 'missing', 'n2', 'REQUIRES'))
      ).toThrow('Source node');
    });

    it('throws if target node missing', () => {
      expect(() =>
        engine.addEdge(makeEdge('e1', 'n1', 'missing', 'REQUIRES'))
      ).toThrow('Target node');
    });

    it('filters outgoing edges by type', () => {
      engine.addNode(makeNode('n3', 'CONCEPT', 'C'));
      engine.addEdge(makeEdge('e1', 'n1', 'n2', 'REQUIRES'));
      engine.addEdge(makeEdge('e2', 'n1', 'n3', 'CONTRADICTS'));
      expect(engine.getEdgesFrom('n1', { type: 'REQUIRES' })).toHaveLength(1);
      expect(engine.getEdgesFrom('n1')).toHaveLength(2);
    });

    it('filters incoming edges by type', () => {
      engine.addNode(makeNode('n3', 'CONCEPT', 'C'));
      engine.addEdge(makeEdge('e1', 'n3', 'n2', 'REQUIRES'));
      engine.addEdge(makeEdge('e2', 'n1', 'n2', 'EXEMPLIFIES'));
      expect(engine.getEdgesTo('n2', { type: 'REQUIRES' })).toHaveLength(1);
    });
  });

  describe('Constructions', () => {
    beforeEach(() => {
      engine.addNode(makeNode('waa', 'MORPHEME', 'waa'));
      engine.addNode(makeNode('positive', 'CONCEPT', 'Positive'));
    });

    it('adds a construction with valid members', () => {
      const c = makeConstruction('c1', 'Positive Focus', [
        { nodeId: 'waa', role: 'marker' },
        { nodeId: 'positive', role: 'polarity' },
      ]);
      engine.addConstruction(c);
      expect(engine.getConstruction('c1')).toEqual(c);
    });

    it('throws if member node does not exist', () => {
      const c = makeConstruction('c1', 'Bad', [
        { nodeId: 'waa', role: 'marker' },
        { nodeId: 'missing', role: 'polarity' },
      ]);
      expect(() => engine.addConstruction(c)).toThrow('does not exist');
    });

    it('throws if fewer than 2 members', () => {
      const c = makeConstruction('c1', 'Bad', [
        { nodeId: 'waa', role: 'marker' },
      ]);
      expect(() => engine.addConstruction(c)).toThrow('at least 2 members');
    });

    it('finds constructions containing a node', () => {
      engine.addConstruction(
        makeConstruction('c1', 'PosFocus', [
          { nodeId: 'waa', role: 'marker' },
          { nodeId: 'positive', role: 'polarity' },
        ])
      );
      expect(engine.getConstructionsForNode('waa')).toHaveLength(1);
      expect(engine.getConstructionsForNode('positive')).toHaveLength(1);
    });

    it('removes constructions when a member node is deleted', () => {
      engine.addConstruction(
        makeConstruction('c1', 'PosFocus', [
          { nodeId: 'waa', role: 'marker' },
          { nodeId: 'positive', role: 'polarity' },
        ])
      );
      engine.removeNode('waa');
      expect(engine.getConstruction('c1')).toBeUndefined();
    });
  });

  describe('Traversal', () => {
    beforeEach(() => {
      // n1 -> n2 -> n3
      // n1 -> n4
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      engine.addNode(makeNode('n2', 'CONCEPT', 'B'));
      engine.addNode(makeNode('n3', 'CONCEPT', 'C'));
      engine.addNode(makeNode('n4', 'CONCEPT', 'D'));
      engine.addEdge(makeEdge('e1', 'n1', 'n2', 'REQUIRES'));
      engine.addEdge(makeEdge('e2', 'n2', 'n3', 'REQUIRES'));
      engine.addEdge(makeEdge('e3', 'n1', 'n4', 'REQUIRES'));
    });

    it('traverses BFS with depth limit', () => {
      const result = engine.traverseBFS('n1', { maxDepth: 1 });
      expect(result.map((n) => n.id)).toEqual(['n2', 'n4']);
    });

    it('traverses BFS with edge type filter', () => {
      engine.addEdge(makeEdge('e4', 'n1', 'n2', 'CONTRADICTS'));
      const result = engine.traverseBFS('n1', { edgeTypes: ['REQUIRES'] });
      expect(result.map((n) => n.id)).toContain('n3');
    });

    it('filters by dialect', () => {
      engine.addNode(makeNode('n5', 'CONCEPT', 'E'));
      engine.addEdge(
        makeEdge('e5', 'n1', 'n5', 'REQUIRES', { dialects: ['northern'] })
      );
      const standard = engine.traverseBFS('n1', { dialects: ['standard'] });
      expect(standard.map((n) => n.id)).not.toContain('n5');

      const northern = engine.traverseBFS('n1', { dialects: ['northern'] });
      expect(northern.map((n) => n.id)).toContain('n5');
    });

    it('filters by confidence', () => {
      engine.addNode(makeNode('n5', 'CONCEPT', 'E'));
      engine.addEdge(
        makeEdge('e5', 'n1', 'n5', 'REQUIRES', { confidence: 0.5 })
      );
      const highConf = engine.traverseBFS('n1', { minConfidence: 0.8 });
      expect(highConf.map((n) => n.id)).not.toContain('n5');
    });

    it('computes prerequisite closure', () => {
      const closure = engine.getPrerequisiteClosure('n3');
      // From n3, REQUIRES edges go OUT from n3, but n3 has no outgoing edges
      expect(closure).toHaveLength(0);
    });
  });

  describe('Cycle Detection', () => {
    it('detects no cycles in a DAG', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      engine.addNode(makeNode('n2', 'CONCEPT', 'B'));
      engine.addNode(makeNode('n3', 'CONCEPT', 'C'));
      engine.addEdge(makeEdge('e1', 'n1', 'n2', 'REQUIRES'));
      engine.addEdge(makeEdge('e2', 'n2', 'n3', 'REQUIRES'));
      expect(engine.detectCycles('REQUIRES')).toHaveLength(0);
    });

    it('detects a simple cycle', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      engine.addNode(makeNode('n2', 'CONCEPT', 'B'));
      engine.addEdge(makeEdge('e1', 'n1', 'n2', 'REQUIRES'));
      engine.addEdge(makeEdge('e2', 'n2', 'n1', 'REQUIRES'));
      const cycles = engine.detectCycles('REQUIRES');
      expect(cycles.length).toBeGreaterThan(0);
    });

    it('detects a three-node cycle', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      engine.addNode(makeNode('n2', 'CONCEPT', 'B'));
      engine.addNode(makeNode('n3', 'CONCEPT', 'C'));
      engine.addEdge(makeEdge('e1', 'n1', 'n2', 'REQUIRES'));
      engine.addEdge(makeEdge('e2', 'n2', 'n3', 'REQUIRES'));
      engine.addEdge(makeEdge('e3', 'n3', 'n1', 'REQUIRES'));
      const cycles = engine.detectCycles('REQUIRES');
      expect(cycles.length).toBeGreaterThan(0);
    });
  });

  describe('Search', () => {
    it('finds nodes by label', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'Focus Marker'));
      engine.addNode(makeNode('n2', 'MORPHEME', 'waa'));
      engine.addNode(makeNode('n3', 'CONCEPT', 'Something Else'));
      expect(engine.findNodesByLabel('focus').map((n) => n.id)).toEqual(['n1']);
      expect(engine.findNodesByLabel('waa').map((n) => n.id)).toEqual(['n2']);
    });
  });

  describe('Serialization', () => {
    it('round-trips through snapshot', () => {
      engine.addNode(makeNode('n1', 'CONCEPT', 'A'));
      engine.addNode(makeNode('n2', 'CONCEPT', 'B'));
      engine.addEdge(makeEdge('e1', 'n1', 'n2', 'REQUIRES'));
      engine.addConstruction(
        makeConstruction('c1', 'Test', [
          { nodeId: 'n1', role: 'marker' },
          { nodeId: 'n2', role: 'head' },
        ])
      );

      const snapshot = engine.toSnapshot();
      const newEngine = new GraphEngine();
      newEngine.loadSnapshot(snapshot);

      expect(newEngine.getNode('n1')).toBeDefined();
      expect(newEngine.getEdge('e1')).toBeDefined();
      expect(newEngine.getConstruction('c1')).toBeDefined();
      expect(newEngine.stats).toEqual(engine.stats);
    });
  });
});
