import type { RoadmapTopic } from '@/types';
import { allProblems } from './problems';

function problemsForSection(sectionId: number): number[] {
  return allProblems.filter(p => p.sectionId === sectionId).map(p => p.id);
}

export const ROADMAP_TOPICS: RoadmapTopic[] = [
  {
    id: 'marker-system',
    title: 'Marker System',
    description: 'Identifying and distinguishing waa, baa, waxa, and ma markers in sentences.',
    unitId: 1,
    color: '#3b82f6',
    lessonIds: problemsForSection(0),
    prerequisites: [],
  },
  {
    id: 'contractions-pronouns',
    title: 'Contractions & Pronouns',
    description: 'Unfusing marker+pronoun forms in fast speech and understanding fused verb morphology.',
    unitId: 2,
    color: '#8b5cf6',
    lessonIds: problemsForSection(1),
    prerequisites: ['marker-system'],
  },
  {
    id: 'word-order-sov',
    title: 'Word Order & SOV',
    description: 'Mastering Subject-Object-Verb ordering and core sentence structure.',
    unitId: 3,
    color: '#06b6d4',
    lessonIds: problemsForSection(2),
    prerequisites: ['contractions-pronouns'],
  },
  {
    id: 'prepositions-direction',
    title: 'Prepositions & Direction',
    description: 'Directional prepositions u, ku, ka, la and soo, sii spatial markers.',
    unitId: 4,
    color: '#f59e0b',
    lessonIds: problemsForSection(3),
    prerequisites: ['word-order-sov'],
  },
  {
    id: 'connectors-composition',
    title: 'Connectors & Composition',
    description: 'Conjunction system (iyo, -na, -se, oo) for building complex sentences.',
    unitId: 5,
    color: '#ef4444',
    lessonIds: problemsForSection(4),
    prerequisites: ['prepositions-direction'],
  },
];
