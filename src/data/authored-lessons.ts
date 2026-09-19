/**
 * AUTHORED LESSONS — the course's only content source.
 *
 * Deliberately narrow: 4 lessons that are real, rather than 14 that are stubs.
 * Lessons beyond these do not exist and must not be represented anywhere in the
 * UI — no placeholder entries, no greyed-out "coming soon" rows that imply
 * content is written. MAX_LESSON_ID derives from the array so the two cannot
 * drift apart.
 *
 * SOURCING RULE: every Somali string here traces to docs/SOMALI_SOURCES.md,
 * which requires two independent published sources per fact. Primary source is
 * Morgan Nilsson, "Beginner's Somali Grammar" (University of Gothenburg, 2023),
 * cross-checked against Wikipedia and Wiktionary. If you want to add a form
 * that is not on that page, source it first or leave it out. Do not stub it.
 *
 * Unit 1 has a single job: fill the WHO box correctly. Nouns (L2), making them
 * definite (L3), pronouns and the subject marker (L4). `waa` is previewed as
 * the next box, not taught here.
 */

import type { Lesson, BlueprintSlot } from './types';

// ============================================================================
// LESSON SUMMARY — for listing lessons in navigation/UI
// ============================================================================

export interface LessonSummary {
  lessonId: number;
  title: string;
  cardCount: number;
}

/** The running visual organizer. Unit 1 only ever highlights WHO. */
const BOX = '┌──────┬────────┬────────┬──────┐\n│ WHO  │ SIGNAL │  WHAT  │  DO  │\n└──────┴────────┴────────┴──────┘';

// ============================================================================
// LESSON 1 — Reading for Meaning
// ============================================================================

const LESSON_1: Lesson = {
  id: 1,
  unitId: 1,
  title: 'Reading for Meaning',
  flowVersion: 2,
  cards: [
    {
      id: '1-blueprint', type: 'blueprint', blueprintSlot: ['WHO', 'SIGNAL'],
      content: `${BOX}\n\nYou already read Somali. Start where real understanding starts: find the WHO or thing, find the small signal, then take what the sentence says about them. Three passes — **WHO → SIGNAL → WHAT** — and a line of Somali stops being a list of words.`,
    },
    {
      id: '1-promise', type: 'promise',
      prompt: 'Read two short Somali captions and identify the teacher and the student, even in a new caption.',
    },
    {
      id: '1-passage-a', type: 'passage',
      passage: {
        id: 'l1-text-a',
        label: 'A class page, two captions',
        lines: [
          { somali: 'Wiilku waa macallin.', gloss: 'The boy is a teacher.' },
          { somali: 'Cumar waa arday wanaagsan.', gloss: 'Omar is a good student.', note: 'Cumar is a name — Omar.' },
        ],
      },
      content: 'Read both captions for the gist. Who is each person?',
    },
    {
      id: '1-gist-a', type: 'notice', exercise: {
        id: 'l1-gist-a', type: 'multiple_choice', objectiveIds: ['decode-statement'],
        question: 'What are these captions about?',
        options: [
          'who is a teacher and who is a student',
          'what the boy and Omar are doing today',
          'where the boy and Omar study',
          'how old the boy and Omar are',
        ],
        correctAnswer: 'who is a teacher and who is a student',
        hint: 'Are these notices about people, places, or events?',
        explanation: 'Both captions name a person and say what he is: the boy is a teacher; Omar is a student. Start with that gist, then read the details.',
        repair: {
          id: 'l1-gist-a-r', type: 'multiple_choice', objectiveIds: ['decode-statement'],
          question: 'Which line is about a student?',
          options: ['the second line', 'the first line', 'both lines', 'neither line'],
          correctAnswer: 'the second line',
          hint: 'One caption is about the boy; the other is about Omar.',
          explanation: 'The second caption, **Cumar waa arday wanaagsan**, says Omar is a good student. The first is about the boy, a teacher. Reading for the gist means knowing which line carries which person.',
        },
      },
    },
    {
      id: '1-detail-a', type: 'notice', exercise: {
        id: 'l1-detail-a', type: 'multiple_choice', objectiveIds: ['decode-statement'],
        question: 'Who is the teacher in these captions?',
        options: ['the boy', 'Cumar', 'both of them', 'neither of them'],
        correctAnswer: 'the boy',
        hint: 'Match each caption to its person: the first names the boy, the second names Omar.',
        explanation: '**Wiilku waa macallin** says the boy is a teacher; Omar is the student. The tempting wrong answer is Omar, because “student” and “teacher” sit side by side on the page — the detail check is what keeps them attached to the right person.',
        repair: {
          id: 'l1-detail-a-r', type: 'multiple_choice', objectiveIds: ['decode-statement'],
          question: 'And who is the student in these captions?',
          options: ['Cumar', 'the boy', 'both of them', 'neither of them'],
          correctAnswer: 'Cumar',
          hint: 'One caption says teacher; the other says student.',
          explanation: '**Cumar waa arday wanaagsan** says Omar is a good student. Each caption keeps its own person: boy — teacher, Omar — student.',
        },
      },
    },
    {
      id: '1-coach-routine', type: 'coach', title: 'Three passes, in order',
      content: 'Read in three passes: **WHO** names the people, **SIGNAL** marks the sentence, and **WHAT** says something about them. Take the gist first, then the details.',
    },
    {
      id: '1-teach-signal', type: 'teach', title: 'The small word between the chunks', isNew: true,
      content: 'Both captions have the same shape: a person, a small word, then what that person is.\n\n• **Wiilku | waa | macallin.**  *The boy | is | a teacher.*\n• **Cumar | waa | arday wanaagsan.**  *Omar | is | a good student.*\n\nThat small word is **waa**. It marks a plain statement — the writer is simply telling you something, not singling anything out. Do not translate it one-for-one as the English “is”; read it as a signpost that says *plain statement ahead*, then take the chunks on either side of it together.',
    },
    {
      id: '1-complete-1', type: 'complete', exercise: {
        id: 'l1-c1', type: 'fill_blank', objectiveIds: ['find-signal'],
        question: 'Complete the plain statement: **Wiilku ___ macallin.**',
        options: ['waa', 'baa', 'waxa', 'ay'], correctAnswer: 'waa',
        hint: 'You need the signal for an ordinary statement, with nothing singled out.',
        explanation: '**Wiilku waa macallin** is a plain statement: “The boy is a teacher.” **Waa** marks it. **Baa** and **waxa** spotlight something; nothing is singled out here.',
        repair: {
          id: 'l1-c1-r', type: 'fill_blank', objectiveIds: ['find-signal'],
          question: 'Same move, fresh line: **Cumar ___ arday wanaagsan.**',
          options: ['waa', 'baa', 'waxa', 'ay'], correctAnswer: 'waa',
          hint: 'An ordinary statement about Omar — nothing singled out.',
          explanation: '**Cumar waa arday wanaagsan** — “Omar is a good student” — takes the same plain-statement signal. The person and the meaning changed; the signal did not.',
        },
      },
    },
    {
      id: '1-produce-1', type: 'produce', exercise: {
        id: 'l1-p1', type: 'unscramble', objectiveIds: ['build-statement'],
        question: 'Build the caption “Omar is a good student.”',
        words: ['arday', 'Cumar', 'wanaagsan', 'waa'], answer: 'Cumar waa arday wanaagsan',
        hint: 'WHO first, then the plain-statement signal, then what he is.',
        explanation: '**Cumar waa arday wanaagsan** follows the routine in production: WHO **Cumar**, SIGNAL **waa**, WHAT **arday wanaagsan**. Four parts now — the shape holds.',
        repair: {
          id: 'l1-p1-r', type: 'unscramble', objectiveIds: ['build-statement'],
          question: 'Build the caption “The boy is a teacher.”',
          words: ['macallin', 'Wiilku', 'waa'], answer: 'Wiilku waa macallin',
          hint: 'WHO first, then the signal, then the meaning.',
          explanation: '**Wiilku waa macallin** — WHO **Wiilku**, SIGNAL **waa**, WHAT **macallin**. The same three passes, built by you this time.',
        },
      },
    },
    {
      id: '1-passage-b', type: 'passage',
      passage: {
        id: 'l1-text-b',
        label: 'Another class page',
        lines: [
          { somali: 'Sahro waa macallimad.', gloss: 'Sahra is a teacher.', note: 'Sahro is Sahra\u2019s name at the head of a sentence.' },
          { somali: 'Wiilkaygu waa macallin.', gloss: 'My son is a teacher.', note: 'Wiilkaygu means “my son” — read it as one WHO chunk.' },
        ],
      },
      content: 'Read the new captions for the gist: who is each person?',
    },
    {
      id: '1-transfer-gist', type: 'notice', exercise: {
        id: 'l1-transfer-gist', type: 'multiple_choice', objectiveIds: ['decode-statement', 'find-signal'],
        question: 'Who is the teacher in THESE captions?',
        options: ['Sahra', 'the boy', 'Cumar', 'no one'],
        correctAnswer: 'Sahra',
        hint: 'Use the captions in front of you.',
        explanation: '**Sahro waa macallimad** — Sahra is a teacher. “The boy” was the answer on the last page, and it is the trap here: a memorized answer names the boy, a read answer names Sahra. **Macallimad** is simply the word for a woman teacher.',
        repair: {
          id: 'l1-transfer-gist-r', type: 'multiple_choice', objectiveIds: ['decode-statement'],
          question: 'In the second caption, **Wiilkaygu waa macallin**, what is the writer\u2019s son?',
          options: ['a teacher', 'a student', 'a name', 'a school'],
          correctAnswer: 'a teacher',
          hint: 'Use the same three passes: WHO, signal, WHAT.',
          explanation: '**Wiilkaygu | waa | macallin** — my son | plain statement | teacher. An unfamiliar WHO chunk does not change the routine: the signal is still **waa**, and the word after it still says what the person is.',
        },
      },
    },
    {
      id: '1-transfer-detail', type: 'notice', exercise: {
        id: 'l1-transfer-detail', type: 'multiple_choice', objectiveIds: ['find-signal'],
        question: 'Which clue marks both captions as plain statements?',
        options: ['the signal waa', 'the names at the start', 'the word macallin', 'the length of the lines'],
        correctAnswer: 'the signal waa',
        hint: 'One small word tells you what kind of statement you are reading.',
        explanation: '**Waa** is the decisive clue on every line of both pages: it marks an ordinary statement. The people and the content words change from caption to caption; the signal is what stays.',
        repair: {
          id: 'l1-transfer-detail-r', type: 'multiple_choice', objectiveIds: ['find-signal'],
          question: 'In **Sahro waa macallimad**, which word is the signal?',
          options: ['waa', 'Sahro', 'macallimad', 'there is none'],
          correctAnswer: 'waa',
          hint: 'Not the WHO and not what she is — the small word between them.',
          explanation: '**Waa** sits between the person and what she is, marking a plain statement. New page, new person, same signal.',
        },
      },
    },
    {
      id: '1-whole-write', type: 'produce', exercise: {
        id: 'l1-whole-write', type: 'translate', objectiveIds: ['build-statement'],
        question: 'Write the caption line “The boy is a teacher.” from memory.',
        answer: 'Wiilku waa macallin',
        hint: 'Build WHO → SIGNAL → WHAT. Keep the whole line together.',
        explanation: '**Wiilku waa macallin** is one complete written statement. Rebuilding a full line from memory is the bridge from choosing parts to holding a whole sentence.',
        repair: {
          id: 'l1-whole-write-r', type: 'translate', objectiveIds: ['build-statement'],
          question: 'Write the caption line “Omar is a good student.”',
          answer: 'Cumar waa arday wanaagsan',
          hint: 'WHO → SIGNAL → WHAT — four parts this time.',
          explanation: '**Cumar waa arday wanaagsan** — Omar, the plain-statement signal, then what he is. If your words were in the right order with **waa** in the middle, count it.',
        },
      },
    },
    {
      id: '1-payoff', type: 'payoff',
      prompt: 'Back to the first class page: **Wiilku waa macallin. Cumar waa arday wanaagsan.**\n\nYou are not matching isolated words or spelling each line out letter by letter. You are reading two captions the way they were written — a person, a plain-statement signal, and what that person is. And when a new page put Sahra in the teacher\u2019s place, you read that too.',
    },
    {
      id: '1-summary', type: 'summary', title: 'What you can do now',
      content: 'Read a short Somali caption in three passes: **WHO → SIGNAL → WHAT**. **Waa** marks a plain statement; the words around it say who and what.',
    },
  ],
  newItems: ['1-teach-signal'],
  objectives: ['decode-statement', 'find-signal', 'build-statement'],
};

// ============================================================================
// LESSON 2 — Naming Things (nouns and gender)
// ============================================================================

const LESSON_2: Lesson = {
  id: 2,
  unitId: 1,
  title: 'Naming Things',
  flowVersion: 2,
  cards: [
    {
      id: '2-blueprint',
      type: 'blueprint',
      blueprintSlot: ['WHO', 'WHAT'],
      content: `${BOX}\n\nToday: the WHO box. Nouns, and the one property of them you cannot see.`,
    },
    {
      id: '2-promise',
      type: 'promise',
      prompt: 'Explain why “the boy” and “the hand” take different endings, even though the bare nouns hide the difference.',
    },
    {
      id: '2-passage-a', type: 'passage',
      passage: {
        id: 'l2-text-a',
        label: 'A school noticeboard',
        lines: [
          { somali: 'Wiilku waa macallin.', gloss: 'The boy is a teacher.', note: 'The caption you know from the first class page.' },
          { somali: 'Gacantu waa wasakh.', gloss: 'The hand is dirty.', note: 'Gacantu is \u201cthe hand\u201d, named as the thing the line is about.' },
        ],
      },
      content: 'Read both notices in three passes: WHO, SIGNAL, WHAT.',
    },
    {
      id: '2-gist-a', type: 'notice', exercise: {
        id: 'l2-gist-a', type: 'multiple_choice', objectiveIds: ['decode-caption-page'],
        question: 'What do these notices say?',
        options: [
          'what the boy is, and how the hand is',
          'where the boy and the hand are',
          'whose hand is dirty',
          'what the boy is doing to his hand',
        ],
        correctAnswer: 'what the boy is, and how the hand is',
        hint: 'Are these notices about people, places, or events?',
        explanation: 'One caption says the boy is a teacher; the other says the hand is dirty. Each names a thing and says something about it \u2014 the shape you already know from the class page.',
        repair: {
          id: 'l2-gist-a-r', type: 'multiple_choice', objectiveIds: ['decode-caption-page'],
          question: 'Look at the noticeboard once more. Which line is about a hand?',
          options: ['the second line', 'the first line', 'both lines', 'neither line'],
          correctAnswer: 'the second line',
          hint: 'One caption names the boy; the other names something else.',
          explanation: '**Gacantu waa wasakh** \u2014 the second caption \u2014 is about the hand: it is dirty. The first caption is about the boy.',
        },
      },
    },
    {
      id: '2-detail-a', type: 'notice', exercise: {
        id: 'l2-detail-a', type: 'multiple_choice', objectiveIds: ['decode-caption-page'],
        question: 'What does the noticeboard say about the hand?',
        options: ['It is dirty', 'It is hurt', 'It is the boy\u2019s', 'It is clean'],
        correctAnswer: 'It is dirty',
        hint: 'Find the line whose WHO is the hand, then read its WHAT.',
        explanation: '**Gacantu waa wasakh** says the hand is dirty. The routine holds: WHO (**gacantu**), SIGNAL (**waa**), WHAT (**wasakh**).',
        repair: {
          id: 'l2-detail-a-r', type: 'multiple_choice', objectiveIds: ['decode-caption-page'],
          question: 'And what does the noticeboard say about the boy?',
          options: ['He is a teacher', 'He is a student', 'His hand is dirty', 'He is at school'],
          correctAnswer: 'He is a teacher',
          hint: 'Read the first line as WHO, SIGNAL, WHAT.',
          explanation: '**Wiilku waa macallin** means “the boy is a teacher”: WHO, SIGNAL, WHAT.',
        },
      },
    },
    {
      id: '2-coach-endings', type: 'coach', title: 'Same shape, different tail',
      content: 'You read both captions with the same three passes \u2014 WHO, SIGNAL, WHAT \u2014 and nothing in the routine was new. Now look at only the WHO chunks: **wiilku** and **gacantu**. Same job, same position in the line, but one ends **-ku** and the other ends **-tu**. That difference is not a typo and it is not random. The next card tells you what it carries.',
    },
    {
      id: '2-teach',
      type: 'teach',
      title: 'Every noun has a gender',
      content:
        'Here is what the two tails were carrying. Every Somali noun is either **masculine** or **feminine**. This is a grammar label, not a statement about the world: **buug** (book) is masculine and **kab** (shoe) is feminine.\n\n' +
        'Gender decides the ending a noun takes: **-ku** or **-tu** here. Get the gender wrong and the word comes out wrong.\n\n' +
        'Some nouns you can guess from meaning:\n' +
        '\u2022 **nin** (man), **wiil** (boy): masculine\n' +
        '\u2022 **naag** (woman), **gabadh** (girl): feminine\n\n' +
        'Most you cannot:\n' +
        '\u2022 **guri** (house), **buug** (book), **miis** (table): masculine\n' +
        '\u2022 **magaalo** (city), **kab** (shoe), **bil** (month): feminine',
    },
    {
      id: '2-complete-2',
      type: 'complete',
      exercise: {
        id: 'l2-c2',
        type: 'multiple_choice',
        objectiveIds: ['noun-gender'],
        question: 'Which of these nouns is **feminine**?',
        options: ['naag (woman)', 'nin (man)', 'wiil (boy)', 'buug (book)'],
        correctAnswer: 'naag (woman)',
        hint: 'This is one of the few you can guess from meaning.',
        explanation:
          '**Naag** (woman) is feminine, like **gabadh** (girl). **Buug** (book) is masculine \u2014 for most nouns the label has nothing to do with the meaning, which is why it must be learned with the word.',
        repair: {
          id: 'l2-c2-r', type: 'multiple_choice', objectiveIds: ['noun-gender'],
          question: 'And which of these is **masculine**?',
          options: ['miis (table)', 'magaalo (city)', 'kab (shoe)', 'bil (month)'],
          correctAnswer: 'miis (table)',
          hint: 'Three of these four are feminine. The odd one out is a piece of furniture.',
          explanation: '**Miis** (table) is masculine. **Magaalo**, **kab** and **bil** are all feminine \u2014 none of them guessable from meaning.',
        },
      },
    },
    {
      id: '2-teach-diagnostic',
      type: 'teach',
      title: 'How to find out a noun\'s gender',
      content:
        'Since spelling will not tell you, look at the word\'s **"the" form**: that is where gender shows up \u2014 the noticeboard\u2019s **wiilku** and **gacantu** were it at work.\n\n' +
        '\u2022 **wiil** \u2192 **wiilka** (the boy): a **k** appears \u2192 masculine\n' +
        '\u2022 **naag** \u2192 **naagta** (the woman): a **t** appears \u2192 feminine\n\n' +
        'Masculine nouns take a **k**-type ending. Feminine nouns take a **t**-type ending.\n\n' +
        'A good dictionary lists the "the" form for exactly this reason. When you meet a new noun, learn it in that form and the gender comes free.',
    },
    {
      id: '2-notice-1',
      type: 'notice',
      exercise: {
        id: 'l2-n1',
        type: 'multiple_choice',
        objectiveIds: ['noun-gender-diagnostic'],
        question: 'The word for "the house" is **guriga**. What does that tell you about **guri**?',
        options: ['It is masculine', 'It is feminine', 'It is plural', 'It is borrowed'],
        correctAnswer: 'It is masculine',
        hint: 'Look at the consonant that appears in the ending. A k-sound points one way, a t-sound the other.',
        explanation:
          '**Guriga** contains a **g** (a k-type ending) so **guri** is **masculine**. Feminine nouns would show a t-type ending instead, as in **naagta**.',
        repair: {
          id: 'l2-n1-r', type: 'multiple_choice', objectiveIds: ['noun-gender-diagnostic'],
          question: 'The word for "the snake" is **maska**. What does that tell you about **mas**?',
          options: ['It is masculine', 'It is feminine', 'It is plural', 'It is borrowed'],
          correctAnswer: 'It is masculine',
          hint: 'Which consonant shows up in the ending?',
          explanation: '**Maska** shows a **k** \u2014 a k-type ending \u2014 so **mas** is **masculine**, the same story as **guri** \u2192 **guriga**.',
        },
      },
    },
    {
      id: '2-complete-1',
      type: 'complete',
      exercise: {
        id: 'l2-c1',
        type: 'fill_blank',
        objectiveIds: ['noun-gender-diagnostic'],
        question: 'The word for "the book" is **buugga**. So **buug** is ___.',
        options: ['masculine', 'feminine', 'plural', 'definite'],
        correctAnswer: 'masculine',
        hint: 'The doubled g is a k-type ending. That points to one gender.',
        explanation:
          '**Buugga** has a k-type ending, so **buug** is **masculine**: a good example of gender having nothing to do with meaning.',
        repair: {
          id: 'l2-c1-r', type: 'multiple_choice', objectiveIds: ['noun-gender-diagnostic'],
          question: 'The word for "the city" is **magaalada**. So **magaalo** is ___.',
          options: ['feminine', 'masculine', 'plural', 'definite'],
          correctAnswer: 'feminine',
          hint: 'The d in the ending belongs to the t family \u2014 a softened t-type.',
          explanation: '**Magaalada** carries a t-type ending (softened to d), so **magaalo** is **feminine**. A city has a gender like everything else.',
        },
      },
    },
    {
      id: '2-produce-1',
      type: 'produce',
      exercise: {
        id: 'l2-p1',
        type: 'translate',
        objectiveIds: ['noun-gender-diagnostic'],
        question: 'A text uses **naagta** ("the woman"). Write the bare noun: the form with the "the" ending stripped off.',
        answer: 'naag',
        hint: 'Remove the t-type ending. What is left is the word as a dictionary lists it.',
        explanation:
          'Strip **-ta** and you get **naag** (woman). The t-type ending also tells you it is feminine: the bare noun alone would not.',
        repair: {
          id: 'l2-p1-r', type: 'translate', objectiveIds: ['noun-gender-diagnostic'],
          question: 'A text uses **kabta** ("the shoe"). Write the bare noun.',
          answer: 'kab',
          hint: 'Same move: strip the t-type ending.',
          explanation: 'Strip **-ta** and you get **kab** (shoe) \u2014 feminine, exactly as the ending told you.',
        },
      },
    },
    {
      id: '2-example',
      type: 'example',
      title: 'Why you cannot see it',
      content:
        'In everyday Somali, gender rides on the **tone** of the word. Compare:\n\n' +
        '**inan**: boy (tone falls on the first syllable)\n' +
        '**inan**: girl (tone rises to the last)\n\n' +
        'Same letters. Different word. Different gender.\n\n' +
        'Here is the catch: **Somali does not write tone.** There are no accent marks in ordinary spelling. So on the page these two words are identical, and no spelling rule will ever tell you which is which.\n\n' +
        'This is why gender has to be learned with the word, the way you would learn it in French or German. It is not that Somali is irregular: it is that the writing system leaves the clue out.',
    },
    {
      id: '2-notice-3',
      type: 'notice',
      exercise: {
        id: 'l2-n3',
        type: 'multiple_choice',
        objectiveIds: ['noun-gender-unwritten'],
        question: 'Written on its own, the word **inan** can mean either "boy" or "girl". Why can you not tell which?',
        options: [
          'The difference is in the tone, which Somali does not write',
          'The two words are spelled differently but look similar',
          'It depends on the region of the speaker',
          'It is a recent borrowing with no fixed meaning',
        ],
        correctAnswer: 'The difference is in the tone, which Somali does not write',
        hint: 'Think about what the page cannot show you.',
        explanation:
          'In everyday Somali the two are told apart by **tone**: the boy word and the girl word carry it differently. Written Somali uses no accent marks, so both come out as **inan**. Context, or the "the" form, resolves it.',
        repair: {
          id: 'l2-n3-r', type: 'multiple_choice', objectiveIds: ['noun-gender-unwritten'],
          question: 'A learner writes **wiil** and **guri** side by side and asks which is masculine. What is the honest answer?',
          options: [
            'The bare words cannot say — the clue is not written on them',
            'wiil, because it ends in l',
            'guri, because it ends in i',
            'Neither — they have no gender',
          ],
          correctAnswer: 'The bare words cannot say — the clue is not written on them',
          hint: 'Remember inan: the difference lives in tone, and tone is not written.',
          explanation: 'Both bare nouns hide their gender. Read it off their "the" forms instead: **wiilka** is k-type (masculine), **guriga** is k-type too — but **magaalada** is t-type (feminine). The ending is where the clue lives.',
        },
      },
    },
    {
      id: '2-passage-b', type: 'passage',
      passage: {
        id: 'l2-text-b',
        label: 'Another class page',
        lines: [
          { somali: 'Aamina waa macallimad.', gloss: 'Amina is a teacher.', note: 'Aamina is a name \u2014 Amina.' },
          { somali: 'Maryan waa macallimad wanaagsan.', gloss: 'Maryan is a good teacher.', note: 'Wanaagsan adds \u201cgood\u201d to what she is.' },
        ],
      },
      content: 'Read the new captions as WHO, SIGNAL, WHAT.',
    },
    {
      id: '2-transfer-gist', type: 'notice', exercise: {
        id: 'l2-gist-b', type: 'multiple_choice', objectiveIds: ['decode-caption-page'],
        question: 'What are both captions on this page telling you?',
        options: [
          'who is a teacher',
          'where the women teach',
          'what the women are doing today',
          'how the women know the boy',
        ],
        correctAnswer: 'who is a teacher',
        hint: 'Use WHO, SIGNAL, WHAT.',
        explanation: '**Aamina waa macallimad** \u2014 Amina is a teacher. **Maryan waa macallimad wanaagsan** \u2014 Maryan is a good teacher. Each caption names someone and says what she is, exactly the shape you know.',
        repair: {
          id: 'l2-gist-b-r', type: 'multiple_choice', objectiveIds: ['decode-caption-page'],
          question: 'Which caption calls Maryan a GOOD teacher?',
          options: ['the second line', 'the first line', 'both lines', 'neither line'],
          correctAnswer: 'the second line',
          hint: 'Find Maryan first, then read what her caption adds.',
          explanation: 'The second caption, **Maryan waa macallimad wanaagsan**, adds **wanaagsan** \u2014 good. The first says only that Aamina is a teacher.',
        },
      },
    },
    {
      id: '2-transfer-detail', type: 'notice', exercise: {
        id: 'l2-detail-b', type: 'multiple_choice', objectiveIds: ['noun-gender-diagnostic'],
        question: '**Aamina** and **Maryan** carry no ending like **-ku** or **-tu**. Why not?',
        options: [
          'Names do not take the "the" ending',
          'Both names are feminine, and feminine takes no ending',
          'The endings were dropped by mistake',
          'They take the ending only at the end of a sentence',
        ],
        correctAnswer: 'Names do not take the "the" ending',
        hint: 'Would you ever say "the Aamina"?',
        explanation: 'Proper names are already definite \u2014 you never say "the Maryan" \u2014 so they carry no "the" ending, and their gender does not show on the name itself.',
        repair: {
          id: 'l2-detail-b-r', type: 'multiple_choice', objectiveIds: ['noun-gender-diagnostic'],
          question: 'Which caption names Aamina?',
          options: ['the first line', 'the second line', 'both lines', 'neither line'],
          correctAnswer: 'the first line',
          hint: 'Read the WHO chunk of each caption.',
          explanation: '**Aamina waa macallimad** \u2014 the first caption names Aamina and says she is a teacher. The second is about Maryan.',
        },
      },
    },
    {
      id: '2-payoff',
      type: 'payoff',
      prompt:
        'The pattern stays WHO, SIGNAL, WHAT. The endings now carry more:\n\n**wiilku** (the boy) \u2192 k-type \u2192 masculine\n**gacantu** (the hand) \u2192 t-type \u2192 feminine\n**guriga** (the house) \u2192 masculine\n**magaalada** (the city) \u2192 feminine',
    },
    {
      id: '2-summary',
      type: 'summary',
      title: 'Nouns and gender',
      content:
        'Every Somali noun is masculine or feminine. Tone marks it, and writing leaves tone out, so gender must be learned with the word. The reliable clue is the "the" form: k-type ending means masculine, t-type means feminine. Proper names carry no ending at all.',
    },
  ],
  newItems: ['2-teach', '2-example', '2-teach-diagnostic'],
  objectives: ['decode-caption-page', 'noun-gender', 'noun-gender-diagnostic', 'noun-gender-unwritten'],
};

// ============================================================================
// LESSON 3 — Saying "the"
// ============================================================================

const LESSON_3: Lesson = {
  id: 3,
  unitId: 1,
  title: 'Saying "The"',
  flowVersion: 2,
  cards: [
    {
      id: '3-blueprint',
      type: 'blueprint',
      blueprintSlot: ['WHO', 'WHAT'],
      content: `${BOX}\n\nThe WHO box now carries its gender in the ending.`,
    },
    {
      id: '3-passage-a', type: 'passage',
      passage: {
        id: 'l3-text-a',
        label: 'A dictionary page',
        lines: [
          { somali: 'guri, guriga.', gloss: 'house, the house.', note: 'The dictionary lists each noun next to its "the" form.' },
          { somali: 'magaalo, magaalada.', gloss: 'city, the city.', note: 'Same layout, second entry.' },
        ],
      },
      content: 'Read both dictionary entries: the bare noun, then its “the” form.',
    },
    {
      id: '3-gist-a', type: 'notice', exercise: {
        id: 'l3-gist-a', type: 'multiple_choice', objectiveIds: ['article-suffix'],
        question: 'What is this dictionary page showing you?',
        options: [
          'each noun next to its "the" form',
          'two nouns that mean the same thing',
          'the Somali alphabet in order',
          'pairs of opposites',
        ],
        correctAnswer: 'each noun next to its "the" form',
        hint: 'Read the two entries side by side. What changes between the first word and the second?',
        explanation: '**guri, guriga** — house, the house. **magaalo, magaalada** — city, the city. Each entry pairs a bare noun with its "the" form, which is exactly where the gender clue lives.',
        repair: {
          id: 'l3-gist-a-r', type: 'multiple_choice', objectiveIds: ['article-suffix'],
          question: 'Which pair on the page belongs to **magaalo**?',
          options: ['magaalo, magaalada', 'guri, guriga', 'both pairs', 'neither pair'],
          correctAnswer: 'magaalo, magaalada',
          hint: 'Match the first word of each pair.',
          explanation: 'The second entry, **magaalo, magaalada**, is the city pair. The first is the house: **guri, guriga**.',
        },
      },
    },
    {
      id: '3-detail-a', type: 'notice', exercise: {
        id: 'l3-detail-a', type: 'multiple_choice', objectiveIds: ['article-suffix'],
        question: 'Find **guriga** on the page. What is it the "the" form of?',
        options: ['guri (house)', 'magaalo (city)', 'wiil (boy)', 'kab (shoe)'],
        correctAnswer: 'guri (house)',
        hint: 'It sits on the same line as the noun it belongs to.',
        explanation: '**Guriga** is the "the" form of **guri** (house): the entry reads "guri, guriga" — house, the house.',
        repair: {
          id: 'l3-detail-a-r', type: 'multiple_choice', objectiveIds: ['article-suffix'],
          question: 'And **magaalada** — which noun does it come from?',
          options: ['magaalo (city)', 'guri (house)', 'mas (snake)', 'bil (month)'],
          correctAnswer: 'magaalo (city)',
          hint: 'Same move on the second entry.',
          explanation: '**Magaalada** comes from **magaalo** (city): "magaalo, magaalada" — city, the city.',
        },
      },
    },
    {
      id: '3-coach-endings', type: 'coach', title: 'Same page, two tails',
      content: 'Both entries do the same job — noun, then its "the" form — but look at the tails: **guriga** grows a **g**, **magaalada** grows a **d**. Last lesson told you why: the ending shows the noun\'s gender, k-type for masculine, t-type for feminine. So far you have only read the clue. Now you build it.',
    },
    {
      id: '3-teach',
      type: 'teach',
      title: 'There is no word for "the"',
      content:
        'Somali has no separate word for "the". It is an **ending stuck onto the noun**:\n\n' +
        '• **mas** (a snake) → **maska** (the snake)\n' +
        '• **kab** (a shoe) → **kabta** (the shoe)\n\n' +
        'Write it joined: **maska**, not "mas-ka".\n\n' +
        'There is also **no word for "a"**. The bare noun already covers it: **kab** on its own means "shoe" or "a shoe", whichever the English needs.\n\n' +
        'The basic endings are **-ka** for masculine and **-ta** for feminine.',
    },
    {
      id: '3-notice-3',
      type: 'notice',
      exercise: {
        id: 'l3-n3',
        type: 'multiple_choice',
        objectiveIds: ['article-no-indefinite'],
        question: 'How do you say "a shoe" in Somali, given that "the shoe" is **kabta**?',
        options: ['kab', 'kabta', 'kaba', 'a kab'],
        correctAnswer: 'kab',
        hint: 'Somali has no word for "a". Think about what is left when you remove the "the" ending.',
        explanation:
          'Somali has **no indefinite article**. The bare noun **kab** already means "shoe" or "a shoe". You only add an ending when you mean "the".',
        repair: {
          id: 'l3-n3-r', type: 'multiple_choice', objectiveIds: ['article-no-indefinite'],
          question: 'And how do you say "a snake", given that "the snake" is **maska**?',
          options: ['mas', 'maska', 'masa', 'masta'],
          correctAnswer: 'mas',
          hint: 'There is no word for "a". What is left once the "the" ending comes off?',
          explanation: '**Mas** on its own covers "snake" and "a snake". Somali has no separate word for "a" — the bare noun does the job.',
        },
      },
    },
    {
      id: '3-teach-assim',
      type: 'teach',
      title: 'The ending changes shape',
      content:
        'The ending softens to match the sound just before it. This is the part learners skip, and it is why their Somali comes out wrong.\n\n' +
        '**Masculine**: base **-ka**:\n' +
        '• after **g, aa, i, y, w** → **-ga**: guri → **guriga**\n' +
        '• after **e** or **o** → **-ha**, and e becomes a: aabbe → **aabbaha**\n' +
        '• after **c, h, x, kh, q** → just **-a**: libaax → **libaaxa**\n\n' +
        '**Feminine**: base **-ta**:\n' +
        '• after **d, i, y, w, c, h, x, kh, q** → **-da**: mindi → **mindida**\n' +
        '• after **o** → **-da**, and o becomes a: magaalo → **magaalada**\n' +
        '• after **dh** → just **-a**: gabadh → **gabadha**\n' +
        '• after **l** → **-sha**, and the l disappears: bil → **bisha**\n\n' +
        'The **-sha** rule is the one to watch. **bil** → **bisha**, not "bilta".',
    },
    {
      id: '3-coach-decision',
      type: 'coach',
      title: 'Run the same decision every time',
      content:
        `When you need the “the” form, do not search a list at random. Run one decision path:

1. **Gender:** start from the masculine or feminine base ending.
2. **Last sound:** check only the final sound of the noun.
3. **Attach:** apply the matching change and write one word.
4. **Read back:** confirm that you made a definite noun, not a new sentence.

A fixed path reduces guessing. Speed comes after the path becomes automatic.`,
    },
    {
      id: '3-notice-1',
      type: 'notice',
      exercise: {
        id: 'l3-n1',
        type: 'multiple_choice',
        objectiveIds: ['article-assimilation'],
        question: '**Guri** (house) is masculine. Why is "the house" **guriga** and not *gurika*?',
        options: [
          'After i, the masculine ending softens from -ka to -ga',
          'Because guri is borrowed from Arabic',
          'Because guri is actually feminine',
          'Because the word already ends in a vowel, so nothing is added',
        ],
        correctAnswer: 'After i, the masculine ending softens from -ka to -ga',
        hint: 'Look at the sound immediately before the ending, then check the masculine list.',
        explanation:
          'After **g, aa, i, y, w** the masculine ending becomes **-ga**. **Guri** ends in i, so it takes -ga: **guriga**.',
        repair: {
          id: 'l3-n1-r', type: 'multiple_choice', objectiveIds: ['article-assimilation'],
          question: '**Guriga** started from the base ending **-ka**. What happened to the k?',
          options: ['It softened to g after i', 'It doubled, as in buugga', 'It dropped out entirely', 'It turned into t'],
          correctAnswer: 'It softened to g after i',
          hint: 'The noun ends in i. Check the masculine list for what -ka does after i.',
          explanation: 'After **i** the masculine ending softens: **-ka** becomes **-ga**, so **guri** gives **guriga**. The base ending is still underneath — it just changed shape.',
        },
      },
    },
    {
      id: '3-notice-2',
      type: 'notice',
      exercise: {
        id: 'l3-n2',
        type: 'multiple_choice',
        objectiveIds: ['article-assimilation'],
        question: '**Bil** means "month". Which is the correct form for "the month"?',
        options: ['bisha', 'bilta', 'bilka', 'bilda'],
        correctAnswer: 'bisha',
        hint: 'Bil is feminine and ends in l. That triggers the one rule where a letter disappears.',
        explanation:
          'After **l**, the feminine ending becomes **-sha** and the **l drops**: bil → **bisha**. This is the least guessable rule in the set, which is why it is worth learning first.',
        repair: {
          id: 'l3-n2-r', type: 'multiple_choice', objectiveIds: ['article-assimilation'],
          question: '**Gabadh** means "girl". Which is the correct form for "the girl"?',
          options: ['gabadha', 'gabadhta', 'gabadhsha', 'gabadhda'],
          correctAnswer: 'gabadha',
          hint: 'After dh, the feminine ending shrinks to just -a in writing.',
          explanation: 'After **dh** the feminine ending is just **-a**: gabadh → **gabadha**. (The other form of the word, **gabar**, gives **gabarta** — both are correct.)',
        },
      },
    },
    {
      id: '3-complete-1',
      type: 'produce',
      exercise: {
        id: 'l3-c1',
        type: 'translate',
        objectiveIds: ['article-assimilation'],
        question: '**Magaalo** (city) is feminine and ends in **o**. Write "the city" in Somali.',
        answer: 'magaalada',
        hint: 'After o, the feminine ending becomes -da, and the o itself changes to a.',
        explanation:
          'After **o** the feminine ending becomes **-da**, and the **o changes to a**: magaalo → **magaalada**. Two changes at once, which is why this one is easy to get half-right.',
        repair: {
          id: 'l3-c1-r', type: 'multiple_choice', objectiveIds: ['article-assimilation'],
          question: 'So which of these is "the city"?',
          options: ['magaalada', 'magaalota', 'magaaloka', 'magaalta'],
          correctAnswer: 'magaalada',
          hint: 'Feminine, ending in o: the ending becomes -da and the o becomes a.',
          explanation: '**Magaalo** is feminine and ends in **o**, so the ending is **-da** and the o turns to a: **magaalada**. The other three spellings are the mistakes this rule prevents.',
        },
      },
    },
    {
      id: '3-complete-2',
      type: 'produce',
      exercise: {
        id: 'l3-c2',
        type: 'translate',
        objectiveIds: ['article-assimilation'],
        question: '**Aabbe** (father) is masculine and ends in **e**. Write "the father" in Somali.',
        answer: 'aabbaha',
        hint: 'After e the masculine ending becomes -ha, and the e itself becomes a.',
        explanation:
          'After **e** the masculine ending becomes **-ha**, and the **e changes to a**: aabbe → **aabbaha**. Same double change as the feminine -o rule.',
        repair: {
          id: 'l3-c2-r', type: 'multiple_choice', objectiveIds: ['article-assimilation'],
          question: 'And which of these is "the father"?',
          options: ['aabbaha', 'aabbeha', 'aabbeka', 'aabbega'],
          correctAnswer: 'aabbaha',
          hint: 'After e the masculine ending is -ha, and the e itself becomes a.',
          explanation: '**Aabbe** ends in **e**: the ending is **-ha** and the e turns to a, giving **aabbaha**. Both the ending and the vowel change.',
        },
      },
    },
    {
      id: '3-complete-3',
      type: 'produce',
      exercise: {
        id: 'l3-c3',
        type: 'translate',
        objectiveIds: ['article-assimilation'],
        question: '**Gabadh** (girl) is feminine and ends in **dh**. Write "the girl" in Somali.',
        // Both are correct: Nilsson gives gabadh/gabar as variants of the
        // same word, so gabarta is as right as gabadha.
        answer: ['gabadha', 'gabarta'],
        hint: 'After dh, the feminine ending shrinks to just -a in writing.',
        explanation:
          'After **dh** the feminine ending is written as just **-a**: gabadh → **gabadha**. The dh itself is pronounced more strongly. (You may also meet **gabar** for "girl", giving **gabarta**: both are correct.)',
        repair: {
          id: 'l3-c3-r', type: 'translate', objectiveIds: ['article-assimilation'],
          question: '**Gabar** is the other word for "girl", and no softening rule mentions r. Write "the girl" using **gabar**.',
          answer: ['gabarta'],
          hint: 'When no rule applies, the feminine ending stays in its base form.',
          explanation: '**R** is on no softening list, so the ending stays **-ta**: gabar → **gabarta**. Same word, same gender, base ending.',
        },
      },
    },
    {
      id: '3-complete-4',
      type: 'complete',
      exercise: {
        id: 'l3-c4',
        type: 'multiple_choice',
        objectiveIds: ['article-assimilation'],
        question: '**Libaax** (lion) is masculine and ends in the throat letter **x**. "The lion" is ___.',
        options: ['libaaxa', 'libaaxka', 'libaaxga', 'libaaxha'],
        correctAnswer: 'libaaxa',
        hint: 'After the throat letters c, h, x, kh, q, the masculine ending loses its consonant entirely.',
        explanation:
          'After **c, h, x, kh, q** the masculine ending is just **-a**: libaax → **libaaxa**. The throat consonant already carries the weight, so no k-sound is added.',
        repair: {
          id: 'l3-c4-r', type: 'multiple_choice', objectiveIds: ['article-assimilation'],
          question: 'Why does **libaaxa** carry no k-sound at all?',
          options: [
            'The throat letter already carries the weight, so the ending is just -a',
            'Libaax is feminine, and feminine nouns take -a',
            'The k was dropped by a spelling mistake',
            'Every masculine noun takes just -a',
          ],
          correctAnswer: 'The throat letter already carries the weight, so the ending is just -a',
          hint: 'Check which letters are on the "just -a" list.',
          explanation: 'After the throat letters **c, h, x, kh, q** the masculine ending loses its consonant and is written as just **-a**. Libaax ends in x, so **libaaxa**.',
        },
      },
    },
    {
      id: '3-produce-1',
      type: 'produce',
      exercise: {
        id: 'l3-p1',
        type: 'translate',
        objectiveIds: ['article-assimilation'],
        question: '**Mindi** (knife) is feminine and ends in **i**. Write "the knife" in Somali.',
        answer: 'mindida',
        hint: 'Check the feminine list for what happens after i.',
        explanation:
          'After **d, i, y, w** and the throat letters, the feminine ending becomes **-da**: mindi → **mindida**.',
        repair: {
          id: 'l3-p1-r', type: 'multiple_choice', objectiveIds: ['article-assimilation'],
          question: 'So which of these is "the knife"?',
          options: ['mindida', 'mindita', 'mindiha', 'mindisha'],
          correctAnswer: 'mindida',
          hint: 'Feminine, ending in i: check the feminine list.',
          explanation: 'After **i** the feminine ending becomes **-da**: mindi → **mindida**.',
        },
      },
    },
    {
      id: '3-produce-2',
      type: 'produce',
      exercise: {
        id: 'l3-p2',
        type: 'translate',
        // Also tests the base suffix itself: this is the case where no
        // softening rule applies and -ka surfaces unchanged.
        objectiveIds: ['article-assimilation', 'article-suffix'],
        question: '**Macallin** (teacher) is masculine and ends in **n**. Write "the teacher" in Somali.',
        answer: 'macallinka',
        hint: 'None of the softening rules mention n, so the ending stays in its basic form.',
        explanation:
          '**N** is not on any softening list, so the masculine ending stays as the base **-ka**: **macallinka**. When no rule applies, use the base form.',
        repair: {
          id: 'l3-p2-r', type: 'translate', objectiveIds: ['article-assimilation', 'article-suffix'],
          question: '**Nin** (man) is masculine and ends in **n**. Write "the man" in Somali.',
          answer: 'ninka',
          hint: 'N is on no softening list, same as for macallin.',
          explanation: '**N** appears in no softening rule, so the masculine ending stays **-ka**: nin → **ninka**. No rule applies, base form wins.',
        },
      },
    },
    {
      id: '3-passage-b', type: 'passage',
      passage: {
        id: 'l3-text-b',
        label: 'Another dictionary page',
        lines: [
          { somali: 'mas, maska.', gloss: 'snake, the snake.' },
          { somali: 'kab, kabta.', gloss: 'shoe, the shoe.' },
        ],
      },
      content: 'Read the new dictionary pairs, then use their endings.',
    },
    {
      id: '3-transfer-gist', type: 'notice', exercise: {
        id: 'l3-gist-b', type: 'multiple_choice', objectiveIds: ['article-suffix'],
        question: 'Same kind of page, new words. What does the line "kab, kabta" tell you?',
        options: [
          'kab means shoe, and kabta is its "the" form',
          'kab and kabta are two different kinds of shoe',
          'kabta is the plural of kab',
          'kab is the "the" form of kabta',
        ],
        correctAnswer: 'kab means shoe, and kabta is its "the" form',
        hint: 'Same layout as the first page: bare noun, then its "the" form.',
        explanation: 'The pair works exactly like "guri, guriga": **kab** is the bare noun (shoe), **kabta** its "the" form. And the t-type ending tells you kab is feminine.',
        repair: {
          id: 'l3-gist-b-r', type: 'multiple_choice', objectiveIds: ['article-suffix'],
          question: 'Which pair on this page shows the snake?',
          options: ['mas, maska', 'kab, kabta', 'both pairs', 'neither pair'],
          correctAnswer: 'mas, maska',
          hint: 'Match the animal to its pair.',
          explanation: '**mas, maska** is the snake pair. **kab, kabta** is the shoe.',
        },
      },
    },
    {
      id: '3-transfer-detail', type: 'notice', exercise: {
        id: 'l3-detail-b', type: 'multiple_choice', objectiveIds: ['article-suffix'],
        question: 'On this page, which "the" form shows a t-type ending?',
        options: ['kabta', 'maska', 'both of them', 'neither of them'],
        correctAnswer: 'kabta',
        hint: 'Read the consonant inside each ending: k points one way, t the other.',
        explanation: '**Kabta** carries a **t** — t-type, feminine. **Maska** carries a **k** — k-type, masculine. Same page, two genders, readable straight off the endings.',
        repair: {
          id: 'l3-detail-b-r', type: 'multiple_choice', objectiveIds: ['article-suffix'],
          question: 'And which shows a k-type ending?',
          options: ['maska', 'kabta', 'both of them', 'neither of them'],
          correctAnswer: 'maska',
          hint: 'The other one.',
          explanation: '**Maska** carries a **k** — k-type, so **mas** is masculine, just as **kabta** told you **kab** is feminine.',
        },
      },
    },
    {
      id: '3-payoff',
      type: 'payoff',
      prompt:
        'You can now build "the" for every noun you have met:\n\n**maska** (the snake)  ·  **kabta** (the shoe)\n**guriga** (the house)  ·  **magaalada** (the city)\n**aabbaha** (the father)  ·  **bisha** (the month)\n**gabadha** (the girl)  ·  **libaaxa** (the lion)\n\nOne rule, eight shapes.',
    },
    {
      id: '3-summary',
      type: 'summary',
      title: 'The "the" ending',
      content:
        '"The" is an ending, not a word, and it is written joined. Base forms are -ka (masculine) and -ta (feminine), but the ending softens to match the sound before it: -ga, -ha, -a, -da, -sha. There is no word for "a": the bare noun covers it.',
    },
  ],
  newItems: ['3-teach', '3-teach-assim'],
  objectives: ['article-suffix', 'article-assimilation', 'article-no-indefinite'],
};

// ============================================================================
// LESSON 4 — I, You, He, She + the subject marker
// ============================================================================

const LESSON_4: Lesson = {
  id: 4,
  unitId: 1,
  title: 'I, You, He, She',
  cards: [
    {
      id: '4-blueprint',
      type: 'blueprint',
      blueprintSlot: 'WHO',
      content: `${BOX}\n\nLast time in the WHO box. Pronouns, and the marker that says "this one is the subject".`,
    },
    {
      id: '4-promise',
      type: 'promise',
      prompt: 'Build a complete Somali sentence: **Wiilku waa macallin.** “The boy is a teacher.”',
    },
    {
      id: '4-passage-a', type: 'passage',
      passage: {
        id: 'l4-text-a',
        label: 'A staff noticeboard',
        lines: [
          { somali: 'Aamina waa macallimad.', gloss: 'Aamina is a teacher.', note: 'A name, a signal word, and what she is.' },
          { somali: 'Cumar waa arday wanaagsan.', gloss: 'Cumar is a good student.', note: 'Same shape, second name.' },
        ],
      },
      content: 'Read the two staff captions. Who is each person?',
    },
    {
      id: '4-gist-a', type: 'notice', exercise: {
        id: 'l4-gist-a', type: 'multiple_choice', objectiveIds: ['sentence-shape'],
        question: 'What is this noticeboard page telling you?',
        options: [
          'who each person is, and what they are',
          'the times of each class',
          'a list of classroom rules',
          'the names of every subject in the school',
        ],
        correctAnswer: 'who each person is, and what they are',
        hint: 'Each line pairs a name with what that person is.',
        explanation: '**Aamina waa macallimad** — Aamina is a teacher. **Cumar waa arday wanaagsan** — Cumar is a good student. Every line answers the same two questions: who, and what are they.',
        repair: {
          id: 'l4-gist-a-r', type: 'multiple_choice', objectiveIds: ['sentence-shape'],
          question: 'A second board reads: **Maryan waa macallimad wanaagsan.** What does it tell you?',
          options: [
            'who Maryan is, and what she is like',
            'where Maryan teaches',
            'when Maryan starts work',
            'how many classes Maryan has',
          ],
          correctAnswer: 'who Maryan is, and what she is like',
          hint: 'Same shape as before: a name, then what that person is.',
          explanation: '**Maryan waa macallimad wanaagsan** — Maryan is a good teacher. Who, then what she is.',
        },
      },
    },
    {
      id: '4-detail-a', type: 'notice', exercise: {
        id: 'l4-detail-a', type: 'multiple_choice', objectiveIds: ['sentence-shape'],
        question: 'Find the word **waa** on the page. What is its job?',
        options: [
          'It signals that the line is a statement',
          'It marks which noun is the subject',
          'It is the verb "to be", conjugated for each person',
          'It turns the line into a question',
        ],
        correctAnswer: 'It signals that the line is a statement',
        hint: 'It sits in the same place in every line, between the name and the description.',
        explanation: '**waa** is the statement signal: it announces that the line states a fact. It does not change shape for different people, and it does not ask anything.',
        repair: {
          id: 'l4-detail-a-r', type: 'multiple_choice', objectiveIds: ['sentence-shape'],
          question: 'In **Wiilku waa macallin**, which word is the statement signal?',
          options: ['waa', 'Wiilku', 'macallin', 'the -u on the end'],
          correctAnswer: 'waa',
          hint: 'Look for the word that appears in every statement, whatever the sentence is about.',
          explanation: '**waa** is the signal. **Wiilku** is the subject and **macallin** is what he is; those change from sentence to sentence, but the signal stays.',
        },
      },
    },
    {
      id: '4-teach',
      type: 'teach',
      title: 'The eight pronouns',
      content:
        'These are the standalone pronouns: the ones you would use to answer "who?":\n\n' +
        '• **aniga**: I\n' +
        '• **adiga**: you (one person)\n' +
        '• **isaga**: he\n' +
        '• **iyada**: she\n' +
        '• **annaga**: we (**not** including you)\n' +
        '• **innaga**: we (**including** you)\n' +
        '• **idinka**: you (more than one)\n' +
        '• **iyaga**: they\n\n' +
        'Two things English speakers should notice.\n\n' +
        '**Somali splits "we".** **Annaga** excludes the listener: "we, but not you". **Innaga** includes them: "we, you and I". English makes you guess; Somali makes you choose.\n\n' +
        '**"They" has no gender.** **Iyaga** covers any group. There is no separate feminine "they".',
    },
    {
      id: '4-notice-1',
      type: 'notice',
      exercise: {
        id: 'l4-n1',
        type: 'multiple_choice',
        objectiveIds: ['pronouns-inclusive-exclusive'],
        question: 'You are telling a friend about a trip they were not on. Which "we" do you use?',
        options: ['annaga', 'innaga', 'idinka', 'iyaga'],
        correctAnswer: 'annaga',
        hint: 'One "we" shuts the listener out of the group; the other pulls them in.',
        explanation:
          '**Annaga** is the exclusive "we": it means "us, not you". **Innaga** would wrongly include your friend in a trip they did not go on.',
        repair: {
          id: 'l4-n1-r', type: 'multiple_choice', objectiveIds: ['pronouns-inclusive-exclusive'],
          question: 'You are inviting the person you are talking to into your group\u2019s plan. Which "we" do you use?',
          options: ['innaga', 'annaga', 'idinka', 'iyada'],
          correctAnswer: 'innaga',
          hint: 'This time the listener belongs inside the "we".',
          explanation: '**Innaga** pulls the listener into the group: "we, you and I". **Annaga** would shut them out of a plan they are part of.',
        },
      },
    },
    {
      id: '4-teach-short',
      type: 'teach',
      title: 'The short subject pronouns',
      content:
        'Alongside those, Somali has a set of short pronouns that sit next to the sentence signal:\n\n' +
        '• **aan**: I\n' +
        '• **aad**: you\n' +
        '• **uu**: he\n' +
        '• **ay**: she / they\n\n' +
        'You will see these fused onto **waa**, the statement signal, in the next unit: **waa + uu** becomes **wuu**.\n\n' +
        'For now just recognise them. They are short, they are everywhere, and they are not the same words as **aniga / adiga / isaga / iyada**.',
    },
    {
      id: '4-notice-2',
      type: 'notice',
      exercise: {
        id: 'l4-n2',
        type: 'multiple_choice',
        objectiveIds: ['pronouns-subject'],
        question: 'Which pronoun means "they"?',
        options: ['iyaga', 'iyada', 'idinka', 'isaga'],
        correctAnswer: 'iyaga',
        hint: 'Three of these are singular or second-person. Only one refers to a group being talked about.',
        explanation:
          '**Iyaga** is "they", for any group regardless of gender. **Iyada** is "she", **isaga** is "he", and **idinka** is plural "you".',
        repair: {
          id: 'l4-n2-r', type: 'multiple_choice', objectiveIds: ['pronouns-subject'],
          question: 'Which pronoun means "she"?',
          options: ['iyada', 'iyaga', 'isaga', 'innaga'],
          correctAnswer: 'iyada',
          hint: 'Match the vowels: "he" and "she" differ only in the middle.',
          explanation: '**Iyada** is "she". **Isaga** is "he", **iyaga** is "they", and **innaga** is the inclusive "we".',
        },
      },
    },
    {
      id: '4-teach-subject',
      type: 'teach',
      title: 'Marking the subject',
      content:
        'Somali flags which noun phrase is the **subject**: the doer. When a word ending in **-a** becomes the subject, that **-a** changes to **-u**:\n\n' +
        '• **wiilka** (the boy) → **Wiilku** waa macallin.: *The boy is a teacher.*\n' +
        '• **aniga** (I) → **Anigu**...\n\n' +
        'Only the **last word** of the subject phrase takes the marker, and only the subject gets it. In **Wiilku waa macallin**, the word **macallin** is what the boy *is*, not the doer, so it stays plain.\n\n' +
        'English does this too, just barely: "he" versus "him". Somali applies it to nouns as well.',
    },
    {
      id: '4-complete-1',
      type: 'complete',
      exercise: {
        id: 'l4-c1',
        type: 'fill_blank',
        objectiveIds: ['subject-case'],
        question: 'Make **wiilka** (the boy) the subject of a sentence: ___ waa macallin.',
        options: ['Wiilku', 'Wiilka', 'Wiilki', 'Wiilkii'],
        correctAnswer: 'Wiilku',
        hint: 'The final -a of the subject changes to -u.',
        explanation:
          'As the subject, **wiilka** becomes **Wiilku**: the final -a shifts to -u. **Wiilku waa macallin**: "The boy is a teacher."',
        repair: {
          id: 'l4-c1-r', type: 'multiple_choice', objectiveIds: ['subject-case'],
          question: 'Make **gacanta** (the hand) the subject of a sentence: ___ waa wasakh.',
          options: ['Gacantu', 'Gacanta', 'Gacanti', 'Gacantii'],
          correctAnswer: 'Gacantu',
          hint: 'Same rule: the final -a of the subject changes to -u.',
          explanation: '**Gacanta** becomes **Gacantu** as the subject: **Gacantu waa wasakh**: "The hand is dirty."',
        },
      },
    },
    {
      id: '4-coach-roles',
      type: 'coach',
      title: 'Choose the role before the form',
      content:
        `Before changing an ending, point to the role in the message:

1. **WHO is doing or being described?** That phrase is the subject.
2. **Is the listener inside “we”?** Choose the pronoun from the real group, not from the English word.
3. **What is said about the WHO?** Do not mark that description as another subject.

Meaning chooses the form. If you start with the ending, two plausible-looking answers can hide the real mistake.`,
    },
    {
      id: '4-complete-2',
      type: 'complete',
      exercise: {
        id: 'l4-c2',
        type: 'multiple_choice',
        objectiveIds: ['subject-case'],
        question: 'In **Wiilku waa macallin**, why does **macallin** have no ending at all?',
        options: [
          'It is not the subject: it is what the boy is',
          'It is feminine, so it takes no ending',
          'Ending markers are optional on the last word',
          'It is a borrowed word, so it never changes',
        ],
        correctAnswer: 'It is not the subject: it is what the boy is',
        hint: 'Only one noun phrase in a sentence is the doer. Which one is it here?',
        explanation:
          'Only the **subject** takes the marker. **Wiilku** is the subject; **macallin** describes what he is, so it stays in its bare form, which also means "a teacher", since Somali has no word for "a".',
        repair: {
          id: 'l4-c2-r', type: 'multiple_choice', objectiveIds: ['subject-case'],
          question: 'In **Gacantu waa wasakh**, which word is the subject?',
          options: ['Gacantu', 'waa', 'wasakh', 'all three words equally'],
          correctAnswer: 'Gacantu',
          hint: 'The subject is the one the sentence is about, and it carries the changed ending.',
          explanation: '**Gacantu** is the subject: it names what the sentence is about, and its -a became -u. **Wasakh** describes the hand, so it stays plain.',
        },
      },
    },
    {
      id: '4-produce-1',
      type: 'produce',
      exercise: {
        id: 'l4-p1',
        type: 'unscramble',
        objectiveIds: ['subject-case', 'sentence-shape'],
        question: 'Put these in order to say "The boy is a teacher."',
        words: ['macallin', 'Wiilku', 'waa'],
        // Target goes in `answer` — isAnswerCorrect() compares against it.
        // Never put it in `somali`: that field is *rendered* above the word
        // bank, which would show the learner the answer.
        answer: 'Wiilku waa macallin',
        hint: 'Subject first, then the signal word waa, then what he is.',
        explanation:
          '**Wiilku waa macallin.** Subject (Wiilku) → signal (waa) → what he is (macallin). That order (WHO then SIGNAL then the rest) is the shape of the whole language.',
        repair: {
          id: 'l4-p1-r', type: 'unscramble', objectiveIds: ['subject-case', 'sentence-shape'],
          question: 'Put these in order to say "Cumar is a student."',
          words: ['arday', 'Cumar', 'waa'],
          answer: 'Cumar waa arday',
          hint: 'Name first, then the signal, then what he is.',
          explanation: '**Cumar waa arday.** Name (Cumar) → signal (waa) → what he is (arday). Same shape as before.',
        },
      },
    },
    {
      id: '4-produce-2',
      type: 'produce',
      exercise: {
        id: 'l4-p2',
        type: 'translate',
        objectiveIds: ['pronouns-inclusive-exclusive'],
        question: 'Write the Somali pronoun for "we" when you are speaking to someone who **is** part of the group.',
        answer: 'innaga',
        hint: 'This is the inclusive one: the "we" that pulls the listener in.',
        explanation:
          '**Innaga** is the inclusive "we", meaning "you and I". **Annaga** would exclude the WHO you are speaking to.',
        repair: {
          id: 'l4-p2-r', type: 'translate', objectiveIds: ['pronouns-inclusive-exclusive'],
          question: 'Write the Somali pronoun for "we" when the person you are speaking to is **not** part of the group.',
          answer: 'annaga',
          hint: 'This is the exclusive one: the "we" that shuts the listener out.',
          explanation: '**Annaga** is the exclusive "we": "us, not you". **Innaga** would wrongly pull your listener into the group.',
        },
      },
    },
    {
      id: '4-passage-b', type: 'passage',
      passage: {
        id: 'l4-text-b',
        label: 'The same board, updated',
        lines: [
          { somali: 'Wiilku waa macallin.', gloss: 'The boy is a teacher.', note: 'This time the subject is an ordinary noun with a "the" ending, and its tail has changed.' },
          { somali: 'Maryan waa macallimad wanaagsan.', gloss: 'Maryan is a good teacher.', note: 'A name again, so its shape stays the same.' },
        ],
      },
      content: 'The board has been updated. One line names a person; the other describes a boy with words you already own.',
    },
    {
      id: '4-transfer-gist', type: 'notice', exercise: {
        id: 'l4-gist-b', type: 'multiple_choice', objectiveIds: ['sentence-shape'],
        question: 'What does the line **Maryan waa macallimad wanaagsan** tell you?',
        options: [
          'who Maryan is, and what she is like',
          'where Maryan is going',
          'what Maryan is doing right now',
          'who is talking to Maryan',
        ],
        correctAnswer: 'who Maryan is, and what she is like',
        hint: 'Same sentence shape as the first board: who, then what.',
        explanation: '**Maryan waa macallimad wanaagsan** — Maryan is a good teacher. The shape you learned on the first board reads this one too.',
        repair: {
          id: 'l4-gist-b-r', type: 'multiple_choice', objectiveIds: ['sentence-shape'],
          question: 'What does **Wiilku waa macallin** tell you?',
          options: [
            'who the boy is, and what he is',
            'what the boy is doing',
            'where the boy lives',
            'who teaches the boy',
          ],
          correctAnswer: 'who the boy is, and what he is',
          hint: 'Read it with the same shape: who, then what.',
          explanation: '**Wiilku waa macallin** — the boy is a teacher. Who, then what he is.',
        },
      },
    },
    {
      id: '4-transfer-detail', type: 'notice', exercise: {
        id: 'l4-detail-b', type: 'multiple_choice', objectiveIds: ['subject-case'],
        question: 'On this page, which word changed its tail because it is the subject?',
        options: ['Wiilku', 'waa', 'macallin', 'Maryan'],
        correctAnswer: 'Wiilku',
        hint: 'Look for the word whose usual -a ending has become -u.',
        explanation: '**Wiilku** is the subject: underneath, it is **wiilka** with its final -a changed to -u. **Maryan** is a name, so it keeps its shape.',
        repair: {
          id: 'l4-detail-b-r', type: 'multiple_choice', objectiveIds: ['subject-case'],
          question: '**Wiilka** is the boy. In this sentence the final **-a** became ___.',
          options: ['-u', '-i', '-ta', '-ka'],
          correctAnswer: '-u',
          hint: 'The subject marker changes the last vowel of the word.',
          explanation: 'The final **-a** became **-u**: wiilka → **Wiilku**. That is the subject marker doing its one job.',
        },
      },
    },
    {
      id: '4-payoff',
      type: 'payoff',
      prompt:
        '**Wiilku waa macallin.**\n*The boy is a teacher.*\n\nEvery piece is something you built:\n**wiil** the noun · **-ka** the "the" ending · **-u** the subject marker · **waa** the signal\n\nThat is the WHO box finished.',
    },
    {
      id: '4-summary',
      type: 'summary',
      title: 'Pronouns and the subject marker',
      content:
        'Somali has eight standalone pronouns, splits "we" into inclusive and exclusive, and does not gender "they". Short subject pronouns (aan, aad, uu, ay) sit next to the signal word. The subject of a sentence is marked by changing a final -a to -u.',
    },
  ],
  newItems: ['4-teach', '4-teach-short', '4-teach-subject'],
  objectives: ['pronouns-subject', 'pronouns-inclusive-exclusive', 'subject-case', 'sentence-shape'],
};

// ============================================================================
// EXPORT
// ============================================================================

// ============================================================================
// LESSON 5 — The Signal Words  (Unit 2)
// ============================================================================

/**
 * The first lesson of Unit 2, and the one the whole course exists for: the
 * SIGNAL box, which has no English equivalent.
 *
 * THREE signals, not four. The design named waa/baa/waxa/ma, but `ma` is
 * single-sourced and — decisively — the yes/no question particle `ma` is
 * written identically to the negator `má`, because Somali does not write tone
 * (N §2.2, §12.3). Teaching "ma = question" would plant a confident error of
 * exactly the kind that resurfaces on delayed tests. It is cut until it can be
 * taught truthfully, alongside negation. See docs/SOMALI_SOURCES.md §7.
 *
 * Verbs appear here as WHOLE SENTENCES the learner reads, never as parts they
 * assemble — verb forms are Lesson 7. Focus cannot be demonstrated without a
 * verb, so the minimal pair is shown intact, exactly as Nilsson gives it, and
 * every exercise asks which word is *spotlighted*, never how the verb is
 * built. That is why `salaamaysa` and `salaamaysaa` differ here and the
 * difference is deliberately not discussed.
 */
const LESSON_5: Lesson = {
  id: 5,
  unitId: 2,
  title: 'The Signal Words',
  newItems: ['5-teach-baa', '5-teach-waxa'],
  objectives: ['signal-statement', 'signal-focus-before', 'signal-focus-end'],
  cards: [
    {
      id: '5-blueprint',
      type: 'blueprint',
      blueprintSlot: 'SIGNAL',
      content: `${BOX}\n\nA new box, and the reason Somali feels unpredictable. The SIGNAL sits right after WHO, and it decides which word the sentence is really about.`,
    },
    {
      id: '5-promise',
      type: 'promise',
      prompt:
        'Distinguish two sentences made of **exactly the same words**: “SAHRA is greeting her friend” and “Sahra is greeting her FRIEND.”',
    },
    {
      id: '5-passage-a', type: 'passage',
      passage: {
        id: 'l5-text-a',
        label: 'Two captions under one photo',
        lines: [
          { somali: 'Sahra baa salaamaysa saaxiibkeed.', gloss: 'SAHRA is greeting her friend.', note: 'Read both lines. The words are the same.' },
          { somali: 'Sahra waxa ay salaamaysaa saaxiibkeed.', gloss: 'Sahra is greeting her FRIEND.', note: 'Only the small word near the start changed, and the meaning moved with it.' },
        ],
      },
      content: 'Read both captions. The words match; the spotlight changes.',
    },
    {
      id: '5-gist-a', type: 'notice', exercise: {
        id: 'l5-gist-a', type: 'multiple_choice', objectiveIds: ['signal-statement'],
        question: 'The two captions use exactly the same words. What is different between them?',
        options: [
          'the small word in the middle, and which word each line is about',
          'the person doing the greeting',
          'who the friend is',
          'nothing: they mean exactly the same thing',
        ],
        correctAnswer: 'the small word in the middle, and which word each line is about',
        hint: 'Put the lines side by side. One small word swapped, and the English under each line changed with it.',
        explanation: '**baa** in the first line, **waxa** in the second. That one swap moves the spotlight: the first is about SAHRA, the second about her FRIEND.',
        repair: {
          id: 'l5-gist-a-r', type: 'multiple_choice', objectiveIds: ['signal-statement'],
          question: 'A reader says the two captions say exactly the same thing. What do they actually disagree about?',
          options: [
            'which word each caption is about',
            'whether Sahra has a friend',
            'whether the greeting happened',
            'nothing: the reader is right',
          ],
          correctAnswer: 'which word each caption is about',
          hint: 'The action is the same in both. What changes is the word each line singles out.',
          explanation: 'Both captions describe the same greeting. They disagree about the spotlight: SAHRA in the first, her FRIEND in the second. The signal word decides.',
        },
      },
    },
    {
      id: '5-detail-a', type: 'notice', exercise: {
        id: 'l5-detail-a', type: 'multiple_choice', objectiveIds: ['signal-focus-before'],
        question: 'In the first caption, which word is the spotlight on?',
        options: ['Sahra', 'saaxiibkeed', 'baa', 'salaamaysa'],
        correctAnswer: 'Sahra',
        hint: 'The English under the line says it in capital letters.',
        explanation: 'The first caption means "**SAHRA** is greeting her friend". The word right before **baa** is the one being singled out.',
        repair: {
          id: 'l5-detail-a-r', type: 'multiple_choice', objectiveIds: ['signal-focus-before'],
          question: 'In **Gabadhu bariiska baa cuntay**: "The girl ate the rice": which word is the spotlight on?',
          options: ['bariiska', 'Gabadhu', 'cuntay', 'baa'],
          correctAnswer: 'bariiska',
          hint: 'Look immediately to the left of **baa**. ',
          explanation: '**baa** singles out the word right before it: **bariiska**, the rice. "The girl ate **THE RICE**."',
        },
      },
    },
    {
      id: '5-teach',
      type: 'teach',
      title: 'What a signal does',
      content:
        'English emphasises a word by saying it louder:\n\n' +
        '• "**SAHRA** is greeting her friend." (not someone else)\n' +
        '• "Sahra is greeting her **FRIEND**." (not her boss)\n\n' +
        'The words never move. Only your voice changes.\n\n' +
        'Somali does not do this. **Volume carries no meaning here.** Instead a small word (the **signal**) goes into the sentence. *Where it sits* tells you which part is spotlighted.\n\n' +
        'This is why sentences can look scrambled at first. They are not. The signal does a job English hands to your tone of voice.\n\n' +
        'So a Somali speaker reading a flat sentence knows exactly which word matters. An English speaker reading the same sentence sees no emphasis at all.',
    },
    {
      id: '5-teach-waa',
      type: 'teach',
      title: 'waa: just tell me',
      content:
        'You already know this one. **waa** marks a plain, ordinary statement. Nothing is singled out:\n\n' +
        '• **Wiilku waa macallin.**  *The boy is a teacher.*\n\n' +
        'That is a flat fact. No word is being contrasted with anything.\n\n' +
        // Closes the `waa` = "is" inference. Without this the learner meets waa
        // only in a sentence English translates with "is", and concludes waa IS
        // "is" — a wrong model that §1.12 says would compete with the right one
        // indefinitely, with nothing downstream to catch it. Forward-referencing
        // `wuu keenaa` rather than inventing an example: both halves are already
        // double-sourced (`wuu` N §5.1 + W-gram, `keenaa` N §13.1.4a + W-gram)
        // and Lesson 7 teaches it. Previewing the next unit is this lesson's own
        // established habit — the waxa card does the same with `waxa ay`.
        '**One thing to be careful about.** That English sentence has the word "is" in it, and the Somali does not. There is no verb in **Wiilku waa macallin** at all. English simply cannot say it without one.\n\n' +
        '**waa** is not the word for "is". It sits in front of action words just the same:\n\n' +
        '• **wuu keenaa**  *he brings*\n\n' +
        'Notice that **waa** still marks a plain statement, whatever follows it.\n\n' +
        'Use **waa** when you would say the English sentence evenly, with no word pushed harder than the rest.',
    },
    {
      id: '5-complete-2',
      type: 'complete',
      exercise: {
        id: 'l5-c2',
        type: 'multiple_choice',
        objectiveIds: ['signal-statement'],
        question:
          'You just want to state a plain fact: "The boy is a teacher": with no word singled out. Which signal?',
        options: ['waa', 'baa', 'waxa', 'ayaa'],
        correctAnswer: 'waa',
        hint: 'Two of these spotlight something. One just states.',
        explanation:
          '**waa** marks an ordinary statement: **Wiilku waa macallin.** Using **baa** or **waxa** would claim you are contrasting something with something else, which changes what the listener thinks you mean.',
        repair: {
          id: 'l5-c2-r', type: 'multiple_choice', objectiveIds: ['signal-statement'],
          question: 'You want to state a flat fact, "Cumar is a student", with nothing singled out: Cumar ___ arday. Which signal fills the gap?',
          options: ['waa', 'baa', 'waxa', 'ayaa'],
          correctAnswer: 'waa',
          hint: 'Two of these spotlight something. One just states.',
          explanation: '**waa** marks an ordinary statement: **Cumar waa arday.** **baa** or **waxa** would claim a contrast you did not mean.',
        },
      },
    },
    {
      id: '5-teach-baa',
      type: 'teach',
      isNew: true,
      title: 'baa: spotlight what came just before',
      content:
        '**baa** shines a light on the words **immediately before it**.\n\n' +
        '• **Sahra baa salaamaysa saaxiibkeed.**  *SAHRA is greeting her friend.*\n\n' +
        '**Sahra** sits directly before **baa**, so Sahra is the spotlight. The sentence answers "**who** is greeting her friend?"\n\n' +
        '**Ayaa** does the same job as **baa** and sounds slightly more formal. Treat them as one signal.\n\n' +
        'The rule to hold on to: **look immediately to the left of baa.** Whatever is there is what the sentence is about.',
    },
    {
      id: '5-notice-1',
      type: 'notice',
      exercise: {
        id: 'l5-n1',
        type: 'multiple_choice',
        objectiveIds: ['signal-focus-before'],
        question:
          'Here is a different sentence: **Gabadhu bariiska baa cuntay**: "The girl ate the rice." Which words is the spotlight on?',
        options: ['bariiska: the rice', 'Gabadhu: the girl', 'cuntay: ate', 'nothing in particular'],
        correctAnswer: 'bariiska: the rice',
        hint: 'Do not go by position in the sentence. Find **baa**, then look at what sits immediately to its left.',
        explanation:
          '**baa** spotlights whatever is immediately before it, and here that is **bariiska**: the rice. So it means "The girl ate **THE RICE**".\n\n' +
          'Notice what did *not* work: the girl is the first thing in the sentence and the one doing the eating, and she is **not** the spotlight. Reaching for the first noun is the habit to break: only the position of **baa** tells you.',
        repair: {
          id: 'l5-n1-r', type: 'multiple_choice', objectiveIds: ['signal-focus-before'],
          question: 'In **Sahra baa salaamaysa saaxiibkeed**: "Sahra is greeting her friend": which words is the spotlight on?',
          options: ['Sahra: the one greeting', 'saaxiibkeed: her friend', 'salaamaysa: is greeting', 'nothing in particular'],
          correctAnswer: 'Sahra: the one greeting',
          hint: 'Find **baa**, then look immediately to its left.',
          explanation: '**baa** spotlights whatever sits immediately before it, and here that is **Sahra**. It means "**SAHRA** is greeting her friend", not someone else.',
        },
      },
    },
    {
      id: '5-coach-signal-first',
      type: 'coach',
      title: 'Let the signal overrule your first guess',
      content:
        'Make a quick first reading, then test it. Find the signal and ask where it points. If **baa** follows the second noun, the first noun is not automatically the spotlight. If **waxa** opens the signal group, hold your answer until the sentence ends. A good reader repairs the first guess when the signal disagrees.',
    },
    {
      id: '5-notice-2',
      type: 'notice',
      exercise: {
        id: 'l5-n2',
        type: 'marker_identification',
        objectiveIds: ['signal-focus-before'],
        question: 'Which word here is the signal: the one doing the spotlighting?',
        somali: 'Sahra baa salaamaysa saaxiibkeed',
        answer: 'baa',
        // Was "It is not the name and not the long word. It is the short one
        // sitting second." — which answers the item by position, so a learner
        // who knows nothing about signals still gets it right. A hint should
        // narrow the search, not end it.
        hint: 'The signal is the word that carries no meaning of its own. Every other word here could be translated on its own; one cannot.',
        explanation:
          '**baa** is the signal. It carries no meaning you could translate on its own: its whole job is to mark that the word before it, **Sahra**, is the one being spotlighted.',
        repair: {
          id: 'l5-n2-r', type: 'marker_identification', objectiveIds: ['signal-focus-before'],
          question: 'Which word here is the signal: the one doing the spotlighting?',
          somali: 'Gabadhu bariiska baa cuntay',
          answer: 'baa',
          hint: 'One word here carries no meaning you could translate on its own. That is the signal.',
          explanation: '**baa** is the signal. Its whole job is to mark that the word before it, **bariiska**, is the one being spotlighted.',
        },
      },
    },
    {
      id: '5-teach-waxa',
      type: 'teach',
      isNew: true,
      title: 'waxa: spotlight what comes at the end',
      content:
        '**waxa** does the same job as **baa**, pointing in the **opposite direction**. It spotlights whatever lands at the **end** of the sentence.\n\n' +
        '• **Sahra waxa ay salaamaysaa saaxiibkeed.**  *Sahra is greeting her FRIEND.*\n\n' +
        'Here the spotlight falls on **saaxiibkeed** (her friend) because that is what finishes the sentence. This one answers "**who** is she greeting?"\n\n' +
        'So the two signals split the work cleanly:\n\n' +
        '• **baa** → look **left**, at the word just before it\n' +
        '• **waxa** → look **right**, at the word that ends the sentence\n\n' +
        'You will also see **waxa** written **waxaa**. Same word.\n\n' +
        'One thing to notice and not worry about yet: **waxa ay**. The little **ay** is the short "she" from last lesson, riding along behind the signal. Next lesson those two fuse into a single word.',
    },
    {
      id: '5-notice-3',
      type: 'notice',
      exercise: {
        id: 'l5-n3',
        type: 'multiple_choice',
        objectiveIds: ['signal-focus-end'],
        question:
          'In **Sahra waxa ay salaamaysaa saaxiibkeed**, which word is being spotlighted?',
        options: ['saaxiibkeed', 'Sahra', 'waxa', 'salaamaysaa'],
        correctAnswer: 'saaxiibkeed',
        hint: '**waxa** points forward, not back. Look at what finishes the sentence.',
        explanation:
          '**waxa** spotlights whatever ends the sentence, and that is **saaxiibkeed** (her friend). The sentence means "Sahra is greeting her **FRIEND**": the same words as the **baa** version, spotlighting the opposite end.',
        repair: {
          id: 'l5-n3-r', type: 'multiple_choice', objectiveIds: ['signal-focus-end'],
          question: 'Which signal spotlights the word that ENDS a sentence?',
          options: ['waxa', 'baa', 'waa', 'ayaa'],
          correctAnswer: 'waxa',
          hint: 'One signal points left; the other points right, to the end.',
          explanation: '**waxa** spotlights whatever ends the sentence. **baa** and **ayaa** point left instead, and **waa** spotlights nothing.',
        },
      },
    },
    {
      id: '5-complete-1',
      type: 'complete',
      exercise: {
        id: 'l5-c1',
        type: 'fill_blank',
        objectiveIds: ['signal-focus-before'],
        question:
          'You want to say it was **Sahra** (not anyone else) who is greeting. Which signal goes after her name?\n\nSahra ___ salaamaysa saaxiibkeed.',
        options: ['baa', 'waxa', 'waa', 'ay'],
        correctAnswer: 'baa',
        hint: 'You are spotlighting the word that comes **before** the gap.',
        explanation:
          '**baa** spotlights what is immediately before it, so putting it straight after **Sahra** makes Sahra the point of the sentence. **waxa** would push the spotlight to the far end instead.',
        repair: {
          id: 'l5-c1-r', type: 'multiple_choice', objectiveIds: ['signal-focus-before'],
          question: 'You want to say it was THE RICE the girl ate, not something else: Gabadhu bariiska ___ cuntay. Which signal fills the gap?',
          options: ['baa', 'waxa', 'waa', 'ay'],
          correctAnswer: 'baa',
          hint: 'The spotlight must land on the word just before the gap.',
          explanation: '**baa** right after **bariiska** spotlights the rice: "The girl ate **THE RICE**". **waxa** would push the spotlight to the end instead.',
        },
      },
    },
    {
      id: '5-produce-1',
      type: 'produce',
      exercise: {
        id: 'l5-p1',
        type: 'marker_identification',
        objectiveIds: ['signal-focus-end'],
        question:
          'Read this sentence and type the signal word: the one telling you the spotlight falls at the end.',
        somali: 'Sahra waxa ay salaamaysaa saaxiibkeed',
        answer: 'waxa',
        hint: 'It is not **ay**: that is the short "she". The signal comes first of the two.',
        explanation:
          '**waxa** is the signal. **ay** is the short pronoun "she" sitting behind it. Together they point the spotlight at the end of the sentence, onto **saaxiibkeed**.',
        repair: {
          id: 'l5-p1-r', type: 'multiple_choice', objectiveIds: ['signal-focus-end'],
          question: 'To push the spotlight onto the LAST word of a sentence, which signal do you reach for?',
          options: ['waxa', 'baa', 'waa', 'ay'],
          correctAnswer: 'waxa',
          hint: 'It is the signal that points forward, to the end.',
          explanation: '**waxa** points at whatever ends the sentence. **baa** points backward, **waa** points nowhere, and **ay** is a short pronoun, not a signal.',
        },
      },
    },
    {
      id: '5-passage-b', type: 'passage',
      passage: {
        id: 'l5-text-b',
        label: 'Two notes on a door',
        lines: [
          { somali: 'Gabadhu bariiska baa cuntay.', gloss: 'The girl ate THE RICE.', note: 'One of these notes singles a word out.' },
          { somali: 'Wiilku waa macallin.', gloss: 'The boy is a teacher.', note: 'The other just states a fact.' },
        ],
      },
      content: 'Different words this time, same skill. One note contrasts a word; the other does not. Read both, then answer.',
    },
    {
      id: '5-gist-b', type: 'notice', exercise: {
        id: 'l5-gist-b', type: 'multiple_choice', objectiveIds: ['signal-focus-before'],
        question: 'One of these notes singles a word out. Which note, and which word?',
        options: [
          'the first: bariiska, the rice',
          'the second: macallin, the teacher',
          'both: each singles out its subject',
          'neither: both are plain statements',
        ],
        correctAnswer: 'the first: bariiska, the rice',
        hint: 'Find the note with **baa** in it, then look immediately to its left.',
        explanation: '**Gabadhu bariiska baa cuntay** spotlights **bariiska**: the girl ate THE RICE. The second note uses **waa**, which singles out nothing.',
        repair: {
          id: 'l5-gist-b-r', type: 'multiple_choice', objectiveIds: ['signal-focus-before'],
          question: 'In the first note, which word does **baa** point at?',
          options: ['bariiska', 'Gabadhu', 'cuntay', 'Wiilku'],
          correctAnswer: 'bariiska',
          hint: '**baa** points immediately left.',
          explanation: '**baa** sits right after **bariiska**, so the rice is the spotlighted word.',
        },
      },
    },
    {
      id: '5-detail-b', type: 'notice', exercise: {
        id: 'l5-detail-b', type: 'multiple_choice', objectiveIds: ['signal-statement'],
        question: 'What makes the second note a plain statement with nothing singled out?',
        options: ['the signal waa', 'the signal baa', 'the signal waxa', 'the -u on Wiilku'],
        correctAnswer: 'the signal waa',
        hint: 'Look at the small word between Wiilku and macallin.',
        explanation: '**waa** marks a flat statement: **Wiilku waa macallin.** The -u only marks Wiilku as the subject; it is **waa** that says "just a fact".',
        repair: {
          id: 'l5-detail-b-r', type: 'multiple_choice', objectiveIds: ['signal-statement'],
          question: 'Which of the two notes would you write to state a flat fact, no word singled out?',
          options: [
            'Wiilku waa macallin.',
            'Gabadhu bariiska baa cuntay.',
            'both of them',
            'neither of them',
          ],
          correctAnswer: 'Wiilku waa macallin.',
          hint: 'One signal states; the other spotlights.',
          explanation: '**Wiilku waa macallin** uses **waa**, the plain statement signal. The other note uses **baa**, which always spotlights something.',
        },
      },
    },
    {
      id: '5-produce-2',
      type: 'produce',
      exercise: {
        id: 'l5-p2',
        type: 'multiple_choice',
        objectiveIds: ['signal-focus-before', 'signal-focus-end'],
        question:
          'The promise from the start. Which of these means "**SAHRA** is greeting her friend": Sahra and nobody else?',
        options: [
          'Sahra baa salaamaysa saaxiibkeed.',
          'Sahra waxa ay salaamaysaa saaxiibkeed.',
          'Wiilku waa macallin.',
          'Neither: they mean the same thing.',
        ],
        correctAnswer: 'Sahra baa salaamaysa saaxiibkeed.',
        hint: 'Spotlight on **Sahra** means the signal must sit immediately after her name.',
        explanation:
          'With **baa** directly after **Sahra**, the spotlight lands on Sahra. The **waxa** version spotlights **saaxiibkeed** instead: "Sahra is greeting her FRIEND". Same words, opposite meaning, and nothing but the signal tells you which.',
        repair: {
          id: 'l5-p2-r', type: 'multiple_choice', objectiveIds: ['signal-focus-before', 'signal-focus-end'],
          question: 'Which of these means "Sahra is greeting her **FRIEND**": the friend and nobody else?',
          options: [
            'Sahra waxa ay salaamaysaa saaxiibkeed.',
            'Sahra baa salaamaysa saaxiibkeed.',
            'Wiilku waa macallin.',
            'Neither: they mean the same thing.',
          ],
          correctAnswer: 'Sahra waxa ay salaamaysaa saaxiibkeed.',
          hint: 'Spotlight at the END of the sentence. Which signal points there?',
          explanation: '**waxa** pushes the spotlight to the last word, **saaxiibkeed**. The **baa** version spotlights Sahra instead. Same words; only the signal decides.',
        },
      },
    },
    {
      id: '5-payoff',
      type: 'payoff',
      prompt:
        'That was the promise, and you just did it.\n\n' +
        '**Sahra baa salaamaysa saaxiibkeed.**: SAHRA is greeting her friend.\n' +
        '**Sahra waxa ay salaamaysaa saaxiibkeed.**: Sahra is greeting her FRIEND.\n\n' +
        'Identical words. The signal, and only the signal, decides which one the sentence is about.',
    },
    {
      id: '5-summary',
      type: 'summary',
      title: 'What you can do now',
      content:
        'The SIGNAL box is no longer a mystery:\n\n' +
        '• **waa**: a plain statement, nothing singled out\n' +
        '• **baa** (and **ayaa**): spotlight the word **immediately before** it\n' +
        '• **waxa** (or **waxaa**): spotlight whatever **ends** the sentence\n\n' +
        'You can now look at a flat-looking Somali sentence and say which word it is really about. English does that with tone of voice; Somali does it with placement.\n\n' +
        'Next: those signals stop standing alone. **waxa ay** becomes one word, and so do **waa + uu**, **baa + uu** and the rest.',
    },
  ],
};

// ============================================================================
// LESSON 6 — Squishing  (Unit 2)
// ============================================================================

/**
 * Lesson 5 left a loose end on purpose: **waxa ay**, two words sitting
 * together. This lesson closes it.
 *
 * SOURCING SHAPES THIS LESSON. Nilsson's fusion table (N §5.1) has sixteen
 * forms, but W-gram independently attests only four — wuu, way, wuxuu, waxay.
 * The other twelve rest on Nilsson alone, so per docs/LESSON_CONVENTIONS.md
 * §2.5 (enforced by validator check S6) they are shown and read but never
 * asked for as a typed answer. Every production item here answers with one of
 * the well-sourced four. That is not a compromise on the teaching — the
 * pattern is the point, and four instances teach a pattern.
 *
 * **wuxuu** is the one that does not look like its parts: waxa + uu gives
 * wuxuu, not "waxauu". It gets its own card because a learner who has spotted
 * the pattern will expect otherwise and be wrong.
 */
const LESSON_6: Lesson = {
  id: 6,
  unitId: 2,
  title: 'Squishing',
  newItems: ['6-teach-waa-family', '6-teach-waxa-family', '6-teach-baa-family'],
  objectives: ['signal-fusion', 'signal-fusion-unpack'],
  cards: [
    {
      id: '6-blueprint',
      type: 'blueprint',
      blueprintSlot: 'SIGNAL',
      content: `${BOX}\n\nSame box as last time. Now the signal stops standing alone: it fuses with the word for who, and the two arrive as one.`,
    },
    {
      id: '6-promise',
      type: 'promise',
      prompt:
        'Read **wuxuu** as two parts: the spotlight signal **waxa** plus **uu**, “he.”',
    },
    {
      id: '6-passage-a', type: 'passage',
      passage: {
        id: 'l6-text-a',
        label: 'A page from a cheat-sheet',
        lines: [
          { somali: 'waa + uu = wuu', gloss: 'statement signal + he = wuu', note: 'Two small words, printed as one.' },
          { somali: 'waxa + uu = wuxuu', gloss: 'end-spotlight signal + he = wuxuu', note: 'The odd one: not "waxauu".' },
        ],
      },
      content: 'A page of revision notes, written as little equations. Read both lines, then answer.',
    },
    {
      id: '6-gist-a', type: 'notice', exercise: {
        id: 'l6-gist-a', type: 'multiple_choice', objectiveIds: ['signal-fusion'],
        question: 'What is this page showing you?',
        options: [
          'how a signal and a short pronoun squash into one word',
          'how to spell two brand-new words',
          'the eight standalone pronouns',
          'two different signals for a statement',
        ],
        correctAnswer: 'how a signal and a short pronoun squash into one word',
        hint: 'Each line has three parts: a signal, a pronoun, and the single word they make together.',
        explanation: '**waa + uu = wuu**, **waxa + uu = wuxuu**. Each line takes a signal you know and a pronoun you know, and prints them as one word.',
        repair: {
          id: 'l6-gist-a-r', type: 'multiple_choice', objectiveIds: ['signal-fusion'],
          question: 'A reader thinks **wuu** is a brand-new word to memorise. What does the page say it really is?',
          options: [
            'waa + uu, squashed into one word',
            'waxa + uu, squashed into one word',
            'a longer form of waa',
            'a short pronoun on its own',
          ],
          correctAnswer: 'waa + uu, squashed into one word',
          hint: 'Read the first line of the page literally.',
          explanation: '**wuu** is not new: it is **waa** (plain statement) and **uu** (he), printed as one word.',
        },
      },
    },
    {
      id: '6-detail-a', type: 'notice', exercise: {
        id: 'l6-detail-a', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
        question: 'Find **wuxuu** on the page. Which two things is it made of?',
        options: ['waxa + uu', 'waa + uu', 'waxa + ay', 'baa + uu'],
        correctAnswer: 'waxa + uu',
        hint: 'The second line spells it out.',
        explanation: '**wuxuu** is **waxa** + **uu**: the end-spotlight signal carrying "he." It is the one pairing whose middle vowel shifts.',
        repair: {
          id: 'l6-detail-a-r', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
          question: 'Find **wuu** on the page. Which two things is it made of?',
          options: ['waa + uu', 'waxa + uu', 'waa + ay', 'baa + uu'],
          correctAnswer: 'waa + uu',
          hint: 'The first line spells it out.',
          explanation: '**wuu** is **waa** + **uu**: the plain-statement signal carrying "he."',
        },
      },
    },
    {
      id: '6-teach',
      type: 'teach',
      title: 'Two words, one word',
      content:
        'A signal can carry a short pronoun:\n\n' +
        '**aan** (I) · **aad** (you) · **uu** (he) · **ay** (she / they)\n\n' +
        'And in practice they almost never stay apart. The signal and the pronoun squash together into one word.\n\n' +
        'This is the single biggest reason written Somali looks unreadable at first. You go hunting for **waa** and it is not there, because it is now the front half of **wuu**.\n\n' +
        'Nothing new is being said. It is the same signal and the same pronoun, printed as one word.',
    },
    {
      id: '6-coach-unpack',
      type: 'coach',
      title: 'Unpack before you memorize',
      content:
        'When a short word looks unfamiliar, do not store it as a new lump. Read it in two passes:\n\n' +
        '1. **Front:** which signal family does it belong to?\n' +
        '2. **Ending:** who is carried inside it?\n\n' +
        'For **wuu**, the front gives **waa** and the long **uu** gives “he.” For **waxay**, the front gives **waxa** and **ay** gives “she / they.” Only after you try the split should you check the table. This turns sixteen shapes into three families plus four people.',
    },
    {
      id: '6-notice-1',
      type: 'notice',
      exercise: {
        id: 'l6-n1',
        type: 'multiple_choice',
        objectiveIds: ['signal-fusion-unpack'],
        question: 'You see **wuu** at the start of a sentence. What two things is it carrying?',
        options: [
          'waa (plain statement) + uu (he)',
          'waxa (spotlight at the end) + uu (he)',
          'baa (spotlight before) + uu (he)',
          'waa (plain statement) + ay (she)',
        ],
        correctAnswer: 'waa (plain statement) + uu (he)',
        hint: 'The front of the word tells you the signal; the vowel tells you who.',
        explanation:
          '**wuu** is **waa** + **uu**: a plain statement, about him. Had it been about her it would be **way**; had the spotlight been on the end of the sentence it would be **wuxuu**.',
        repair: {
          id: 'l6-n1-r', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
          question: 'You see **way** at the start of a sentence. What two things is it carrying?',
          options: [
            'waa (plain statement) + ay (she / they)',
            'waa (plain statement) + uu (he)',
            'waxa (spotlight at the end) + ay (she / they)',
            'baa (spotlight before) + ay (she / they)',
          ],
          correctAnswer: 'waa (plain statement) + ay (she / they)',
          hint: 'The front gives the signal family; the vowel gives the person.',
          explanation: '**way** is **waa** + **ay**: a plain statement, about her or them. **bay** would carry the spotlight-before signal instead.',
        },
      },
    },
    {
      id: '6-teach-waa-family',
      type: 'teach',
      isNew: true,
      title: 'The waa family',
      content:
        'Start with the plain-statement signal:\n\n' +
        '• **waa** + **aan** (I) → **waan**\n' +
        '• **waa** + **aad** (you) → **waad**\n' +
        '• **waa** + **uu** (he) → **wuu**\n' +
        '• **waa** + **ay** (she / they) → **way**\n\n' +
        'Read them out and the logic is audible: the **w** of the signal, then the vowel of the pronoun.\n\n' +
        'So **wuu** is not a new word to memorise. It is **waa** and **uu**, printed together.',
    },
    {
      id: '6-complete-1',
      type: 'complete',
      exercise: {
        id: 'l6-c1',
        type: 'fill_blank',
        objectiveIds: ['signal-fusion'],
        question: 'Squash **waa** (plain statement) together with **ay** (she). Which word do you get?',
        options: ['way', 'wuu', 'waxay', 'bay'],
        correctAnswer: 'way',
        hint: 'The **w** of the signal, then the vowel of the pronoun.',
        explanation:
          '**waa** + **ay** → **way**. **wuu** would be about him; **waxay** uses the end-spotlight signal instead of the plain one; **bay** uses the spotlight-before signal.',
        repair: {
          id: 'l6-c1-r', type: 'multiple_choice', objectiveIds: ['signal-fusion'],
          question: 'Squash **waa** (plain statement) together with **uu** (he). Which word do you get?',
          options: ['wuu', 'way', 'waan', 'wuxuu'],
          correctAnswer: 'wuu',
          hint: 'The **w** of the signal, then the vowel of the pronoun.',
          explanation: '**waa** + **uu** → **wuu**. **wuxuu** starts from **waxa**, not **waa**: different signal, different word.',
        },
      },
    },
    {
      id: '6-teach-waxa-family',
      type: 'teach',
      isNew: true,
      title: 'The waxa family, and the odd one',
      content:
        'The end-spotlight signal fuses the same way:\n\n' +
        '• **waxa** + **aan** (I) → **waxaan**\n' +
        '• **waxa** + **aad** (you) → **waxaad**\n' +
        '• **waxa** + **ay** (she / they) → **waxay**\n\n' +
        'Three of the four behave exactly as you would guess. The fourth does not:\n\n' +
        '• **waxa** + **uu** (he) → **wuxuu**\n\n' +
        'Not "waxauu". The vowel in the middle shifts, and the word comes out **wuxuu**.\n\n' +
        'Learn this one as a shape rather than a sum. It is extremely common.',
    },
    {
      id: '6-notice-2',
      type: 'notice',
      exercise: {
        id: 'l6-n2',
        type: 'multiple_choice',
        objectiveIds: ['signal-fusion-unpack'],
        question: 'Which squashed word means "the spotlight is at the end, and it is about **him**"?',
        options: ['wuxuu', 'waxay', 'wuu', 'waxaad'],
        correctAnswer: 'wuxuu',
        hint: 'The end-spotlight signal is **waxa**. This is the pairing that does not look like its parts.',
        explanation:
          '**wuxuu** is **waxa** + **uu**: the odd one, since you would expect "waxauu". **waxay** is the same signal with **ay** (she/they); **wuu** carries the plain statement signal instead.',
        repair: {
          id: 'l6-n2-r', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
          question: 'Which squashed word means "the spotlight is at the end, and it is about **her / them**"?',
          options: ['waxay', 'wuxuu', 'way', 'bay'],
          correctAnswer: 'waxay',
          hint: 'The end-spotlight signal is **waxa**. This pairing is regular: signal, then pronoun.',
          explanation: '**waxay** is **waxa** + **ay**. **way** uses the plain-statement signal; **bay** uses the spotlight-before signal.',
        },
      },
    },
    {
      id: '6-teach-baa-family',
      type: 'teach',
      isNew: true,
      title: 'The baa family',
      content:
        'And the spotlight-before signal, following the same habit:\n\n' +
        '• **baa** + **aan** (I) → **baan**\n' +
        '• **baa** + **aad** (you) → **baad**\n' +
        '• **baa** + **uu** (he) → **buu**\n' +
        '• **baa** + **ay** (she / they) → **bay**\n\n' +
        '**ayaa** does it too (**ayaan**, **ayaad**, **ayuu**, **ayay**) since **ayaa** and **baa** are the same signal in different clothes.\n\n' +
        'You do not need to memorise all sixteen. You need the habit: **a word starting with w- or b- is probably a signal with somebody attached.**',
    },
    {
      id: '6-complete-2',
      type: 'complete',
      exercise: {
        id: 'l6-c2',
        type: 'multiple_choice',
        objectiveIds: ['signal-fusion-unpack'],
        question: 'You see **baad** in a sentence. What two things is it carrying?',
        options: [
          'baa (spotlight before) + aad (you)',
          'baa (spotlight before) + aan (I)',
          'waa (plain statement) + aad (you)',
          'waxa (spotlight at the end) + aad (you)',
        ],
        correctAnswer: 'baa (spotlight before) + aad (you)',
        hint: 'The first letter points to the signal family. The ending tells you who.',
        explanation:
          '**baad** is **baa** + **aad**: the spotlight-before signal carrying "you." **baan** carries "I"; **waad** uses the plain-statement signal instead.',
        repair: {
          id: 'l6-c2-r', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
          question: 'You see **buu** in a sentence. What two things is it carrying?',
          options: [
            'baa (spotlight before) + uu (he)',
            'baa (spotlight before) + aan (I)',
            'waa (plain statement) + uu (he)',
            'waxa (spotlight at the end) + uu (he)',
          ],
          correctAnswer: 'baa (spotlight before) + uu (he)',
          hint: 'The first letter points to the signal family. The ending tells you who.',
          explanation: '**buu** is **baa** + **uu**: the spotlight-before signal carrying "he." **wuu** uses the plain-statement signal instead.',
        },
      },
    },
    {
      id: '6-produce-baan',
      type: 'produce',
      exercise: {
        id: 'l6-p-baan',
        type: 'translate',
        objectiveIds: ['signal-fusion'],
        question: 'Type the one word for **baa** carrying **aan** (I).',
        answer: 'baan',
        hint: 'Keep the first letter of the signal and attach the pronoun.',
        explanation: '**baa** + **aan** → **baan**. The spotlight sits just before this word, and the sentence is about me.',
        repair: {
          id: 'l6-p-baan-r', type: 'translate', objectiveIds: ['signal-fusion'],
          question: 'Type the one word for **baa** carrying **aad** (you).',
          answer: 'baad',
          hint: 'Keep the first letter of the signal and attach the pronoun.',
          explanation: '**baa** + **aad** → **baad**. The spotlight sits just before this word, and the sentence is about you.',
        },
      },
    },
    {
      id: '6-produce-buu',
      type: 'produce',
      exercise: {
        id: 'l6-p-buu',
        type: 'translate',
        objectiveIds: ['signal-fusion'],
        question: 'Type the one word for **baa** carrying **uu** (he).',
        answer: 'buu',
        hint: 'The signal gives you **b**; the pronoun gives you **uu**.',
        explanation: '**baa** + **uu** → **buu**. It is the spotlight-before signal carrying "he."',
        repair: {
          id: 'l6-p-buu-r', type: 'translate', objectiveIds: ['signal-fusion'],
          question: 'Type the one word for **baa** carrying **ay** (she / they).',
          answer: 'bay',
          hint: 'The signal gives you **b**; the pronoun gives you **ay**.',
          explanation: '**baa** + **ay** → **bay**. It is the spotlight-before signal carrying "she" or "they."',
        },
      },
    },
    {
      id: '6-produce-2',
      type: 'produce',
      exercise: {
        id: 'l6-p2',
        type: 'translate',
        objectiveIds: ['signal-fusion', 'signal-fusion-unpack'],
        question:
          'The promise from the start. Type the one word that means the end-spotlight signal **waxa**, about **him**.',
        answer: 'wuxuu',
        hint: 'The irregular one. Not "waxauu": the vowel in the middle shifts.',
        explanation:
          '**wuxuu** is **waxa** + **uu**. It is the only member of the family that does not look like its own parts, and it is one of the most common words in written Somali.',
        repair: {
          id: 'l6-p2-r', type: 'multiple_choice', objectiveIds: ['signal-fusion', 'signal-fusion-unpack'],
          question: 'The end-spotlight signal about **him**, as one word:',
          options: ['wuxuu', 'waxauu', 'wuu', 'buu'],
          correctAnswer: 'wuxuu',
          hint: 'The irregular one. Not "waxauu": the vowel in the middle shifts.',
          explanation: '**wuxuu** is **waxa** + **uu**. **wuu** is the plain-statement signal; **buu** is the spotlight-before signal.',
        },
      },
    },
    {
      id: '6-produce-1',
      type: 'produce',
      exercise: {
        id: 'l6-p1',
        type: 'translate',
        objectiveIds: ['signal-fusion'],
        question:
          'Type the single squashed word for the end-spotlight signal **waxa** carrying **ay** (she / they).',
        answer: 'waxay',
        hint: 'This one is regular: the signal, then the pronoun, straight onto the end.',
        explanation:
          '**waxa** + **ay** → **waxay**. Regular, unlike its neighbour **wuxuu**, where the vowel shifts.',
        repair: {
          id: 'l6-p1-r', type: 'multiple_choice', objectiveIds: ['signal-fusion'],
          question: 'Squash **waxa** together with **aad** (you). Which word do you get?',
          options: ['waxaad', 'wuxuu', 'waad', 'baad'],
          correctAnswer: 'waxaad',
          hint: 'This pairing is regular: the signal, then the pronoun straight on.',
          explanation: '**waxa** + **aad** → **waxaad**. Only the **uu** pairing shifts its vowel, to **wuxuu**.',
        },
      },
    },
    {
      id: '6-passage-b', type: 'passage',
      passage: {
        id: 'l6-text-b',
        label: 'The next page of the cheat-sheet',
        lines: [
          { somali: 'waxa + ay = waxay', gloss: 'end-spotlight signal + she/they = waxay', note: 'The regular one: it looks exactly like its parts.' },
          { somali: 'waxa + uu = wuxuu', gloss: 'end-spotlight signal + he = wuxuu', note: 'The odd one again, beside its regular neighbour.' },
        ],
      },
      content: 'One signal, two people. Read both lines, then answer.',
    },
    {
      id: '6-gist-b', type: 'notice', exercise: {
        id: 'l6-gist-b', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
        question: 'Both lines on this page squash the same signal. Which one?',
        options: [
          'waxa: the end-spotlight signal',
          'waa: the plain-statement signal',
          'baa: the spotlight-before signal',
          'each line squashes a different signal',
        ],
        correctAnswer: 'waxa: the end-spotlight signal',
        hint: 'Look at the word before the + in each line.',
        explanation: 'Both lines start from **waxa**: with **ay** it makes **waxay**, with **uu** it makes **wuxuu**.',
        repair: {
          id: 'l6-gist-b-r', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
          question: 'A classmate says **waxay** starts with the plain-statement signal. Which signal does it actually start with?',
          options: ['waxa, the end-spotlight signal', 'waa, the plain-statement signal', 'baa, the spotlight-before signal', 'ay, which is a signal too'],
          correctAnswer: 'waxa, the end-spotlight signal',
          hint: 'Split **waxay** into its two parts and name the first one.',
          explanation: '**waxay** is **waxa** + **ay**. The front is the end-spotlight signal; **ay** is the short pronoun riding inside.',
        },
      },
    },
    {
      id: '6-detail-b', type: 'notice', exercise: {
        id: 'l6-detail-b', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
        question: 'Which line on this page is the odd one: the word that does NOT look like its own parts?',
        options: ['waxa + uu = wuxuu', 'waxa + ay = waxay', 'both of them', 'neither of them'],
        correctAnswer: 'waxa + uu = wuxuu',
        hint: 'Compare each result with the parts before the = sign.',
        explanation: '**waxay** looks exactly like **waxa** + **ay**. **wuxuu** does not look like "waxauu": the middle vowel shifted.',
        repair: {
          id: 'l6-detail-b-r', type: 'multiple_choice', objectiveIds: ['signal-fusion-unpack'],
          question: 'Which line on this page looks exactly like its own parts?',
          options: ['waxa + ay = waxay', 'waxa + uu = wuxuu', 'both of them', 'neither of them'],
          correctAnswer: 'waxa + ay = waxay',
          hint: 'One result keeps the signal and the pronoun intact, end to end.',
          explanation: '**waxay** is **waxa** then **ay**, unchanged. **wuxuu** is the shifted one.',
        },
      },
    },
    {
      id: '6-payoff',
      type: 'payoff',
      prompt:
        'That was the promise.\n\n' +
        '**wuxuu** = **waxa** (spotlight at the end) + **uu** (he)\n\n' +
        'What looked like one dense word is now two familiar pieces.',
    },
    {
      id: '6-summary',
      type: 'summary',
      title: 'What you can do now',
      content:
        'Signals do not travel alone:\n\n' +
        '• **waa** → **waan**, **waad**, **wuu**, **way**\n' +
        '• **waxa** → **waxaan**, **waxaad**, **wuxuu**, **waxay**\n' +
        '• **baa** → **baan**, **baad**, **buu**, **bay**\n\n' +
        'The habit worth keeping: a short word starting **w-** or **b-** is almost always a signal with somebody attached. Split it, and both halves are things you already know.\n\n' +
        'Next: the **DO** box: action words, and how they match whoever is doing them.',
    },
  ],
};

// ============================================================================
// LESSON 7 — Action Words  (Unit 2)
// ============================================================================

/**
 * The DO box, and the reason it comes after fusion rather than before.
 *
 * The present tense has a genuine ambiguity: **-aa** marks both "I" and "he",
 * and **-taa** marks both "you" and "she". The ending alone cannot tell you
 * who is acting — the fused signal in front of it does (`waan keenaa` I bring,
 * `wuu keenaa` he brings). A learner who met verbs before Lesson 6 would have
 * no way to resolve that, which is exactly why the design puts fusion first.
 * The lesson is built around this rather than mentioning it in passing.
 *
 * ONE VERB, `keen` (bring). Both sources handle it — Nilsson glosses `keenaa`
 * directly and Wikipedia conjugates it in full — so the stem and 1sg/3sg.m are
 * attested outright and the other four forms are `derived` from the
 * present-tense rule that both sources state. Nilsson's own example verb
 * `hees` is deliberately *not* used: only one source has it, so under check S6
 * nothing built on it could be asked for as a typed answer. Sourcing chose the
 * verb, not preference. See docs/SOMALI_SOURCES.md §8.
 *
 * Tense stays out. The design puts it in Lesson 9, and this lesson has a full
 * budget teaching person-matching in one tense.
 */
const LESSON_7: Lesson = {
  id: 7,
  unitId: 2,
  title: 'Action Words',
  newItems: ['7-teach-endings', '7-teach-ambiguity'],
  objectives: ['verb-person-endings', 'verb-ending-ambiguity'],
  cards: [
    {
      id: '7-blueprint',
      type: 'blueprint',
      blueprintSlot: 'DO',
      content: `${BOX}\n\nThe last empty box. The action word goes here, and its ending changes depending on who is doing it.`,
    },
    {
      id: '7-promise',
      type: 'promise',
      prompt:
        'Use **wuu keenaa** and **way keentaa** to identify who is bringing, and see why the verb alone cannot tell you.',
    },
    {
      id: '7-passage-a', type: 'passage',
      passage: {
        id: 'l7-text-a',
        label: 'Two messages in a thread',
        lines: [
          { somali: 'Waan keenaa.', gloss: 'I bring.', note: 'Same action word in both lines.' },
          { somali: 'Wuu keenaa.', gloss: 'He brings.', note: 'Only the first word changed.' },
        ],
      },
      content: 'Two short replies in a family chat. Read both lines, then answer.',
    },
    {
      id: '7-gist-a', type: 'notice', exercise: {
        id: 'l7-gist-a', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
        question: 'Both lines use the same action word. What is different between them?',
        options: [
          'who is doing the bringing: I in the first, he in the second',
          'what is being brought',
          'when the bringing happens',
          'nothing: they mean the same thing',
        ],
        correctAnswer: 'who is doing the bringing: I in the first, he in the second',
        hint: 'The second word is identical. Compare the first words.',
        explanation: '**Waan keenaa**: I bring. **Wuu keenaa**: he brings. The verb did not change; the squashed signal in front did.',
        repair: {
          id: 'l7-gist-a-r', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
          question: 'A reader says the two lines must mean the same thing, because the action word is identical. What actually differs?',
          options: [
            'who brings: I in the first, he in the second',
            'what is brought',
            'the tense: one is past, one is present',
            'nothing: the reader is right',
          ],
          correctAnswer: 'who brings: I in the first, he in the second',
          hint: 'The verb **keenaa** covers more than one person. Something else narrows it down.',
          explanation: '**keenaa** alone could be I or he. **waan** settles I; **wuu** settles he. The signal, not the verb, carries who.',
        },
      },
    },
    {
      id: '7-detail-a', type: 'notice', exercise: {
        id: 'l7-detail-a', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
        question: 'The action word is identical in both lines. Which word carries who is doing it?',
        options: [
          'the first word: the squashed signal',
          'the last letter of the verb',
          'the capital letter',
          'both words together mean the same person',
        ],
        correctAnswer: 'the first word: the squashed signal',
        hint: '**Waan** versus **wuu**: those unsquash into **waa** + a person.',
        explanation: '**Waan** is **waa** + **aan** (I); **wuu** is **waa** + **uu** (he). The verb **keenaa** stays put; the signal picks the person.',
        repair: {
          id: 'l7-detail-a-r', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
          question: 'In **wuu keenaa**, which part narrows the doer down to "I or he"?',
          options: ['the verb ending: -aa', 'the signal: wuu', 'the capital W', 'nothing narrows it at all'],
          correctAnswer: 'the verb ending: -aa',
          hint: 'One clue shortlists two people; the other clue picks one.',
          explanation: 'The **-aa** ending shortlists *I* and *he*. Then **wuu** picks *he*. Two partial clues, one answer.',
        },
      },
    },
    {
      id: '7-teach',
      type: 'teach',
      title: 'The action word matches who',
      content:
        'English barely does this. "I bring, you bring, we bring": the word never moves. Only *he/she* is different: "he bring**s**".\n\n' +
        'Somali does it properly. The action word takes an ending that matches whoever is doing it, every time.\n\n' +
        'The verb for "bring" is **keen**. On its own it is just the bare action. Add an ending and it tells you who:\n\n' +
        '• **keenaa**: bring / brings\n' +
        '• **keentaa**: bring / brings, for a different set of people\n\n' +
        'That **t** is the whole difference, and it is doing a specific job.',
    },
    {
      id: '7-teach-endings',
      type: 'teach',
      isNew: true,
      title: 'The endings',
      content:
        'Five endings cover everybody:\n\n' +
        '• **-aa** → I, and he\n' +
        '• **-taa** → you, and she\n' +
        '• **-naa** → we\n' +
        '• **-taan** → you (more than one)\n' +
        '• **-aan** → they\n\n' +
        'On **keen** that gives:\n\n' +
        '• **keenaa**: I bring / he brings\n' +
        '• **keentaa**: you bring / she brings\n' +
        '• **keennaa**: we bring\n' +
        '• **keentaan**: you (plural) bring\n' +
        '• **keenaan**: they bring\n\n' +
        'Two patterns worth seeing: a **t** shows up for *you* and *she*, and an **n** shows up for plurals.',
    },
    {
      id: '7-notice-1',
      type: 'notice',
      exercise: {
        id: 'l7-n1',
        type: 'multiple_choice',
        objectiveIds: ['verb-person-endings'],
        question: 'Which form would you use for **they bring**?',
        options: ['keenaan', 'keentaan', 'keennaa', 'keentaa'],
        correctAnswer: 'keenaan',
        hint: 'Plurals carry an **n**. But the *you-plural* one also has the **t** of "you".',
        explanation:
          '**keenaan** is "they bring": the plural **n** with no **t**. **keentaan** has the **t** of *you*, so it is "you (plural) bring". **keennaa** is "we bring".',
        repair: {
          id: 'l7-n1-r', type: 'multiple_choice', objectiveIds: ['verb-person-endings'],
          question: 'Which form would you use for **you (plural) bring**?',
          options: ['keentaan', 'keenaan', 'keennaa', 'keentaa'],
          correctAnswer: 'keentaan',
          hint: 'It needs the **t** of *you* AND the **n** of plurals.',
          explanation: '**keentaan** is "you (plural) bring": the **t** of *you* plus the plural **n**. **keenaan** is "they bring"; **keentaa** is singular *you* or *she*.',
        },
      },
    },
    {
      id: '7-teach-ambiguity',
      type: 'teach',
      isNew: true,
      title: 'The ending does not tell you everything',
      content:
        'Look again at the first two:\n\n' +
        '• **-aa** → **I**, and **he**\n' +
        '• **-taa** → **you**, and **she**\n\n' +
        'Each ending covers two different people. So **keenaa** on its own is genuinely ambiguous: it could be *I bring* or *he brings*, and nothing in the word settles it.\n\n' +
        'The missing information sits in the **signal** before the verb.\n\n' +
        '• **waan keenaa**: **I** bring\n' +
        '• **wuu keenaa**: **he** brings\n\n' +
        'Same verb, same ending. The **waan** and the **wuu** carry who.',
    },
    {
      id: '7-notice-2',
      type: 'notice',
      exercise: {
        id: 'l7-n2',
        type: 'multiple_choice',
        objectiveIds: ['verb-ending-ambiguity'],
        question:
          'You see the word **keenaa** with nothing in front of it. Who is doing the bringing?',
        options: [
          'You cannot tell: it is I or he, and the signal decides',
          'He, definitely: -aa is the he ending',
          'I, definitely: -aa is the I ending',
          'They, because -aa is plural',
        ],
        correctAnswer: 'You cannot tell: it is I or he, and the signal decides',
        hint: 'How many people does **-aa** cover?',
        explanation:
          '**-aa** covers both *I* and *he*, so the verb alone is genuinely ambiguous. **waan keenaa** is "I bring"; **wuu keenaa** is "he brings". The signal in front carries who.',
        repair: {
          id: 'l7-n2-r', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
          question: 'You see the word **keentaa** with nothing in front of it. Who is doing the bringing?',
          options: [
            'You cannot tell: it is you or she, and the signal decides',
            'She, definitely: -taa is the she ending',
            'You, definitely: -taa is the you ending',
            'They, because -taa is plural',
          ],
          correctAnswer: 'You cannot tell: it is you or she, and the signal decides',
          hint: 'How many people does **-taa** cover?',
          explanation: '**-taa** covers both *you* and *she*, so the verb alone is genuinely ambiguous. **waad keentaa** is "you bring"; **way keentaa** is "she brings".',
        },
      },
    },
    {
      id: '7-coach-two-clues',
      type: 'coach',
      title: 'Use the ending and the signal together',
      content:
        'Treat the verb ending as a shortlist, not a final answer. First read the ending: **-aa** narrows the doer to I or he; **-taa** narrows it to you or she. Then move left to the fused signal and settle which person it is.\n\nIf the two clues disagree, stop and repair the parse. Do not guess from the verb alone. Good reading combines partial clues instead of asking one clue to do every job.',
    },
    {
      id: '7-notice-3',
      type: 'notice',
      exercise: {
        id: 'l7-n3',
        type: 'multiple_choice',
        objectiveIds: ['verb-ending-ambiguity'],
        question: 'What does **way keentaa** mean?',
        options: ['she brings', 'you bring', 'they bring', 'we bring'],
        correctAnswer: 'she brings',
        hint: '**way** unsquashes into **waa** + **ay**. And **-taa** covers you and she.',
        explanation:
          '**way** is **waa** + **ay** (she / they), and **-taa** covers *you* and *she*. Together they can only mean **she brings**: the signal rules out *you*, the ending rules out *they*.',
        repair: {
          id: 'l7-n3-r', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
          question: 'What does **waad keentaa** mean?',
          options: ['you bring', 'she brings', 'they bring', 'we bring'],
          correctAnswer: 'you bring',
          hint: '**waad** unsquashes into **waa** + **aad**. And **-taa** covers you and she.',
          explanation: '**waad** is **waa** + **aad** (you), and **-taa** covers *you* and *she*. Together they can only mean **you bring**: the signal rules out *she*.',
        },
      },
    },
    {
      id: '7-complete-1',
      type: 'complete',
      exercise: {
        id: 'l7-c1',
        type: 'fill_blank',
        objectiveIds: ['verb-person-endings'],
        question: 'Complete this so it means **we bring**:  waan ___',
        options: ['keennaa', 'keenaa', 'keentaa', 'keenaan'],
        correctAnswer: 'keennaa',
        hint: 'The *we* ending is **-naa**, and the stem already ends in n.',
        explanation:
          '**keennaa** is "we bring": the **-naa** ending on **keen** gives a doubled n. **keenaa** would be I or he; **keenaan** would be they.',
        repair: {
          id: 'l7-c1-r', type: 'multiple_choice', objectiveIds: ['verb-person-endings'],
          question: 'Complete this so it means **they bring**:  way ___',
          options: ['keenaan', 'keentaa', 'keentaan', 'keenaa'],
          correctAnswer: 'keenaan',
          hint: 'The *they* ending is **-aan**, with the plural **n** and no **t**.',
          explanation: '**keenaan** is "they bring". **keentaa** would be you or she; **keentaan** would be you (plural).',
        },
      },
    },
    {
      id: '7-produce-1',
      type: 'produce',
      exercise: {
        id: 'l7-p1',
        type: 'translate',
        objectiveIds: ['verb-person-endings'],
        question: 'Type the form of **keen** that goes with **you** and **she**.',
        answer: 'keentaa',
        hint: 'The ending with the **t** in it.',
        explanation:
          '**keentaa**: the **-taa** ending, which covers *you* and *she*. Which of the two it means is settled by the signal in front: **waad keentaa** (you) or **way keentaa** (she).',
        repair: {
          id: 'l7-p1-r', type: 'translate', objectiveIds: ['verb-person-endings'],
          question: 'Type the form of **keen** that goes with **I** and **he**.',
          answer: 'keenaa',
          hint: 'The ending without the **t**.',
          explanation: '**keenaa**: the **-aa** ending, which covers *I* and *he*. Which of the two it means is settled by the signal in front: **waan keenaa** or **wuu keenaa**.',
        },
      },
    },
    {
      id: '7-passage-b', type: 'passage',
      passage: {
        id: 'l7-text-b',
        label: 'Two more messages',
        lines: [
          { somali: 'Way keentaa.', gloss: 'She brings.', note: 'A new ending on the same action.' },
          { somali: 'Waad keentaa.', gloss: 'You bring.', note: 'Same verb again, different signal.' },
        ],
      },
      content: 'The same chat, later. The action word changed shape this time. Read both lines, then answer.',
    },
    {
      id: '7-gist-b', type: 'notice', exercise: {
        id: 'l7-gist-b', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
        question: 'What do these two lines tell you?',
        options: [
          'who brings: she in the first, you in the second',
          'what is being brought',
          'that the action changed',
          'that both lines mean the same thing',
        ],
        correctAnswer: 'who brings: she in the first, you in the second',
        hint: '**keentaa** covers you and she. The signals settle which.',
        explanation: '**Way keentaa**: she brings. **Waad keentaa**: you bring. The **-taa** ending shortlists you/she; **way** and **waad** pick one each.',
        repair: {
          id: 'l7-gist-b-r', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
          question: 'In the second line, which word tells you the bringer is "you"?',
          options: ['waad', 'keentaa', 'both words say it separately', 'neither: it could be she'],
          correctAnswer: 'waad',
          hint: 'The verb alone covers two people.',
          explanation: '**keentaa** could be you or she. **waad** (**waa** + **aad**) is what pins it to *you*.',
        },
      },
    },
    {
      id: '7-detail-b', type: 'notice', exercise: {
        id: 'l7-detail-b', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
        question: 'In **way keentaa**, what rules out "you"?',
        options: ['the signal way', 'the ending -taa', 'the capital letter', 'nothing: it can mean you'],
        correctAnswer: 'the signal way',
        hint: '**-taa** covers you and she both. Something else must exclude one.',
        explanation: '**-taa** allows *you* and *she*. **way** is **waa** + **ay** (she/they), so *you* is ruled out by the signal, not the verb.',
        repair: {
          id: 'l7-detail-b-r', type: 'multiple_choice', objectiveIds: ['verb-ending-ambiguity'],
          question: 'In **waad keentaa**, what rules out "she"?',
          options: ['the signal waad', 'the ending -taa', 'the word order', 'nothing: it can mean she'],
          correctAnswer: 'the signal waad',
          hint: '**-taa** allows both. The other word excludes one.',
          explanation: '**waad** is **waa** + **aad** (you), so *she* is ruled out by the signal. The verb alone could still be either.',
        },
      },
    },
    {
      id: '7-produce-2',
      type: 'produce',
      exercise: {
        id: 'l7-p2',
        type: 'translate',
        objectiveIds: ['verb-person-endings', 'verb-ending-ambiguity'],
        question: 'The promise. Type the two words that mean **he brings**: signal first, then the action word.',
        answer: 'wuu keenaa',
        hint: '**waa** squashed with **uu** (he), then the **-aa** form of **keen**.',
        explanation:
          '**wuu keenaa**: **waa** + **uu** carries "he", and **keenaa** is the **-aa** form. Swap the signal for **waan** and the identical verb now means "I bring".',
        repair: {
          id: 'l7-p2-r', type: 'translate', objectiveIds: ['verb-person-endings', 'verb-ending-ambiguity'],
          question: 'Type the two words that mean **I bring**: signal first, then the action word.',
          answer: 'waan keenaa',
          hint: '**waa** squashed with **aan** (I), then the **-aa** form of **keen**.',
          explanation: '**waan keenaa**: **waa** + **aan** carries "I", and **keenaa** is the **-aa** form. Swap the signal for **wuu** and the identical verb now means "he brings".',
        },
      },
    },
    {
      id: '7-payoff',
      type: 'payoff',
      prompt:
        'That was the promise.\n\n' +
        '**wuu keenaa**: he brings\n' +
        '**way keentaa**: she brings\n\n' +
        'The verb ending narrows it to two people. The signal picks which. Neither works alone.',
    },
    {
      id: '7-summary',
      type: 'summary',
      title: 'What you can do now',
      content:
        'The **DO** box is filled:\n\n' +
        '• **-aa** → I, he · **-taa** → you, she · **-naa** → we · **-taan** → you (plural) · **-aan** → they\n' +
        '• a **t** means *you* or *she*; an **n** means a plural\n' +
        '• the ending narrows it to two people, and the signal in front decides which\n\n' +
        'You now have every box except the details: **WHO**, **SIGNAL**, and **DO**.\n\n' +
        'Next: putting all three in order, and what happens to that order when a signal moves the spotlight.',
    },
  ],
};

// ============================================================================
// LESSON 8 — Putting It In Order  (Unit 2)
// ============================================================================

/**
 * The last lesson of Unit 2 and the payoff of the whole unit: the boxes in
 * order, and what the spotlight does to that order.
 *
 * WHAT THIS LESSON DELIBERATELY DOES NOT SAY. The obvious lesson here is
 * "Somali is SOV — the verb goes last", and it was very nearly written that
 * way. The sources do not support it as a rule. Orwin p.41 gives
 * "SUBJECT OBJECT VERB" as the *basic* order and then immediately allows
 * objects after the verb; Nilsson §12 is blunter — "there is no requirement
 * for the subject of a clause to occur in any specific position" and "the
 * object may equally well occur before as after the verb phrase".
 *
 * So the lesson teaches what both sources actually agree on:
 *   1. the action word usually lands at the end, and the thing acted on comes
 *      before it — the reverse of English, and the reason a Somali sentence
 *      reads back-to-front at first;
 *   2. the signal sits *immediately before the verb*. This is the part that is
 *      genuinely rigid — Orwin states it as the rule of thumb for the mood
 *      classifier ("as close to the verb as possible") and Nilsson's fixed
 *      phrase-internal order agrees;
 *   3. `waxa` is the exception that proves it: the spotlighted words land
 *      *after* the verb.
 *
 * Per LESSON_CONVENTIONS §2.1, that is a rule stated as behaviour rather than
 * as a typological label, and it has the advantage of being true.
 *
 * SOURCING SHAPED THE EXERCISES. Orwin's example sentences carry vocabulary
 * only Orwin has (`tegey`, `cabbay`, `koob`), so under check S6 they are shown
 * and read but never typed. Every production item answers with fully
 * double-sourced material the learner already owns — `Wiilku waa macallin`
 * from Unit 1, and `wuu keenaa` from Lesson 7.
 */
const LESSON_8: Lesson = {
  id: 8,
  unitId: 2,
  title: 'Putting It In Order',
  newItems: ['8-teach-verb-last', '8-teach-signal-hugs', '8-teach-waxa-moves'],
  objectives: ['order-verb-last', 'order-signal-hugs-verb', 'order-waxa-moves-it'],
  cards: [
    {
      id: '8-blueprint',
      type: 'blueprint',
      blueprintSlot: 'DO',
      content: `${BOX}\n\nEvery box is filled. The last question is what order they come in, and the answer is not the English one.`,
    },
    {
      id: '8-promise',
      type: 'promise',
      prompt:
        'Read **Nin shaah wuu cabbay** and explain why its four words sit in that order.',
    },
    {
      id: '8-passage-a', type: 'passage',
      passage: {
        id: 'l8-text-a',
        label: 'Two lines from a story',
        lines: [
          { somali: 'Nin shaah wuu cabbay.', gloss: 'A man drank tea.', note: 'Four words, in an order English would never use.' },
          { somali: 'Nin waa tegey.', gloss: 'A man went.', note: 'Same man, plainer line.' },
        ],
      },
      content: 'Two lines from a short story. Read them both slowly, then answer.',
    },
    {
      id: '8-gist-a', type: 'notice', exercise: {
        id: 'l8-gist-a', type: 'multiple_choice', objectiveIds: ['order-verb-last'],
        question: 'Where is the action word in each of these lines?',
        options: [
          'at the end of the line',
          'right after the man, as in English',
          'at the very start',
          'the two lines put it in different places',
        ],
        correctAnswer: 'at the end of the line',
        hint: 'Find **cabbay** (drank) and **tegey** (went) in the two lines.',
        explanation: '**cabbay** ends the first line and **tegey** ends the second. Somali gets to the action after everything it was done to.',
        repair: {
          id: 'l8-gist-a-r', type: 'multiple_choice', objectiveIds: ['order-verb-last'],
          question: 'In **Nin shaah wuu cabbay**, which word is the action?',
          options: ['cabbay, the last word', 'nin, the first word', 'shaah, in the middle', 'wuu, the signal'],
          correctAnswer: 'cabbay, the last word',
          hint: 'The action is the word that tells what happened.',
          explanation: '**cabbay** (drank) is the action, and it sits last. **nin** is who, **shaah** is what was drunk, **wuu** is the signal.',
        },
      },
    },
    {
      id: '8-detail-a', type: 'notice', exercise: {
        id: 'l8-detail-a', type: 'multiple_choice', objectiveIds: ['order-signal-hugs-verb'],
        question: 'In the second line, which word sits immediately before the action?',
        options: ['waa, the signal', 'Nin, the man', 'nothing comes before it', 'shaah, the tea'],
        correctAnswer: 'waa, the signal',
        hint: '**Nin waa tegey**: three words. The middle one does a signalling job.',
        explanation: '**waa** sits immediately before **tegey**. That pairing, signal then action, is the most reliable landmark in a Somali sentence.',
        repair: {
          id: 'l8-detail-a-r', type: 'multiple_choice', objectiveIds: ['order-signal-hugs-verb'],
          question: 'In the first line, which word sits immediately before **cabbay**?',
          options: ['wuu, the squashed signal', 'shaah, the tea', 'Nin, the man', 'nothing'],
          correctAnswer: 'wuu, the squashed signal',
          hint: 'Even with tea wedged into the sentence, one word still hugs the verb.',
          explanation: '**wuu** (**waa** + **uu**) sits right before **cabbay**. **shaah** moved in earlier, but the signal never leaves the verb.',
        },
      },
    },
    {
      id: '8-teach-verb-last',
      type: 'teach',
      isNew: true,
      title: 'The action lands at the end',
      content:
        'English puts the action in the middle: *A man **drank** tea.*\n\n' +
        'Somali usually puts it last, with the thing acted on **before** it:\n\n' +
        '• **Nin shaah wuu cabbay.**: a man / tea / (signal+he) / drank\n' +
        '• **Koob keen!**: a cup / bring!\n\n' +
        'Read literally, that is *"a man tea he-drank"* and *"a cup bring"*. This is the single biggest reason a Somali sentence feels back-to-front at first: you are waiting for the verb and it has not arrived yet.\n\n' +
        'The rule is **usually**, not always. Somali moves noun phrases more freely than English. The next pattern is the part that stays fixed.',
    },
    {
      id: '8-coach-hold-verb',
      type: 'coach',
      title: 'Keep the parse open until the action arrives',
      content:
        'Do not force the English order onto the first two words. Hold a provisional WHO and WHAT, then look for the signal. The action should sit immediately to its right. If **waxa** is the signal, keep reading after the action for the spotlighted ending. This lets later words revise an early guess instead of trapping you in it.',
    },
    {
      id: '8-notice-1',
      type: 'notice',
      exercise: {
        id: 'l8-n1',
        type: 'multiple_choice',
        objectiveIds: ['order-verb-last'],
        question: 'In **Nin shaah wuu cabbay** ("A man drank tea"), where has the action word gone, compared with English?',
        options: [
          'To the end, after the thing being drunk',
          'To the front, before everything else',
          'Straight after the man, as in English',
          'Nowhere: the order matches English exactly',
        ],
        correctAnswer: 'To the end, after the thing being drunk',
        hint: 'Line the two up word by word: *a man / tea / he / drank*.',
        explanation:
          '**cabbay** (drank) is last, and **shaah** (tea) comes before it. English would say "a man drank tea"; Somali gets to the action after telling you what it was done to.',
        repair: {
          id: 'l8-n1-r', type: 'multiple_choice', objectiveIds: ['order-verb-last'],
          question: 'English says "a man drank tea". In the Somali line **Nin shaah wuu cabbay**, what comes right before the action word?',
          options: ['shaah: the thing being drunk', 'nin: the man', 'waa: the plain signal', 'nothing: cabbay comes first'],
          correctAnswer: 'shaah: the thing being drunk',
          hint: 'The action is last. Whatever it was done to stands in front of it.',
          explanation: '**shaah** (tea) comes before **cabbay** (drank). Somali tells you what was acted on before it gives you the action.',
        },
      },
    },
    {
      id: '8-teach-signal-hugs',
      type: 'teach',
      isNew: true,
      title: 'The signal never leaves the verb',
      content:
        'Noun phrases can shift about. The signal does not. **It sits as close to the action word as it can get.**\n\n' +
        '• **Nin waa tegey.**: a man / (signal) / went\n' +
        '• **Nin shaah wuu cabbay.**: a man / tea / (signal+he) / drank\n\n' +
        'In both, the signal is the last thing before the verb. Even with an extra word wedged in, it does not drift.\n\n' +
        'This is the most reliable thing you know about Somali word order, and it is worth more than any rule about subjects and objects. **Find the signal, and the action word is immediately to its right.**',
    },
    {
      id: '8-notice-2',
      type: 'notice',
      exercise: {
        id: 'l8-n2',
        type: 'multiple_choice',
        objectiveIds: ['order-signal-hugs-verb'],
        question: 'You are reading a long Somali sentence and you spot the signal **wuu**. What do you know immediately?',
        options: [
          'The action word is the next thing along',
          'The sentence has just ended',
          'The action word is right before it',
          'The next word is the subject',
        ],
        correctAnswer: 'The action word is the next thing along',
        hint: 'The signal keeps as close to the verb as it can, and it sits in front.',
        explanation:
          'The signal hugs the verb from in front, so whatever follows it is the action word. That holds even when other words move around, which makes it the most dependable landmark in the sentence.',
        repair: {
          id: 'l8-n2-r', type: 'multiple_choice', objectiveIds: ['order-signal-hugs-verb'],
          question: 'You are reading a long Somali sentence and you spot the signal **baa**. What do you know immediately?',
          options: [
            'The action word is the next thing along',
            'The sentence has just ended',
            'The action word is right before it',
            'The next word is the subject',
          ],
          correctAnswer: 'The action word is the next thing along',
          hint: 'Every signal keeps as close to the verb as it can, from in front.',
          explanation: 'Like **wuu**, **baa** hugs the verb from in front. Find any signal and the action word is immediately to its right.',
        },
      },
    },
    {
      id: '8-complete-1',
      type: 'complete',
      exercise: {
        id: 'l8-c1',
        type: 'fill_blank',
        objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
        question:
          'Put the pieces of "A man went" in order:  Nin ___ tegey.',
        options: ['waa', 'baa', 'waxa', 'ma'],
        correctAnswer: 'waa',
        hint: 'A plain statement, nothing spotlighted, and it belongs right before the verb.',
        explanation:
          '**Nin waa tegey.** The plain-statement signal **waa** sits immediately before **tegey** (went). **baa** and **waxa** would both claim something is being spotlighted.',
        repair: {
          id: 'l8-c1-r', type: 'multiple_choice', objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
          question: 'Put the pieces of "A man drank tea" in order:  Nin shaah ___ cabbay.',
          options: ['wuu', 'waa', 'waxa', 'ma'],
          correctAnswer: 'wuu',
          hint: 'The doer is "he", and the signal sits right before the verb.',
          explanation: '**Nin shaah wuu cabbay.** **wuu** (**waa** + **uu**) carries "he" and hugs **cabbay** from in front. **waxa** would push something to the end.',
        },
      },
    },
    {
      id: '8-teach-waxa-moves',
      type: 'teach',
      isNew: true,
      title: 'waxa breaks the pattern on purpose',
      content:
        'One thing does move the verb off the end: **waxa**, the signal that spotlights whatever comes last.\n\n' +
        'It has to. If **waxa** spotlights the end of the sentence, and the verb is at the end, then something must give, so the spotlighted words go **after** the verb:\n\n' +
        '**waxa** (+ who) → **verb** → *the spotlighted words*\n\n' +
        'That is why **waxa** sentences can look inside out. The spotlight still lands exactly where **waxa** says it will.\n\n' +
        'The landmark still holds: the signal is still immediately before the verb.',
    },
    {
      id: '8-notice-3',
      type: 'notice',
      exercise: {
        id: 'l8-n3',
        type: 'multiple_choice',
        objectiveIds: ['order-waxa-moves-it'],
        question: 'In a **waxa** sentence, where do the spotlighted words land?',
        options: [
          'After the action word',
          'Before the action word, as usual',
          'At the very start of the sentence',
          'Directly before waxa',
        ],
        correctAnswer: 'After the action word',
        hint: '**waxa** spotlights whatever finishes the sentence, so what has to move?',
        explanation:
          '**waxa** spotlights the end, so the spotlighted words go past the verb to get there. **baa** does the opposite: it spotlights what sits immediately before it, and leaves the verb at the end.',
        repair: {
          id: 'l8-n3-r', type: 'multiple_choice', objectiveIds: ['order-waxa-moves-it'],
          question: 'Which signal can push the spotlighted words past the verb, to the very end?',
          options: ['waxa', 'baa', 'waa', 'ma'],
          correctAnswer: 'waxa',
          hint: 'Only one signal spotlights the END of the sentence.',
          explanation: '**waxa** spotlights the end, so the spotlighted words must go past the verb to get there. **baa** and **waa** leave the verb last.',
        },
      },
    },
    {
      id: '8-produce-1',
      type: 'produce',
      exercise: {
        id: 'l8-p1',
        type: 'unscramble',
        objectiveIds: ['order-signal-hugs-verb'],
        question: 'Build "The boy is a teacher.": the sentence you first made in Unit 1, now that you know why the pieces sit where they do.',
        words: ['macallin', 'Wiilku', 'waa'],
        answer: 'Wiilku waa macallin',
        hint: 'Who first, then the signal. Here the signal is next to what the boy *is*, since there is no action word.',
        explanation:
          '**Wiilku waa macallin.** The subject leads, and **waa** sits immediately before what is being said about him: the same slot the action word would occupy if there were one.',
        repair: {
          id: 'l8-p1-r', type: 'unscramble', objectiveIds: ['order-signal-hugs-verb'],
          question: 'Build "I bring.": signal and action word, in the order Somali puts them.',
          words: ['keenaa', 'waan'],
          answer: 'waan keenaa',
          hint: 'The signal hugs the verb from in front.',
          explanation: '**waan keenaa.** The signal **waan** (**waa** + **aan**) comes first and **keenaa** follows immediately, never the other way round.',
        },
      },
    },
    {
      id: '8-produce-2',
      type: 'produce',
      exercise: {
        id: 'l8-p2',
        type: 'unscramble',
        objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
        question: 'Build "he brings": signal and action word, in the order Somali puts them.',
        words: ['keenaa', 'wuu'],
        answer: 'wuu keenaa',
        hint: 'The signal hugs the verb from in front.',
        explanation:
          '**wuu keenaa.** The signal comes first and the action word follows immediately, never the other way round.',
        repair: {
          id: 'l8-p2-r', type: 'unscramble', objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
          question: 'Build "she brings": signal and action word, in the order Somali puts them.',
          words: ['keentaa', 'way'],
          answer: 'way keentaa',
          hint: 'The signal hugs the verb from in front.',
          explanation: '**way keentaa.** The signal comes first and the action word follows immediately, never the other way round.',
        },
      },
    },
    {
      id: '8-passage-b', type: 'passage',
      passage: {
        id: 'l8-text-b',
        label: 'A two-line update',
        lines: [
          { somali: 'Wuu keenaa.', gloss: 'He brings.', note: 'A complete plain statement.' },
          { somali: 'Way keentaa.', gloss: 'She brings.', note: 'Watch what stays put and what changes.' },
        ],
      },
      content: 'One more short exchange. Read both lines, then answer.',
    },
    {
      id: '8-gist-b', type: 'notice', exercise: {
        id: 'l8-gist-b', type: 'multiple_choice', objectiveIds: ['order-signal-hugs-verb'],
        question: 'What stays in the same position in both lines?',
        options: [
          'the signal comes immediately before the action',
          'the action comes before the signal',
          'the same person is acting',
          'the action ending never changes',
        ],
        correctAnswer: 'the signal comes immediately before the action',
        hint: 'Compare the job of the first word with the job of the second word in each line.',
        explanation: 'Both lines keep SIGNAL → DO: **wuu | keenaa**, **way | keentaa**. The person and the verb ending change, but the signal still hugs the action from in front.',
        repair: {
          id: 'l8-gist-b-r', type: 'multiple_choice', objectiveIds: ['order-signal-hugs-verb'],
          question: 'In both lines, what sits immediately to the right of the signal?',
          options: ['the action word', 'the person', 'the thing acted on', 'the end of the sentence'],
          correctAnswer: 'the action word',
          hint: '**wuu | keenaa** and **way | keentaa**: read the second slot in each.',
          explanation: 'In both lines the action word follows its signal directly. That adjacency is the thing that never moves.',
        },
      },
    },
    {
      id: '8-detail-b', type: 'notice', exercise: {
        id: 'l8-detail-b', type: 'multiple_choice', objectiveIds: ['order-verb-last'],
        question: 'In **Wuu keenaa**, where is the action word?',
        options: [
          'at the end: right after the signal',
          'at the start of the line',
          'before the signal',
          'there is no action word',
        ],
        correctAnswer: 'at the end: right after the signal',
        hint: 'Two words: signal, then what?',
        explanation: '**keenaa** (bring) is last, immediately after **wuu**. Signal, then action, then nothing: the verb is at the end again.',
        repair: {
          id: 'l8-detail-b-r', type: 'multiple_choice', objectiveIds: ['order-verb-last'],
          question: 'In **Way keentaa**, which word is the action, and where does it sit?',
          options: ['keentaa, at the end', 'way, at the start', 'keentaa, before the signal', 'there is no action word'],
          correctAnswer: 'keentaa, at the end',
          hint: 'The action tells what happened: bringing.',
          explanation: '**keentaa** is the action and it finishes the line, right after the signal **way**.',
        },
      },
    },
    {
      id: '8-connected-write', type: 'produce', exercise: {
        id: 'l8-connected-write', type: 'translate', objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
        question: 'Write the two-line update: “He brings.” then “She brings.” Use one Somali sentence per line.',
        answer: 'wuu keenaa\nway keentaa',
        hint: 'Each line begins with its squashed signal, followed immediately by the matching action word.',
        explanation: '**wuu keenaa** and **way keentaa** form a short connected update. Each sentence keeps SIGNAL → DO, while both halves change together to keep the person consistent.',
        repair: {
          id: 'l8-connected-write-r', type: 'translate', objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
          question: 'Write the two-line update: "You bring." then "They bring." Use one Somali sentence per line.',
          answer: 'waad keentaa\nway keenaan',
          hint: 'Each line begins with its squashed signal, followed immediately by the matching action word.',
          explanation: '**waad keentaa** and **way keenaan**: each line keeps SIGNAL → DO, and both halves change together to keep the person consistent.',
        },
      },
    },
    {
      id: '8-payoff',
      type: 'payoff',
      prompt:
        'That was the promise.\n\n' +
        '**Nin shaah wuu cabbay.**: a man · tea · (signal + he) · drank\n\n' +
        'The action waits until the end. The thing acted on comes before it. And the signal is welded to the front of the verb, which is how you find your way in even when the rest moves.',
    },
    {
      id: '8-summary',
      type: 'summary',
      title: 'What you can do now',
      content:
        'Unit 2 is finished, and the four boxes are all yours:\n\n' +
        '• the action word usually lands **last**, with the thing acted on before it\n' +
        '• the **signal sits immediately before the action word**: the one part that does not drift\n' +
        '• **waxa** sends the spotlighted words **past** the verb, which is why those sentences look inside out\n\n' +
        'You started this unit unable to say why Somali sentences seemed to scramble themselves. You can now read a plain sentence, find the signal, find the action, and say which word the sentence is really about.\n\n' +
        'Next, the unit test, and it will ask about Unit 1 as well, not just this one.',
    },
  ],
};

export const AUTHORED_LESSONS: Lesson[] = [
  LESSON_1,
  LESSON_2,
  LESSON_3,
  LESSON_4,
  LESSON_5,
  LESSON_6,
  LESSON_7,
  LESSON_8,
];

/** Highest built lesson id. Only built lessons appear here — never stubs. */
export const MAX_LESSON_ID = Math.max(...AUTHORED_LESSONS.map((l) => l.id));

/** Lesson summaries for navigation. Derived, so it cannot drift from the content. */
export const LESSON_LIST: LessonSummary[] = AUTHORED_LESSONS.map((lesson) => ({
  lessonId: lesson.id,
  title: lesson.title,
  cardCount: lesson.cards.length,
}));

export function getLessonContent(lessonId: number): Lesson | undefined {
  return AUTHORED_LESSONS.find((l) => l.id === lessonId);
}

/** Every blueprint box a lesson fills. Normalises the single-or-list field. */
export function slotsFilledBy(lesson: Lesson): BlueprintSlot[] {
  const raw = lesson.cards.find((c) => c.type === 'blueprint')?.blueprintSlot;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : [raw];
}

/**
 * Boxes filled by lessons *before* this one — the blueprint's "done" state.
 *
 * Derived from the course rather than stored, so it cannot drift from what the
 * lessons actually teach. This is what lets the diagram show three states
 * instead of two: before this, `WHO` at Lesson 5 rendered identically to
 * `WHAT`, which no lesson had touched — the organizer distinguished only
 * current from not-current, and §1.13 rates the graphic channel (1.24) above
 * the prose (0.80) that was carrying the difference.
 */
export function slotsCompletedBefore(lessonId: number): BlueprintSlot[] {
  const done = new Set<BlueprintSlot>();
  for (const lesson of AUTHORED_LESSONS) {
    if (lesson.id >= lessonId) continue;
    for (const s of slotsFilledBy(lesson)) done.add(s);
  }
  return [...done];
}
