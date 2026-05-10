/**
 * Mini concept graph visualization.
 * Renders a node and its immediate neighbors as a simple tree/force layout.
 */

import { useMemo } from 'react';
import { useGraphStore } from '@/stores/graph-store';
import type { Node } from '@/engine/types';

interface ConceptGraphProps {
  rootId: string;
  maxDepth?: number;
  onNodeClick?: (nodeId: string) => void;
}

interface GraphNode {
  node: Node;
  x: number;
  y: number;
  level: number;
}

export default function ConceptGraph({
  rootId,
  maxDepth = 1,
  onNodeClick,
}: ConceptGraphProps) {
  const { engine } = useGraphStore();

  const { nodes, edges } = useMemo(() => {
    const root = engine.getNode(rootId);
    if (!root) return { nodes: [], edges: [] as Array<[string, string]> };

    const visited = new Set<string>();
    const resultNodes: GraphNode[] = [];
    const resultEdges: Array<[string, string]> = [];

    const queue: Array<{ id: string; depth: number; parentX: number; parentY: number; index: number; totalSiblings: number }> = [
      { id: rootId, depth: 0, parentX: 200, parentY: 40, index: 0, totalSiblings: 1 },
    ];

    while (queue.length > 0) {
      const { id, depth, parentX, parentY, index, totalSiblings } = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);

      const node = engine.getNode(id);
      if (!node) continue;

      // Simple radial layout
      const angle = totalSiblings > 1 ? (index / (totalSiblings - 1)) * Math.PI - Math.PI / 2 : -Math.PI / 2;
      const distance = depth === 0 ? 0 : 100 + depth * 40;
      const x = depth === 0 ? 200 : parentX + Math.cos(angle) * distance;
      const y = depth === 0 ? 40 : parentY + Math.sin(angle) * distance * 0.6 + 60;

      resultNodes.push({ node, x, y, level: depth });

      if (depth < maxDepth) {
        const outgoing = engine.getEdgesFrom(id);
        const targets = outgoing
          .filter((e) => e.type === 'IS_A' || e.type === 'REQUIRES' || e.type === 'EXEMPLIFIES' || e.type === 'CONTRADICTS')
          .map((e) => e.to)
          .filter((tid) => !visited.has(tid));

        targets.forEach((tid, i) => {
          resultEdges.push([id, tid]);
          queue.push({
            id: tid,
            depth: depth + 1,
            parentX: x,
            parentY: y,
            index: i,
            totalSiblings: targets.length,
          });
        });
      }
    }

    return { nodes: resultNodes, edges: resultEdges };
  }, [engine, rootId, maxDepth]);

  if (nodes.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#ffffff10] bg-[#0f0f0f]">
      <div className="px-3 py-2 border-b border-[#ffffff08]">
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Concept Map</p>
      </div>
      <svg viewBox="0 0 400 240" className="w-full h-auto">
        {/* Edges */}
        {edges.map(([from, to], i) => {
          const fromNode = nodes.find((n) => n.node.id === from);
          const toNode = nodes.find((n) => n.node.id === to);
          if (!fromNode || !toNode) return null;
          return (
            <line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#333333"
              strokeWidth={1}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map(({ node, x, y, level }) => {
          const isRoot = level === 0;
          const r = isRoot ? 18 : 12;
          const color = isRoot ? '#ffa116' : '#3b82f6';

          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onClick={() => onNodeClick?.(node.id)}
            >
              <circle
                cx={x}
                cy={y}
                r={r}
                fill={isRoot ? `${color}20` : '#1a1a1a'}
                stroke={color}
                strokeWidth={isRoot ? 2 : 1}
              />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill={isRoot ? color : '#8c8c8c'}
                fontSize={isRoot ? 10 : 8}
                fontWeight={isRoot ? 600 : 400}
              >
                {node.labels.default.length > 10
                  ? node.labels.default.slice(0, 10) + '...'
                  : node.labels.default}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
