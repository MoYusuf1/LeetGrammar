/**
 * The retrieval card — question, answer input, hint behind the lamp.
 *
 * Also exports FeedbackHeading, the verdict line the feedback sheet shows
 * after a check; the repair session reuses both so repair reads as a
 * continuation of the lesson, not a separate app.
 */

import { motion } from 'framer-motion';
import type { PracticeExercise } from '@/data/types';
import { displayAnswer, isAnswerCorrect, isSelfGraded } from '@/lib/grading';
import AnswerInput from '../AnswerInput';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';
import { contentStagger } from '../motion';

export function FeedbackHeading({
  exercise,
  answer,
}: {
  exercise: PracticeExercise;
  answer: string | null;
}) {
  if (isSelfGraded(exercise)) {
    return (
      <>
        Answer: <Somali inherit>{displayAnswer(exercise)}</Somali>
      </>
    );
  }
  if (isAnswerCorrect(exercise, answer)) return <>Correct</>;
  return (
    <>
      Not quite. The answer is <Somali inherit>{displayAnswer(exercise)}</Somali>
    </>
  );
}

export default function PracticeCard({
  exercise,
  answer,
  checked,
  showHint,
  onSelect,
}: {
  exercise: PracticeExercise;
  answer: string | null;
  checked: boolean;
  showHint: boolean;
  onSelect: (a: string) => void;
}) {
  return (
    <div className="space-y-6">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <p className="text-title2 font-semibold leading-[1.3] text-label">
          <RichText text={exercise.question} />
        </p>
        {exercise.somali && (
          <div className="mt-5 text-center">
            <Somali size="hero">{exercise.somali}</Somali>
          </div>
        )}
      </motion.div>

      {/* Keyed by exercise id, and it must stay keyed. AnswerInput holds the
          assembled word bank for an unscramble in its own state; without a key
          React reuses the instance across cards, so the words tapped on one
          card arrive already-placed on the next and its own chips render as
          spent. Check then stays disabled forever — a softlock the learner can
          only escape via Reset. It went unnoticed until Lesson 8 became the
          first lesson with two unscrambles in a row. */}
      <AnswerInput key={exercise.id} exercise={exercise} answer={answer} checked={checked} onSelect={onSelect} />

      {(exercise.type === 'translate' || exercise.type === 'marker_identification') && (
        <p className="text-footnote text-label-3">
          Type your best answer, then check: you grade yourself against the explanation.
        </p>
      )}

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-fill p-4"
        >
          <p className="text-subhead text-label">
            <RichText text={exercise.hint} />
          </p>
        </motion.div>
      )}
    </div>
  );
}
