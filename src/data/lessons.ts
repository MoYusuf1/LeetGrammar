import { lessons } from './lessons_complete';
import type { LessonContent } from './lessons_complete';

export type { LessonContent, LessonExample } from './lessons_complete';

export function getLessonContent(id: number): LessonContent | undefined {
  return lessons.find((l) => l.id === id);
}

export function getAllLessons(): LessonContent[] {
  return lessons;
}

export function getTotalLessonCount(): number {
  return lessons.length;
}
