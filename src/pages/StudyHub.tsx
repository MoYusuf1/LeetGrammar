/**
 * Study Hub — unified learning view for a single concept.
 *
 * Consolidates Learn, Wiki, Quiz, and Review into one page with tabs.
 * This is the foundation of Option C: a concept-centric learning experience.
 */

import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  BookOpen,
  BrainCircuit,
  Dumbbell,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Lock,
  Clock,
  ChevronRight,
  Circle,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphInit } from '@/hooks/useGraphInit';
import { useProgressStore } from '@/stores/progress-store';
import { generateQuiz } from '@/engine/quiz-generator';
import SourceBadge from '@/components/SourceBadge';

const TABS = [
  { id: 'learn', label: 'Learn', icon: GraduationCap },
  { id: 'wiki', label: 'Wiki', icon: BookOpen },
  { id: 'quiz', label: 'Quiz', icon: Dumbbell },
  { id: 'review', label: 'Review', icon: BrainCircuit },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function StudyHub() {
  useGraphInit();
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { engine, chunks } = useGraphStore();
  const srsCards = useProgressStore((s) => s.srsCards);

  const [activeTab, setActiveTab] = useState<TabId>('learn');

  const node = conceptId ? engine.getNode(conceptId) : undefined;

  const prerequisites = useMemo(() => {
    if (!conceptId) return [];
    return engine.getEdgesTo(conceptId)
      .filter((e) => e.type === 'REQUIRES')
      .map((e) => engine.getNode(e.from))
      .filter((n): n is import('@/engine/types').Node => !!n);
  }, [engine, conceptId]);

  const nextConcepts = useMemo(() => {
    if (!conceptId) return [];
    return engine.getEdgesFrom(conceptId)
      .filter((e) => e.type === 'REQUIRES')
      .map((e) => engine.getNode(e.to))
      .filter((n): n is import('@/engine/types').Node => !!n);
  }, [engine, conceptId]);

  const examples = useMemo(() => {
    if (!conceptId) return [];
    return engine.getEdgesTo(conceptId)
      .filter((e) => e.type === 'EXEMPLIFIES')
      .map((e) => ({ edge: e, node: engine.getNode(e.from) }))
      .filter((item): item is { edge: typeof item.edge; node: NonNullable<typeof item.node> } => !!item.node);
  }, [engine, conceptId]);

  const constructions = useMemo(() => {
    if (!conceptId) return [];
    return engine.getConstructionsForNode(conceptId);
  }, [engine, conceptId]);

  const quiz = useMemo(() => {
    if (!conceptId) return null;
    return generateQuiz(engine, chunks, conceptId, 5);
  }, [engine, chunks, conceptId]);

  const srsCard = conceptId ? srsCards[conceptId] : undefined;
  const isDue = srsCard ? srsCard.dueDate <= new Date().toISOString().split('T')[0] : false;

  if (!node) {
    return (
      <div className="min-h-full bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-sm text-[#8c8c8c]">Concept not found</p>
          <button
            onClick={() => navigate('/concepts')}
            className="mt-3 text-xs text-[#ffa116] hover:underline"
          >
            Browse all concepts
          </button>
        </div>
      </div>
    );
  }

  const color = TYPE_COLORS[node.type];

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="text-xs font-medium">Back</span>
            </button>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                  style={{ color, backgroundColor: `${color}15` }}
                >
                  {node.type}
                </span>
                {node.labels.somali && (
                  <span className="text-xs text-[#5c5c5c]">{node.labels.somali}</span>
                )}
              </div>
              <h1 className="text-xl font-bold text-[#eff1f6]">{node.labels.default}</h1>
              {node.labels.english && node.labels.english !== node.labels.default && (
                <p className="text-xs text-[#8c8c8c] mt-0.5">{node.labels.english}</p>
              )}
            </div>

            {srsCard && (
              <div className="flex items-center gap-1.5 text-[10px]">
                {isDue ? (
                  <>
                    <Clock size={12} className="text-[#ffa116]" />
                    <span className="text-[#ffa116]">Due for review</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={12} className="text-[#22c55e]" />
                    <span className="text-[#22c55e]">Mastered</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 mt-4">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-[#eff1f6] bg-[#ffffff12]'
                      : 'text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#ffffff06]'
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

      {/* Content */}
      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto">
          {activeTab === 'learn' && (
            <LearnTab
              node={node}
              prerequisites={prerequisites}
              nextConcepts={nextConcepts}
              onNavigate={(id) => navigate(`/study/${id}`)}
            />
          )}

          {activeTab === 'wiki' && (
            <WikiTab
              node={node}
              examples={examples}
              constructions={constructions}
              chunks={chunks}
              engine={engine}
              onNavigate={(id) => navigate(`/study/${id}`)}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizTab quiz={quiz} onStart={() => navigate(`/quiz/${conceptId}`)} />
          )}

          {activeTab === 'review' && (
            <ReviewTab
              srsCard={srsCard}
              isDue={isDue}
              onReview={() => navigate(`/review`)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Learn Tab ─── */

function LearnTab({
  node,
  prerequisites,
  nextConcepts,
  onNavigate,
}: {
  node: import('@/engine/types').Node;
  prerequisites: import('@/engine/types').Node[];
  nextConcepts: import('@/engine/types').Node[];
  onNavigate: (id: string) => void;
}) {
  const { engine } = useGraphStore();
  const { srsCards } = useProgressStore();

  // Build the longest prerequisite path from root to this concept
  const prerequisitePath = useMemo(() => {
    const path: import('@/engine/types').Node[] = [];
    const visited = new Set<string>();

    function dfs(currentId: string): boolean {
      if (visited.has(currentId)) return false;
      visited.add(currentId);

      const n = engine.getNode(currentId);
      if (!n) return false;

      // Get prerequisites sorted by how many things depend on them (most central first)
      const prereqs = engine.getEdgesTo(currentId, { type: 'REQUIRES' });
      if (prereqs.length === 0) {
        path.push(n);
        return true;
      }

      // Sort by number of downstream dependents (bottleneck first)
      const sorted = prereqs
        .map((e) => ({ edge: e, node: engine.getNode(e.from) }))
        .filter((item): item is { edge: typeof item.edge; node: NonNullable<typeof item.node> } => !!item.node)
        .sort((a, b) => {
          const aDeps = engine.getEdgesFrom(a.node.id, { type: 'REQUIRES' }).length;
          const bDeps = engine.getEdgesFrom(b.node.id, { type: 'REQUIRES' }).length;
          return bDeps - aDeps;
        });

      for (const { node: prereqNode } of sorted) {
        if (dfs(prereqNode.id)) {
          path.push(n);
          return true;
        }
      }

      return false;
    }

    dfs(node.id);
    return path;
  }, [engine, node.id]);

  function statusOf(id: string): 'mastered' | 'ready' | 'locked' {
    const card = srsCards[id];
    if (card && card.mastery >= 3) return 'mastered';

    const prereqEdges = engine.getEdgesTo(id, { type: 'REQUIRES' });
    if (prereqEdges.length === 0) return node.id === id ? 'ready' : 'locked';

    const allMastered = prereqEdges.every((e) => {
      const c = srsCards[e.from];
      return c && c.mastery >= 3;
    });

    return allMastered ? 'ready' : 'locked';
  }

  return (
    <div className="space-y-5">
      {/* Prerequisite Path */}
      {prerequisitePath.length > 1 && (
        <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Learning Path</p>
          <div className="flex flex-col gap-2">
            {prerequisitePath.map((n, i) => {
              const status = statusOf(n.id);
              const isLast = i === prerequisitePath.length - 1;
              return (
                <div key={n.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    {status === 'mastered' ? (
                      <CheckCircle2 size={14} className="text-[#22c55e] flex-shrink-0" />
                    ) : status === 'ready' ? (
                      <Circle size={14} className="text-[#ffa116] flex-shrink-0" />
                    ) : (
                      <Lock size={14} className="text-[#5c5c5c] flex-shrink-0" />
                    )}
                    <button
                      onClick={() => onNavigate(n.id)}
                      className={`text-xs hover:underline transition-colors ${
                        isLast ? 'font-semibold text-[#eff1f6]' : 'text-[#8c8c8c]'
                      }`}
                    >
                      {n.labels.default}
                    </button>
                  </div>
                  {!isLast && (
                    <ChevronRight size={12} className="text-[#3e3e3e] flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Direct Prerequisites */}
      {prerequisites.length > 0 && (
        <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Prerequisites</p>
          <div className="flex flex-wrap gap-2">
            {prerequisites.map((p) => {
              const status = statusOf(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => onNavigate(p.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
                    status === 'mastered'
                      ? 'bg-[#22c55e10] border-[#22c55e30] text-[#22c55e]'
                      : status === 'ready'
                      ? 'bg-[#ffa11610] border-[#ffa11630] text-[#ffa116]'
                      : 'bg-[#0f0f0f] border-[#ffffff08] text-[#c8c8c8] hover:text-[#eff1f6] hover:border-[#ffffff15]'
                  }`}
                >
                  {status === 'mastered' ? (
                    <CheckCircle2 size={11} />
                  ) : status === 'ready' ? (
                    <Sparkles size={11} />
                  ) : (
                    <Lock size={11} />
                  )}
                  {p.labels.default}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Concept summary */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Summary</p>
        <p className="text-sm text-[#c8c8c8] leading-relaxed">
          {(node.attributes.description as string) || `Learn about ${node.labels.default} and how it functions in Somali grammar.`}
        </p>
      </div>

      {/* Next up */}
      {nextConcepts.length > 0 && (
        <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Next Up</p>
          <div className="flex flex-wrap gap-2">
            {nextConcepts.map((n) => (
              <button
                key={n.id}
                onClick={() => onNavigate(n.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-xs text-[#c8c8c8] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors"
              >
                <Sparkles size={11} className="text-[#ffa116]" />
                {n.labels.default}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Wiki Tab ─── */

function WikiTab({
  node,
  examples,
  constructions,
  chunks,
  engine,
  onNavigate,
}: {
  node: import('@/engine/types').Node;
  examples: { edge: import('@/engine/types').Edge; node: import('@/engine/types').Node }[];
  constructions: import('@/engine/types').Construction[];
  chunks: import('@/engine/chunk-store').ChunkStore;
  engine: import('@/engine/graph-engine').GraphEngine;
  onNavigate: (id: string) => void;
}) {
  const definitions = node.definitionCids
    .map((cid) => chunks.get(cid))
    .filter((def): def is NonNullable<typeof def> => !!def);

  return (
    <div className="space-y-5">
      {/* Definitions */}
      {definitions.length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Definition</p>
          {definitions.map((def) => (
            <div key={def.cid} className="text-sm text-[#c8c8c8] leading-relaxed">
              {def.contentType === 'text/markdown' ? (
                <div className="whitespace-pre-wrap">{def.payload}</div>
              ) : (
                def.payload
              )}
            </div>
          ))}
        </div>
      )}

      {/* Examples */}
      {examples.length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Examples</p>
          {examples.slice(0, 5).map(({ edge, node: exNode }) => {
            const chunk = exNode.definitionCids[0] ? chunks.get(exNode.definitionCids[0]) : undefined;
            return (
              <div key={edge.id} className="rounded-lg bg-[#141414] border border-[#ffffff08] p-3.5">
                <p className="text-sm text-[#eff1f6] font-medium">{exNode.labels.default}</p>
                {exNode.labels.english && (
                  <p className="text-xs text-[#8c8c8c] mt-1">{exNode.labels.english}</p>
                )}
                {chunk && <p className="text-xs text-[#5c5c5c] mt-1.5 leading-relaxed">{chunk.payload}</p>}
                <div className="mt-2">
                  <SourceBadge qualifiers={edge.qualifiers} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Constructions */}
      {constructions.length > 0 && (
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Constructions</p>
          {constructions.map((c) => (
            <div key={c.id} className="rounded-lg bg-[#141414] border border-[#ffffff08] p-3.5">
              <p className="text-xs font-semibold text-[#eff1f6]">{c.name}</p>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                {c.members
                  .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                  .map((m) => {
                    const memberNode = engine.getNode(m.nodeId);
                    const isSlot = m.nodeId.startsWith('slot:');
                    return (
                      <span key={m.nodeId} className="text-[10px] text-[#8c8c8c]">
                        {memberNode?.labels.default ?? m.nodeId}
                        {!isSlot && <span className="text-[#5c5c5c] ml-0.5">({m.role})</span>}
                      </span>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => onNavigate(node.id)}
        className="text-xs text-[#ffa116] hover:underline"
      >
        Read full article →
      </button>
    </div>
  );
}

/* ─── Quiz Tab ─── */

function QuizTab({
  quiz,
  onStart,
}: {
  quiz: ReturnType<typeof generateQuiz> | null;
  onStart: () => void;
}) {
  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="text-center py-10">
        <BrainCircuit size={32} className="text-[#3e3e3e] mx-auto mb-3" />
        <p className="text-sm text-[#8c8c8c]">No quiz available for this concept yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#eff1f6]">{quiz.title}</p>
            <p className="text-xs text-[#8c8c8c] mt-1">{quiz.questions.length} questions</p>
          </div>
          <button
            onClick={onStart}
            className="px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {quiz.questions.slice(0, 3).map((q) => (
          <div key={q.id} className="rounded-lg bg-[#0f0f0f] border border-[#ffffff06] p-3">
            <p className="text-xs text-[#8c8c8c]">{q.question}</p>
          </div>
        ))}
        {quiz.questions.length > 3 && (
          <p className="text-[10px] text-[#5c5c5c] text-center">+{quiz.questions.length - 3} more</p>
        )}
      </div>
    </div>
  );
}

/* ─── Review Tab ─── */

function ReviewTab({
  srsCard,
  isDue,
  onReview,
}: {
  srsCard?: import('@/engine/srs').SrsCard;
  isDue: boolean;
  onReview: () => void;
}) {
  if (!srsCard) {
    return (
      <div className="text-center py-10">
        <BrainCircuit size={32} className="text-[#3e3e3e] mx-auto mb-3" />
        <p className="text-sm text-[#8c8c8c]">No review card for this concept yet.</p>
        <p className="text-xs text-[#5c5c5c] mt-2">Complete a quiz to add it to your review deck.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-[#eff1f6]">SRS Status</p>
          <p className="text-xs text-[#8c8c8c] mt-1">
            Mastery: {srsCard.mastery}/5 · Interval: {srsCard.interval} days
          </p>
        </div>
        {isDue ? (
          <button
            onClick={onReview}
            className="px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors"
          >
            Review Now
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-[#22c55e]">
            <CheckCircle2 size={14} />
            <span>Not due until {srsCard.dueDate}</span>
          </div>
        )}
      </div>

      <div className="h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#ffa116]"
          style={{ width: `${(srsCard.mastery / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

const TYPE_COLORS: Record<string, string> = {
  CONCEPT: '#3b82f6',
  MORPHEME: '#a855f7',
  WORD: '#22c55e',
  EXAMPLE: '#eab308',
  RULE: '#f97316',
  LESSON: '#ec4899',
  TEXTBOOK: '#6366f1',
};
