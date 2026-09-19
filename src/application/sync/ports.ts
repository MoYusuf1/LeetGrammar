import type { UserProgress } from '@/domain/progress/types';

export interface ProgressRepository {
  load: () => Promise<UserProgress | undefined>;
  save: (progress: UserProgress) => Promise<void>;
  watch: (apply: (progress: UserProgress, fromCache: boolean) => void, fail: () => void) => () => void;
}

export interface ProgressStorePort {
  get: () => UserProgress;
  set: (progress: UserProgress) => void;
  watch: (listener: (state: UserProgress) => void) => () => void;
}
