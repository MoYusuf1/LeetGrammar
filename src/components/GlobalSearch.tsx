/**
 * Global Search — Command+K palette for the knowledge graph.
 *
 * Searches across nodes, chunks, and examples.
 * Grouped by type with keyboard navigation.
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Search, X, BookOpen, Hash, MessageSquare, Wrench, ArrowRight, Clock, Sparkles, Dumbbell } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { useGraphStore } from '@/stores/graph-store';
import type { Node, NodeType } from '@/engine/types';

interface SearchResult {
  node: Node;
  matchedLabel: string;
  matchType: 'label' | 'english' | 'somali' | 'chunk';
}

const TYPE_ICONS: Record<NodeType, typeof BookOpen> = {
  CONCEPT: BookOpen,
  MORPHEME: Hash,
  WORD: Hash,
  EXAMPLE: MessageSquare,
  RULE: Wrench,
  LESSON: BookOpen,
  TEXTBOOK: BookOpen,
  CONSTRUCTION: Wrench,
  LEXICAL_ENTRY: Hash,
};

const TYPE_COLORS: Record<NodeType, string> = {
  CONCEPT: '#3b82f6',
  MORPHEME: '#f97316',
  WORD: '#22c55e',
  EXAMPLE: '#a855f7',
  RULE: '#eab308',
  LESSON: '#06b6d4',
  TEXTBOOK: '#ef4444',
  CONSTRUCTION: '#ec4899',
  LEXICAL_ENTRY: '#14b8a6',
};

const TYPE_ORDER: NodeType[] = [
  'CONCEPT', 'MORPHEME', 'WORD', 'EXAMPLE', 'RULE', 'CONSTRUCTION', 'LESSON', 'TEXTBOOK', 'LEXICAL_ENTRY',
];

const RECENT_KEY = 'leet-somali-search-recent';
const MAX_RECENT = 6;

function getRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addRecent(nodeId: string) {
  const recent = getRecent().filter((id) => id !== nodeId);
  recent.unshift(nodeId);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const { engine, chunks } = useGraphStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const recentIds = useMemo(() => getRecent(), [open]);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const allNodes = engine.getAllNodes();
    const scored: Array<SearchResult & { score: number }> = [];

    for (const node of allNodes) {
      let score = 0;
      let matchType: SearchResult['matchType'] = 'label';

      // Exact label match = highest score
      if (node.labels.default.toLowerCase() === q) {
        score = 100;
        matchType = 'label';
      } else if (node.labels.default.toLowerCase().startsWith(q)) {
        score = 80;
        matchType = 'label';
      } else if (node.labels.default.toLowerCase().includes(q)) {
        score = 60;
        matchType = 'label';
      }

      // English label match
      if (node.labels.english?.toLowerCase().includes(q)) {
        score = Math.max(score, 50);
        matchType = 'english';
      }

      // Somali label match
      if (node.labels.somali?.toLowerCase().includes(q)) {
        score = Math.max(score, 70);
        matchType = 'somali';
      }

      // Chunk content match (lower score)
      if (score < 40) {
        for (const cid of node.definitionCids) {
          const chunk = chunks.get(cid);
          if (chunk?.payload.toLowerCase().includes(q)) {
            score = Math.max(score, 30);
            matchType = 'chunk';
            break;
          }
        }
      }

      if (score > 0) {
        scored.push({
          node,
          matchedLabel: node.labels.default,
          matchType,
          score,
        });
      }
    }

    // Sort by score descending, then by label
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.node.labels.default.localeCompare(b.node.labels.default);
    });

    return scored.slice(0, 20);
  }, [query, engine, chunks]);

  const grouped = useMemo(() => {
    const map = new Map<NodeType, SearchResult[]>();
    for (const r of results) {
      const list = map.get(r.node.type) ?? [];
      list.push(r);
      map.set(r.node.type, list);
    }
    // Sort by TYPE_ORDER
    const sorted = new Map<NodeType, SearchResult[]>();
    for (const type of TYPE_ORDER) {
      if (map.has(type)) {
        sorted.set(type, map.get(type)!);
      }
    }
    return sorted;
  }, [results]);

  const flatResults = useMemo(() => {
    const flat: SearchResult[] = [];
    for (const list of grouped.values()) {
      flat.push(...list);
    }
    return flat;
  }, [grouped]);

  const recentNodes = useMemo(() => {
    if (query.trim()) return [];
    return recentIds
      .map((id) => engine.getNode(id))
      .filter((n): n is Node => !!n);
  }, [recentIds, query, engine]);

  const handleSelect = useCallback(
    (nodeId: string) => {
      addRecent(nodeId);
      onOpenChange(false);
      setQuery('');
      navigate(`/wiki/${nodeId}`);
    },
    [navigate, onOpenChange]
  );

  const handleQuiz = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation();
      addRecent(nodeId);
      onOpenChange(false);
      setQuery('');
      navigate(`/quiz/${nodeId}`);
    },
    [navigate, onOpenChange]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = flatResults[selectedIndex];
        if (selected) {
          handleSelect(selected.node.id);
        }
      } else if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, flatResults, selectedIndex, handleSelect, onOpenChange]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

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

  const showRecent = !query.trim() && recentNodes.length > 0;
  const showEmpty = query.trim() && flatResults.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#141414] border-[#ffffff10] text-[#eff1f6] max-w-lg p-0 gap-0 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#ffffff08]">
          <Search size={16} className="text-[#5c5c5c] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search concepts, words, examples..."
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
          {/* Recent */}
          {showRecent && (
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1.5 px-2">
                <Clock size={10} className="inline mr-1" />
                Recent
              </p>
              {recentNodes.map((node) => {
                const Icon = TYPE_ICONS[node.type];
                const color = TYPE_COLORS[node.type];
                return (
                  <button
                    key={node.id}
                    onClick={() => handleSelect(node.id)}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#ffffff06] transition-colors text-left group"
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
                    >
                      <Icon size={13} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#c8c8c8] group-hover:text-[#eff1f6] truncate">
                        {node.labels.default}
                      </p>
                      <p className="text-[9px] text-[#5c5c5c]">{node.type}</p>
                    </div>
                    <ArrowRight size={12} className="text-[#3e3e3e] group-hover:text-[#8c8c8c] flex-shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Grouped results */}
          {Array.from(grouped.entries()).map(([type, items]) => {
            const Icon = TYPE_ICONS[type];
            const color = TYPE_COLORS[type];
            return (
              <div key={type} className="px-3 py-2">
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1.5 px-2">
                  {type} ({items.length})
                </p>
                {items.map((result) => {
                  const globalIndex = flatResults.indexOf(result);
                  const isSelected = globalIndex === selectedIndex;
                  return (
                    <button
                      key={result.node.id}
                      data-index={globalIndex}
                      onClick={() => handleSelect(result.node.id)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
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
                          {result.node.labels.default}
                        </p>
                        <p className="text-[9px] text-[#5c5c5c]">
                          {result.node.labels.english}
                          {result.matchType === 'chunk' && ' · found in content'}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {result.node.type === 'CONCEPT' && (
                          <button
                            onClick={(e) => handleQuiz(e, result.node.id)}
                            className="p-1 rounded hover:bg-[#ffffff10] text-[#3e3e3e] hover:text-[#ffa116] opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Quiz"
                          >
                            <Dumbbell size={12} />
                          </button>
                        )}
                        <ArrowRight size={12} className={`transition-colors ${isSelected ? 'text-[#8c8c8c]' : 'text-[#3e3e3e]'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* Empty state */}
          {showEmpty && (
            <div className="px-4 py-8 text-center">
              <Search size={24} className="text-[#3e3e3e] mx-auto mb-2" />
              <p className="text-sm text-[#8c8c8c]">No results for "{query}"</p>
              <p className="text-xs text-[#5c5c5c] mt-1">
                Try searching for a Somali word, concept, or example sentence
              </p>
            </div>
          )}

          {/* Initial state */}
          {!query.trim() && recentNodes.length === 0 && (
            <div className="px-4 py-8 text-center">
              <Sparkles size={24} className="text-[#3e3e3e] mx-auto mb-2" />
              <p className="text-sm text-[#8c8c8c]">Type to search the knowledge graph</p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                {['waa', 'focus', 'gender', 'articles', 'clitics'].map((term) => (
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
          <span>{engine.stats.nodes} nodes indexed</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
