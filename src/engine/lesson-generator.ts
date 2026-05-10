/**
 * Lesson Generator — transforms graph concepts into interactive lessons.
 *
 * Each CONCEPT node becomes a lesson with:
 * - prerequisite chain (REQUIRES edges)
 * - examples (EXEMPLIFIES edges)
 * - constructions (where concept is a member)
 * - generated exercises from constructions
 */

import type { GraphEngine } from './graph-engine';
import type { ChunkStore } from './chunk-store';
import type { Node } from './types';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface GraphLesson {
  /** Stable numeric ID for progress tracking (hashed from concept ID) */
  id: number;
  conceptId: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  unitId: number;
  unitTitle: string;
  unitColor: string;
  prerequisites: number[]; // other lesson IDs
  tags: string[];

  /** Learning content derived from the graph */
  content: LessonContent;
}

export interface LessonContent {
  definitions: string[];
  examples: LessonExample[];
  constructions: LessonConstruction[];
  relatedConcepts: RelatedConcept[];
}

export interface LessonExample {
  nodeId: string;
  somali: string;
  translation: string;
  chunkPayload?: string;
}

export interface LessonConstruction {
  id: string;
  name: string;
  template: ConstructionMemberDisplay[];
}

export interface ConstructionMemberDisplay {
  nodeId: string;
  label: string;
  role: string;
  bound?: boolean;
  optional?: boolean;
}

export interface RelatedConcept {
  nodeId: string;
  label: string;
  type: string;
  relation: string;
}

/* ─── Unit Colors (same palette as hardcoded topics) ─── */

const UNIT_COLORS = [
  '#3b82f6', '#06b6d4', '#14b8a6', '#22c55e', '#84cc16',
  '#eab308', '#f97316', '#ef4444', '#a855f7', '#ec4899',
];

function getUnitColor(unitId: number): string {
  return UNIT_COLORS[unitId % UNIT_COLORS.length];
}

/* ─── Stable ID hashing ─── */

function hashConceptId(conceptId: string): number {
  let hash = 0;
  for (let i = 0; i < conceptId.length; i++) {
    const char = conceptId.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash) % 900000 + 100000; // 100000–999999, avoids collision with hardcoded 1–50
}

/* ─── Difficulty inference ─── */

function inferDifficulty(node: Node, prerequisiteDepth: number): Difficulty {
  // If node has many prerequisites or deep chain → harder
  if (prerequisiteDepth >= 4) return 'Advanced';
  if (prerequisiteDepth >= 2) return 'Intermediate';

  // Construction complexity
  const attrComplexity = Object.keys(node.attributes).length;
  if (attrComplexity > 3) return 'Intermediate';

  return 'Beginner';
}

/* ─── Lesson Generation ─── */

export function generateLesson(
  engine: GraphEngine,
  chunks: ChunkStore,
  conceptId: string
): GraphLesson | null {
  const node = engine.getNode(conceptId);
  if (!node || node.type !== 'CONCEPT') return null;

  const id = hashConceptId(conceptId);

  // Definitions
  const definitions = node.definitionCids
    .map((cid) => chunks.get(cid)?.payload)
    .filter((p): p is string => !!p);

  // Examples via EXEMPLIFIES edges TO this node
  const exampleEdges = engine.getEdgesTo(conceptId).filter((e) => e.type === 'EXEMPLIFIES');
  const examples: LessonExample[] = exampleEdges.map((edge) => {
    const exNode = engine.getNode(edge.from);
    const chunk = exNode?.definitionCids[0] ? chunks.get(exNode.definitionCids[0]) : undefined;
    return {
      nodeId: edge.from,
      somali: exNode?.labels.default ?? edge.from,
      translation: exNode?.attributes.translation as string ?? chunk?.payload ?? '',
      chunkPayload: chunk?.payload,
    };
  });

  // Constructions where this node is a member
  const allConstructions = engine.getConstructionsForNode(conceptId);
  const constructions: LessonConstruction[] = allConstructions.map((c) => ({
    id: c.id,
    name: c.name,
    template: c.members
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((m) => {
        const memberNode = engine.getNode(m.nodeId);
        return {
          nodeId: m.nodeId,
          label: memberNode?.labels.default ?? m.nodeId,
          role: m.role,
          bound: m.bound,
          optional: m.optional,
        };
      }),
  }));

  // Related concepts (all edges except EXEMPLIFIES)
  const related: RelatedConcept[] = [];
  const outgoing = engine.getEdgesFrom(conceptId);
  const incoming = engine.getEdgesTo(conceptId);

  for (const edge of outgoing) {
    if (edge.type === 'EXEMPLIFIES') continue;
    const other = engine.getNode(edge.to);
    if (!other) continue;
    related.push({
      nodeId: edge.to,
      label: other.labels.default,
      type: other.type,
      relation: edge.type,
    });
  }
  for (const edge of incoming) {
    if (edge.type === 'EXEMPLIFIES') continue;
    const other = engine.getNode(edge.from);
    if (!other) continue;
    related.push({
      nodeId: edge.from,
      label: other.labels.default,
      type: other.type,
      relation: `${edge.type} (incoming)`,
    });
  }

  // Prerequisite depth for difficulty
  const prereqNodes = engine.getPrerequisiteClosure(conceptId);
  const difficulty = inferDifficulty(node, prereqNodes.length);

  return {
    id,
    conceptId,
    title: node.labels.default,
    description: node.labels.english ?? `Learn about ${node.labels.default}`,
    difficulty,
    unitId: 0, // filled in by path builder
    unitTitle: '',
    unitColor: '',
    prerequisites: [], // filled in by path builder
    tags: [node.type.toLowerCase(), ...Object.keys(node.attributes)],
    content: {
      definitions,
      examples,
      constructions,
      relatedConcepts: related,
    },
  };
}

/* ─── Path Builder ─── */

export interface GraphUnit {
  unitId: number;
  title: string;
  description: string;
  color: string;
  lessonIds: number[];
  prerequisites: number[];
}

/**
 * Build a full learning path from the graph.
 *
 * Strategy:
 * 1. Find all CONCEPT nodes
 * 2. Compute prerequisite closure for each
 * 3. Topologically sort by prerequisite depth
 * 4. Group into units of ~5 concepts
 * 5. Assign prerequisites between units
 */
export function buildGraphPath(
  engine: GraphEngine,
  chunks: ChunkStore
): { lessons: GraphLesson[]; units: GraphUnit[] } {
  const allNodes = engine.getAllNodes();
  const conceptNodes = allNodes.filter((n) => n.type === 'CONCEPT');

  if (conceptNodes.length === 0) {
    return { lessons: [], units: [] };
  }

  // Compute depth (longest prerequisite chain)
  const depthMap = new Map<string, number>();
  function computeDepth(nodeId: string, visited = new Set<string>()): number {
    if (visited.has(nodeId)) return 0; // cycle guard
    if (depthMap.has(nodeId)) return depthMap.get(nodeId)!;

    visited.add(nodeId);
    const prereqEdges = engine.getEdgesTo(nodeId).filter((e) => e.type === 'REQUIRES');
    const prereqDepths = prereqEdges.map((e) => computeDepth(e.from, new Set(visited)));
    const depth = prereqDepths.length > 0 ? Math.max(...prereqDepths) + 1 : 0;
    depthMap.set(nodeId, depth);
    return depth;
  }

  const nodesWithDepth = conceptNodes.map((n) => ({
    node: n,
    depth: computeDepth(n.id),
  }));

  // Sort by depth, then alphabetically
  nodesWithDepth.sort((a, b) => {
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.node.labels.default.localeCompare(b.node.labels.default);
  });

  // Generate lessons
  const lessons: GraphLesson[] = [];
  const idToLesson = new Map<number, GraphLesson>();
  const conceptToLessonId = new Map<string, number>();

  for (const { node } of nodesWithDepth) {
    const lesson = generateLesson(engine, chunks, node.id);
    if (lesson) {
      lessons.push(lesson);
      idToLesson.set(lesson.id, lesson);
      conceptToLessonId.set(node.id, lesson.id);
    }
  }

  // Resolve prerequisites (map concept IDs → lesson IDs)
  for (const lesson of lessons) {
    const prereqEdges = engine.getEdgesTo(lesson.conceptId).filter((e) => e.type === 'REQUIRES');
    const prereqLessonIds = prereqEdges
      .map((e) => conceptToLessonId.get(e.from))
      .filter((id): id is number => id !== undefined && id !== lesson.id);
    lesson.prerequisites = prereqLessonIds;
  }

  // Group into units (~5 concepts per unit)
  const UNIT_SIZE = 5;
  const units: GraphUnit[] = [];

  for (let i = 0; i < lessons.length; i += UNIT_SIZE) {
    const unitLessons = lessons.slice(i, i + UNIT_SIZE);
    const unitId = i / UNIT_SIZE;
    const firstConcept = unitLessons[0];

    // Unit title from first lesson's category or type
    const title = firstConcept.tags[1]
      ? `${firstConcept.tags[1].charAt(0).toUpperCase() + firstConcept.tags[1].slice(1)} Concepts`
      : `Unit ${unitId + 1}`;

    for (const lesson of unitLessons) {
      lesson.unitId = unitId;
      lesson.unitTitle = title;
      lesson.unitColor = getUnitColor(unitId);
    }

    const lessonIds = unitLessons.map((l) => l.id);

    // Unit prerequisites = prerequisites of first lesson in unit
    const firstPrereqs = unitLessons[0].prerequisites.filter((p) => !lessonIds.includes(p));

    units.push({
      unitId,
      title,
      description: `Learn ${unitLessons.map((l) => l.title).join(', ')}`,
      color: getUnitColor(unitId),
      lessonIds,
      prerequisites: firstPrereqs,
    });
  }

  return { lessons, units };
}

/**
 * Get lesson status considering graph-based prerequisites.
 */
export function getGraphLessonStatus(
  lessonId: number,
  completedIds: number[],
  lessons: GraphLesson[]
): 'completed' | 'current' | 'locked' {
  if (completedIds.includes(lessonId)) return 'completed';

  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return 'locked';

  if (
    lesson.prerequisites.length === 0 ||
    lesson.prerequisites.every((p) => completedIds.includes(p))
  ) {
    return 'current';
  }

  return 'locked';
}

/**
 * Merge graph path with hardcoded lessons.
 * Graph lessons get IDs 100000+, hardcoded stay 1–50.
 */
export interface HybridLesson {
  id: number;
  title: string;
  unitId: number;
  unitTitle: string;
  unitColor: string;
  isGraph: boolean;
  conceptId?: string;
  difficulty: Difficulty;
  description: string;
  prerequisites: number[];
}

export function buildHybridPath(
  graphLessons: GraphLesson[],
  graphUnits: GraphUnit[]
): { lessons: HybridLesson[]; units: GraphUnit[] } {
  const lessons: HybridLesson[] = graphLessons.map((l) => ({
    id: l.id,
    title: l.title,
    unitId: l.unitId,
    unitTitle: l.unitTitle,
    unitColor: l.unitColor,
    isGraph: true,
    conceptId: l.conceptId,
    difficulty: l.difficulty,
    description: l.description,
    prerequisites: l.prerequisites,
  }));

  return { lessons, units: graphUnits };
}
