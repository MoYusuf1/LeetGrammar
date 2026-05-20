/**
 * Concept Explorer — wiki-style browse all nodes in the knowledge graph.
 * Supports filtering by type, category browsing, and alphabetical index.
 */

import { useNavigate } from 'react-router';
import { useMemo, useState, useCallback } from 'react';
import { Search, BookOpen, Hash, MessageSquare, Wrench, Network, Shuffle } from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphInit } from '@/hooks/useGraphInit';
import SourceFilter from '@/components/SourceFilter';
import type { Node, NodeType } from '@/engine/types';

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

const CATEGORY_COLORS: Record<string, string> = {
  phonology: '#a855f7',
  morphology: '#22c55e',
  syntax: '#3b82f6',
  pragmatics: '#f97316',
  semantics: '#ec4899',
  lexicon: '#14b8a6',
  grammar: '#eab308',
  phonetics: '#06b6d4',
  discourse: '#ef4444',
};

function getCategory(node: Node): string {
  const cat = node.attributes?.category;
  if (typeof cat === 'string' && cat) return cat.toLowerCase();
  if (node.type === 'EXAMPLE') return 'examples';
  if (node.type === 'WORD' || node.type === 'MORPHEME' || node.type === 'LEXICAL_ENTRY') return 'lexicon';
  if (node.type === 'LESSON' || node.type === 'TEXTBOOK') return 'course';
  return 'uncategorized';
}

function getInitial(node: Node): string {
  const label = node.labels.default || node.id;
  return label.charAt(0).toUpperCase();
}

export default function Concepts() {
  useGraphInit();
  const navigate = useNavigate();
  const { engine } = useGraphStore();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<NodeType | 'ALL'>('ALL');
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  // Auto-populate sources
  useMemo(() => {
    if (activeSources.length === 0) {
      const snapshot = engine.toSnapshot();
      const allSources = new Set(snapshot.edges.map((e) => e.qualifiers.source.textbookId));
      setActiveSources(Array.from(allSources));
    }
  }, [engine, activeSources.length]);

  const allNodes = useMemo(() => engine.getAllNodes(), [engine]);

  const filteredNodes = useMemo(() => {
    let result = allNodes;
    if (filterType !== 'ALL') {
      result = result.filter((n) => n.type === filterType);
    }
    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter((n) =>
        Object.values(n.labels).some((l) => l?.toLowerCase().includes(lower))
      );
    }
    if (activeLetter) {
      result = result.filter((n) => getInitial(n) === activeLetter);
    }
    return result;
  }, [allNodes, filterType, query, activeLetter]);

  const typeCounts = useMemo(() => {
    const counts = new Map<NodeType, number>();
    for (const node of allNodes) counts.set(node.type, (counts.get(node.type) ?? 0) + 1);
    return counts;
  }, [allNodes]);

  const sourceCount = useMemo(() => {
    const snapshot = engine.toSnapshot();
    return new Set(snapshot.edges.map((e) => e.qualifiers.source.textbookId)).size;
  }, [engine]);

  // Group by category
  const categoryGroups = useMemo(() => {
    const map = new Map<string, Node[]>();
    for (const node of filteredNodes) {
      const cat = getCategory(node);
      const list = map.get(cat) ?? [];
      list.push(node);
      map.set(cat, list);
    }
    // Sort categories alphabetically, but put uncategorized last
    const sorted = Array.from(map.entries()).sort((a, b) => {
      if (a[0] === 'uncategorized') return 1;
      if (b[0] === 'uncategorized') return -1;
      return a[0].localeCompare(b[0]);
    });
    // Sort nodes within each category alphabetically
    for (const [, list] of sorted) {
      list.sort((a, b) => (a.labels.default || a.id).localeCompare(b.labels.default || b.id));
    }
    return sorted;
  }, [filteredNodes]);

  // Alphabetical index
  const letters = useMemo(() => {
    const set = new Set<string>();
    for (const node of allNodes) set.add(getInitial(node));
    return Array.from(set).sort();
  }, [allNodes]);

  const toggleCategory = useCallback((cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const randomConcept = useCallback(() => {
    const concepts = allNodes.filter((n) => n.type === 'CONCEPT');
    if (concepts.length === 0) return;
    const pick = concepts[Math.floor(Math.random() * concepts.length)];
    navigate(`/study/${pick.id}`);
  }, [allNodes, navigate]);

  const isSearching = query.trim().length > 0 || activeLetter !== null;

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f]">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1">
              <Network size={18} className="text-[#ffa116]" />
              <h1 className="text-xl font-bold text-[#eff1f6]">Concept Wiki</h1>
            </div>
            <button
              onClick={randomConcept}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-[10px] text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors"
              title="Random concept"
            >
              <Shuffle size={12} />
              Random
            </button>
          </div>
          <p className="text-xs text-[#8c8c8c]">
            {engine.stats.nodes} nodes · {engine.stats.edges} edges · {sourceCount} sources
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="px-4 pb-4">
        <div className="max-w-[900px] mx-auto space-y-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c]" />
            <input
              type="text"
              placeholder="Search concepts, words, examples..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveLetter(null); }}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-[#141414] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
            />
          </div>

          {/* Source filter */}
          {sourceCount > 1 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Sources</p>
              <SourceFilter selected={activeSources} onChange={setActiveSources} />
            </div>
          )}

          {/* Type filters */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                filterType === 'ALL'
                  ? 'bg-[#ffffff15] text-[#eff1f6]'
                  : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
              }`}
            >
              All ({engine.stats.nodes})
            </button>
            {Array.from(typeCounts.entries()).map(([type, count]) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  filterType === type
                    ? 'bg-[#ffffff15] text-[#eff1f6]'
                    : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
                }`}
              >
                {type} ({count})
              </button>
            ))}
          </div>

          {/* Alphabetical index */}
          {!query.trim() && (
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setActiveLetter(null)}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  activeLetter === null
                    ? 'bg-[#ffa116]20 text-[#ffa116]'
                    : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
                }`}
              >
                ALL
              </button>
              {letters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                    activeLetter === letter
                      ? 'bg-[#ffa116]20 text-[#ffa116]'
                      : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 pb-8">
        <div className="max-w-[900px] mx-auto">
          {isSearching ? (
            /* Search results — flat grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredNodes.map((node) => (
                <ConceptCard key={node.id} node={node} />
              ))}
            </div>
          ) : (
            /* Browse by category */
            <div className="space-y-4">
              {categoryGroups.map(([category, nodes]) => {
                const isExpanded = expandedCategories.has(category) || categoryGroups.length <= 3;
                const catColor = CATEGORY_COLORS[category] ?? '#8c8c8c';
                return (
                  <div key={category} className="rounded-xl bg-[#141414] border border-[#ffffff08] overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#1a1a1a] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: catColor }}
                        />
                        <span className="text-sm font-semibold text-[#eff1f6] capitalize">{category}</span>
                        <span className="text-[10px] text-[#5c5c5c]">{nodes.length}</span>
                      </div>
                      <span className="text-[10px] text-[#5c5c5c]">
                        {isExpanded ? 'Collapse' : 'Expand'}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {nodes.map((node) => (
                            <ConceptCard key={node.id} node={node} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {filteredNodes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-[#5c5c5c]">No concepts match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ConceptCard({ node }: { node: Node }) {
  const navigate = useNavigate();
  const Icon = TYPE_ICONS[node.type] ?? BookOpen;
  const color = TYPE_COLORS[node.type] ?? '#8c8c8c';
  const category = getCategory(node);

  return (
    <button
      key={node.id}
      onClick={() => navigate(`/study/${node.id}`)}
      className="flex items-start gap-3 p-3 rounded-xl bg-[#0f0f0f] border border-[#ffffff06] hover:bg-[#1a1a1a] hover:border-[#ffffff15] transition-all text-left group"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon size={14} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#eff1f6] truncate group-hover:text-white transition-colors">
          {node.labels.default}
        </p>
        {node.labels.english && node.labels.english !== node.labels.default && (
          <p className="text-xs text-[#8c8c8c] truncate">{node.labels.english}</p>
        )}
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ color, backgroundColor: `${color}15` }}
          >
            {node.type}
          </span>
          <span className="text-[9px] text-[#5c5c5c] capitalize">{category}</span>
          {node.definitionCids.length > 0 && (
            <span className="text-[9px] text-[#5c5c5c]">
              {node.definitionCids.length} def
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
