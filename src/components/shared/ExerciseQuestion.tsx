/**
 * One exercise's prompt: the question text, with the Somali sentence under
 * it in a card when the item carries one.
 *
 * The unit test's ItemQuestion and the homework working view rendered this
 * same pair twice; the lesson player's PracticeCard deliberately looks
 * different (bigger, no card) and stays its own thing.
 */

import type { PracticeExercise } from '@/data/types';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';

export default function ExerciseQuestion({
  exercise,
  className = '',
}: {
  exercise: PracticeExercise;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-title3 font-medium text-label">
        <RichText text={exercise.question} />
      </p>
      {exercise.somali && (
        <div className="mt-3 rounded-xl bg-elevated px-4 py-4 text-center">
          <Somali size="hero">{exercise.somali}</Somali>
        </div>
      )}
    </div>
  );
}
