/**
 * Review Page v2 — Graph-Aware SRS with FIRe-style implicit repetition.
 *
 * Ratings: 0=Again, 1=Hard, 2=Good, 3=Easy
 * Mastery: continuous [0,1]
 * Implicit updates: credit travels down prerequisites, penalties travel up
 */

import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  BrainCircuit,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
  Zap,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphSrs } from '@/hooks/useGraphSrs';
import type { ReviewRating, ReviewResult } from '@/engine/graph-srs';

const RATING_INFO: Record<ReviewRating, { label: string; color: string; desc: string }> = {
  0: { label: 'Again', color: '#ef4444', desc: 'Forgot it' },
  1: { label: 'Hard', color: '#f97316', desc: 'Struggled' },
  2: { label: 'Good', color: '#22c55e', desc: 'Got it' },
  3: { label: 'Easy', color: '#3b82f6', desc: 'Effortless' },
};

export default function Review() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { engine, chunks } = useGraphStore();
  const { states, dueConcepts, learningFrontier, stats, review, initConcept } =
    useGraphSrs();

  const [sessionActive, setSessionActive] = useState(false);
  const [sessionConcepts, setSessionConcepts] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [lastResult, setLastResult] = useState<ReviewResult | null>(null);
  const [sessionResults, setSessionResults] = useState<Record<string, ReviewRating>>({});

  const currentConceptId = sessionConcepts[currentIndex];
  const currentNode = currentConceptId ? engine.getNode(currentConceptId) : undefined;
  const currentState = currentConceptId ? states.get(currentConceptId) : undefined;

  const startSession = useCallback(
    (conceptIds: string[]) => {
      for (const id of conceptIds) {
        if (!states.has(id)) initConcept(id);
      }
      setSessionConcepts(conceptIds);
      setCurrentIndex(0);
      setFlipped(false);
      setLastResult(null);
      setSessionResults({});
      setSessionActive(true);
    },
    [states, initConcept]
  );

  // Auto-start session from query params
  useEffect(() => {
    const conceptsParam = searchParams.get('concepts');
    if (conceptsParam && !sessionActive && sessionConcepts.length === 0) {
      const ids = conceptsParam.split(',').filter(Boolean);
      if (ids.length > 0) {
        startSession(ids);
      }
    }
  }, [searchParams, sessionActive, sessionConcepts.length, startSession]);

  const handleFlip = useCallback(() => {
    setFlipped(true);
  }, []);

  const handleRate = useCallback(
    (rating: ReviewRating) => {
      const conceptId = sessionConcepts[currentIndex];
      if (!conceptId) return;

      const result = review(conceptId, rating);
      setLastResult(result);
      setSessionResults((prev) => ({ ...prev, [conceptId]: rating }));

      if (currentIndex < sessionConcepts.length - 1) {
        setCurrentIndex((i) => i + 1);
        setFlipped(false);
      } else {
        setSessionActive(false);
      }
    },
    [sessionConcepts, currentIndex, review]
  );

  const handleRestart = useCallback(() => {
    setSessionActive(false);
    setSessionConcepts([]);
    setCurrentIndex(0);
    setFlipped(false);
    setLastResult(null);
    setSessionResults({});
  }, []);

  // Session complete screen
  if (!sessionActive && sessionConcepts.length > 0 && Object.keys(sessionResults).length > 0) {
    const total = sessionConcepts.length;
    const goodCount = Object.values(sessionResults).filter((q) => q >= 2).length;

    return (
      <div className="min-h-full bg-[#0f0f0f] px-4 py-8">
        <div className="max-w-[640px] mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#22c55e]15 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} className="text-[#22c55e]" />
          </div>
          <h1 className="text-2xl font-bold text-[#eff1f6]">Session Complete</h1>
          <p className="text-sm text-[#8c8c8c] mt-2">
            {goodCount} / {total} concepts recalled successfully
          </p>

          {lastResult && lastResult.implicitUpdates.length > 0 && (
            <div className="mt-6 rounded-xl bg-[#141414] border border-[#ffffff08] p-4 text-left max-w-[400px] mx-auto">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">
                Graph Updates
              </p>
              <div className="space-y-1.5">
                {lastResult.implicitUpdates.slice(0, 5).map((u) => (
                  <div key={u.conceptId} className="flex items-center gap-2 text-xs">
                    {u.direction === 'down' ? (
                      <ArrowDown size={12} className="text-[#22c55e]" />
                    ) : (
                      <ArrowUp size={12} className="text-[#ef4444]" />
                    )}
                    <span className={u.credit > 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}>
                      {u.credit > 0 ? '+' : ''}
                      {(u.credit * 100).toFixed(0)}%
                    </span>
                    <span className="text-[#8c8c8c]">
                      {engine.getNode(u.conceptId)?.labels.default ?? u.conceptId}
                    </span>
                  </div>
                ))}
                {lastResult.implicitUpdates.length > 5 && (
                  <p className="text-[10px] text-[#5c5c5c] text-center">
                    +{lastResult.implicitUpdates.length - 5} more
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center mt-8">
            <button
              onClick={handleRestart}
              className="h-11 px-5 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] text-sm font-semibold flex items-center gap-2 hover:bg-[#222222] transition-colors"
            >
              <RotateCcw size={15} />
              Back to Review
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active flashcard session
  if (sessionActive && currentNode) {
    const definitions = currentNode.definitionCids
      .map((cid) => chunks.get(cid))
      .filter(Boolean);

    const firstDef =
      definitions[0]?.payload ?? currentNode.labels.english ?? 'No definition available.';

    return (
      <div className="min-h-full bg-[#0f0f0f] flex flex-col">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
          <div className="max-w-[640px] mx-auto flex items-center justify-between">
            <button
              onClick={handleRestart}
              className="text-xs text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
            >
              End Session
            </button>
            <span className="text-xs text-[#5c5c5c]">
              {currentIndex + 1} / {sessionConcepts.length}
            </span>
          </div>
          <div className="max-w-[640px] mx-auto mt-2">
            <div className="h-1 rounded-full bg-[#1a1a1a] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#ffa116] transition-all"
                style={{ width: `${((currentIndex + 1) / sessionConcepts.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-[480px] w-full">
            <button
              onClick={handleFlip}
              className={`w-full rounded-2xl border p-8 text-center transition-all min-h-[280px] flex flex-col items-center justify-center ${
                flipped
                  ? 'bg-[#141414] border-[#ffffff10]'
                  : 'bg-[#1a1a1a] border-[#ffffff15] hover:border-[#ffffff25]'
              }`}
            >
              {!flipped ? (
                <>
                  <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-4">
                    Recall the meaning of
                  </span>
                  <h2 className="text-2xl font-bold text-[#eff1f6]">{currentNode.labels.default}</h2>
                  {currentNode.labels.somali && (
                    <p className="text-sm text-[#8c8c8c] mt-2 font-mono">
                      {currentNode.labels.somali}
                    </p>
                  )}
                  <p className="text-xs text-[#5c5c5c] mt-6">Tap to reveal</p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#eff1f6] mb-3">
                    {currentNode.labels.default}
                  </h2>
                  <p className="text-sm text-[#c8c8c8] leading-relaxed">{firstDef}</p>
                  {currentNode.labels.english && (
                    <p className="text-xs text-[#8c8c8c] mt-3 italic">
                      {currentNode.labels.english}
                    </p>
                  )}
                  {currentState && (
                    <div className="flex items-center gap-3 mt-4 text-[10px] text-[#5c5c5c]">
                      <span>Mastery: {(currentState.mastery * 100).toFixed(0)}%</span>
                      <span>·</span>
                      <span>Stability: {currentState.stability.toFixed(1)}d</span>
                      <span>·</span>
                      <span>Reviews: {currentState.reviewCount}</span>
                    </div>
                  )}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Rating buttons */}
        {flipped && (
          <div className="px-4 pb-8">
            <div className="max-w-[640px] mx-auto">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3 text-center">
                How well did you know this?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {([0, 1, 2, 3] as ReviewRating[]).map((q) => {
                  const info = RATING_INFO[q];
                  return (
                    <button
                      key={q}
                      onClick={() => handleRate(q)}
                      className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff15] transition-colors"
                    >
                      <span className="text-xs font-bold" style={{ color: info.color }}>
                        {info.label}
                      </span>
                      <span className="text-[9px] text-[#5c5c5c]">{info.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[640px] mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <BrainCircuit size={18} className="text-[#ffa116]" />
            <h1 className="text-xl font-bold text-[#eff1f6]">Review</h1>
          </div>
          <p className="text-xs text-[#8c8c8c]">
            Graph-aware spaced repetition — credit travels down, penalties travel up
          </p>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="max-w-[640px] mx-auto space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard
              icon={<Clock size={14} className="text-[#ef4444]" />}
              label="Due Today"
              value={stats.dueToday}
            />
            <StatCard
              icon={<Zap size={14} className="text-[#eab308]" />}
              label="Learning"
              value={stats.learning}
            />
            <StatCard
              icon={<Award size={14} className="text-[#22c55e]" />}
              label="Mastered"
              value={stats.mastered}
            />
            <StatCard
              icon={<TrendingUp size={14} className="text-[#3b82f6]" />}
              label="Avg Mastery"
              value={`${(stats.avgMastery * 100).toFixed(0)}%`}
            />
          </div>

          {/* Due Concepts */}
          {dueConcepts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Due for Review ({dueConcepts.length})
                </p>
                <button
                  onClick={() => startSession(dueConcepts.map((c) => c.conceptId))}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-semibold hover:bg-[#ffb800] transition-colors"
                >
                  <RotateCcw size={12} />
                  Review All
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
                        style={{
                          backgroundColor: `${masteryColor(state.mastery)}15`,
                          border: `1px solid ${masteryColor(state.mastery)}30`,
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: masteryColor(state.mastery) }}
                        >
                          {(state.mastery * 100).toFixed(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#eff1f6] truncate">
                          {node.labels.default}
                        </p>
                        <p className="text-[10px] text-[#5c5c5c]">
                          Stability: {state.stability.toFixed(1)}d · Retrievability:{' '}
                          {(state.retrievability * 100).toFixed(0)}%
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
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Ready to Learn ({learningFrontier.length})
                </p>
                <button
                  onClick={() =>
                    navigate(`/study/${learningFrontier[0].conceptId}`)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] text-xs font-semibold hover:bg-[#222222] transition-colors"
                >
                  <Sparkles size={12} />
                  Start
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
                      <p className="text-sm font-medium text-[#eff1f6] truncate">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-[#5c5c5c]">
                        Depth {item.depth} · {item.conceptId.replace(/^concept:/, '')}
                      </p>
                    </div>
                    <ChevronRight size={14} className="text-[#3e3e3e] flex-shrink-0" />
                  </button>
                ))}
                {learningFrontier.length > 8 && (
                  <p className="text-[10px] text-[#5c5c5c] text-center py-1">
                    +{learningFrontier.length - 8} more concepts
                  </p>
                )}
              </div>
            </section>
          )}

          {dueConcepts.length === 0 && learningFrontier.length === 0 && (
            <div className="text-center py-12">
              <BrainCircuit size={40} className="text-[#3e3e3e] mx-auto mb-3" />
              <p className="text-sm text-[#8c8c8c]">No concepts ready for review.</p>
              <p className="text-xs text-[#5c5c5c] mt-1">
                Complete lessons to build your review queue.
              </p>
              <button
                onClick={() => navigate('/problems')}
                className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
              >
                Start Learning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
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
