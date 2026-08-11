/**
 * UNIT TEST BANK — the mastery check at the end of a unit.
 *
 * One bank per unit. Unit 1 covers lessons 1–4, and every objective those
 * lessons declare gets at least two items; the objectives carrying the most
 * rules (the gender test, the "the" ending, the subject marker, the pronouns)
 * get three or four. Per-objective scoring is only as fine-grained as the item
 * count, so two items means one miss fails that objective and routes the
 * learner to correctives. That is deliberate: correctives is a short revision
 * pass, not a penalty.
 *
 * THREE RULES FOR ADDING AN ITEM
 *
 * 1. **Registry-verified Somali only.** Every Somali string here — answers,
 *    word banks, and forms named in the question — must be a key in
 *    verified-forms.ts. `npm run validate:course` checks answers and word
 *    banks mechanically and exits non-zero on a miss. Distractor options that
 *    are deliberately *wrong* Somali (aabbeka, magaalota) are the exception:
 *    they are the mistake being tested, and they are never presented as
 *    correct.
 *
 * 2. **Machine-gradable.** The lesson player lets a learner self-grade a typed
 *    answer against the explanation. A score cannot work that way. Every item
 *    here is graded by `isAnswerCorrect()`, so typed answers are single Somali
 *    words or a sourced sentence — nothing open-ended.
 *
 * 3. **Not a copy of a practice item.** A test made of the exercises the
 *    learner just did measures recall of those exercises. Where a fact has to
 *    be re-tested, the item flips the shape: what Lesson 3 asked as
 *    multiple-choice is asked here as production, and vice versa. A test in
 *    src/tests/ fails if a bank question repeats a lesson question verbatim.
 *
 * Hints are carried but never shown during the test itself. They are shown in
 * correctives, which is practice rather than assessment.
 */

import type { PracticeExercise, TestBank } from '../types';

// ============================================================================
// UNIT 1 — lessons 1–4
// ============================================================================

const UNIT_1_ITEMS: PracticeExercise[] = [
  // ── Lesson 1: reading the letters ───────────────────────────────────────
  {
    id: 'u1-t01',
    type: 'multiple_choice',
    objectiveIds: ['somali-alphabet'],
    question: 'Somali writing never uses three of the English letters. Which three?',
    options: ['p, v, z', 'c, q, x', 'j, k, w', 'f, h, y'],
    correctAnswer: 'p, v, z',
    hint: 'The other three sets are all letters you have seen inside real Somali words.',
    explanation:
      'Somali uses the Latin alphabet without **p**, **v** and **z**. A word spelled with one of them is borrowed and unadapted. The letters c, q and x are all genuine Somali letters with sounds of their own.',
  },
  {
    id: 'u1-t02',
    type: 'multiple_choice',
    objectiveIds: ['somali-alphabet'],
    question: 'You hear a hard, breathy "h" made deep in the throat, as at the end of **libaax**. Which letter spells that sound?',
    options: ['x', 'h', 'kh', 'c'],
    correctAnswer: 'x',
    hint: 'Two letters are made deep in the throat. One is a breathy h, the other a tightening.',
    explanation:
      'The deep breathy "h" is written **x**, as in **libaax** (lion). Plain h is the ordinary English h; **kh** is the rasp in Scottish "loch"; **c** is a tightening rather than a breath.',
  },
  {
    id: 'u1-t03',
    type: 'multiple_choice',
    objectiveIds: ['somali-digraphs'],
    question: 'Which of these two-character pairs counts as one single letter in Somali?',
    options: ['sh', 'st', 'ch', 'th'],
    correctAnswer: 'sh',
    hint: 'Somali has exactly three of these pairs. The other three options are not among them.',
    explanation:
      'Somali has exactly three pairs that act as single letters: **dh**, **kh** and **sh**. There is no ch, no th and no st cluster of this kind — so **sh** is the only one on this list.',
  },
  {
    id: 'u1-t04',
    type: 'multiple_choice',
    objectiveIds: ['somali-digraphs'],
    question: 'Which of these words begins with a single Somali letter that is written with two characters?',
    options: ['sheeko (story)', 'bisad (cat)', 'both of them', 'neither of them'],
    correctAnswer: 'sheeko (story)',
    hint: 'Look at the first one or two characters of each word and check them against the three pairs.',
    explanation:
      '**Sheeko** starts with **sh**, one of the three pairs that act as a single letter. **Bisad** starts with plain b, an ordinary single character. Reading sh as two separate sounds is what makes the word hard to recognise.',
  },
  {
    id: 'u1-t05',
    type: 'fill_blank',
    objectiveIds: ['somali-vowel-length'],
    question: 'Somali shows that a vowel is held longer by ___.',
    options: ['writing the vowel twice', 'adding an accent mark', 'doubling the consonant after it', 'adding an h after it'],
    correctAnswer: 'writing the vowel twice',
    hint: 'Somali spelling uses no marks above or below letters at all.',
    explanation:
      'A long vowel is written twice: aa, ee, ii, oo, uu. Somali spelling carries no accent marks of any kind, so doubling is the only signal that a vowel is held.',
  },
  {
    id: 'u1-t06',
    type: 'multiple_choice',
    objectiveIds: ['somali-vowel-length'],
    question: 'Which of these words contains a vowel you hold longer?',
    options: ['libaax', 'mas', 'kab', 'nin'],
    correctAnswer: 'libaax',
    hint: 'Look for a vowel written twice in a row.',
    explanation:
      '**Libaax** (lion) has **aa**, so that vowel is held. **Mas**, **kab** and **nin** each carry one short vowel. The doubled letters are the only clue, and they are always visible.',
  },

  // ── Lesson 2: nouns and gender ──────────────────────────────────────────
  {
    id: 'u1-t07',
    type: 'multiple_choice',
    objectiveIds: ['noun-gender'],
    question: 'Which statement about Somali nouns is true?',
    options: [
      'Every noun is either masculine or feminine',
      'Only nouns for people carry a gender',
      'Only nouns for living things carry a gender',
      'Nouns carry a gender only when more than one is meant',
    ],
    correctAnswer: 'Every noun is either masculine or feminine',
    hint: 'Think about the words for house, book and city, none of which is alive.',
    explanation:
      'Every Somali noun has a gender, including words for objects and places: **guri** (house) is masculine, **magaalo** (city) is feminine. There is no third option and no ungendered group.',
  },
  {
    id: 'u1-t08',
    type: 'multiple_choice',
    objectiveIds: ['noun-gender'],
    question: '**Buug** (book) is masculine and **kab** (shoe) is feminine. What does that pairing show?',
    options: [
      'Gender is a grammar label, not a fact about the object',
      'Things you carry are feminine',
      'Short words are feminine',
      'Borrowed words are masculine',
    ],
    correctAnswer: 'Gender is a grammar label, not a fact about the object',
    hint: 'Ask yourself whether anything about a shoe is more feminine than anything about a book.',
    explanation:
      'Nothing about a shoe or a book decides this. Gender is a grammar label attached to the word, which is why it has to be learned with the word rather than worked out from meaning.',
  },
  {
    id: 'u1-t09',
    type: 'multiple_choice',
    objectiveIds: ['noun-gender-diagnostic'],
    question: 'A dictionary gives **miiska** for "the table". What does that tell you about **miis**?',
    options: ['It is masculine', 'It is feminine', 'It is more than one', 'It is borrowed'],
    correctAnswer: 'It is masculine',
    hint: 'A k-sound in the ending points one way, a t-sound the other.',
    explanation:
      '**Miiska** shows a k-type ending, so **miis** is masculine. This is the whole reason a good dictionary prints the "the" form: it hands you the gender for free.',
  },
  {
    id: 'u1-t10',
    type: 'multiple_choice',
    objectiveIds: ['noun-gender-diagnostic'],
    question: '"The knife" is **mindida**. Is **mindi** masculine or feminine?',
    options: ['Feminine', 'Masculine', 'Either, depending on the sentence', 'Neither — tools carry no gender'],
    correctAnswer: 'Feminine',
    hint: 'The d in the ending belongs to the t-type family.',
    explanation:
      'The **-da** in **mindida** is a t-type ending, so **mindi** is feminine. Feminine endings surface as t, d or s sounds; masculine endings surface as k, g or h sounds.',
  },
  {
    id: 'u1-t11',
    type: 'translate',
    objectiveIds: ['noun-gender-diagnostic'],
    question: 'A text has **ninka** ("the man"). Write the bare noun — the form a dictionary lists.',
    answer: 'nin',
    hint: 'Take the "the" ending off and keep what is left.',
    explanation:
      'Strip **-ka** and **nin** (man) is left. The ending you removed is the k-type one, so it also told you the word is masculine before you looked anything up.',
  },
  {
    id: 'u1-t12',
    type: 'fill_blank',
    objectiveIds: ['noun-gender-unwritten'],
    question: 'Two different words are both spelled **inan**. A speaker tells them apart by the ___, which Somali does not write.',
    options: ['tone', 'vowel length', 'first letter', 'ending'],
    correctAnswer: 'tone',
    hint: 'It is something you can hear but never see on the page.',
    explanation:
      'The boy word and the girl word carry their tone differently. Somali spelling has no accent marks, so both come out as **inan** and only context or the "the" form settles which one is meant.',
  },
  {
    id: 'u1-t13',
    type: 'multiple_choice',
    objectiveIds: ['noun-gender-unwritten'],
    question: 'A learner says: "Somali gender is random — there is no pattern at all." What is the accurate correction?',
    options: [
      'There is a pattern, but it is in the tone, which writing leaves out',
      'There is genuinely no pattern of any kind',
      'The pattern is in the last letter of the word',
      'The pattern depends on which part of the country the speaker is from',
    ],
    correctAnswer: 'There is a pattern, but it is in the tone, which writing leaves out',
    hint: 'The information exists in speech. The question is whether the page shows it.',
    explanation:
      'Speakers hear gender in the tone of the word. The writing system leaves tone out, so the pattern is invisible on the page rather than absent from the language — and a reader has to learn each noun with its "the" form instead.',
  },

  // ── Lesson 3: the "the" ending ──────────────────────────────────────────
  {
    id: 'u1-t14',
    type: 'multiple_choice',
    objectiveIds: ['article-suffix'],
    question: 'How does Somali say "the"?',
    options: [
      'With an ending joined onto the noun',
      'With a separate word in front of the noun',
      'With a separate word after the noun',
      'With a short word joined on by a hyphen',
    ],
    correctAnswer: 'With an ending joined onto the noun',
    hint: 'Think about how **kabta** is written — as one piece or two?',
    explanation:
      '"The" is an ending, written joined to the noun: **kab** becomes **kabta**, not "kab-ta" and not "ta kab". Writing it with a hyphen is one of the most common beginner errors in print.',
  },
  {
    id: 'u1-t15',
    type: 'translate',
    objectiveIds: ['article-suffix'],
    question: '**Mas** (snake) is masculine and ends in **s**, which no softening rule mentions. Write "the snake".',
    answer: 'maska',
    hint: 'When no softening rule applies, the masculine ending stays in its basic shape.',
    explanation:
      'No rule covers a final s, so the base masculine ending is used unchanged: **maska**. Reaching for a softened shape when nothing calls for one is as much an error as missing one that does.',
  },
  {
    id: 'u1-t16',
    type: 'translate',
    objectiveIds: ['article-suffix'],
    question: '**Kab** (shoe) is feminine and ends in **b**. Write "the shoe".',
    answer: 'kabta',
    hint: 'Nothing on the feminine softening list mentions b, so use the basic shape.',
    explanation:
      'The base feminine ending is **-ta**, and a final b triggers no change: **kabta**. Masculine and feminine both have a base shape that surfaces whenever no softening rule applies.',
  },
  {
    id: 'u1-t17',
    type: 'translate',
    objectiveIds: ['article-assimilation'],
    question: '**Buug** (book) is masculine and ends in **g**. Write "the book".',
    answer: 'buugga',
    hint: 'After g the masculine ending softens, which leaves two g letters side by side.',
    explanation:
      'After **g** the masculine ending becomes **-ga**, so the word is written **buugga** with a doubled g. Writing it "buugka" keeps a k-sound the language has already softened away.',
  },
  {
    id: 'u1-t18',
    type: 'multiple_choice',
    objectiveIds: ['article-assimilation'],
    question: '**Aabbe** (father) is masculine. Which spelling is "the father"?',
    options: ['aabbaha', 'aabbeha', 'aabbeka', 'aabbaka'],
    correctAnswer: 'aabbaha',
    hint: 'Two things change at once after a final e — the ending, and the e itself.',
    explanation:
      'After **e** the masculine ending becomes **-ha**, and the e changes to a: **aabbaha**. Getting only half of it gives "aabbeha", which is the most common near-miss on this rule.',
  },
  {
    id: 'u1-t19',
    type: 'translate',
    objectiveIds: ['article-assimilation'],
    question: '**Bil** (month) is feminine and ends in **l**. Write "the month".',
    answer: 'bisha',
    hint: 'This is the rule where a letter of the noun disappears.',
    explanation:
      'After **l** the feminine ending becomes **-sha** and the l drops out entirely: **bisha**. It is the least guessable rule in the set, and the only one where a letter of the noun is lost.',
  },
  {
    id: 'u1-t20',
    type: 'multiple_choice',
    objectiveIds: ['article-assimilation'],
    question: '**Magaalo** (city) is feminine. Which spelling is "the city"?',
    options: ['magaalada', 'magaaloda', 'magaalota', 'magaalaha'],
    correctAnswer: 'magaalada',
    hint: 'As with a final e, two things change: the ending, and the vowel it lands on.',
    explanation:
      'After **o** the feminine ending becomes **-da**, and the o itself changes to a: **magaalada**. "Magaaloda" softens the ending but leaves the vowel, which is the half-right answer to watch for.',
  },
  {
    id: 'u1-t21',
    type: 'translate',
    objectiveIds: ['article-no-indefinite'],
    question: '"The woman" is **naagta**. Write "a woman".',
    answer: 'naag',
    hint: 'Somali has no word for "a". Something has to come off, not go on.',
    explanation:
      'There is no word for "a" and no ending for it either. The bare noun **naag** covers both "woman" and "a woman"; you add an ending only when you mean "the".',
  },
  {
    id: 'u1-t22',
    type: 'multiple_choice',
    objectiveIds: ['article-no-indefinite'],
    question: 'Standing on its own, with no ending attached, what does **buug** mean?',
    options: [
      '"book" or "a book", whichever the English needs',
      'only "the book"',
      'only "books", more than one',
      'nothing on its own — it always needs an ending',
    ],
    correctAnswer: '"book" or "a book", whichever the English needs',
    hint: 'English needs two words here where Somali needs none.',
    explanation:
      'The bare noun already carries what English writes as "a". **Buug** is "book" or "a book"; **buugga** is "the book". Nothing has to be added to make a noun indefinite.',
  },

  // ── Lesson 4: pronouns and the subject marker ───────────────────────────
  {
    id: 'u1-t23',
    type: 'translate',
    objectiveIds: ['pronouns-subject'],
    question: 'Write the Somali pronoun for "she".',
    answer: 'iyada',
    hint: 'It looks close to the word for "they" — one letter apart.',
    explanation:
      '**Iyada** is "she". It sits one letter away from **iyaga** ("they"), and mixing the two up is the single easiest slip to make in this set.',
  },
  {
    id: 'u1-t24',
    type: 'multiple_choice',
    objectiveIds: ['pronouns-subject'],
    question: 'Somali "they" is **iyaga**. Which groups does it cover?',
    options: [
      'Any group at all',
      'Only groups of men',
      'Only groups of women',
      'Only groups of mixed make-up',
    ],
    correctAnswer: 'Any group at all',
    hint: 'Somali has one word here where some languages have two.',
    explanation:
      '**Iyaga** covers any group. Somali does not split "they" by gender, so there is no separate feminine form to learn — and any course that offers you one has invented it.',
  },
  {
    id: 'u1-t25',
    type: 'multiple_choice',
    objectiveIds: ['pronouns-subject'],
    question: '**Wuu** is the signal word **waa** joined with a short pronoun. Which short pronoun?',
    options: ['uu', 'aan', 'aad', 'ay'],
    correctAnswer: 'uu',
    hint: 'Read the two halves of the joined form aloud and listen for the second one.',
    explanation:
      '**Waa** plus **uu** ("he") contracts to **wuu**. The short pronouns fuse onto the signal word like this constantly, which is why they are worth recognising well before you have to produce them.',
  },
  {
    id: 'u1-t26',
    type: 'multiple_choice',
    objectiveIds: ['pronouns-inclusive-exclusive'],
    question: 'You tell your teammates "we won the match" — they were on the team with you. Which "we" do you use?',
    options: ['innaga', 'annaga', 'idinka', 'iyaga'],
    correctAnswer: 'innaga',
    hint: 'The people you are speaking to are inside the group you are describing.',
    explanation:
      '**Innaga** is the "we" that takes the listener in — "you and I". **Annaga** would leave your teammates out of a win they were part of, which is a real change of meaning rather than a style choice.',
  },
  {
    id: 'u1-t27',
    type: 'translate',
    objectiveIds: ['pronouns-inclusive-exclusive'],
    question: 'Write the Somali "we" that leaves the person you are speaking to out of the group.',
    answer: 'annaga',
    hint: 'This is the "us, but not you" one.',
    explanation:
      '**Annaga** excludes the listener. English makes you guess which "we" is meant from context; Somali makes you pick one, so choosing wrongly says something you did not mean.',
  },
  {
    id: 'u1-t28',
    type: 'translate',
    objectiveIds: ['subject-case'],
    question: 'Write **aniga** ("I") in the form it takes when it is the subject — the doer.',
    answer: 'anigu',
    hint: 'The final -a of the subject shifts.',
    explanation:
      '**Aniga** becomes **anigu** as the subject: the final -a shifts to -u. English does the same job with "he" against "him", but Somali applies it to nouns as well as pronouns.',
  },
  {
    id: 'u1-t29',
    type: 'multiple_choice',
    objectiveIds: ['subject-case'],
    question: 'When a word ending in **-a** becomes the subject of a sentence, that **-a** changes to what?',
    options: ['-u', '-i', '-o', '-e'],
    correctAnswer: '-u',
    hint: 'Compare **wiilka** with **wiilku**.',
    explanation:
      'The final -a becomes **-u**: **wiilka** gives **wiilku**, **aniga** gives **anigu**. It is one small change, and it is the difference between a sentence a speaker accepts and one they have to re-read.',
  },
  {
    id: 'u1-t30',
    type: 'multiple_choice',
    objectiveIds: ['subject-case'],
    question: 'A subject can be several words long. Which of them takes the subject marker?',
    options: [
      'Only the last word of the subject',
      'Every word of the subject',
      'Only the first word of the sentence',
      'The word straight after **waa**',
    ],
    correctAnswer: 'Only the last word of the subject',
    hint: 'The marker lands once, at the far end of the subject.',
    explanation:
      'The marker goes on the last word of the subject and nowhere else. The word after **waa** is not the doer at all, so it stays in its bare form.',
  },
  {
    id: 'u1-t31',
    type: 'unscramble',
    objectiveIds: ['sentence-shape', 'subject-case'],
    question: 'Put these in order to say "This is a shoe."',
    words: ['kab', 'waa', 'Tani'],
    answer: 'Tani waa kab',
    hint: 'Doer first, then the signal word, then what it is.',
    explanation:
      '**Tani waa kab.** The subject comes first, then **waa**, then what the thing is. **Kab** stays bare because Somali has no word for "a" and because it is not the doer.',
  },
  {
    id: 'u1-t32',
    type: 'multiple_choice',
    objectiveIds: ['sentence-shape'],
    question: 'What order does a plain Somali statement follow?',
    options: [
      'WHO, then the signal word, then the rest',
      'The signal word, then WHO, then the rest',
      'The rest, then WHO, then the signal word',
      'WHO, then the rest, then the signal word',
    ],
    correctAnswer: 'WHO, then the signal word, then the rest',
    hint: 'Look back at **Wiilku waa macallin** and name each piece in turn.',
    explanation:
      '**Wiilku waa macallin** runs subject, then signal, then what he is. That order is the spine of the sentence shape you will keep filling in as the boxes after WHO get their own lessons.',
  },
];

export const UNIT_1_TEST: TestBank = {
  id: 'unit-1-test',
  name: 'Unit 1 Test',
  description:
    'Everything from lessons 1 to 4: reading the letters, noun gender, building the "the" ending, pronouns and the subject marker.',
  items: UNIT_1_ITEMS,
};
