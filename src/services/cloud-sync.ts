/**
 * Cloud Sync Service — bidirectional sync between local progress and Supabase.
 *
 * SYNC STRATEGY:
 * ──────────────
 *
 * Login-time (one-time merge):
 *   1. Pull remote progress from Supabase (pullProgress)
 *   2. Merge local + remote using conflict resolution rules (mergeProgress)
 *   3. Push merged result back to cloud (pushProgress)
 *   → Result: both local and cloud agree on a unified state
 *
 * Post-login (push-only, debounced):
 *   → Changes push to cloud every 2s, but do NOT re-pull or re-merge
 *   → This minimizes latency for single-device use cases
 *
 * MULTI-DEVICE IMPLICATIONS:
 * ──────────────────────────
 * If a user is logged in on Device A and Device B simultaneously:
 *   - Device A edits concept A's mastery (local, not synced yet)
 *   - Device B edits concept B's mastery and logs out → synced to cloud
 *   - Device A logs out → its changes (concept A) are pushed
 *   → Result: concept A wins from Device A, concept B wins from Device B ✓
 *
 * But if both devices stay logged in:
 *   - Device A edits concept A (pushed at 2s)
 *   - Device B edits concept A (pushed at 2s, overwrites Device A)
 *   - Device A never re-pulls → it shows stale version until next login
 *   → Result: devices diverge until one logs out and back in
 *
 * Recommended: single-device or log in/out between devices.
 *
 * Merge strategy: union of completed lessons, max of scores,
 * SRS cards merge by higher mastery or more recent review.
 */

import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import type { UserProgress } from '@/stores/progress-store';
import type { SrsCard } from '@/engine/srs';

export interface RemoteProgress {
  completed_lessons: number[];
  completed_graph_lessons: string[];
  practice_scores: Record<number, number>;
  srs_cards: Record<string, SrsCard>;
  xp: number;
  streak: number;
  last_study_date: string;
  activity_log: string[];
  updated_at: string;
  completed_workbook_levels?: number[];
  workbook_level_scores?: Record<number, number>;
}

function normalizeRemote(data: Record<string, unknown>): RemoteProgress {
  return {
    completed_lessons: Array.isArray(data.completed_lessons) ? (data.completed_lessons as number[]) : [],
    completed_graph_lessons: Array.isArray(data.completed_graph_lessons) ? (data.completed_graph_lessons as string[]) : [],
    practice_scores: typeof data.practice_scores === 'object' && data.practice_scores !== null
      ? (data.practice_scores as Record<number, number>) : {},
    srs_cards: typeof data.srs_cards === 'object' && data.srs_cards !== null
      ? (data.srs_cards as Record<string, SrsCard>) : {},
    xp: typeof data.xp === 'number' ? data.xp : 0,
    streak: typeof data.streak === 'number' ? data.streak : 0,
    last_study_date: typeof data.last_study_date === 'string' ? data.last_study_date : '',
    activity_log: Array.isArray(data.activity_log) ? (data.activity_log as string[]) : [],
    updated_at: typeof data.updated_at === 'string' ? data.updated_at : '',
    completed_workbook_levels: Array.isArray(data.completed_workbook_levels) ? (data.completed_workbook_levels as number[]) : [],
    workbook_level_scores: typeof data.workbook_level_scores === 'object' && data.workbook_level_scores !== null
      ? (data.workbook_level_scores as Record<number, number>) : {},
  };
}

function mergeSrsCards(local: Record<string, SrsCard>, remote: Record<string, SrsCard>): Record<string, SrsCard> {
  const merged: Record<string, SrsCard> = { ...local };
  for (const [conceptId, remoteCard] of Object.entries(remote)) {
    const localCard = merged[conceptId];
    if (!localCard) {
      merged[conceptId] = remoteCard;
      continue;
    }
    if (remoteCard.mastery > localCard.mastery) {
      merged[conceptId] = remoteCard;
    } else if (remoteCard.mastery === localCard.mastery && remoteCard.lastReviewed > localCard.lastReviewed) {
      merged[conceptId] = remoteCard;
    }
  }
  return merged;
}

export function mergeProgress(local: UserProgress, remote: RemoteProgress): UserProgress {
  const completedSet = new Set([...local.completedLessons, ...remote.completed_lessons]);

  const scores: Record<number, number> = { ...local.practiceScores };
  for (const [key, value] of Object.entries(remote.practice_scores)) {
    const id = Number(key);
    scores[id] = Math.max(scores[id] ?? 0, value);
  }

  const srs = mergeSrsCards(local.srsCards, remote.srs_cards);
  const xp = Math.max(local.xp, remote.xp);
  const streak = local.lastStudyDate > (remote.last_study_date ?? '') ? local.streak : remote.streak;
  const lastStudyDate = local.lastStudyDate > (remote.last_study_date ?? '') ? local.lastStudyDate : remote.last_study_date;
  const activitySet = new Set([...local.activityLog, ...remote.activity_log]);
  const workbookLevelsSet = new Set([...local.completedWorkbookLevels, ...(remote.completed_workbook_levels ?? [])]);
  const workbookScores: Record<number, number> = { ...local.workbookLevelScores };
  for (const [key, value] of Object.entries(remote.workbook_level_scores ?? {})) {
    const id = Number(key);
    workbookScores[id] = Math.max(workbookScores[id] ?? 0, value);
  }
  const graphLessonsSet = new Set([...local.completedGraphLessons, ...(remote.completed_graph_lessons ?? [])]);

  return {
    completedLessons: Array.from(completedSet),
    completedGraphLessons: Array.from(graphLessonsSet),
    practiceScores: scores,
    srsCards: srs,
    xp,
    streak,
    lastStudyDate,
    activityLog: Array.from(activitySet).sort(),
    completedWorkbookLevels: Array.from(workbookLevelsSet),
    workbookLevelScores: workbookScores,
    dailyGoal: local.dailyGoal,
    lessonCardPositions: local.lessonCardPositions,
  };
}

export async function pullProgress(userId: string): Promise<RemoteProgress | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await getSupabase()
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) return null;
  return normalizeRemote(data as Record<string, unknown>);
}

export async function pushProgress(userId: string, progress: UserProgress): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const payload = {
    user_id: userId,
    completed_lessons: progress.completedLessons,
    practice_scores: progress.practiceScores,
    srs_cards: progress.srsCards,
    xp: progress.xp,
    streak: progress.streak,
    last_study_date: progress.lastStudyDate,
    activity_log: progress.activityLog,
    completed_workbook_levels: progress.completedWorkbookLevels,
    workbook_level_scores: progress.workbookLevelScores,
    updated_at: new Date().toISOString(),
  };

  const { error } = await getSupabase()
    .from('user_progress')
    .upsert(payload, { onConflict: 'user_id' });

  return !error;
}
