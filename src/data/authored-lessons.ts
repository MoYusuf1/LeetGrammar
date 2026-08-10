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

import type { Lesson } from './types';

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
// LESSON 1 — Sounds & Spelling
// ============================================================================

const LESSON_1: Lesson = {
  id: 1,
  unitId: 1,
  title: 'Sounds & Spelling',
  cards: [
    {
      id: '1-blueprint',
      type: 'blueprint',
      blueprintSlot: undefined,
      content: `${BOX}\n\nThis is the shape every Somali sentence follows. You will fill one box at a time.\n\nFirst, though: reading the letters.`,
    },
    {
      id: '1-promise',
      type: 'promise',
      prompt: 'By the end of this lesson you will be able to read any written Somali word aloud — including the four letters that trip up English speakers.',
    },
    {
      id: '1-teach',
      type: 'teach',
      title: 'The Somali alphabet',
      content:
        'Somali is written in the Latin alphabet — the same letters you already read. Two things are different.\n\n' +
        '**Three letters are missing.** Somali never uses **p**, **v**, or **z**. If you see them, the word is borrowed and unadapted.\n\n' +
        '**Three pairs act as single letters.** These are not two sounds — each pair is one:\n' +
        '• **dh** — a "d" made with the tongue curled back\n' +
        '• **kh** — a rasp in the back of the throat, like Scottish "loch"\n' +
        '• **sh** — as in English "ship"\n\n' +
        'That is the whole list. There are exactly three.',
    },
    {
      id: '1-teach-cx',
      type: 'teach',
      title: 'The two throat letters: c and x',
      content:
        'Two ordinary-looking letters do something English never does. Both are made deep in the throat.\n\n' +
        '• **c** is **not** "k" and **not** "s". It is a tightening deep in the throat, then a vowel. It opens the name **Cali** and the word **caano** (milk).\n\n' +
        '• **x** is **not** "ks". It is a hard, breathy "h" from the same deep place. It ends **libaax** (lion).\n\n' +
        'These two are the most common reason a learner\'s Somali is hard to follow. They are worth slowing down on.\n\n' +
        'You will also see **q**, made further back than English "k".',
    },
    {
      id: '1-notice-1',
      type: 'notice',
      exercise: {
        id: 'l1-n1',
        type: 'multiple_choice',
        objectiveIds: ['somali-alphabet'],
        question: 'Which of these letters is **never** used in Somali spelling?',
        options: ['q', 'x', 'v', 'c'],
        correctAnswer: 'v',
        hint: 'Three English letters are absent from Somali. The other three options are all real Somali letters with sounds of their own.',
        explanation:
          'Somali uses every English letter **except p, v, and z**. The other three options are genuine Somali letters: **q** is a deep "k", **x** is a throat "h", and **c** is a throat tightening.',
      },
    },
    {
      id: '1-notice-2',
      type: 'notice',
      exercise: {
        id: 'l1-n2',
        type: 'multiple_choice',
        objectiveIds: ['somali-alphabet'],
        question: 'You just met the word **libaax** (lion). Which throat letter does it end with?',
        options: ['x', 'c', 'q', 'kh'],
        correctAnswer: 'x',
        hint: 'Look at the final letter. It is one of the two deep-throat letters from the last card.',
        explanation:
          '**Libaax** ends in **x** — a hard, breathy "h" from deep in the throat. It is not "ks" as in English "box". The definite form is **libaaxa**.',
      },
    },
    {
      id: '1-complete-1',
      type: 'complete',
      exercise: {
        id: 'l1-c1',
        type: 'multiple_choice',
        objectiveIds: ['somali-digraphs'],
        question: 'How many letter-pairs act as a single letter in Somali?',
        options: ['two — dh and kh', 'three — dh, kh and sh', 'four — dh, kh, sh and ch', 'five — dh, kh, sh, ph and th'],
        correctAnswer: 'three — dh, kh and sh',
        hint: 'Count the pairs from the alphabet card. Somali has no "ch", "ph" or "th".',
        explanation:
          'There are exactly **three**: **dh**, **kh**, **sh**. Each is one sound, not two. Somali has no ch, ph or th.',
      },
    },
    {
      id: '1-complete-2',
      type: 'complete',
      exercise: {
        id: 'l1-c2',
        type: 'multiple_choice',
        objectiveIds: ['somali-vowel-length'],
        question: 'Compare **mas** (snake) with **caano** (milk). What does the doubled **aa** tell you?',
        options: [
          'Hold the vowel longer',
          'Stress that syllable',
          'The word is plural',
          'The word is borrowed',
        ],
        correctAnswer: 'Hold the vowel longer',
        hint: 'Somali writes long vowels by simply writing the vowel twice. Nothing else changes.',
        explanation:
          'A doubled vowel means **hold it longer**: aa, ee, ii, oo, uu. That is the only way Somali marks vowel length — there are no accent marks.',
      },
    },
    {
      id: '1-complete-3',
      type: 'complete',
      exercise: {
        id: 'l1-c3',
        type: 'multiple_choice',
        objectiveIds: ['somali-alphabet'],
        question: 'The name **Cali** begins with **c**. How is it pronounced?',
        options: [
          'A tightening deep in the throat, then "ali"',
          'Like English "k" — "Kali"',
          'Like English "s" — "Sali"',
          'Like English "ch" — "Chali"',
        ],
        correctAnswer: 'A tightening deep in the throat, then "ali"',
        hint: 'Somali **c** is one of the two throat letters. It is not borrowed from how English uses the letter c.',
        explanation:
          'Somali **c** is a tightening deep in the throat. Reading it as English "k" or "s" is the single most common beginner mistake, and it makes common words like **Cali** and **caano** unrecognisable.',
      },
    },
    {
      id: '1-payoff',
      type: 'payoff',
      prompt:
        'You can now read these correctly:\n\n**libaax** — lion (throat x)\n**caano** — milk (throat c)\n**gabadh** — girl (the dh pair)\n**buug** — book\n\nNothing here needs memorising. You are just reading.',
    },
    {
      id: '1-summary',
      type: 'summary',
      title: 'What you learned',
      content:
        'Somali uses the Latin alphabet without p, v, z. Three pairs act as single letters: dh, kh, sh. Two letters — c and x — are made deep in the throat and have no English equivalent. Doubled vowels are held longer.',
    },
  ],
  newItems: ['1-teach', '1-teach-cx'],
  objectives: ['somali-alphabet', 'somali-digraphs', 'somali-vowel-length'],
};

// ============================================================================
// LESSON 2 — Naming Things (nouns and gender)
// ============================================================================

const LESSON_2: Lesson = {
  id: 2,
  unitId: 1,
  title: 'Naming Things',
  cards: [
    {
      id: '2-blueprint',
      type: 'blueprint',
      blueprintSlot: 'WHO',
      content: `${BOX}\n\nToday: the WHO box. Nouns — and the one property of them you cannot see.`,
    },
    {
      id: '2-connect',
      type: 'connect',
      prompt: 'Last lesson you learned to read Somali letters. Now the first box of the sentence: the thing the sentence is about.',
    },
    {
      id: '2-promise',
      type: 'promise',
      prompt: 'By the end you will know why **wiil** (boy) and **gabadh** (girl) behave differently in every sentence. And why you cannot tell which is which by looking.',
    },
    {
      id: '2-teach',
      type: 'teach',
      title: 'Every noun has a gender',
      content:
        'Every Somali noun is either **masculine** or **feminine**. This is a grammar label, not a statement about the world — **buug** (book) is masculine and **kab** (shoe) is feminine.\n\n' +
        'It matters because gender decides the ending you attach when you say "the", which you will learn next lesson. Get the gender wrong and the whole word comes out wrong.\n\n' +
        'Some nouns you can guess from meaning:\n' +
        '• **nin** (man), **wiil** (boy) — masculine\n' +
        '• **naag** (woman), **gabadh** (girl) — feminine\n\n' +
        'Most you cannot:\n' +
        '• **guri** (house), **buug** (book), **miis** (table) — masculine\n' +
        '• **magaalo** (city), **kab** (shoe), **bil** (month) — feminine',
    },
    {
      id: '2-example',
      type: 'example',
      title: 'Why you cannot see it',
      content:
        'Somali speakers hear gender in the **tone** of the word. Compare:\n\n' +
        '**inan** — boy (tone falls on the first syllable)\n' +
        '**inan** — girl (tone rises to the last)\n\n' +
        'Same letters. Different word. Different gender.\n\n' +
        'Here is the catch: **Somali does not write tone.** There are no accent marks in ordinary spelling. So on the page these two words are identical, and no spelling rule will ever tell you which is which.\n\n' +
        'This is why gender has to be learned with the word, the way you would learn it in French or German. It is not that Somali is irregular — it is that the writing system leaves the clue out.',
    },
    {
      id: '2-teach-diagnostic',
      type: 'teach',
      title: 'How to find out a noun\'s gender',
      content:
        'Since spelling will not tell you, look at the word\'s **"the" form** — that is where gender shows up:\n\n' +
        '• **wiil** → **wiilka** (the boy) — a **k** appears → masculine\n' +
        '• **naag** → **naagta** (the woman) — a **t** appears → feminine\n\n' +
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
          '**Guriga** contains a **g** — a k-type ending — so **guri** is **masculine**. Feminine nouns would show a t-type ending instead, as in **naagta**.',
      },
    },
    {
      id: '2-notice-2',
      type: 'notice',
      exercise: {
        id: 'l2-n2',
        type: 'multiple_choice',
        objectiveIds: ['noun-gender-diagnostic'],
        question: 'The word for "the city" is **magaalada**. Is **magaalo** masculine or feminine?',
        options: ['Feminine', 'Masculine', 'Both, depending on context', 'Neither — cities have no gender'],
        correctAnswer: 'Feminine',
        hint: 'The ending contains a d, which is a t-type ending. Which gender takes t-type endings?',
        explanation:
          '**Magaalada** shows a **d** — a t-type ending — so **magaalo** is **feminine**. Every Somali noun has a gender, including inanimate ones like cities.',
      },
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
        hint: 'Think about what a Somali speaker hears that the page does not show.',
        explanation:
          'Spoken Somali distinguishes them by **tone** — the boy word and the girl word carry it differently. Written Somali uses no accent marks, so both come out as **inan**. Context, or the "the" form, resolves it.',
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
          '**Buugga** has a k-type ending, so **buug** is **masculine** — a good example of gender having nothing to do with meaning.',
      },
    },
    {
      id: '2-complete-2',
      type: 'complete',
      exercise: {
        id: 'l2-c2',
        type: 'multiple_choice',
        objectiveIds: ['noun-gender'],
        question: 'Which of these nouns is **feminine**?',
        options: ['kab (shoe)', 'miis (table)', 'buug (book)', 'wiil (boy)'],
        correctAnswer: 'kab (shoe)',
        hint: 'Its "the" form is kabta. The others are wiilka, miiska and buugga.',
        explanation:
          '**Kab** (shoe) is feminine — **kabta**. The other three are masculine: **miiska**, **buugga**, **wiilka**.',
      },
    },
    {
      id: '2-produce-1',
      type: 'produce',
      exercise: {
        id: 'l2-p1',
        type: 'translate',
        objectiveIds: ['noun-gender-diagnostic'],
        question: 'A text uses **naagta** ("the woman"). Write the bare noun — the form with the "the" ending stripped off.',
        answer: 'naag',
        hint: 'Remove the t-type ending. What is left is the word as a dictionary lists it.',
        explanation:
          'Strip **-ta** and you get **naag** (woman). The t-type ending also tells you it is feminine — the bare noun alone would not.',
      },
    },
    {
      id: '2-payoff',
      type: 'payoff',
      prompt:
        'You can now read gender straight off the dictionary form:\n\n**wiilka** (the boy) → masculine\n**naagta** (the woman) → feminine\n**guriga** (the house) → masculine\n**magaalada** (the city) → feminine\n\nNext lesson: how those endings are actually built.',
    },
    {
      id: '2-summary',
      type: 'summary',
      title: 'Nouns and gender',
      content:
        'Every Somali noun is masculine or feminine. Speech marks it with tone, but writing does not, so gender must be learned with the word. The reliable clue is the "the" form: k-type ending means masculine, t-type means feminine.',
    },
  ],
  newItems: ['2-teach', '2-example', '2-teach-diagnostic'],
  objectives: ['noun-gender', 'noun-gender-diagnostic', 'noun-gender-unwritten'],
};

// ============================================================================
// LESSON 3 — Saying "the"
// ============================================================================

const LESSON_3: Lesson = {
  id: 3,
  unitId: 1,
  title: 'Saying "The"',
  cards: [
    {
      id: '3-blueprint',
      type: 'blueprint',
      blueprintSlot: 'WHO',
      content: `${BOX}\n\nStill the WHO box. Last lesson: which gender a noun has. Today: the ending that shows it.`,
    },
    {
      id: '3-connect',
      type: 'connect',
      prompt: 'You already used these endings as a gender test — wiilka, naagta. Now you will build them yourself.',
    },
    {
      id: '3-promise',
      type: 'promise',
      prompt: 'By the end you will turn any noun you meet into its "the" form — including the ones where the ending changes shape.',
    },
    {
      id: '3-teach',
      type: 'teach',
      title: 'There is no word for "the"',
      content:
        'Somali has no separate word for "the". It is an **ending stuck onto the noun**:\n\n' +
        '• **mas** (a snake) → **maska** (the snake)\n' +
        '• **kab** (a shoe) → **kabta** (the shoe)\n\n' +
        'Write it joined — **maska**, not "mas-ka".\n\n' +
        'There is also **no word for "a"**. The bare noun already covers it: **kab** on its own means "shoe" or "a shoe", whichever the English needs.\n\n' +
        'The basic endings are **-ka** for masculine and **-ta** for feminine.',
    },
    {
      id: '3-teach-assim',
      type: 'teach',
      title: 'The ending changes shape',
      content:
        'The ending softens to match the sound just before it. This is the part learners skip, and it is why their Somali comes out wrong.\n\n' +
        '**Masculine** — base **-ka**:\n' +
        '• after **g, aa, i, y, w** → **-ga**: guri → **guriga**\n' +
        '• after **e** or **o** → **-ha**, and e becomes a: aabbe → **aabbaha**\n' +
        '• after **c, h, x, kh, q** → just **-a**: libaax → **libaaxa**\n\n' +
        '**Feminine** — base **-ta**:\n' +
        '• after **d, i, y, w, c, h, x, kh, q** → **-da**: mindi → **mindida**\n' +
        '• after **o** → **-da**, and o becomes a: magaalo → **magaalada**\n' +
        '• after **dh** → just **-a**: gabadh → **gabadha**\n' +
        '• after **l** → **-sha**, and the l disappears: bil → **bisha**\n\n' +
        'The **-sha** rule is the one to watch. **bil** → **bisha**, not "bilta".',
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
      },
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
        hint: 'After o, the feminine ending becomes -da — and the o itself changes to a.',
        explanation:
          'After **o** the feminine ending becomes **-da**, and the **o changes to a**: magaalo → **magaalada**. Two changes at once, which is why this one is easy to get half-right.',
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
          'After **dh** the feminine ending is written as just **-a**: gabadh → **gabadha**. The dh itself is pronounced more strongly. (You may also meet **gabar** for "girl", giving **gabarta** — both are correct.)',
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
        '"The" is an ending, not a word, and it is written joined. Base forms are -ka (masculine) and -ta (feminine), but the ending softens to match the sound before it: -ga, -ha, -a, -da, -sha. There is no word for "a" — the bare noun covers it.',
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
      content: `${BOX}\n\nLast time in the WHO box. Pronouns — and the marker that says "this one is the subject".`,
    },
    {
      id: '4-connect',
      type: 'connect',
      prompt: 'You can name a thing (wiil) and make it definite (wiilka). Now: replacing it with "he", and flagging it as the doer.',
    },
    {
      id: '4-promise',
      type: 'promise',
      prompt: 'By the end you will build a complete, correct Somali sentence: **Wiilku waa macallin.** — "The boy is a teacher."',
    },
    {
      id: '4-teach',
      type: 'teach',
      title: 'The eight pronouns',
      content:
        'These are the standalone pronouns — the ones you would use to answer "who?":\n\n' +
        '• **aniga** — I\n' +
        '• **adiga** — you (one person)\n' +
        '• **isaga** — he\n' +
        '• **iyada** — she\n' +
        '• **annaga** — we (**not** including you)\n' +
        '• **innaga** — we (**including** you)\n' +
        '• **idinka** — you (more than one)\n' +
        '• **iyaga** — they\n\n' +
        'Two things English speakers should notice.\n\n' +
        '**Somali splits "we".** **Annaga** excludes the listener — "we, but not you". **Innaga** includes them — "we, you and I". English makes you guess; Somali makes you choose.\n\n' +
        '**"They" has no gender.** **Iyaga** covers any group. There is no separate feminine "they".',
    },
    {
      id: '4-teach-short',
      type: 'teach',
      title: 'The short subject pronouns',
      content:
        'Alongside those, Somali has a set of short pronouns that sit next to the sentence signal:\n\n' +
        '• **aan** — I\n' +
        '• **aad** — you\n' +
        '• **uu** — he\n' +
        '• **ay** — she / they\n\n' +
        'You will see these fused onto **waa**, the statement signal, in the next unit — **waa + uu** becomes **wuu**.\n\n' +
        'For now just recognise them. They are short, they are everywhere, and they are not the same words as **aniga / adiga / isaga / iyada**.',
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
          '**Annaga** is the exclusive "we" — it means "us, not you". **Innaga** would wrongly include your friend in a trip they did not go on.',
      },
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
      },
    },
    {
      id: '4-teach-subject',
      type: 'teach',
      title: 'Marking the subject',
      content:
        'Somali flags which noun phrase is the **subject** — the doer. When a word ending in **-a** becomes the subject, that **-a** changes to **-u**:\n\n' +
        '• **wiilka** (the boy) → **Wiilku** waa macallin. — *The boy is a teacher.*\n' +
        '• **aniga** (I) → **Anigu**...\n\n' +
        'Only the **last word** of the subject phrase takes the marker, and only the subject gets it. In **Wiilku waa macallin**, the word **macallin** is what the boy *is*, not the doer — so it stays plain.\n\n' +
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
          'As the subject, **wiilka** becomes **Wiilku**: the final -a shifts to -u. **Wiilku waa macallin** — "The boy is a teacher."',
      },
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
          'It is not the subject — it is what the boy is',
          'It is feminine, so it takes no ending',
          'Ending markers are optional on the last word',
          'It is a borrowed word, so it never changes',
        ],
        correctAnswer: 'It is not the subject — it is what the boy is',
        hint: 'Only one noun phrase in a sentence is the doer. Which one is it here?',
        explanation:
          'Only the **subject** takes the marker. **Wiilku** is the subject; **macallin** describes what he is, so it stays in its bare form — which also means "a teacher", since Somali has no word for "a".',
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
          '**Wiilku waa macallin.** Subject (Wiilku) → signal (waa) → what he is (macallin). That order — WHO then SIGNAL then the rest — is the shape of the whole language.',
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
        hint: 'This is the inclusive one — the "we" that pulls the listener in.',
        explanation:
          '**Innaga** is the inclusive "we", meaning "you and I". **Annaga** would exclude the person you are speaking to.',
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

export const AUTHORED_LESSONS: Lesson[] = [LESSON_1, LESSON_2, LESSON_3, LESSON_4];

/** Highest built lesson id. Only built lessons appear here — never stubs. */
export const MAX_LESSON_ID = AUTHORED_LESSONS.length;

/** Lesson summaries for navigation. Derived, so it cannot drift from the content. */
export const LESSON_LIST: LessonSummary[] = AUTHORED_LESSONS.map((lesson) => ({
  lessonId: lesson.id,
  title: lesson.title,
  cardCount: lesson.cards.length,
}));

export function getLessonContent(lessonId: number): Lesson | undefined {
  return AUTHORED_LESSONS.find((l) => l.id === lessonId);
}
