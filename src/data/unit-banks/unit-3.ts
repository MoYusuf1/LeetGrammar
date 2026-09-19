/**
 * UNIT 3 TEST BANK — describing words, number words, relation words.
 *
 * Covers lessons 9–11. Sourcing: every Somali string is registry-verified
 * (docs/SOMALI_SOURCES.md, Unit 3 section); Orwin citations were verified on
 * the PDF pages. Production answers use only double-sourced forms (gate S6).
 *
 * The test a learner sits is larger than this file: composeUnitTest() folds
 * in one item per earlier-unit objective. You do not write those.
 *
 * The three rules for adding an item are identical to unit-1.ts/unit-2.ts:
 * registry-verified Somali only; machine-gradable; no verbatim repeat of a
 * lesson question (flip the shape instead).
 */

import type { PracticeExercise, TestBank } from '../types';

const UNIT_3_ITEMS: PracticeExercise[] = [
  // ── Describing words: position (Lesson 9) ───────────────────────────────
  {
    id: 'u3-t01', type: 'unscramble', objectiveIds: ['adjective-position', 'adjective-definiteness'],
    question: 'Build "the new house" from the words.',
    words: ['cusub', 'guriga'],
    answer: 'guriga cusub',
    hint: '"The" rides on the thing-word; the describing word follows.',
    explanation: '**guriga cusub**: the **-ga** stays on **guri**, and **cusub** follows it. Orwin p.63: the definite ending attaches only to the noun.',
  },
  {
    id: 'u3-t02', type: 'translate', objectiveIds: ['adjective-position'],
    question: 'Type the Somali for "a small bird".',
    answer: 'shimbir yar',
    hint: 'Thing-word first, describing word after it.',
    explanation: '**shimbir yar**: the bird, then small. A describing word follows the word it describes (Orwin p.63; Nilsson p.76).',
  },
  // ── Describing words: definiteness (Lesson 9) ───────────────────────────
  {
    id: 'u3-t03', type: 'fill_blank', objectiveIds: ['adjective-definiteness'],
    question: '**guriga ___** — the new house',
    options: ['cusub', 'cusubka', 'weyn'],
    correctAnswer: 'cusub',
    hint: 'Only one word in the pair carries "the". Which one already has it?',
    explanation: '**guriga cusub**: the ending lives on **guri** alone. The describing word never takes its own "the" ending (Orwin p.63).',
  },
  {
    id: 'u3-t04', type: 'translate', objectiveIds: ['adjective-definiteness', 'adjective-position'],
    question: 'How do you say "the big man" in Somali? Type it.',
    answer: 'ninka weyn',
    hint: '**nin** takes the ending; **weyn** follows.',
    explanation: '**ninka weyn**: **ninka** carries "the", **weyn** (big) follows untouched. Two words, no separate word for "the".',
  },
  // ── Describing words: doer-marking (Lesson 9) ───────────────────────────
  {
    id: 'u3-t05', type: 'multiple_choice', objectiveIds: ['adjective-subject-marking'],
    question: 'In "Ninka dheeri waa tagay", which word carries the doer mark?',
    options: ['dheeri', 'ninka', 'waa', 'tagay'],
    correctAnswer: 'dheeri',
    hint: 'The mark hops to the last word of the pair.',
    explanation: '**dheeri** carries the **-i**. The pair **ninka dheeri** (the tall man) is the doer, and the mark sits on its final word (Orwin pp.63–64; Saeed §4.4.4).',
  },
  {
    id: 'u3-t06', type: 'marker_identification', objectiveIds: ['adjective-subject-marking'],
    question: 'In "Gabadha yari waa toostay" (the small girl got up), type the word carrying the doer-marking.',
    somali: 'Gabadha yari waa toostay.',
    answer: 'yari',
    hint: 'The pair is **gabadha yari**; one word of the two carries the mark.',
    explanation: '**yari** carries it: **gabadha** drops back to its plain shape and the describing word takes the **-i** (Orwin p.64; Saeed §4.4.4).',
  },
  // ── Number words (Lesson 10) ────────────────────────────────────────────
  {
    id: 'u3-t07', type: 'translate', objectiveIds: ['number-words'],
    question: 'Type the Somali number word for "eight".',
    answer: 'sideed',
    hint: 'It sits between toddobaar and sagaal.',
    explanation: '**sideed** is eight: toddobaar, sideed, sagaal, toban — seven through ten (Nilsson p.56; Saeed §4.1.4; Orwin p.67).',
  },
  {
    id: 'u3-t08', type: 'translate', objectiveIds: ['number-words'],
    question: 'Type the Somali number word for "nine".',
    answer: 'sagaal',
    hint: 'It comes right before toban.',
    explanation: '**sagaal** is nine, just before **toban** (ten) (Nilsson p.56; Saeed §4.1.4; Orwin p.67).',
  },
  // ── Counting with nouns (Lesson 10) ─────────────────────────────────────
  {
    id: 'u3-t09', type: 'unscramble', objectiveIds: ['counting-with-nouns'],
    question: 'Build "two boys" from the words.',
    words: ['wiil', 'laba'],
    answer: 'laba wiil',
    hint: 'The number word goes first; **wiil** keeps its plain shape.',
    explanation: '**laba wiil**: two boys. Number first, and **wiil** is one of the words that stays put when counted (Nilsson p.56; Saeed §4.1.4).',
  },
  {
    id: 'u3-t10', type: 'unscramble', objectiveIds: ['counting-with-nouns'],
    question: 'Build "three months" from the words.',
    words: ['bilood', 'saddex'],
    answer: 'saddex bilood',
    hint: '**bil** grows to **bilood** when counted.',
    explanation: '**saddex bilood**: three months. **bil** (month) is a shape-changer: counted, it becomes **bilood** (Nilsson p.56; Saeed §4.6.4).',
  },
  // ── hal vs kow (Lesson 10) ──────────────────────────────────────────────
  {
    id: 'u3-t11', type: 'fill_blank', objectiveIds: ['hal-vs-kow'],
    question: '**___ buug** means "one book". Which word fills the blank?',
    options: ['hal', 'kow', 'mid'],
    correctAnswer: 'hal',
    hint: 'A thing-word follows, so the counting-off word is out.',
    explanation: '**hal buug**: one book. Before a thing-word, "one" is **hal**; **kow** is for counting off; **mid** stands alone (Nilsson p.45; Saeed §4.1.4; Orwin p.68).',
  },
  {
    id: 'u3-t12', type: 'translate', objectiveIds: ['hal-vs-kow'],
    question: 'Type the Somali for "one" when counting off (1, 2, 3 …).',
    answer: 'kow',
    hint: 'No thing-word follows it.',
    explanation: 'Counting off starts with **kow**: kow, laba, saddex. With a noun it becomes **hal** (Nilsson p.57; Saeed §4.1.4; Orwin p.67).',
  },
  // ── Relation words (Lesson 11) ──────────────────────────────────────────
  {
    id: 'u3-t13', type: 'translate', objectiveIds: ['relation-words'],
    question: 'Which Somali relation word means "to, for"? Type it.',
    answer: 'u',
    hint: 'It marks a goal.',
    explanation: '**u** is to/for — the goal relation (Saeed §4.5; Orwin p.80; Nilsson §5.2).',
  },
  {
    id: 'u3-t14', type: 'translate', objectiveIds: ['relation-words'],
    question: 'Which Somali relation word means "with" (company)? Type it.',
    answer: 'la',
    hint: 'Being together with someone, not using something.',
    explanation: '**la** is with, in company. **ku** translates "with" only for tools (Saeed §4.5; Orwin p.80; Nilsson §5.2).',
  },
  {
    id: 'u3-t15', type: 'multiple_choice', objectiveIds: ['relation-word-position'],
    question: 'Where does a Somali relation word sit?',
    options: [
      'just before the action word',
      'just before the noun it talks about',
      'at the very start of the statement',
      'at the very end of the statement',
    ],
    correctAnswer: 'just before the action word',
    hint: 'It points BACK at a noun that came earlier.',
    explanation: 'Relation words hug the action word and point back at an earlier noun — never before the noun itself (Orwin p.79; Nilsson p.153).',
  },
  {
    id: 'u3-t16', type: 'marker_identification', objectiveIds: ['relation-word-choice', 'relation-word-position'],
    question: 'He works AT the factory. In this line, type the word that carries "at".',
    somali: 'Wuxuu ku shaqeeyaa warshadda.',
    answer: 'ku',
    hint: 'It sits just before **shaqeeyaa** and points back at **warshadda**.',
    explanation: '**ku** carries the place relation: works at the factory (Saeed §4.5, example 102).',
  },
  {
    id: 'u3-t17', type: 'multiple_choice', objectiveIds: ['relation-word-choice'],
    question: 'In "Maxmuud waan u sheegayaa" (I will tell Maxmuud), the **u** points at Maxmuud because…',
    options: [
      'the telling goes to him: u marks a goal',
      'he is the source: u means from',
      'he is company: u means with',
      'u marks the place of the telling',
    ],
    correctAnswer: 'the telling goes to him: u marks a goal',
    hint: 'Which relation does telling have with its hearer?',
    explanation: '**u** marks a goal: the telling is aimed at Maxmuud (Orwin p.80). A person as the aim of an action takes **u**.',
  },
  {
    id: 'u3-t18', type: 'marker_identification', objectiveIds: ['relation-word-choice'],
    question: 'This man came FROM Aden. Type the word that carries "from".',
    somali: 'Ninkan baa Cadan ka yimi.',
    answer: 'ka',
    hint: 'It sits just before the action word **yimi**.',
    explanation: '**ka** carries the source relation: came FROM Aden (Saeed §4.5, example 104). A fresh sentence — the skill, not a memorized line.',
  },
  // ── Third items: every objective keeps a fresh item in reserve, so a
  // corrective set never re-serves exactly what the learner just sat ────────
  {
    id: 'u3-t19', type: 'translate', objectiveIds: ['adjective-subject-marking'],
    question: 'Type "the tall man" the way it looks when that pair is the doer.',
    answer: 'ninka dheeri',
    hint: 'The mark leaves **ninka** plain and lands on the describing word.',
    explanation: '**ninka dheeri**: as the doer, the pair carries its mark on the last word — **dheeri**, not **ninku** (Orwin pp.63\u201364; Saeed \u00a74.4.4).',
  },
  {
    id: 'u3-t20', type: 'translate', objectiveIds: ['number-words'],
    question: 'Type the Somali number word for "seven".',
    answer: 'toddobaar',
    hint: 'It comes right after lix.',
    explanation: '**toddobaar** is seven (Nilsson p.56; Saeed \u00a74.1.4; Orwin p.67).',
  },
  {
    id: 'u3-t21', type: 'translate', objectiveIds: ['counting-with-nouns'],
    question: 'Type the Somali for "four cars".',
    answer: 'afar baabuur',
    hint: 'Number first; **baabuur** keeps its shape.',
    explanation: '**afar baabuur**: four cars. **baabuur** stays put when counted, the way **laba baabuur** does (Nilsson p.45; Saeed \u00a74.1.4).',
  },
  {
    id: 'u3-t22', type: 'translate', objectiveIds: ['hal-vs-kow'],
    question: 'Type the Somali for "one woman".',
    answer: 'hal naag',
    hint: 'A thing-word follows, so "one" takes its before-a-noun shape.',
    explanation: '**hal naag**: one woman. Before a noun, "one" is **hal** (Orwin p.68; Nilsson p.45; Saeed \u00a74.1.4).',
  },
  {
    id: 'u3-t23', type: 'translate', objectiveIds: ['relation-words'],
    question: 'Which Somali relation word means "from, about"? Type it.',
    answer: 'ka',
    hint: 'It marks a source.',
    explanation: '**ka** is from/about — the source relation (Saeed \u00a74.5; Orwin p.80; Nilsson \u00a75.2).',
  },
  {
    id: 'u3-t24', type: 'marker_identification', objectiveIds: ['relation-word-position'],
    question: 'In "Gabadhu laybreeriga way ku qortaa" (the girl writes in the library), type the small word that sits just before the action word.',
    somali: 'Gabadhu laybreeriga way ku qortaa.',
    answer: 'ku',
    hint: 'It points back at **laybreeriga**.',
    explanation: '**ku** hugs the action word **qortaa** and points back at the library (Orwin p.79). The relation word never stands in front of its noun.',
  },
];

export const UNIT_3_TEST: TestBank = {
  id: 'unit-3-test',
  name: 'Unit 3 Test Bank',
  description: 'Describing words, number words, and relation words (Lessons 9–11)',
  items: UNIT_3_ITEMS,
};
