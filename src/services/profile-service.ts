/**
 * Profile Service — User profile management and admin operations.
 */

import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

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

export async function fetchProfile(userId: string) {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await getSupabase()
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) return null;
  return data;
}

export async function updateProfile(
  userId: string,
  updates: { username?: string; display_name?: string; first_name?: string; last_name?: string; avatar_url?: string }
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await getSupabase()
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  return !error;
}

export async function uploadAvatar(userId: string, file: File): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  const ext = file.name.split('.').pop() || 'png';
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await getSupabase()
    .storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) return null;

  const { data } = getSupabase().storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchAllProfiles() {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await getSupabase()
    .from('profiles')
    .select('id, email, first_name, last_name, is_admin')
    .order('created_at', { ascending: false });

  return error ? [] : (data ?? []);
}

export async function setAdminStatus(userId: string, isAdmin: boolean): Promise<boolean> {
  if (!isSupabaseConfigured) return false;

  const { error } = await getSupabase()
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId);

  return !error;
}
