/**
 * Review Page — SRS flashcard review with graph-aware scheduling.
 */

import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
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
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphInit } from '@/hooks/useGraphInit';
import { useProgressStore } from '@/stores/progress-store';
import {
  getDueConcepts,
  getNewConcepts,
  getSrsStats,
} from '@/engine/srs';

const QUALITY_LABELS: Record<number, { label: string; color: string; desc: string }> = {
  0: { label: 'Blackout', color: '#ef4444', desc: 'Complete failure to recall' },
  1: { label: 'Wrong', color: '#f97316', desc: 'Incorrect response, recognized correct one' },
  2: { label: 'Hard', color: '#eab308', desc: 'Incorrect response, easy to recall' },
  3: { label: 'Good', color: '#22c55e', desc: 'Correct with difficulty' },
  4: { label: 'Easy', color: '#3b82f6', desc: 'Correct with hesitation' },
  5: { label: 'Perfect', color: '#a855f7', desc: 'Perfect response' },
};

export default function Review() {
  useGraphInit();
  const navigate = useNavigate();
  const { engine, chunks } = useGraphStore();
  const { srsCards, reviewConcept, initSrsCard } = useProgressStore();

  const cardsMap = useMemo(() => {
    const map = new Map(Object.entries(srsCards));
    return map;
  }, [srsCards]);

  const dueConcepts = useMemo(() => getDueConcepts(engine, cardsMap), [engine, cardsMap]);
  const newConcepts = useMemo(() => getNewConcepts(engine, cardsMap), [engine, cardsMap]);
  const stats = useMemo(() => getSrsStats(cardsMap), [cardsMap]);

  const [sessionActive, setSessionActive] = useState(false);
  const [sessionConcepts, setSessionConcepts] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState<Record<string, number>>({});

  const currentConceptId = sessionConcepts[currentIndex];
  const currentNode = currentConceptId ? engine.getNode(currentConceptId) : undefined;
  const currentCard = currentConceptId ? cardsMap.get(currentConceptId) : undefined;

  const startSession = useCallback((conceptIds: string[]) => {
    // Initialize cards for any new concepts
    for (const id of conceptIds) {
      if (!cardsMap.has(id)) {
        initSrsCard(id);
      }
    }
    setSessionConcepts(conceptIds);
    setCurrentIndex(0);
    setFlipped(false);
    setSessionResults({});
    setSessionActive(true);
  }, [cardsMap, initSrsCard]);

  const handleFlip = useCallback(() => {
    setFlipped(true);
  }, []);

  const handleRate = useCallback((quality: number) => {
    const conceptId = sessionConcepts[currentIndex];
    if (!conceptId) return;

    reviewConcept(conceptId, quality);
    setSessionResults((prev) => ({ ...prev, [conceptId]: quality }));

    if (currentIndex < sessionConcepts.length - 1) {
      setCurrentIndex((i) => i + 1);
      setFlipped(false);
    } else {
      setSessionActive(false);
    }
  }, [sessionConcepts, currentIndex, reviewConcept]);

  const handleRestart = useCallback(() => {
    setSessionActive(false);
    setSessionConcepts([]);
    setCurrentIndex(0);
    setFlipped(false);
    setSessionResults({});
  }, []);

  // Session complete screen
  if (!sessionActive && sessionConcepts.length > 0 && Object.keys(sessionResults).length > 0) {
    const total = sessionConcepts.length;
    const avgQuality =
      Object.values(sessionResults).reduce((a, b) => a + b, 0) / total;
    const goodCount = Object.values(sessionResults).filter((q) => q >= 3).length;

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
          <p className="text-sm text-[#8c8c8c] mt-1">
            Average quality: {avgQuality.toFixed(1)} / 5
          </p>

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

    const firstDef = definitions[0]?.payload ?? currentNode.labels.english ?? 'No definition available.';

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
                    <p className="text-sm text-[#8c8c8c] mt-2 font-mono">{currentNode.labels.somali}</p>
                  )}
                  <p className="text-xs text-[#5c5c5c] mt-6">Tap to reveal</p>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-[#eff1f6] mb-3">{currentNode.labels.default}</h2>
                  <p className="text-sm text-[#c8c8c8] leading-relaxed">{firstDef}</p>
                  {currentNode.labels.english && (
                    <p className="text-xs text-[#8c8c8c] mt-3 italic">{currentNode.labels.english}</p>
                  )}
                  {currentCard && (
                    <div className="flex items-center gap-3 mt-4 text-[10px] text-[#5c5c5c]">
                      <span>Mastery: {currentCard.mastery}/5</span>
                      <span>·</span>
                      <span>Streak: {currentCard.repetition}</span>
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
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[0, 1, 2, 3, 4, 5].map((q) => {
                  const info = QUALITY_LABELS[q];
                  return (
                    <button
                      key={q}
                      onClick={() => handleRate(q)}
                      className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff15] transition-colors"
                    >
                      <span className="text-xs font-bold" style={{ color: info.color }}>
                        {q}
                      </span>
                      <span className="text-[9px] text-[#5c5c5c]">{info.label}</span>
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
            Spaced repetition based on your textbook concepts
          </p>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="max-w-[640px] mx-auto space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={<Clock size={14} className="text-[#ef4444]" />} label="Due Today" value={stats.dueToday} />
            <StatCard icon={<Zap size={14} className="text-[#eab308]" />} label="Learning" value={stats.learning} />
            <StatCard icon={<Award size={14} className="text-[#22c55e]" />} label="Mastered" value={stats.mastered} />
            <StatCard icon={<TrendingUp size={14} className="text-[#3b82f6]" />} label="Total Tracked" value={stats.total} />
          </div>

          {/* Due Concepts */}
          {dueConcepts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Due for Review ({dueConcepts.length})
                </p>
                <button
                  onClick={() => startSession(dueConcepts)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-semibold hover:bg-[#ffb800] transition-colors"
                >
                  <RotateCcw size={12} />
                  Review All
                </button>
              </div>
              <div className="space-y-1.5">
                {dueConcepts.map((id) => {
                  const node = engine.getNode(id);
                  const card = cardsMap.get(id);
                  if (!node) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => startSession([id])}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a] transition-all text-left"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${masteryColor(card?.mastery ?? 0)}15`,
                          border: `1px solid ${masteryColor(card?.mastery ?? 0)}30`,
                        }}
                      >
                        <span className="text-xs font-bold" style={{ color: masteryColor(card?.mastery ?? 0) }}>
                          {card?.mastery ?? 0}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#eff1f6] truncate">{node.labels.default}</p>
                        <p className="text-[10px] text-[#5c5c5c]">
                          Interval: {card?.interval ?? 0}d · EF: {(card?.ef ?? 2.5).toFixed(1)}
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-[#3e3e3e] flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* New Concepts */}
          {newConcepts.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  New to Learn ({newConcepts.length})
                </p>
                <button
                  onClick={() => startSession(newConcepts.slice(0, 10))}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] text-xs font-semibold hover:bg-[#222222] transition-colors"
                >
                  <Sparkles size={12} />
                  Learn {Math.min(newConcepts.length, 10)}
                </button>
              </div>
              <div className="space-y-1.5">
                {newConcepts.slice(0, 8).map((id) => {
                  const node = engine.getNode(id);
                  if (!node) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => navigate(`/wiki/${id}`)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a] transition-all text-left"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#3b82f6]10 border border-[#3b82f6]25">
                        <Sparkles size={13} className="text-[#3b82f6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#eff1f6] truncate">{node.labels.default}</p>
                        <p className="text-[10px] text-[#5c5c5c]">{node.type}</p>
                      </div>
                      <ChevronRight size={14} className="text-[#3e3e3e] flex-shrink-0" />
                    </button>
                  );
                })}
                {newConcepts.length > 8 && (
                  <p className="text-[10px] text-[#5c5c5c] text-center py-1">
                    +{newConcepts.length - 8} more concepts
                  </p>
                )}
              </div>
            </section>
          )}

          {dueConcepts.length === 0 && newConcepts.length === 0 && (
            <div className="text-center py-12">
              <BrainCircuit size={40} className="text-[#3e3e3e] mx-auto mb-3" />
              <p className="text-sm text-[#8c8c8c]">No concepts ready for review.</p>
              <p className="text-xs text-[#5c5c5c] mt-1">
                Ingest textbooks or complete lessons to build your review queue.
              </p>
              <button
                onClick={() => navigate('/ingest')}
                className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
              >
                Ingest Textbooks
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
  value: number;
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
  if (mastery >= 4) return '#22c55e';
  if (mastery >= 3) return '#3b82f6';
  if (mastery >= 2) return '#eab308';
  if (mastery >= 1) return '#f97316';
  return '#ef4444';
}
