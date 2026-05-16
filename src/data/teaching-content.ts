/**
 * Teaching Content — Card-based lesson material for all 30 lessons.
 *
 * Each lesson has: intro → teach cards → practice cards → summary.
 * All content sourced from "Colloquial Somali" by Martin Orwin.
 */

export interface TeachExample {
  somali: string;
  english: string;
}

export interface PracticeExercise {
  type: 'multiple_choice' | 'fill_blank' | 'matching';
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

export interface TeachingCard {
  type: 'intro' | 'teach' | 'practice' | 'summary';
  conceptBadge?: string;
  somaliText?: string;
  englishText?: string;
  explanation?: string;
  pronunciation?: string;
  examples?: TeachExample[];
  tip?: string;
  culturalNote?: string;
  bullets?: string[];
  takeaways?: string[];
  exercise?: PracticeExercise;
}

export interface LessonContent {
  lessonId: number;
  title: string;
  cards: TeachingCard[];
}

/* ─────────────────────────────────────────────────────────────────────────── */

const lessons: Record<number, LessonContent> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL 1 — FOUNDATIONS
  // ═══════════════════════════════════════════════════════════════════════════

  1: {
    lessonId: 1,
    title: 'The Somali Alphabet',
    cards: [
      {
        type: 'intro',
        title: 'The Somali Alphabet',
        bullets: [
          'Learn the 21 consonants and 5 vowels of Somali',
          'Master the special guttural sounds: x, c, q',
          'Understand digraphs: dh, kh, sh',
          'Practice pronunciation with real words',
        ],
        culturalNote:
          'Somali has used the Latin alphabet since 1972, when the revolutionary government replaced Arabic and Osmanya scripts. This made literacy accessible to all Somalis.',
      },
      {
        type: 'teach',
        conceptBadge: "Consonant Sounds",
        somaliText: 'b  t  j  x  q',
        englishText: 'Basic consonants',
        explanation:
          'Somali has 21 consonants. Most are familiar from English: b, d, f, g, h, j, k, l, m, n, r, s, sh, t, w, y. The tricky ones are the gutturals.',
        pronunciation: 'b as in "bat", t as in "top", j as in "jump"',
        examples: [
          { somali: 'bariis', english: 'rice' },
          { somali: 'jaamaco', english: 'university' },
          { somali: 'tallaab', english: 'step' },
        ],
        tip: 'Start with familiar sounds. Most Somali consonants are the same as English.',
      },
      {
        type: 'teach',
        conceptBadge: "The Guttural 'x'",
        somaliText: 'x',
        englishText: 'voiceless pharyngeal fricative /ħ/',
        explanation:
          "The letter x is the most distinctive sound in Somali. It's a voiceless pharyngeal fricative — produced deep in the throat, between the vocal cords and the uvula. It sounds like you're gently clearing your throat.",
        pronunciation: 'like "ch" in German "Bach" or Scottish "loch"',
        examples: [
          { somali: 'xayawaan', english: 'animal' },
          { somali: 'xaruuf', english: 'letter' },
          { somali: 'xoolo', english: 'livestock' },
          { somali: 'xaggee', english: 'where' },
        ],
        tip: 'Think of clearing your throat gently — that is the x sound!',
      },
      {
        type: 'teach',
        conceptBadge: "The Guttural 'c'",
        somaliText: 'c',
        englishText: 'voiced pharyngeal fricative /ʕ/',
        explanation:
          "The letter c represents the voiced pharyngeal fricative — like the Arabic 'ayn (ع). It's produced deep in the throat with a slight constriction. If you know Arabic, this is the same as ع.",
        pronunciation: 'like Arabic \'ayn (ع) — a deep throaty sound',
        examples: [
          { somali: 'cunto', english: 'food' },
          { somali: 'caano', english: 'milk' },
          { somali: 'cali', english: 'Ali (name)' },
        ],
        tip: 'If you speak Arabic, this is the same as ع (ayn). If not, start with a deep "ah" sound and constrict your throat.',
      },
      {
        type: 'teach',
        conceptBadge: "The Guttural 'q'",
        somaliText: 'q',
        englishText: 'voiceless uvular stop /q/',
        explanation:
          "The letter q is a voiceless uvular stop — like a "k" but produced further back in the throat, at the uvula. It's the same sound as in Arabic ق (qaf).",
        pronunciation: 'like "k" but further back in the throat, at the uvula',
        examples: [
          { somali: 'qof', english: 'person' },
          { somali: 'qoraal', english: 'writing' },
          { somali: 'qado', english: 'lunch' },
        ],
        tip: 'Say "k" but push the contact point back toward your uvula. If you know Arabic, it is the same as ق.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'Which letter represents a pharyngeal (throat) sound?',
          options: ['b', 'x', 't', 'n'],
          correctAnswer: 'x',
          hint: 'This letter sounds like clearing your throat or the "ch" in Scottish "loch".',
          explanation:
            'The letter x is the pharyngeal fricative — a sound produced deep in the throat between the vocal cords and the uvula.',
        },
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'Which Somali letter corresponds to the Arabic ع (ayn)?',
          options: ['x', 'q', 'c', 'kh'],
          correctAnswer: 'c',
          hint: 'Arabic ع is a voiced pharyngeal fricative. Which Somali letter has the same sound?',
          explanation:
            "The letter c represents the voiced pharyngeal fricative /ʕ/, which is the same sound as Arabic ع (ayn). It's pronounced deep in the throat.",
        },
      },
      {
        type: 'summary',
        title: 'You learned the Somali Alphabet!',
        takeaways: [
          'Somali uses 21 consonants + 5 vowels (a, e, i, o, u)',
          'x = voiceless pharyngeal fricative (like clearing your throat)',
          'c = voiced pharyngeal fricative (like Arabic ع)',
          'q = voiceless uvular stop (like Arabic ق)',
          'dh, kh, sh are digraphs (two letters, one sound)',
        ],
      },
    ],
  },

  2: {
    lessonId: 2,
    title: 'Greetings & Introductions',
    cards: [
      {
        type: 'intro',
        title: 'Greetings & Introductions',
        bullets: [
          'Learn essential Somali greetings',
          'Master the greeting exchange pattern',
          'Understand formal vs informal greetings',
          'Learn the vocative form (calling someone)',
        ],
        culturalNote:
          'Greetings in Somali culture are elaborate and important. It is considered rude to rush through greetings or skip them entirely. Taking time to ask about family, health, and business is expected.',
      },
      {
        type: 'teach',
        conceptBadge: 'Essential Greeting',
        somaliText: 'Iska warran',
        englishText: 'How are you? (What is the news?)',
        explanation:
          "'Iska warran' literally means 'What is the news?' but functions as the universal Somali greeting. It can be used at any time of day with anyone.",
        pronunciation: 'is-ka war-ran',
        examples: [
          { somali: 'Iska warran?', english: 'How are you?' },
          { somali: 'Nabad. Iska warran?', english: 'I am fine. How are you?' },
        ],
        tip: 'Use this with everyone — friends, strangers, elders. It is the safest greeting.',
      },
      {
        type: 'teach',
        conceptBadge: 'The Response',
        somaliText: 'Nabad',
        englishText: 'Peace / I am fine',
        explanation:
          "'Nabad' means 'peace' and is the standard response to 'Iska warran?' It reflects the cultural value placed on peace and well-being. You can also say 'Nabad weeye' (It is peace) for emphasis.",
        pronunciation: 'na-bad',
        examples: [
          { somali: '— Iska warran?\n— Nabad.', english: '— How are you?\n— I am fine.' },
          { somali: 'Nabad weeye, mahadsanid.', english: 'I am fine, thank you.' },
        ],
        tip: 'Saying "Nabad" connects you to a deep cultural value — peace (nabad) is central to Somali identity.',
      },
      {
        type: 'teach',
        conceptBadge: 'Time-Based Greetings',
        somaliText: 'Subax wanaagsan',
        englishText: 'Good morning',
        explanation:
          'Somali has time-specific greetings like English. These are used in more formal settings or with people you do not know well.',
        pronunciation: 'su-bax wa-naag-san',
        examples: [
          { somali: 'Subax wanaagsan', english: 'Good morning' },
          { somali: 'Habeen wanaagsan', english: 'Good night' },
          { somali: 'Galab wanaagsan', english: 'Good afternoon' },
        ],
        tip: 'Subax = morning, Galab = afternoon, Habeen = night. Wanaagsan = good.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'How do you respond to "Iska warran?"',
          options: ['Subax wanaagsan', 'Nabad', 'Iska warran', 'Habeen wanaagsan'],
          correctAnswer: 'Nabad',
          hint: 'This word means "peace" and is the standard reply to any greeting asking how you are.',
          explanation:
            "'Nabad' means 'peace' and is the universal response to 'Iska warran?' (How are you?). It reflects the cultural importance of peace in Somali society.",
        },
      },
      {
        type: 'practice',
        exercise: {
          type: 'fill_blank',
          question: 'Complete: "_____ wanaagsan" means "Good morning"',
          options: ['Subax', 'Habeen', 'Galab', 'Nabad'],
          correctAnswer: 'Subax',
          hint: 'This word means "morning" in Somali.',
          explanation: '"Subax" means morning, so "Subax wanaagsan" = "Good morning". Similarly, "Habeen wanaagsan" = "Good night" and "Galab wanaagsan" = "Good afternoon".',
        },
      },
      {
        type: 'summary',
        title: 'You learned Somali Greetings!',
        takeaways: [
          'Iska warran = How are you? (universal greeting)',
          'Nabad = I am fine / Peace (standard response)',
          'Subax wanaagsan = Good morning',
          'Habeen wanaagsan = Good night',
          'Greetings are culturally important — never rush them!',
        ],
      },
    ],
  },

  3: {
    lessonId: 3,
    title: 'Basic Sounds & Pronunciation',
    cards: [
      {
        type: 'intro',
        title: 'Basic Sounds & Pronunciation',
        bullets: [
          'Learn vowel sounds: a, e, i, o, u',
          'Understand stress-tone patterns (see-saw)',
          'Practice consonant clusters',
          'Master the penultimate stress rule',
        ],
        culturalNote:
          'Somali is a tone language with a distinctive "see-saw" stress pattern. Getting the stress right makes you sound natural — getting it wrong can change the meaning of words!',
      },
      {
        type: 'teach',
        conceptBadge: 'Vowel Sounds',
        somaliText: 'a  e  i  o  u',
        englishText: 'The five Somali vowels',
        explanation:
          'Somali has five vowels, similar to many European languages. Each has a short and long version. Long vowels are held about twice as long and are written as double letters: aa, ee, ii, oo, uu.',
        pronunciation: 'a as in "father", e as in "bed", i as in "see", o as in "go", u as in "food"',
        examples: [
          { somali: 'ab', english: 'father (short a)' },
          { somali: 'aabbe', english: 'father (long aa)' },
          { somali: 'in', english: 'this (short i)' },
          { somali: 'iin', english: 'milk (long ii)' },
        ],
        tip: 'Long vowels (aa, ee, ii, oo, uu) are crucial — they can change the meaning of a word completely!',
      },
      {
        type: 'teach',
        conceptBadge: 'The See-Saw Pattern',
        somaliText: 'SOmalia → soMAlia',
        englishText: 'Penultimate stress with alternating tones',
        explanation:
          'Somali has a distinctive stress pattern: the stress falls on the second-to-last syllable (penultimate). But more than that, there is an alternating "see-saw" pattern where stressed and unstressed syllables alternate throughout the word.',
        pronunciation: 'High-low-high-low pattern across syllables',
        examples: [
          { somali: 'waLaal', english: 'brother (wa-LAAL: penultimate stress)' },
          { somali: 'soMAli', english: 'Somali (so-MA-li: see-saw pattern)' },
          { somali: 'dUkaan', english: 'shop (du-KAAN: penultimate stress)' },
        ],
        tip: 'Stress the second-to-last syllable and let the others alternate up and down like a see-saw.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'In Somali, which syllable typically carries the main stress?',
          options: ['First syllable', 'Second-to-last syllable', 'Last syllable', 'Every other syllable'],
          correctAnswer: 'Second-to-last syllable',
          hint: 'Think "penultimate" — the syllable right before the last one.',
          explanation:
            'Somali stress falls on the penultimate (second-to-last) syllable. This is consistent across most words. Combined with the alternating see-saw tone pattern, it gives Somali its distinctive rhythm.',
        },
      },
      {
        type: 'summary',
        title: 'You learned Somali Pronunciation!',
        takeaways: [
          '5 vowels: a, e, i, o, u (each has short and long versions)',
          'Long vowels are written double: aa, ee, ii, oo, uu',
          'Stress falls on the penultimate (second-to-last) syllable',
          'The see-saw pattern creates an alternating rhythm',
          'Getting stress right makes you sound natural!',
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL 2 — NOUN SYSTEM
  // ═══════════════════════════════════════════════════════════════════════════

  4: {
    lessonId: 4,
    title: 'Noun Gender',
    cards: [
      {
        type: 'intro',
        title: 'Noun Gender',
        bullets: [
          'Learn masculine and feminine noun categories',
          'Understand that gender is not always predictable',
          'Learn common patterns for guessing gender',
          'See how gender affects article and plural forms',
        ],
        culturalNote:
          'Unlike many European languages, Somali noun gender does not follow obvious patterns. However, animate nouns (people, animals) usually match natural gender — and this affects how you form plurals and use articles.',
      },
      {
        type: 'teach',
        conceptBadge: 'Masculine Nouns',
        somaliText: 'nin, wiil, guri, naag',
        englishText: 'masculine and feminine nouns',
        explanation:
          'Somali nouns have grammatical gender: masculine or feminine. For animate nouns (people, animals), gender usually matches natural gender. For inanimate nouns, gender is somewhat arbitrary but there are patterns.',
        pronunciation: 'nin (man), wiil (boy), guri (house), naag (woman)',
        examples: [
          { somali: 'nin', english: 'man (masc.)' },
          { somali: 'naag', english: 'woman (fem.)' },
          { somali: 'wiil', english: 'boy (masc.)' },
          { somali: 'gabar', english: 'girl (fem.)' },
        ],
        tip: 'Animate nouns (people, animals) match natural gender. Inanimate nouns (objects, places) have arbitrary gender — you learn them with practice.',
      },
      {
        type: 'teach',
        conceptBadge: 'Gender Patterns',
        somaliText: '-o endings → mostly masc.\n-e endings → mostly fem.',
        englishText: 'Common gender patterns',
        explanation:
          'While Somali gender is largely unpredictable, there are some helpful patterns: nouns ending in -o are often masculine, and nouns ending in -e are often feminine. But always verify — there are exceptions!',
        examples: [
          { somali: 'baabuur', english: 'car (masc., ends in -o sound)' },
          { somali: 'cali', english: 'Ali (masc. name)' },
          { somali: 'hooyo', english: 'mother (fem., exception!)' },
          { somali: 'adeer', english: 'uncle (masc.)' },
        ],
        tip: 'Do not rely solely on endings — always learn the gender with the noun. The definite article will help you remember (ka for masc, ta for fem).',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'In Somali, the noun "naag" (woman) is:',
          options: ['Masculine', 'Feminine', 'Neuter (no gender)', 'Depends on context'],
          correctAnswer: 'Feminine',
          hint: 'Animate nouns (people and animals) usually match their natural gender in Somali.',
          explanation:
            'Animate nouns in Somali typically match their natural gender. Since "naag" means "woman," it is a feminine noun. The definite article would be "naagta" (the woman) with the feminine article suffix -ta.',
        },
      },
      {
        type: 'summary',
        title: 'You learned Noun Gender!',
        takeaways: [
          'Somali nouns are masculine or feminine',
          'Animate nouns (people, animals) match natural gender',
          'Inanimate noun gender is somewhat arbitrary',
          'Learn gender with each noun — it affects articles and plurals',
        ],
      },
    ],
  },

  5: {
    lessonId: 5,
    title: 'Definite Article',
    cards: [
      {
        type: 'intro',
        title: 'Definite Article ("the")',
        bullets: [
          'Learn how to say "the" in Somali',
          'Master the masculine article -ka/-ga',
          'Master the feminine article -ta/-da',
          'Understand sound assimilation rules',
        ],
        culturalNote:
          'Unlike English where "the" is a separate word, Somali attaches the article directly to the noun as a suffix. This is very efficient — "the book" is just one word: "buugga".',
      },
      {
        type: 'teach',
        conceptBadge: "Masculine Article: -ka",
        somaliText: 'buug + ka = buugga',
        englishText: 'the book (masc.)',
        explanation:
          'The masculine definite article is -ka. It attaches to the end of masculine nouns. When the noun ends in a vowel, the initial k- assimilates (changes) to match the preceding sound, becoming -ga.',
        pronunciation: 'buug-ka → buug-ga (k becomes g after vowel)',
        examples: [
          { somali: 'buugga', english: 'the book (buug + ka)' },
          { somali: 'guriga', english: 'the house (guri + ka → guriga)' },
          { somali: 'ninka', english: 'the man (nin + ka → ninka)' },
        ],
        tip: 'After a vowel, k becomes g. After a consonant, k stays k. This is called sound assimilation.',
      },
      {
        type: 'teach',
        conceptBadge: "Feminine Article: -ta",
        somaliText: 'naag + ta = naagta',
        englishText: 'the woman (fem.)',
        explanation:
          'The feminine definite article is -ta. Like the masculine article, it attaches as a suffix. After a vowel, the t- can assimilate to d-, becoming -da.',
        pronunciation: 'naag-ta → naag-ta (t stays after consonant)',
        examples: [
          { somali: 'naagta', english: 'the woman (naag + ta)' },
          { somali: 'gabarta', english: 'the girl (gabar + ta → gabarta)' },
          { somali: 'caanada', english: 'the milk (caano + ta → caanada)' },
        ],
        tip: 'The article suffix tells you the gender! -ka/-ga = masculine, -ta/-da = feminine.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'fill_blank',
          question: '"Buug___" means "the book". What is the missing article?',
          options: ['ka', 'ga', 'ta', 'da'],
          correctAnswer: 'ga',
          hint: 'Buug ends in a vowel (g). After a vowel, the masculine article -ka changes to -ga.',
          explanation:
            '"Buug" ends in the consonant "g", so the masculine article attaches as -ga, giving "buugga" (the book). The rule is: after a voiced sound or vowel, -ka becomes -ga.',
        },
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: '"Naagta" means "the woman." What does the -ta ending tell us?',
          options: ['The noun is masculine', 'The noun is feminine', 'The noun is plural', 'The noun is a verb'],
          correctAnswer: 'The noun is feminine',
          hint: 'The article suffix reveals the grammatical gender of the noun.',
          explanation:
            'The suffix -ta (or -da after a vowel) is the feminine definite article. So "naagta" = "naag" (woman) + "ta" (the, feminine). This tells us "naag" is a feminine noun.',
        },
      },
      {
        type: 'summary',
        title: 'You learned the Definite Article!',
        takeaways: [
          'Somali has no word for "the" — it is a suffix',
          'Masculine: -ka (after consonant), -ga (after vowel)',
          'Feminine: -ta (after consonant), -da (after vowel)',
          'The article reveals the noun\'s gender',
          'This is the most important noun skill — everything builds on this!',
        ],
      },
    ],
  },

  6: {
    lessonId: 6,
    title: 'Plural Formation',
    cards: [
      {
        type: 'intro',
        title: 'Plural Formation',
        bullets: [
          'Learn the -o plural pattern',
          'Master the -yaal/-yal pattern',
          'Understand reduplication and vowel changes',
          'Practice with real vocabulary',
        ],
        culturalNote:
          'Somali plural formation is complex — there are multiple patterns and some nouns are unpredictable. But the most common pattern is simply adding -o, which covers a majority of nouns.',
      },
      {
        type: 'teach',
        conceptBadge: "The -o Plural",
        somaliText: 'buug → buugag',
        englishText: 'book → books',
        explanation:
          "The most common plural pattern in Somali is adding -o (with some sound changes). For many nouns, you simply add -o to the singular form. Some nouns add -ag or have a vowel change before adding the plural ending.",
        examples: [
          { somali: 'buug → buugag', english: 'book → books' },
          { somali: 'naag → naago', english: 'woman → women' },
          { somali: 'nin → niman', english: 'man → men' },
          { somali: 'guri → guryo', english: 'house → houses' },
        ],
        tip: 'There is no single rule — Somali plurals must be learned word by word. But -o is the most common pattern.',
      },
      {
        type: 'teach',
        conceptBadge: "The -yaal Plural",
        somaliText: 'arday → ardayaal',
        englishText: 'student → students',
        explanation:
          "Nouns ending in -y often form their plural with -yaal or -yal. This pattern is very common for animate nouns, especially people and professions.",
        examples: [
          { somali: 'arday → ardayaal', english: 'student → students' },
          { somali: 'macallin → macallimiin', english: 'teacher → teachers' },
          { somali: 'saakay → saakayyaal', english: 'visitor → visitors' },
        ],
        tip: 'Person nouns often use -yaal. Watch for the -y ending!',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'What is the plural of "guri" (house)?',
          options: ['guriyo', 'guryo', 'guriyal', 'guriyaal'],
          correctAnswer: 'guryo',
          hint: '"Guri" changes its internal vowel when forming the plural. The -i becomes -y before adding -o.',
          explanation:
            '"Guri" (house) becomes "guryo" (houses). The internal vowel -i- changes to -y- before adding the plural ending -o. This is a common vowel-change pattern in Somali plural formation.',
        },
      },
      {
        type: 'summary',
        title: 'You learned Plural Formation!',
        takeaways: [
          'Most common plural: add -o (with possible sound changes)',
          '-yaal/-yal pattern for nouns ending in -y',
          'Some nouns change internal vowels (guri → guryo)',
          'Some plurals are irregular (nin → niman)',
          'Plurals must often be memorized individually',
        ],
      },
    ],
  },

  7: {
    lessonId: 7,
    title: 'Noun Cases',
    cards: [
      {
        type: 'intro',
        title: 'Noun Cases',
        bullets: [
          'Learn the three noun cases in Somali',
          'Understand subject case (nominative)',
          'Understand object case (accusative)',
          'Learn the genitive case (possession)',
        ],
        culturalNote:
          'Somali noun cases are simpler than many languages — there are only three, and they are marked by tone changes rather than suffixes. This makes Somali grammar more streamlined than Latin, Russian, or German.',
      },
      {
        type: 'teach',
        conceptBadge: 'Three Cases',
        somaliText: 'Subject / Object / Genitive',
        englishText: 'The three Somali noun cases',
        explanation:
          'Somali has three noun cases marked primarily by tone (pitch) changes, not suffixes. The subject case (nominative) is used for the doer of the action. The object case (accusative) is used for the receiver. The genitive case shows possession.',
        examples: [
          { somali: 'Wiilku wuu ciyay', english: 'The boy cried (subject case: -ku)' },
          { somali: 'Waxaan arkiy wiil', english: 'I saw a boy (object case: no suffix)' },
          { somali: 'guriga wiilka', english: "the boy's house (genitive)" },
        ],
        tip: 'The subject case often adds a suffix (-u or -ku). The object case usually has no special marking. The genitive puts the possessor after the possessed.',
      },
      {
        type: 'teach',
        conceptBadge: 'Subject Case Marker',
        somaliText: '-u / -ku',
        englishText: 'Subject/nominative case suffix',
        explanation:
          "The subject case is marked by the suffix -u (or -ku after a vowel). This suffix attaches to the definite article. So 'the boy' as subject becomes 'wiilku' (wiil + ka + u).",
        examples: [
          { somali: 'Wiilku wuu tagay', english: 'The boy went (subject)' },
          { somali: 'Naagtu way cuntay', english: 'The woman ate (subject)' },
          { somali: 'Guriguu wuu weyn yahay', english: 'The house is big (subject)' },
        ],
        tip: 'The -u suffix only appears when the noun is the subject of the sentence AND has the definite article.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'In "Wiilku wuu tagay" (The boy went), what does -ku mark?',
          options: ['Object case', 'Subject case', 'Genitive case', 'Plural'],
          correctAnswer: 'Subject case',
          hint: 'The boy is the one doing the action (going). -ku appears on nouns that are the subject of the sentence.',
          explanation:
            "The suffix -ku (from -ka + -u) marks the subject case. 'Wiilku' = 'wiil' (boy) + 'ka' (the, masc.) + 'u' (subject marker). The boy is the one performing the action, so he gets the subject case marker.",
        },
      },
      {
        type: 'summary',
        title: 'You learned Noun Cases!',
        takeaways: [
          'Somali has 3 cases: subject, object, genitive',
          'Subject case: -u / -ku suffix (the doer)',
          'Object case: usually unmarked (the receiver)',
          'Genitive: possessor comes after possessed',
          'Cases are marked by tone changes and small suffixes',
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL 3 — SENTENCE CORE
  // ═══════════════════════════════════════════════════════════════════════════

  8: {
    lessonId: 8,
    title: 'SOV Word Order',
    cards: [
      {
        type: 'intro',
        title: 'SOV Word Order',
        bullets: [
          'Learn the fundamental Somali sentence structure',
          'Understand Subject-Object-Verb order',
          'Compare with English SVO order',
          'Practice building basic sentences',
        ],
        culturalNote:
          'Somali word order is SOV — Subject-Object-Verb — which is the most common word order in the world (used by Japanese, Korean, Turkish, and many others). The verb always comes at the END of the sentence.',
      },
      {
        type: 'teach',
        conceptBadge: 'SOV Structure',
        somaliText: 'Waxaan bariis cunay',
        englishText: 'I rice ate (= I ate rice)',
        explanation:
          'Somali uses SOV word order: Subject comes first, then Object, then Verb at the end. This is the opposite of English, which uses SVO (Subject-Verb-Object). In Somali, the verb is always the LAST element.',
        examples: [
          { somali: 'Waxaan bariis cunay', english: 'I ate rice (I-rice-ate)' },
          { somali: 'Waxay shaah cabtay', english: 'She drank tea (She-tea-drank)' },
          { somali: 'Wiilku buugga akhriyay', english: 'The boy read the book (Boy-book-read)' },
        ],
        tip: 'English: I ate rice. Somali: I rice ate. Just move the verb to the end!',
      },
      {
        type: 'teach',
        conceptBadge: 'The Focus Marker',
        somaliText: 'Waxaan, Waxaad, Waxay...',
        englishText: 'Focus marker + pronoun combinations',
        explanation:
          "'Wax-' is a focus marker that introduces the object in SOV sentences. It combines with subject pronouns: waxaan (I), waxaad (you), waxay (he/she), etc. This structure is essential for basic sentences.",
        examples: [
          { somali: 'Waxaan cunay', english: 'I ate it (focus + I + ate)' },
          { somali: 'Waxaad aragtay', english: 'You saw it' },
          { somali: 'Waxay keenay', english: 'He/she brought it' },
        ],
        tip: 'Waxaan = wa(x) + aan (I). The focus marker wax- + subject pronoun introduces the object.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'Translate to Somali: "I ate rice" (SOV order)',
          options: [
            'Cunay bariis waxaan',
            'Waxaan bariis cunay',
            'Bariis cunay waxaan',
            'Waxaan cunay bariis',
          ],
          correctAnswer: 'Waxaan bariis cunay',
          hint: 'SOV order: Subject (I/waxaan) + Object (rice/bariis) + Verb (ate/cunay).',
          explanation:
            '"Waxaan bariis cunay" follows SOV order: Waxaan (I, subject) + bariis (rice, object) + cunay (ate, verb). The focus marker wax- combines with the subject pronoun -aan.',
        },
      },
      {
        type: 'summary',
        title: 'You learned SOV Word Order!',
        takeaways: [
          'Somali word order is SOV: Subject-Object-Verb',
          'The verb ALWAYS comes at the end',
          'Use wax- + pronoun to introduce the object',
          'Waxaan = I, Waxaad = You, Waxay = He/She',
          'This is the most important rule in Somali grammar!',
        ],
      },
    ],
  },

  9: {
    lessonId: 9,
    title: 'Personal Pronouns',
    cards: [
      {
        type: 'intro',
        title: 'Personal Pronouns',
        bullets: [
          'Learn independent pronouns (I, you, he, she, etc.)',
          'Learn verbal subject pronouns (aan, aad, uu, ay)',
          'Understand the inclusive/exclusive "we" distinction',
          'Practice pronoun combinations',
        ],
        culturalNote:
          'Somali has two words for "we": "aynu" (inclusive — me + you + others) and "aannu" (exclusive — me + others, not you). This distinction is common in many languages but alien to English speakers.',
      },
      {
        type: 'teach',
        conceptBadge: 'Subject Pronouns',
        somaliText: 'aan, aad, uu, ay',
        englishText: 'I, you (sg), he, she',
        explanation:
          'Somali subject pronouns attach to verbs or combine with focus markers. They are: aan (I), aad (you singular), uu (he), ay (she/they). These are the building blocks of every sentence.',
        pronunciation: 'aan (I), aad (you), uu (he), ay (she/they)',
        examples: [
          { somali: 'Waan cunay', english: 'I ate' },
          { somali: 'Waad cuntay', english: 'You ate' },
          { somali: 'Wuu cunay', english: 'He ate' },
          { somali: 'Way cuntay', english: 'She ate' },
        ],
        tip: 'Notice: waan/waan (I) and waad/waad (you) have slightly different vowel patterns. Practice these!',
      },
      {
        type: 'teach',
        conceptBadge: 'The Two "We"s',
        somaliText: 'aynu vs aannu',
        englishText: 'inclusive we vs exclusive we',
        explanation:
          'Somali distinguishes between inclusive "we" (aynu = me + you + possibly others) and exclusive "we" (aannu = me + others, NOT you). This is a crucial cultural and grammatical distinction.',
        examples: [
          { somali: 'Waynu tagaynaa', english: 'We (you + I) will go' },
          { somali: 'Waannu tagaynaa', english: 'We (my group, not you) will go' },
          { somali: 'Waydin tagteene', english: 'You (plural) went' },
        ],
        tip: 'When including the person you are talking to: use aynu. When excluding them: use aannu.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'You want to say "We are going" including the person you are talking to. Which pronoun?',
          options: ['aannu', 'aynu', 'aydin', 'aad'],
          correctAnswer: 'aynu',
          hint: 'You need the INCLUSIVE "we" — the one that includes the listener.',
          explanation:
            '"Aynu" is the inclusive "we" — it includes the person you are speaking to (me + you + possibly others). "Aannu" would exclude the listener, which would be rude if you mean to include them!',
        },
      },
      {
        type: 'summary',
        title: 'You learned Personal Pronouns!',
        takeaways: [
          'aan = I, aad = you (sg), uu = he, ay = she/they',
          'aynu = we (inclusive — includes listener)',
          'aannu = we (exclusive — excludes listener)',
          'Pronouns attach to verbs or combine with focus markers',
          'The "we" distinction is culturally important!',
        ],
      },
    ],
  },

  10: {
    lessonId: 10,
    title: 'Copula "Waa"',
    cards: [
      {
        type: 'intro',
        title: 'Copula "Waa"',
        bullets: [
          'Learn the copula verb "waa" (is/am/are)',
          'Master waa + pronoun combinations',
          'Understand equational sentences',
          'Practice describing things',
        ],
        culturalNote:
          'The copula "waa" is the glue of Somali sentences. It connects subjects to descriptions, identities, and locations. Mastering waa combinations is essential for even basic conversation.',
      },
      {
        type: 'teach',
        conceptBadge: 'The Copula waa',
        somaliText: 'Waa',
        englishText: 'is / am / are',
        explanation:
          '"Waa" is the Somali copula — it means "is/am/are" and connects a subject to a description or identity. It combines with pronouns: waan (I am), waad (you are), wuu (he is), way (she is).',
        pronunciation: 'wah (short, sharp)',
        examples: [
          { somali: 'Waan fiicanahay', english: 'I am fine' },
          { somali: 'Wuu weyn yahay', english: 'He is big' },
          { somali: 'Way qurux badan tahay', english: 'She is very beautiful' },
        ],
        tip: 'Waan = waa + aan (I am). Waad = waa + aad (you are). Wuu = waa + uu (he is). Way = waa + ay (she is).',
      },
      {
        type: 'teach',
        conceptBadge: 'All Combinations',
        somaliText: 'waan, waad, wuu, way, waannu, waydin',
        englishText: 'All waa + pronoun combinations',
        explanation:
          'Here are all the essential waa combinations. Memorize these — they are used in almost every sentence.',
        examples: [
          { somali: 'Waan', english: 'I am' },
          { somali: 'Waad', english: 'You are (sg)' },
          { somali: 'Wuu', english: 'He is' },
          { somali: 'Way', english: 'She is / They are' },
          { somali: 'Waannu', english: 'We are (excl)' },
          { somali: 'Waydin', english: 'You are (pl)' },
          { somali: 'Way', english: 'They are' },
        ],
        tip: 'These 7 combinations cover every person. Practice saying them until they are automatic.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'fill_blank',
          question: 'Complete: "___ weyn yahay" = "He is big"',
          options: ['Waan', 'Waad', 'Wuu', 'Way'],
          correctAnswer: 'Wuu',
          hint: '"He" in Somali is "uu". Combine with "waa" to get the copula form.',
          explanation:
            '"Wuu" = "waa" (is) + "uu" (he). So "Wuu weyn yahay" = "He is big." The copula waa combines with the subject pronoun to form the complete verb.',
        },
      },
      {
        type: 'summary',
        title: 'You learned the Copula "Waa"!',
        takeaways: [
          'Waa = is/am/are (the copula)',
          'Waan = I am, Waad = You are, Wuu = He is',
          'Way = She is / They are',
          'Waannu = We are, Waydin = You (pl) are',
          'These combinations are essential — memorize them!',
        ],
      },
    ],
  },

  11: {
    lessonId: 11,
    title: 'Negation',
    cards: [
      {
        type: 'intro',
        title: 'Negation',
        bullets: [
          'Learn how to make sentences negative',
          'Master the interrogative "ma"',
          'Understand negative declarative forms',
          'Practice negative sentences',
        ],
        culturalNote:
          'Somali negation is elegant — one particle changes a whole sentence. The interrogative "ma" is also used to form yes/no questions, making it doubly useful.',
      },
      {
        type: 'teach',
        conceptBadge: 'Negative Particle "ma"',
        somaliText: 'ma ... ee/ayn',
        englishText: 'not (negation pattern)',
        explanation:
          'To negate a sentence in Somali, you add the particle "ma" before the verb and a negative suffix (-ee, -ayn, or similar) after it. The exact suffix depends on the tense and person.',
        examples: [
          { somali: 'Waan cunay', english: 'I ate' },
          { somali: 'Ma cunayn', english: 'I did not eat' },
          { somali: 'Wuu tagay', english: 'He went' },
          { somali: 'Ma tegin', english: 'He did not go' },
        ],
        tip: 'Compare positive and negative: cunay → cunayn (ate → did not eat). The -n ending marks negation in the past tense.',
      },
      {
        type: 'teach',
        conceptBadge: 'Yes/No Questions with "miy"',
        somaliText: 'Miy-aan? Miy-aad?',
        englishText: 'Interrogative pronoun forms',
        explanation:
          '"Ma" (or "miy-") is also used to form yes/no questions. It combines with pronouns: miy-aan (Did I?), miy-aad (Did you?), miy-uu (Did he?), miy-ay (Did she?).',
        examples: [
          { somali: 'Miyaad cuntay?', english: 'Did you eat?' },
          { somali: 'Miyuu tagay?', english: 'Did he go?' },
          { somali: 'Miyay akhriyay?', english: 'Did she read?' },
        ],
        tip: 'Yes/no questions start with Miy- + pronoun. The answer is just the positive form: "Haa" (Yes) or repeat the verb positively.',
      },
      {
        type: 'practice',
        exercise: {
          type: 'multiple_choice',
          question: 'How do you say "I did not eat"?',
          options: ['Waan cunay', 'Ma cunayn', 'Miyaan cunay', 'Waan cunayn'],
          correctAnswer: 'Ma cunayn',
          hint: 'Negation uses "ma" + verb + negative suffix. For past tense, the suffix is -ayn or -in.',
          explanation:
            '"Ma cunayn" = "ma" (negative particle) + "cunay" (ate) + "n" (negative suffix). The pattern is: ma + verb stem + negative ending. This is the standard past tense negation.',
        },
      },
      {
        type: 'summary',
        title: 'You learned Negation!',
        takeaways: [
          'Negation: ma + verb + negative suffix',
          'Past tense negative suffix: -n / -ayn',
          '"Ma cunayn" = I did not eat',
          'Yes/no questions: Miy- + pronoun + verb',
          'One particle (ma) handles both negation AND questions!',
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVELS 4-8 — TEACHING CONTENT (condensed)
  // ═══════════════════════════════════════════════════════════════════════════

  12: {
    lessonId: 12,
    title: 'Focus Markers: baa',
    cards: [
      {
        type: 'intro',
        title: 'Focus Marker: baa',
        bullets: ['Learn how baa emphasizes what comes BEFORE it', 'Understand focus vs. neutral sentences', 'Practice placing baa correctly'],
        culturalNote: 'Focus markers are what make Somali sound natural. Native speakers use them constantly to emphasize different parts of their sentences.',
      },
      { type: 'teach', conceptBadge: "The Focus Marker 'baa'", somaliText: 'ALI baa tagay', englishText: 'It was ALI who went (emphasis on Ali)', explanation: "The focus marker 'baa' emphasizes the word or phrase that comes BEFORE it. Whatever precedes baa is the focused element — the new information being highlighted.", examples: [{ somali: 'ALI baa tagay', english: 'It was ALI who went' }, { somali: 'GURIGA baa wuu weyn yahay', english: 'It is the HOUSE that is big' }], tip: 'baa emphasizes what comes BEFORE it. If you want to emphasize the subject, put baa right after it.' },
      { type: 'practice', exercise: { type: 'multiple_choice', question: 'In "ALI baa tagay", what is being emphasized?', options: ['The action (going)', 'The subject (Ali)', 'The time', 'The location'], correctAnswer: 'The subject (Ali)', hint: 'The focus marker baa emphasizes whatever comes immediately BEFORE it.', explanation: "'ALI baa tagay' emphasizes ALI — it means 'It was ALI (and not someone else) who went.' The word before baa is always the focused element." } },
      { type: 'summary', title: 'You learned Focus Marker baa!', takeaways: ['baa emphasizes what comes BEFORE it', 'ALI baa tagay = It was ALI who went', 'Use baa to highlight the subject or object', 'Focus markers make Somali sound natural!'] },
    ],
  },

  13: {
    lessonId: 13,
    title: 'Focus Markers: ayaa',
    cards: [
      { type: 'intro', title: 'Focus Marker: ayaa', bullets: ['Learn how ayaa emphasizes what comes AFTER it', 'Compare baa vs ayaa', 'Master choosing the right focus marker'], culturalNote: 'baa and ayaa are the two most important focus markers. They look similar but work in opposite ways — getting them right is a major milestone.' },
      { type: 'teach', conceptBadge: "The Focus Marker 'ayaa'", somaliText: 'Ali ayaa TAGAY', englishText: 'Ali WENT (emphasis on the action)', explanation: "Unlike baa (which emphasizes what comes before), ayaa emphasizes what comes AFTER it. 'Ali ayaa TAGAY' emphasizes the action of GOING — it means 'What Ali did was GO (not stay).'", examples: [{ somali: 'Ali ayaa TAGAY', english: 'What Ali did was GO' }, { somali: 'Bariis ayaa CUNAY', english: 'What I ate was RICE' }], tip: 'ayaa emphasizes what comes AFTER it. baa emphasizes what comes BEFORE it. They are opposites!' },
      { type: 'teach', conceptBadge: 'baa vs ayaa', somaliText: 'ALI baa tagay\nAli ayaa TAGAY', englishText: 'Two different emphases', explanation: 'Same words, different emphasis:\n• ALI baa tagay = It was ALI who went (not Omar)\n• Ali ayaa TAGAY = Ali WENT (he did not stay)', examples: [{ somali: 'ALI baa tagay', english: 'It was ALI (focus: who)' }, { somali: 'Ali ayaa TAGAY', english: 'Ali WENT (focus: action)' }], tip: 'Think: baa looks BACK, ayaa looks FORWARD. baa → before, ayaa → after.' },
      { type: 'practice', exercise: { type: 'multiple_choice', question: 'You want to say "What she did was READ" (emphasis on reading). Which marker?', options: ['baa', 'ayaa', 'waa', 'ma'], correctAnswer: 'ayaa', hint: 'You want to emphasize what comes AFTER the marker (the action of reading). Which marker looks forward?', explanation: '"Ayaa" emphasizes what comes AFTER it. So "Way ayaa AKHRIYAY" means "What she did was READ." The focus is on the action (akhriyay = read), which comes after ayaa.' } },
      { type: 'summary', title: 'You learned Focus Marker ayaa!', takeaways: ['ayaa emphasizes what comes AFTER it', 'baa emphasizes what comes BEFORE it', 'They are opposites!', 'Ali ayaa TAGAY = Ali WENT (focus on action)'] },
    ],
  },

  14: {
    lessonId: 14,
    title: 'Question Words',
    cards: [
      { type: 'intro', title: 'Question Words', bullets: ['Learn the main Somali question words', 'Master maxay, kuma, sidee, goorma, xagee', 'Practice forming questions'], culturalNote: 'Somali question words are essential for conversation. They are short and easy to memorize — master these 5 and you can ask almost anything.' },
      { type: 'teach', conceptBadge: 'The 5 Question Words', somaliText: 'maxay, kuma, sidee, goorma, xagee', englishText: 'what, who, how, when, where', explanation: 'Somali has 5 core question words: maxay (what), kuma (who), sidee (how), goorma (when), xagee (where). These combine with the focus marker system.', examples: [{ somali: 'Maxay tahay?', english: 'What is it?' }, { somali: 'Kuma waa?', english: 'Who is it?' }, { somali: 'Sidee ku tahay?', english: 'How are you?' }, { somali: 'Goorma?', english: 'When?' }, { somali: 'Xagee?', english: 'Where?' }], tip: 'These 5 words cover almost every question. Combine them with focus markers for natural-sounding questions.' },
      { type: 'practice', exercise: { type: 'matching', question: 'Match the Somali question word to its English meaning', options: ['maxay-what', 'kuma-who', 'sidee-how', 'goorma-when', 'xagee-where'], correctAnswer: 'maxay-what,kuma-who,sidee-how,goorma-when,xagee-where', hint: 'Max- sounds like "what" (maximum = what is the most). Xagee has the guttural x — think "where in the throat?"', explanation: 'Maxay = what, kuma = who, sidee = how, goorma = when, xagee = where. These are the 5 essential question words in Somali.' } },
      { type: 'summary', title: 'You learned Question Words!', takeaways: ['maxay = what, kuma = who, sidee = how', 'goorma = when, xagee = where', '5 words cover almost every question', 'Combine with focus markers for natural questions'] },
    ],
  },

  15: {
    lessonId: 15,
    title: 'Yes/No Questions',
    cards: [
      { type: 'intro', title: 'Yes/No Questions', bullets: ['Learn to form yes/no questions', 'Master the miy- prefix', 'Understand the see-saw stress-tone pattern in questions'], culturalNote: 'In Somali culture, direct "yes/no" questions are considered blunt. Often people phrase questions indirectly. But grammatically, the miy- prefix is essential.' },
      { type: 'teach', conceptBadge: 'Forming Yes/No Questions', somaliText: 'Miyaad cuntay?', englishText: 'Did you eat?', explanation: 'Yes/no questions use the prefix "miy-" combined with a pronoun: miy-aan (did I), miy-aad (did you), miy-uu (did he), miy-ay (did she). The sentence structure is otherwise the same.', examples: [{ somali: 'Miyaad cuntay?', english: 'Did you eat?' }, { somali: 'Miyuu tagay?', english: 'Did he go?' }, { somali: 'Miyay akhriyay?', english: 'Did she read?' }], tip: 'Just add miy- before the pronoun. Miy+aad = Did you? Miy+uu = Did he? Miy+ay = Did she?' },
      { type: 'practice', exercise: { type: 'multiple_choice', question: 'How do you ask "Did he go?"', options: ['Wuu tagay', 'Miyuu tagay', 'Ma tagay', 'Tagay miyuu'], correctAnswer: 'Miyuu tagay', hint: 'Yes/no questions use miy- + pronoun + verb. "He" is uu.', explanation: '"Miyuu tagay?" = "Miy-" (question prefix) + "uu" (he) + "tagay" (went). This is the standard pattern for yes/no questions in the past tense.' } },
      { type: 'summary', title: 'You learned Yes/No Questions!', takeaways: ['Yes/no questions use miy- + pronoun', 'Miyaad cuntay? = Did you eat?', 'Miyuu tagay? = Did he go?', 'The answer is the positive form or "haa" (yes)'] },
    ],
  },

  16: {
    lessonId: 16,
    title: 'Interrogative Pronouns',
    cards: [
      { type: 'intro', title: 'Interrogative Pronouns', bullets: ['Learn combined question forms', 'Master miy-aan, miy-aad, miy-uu, miy-ay', 'Practice in full sentences'], culturalNote: 'Somali combines the question particle with pronouns to create interrogative forms. This is efficient — one word does the job of English "did + pronoun."' },
      { type: 'teach', conceptBadge: 'All Forms', somaliText: 'miy-aan, miy-aad, miy-uu, miy-ay, miy-aynu', englishText: 'did I, did you, did he, did she, did we', explanation: 'The full set of interrogative pronoun combinations. These are used to start yes/no questions.', examples: [{ somali: 'Miyaan cunay?', english: 'Did I eat?' }, { somali: 'Miyaad cuntay?', english: 'Did you eat?' }, { somali: 'Miyuu cunay?', english: 'Did he eat?' }, { somali: 'Miyay cuntay?', english: 'Did she eat?' }, { somali: 'Miyaynu cunay?', english: 'Did we eat?' }], tip: 'Miy- + any pronoun = question form. Memorize these 5 and you can ask anyone anything.' },
      { type: 'practice', exercise: { type: 'fill_blank', question: 'Complete: "_____ tagay?" = "Did she go?"', options: ['Miyaan', 'Miyaad', 'Miyuu', 'Miyay'], correctAnswer: 'Miyay', hint: '"She" in Somali is "ay". Combine with "miy-" to form the question.', explanation: '"Miyay" = "miy-" (question) + "ay" (she). "Miyay tagay?" = "Did she go?" The pattern is always: miy- + subject pronoun + verb.' } },
      { type: 'summary', title: 'You learned Interrogative Pronouns!', takeaways: ['Miy- + pronoun = question form', 'Miy-aan = did I, Miy-aad = did you', 'Miy-uu = did he, Miy-ay = did she', 'Use these to form any yes/no question'] },
    ],
  },

  // Levels 17-30 — compact teaching content
  17: { lessonId: 17, title: 'Verb Conjugations', cards: [ { type: 'intro', title: 'Verb Conjugations', bullets: ['Learn the 3 verb conjugation groups', 'Understand the imperative as base form', 'Practice conjugating common verbs'], culturalNote: 'Somali verbs are organized into 3 conjugation groups based on their final vowel. Knowing which group a verb belongs to lets you predict all its forms.' }, { type: 'teach', conceptBadge: '3 Conjugation Groups', somaliText: 'Group 1: -ay/-ey past\nGroup 2: -aa/-taa present\nGroup 3: Irregular', englishText: 'The 3 Somali verb conjugations', explanation: 'Somali verbs fall into 3 groups:\n1. Past in -ay/-ey (most common): keen → keenay (brought)\n2. Past in -aa/-taa (stative): yahay → ahaa (was)\n3. Irregular: yidhi → yidhi (said)', examples: [{ somali: 'keen → keenay', english: 'bring → brought (Group 1)' }, { somali: 'tag → tagay', english: 'go → went (Group 1)' }, { somali: 'yahay → ahaa', english: 'is → was (Group 2)' }], tip: 'Most verbs are Group 1 (regular -ay/-ey). Learn the irregulars as you encounter them.' }, { type: 'practice', exercise: { type: 'multiple_choice', question: '"Cunay" is the past tense of "cun" (eat). Which conjugation group?', options: ['Group 1 (-ay/-ey)', 'Group 2 (-aa/-taa)', 'Group 3 (irregular)', 'None — it is a noun'], correctAnswer: 'Group 1 (-ay/-ey)', hint: 'The past ends in -ay. Look at the ending to determine the group.', explanation: '"Cunay" ends in -ay, so it is Group 1. Group 1 is the largest and most regular group — verbs ending in -ay/-ey in the past tense.' } }, { type: 'summary', title: 'You learned Verb Conjugations!', takeaways: ['3 conjugation groups based on past tense ending', 'Group 1: -ay/-ey (most common)', 'Group 2: -aa/-taa (stative verbs)', 'Group 3: irregulars (memorize individually)', 'The imperative = base form (no conjugation needed)'] }, ] },

  18: { lessonId: 18, title: 'General Past Tense', cards: [ { type: 'intro', title: 'General Past Tense', bullets: ['Form the past tense with -ay/-ey', 'Learn sound change rules', 'Practice with common verbs'], culturalNote: 'The past tense is the first tense most learners master. The -ay/-ey pattern is consistent and covers most verbs you will encounter.' }, { type: 'teach', conceptBadge: 'Past Tense Formation', somaliText: 'keen → keenay\ntag → tagay\ncun → cunay', englishText: 'Add -ay to the verb stem', explanation: 'The general past tense adds -ay (or -ey after some vowels) to the verb stem. This is the same for all persons — the subject pronoun shows who did it.', examples: [{ somali: 'Waan keenay', english: 'I brought' }, { somali: 'Wuu tagay', english: 'He went' }, { somali: 'Way cuntay', english: 'She ate' }], tip: 'The past tense ending does not change for person — the pronoun (waan, wuu, way) does all the work.' }, { type: 'practice', exercise: { type: 'fill_blank', question: 'What is the past tense of "akhri" (read)?', options: ['akhriyay', 'akhri', 'akhriyeey', 'akhriye'], correctAnswer: 'akhriyay', hint: 'Add -ay to the verb stem. For verbs ending in -i, add -y- first: akhri + y + ay = akhriyay.', explanation: '"Akhriyay" = akhri (read) + y (linking consonant) + ay (past suffix). When the verb stem ends in -i, a -y- is inserted before the past ending.' } }, { type: 'summary', title: 'You learned the Past Tense!', takeaways: ['Add -ay/-ey to the verb stem for past tense', 'Sound changes: t→d, n→l/r in some forms', 'The ending is the same for all persons', 'Subject pronoun shows who performed the action'] }, ] },

  19: { lessonId: 19, title: 'Present Habitual', cards: [ { type: 'intro', title: 'Present Habitual', bullets: ['Form the habitual present with -aa/-taa', 'Express regular actions and habits', 'Compare with past tense forms'], culturalNote: 'The present habitual describes regular, ongoing actions — what you do every day. It is essential for describing routines and habits.' }, { type: 'teach', conceptBadge: 'Habitual Present', somaliText: 'Waan cuntaa', englishText: 'I eat (regularly/habitually)', explanation: 'The present habitual adds -aa (or -taa after some consonants) to the verb stem. It describes regular, habitual actions — not what is happening right now.', examples: [{ somali: 'Waan cuntaa', english: 'I eat (habitually)' }, { somali: 'Wuu akhriyaa', english: 'He reads (regularly)' }, { somali: 'Way tagtaa', english: 'She goes (regularly)' }], tip: '-aa for most verbs, -taa after certain consonants. This tense means "I usually/regularly do X."' }, { type: 'practice', exercise: { type: 'multiple_choice', question: '"Waan cuntaa" means:', options: ['I am eating right now', 'I eat (habitually/regularly)', 'I ate', 'I will eat'], correctAnswer: 'I eat (habitually/regularly)', hint: 'The -aa ending marks the habitual present — regular, ongoing actions. Not right now.', explanation: '"Waan cuntaa" = "waan" (I) + "cun" (eat) + "taa" (habitual present). It means "I eat" as a regular habit, not "I am eating" at this moment.' } }, { type: 'summary', title: 'You learned Present Habitual!', takeaways: ['Habitual present: verb stem + -aa/-taa', 'Describes regular, ongoing actions', 'NOT for actions happening right now', '"Waan cuntaa" = I eat (habitually)'] }, ] },

  20: { lessonId: 20, title: 'Future Tense', cards: [ { type: 'intro', title: 'Future Tense', bullets: ['Form the future with "doon" + infinitive', 'Express plans and intentions', 'Combine with subject pronouns'], culturalNote: 'The Somali future uses the auxiliary "doon" (want/will) — similar to English "going to" or "will." It is straightforward and regular.' }, { type: 'teach', conceptBadge: 'Future Formation', somaliText: 'Waan doonayaa inaan cuno', englishText: 'I will eat', explanation: 'The future tense uses "doon" (will) combined with the infinitive form of the main verb. The pattern is: subject + doon + in + verb (infinitive).', examples: [{ somali: 'Waan doonayaa inaan cuno', english: 'I will eat' }, { somali: 'Wuu doonayaa inuu tago', english: 'He will go' }, { somali: 'Way doonaysaa inay akhristo', english: 'She will read' }], tip: 'Doon + in + infinitive = future. "Inaan" = that I, "inuu" = that he, "inay" = that she.' }, { type: 'practice', exercise: { type: 'fill_blank', question: 'Complete: "Waan doonayaa inaan ___" = "I will eat"', options: ['cuno', 'cunay', 'cuntaa', 'cuni'], correctAnswer: 'cuno', hint: 'After "inaan" (that I), use the infinitive form of the verb. The infinitive of "cun" (eat) is "cuno."', explanation: '"Waan doonayaa inaan cuno" = I will that-I eat (infinitive) = "I will eat." The infinitive form ends in -o.' } }, { type: 'summary', title: 'You learned Future Tense!', takeaways: ['Future = doon + in + infinitive', 'Waan doonayaa inaan cuno = I will eat', 'Infinitive form ends in -o', 'Very regular — no exceptions!'] }, ] },

  21: { lessonId: 21, title: 'Prepositions', cards: [ { type: 'intro', title: 'Prepositions', bullets: ['Learn ka, ku, la, u as clitics', 'Understand how prepositions attach to classifiers', 'Practice with common phrases'], culturalNote: 'Somali prepositions are clitics — they attach to other words rather than standing alone. This makes them very efficient but takes getting used to.' }, { type: 'teach', conceptBadge: 'The 4 Prepositions', somaliText: 'ka (from), ku (in/at), la (with), u (to/for)', englishText: 'The four Somali prepositions', explanation: 'Somali has 4 core prepositions that function as clitics (they attach to other words): ka (from), ku (in/at), la (with), u (to/for). They attach to classifiers like waa, baa, ayaa.', examples: [{ somali: 'Waxaan ka hadlayaa', english: 'I am speaking about (from) it' }, { somali: 'Waxaan ku qoray', english: 'I wrote in it' }, { somali: 'Waxaan la socdaa', english: 'I am going with (him)' }, { somali: 'Waxaan u tagay', english: 'I went to (it)' }], tip: 'These 4 prepositions combine with everything. Practice them with different verbs.' }, { type: 'practice', exercise: { type: 'multiple_choice', question: '"Waxaan ku jiraa" means "I am in it." What does "ku" mean?', options: ['from', 'in/at', 'with', 'to'], correctAnswer: 'in/at', hint: '"Ku" is one of the 4 core prepositions. It indicates location or position.', explanation: '"Ku" means "in" or "at" — it indicates location. "Waxaan ku jiraa" = I am in it. The other prepositions are: ka (from), la (with), u (to/for).' } }, { type: 'summary', title: 'You learned Prepositions!', takeaways: ['4 core prepositions: ka, ku, la, u', 'ka = from, ku = in/at, la = with, u = to/for', 'They function as clitics (attach to other words)', 'Essential for expressing location, direction, and relationships'] }, ] },

  22: { lessonId: 22, title: 'Adjectives', cards: [ { type: 'intro', title: 'Adjectives', bullets: ['Learn how adjectives work in Somali', 'Use "yahay" with predicative adjectives', 'Place adjectives before or after nouns'], culturalNote: 'Somali adjectives are interesting — they often behave like verbs. When you say "He is big," the word "big" acts like a verb, not a static description.' }, { type: 'teach', conceptBadge: 'Predicative Adjectives', somaliText: 'Wuu weyn yahay', englishText: 'He is big', explanation: 'In Somali, adjectives used predicatively (after "is") combine with "yahay" (is). The adjective comes before yahay: Wuu [weyn yahay] = He [is-big].', examples: [{ somali: 'Wuu weyn yahay', english: 'He is big' }, { somali: 'Way yar tahay', english: 'She is small' }, { somali: 'Waan fiicanahay', english: 'I am fine' }], tip: 'Adjective + yahay/tahay/fiicanahay = descriptive sentence. The ending of yahay changes based on the subject pronoun.' }, { type: 'practice', exercise: { type: 'multiple_choice', question: '"Waan fiicanahay" means:', options: ['He is fine', 'I am fine', 'You are fine', 'She is fine'], correctAnswer: 'I am fine', hint: '"Waan" = waa + aan = I am. "Fiicanahay" = fine/am. The waan prefix tells us the subject is "I."', explanation: '"Waan fiicanahay" = "waan" (I am) + "fiicanahay" (fine). The copula combination "waan" clearly marks the first person singular subject.' } }, { type: 'summary', title: 'You learned Adjectives!', takeaways: ['Adjectives combine with yahay (is)', 'Wuu weyn yahay = He is big', 'Adjective position: before yahay', 'The yahay ending changes with the subject'] }, ] },

  23: { lessonId: 23, title: 'Demonstratives', cards: [ { type: 'intro', title: 'Demonstratives', bullets: ['Learn "this" and "that" in Somali', 'Master kan, tan, kuwan, kuwaas', 'Use demonstratives in sentences'], culturalNote: 'Somali demonstratives are simple and regular. They distinguish between near (this) and far (that), and between singular and plural.' }, { type: 'teach', conceptBadge: 'This & That', somaliText: 'kan (this masc.)\ntan (this fem.)\nkuwaas (that masc. pl)', englishText: 'Demonstrative pronouns', explanation: 'Somali demonstratives: kan (this, masc.), tan (this, fem.), kuwan (these, pl), kuwaas (that/those, far). They agree in gender and number with the noun.', examples: [{ somali: 'kan wuu weyn yahay', english: 'this one is big (masc.)' }, { somali: 'tan way fiican tahay', english: 'this one is good (fem.)' }, { somali: 'kuwan way yaryihiin', english: 'these are small (pl.)' }], tip: 'kan = this (masc.), tan = this (fem.), kuwan = these (pl.). Add -aas for "that/those" (far).' }, { type: 'practice', exercise: { type: 'multiple_choice', question: '"Tan" refers to:', options: ['This (masculine)', 'This (feminine)', 'That (masculine)', 'These (plural)'], correctAnswer: 'This (feminine)', hint: '"Tan" ends in -n like "kan" but starts with t- (feminine marker, like the article -ta).', explanation: '"Tan" = this (feminine). The t- prefix marks feminine gender (same as the article -ta). "Kan" = this (masculine) with k- prefix (same as article -ka).' } }, { type: 'summary', title: 'You learned Demonstratives!', takeaways: ['kan = this (masc.), tan = this (fem.)', 'kuwan = these (pl.)', 'Add -aas for "that/those" (far)', 'Demonstratives agree in gender and number'] }, ] },

  24: { lessonId: 24, title: 'Adverbs', cards: [ { type: 'intro', title: 'Adverbs', bullets: ['Learn time, place, and manner adverbs', 'Position adverbs in sentences', 'Common adverb vocabulary'], culturalNote: 'Somali adverbs are straightforward — most are single words placed near the verb. Time adverbs often come at the beginning or end of the sentence.' }, { type: 'teach', conceptBadge: 'Common Adverbs', somaliText: 'hadda, halkan, si fiican, badan', englishText: 'now, here, well, often', explanation: 'Common Somali adverbs: hadda (now), halkan (here), halkaas (there), si fiican (well/well), badan (often/much), maanta (today), shalay (yesterday).', examples: [{ somali: 'Hadda waxaan cunayaa', english: 'Now I am eating' }, { somali: 'Halkan ku joog', english: 'Stay here' }, { somali: 'Waxaan u hadlay si fiican', english: 'I spoke well' }], tip: 'Time adverbs (hadda, maanta, shalay) usually go at the start. Place adverbs go near the verb.' }, { type: 'practice', exercise: { type: 'multiple_choice', question: '"Hadda" means:', options: ['here', 'now', 'there', 'well'], correctAnswer: 'now', hint: '"Ha-" is a common time prefix. "Hadda" is one of the most common time adverbs.', explanation: '"Hadda" = now. It is a time adverb used to indicate the present moment. "Halkan" = here (place), "Halkaas" = there, "Si fiican" = well (manner).' } }, { type: 'summary', title: 'You learned Adverbs!', takeaways: ['hadda = now, halkan = here, halkaas = there', 'si fiican = well, badan = often', 'Time adverbs go at the start of the sentence', 'Place adverbs go near the verb'] }, ] },

  25: { lessonId: 25, title: 'Relative Clauses', cards: [ { type: 'intro', title: 'Relative Clauses', bullets: ['Form relative clauses in Somali', 'Learn the "ee" and "oo" connectors', 'Combine sentences with relative clauses'], culturalNote: 'Relative clauses let you describe nouns with full sentences. They are essential for complex, natural-sounding Somali.' }, { type: 'teach', conceptBadge: 'Relative Clauses', somaliText: 'Ninkii tagay...', englishText: 'The man who went...', explanation: 'Somali relative clauses use special pronoun forms (ninkii, naagtii, etc.) that combine the noun + article + relative marker. The verb follows in normal order.', examples: [{ somali: 'Ninkii tagay...', english: 'The man who went...' }, { somali: 'Naagtii cuntay...', english: 'The woman who ate...' }, { somali: 'Buugga aan akhriyay...', english: 'The book that I read...' }], tip: '-kii/-tii = the one who/that (relative). Ninkii = the man who, Naagtii = the woman who.' }, { type: 'practice', exercise: { type: 'fill_blank', question: '"_____ tagay" = "The man who went"', options: ['Ninka', 'Ninkii', 'Ninku', 'Ninki'], correctAnswer: 'Ninkii', hint: 'The relative form combines the noun + article + relative marker -ii.', explanation: '"Ninkii" = "nin" (man) + "ka" (the) in relative form with "-ii" marker. It means "the man who/that." This is the relative pronoun form used to introduce relative clauses.' } }, { type: 'summary', title: 'You learned Relative Clauses!', takeaways: ['Relative clauses use -kii/-tii forms', 'Ninkii = the man who, Naagtii = the woman who', 'The verb follows in normal SOV order', 'Essential for complex, natural sentences'] }, ] },

  26: { lessonId: 26, title: 'Voice Transformation', cards: [ { type: 'intro', title: 'Voice Transformation', bullets: ['Convert active sentences to passive', 'Learn the passive construction', 'Understand when to use passive voice'], culturalNote: 'The passive voice is used in Somali when the doer is unknown, unimportant, or when the focus is on the action itself rather than who did it.' }, { type: 'teach', conceptBadge: 'Passive Voice', somaliText: 'Bariis baa la cunay', englishText: 'Rice was eaten (by someone)', explanation: 'The passive voice in Somali uses "la" (by someone/people) after the focus marker. The object becomes the subject, and the original subject is omitted or introduced with "la."', examples: [{ somali: 'Bariis baa la cunay', english: 'Rice was eaten' }, { somali: 'Buug baa la akhriyay', english: 'A book was read' }, { somali: 'Guri baa la dhisay', english: 'A house was built' }], tip: 'Active: Waxaan cunay bariis (I ate rice). Passive: Bariis baa la cunay (Rice was eaten). The object moves to the front and "la" marks the passive.' }, { type: 'practice', exercise: { type: 'multiple_choice', question: '"La cunay" in "Bariis baa la cunay" means:', options: ['I ate', 'someone ate (passive)', 'he ate', 'we ate'], correctAnswer: 'someone ate (passive)', hint: '"La" is the passive marker. It indicates an unspecified agent.', explanation: '"La" marks the passive voice with an unspecified agent. "Bariis baa la cunay" = "Rice was eaten (by someone)." The "la" replaces the specific subject.' } }, { type: 'summary', title: 'You learned Voice Transformation!', takeaways: ['Passive uses "la" after the focus marker', 'Object becomes the subject', '"La" = by someone (unspecified agent)', 'Used when the doer is unknown or unimportant'] }, ] },

  27: { lessonId: 27, title: 'Verbal Nouns', cards: [ { type: 'intro', title: 'Verbal Nouns', bullets: ['Form verbal nouns from verbs', 'Learn the -i/-in patterns', 'Use verbal nouns as subjects or objects'], culturalNote: 'Verbal nouns (gerunds) let you talk about actions as things. Instead of saying "I like to read," you say "I like reading" — the verbal noun makes this possible.' }, { type: 'teach', conceptBadge: 'Verbal Noun Formation', somaliText: 'akhri → akhris\ncun → cunto', englishText: 'read → reading\neat → eating/food', explanation: 'Verbal nouns are formed by adding -is, -in, or changing the ending. They turn verbs into nouns that can be used as subjects or objects.', examples: [{ somali: 'Akhris waa fiican tahay', english: 'Reading is good' }, { somali: 'Waxaan jecelahay cunto', english: 'I love food/eating' }, { somali: 'Qoraalka waa muhiim', english: 'Writing is important' }], tip: '-is for action nouns (akhri → akhris = reading), -o for related nouns (cun → cunto = food/eating).' }, { type: 'practice', exercise: { type: 'multiple_choice', question: 'What is the verbal noun of "akhri" (read)?', options: ['akhris', 'akhriyay', 'akhriye', 'akhriyeen'], correctAnswer: 'akhris', hint: 'Verbal nouns often add -is to the verb stem. This turns the action into a thing/concept.', explanation: '"Akhris" = reading (the verbal noun of "akhri"). The suffix -is turns a verb into a noun representing the action. "Akhris waa fiican tahay" = "Reading is good."' } }, { type: 'summary', title: 'You learned Verbal Nouns!', takeaways: ['Verbal nouns turn verbs into nouns', '-is for action nouns (akhris = reading)', 'Used as subjects or objects', '"Cunto" = food (from cun = eat)'] }, ] },

  28: { lessonId: 28, title: 'Conditional Sentences', cards: [ { type: 'intro', title: 'Conditional Sentences', bullets: ['Form if-then sentences in Somali', 'Learn the conditional markers', 'Express hypothetical situations'], culturalNote: 'Conditional sentences let you discuss possibilities, hypotheticals, and consequences. They are essential for nuanced conversation.' }, { type: 'teach', conceptBadge: 'If-Then Construction', somaliText: 'Haddii... waa...', englishText: 'If... then...', explanation: 'Conditional sentences use "haddii" (if) to introduce the condition, followed by the result clause. The verb in the condition clause uses a special form.', examples: [{ somali: 'Haddii uu yimaado, waan farxi doonaa', english: 'If he comes, I will be happy' }, { somali: 'Haddii aad cunto, waan ka hor tagayaa', english: 'If you eat, I will go first' }], tip: '"Haddii" = if. The result clause uses the future form. The condition clause uses the present/habitual form.' }, { type: 'practice', exercise: { type: 'fill_blank', question: '"_____ uu yimaado, waan farxi doonaa" = "If he comes, I will be happy"', options: ['Waa', 'Haddii', 'Ma', 'Baa'], correctAnswer: 'Haddii', hint: 'This word means "if" and introduces conditional clauses.', explanation: '"Haddii" = if. "Haddii uu yimaado" = "If he comes." The result clause uses the future: "waan farxi doonaa" = "I will be happy."' } }, { type: 'summary', title: 'You learned Conditionals!', takeaways: ['Haddii = if (introduces the condition)', 'Result clause uses future tense', 'Condition clause uses present/habitual', 'Essential for nuanced conversation'] }, ] },

  29: { lessonId: 29, title: 'Complex Translation', cards: [ { type: 'intro', title: 'Complex Translation', bullets: ['Combine all grammar concepts', 'Translate complex English sentences', 'Build natural-sounding Somali sentences'], culturalNote: 'Translation is where all your grammar knowledge comes together. Complex sentences require combining focus markers, verb tenses, prepositions, and clauses.' }, { type: 'teach', conceptBadge: 'Putting It All Together', somaliText: 'Waxaan doonayaa inaan akhriyo buugga cusub ee aan ka helay dukaanka', englishText: 'I want to read the new book that I found at the shop', explanation: 'This sentence combines: SOV order (waxaan...buugga...akhriyo), future (doonayaa inaan), relative clause (ee aan ka helay), and preposition (ka = from/at).', examples: [{ somali: 'Waxaan doonayaa inaan akhriyo buugga cusub', english: 'I want to read the new book' }, { somali: 'Ninkii tagay magaalada wuu la hadlay', english: 'The man who went to the city spoke with him' }], tip: 'Break complex sentences into parts: subject → focus marker → object → verb → modifiers. Build from the core SOV structure.' }, { type: 'practice', exercise: { type: 'multiple_choice', question: 'In "Waxaan doonayaa inaan akhriyo buugga cusub", what does "inaan" mean?', options: ['I read', 'that I', 'he reads', 'to read'], correctAnswer: 'that I', hint: '"In" = that, "aan" = I. Together they introduce a subordinate clause.', explanation: '"Inaan" = in (that) + aan (I). It introduces the subordinate clause "inaan akhriyo" = "that I read." This is the standard way to form "I want to [do something]" in Somali.' } }, { type: 'summary', title: 'You learned Complex Translation!', takeaways: ['Combine all grammar skills for translation', 'Break sentences into SOV components', 'Use subordinate clauses with in+pronoun', 'Relative clauses with -kii/-tii forms'] }, ] },

  30: {
    lessonId: 30,
    title: 'Free Composition',
    cards: [
      { type: 'intro', title: 'Free Composition', bullets: ['Write your own Somali sentences', 'Combine all concepts creatively', 'Get feedback on your writing'], culturalNote: 'Free composition is the ultimate goal — expressing your own thoughts in Somali. Start simple and build complexity as you gain confidence.' },
      { type: 'teach', conceptBadge: 'Building Sentences', somaliText: 'Start simple → add complexity', englishText: 'Free composition strategy', explanation: 'Start with simple SOV sentences. Then add:\n1. Focus markers (baa/ayaa) for emphasis\n2. Prepositions (ka, ku, la, u) for detail\n3. Adjectives + yahay for description\n4. Subordinate clauses for complexity', examples: [{ somali: 'Waan fiicanahay.', english: 'I am fine. (simple)' }, { somali: 'Waan fiicanahay maanta.', english: 'I am fine today. (add time)' }, { somali: 'Maanta waxaan cunay bariis.', english: 'Today I ate rice. (add object)' }], tip: 'Start with the basic SOV skeleton, then add one element at a time. Do not try to build complex sentences from scratch!' },
      { type: 'teach', conceptBadge: 'Common Phrases', somaliText: 'Useful expressions for composition', englishText: 'Stock phrases to build around', explanation: 'Memorize these stock phrases as building blocks for your own sentences.', examples: [{ somali: 'Magacaygu waa...', english: 'My name is...' }, { somali: 'Waxaan ka soo jeedaa...', english: 'I am from...' }, { somali: 'Waxaan ku hadlaa...', english: 'I speak...' }, { somali: 'Waxaan jeclahay...', english: 'I like...' }], tip: 'These 4 phrases let you introduce yourself, say where you are from, what language you speak, and what you like. Master these first!' },
      { type: 'practice', exercise: { type: 'fill_blank', question: 'Complete the self-introduction: "Magacaygu waa _____"', options: ['Ahmed', 'waan', 'tagay', 'cunay'], correctAnswer: 'Ahmed', hint: '"Magacaygu waa..." means "My name is..." Fill in your name!', explanation: '"Magacaygu waa Ahmed" = "My name is Ahmed." "Magacaygu" = my name, "waa" = is. This is the standard Somali self-introduction.' } },
      { type: 'summary', title: 'You learned Free Composition!', takeaways: ['Start with simple SOV sentences', 'Add focus markers, prepositions, adjectives', 'Use stock phrases as building blocks', 'You now have all the tools to write in Somali!'] },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────────────────── */

export function getLessonContent(lessonId: number): LessonContent | undefined {
  return lessons[lessonId];
}

export function getTotalCards(lessonId: number): number {
  return lessons[lessonId]?.cards.length ?? 0;
}

export function getCard(lessonId: number, cardIndex: number): TeachingCard | undefined {
  return lessons[lessonId]?.cards[cardIndex];
}

export default lessons;
