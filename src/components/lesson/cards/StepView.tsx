/**
 * One step of the lesson flow: the cards this step merged (steps.ts owns the
 * merging rule) rendered as one screen, with each card routed to its
 * renderer by type.
 */

import type { Card as TeachingCard } from '@/data/types';
import type { FlowCard, Step, VocabFlowCard } from '../steps';
import IntroCard from './IntroCard';
import VocabCard from './VocabCard';
import PassageCard from './PassageCard';
import TeachCard from './TeachCard';
import CoachCard from './CoachCard';
import PracticeCard from './PracticeCard';
import SummaryCard from './SummaryCard';

export default function StepView({
  step,
  lessonTitle,
  activeExercise,
  practiceAnswer,
  practiceChecked,
  showHint,
  onPracticeSelect,
}: {
  step: Step;
  lessonTitle: string;
  /** The item actually served: the step exercise, or its repair after a miss. */
  activeExercise?: TeachingCard['exercise'];
  practiceAnswer: string | null;
  practiceChecked: boolean;
  showHint: boolean;
  onPracticeSelect: (a: string) => void;
}) {
  return (
    <article className="lesson-article space-y-9">
      {step.cards.map((card, i) => (
        <RenderCard
          key={i}
          card={card}
          lessonTitle={lessonTitle}
          showTitle={i === 0}
          activeExercise={activeExercise}
          practiceAnswer={practiceAnswer}
          practiceChecked={practiceChecked}
          showHint={showHint}
          onPracticeSelect={onPracticeSelect}
        />
      ))}
    </article>
  );
}

function RenderCard({
  card,
  lessonTitle,
  showTitle,
  activeExercise,
  practiceAnswer,
  practiceChecked,
  showHint,
  onPracticeSelect,
}: {
  card: FlowCard;
  lessonTitle: string;
  showTitle: boolean;
  activeExercise?: TeachingCard['exercise'];
  practiceAnswer: string | null;
  practiceChecked: boolean;
  showHint: boolean;
  onPracticeSelect: (a: string) => void;
}) {
  switch (card.type) {
    case 'blueprint':
    case 'connect':
    case 'promise':
    case 'payoff':
    case 'predict':
      return (
        <IntroCard
          card={card}
          lessonTitle={lessonTitle}
          showTitle={showTitle}
        />
      );

    case 'vocab':
      return <VocabCard words={(card as VocabFlowCard).words} lessonTitle={(card as VocabFlowCard).lessonTitle} />;

    case 'passage':
      return card.passage ? <PassageCard card={card} /> : null;

    case 'teach':
    case 'example':
      return <TeachCard card={card} />;

    case 'coach':
      return <CoachCard card={card} />;

    case 'notice':
    case 'complete':
    case 'produce': {
      /* After a miss the player serves the repair, and the repair must be what
         the learner SEES — grading against the fresh item while the original
         stays on screen is the regression this override fixes. */
      const served =
        card.exercise && activeExercise &&
        (activeExercise.id === card.exercise.id || card.exercise.repair?.id === activeExercise.id)
          ? activeExercise
          : card.exercise;
      return served ? (
        <PracticeCard
          exercise={served}
          answer={practiceAnswer}
          checked={practiceChecked}
          showHint={showHint}
          onSelect={onPracticeSelect}
        />
      ) : null;
    }

    case 'summary':
      return <SummaryCard card={card} />;

    default:
      return null;
  }
}
