import type { UserProgress } from './types';

export const PROGRESS_SCHEMA_VERSION = 8 as const;
export const PROGRESS_COLLECTION = 'users' as const;

export interface ProgressDocument {
  schemaVersion: typeof PROGRESS_SCHEMA_VERSION;
  progress: UserProgress;
  updatedAt: unknown;
}

export class InvalidProgressDocumentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidProgressDocumentError';
  }
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value);
const isString = (value: unknown): value is string => typeof value === 'string';
const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
const isArrayOf = <T>(value: unknown, predicate: (item: unknown) => item is T): value is T[] =>
  Array.isArray(value) && value.every(predicate);
const isRecordOf = <T>(value: unknown, predicate: (item: unknown) => item is T): value is Record<string, T> =>
  isObject(value) && Object.values(value).every(predicate);

function isUnitTestRecord(value: unknown): value is Record<string, unknown> {
  if (!isObject(value) || !isObject(value.last)) return false;
  return isNumber(value.unitId) && isNumber(value.attempts) && isNumber(value.bestPercentage)
    && isBoolean(value.passed);
}

function isReviewEntry(value: unknown): value is Record<string, unknown> {
  return isObject(value) && isNumber(value.lessonId) && isNumber(value.reviewCount)
    && isNumber(value.lastReview) && isNumber(value.nextReview);
}

function isExerciseProgress(value: unknown): value is Record<string, unknown> {
  return isObject(value) && isNumber(value.attempts) && isNumber(value.correct)
    && isNumber(value.misses) && isString(value.lastAttemptAt);
}

/** Decode Firestore data at the trust boundary. Invalid remote data never reaches merge logic. */
export function decodeProgressDocument(value: unknown): UserProgress {
  if (!isObject(value)) throw new InvalidProgressDocumentError('Progress document is not an object');
  if (value.schemaVersion !== PROGRESS_SCHEMA_VERSION) {
    throw new InvalidProgressDocumentError(`Unsupported progress schema: ${String(value.schemaVersion)}`);
  }
  const p = value.progress;
  if (!isObject(p)
    || !isArrayOf(p.completedLessons, isNumber)
    || !isNumber(p.streak)
    || !isString(p.lastStudyDate)
    || !isRecordOf(p.practiceScores, isNumber)
    || !isArrayOf(p.activityLog, isString)
    || !isRecordOf(p.lessonCardPositions, isNumber)
    || !isRecordOf(p.unitTestResults, isUnitTestRecord)
    || !isRecordOf(p.reviewSchedule, isReviewEntry)
    || !isRecordOf(p.exerciseProgress, isExerciseProgress)) {
    throw new InvalidProgressDocumentError('Progress document has an invalid shape');
  }
  return p as unknown as UserProgress;
}
