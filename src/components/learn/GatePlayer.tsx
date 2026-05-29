/**
 * GatePlayer — final gate check, same interactions as DrillPlayer but no hints.
 * Must score ≥ 90% to pass.
 */

import { useState, useCallback } from 'react';
import { Check, ChevronRight, Shield, X as XIcon } from 'lucide-react';
import type { Exercise } from '@/data/drill-content';

interface GatePlayerProps {
  drills: Exercise[];
  levelColor: string;
  levelId: number;
  onComplete: (score: number) => void;
}

const MARKER_CARDS = [
  { value: 'STATEMENT', label: 'Statement', tag: 'waa / wuu / way', color: '#3b82f6' },
  { value: 'QUESTION',  label: 'Question',  tag: 'ma / miyaa',      color: '#f59e0b' },
  { value: 'FOCUS',     label: 'Focus',     tag: 'baa / ayaa',      color: '#a855f7' },
  { value: 'SPOTLIGHT', label: 'Spotlight', tag: 'waxa / waxaan',   color: '#06b6d4' },
];

function isMatch(user: string, correct: string | string[]): boolean {
  const u = user.trim().toLowerCase();
  const cs = Array.isArray(correct) ? correct : [correct];
  return cs.some((c) => c.trim().toLowerCase() === u);
}

function TappableTokens({
  sentence, selected, onSelect, checked, correctAnswer, color,
}: {
  sentence: string; selected: string | null; onSelect: (w: string) => void;
  checked: boolean; correctAnswer: string | string[]; color: string;
}) {
  const tokens = sentence.split(/\s+/);
  const corrects = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  return (
    <div className="flex flex-wrap gap-2 py-1">
      {tokens.map((token, i) => {
        const clean = token.replace(/[.?!,]$/, '');
        const isSelected = selected === token || selected === clean;
        const isCorrectToken = corrects.some((c) => c.toLowerCase() === clean.toLowerCase() || c.toLowerCase() === token.toLowerCase());
        let borderCol = '#ffffff10', bgCol = '#1a1a1a', textCol = '#eff1f6';
        if (!checked && isSelected) { borderCol = color; bgCol = `${color}15`; textCol = color; }
        else if (checked && isSelected && isCorrectToken) { borderCol = '#22c55e'; bgCol = '#22c55e15'; textCol = '#22c55e'; }
        else if (checked && isSelected && !isCorrectToken) { borderCol = '#ef4444'; bgCol = '#ef444415'; textCol = '#ef4444'; }
        else if (checked && isCorrectToken) { borderCol = '#22c55e50'; bgCol = '#22c55e08'; textCol = '#22c55e80'; }
        return (
          <button key={i} onClick={() => !checked && onSelect(token)} disabled={checked}
            className="px-3 py-2 rounded-lg text-sm font-mono font-medium transition-all active:scale-95"
            style={{ border: `1.5px solid ${borderCol}`, backgroundColor: bgCol, color: textCol }}>
            {token}
          </button>
        );
      })}
    </div>
  );
}

function ClassifyPicker({
  selected, onSelect, checked, correctAnswer,
}: { selected: string | null; onSelect: (v: string) => void; checked: boolean; correctAnswer: string | string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {MARKER_CARDS.map((card) => {
        const isSelected = selected === card.value;
        const isCorrect = isMatch(card.value, correctAnswer);
        const showWrong = checked && isSelected && !isCorrect;
        const showRight = checked && isCorrect;
        let borderCol = '#ffffff08', bgCol = '#141414', labelCol = '#8c8c8c';
        if (!checked && isSelected) { borderCol = card.color; bgCol = `${card.color}12`; labelCol = card.color; }
        else if (showRight) { borderCol = '#22c55e40'; bgCol = '#22c55e10'; labelCol = '#22c55e'; }
        else if (showWrong) { borderCol = '#ef444440'; bgCol = '#ef444410'; labelCol = '#ef4444'; }
        return (
          <button key={card.value} onClick={() => !checked && onSelect(card.value)} disabled={checked}
            className="p-3 rounded-xl text-left transition-all active:scale-[0.97]"
            style={{ border: `1.5px solid ${borderCol}`, backgroundColor: bgCol }}>
            <div className="text-[9px] text-[#5c5c5c] mb-1">{card.tag}</div>
            <div className="text-sm font-bold" style={{ color: labelCol }}>{card.label}</div>
          </button>
        );
      })}
    </div>
  );
}

function MCQOptions({
  options, selected, onSelect, checked, correctAnswer, color,
}: { options: string[]; selected: string | null; onSelect: (o: string) => void; checked: boolean; correctAnswer: string | string[]; color: string }) {
  return (
    <div className="space-y-2">
      {options.map((option, i) => {
        const isSelected = selected === option;
        const isCorrect = isMatch(option, correctAnswer);
        const showWrong = checked && isSelected && !isCorrect;
        const showRight = checked && isCorrect;
        let borderCol = '#ffffff08', bgCol = '#141414', textCol = '#eff1f6';
        if (!checked && isSelected) { borderCol = color; bgCol = `${color}12`; textCol = color; }
        else if (showRight) { borderCol = '#22c55e40'; bgCol = '#22c55e10'; textCol = '#22c55e'; }
        else if (showWrong) { borderCol = '#ef444440'; bgCol = '#ef444410'; textCol = '#ef4444'; }
        return (
          <button key={i} onClick={() => !checked && onSelect(option)} disabled={checked}
            className="w-full p-3.5 rounded-xl text-left transition-all"
            style={{ border: `1.5px solid ${borderCol}`, backgroundColor: bgCol }}>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ borderColor: borderCol, color: textCol }}>
                {showRight ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm" style={{ color: textCol }}>{option}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function GatePlayer({ drills, levelColor, levelId, onComplete }: GatePlayerProps) {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const drill = drills[index];
  const isLast = index === drills.length - 1;
  const progress = ((index + (checked ? 1 : 0)) / drills.length) * 100;
  const required = Math.ceil(drills.length * 0.9);
  const currentAnswer = selectedOption ?? userAnswer;
  const answerCorrect = checked && isMatch(currentAnswer, drill?.correctAnswer ?? '');

  const handleCheck = useCallback(() => {
    const answer = selectedOption ?? userAnswer;
    if (!answer.trim()) return;
    setChecked(true);
    if (isMatch(answer, drill.correctAnswer)) setScore((s) => s + 1);
  }, [selectedOption, userAnswer, drill]);

  const handleContinue = useCallback(() => {
    if (isLast) { onComplete(score); return; }
    setIndex((i) => i + 1);
    setUserAnswer('');
    setChecked(false);
    setSelectedOption(null);
  }, [isLast, score, onComplete]);

  if (!drill) { onComplete(score); return null; }

  const hasOptions = !!drill.options && drill.options.length > 0;
  const isMarkerTap = drill.type === 'marker-tap';
  const isMarkerClassify = drill.type === 'marker-classify';
  const typeLabel = drill.type.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-4">
      {/* Gate header */}
      <div className="flex items-center gap-3 rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-3.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${levelColor}15`, border: `1px solid ${levelColor}30` }}>
          <Shield size={15} style={{ color: levelColor }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-[#eff1f6]">Gate Check — Level {levelId}</p>
          <p className="text-[10px] text-[#5c5c5c]">Need {required}/{drills.length} correct to pass</p>
        </div>
        <div className="text-sm font-bold" style={{ color: score >= required ? '#22c55e' : levelColor }}>
          {score}/{index + (checked ? 1 : 0)}
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-[10px] text-[#5c5c5c] mb-1.5">
          <span>Question {index + 1} of {drills.length}</span>
          <span>No hints</span>
        </div>
        <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: levelColor }} />
        </div>
      </div>

      {/* Prompt */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${levelColor}15`, color: levelColor, border: `1px solid ${levelColor}30` }}>
          {typeLabel}
        </span>
        <p className="text-sm font-medium text-[#eff1f6] leading-relaxed">{drill.prompt}</p>
        {drill.somaliSentence && !isMarkerTap && (
          <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] p-3">
            <p className="text-sm font-medium text-[#eff1f6] font-mono">{drill.somaliSentence}</p>
          </div>
        )}
        {drill.blueprint && (
          <div className="flex flex-wrap items-center gap-2">
            {(['subject','marker','object','verb'] as const).map((slot) => {
              const val = drill.blueprint![slot];
              if (!val) return null;
              return (
                <div key={slot} className="flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] px-3 py-1.5">
                  <span className="text-[9px] font-bold text-[#3c3c3c] uppercase">{slot}</span>
                  <span className="text-xs text-[#eff1f6]">{val}</span>
                </div>
              );
            })}
          </div>
        )}
        {drill.sentenceA && (
          <div className="space-y-1.5">
            <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] p-2.5">
              <p className="text-xs font-mono text-[#eff1f6]">{drill.sentenceA}</p>
            </div>
            {drill.sentenceB && (
              <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] p-2.5">
                <p className="text-xs font-mono text-[#eff1f6]">{drill.sentenceB}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interaction */}
      {!checked && (
        <div className="space-y-3">
          {isMarkerTap && drill.somaliSentence && (
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
              <p className="text-[10px] text-[#3c3c3c] mb-3 uppercase tracking-wider font-bold">Tap the marker</p>
              <TappableTokens sentence={drill.somaliSentence} selected={selectedOption} onSelect={setSelectedOption}
                checked={false} correctAnswer={drill.correctAnswer} color={levelColor} />
            </div>
          )}
          {isMarkerClassify && (
            <ClassifyPicker selected={selectedOption} onSelect={setSelectedOption} checked={false} correctAnswer={drill.correctAnswer} />
          )}
          {hasOptions && !isMarkerClassify && !isMarkerTap && (
            <MCQOptions options={drill.options!} selected={selectedOption} onSelect={setSelectedOption}
              checked={false} correctAnswer={drill.correctAnswer} color={levelColor} />
          )}
          {!hasOptions && !isMarkerTap && !isMarkerClassify && (
            <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && currentAnswer.trim() && handleCheck()}
              placeholder="Type your answer..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#ffffff10] text-sm text-[#eff1f6] placeholder:text-[#3c3c3c] focus:outline-none transition-colors"
              style={{ borderColor: userAnswer ? `${levelColor}40` : undefined }} />
          )}
        </div>
      )}

      {/* Post-check states */}
      {checked && isMarkerTap && drill.somaliSentence && (
        <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
          <TappableTokens sentence={drill.somaliSentence} selected={selectedOption} onSelect={() => {}}
            checked={true} correctAnswer={drill.correctAnswer} color={levelColor} />
        </div>
      )}
      {checked && isMarkerClassify && (
        <ClassifyPicker selected={selectedOption} onSelect={() => {}} checked={true} correctAnswer={drill.correctAnswer} />
      )}
      {checked && hasOptions && !isMarkerClassify && !isMarkerTap && (
        <MCQOptions options={drill.options!} selected={selectedOption} onSelect={() => {}}
          checked={true} correctAnswer={drill.correctAnswer} color={levelColor} />
      )}

      {/* Feedback */}
      {checked && (
        <div className="rounded-xl border p-4 space-y-2"
          style={{ backgroundColor: answerCorrect ? '#22c55e0a' : '#ef44440a', borderColor: answerCorrect ? '#22c55e30' : '#ef444430' }}>
          <div className="flex items-center gap-2">
            {answerCorrect
              ? <><Check size={15} className="text-[#22c55e]" /><span className="text-sm font-bold text-[#22c55e]">Correct</span></>
              : <><XIcon size={15} className="text-[#ef4444]" /><span className="text-sm font-bold text-[#ef4444]">Not quite</span></>
            }
          </div>
          {!answerCorrect && (
            <p className="text-xs text-[#eff1f6]">
              <span className="text-[#5c5c5c]">Correct: </span>
              <span className="font-medium font-mono">
                {Array.isArray(drill.correctAnswer) ? drill.correctAnswer.join(' / ') : drill.correctAnswer}
              </span>
            </p>
          )}
          <p className="text-xs text-[#6a6a6a] leading-relaxed">{drill.explanation}</p>
        </div>
      )}

      {/* Action */}
      {!checked ? (
        <button onClick={handleCheck} disabled={!currentAnswer.trim()}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
          style={currentAnswer.trim() ? { backgroundColor: levelColor, color: '#0f0f0f' } : { backgroundColor: '#1a1a1a', color: '#3c3c3c', cursor: 'not-allowed' }}>
          Check Answer
        </button>
      ) : (
        <button onClick={handleContinue}
          className="w-full py-3.5 rounded-xl text-sm font-semibold bg-[#22c55e] text-[#0f0f0f] hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          <span>{isLast ? 'See Results' : 'Next Question'}</span>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
