/**
 * Cloud Sync Engine — bidirectional sync between local progress and Supabase.
 *
 * Merge strategy: union of completed lessons, max of scores,
 * SRS cards merge by higher mastery or more recent review.
 */

import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import type { UserProgress } from '@/stores/progress-store';
import type { SrsCard } from './srs';

export interface RemoteProgress {
  completed_lessons: number[];
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
    completed_lessons: Array.isArray(data.completed_lessons) ? data.completed_lessons as number[] : [],
    practice_scores: typeof data.practice_scores === 'object' && data.practice_scores !== null
      ? (data.practice_scores as Record<number, number>) : {},
    srs_cards: typeof data.srs_cards === 'object' && data.srs_cards !== null
      ? (data.srs_cards as Record<string, SrsCard>) : {},
    xp: typeof data.xp === 'number' ? data.xp : 0,
    streak: typeof data.streak === 'number' ? data.streak : 0,
    last_study_date: typeof data.last_study_date === 'string' ? data.last_study_date : '',
    activity_log: Array.isArray(data.activity_log) ? data.activity_log as string[] : [],
    updated_at: typeof data.updated_at === 'string' ? data.updated_at : '',
    completed_workbook_levels: Array.isArray(data.completed_workbook_levels) ? data.completed_workbook_levels as number[] : [],
    workbook_level_scores: typeof data.workbook_level_scores === 'object' && data.workbook_level_scores !== null
      ? (data.workbook_level_scores as Record<number, number>) : {},
  };
}

/**
 * Merge two SRS card records. Keeps the card with higher mastery,
 * or if equal mastery, the more recently reviewed one.
 */
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

/**
 * Merge local and remote progress.
 */
export function mergeProgress(local: UserProgress, remote: RemoteProgress): UserProgress {
  // Union of completed lessons
  const completedSet = new Set([...local.completedLessons, ...remote.completed_lessons]);

  // Max of practice scores
  const scores: Record<number, number> = { ...local.practiceScores };
  for (const [key, value] of Object.entries(remote.practice_scores)) {
    const id = Number(key);
    scores[id] = Math.max(scores[id] ?? 0, value);
  }

  // Merge SRS cards
  const srs = mergeSrsCards(local.srsCards, remote.srs_cards);

  // Max of XP
  const xp = Math.max(local.xp, remote.xp);

  // Latest streak (if dates differ, take the one with later study date)
  const streak = local.lastStudyDate > (remote.last_study_date ?? '') ? local.streak : remote.streak;
  const lastStudyDate = local.lastStudyDate > (remote.last_study_date ?? '') ? local.lastStudyDate : remote.last_study_date;

  // Union of activity log
  const activitySet = new Set([...local.activityLog, ...remote.activity_log]);

  // Workbook levels
  const workbookLevelsSet = new Set([...local.completedWorkbookLevels, ...(remote.completed_workbook_levels ?? [])]);
  const workbookScores: Record<number, number> = { ...local.workbookLevelScores };
  for (const [key, value] of Object.entries(remote.workbook_level_scores ?? {})) {
    const id = Number(key);
    workbookScores[id] = Math.max(workbookScores[id] ?? 0, value);
  }

  return {
    completedLessons: Array.from(completedSet),
    practiceScores: scores,
    srsCards: srs,
    xp,
    streak,
    lastStudyDate,
    activityLog: Array.from(activitySet).sort(),
    completedWorkbookLevels: Array.from(workbookLevelsSet),
    workbookLevelScores: workbookScores,
  };
}

/**
 * Fetch remote progress for the current user.
 */
export async function pullProgress(userId: string): Promise<RemoteProgress | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await getSupabase()
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return normalizeRemote(data as Record<string, unknown>);
}

/**
 * Push local progress to the cloud.
 */
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

  if (error) {
    return false;
  }

  return true;
}

/**
 * Ensure user has a profile row.
 */
export async function ensureProfile(userId: string, email?: string): Promise<void> {
  if (!isSupabaseConfigured) return;

  const { data } = await getSupabase()
    .from('profiles')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (!data) {
    await getSupabase()
      .from('profiles')
      .insert({ id: userId, email });
  }
}

/**
 * Fetch user profile.
 */
export async function fetchProfile(userId: string) {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await getSupabase()
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    return null;
  }

  return data;
}

/**
 * Update user profile.
 */
export async function updateProfile(userId: string, updates: { username?: string; display_name?: string; first_name?: string; last_name?: string; avatar_url?: string }) {
  if (!isSupabaseConfigured) return false;

  const { error } = await getSupabase()
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  if (error) {
    return false;
  }

  return true;
}

/**
 * Upload avatar image to Supabase Storage.
 */
export async function uploadAvatar(userId: string, file: File): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  const ext = file.name.split('.').pop() || 'png';
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await getSupabase()
    .storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    return null;
  }

  const { data } = getSupabase().storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Fetch all profiles (admin only).
 */
export async function fetchAllProfiles() {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await getSupabase()
    .from('profiles')
    .select('id, email, first_name, last_name, is_admin')
    .order('created_at', { ascending: false });

  if (error) {
    return [];
  }

  return data ?? [];
}

/**
 * Set a user's admin status (admin only).
 */
export async function setAdminStatus(userId: string, isAdmin: boolean): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await getSupabase()
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId);

  if (error) {
    return false;
  }

  return true;
}

// ─── Workbook Attempts ─────────────────────────────────────────────────────

export interface WorkbookAttempt {
  drill_id: number;
  answer: string;
  is_correct: boolean;
  attempted_at: string;
}

/**
 * Fetch all attempts for a given level.
 */
export async function fetchWorkbookAttempts(userId: string, levelId: number): Promise<WorkbookAttempt[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await getSupabase()
    .from('workbook_attempts')
    .select('drill_id, answer, is_correct, attempted_at')
    .eq('user_id', userId)
    .eq('level_id', levelId)
    .order('drill_id', { ascending: true });

  if (error) {
    return [];
  }

  return (data ?? []) as WorkbookAttempt[];
}

/**
 * Save a single workbook attempt (upsert).
 */
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

  if (error) {
    return false;
  }

  return true;
}

/**
 * Batch save workbook attempts for a level.
 */
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

  if (error) {
    return false;
  }

  return true;
}
