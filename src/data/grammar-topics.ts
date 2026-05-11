import type { RoadmapTopic } from '@/types';

/**
 * Roadmap topics — 8 sections as nodes in the dependency graph.
 * Clicking a section opens a side panel with problems in that section.
 */
export const grammarTopics: RoadmapTopic[] = [
  {
    id: 's0',
    title: 'Foundations',
    description: 'Alphabet, sounds, greetings, and basic social formulas.',
    unitId: 0,
    color: '#3b82f6',
    lessonIds: [1, 2, 3],
    prerequisites: [],
  },
  {
    id: 's1',
    title: 'Noun System',
    description: 'Gender, definite articles, pluralization, and case marking.',
    unitId: 1,
    color: '#22c55e',
    lessonIds: [4, 5, 6, 7],
    prerequisites: ['s0'],
  },
  {
    id: 's2',
    title: 'Sentence Core',
    description: 'Clitic pronouns, SOV word order, and the copula system.',
    unitId: 2,
    color: '#a855f7',
    lessonIds: [8, 9, 10, 11],
    prerequisites: ['s0'],
  },
  {
    id: 's3',
    title: 'Focus & Questions',
    description: 'Focus markers (waa, baa, waxa) and question formation.',
    unitId: 3,
    color: '#f97316',
    lessonIds: [12, 13, 14, 15, 16],
    prerequisites: ['s2'],
  },
  {
    id: 's4',
    title: 'Verb & Tense',
    description: 'Verb classes, present/past/future, negation, and aspect.',
    unitId: 4,
    color: '#eab308',
    lessonIds: [17, 18, 19, 20],
    prerequisites: ['s2'],
  },
  {
    id: 's5',
    title: 'Space & Modifiers',
    description: 'Prepositions, directionals, adjectives-as-verbs, and numbers.',
    unitId: 5,
    color: '#06b6d4',
    lessonIds: [21, 22, 23, 24],
    prerequisites: ['s2', 's4'],
  },
  {
    id: 's6',
    title: 'Complex Grammar',
    description: 'Connectors, relative clauses, conditionals, and reported speech.',
    unitId: 6,
    color: '#ec4899',
    lessonIds: [25, 26, 27, 28],
    prerequisites: ['s3', 's4', 's5'],
  },
  {
    id: 's7',
    title: 'Mastery',
    description: 'Passive voice, causative verbs, and free production.',
    unitId: 7,
    color: '#ef4444',
    lessonIds: [29, 30],
    prerequisites: ['s4', 's5', 's6'],
  },
];
