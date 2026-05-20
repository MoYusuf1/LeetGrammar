import { useState, useCallback } from 'react';

export type WikiLayout = 'classic' | 'cards' | 'stream';

const STORAGE_KEY = 'leet-grammar:wiki-layout';

export function useWikiLayout(): {
  layout: WikiLayout;
  setLayout: (layout: WikiLayout) => void;
  layouts: { id: WikiLayout; label: string; description: string }[];
} {
  const [layout, setLayoutState] = useState<WikiLayout>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'classic' || stored === 'cards' || stored === 'stream') return stored;
    } catch { /* ignore */ }
    return 'classic';
  });

  const setLayout = useCallback((next: WikiLayout) => {
    setLayoutState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch { /* ignore */ }
  }, []);

  const layouts = [
    { id: 'classic' as WikiLayout, label: 'Classic', description: 'Wikipedia-style with TOC sidebar and infobox' },
    { id: 'cards' as WikiLayout, label: 'Cards', description: 'Duolingo-inspired progressive card layout' },
    { id: 'stream' as WikiLayout, label: 'Stream', description: 'Babbel-inspired flowing single-column stream' },
  ];

  return { layout, setLayout, layouts };
}
