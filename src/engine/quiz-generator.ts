/**
 * Quiz Generator — creates interactive exercises from graph data.
 *
 * Question types:
 * - FILL_BLANK: construction template with missing member
 * - MULTIPLE_CHOICE: identify concept from example or definition
 * - MATCHING: pair Somali terms with English glosses
 * - TRUE_FALSE: verify grammatical statements
 */

import type { GraphEngine } from './graph-engine';
import type { ChunkStore } from './chunk-store';
import type { Node, Construction } from './types';

export type QuestionType = 'FILL_BLANK' | 'MULTIPLE_CHOICE' | 'MATCHING' | 'TRUE_FALSE';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  conceptId: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizSet {
  conceptId: string;
  title: string;
  questions: QuizQuestion[];
}

/* ─── Utilities ─── */

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandom<T>(array: T[], count: number): T[] {
  return shuffle(array).slice(0, count);
}

function distractorsFromPool(correct: string, pool: string[], count = 3): string[] {
  const filtered = pool.filter((p) => p !== correct && p.length > 0);
  const picked = pickRandom(filtered, count);
  return shuffle([...picked, correct]);
}

function formatLabel(label: string): string {
  return label
    .replace(/^(concept|example|word|morpheme|rule|lesson|textbook):/, '')
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/* ─── Question Generators ─── */

function generateFillBlank(
  engine: GraphEngine,
  conceptId: string,
  construction: Construction
): QuizQuestion | null {
  const nonSlotMembers = construction.members.filter((m) => !m.nodeId.startsWith('slot:'));
  if (nonSlotMembers.length < 2) return null;

  // Pick a random member to blank out (prefer the target concept)
  const targetMember =
    nonSlotMembers.find((m) => m.nodeId === conceptId) ??
    nonSlotMembers[Math.floor(Math.random() * nonSlotMembers.length)];

  const targetNode = engine.getNode(targetMember.nodeId);
  if (!targetNode) return null;

  // Build template with blank
  const templateParts = construction.members
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((m) => {
      const node = engine.getNode(m.nodeId);
      const label = formatLabel(node?.labels.default ?? m.nodeId);
      if (m.nodeId === targetMember.nodeId) {
        return '_____';
      }
      return label;
    });

  // Collect distractors from other members
  const otherLabels = nonSlotMembers
    .filter((m) => m.nodeId !== targetMember.nodeId)
    .map((m) => engine.getNode(m.nodeId)?.labels.default)
    .filter((l): l is string => !!l)
    .map(formatLabel);

  const allNodes = engine.getAllNodes();
  const nodePool = allNodes
    .filter((n) => n.type === 'MORPHEME' || n.type === 'WORD')
    .map((n) => formatLabel(n.labels.default));

  const pool = otherLabels.length >= 3 ? otherLabels : [...otherLabels, ...nodePool];
  const options = distractorsFromPool(formatLabel(targetNode.labels.default), pool, 3);

  return {
    id: `fb:${construction.id}:${targetMember.nodeId}`,
    type: 'FILL_BLANK',
    question: `Complete the construction: ${templateParts.join(' ')}`,
    options,
    correctAnswer: formatLabel(targetNode.labels.default),
    explanation: `In the "${construction.name}" construction, **${formatLabel(targetNode.labels.default)}** serves as the ${targetMember.role}.`,
    conceptId,
    difficulty: construction.members.length > 3 ? 'medium' : 'easy',
  };
}

function generateMultipleChoiceFromExample(
  engine: GraphEngine,
  _chunks: ChunkStore,
  conceptId: string,
  exampleNode: Node
): QuizQuestion | null {
  const concept = engine.getNode(conceptId);
  if (!concept) return null;

  const question = `In the sentence "${formatLabel(exampleNode.labels.default)}", what is the function of **${formatLabel(concept.labels.default)}**?`;

  // Generate options from concept's relationships
  const isAEdges = engine.getEdgesFrom(conceptId).filter((e) => e.type === 'IS_A');
  const parentConcepts = isAEdges
    .map((e) => engine.getNode(e.to)?.labels.default)
    .filter((l): l is string => !!l)
    .map(formatLabel);

  const allConcepts = engine.getAllNodes().filter((n) => n.type === 'CONCEPT');
  const pool = parentConcepts.length >= 3 ? parentConcepts : allConcepts.map((n) => formatLabel(n.labels.default));

  const correct = formatLabel(parentConcepts[0] ?? concept.labels.english ?? concept.labels.default);
  const options = distractorsFromPool(correct, pool, 3);

  return {
    id: `mc:ex:${exampleNode.id}`,
    type: 'MULTIPLE_CHOICE',
    question,
    options,
    correctAnswer: correct,
    explanation: `${formatLabel(concept.labels.default)} is ${parentConcepts.length > 0 ? `a type of ${parentConcepts[0]}` : 'a grammatical concept in Somali'}.`,
    conceptId,
    difficulty: 'medium',
  };
}

function generateMultipleChoiceFromDefinition(
  engine: GraphEngine,
  conceptId: string
): QuizQuestion | null {
  const concept = engine.getNode(conceptId);
  if (!concept) return null;

  // Find examples that EXEMPLIFY this concept
  const exampleEdges = engine.getEdgesTo(conceptId).filter((e) => e.type === 'EXEMPLIFIES');
  if (exampleEdges.length === 0) return null;

  const exampleEdge = exampleEdges[0];
  const exampleNode = engine.getNode(exampleEdge.from);
  if (!exampleNode) return null;

  const question = `Which concept is illustrated by: "${formatLabel(exampleNode.labels.default)}"?`;

  // Distractors: other concepts that have examples
  const allConcepts = engine.getAllNodes().filter((n) => n.type === 'CONCEPT' && n.id !== conceptId);
  const pool = allConcepts.map((n) => formatLabel(n.labels.default));
  const options = distractorsFromPool(formatLabel(concept.labels.default), pool, 3);

  return {
    id: `mc:def:${conceptId}`,
    type: 'MULTIPLE_CHOICE',
    question,
    options,
    correctAnswer: formatLabel(concept.labels.default),
    explanation: `This sentence exemplifies the **${formatLabel(concept.labels.default)}** concept.`,
    conceptId,
    difficulty: 'easy',
  };
}

function generateTrueFalse(
  engine: GraphEngine,
  conceptId: string
): QuizQuestion | null {
  const concept = engine.getNode(conceptId);
  if (!concept) return null;

  // Build statements from attributes
  const attrs = Object.entries(concept.attributes);
  if (attrs.length === 0) return null;

  const [key, value] = attrs[Math.floor(Math.random() * attrs.length)];
  const isTrue = Math.random() > 0.4;

  let statement: string;
  let correctAnswer: string;
  let explanation: string;

  if (isTrue) {
    statement = `The ${formatLabel(concept.labels.default)} ${key.replace(/_/g, ' ')} is "${String(value)}".`;
    correctAnswer = 'True';
    explanation = `Correct. According to the grammar sources, ${formatLabel(concept.labels.default)} has the property **${key} = ${String(value)}**.`;
  } else {
    // Flip the value for a false statement
    const falseValue = typeof value === 'boolean' ? String(!value) : `not ${String(value)}`;
    statement = `The ${formatLabel(concept.labels.default)} ${key.replace(/_/g, ' ')} is "${falseValue}".`;
    correctAnswer = 'False';
    explanation = `Incorrect. The actual ${key} of ${formatLabel(concept.labels.default)} is **${String(value)}**.`;
  }

  return {
    id: `tf:${conceptId}:${key}`,
    type: 'TRUE_FALSE',
    question: statement,
    options: ['True', 'False'],
    correctAnswer,
    explanation,
    conceptId,
    difficulty: 'easy',
  };
}

function generateMatching(
  engine: GraphEngine,
  conceptId: string
): QuizQuestion | null {
  // Find related nodes with English labels
  const outgoing = engine.getEdgesFrom(conceptId);
  const incoming = engine.getEdgesTo(conceptId);

  const relatedNodes: Node[] = [];
  for (const edge of [...outgoing, ...incoming]) {
    const otherId = edge.from === conceptId ? edge.to : edge.from;
    const other = engine.getNode(otherId);
    if (other && other.labels.english && other.id !== conceptId) {
      relatedNodes.push(other);
    }
  }

  if (relatedNodes.length < 3) return null;

  const pairs = pickRandom(relatedNodes, 4).map((n) => ({
    somali: formatLabel(n.labels.default),
    english: n.labels.english!,
  }));

  const shuffledEnglish = shuffle(pairs.map((p) => p.english));

  return {
    id: `match:${conceptId}`,
    type: 'MATCHING',
    question: 'Match each Somali term with its English meaning:',
    options: shuffledEnglish,
    correctAnswer: pairs.map((p) => `${p.somali} = ${p.english}`).join('; '),
    explanation: pairs.map((p) => `**${p.somali}** = ${p.english}`).join(', '),
    conceptId,
    difficulty: 'medium',
  };
}

/* ─── Main API ─── */

export function generateQuiz(
  engine: GraphEngine,
  chunks: ChunkStore,
  conceptId: string,
  maxQuestions = 8
): QuizSet {
  const concept = engine.getNode(conceptId);
  const title = concept ? formatLabel(concept.labels.default) : 'Quiz';

  const questions: QuizQuestion[] = [];
  const usedIds = new Set<string>();

  const addQuestion = (q: QuizQuestion | null) => {
    if (!q || usedIds.has(q.id)) return;
    usedIds.add(q.id);
    questions.push(q);
  };

  // 1. Construction fill-in-the-blank
  const constructions = engine.getConstructionsForNode(conceptId);
  for (const c of constructions) {
    addQuestion(generateFillBlank(engine, conceptId, c));
  }

  // 2. Multiple choice from examples
  const exampleEdges = engine.getEdgesTo(conceptId).filter((e) => e.type === 'EXEMPLIFIES');
  for (const edge of exampleEdges.slice(0, 2)) {
    const exNode = engine.getNode(edge.from);
    if (exNode) {
      addQuestion(generateMultipleChoiceFromExample(engine, chunks, conceptId, exNode));
    }
  }

  // 3. Multiple choice from definition
  addQuestion(generateMultipleChoiceFromDefinition(engine, conceptId));

  // 4. True/False from attributes
  addQuestion(generateTrueFalse(engine, conceptId));

  // 5. Matching
  addQuestion(generateMatching(engine, conceptId));

  // 6. Extra construction questions if we have room
  for (const c of constructions) {
    if (questions.length >= maxQuestions) break;
    addQuestion(generateFillBlank(engine, conceptId, c));
  }

  // Shuffle and limit
  const finalQuestions = shuffle(questions).slice(0, maxQuestions);

  return {
    conceptId,
    title: `${title} — Quiz`,
    questions: finalQuestions,
  };
}
