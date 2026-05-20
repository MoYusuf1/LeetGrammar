import { useState, useCallback, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft, Check, X, RotateCcw, BookOpen,
  ChevronRight, Trophy, AlertTriangle,
} from 'lucide-react';
import { getLevelById, getNextLevelId, type WorkbookDrill } from '@/data/workbook';
import { useProgress } from '@/hooks/useProgress';
import { useAuthStore } from '@/stores/auth-store';
import { fetchWorkbookAttempts, saveWorkbookAttemptsBatch } from '@/engine/sync';
import VocabBank from '@/components/VocabBank';

const LOCAL_STORAGE_KEY = (levelId: number) => `workbook-level-${levelId}-answers`;

export default function WorkbookLevel() {
  const { id } = useParams<{ id: string }>();
  const levelId = parseInt(id || '1', 10);
  const navigate = useNavigate();
  const level = getLevelById(levelId);

  const {
    completeWorkbookLevel,
    getWorkbookLevelScore,
  } = useProgress();

  const { user } = useAuthStore();

  const bestScore = getWorkbookLevelScore(levelId);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [vocabOpen, setVocabOpen] = useState(false);
  const [, setLoadingAttempts] = useState(true);

  const drills = level?.drills ?? [];

  // Load previous attempts on mount: DB first, then localStorage fallback
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoadingAttempts(true);

      // Try DB first
      if (user) {
        const dbAttempts = await fetchWorkbookAttempts(user.id, levelId);
        if (dbAttempts.length > 0 && !cancelled) {
          const restored: Record<number, string> = {};
          for (const a of dbAttempts) {
            restored[a.drill_id] = a.answer;
          }
          setAnswers(restored);
          setLoadingAttempts(false);
          return;
        }
      }

      // Fallback to localStorage
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY(levelId));
      if (raw && !cancelled) {
        try {
          const parsed = JSON.parse(raw) as Record<number, string>;
          setAnswers(parsed);
        } catch {
          // ignore parse errors
        }
      }

      if (!cancelled) setLoadingAttempts(false);
    };

    load();
    return () => { cancelled = true; };
  }, [user, levelId]);

  // Auto-save to localStorage when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY(levelId), JSON.stringify(answers));
    }
  }, [answers, levelId]);

  const handleAnswer = useCallback((drillId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [drillId]: value }));
  }, []);

  const handleCheck = useCallback((drillId: number) => {
    setChecked((prev) => ({ ...prev, [drillId]: true }));
  }, []);

  const score = useMemo(() => {
    let correct = 0;
    for (const drill of drills) {
      const userAns = (answers[drill.id] || '').trim().toLowerCase();
      const correctAns = Array.isArray(drill.answer)
        ? drill.answer.map((a) => a.toLowerCase())
        : [drill.answer.toLowerCase()];
      if (correctAns.includes(userAns)) correct++;
    }
    return drills.length > 0 ? correct / drills.length : 0;
  }, [answers, drills]);

  const handleSubmit = useCallback(async () => {
    // Auto-check all remaining
    const allChecked: Record<number, boolean> = {};
    for (const d of drills) allChecked[d.id] = true;
    setChecked(allChecked);
    setShowResults(true);

    const scorePercent = Math.round(score * 100);
    if (score >= (level?.requiredAccuracy ?? 0.9)) {
      completeWorkbookLevel(levelId, scorePercent);
    }

    // Save all attempts to DB
    if (user) {
      const attempts = drills.map((d) => {
        const userAns = (answers[d.id] || '').trim().toLowerCase();
        const correctAns = Array.isArray(d.answer)
          ? d.answer.map((a) => a.toLowerCase())
          : [d.answer.toLowerCase()];
        return {
          drillId: d.id,
          answer: answers[d.id] || '',
          isCorrect: correctAns.includes(userAns),
        };
      });
      await saveWorkbookAttemptsBatch(user.id, levelId, attempts);
    }
  }, [drills, score, level, levelId, completeWorkbookLevel, user, answers]);

  const handleRetry = useCallback(() => {
    setChecked({});
    setShowResults(false);
    // Keep answers for editing; user can clear manually if desired
  }, []);

  if (!level) {
    return (
      <div className="h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#8c8c8c]">Level not found</p>
      </div>
    );
  }

  const passed = score >= level.requiredAccuracy;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <VocabBank open={vocabOpen} onClose={() => setVocabOpen(false)} />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0f0f0f]/95 backdrop-blur border-b border-[#ffffff08]">
        <div className="max-w-[800px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/learn')}
              className="p-2 rounded-lg hover:bg-[#ffffff08] transition-colors"
            >
              <ArrowLeft size={16} className="text-[#8c8c8c]" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-[#eff1f6]">Level {level.id}: {level.title}</h1>
              <p className="text-[10px] text-[#5c5c5c]">{level.skill}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVocabOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] text-xs hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors"
            >
              <BookOpen size={12} /> Vocab
            </button>
            {bestScore > 0 && (
              <span className="text-[10px] font-bold text-[#00b8a3] bg-[#00b8a3]15 px-2 py-1 rounded">
                Best: {bestScore}%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 py-6 space-y-6">
        {/* Instructions */}
        <div className="rounded-xl border border-[#ffa11620] bg-[#ffa11606] p-4 space-y-2">
          <h2 className="text-xs font-bold text-[#ffa116] uppercase tracking-wider">Instructions</h2>
          {level.instructions.map((inst, i) => (
            <p key={i} className="text-sm text-[#d4d4d4] leading-relaxed">{inst}</p>
          ))}
          <p className="text-xs text-[#8c8c8c] mt-2">
            Required accuracy: <span className="text-[#ffa116] font-semibold">{Math.round(level.requiredAccuracy * 100)}%+</span>
          </p>
        </div>

        {/* Reference tables */}
        {level.referenceTables?.map((table, ti) => (
          <div key={ti} className="rounded-xl border border-[#ffffff08] bg-[#141414] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[#ffffff08]">
              <h3 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">{table.title}</h3>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-[#ffffff08]">
                {table.rows.map((row, ri) => (
                  <tr key={ri} className="hover:bg-[#ffffff04]">
                    <td className="px-4 py-2 text-[#eff1f6] font-medium font-mono">{row.label}</td>
                    <td className="px-4 py-2 text-[#8c8c8c]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Drills */}
        <div className="space-y-4">
          {drills.map((drill, idx) => (
            <DrillCard
              key={drill.id}
              index={idx + 1}
              drill={drill}
              answer={answers[drill.id] || ''}
              isChecked={checked[drill.id] || false}
              onAnswer={(v) => handleAnswer(drill.id, v)}
              onCheck={() => handleCheck(drill.id)}
              showResult={showResults}
            />
          ))}
        </div>

        {/* Submit / Results */}
        <div className="sticky bottom-4 z-20">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-[#ffa116] text-[#0f0f0f] font-semibold text-sm hover:bg-[#ffb800] transition-colors shadow-lg"
            >
              Submit Level
            </button>
          ) : (
            <div className={`rounded-xl border p-4 space-y-3 ${passed ? 'border-[#00b8a3]30 bg-[#00b8a3]08' : 'border-[#ff375f]30 bg-[#ff375f]08'}`}>
              <div className="flex items-center gap-3">
                {passed ? (
                  <Trophy size={20} className="text-[#00b8a3]" />
                ) : (
                  <AlertTriangle size={20} className="text-[#ff375f]" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-bold ${passed ? 'text-[#00b8a3]' : 'text-[#ff375f]'}`}>
                    {passed ? 'Level Complete!' : 'Keep Practicing'}
                  </p>
                  <p className="text-xs text-[#8c8c8c]">
                    Score: {Math.round(score * 100)}% — Need {Math.round(level.requiredAccuracy * 100)}% to pass
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!passed && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] text-sm font-medium hover:bg-[#222] transition-colors"
                  >
                    <RotateCcw size={14} /> Retry
                  </button>
                )}
                {passed && (
                  <button
                    onClick={() => {
                      const next = getNextLevelId(levelId);
                      if (next) navigate(`/workbook/level/${next}`);
                      else navigate('/learn');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold hover:bg-[#ffb800] transition-colors"
                  >
                    {getNextLevelId(levelId) ? (
                      <>Next Level <ChevronRight size={14} /></>
                    ) : (
                      'Back to Workbook'
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Drill Card Component ──────────────────────────────────────────────────

interface DrillCardProps {
  index: number;
  drill: WorkbookDrill;
  answer: string;
  isChecked: boolean;
  onAnswer: (value: string) => void;
  onCheck: () => void;
  showResult: boolean;
}

function DrillCard({ index, drill, answer, isChecked, onAnswer, onCheck, showResult }: DrillCardProps) {
  const correctAnswers = Array.isArray(drill.answer) ? drill.answer : [drill.answer];
  const isCorrect = correctAnswers.map((a) => a.toLowerCase().trim()).includes(answer.toLowerCase().trim());
  const revealed = isChecked || showResult;

  return (
    <div className={`rounded-xl border overflow-hidden transition-colors ${
      revealed
        ? isCorrect
          ? 'border-[#00b8a3]25 bg-[#00b8a3]04'
          : 'border-[#ff375f]25 bg-[#ff375f]04'
        : 'border-[#ffffff08] bg-[#141414]'
    }`}>
      <div className="px-4 py-3 border-b border-[#ffffff06] flex items-start gap-3">
        <span className="text-[10px] font-bold text-[#5c5c5c] mt-0.5">{index}</span>
        <div className="flex-1 space-y-1">
          <p className="text-sm text-[#eff1f6]">{drill.prompt}</p>
          {drill.english && (
            <p className="text-xs text-[#8c8c8c] italic">{drill.english}</p>
          )}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Drill-specific content */}
        {drill.type === 'marker_identification' && (
          <MarkerIdentificationDrill
            drill={drill}
            answer={answer}
            onAnswer={onAnswer}
            revealed={revealed}
            isCorrect={isCorrect}
          />
        )}

        {(drill.type === 'fill_blank' || drill.type === 'multiple_choice') && (
          <FillBlankDrill
            drill={drill}
            answer={answer}
            onAnswer={onAnswer}
            revealed={revealed}
            isCorrect={isCorrect}
          />
        )}

        {drill.type === 'decomposition' && (
          <DecompositionDrill
            drill={drill}
            answer={answer}
            onAnswer={onAnswer}
            revealed={revealed}
            isCorrect={isCorrect}
          />
        )}

        {drill.type === 'build_contraction' && (
          <BuildContractionDrill
            drill={drill}
            answer={answer}
            onAnswer={onAnswer}
            revealed={revealed}
            isCorrect={isCorrect}
          />
        )}

        {drill.type === 'unscramble' && (
          <UnscrambleDrill
            drill={drill}
            answer={answer}
            onAnswer={onAnswer}
            revealed={revealed}
            isCorrect={isCorrect}
          />
        )}

        {drill.type === 'blueprint' && (
          <BlueprintDrill
            drill={drill}
            answer={answer}
            onAnswer={onAnswer}
            revealed={revealed}
            isCorrect={isCorrect}
          />
        )}

        {(drill.type === 'translate' || drill.type === 'same_sentence_three_ways' || drill.type === 'combine_sentences') && (
          <TranslateDrill
            drill={drill}
            answer={answer}
            onAnswer={onAnswer}
            revealed={revealed}
            isCorrect={isCorrect}
          />
        )}

        {/* Check button + explanation */}
        {!showResult && (
          <div className="flex items-center gap-2">
            <button
              onClick={onCheck}
              disabled={!answer.trim()}
              className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-xs font-medium text-[#eff1f6] hover:bg-[#222] transition-colors disabled:opacity-30"
            >
              Check
            </button>
            {revealed && (
              <span className={`text-xs font-medium flex items-center gap-1 ${isCorrect ? 'text-[#00b8a3]' : 'text-[#ff375f]'}`}>
                {isCorrect ? <Check size={12} /> : <X size={12} />}
                {isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            )}
          </div>
        )}

        {revealed && (
          <div className="pt-2 border-t border-[#ffffff06]">
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              <span className="text-[#5c5c5c] font-medium">Answer: </span>
              <span className="text-[#eff1f6]">{correctAnswers.join(' / ')}</span>
            </p>
            <p className="text-xs text-[#8c8c8c] leading-relaxed mt-1">{drill.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-Components for each drill type ────────────────────────────────────

function MarkerIdentificationDrill({ drill, answer, onAnswer, revealed, isCorrect }: {
  drill: WorkbookDrill; answer: string; onAnswer: (v: string) => void; revealed: boolean; isCorrect: boolean;
}) {
  return (
    <div className="space-y-2">
      {drill.somali && (
        <p className="text-base font-medium text-[#eff1f6] font-mono">{drill.somali}</p>
      )}
      <div className="grid grid-cols-1 gap-2">
        {['Marker word', 'Type (STATEMENT/QUESTION/FOCUS/SPOTLIGHT)', 'English meaning'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10px] text-[#5c5c5c] w-28 shrink-0">{label}</span>
            <input
              type="text"
              value={answer.split('|')[i] || ''}
              onChange={(e) => {
                const parts = answer.split('|');
                parts[i] = e.target.value;
                onAnswer(parts.join('|'));
              }}
              disabled={revealed}
              className={`flex-1 h-9 px-3 rounded-lg bg-[#0f0f0f] border text-sm font-mono transition-colors focus:outline-none ${
                revealed
                  ? isCorrect
                    ? 'border-[#00b8a3]30 text-[#00b8a3]'
                    : 'border-[#ff375f]30 text-[#ff375f]'
                  : 'border-[#ffffff10] text-[#eff1f6] focus:border-[#ffa116]50'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FillBlankDrill({ drill, answer, onAnswer, revealed, isCorrect }: {
  drill: WorkbookDrill; answer: string; onAnswer: (v: string) => void; revealed: boolean; isCorrect: boolean;
}) {
  return (
    <div className="space-y-3">
      {drill.somali && (
        <p className="text-base font-medium text-[#eff1f6] font-mono">
          {drill.somali.replace('_____', '________')}
        </p>
      )}
      {drill.options && (
        <div className="flex flex-wrap gap-2">
          {drill.options.map((opt) => (
            <button
              key={opt}
              onClick={() => !revealed && onAnswer(opt)}
              disabled={revealed}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                answer === opt
                  ? revealed
                    ? isCorrect
                      ? 'bg-[#00b8a3]15 border-[#00b8a3]40 text-[#00b8a3]'
                      : 'bg-[#ff375f]15 border-[#ff375f]40 text-[#ff375f]'
                    : 'bg-[#ffa116]15 border-[#ffa116]40 text-[#ffa116]'
                  : 'bg-[#0f0f0f] border-[#ffffff08] text-[#8c8c8c] hover:border-[#ffffff15]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {!drill.options && (
        <input
          type="text"
          value={answer}
          onChange={(e) => onAnswer(e.target.value)}
          disabled={revealed}
          placeholder="Type your answer..."
          className={`w-full h-10 px-3 rounded-lg bg-[#0f0f0f] border text-sm font-mono transition-colors focus:outline-none ${
            revealed
              ? isCorrect
                ? 'border-[#00b8a3]30 text-[#00b8a3]'
                : 'border-[#ff375f]30 text-[#ff375f]'
              : 'border-[#ffffff10] text-[#eff1f6] focus:border-[#ffa116]50'
          }`}
        />
      )}
    </div>
  );
}

function DecompositionDrill({ drill, answer, onAnswer, revealed, isCorrect }: {
  drill: WorkbookDrill; answer: string; onAnswer: (v: string) => void; revealed: boolean; isCorrect: boolean;
}) {
  return (
    <div className="space-y-2">
      {drill.somali && (
        <p className="text-lg font-medium text-[#eff1f6] font-mono">{drill.somali}</p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {drill.partLabels?.map((label, i) => (
          <div key={i}>
            <span className="text-[10px] text-[#5c5c5c] block mb-1">{label}</span>
            <input
              type="text"
              value={answer.split('|')[i] || ''}
              onChange={(e) => {
                const parts = answer.split('|');
                parts[i] = e.target.value;
                onAnswer(parts.join('|'));
              }}
              disabled={revealed}
              className={`w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border text-sm font-mono transition-colors focus:outline-none ${
                revealed
                  ? isCorrect
                    ? 'border-[#00b8a3]30 text-[#00b8a3]'
                    : 'border-[#ff375f]30 text-[#ff375f]'
                  : 'border-[#ffffff10] text-[#eff1f6] focus:border-[#ffa116]50'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function BuildContractionDrill({ drill, answer, onAnswer, revealed, isCorrect }: {
  drill: WorkbookDrill; answer: string; onAnswer: (v: string) => void; revealed: boolean; isCorrect: boolean;
}) {
  return (
    <div className="space-y-2">
      {drill.english && (
        <p className="text-sm text-[#8c8c8c]">{drill.english}</p>
      )}
      <input
        type="text"
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        disabled={revealed}
        placeholder="Write the contraction..."
        className={`w-full h-10 px-3 rounded-lg bg-[#0f0f0f] border text-sm font-mono transition-colors focus:outline-none ${
          revealed
            ? isCorrect
              ? 'border-[#00b8a3]30 text-[#00b8a3]'
              : 'border-[#ff375f]30 text-[#ff375f]'
            : 'border-[#ffffff10] text-[#eff1f6] focus:border-[#ffa116]50'
        }`}
      />
    </div>
  );
}

function UnscrambleDrill({ drill, answer, onAnswer, revealed, isCorrect }: {
  drill: WorkbookDrill; answer: string; onAnswer: (v: string) => void; revealed: boolean; isCorrect: boolean;
}) {
  return (
    <div className="space-y-2">
      {drill.words && (
        <div className="flex flex-wrap gap-1.5">
          {drill.words.map((word, i) => (
            <span key={i} className="px-2 py-1 rounded-md bg-[#0f0f0f] border border-[#ffffff08] text-xs font-mono text-[#8c8c8c]">
              {word}
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        disabled={revealed}
        placeholder="Write in correct order..."
        className={`w-full h-10 px-3 rounded-lg bg-[#0f0f0f] border text-sm font-mono transition-colors focus:outline-none ${
          revealed
            ? isCorrect
              ? 'border-[#00b8a3]30 text-[#00b8a3]'
              : 'border-[#ff375f]30 text-[#ff375f]'
            : 'border-[#ffffff10] text-[#eff1f6] focus:border-[#ffa116]50'
        }`}
      />
    </div>
  );
}

function BlueprintDrill({ drill, answer, onAnswer, revealed, isCorrect }: {
  drill: WorkbookDrill; answer: string; onAnswer: (v: string) => void; revealed: boolean; isCorrect: boolean;
}) {
  return (
    <div className="space-y-2">
      {drill.blueprint && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
          {drill.blueprint.map((part, i) => (
            <span key={i} className="text-[#8c8c8c]">
              <span className="text-[#5c5c5c]">[{part.label}]</span> {part.value}
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        disabled={revealed}
        placeholder="Write the Somali sentence..."
        className={`w-full h-10 px-3 rounded-lg bg-[#0f0f0f] border text-sm font-mono transition-colors focus:outline-none ${
          revealed
            ? isCorrect
              ? 'border-[#00b8a3]30 text-[#00b8a3]'
              : 'border-[#ff375f]30 text-[#ff375f]'
            : 'border-[#ffffff10] text-[#eff1f6] focus:border-[#ffa116]50'
        }`}
      />
    </div>
  );
}

function TranslateDrill({ drill, answer, onAnswer, revealed, isCorrect }: {
  drill: WorkbookDrill; answer: string; onAnswer: (v: string) => void; revealed: boolean; isCorrect: boolean;
}) {
  return (
    <div className="space-y-2">
      {drill.english && (
        <p className="text-sm text-[#d4d4d4]">{drill.english}</p>
      )}
      <input
        type="text"
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
        disabled={revealed}
        placeholder="Write in Somali..."
        className={`w-full h-10 px-3 rounded-lg bg-[#0f0f0f] border text-sm font-mono transition-colors focus:outline-none ${
          revealed
            ? isCorrect
              ? 'border-[#00b8a3]30 text-[#00b8a3]'
              : 'border-[#ff375f]30 text-[#ff375f]'
            : 'border-[#ffffff10] text-[#eff1f6] focus:border-[#ffa116]50'
        }`}
      />
    </div>
  );
}
