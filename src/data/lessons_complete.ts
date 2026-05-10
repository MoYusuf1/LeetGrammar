// ============================================================================
// SOOMAALI GRAMMAR ROADMAP - LESSON DATA
// ============================================================================
// Sources:
//   - Morgan Nilsson, "Learner's Somali Grammar" (2025), University of Gothenburg
//   - J.W.C. Kirk, "A Grammar of the Somali Language" (1905), Cambridge University Press
//   - Larajasse & Sampoint, "Practical Grammar of the Somali Language" (1897)
//   - John Saeed, "Central Somali: A Grammatical Outline" (1982)
// ============================================================================

export interface LessonExample {
  somali: string;
  english: string;
  literal?: string;
  breakdown: { word: string; role: string; color?: string }[];
}

export interface TestCase {
  input: string;
  output: string;
  explanation: string;
}

export interface LessonContent {
  id: number;
  title: string;
  overview: string;
  rule: string;
  keyConcepts: string[];
  examples: LessonExample[];
  testCases: TestCase[];
  commonMistakes: { mistake: string; correction: string; explanation: string }[];
  exercises: { question: string; options: string[]; answer: number; explanation: string }[];
  quickRef: { label: string; value: string }[];
}

export const lessons: LessonContent[] = [
  {
    id: 1,
    title: "Definiteness (-ka / -ta)",
    overview: "In Somali, there is no indefinite article corresponding to English 'a/an'. Instead, Somali has a definite article suffix (-ka/-ga/-ha for masculine nouns, -ta/-da for feminine nouns) that is attached directly to the noun. This is one of the most fundamental features of Somali grammar and must be mastered early. As Nilsson (2025) notes, 'Somali, just like French and Arabic, prefers the definite form in the generic meaning.'",
    rule: `The definite article is a suffix that attaches to the end of the noun. The form depends on the gender of the noun and the final sound of the noun stem.

**Masculine nouns** take -ka (or variants -ga, -ha):
- After voiced consonants (b, d, g, dh, l, m, n, r, w, y): **-ga**
- After voiceless consonants (t, k, q, x, h, s, sh, f): **-ka**
- After vowels: **-ha**

**Feminine nouns** take -ta (or variant -da):
- After voiced consonants: **-da**
- After voiceless consonants: **-ta**
- After vowels: **-ta**

The article suffix assimilates to the final consonant of the stem: /k/ becomes voiced after voiced consonants, and /t/ becomes voiced after voiced consonants.

**Sound assimilation rules:**
- /k/ → /g/ after voiced consonants: buug + ka → buugga
- /t/ → /d/ after voiced consonants: naag + ta → naagta
- After vowels, /h/ may be inserted: guri + ha → guriga

**Generic definite form:** When referring to a whole category (not a specific object), Somali uses the definite form: "Shimbiruhu ukun ayey dhalaan" (Birds [the-birds] lay eggs).`,
    keyConcepts: [
      "Somali has NO indefinite article — a bare noun is inherently indefinite",
      "The definite article is a SUFFIX attached to the noun, not a separate word",
      "Masculine nouns take -ka/-ga/-ha; feminine nouns take -ta/-da",
      "The suffix assimilates to the stem's final consonant (voicing after voiced consonants)",
      "The generic definite form is used when referring to a whole category",
      "A handful of nouns with a stem-final glottal stop lose it before the article: gu' → guga"
    ],
    examples: [
      {
        somali: "nin → ninka",
        english: "a man → the man",
        breakdown: [
          { word: "nin", role: "indefinite noun (masculine)" },
          { word: "→", role: "becomes" },
          { word: "ninka", role: "definite noun (masc. + -ka)" }
        ]
      },
      {
        somali: "naag → naagta",
        english: "a woman → the woman",
        breakdown: [
          { word: "naag", role: "indefinite noun (feminine)" },
          { word: "naagta", role: "definite noun (fem. + -ta)" }
        ]
      },
      {
        somali: "buug → buugga",
        english: "a book → the book",
        breakdown: [
          { word: "buug", role: "indefinite noun (masc.)" },
          { word: "buugga", role: "definite (voicing: -k- → -g- after voiced -g)" }
        ]
      },
      {
        somali: "guri → guriga",
        english: "a house → the house",
        breakdown: [
          { word: "guri", role: "indefinite noun (masc., vowel-final)" },
          { word: "guriga", role: "definite (after vowel: -ha → -ga)" }
        ]
      },
      {
        somali: "bisad → bisadda",
        english: "a cat → the cat",
        breakdown: [
          { word: "bisad", role: "indefinite noun (fem., voiced-final)" },
          { word: "bisadda", role: "definite (voicing + gemination)" }
        ]
      },
      {
        somali: "Shimbiruhu ukun ayey dhalaan.",
        english: "Birds lay eggs. (generic)",
        literal: "The-birds eggs they lay.",
        breakdown: [
          { word: "Shimbiruhu", role: "generic definite: all birds" },
          { word: "ukun", role: "noun: eggs (indefinite)" },
          { word: "ayey", role: "focus + clitic: they" },
          { word: "dhalaan", role: "verb: lay" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using a separate word for 'the'", correction: "Attach -ka/-ta as a suffix", explanation: "Unlike English, Somali does not use a separate word for 'the'. The definite article is always suffixed to the noun." },
      { mistake: "Using -ka for all nouns regardless of gender", correction: "Use -ta/-da for feminine nouns", explanation: "Every Somali noun has grammatical gender. Feminine nouns always take -ta/-da, never -ka." },
      { mistake: "Not voicing the suffix after voiced consonants", correction: "-k- → -g- and -t- → -d- after voiced consonants", explanation: "The article suffix assimilates: buug + ka → buugga, not buugka." }
    ],
    exercises: [
      { question: "Make 'gabadh' (girl, feminine) definite.", options: ["gabadhta", "gabadhda", "gabadhka", "gabadh"], answer: 0, explanation: "Feminine nouns take -ta. After voiced consonant -dh-, the -t- voices to -dh-, giving gabadhta (with gemination)." },
      { question: "Make 'miis' (table, masculine) definite.", options: ["miiska", "miisga", "miisha", "miis"], answer: 0, explanation: "Masculine noun ending in voiceless -s takes -ka directly: miiska." },
      { question: "What is the definite form of 'fure' (key, masc)?", options: ["furka", "furaha", "furga", "fure"], answer: 1, explanation: "After a vowel (-e), masculine nouns take -ha: fure + ha → furaha." },
      { question: "Which is correct: 'the cat' (bisad, fem)?", options: ["bisadka", "bisadda", "bisad", "bisada"], answer: 1, explanation: "Feminine noun + -ta after voiced consonant: bisad + ta → bisadda (gemination)." }
    ],
    quickRef: [
      { label: "Masc. after voiceless", value: "-ka (miis → miiska)" },
      { label: "Masc. after voiced", value: "-ga (buug → buugga)" },
      { label: "Masc. after vowel", value: "-ha/-ga (guri → guriga)" },
      { label: "Fem. after voiceless", value: "-ta (bisad → bisadda)" },
      { label: "Fem. after voiced", value: "-da (naag → naagta)" },
      { label: "Fem. after vowel", value: "-da (hooyo → hooyada)" }
    ]
  },
  {
    id: 2,
    title: "Subject Clitics (aan, aad, uu, ay)",
    overview: "Somali uses short subject pronouns called 'clitics' that fuse with sentence particles to indicate who is performing the action. Unlike English where subject pronouns are standalone words, Somali clitics are bound morphemes. Every Somali sentence MUST have a subject marker. As Nilsson notes: 'In positive declarative clauses a short subject pronoun is normally required.' (2025, p. 177)",
    rule: `Somali has eight short subject pronouns (clitics) that occur in the particle phrase:

**aan** — I
**aad** — you (singular)
**uu** — he / it (masculine)
**ay** — she / it (feminine) / they
**aannu** — we (excluding you)
**aynu** — we (including you)
**aydin** — you (plural)

These clitics fuse with sentence particles through contraction:
- waa + aan → **waan** (I am/do)
- waa + uu → **wuu** (he is/does)
- waa + ay → **way** (she is/does)
- waa + aad → **waad** (you are/do)
- waa + aannu → **waannu** (we excl. are/do)
- waa + aynu → **waynu** (we incl. are/do)

**Obligatory usage:** In positive declarative clauses, a short subject pronoun is REQUIRED, even when a long subject pronoun or explicit noun subject is present.

**When clitics can be omitted:**
(a) If the predicate has no verb (only a noun phrase)
(b) If the subject is focused (with baa/ayaa)
(c) In questions and negative clauses with ma — clitics are OPTIONAL
(d) With adjective + yahay/tahay — 3rd person clitics often omitted`,
    keyConcepts: [
      "Subject clitics are SHORT bound pronouns, not standalone words",
      "They fuse with sentence particles (waa, baa, ma) through contraction",
      "They are OBLIGATORY in positive declarative clauses",
      "Used even when a noun or long pronoun is already the subject",
      "The 3rd person clitics (uu/ay) can be omitted with adjective + yahay/tahay",
      "aan = I, aad = you, uu = he/it, ay = she/it/they"
    ],
    examples: [
      {
        somali: "Cali wuu tegay.",
        english: "Ali left.",
        literal: "Ali he-is-stating left.",
        breakdown: [
          { word: "Cali", role: "subject noun (masc.)" },
          { word: "wuu", role: "waa + uu (he)" },
          { word: "tegay", role: "verb: left" }
        ]
      },
      {
        somali: "Anigu waan weyn ahay.",
        english: "I am big.",
        literal: "I I-am-stating big am.",
        breakdown: [
          { word: "Anigu", role: "long pronoun: I (subject-marked)" },
          { word: "waan", role: "waa + aan (I)" },
          { word: "weyn", role: "adjective: big" },
          { word: "ahay", role: "copula: am (1sg)" }
        ]
      },
      {
        somali: "Faadumo way qaylisay.",
        english: "Faduma screamed.",
        breakdown: [
          { word: "Faadumo", role: "subject noun (fem.)" },
          { word: "way", role: "waa + ay (she)" },
          { word: "qaylisay", role: "verb: screamed" }
        ]
      },
      {
        somali: "Bisaddu dibedda ayaa ay u carartay.",
        english: "The cat fled outside.",
        literal: "The-cat outside FOC she toward fled.",
        breakdown: [
          { word: "Bisaddu", role: "subject: the cat (fem, subject-marked)" },
          { word: "dibedda", role: "adverbial: outside" },
          { word: "ayaa", role: "focus particle" },
          { word: "ay", role: "clitic: she" },
          { word: "u", role: "preposition: toward" },
          { word: "carartay", role: "verb: fled" }
        ]
      },
      {
        somali: "Gabáadhu waa ay wéyn tahay.",
        english: "The girl is big.",
        literal: "The-girl is she big is.",
        breakdown: [
          { word: "Gabáadhu", role: "subject: the girl (fem)" },
          { word: "waa", role: "particle: is" },
          { word: "ay", role: "clitic: she (optional here)" },
          { word: "wéyn", role: "adjective: big" },
          { word: "tahay", role: "copula: is" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Omitting the subject clitic when a noun subject is present", correction: "Always include the clitic: Cali wuu tegay", explanation: "Even with an explicit noun subject, the short subject clitic is obligatory in positive declarative clauses." },
      { mistake: "Using long pronouns instead of clitics as default subject markers", correction: "Use clitics (uu/ay) with particles", explanation: "Long pronouns (isaga/iyada) are used for emphasis or focus, not as the default subject marker." },
      { mistake: "Confusing ay (she) with ay (they)", correction: "Context determines meaning", explanation: "The clitic ay covers both feminine singular and plural subjects. Only context clarifies which is meant." }
    ],
    exercises: [
      { question: "Contract: waa + aan = ?", options: ["waan", "waa aan", "aanwaa", "waa"], answer: 0, explanation: "waa + aan contracts to waan, meaning 'I am/do'." },
      { question: "Which clitic means 'he/it' (masculine)?", options: ["ay", "uu", "aad", "aan"], answer: 1, explanation: "uu is the 3rd person masculine singular clitic." },
      { question: "Fill in: Sahra ____ shaqaysaa. (Sahra works.)", options: ["wuu", "way", "waad", "waan"], answer: 1, explanation: "Sahra is a woman's name (feminine), so we use way (waa + ay = she is/does)." },
      { question: "When is the subject clitic OPTIONAL?", options: ["In positive declaratives", "In questions and negatives with ma", "Never", "Only with verbs"], answer: 1, explanation: "In questions and negative clauses with the particle ma/mi, the short subject pronouns are optional." }
    ],
    quickRef: [
      { label: "aan", value: "I" },
      { label: "aad", value: "you (sg)" },
      { label: "uu", value: "he / it (masc)" },
      { label: "ay", value: "she / it (fem) / they" },
      { label: "aannu", value: "we (excl)" },
      { label: "aynu", value: "we (incl)" },
      { label: "aydin", value: "you (pl)" }
    ]
  },
  {
    id: 3,
    title: "Focus Markers — waa",
    overview: "The particle waa is the most common sentence type marker in Somali. It expresses that the PREDICATE (the action or state) is the most important part of the sentence — this is called 'predicate focus.' When you simply state a fact without emphasizing any particular word, waa is your default marker. As Nilsson notes, waa 'expresses that the predicate is the most important part of the clause' (2025, p. 174).",
    rule: `The particle **waa** expresses PREDICATE FOCUS — the verb or adjective is the most important information. It is the DEFAULT marker for simple declarative sentences.

**Structure:** [Subject] + [waa + clitic] + [Object] + [Verb]

**Key properties:**
- waa is a SENTENCE PARTICLE, not a verb
- It fuses with subject clitics: waan, waad, wuu, way, etc.
- It CANNOT co-occur with baa/ayaa/waxa in the same clause
- It marks the predicate (verb/adjective) as focused
- Every neutral statement uses waa

**waa with the copula yahay/tahay:**
When the predicate is a noun or adjective, Somali uses the copular verb yahay (masc) / tahay (fem) / yihiin (plural):
- Sahra waa macallimad. → Sahra is a teacher. (no yahay needed with noun)
- Gabáadhu waa ay wéyn tahay. → The girl is big. (tahay with adjective)

**Special case — noun-only predicates:**
When the predicate is just a noun phrase (no adjective or verb), yahay/tahay is OMITTED:
- Sahra waa macallimad. (NOT: Sahra waa ay tahay macallimad.)

**The negative of waa:**
The negator má replaces waa and takes negative verb endings:
- Waan tagay. → Ma aan tagin. (I went. → I didn't go.)`,
    keyConcepts: [
      "waa expresses PREDICATE FOCUS — the verb/action is emphasized",
      "waa is the DEFAULT marker for neutral statements",
      "It fuses with subject clitics: waan, waad, wuu, way",
      "With noun-only predicates, yahay/tahay is omitted",
      "With adjectives, yahay/tahay is required",
      "The negative replaces waa with má"
    ],
    examples: [
      {
        somali: "Cali wuu cunay.",
        english: "Ali ate.",
        literal: "Ali he-is-stating ate.",
        breakdown: [
          { word: "Cali", role: "subject" },
          { word: "wuu", role: "waa + uu (he)" },
          { word: "cunay", role: "verb: ate" }
        ]
      },
      {
        somali: "Sahra waa macallimad.",
        english: "Sahra is a teacher.",
        breakdown: [
          { word: "Sahra", role: "subject" },
          { word: "waa", role: "predicate focus marker" },
          { word: "macallimad", role: "predicate noun: teacher" }
        ]
      },
      {
        somali: "Anigu waan weyn ahay.",
        english: "I am big.",
        breakdown: [
          { word: "Anigu", role: "subject (I)" },
          { word: "waan", role: "waa + aan (I)" },
          { word: "weyn", role: "adjective: big" },
          { word: "ahay", role: "copula: am" }
        ]
      },
      {
        somali: "Waan tagayaa.",
        english: "I am going.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "tagayaa", role: "progressive verb: going" }
        ]
      },
      {
        somali: "Ma aan tagin.",
        english: "I didn't go.",
        literal: "Not I went-not.",
        breakdown: [
          { word: "Ma", role: "negator (replaces waa)" },
          { word: "aan", role: "clitic: I" },
          { word: "tagin", role: "negative verb: didn't go" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using yahay/tahay with noun-only predicates", correction: "Omit the copula: Sahra waa macallimad", explanation: "When the predicate is just a noun (no adjective), yahay/tahay is NOT used." },
      { mistake: "Using waa and baa in the same clause", correction: "Choose one: waa (predicate focus) OR baa (noun focus)", explanation: "waa and baa/ayaa/waxa are mutually exclusive in the same clause." },
      { mistake: "Forgetting the subject clitic after waa", correction: "Include the clitic: wuu, way, waan, waad", explanation: "waa must always be contracted with a subject clitic in positive declaratives." }
    ],
    exercises: [
      { question: "What does waa express?", options: ["Noun focus", "Predicate focus", "Question", "Negation"], answer: 1, explanation: "waa expresses predicate focus — the verb or adjective is the most important part." },
      { question: "Translate: 'He is a student.' (ardo)", options: ["Wuu ardo yahay.", "Wuu ardo.", "Waa ardo.", "Ardo waa uu yahay."], answer: 2, explanation: "With a noun-only predicate, yahay is omitted: Wuu ardo. (or: Waa ardo with waa)" },
      { question: "Negate: Waan tagay. (I went.)", options: ["Ma aan tagin.", "Maan tagay.", "Waan tagin.", "Ma uu tagin."], answer: 0, explanation: "Replace waa with ma and use negative verb form: Ma aan tagin." },
      { question: "Which is correct for 'She is beautiful'?", options: ["Way qurux badan tahay.", "Waa qurux badan.", "Waa ay tahay qurux.", "Qurux way tahay."], answer: 0, explanation: "With an adjective predicate, tahay is required: Way qurux badan tahay." }
    ],
    quickRef: [
      { label: "waa + aan", value: "waan (I am/do)" },
      { label: "waa + aad", value: "waad (you are/do)" },
      { label: "waa + uu", value: "wuu (he is/does)" },
      { label: "waa + ay", value: "way (she is/does)" },
      { label: "Noun predicate", value: "waa + noun (no yahay)" },
      { label: "Adjective predicate", value: "waa + adj + yahay/tahay" },
      { label: "Negative", value: "má replaces waa" }
    ]
  },
  {
    id: 4,
    title: "Focus Markers — baa, ayaa, waxa(a)",
    overview: "Unlike waa which focuses on the predicate (verb), baa, ayaa, and waxa(a) focus on a NOUN — highlighting who or what is performing the action. These markers are the key to Somali's focus system, which is fundamentally different from English word order emphasis. As Nilsson states: 'Ayaa and baa both express that the noun phrase immediately preceding the particle is focused. They are synonymous and mutually exchangeable.' (2025, p. 176)",
    rule: `**baa / ayaa** — Noun Focus (the noun BEFORE the particle is emphasized)
- Structure: [Focused Noun] + baa/ayaa + [rest of clause]
- baa and ayaa are SYNONYMOUS
- ayaa is perceived as more formal; baa as more colloquial
- The focused noun must come FIRST in the clause

**waxa(a) / waxaa** — Final Noun Focus (the noun AFTER the verb is emphasized)
- Structure: [Clause] + waxa + [Focused Noun]
- The focused element comes at the END of the clause
- Used when you want to reveal or emphasize the object/result

**Key differences:**
- baa/ayaa: focus is BEFORE the particle
- waxa: focus is AFTER the particle (at the end)
- waa: no noun focus, just predicate focus

**Reduced verb forms with focus:**
When a noun is focused with baa/ayaa, the verb uses its REDUCED form (without full person endings):
- Cali baa cunay. (NOT Cali baa uu cunay)
- Focused subjects do NOT take short subject clitics

**Combined usage:**
Sometimes both baa/ayaa and waxa are used together:
- Maalin maalmaha ka mid ah ayaa waxa ay socot u aadeen meel kayn ah.
  (One day they went for a walk to a place where there was a forest.)

**Focus with wh-words:**
Wh-words are usually focused:
- Sidee baa ay dadku u isticmaalaan biyaha? (How do people use water?)
- Maxaa dhici doona? (What will happen?)`,
    keyConcepts: [
      "baa/ayaa focus the noun BEFORE the particle",
      "waxa focuses the noun AFTER the verb (at the end)",
      "baa and ayaa are synonymous — baa is more colloquial",
      "Focused nouns use REDUCED verb forms (no clitics)",
      "Wh-words are usually focused",
      "baa/ayaa and waxa can co-occur in the same clause"
    ],
    examples: [
      {
        somali: "Cali baa cunay.",
        english: "ALI ate. (not someone else)",
        breakdown: [
          { word: "Cali", role: "focused subject" },
          { word: "baa", role: "noun focus marker" },
          { word: "cunay", role: "reduced verb: ate" }
        ]
      },
      {
        somali: "Hooyo cunto ayaa ay karinaysaa.",
        english: "Mother is cooking FOOD. (not something else)",
        breakdown: [
          { word: "Hooyo", role: "subject: mother" },
          { word: "cunto", role: "focused object: food" },
          { word: "ayaa", role: "noun focus marker" },
          { word: "ay", role: "clitic: she" },
          { word: "karinaysaa", role: "verb: is cooking" }
        ]
      },
      {
        somali: "Waxa uu tagay shaley.",
        english: "He left YESTERDAY. (not today)",
        breakdown: [
          { word: "Waxa", role: "final focus marker" },
          { word: "uu", role: "clitic: he" },
          { word: "tagay", role: "verb: left" },
          { word: "shaley", role: "focused element: yesterday" }
        ]
      },
      {
        somali: "Maxaa dhici doona?",
        english: "What will happen?",
        breakdown: [
          { word: "Maxaa", role: "focused wh-word: what" },
          { word: "dhici", role: "verb: happen" },
          { word: "doona", role: "future auxiliary: will" }
        ]
      },
      {
        somali: "Sidee baa ay dadku u isticmaalaan biyaha?",
        english: "How do people use water?",
        breakdown: [
          { word: "Sidee", role: "wh-word: how" },
          { word: "baa", role: "focus marker" },
          { word: "ay", role: "clitic: they" },
          { word: "dadku", role: "subject: the people" },
          { word: "u", role: "preposition" },
          { word: "isticmaalaan", role: "verb: use" },
          { word: "biyaha", role: "object: the water" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using baa + subject clitic together", correction: "Omit the clitic: Cali baa cunay (not Cali baa uu cunay)", explanation: "When a noun is focused with baa/ayaa, the short subject clitic is NOT used. The verb is in reduced form." },
      { mistake: "Using waa and baa in the same clause", correction: "Choose one focus system per clause", explanation: "waa (predicate focus) and baa (noun focus) are mutually exclusive." },
      { mistake: "Putting the focused noun in the wrong position", correction: "With baa: noun BEFORE. With waxa: noun AFTER the verb.", explanation: "Position matters: baa/ayaa immediately follow the focused noun; waxa(a) places focus at the clause end." }
    ],
    exercises: [
      { question: "What do baa/ayaa focus?", options: ["The verb", "The noun before them", "The noun after the verb", "The preposition"], answer: 1, explanation: "baa/ayaa focus the noun phrase immediately PRECEDING them." },
      { question: "Translate with focus on 'Ali': 'Ali ate the food.'", options: ["Cali wuu cunay cuntada.", "Cali baa cunay cuntada.", "Waxa uu cunay cuntada Cali.", "Cuntada baa Cali cunay."], answer: 1, explanation: "To focus on the subject Ali, use baa after it: Cali baa cunay cuntada." },
      { question: "What's the difference between baa and ayaa?", options: ["baa is formal, ayaa is colloquial", "They are synonymous", "baa questions, ayaa statements", "No difference in meaning"], answer: 1, explanation: "baa and ayaa are synonymous. ayaa is perceived as more formal; baa as more colloquial." },
      { question: "When can baa/ayaa and waxa co-occur?", options: ["Never", "When both a front noun and a final noun are focused", "Only in questions", "Only in negative sentences"], answer: 1, explanation: "Both can appear when there are two focused elements — one at the front (with baa/ayaa) and one at the end (with waxa)." }
    ],
    quickRef: [
      { label: "baa/ayaa", value: "Noun focus BEFORE the particle" },
      { label: "waxa(a)", value: "Noun focus AFTER the verb" },
      { label: "waa", value: "Predicate focus (no noun focus)" },
      { label: "baa + verb", value: "Reduced verb form (no clitic)" },
      { label: "Maxaa?", value: "What? (contracted maxay + baa)" },
      { label: "Yaa?", value: "Who? (contracted ayo + baa)" }
    ]
  },
  {
    id: 5,
    title: "Filler Words & Conversation Flow",
    overview: "Every language has filler words that keep conversation flowing while you think. Somali has its own set of discourse markers that serve the same function as 'well,' 'so,' 'then,' and 'um' in English. Using authentic Somali fillers instead of English ones is a hallmark of natural speech.",
    rule: `**markaas** — then, so (the most common filler; buys thinking time)
- Used to transition between thoughts or actions
- Equivalent to English "so then..." or "well..."

**haye** — okay, alright (acknowledgment + transition)
- Acknowledges what was said and prepares to continue
- Often used to start a response

**sidaas darteed** — because of that, for that reason
- Connects a cause to a consequence
- More formal than casual fillers

**waan ogahay** — I understand / I know
- Shows comprehension before continuing
- Politely acknowledges the speaker

**haddii kale** — otherwise, if not
- Introduces an alternative scenario

**Sidee tahay?** — How are you? (common opener)
- Literally: "How is it?"

**Tips for natural conversation:**
- Replace English "um" with markaas
- Use haye to acknowledge before responding
- sidaas darteed connects thoughts logically
- Never use English fillers when speaking Somali`,
    keyConcepts: [
      "markaas = 'then/so' — the go-to thinking filler",
      "haye = 'okay' — acknowledgment + transition",
      "sidaas darteed = 'because of that' — logical connector",
      "waan ogahay = 'I understand' — comprehension signal",
      "Using Somali fillers makes speech sound natural",
      "English fillers ('um', 'like') break Somali fluency"
    ],
    examples: [
      {
        somali: "Markaas, waxaan u tagay suuqa.",
        english: "So then, I went to the market.",
        breakdown: [
          { word: "Markaas", role: "filler: then/so" },
          { word: "waxaan", role: "waxa + aan (I)" },
          { word: "u", role: "preposition: to" },
          { word: "tagay", role: "verb: went" },
          { word: "suuqa", role: "definite noun: the market" }
        ]
      },
      {
        somali: "Haye, waan fahmay.",
        english: "Okay, I understand.",
        breakdown: [
          { word: "Haye", role: "filler: okay" },
          { word: "waan", role: "waa + aan (I)" },
          { word: "fahmay", role: "verb: understood" }
        ]
      },
      {
        somali: "Waan ogahay, laakiin ma hubo.",
        english: "I know, but I'm not sure.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "ogahay", role: "verb: know" },
          { word: "laakiin", role: "conjunction: but" },
          { word: "ma", role: "negation" },
          { word: "hubo", role: "verb: be sure" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using English fillers in Somali conversation", correction: "Use markaas, haye, sidaas darteed", explanation: "English fillers like 'um' and 'like' immediately mark you as a non-native speaker." },
      { mistake: "Overusing any single filler", correction: "Vary between markaas, haye, and pauses", explanation: "Using the same filler repeatedly sounds unnatural. Vary your discourse markers." },
      { mistake: "Using markaas at the start of every sentence", correction: "Reserve markaas for transitions between ideas", explanation: "markaas should connect thoughts, not start every utterance." }
    ],
    exercises: [
      { question: "Which filler means 'then/so'?", options: ["haye", "markaas", "waan ogahay", "sidaas darteed"], answer: 1, explanation: "markaas means 'then' or 'so' — the most common thinking filler." },
      { question: "When would you use 'haye'?", options: ["To ask a question", "To acknowledge and transition", "To express doubt", "To end a conversation"], answer: 1, explanation: "haye = 'okay' — acknowledges what was said and prepares to continue." },
      { question: "Translate: 'Because of that, I stayed home.'", options: ["Sidaas darteed, waxaan joogay guriga.", "Markaas, waxaan joogay guriga.", "Haye, waxaan joogay guriga.", "Waan ogahay, waxaan joogay guriga."], answer: 0, explanation: "sidaas darteed = 'because of that/for that reason'" }
    ],
    quickRef: [
      { label: "markaas", value: "then, so (main filler)" },
      { label: "haye", value: "okay, alright" },
      { label: "sidaas darteed", value: "because of that" },
      { label: "waan ogahay", value: "I understand" },
      { label: "haddii kale", value: "otherwise" },
      { label: "Sidee tahay?", value: "How are you?" }
    ]
  },
  {
    id: 6,
    title: "The 3 Verb Conjugations",
    overview: "Somali verbs fall into three conjugation classes based on the final sound of the verb stem. Understanding which conjugation a verb belongs to is essential because it determines how the verb is inflected for person, tense, and aspect. As Nilsson states: 'The verbs in the 3rd conjugation have two stems, one that ends in /t/ or /d/, and one that ends in /a/' (2025, p. 93).",
    rule: `**Conjugation 1:** Stem ends in a CONSONANT
- Infinitive ending: **-i**
- Present: stem + -aa/-taa (with sound changes)
- Examples: qor- (write), akhri- (read), tag- (go), cun- (eat)
- qor-taa → you write; qor-aa → he writes

**Conjugation 2:** Stem ends in **-i** (vowel stem)
- Infinitive ending: **-n**
- Present: stem + -y- buffer + endings
- Examples: fiiri- (look), shaqee- (work), samee- (do)
- fiiri-saa → you look; fiir-aa → he looks (with y: fiirí-y-aa)

**Conjugation 3:** Stem has TWO stems — C-stem and V-stem
- C-stem ends in /t/ or /d/
- V-stem ends in /a/ or /o/
- Infinitive ending: **-n**
- Examples: booqd- / booqa- (visit), qaadd- / qaada- (take), socod- / soco- (walk)
- booqdaa (C-stem) / booqataa (V-stem) → she visits

**Sound changes in Conjugation 1:**
The final consonant of the stem interacts with the initial consonant of the ending:
- /m/ + /t/ → /n/ + /d/ (cun- + -taa → cuntaa)
- /l/ + /t/ → /sh/ (gel- + -taa → geshtaa)
- /r/ + /t/ → /d/ (qor- + -taa → qortaa)
- /g/ + /t/ → /g/ (tag- + -taa → tagtaa)`,
    keyConcepts: [
      "Conjugation 1: consonant stem (qor-, akhri-, tag-)",
      "Conjugation 2: vowel stem ending in -i (fiiri-, shaqee-)",
      "Conjugation 3: dual stem C-stem/V-stem (booqd-/booqa-)",
      "Sound changes occur at the stem-ending boundary",
      "Infinitive: -i for C1, -n for C2 and C3",
      "The progressive uses the infinitive + -n- + -ay-"
    ],
    examples: [
      {
        somali: "Waan qoraa.",
        english: "I write.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "qoraa", role: "C1 present 1sg: write" }
        ]
      },
      {
        somali: "Waxay fiiraysaa.",
        english: "She is looking.",
        breakdown: [
          { word: "Waxay", role: "waxa + ay (she)" },
          { word: "fiiraysaa", role: "C2 progressive: looking" }
        ]
      },
      {
        somali: "Wuu booqdaa.",
        english: "He visits.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "booqdaa", role: "C3 present 3sg: visits" }
        ]
      },
      {
        somali: "Waan cunayaa.",
        english: "I am eating.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "cunayaa", role: "C1 progressive: am eating" }
        ]
      },
      {
        somali: "Way shaqaysaa.",
        english: "She works. / She is working.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "shaqaysaa", role: "C2 present: works" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Treating all verbs as Conjugation 1", correction: "Identify the stem ending to determine conjugation", explanation: "Verbs like shaqee- (C2) and booqd- (C3) have different patterns from qor- (C1)." },
      { mistake: "Forgetting the -y- buffer in C2", correction: "C2 uses -y-: fiirí-y-aa", explanation: "Conjugation 2 verbs insert a -y- between the stem and ending." },
      { mistake: "Using only one stem for C3 verbs", correction: "C3 has two stems: booqd- and booqa-", explanation: "Conjugation 3 verbs alternate between a consonant stem and a vowel stem." }
    ],
    exercises: [
      { question: "What conjugation is 'qor' (write)?", options: ["C1 (consonant stem)", "C2 (vowel stem)", "C3 (dual stem)", "Irregular"], answer: 0, explanation: "qor- ends in a consonant (r) → Conjugation 1." },
      { question: "What conjugation is 'shaqee' (work)?", options: ["C1", "C2", "C3", "Irregular"], answer: 1, explanation: "shaqee- ends in -i (vowel) → Conjugation 2." },
      { question: "What conjugation is 'booqo' (visit)?", options: ["C1", "C2", "C3", "Irregular"], answer: 2, explanation: "booq- has two stems (booqd- and booqa-) → Conjugation 3." },
      { question: "How do you form the progressive of C2 verbs?", options: ["Stem + ay + ending", "Infinitive + n + ay + ending", "Stem + y + ay + ending", "Stem + n + ending"], answer: 1, explanation: "C2 progressive uses infinitive + -n- + -ay-: fiirínayaa." }
    ],
    quickRef: [
      { label: "C1 stem", value: "ends in consonant" },
      { label: "C1 infinitive", value: "-i (qor-i)" },
      { label: "C2 stem", value: "ends in -i" },
      { label: "C2 infinitive", value: "-n (fiirí-n)" },
      { label: "C3 stem", value: "dual: C-stem + V-stem" },
      { label: "C3 infinitive", value: "-n (booqá-n)" },
      { label: "Progressive (all)", value: "infinitive + -n- + -ay- + ending" }
    ]
  },
  {
    id: 7,
    title: "Present Habitual Tense",
    overview: "The present habitual expresses actions that happen regularly or customarily — things you do as a habit. It is formed with the simple present form of the verb (without the progressive -ay- infix). This is the most common way to talk about daily routines and habitual activities.",
    rule: `The present habitual uses the SIMPLE PRESENT form of the verb:
- Conjugation 1: stem + person ending (-aa, -taa, -naa, etc.)
- Conjugation 2: stem + -y- buffer + person ending
- Conjugation 3: C-stem or V-stem + person ending

**Formation (Conjugation 1 — qor- 'write'):**
- waan qoraa = I write / I am writing (habitual)
- waad qortaa = you write
- wuu qoraa = he writes
- way qortaa = she writes
- waannu qornaa = we write
- waydin qortaan = you (pl) write
- way qoraan = they write

**The habitual vs. progressive:**
- Habitual: waan qoraa = I write (regularly)
- Progressive: waan qorayaa = I am writing (right now)

**Usage:**
- Daily routines: "Waan kacaa lixda subaxnimo." (I get up at six in the morning.)
- General truths: "Shimbiruhu ukun ayey dhalaan." (Birds lay eggs.)
- Habitual actions: "Waan cuno bariis." (I eat rice.)

**Negative habitual:**
Replace waa with ma and use negative verb forms:
- Ma aan qorin. = I don't write.
- Ma uu cuno. = He doesn't eat.`,
    keyConcepts: [
      "Present habitual = simple present form (no -ay- infix)",
      "Used for daily routines, habits, and general truths",
      "Differs from progressive: qoraa (habitual) vs qorayaa (right now)",
      "Negative: replace waa with ma, use -in ending",
      "Same person endings across all conjugations"
    ],
    examples: [
      {
        somali: "Waan kacaa lixda subaxnimo.",
        english: "I get up at six in the morning.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "kacaa", role: "C1 present habitual: get up" },
          { word: "lixda", role: "definite number: the six" },
          { word: "subaxnimo", role: "noun: in the morning" }
        ]
      },
      {
        somali: "Wuu shaqeeyaa xafiiska.",
        english: "He works at the office.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "shaqeeyaa", role: "C2 present habitual: works" },
          { word: "xafiiska", role: "definite noun: the office" }
        ]
      },
      {
        somali: "Way cuntaa bariiska.",
        english: "She eats the rice.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "cuntaa", role: "C1 present habitual: eats" },
          { word: "bariiska", role: "definite noun: the rice" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using progressive for habitual actions", correction: "Use simple present for habits", explanation: "'Waan cuno' (habitual) not 'Waan cunaya' (progressive) for 'I eat (regularly).'" },
      { mistake: "Forgetting person endings", correction: "Match person: -aa (I/he), -taa (you/she), -naa (we)", explanation: "Each person has a distinct ending that must match the subject." },
      { mistake: "Using waa in negative habitual", correction: "Use ma + negative verb", explanation: "Negation replaces waa with ma and changes the verb ending." }
    ],
    exercises: [
      { question: "How do you form the present habitual?", options: ["Stem + -ay- + ending", "Simple present (no -ay-)", "Infinitive + doonaa", "Stem + -n- + ending"], answer: 1, explanation: "The habitual uses the simple present form without the progressive -ay- infix." },
      { question: "What's the difference between 'Waan cuno' and 'Waan cunaya'?", options: ["No difference", "Habitual vs progressive", "Past vs present", "Formal vs informal"], answer: 1, explanation: "Waan cuno = I eat (habitually). Waan cunaya = I am eating (right now)." },
      { question: "Negate: 'Waan qoraa.' (I write.)", options: ["Ma aan qorin.", "Waan qorin.", "Ma uu qorin.", "Maan qoraa."], answer: 0, explanation: "Replace waa with ma and use negative verb form: Ma aan qorin." }
    ],
    quickRef: [
      { label: "1sg (I)", value: "-aa" },
      { label: "2sg (you)", value: "-taa" },
      { label: "3sg m (he)", value: "-aa" },
      { label: "3sg f (she)", value: "-taa" },
      { label: "1pl (we)", value: "-naa" },
      { label: "2pl (you pl)", value: "-taan" },
      { label: "3pl (they)", value: "-aan" },
      { label: "Habitual", value: "simple present (no -ay-)" },
      { label: "Negative", value: "ma + verb + -in" }
    ]
  },
  {
    id: 8,
    title: "Past Tense",
    overview: "The past tense in Somali is formed by replacing the present tense long vowel -aa with the past tense marker -ay. This applies across all conjugations. The past tense is used for completed actions in the past. As noted by Nilsson (2025, p. 92), 'The past tense is formed with the ending -ay.'",
    rule: `**Formation:** Replace the present tense ending -aa with -ay.

**Conjugation 1 (qor- 'write'):**
- waan qoray = I wrote
- waad qortay = you wrote
- wuu qoray = he wrote
- way qortay = she wrote
- waannu qornay = we wrote
- waydin qorteen = you (pl) wrote
- way qoreen = they wrote

**Conjugation 2 (fiiri- 'look'):**
- waan fiiray = I looked
- waad fiirtay = you looked
- wuu fiiray = he looked
- way fiirtay = she looked

**Conjugation 3 (booqd-/booqa- 'visit'):**
- waan booqday = I visited (C-stem)
- waad booqatay = you visited (V-stem)
- wuu booqday = he visited
- way booqatay = she visited

**Progressive past:**
Add -ay- before the past ending:
- waan qorayay = I was writing
- way fiiraysay = she was looking

**Irregular past forms:**
Some common verbs have irregular past stems:
- tag (go) → tegay (went)
- yimid (came) — suppletive
- yahay (is) → ahaa (was)
- leeyahay (has) → lahaa (had)

**Habitual past:**
Use jiray/jirtay after the infinitive:
- waan qori jiray = I used to write`,
    keyConcepts: [
      "Replace -aa (present) with -ay (past)",
      "Same person endings as present, just with -ay",
      "Progressive past: add -ay- before -ay ending",
      "Some common verbs have irregular past stems",
      "Habitual past: infinitive + jiray/jirtay",
      "Past tense refers to completed actions"
    ],
    examples: [
      {
        somali: "Waan cunay.",
        english: "I ate.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "cunay", role: "C1 past: ate" }
        ]
      },
      {
        somali: "Wuu tegay.",
        english: "He went.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "tegay", role: "irregular past of tag (go)" }
        ]
      },
      {
        somali: "Way qortay.",
        english: "She wrote.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "qortay", role: "C1 past 3sg f: wrote" }
        ]
      },
      {
        somali: "Waan qorayay.",
        english: "I was writing.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "qorayay", role: "C1 progressive past: was writing" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using present -aa for past actions", correction: "Use -ay for past tense", explanation: "Present: qoraa (I write). Past: qoray (I wrote)." },
      { mistake: "Forgetting irregular past stems", correction: "Memorize: tag→tegay, yimid (came)", explanation: "Common verbs have suppletive or irregular past forms." },
      { mistake: "Confusing simple past with progressive past", correction: "qoray = wrote; qorayay = was writing", explanation: "The progressive adds -ay- before the past ending." }
    ],
    exercises: [
      { question: "How is the past tense formed?", options: ["Add -ay to the stem", "Replace -aa with -ay", "Add -doon to the stem", "Change the stem vowel"], answer: 1, explanation: "Replace the present -aa ending with -ay: qoraa → qoray." },
      { question: "What is the past of 'tag' (go)?", options: ["tagay", "tegay", "tigay", "tagey"], answer: 1, explanation: "tag has an irregular past stem: tegay." },
      { question: "Translate: 'She was reading.' (akhri-)", options: ["Way akhriyay.", "Way akhrisay.", "Way akhri jirtay.", "Way akhrinaysay."], answer: 3, explanation: "Progressive past of C2: akhri + n + ay + say = akhrinaysay." }
    ],
    quickRef: [
      { label: "Present → Past", value: "-aa → -ay" },
      { label: "1sg past", value: "-ay" },
      { label: "2sg past", value: "-tay" },
      { label: "3sg m past", value: "-ay" },
      { label: "3sg f past", value: "-tay" },
      { label: "1pl past", value: "-nay" },
      { label: "Irregular: tag", value: "tegay" },
      { label: "Irregular: yimid", value: "came (suppletive)" }
    ]
  },
  {
    id: 9,
    title: "Negation (ma)",
    overview: "Negation in Somali uses the particle má. CRITICALLY, the position of má determines its meaning: at the START of a sentence it forms a question, but MID-sentence (before the verb) it creates negation. This is one of the most important distinctions in Somali grammar.",
    rule: `**The double life of ma:**

**1. ma at the START of the clause → QUESTION**
- Miyuu tagay? = Did he go?
- Ma waxaad rabtaa? = Is it what you want?

**2. ma MID-sentence (before the verb) → NEGATION**
- Ma aan tagin. = I didn't go.
- Ma uu cuno. = He doesn't eat.

**Negation formation:**
1. Replace waa with ma
2. Use the negative verb form (ending in -in/-n)
3. The subject clitic is OPTIONAL in negative clauses

**Negative verb endings:**
- Present: ma aan qorin (I don't write)
- Past: ma aan qorin (I didn't write)
- Progressive: ma aan qorinayo (I am not writing)

**Negative with baa/ayaa:**
- Ma (uu) cuno. = He doesn't eat. (clitic optional)
- Faarax wuu heesaa, Cabdise ma (uu) heeso. = Farah sings, but Abdi doesn't.

**Question with ma (start of clause):**
- Ma tagaysaa? = Are you going?
- Ma cuntay? = Did you eat?
- Miyuu yimid? = Did he come? (contracted: ma + uu)

**The -in ending:**
The negative marker is -in for most verbs. Some verbs have special negative forms.

**Negative progressive:**
Add -in before the progressive -ay-:
- ma aan qorinayo = I am not writing
- ma uu shaqaynayo = He is not working`,
    keyConcepts: [
      "ma at START = question",
      "ma MID-sentence = negation",
      "Negation: replace waa with ma, add -in verb ending",
      "Subject clitics are OPTIONAL in negatives",
      "Negative progressive: -in- + -ay-",
      "Questions contract ma + clitic: ma+uu → miyuu"
    ],
    examples: [
      {
        somali: "Ma aan tagin.",
        english: "I didn't go.",
        breakdown: [
          { word: "Ma", role: "negator (replaces waa)" },
          { word: "aan", role: "clitic: I (optional)" },
          { word: "tagin", role: "negative verb: didn't go" }
        ]
      },
      {
        somali: "Miyuu yimid?",
        english: "Did he come?",
        breakdown: [
          { word: "Miyuu", role: "ma + uu (question: did he)" },
          { word: "yimid", role: "verb: came" }
        ]
      },
      {
        somali: "Ma tagaysaa?",
        english: "Are you going?",
        breakdown: [
          { word: "Ma", role: "question particle" },
          { word: "tagaysaa", role: "verb: going" }
        ]
      },
      {
        somali: "Ma uu cuno.",
        english: "He doesn't eat.",
        breakdown: [
          { word: "Ma", role: "negator" },
          { word: "uu", role: "clitic: he (optional)" },
          { word: "cuno", role: "negative verb: doesn't eat" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Confusing question ma with negation ma", correction: "Check position: start = question, mid = negation", explanation: "Ma at the start asks a question. Ma before the verb negates." },
      { mistake: "Using waa + negative verb", correction: "Replace waa with ma: Ma aan tagin", explanation: "Negation requires replacing waa with ma, not adding ma to waa." },
      { mistake: "Forgetting -in ending in negative", correction: "Add -in to the verb stem", explanation: "The negative requires the -in suffix on the verb." }
    ],
    exercises: [
      { question: "What does ma at the START of a clause mean?", options: ["Negation", "Question", "Focus", "Emphasis"], answer: 1, explanation: "ma at the start of a clause forms a yes/no question." },
      { question: "What does ma MID-sentence mean?", options: ["Question", "Negation", "Focus", "Time"], answer: 1, explanation: "ma before the verb = negation." },
      { question: "Negate: 'Waan cunay.' (I ate.)", options: ["Ma aan cunin.", "Maan cunay.", "Waan cunin.", "Ma uu cunin."], answer: 0, explanation: "Replace waa with ma, use -in: Ma aan cunin." },
      { question: "How do you ask 'Did he go?'", options: ["Ma uu tagay?", "Miyuu tagay?", "Ma tagay uu?", "Wuu tagay ma?"], answer: 1, explanation: "ma + uu contracts to miyuu at the start: Miyuu tagay?" }
    ],
    quickRef: [
      { label: "ma (start)", value: "yes/no question" },
      { label: "ma (mid)", value: "negation" },
      { label: "Neg: replace waa", value: "with ma" },
      { label: "Neg verb ending", value: "-in" },
      { label: "Neg progressive", value: "-in- + -ay-" },
      { label: "ma+uu", value: "miyuu" },
      { label: "ma+ay", value: "miyay" },
      { label: "Clitic in neg", value: "optional" }
    ]
  },
  {
    id: 10,
    title: "Yes/No Questions",
    overview: "Yes/no questions in Somali are formed by replacing the declarative particle waa with the question particle ma at the beginning of the clause. The subject clitic contracts with ma (ma+uu → miyuu, ma+ay → miyay). This is straightforward once you understand the ma particle from the negation lesson.",
    rule: `**Formation:** Replace waa with ma at the START of the clause.

**Basic yes/no questions:**
- Statement: Wuu cunay. (He ate.)
- Question: Miyuu cunay? (Did he eat?)

**Clitic contractions with ma:**
- ma + aan → ma aan (or ma'aan)
- ma + aad → ma aad (or ma'aad)
- ma + uu → **miyuu**
- ma + ay → **miyay**
- ma + aannu → ma aannu
- ma + aynu → ma aynu
- ma + aydin → ma aydin

**Responses:**
- Haa, wuu cunay. = Yes, he ate.
- Maya, ma (uu) cuno. = No, he didn't eat.

**Questions with baa/ayaa:**
When a noun is focused, the question uses reduced forms:
- Cali baa cunay. (ALI ate.)
- Cali baa cunay? (Did ALI eat?)

**Negative questions:**
- Miyuu cuno? = Doesn't he eat?
- Ma aan tagin? = Didn't I go?

**Rhetorical questions:**
Sometimes questions are used rhetorically with baa:
- Ma waxaad rabtaa inaad la cunto? (Don't you want to eat with us?)

**Questions without a clitic:**
- Ma tagaysaa? = Are you going? (no clitic needed with 2nd person)`,
    keyConcepts: [
      "Replace waa with ma at the START to form a question",
      "Clitics contract: ma+uu → miyuu, ma+ay → miyay",
      "Haa = yes, Maya = no",
      "Questions with focus (baa) use reduced verb forms",
      "Negative questions use ma + negative verb",
      "Clitics are optional in questions"
    ],
    examples: [
      {
        somali: "Miyuu cunay?",
        english: "Did he eat?",
        breakdown: [
          { word: "Miyuu", role: "ma + uu (question: did he)" },
          { word: "cunay", role: "verb: ate" }
        ]
      },
      {
        somali: "Haa, wuu cunay.",
        english: "Yes, he ate.",
        breakdown: [
          { word: "Haa", role: "yes" },
          { word: "wuu", role: "waa + uu (he)" },
          { word: "cunay", role: "verb: ate" }
        ]
      },
      {
        somali: "Maya, ma uu cuno.",
        english: "No, he didn't eat.",
        breakdown: [
          { word: "Maya", role: "no" },
          { word: "ma", role: "negator" },
          { word: "uu", role: "clitic: he" },
          { word: "cuno", role: "negative verb: didn't eat" }
        ]
      },
      {
        somali: "Ma waxaad rabtaa inaad la cunto?",
        english: "Don't you want to eat with us?",
        breakdown: [
          { word: "Ma", role: "question particle" },
          { word: "waxaad", role: "waxa + aad (you)" },
          { word: "rabtaa", role: "verb: want" },
          { word: "inaad", role: "ina + aad (that you)" },
          { word: "la", role: "preposition: with" },
          { word: "cunto", role: "verb: eat" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Putting ma in the middle of the clause for questions", correction: "ma must be at the START for questions", explanation: "Question ma is clause-initial. Mid-clause ma is negation." },
      { mistake: "Using waa in the answer to a question", correction: "Use waa in affirmative answers: Haa, wuu cunay", explanation: "Affirmative answers use waa. Negative answers use ma." },
      { mistake: "Forgetting the contraction ma+uu → miyuu", correction: "Contract: ma + uu = miyuu", explanation: "The contraction is standard in questions." }
    ],
    exercises: [
      { question: "How do you form a yes/no question?", options: ["Add ma at the end", "Replace waa with ma at the start", "Use baa instead of waa", "Add a question mark"], answer: 1, explanation: "Replace waa with ma at the beginning of the clause." },
      { question: "What is ma + uu contracted to?", options: ["ma'uu", "miyuu", "ma uu", "mi'uu"], answer: 1, explanation: "ma + uu → miyuu (standard contraction)." },
      { question: "Answer affirmatively: 'Miyuu tagay?' (Did he go?)", options: ["Haa, wuu tagay.", "Maya, ma uu tagin.", "Wuu tagay.", "Haa, ma uu tagay."], answer: 0, explanation: "Affirmative: Haa, wuu tagay. (Yes, he went.)" }
    ],
    quickRef: [
      { label: "ma (question)", value: "replaces waa at start" },
      { label: "ma+uu", value: "miyuu" },
      { label: "ma+ay", value: "miyay" },
      { label: "Haa", value: "yes" },
      { label: "Maya", value: "no" },
      { label: "Affirmative answer", value: "Haa, wuu..." },
      { label: "Negative answer", value: "Maya, ma uu..." }
    ]
  },
  {
    id: 11,
    title: "Prepositions (u, ku, ka, la)",
    overview: "Somali prepositions are a closed class of four words: u, ku, ka, la. They are critically different from English prepositions because they cluster IMMEDIATELY BEFORE THE VERB, not after the noun. This is a defining feature of Somali SOV (Subject-Object-Verb) word order. Multiple prepositions can merge into blended forms.",
    rule: `**The four prepositions:**
- **u** — to, for, toward
- **ku** — in, at, by, with (instrumental)
- **ka** — from, out of, about, than
- **la** — with (comitative)

**CRITICAL: Prepositions go BEFORE the verb, not after the noun!**
- English: "He went to the market" — "to" follows "market"
- Somali: *Wuu u tegay suuqa* — "u" (to) goes BEFORE "tegay" (went)

**Blended prepositions (two merge into one):**
- u + ku → **ugu** (for + in)
- u + ka → **uga** (for + from)
- ku + la → **kula** (in + with)
- ka + la → **kala** (from + with/apart)
- u + la → **ula** (for + with)

**Prepositions + object clitics:**
- u + i → **ii** (to me)
- ku + ku → **kugu** (in you)
- ka + na → **kana** (from us)
- u + na → **noo** (for us)

**With verbs of motion:**
Prepositions are essential with motion verbs:
- Wuu u tegay suuqa. (He went to the market.)
- Wuu ka yimid guriga. (He came from the house.)
- Way ku jirtaa xafiiska. (She is at the office.)

**With the copula:**
Prepositions can combine with the copula lahayd:
- Wuu ku jiray xafiiska. (He was at the office.)
- Way ka hadlaysaa arimahaas. (She is talking about those things.)`,
    keyConcepts: [
      "4 prepositions: u, ku, ka, la",
      "Prepositions go BEFORE the verb (SOV order)",
      "Two prepositions can blend: u+ku=ugu, u+ka=uga",
      "Prepositions + object clitics blend: u+i=ii, ka+na=kana",
      "Motion verbs require prepositions",
      "ku = in/at, ka = from, u = to/for, la = with"
    ],
    examples: [
      {
        somali: "Wuu u tegay suuqa.",
        english: "He went to the market.",
        literal: "He to went the-market.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "u", role: "preposition: to" },
          { word: "tegay", role: "verb: went" },
          { word: "suuqa", role: "definite noun: the market" }
        ]
      },
      {
        somali: "Waxay ku jirtaa xafiiska.",
        english: "She is at the office.",
        breakdown: [
          { word: "Waxay", role: "waxa + ay (she)" },
          { word: "ku", role: "preposition: in/at" },
          { word: "jirtaa", role: "verb: is (located)" },
          { word: "xafiiska", role: "definite noun: the office" }
        ]
      },
      {
        somali: "Wuu ka yimid guriga.",
        english: "He came from the house.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "ka", role: "preposition: from" },
          { word: "yimid", role: "verb: came" },
          { word: "guriga", role: "definite noun: the house" }
        ]
      },
      {
        somali: "Waxaan ku qoray warqad.",
        english: "I wrote on a paper.",
        breakdown: [
          { word: "Waxaan", role: "waxa + aan (I)" },
          { word: "ku", role: "preposition: on" },
          { word: "qoray", role: "verb: wrote" },
          { word: "warqad", role: "indefinite noun: paper" }
        ]
      },
      {
        somali: "Way la socotaa saaxiibkeeda.",
        english: "She is walking with her friend.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "la", role: "preposition: with" },
          { word: "socotaa", role: "verb: walking" },
          { word: "saaxiibkeeda", role: "possessive: her friend" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Putting prepositions after the noun (English style)", correction: "Prepositions go before the VERB", explanation: "Somali is SOV: prepositions cluster pre-verbally, not post-nominally." },
      { mistake: "Confusing ku (in/at) with ka (from)", correction: "ku = in/at, ka = from", explanation: "These are the most commonly confused prepositions." },
      { mistake: "Using la for all 'with' meanings", correction: "ku = instrumental with, la = comitative with", explanation: "ku is used for tools/instruments; la is used for accompaniment." }
    ],
    exercises: [
      { question: "Where do Somali prepositions go?", options: ["After the noun", "Before the verb", "At the start of the sentence", "After the verb"], answer: 1, explanation: "Prepositions cluster immediately before the verb in Somali." },
      { question: "What is u + ku blended?", options: ["ugu", "uga", "kula", "ula"], answer: 0, explanation: "u + ku → ugu (for + in/at)" },
      { question: "Translate: 'She works at the school.' (dugsiga)", options: ["Way ku shaqeysaa dugsiga.", "Way u shaqeysaa dugsiga.", "Way ka shaqeysaa dugsiga.", "Way la shaqeysaa dugsiga."], answer: 0, explanation: "'at' = ku: Way ku shaqeysaa dugsiga." },
      { question: "What does ka mean?", options: ["to/for", "in/at", "from/out of", "with"], answer: 2, explanation: "ka = from, out of, about, than" }
    ],
    quickRef: [
      { label: "u", value: "to, for, toward" },
      { label: "ku", value: "in, at, by, with (inst.)" },
      { label: "ka", value: "from, out of, about" },
      { label: "la", value: "with (comitative)" },
      { label: "u+ku", value: "ugu" },
      { label: "u+ka", value: "uga" },
      { label: "ku+la", value: "kula" },
      { label: "ka+la", value: "kala" },
      { label: "Position", value: "BEFORE the verb" }
    ]
  },
  {
    id: 12,
    title: "Directional Words (soo, sii, wada, kala)",
    overview: "Somali has four directional words that modify verbs of motion: soo (toward the speaker), sii (away from the speaker), wada (together), and kala (apart). These are critically different from prepositions — they indicate DIRECTION of movement relative to the speaker or between participants. They cluster with prepositions before the verb.",
    rule: `**The four directionals:**

**soo** — toward the speaker (hither)
- Soo gal! = Come in! (toward me)
- Wuu ii soo keenay buugga. = He brought the book to me.

**sii** — away from the speaker (thither)
- Sii soco! = Keep going! / Go away! (away from me)
- Wuu u sii dhaqaaqay. = He moved away (from here).

**wada** — together
- Wada tag! = Let's go together!
- Way wada cunaan. = They eat together.

**kala** — apart, separately, distributing
- Kala tag! = Go separate ways!
- Wuu kala qaybiyay. = He divided (them) apart.

**Position:** Directionals cluster with prepositions BEFORE the verb:
[Subject] + [Marker] + [Preposition] + [Directional] + [Verb]

**Stacking order:** Preposition → Directional → Verb
- Wuu u soo keenay. = He brought (toward me).
  (u = for, soo = toward speaker, keenay = brought)

**With object clitics:**
- Wuu ii soo keenay. = He brought to me (hither).
  (ii = to me, soo = toward speaker)

**Common combinations:**
- soo gal = come in
- soo noqo = come back
- sii soco = keep going
- sii wad = continue
- wada hadal = talk together
- wada cuno = eat together
- kala bax = go out separately
- kala tag = separate`,
    keyConcepts: [
      "soo = toward speaker (hither)",
      "sii = away from speaker (thither)",
      "wada = together",
      "kala = apart, separately",
      "Directionals cluster before the verb with prepositions",
      "Stacking: Preposition → Directional → Verb"
    ],
    examples: [
      {
        somali: "Soo gal!",
        english: "Come in!",
        breakdown: [
          { word: "Soo", role: "directional: toward speaker" },
          { word: "gal", role: "verb: enter" }
        ]
      },
      {
        somali: "Sii soco!",
        english: "Keep going!",
        breakdown: [
          { word: "Sii", role: "directional: away from speaker" },
          { word: "soco", role: "verb: go/walk" }
        ]
      },
      {
        somali: "Wuu u soo keenay buugga.",
        english: "He brought the book (to me).",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "u", role: "preposition: for" },
          { word: "soo", role: "directional: toward speaker" },
          { word: "keenay", role: "verb: brought" },
          { word: "buugga", role: "definite noun: the book" }
        ]
      },
      {
        somali: "Way wada cunaan.",
        english: "They eat together.",
        breakdown: [
          { word: "Way", role: "waa + ay (they)" },
          { word: "wada", role: "directional: together" },
          { word: "cunaan", role: "verb: eat" }
        ]
      },
      {
        somali: "Wuu kala qaybiyay.",
        english: "He divided (them) apart.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "kala", role: "directional: apart" },
          { word: "qaybiyay", role: "verb: divided" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Confusing soo and sii", correction: "soo = toward you, sii = away from you", explanation: "soo means movement toward the speaker. sii means movement away." },
      { mistake: "Using directionals after the verb", correction: "Directionals go BEFORE the verb", explanation: "Like prepositions, directionals cluster pre-verbally." },
      { mistake: "Using wada for 'and'", correction: "wada = together (directional), iyo = and (conjunction)", explanation: "wada is a directional word, not a conjunction. Use iyo for 'and'." }
    ],
    exercises: [
      { question: "What does soo mean?", options: ["away from speaker", "toward speaker", "together", "apart"], answer: 1, explanation: "soo = toward the speaker (hither)" },
      { question: "Translate: 'Go away!' (away from speaker)", options: ["Soo tag!", "Sii tag!", "Wada tag!", "Kala tag!"], answer: 1, explanation: "sii = away from speaker: Sii tag! = Go away!" },
      { question: "Fill in: 'They walked ____.' (together)", options: ["soo", "sii", "wada", "kala"], answer: 2, explanation: "wada = together: Way wada socdeen." }
    ],
    quickRef: [
      { label: "soo", value: "toward speaker (hither)" },
      { label: "sii", value: "away from speaker (thither)" },
      { label: "wada", value: "together" },
      { label: "kala", value: "apart, separately" },
      { label: "Position", value: "before the verb" },
      { label: "Soo gal!", value: "Come in!" },
      { label: "Sii soco!", value: "Keep going!" },
      { label: "Wada tag!", value: "Let's go together!" },
      { label: "Kala tag!", value: "Go separate ways!" }
    ]
  },
  {
    id: 13,
    title: "Object Clitics",
    overview: "Object clitics are short pronoun forms that represent the object of the verb. They attach to prepositions to form blended forms like ii (to me), kuu (to you), and noo (for us). Understanding object clitics is essential for forming complete sentences with indirect objects.",
    rule: `**The object clitics:**
- **i** = me
- **ku** = you (sg)
- **na** = us
- **idin** = you (pl)
- (3rd person objects don't use clitics — use full nouns)

**Blending with prepositions:**

With **u** (to/for):
- u + i → **ii** (to me)
- u + ku → **kuu** (to you)
- u + na → **noo** (for us)
- u + idin → **idiin** (for you pl)

With **ku** (in/at):
- ku + i → **igu** (in me)
- ku + ku → **kugu** (in you)
- ku + na → **kuna** (in us)

With **ka** (from):
- ka + i → **iga** (from me)
- ka + ku → **kaa** (from you)
- ka + na → **kana** (from us)

With **la** (with):
- la + i → **ila** (with me)
- la + ku → **kula** (with you)
- la + na → **lana** (with us)

**Usage:**
- Wuu ii soo keenay buugga. = He brought the book to me.
- Way igu qortay warqad. = She wrote me a letter.
- Wuu iga yimid. = He came from me.
- Way ila socotaa. = She is walking with me.`,
    keyConcepts: [
      "i = me, ku = you, na = us, idin = you pl",
      "Object clitics blend with prepositions",
      "u+i=ii, u+ku=kuu, u+na=noo",
      "ka+i=iga, ka+ku=kaa",
      "la+i=ila, la+ku=kula",
      "3rd person objects use full nouns, not clitics"
    ],
    examples: [
      {
        somali: "Wuu ii soo keenay buugga.",
        english: "He brought the book to me.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "ii", role: "u + i (to me)" },
          { word: "soo", role: "directional: toward speaker" },
          { word: "keenay", role: "verb: brought" },
          { word: "buugga", role: "definite noun: the book" }
        ]
      },
      {
        somali: "Way igu qortay warqad.",
        english: "She wrote me a letter.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "igu", role: "ku + i (in me)" },
          { word: "qortay", role: "verb: wrote" },
          { word: "warqad", role: "indefinite noun: letter" }
        ]
      },
      {
        somali: "Wuu iga yimid.",
        english: "He came from me.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "iga", role: "ka + i (from me)" },
          { word: "yimid", role: "verb: came" }
        ]
      },
      {
        somali: "Way ila socotaa.",
        english: "She is walking with me.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "ila", role: "la + i (with me)" },
          { word: "socotaa", role: "verb: walking" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using full pronouns instead of clitic blends", correction: "Use ii, kuu, noo, iga, ila", explanation: "Object clitics blend with prepositions. Don't use full pronouns here." },
      { mistake: "Trying to use object clitics for 3rd person", correction: "Use full noun for 3rd person object", explanation: "There are no 3rd person object clitics. Use the full noun." },
      { mistake: "Forgetting the blend rules", correction: "u+i=ii, ka+i=iga, la+i=ila, ku+i=igu", explanation: "Each preposition + clitic combination has a specific blended form." }
    ],
    exercises: [
      { question: "What is u + i blended?", options: ["ugu", "ii", "iga", "ila"], answer: 1, explanation: "u + i → ii (to me)" },
      { question: "What is ka + i blended?", options: ["iga", "ii", "igu", "ila"], answer: 0, explanation: "ka + i → iga (from me)" },
      { question: "Translate: 'She wrote to you.'", options: ["Way u qortay.", "Way kuu qortay.", "Way ii qortay.", "Way noo qortay."], answer: 1, explanation: "u + ku → kuu (to you): Way kuu qortay." }
    ],
    quickRef: [
      { label: "i (me)", value: "u+i=ii, ka+i=iga, ku+i=igu, la+i=ila" },
      { label: "ku (you)", value: "u+ku=kuu, ka+ku=kaa, ku+ku=kugu, la+ku=kula" },
      { label: "na (us)", value: "u+na=noo, ka+na=kana, ku+na=kuna, la+na=lana" },
      { label: "idin (you pl)", value: "u+idin=idiin" },
      { label: "3rd person", value: "use full noun" }
    ]
  },
  {
    id: 14,
    title: "Adjectives-as-Verbs",
    overview: "In Somali, many adjectives behave like verbs and are conjugated as such. This is fundamentally different from English where adjectives are static descriptors ('is big'). In Somali, the adjective takes a verb ending and agrees with the subject in gender and number. As Nilsson notes (2025, p. 88), 'An adjective is placed before the noun it qualifies in an adjective phrase.'",
    rule: `**Basic structure:**
[Subject] + [waa + clitic] + [Adjective] + [Copula yahay/tahay]

**The copula agrees with the subject:**
- yahay = masculine singular (he/it is)
- tahay = feminine singular (she/it is)
- yihiin = plural (they are)

**Masculine subjects:**
- Wuu weyn yahay. = He is big.
- Wuu fiican yahay. = He is good.

**Feminine subjects:**
- Way weyn tahay. = She is big.
- Way fiican tahay. = She is good.

**With explicit noun subjects:**
- Ninku wuu weyn yahay. = The man is big.
- Naagtu way fiican tahay. = The woman is good.

**Adjective + noun (attributive):**
When an adjective modifies a noun directly, it comes BEFORE the noun:
- Weyn guri = a big house
- Yar naag = a small woman
- But more commonly: guri weyn (with the adjective following)

**Comparative:**
Use ka (from) + adjective:
- Wuu ka weyn yahay. = He is bigger. (lit. He is from big)
- Ka + adjective = more than

**Superlative:**
Use ugu + adjective:
- Wuu ugu weyn yahay. = He is the biggest.

**Common adjectives:**
weyn = big, yar = small, dheer = tall/long, gaagaaban = short,
fiican = good, xun = bad, cusub = new, duq = old,
cad = white, madow = black, cas = red, buluug = blue,
qurux badan = beautiful (lit. much beauty), qadhaadh = bitter`,
    keyConcepts: [
      "Adjectives conjugate with yahay (masc) / tahay (fem)",
      "The copula agrees with subject gender",
      "Comparative: ka + adjective",
      "Superlative: ugu + adjective",
      "Adjectives can modify nouns attributively",
      "Some adjectives are stative verbs"
    ],
    examples: [
      {
        somali: "Ninku wuu weyn yahay.",
        english: "The man is big.",
        breakdown: [
          { word: "Ninku", role: "subject: the man (masc)" },
          { word: "wuu", role: "waa + uu (he)" },
          { word: "weyn", role: "adjective: big" },
          { word: "yahay", role: "copula: is (masc)" }
        ]
      },
      {
        somali: "Naagtu way fiican tahay.",
        english: "The woman is good.",
        breakdown: [
          { word: "Naagtu", role: "subject: the woman (fem)" },
          { word: "way", role: "waa + ay (she)" },
          { word: "fiican", role: "adjective: good" },
          { word: "tahay", role: "copula: is (fem)" }
        ]
      },
      {
        somali: "Guriga wuu ka weyn yahay.",
        english: "The house is bigger.",
        breakdown: [
          { word: "Guriga", role: "subject: the house" },
          { word: "wuu", role: "waa + uu (it)" },
          { word: "ka", role: "comparative marker" },
          { word: "weyn", role: "adjective: big" },
          { word: "yahay", role: "copula: is" }
        ]
      },
      {
        somali: "Wuu ugu fiican yahay.",
        english: "He is the best.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "ugu", role: "superlative marker" },
          { word: "fiican", role: "adjective: good" },
          { word: "yahay", role: "copula: is" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using 'waa' without yahay/tahay", correction: "Include the copula: Wuu weyn yahay", explanation: "Adjectives require the copula yahay/tahay/yihiin to complete the predicate." },
      { mistake: "Using wrong gender copula", correction: "yahay for masc, tahay for fem", explanation: "The copula must agree with the subject's grammatical gender." },
      { mistake: "Putting adjectives after the noun like English", correction: "Adjective precedes OR follows noun", explanation: "Somali allows both: weyn guri or guri weyn. The pre-noun form is more formal." }
    ],
    exercises: [
      { question: "What copula is used with masculine subjects?", options: ["tahay", "yahay", "yihiin", "ahay"], answer: 1, explanation: "yahay = masculine singular copula." },
      { question: "What copula is used with feminine subjects?", options: ["yahay", "tahay", "yihiin", "ahay"], answer: 1, explanation: "tahay = feminine singular copula." },
      { question: "How do you form the comparative?", options: ["ugu + adjective", "ka + adjective", "waa + adjective", "baa + adjective"], answer: 1, explanation: "Comparative = ka + adjective: Wuu ka weyn yahay." },
      { question: "How do you form the superlative?", options: ["ka + adjective", "ugu + adjective", "waa + adjective", "baa + adjective"], answer: 1, explanation: "Superlative = ugu + adjective: Wuu ugu weyn yahay." }
    ],
    quickRef: [
      { label: "Masc copula", value: "yahay" },
      { label: "Fem copula", value: "tahay" },
      { label: "Plural copula", value: "yihiin" },
      { label: "Comparative", value: "ka + adjective" },
      { label: "Superlative", value: "ugu + adjective" },
      { label: "weyn", value: "big" },
      { label: "yar", value: "small" },
      { label: "fiican", value: "good" }
    ]
  },
  {
    id: 15,
    title: "Possessives",
    overview: "Somali possessives are suffixes attached directly to the noun (like the definite article). They indicate ownership and must agree with both the POSSESSOR (who owns) and the GENDER of the possessed noun. This system is more complex than English 'my/your/his' because the suffix changes based on the noun's gender.",
    rule: `**Possessive suffixes (attached to the noun):**

**For MY (possessor = 1st person):**
- Masc noun: **-ayga** (guri → gurigayga = my house)
- Fem noun: **-ayga** (naag → naagtayda = my woman) — note: t+d → d

**For YOUR (possessor = 2nd person):**
- Masc noun: **-aaga** (guri → gurigaaga = your house)
- Fem noun: **-aada** (naag → naagtaada = your woman)

**For HIS (possessor = 3rd masc):**
- Masc noun: **-iisa** (guri → gurigiisa = his house)
- Fem noun: **-iisa** (naag → naagtiisa = his woman)

**For HER (possessor = 3rd fem):**
- Masc noun: **-eeda** (guri → gurigeeda = her house)
- Fem noun: **-eeda** (naag → naagteeda = her woman)

**For OUR (possessor = 1st pl):**
- Masc noun: **-eenna** (guri → gurigeenna = our house)
- Fem noun: **-eenna** (naag → naagteenna = our woman)

**Sound changes:**
- The possessive suffix replaces the definite article suffix
- Voicing assimilation applies: -t- + -d- → -dd- (naag-ta-ayda → naagtayda)

**Independent possessive pronouns:**
- kayga = mine (masc), kaygu = mine (masc definite)
- kayga = mine (fem), kaygu = mine (fem definite)
- These are used without a noun: Kan waa kayga. = This is mine.`,
    keyConcepts: [
      "Possessives are SUFFIXES attached to the noun",
      "Suffix depends on possessor person AND noun gender",
      "Replaces the definite article suffix",
      "Sound assimilation: -t- + -d- → -dd-",
      "Independent forms exist for standalone use",
      "1st person: -ayga/-ayda, 2nd: -aaga/-aada"
    ],
    examples: [
      {
        somali: "gurigayga",
        english: "my house",
        breakdown: [
          { word: "guri", role: "noun: house (masc)" },
          { word: "gayga", role: "possessive: my (1st, masc)" }
        ]
      },
      {
        somali: "naagtayda",
        english: "my wife/woman",
        breakdown: [
          { word: "naag", role: "noun: woman (fem)" },
          { word: "tayda", role: "possessive: my (1st, fem)" }
        ]
      },
      {
        somali: "buuggiisa",
        english: "his book",
        breakdown: [
          { word: "buug", role: "noun: book (masc)" },
          { word: "giisa", role: "possessive: his (3rd masc, masc noun)" }
        ]
      },
      {
        somali: "Kan waa kayga.",
        english: "This is mine.",
        breakdown: [
          { word: "Kan", role: "demonstrative: this" },
          { word: "waa", role: "predicate focus" },
          { word: "kayga", role: "independent possessive: mine" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using -ayga for all possessors", correction: "Use -aaga for 2nd person, -iisa for 3rd masc", explanation: "Each possessor person has a different suffix." },
      { mistake: "Not adjusting for noun gender", correction: "Suffix changes based on noun gender", explanation: "Possessive suffixes have different allomorphs for masculine vs feminine nouns." },
      { mistake: "Forgetting sound assimilation", correction: "-t- + -d- → -dd-", explanation: "When the definite article -ta meets the possessive -ayda, voicing assimilation applies." }
    ],
    exercises: [
      { question: "What is the possessive suffix for 'my' with a masculine noun?", options: ["-aaga", "-ayga", "-iisa", "-eeda"], answer: 1, explanation: "1st person + masculine noun = -ayga (gurigayga = my house)." },
      { question: "What is 'his book' (buug, masc)?", options: ["buuggayga", "buuggiisa", "buuggaaga", "buuggeeda"], answer: 1, explanation: "3rd person masc + masc noun = -iisa: buuggiisa." },
      { question: "What is 'your woman' (naag, fem)?", options: ["naagtayda", "naagtaada", "naagtiisa", "naagteeda"], answer: 1, explanation: "2nd person + fem noun = -aada: naagtaada." }
    ],
    quickRef: [
      { label: "1st (my) masc", value: "-ayga" },
      { label: "1st (my) fem", value: "-ayda" },
      { label: "2nd (your) masc", value: "-aaga" },
      { label: "2nd (your) fem", value: "-aada" },
      { label: "3rd m (his)", value: "-iisa" },
      { label: "3rd f (her)", value: "-eeda" },
      { label: "1st pl (our)", value: "-eenna" }
    ]
  },
  {
    id: 16,
    title: "Continuous Aspect (-ay-)",
    overview: "The continuous aspect in Somali expresses an action that is happening RIGHT NOW. It is formed by inserting -ay- into the verb stem. This is similar to English 'am/is/are + verb-ing.' The continuous is one of the most commonly used aspects in spoken Somali.",
    rule: `**Formation:** Insert **-ay-** between the verb stem and the person ending.

**Conjugation 1 (qor- 'write'):**
- waan qorayaa = I am writing
- waad qortayaa = you are writing
- wuu qorayaa = he is writing
- way qortayaa = she is writing

**Conjugation 2 (fiiri- 'look'):**
- waan fiirayaa = I am looking
- way fiirtayaa = she is looking

**Conjugation 3 (booqd-/booqa- 'visit'):**
- waan booqdayaa = I am visiting (C-stem)
- way booqatayaa = she is visiting (V-stem)

**From the infinitive:**
The continuous can also be formed from the infinitive:
- Infinitive + -n- + -ay- + ending
- qorinayaa = I am writing (from qor-i-n-ay-aa)
- fiirinayaa = I am looking (from fiiri-n-ay-aa)
- booqanayaa = I am visiting (from booqa-n-ay-aa)

**Negative continuous:**
- ma aan qorinayo = I am not writing
- ma uu shaqaynayo = He is not working

**Common usage:**
- Waan cunayaa. = I am eating (right now).
- Wuu socdayaa. = He is walking.
- Way hadlaysaa. = She is speaking.

**Note on formality:**
The shorter form (without -n-) is more colloquial:
- waan qorayaa (shorter, more casual)
- waan qorinayaa (fuller, more formal)`,
    keyConcepts: [
      "Insert -ay- between stem and ending",
      "Expresses action happening RIGHT NOW",
      "Can be formed from infinitive: -n-ay-",
      "Negative: -in- + -ay- + -o",
      "Shorter form is more colloquial",
      "One of the most common aspects in spoken Somali"
    ],
    examples: [
      {
        somali: "Waan cunayaa.",
        english: "I am eating (right now).",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "cunayaa", role: "C1 continuous: am eating" }
        ]
      },
      {
        somali: "Way hadlaysaa.",
        english: "She is speaking.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "hadlaysaa", role: "C1 continuous: is speaking" }
        ]
      },
      {
        somali: "Wuu shaqaynayaa.",
        english: "He is working.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "shaqaynayaa", role: "C2 continuous: is working" }
        ]
      },
      {
        somali: "Ma aan qorinayo.",
        english: "I am not writing.",
        breakdown: [
          { word: "Ma", role: "negator" },
          { word: "aan", role: "clitic: I" },
          { word: "qorinayo", role: "negative continuous: not writing" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using -ayaa for habitual actions", correction: "Use simple present for habits: qoraa", explanation: "Continuous = right now. Habitual = regularly." },
      { mistake: "Forgetting -n- in formal continuous", correction: "qorinayaa (formal) vs qorayaa (colloquial)", explanation: "The full form includes -n- from the infinitive." },
      { mistake: "Wrong negative form", correction: "-in- + -ay- + -o", explanation: "Negative continuous inserts -in before -ay-: qorinayo." }
    ],
    exercises: [
      { question: "How is the continuous formed?", options: ["Add -ay- after the verb", "Insert -ay- between stem and ending", "Add -doon to the verb", "Change the stem vowel"], answer: 1, explanation: "Insert -ay- between the verb stem and the person ending." },
      { question: "What is 'I am eating'?", options: ["Waan cuno.", "Waan cunayaa.", "Waan cunaya.", "Waan cun doonaa."], answer: 1, explanation: "Continuous: Waan cunayaa." },
      { question: "What is the negative continuous of 'I am writing'?", options: ["Ma aan qorayo.", "Ma aan qorinayo.", "Maan qorayaa.", "Ma uu qorinayo."], answer: 1, explanation: "Negative continuous: ma + -in- + -ay- + -o = Ma aan qorinayo." }
    ],
    quickRef: [
      { label: "Continuous", value: "stem + -ay- + ending" },
      { label: "From infinitive", value: "infinitive + -n- + -ay- + ending" },
      { label: "I am writing", value: "Waan qorayaa" },
      { label: "Negative cont.", value: "-in- + -ay- + -o" },
      { label: "I am not writing", value: "Ma aan qorinayo" }
    ]
  },
  {
    id: 17,
    title: "Future Tense (doon)",
    overview: "The future tense in Somali is formed by adding doonaa (will) after the infinitive form of the verb. This is an analytic future — the auxiliary doonaa carries the person marking while the main verb stays in its infinitive form. It's straightforward and very commonly used.",
    rule: `**Formation:** Infinitive + **doonaa** (with person endings)

**Structure:**
[Subject] + [waa + clitic] + [Infinitive] + [doon- + person ending]

**Conjugation of doonaa:**
- waan ... doonaa = I will ...
- waad ... doontaa = you will ...
- wuu ... doonaa = he will ...
- way ... doontaa = she will ...
- waannu ... doonnaa = we will ...
- waydin ... doontaan = you (pl) will ...
- way ... doonaan = they will ...

**Examples:**
- Waan tagi doonaa. = I will go.
- Wuu cuni doonaa. = He will eat.
- Way qori doontaa. = She will write.
- Waannu shaqeyn doonnaa. = We will work.

**The infinitive:**
- C1: stem + -i (qor-i, tag-i)
- C2: stem + -n (fiiri-n, shaqee-n)
- C3: V-stem + -n (booqa-n)

**Negative future:**
- ma aan tagin doono = I won't go
- ma uu cuno doono = He won't eat

**Conditional future:**
With haddii (if):
- Haddii aan tago, waan cuni doonaa. = If I go, I will eat.`,
    keyConcepts: [
      "Future = infinitive + doonaa",
      "doonaa carries the person marking",
      "Main verb stays in infinitive form",
      "Negative: ma + infinitive + -in + doono",
      "Often used with haddii (if) for conditionals",
      "Very common in everyday speech"
    ],
    examples: [
      {
        somali: "Waan tagi doonaa.",
        english: "I will go.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "tagi", role: "infinitive: to go" },
          { word: "doonaa", role: "future auxiliary: will (1sg)" }
        ]
      },
      {
        somali: "Wuu cuni doonaa.",
        english: "He will eat.",
        breakdown: [
          { word: "Wuu", role: "waa + uu (he)" },
          { word: "cuni", role: "infinitive: to eat" },
          { word: "doonaa", role: "future: will" }
        ]
      },
      {
        somali: "Way qori doontaa.",
        english: "She will write.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "qori", role: "infinitive: to write" },
          { word: "doontaa", role: "future: will (2sg/3sg fem)" }
        ]
      },
      {
        somali: "Haddii aan tago, waan cuni doonaa.",
        english: "If I go, I will eat.",
        breakdown: [
          { word: "Haddii", role: "conditional: if" },
          { word: "aan", role: "clitic: I" },
          { word: "tago", role: "subjunctive: go" },
          { word: "waan", role: "waa + aan (I)" },
          { word: "cuni", role: "infinitive: to eat" },
          { word: "doonaa", role: "future: will" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Conjugating the main verb instead of using infinitive", correction: "Use infinitive + doonaa", explanation: "The main verb stays in infinitive form. Only doonaa is conjugated." },
      { mistake: "Using present tense for future", correction: "Use infinitive + doonaa for future", explanation: "While context can imply future, the explicit future uses doonaa." },
      { mistake: "Wrong person ending on doonaa", correction: "doonaa (1sg/3sg m), doontaa (2sg/3sg f), doonnaa (1pl)", explanation: "doonaa conjugates like any other verb with regular person endings." }
    ],
    exercises: [
      { question: "How is the future formed?", options: ["Stem + doonaa", "Infinitive + doonaa", "Present + doonaa", "Past + doonaa"], answer: 1, explanation: "Future = infinitive + doonaa: tagi doonaa = will go." },
      { question: "What is 'She will write'?", options: ["Way qor doontaa.", "Way qori doontaa.", "Way qortay doontaa.", "Way qorayaa doontaa."], answer: 1, explanation: "Infinitive qori + doontaa: Way qori doontaa." },
      { question: "What is the negative future of 'I will go'?", options: ["Ma aan tagin doono.", "Maan tagi doonaa.", "Ma uu tagin doono.", "Waan tagin doono."], answer: 0, explanation: "Negative: ma + infinitive + -in + doono: Ma aan tagin doono." }
    ],
    quickRef: [
      { label: "Future", value: "infinitive + doonaa" },
      { label: "I will", value: "... doonaa" },
      { label: "You/she will", value: "... doontaa" },
      { label: "We will", value: "... doonnaa" },
      { label: "They will", value: "... doonaan" },
      { label: "Negative", value: "infinitive + -in + doono" },
      { label: "With haddii", value: "haddii + subjunctive, future main clause" }
    ]
  },
  {
    id: 18,
    title: "Connectors",
    overview: "Somali connectors (conjunctions) link words, phrases, and clauses. Unlike English which uses a single 'and' for everything, Somali distinguishes between coordinating nouns (iyo), coordinating sentences/clauses (-na), and subordinating clauses (oo, in). Mastering these is essential for forming complex sentences.",
    rule: `**Coordinating nouns:**
**iyo** = and (links NOUNS and NOUN PHRASES only)
- Cali iyo Xasan = Ali and Hassan
- bariis iyo hilib = rice and meat
- guriga iyo xafiiska = the house and the office

**Coordinating clauses:**
**-na** = and (links CLAUSES/SENTENCES, suffixed to first word of 2nd clause)
- Waan tegay, waanna cunay. = I went and I ate.
- Wuu yimid, wuuna joogaa. = He came and he is staying.

**Adversative:**
**-se** = but (suffixed to first word of 2nd clause)
- Wuu yimid, wuuse joogin. = He came, but he didn't stay.
- Waan fahmay, waase ka xumahay. = I understand, but I'm sorry.

**laakiin** = but (standalone, more emphatic)
- Waan fahmay, laakiin ma hubo. = I understand, but I'm not sure.

**Subordinating:**
**oo** = and, which, that (relative/subordinate)
- links subordinate clauses to main clauses
- Ninka oo shaqeeya = The man who is working
- Wuu tegay oo wuu cunay = He went and ate

**ina / in** = that (complementizer)
- Waxaan rabaa inaan tago. = I want to go. (lit. I want that I go)
- Way sheegtay inuu yimid. = She said that he came.

**Contrast: iyo vs -na:**
- iyo coordinates NOUNS: bariis iyo hilib
- -na coordinates CLAUSES: Waan tegay, waanna cunay.`,
    keyConcepts: [
      "iyo = and (for NOUNS only)",
      "-na = and (for CLAUSES, suffixed)",
      "-se = but (suffixed)",
      "laakiin = but (standalone)",
      "oo = which/that (subordinating)",
      "ina/in = that (complementizer)"
    ],
    examples: [
      {
        somali: "Cali iyo Xasan",
        english: "Ali and Hassan",
        breakdown: [
          { word: "Cali", role: "noun: Ali" },
          { word: "iyo", role: "conjunction: and (nouns)" },
          { word: "Xasan", role: "noun: Hassan" }
        ]
      },
      {
        somali: "Waan tegay, waanna cunay.",
        english: "I went and I ate.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "tegay", role: "verb: went" },
          { word: "waanna", role: "waa + aan + na (I and)" },
          { word: "cunay", role: "verb: ate" }
        ]
      },
      {
        somali: "Waan fahmay, laakiin ma hubo.",
        english: "I understand, but I'm not sure.",
        breakdown: [
          { word: "Waan", role: "waa + aan (I)" },
          { word: "fahmay", role: "verb: understood" },
          { word: "laakiin", role: "conjunction: but" },
          { word: "ma", role: "negator" },
          { word: "hubo", role: "verb: be sure" }
        ]
      },
      {
        somali: "Ninka oo shaqeeya",
        english: "The man who is working",
        breakdown: [
          { word: "Ninka", role: "definite noun: the man" },
          { word: "oo", role: "relative: who/which" },
          { word: "shaqeeya", role: "verb: is working" }
        ]
      },
      {
        somali: "Waxaan rabaa inaan tago.",
        english: "I want to go.",
        breakdown: [
          { word: "Waxaan", role: "waxa + aan (I)" },
          { word: "rabaa", role: "verb: want" },
          { word: "inaan", role: "in + aan (that I)" },
          { word: "tago", role: "subjunctive: go" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using iyo to connect clauses", correction: "Use -na for clauses: waan tegay, waanna cunay", explanation: "iyo is only for nouns. -na is for clauses." },
      { mistake: "Using -na to connect nouns", correction: "Use iyo for nouns: Cali iyo Xasan", explanation: "-na is only for clauses. iyo is for nouns." },
      { mistake: "Confusing oo (which) with iyo (and)", correction: "oo = subordinating, iyo = coordinating nouns", explanation: "oo links subordinate clauses. iyo coordinates nouns." }
    ],
    exercises: [
      { question: "What connector is used for nouns?", options: ["-na", "iyo", "oo", "-se"], answer: 1, explanation: "iyo coordinates nouns: Cali iyo Xasan." },
      { question: "What connector is used for clauses?", options: ["iyo", "-na", "oo", "laakiin"], answer: 1, explanation: "-na coordinates clauses (suffixed to first word)." },
      { question: "Translate: 'I want to eat.' (rabo, cun)", options: ["Waxaan rabaa inaan cuno.", "Waxaan rabaa iyo cuno.", "Waxaan rabaa oo cuno.", "Waxaan rabaa cuno."], answer: 0, explanation: "inaan = in + aan (that I): Waxaan rabaa inaan cuno." }
    ],
    quickRef: [
      { label: "iyo", value: "and (nouns)" },
      { label: "-na", value: "and (clauses, suffixed)" },
      { label: "-se", value: "but (suffixed)" },
      { label: "laakiin", value: "but (standalone)" },
      { label: "oo", value: "which/that (subordinating)" },
      { label: "ina/in", value: "that (complementizer)" }
    ]
  },
  {
    id: 19,
    title: "Relative Clauses (oo)",
    overview: "Relative clauses in Somali are formed with the particle oo (which/that/who). Unlike English which uses separate relative pronouns (who, which, that), Somali uses oo for all relative clauses. The relative clause follows the noun it modifies, and the verb inside the relative clause uses a special reduced form.",
    rule: `**Formation:** [Noun] + **oo** + [clause with reduced verb]

**oo** functions as a relative pronoun:
- Ninka oo cunay = The man who ate
- Buugga oo akhriyay = The book that (he) read
- Naagta oo shaqaysaa = The woman who is working

**Reduced verb in relative clauses:**
The verb in a relative clause drops its sentence marker and uses a reduced form:
- Wuu cunay → oo cunay (who ate)
- Way shaqaysaa → oo shaqaysa (who is working)

**With explicit subject in relative clause:**
- Ninka oo Cali cunay = The man that Ali ate
- (Here Cali is the subject of the relative clause, not the head noun)

**Complex relatives:**
- Ninka oo naagta arkaya = The man who sees the woman
- Naagta oo buugga qortay = The woman who wrote the book

**Restrictive vs non-restrictive:**
Somali does not formally distinguish restrictive and non-restrictive relatives. Context determines the meaning.

**Headless relatives:**
- Oo cunay = Whoever ate / The one who ate
- Oo shaqaysa = Whoever is working`,
    keyConcepts: [
      "oo = relative pronoun (who/which/that)",
      "Relative clause follows the head noun",
      "Verb in relative uses reduced form",
      "No sentence marker in the relative clause",
      "Can have explicit subject in the relative",
      "Headless relatives omit the noun: oo cunay"
    ],
    examples: [
      {
        somali: "Ninka oo cunay",
        english: "The man who ate",
        breakdown: [
          { word: "Ninka", role: "head noun: the man" },
          { word: "oo", role: "relative pronoun" },
          { word: "cunay", role: "reduced verb: ate" }
        ]
      },
      {
        somali: "Buugga oo aan akhriyay",
        english: "The book that I read",
        breakdown: [
          { word: "Buugga", role: "head noun: the book" },
          { word: "oo", role: "relative pronoun" },
          { word: "aan", role: "clitic: I" },
          { word: "akhriyay", role: "reduced verb: read" }
        ]
      },
      {
        somali: "Naagta oo shaqaysa",
        english: "The woman who is working",
        breakdown: [
          { word: "Naagta", role: "head noun: the woman" },
          { word: "oo", role: "relative pronoun" },
          { word: "shaqaysa", role: "reduced verb: is working" }
        ]
      },
      {
        somali: "Ninka oo naagta arkaya",
        english: "The man who sees the woman",
        breakdown: [
          { word: "Ninka", role: "head noun: the man" },
          { word: "oo", role: "relative pronoun" },
          { word: "naagta", role: "object: the woman" },
          { word: "arkaya", role: "reduced verb: sees" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using full sentence markers in relative clauses", correction: "Use reduced verbs without waa/baa", explanation: "Relative clauses use reduced verb forms without sentence particles." },
      { mistake: "Putting oo before the noun", correction: "Noun comes first, then oo", explanation: "Relative clauses follow the head noun: Ninka oo cunay." },
      { mistake: "Using English relative pronouns", correction: "Use oo for all relatives", explanation: "Somali uses oo for all relative clauses regardless of animacy." }
    ],
    exercises: [
      { question: "What particle introduces relative clauses?", options: ["iyo", "oo", "ina", "-na"], answer: 1, explanation: "oo is the relative pronoun in Somali." },
      { question: "Translate: 'The woman who writes' (qor)", options: ["Naagta oo qortaa.", "Naagta waa qortaa.", "Naagta iyo qortaa.", "Naagta in qortaa."], answer: 0, explanation: "Relative: Naagta oo qortaa." },
      { question: "What form does the verb take in relative clauses?", options: ["Full form with waa", "Reduced form without marker", "Infinitive", "Imperative"], answer: 1, explanation: "Relative clauses use reduced verb forms without sentence particles." }
    ],
    quickRef: [
      { label: "Relative marker", value: "oo" },
      { label: "Structure", value: "Noun + oo + reduced verb" },
      { label: "Verb form", value: "reduced (no waa/baa)" },
      { label: "Headless", value: "oo + verb = whoever/whatever" }
    ]
  },
  {
    id: 20,
    title: "Conditionals & Reported Speech",
    overview: "Conditionals and reported speech are advanced structures that allow you to express hypothetical situations and relay information from others. Somali uses haddii for 'if' conditions and special complementizer constructions for reported speech.",
    rule: `**Conditionals with haddii:**

**haddii** = if (introduces the condition)
The verb in the haddii clause uses the subjunctive form (ending in -o):

- Haddii aan tago, waan cuni doonaa. = If I go, I will eat.
- Haddii uu yimido, waan la hadli doonaa. = If he comes, I will talk to him.

**Reported speech:**
Two main constructions:

**1. Direct style (most common):**
- Wuxuu yidhi: 'Waan tagayaa.' = He said: 'I am going.'
- Way sheegtay inuu yimid. = She said that he came.

**2. With in + subjunctive:**
- Way sheegtay inuu yimido. = She said that he would come.
- Waxaan maqlay inay tagayso. = I heard that she was going.

**Complementizer in:**
- in + subjunctive (-o) = that + future/potential
- in + past = that + past fact

** hearsay/evidential:**
- laga sheegay = it is said that
- waxaa la yidhi = it was said that

**Wish/desire with haddii:**
- Haddii aan helayno! = If only we could find it!
- Haddii aan waalanahay! = I wish I were crazy! (expresses strong desire)`,
    keyConcepts: [
      "haddii = if (condition)",
      "haddii clause uses subjunctive (-o ending)",
      "Reported speech: wuxuu yidhi = he said",
      "Complementizer in + subjunctive for indirect speech",
      "in + subjunctive = potential/future report",
      "in + past = factual report"
    ],
    examples: [
      {
        somali: "Haddii aan tago, waan cuni doonaa.",
        english: "If I go, I will eat.",
        breakdown: [
          { word: "Haddii", role: "conditional: if" },
          { word: "aan", role: "clitic: I" },
          { word: "tago", role: "subjunctive: go" },
          { word: "waan", role: "waa + aan (I)" },
          { word: "cuni", role: "infinitive: to eat" },
          { word: "doonaa", role: "future: will" }
        ]
      },
      {
        somali: "Wuxuu yidhi: 'Waan tagayaa.'",
        english: "He said: 'I am going.'",
        breakdown: [
          { word: "Wuxuu", role: "waxa + uu (he)" },
          { word: "yidhi", role: "verb: said" },
          { word: "'Waan tagayaa.'", role: "direct quote" }
        ]
      },
      {
        somali: "Way sheegtay inuu yimido.",
        english: "She said that he would come.",
        breakdown: [
          { word: "Way", role: "waa + ay (she)" },
          { word: "sheegtay", role: "verb: said" },
          { word: "inuu", role: "in + uu (that he)" },
          { word: "yimido", role: "subjunctive: would come" }
        ]
      },
      {
        somali: "Haddii uu yimido, waan la hadli doonaa.",
        english: "If he comes, I will talk to him.",
        breakdown: [
          { word: "Haddii", role: "conditional: if" },
          { word: "uu", role: "clitic: he" },
          { word: "yimido", role: "subjunctive: comes" },
          { word: "waan", role: "waa + aan (I)" },
          { word: "la", role: "preposition: with" },
          { word: "hadli", role: "infinitive: to talk" },
          { word: "doonaa", role: "future: will" }
        ]
      }
    ],
    commonMistakes: [
      { mistake: "Using present tense in haddii clause", correction: "Use subjunctive (-o): Haddii aan tago", explanation: "haddii requires the subjunctive verb form." },
      { mistake: "Confusing direct and indirect reported speech", correction: "Direct: Wuxuu yidhi '...' / Indirect: Way sheegtay inuu...", explanation: "Direct quotes use quotation marks. Indirect uses in + subjunctive." },
      { mistake: "Forgetting in before reported speech", correction: "Use in + subjunctive for indirect speech", explanation: "The complementizer in is required for indirect reported speech." }
    ],
    exercises: [
      { question: "What verb form is used after haddii?", options: ["Present", "Subjunctive (-o)", "Past", "Infinitive"], answer: 1, explanation: "haddii requires the subjunctive form (ending in -o)." },
      { question: "Translate: 'If he comes, I will see him.' (yimid, arag)", options: ["Haddii uu yimido, waan arki doonaa.", "Haddii uu yimid, waan arki doonaa.", "Haddii uu yimido, waan arkay.", "Haddii uu yimid, waan arkay."], answer: 0, explanation: "Subjunctive yimido + future arki doonaa." },
      { question: "How do you say 'She said that he came'?", options: ["Way sheegtay inuu yimid.", "Way sheegtay inuu yimido.", "Way yidhi inuu yimid.", "Way sheegtay wuu yimid."], answer: 0, explanation: "Past fact reported: in + past verb: Way sheegtay inuu yimid." }
    ],
    quickRef: [
      { label: "haddii", value: "if (conditional)" },
      { label: "haddii verb", value: "subjunctive (-o)" },
      { label: "Reported (direct)", value: "Wuxuu yidhi '...'" },
      { label: "Reported (indirect)", value: "in + subjunctive" },
      { label: "in + past", value: "factual report" },
      { label: "in + subjunctive", value: "potential report" }
    ]
  }
];

export default lessons;
