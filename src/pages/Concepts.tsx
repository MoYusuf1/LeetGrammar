/**
 * Concept Explorer — browse all nodes in the knowledge graph.
 * Supports filtering by type and by source textbook.
 */

import { useNavigate } from 'react-router';
import { useMemo, useState } from 'react';
import { Search, BookOpen, Hash, MessageSquare, Wrench, Network } from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphInit } from '@/hooks/useGraphInit';
import SourceFilter from '@/components/SourceFilter';
import type { NodeType } from '@/engine/types';

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

export default function Concepts() {
  useGraphInit();
  const navigate = useNavigate();
  const { engine } = useGraphStore();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<NodeType | 'ALL'>('ALL');
  const [activeSources, setActiveSources] = useState<string[]>([]);

  // Auto-populate sources
  useMemo(() => {
    if (activeSources.length === 0) {
      const snapshot = engine.toSnapshot();
      const allSources = new Set(snapshot.edges.map((e) => e.qualifiers.source.textbookId));
      setActiveSources(Array.from(allSources));
    }
  }, [engine, activeSources.length]);

  const nodes = useMemo(() => {
    let result = engine.getAllNodes();
    if (filterType !== 'ALL') {
      result = result.filter((n) => n.type === filterType);
    }
    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter((n) =>
        Object.values(n.labels).some((l) => l?.toLowerCase().includes(lower))
      );
    }
    return result;
  }, [engine, query, filterType]);

  const typeCounts = useMemo(() => {
    const counts = new Map<NodeType, number>();
    for (const node of engine.getAllNodes()) {
      counts.set(node.type, (counts.get(node.type) ?? 0) + 1);
    }
    return counts;
  }, [engine]);

  const sourceCount = useMemo(() => {
    const snapshot = engine.toSnapshot();
    return new Set(snapshot.edges.map((e) => e.qualifiers.source.textbookId)).size;
  }, [engine]);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f]">
        <div className="max-w-[640px] mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Network size={18} className="text-[#ffa116]" />
            <h1 className="text-xl font-bold text-[#eff1f6]">Concept Explorer</h1>
          </div>
          <p className="text-xs text-[#8c8c8c]">
            {engine.stats.nodes} nodes · {engine.stats.edges} edges · {sourceCount} sources
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="px-4 pb-4">
        <div className="max-w-[640px] mx-auto space-y-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c]" />
            <input
              type="text"
              placeholder="Search concepts, words, examples..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl bg-[#141414] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
            />
          </div>

          {/* Source filter */}
          {sourceCount > 1 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                Sources
              </p>
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
        </div>
      </div>

      {/* Results */}
      <div className="px-4 pb-8">
        <div className="max-w-[640px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {nodes.map((node) => {
              const Icon = TYPE_ICONS[node.type] ?? BookOpen;
              const color = TYPE_COLORS[node.type] ?? '#8c8c8c';
              return (
                <button
                  key={node.id}
                  onClick={() => navigate(`/study/${node.id}`)}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] hover:border-[#ffffff15] transition-all text-left"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#eff1f6] truncate">{node.labels.default}</p>
                    {node.labels.english && (
                      <p className="text-xs text-[#8c8c8c] truncate">{node.labels.english}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{ color, backgroundColor: `${color}15` }}
                      >
                        {node.type}
                      </span>
                      {node.definitionCids.length > 0 && (
                        <span className="text-[9px] text-[#5c5c5c]">
                          {node.definitionCids.length} definition{node.definitionCids.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {nodes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-[#5c5c5c]">No concepts match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
