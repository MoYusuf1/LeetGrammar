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
      prompt: 'By the end, you will read two short Somali class-page captions and say who is a teacher and who is a student — including one caption you have never seen.',
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
      content: 'Read this class page once, all the way through. Do not stop on any single word — say to yourself what the page is about, roughly. Then move on.',
    },
    {
      id: '1-gist-a', type: 'notice', exercise: {
        id: 'l1-gist-a', type: 'multiple_choice', objectiveIds: ['decode-statement'],
        question: 'What is this class page telling you, roughly?',
        options: [
          'who is a teacher and who is a student',
          'what the boy and Omar are doing today',
          'where the boy and Omar study',
          'how old the boy and Omar are',
        ],
        correctAnswer: 'who is a teacher and who is a student',
        hint: 'You do not need every word. Ask: is this page about people, places, or events?',
        explanation: 'Both captions name a person and say what he is: the boy is a teacher, Omar is a student. That is the gist, and you could get it before knowing every ending. Gist first, details second — that order is the whole reading routine.',
        repair: {
          id: 'l1-gist-a-r', type: 'multiple_choice', objectiveIds: ['decode-statement'],
          question: 'Look at the class page once more. Which line of it is about a student?',
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
      content: 'You just did the whole routine without naming it. First pass: **WHO** — which people does this page name? Second: **SIGNAL** — which small word sits in the middle of each line? Third: **WHAT** — what does it say each person is? Use the passes in that order on anything you read: gist before details, and details before any single stubborn word.',
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
        explanation: '**Wiilku waa macallin** is a plain statement: “The boy is a teacher.” **Waa** is the signpost for that. **Baa** and **waxa** are spotlight signals from later lessons — wrong here, because nothing is being singled out.',
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
      content: 'A page you have never seen. Same routine, no new rules: read it through once and take the gist before anything else.',
    },
    {
      id: '1-transfer-gist', type: 'notice', exercise: {
        id: 'l1-transfer-gist', type: 'multiple_choice', objectiveIds: ['decode-statement', 'find-signal'],
        question: 'Who is the teacher in THESE captions?',
        options: ['Sahra', 'the boy', 'Cumar', 'no one'],
        correctAnswer: 'Sahra',
        hint: 'This is a new page. Read the captions in front of you, not the ones from before.',
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
        question: 'Which clue proves both class pages are plain statements rather than spotlighted contrasts?',
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
      content: 'Read a short Somali caption or profile line in three passes: **WHO → SIGNAL → WHAT**. **Waa** marks a plain statement; the words around it say who and what. You read two real class pages, including one you had never seen — that is the skill every later lesson builds on. Next: the words that fill the WHO box, and why Somali hides their gender in writing.',
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
      prompt: 'By the end you will know why the boy\u2019s word on the noticeboard ends one way and the hand\u2019s ends another \u2014 and why you could never have seen it in the bare words.',
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
      content: 'Read this noticeboard once, all the way through, with the same three passes: WHO, SIGNAL, WHAT. Do not stop on any single word. Then move on.',
    },
    {
      id: '2-gist-a', type: 'notice', exercise: {
        id: 'l2-gist-a', type: 'multiple_choice', objectiveIds: ['decode-caption-page'],
        question: 'What is this noticeboard telling you, roughly?',
        options: [
          'what the boy is, and how the hand is',
          'where the boy and the hand are',
          'whose hand is dirty',
          'what the boy is doing to his hand',
        ],
        correctAnswer: 'what the boy is, and how the hand is',
        hint: 'You do not need every word. Ask: is this page about people, places, or events?',
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
          hint: 'Same routine on the first line.',
          explanation: '**Wiilku waa macallin** \u2014 the boy is a teacher. You read this line last lesson; the noticeboard uses the same shape.',
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
        'It matters because gender decides the ending a noun takes \u2014 the noticeboard\u2019s **-ku** and **-tu** were that choice, and next lesson you will build the endings yourself. Get the gender wrong and the word comes out wrong.\n\n' +
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
      content: 'A page you have never seen. Same routine, no help this time: WHO, SIGNAL, WHAT, once through. Then answer.',
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
        hint: 'Same routine as the noticeboard: WHO, SIGNAL, WHAT.',
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
        'Two pages read, and the routine never changed: WHO, SIGNAL, WHAT.\n\nBut the tails talk now:\n\n**wiilku** (the boy) \u2192 k-type \u2192 masculine\n**gacantu** (the hand) \u2192 t-type \u2192 feminine\n**guriga** (the house) \u2192 masculine\n**magaalada** (the city) \u2192 feminine\n\nNext lesson: how those endings are actually built \u2014 and why they sometimes change shape.',
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
      content: `${BOX}\n\nStill the WHO box. Last lesson: which gender a noun has. Today: the ending that shows it.`,
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
      content: 'Last lesson ended with the advice: learn every noun in its "the" form. This is what that advice looks like — a dictionary page, two entries. Read it once, then answer.',
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
      content: 'A page you have never seen, from a different shelf of the dictionary. Same layout as before — read it once, then answer.',
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
      prompt: 'By the end you will build a complete, correct Somali sentence: **Wiilku waa macallin.**: "The boy is a teacher."',
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
      content: 'A school noticeboard introduces the staff. Two lines, two names. Read it once, then answer.',
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
        'By the end you will read two sentences made of **exactly the same words**. One means "SAHRA is greeting her friend". The other means "Sahra is greeting her FRIEND". You will know which is which.',
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
      content: 'A photo of Sahra greeting her friend, captioned twice. Same words in both lines. Read them once, then answer.',
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
        'You will build that one properly in a couple of lessons. For now, just notice that **waa** is there doing the same job: marking a plain statement, whatever follows it.\n\n' +
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
        'There is a second word, **ayaa**, that does the identical job. **baa** and **ayaa** are interchangeable: **ayaa** just sounds slightly more formal. You will meet both in real text; treat them as one thing.\n\n' +
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
      id: '6-connect',
      type: 'connect',
      prompt:
        'Last lesson ended on a loose end. You saw **Sahra waxa ay salaamaysaa saaxiibkeed**: two little words, **waxa** and **ay**, sitting side by side. Today they become one word, and so do all the others.',
    },
    {
      id: '6-promise',
      type: 'promise',
      prompt:
        'By the end you will see **wuxuu** and read it instantly as two things: the spotlight signal **waxa**, plus **uu**: he.',
    },
    {
      id: '6-predict',
      type: 'predict',
      prompt:
        'You know **waa** (plain statement) and you know **uu** (he). Somali almost never leaves them apart: in speech and in most writing they run together into a single word.\n\nBefore reading on: what do you think **waa + uu** turns into?',
    },
    {
      id: '6-teach',
      type: 'teach',
      title: 'Two words, one word',
      content:
        'Every signal you met last lesson can carry a short pronoun: the little words for who, from Lesson 4:\n\n' +
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
        'This is the one to learn as a shape rather than a sum. It is also extremely common, so you will meet it constantly.',
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
      },
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
      },
    },
    {
      id: '6-payoff',
      type: 'payoff',
      prompt:
        'That was the promise.\n\n' +
        '**wuxuu** = **waxa** (spotlight at the end) + **uu** (he)\n\n' +
        'A word that looked like noise two lessons ago is now two pieces you already knew.',
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
      id: '7-connect',
      type: 'connect',
      prompt:
        'You can fill **WHO**, and you can read the **SIGNAL** even when it is squashed onto a pronoun: **wuu**, **way**, **wuxuu**. Today the thing they have all been pointing at: the action itself.',
    },
    {
      id: '7-promise',
      type: 'promise',
      prompt:
        'By the end you will look at **wuu keenaa** and **way keentaa** and say instantly who is doing the bringing. You will also know why the verb alone could never have told you.',
    },
    {
      id: '7-predict',
      type: 'predict',
      prompt:
        'Two forms of the same action word, "bring":\n\n' +
        '**keenaa**\n' +
        '**keentaa**\n\n' +
        'One is used for *I* and *he*. The other for *you* and *she*.\n\n' +
        'Before reading on, which is which, and what is the one letter doing the work?',
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
      id: '7-coach-two-clues',
      type: 'coach',
      title: 'Use the ending and the signal together',
      content:
        'Treat the verb ending as a shortlist, not a final answer. First read the ending: **-aa** narrows the doer to I or he; **-taa** narrows it to you or she. Then move left to the fused signal and settle which person it is.\n\nIf the two clues disagree, stop and repair the parse. Do not guess from the verb alone. Good reading combines partial clues instead of asking one clue to do every job.',
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
        'This is not sloppiness in the language. The information is simply somewhere else: in the **signal** sitting in front of it, the one you learned to unsquash last lesson.\n\n' +
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
      },
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
      },
    },
    {
      id: '7-payoff',
      type: 'payoff',
      prompt:
        'That was the promise.\n\n' +
        '**wuu keenaa**: he brings\n' +
        '**way keentaa**: she brings\n\n' +
        'The verb ending narrows it to two people. The signal picks which. Neither could do it alone, which is why you needed last lesson before this one.',
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
      id: '8-connect',
      type: 'connect',
      prompt:
        'You have all the pieces: **WHO**, the **SIGNAL** (even squashed onto a pronoun), and the **DO** box with an ending that matches who. Today: the order they stand in.',
    },
    {
      id: '8-promise',
      type: 'promise',
      prompt:
        'By the end you will read **Nin shaah wuu cabbay**: four words in an order English would never use. You will know exactly why each one sits where it does.',
    },
    {
      id: '8-predict',
      type: 'predict',
      prompt:
        'Here is a real Somali sentence meaning **"A man drank tea."**\n\n' +
        '**Nin shaah wuu cabbay.**\n\n' +
        'The words are: *nin* a man · *shaah* tea · *wuu* the signal + he · *cabbay* drank.\n\n' +
        'Before reading on: what has moved, compared with the English?',
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
        'The honest version of the rule is **usually**, not always. Somali moves noun phrases around more freely than English does, and you will meet sentences with things after the verb. What follows is the part that does not move.',
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
        'That is why **waxa** sentences look inside out even once you are comfortable with the rest. They are not an exception to the system; they are the system, with the spotlight doing exactly what Lesson 5 said it does.\n\n' +
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
      },
    },
    {
      id: '8-transfer-parse', type: 'notice', exercise: {
        id: 'l8-transfer-parse', type: 'multiple_choice', objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
        question: 'Read the new two-line note:\n\n**Wuu keenaa.**\n**Way keentaa.**\n\nWhat stays in the same position in both lines?',
        options: ['the signal comes immediately before the action', 'the action comes before the signal', 'the same person is acting', 'the action ending never changes'],
        correctAnswer: 'the signal comes immediately before the action',
        hint: 'Compare the job of the first word with the job of the second word in each line.',
        explanation: 'Both lines keep SIGNAL → DO: **wuu | keenaa**, **way | keentaa**. The person and verb ending change, but the signal still hugs the action from in front.',
      },
    },
    {
      id: '8-connected-write', type: 'produce', exercise: {
        id: 'l8-connected-write', type: 'translate', objectiveIds: ['order-signal-hugs-verb', 'order-verb-last'],
        question: 'Write the two-line update: “He brings.” then “She brings.” Use one Somali sentence per line.',
        answer: 'wuu keenaa\nway keentaa',
        hint: 'Each line begins with its squashed signal, followed immediately by the matching action word.',
        explanation: '**wuu keenaa** and **way keentaa** form a short connected update. Each sentence keeps SIGNAL → DO, while both halves change together to keep the person consistent.',
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
