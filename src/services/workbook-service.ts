/**
 * Workbook Service — Workbook exercise attempt tracking.
 */

import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export interface WorkbookAttempt {
  drill_id: number;
  answer: string;
  is_correct: boolean;
  attempted_at: string;
}

export async function fetchWorkbookAttempts(userId: string, levelId: number): Promise<WorkbookAttempt[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await getSupabase()
    .from('workbook_attempts')
    .select('drill_id, answer, is_correct, attempted_at')
    .eq('user_id', userId)
    .eq('level_id', levelId)
    .order('drill_id', { ascending: true });

  return error ? [] : ((data ?? []) as WorkbookAttempt[]);
}

export async function saveWorkbookAttempt(
  userId: string,
  levelId: number,
  drillId: number,
  answer: string,
  isCorrect: boolean
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await getSupabase()
    .from('workbook_attempts')
    .upsert(
      {
        user_id: userId,
        level_id: levelId,
        drill_id: drillId,
        answer,
        is_correct: isCorrect,
        attempted_at: new Date().toISOString(),
      },
      { onConflict: 'user_id, level_id, drill_id' }
    );

  return !error;
}

export async function saveWorkbookAttemptsBatch(
  userId: string,
  levelId: number,
  attempts: Array<{ drillId: number; answer: string; isCorrect: boolean }>
): Promise<boolean> {
  if (!isSupabaseConfigured || attempts.length === 0) return false;

  const rows = attempts.map((a) => ({
    user_id: userId,
    level_id: levelId,
    drill_id: a.drillId,
    answer: a.answer,
    is_correct: a.isCorrect,
    attempted_at: new Date().toISOString(),
  }));

  const { error } = await getSupabase()
    .from('workbook_attempts')
    .upsert(rows, { onConflict: 'user_id, level_id, drill_id' });

  return !error;
}
