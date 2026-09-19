/**
 * The checked-answer card for practice surfaces (homework, correctives):
 * a verdict line, then the item's explanation.
 *
 * Verdict color is the one place the monochrome palette breaks — green and
 * red carry meaning a learner scans for — and the wording carries it too,
 * so nothing depends on hue alone. The lesson player does NOT use this: its
 * feedback is a bottom sheet (FeedbackSheet), a different affordance.
 */

import { motion } from 'framer-motion';
import type { PracticeExercise } from '@/data/types';
import { displayAnswer, isAnswerCorrect } from '@/lib/grading';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';

export default function PracticeFeedback({
  exercise,
  answer,
}: {
  exercise: PracticeExercise;
  answer: string | null;
}) {
  const correct = isAnswerCorrect(exercise, answer);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-xl bg-elevated p-4"
    >
      <p className={`mb-1 text-footnote font-semibold ${correct ? 'text-green' : 'text-red'}`}>
        {correct ? (
          'Correct'
        ) : (
          <>
            Not quite. The answer is <Somali inherit>{displayAnswer(exercise)}</Somali>
          </>
        )}
      </p>
      <p className="text-footnote leading-relaxed text-label">
        <RichText text={exercise.explanation} />
      </p>
    </motion.div>
  );
}
