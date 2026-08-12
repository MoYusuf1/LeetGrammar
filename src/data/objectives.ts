/**
 * OBJECTIVE LABELS — the learner-facing name of each thing a lesson teaches.
 *
 * Objective ids ('article-assimilation') are fine in data and useless to a
 * learner. When a unit test routes someone to correctives, it has to say what
 * they are going back for, in the same plain English the lessons use — the
 * jargon ban applies here exactly as it does to lesson prose, and the
 * validator checks these strings.
 *
 * Which lesson an objective belongs to is **derived** from the lessons that
 * declare it, so this file cannot claim an objective is taught somewhere it is
 * not. Only the wording lives here.
 */

// Explicit .ts extension and a relative path, both required: validate-course.mjs
// imports this module directly under Node's native type stripping, which will
// not resolve an extensionless specifier or the `@/` alias. See WORKING_AGREEMENT.
import { AUTHORED_LESSONS } from './authored-lessons.ts';

const OBJECTIVE_LABELS: Record<string, string> = {
  // Lesson 1
  'somali-alphabet': 'Reading the Somali letters',
  'somali-digraphs': 'The three pairs that count as one letter',
  'somali-vowel-length': 'Doubled vowels are held longer',
  // Lesson 2
  'noun-gender': 'Every noun is masculine or feminine',
  'noun-gender-diagnostic': 'Reading gender off the "the" form',
  'noun-gender-unwritten': 'Why gender does not show in writing',
  // Lesson 3
  'article-suffix': '"The" is an ending, not a word',
  'article-assimilation': 'How the "the" ending changes shape',
  'article-no-indefinite': 'There is no word for "a"',
  // Lesson 4
  'pronouns-subject': 'The eight pronouns',
  'pronouns-inclusive-exclusive': 'The two ways to say "we"',
  'subject-case': 'Marking which one is the doer',
  'sentence-shape': 'The order a statement runs in',
  // Lesson 5
  'signal-statement': 'waa marks a plain statement',
  'signal-focus-before': 'baa spotlights the words just before it',
  'signal-focus-end': 'waxa spotlights what comes at the end',
  // Lesson 6
  'signal-fusion': 'Signals and short pronouns squash into one word',
  'signal-fusion-unpack': 'Reading a squashed word back into its two parts',
  // Lesson 7
  'verb-person-endings': 'The action word ends differently depending on who',
  'verb-ending-ambiguity': 'Why the ending alone does not tell you who',
  // Lesson 8
  'order-verb-last': 'The action word usually comes last',
  'order-signal-hugs-verb': 'The signal sits right before the action word',
  'order-waxa-moves-it': 'waxa sends the spotlighted words past the verb',
};

/** objective id → the lesson that declares it. Derived from the course. */
const OBJECTIVE_LESSON: Record<string, number> = Object.fromEntries(
  AUTHORED_LESSONS.flatMap((lesson) => lesson.objectives.map((o) => [o, lesson.id])),
);

export interface ObjectiveInfo {
  id: string;
  label: string;
  lessonId?: number;
  lessonTitle?: string;
}

/**
 * Plain-English name and home lesson for an objective.
 *
 * Falls back to the raw id rather than throwing: a missing label should show up
 * as an ugly string in the UI and a validator error, not as a blank screen for
 * a learner who has just failed a test.
 */
export function describeObjective(objectiveId: string): ObjectiveInfo {
  const lessonId = OBJECTIVE_LESSON[objectiveId];
  const lesson = AUTHORED_LESSONS.find((l) => l.id === lessonId);
  return {
    id: objectiveId,
    label: OBJECTIVE_LABELS[objectiveId] ?? objectiveId,
    lessonId,
    lessonTitle: lesson?.title,
  };
}

/** Every objective id that has a label. Used by the validator. */
export function labelledObjectives(): string[] {
  return Object.keys(OBJECTIVE_LABELS);
}

/** Every label string, for the jargon check. */
export function objectiveLabels(): string[] {
  return Object.values(OBJECTIVE_LABELS);
}
