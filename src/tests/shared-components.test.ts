/**
 * Rendering contracts for the shared UI layer.
 *
 * The shared primitives exist so the task surfaces cannot drift apart; these
 * pin the parts of their output the surfaces depend on, so a change to a
 * shared component breaks here rather than silently on three screens.
 *
 * Server-rendered markup, not a browser: the contract is the DOM and class
 * structure, which renderToStaticMarkup gives us without a harness.
 */

import { describe, it, expect } from 'vitest';
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';
import Prose from '@/components/lesson/Prose';
import TaskShell from '@/components/shared/TaskShell';
import CenteredNotice from '@/components/shared/CenteredNotice';
import { FactList, FactRow } from '@/components/shared/FactList';
import ExerciseQuestion from '@/components/shared/ExerciseQuestion';
import PracticeFeedback from '@/components/shared/PracticeFeedback';
import PracticeActionBar from '@/components/shared/PracticeActionBar';
import CircleIconButton from '@/components/shared/CircleIconButton';
import { PrimaryButton, SecondaryButton } from '@/components/shared/buttons';
import { QUESTION_MODE } from '@/components/unit-test/question-mode';
import type { PracticeExercise } from '@/data/types';

const exercise: PracticeExercise = {
  id: 'ex-1',
  type: 'multiple_choice',
  question: 'Which form is definite?',
  options: ['guri', 'guriga'],
  correctAnswer: 'guriga',
  hint: 'Look at the ending.',
  explanation: 'The **-ka** ending marks definiteness.',
  objectiveIds: ['o1'],
};

describe('QUESTION_MODE', () => {
  it('labels every exercise type the course can serve', () => {
    expect(Object.keys(QUESTION_MODE).sort()).toEqual(
      ['fill_blank', 'marker_identification', 'matching', 'multiple_choice', 'translate', 'unscramble'].sort(),
    );
    for (const label of Object.values(QUESTION_MODE)) expect(label.length).toBeGreaterThan(0);
  });
});

describe('RichText', () => {
  it('renders **bold** as strong and *italic* as em', () => {
    const html = renderToStaticMarkup(h(RichText, { text: 'The **-ka** ending, *the house*, plain' }));
    expect(html).toContain('<strong');
    expect(html).toContain('-ka');
    expect(html).toContain('<em');
    expect(html).toContain('the house');
    expect(html).not.toContain('**');
  });
});

describe('Somali', () => {
  it('marks the text as Somali for assistive technology', () => {
    const html = renderToStaticMarkup(h(Somali, { size: 'hero', children: 'guriga' }));
    expect(html).toContain('lang="so"');
  });
});

describe('Prose', () => {
  it('renders authored bullet lines as a list, not flowing text', () => {
    const html = renderToStaticMarkup(h(Prose, { text: 'Lead in.\n• first point\n• second point' }));
    expect(html).toContain('<ul');
    expect(html.match(/<li/g)?.length).toBe(2);
  });
});

describe('ExerciseQuestion', () => {
  it('shows the Somali specimen only when the item carries one', () => {
    const without = renderToStaticMarkup(h(ExerciseQuestion, { exercise }));
    expect(without).toContain('Which form is definite?');
    expect(without).not.toContain('lang="so"');
    const withSomali = renderToStaticMarkup(
      h(ExerciseQuestion, { exercise: { ...exercise, somali: 'guriga' } }),
    );
    expect(withSomali).toContain('guriga');
  });
});

describe('PracticeFeedback', () => {
  it('says Correct for a right answer and shows the answer for a wrong one', () => {
    const right = renderToStaticMarkup(h(PracticeFeedback, { exercise, answer: 'guriga' }));
    expect(right).toContain('Correct');
    const wrong = renderToStaticMarkup(h(PracticeFeedback, { exercise, answer: 'guri' }));
    expect(wrong).toContain('Not quite');
    expect(wrong).toContain('guriga');
  });
});

describe('PracticeActionBar', () => {
  it('gates Check on an answer and switches to the continue action once checked', () => {
    const blocked = renderToStaticMarkup(
      h(PracticeActionBar, { checked: false, canCheck: false, onCheck: () => {}, onNext: () => {}, isLast: false, lastLabel: 'Finish' }),
    );
    expect(blocked).toContain('disabled=""');
    const checked = renderToStaticMarkup(
      h(PracticeActionBar, { checked: true, canCheck: true, onCheck: () => {}, onNext: () => {}, isLast: true, lastLabel: 'Finish' }),
    );
    expect(checked).toContain('Finish');
    expect(checked).not.toContain('Check answer');
  });
});

describe('FactList', () => {
  it('renders facts as a definition list', () => {
    const html = renderToStaticMarkup(
      h(FactList, { children: h(FactRow, { label: 'Questions', value: '12', first: true }) }),
    );
    expect(html).toContain('<dl');
    expect(html).toContain('<dt');
    expect(html).toContain('Questions');
  });
});

describe('TaskShell and CenteredNotice', () => {
  it('renders title, progress and the extra header row', () => {
    const html = renderToStaticMarkup(
      h(TaskShell, { onClose: () => {}, title: 'Unit 1 test', progress: '3/12', below: h('div', {}, 'bar'), children: 'body' }),
    );
    expect(html).toContain('Unit 1 test');
    expect(html).toContain('3/12');
    expect(html).toContain('bar');
  });

  it('only offers the back link when asked', () => {
    const plain = renderToStaticMarkup(h(CenteredNotice, { children: 'gone' }));
    expect(plain).not.toContain('Back to lessons');
    const linked = renderToStaticMarkup(
      h(MemoryRouter, { children: h(CenteredNotice, { withBackLink: true, children: 'gone' }) }),
    );
    expect(linked).toContain('Back to lessons');
  });
});

describe('buttons', () => {
  it('primary and secondary stay visually distinct', () => {
    const primary = renderToStaticMarkup(h(PrimaryButton, { children: 'Go' }));
    const secondary = renderToStaticMarkup(h(SecondaryButton, { children: 'Stop' }));
    expect(primary).toContain('bg-accent');
    expect(secondary).not.toContain('bg-accent');
  });

  it('the circle icon button always names its action', () => {
    const html = renderToStaticMarkup(h(CircleIconButton, { label: 'Close lesson', children: 'x' }));
    expect(html).toContain('aria-label="Close lesson"');
  });
});
