/**
 * Learn Page — unified hub for Lessons, Concepts, and Review.
 *
 * Tabs:
 *   · Lessons  — guided grammar units (was /learn)
 *   · Concepts — concept explorer + wiki browser (was /concepts)
 *   · Review   — SRS dashboard (was /review)
 */

import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  BookOpen,
  Network,
  BrainCircuit,
  Zap,
  Search,
  RotateCcw,
  Clock,
  Award,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphInit } from '@/hooks/useGraphInit';
import { useGraphSrs } from '@/hooks/useGraphSrs';
import SourceFilter from '@/components/SourceFilter';
import type { NodeType } from '@/engine/types';
import { MockB_BabbelGrid } from '@/components/learn-mocks';

const TYPE_ICONS: Record<NodeType, typeof BookOpen> = {
  CONCEPT: BookOpen,
  MORPHEME: Search,
  WORD: Search,
  EXAMPLE: Search,
  RULE: Search,
  LESSON: BookOpen,
  TEXTBOOK: BookOpen,
  CONSTRUCTION: Search,
  LEXICAL_ENTRY: Search,
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

type TabKey = 'lessons' | 'concepts' | 'review';

const TABS: { key: TabKey; label: string; icon: typeof BookOpen }[] = [
  { key: 'lessons', label: 'Lessons', icon: BookOpen },
  { key: 'concepts', label: 'Concepts', icon: Network },
  { key: 'review', label: 'Review', icon: BrainCircuit },
];

export default function Learn() {
  useGraphInit();
  const [activeTab, setActiveTab] = useState<TabKey>('lessons');

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header with tabs */}
      <div className="px-4 pt-4 pb-0 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-[#eff1f6]">Learn Grammar</h1>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 -mb-px">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'text-[#eff1f6] border-[#ffa116]'
                      : 'text-[#8c8c8c] border-transparent hover:text-[#c8c8c8]'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 py-5">
        <div className="max-w-[900px] mx-auto">
          {activeTab === 'lessons' && <MockB_BabbelGrid />}
          {activeTab === 'concepts' && <ConceptsTab />}
          {activeTab === 'review' && <ReviewTab />}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  CONCEPTS TAB                                                             */
/* ────────────────────────────────────────────────────────────────────────── */

function ConceptsTab() {
  const navigate = useNavigate();
  const { engine } = useGraphStore();
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<NodeType | 'ALL'>('ALL');
  const [activeSources, setActiveSources] = useState<string[]>([]);

  useMemo(() => {
    if (activeSources.length === 0) {
      const snapshot = engine.toSnapshot();
      const allSources = new Set(snapshot.edges.map((e) => e.qualifiers.source.textbookId));
      setActiveSources(Array.from(allSources));
    }
  }, [engine, activeSources.length]);

  const nodes = useMemo(() => {
    let result = engine.getAllNodes();
    if (filterType !== 'ALL') result = result.filter((n) => n.type === filterType);
    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter((n) => Object.values(n.labels).some((l) => l?.toLowerCase().includes(lower)));
    }
    return result;
  }, [engine, query, filterType]);

  const typeCounts = useMemo(() => {
    const counts = new Map<NodeType, number>();
    for (const node of engine.getAllNodes()) counts.set(node.type, (counts.get(node.type) ?? 0) + 1);
    return counts;
  }, [engine]);

  const sourceCount = useMemo(() => {
    const snapshot = engine.toSnapshot();
    return new Set(snapshot.edges.map((e) => e.qualifiers.source.textbookId)).size;
  }, [engine]);

  return (
    <div className="space-y-4">
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
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Sources</p>
          <SourceFilter selected={activeSources} onChange={setActiveSources} />
        </div>
      )}

      {/* Type filters */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-colors ${
            filterType === 'ALL' ? 'bg-[#ffffff15] text-[#eff1f6]' : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
          }`}
        >
          All ({engine.stats.nodes})
        </button>
        {Array.from(typeCounts.entries()).map(([type, count]) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              filterType === type ? 'bg-[#ffffff15] text-[#eff1f6]' : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
            }`}
          >
            {type} ({count})
          </button>
        ))}
      </div>

      {/* Results */}
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}>
                <Icon size={14} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#eff1f6] truncate">{node.labels.default}</p>
                {node.labels.english && <p className="text-xs text-[#8c8c8c] truncate">{node.labels.english}</p>}
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color, backgroundColor: `${color}15` }}>
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
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  REVIEW TAB                                                               */
/* ────────────────────────────────────────────────────────────────────────── */

function ReviewTab() {
  const navigate = useNavigate();
  const { engine } = useGraphStore();
  const { dueConcepts, learningFrontier, stats } = useGraphSrs();

  const startSession = useCallback(
    (conceptIds: string[]) => {
      const params = new URLSearchParams();
      params.set('concepts', conceptIds.join(','));
      navigate(`/review?${params.toString()}`);
    },
    [navigate]
  );

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={<Clock size={14} className="text-[#ef4444]" />} label="Due Today" value={stats.dueToday} />
        <StatCard icon={<Zap size={14} className="text-[#eab308]" />} label="Learning" value={stats.learning} />
        <StatCard icon={<Award size={14} className="text-[#22c55e]" />} label="Mastered" value={stats.mastered} />
        <StatCard icon={<TrendingUp size={14} className="text-[#3b82f6]" />} label="Avg Mastery" value={`${(stats.avgMastery * 100).toFixed(0)}%`} />
      </div>

      {/* Due Concepts */}
      {dueConcepts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Due for Review ({dueConcepts.length})</p>
            <button
              onClick={() => startSession(dueConcepts.map((c) => c.conceptId))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-semibold hover:bg-[#ffb800] transition-colors"
            >
              <RotateCcw size={12} /> Review All
            </button>
          </div>
          <div className="space-y-1.5">
            {dueConcepts.map((state) => {
              const node = engine.getNode(state.conceptId);
              if (!node) return null;
              return (
                <button
                  key={state.conceptId}
                  onClick={() => startSession([state.conceptId])}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a] transition-all text-left"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${masteryColor(state.mastery)}15`, border: `1px solid ${masteryColor(state.mastery)}30` }}
                  >
                    <span className="text-xs font-bold" style={{ color: masteryColor(state.mastery) }}>
                      {(state.mastery * 100).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#eff1f6] truncate">{node.labels.default}</p>
                    <p className="text-[10px] text-[#5c5c5c]">
                      Stability: {state.stability.toFixed(1)}d · Retrievability: {(state.retrievability * 100).toFixed(0)}%
                    </p>
                  </div>
                  <ChevronRight size={14} className="text-[#3e3e3e] flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Learning Frontier */}
      {learningFrontier.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Ready to Learn ({learningFrontier.length})</p>
            <button
              onClick={() => navigate(`/study/${learningFrontier[0].conceptId}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] text-xs font-semibold hover:bg-[#222222] transition-colors"
            >
              <Sparkles size={12} /> Start
            </button>
          </div>
          <div className="space-y-1.5">
            {learningFrontier.slice(0, 8).map((item) => (
              <button
                key={item.conceptId}
                onClick={() => navigate(`/study/${item.conceptId}`)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a] transition-all text-left"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#3b82f6]10 border border-[#3b82f6]25">
                  <Sparkles size={13} className="text-[#3b82f6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#eff1f6] truncate">{item.label}</p>
                  <p className="text-[10px] text-[#5c5c5c]">Depth {item.depth} · {item.conceptId.replace(/^concept:/, '')}</p>
                </div>
                <ChevronRight size={14} className="text-[#3e3e3e] flex-shrink-0" />
              </button>
            ))}
            {learningFrontier.length > 8 && (
              <p className="text-[10px] text-[#5c5c5c] text-center py-1">+{learningFrontier.length - 8} more concepts</p>
            )}
          </div>
        </section>
      )}

      {dueConcepts.length === 0 && learningFrontier.length === 0 && (
        <div className="text-center py-12">
          <BrainCircuit size={40} className="text-[#3e3e3e] mx-auto mb-3" />
          <p className="text-sm text-[#8c8c8c]">No concepts ready for review.</p>
          <p className="text-xs text-[#5c5c5c] mt-1">Complete lessons to build your review queue.</p>
          <button
            onClick={() => navigate('/problems')}
            className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
          >
            Start Learning
          </button>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 text-center">
      <div className="flex items-center justify-center gap-1.5 mb-1.5">
        {icon}
        <span className="text-[10px] text-[#5c5c5c] font-medium">{label}</span>
      </div>
      <p className="text-xl font-bold text-[#eff1f6]">{value}</p>
    </div>
  );
}

function masteryColor(mastery: number): string {
  if (mastery >= 0.8) return '#22c55e';
  if (mastery >= 0.5) return '#3b82f6';
  if (mastery >= 0.2) return '#eab308';
  return '#ef4444';
}
