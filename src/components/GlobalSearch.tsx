/**
 * Global Search — Command+K palette.
 *
 * Searches lessons and vocabulary (in-memory, static data — no store needed).
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Search, X, BookOpen, Languages, ArrowRight, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { LESSON_LIST } from '@/data/teaching-content';
import { TOP_500_WORDS } from '@/data/vocabulary';

interface LessonResult {
  kind: 'lesson';
  lessonId: number;
  title: string;
}

interface VocabResult {
  kind: 'vocab';
  lessonId: number;
  somali: string;
  english: string;
}

type SearchResult = LessonResult | VocabResult;

function resultKey(r: SearchResult): string {
  return r.kind === 'lesson' ? `lesson-${r.lessonId}` : `vocab-${r.somali}-${r.lessonId}`;
}

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Reset selection when the query changes — derived during render (not an
  // effect) per https://react.dev/learn/you-might-not-need-an-effect
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSelectedIndex(0);
  }

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const scored: Array<{ result: SearchResult; score: number }> = [];

    for (const lesson of LESSON_LIST) {
      const title = lesson.title.toLowerCase();
      let score = 0;
      if (title === q) score = 100;
      else if (title.startsWith(q)) score = 80;
      else if (title.includes(q)) score = 60;
      if (score > 0) {
        scored.push({ result: { kind: 'lesson', lessonId: lesson.lessonId, title: lesson.title }, score });
      }
    }

    for (const word of TOP_500_WORDS) {
      const somali = word.somali.toLowerCase();
      const english = word.english.toLowerCase();
      let score = 0;
      if (somali === q || english === q) score = 90;
      else if (somali.startsWith(q) || english.startsWith(q)) score = 70;
      else if (somali.includes(q) || english.includes(q)) score = 50;
      if (score > 0) {
        scored.push({
          result: { kind: 'vocab', lessonId: word.lessonId, somali: word.somali, english: word.english },
          score,
        });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 20).map((s) => s.result);
  }, [query]);

  const handleSelect = useCallback(
    (lessonId: number) => {
      onOpenChange(false);
      setQuery('');
      navigate(`/lesson/${lessonId}`);
    },
    [navigate, onOpenChange]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) handleSelect(selected.lessonId);
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, results, selectedIndex, handleSelect, onOpenChange]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll selected into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const showEmpty = query.trim() && results.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141414] border-[#ffffff10] text-[#eff1f6] max-w-lg p-0 gap-0 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#ffffff08]">
          <Search size={16} className="text-[#5c5c5c] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons and vocabulary..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-[#ffffff08] text-[#5c5c5c] hover:text-[#eff1f6]"
            >
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-[#5c5c5c] bg-[#1a1a1a] border border-[#ffffff08]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[400px] overflow-y-auto">
          {results.length > 0 && (
            <div className="px-3 py-2">
              {results.map((result, index) => {
                const isSelected = index === selectedIndex;
                const Icon = result.kind === 'lesson' ? BookOpen : Languages;
                const color = result.kind === 'lesson' ? '#3b82f6' : '#22c55e';
                const label = result.kind === 'lesson' ? result.title : result.somali;
                const sublabel =
                  result.kind === 'lesson'
                    ? `Lesson ${result.lessonId}`
                    : `${result.english} · Lesson ${result.lessonId}`;
                return (
                  <button
                    key={resultKey(result)}
                    data-index={index}
                    onClick={() => handleSelect(result.lessonId)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors text-left group ${
                      isSelected ? 'bg-[#ffffff08]' : 'hover:bg-[#ffffff04]'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${color}15`,
                        border: `1px solid ${isSelected ? color + '50' : color + '25'}`,
                      }}
                    >
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs truncate ${isSelected ? 'text-[#eff1f6]' : 'text-[#c8c8c8] group-hover:text-[#eff1f6]'}`}>
                        {label}
                      </p>
                      <p className="text-[9px] text-[#5c5c5c]">{sublabel}</p>
                    </div>
                    <ArrowRight size={12} className={`transition-colors flex-shrink-0 ${isSelected ? 'text-[#8c8c8c]' : 'text-[#3e3e3e]'}`} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Empty state */}
          {showEmpty && (
            <div className="px-4 py-8 text-center">
              <Search size={24} className="text-[#3e3e3e] mx-auto mb-2" />
              <p className="text-sm text-[#8c8c8c]">No results for "{query}"</p>
              <p className="text-xs text-[#5c5c5c] mt-1">
                Try searching for a Somali word, its English meaning, or a lesson title
              </p>
            </div>
          )}

          {/* Initial state */}
          {!query.trim() && (
            <div className="px-4 py-8 text-center">
              <Sparkles size={24} className="text-[#3e3e3e] mx-auto mb-2" />
              <p className="text-sm text-[#8c8c8c]">Type to search lessons and vocabulary</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['waa', 'nouns', 'pronouns', 'nabad', 'articles'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-[10px] px-2 py-1 rounded-md bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="px-4 py-2 border-t border-[#ffffff08] flex items-center justify-between text-[10px] text-[#5c5c5c]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 rounded bg-[#1a1a1a] border border-[#ffffff08]">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 rounded bg-[#1a1a1a] border border-[#ffffff08]">↵</kbd>
              Open
            </span>
          </div>
          <span>{LESSON_LIST.length} lessons indexed</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
