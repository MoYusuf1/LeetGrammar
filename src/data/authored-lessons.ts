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
      prompt: 'By the end of this lesson you will be able to read any written Somali word aloud, including the four letters that trip up English speakers.',
    },
    {
      id: '1-predict',
      type: 'predict',
      prompt:
        'Somali is written with the same letters you are reading right now. But three of them never appear in a Somali word at all.\n\n' +
        'Before reading on, have a guess at which three. If nothing comes to mind, guess at what kind of letters they might be.',
    },
    {
      id: '1-teach',
      type: 'teach',
      title: 'The Somali alphabet',
      content:
        'Somali is written in the Latin alphabet: the same letters you already read. Two things are different.\n\n' +
        '**Three letters are missing.** Somali never uses **p**, **v**, or **z**. If you see them, the word is borrowed and unadapted.\n\n' +
        '**Three pairs act as single letters.** These are not two sounds. Each pair is one:\n' +
        '• **dh**: a "d" made with the tongue curled back\n' +
        '• **kh**: a rasp in the back of the throat, like Scottish "loch"\n' +
        '• **sh**: as in English "ship"\n\n' +
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
        // Asks for the SOUND, not the letter. The old version was "which throat
        // letter does it end with?" with **libaax** printed in the question and
        // 'x' among the options, so the answer sat in plain sight and the item
        // tested nothing but eyesight. This is the E10 class the validator warns
        // about and cannot detect.
        question:
          'You just met **libaax** (lion). Its last letter is **x**. What sound does that stand for?',
        options: [
          'a hard, breathy "h" from deep in the throat',
          'the "ks" in English "box"',
          'a tightening in the throat, with no breath',
          'the "sh" in English "ship"',
        ],
        correctAnswer: 'a hard, breathy "h" from deep in the throat',
        hint: 'It is one of the two deep-throat letters. The other one is **c**, and they do different jobs.',
        explanation:
          '**Libaax** ends in **x**: a hard, breathy "h" from deep in the throat. It is not "ks" as in English "box". The definite form is **libaaxa**.',
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
        options: ['two: dh and kh', 'three: dh, kh and sh', 'four: dh, kh, sh and ch', 'five: dh, kh, sh, ph and th'],
        correctAnswer: 'three: dh, kh and sh',
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
          'A doubled vowel means **hold it longer**: aa, ee, ii, oo, uu. That is the only way Somali marks vowel length: there are no accent marks.',
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
          'Like English "k": "Kali"',
          'Like English "s": "Sali"',
          'Like English "ch": "Chali"',
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
        'You can now read these correctly:\n\n**libaax**: lion (throat x)\n**caano**: milk (throat c)\n**gabadh**: girl (the dh pair)\n**buug**: book\n\nNothing here needs memorising. You are just reading.',
    },
    {
      id: '1-summary',
      type: 'summary',
      title: 'What you learned',
      content:
        'Somali uses the Latin alphabet without p, v, z. Three pairs act as single letters: dh, kh, sh. Two letters (c and x) are made deep in the throat and have no English equivalent. Doubled vowels are held longer.',
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
      content: `${BOX}\n\nToday: the WHO box. Nouns, and the one property of them you cannot see.`,
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
      id: '2-predict',
      type: 'predict',
      prompt:
        '**guri** means house. **magaalo** means city. One of them is masculine and the other is feminine, and nothing in the spelling tells you which.\n\n' +
        'Before reading on, where do you think that information is hiding, if not in the word itself?',
    },
    {
      id: '2-teach',
      type: 'teach',
      title: 'Every noun has a gender',
      content:
        'Every Somali noun is either **masculine** or **feminine**. This is a grammar label, not a statement about the world: **buug** (book) is masculine and **kab** (shoe) is feminine.\n\n' +
        'It matters because gender decides the ending you attach when you say "the", which you will learn next lesson. Get the gender wrong and the whole word comes out wrong.\n\n' +
        'Some nouns you can guess from meaning:\n' +
        '• **nin** (man), **wiil** (boy): masculine\n' +
        '• **naag** (woman), **gabadh** (girl): feminine\n\n' +
        'Most you cannot:\n' +
        '• **guri** (house), **buug** (book), **miis** (table): masculine\n' +
        '• **magaalo** (city), **kab** (shoe), **bil** (month): feminine',
    },
    {
      id: '2-example',
      type: 'example',
      title: 'Why you cannot see it',
      content:
        'Somali speakers hear gender in the **tone** of the word. Compare:\n\n' +
        '**inan**: boy (tone falls on the first syllable)\n' +
        '**inan**: girl (tone rises to the last)\n\n' +
        'Same letters. Different word. Different gender.\n\n' +
        'Here is the catch: **Somali does not write tone.** There are no accent marks in ordinary spelling. So on the page these two words are identical, and no spelling rule will ever tell you which is which.\n\n' +
        'This is why gender has to be learned with the word, the way you would learn it in French or German. It is not that Somali is irregular: it is that the writing system leaves the clue out.',
    },
    {
      id: '2-teach-diagnostic',
      type: 'teach',
      title: 'How to find out a noun\'s gender',
      content:
        'Since spelling will not tell you, look at the word\'s **"the" form**: that is where gender shows up:\n\n' +
        '• **wiil** → **wiilka** (the boy): a **k** appears → masculine\n' +
        '• **naag** → **naagta** (the woman): a **t** appears → feminine\n\n' +
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
        options: ['Feminine', 'Masculine', 'Both, depending on context', 'Neither: cities have no gender'],
        correctAnswer: 'Feminine',
        hint: 'The ending contains a d, which is a t-type ending. Which gender takes t-type endings?',
        explanation:
          '**Magaalada** shows a **d** (a t-type ending) so **magaalo** is **feminine**. Every Somali noun has a gender, including inanimate ones like cities.',
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
          'Spoken Somali distinguishes them by **tone**: the boy word and the girl word carry it differently. Written Somali uses no accent marks, so both come out as **inan**. Context, or the "the" form, resolves it.',
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
          '**Kab** (shoe) is feminine: **kabta**. The other three are masculine: **miiska**, **buugga**, **wiilka**.',
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
      prompt: 'You already used these endings as a gender test: wiilka, naagta. Now you will build them yourself.',
    },
    {
      id: '3-promise',
      type: 'promise',
      prompt: 'By the end you will turn any noun you meet into its "the" form, including the ones where the ending changes shape.',
    },
    {
      id: '3-predict',
      type: 'predict',
      prompt:
        '**guri** means house. **guriga** means *the* house.\n\n' +
        'Before reading on, look at those two words and say what happened. Where did "the" go?',
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
        hint: 'After o, the feminine ending becomes -da, and the o itself changes to a.',
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
          'After **dh** the feminine ending is written as just **-a**: gabadh → **gabadha**. The dh itself is pronounced more strongly. (You may also meet **gabar** for "girl", giving **gabarta**: both are correct.)',
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
      id: '4-connect',
      type: 'connect',
      prompt: 'You can name a thing (wiil) and make it definite (wiilka). Now: replacing it with "he", and flagging it as the doer.',
    },
    {
      id: '4-promise',
      type: 'promise',
      prompt: 'By the end you will build a complete, correct Somali sentence: **Wiilku waa macallin.**: "The boy is a teacher."',
    },
    {
      id: '4-predict',
      type: 'predict',
      prompt:
        'English has one word for "we", and it is quietly ambiguous: "we are going" may or may not include the person you are talking to.\n\n' +
        'Somali makes you choose. Before reading on, guess what goes wrong if you pick the wrong one.',
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
          'It is not the subject: it is what the boy is',
          'It is feminine, so it takes no ending',
          'Ending markers are optional on the last word',
          'It is a borrowed word, so it never changes',
        ],
        correctAnswer: 'It is not the subject: it is what the boy is',
        hint: 'Only one noun phrase in a sentence is the doer. Which one is it here?',
        explanation:
          'Only the **subject** takes the marker. **Wiilku** is the subject; **macallin** describes what he is, so it stays in its bare form, which also means "a teacher", since Somali has no word for "a".',
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
      id: '5-connect',
      type: 'connect',
      prompt:
        'You can fill the WHO box: **wiil**, **wiilka**, **Wiilku**, **isaga**. You have also been using one signal all along without naming it: **waa**. Today you meet the other two, and find out what they change.',
    },
    {
      id: '5-promise',
      type: 'promise',
      prompt:
        'By the end you will read two sentences made of **exactly the same words**. One means "SAHRA is greeting her friend". The other means "Sahra is greeting her FRIEND". You will know which is which.',
    },
    {
      id: '5-predict',
      type: 'predict',
      prompt:
        'Here are two real Somali sentences. The words are the same. Only the small word in the middle changes.\n\n' +
        '**Sahra baa salaamaysa saaxiibkeed.**\n' +
        '**Sahra waxa ay salaamaysaa saaxiibkeed.**\n\n' +
        'Both mean "Sahra is greeting her friend". Before reading on, guess what the difference is. English would do it with your **voice**. Somali cannot.',
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
      },
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
        hint: 'It is not the name and not the long word. It is the short one sitting second.',
        explanation:
          '**baa** is the signal. It carries no meaning you could translate on its own: its whole job is to mark that the word before it, **Sahra**, is the one being spotlighted.',
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
      },
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
