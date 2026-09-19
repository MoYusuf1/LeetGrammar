/**
 * Unit Test Page — the mastery check at the end of a unit.
 *
 * Route: /unit-test/:id  (HashRouter, so #/unit-test/1)
 *
 * Three phases, each a component under components/unit-test/; this file is
 * only the phase machine and the state they share:
 *   intro    — what the test covers and what passing takes
 *   test     — one item at a time, no hints and no feedback until the end
 *   results  — score, per-objective breakdown, every missed item, correctives
 *
 * THERE IS NO LOCKED PHASE ANY MORE. The 85% criterion and the correctives
 * routing are both kept — the mastery literature identifies those as the active
 * ingredients — but the block on *taking* the test is gone. That evidence comes
 * from gated classroom designs, and this is one adult studying alone who can
 * simply stop using the app; being locked out of your own software is a
 * different proposition from being held back by a teacher. COURSE_DESIGN §3.2
 * records this as a deliberate deviation from the evidence rather than an
 * improvement on it.
 *
 * Sitting a test for unfinished lessons is now allowed and merely noted.
 *
 * The test deliberately shows less than the lesson player does. A hint on a
 * test item measures the hint; feedback between items lets a learner correct a
 * misreading mid-test and inflates the score the correctives router depends on.
 * Both come back in correctives, which is practice.
 *
 * Grading is `gradeUnitTest()` in lib/assessment.ts — this page decides nothing
 * about right and wrong itself.
 */

import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getUnit, getUnitTest, composeUnitTest } from '@/data/unit-tests';
import {
  gradeUnitTest,
  selectCorrectivesItems,
  isUnitComplete,
  type UnitTestResult,
} from '@/lib/assessment';
import { useProgressStore } from '@/stores/progress-store';
import CenteredNotice from '@/components/shared/CenteredNotice';
import TestIntro from '@/components/unit-test/TestIntro';
import TestSession from '@/components/unit-test/TestSession';
import TestResults from '@/components/unit-test/TestResults';
import Correctives from '@/components/unit-test/Correctives';

type Phase = 'intro' | 'test' | 'results' | 'correctives';

export default function UnitTestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProgressStore();

  const unitId = parseInt(id ?? '1', 10);
  const unit = getUnit(unitId);
  const bank = getUnitTest(unitId);

  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | null>>({});
  const [result, setResult] = useState<UnitTestResult | null>(null);

  const completedLessons = (store.completedLessons as number[] | undefined) ?? [];
  const unlocked = isUnitComplete(unitId, completedLessons);

  // The composed test, not the raw bank: this unit's items plus carried-back
  // items from earlier units. See composeUnitTest() for why carry-back is
  // composed rather than authored.
  const priorAttempts = store.getUnitTestRecord?.(unitId)?.attempts ?? 0;
  const items = useMemo(() => composeUnitTest(unitId, 13, priorAttempts), [unitId, priorAttempts]);
  const current = items[index];

  const correctives = useMemo(
    () => (result ? selectCorrectivesItems(items, result.failedObjectives) : []),
    [result, items],
  );

  if (!unit || !bank) {
    return <CenteredNotice>No test exists for that unit yet.</CenteredNotice>;
  }

  const answer = current ? responses[current.id] ?? null : null;

  const setAnswer = (value: string) => {
    if (!current) return;
    setResponses((prev) => ({ ...prev, [current.id]: value }));
  };

  const finish = () => {
    const graded = gradeUnitTest(unitId, items, responses);
    store.recordUnitTestResult(graded);
    setResult(graded);
    setPhase('results');
  };

  const restart = () => {
    setResponses({});
    setIndex(0);
    setResult(null);
    setPhase('intro');
  };

  if (phase === 'intro') {
    return (
      <TestIntro
        bank={bank}
        items={items}
        priorAttempts={priorAttempts}
        record={store.getUnitTestRecord?.(unitId)}
        unlocked={unlocked}
        lessonRange={[unit.lessonIds[0], unit.lessonIds.at(-1) ?? unit.lessonIds[0]]}
        onStart={() => setPhase('test')}
        onClose={() => navigate('/learn')}
      />
    );
  }

  if (phase === 'test' && current) {
    const answered = Object.values(responses).filter((r) => r !== null && r !== '').length;
    return (
      <TestSession
        title={bank.name}
        items={items}
        index={index}
        answer={answer}
        answered={answered}
        onClose={() => setPhase('intro')}
        onBack={() => setIndex((i) => Math.max(0, i - 1))}
        onNext={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
        onFinish={finish}
        onAnswer={setAnswer}
      />
    );
  }

  if (phase === 'correctives') {
    return (
      <Correctives
        items={correctives}
        onDone={() => setPhase('results')}
        onBack={() => setPhase('results')}
      />
    );
  }

  if (phase === 'results' && result) {
    return (
      <TestResults
        result={result}
        items={items}
        responses={responses}
        correctiveCount={correctives.length}
        onCorrectives={() => setPhase('correctives')}
        onRetake={restart}
        onDone={() => navigate('/learn')}
      />
    );
  }

  return <CenteredNotice>Something went wrong loading the test.</CenteredNotice>;
}
