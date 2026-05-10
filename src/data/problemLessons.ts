// ============================================================================
// UNIFIED PROBLEM LESSONS — Maps 50 problem IDs to lesson content
// Existing 20 lessons are mapped; 30 new lessons are scaffolded
// Each lesson has exactly ONE exercise and 2-3 test cases in Input/Output format
// ============================================================================

import { lessons as oldLessons, type LessonContent, type TestCase } from './lessons_complete';

function remap(oldId: number, newId: number, newTitle?: string, testCases?: TestCase[]): LessonContent {
  const old = oldLessons.find((l) => l.id === oldId)!;
  return { ...old, id: newId, title: newTitle || old.title, testCases: testCases || [] };
}

function scaffold(
  id: number,
  title: string,
  overview: string,
  rule: string,
  opts: Partial<LessonContent> = {}
): LessonContent {
  return {
    id,
    title,
    overview,
    rule,
    keyConcepts: opts.keyConcepts || [],
    examples: opts.examples || [],
    testCases: opts.testCases || [],
    commonMistakes: opts.commonMistakes || [],
    exercises: opts.exercises || [],
    quickRef: opts.quickRef || [],
  };
}

const allLessons: LessonContent[] = [
  // UNIT 0: Sounds & Greetings
  scaffold(1, 'Somali Alphabet & Sounds',
    'Somali uses the Latin alphabet with special consonants: c (ʕ), x (ħ), kh (x), q (q). Vowel length is grammatically meaningful.',
    'c = ʕ (voiced pharyngeal), x = ħ (voiceless pharyngeal), kh = x (velar fricative), q = uvular stop. Vowel length distinguishes meaning.',
    {
      keyConcepts: ['Special consonants c, x, kh, q', 'Vowel length is meaningful', 'Tone is grammatical'],
      testCases: [
        { input: 'c', output: 'ʕ — voiced pharyngeal fricative', explanation: 'The letter c represents the voiced pharyngeal fricative /ʕ/, unlike English /k/.' },
        { input: 'x', output: 'ħ — voiceless pharyngeal fricative', explanation: 'The letter x represents the voiceless pharyngeal fricative /ħ/.' },
        { input: 'q', output: 'q — uvular stop', explanation: 'The letter q represents the uvular stop, articulated further back than /k/.' },
      ],
      exercises: [
        { question: 'Which letter represents the voiced pharyngeal fricative?', options: ['k', 'c', 'x', 'q'], answer: 1, explanation: 'c = ʕ, the voiced pharyngeal fricative.' },
      ],
      quickRef: [{ label: 'c', value: 'ʕ — voiced pharyngeal' }, { label: 'x', value: 'ħ — voiceless pharyngeal' }, { label: 'kh', value: 'x — velar fricative' }],
    }
  ),
  remap(5, 2, 'Greetings & Introductions', [
    { input: 'Morning greeting', output: 'Subax wanaagsan', explanation: 'Subax = morning, wanaagsan = good. The standard morning greeting.' },
    { input: 'Response to "How are you?"', output: 'Waan fiicanahay, mahadsanid', explanation: 'Waan fiicanahay = I am fine, mahadsanid = thank you.' },
    { input: 'Formal "peace be with you"', output: 'Nabad gelyo', explanation: 'Nabad = peace, gelyo = arrival/coming. The most formal greeting.' },
  ]),

  // UNIT 1: The Noun System
  scaffold(3, 'Noun Gender',
    'Every Somali noun is masculine or feminine. Gender controls articles, agreement, and plurals.',
    'All nouns have gender. Consonant endings often = masculine; -o/-e endings often = feminine.',
    {
      keyConcepts: ['Nouns are masc. or fem.', 'Gender controls agreement', 'Learn gender with each noun'],
      testCases: [
        { input: 'gabadh (girl)', output: 'Feminine', explanation: 'Gabadh ends in -dh (consonant) but is feminine — gender must be memorized with each noun.' },
        { input: 'nin (man)', output: 'Masculine', explanation: 'Nin is masculine, taking articles -ka/-ga.' },
        { input: 'naag (woman)', output: 'Feminine', explanation: 'Naag is feminine, taking articles -ta/-da.' },
      ],
      exercises: [
        { question: 'What gender is "gabadh" (girl)?', options: ['Masculine', 'Feminine', 'Neuter'], answer: 1, explanation: 'Gabadh is feminine.' },
      ],
      quickRef: [{ label: 'Masculine', value: 'nin, wiil, guri, buug' }, { label: 'Feminine', value: 'naag, gabadh, mindi' }],
    }
  ),
  remap(1, 4, 'Definite Articles', [
    { input: 'nin + definite article (masc.)', output: 'ninka', explanation: 'Masculine noun + -ka: nin + ka → ninka.' },
    { input: 'naag + definite article (fem.)', output: 'naagta', explanation: 'Feminine noun + -ta: naag + ta → naagta.' },
    { input: 'buug + definite article (masc., voicing)', output: 'buugga', explanation: 'Voicing assimilation: buug + ka → buugga (/k/ → /g/ after voiced /g/).' },
  ]),
  scaffold(5, 'Indefinite vs Definite',
    'Somali has no indefinite article. The definite article is a suffix. Somali uses definite forms more broadly than English.',
    'Indefinite = bare noun. Definite = noun + -ka/-ga/-ha (masc.) or -ta/-da (fem.).',
    {
      keyConcepts: ['No "a/an" in Somali', 'Definite = suffix', 'Definite used more than English'],
      testCases: [
        { input: 'a book (indefinite)', output: 'buug', explanation: 'Indefinite nouns have zero marking — just the bare stem.' },
        { input: 'the book (definite, masculine)', output: 'buugga', explanation: 'Masculine noun + definite article -ka, with voicing assimilation: buug + ka → buugga.' },
        { input: 'the woman (definite, feminine)', output: 'naagta', explanation: 'Feminine noun + definite article -ta: naag + ta → naagta.' },
      ],
      exercises: [
        { question: 'How do you say "a book"?', options: ['a buug', 'buug', 'buugga'], answer: 1, explanation: 'Indefinite = bare noun.' },
      ],
      quickRef: [{ label: 'Indefinite', value: 'Bare noun' }, { label: 'Definite masc.', value: '-ka/-ga/-ha' }, { label: 'Definite fem.', value: '-ta/-da' }],
    }
  ),
  scaffold(6, 'Plural Formation',
    'Somali plurals use suffixes: -o (most common), -yo, -yal, -ayaal, -aan. Gender often flips in the plural.',
    '-o is the most common plural suffix. Some plurals involve stem changes.',
    {
      keyConcepts: ['-o = most common plural', 'Multiple declension classes', 'Gender often flips'],
      testCases: [
        { input: 'guri (house)', output: 'guryo (houses)', explanation: 'guri → guryo with the most common plural suffix -o.' },
        { input: 'buug (book)', output: 'buugaag (books)', explanation: 'buug → buugaag with reduplication + -o (buug-ag-o → buugaag).' },
        { input: 'naag (woman)', output: 'naago (women)', explanation: 'naag → naago with suffix -o.' },
      ],
      exercises: [
        { question: 'Plural of "guri"?', options: ['guris', 'guryo', 'guriin'], answer: 1, explanation: 'guri → guryo' },
      ],
      quickRef: [{ label: '-o', value: 'Most common' }, { label: '-yal', value: 'People/animates' }, { label: 'Polarity', value: 'Masc. sing. → fem. plural' }],
    }
  ),
  scaffold(7, 'Gender Polarity',
    'Most nouns flip gender when pluralized. A masculine singular often becomes feminine plural.',
    'Check the plural article to determine plural gender. -ka/-ga = masc; -ta/-da = fem.',
    {
      keyConcepts: ['Gender flips in plural', 'Check article to verify', 'Affects all agreement'],
      testCases: [
        { input: 'nin (man, singular)', output: 'niman (men, plural)', explanation: 'nin (masc. sing.) → niman (masc. plural — exception, no flip).' },
        { input: 'guri (house, masc. sing.)', output: 'guryo (houses, fem. plural)', explanation: 'guri (masc. sing.) → guryo (fem. plural) — polarity applies.' },
        { input: 'naag (woman, fem. sing.)', output: 'naago (women, masc. plural)', explanation: 'naag (fem. sing.) → naago (masc. plural) — polarity applies.' },
      ],
      quickRef: [{ label: 'Polarity', value: 'Masc. sing. → fem. plural (usually)' }],
    }
  ),
  scaffold(8, 'Case Marking',
    'Somali marks nominative (unfocused subjects) and oblique (objects, focused subjects) cases.',
    'waa → nominative (-u/-ku/-tu). baa/ayaa → oblique (base form).',
    {
      keyConcepts: ['Nominative = unfocused subject', 'Oblique = focused subject / object', 'Focus determines case'],
      testCases: [
        { input: 'Waa cunay (He ate it)', output: 'Nominative case on subject', explanation: 'With waa, the subject takes nominative case (-u/-ku for masc.).' },
        { input: 'Cunuu cunay baa (HE ate it)', output: 'Oblique case on focused subject', explanation: 'With baa/ayaa focus, the focused subject takes oblique (base) form.' },
        { input: 'Buugga wuu akhriyay (He read the book)', output: 'Oblique case on object', explanation: 'Objects always take oblique (base) form.' },
      ],
      exercises: [
        { question: 'Which case with waa?', options: ['Oblique', 'Nominative'], answer: 1, explanation: 'waa takes nominative case.' },
      ],
      quickRef: [{ label: 'Nominative masc.', value: '-u / -ku' }, { label: 'Nominative fem.', value: '-tu' }, { label: 'Oblique', value: 'Base form' }],
    }
  ),

  // UNIT 2: Building Simple Sentences
  scaffold(9, 'Independent Pronouns',
    'Full pronoun forms: aniga, adiga, isaga, iyada, innaga, idinka, iyaga. Used for emphasis and focus.',
    'Independent pronouns stand alone and are used for emphasis, contrast, or as predicates.',
    {
      keyConcepts: ['Full forms for emphasis', 'aniga = I/me (emphatic)', 'iyada = she/her (emphatic)'],
      testCases: [
        { input: 'Aniga baan cunay (I ate it)', output: 'Emphatic subject: aniga + baa', explanation: 'Independent pronoun aniga + focus marker baa emphasizes that I (not someone else) ate it.' },
        { input: 'Adiga maad aragtay? (Did YOU see it?)', output: 'Emphatic subject: adiga + maa', explanation: 'Independent pronoun adiga emphasizes the subject in a question.' },
        { input: 'Isagu wuu tegay (HE went)', output: 'Emphatic subject: isagu + wuu', explanation: 'Independent pronoun isagu (he) + subject clitic wuu.' },
      ],
      exercises: [
        { question: 'Which is the emphatic "I"?', options: ['aan', 'aniga', 'waxaan'], answer: 1, explanation: 'aniga is the independent/emphatic pronoun for "I".' },
      ],
      quickRef: [{ label: 'I', value: 'aniga' }, { label: 'you', value: 'adiga' }, { label: 'he', value: 'isaga' }, { label: 'she', value: 'iyada' }],
    }
  ),
  remap(2, 10, 'Subject Clitics & waa', [
    { input: '"I am eating" → clitic form', output: 'Waan cunayaa', explanation: 'waan = waa + aan (I). The clitic fuses with the focus marker.' },
    { input: '"He is reading" → clitic form', output: 'Wuu akhrisaa', explanation: 'wuu = waa + uu (he). Third person masculine clitic.' },
    { input: '"They are going" → clitic form', output: 'Way tegayaan', explanation: 'way = waa + ay (they). Third person plural clitic.' },
  ]),
  scaffold(11, 'SOV Word Order',
    'Somali is strictly SOV: Subject-Object-Verb. The verb always comes last.',
    'Order: Subject (clitic) → Object → Verb. Preverbal clitics (prepositions, object pronouns) come before the verb.',
    {
      keyConcepts: ['Subject → Object → Verb', 'Verb is always last', 'Preverbal clitics before verb'],
      testCases: [
        { input: '"I bread eat" → Somali', output: 'Waan rooti cunaa', explanation: 'SOV order: Subject (Waan) + Object (rooti) + Verb (cunaa).' },
        { input: '"She a book reads" → Somali', output: 'Way buug akhrisaa', explanation: 'SOV order: Subject (Way) + Object (buug) + Verb (akhrisaa).' },
        { input: '"They water drink" → Somali', output: 'Way biyo cabaan', explanation: 'SOV order: Subject (Way) + Object (biyo) + Verb (cabaan).' },
      ],
      exercises: [
        { question: 'What is the Somali word order?', options: ['SVO', 'SOV', 'VSO'], answer: 1, explanation: 'Somali is strictly SOV.' },
      ],
      quickRef: [{ label: 'S', value: 'Subject + clitic' }, { label: 'O', value: 'Object (noun/clitic)' }, { label: 'V', value: 'Verb (always last)' }],
    }
  ),
  scaffold(12, 'The Copula yahay',
    'The highly irregular verb "to be" in Somali. Essential for equational sentences.',
    'yahay = "is" (3rd person). Other persons: ahay, tahay, yihiin, tihiin, etc.',
    {
      keyConcepts: ['yahay = "is" (3sg)', 'ahay = "am" (1sg)', 'tahay = "are" (2sg)'],
      testCases: [
        { input: '"He is a teacher" → Somali', output: 'Wuu yahay macallin', explanation: '3rd person singular uses yahay with subject clitic wuu.' },
        { input: '"I am a student" → Somali', output: 'Waan ahay arday', explanation: '1st person singular uses ahay with subject clitic waan.' },
        { input: '"You are good" → Somali', output: 'Waad tahay fiican', explanation: '2nd person singular uses tahay with subject clitic waad.' },
      ],
      exercises: [
        { question: '"He is a doctor" → ?', options: ['Wuu yahay dhakhtar', 'Wuu ahay dhakhtar', 'Wuu tahay dhakhtar'], answer: 0, explanation: '3rd person singular uses yahay.' },
      ],
      quickRef: [{ label: 'I am', value: 'Waan ahay' }, { label: 'you are', value: 'Waad tahay' }, { label: 'he is', value: 'Wuu yahay' }],
    }
  ),
  scaffold(13, 'Verbless Equational Sentences',
    'Present tense equational sentences without yahay: Waa macallin.',
    'In present tense, "to be" can be omitted. waa + noun = equational sentence.',
    {
      keyConcepts: ['Present tense omits "to be"', 'waa + noun = equation', 'Only in present tense'],
      testCases: [
        { input: '"He is a teacher" (verbless)', output: 'Waa macallin', explanation: 'In present tense, waa + noun omits yahay: Waa macallin = He is a teacher.' },
        { input: '"She is a doctor" (verbless)', output: 'Waa dhakhtar', explanation: 'Waa dhakhtar = She is a doctor (verbless present tense).' },
        { input: '"They are students" (verbless)', output: 'Waa arday', explanation: 'Waa arday = They are students (verbless, generic plural).' },
      ],
      exercises: [
        { question: '"He is a teacher" (verbless) → ?', options: ['Wuu yahay macallin', 'Waa macallin', 'Yahay macallin'], answer: 1, explanation: 'Verbless equational: waa + noun.' },
      ],
      quickRef: [{ label: 'He is a teacher', value: 'Waa macallin' }, { label: 'She is a doctor', value: 'Waa dhakhtar' }],
    }
  ),
  remap(4, 14, 'Focus Marker: baa/ayaa', [
    { input: '"ALI ate the bread" (focus on subject)', output: 'Cali baa rootiga cunay', explanation: 'baa focuses on the subject Cali: Cali baa = ALI (did).' },
    { input: '"Ali ate THE BREAD" (focus on object)', output: 'Rootiga baa Cali cunay', explanation: 'baa focuses on the object rootiga: Rootiga baa = THE BREAD (is what).' },
    { input: '"Ali ATE the bread" (focus on verb)', output: 'Cunay baa Cali rootiga', explanation: 'baa can also focus on the verb/action.' },
  ]),

  // UNIT 3: The Verb
  remap(6, 15, 'Verb Classes', [
    { input: 'cun (eat) — what class?', output: 'Class 1 (consonant-final stem)', explanation: 'Class 1 verbs end in a consonant: cun, cab, qor, akhri.' },
    { input: 'samee (do) — what class?', output: 'Class 2 (-ee/-oo stem)', explanation: 'Class 2 verbs end in -ee or -oo: samee, qaado.' },
    { input: 'dhowr (keep) — present habitual?', output: 'dhowraa', explanation: 'Class 1: consonant stem + -aa = dhowr + aa → dhowraa.' },
  ]),
  remap(7, 16, 'Present Habitual', [
    { input: 'cun (eat) + 1sg present habitual', output: 'cunaa', explanation: 'Class 1: stem + -aa. cun + aa → cunaa.' },
    { input: 'akhri (read) + 2sg present habitual', output: 'akhrtaa', explanation: 'Class 1 with consonant cluster: akhri + t + aa → akhrtaa.' },
    { input: 'samee (do) + 3sg present habitual', output: 'sameesaa', explanation: 'Class 2: -ee stem + -s + aa → sameesaa.' },
  ]),
  remap(16, 17, 'Present Progressive', [
    { input: 'cun (eat) + 1sg present progressive', output: 'cunayaa', explanation: 'Present progressive inserts -ay-: cun + ay + aa → cunayaa.' },
    { input: 'tag (go) + 3sg present progressive', output: 'tayayaa', explanation: 'tag → tay (stem change) + ay + aa → tayayaa.' },
    { input: 'qor (write) + 2sg present progressive', output: 'qorayaa', explanation: 'qor + ay + aa → qorayaa.' },
  ]),
  remap(8, 18, 'Past Tense', [
    { input: 'cun (eat) + 1sg past', output: 'cunay', explanation: 'Past tense replaces -aa with -ay: cunaa → cunay.' },
    { input: 'tag (go) + 3sg past', output: 'tegay', explanation: 'Irregular: tag → teg + ay → tegay.' },
    { input: 'akhri (read) + 2sg past', output: 'akhriday', explanation: 'akhri + day → akhriday.' },
  ]),
  remap(17, 19, 'Future Tense', [
    { input: 'cun (eat) + 1sg future', output: 'Waan cuni doonaa', explanation: 'Future: subject clitic + infinitive + doonaa. Waan cuni doonaa.' },
    { input: 'tag (go) + 3sg future', output: 'Wuu tegi doonaa', explanation: 'Wuu tegi doonaa = He will go.' },
    { input: 'qor (write) + 2sg future', output: 'Waad qori doontaa', explanation: 'Waad qori doontaa = You will write.' },
  ]),
  remap(9, 20, 'Negation', [
    { input: 'Waan cunay (I ate) → negative', output: 'Ma aan cunay', explanation: 'Negation: replace waa with ma + negative verb form.' },
    { input: 'Wuu yimid (He came) → negative', output: 'Ma uu imaan', explanation: 'Negative past: ma uu imaan = He did not come.' },
    { input: 'Ma at start of sentence → meaning?', output: 'Question marker', explanation: 'ma at the START of a sentence turns it into a yes/no question.' },
  ]),
  remap(10, 21, 'Yes/No Questions', [
    { input: '"Did he eat?" → Somali', output: 'Miyuu cunay?', explanation: 'Replace waa with miyuu: Miyuu cunay? = Did he eat?' },
    { input: '"Are you going?" → Somali', output: 'Maad tagaysaa?', explanation: 'Maad tagaysaa? = Are you going? (maa + aad).' },
    { input: '"Is she a doctor?" → Somali', output: 'Miyay tahay dhakhtar?', explanation: 'Miyay tahay dhakhtar? = Is she a doctor?' },
  ]),
  scaffold(22, 'Imperatives & Commands',
    'Commands and negative commands with ha.',
    'Imperative = verb stem. Negative imperative = ha + verb stem + -in.',
    {
      keyConcepts: ['Imperative = bare stem', 'Negative = ha + -in', '2nd person only'],
      testCases: [
        { input: '"Eat!" (command)', output: 'Cun!', explanation: 'Imperative uses the bare verb stem: cun = eat!' },
        { input: '"Don\'t eat!" (negative command)', output: 'Ha cunin!', explanation: 'Negative imperative: ha + verb stem + -in = ha cunin.' },
        { input: '"Go!" (command)', output: 'Tag!', explanation: 'Imperative uses the bare verb stem: tag = go!' },
      ],
      exercises: [
        { question: '"Don\'t go!" → ?', options: ['Ha tagin!', 'Ha tag!', 'Tagin!'], answer: 0, explanation: 'Negative imperative: ha + stem + -in.' },
      ],
      quickRef: [{ label: 'Eat!', value: 'Cun!' }, { label: 'Don\'t eat!', value: 'Ha cunin!' }, { label: 'Go!', value: 'Tag!' }],
    }
  ),

  // UNIT 4: Expanding Noun Phrases
  scaffold(23, 'Demonstratives',
    'kan/tan (this), kaas/taas (that), kuwan (these). Agree in gender with the noun.',
    'kan = this (masc.), tan = this (fem.), kaas = that (masc.), taas = that (fem.).',
    {
      keyConcepts: ['kan = this (masc.)', 'tan = this (fem.)', 'kaas/taas = that'],
      testCases: [
        { input: '"this man" → Somali', output: 'kan nin', explanation: 'kan (this, masc.) agrees with nin (man, masc.).' },
        { input: '"that woman" → Somali', output: 'taas naag', explanation: 'taas (that, fem.) agrees with naag (woman, fem.).' },
        { input: '"these books" → Somali', output: 'kuwan buugaag', explanation: 'kuwan (these, plural) with buugaag (books, plural).' },
      ],
      exercises: [
        { question: '"this woman" → ?', options: ['kan naag', 'tan naag', 'taas naag'], answer: 1, explanation: 'tan = this (feminine).' },
      ],
      quickRef: [{ label: 'this (masc.)', value: 'kan' }, { label: 'this (fem.)', value: 'tan' }, { label: 'that (masc.)', value: 'kaas' }],
    }
  ),
  remap(15, 24, 'Possessives', [
    { input: '"my book" → Somali', output: 'buuggayga', explanation: 'Possessive suffix -ayga (my) on buug: buug + ga (definite) + ayga = buuggayga.' },
    { input: '"your house" → Somali', output: 'gurigaaga', explanation: 'Possessive suffix -aaga (your): guri + ga + aaga = gurigaaga.' },
    { input: '"his cat" → Somali', output: 'bisadiisa', explanation: 'Possessive suffix -iisa (his): bisad + ta + iisa = bisadiisa.' },
  ]),
  scaffold(25, 'Numbers 1–10', 'Cardinal numbers function as heads in noun phrases.', 'Numbers are heads, not modifiers. kow=1, laba=2, saddex=3, afar=4, shan=5.', {
    testCases: [
      { input: '"three cats" → Somali', output: 'saddex bisadood', explanation: 'Numbers are heads: saddex (three) + counting form -ood.' },
      { input: '"five books" → Somali', output: 'shan buug', explanation: 'shan (five) + buug (books) — no article needed with numbers.' },
      { input: '"two men" → Somali', output: 'laba nin', explanation: 'laba (two) + nin (men) — numbers precede the noun.' },
    ],
    exercises: [
      { question: '"three" in Somali?', options: ['afar', 'saddex', 'shan'], answer: 1, explanation: 'saddex = three.' },
    ],
    quickRef: [{ label: '1', value: 'kow' }, { label: '2', value: 'laba' }, { label: '3', value: 'saddex' }],
  }),
  scaffold(26, 'Numbers 11+', 'Higher numbers and counting form -ood.', 'toban=10, labaatan=20, boqol=100. Counting form: laba bisadood = two cats.', {
    testCases: [
      { input: '"twenty houses" → Somali', output: 'labaatan guri', explanation: 'labaatan (twenty) + guri (houses).' },
      { input: '"one hundred books" → Somali', output: 'boqol buug', explanation: 'boqol (one hundred) + buug (books).' },
      { input: '"eleven cats" → Somali', output: 'kooban bisadood', explanation: 'kooban (eleven) + bisadood (cats, counting form).' },
    ],
    quickRef: [{ label: '10', value: 'toban' }, { label: '20', value: 'labaatan' }, { label: '100', value: 'boqol' }],
  }),
  scaffold(27, 'True Adjectives', 'Non-conjugating adjectives: dhexe, hoose, sare.', 'True adjectives do not change form: dhexe = middle.', {
    testCases: [
      { input: '"middle" → Somali', output: 'dhexe', explanation: 'dhexe = middle (true adjective, no conjugation).' },
      { input: '"lower" → Somali', output: 'hoose', explanation: 'hoose = lower (true adjective, no conjugation).' },
      { input: '"upper" → Somali', output: 'sare', explanation: 'sare = upper (true adjective, no conjugation).' },
    ],
    quickRef: [{ label: 'middle', value: 'dhexe' }, { label: 'lower', value: 'hoose' }],
  }),
  remap(14, 28, 'Adjectives-as-Verbs', [
    { input: '"big" (adjective root)', output: 'weyn', explanation: 'weyn = big (adjective root).' },
    { input: '"It is big" → Somali', output: 'Wuu weyn yahay', explanation: 'Adjectives-as-verbs conjugate: weyn + yahay = weyn yahay (is big).' },
    { input: '"She is beautiful" → Somali', output: 'Way qurux badan tahay', explanation: 'qurux badan (beautiful) + tahay = qurux badan tahay.' },
  ]),

  // UNIT 5: Movement & Space
  remap(11, 29, 'Prepositions', [
    { input: '"for" → Somali preposition', output: 'u', explanation: 'u = for, to (benefactive/directional).' },
    { input: '"in" → Somali preposition', output: 'ku', explanation: 'ku = in, at, on (locative).' },
    { input: '"from" → Somali preposition', output: 'ka', explanation: 'ka = from (ablative).' },
  ]),
  scaffold(30, 'Preposition Blending', 'Prepositions combine: ugu, kaga, ula, kala.', 'u+ku=ugu, ka+ku=kaga, u+la=ula, ka+la=kala.', {
    testCases: [
      { input: '"for+in" → blended', output: 'ugu', explanation: 'u (for) + ku (in) = ugu (for-in).' },
      { input: '"from+in" → blended', output: 'kaga', explanation: 'ka (from) + ku (in) = kaga (from-in).' },
      { input: '"for+with" → blended', output: 'ula', explanation: 'u (for) + la (with) = ula (for-with).' },
    ],
    exercises: [
      { question: 'u + ku = ?', options: ['ugu', 'kaga', 'ula'], answer: 0, explanation: 'u + ku = ugu.' },
    ],
    quickRef: [{ label: 'u+ku', value: 'ugu' }, { label: 'ka+ku', value: 'kaga' }, { label: 'u+la', value: 'ula' }],
  }),
  remap(12, 31, 'Directionals', [
    { input: '"towards speaker" → directional', output: 'soo', explanation: 'soo = hither, towards the speaker.' },
    { input: '"away from speaker" → directional', output: 'sii', explanation: 'sii = thither, away from the speaker.' },
    { input: '"together" → directional', output: 'wada', explanation: 'wada = together, jointly.' },
  ]),
  remap(13, 32, 'Object Clitics', [
    { input: '"me" (object clitic)', output: 'i', explanation: 'i = me (1st person singular object).' },
    { input: '"you" (object clitic)', output: 'ku', explanation: 'ku = you (2nd person singular object).' },
    { input: '"us" (object clitic)', output: 'na', explanation: 'na = us (1st person plural object).' },
  ]),
  scaffold(33, 'Object Clitics + Prepositions', 'ii, kugu, iga, nala, etc.', 'Object clitics fuse with prepositions.', {
    testCases: [
      { input: '"to me" → fused', output: 'ii', explanation: 'i (me) + u (to) = ii (to-me).' },
      { input: '"in you" → fused', output: 'kugu', explanation: 'ku (you) + ku (in) = kugu (in-you).' },
      { input: '"from me" → fused', output: 'iga', explanation: 'i (me) + ka (from) = iga (from-me).' },
    ],
    exercises: [
      { question: '"to me" = ?', options: ['ii', 'kugu', 'iga'], answer: 0, explanation: 'i + u = ii.' },
    ],
    quickRef: [{ label: 'to me', value: 'ii' }, { label: 'in you', value: 'kugu' }, { label: 'from me', value: 'iga' }],
  }),
  scaffold(34, 'Existential jir/joog', 'Expressing existence and location.', 'jir = exist, joog = be located.', {
    testCases: [
      { input: '"There is water" → Somali', output: 'Biyo baa jira', explanation: 'jir = exist: Biyo baa jira = Water exists (there is water).' },
      { input: '"He is here" → Somali', output: 'Wuu joogaa halkan', explanation: 'joog = be located: Wuu joogaa halkan = He is located here.' },
      { input: '"There are people" → Somali', output: 'Dad baa jira', explanation: 'Dad baa jira = People exist (there are people).' },
    ],
    quickRef: [{ label: 'There is', value: 'Waa jira' }, { label: 'He is here', value: 'Wuu joogaa halkan' }],
  }),

  // UNIT 6: Description & Modification
  scaffold(35, 'Comparatives', 'ka weyn, -badan, ka fiican.', 'ka + adjective = comparative.', {
    testCases: [
      { input: '"bigger" → Somali', output: 'ka weyn', explanation: 'ka + weyn (big) = ka weyn (bigger).' },
      { input: '"more books" → Somali', output: 'buug badan', explanation: 'Noun + badan = more NOUN.' },
      { input: '"better" → Somali', output: 'ka fiican', explanation: 'ka + fiican (good) = ka fiican (better).' },
    ],
    quickRef: [{ label: 'bigger', value: 'ka weyn' }, { label: 'more', value: '-badan' }, { label: 'better', value: 'ka fiican' }],
  }),
  scaffold(36, 'Superlatives', 'ugu- prefix.', 'ugu weyn = biggest, ugu fiican = best.', {
    testCases: [
      { input: '"biggest" → Somali', output: 'ugu weyn', explanation: 'ugu + weyn (big) = ugu weyn (biggest).' },
      { input: '"best" → Somali', output: 'ugu fiican', explanation: 'ugu + fiican (good) = ugu fiican (best).' },
      { input: '"most beautiful" → Somali', output: 'ugu qurux badan', explanation: 'ugu + qurux badan = ugu qurux badan (most beautiful).' },
    ],
    quickRef: [{ label: 'biggest', value: 'ugu weyn' }, { label: 'best', value: 'ugu fiican' }],
  }),
  scaffold(37, 'Colors', 'cad, madow, cas, cagaar, buluug.', 'Colors function as stative verbs.', {
    testCases: [
      { input: '"white" → Somali', output: 'cad', explanation: 'cad = white (functions as stative verb).' },
      { input: '"black" → Somali', output: 'madow', explanation: 'madow = black (functions as stative verb).' },
      { input: '"red" → Somali', output: 'cas', explanation: 'cas = red (functions as stative verb).' },
    ],
    quickRef: [{ label: 'white', value: 'cad' }, { label: 'black', value: 'madow' }, { label: 'red', value: 'cas' }],
  }),
  scaffold(38, 'Adverbs of Time', 'maanta, shalay, berri, hadda.', 'Time adverbs are placed before the verb.', {
    testCases: [
      { input: '"today" → Somali', output: 'maanta', explanation: 'maanta = today.' },
      { input: '"yesterday" → Somali', output: 'shalay', explanation: 'shalay = yesterday.' },
      { input: '"tomorrow" → Somali', output: 'berri', explanation: 'berri = tomorrow.' },
    ],
    quickRef: [{ label: 'today', value: 'maanta' }, { label: 'yesterday', value: 'shalay' }, { label: 'tomorrow', value: 'berri' }],
  }),
  scaffold(39, 'Adverbs of Place', 'halkan, halkaas, meel kasta.', 'Place adverbs modify the verb phrase.', {
    testCases: [
      { input: '"here" → Somali', output: 'halkan', explanation: 'halkan = here.' },
      { input: '"there" → Somali', output: 'halkaas', explanation: 'halkaas = there.' },
      { input: '"everywhere" → Somali', output: 'meel kasta', explanation: 'meel kasta = everywhere.' },
    ],
    quickRef: [{ label: 'here', value: 'halkan' }, { label: 'there', value: 'halkaas' }, { label: 'where?', value: 'xagge' }],
  }),

  // UNIT 7: Complex Sentences
  remap(18, 40, 'Connectors', [
    { input: '"and" (connector between nouns)', output: 'iyo', explanation: 'iyo = and (connects nouns and noun phrases).' },
    { input: '"and" (connector between clauses)', output: '-na', explanation: '-na = and (clitic attached to second element in clause coordination).' },
    { input: '"but" → connector', output: '-se', explanation: '-se = but (contrastive connector, clitic).' },
  ]),
  scaffold(41, 'Question Words', 'maxaa, yaa, sidee, goorma, xagge.', 'Wh-questions use question words at the beginning or in situ.', {
    testCases: [
      { input: '"What?" → Somali', output: 'Maxaa?', explanation: 'maxaa = what.' },
      { input: '"Who?" → Somali', output: 'Yaa?', explanation: 'yaa = who.' },
      { input: '"How?" → Somali', output: 'Sidee?', explanation: 'sidee = how.' },
    ],
    exercises: [
      { question: '"What?" in Somali?', options: ['Yaa?', 'Maxaa?', 'Sidee?'], answer: 1, explanation: 'Maxaa? = What?' },
    ],
    quickRef: [{ label: 'what', value: 'maxaa' }, { label: 'who', value: 'yaa' }, { label: 'how', value: 'sidee' }, { label: 'when', value: 'goorma' }],
  }),
  scaffold(42, 'Embedded Questions', 'Indirect questions.', 'Waxaan waydiiyay... = I asked whether...', {
    testCases: [
      { input: '"I asked what he ate" → Somali', output: 'Waxaan waydiiyay waxa uu cunay', explanation: 'Embedded question: Waxaan waydiiyay (I asked) + waxa uu cunay (what he ate).' },
      { input: '"She asked where I went" → Somali', output: 'Way waydiisay xagge aan tegay', explanation: 'Embedded question with xagge (where).' },
    ],
    quickRef: [{ label: 'I asked', value: 'Waxaan waydiiyay' }],
  }),
  remap(19, 43, 'Relative Clauses', [
    { input: '"the man who came" → Somali', output: 'ninkii yimid', explanation: 'Relative clause with ee/oo: ninkii yimid = the-man who came.' },
    { input: '"the book that I read" → Somali', output: 'buugga aan akhriyay', explanation: 'buugga aan akhriyay = the-book that I read.' },
    { input: 'Relative marker for masculine subject', output: 'oo', explanation: 'oo is the relative marker for masculine subjects.' },
  ]),
  remap(20, 44, 'Conditionals', [
    { input: '"If it rains, I will stay" → Somali', output: 'Haddii roob da\'o, waan joogayaa', explanation: 'haddii = if: Haddii roob da\'o = If it rains.' },
    { input: '"If he comes, tell me" → Somali', output: 'Haddii uu yimaado, ii sheeg', explanation: 'Haddii + subjunctive verb form in the conditional clause.' },
    { input: 'Conditional marker', output: 'haddii', explanation: 'haddii = if (introduces conditional clauses).' },
  ]),
  scaffold(45, 'Reported Speech', 'Wuxuu yidhi... Way sheegtay in...', 'Reported speech uses yidhi (said) and in (that).', {
    testCases: [
      { input: '"He said he is coming" → Somali', output: 'Wuxuu yidhi wuu imaanayaa', explanation: 'Wuxuu yidhi (he said) + direct reported clause.' },
      { input: '"She said that she read the book" → Somali', output: 'Way sheegtay inay akhrisay buugga', explanation: 'Way sheegtay (she said) + in (that) + subordinate clause.' },
    ],
    quickRef: [{ label: 'He said', value: 'Wuxuu yidhi' }, { label: 'She said', value: 'Way sheegtay' }],
  }),
  scaffold(46, 'Passive Voice', 'la- prefix.', 'Lagu cunay = It was eaten. Lagu arkay = It was seen.', {
    testCases: [
      { input: '"It was eaten" → Somali', output: 'Lagu cunay', explanation: 'la- (passive) + u (by) + cun (eat) + ay (past) = Lagu cunay.' },
      { input: '"It was seen" → Somali', output: 'Lagu arkay', explanation: 'la- (passive) + u (by) + arag (see) + ay (past) = Lagu arkay.' },
      { input: '"It was written" → Somali', output: 'Lagu qoray', explanation: 'la- + u + qor (write) + ay = Lagu qoray.' },
    ],
    quickRef: [{ label: 'It was eaten', value: 'Lagu cunay' }, { label: 'It was seen', value: 'Lagu arkay' }],
  }),

  // UNIT 8: Advanced Verbs
  scaffold(47, 'Modal Verbs', 'kar, waa in, rab.', 'kar = can, waa in = must, rab = want.', {
    testCases: [
      { input: '"I can eat" → Somali', output: 'Waan cuni karaa', explanation: 'kar (can) conjugates: Waan cuni karaa = I can eat.' },
      { input: '"I must go" → Somali', output: 'Waa inaan tago', explanation: 'waa in (must) + subjunctive: Waa inaan tago = I must go.' },
      { input: '"I want to read" → Somali', output: 'Waan rabaa inaan akhriyo', explanation: 'rab (want) + inaan (that I) + subjunctive.' },
    ],
    quickRef: [{ label: 'can', value: 'kar' }, { label: 'must', value: 'waa in' }, { label: 'want', value: 'rab' }],
  }),
  scaffold(48, 'Reflexive Verbs', 'is- prefix.', 'is qaatay = took oneself.', {
    testCases: [
      { input: '"He took himself" → Somali', output: 'Isuu qaatay', explanation: 'is- (self) + uu (he) + qaatay (took) = Isuu qaatay.' },
      { input: '"She prepared herself" → Somali', output: 'Isay diyaarisay', explanation: 'is- (self) + ay (she) + diyaarisay (prepared).' },
    ],
    quickRef: [{ label: 'took oneself', value: 'is qaatay' }],
  }),
  scaffold(49, 'Causative Verbs', '-si- suffix.', 'cun → cunsi (feed), qor → qorsi (dictate).', {
    testCases: [
      { input: '"feed" (cause to eat) → Somali', output: 'cunsi', explanation: 'cun (eat) + -si- (causative) = cunsi (feed).' },
      { input: '"dictate" (cause to write) → Somali', output: 'qorsi', explanation: 'qor (write) + -si- = qorsi (dictate).' },
      { input: '"teach" (cause to learn) → Somali', output: 'barsi', explanation: 'bar (learn) + -si- = barsi (teach).' },
    ],
    quickRef: [{ label: 'feed', value: 'cunsi' }, { label: 'dictate', value: 'qorsi' }],
  }),
  scaffold(50, 'Subordinate Clauses', 'Complex multi-clause sentences.', 'Building sentences with multiple clauses.', {
    testCases: [
      { input: '"I went because I was hungry" → Somali', output: 'Waxaan tegay sababtoo ah waan gaajeysnaa', explanation: 'Main clause + sababtoo ah (because) + subordinate clause.' },
      { input: '"Although it rained, we went out" → Somali', output: 'Inkastoo roob da\'ay, waan baxnay', explanation: 'Inkastoo (although) + subordinate clause, main clause.' },
    ],
    quickRef: [{ label: 'because', value: 'sababtoo ah' }, { label: 'although', value: 'inkastoo' }],
  }),
];

const lessonMap = new Map(allLessons.map((l) => [l.id, l]));

export function getProblemContent(problemId: number): LessonContent | undefined {
  return lessonMap.get(problemId);
}
