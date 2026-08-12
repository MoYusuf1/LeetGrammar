/**
 * UNIT 2 TEST BANK — the signal system.
 *
 * Covers lessons 5–8: the signals, how they fuse with the short pronouns, the
 * present-tense endings, and word order. The bank is a separate file per unit
 * so it can grow without the unit registry growing with it — see
 * docs/ADDING_CONTENT.md, Recipe 2.
 *
 * The test a learner actually sits is larger than this file: composeUnitTest()
 * folds in one item per Unit 1 objective. You do not write those.
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
 * ON SHOWING VS ASKING. Several example sentences here carry vocabulary only
 * one source attests (salaamaysa, cabbay, tegey, koob). Check S6 keeps those
 * read-only: they appear in questions and options, never as a typed answer.
 * Every production item answers with fully double-sourced material.
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

  // ── Lesson 6: fusion ────────────────────────────────────────────────────
  {
    id: 'u2-t10',
    type: 'multiple_choice',
    objectiveIds: ['signal-fusion'],
    question: 'Why does a signal word often seem to be missing from a Somali sentence?',
    options: [
      'It has fused with the short word for who, into one word',
      'Signals are optional and are usually left out',
      'It moved to the end of the sentence',
      'It only appears in writing, never in speech',
    ],
    correctAnswer: 'It has fused with the short word for who, into one word',
    hint: 'Look at the front of the short words starting w- or b-.',
    explanation:
      'The signal is still there — it is the front half of a squashed word. **waa** plus **uu** prints as **wuu**, so hunting for a standalone **waa** finds nothing.',
  },
  {
    id: 'u2-t11',
    type: 'translate',
    objectiveIds: ['signal-fusion'],
    question: 'Type the one word for the plain-statement signal **waa** carrying **uu** (he).',
    answer: 'wuu',
    hint: 'The w of the signal, then the vowel of the pronoun.',
    explanation: '**waa** + **uu** → **wuu**. A plain statement, about him.',
  },
  {
    id: 'u2-t12',
    type: 'multiple_choice',
    objectiveIds: ['signal-fusion-unpack'],
    question: 'Split **waxay** into the two things it is carrying.',
    options: [
      'waxa (spotlight at the end) + ay (she / they)',
      'waa (plain statement) + ay (she / they)',
      'waxa (spotlight at the end) + uu (he)',
      'baa (spotlight before) + ay (she / they)',
    ],
    correctAnswer: 'waxa (spotlight at the end) + ay (she / they)',
    hint: 'The front of the word gives the signal; the ending gives who.',
    explanation:
      '**waxay** is **waxa** + **ay**. With **uu** instead it would be the irregular **wuxuu**; with the plain signal it would be **way**.',
  },
  {
    id: 'u2-t13',
    type: 'translate',
    objectiveIds: ['signal-fusion-unpack'],
    question:
      'One squashed word does not look like its own parts. Type the word that is **waxa** plus **uu** (he).',
    answer: 'wuxuu',
    hint: 'Not "waxauu" — the vowel in the middle shifts.',
    explanation:
      '**wuxuu** is the irregular member of the family, and among the most common words in written Somali. Its neighbours (**waxaan**, **waxaad**, **waxay**) are all regular.',
  },

  // ── Lesson 7: verbs and person ──────────────────────────────────────────
  {
    id: 'u2-t14',
    type: 'translate',
    objectiveIds: ['verb-person-endings'],
    question: 'Type the form of **keen** (bring) that means **they bring**.',
    answer: 'keenaan',
    hint: 'A plural, but not the one with the **t** of "you".',
    explanation:
      '**keenaan** — the **-aan** ending. **keentaan** carries the **t** of *you*, so it is "you (plural) bring".',
  },
  {
    id: 'u2-t15',
    type: 'multiple_choice',
    objectiveIds: ['verb-person-endings'],
    question: 'Which ending marks **we**?',
    options: ['-naa', '-taa', '-aan', '-taan'],
    correctAnswer: '-naa',
    hint: 'Plurals bring an **n** with them; this is the one without a **t**.',
    explanation:
      '**-naa** is the *we* ending, giving **keennaa**. **-aan** is *they*, **-taan** is *you* plural, and **-taa** is *you* or *she*.',
  },
  {
    id: 'u2-t16',
    type: 'multiple_choice',
    objectiveIds: ['verb-ending-ambiguity'],
    question: 'Why can the ending **-aa** not tell you on its own who is acting?',
    options: [
      'It covers both I and he — the signal in front decides',
      'It is only used in writing, never in speech',
      'It has no meaning; only the signal carries any',
      'It covers every person, so it never narrows anything',
    ],
    correctAnswer: 'It covers both I and he — the signal in front decides',
    hint: 'Count how many people that one ending is responsible for.',
    explanation:
      '**-aa** covers *I* and *he*, so **keenaa** is ambiguous alone. **waan keenaa** is "I bring", **wuu keenaa** is "he brings". The ending narrows it to two; the signal picks one.',
  },
  {
    id: 'u2-t17',
    type: 'multiple_choice',
    objectiveIds: ['verb-ending-ambiguity', 'signal-fusion-unpack'],
    question: 'What does **waad keentaa** mean?',
    options: ['you bring', 'she brings', 'they bring', 'I bring'],
    correctAnswer: 'you bring',
    hint: 'Unsquash **waad** first, then see which of the two people **-taa** allows.',
    explanation:
      '**waad** is **waa** + **aad** (you), and **-taa** covers *you* and *she*. Only *you* satisfies both. Swap the signal to **way** and the same verb means "she brings".',
  },

  // ── Lesson 8: word order ────────────────────────────────────────────────
  // Written production-first where the sourcing allows it. Orwin's example
  // sentences carry Orwin-only vocabulary, so those items are recognition and
  // the typed answers use fully double-sourced material instead.
  {
    id: 'u2-t18',
    type: 'unscramble',
    objectiveIds: ['order-signal-hugs-verb'],
    question: 'Put these in order to say "he brings".',
    words: ['keenaa', 'wuu'],
    answer: 'wuu keenaa',
    hint: 'The signal hugs the action word from in front.',
    explanation:
      '**wuu keenaa.** The signal always sits immediately before the action word, never after it.',
  },
  {
    id: 'u2-t19',
    type: 'unscramble',
    objectiveIds: ['order-signal-hugs-verb'],
    question:
      'Arrange these so the signal lands where it belongs — immediately before what is said about the boy.',
    words: ['waa', 'macallin', 'Wiilku'],
    answer: 'Wiilku waa macallin',
    hint: 'Who first. The signal goes immediately before what is being said about him.',
    explanation:
      '**Wiilku waa macallin.** The subject leads and **waa** takes the slot right before what the boy is — the same place an action word would sit.',
  },
  {
    id: 'u2-t20',
    type: 'multiple_choice',
    objectiveIds: ['order-verb-last'],
    question:
      '**Nin shaah wuu cabbay** means "A man drank tea". What order are the words actually in?',
    options: [
      'a man · tea · (signal + he) · drank',
      'a man · drank · tea · (signal + he)',
      'drank · a man · tea · (signal + he)',
      '(signal + he) · a man · drank · tea',
    ],
    correctAnswer: 'a man · tea · (signal + he) · drank',
    hint: 'The action word is not where English would put it.',
    explanation:
      'The thing acted on (**shaah**, tea) comes before the action (**cabbay**, drank), which lands at the end. Read literally it is "a man tea he-drank".',
  },
  {
    id: 'u2-t21',
    type: 'multiple_choice',
    objectiveIds: ['order-signal-hugs-verb'],
    question: 'Which is the most dependable thing to know about where words go in a Somali sentence?',
    options: [
      'The signal sits immediately before the action word',
      'The subject is always the first word',
      'The object is always the last word',
      'Nothing is dependable; the order is free',
    ],
    correctAnswer: 'The signal sits immediately before the action word',
    hint: 'One of these holds even when the other words move around.',
    explanation:
      'Noun phrases move about more freely in Somali than in English, so subject-first and object-last are tendencies rather than rules. The signal keeping to the front of the verb is the landmark that holds.',
  },
  {
    id: 'u2-t22',
    type: 'multiple_choice',
    objectiveIds: ['order-waxa-moves-it', 'signal-focus-end'],
    question: 'Why do **waxa** sentences put words after the action word, when Somali usually ends on it?',
    options: [
      'Because waxa spotlights the end, so the spotlighted words must get there',
      'Because waxa is an irregular word that ignores word order',
      'Because the action word moves to the front after waxa',
      'Because waxa can only be used in questions',
    ],
    correctAnswer: 'Because waxa spotlights the end, so the spotlighted words must get there',
    hint: 'Think about what **waxa** promised to do back in Lesson 5.',
    explanation:
      '**waxa** spotlights whatever finishes the sentence. Since the verb normally finishes it, the spotlighted words have to travel past the verb — the construction is the spotlight doing exactly its job.',
  },
  {
    id: 'u2-t23',
    type: 'multiple_choice',
    objectiveIds: ['order-verb-last'],
    question: 'Reading **Koob keen!** literally, word by word, what does it say?',
    options: ['a cup — bring!', 'bring — a cup!', 'a cup — is brought', 'bring it — the cup'],
    correctAnswer: 'a cup — bring!',
    hint: 'Somali gets to the action after saying what it is done to.',
    explanation:
      '**Koob keen!** is literally "a cup bring!" — the thing acted on comes first and the action word lands at the end, the reverse of the English order.',
  },
  {
    id: 'u2-t24',
    type: 'multiple_choice',
    objectiveIds: ['order-waxa-moves-it', 'order-verb-last'],
    question:
      'Somali usually finishes on the action word. Which signal makes words appear *after* it, and why?',
    options: [
      'waxa — because it spotlights whatever ends the sentence',
      'baa — because it spotlights whatever ends the sentence',
      'waa — because plain statements reverse the order',
      'None — nothing may follow the action word',
    ],
    correctAnswer: 'waxa — because it spotlights whatever ends the sentence',
    hint: 'One signal points forward rather than back.',
    explanation:
      '**waxa** spotlights the end of the sentence, so the spotlighted words must travel past the verb to get there. **baa** spotlights what sits immediately before it and leaves the verb at the end.',
  },
];

export const UNIT_2_TEST: TestBank = {
  id: 'unit-2-test',
  name: 'Unit 2 Test',
  description:
    'Everything from lessons 5 to 7: the three signals, how they fuse with the short pronouns, and the action-word endings. A handful of questions from Unit 1 are folded in, so this also checks what has stuck.',
  items: UNIT_2_ITEMS,
};
