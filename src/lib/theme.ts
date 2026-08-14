/**
 * Theme mode — light, dark, or follow the OS.
 *
 * Warm paper is light-first, but "light-first" is a design stance, not a
 * decision to make on the learner's behalf at 11pm. Default is `system`.
 *
 * The class goes on <html>, matching the selectors in src/index.css:
 *   .light / .dark  → explicit choice, wins over the media query
 *   neither         → :root:not(.light):not(.dark) follows prefers-color-scheme
 *
 * index.html applies the stored value before first paint. If you change the
 * storage key here, change it there too — that inline script cannot import.
 */

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'lg-theme';

export function getStoredTheme(): ThemeMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    /* private mode / storage disabled — follow the OS */
    return 'system';
  }
}

export function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  if (mode !== 'system') root.classList.add(mode);

  try {
    if (mode === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    /* the class is applied either way; only the memory is lost */
  }
}

/** What the learner actually sees right now, resolving `system`. */
export function resolvedTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode !== 'system') return mode;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
