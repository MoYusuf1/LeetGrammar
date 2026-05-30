/**
 * User progress queries only.
 * All curriculum content queries have been removed (now hardcoded static data).
 */

import { getSupabase } from '@/lib/supabase';
import type { LearnerConceptState } from '@/lib/supabase/lesson-types';

export interface LessonProgressRow {
  user_id: string;
  lesson_id: number;
  current_card: number;
}

export async function getConceptStates(userId: string): Promise<LearnerConceptState[]> {
  const { data, error } = await getSupabase()
    .from('learner_concept_states')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data ?? [];
}

export async function upsertConceptStates(
  userId: string,
  states: LearnerConceptState[]
): Promise<void> {
  const { error } = await getSupabase()
    .from('learner_concept_states')
    .upsert(states, { onConflict: 'user_id,concept_id' });

  if (error) throw error;
}

export async function insertReviewLog(params: {
  userId: string;
  conceptId: string;
  quality: number;
  elapsedMs: number;
}): Promise<void> {
  const { error } = await getSupabase()
    .from('review_logs')
    .insert({
      user_id: params.userId,
      concept_id: params.conceptId,
      exercise_id: null,
      created_at: new Date().toISOString(),
    });

  if (error) throw error;
}

export async function getLessonProgress(userId: string): Promise<LessonProgressRow[]> {
  const { data, error } = await getSupabase()
    .from('lesson_progress')
    .select('user_id, lesson_id, current_card')
    .eq('user_id', userId);

  if (error) throw error;
  return data ?? [];
}

export async function upsertLessonProgress(
  userId: string,
  lessonId: number,
  cardIndex: number
): Promise<void> {
  const { error } = await getSupabase()
    .from('lesson_progress')
    .upsert(
      { user_id: userId, lesson_id: lessonId, current_card: cardIndex },
      { onConflict: 'user_id,lesson_id' }
    );

  if (error) throw error;
}

export async function deleteLessonProgress(userId: string, lessonId: number): Promise<void> {
  const { error } = await getSupabase()
    .from('lesson_progress')
    .delete()
    .eq('user_id', userId)
    .eq('lesson_id', lessonId);

  if (error) throw error;
}
