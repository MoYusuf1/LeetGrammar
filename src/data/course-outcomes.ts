/**
 * COURSE OUTCOMES — the claims LeetGrammar is allowed to make.
 *
 * These are text-first performances, not topic labels and not ACTFL/CEFR
 * ratings. Every outcome names its direct evidence. `course-outcomes.test.ts`
 * fails when an objective falls outside the outcome map or a transfer claim
 * has no delayed/unseen evidence.
 */

import { AUTHORED_LESSONS } from './authored-lessons';

export type EvidenceMode =
  | 'guided-retrieval'
  | 'cold-production'
  | 'context-transfer'
  | 'unseen-reading'
  | 'written-interaction'
  | 'connected-writing'
  | 'delayed-transfer';

export interface OutcomeEvidence {
  mode: EvidenceMode;
  lessonIds: number[];
  evidenceIds: string[];
  implemented: boolean;
  note: string;
}

export interface CourseOutcome {
  id: string;
  canDo: string;
  objectiveIds: string[];
  evidence: OutcomeEvidence[];
}

export const COURSE_OUTCOMES: CourseOutcome[] = [
  {
    id: 'decode-written-statement',
    canDo: 'I can find the WHO, SIGNAL, WHAT, and DO in a level-appropriate written Somali statement.',
    objectiveIds: [
      'decode-statement', 'find-signal', 'build-statement', 'subject-case', 'sentence-shape',
      'signal-statement', 'signal-focus-before', 'signal-focus-end', 'signal-fusion',
      'signal-fusion-unpack', 'verb-ending-ambiguity', 'order-verb-last',
      'order-signal-hugs-verb', 'order-waxa-moves-it',
    ],
    evidence: [
      { mode: 'guided-retrieval', lessonIds: [1, 5, 8], evidenceIds: ['l1-n1', 'l5-n1', 'l8-n2'], implemented: true, note: 'Core lesson retrieval.' },
      { mode: 'context-transfer', lessonIds: [1], evidenceIds: ['l1-transfer-gist'], implemented: true, note: 'A familiar sourced sentence is read in a new caption context; this does not claim an unseen string.' },
      { mode: 'unseen-reading', lessonIds: [5, 8], evidenceIds: ['l5-transfer-gap', 'l8-transfer-parse'], implemented: true, note: 'New text configurations in the later vertical-slice lessons.' },
      { mode: 'delayed-transfer', lessonIds: [1, 5, 8], evidenceIds: ['homework:1', 'homework:5', 'homework:8'], implemented: true, note: 'Homework re-composes verified material after the lesson.' },
    ],
  },
  {
    id: 'build-written-forms',
    canDo: 'I can build short written Somali statements with the noun, signal, subject, and action forms I have learned.',
    objectiveIds: [
      'noun-gender', 'noun-gender-diagnostic', 'noun-gender-unwritten', 'article-suffix',
      'article-assimilation', 'article-no-indefinite', 'pronouns-subject',
      'pronouns-inclusive-exclusive', 'verb-person-endings',
    ],
    evidence: [
      { mode: 'cold-production', lessonIds: [1, 2, 3, 4, 6, 7, 8], evidenceIds: ['lesson-production'], implemented: true, note: 'Typed and assembled responses.' },
      { mode: 'connected-writing', lessonIds: [8], evidenceIds: ['l8-connected-write'], implemented: true, note: 'A bounded two-line update; compared against a model, not treated as open-ended writing.' },
      { mode: 'delayed-transfer', lessonIds: [1, 2, 3, 4, 6, 7, 8], evidenceIds: ['homework-production'], implemented: true, note: 'Cumulative homework.' },
    ],
  },
  {
    id: 'repair-written-interpretation',
    canDo: 'I can notice when a first reading fails and use the signal or ending to repair it.',
    objectiveIds: ['signal-focus-before', 'signal-focus-end', 'verb-ending-ambiguity', 'order-waxa-moves-it'],
    evidence: [
      { mode: 'written-interaction', lessonIds: [5], evidenceIds: ['l5-transfer-gap'], implemented: true, note: 'An insufficient first answer must be repaired from the signal.' },
      { mode: 'unseen-reading', lessonIds: [5, 8], evidenceIds: ['l5-transfer-gap', 'l8-transfer-parse'], implemented: true, note: 'New context prevents specimen recall.' },
    ],
  },
  {
    id: 'explain-a-reading',
    canDo: 'I can explain in plain English which Somali clue supports my reading.',
    objectiveIds: ['decode-statement', 'noun-gender-diagnostic', 'article-assimilation', 'signal-focus-before', 'signal-focus-end', 'order-signal-hugs-verb'],
    evidence: [
      { mode: 'guided-retrieval', lessonIds: [1, 2, 3, 5, 8], evidenceIds: ['metalinguistic-feedback'], implemented: true, note: 'Every checked item explains the clue.' },
      { mode: 'context-transfer', lessonIds: [1], evidenceIds: ['l1-transfer-detail'], implemented: true, note: 'The familiar sentence is justified in a new caption task.' },
      { mode: 'unseen-reading', lessonIds: [5, 8], evidenceIds: ['l5-transfer-gap', 'l8-transfer-parse'], implemented: true, note: 'Later vertical-slice transfer questions ask for the decisive clue in new configurations.' },
    ],
  },
];

export const ALL_LESSON_OBJECTIVES = [...new Set(AUTHORED_LESSONS.flatMap((lesson) => lesson.objectives))];

export function outcomesForObjective(objectiveId: string): CourseOutcome[] {
  return COURSE_OUTCOMES.filter((outcome) => outcome.objectiveIds.includes(objectiveId));
}

export function implementedEvidence(outcomeId: string): OutcomeEvidence[] {
  return COURSE_OUTCOMES.find((outcome) => outcome.id === outcomeId)?.evidence.filter((e) => e.implemented) ?? [];
}
