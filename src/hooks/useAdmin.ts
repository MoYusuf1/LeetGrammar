/**
 * Admin check hook — returns whether current user is an admin.
 */

import { useMemo } from 'react';
import { useAuthStore } from '@/stores/auth-store';

export function useAdmin(): boolean {
  const { user, isAdmin } = useAuthStore();
  return useMemo(() => !!user && isAdmin, [user, isAdmin]);
}
