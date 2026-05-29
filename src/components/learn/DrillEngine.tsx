/**
 * DrillEngine — Mobile-first drill handler.
 *
 * Single column, large touch targets, minimal decoration.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { Check, ChevronRight, Eye, EyeOff, X as XIcon } from 'lucide-react';
import type { Exercise } from '@/data/drill-content';

export type DrillMode = 'guided' | 'unguided' | 'gate';

interface DrillEngineProps {
  drills: Exercise[];
  mode: DrillMode;
  levelColor: string;
  levelId: number;
  onComplete: (score: number) => void;
}

const CLASSIFY_CARDS = [
  { value: 'STATEMENT', label: 'Statement', color: '#3b82f6' },
  { value: 'QUESTION',  label: 'Question',  color: '#f59e0b' },
  { value: 'FOCUS',     label: 'Focus',     color: '#a855f7' },
  { value: 'SPOTLIGHT', label: 'Spotlight', color: '#06b6d4' },
] as const;

function matches(user: string, correct: string | string[]): boolean {
  const u = user.trim().toLowerCase();
  const cs = Array.isArray(correct) ? correct : [correct];
  return cs.some((c) => c.trim().toLowerCase() === u);
}

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
            className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all active:scale-95"
            style={{ border: `1.5px solid ${border}`, background: bg, color: text }}>
            {tok}
          </button>
        );
      })}
    </div>
  );
}

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
            className="p-3 rounded-xl text-left transition-all active:scale-[0.97]"
            style={{ border: `1.5px solid ${border}`, background: bg }}>
            <div className="text-xs font-bold mb-1" style={{ color: labelCol }}>{card.label}</div>
          </button>
        );
      })}
    </div>
  );
}

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
            className="w-full p-3 rounded-xl text-left transition-all active:scale-[0.98]"
            style={{ border: `1.5px solid ${border}`, background: bg }}>
            <span className="text-sm" style={{ color: text }}>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

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

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-[10px] text-[#3c3c3c] mb-1.5">
          <span>{idx + 1}/{drills.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: levelColor }} />
        </div>
      </div>

      {/* Prompt */}
      <div className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
            style={{ background: `${levelColor}12`, color: levelColor, border: `1px solid ${levelColor}25` }}>
            {drill.type.replace(/-/g, ' ')}
          </span>
          {mode === 'unguided' && drill.englishHint && (
            <button onClick={() => setShowHint(s => !s)} className="flex items-center gap-1 text-[10px] text-[#3c3c3c] hover:text-[#5c5c5c] ml-auto">
              {showHint ? <EyeOff size={10} /> : <Eye size={10} />}
              {showHint ? 'hide' : 'hint'}
            </button>
          )}
        </div>

        <p className="text-sm font-semibold text-[#eff1f6] leading-relaxed">{drill.prompt}</p>

        {drill.somaliSentence && !isTap && (
          <div className="rounded-lg bg-[#0f0f0f] border border-[#ffffff06] px-3 py-2">
            <p className="text-xs font-bold text-[#eff1f6] font-mono">{drill.somaliSentence}</p>
          </div>
        )}

        {drill.englishHint && (mode === 'guided' || showHint) && !isGate && (
          <p className="text-xs text-[#4c4c4c]">Hint: {drill.englishHint}</p>
        )}

        {drill.blueprint && (
          <div className="flex flex-wrap gap-1.5">
            {(['subject','marker','object','verb'] as const).map(slot => {
              const val = drill.blueprint![slot]; if (!val) return null;
              return (
                <div key={slot} className="flex items-center gap-1 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] px-2 py-1">
                  <span className="text-[8px] font-bold text-[#2c2c2c] uppercase">{slot}</span>
                  <span className="text-[10px] font-mono text-[#eff1f6]">{val}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interaction */}
      {!checked && (
        <div className="space-y-3">
          {isTap && drill.somaliSentence && (
            <div className="space-y-2">
              <p className="text-[9px] font-bold text-[#3c3c3c] uppercase tracking-wider">Tap the marker</p>
              <TokenSentence sentence={drill.somaliSentence} selected={selected} onSelect={setSelected}
                checked={false} correctAnswer={drill.correctAnswer} color={levelColor} />
            </div>
          )}
          {isClassify && <ClassifyCards selected={selected} onSelect={setSelected} checked={false} correctAnswer={drill.correctAnswer} />}
          {hasOpts && !isClassify && !isTap && (
            <MCQOptions options={drill.options!} selected={selected} onSelect={setSelected}
              checked={false} correctAnswer={drill.correctAnswer} color={levelColor} />
          )}
          {!hasOpts && !isTap && !isClassify && (
            <input ref={inputRef} type="text" value={answer} onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && current.trim() && handleCheck()}
              placeholder="Type answer..."
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] text-sm font-mono text-[#eff1f6] placeholder:text-[#2c2c2c] focus:outline-none transition-colors"
              style={{ borderColor: answer ? `${levelColor}35` : undefined }}
              autoFocus
            />
          )}
        </div>
      )}

      {/* Post-check display */}
      {checked && isTap && drill.somaliSentence && (
        <div className="space-y-2">
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
        <div className="rounded-xl border p-3 space-y-1.5"
          style={{ background: correct ? '#22c55e08' : '#ef444408', borderColor: correct ? '#22c55e30' : '#ef444430' }}>
          <div className="flex items-center gap-1.5">
            {correct
              ? <><Check size={13} className="text-[#22c55e]" /><span className="text-xs font-bold text-[#22c55e]">Correct</span></>
              : <><XIcon size={13} className="text-[#ef4444]" /><span className="text-xs font-bold text-[#ef4444]">Not quite</span></>
            }
          </div>
          {!correct && (
            <p className="text-[10px] text-[#eff1f6]">
              Answer: <span className="font-bold font-mono">{Array.isArray(drill.correctAnswer) ? drill.correctAnswer.join(' or ') : drill.correctAnswer}</span>
            </p>
          )}
          <p className="text-[10px] text-[#5c5c5c] leading-relaxed">{drill.explanation}</p>
        </div>
      )}

      {/* Action button */}
      {!checked ? (
        <button onClick={handleCheck} disabled={!current.trim()}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
          style={current.trim() ? { backgroundColor: levelColor, color: '#0f0f0f' } : { backgroundColor: '#1a1a1a', color: '#3c3c3c', cursor: 'not-allowed' }}>
          Check
        </button>
      ) : (
        <button onClick={handleContinue}
          className="w-full py-3 rounded-xl text-sm font-bold bg-[#22c55e] text-[#0f0f0f] hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <span>{isLast ? 'Finish' : 'Next'}</span>
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
