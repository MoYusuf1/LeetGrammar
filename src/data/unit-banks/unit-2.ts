/**
 * UNIT 2 TEST BANK — the signal system.
 *
 * Covers Lesson 5 only for now. Unit 2 is planned as lessons 5–8 (signals,
 * fusion, verbs, full sentences); as each lands, add its items here. The bank
 * is deliberately a separate file per unit so it can grow without the unit
 * registry growing with it — see docs/ADDING_CONTENT.md, Recipe 2.
 *
 * THREE RULES FOR ADDING AN ITEM (identical to unit-1.ts)
 *
 * 1. **Registry-verified Somali only.** Every Somali string here — answers,
 *    word banks, and the correct answer of a choice item — must be a key in
 *    verified-forms.ts. `npm run validate:course` checks it and exits non-zero
 *    on a miss. Distractor options that are deliberately *wrong* are exempt:
 *    they are the mistake being tested and are never shown as correct.
 *
 * 2. **Machine-gradable.** Every item is graded by `isAnswerCorrect()`, so
 *    typed answers are single Somali words or a sourced sentence — never open
 *    ended.
 *
 * 3. **Not a copy of a practice item.** A test built from the exercises the
 *    learner just did measures recall of those exercises. Where a fact must be
 *    re-tested, the item flips the shape: what Lesson 5 asked as a choice is
 *    asked here as production, and vice versa. A test in src/tests/ fails if a
 *    bank question repeats a lesson question verbatim.
 *
 * ON THE VERBS. Lesson 5 shows Nilsson's minimal pair whole and never asks the
 * learner to build it. The same restraint applies here: items ask *which word
 * is spotlighted* and *which signal does that*, never how a verb is formed.
 * Verb morphology is Lesson 7 and must not leak into this bank early.
 */

import type { PracticeExercise, TestBank } from '../types';

const UNIT_2_ITEMS: PracticeExercise[] = [
  // ── waa: the plain statement ────────────────────────────────────────────
  {
    id: 'u2-t01',
    type: 'multiple_choice',
    objectiveIds: ['signal-statement'],
    question: 'Which signal marks an ordinary statement, with no word singled out?',
    options: ['waa', 'baa', 'waxa', 'ayaa'],
    correctAnswer: 'waa',
    hint: 'Three of these put a spotlight somewhere. One simply states.',
    explanation:
      '**waa** marks a plain statement — **Wiilku waa macallin**, "The boy is a teacher". The other three all claim that some particular word is the point of the sentence.',
  },
  {
    id: 'u2-t02',
    type: 'multiple_choice',
    objectiveIds: ['signal-statement'],
    question:
      'A friend asks what your brother does for a living. You answer with a flat fact, nothing contrasted. Which sentence fits?',
    options: [
      'Wiilku waa macallin.',
      'Sahra baa salaamaysa saaxiibkeed.',
      'Sahra waxa ay salaamaysaa saaxiibkeed.',
      'None of these can state a plain fact.',
    ],
    correctAnswer: 'Wiilku waa macallin.',
    hint: 'Look for the signal that does not spotlight anything.',
    explanation:
      'Only the **waa** sentence is a neutral statement. The **baa** and **waxa** sentences both insist that one particular word is the point, which is more than the question asked for.',
  },

  // ── baa / ayaa: spotlight to the left ───────────────────────────────────
  {
    id: 'u2-t03',
    type: 'marker_identification',
    objectiveIds: ['signal-focus-before'],
    question: 'Type the signal word in this sentence.',
    somali: 'Sahra baa salaamaysa saaxiibkeed',
    answer: 'baa',
    hint: 'Not the name, not the long words — the short one sitting second.',
    explanation:
      '**baa** is the signal. It has no translation of its own; its job is to mark that the word immediately before it, **Sahra**, is what the sentence is about.',
  },
  {
    id: 'u2-t04',
    type: 'multiple_choice',
    objectiveIds: ['signal-focus-before'],
    question: 'Where do you look to find the spotlighted word when you see **baa**?',
    options: [
      'Immediately before it',
      'Immediately after it',
      'At the very end of the sentence',
      'At the very start of the sentence',
    ],
    correctAnswer: 'Immediately before it',
    hint: 'One signal points backwards and one points forwards. This is the backwards one.',
    explanation:
      '**baa** spotlights whatever sits immediately to its left. That is what separates it from **waxa**, which points forward to the end of the sentence.',
  },
  {
    id: 'u2-t05',
    type: 'multiple_choice',
    objectiveIds: ['signal-focus-before'],
    question: 'Which word does the same job as **baa**, just a little more formally?',
    options: ['ayaa', 'waxa', 'waa', 'ay'],
    correctAnswer: 'ayaa',
    hint: 'It is not the one that points at the end, and not the plain-statement one.',
    explanation:
      '**ayaa** and **baa** are interchangeable — both spotlight the words immediately before them. **ayaa** reads as slightly more formal. **ay** is something different: the short pronoun "she".',
  },

  // ── waxa: spotlight to the right ────────────────────────────────────────
  {
    id: 'u2-t06',
    type: 'marker_identification',
    objectiveIds: ['signal-focus-end'],
    question: 'Type the signal word in this sentence.',
    somali: 'Sahra waxa ay salaamaysaa saaxiibkeed',
    answer: 'waxa',
    hint: 'Two short words sit together here. The signal is the first of them.',
    explanation:
      '**waxa** is the signal; **ay** behind it is the short pronoun "she". **waxa** throws the spotlight forward, onto whatever ends the sentence.',
  },
  {
    id: 'u2-t07',
    type: 'multiple_choice',
    objectiveIds: ['signal-focus-end'],
    question:
      'In **Sahra waxa ay salaamaysaa saaxiibkeed**, what is the sentence really about?',
    options: ['her friend', 'Sahra', 'the greeting itself', 'nothing in particular'],
    correctAnswer: 'her friend',
    hint: '**waxa** points forward. What finishes the sentence?',
    explanation:
      '**waxa** spotlights the end of the sentence, which is **saaxiibkeed** — her friend. In English you would say it as "Sahra is greeting her FRIEND."',
  },

  // ── The contrast — the point of the whole lesson ────────────────────────
  {
    id: 'u2-t08',
    type: 'multiple_choice',
    objectiveIds: ['signal-focus-before', 'signal-focus-end'],
    question:
      'Two sentences use exactly the same words. Which one tells you it was **Sahra**, and nobody else, doing the greeting?',
    options: [
      'Sahra baa salaamaysa saaxiibkeed.',
      'Sahra waxa ay salaamaysaa saaxiibkeed.',
      'Both, equally.',
      'Neither — the words are identical, so the meaning is identical.',
    ],
    correctAnswer: 'Sahra baa salaamaysa saaxiibkeed.',
    hint: 'For the spotlight to land on Sahra, which signal has to follow her name?',
    explanation:
      '**baa** placed straight after **Sahra** spotlights Sahra. The **waxa** version spotlights **saaxiibkeed** instead. Identical words, opposite point — the signal is the only thing carrying the difference.',
  },
  {
    id: 'u2-t09',
    type: 'multiple_choice',
    objectiveIds: ['signal-focus-before', 'signal-focus-end'],
    question:
      'English marks emphasis by saying a word louder. What does Somali use instead?',
    options: [
      'A signal word, whose position shows what is spotlighted',
      'Saying the word louder, exactly as English does',
      'Moving the emphasised word to the front and leaving it there',
      'A special ending attached to the emphasised word',
    ],
    correctAnswer: 'A signal word, whose position shows what is spotlighted',
    hint: 'It is the thing that has no English equivalent at all.',
    explanation:
      'Somali carries with a signal word what English carries with tone of voice. **baa** spotlights what precedes it, **waxa** what ends the sentence — so a flat, evenly-read Somali sentence still tells a reader exactly which word matters.',
  },
];

export const UNIT_2_TEST: TestBank = {
  id: 'unit-2-test',
  name: 'Unit 2 Test',
  description:
    'The signal system from Lesson 5: waa for a plain statement, baa for a spotlight on what comes just before, waxa for a spotlight on what comes at the end.',
  items: UNIT_2_ITEMS,
};
