export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type GrammarRole =
  | 'noun'
  | 'verb'
  | 'focus-marker'
  | 'preposition'
  | 'article'
  | 'pronoun'
  | 'adjective'
  | 'adverb'
  | 'connector'
  | 'particle'
  | 'question-marker'
  | 'negation'
  | 'tense-marker'
  | 'directional'
  | 'possessive'
  | 'number'
  | 'conjunction';

export interface GrammarTopic {
  id: string;
  title: string;
  difficulty: Difficulty;
  prerequisites: string[];
  position: { x: number; y: number };
  description: string;
}

export interface WordBreakdown {
  word: string;
  label: string;
  role: GrammarRole;
  color: string;
}

export interface LessonExample {
  somali: string;
  english: string;
  literal?: string;
  words: WordBreakdown[];
  note?: string;
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  explanation: string;
}

export interface PracticeExercise {
  type: 'fill-blank' | 'choose';
  question: string;
  hint?: string;
  answer: string;
  options?: string[];
  explanation: string;
}

export interface QuickRefEntry {
  term: string;
  meaning: string;
  example?: string;
}

export interface KeyConcept {
  title: string;
  description: string;
}

export interface Lesson {
  topicId: string;
  title: string;
  overview: string;
  rule: string;
  keyConcepts: KeyConcept[];
  examples: LessonExample[];
  commonMistakes: CommonMistake[];
  exercises: PracticeExercise[];
  quickRef: QuickRefEntry[];
}

export interface UserProgress {
  completedTopics: string[];
  streak: number;
  lastPracticeDate: string;
  quizScores: Record<string, number>;
}

export interface CanvasState {
  offsetX: number;
  offsetY: number;
  zoom: number;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  unitId: number;
  color: string;
  lessonIds: number[];
  prerequisites: string[];
}
