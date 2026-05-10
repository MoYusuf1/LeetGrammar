// ============================================================================
// LINEAR LEARNING PATH DATA — 5 Units, 20 Topics
// ============================================================================

export interface PathTopic {
  id: string;
  lessonId: number;
  title: string;
  subtitle: string;
  unitId: number;
  unitName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  order: number;
}

export interface PathUnit {
  id: number;
  name: string;
  description: string;
  topics: PathTopic[];
}

export const pathUnits: PathUnit[] = [
  {
    id: 1,
    name: 'Unit 1: Foundations',
    description: 'Build basic sentences',
    topics: [
      {
        id: 'definiteness',
        lessonId: 1,
        title: 'Definiteness',
        subtitle: '-ka / -ta',
        unitId: 1,
        unitName: 'Unit 1: Foundations',
        difficulty: 'easy',
        order: 1,
      },
      {
        id: 'subject-clitics',
        lessonId: 2,
        title: 'Subject Clitics',
        subtitle: 'aan, aad, uu, ay',
        unitId: 1,
        unitName: 'Unit 1: Foundations',
        difficulty: 'easy',
        order: 2,
      },
      {
        id: 'focus-waa',
        lessonId: 3,
        title: 'Focus: waa',
        subtitle: 'Predicate focus',
        unitId: 1,
        unitName: 'Unit 1: Foundations',
        difficulty: 'easy',
        order: 3,
      },
      {
        id: 'focus-baa',
        lessonId: 4,
        title: 'Focus: baa, ayaa',
        subtitle: 'Noun focus',
        unitId: 1,
        unitName: 'Unit 1: Foundations',
        difficulty: 'medium',
        order: 4,
      },
      {
        id: 'fillers',
        lessonId: 5,
        title: 'Filler Words',
        subtitle: 'Conversation flow',
        unitId: 1,
        unitName: 'Unit 1: Foundations',
        difficulty: 'easy',
        order: 5,
      },
    ],
  },
  {
    id: 2,
    name: 'Unit 2: Verbs',
    description: 'Handle actions and time',
    topics: [
      {
        id: 'verb-classes',
        lessonId: 6,
        title: 'Verb Classes',
        subtitle: '3 conjugations',
        unitId: 2,
        unitName: 'Unit 2: Verbs',
        difficulty: 'medium',
        order: 6,
      },
      {
        id: 'present-habitual',
        lessonId: 7,
        title: 'Present Habitual',
        subtitle: 'Daily actions',
        unitId: 2,
        unitName: 'Unit 2: Verbs',
        difficulty: 'medium',
        order: 7,
      },
      {
        id: 'past-tense',
        lessonId: 8,
        title: 'Past Tense',
        subtitle: 'Completed actions',
        unitId: 2,
        unitName: 'Unit 2: Verbs',
        difficulty: 'medium',
        order: 8,
      },
      {
        id: 'negation',
        lessonId: 9,
        title: 'Negation',
        subtitle: 'ma + verb',
        unitId: 2,
        unitName: 'Unit 2: Verbs',
        difficulty: 'medium',
        order: 9,
      },
      {
        id: 'yes-no-questions',
        lessonId: 10,
        title: 'Yes/No Questions',
        subtitle: 'ma...? / miyuu?',
        unitId: 2,
        unitName: 'Unit 2: Verbs',
        difficulty: 'medium',
        order: 10,
      },
    ],
  },
  {
    id: 3,
    name: 'Unit 3: Movement',
    description: 'Describe movement and space',
    topics: [
      {
        id: 'prepositions',
        lessonId: 11,
        title: 'Prepositions',
        subtitle: 'u, ku, ka',
        unitId: 3,
        unitName: 'Unit 3: Movement',
        difficulty: 'hard',
        order: 11,
      },
      {
        id: 'directionals',
        lessonId: 12,
        title: 'Directionals',
        subtitle: 'soo, sii, wada',
        unitId: 3,
        unitName: 'Unit 3: Movement',
        difficulty: 'hard',
        order: 12,
      },
      {
        id: 'object-clitics',
        lessonId: 13,
        title: 'Object Clitics',
        subtitle: 'Pronoun objects',
        unitId: 3,
        unitName: 'Unit 3: Movement',
        difficulty: 'hard',
        order: 13,
      },
    ],
  },
  {
    id: 4,
    name: 'Unit 4: Description',
    description: 'Describe things and plans',
    topics: [
      {
        id: 'adjectives-as-verbs',
        lessonId: 14,
        title: 'Adjectives as Verbs',
        subtitle: 'Describing with yahay',
        unitId: 4,
        unitName: 'Unit 4: Description',
        difficulty: 'medium',
        order: 14,
      },
      {
        id: 'possessives',
        lessonId: 15,
        title: 'Possessives',
        subtitle: 'My, your, their',
        unitId: 4,
        unitName: 'Unit 4: Description',
        difficulty: 'medium',
        order: 15,
      },
      {
        id: 'continuous-tense',
        lessonId: 16,
        title: 'Continuous Tense',
        subtitle: 'Actions in progress',
        unitId: 4,
        unitName: 'Unit 4: Description',
        difficulty: 'medium',
        order: 16,
      },
      {
        id: 'future-tense',
        lessonId: 17,
        title: 'Future Tense',
        subtitle: 'doonaa / -i doonaa',
        unitId: 4,
        unitName: 'Unit 4: Description',
        difficulty: 'medium',
        order: 17,
      },
    ],
  },
  {
    id: 5,
    name: 'Unit 5: Complex Sentences',
    description: 'Build complex sentences',
    topics: [
      {
        id: 'connectors',
        lessonId: 18,
        title: 'Connectors',
        subtitle: 'laakiin, oo, iyo',
        unitId: 5,
        unitName: 'Unit 5: Complex Sentences',
        difficulty: 'hard',
        order: 18,
      },
      {
        id: 'relative-clauses',
        lessonId: 19,
        title: 'Relative Clauses',
        subtitle: 'oo, ee clauses',
        unitId: 5,
        unitName: 'Unit 5: Complex Sentences',
        difficulty: 'hard',
        order: 19,
      },
      {
        id: 'conditionals',
        lessonId: 20,
        title: 'Conditionals',
        subtitle: 'haddii, haduu',
        unitId: 5,
        unitName: 'Unit 5: Complex Sentences',
        difficulty: 'hard',
        order: 20,
      },
    ],
  },
];

// Flatten all topics for easy lookup
export const allTopics: PathTopic[] = pathUnits.flatMap((u) => u.topics);

export function getTopicById(id: string): PathTopic | undefined {
  return allTopics.find((t) => t.id === id);
}

export function getTopicByLessonId(lessonId: number): PathTopic | undefined {
  return allTopics.find((t) => t.lessonId === lessonId);
}

export function getOrderedTopics(): PathTopic[] {
  return [...allTopics].sort((a, b) => a.order - b.order);
}

// For zigzag path: alternate left/right
export function getTopicPosition(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'left' : 'right';
}
