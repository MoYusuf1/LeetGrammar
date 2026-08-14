/**
 * Theme toggle — cycles light → dark → system.
 *
 * Warm paper is light-first, but the learner gets the last word; see
 * src/lib/theme.ts. Kept to one small control because it is the only setting
 * in the app that has to be reachable from the top of /learn.
 */

import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { applyTheme, getStoredTheme, type ThemeMode } from '@/lib/theme';

const ORDER: ThemeMode[] = ['light', 'dark', 'system'];

const ICON = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const;

const LABEL = {
  light: 'Light',
  dark: 'Dark',
  system: 'Match system',
} as const;

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('system');

  /* Read on mount rather than in useState's initializer: index.html has
     already applied the class before paint, so this only syncs the icon. */
  useEffect(() => setMode(getStoredTheme()), []);

  const next = () => {
    const value = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    applyTheme(value);
    setMode(value);
  };

  const Icon = ICON[mode];

  return (
    <button
      onClick={next}
      aria-label={`Theme: ${LABEL[mode]}. Tap to change.`}
      title={LABEL[mode]}
      className="flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-surface-sunken hover:text-ink"
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}
