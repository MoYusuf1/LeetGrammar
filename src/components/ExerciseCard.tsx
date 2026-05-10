import { useState, useCallback } from 'react';
import { Check, X } from 'lucide-react';

interface ExerciseCardProps {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  onAnswer: (correct: boolean) => void;
}

export default function ExerciseCard({
  question,
  options,
  answer,
  explanation,
  onAnswer,
}: ExerciseCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shaking, setShaking] = useState<number | null>(null);

  const handleSelect = useCallback(
    (index: number) => {
      if (showResult) return;
      setSelected(index);
      setShowResult(true);

      if (index === answer) {
        onAnswer(true);
      } else {
        setShaking(index);
        onAnswer(false);
      }
    },
    [showResult, answer, onAnswer]
  );

  const isCorrect = selected === answer;

  const reset = useCallback(() => {
    setSelected(null);
    setShowResult(false);
    setShaking(null);
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-[15px] font-medium text-[#eff1f6] leading-relaxed">{question}</p>

      <div className="space-y-2.5">
        {options.map((option, i) => {
          let bgClass = 'bg-[#1a1a1a] border border-[#ffffff15] hover:border-[#ffa11650]';
          if (showResult) {
            if (i === answer) {
              bgClass = 'bg-[#00b8a315] border border-[#00b8a3]';
            } else if (i === selected && !isCorrect) {
              bgClass = 'bg-[#ff375f15] border border-[#ff375f]';
            } else {
              bgClass = 'bg-[#1a1a1a] border border-[#ffffff08] opacity-50';
            }
          } else if (i === selected) {
            bgClass = 'bg-[#ffa11615] border border-[#ffa116]';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={`${bgClass} w-full text-left px-4 py-3.5 rounded-lg text-sm transition-all duration-150 flex items-center gap-3 ${shaking === i ? 'option-shake' : ''}`}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#282828] flex items-center justify-center text-[11px] font-bold text-[#8c8c8c]">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-[#eff1f6]">{option}</span>
              {showResult && i === answer && (
                <Check size={16} className="text-[#00b8a3] flex-shrink-0" />
              )}
              {showResult && i === selected && !isCorrect && (
                <X size={16} className="text-[#ff375f] flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className={`rounded-lg p-3.5 text-sm border ${isCorrect ? 'bg-[#00b8a310] border-[#00b8a330] text-[#00b8a3]' : 'bg-[#ff375f10] border-[#ff375f30] text-[#ff7b7b]'}`}>
          <p className="font-semibold mb-1">
            {isCorrect ? 'Correct!' : `The answer was: ${options[answer]}`}
          </p>
          <p className="text-[#c8c8c8]">{explanation}</p>
        </div>
      )}
    </div>
  );
}

export { ExerciseCard };
