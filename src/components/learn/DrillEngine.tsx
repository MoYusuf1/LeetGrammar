/**
 * DrillEngine — handles all 14 exercise types across guided, unguided, and gate modes.
 *
 * Interaction per type:
 *   marker-tap          → sentence rendered as tappable word tokens
 *   marker-classify     → 4 big visual cards (STATEMENT/QUESTION/FOCUS/SPOTLIGHT)
 *   word-scramble       → tap words from pool to build sentence in order
 *   fill-blank          → MCQ options
 *   pick-preposition    → MCQ options
 *   add-direction       → MCQ options
 *   pick-connector      → MCQ options
 *   contraction-*       → MCQ options
 *   blueprint-build     → text input with slots visible
 *   combine-sentences   → text input
 *   free-build          → text input
 *
 * Gate mode: no hints, no toggles. Guided: hints always on. Unguided: hints toggleable.
 *
 * Feedback explains the WHY, not just the WHAT.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { Check, ChevronRight, Eye, EyeOff, Shield, X as XIcon } from 'lucide-react';
import type { Exercise } from '@/data/drill-content';

export type DrillMode = 'guided' | 'unguided' | 'gate';

interface DrillEngineProps {
  drills: Exercise[];
  mode: DrillMode;
  levelColor: string;
  levelId: number;
  onComplete: (score: number) => void;
}

/* ─── Classify cards ─────────────────────────────────────────────────────── */
const CLASSIFY_CARDS = [
  { value: 'STATEMENT', label: 'Statement', sub: 'waa · wuu · way', detail: 'focus on the action', color: '#3b82f6' },
  { value: 'QUESTION',  label: 'Question',  sub: 'ma · miyaa',      detail: 'yes / no',           color: '#f59e0b' },
  { value: 'FOCUS',     label: 'Focus',     sub: 'baa · ayaa',      detail: 'highlights WHO/WHAT', color: '#a855f7' },
  { value: 'SPOTLIGHT', label: 'Spotlight', sub: 'waxa · waxaan',   detail: '"what ___ was..."',   color: '#06b6d4' },
] as const;

/* ─── Answer matching ────────────────────────────────────────────────────── */
function matches(user: string, correct: string | string[]): boolean {
  const u = user.trim().toLowerCase();
  const cs = Array.isArray(correct) ? correct : [correct];
  return cs.some((c) => c.trim().toLowerCase() === u);
}

/* ─── Tappable word tokens ──────────────────────────────────────────────── */
function TokenSentence({
  sentence, selected, onSelect, checked, correctAnswer, color,
}: {
  sentence: string; selected: string | null; onSelect: (w: string) => void;
  checked: boolean; correctAnswer: string | string[]; color: string;
}) {
  const tokens = sentence.split(/\s+/);
  const corrects = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];

  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((tok, i) => {
        const bare = tok.replace(/[.?!,;]$/,'');
        const isSelected = selected === tok || selected === bare;
        const isCorrectTok = corrects.some(c => c.toLowerCase() === bare.toLowerCase() || c.toLowerCase() === tok.toLowerCase());
        let border = '#ffffff12', bg = '#1a1a1a', text = '#eff1f6';
        if (!checked && isSelected) { border = color; bg = `${color}15`; text = color; }
        else if (checked && isSelected && isCorrectTok) { border = '#22c55e'; bg = '#22c55e12'; text = '#22c55e'; }
        else if (checked && isSelected && !isCorrectTok) { border = '#ef4444'; bg = '#ef444412'; text = '#ef4444'; }
        else if (checked && isCorrectTok) { border = '#22c55e40'; bg = '#22c55e06'; text = '#22c55e70'; }
        return (
          <button key={i} onClick={() => !checked && onSelect(tok)} disabled={checked}
            className="px-3 py-2 rounded-lg text-sm font-mono font-semibold transition-all active:scale-95"
            style={{ border: `2px solid ${border}`, background: bg, color: text }}>
            {tok}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Classify cards ─────────────────────────────────────────────────────── */
function ClassifyCards({
  selected, onSelect, checked, correctAnswer,
}: {
  selected: string | null; onSelect: (v: string) => void;
  checked: boolean; correctAnswer: string | string[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {CLASSIFY_CARDS.map((card) => {
        const isSel = selected === card.value;
        const isRight = matches(card.value, correctAnswer);
        let border = '#ffffff08', bg = '#141414', labelCol = '#5c5c5c';
        if (!checked && isSel) { border = card.color; bg = `${card.color}12`; labelCol = card.color; }
        else if (checked && isRight) { border = '#22c55e40'; bg = '#22c55e08'; labelCol = '#22c55e'; }
        else if (checked && isSel && !isRight) { border = '#ef444440'; bg = '#ef444408'; labelCol = '#ef4444'; }
        return (
          <button key={card.value} onClick={() => !checked && onSelect(card.value)} disabled={checked}
            className="p-3.5 rounded-xl text-left transition-all active:scale-[0.97]"
            style={{ border: `2px solid ${border}`, background: bg }}>
            <div className="text-[9px] font-mono text-[#3c3c3c] mb-1">{card.sub}</div>
            <div className="text-sm font-bold mb-0.5" style={{ color: labelCol }}>{card.label}</div>
            <div className="text-[10px]" style={{ color: `${labelCol}88` }}>{card.detail}</div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Word scramble ──────────────────────────────────────────────────────── */
function WordScramble({
  words, onChange, checked, correctAnswer, color,
}: {
  words: string[]; onChange: (v: string) => void;
  checked: boolean; correctAnswer: string | string[]; color: string;
}) {
  const [placed, setPlaced] = useState<string[]>([]);
  const [pool, setPool] = useState([...words]);

  const add = (w: string, idx: number) => {
    if (checked) return;
    const np = [...pool]; np.splice(idx, 1);
    const nl = [...placed, w];
    setPool(np); setPlaced(nl); onChange(nl.join(' '));
  };
  const remove = (w: string, idx: number) => {
    if (checked) return;
    const nl = [...placed]; nl.splice(idx, 1);
    const np = [...pool, w];
    setPlaced(nl); setPool(np); onChange(nl.join(' '));
  };

  return (
    <div className="space-y-3">
      <div className="min-h-[52px] p-3 rounded-xl border flex flex-wrap gap-2 items-center transition-all"
        style={{ borderColor: placed.length > 0 ? `${color}30` : '#ffffff08', background: '#141414' }}>
        {placed.length === 0
          ? <span className="text-xs text-[#2c2c2c]">Tap words below to build the sentence...</span>
          : placed.map((w, i) => (
            <button key={i} onClick={() => remove(w, i)} disabled={checked}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all active:scale-95"
              style={{ border: `2px solid ${color}40`, background: `${color}10`, color }}>
              {w}
            </button>
          ))}
      </div>
      {!checked && (
        <div className="flex flex-wrap gap-2">
          {pool.map((w, i) => (
            <button key={i} onClick={() => add(w, i)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] transition-all active:scale-95 hover:border-[#ffffff20]">
              {w}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MCQ options ────────────────────────────────────────────────────────── */
function MCQOptions({
  options, selected, onSelect, checked, correctAnswer, color,
}: {
  options: string[]; selected: string | null; onSelect: (o: string) => void;
  checked: boolean; correctAnswer: string | string[]; color: string;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt, i) => {
        const isSel = selected === opt;
        const isRight = matches(opt, correctAnswer);
        let border = '#ffffff08', bg = '#141414', text = '#eff1f6';
        if (!checked && isSel) { border = color; bg = `${color}12`; text = color; }
        else if (checked && isRight) { border = '#22c55e40'; bg = '#22c55e08'; text = '#22c55e'; }
        else if (checked && isSel && !isRight) { border = '#ef444440'; bg = '#ef444408'; text = '#ef4444'; }
        return (
          <button key={i} onClick={() => !checked && onSelect(opt)} disabled={checked}
            className="w-full p-3.5 rounded-xl text-left transition-all active:scale-[0.98]"
            style={{ border: `2px solid ${border}`, background: bg }}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ borderColor: border, color: text }}>
                {checked && isRight ? '✓' : checked && isSel ? '✗' : String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm font-mono" style={{ color: text }}>{opt}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Feedback panel ─────────────────────────────────────────────────────── */
function Feedback({ correct, correctAnswer, explanation }: {
  correct: boolean; correctAnswer: string | string[]; explanation: string;
}) {
  return (
    <div className="rounded-xl border p-4 space-y-2 animate-fade-in"
      style={{
        background: correct ? '#22c55e08' : '#ef444408',
        borderColor: correct ? '#22c55e30' : '#ef444430',
      }}>
      <div className="flex items-center gap-2">
        {correct
          ? <><Check size={14} className="text-[#22c55e]" /><span className="text-sm font-bold text-[#22c55e]">Correct</span></>
          : <><XIcon size={14} className="text-[#ef4444]" /><span className="text-sm font-bold text-[#ef4444]">Not quite</span></>
        }
      </div>
      {!correct && (
        <p className="text-xs text-[#eff1f6]">
          <span className="text-[#3c3c3c]">Answer: </span>
          <span className="font-bold font-mono">
            {Array.isArray(correctAnswer) ? correctAnswer.join(' or ') : correctAnswer}
          </span>
        </p>
      )}
      <p className="text-xs text-[#5c5c5c] leading-relaxed">{explanation}</p>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

export default function DrillEngine({ drills, mode, levelColor, levelId, onComplete }: DrillEngineProps) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(mode === 'guided');
  const inputRef = useRef<HTMLInputElement>(null);

  const drill = drills[idx];
  const isLast = idx === drills.length - 1;
  const progress = ((idx + (checked ? 1 : 0)) / drills.length) * 100;
  const current = selected ?? answer;
  const isGate = mode === 'gate';
  const required = Math.ceil(drills.length * 0.9);

  useEffect(() => { setShowHint(mode === 'guided'); }, [mode, idx]);

  const correct = checked && matches(current, drill?.correctAnswer ?? '');

  const handleCheck = useCallback(() => {
    if (!current.trim()) return;
    const ok = matches(current, drill.correctAnswer);
    setChecked(true);
    if (ok) setScore(s => s + 1);
  }, [current, drill]);

  const handleContinue = useCallback(() => {
    if (isLast) { onComplete(score); return; }
    setIdx(i => i + 1);
    setAnswer('');
    setSelected(null);
    setChecked(false);
  }, [isLast, score, onComplete]);

  if (!drill) { onComplete(score); return null; }

  const hasOpts = !!drill.options?.length;
  const isTap = drill.type === 'marker-tap';
  const isClassify = drill.type === 'marker-classify';
  const isScramble = drill.type === 'word-scramble' && !!drill.scrambledWords;
  const label = drill.type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <div className="space-y-4">

      {/* Gate badge */}
      {isGate && (
        <div className="flex items-center gap-2.5 rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${levelColor}15`, border: `1px solid ${levelColor}30` }}>
            <Shield size={14} style={{ color: levelColor }} />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-[#eff1f6]">Gate — Level {levelId}</p>
            <p className="text-[10px] text-[#5c5c5c]">No hints · need {required}/{drills.length} to pass</p>
          </div>
          <span className="text-sm font-bold" style={{ color: score >= required ? '#22c55e' : levelColor }}>
            {score}/{idx + (checked ? 1 : 0)}
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-[10px] text-[#3c3c3c] mb-1.5">
          <span>{mode === 'guided' ? 'Guided Practice' : mode === 'unguided' ? 'Unguided Practice' : 'Gate'}</span>
          <span>{idx + 1}/{drills.length}</span>
        </div>
        <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: levelColor }} />
        </div>
      </div>

      {/* Prompt card */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `${levelColor}12`, color: levelColor, border: `1px solid ${levelColor}25` }}>
            {label}
          </span>
          {mode === 'unguided' && drill.englishHint && (
            <button onClick={() => setShowHint(s => !s)}
              className="flex items-center gap-1 text-[10px] text-[#3c3c3c] hover:text-[#5c5c5c] ml-auto transition-colors">
              {showHint ? <EyeOff size={10} /> : <Eye size={10} />}
              {showHint ? 'hide hint' : 'hint'}
            </button>
          )}
        </div>

        <p className="text-sm font-semibold text-[#eff1f6] leading-relaxed">{drill.prompt}</p>

        {/* Sentence display (not for tap — shown as tokens below) */}
        {drill.somaliSentence && !isTap && (
          <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] px-3 py-2.5">
            <p className="text-sm font-bold text-[#eff1f6] font-mono">{drill.somaliSentence}</p>
          </div>
        )}

        {/* Hint */}
        {drill.englishHint && (mode === 'guided' || showHint) && !isGate && (
          <p className="text-xs text-[#4c4c4c]">
            <span className="text-[#2c2c2c]">Hint: </span>{drill.englishHint}
          </p>
        )}

        {/* Blueprint slots */}
        {drill.blueprint && (
          <div className="flex flex-wrap gap-2">
            {(['subject','marker','object','verb'] as const).map(slot => {
              const val = drill.blueprint![slot]; if (!val) return null;
              return (
                <div key={slot} className="flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] px-2.5 py-1.5">
                  <span className="text-[9px] font-bold text-[#2c2c2c] uppercase">{slot}</span>
                  <span className="text-xs font-mono text-[#eff1f6]">{val}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Combine sentences */}
        {drill.sentenceA && (
          <div className="space-y-1.5">
            {[drill.sentenceA, drill.sentenceB].filter(Boolean).map((s, i) => (
              <div key={i} className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] px-3 py-2">
                <p className="text-xs font-mono text-[#eff1f6]">{s}</p>
              </div>
            ))}
            {drill.connectorType && (
              <p className="text-[10px] text-[#3c3c3c]">
                Connector: <span className="font-bold font-mono" style={{ color: levelColor }}>{drill.connectorType}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Interaction area */}
      {!checked && (
        <div className="space-y-3">
          {isTap && drill.somaliSentence && (
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-2">
              <p className="text-[10px] font-bold text-[#3c3c3c] uppercase tracking-wider">Tap the marker word</p>
              <TokenSentence sentence={drill.somaliSentence} selected={selected} onSelect={setSelected}
                checked={false} correctAnswer={drill.correctAnswer} color={levelColor} />
            </div>
          )}
          {isClassify && (
            <ClassifyCards selected={selected} onSelect={setSelected} checked={false} correctAnswer={drill.correctAnswer} />
          )}
          {isScramble && drill.scrambledWords && (
            <WordScramble words={drill.scrambledWords} onChange={setAnswer}
              checked={false} correctAnswer={drill.correctAnswer} color={levelColor} />
          )}
          {hasOpts && !isClassify && !isTap && (
            <MCQOptions options={drill.options!} selected={selected} onSelect={setSelected}
              checked={false} correctAnswer={drill.correctAnswer} color={levelColor} />
          )}
          {!hasOpts && !isTap && !isClassify && !isScramble && (
            <input ref={inputRef} type="text" value={answer} onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && current.trim() && handleCheck()}
              placeholder="Type your answer..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#ffffff10] text-sm font-mono text-[#eff1f6] placeholder:text-[#2c2c2c] focus:outline-none transition-colors"
              style={{ borderColor: answer ? `${levelColor}35` : undefined }}
              autoFocus
            />
          )}
        </div>
      )}

      {/* Post-check interaction state */}
      {checked && isTap && drill.somaliSentence && (
        <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
          <TokenSentence sentence={drill.somaliSentence} selected={selected} onSelect={() => {}}
            checked={true} correctAnswer={drill.correctAnswer} color={levelColor} />
        </div>
      )}
      {checked && isClassify && (
        <ClassifyCards selected={selected} onSelect={() => {}} checked={true} correctAnswer={drill.correctAnswer} />
      )}
      {checked && hasOpts && !isClassify && !isTap && (
        <MCQOptions options={drill.options!} selected={selected} onSelect={() => {}}
          checked={true} correctAnswer={drill.correctAnswer} color={levelColor} />
      )}

      {/* Feedback */}
      {checked && (
        <Feedback correct={correct} correctAnswer={drill.correctAnswer} explanation={drill.explanation} />
      )}

      {/* Action button */}
      {!checked ? (
        <button onClick={handleCheck} disabled={!current.trim()}
          className="w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
          style={current.trim()
            ? { background: levelColor, color: '#0f0f0f' }
            : { background: '#1a1a1a', color: '#2c2c2c', cursor: 'not-allowed' }}>
          Check Answer
        </button>
      ) : (
        <button onClick={handleContinue}
          className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#22c55e] text-[#0f0f0f] hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <span>{isLast ? (isGate ? 'See Results' : 'Finish') : 'Continue'}</span>
          <ChevronRight size={15} />
        </button>
      )}
    </div>
  );
}
