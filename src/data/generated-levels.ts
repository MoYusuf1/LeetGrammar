/**
 * Generated drill levels — one LevelData per course module.
 *
 * AUTO-GENERATED from ../somali-grammar-course/COURSE.md by scripts/course-to-app.cjs.
 * Consumed by src/data/drill-content.ts (which re-exports as LEVELS).
 */

import type { Exercise, LevelData } from './drill-content';

export const GENERATED_LEVELS: LevelData[] = [
  {
    "id": 1,
    "title": "Foundations & Phonetics",
    "subtitle": "Phase: Foundations & Phonetics",
    "color": "#3b82f6",
    "rule": {
      "title": "Foundations & Phonetics",
      "content": "No explanation yet. Just notice the sounds.",
      "examples": [
        {
          "somali": "Mahadsanid! Magacaagu waa maxay?",
          "breakdown": "",
          "english": "Thank you! What is your name?"
        },
        {
          "somali": "Walaalkaa xaal iska kuule?",
          "breakdown": "",
          "english": "My name is Amina. How is your brother?"
        },
        {
          "somali": "Hadii xaali! Iskuulka wuu socdaa.",
          "breakdown": "",
          "english": "He is fine. He goes to school."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m1-d1",
        "type": "fill-blank",
        "prompt": "Which word has the LONG vowel?",
        "options": [
          "cat",
          "caat"
        ],
        "correctAnswer": "caat",
        "explanation": "In Somali, vowel length creates different words with different meanings. When you write aa, ee, ii, oo, uu → hold that vowel longer."
      },
      {
        "id": "m1-d2",
        "type": "fill-blank",
        "prompt": "Find these words in the dialogue. What's the FIRST consonant sound?  Magacaagu → ?",
        "options": [
          "Shaqaysaa",
          "Magaalada",
          "Magacaagu",
          "Joogaa"
        ],
        "correctAnswer": "Magacaagu",
        "explanation": "Correct answer: Magacaagu (magaca = name)."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m1-d3",
        "type": "fill-blank",
        "prompt": "Deep Sounds Discrimination  kan (this) vs. qan → ?",
        "options": [
          "dar",
          "Time clause:",
          "hal",
          "kan"
        ],
        "correctAnswer": "kan",
        "explanation": "Correct answer: kan."
      },
      {
        "id": "m1-d4",
        "type": "fill-blank",
        "prompt": "Identifying Stress  SANnad (year) → ?",
        "options": [
          "SANnad",
          "UBAX",
          "HAween",
          "maGAAla"
        ],
        "correctAnswer": "SANnad",
        "explanation": "When you hear a Somali word, expect the FIRST SYLLABLE to be emphasized. This helps you recognize word boundaries in speech."
      }
    ],
    "gateDrills": [
      {
        "id": "m1-d5",
        "type": "fill-blank",
        "prompt": "Segment these words using hyphens:  saakin (quiet) → ?",
        "options": [
          "IS-kuul",
          "SAN-nad",
          "SAA-kin",
          "CAA-no"
        ],
        "correctAnswer": "SAA-kin",
        "explanation": "Correct answer: SAA-kin (long vowel stays together as one unit)."
      },
      {
        "id": "m1-d6",
        "type": "fill-blank",
        "prompt": "For each phrase from the dialogue, identify:  Magacaagu → ?",
        "options": [
          "Magacaagu",
          "Iskuulka",
          "Xaal iska kuule",
          "Hadii xaali"
        ],
        "correctAnswer": "Magacaagu",
        "explanation": "Correct answer: Magacaagu."
      }
    ]
  },
  {
    "id": 2,
    "title": "Nouns — Gender, Number & Agreement",
    "subtitle": "Phase: Foundations & Phonetics",
    "color": "#3b82f6",
    "rule": {
      "title": "Nouns — Gender, Number & Agreement",
      "content": "Notice: Some words describe people (naag, wiil, gabar, nin). Others describe places (magaalada). Some describe qualities (weyn = big, yar = small).",
      "examples": [
        {
          "somali": "Salaam, walaalkay! Sidee tahay?",
          "breakdown": "",
          "english": "Hello, my brother! How are you?"
        },
        {
          "somali": "Waa iska warran. Naag iyo wiil baa jira.",
          "breakdown": "",
          "english": "I'm fine. There's a woman and a boy."
        },
        {
          "somali": "Magaalo baa jirtaa?",
          "breakdown": "",
          "english": "Is there a city?"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m2-d1",
        "type": "fill-blank",
        "prompt": "From the dialogue, identify which words are NOUNS:  \"salaam\" (greeting) → ?",
        "options": [
          "gabar",
          "yar",
          "salaam",
          "wadaali"
        ],
        "correctAnswer": "salaam",
        "explanation": "Nouns NAME things. Adjectives DESCRIBE things."
      },
      {
        "id": "m2-d2",
        "type": "fill-blank",
        "prompt": "Classify these nouns as MASCULINE or FEMININE based on their form:  nin (man) → ?",
        "options": [
          "MASCULINE",
          "FEMININE"
        ],
        "correctAnswer": "FEMININE",
        "explanation": "The ENDING of a noun usually tells you its gender. Learn to recognize the patterns!"
      },
      {
        "id": "m2-d3",
        "type": "fill-blank",
        "prompt": "Add the correct definite marker (-ka for masculine, -ta for feminine):  naag (woman) → ?",
        "options": [
          "naag",
          "wiil",
          "magaalo",
          "nin"
        ],
        "correctAnswer": "naag",
        "explanation": "Correct answer: naag (the woman)."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m2-d4",
        "type": "fill-blank",
        "prompt": "Form the plural of these nouns:  nin (man) → ?",
        "options": [
          "gabar",
          "wiil",
          "magaalo",
          "nin"
        ],
        "correctAnswer": "nin",
        "explanation": "Masculine nouns often pluralize with -an or -aal. Feminine nouns often pluralize with -yaal or -o."
      },
      {
        "id": "m2-d5",
        "type": "fill-blank",
        "prompt": "Choose the correct adjective form to match each noun:  gabar (girl) → ?",
        "options": [
          "gabar cusub",
          "gabar-yaal yar",
          "niman waaweyn",
          "nin madow"
        ],
        "correctAnswer": "gabar cusub",
        "explanation": "Adjectives change to match the noun's gender AND number."
      },
      {
        "id": "m2-d6",
        "type": "fill-blank",
        "prompt": "Create phrases using noun + adjective (consider gender and number):",
        "options": [
          "Joogaa",
          "magaalo weyn",
          "wiil yar",
          "naag-yaal cusub"
        ],
        "correctAnswer": "magaalo weyn",
        "explanation": "Agreement happens automatically once you know the noun's gender and number."
      }
    ],
    "gateDrills": [
      {
        "id": "m2-d7",
        "type": "fill-blank",
        "prompt": "Form complete noun phrases (noun + adjective) using:",
        "options": [
          "nin gaduud",
          "gabar qurux badan",
          "niman badan",
          "Way socdatay si deg-deg."
        ],
        "correctAnswer": "nin gaduud",
        "explanation": "Once you choose a noun, the adjective must match its gender."
      }
    ]
  },
  {
    "id": 3,
    "title": "Articles & Determiners",
    "subtitle": "Phase: Foundations & Phonetics",
    "color": "#3b82f6",
    "rule": {
      "title": "Articles & Determiners",
      "content": "Question: What's the difference between \"nin\" and \"nin-ka\"?",
      "examples": [
        {
          "somali": "Nin-ka baa yimid.",
          "breakdown": "",
          "english": "THE man came."
        },
        {
          "somali": "Notice: nin-ka uses -ka",
          "breakdown": "",
          "english": "definite masculine"
        },
        {
          "somali": "Gabar-ta waxay aragtay.",
          "breakdown": "",
          "english": "THE girl saw [something]."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m3-d1",
        "type": "fill-blank",
        "prompt": "Is each noun DEFINITE (the) or INDEFINITE (a/any)?  nin → ?",
        "options": [
          "nin-ka",
          "gabar-ta",
          "naag-yaal",
          "nin"
        ],
        "correctAnswer": "nin",
        "explanation": "-ka and -ta make nouns DEFINITE. Without them, the noun is INDEFINITE."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m3-d2",
        "type": "fill-blank",
        "prompt": "Choose the correct demonstrative (near or far) for each context:",
        "options": [
          "Nin-kan",
          "Niman-kuwan",
          "Gabar-yaal-kuwaas",
          "Gabar-taas"
        ],
        "correctAnswer": "Nin-kan",
        "explanation": "Correct answer: Nin-kan (this man — near you)."
      }
    ],
    "gateDrills": [
      {
        "id": "m3-d3",
        "type": "fill-blank",
        "prompt": "Complete these sentences with the correct noun form:",
        "options": [
          "Gabar-ta",
          "Gabar",
          "Marno ma tagi karno.",
          "Gabar-tan"
        ],
        "correctAnswer": "Gabar",
        "explanation": "The article form tells the listener whether you're introducing a NEW noun or referring to one already KNOWN."
      }
    ]
  },
  {
    "id": 4,
    "title": "Pronouns — Comprehensive System",
    "subtitle": "Phase: Foundations & Phonetics",
    "color": "#3b82f6",
    "rule": {
      "title": "Pronouns — Comprehensive System",
      "content": "Question: Do pronouns change based on gender like nouns do?",
      "examples": [
        {
          "somali": "Ani waxaan malaha.",
          "breakdown": "",
          "english": "I think..."
        },
        {
          "somali": "ani = I",
          "breakdown": "",
          "english": "subject pronoun"
        },
        {
          "somali": "Isaga waa roon.",
          "breakdown": "",
          "english": "He is nice."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m4-d1",
        "type": "fill-blank",
        "prompt": "Identify whether each pronoun is a SUBJECT or OBJECT pronoun:  Ani waxaan joogaa. (I am here.) → ?",
        "options": [
          "ani = SUBJECT",
          "OBJECT"
        ],
        "correctAnswer": "ani = SUBJECT",
        "explanation": "Correct answer: ani = SUBJECT (I am the one doing the action)."
      },
      {
        "id": "m4-d2",
        "type": "fill-blank",
        "prompt": "Choose the correct pronoun (he or she) to replace each noun:  Nin-ka wuu socdaa. → ?",
        "options": [
          "Isaga",
          "Iyada wuu socdaa."
        ],
        "correctAnswer": "Isaga",
        "explanation": "The pronoun's gender matches the NOUN'S gender, not the person's actual gender."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m4-d3",
        "type": "fill-blank",
        "prompt": "Fill in the correct possessive pronoun:  ___ kitaab (my book) → ?",
        "options": [
          "inaagu",
          "iyaagu"
        ],
        "correctAnswer": "inaagu",
        "explanation": "Possessive pronouns agree with the person (my, your, his, her) not the noun's gender."
      },
      {
        "id": "m4-d4",
        "type": "fill-blank",
        "prompt": "Identify the pronoun type:  Ani waxaan shaqeynaa. (I work.) → ?",
        "options": [
          "ani = SUBJECT",
          "OBJECT",
          "POSSESSIVE",
          "REFLEXIVE"
        ],
        "correctAnswer": "ani = SUBJECT",
        "explanation": "Same pronouns can have different functions depending on how they're used in the sentence!"
      }
    ],
    "gateDrills": [
      {
        "id": "m4-d4",
        "type": "fill-blank",
        "prompt": "Identify the pronoun type:  Ani waxaan shaqeynaa. (I work.) → ?",
        "options": [
          "ani = SUBJECT",
          "OBJECT",
          "POSSESSIVE",
          "REFLEXIVE"
        ],
        "correctAnswer": "ani = SUBJECT",
        "explanation": "Same pronouns can have different functions depending on how they're used in the sentence!"
      }
    ]
  },
  {
    "id": 5,
    "title": "Adjectives & Descriptors",
    "subtitle": "Phase: Foundations & Phonetics",
    "color": "#3b82f6",
    "rule": {
      "title": "Adjectives & Descriptors",
      "content": "Question: Why does \"big\" change from weyn to weyn depending on the noun?",
      "examples": [
        {
          "somali": "Nin weyn baa jira.",
          "breakdown": "",
          "english": "A big man exists."
        },
        {
          "somali": "weyn = big",
          "breakdown": "",
          "english": "masculine form"
        },
        {
          "somali": "Gabar yar baa jirtaa.",
          "breakdown": "",
          "english": "A small girl exists."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m5-d1",
        "type": "fill-blank",
        "prompt": "Choose the correct adjective form for each noun:  nin (man) __ (big) → ?",
        "options": [
          "weyn",
          "waaweyn"
        ],
        "correctAnswer": "weyn",
        "explanation": "Always match the adjective form to the noun's gender and number!"
      },
      {
        "id": "m5-d2",
        "type": "fill-blank",
        "prompt": "Create comparative expressions:",
        "options": [
          "Nin-ka nin-kaas ka weyn",
          "Gabar-ta gabar-taas ka yar",
          "Kitaab-ka kitaab-kaas ka cusub",
          "Canaa-sha waa la cunay."
        ],
        "correctAnswer": "Nin-ka nin-kaas ka weyn",
        "explanation": "The order is: Subject + Comparison Target + \"ka\" + Adjective"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m5-d3",
        "type": "fill-blank",
        "prompt": "Create superlative expressions:",
        "options": [
          "Gabar-ta waa ugu yar",
          "Kitaab-ka waa ugu cusub",
          "saal",
          "Nin-ka waa ugu weyn"
        ],
        "correctAnswer": "Nin-ka waa ugu weyn",
        "explanation": "\"ugu\" + adjective = superlative (the most, the ___est)"
      },
      {
        "id": "m5-d4",
        "type": "fill-blank",
        "prompt": "Fix the word order to put adjectives in the correct position:  ❌ weyn nin → ?",
        "options": [
          "nin weyn",
          "gabar-yaal yar",
          "magaalo wanaagsan",
          "kitaab cusub"
        ],
        "correctAnswer": "nin weyn",
        "explanation": "Correct answer: nin weyn (man big)."
      }
    ],
    "gateDrills": [
      {
        "id": "m5-d4",
        "type": "fill-blank",
        "prompt": "Fix the word order to put adjectives in the correct position:  ❌ weyn nin → ?",
        "options": [
          "nin weyn",
          "gabar-yaal yar",
          "magaalo wanaagsan",
          "kitaab cusub"
        ],
        "correctAnswer": "nin weyn",
        "explanation": "Correct answer: nin weyn (man big)."
      }
    ]
  },
  {
    "id": 6,
    "title": "Numerals & Quantifiers",
    "subtitle": "Phase: Foundations & Phonetics",
    "color": "#3b82f6",
    "rule": {
      "title": "Numerals & Quantifiers",
      "content": "Notice: Numbers don't change based on the noun's gender!",
      "examples": [
        {
          "somali": "Laba wiil baa jira.",
          "breakdown": "",
          "english": "There are two boys."
        },
        {
          "somali": "Sadex gabar baa timideen.",
          "breakdown": "",
          "english": "Three girls came."
        },
        {
          "somali": "Toban min baa waxaan leeyahay.",
          "breakdown": "",
          "english": "I have ten things."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m6-d1",
        "type": "fill-blank",
        "prompt": "Identify these numbers in Somali:",
        "options": [
          "laba",
          "toban",
          "shan",
          "sadex"
        ],
        "correctAnswer": "laba",
        "explanation": "Correct answer: laba."
      },
      {
        "id": "m6-d2",
        "type": "fill-blank",
        "prompt": "Write these numbers in Somali:",
        "options": [
          "konton",
          "laab iyo shan",
          "kun",
          "boqol"
        ],
        "correctAnswer": "laab iyo shan",
        "explanation": "Correct answer: laab iyo shan (20 + 5)."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m6-d3",
        "type": "fill-blank",
        "prompt": "Create phrases with numbers and nouns:",
        "options": [
          "Shan kitaab",
          "Toban nin",
          "Sadex gabar",
          "way"
        ],
        "correctAnswer": "Sadex gabar",
        "explanation": "Number + SINGULAR noun form, even though it describes multiple items."
      },
      {
        "id": "m6-d4",
        "type": "fill-blank",
        "prompt": "Create ordinal numbers:",
        "options": [
          "shan-aad",
          "toban-aad",
          "laba-aad",
          "mid-aad"
        ],
        "correctAnswer": "mid-aad",
        "explanation": "Correct answer: mid-aad (1st)."
      }
    ],
    "gateDrills": [
      {
        "id": "m6-d5",
        "type": "fill-blank",
        "prompt": "Fill in the correct quantifier:",
        "options": [
          "Badan wiil",
          "Yar mid",
          "Dhamaantood niman",
          "Qaar gabar"
        ],
        "correctAnswer": "Badan wiil",
        "explanation": "Correct answer: Badan wiil (many boys)."
      }
    ]
  },
  {
    "id": 7,
    "title": "Prepositions & Spatial Relations",
    "subtitle": "Phase: Foundations & Phonetics",
    "color": "#3b82f6",
    "rule": {
      "title": "Prepositions & Spatial Relations",
      "content": "Notice: Prepositions show WHERE and WHEN!",
      "examples": [
        {
          "somali": "Waxaan ku jira guriga.",
          "breakdown": "",
          "english": "I am in the house."
        },
        {
          "somali": "Isagu waa magaaladii.",
          "breakdown": "",
          "english": "He is in the city."
        },
        {
          "somali": "magaaladii = the city",
          "breakdown": "",
          "english": "with -ii = locative"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m7-d1",
        "type": "fill-blank",
        "prompt": "Identify the preposition in each phrase:  ku guriga → ?",
        "options": [
          "ku",
          "ka",
          "u"
        ],
        "correctAnswer": "ku",
        "explanation": "Correct answer: ku (in)."
      },
      {
        "id": "m7-d2",
        "type": "fill-blank",
        "prompt": "Match the preposition to its meaning:  intii → ?",
        "options": [
          "ka dib",
          "ka hor",
          "intii",
          "markaa"
        ],
        "correctAnswer": "intii",
        "explanation": "Correct answer: intii."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m7-d3",
        "type": "fill-blank",
        "prompt": "Identify the preposition in each sentence:  Waxaan ku jira magaalada. (I am in the city.) → ?",
        "options": [
          "u",
          "ku",
          "intii",
          "ka dib"
        ],
        "correctAnswer": "ku",
        "explanation": "Correct answer: ku (in/at)."
      },
      {
        "id": "m7-d4",
        "type": "fill-blank",
        "prompt": "Create prepositional phrases with these prepositions:",
        "options": [
          "ku guriga",
          "ka magaalada",
          "u suuqa",
          "intii uu socdaa"
        ],
        "correctAnswer": "ku guriga",
        "explanation": "Correct answer: ku guriga (in the house)."
      }
    ],
    "gateDrills": [
      {
        "id": "m7-d4",
        "type": "fill-blank",
        "prompt": "Create prepositional phrases with these prepositions:",
        "options": [
          "ku guriga",
          "ka magaalada",
          "u suuqa",
          "intii uu socdaa"
        ],
        "correctAnswer": "ku guriga",
        "explanation": "Correct answer: ku guriga (in the house)."
      }
    ]
  },
  {
    "id": 8,
    "title": "Verbs — Introduction & Foundation",
    "subtitle": "Phase: Core Verb System",
    "color": "#8b5cf6",
    "rule": {
      "title": "Verbs — Introduction & Foundation",
      "content": "Notice: Verbs CHANGE based on WHO is doing the action and WHEN!",
      "examples": [
        {
          "somali": "Ani waxaan tag.",
          "breakdown": "",
          "english": "I go."
        },
        {
          "somali": "tag = to go",
          "breakdown": "",
          "english": "verb"
        },
        {
          "somali": "Isagu wuu socdaa.",
          "breakdown": "",
          "english": "He walks."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m8-d1",
        "type": "fill-blank",
        "prompt": "Extract the THREE-CONSONANT ROOT from these verbs:  tag (go) → ?",
        "options": [
          "tag",
          "socod",
          "cun",
          "joog"
        ],
        "correctAnswer": "tag",
        "explanation": "The ROOT contains the CONSONANTS; the VOWELS are added to create different forms."
      },
      {
        "id": "m8-d2",
        "type": "fill-blank",
        "prompt": "Classify each verb as TRANSITIVE (T), INTRANSITIVE (I), or STATIVE (S):  tag (go) → ?",
        "options": [
          "T",
          "I",
          "S"
        ],
        "correctAnswer": "T",
        "explanation": "Transitive verbs REQUIRE an object. Intransitive verbs DON'T. Stative verbs express STATES."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m8-d3",
        "type": "fill-blank",
        "prompt": "Match the verb form to the correct subject:  Ani waan ____ → ?",
        "options": [
          "tag",
          "tags",
          "tageen"
        ],
        "correctAnswer": "tag",
        "explanation": "The SAME verb form \"tag\" works for all persons in present tense! (Somali doesn't conjugate present tense the way English does with \"go, goes\")"
      },
      {
        "id": "m8-d4",
        "type": "fill-blank",
        "prompt": "Fill in the correct agreement marker:  ____ waxaan tag. (I go) → ?",
        "options": [
          "waan",
          "waad",
          "wuu"
        ],
        "correctAnswer": "waan",
        "explanation": "Each subject has its SPECIFIC agreement marker!"
      }
    ],
    "gateDrills": [
      {
        "id": "m8-d5",
        "type": "fill-blank",
        "prompt": "Break down each verb phrase into: SUBJECT + AGREEMENT MARKER + VERB  Ani waan tag. → ?",
        "options": [
          "iyada",
          "isagu",
          "ani",
          "innaga"
        ],
        "correctAnswer": "ani",
        "explanation": "Every Somali verb sentence has this THREE-PART structure!"
      }
    ]
  },
  {
    "id": 9,
    "title": "Tense & Aspect System",
    "subtitle": "Phase: Core Verb System",
    "color": "#8b5cf6",
    "rule": {
      "title": "Tense & Aspect System",
      "content": "Notice the VERB CHANGES to show time and nature of action: Notice: The SAME ROOT (tag, socod, cun) but DIFFERENT MARKERS show different times and natures!",
      "examples": [
        {
          "somali": "Ani waxaan tag.",
          "breakdown": "",
          "english": "I go."
        },
        {
          "somali": "Ani waxaan tagay.",
          "breakdown": "",
          "english": "I went."
        },
        {
          "somali": "Ani waxaan tagi doonaa.",
          "breakdown": "",
          "english": "I will go."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m9-d1",
        "type": "fill-blank",
        "prompt": "Form the present tense with these verbs:  ani + ciyaar (I play) → ?",
        "options": [
          "isagu wuu arki",
          "innaga waannu joog",
          "ani waan ciyaar",
          "iyaga way socod"
        ],
        "correctAnswer": "ani waan ciyaar",
        "explanation": "Present tense = verb stem with NO suffix!"
      },
      {
        "id": "m9-d2",
        "type": "fill-blank",
        "prompt": "Form the past tense (completed action):  ani + tag → ?",
        "options": [
          "iyada way ciyaartay",
          "isagu wuu cunay",
          "ani waan tagay",
          "iyaga way arkeen"
        ],
        "correctAnswer": "ani waan tagay",
        "explanation": "Past tense uses -ay/-ey/-een suffix to show COMPLETED action!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m9-d3",
        "type": "fill-blank",
        "prompt": "Form the future tense:  ani + tag → ?",
        "options": [
          "iyada way arki doontaa",
          "iyaga way socodka doonaan",
          "isagu wuu cuni donaa",
          "ani waan tagi doonaa"
        ],
        "correctAnswer": "ani waan tagi doonaa",
        "explanation": "Future uses doonaa/doontaa/donaa auxiliary!"
      },
      {
        "id": "m9-d4",
        "type": "fill-blank",
        "prompt": "For each sentence, identify TENSE (P=past, PR=present, F=future) and ASPECT (perf=perfective, imperf=imperfective, hab=habitual):  Ani waan cunay. → ?",
        "options": [
          "Ani waan cunay.",
          "Ani waan cunaya.",
          "Ani waan cuni doonaa.",
          "Ani waan cuna."
        ],
        "correctAnswer": "Ani waan cunay.",
        "explanation": "Correct answer: Ani waan cunay. (I ate)."
      }
    ],
    "gateDrills": [
      {
        "id": "m9-d5",
        "type": "fill-blank",
        "prompt": "For each sentence, translate and identify TENSE + ASPECT:  Ani waan socdaa. → ?",
        "options": [
          "Ani waan socday.",
          "arki-ye",
          "Ani waan socdaa.",
          "Ani waan socdi doonaa."
        ],
        "correctAnswer": "Ani waan socdaa.",
        "explanation": "Correct answer: Ani waan socdaa.."
      }
    ]
  },
  {
    "id": 10,
    "title": "Mood & Modality",
    "subtitle": "Phase: Core Verb System",
    "color": "#8b5cf6",
    "rule": {
      "title": "Mood & Modality",
      "content": "Notice the ATTITUDE change toward the action: Notice: SAME VERB ROOT (tag) but DIFFERENT MOODS express different attitudes!",
      "examples": [
        {
          "somali": "Ani waan tag.",
          "breakdown": "",
          "english": "I go. — This is a fact."
        },
        {
          "somali": "Waxaan doon tag!",
          "breakdown": "",
          "english": "I want to go! — Expressing desire"
        },
        {
          "somali": "Tag!",
          "breakdown": "",
          "english": "Go! — Telling someone to do it"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m10-d1",
        "type": "fill-blank",
        "prompt": "Form subjunctive phrases expressing desire:  ani + doon + tag → ?",
        "options": [
          "Way doona inay arkaan.",
          "Waxaan doon inaan tago.",
          "Wuu raba inuu socdo.",
          "Way rabtaa inay cunto."
        ],
        "correctAnswer": "Waxaan doon inaan tago.",
        "explanation": "Subjunctive uses -o suffix to show DESIRE or NECESSITY!"
      },
      {
        "id": "m10-d2",
        "type": "fill-blank",
        "prompt": "Form conditional sentences:",
        "options": [
          "Hadii aad ____ cun, ____ buu",
          "imaan."
        ],
        "correctAnswer": "imaan.",
        "explanation": "Conditionals use hadii (if) + matched tenses for condition-result!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m10-d3",
        "type": "fill-blank",
        "prompt": "Identify the MOOD of each verb:  \"Ani waan ciyaaray.\" → ?",
        "options": [
          "Indicative",
          "Conditional",
          "Subjunctive",
          "Imperative"
        ],
        "correctAnswer": "Indicative",
        "explanation": "Each mood shifts the communicative purpose!"
      },
      {
        "id": "m10-d4",
        "type": "fill-blank",
        "prompt": "Form negative imperatives (commands not to do something):  tag (go) → ?",
        "options": [
          "Ha qorin!",
          "Ha tagin!",
          "Ha cunin!",
          "Ha socdina!"
        ],
        "correctAnswer": "Ha tagin!",
        "explanation": "Negative imperatives use ha + infinitive + -n suffix!"
      }
    ],
    "gateDrills": [
      {
        "id": "m10-d4",
        "type": "fill-blank",
        "prompt": "Form negative imperatives (commands not to do something):  tag (go) → ?",
        "options": [
          "Ha qorin!",
          "Ha tagin!",
          "Ha cunin!",
          "Ha socdina!"
        ],
        "correctAnswer": "Ha tagin!",
        "explanation": "Negative imperatives use ha + infinitive + -n suffix!"
      }
    ]
  },
  {
    "id": 11,
    "title": "Verb Extensions & Voice",
    "subtitle": "Phase: Core Verb System",
    "color": "#8b5cf6",
    "rule": {
      "title": "Verb Extensions & Voice",
      "content": "Notice how ONE VERB ROOT appears in DIFFERENT FORMS: Notice: SAME ROOT (tag) but DIFFERENT EXTENSIONS show different relationships!",
      "examples": [
        {
          "somali": "Ani waan tag.",
          "breakdown": "",
          "english": "I go."
        },
        {
          "somali": "Ani waan tagin.",
          "breakdown": "",
          "english": "I make/send."
        },
        {
          "somali": "Ani waa la tagin.",
          "breakdown": "",
          "english": "I am made to go."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m11-d1",
        "type": "fill-blank",
        "prompt": "Form the causative by adding -in to each verb:  tag (go) → ?",
        "options": [
          "cunin",
          "socdin",
          "arkin",
          "tagin"
        ],
        "correctAnswer": "tagin",
        "explanation": "Causative simply adds -in to the verb stem!"
      },
      {
        "id": "m11-d2",
        "type": "fill-blank",
        "prompt": "Form the passive by using la- prefix:  Wiil-ka wuu qoray. (The boy wrote.) → ?",
        "options": [
          "Xariif-ka waa la qoray.",
          "Dugsi-ga waa la arkay.",
          "Joogaa",
          "Canaa-sha waa la cunay."
        ],
        "correctAnswer": "Xariif-ka waa la qoray.",
        "explanation": "Passive uses la- prefix with normal verb agreement markers!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m11-d3",
        "type": "fill-blank",
        "prompt": "Form reflexive verbs using is- prefix:  caashi (wash) → ?",
        "options": [
          "way is bar",
          "ani waan is caashi",
          "way is cun",
          "wuu is qor"
        ],
        "correctAnswer": "ani waan is caashi",
        "explanation": "Reflexive uses is- prefix to mark action toward self!"
      },
      {
        "id": "m11-d4",
        "type": "fill-blank",
        "prompt": "Form iterative verbs by doubling the root:  socod → ?",
        "options": [
          "ciyaar-ciyaar",
          "cun-cun",
          "socod-socod",
          "tag-tag"
        ],
        "correctAnswer": "socod-socod",
        "explanation": "Iterative uses root doubling to show repeated/continuous action!"
      }
    ],
    "gateDrills": [
      {
        "id": "m11-d5",
        "type": "fill-blank",
        "prompt": "Identify which extension is used:  Ani waan is caashi. → ?",
        "options": [
          "Ani waan cunin caruurta.",
          "Wuu socod-socod.",
          "Xariif-ka waa la qoray.",
          "Ani waan is caashi."
        ],
        "correctAnswer": "Ani waan is caashi.",
        "explanation": "Each extension changes the verb's RELATIONSHIP to the action!"
      }
    ]
  },
  {
    "id": 12,
    "title": "Complex Verb Forms & Irregularities",
    "subtitle": "Phase: Core Verb System",
    "color": "#8b5cf6",
    "rule": {
      "title": "Complex Verb Forms & Irregularities",
      "content": "Notice the UNUSUAL PATTERNS: Notice: Irregular verbs are COMMON and IMPORTANT!",
      "examples": [
        {
          "somali": "Ani waan tag.",
          "breakdown": "",
          "english": "I go."
        },
        {
          "somali": "Ani waan tagay.",
          "breakdown": "",
          "english": "I went."
        },
        {
          "somali": "Ani waan tagi doonaa.",
          "breakdown": "",
          "english": "I will go."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m12-d1",
        "type": "fill-blank",
        "prompt": "Fill in the correct form:",
        "options": [
          "Gabar-ta way ahaa macallima.",
          "Ani waan socdi doonaa.",
          "Buu imaan hadii aad yeelaato.",
          "Ani waan imaa inaan socdo."
        ],
        "correctAnswer": "Ani waan imaa inaan socdo.",
        "explanation": "Irregular verbs require direct memorization, not pattern rules!"
      },
      {
        "id": "m12-d2",
        "type": "fill-blank",
        "prompt": "Identify which form is GEMINATED (doubled consonant) and explain the meaning shift:  tag vs. taag → ?",
        "options": [
          "taag",
          "jooj",
          "cuun",
          "soocod"
        ],
        "correctAnswer": "taag",
        "explanation": "Gemination adds INTENSITY and EMPHASIS to verbs!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m12-d3",
        "type": "fill-blank",
        "prompt": "Match the verb to the meaning:  Ani waan tag. → ?",
        "options": [
          "I depart",
          "She arrived",
          "I go",
          "She came"
        ],
        "correctAnswer": "I go",
        "explanation": "Suppletive verbs use different roots to express DIFFERENT SHADES OF MEANING!"
      },
      {
        "id": "m12-d4",
        "type": "fill-blank",
        "prompt": "For each sentence, identify: (1) the verb, (2) is it regular or irregular?, (3) the tense:  \"Ani waan tagay.\" → ?",
        "options": [
          "tag",
          "ahaa",
          "imid",
          "Caruurta jira dugsi-ga."
        ],
        "correctAnswer": "tag",
        "explanation": "Recognize irregularities and treat them as SPECIAL CASES!"
      }
    ],
    "gateDrills": [
      {
        "id": "m12-d4",
        "type": "fill-blank",
        "prompt": "For each sentence, identify: (1) the verb, (2) is it regular or irregular?, (3) the tense:  \"Ani waan tagay.\" → ?",
        "options": [
          "tag",
          "ahaa",
          "imid",
          "Caruurta jira dugsi-ga."
        ],
        "correctAnswer": "tag",
        "explanation": "Recognize irregularities and treat them as SPECIAL CASES!"
      }
    ]
  },
  {
    "id": 13,
    "title": "Word Order & Simple Sentences",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Word Order & Simple Sentences",
      "content": "Notice how WORD ORDER changes MEANING and EMPHASIS: Notice: SAME WORDS, DIFFERENT ORDER = DIFFERENT MEANING!",
      "examples": [
        {
          "somali": "Gabar-ta way cunay cambuula.",
          "breakdown": "",
          "english": "The girl ate the food."
        },
        {
          "somali": "Way cunay gabar-ta cambuula.",
          "breakdown": "",
          "english": "The food ATE the girl. — focus on the eating, unusual"
        },
        {
          "somali": "Cambuula baa gabar-ta cunaysay.",
          "breakdown": "",
          "english": "FOOD is what the girl was eating. — emphasizing the food"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m13-d1",
        "type": "fill-blank",
        "prompt": "Build complete SVO sentences with subject, verb, object:  (subject: ani) + (verb: tag) + (object: iskuulka) → ?",
        "options": [
          "Iyaga way cun cuntada.",
          "Ani waan tag iskuulka.",
          "Gabar-ta way arki ninka.",
          "Wiil-ka wuu qor xariif."
        ],
        "correctAnswer": "Ani waan tag iskuulka.",
        "explanation": "SVO is the BASIC, NEUTRAL word order!"
      },
      {
        "id": "m13-d2",
        "type": "fill-blank",
        "prompt": "Convert these SVO sentences to VSO (emphasizing the action):  Ani waan tag. → ?",
        "options": [
          "Way tag ani.",
          "Way cun gabar-ta.",
          "Wuu arkis wiil-ka.",
          "caat"
        ],
        "correctAnswer": "Way tag ani.",
        "explanation": "VSO emphasizes the ACTION by fronting the verb!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m13-d3",
        "type": "fill-blank",
        "prompt": "Add BAA to emphasize the underlined element:  Gabar-ta way cun. (GABAR-TA) → ?",
        "options": [
          "Ninka baa way arkis.",
          "Iskuulka baa wuu tag.",
          "Ha tagin!",
          "Gabar-ta baa way cun."
        ],
        "correctAnswer": "Gabar-ta baa way cun.",
        "explanation": "BAA marks the FOCUSED/MOST IMPORTANT element!"
      },
      {
        "id": "m13-d4",
        "type": "fill-blank",
        "prompt": "Expand each sentence by adding the adjunct in parentheses:  Ani waan tag. (iskuulka) → ?",
        "options": [
          "Ani waan tag iskuulka.",
          "Wuu qor si deg-deg.",
          "Ani waan socdaa.",
          "Way cun guriga mara dhexe."
        ],
        "correctAnswer": "Ani waan tag iskuulka.",
        "explanation": "Adjuncts provide CONTEXT and DETAIL!"
      }
    ],
    "gateDrills": [
      {
        "id": "m13-d5",
        "type": "fill-blank",
        "prompt": "Break down each sentence into: SUBJECT | AGREEMENT | VERB | OBJECT | ADJUNCTS:",
        "options": [
          "Gabar-ta | way | cun | guriga | —",
          "Ani | waan | tag | iskuulka | hadda",
          "Ha socdina!",
          "Wiil-ka | wuu | qor | xariif | si deg-deg"
        ],
        "correctAnswer": "Ani | waan | tag | iskuulka | hadda",
        "explanation": "Every sentence part has a FUNCTION!"
      },
      {
        "id": "m13-d6",
        "type": "fill-blank",
        "prompt": "Choose the sentence that correctly emphasizes what's described:",
        "options": [
          "Gabar-ta way cunay.",
          "Way cunay gabar-ta.",
          "Gabar-ta baa way cunay.",
          "wuu"
        ],
        "correctAnswer": "Gabar-ta baa way cunay.",
        "explanation": "Word order carries COMMUNICATIVE MEANING!"
      }
    ]
  },
  {
    "id": 14,
    "title": "Complex Sentences",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Complex Sentences",
      "content": "Notice how sentences COMBINE and RELATE to each other: Notice: COMBINING SENTENCES creates TEXTURE and MEANING!",
      "examples": [
        {
          "somali": "Ani waan tag iskuulka.",
          "breakdown": "",
          "english": "I go to school."
        },
        {
          "somali": "Macalimka wuu baro.",
          "breakdown": "",
          "english": "The teacher teaches."
        },
        {
          "somali": "Ani waan tag iskuulka oo macalimka baa baro.",
          "breakdown": "",
          "english": "I go to school and the teacher teaches."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m14-d1",
        "type": "fill-blank",
        "prompt": "Combine each pair using the given coordinator:",
        "options": [
          "Ani waan tag iskuulka oo adiga waad joog guriga.",
          "Way socdeen suuqa hadii kale guriga.",
          "Ani waan cunaya.",
          "Gabar-ta way cunay laakiin wiil-ka ma cunin."
        ],
        "correctAnswer": "Ani waan tag iskuulka oo adiga waad joog guriga.",
        "explanation": "Coordinators join EQUAL, INDEPENDENT clauses!"
      },
      {
        "id": "m14-d2",
        "type": "fill-blank",
        "prompt": "Combine using the given subordinator:",
        "options": [
          "Sababtoo ah way caafi, way socdeen.",
          "Markii aad tag, way imaan.",
          "arkiga-mo",
          "Way tag hadii aad rabo inay tag."
        ],
        "correctAnswer": "Markii aad tag, way imaan.",
        "explanation": "Subordinators LINK dependent to main clauses!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m14-d3",
        "type": "fill-blank",
        "prompt": "Add relative clauses to describe each noun:  Gabar-ta (beautiful) → ?",
        "options": [
          "Iskuulka oo weyn.",
          "Ninka oo qor si deg-deg.",
          "Gabar-ta oo qurux.",
          "Iskuulka"
        ],
        "correctAnswer": "Gabar-ta oo qurux.",
        "explanation": "Relative clauses use OO to link noun to description!"
      },
      {
        "id": "m14-d4",
        "type": "fill-blank",
        "prompt": "Identify the parts of this sentence:",
        "options": [
          "Relative on \"ninka\":",
          "Relative on \"gabar-ta\":",
          "Time clause:",
          "Main clause:"
        ],
        "correctAnswer": "Main clause:",
        "explanation": "Embedded sentences have MULTIPLE LAYERS of meaning!"
      }
    ],
    "gateDrills": [
      {
        "id": "m14-d5",
        "type": "fill-blank",
        "prompt": "Choose the structure that fits the meaning:",
        "options": [
          "Coordination",
          "Hadii xaali",
          "Relative clause",
          "Subordination"
        ],
        "correctAnswer": "Coordination",
        "explanation": "Choose structure based on RELATIONSHIP between ideas!"
      }
    ]
  },
  {
    "id": 15,
    "title": "Negation",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Negation",
      "content": "Notice how negation CHANGES the sentence: Notice: Negation TRANSFORMS the verb form!",
      "examples": [
        {
          "somali": "Ani waan tag.",
          "breakdown": "",
          "english": "I go."
        },
        {
          "somali": "Ani ma tag.",
          "breakdown": "",
          "english": "I don't go."
        },
        {
          "somali": "Gabar-ta way cunay cuntada.",
          "breakdown": "",
          "english": "The girl ate the food."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m15-d1",
        "type": "fill-blank",
        "prompt": "Form negative future sentences:  Ani waan tagi doonaa. (I will go.) → ?",
        "options": [
          "Wuu ma arkin donaa.",
          "Wuu qor si deg-deg.",
          "Ani ma tagi doona.",
          "Way ma cuni doontaa."
        ],
        "correctAnswer": "Ani ma tagi doona.",
        "explanation": "Future negation changes the auxiliary marker!"
      },
      {
        "id": "m15-d2",
        "type": "fill-blank",
        "prompt": "Form negative commands:  Tag! (Go!) → ?",
        "options": [
          "qorin",
          "tagin",
          "cunin",
          "arkin"
        ],
        "correctAnswer": "tagin",
        "explanation": "Negative imperatives use HA + infinitive + -n!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m15-d3",
        "type": "fill-blank",
        "prompt": "Translate these double negatives (understanding them as Somali-correct):  Ma arkimo cidina. → ?",
        "options": [
          "Ma arkimo cidina.",
          "Marno ma tagi karno.",
          "Waxna ma jira.",
          "Caruurta jira dugsi-ga."
        ],
        "correctAnswer": "Ma arkimo cidina.",
        "explanation": "Somali double negatives are CORRECT and COMMON!"
      },
      {
        "id": "m15-d4",
        "type": "fill-blank",
        "prompt": "Choose the correct indefinite:",
        "options": [
          "marno",
          "shan-aad",
          "kan",
          "cidina"
        ],
        "correctAnswer": "cidina",
        "explanation": "Different indefinites for different situations!"
      }
    ],
    "gateDrills": [
      {
        "id": "m15-d4",
        "type": "fill-blank",
        "prompt": "Choose the correct indefinite:",
        "options": [
          "marno",
          "shan-aad",
          "kan",
          "cidina"
        ],
        "correctAnswer": "cidina",
        "explanation": "Different indefinites for different situations!"
      }
    ]
  },
  {
    "id": 16,
    "title": "Questions & Interrogatives",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Questions & Interrogatives",
      "content": "Notice the different question types: Notice: Questions use SPECIFIC WORDS and PATTERNS!",
      "examples": [
        {
          "somali": "Aad tag iskuulka?",
          "breakdown": "",
          "english": "Do you go to school?"
        },
        {
          "somali": "Response: Haa, waan tag.",
          "breakdown": "",
          "english": "Yes, I go."
        },
        {
          "somali": "Waa maxay?",
          "breakdown": "",
          "english": "What is it?"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m16-d1",
        "type": "fill-blank",
        "prompt": "Convert statements to yes/no questions using MIY-:  Ani waan tag. (I go.) → ?",
        "options": [
          "Miyaan tag?",
          "Miyuu arki?",
          "Miyay cunay?",
          "\"He TAG to school.\""
        ],
        "correctAnswer": "Miyaan tag?",
        "explanation": "MIY- combines with subject and agreement markers!"
      },
      {
        "id": "m16-d2",
        "type": "fill-blank",
        "prompt": "Form wh-questions using the given interrogative:",
        "options": [
          "Waa maxay baa guriga?",
          "Halkee buu joog?",
          "niman waaweyn",
          "Yuu qoray xariif-ka?"
        ],
        "correctAnswer": "Yuu qoray xariif-ka?",
        "explanation": "Wh-interrogatives have specific positions in sentences!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m16-d3",
        "type": "fill-blank",
        "prompt": "Form questions about time and manner:",
        "options": [
          "Gormee way imaan?",
          "isagu wuu cunay",
          "Gabar-taas",
          "Sidee buu qor?"
        ],
        "correctAnswer": "Gormee way imaan?",
        "explanation": "Time and manner questions follow wh-question patterns!"
      },
      {
        "id": "m16-d4",
        "type": "fill-blank",
        "prompt": "Embed the question within the larger sentence:",
        "options": [
          "Macalimka waxuu su'aali waa maxay.",
          "Waxaan doon inaan ogaado yuu tag.",
          "dhex",
          "SAA-kin"
        ],
        "correctAnswer": "Waxaan doon inaan ogaado yuu tag.",
        "explanation": "Embedded questions preserve wh-word position!"
      }
    ],
    "gateDrills": [
      {
        "id": "m16-d4",
        "type": "fill-blank",
        "prompt": "Embed the question within the larger sentence:",
        "options": [
          "Macalimka waxuu su'aali waa maxay.",
          "Waxaan doon inaan ogaado yuu tag.",
          "dhex",
          "SAA-kin"
        ],
        "correctAnswer": "Waxaan doon inaan ogaado yuu tag.",
        "explanation": "Embedded questions preserve wh-word position!"
      }
    ]
  },
  {
    "id": 17,
    "title": "Conjunctions & Discourse",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Conjunctions & Discourse",
      "content": "Notice how ideas are CONNECTED: Notice: Conjunctions CREATE CONNECTIONS and FLOW!",
      "examples": [
        {
          "somali": "Ani waan tag iskuulka OO adiga waad joog guriga.",
          "breakdown": "",
          "english": "I go to school AND you stay home. — equal ideas"
        },
        {
          "somali": "MARKII ani tag iskuulka, way imaan.",
          "breakdown": "",
          "english": "WHEN I go to school, she will come. — dependent"
        },
        {
          "somali": "Markaa buu tag iskuulka oo way socdeen suuqa.",
          "breakdown": "",
          "english": "THEN he went to school AND they went to the market. — sequence"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m17-d1",
        "type": "fill-blank",
        "prompt": "Add appropriate discourse markers to make the narrative coherent:",
        "options": [
          "Way socdatay si deg-deg.",
          "Markaa",
          "qoraal",
          "jooj"
        ],
        "correctAnswer": "Markaa",
        "explanation": "Discourse markers create FLOW and CONNECTION!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m17-d2",
        "type": "fill-blank",
        "prompt": "Identify whether each is COORDINATION, SUBORDINATION, or DISCOURSE MARKER:  Ani waan tag OO adiga waad joog. → ?",
        "options": [
          "Discourse Marker",
          "Subordination",
          "Coordination",
          "Waxaan doon inaan tago."
        ],
        "correctAnswer": "Coordination",
        "explanation": "Each connector type has DIFFERENT FUNCTION!"
      }
    ],
    "gateDrills": [
      {
        "id": "m17-d2",
        "type": "fill-blank",
        "prompt": "Identify whether each is COORDINATION, SUBORDINATION, or DISCOURSE MARKER:  Ani waan tag OO adiga waad joog. → ?",
        "options": [
          "Discourse Marker",
          "Subordination",
          "Coordination",
          "Waxaan doon inaan tago."
        ],
        "correctAnswer": "Coordination",
        "explanation": "Each connector type has DIFFERENT FUNCTION!"
      }
    ]
  },
  {
    "id": 18,
    "title": "Adverbs",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Adverbs",
      "content": "Notice how adverbs DESCRIBE the manner, time, and place of actions: Notice: Adverbs MODIFY VERBS and make meaning MORE PRECISE!",
      "examples": [
        {
          "somali": "Way socdatay si deg-deg.",
          "breakdown": "",
          "english": "She walked quickly."
        },
        {
          "somali": "Wuu qor si deg-deg.",
          "breakdown": "",
          "english": "He writes carefully."
        },
        {
          "somali": "Hadda way imaan.",
          "breakdown": "",
          "english": "She comes now."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m18-d1",
        "type": "fill-blank",
        "prompt": "Create manner adverbs and use them in sentences:  SI + deg-deg (quickly) → ?",
        "options": [
          "Way imaan si xasil.",
          "Inaagu",
          "Way socdatay si deg-deg.",
          "Wuu qor si qurux."
        ],
        "correctAnswer": "Way socdatay si deg-deg.",
        "explanation": "Manner uses SI + adjective formula!"
      },
      {
        "id": "m18-d2",
        "type": "fill-blank",
        "prompt": "Use time adverbs in sentences:",
        "options": [
          "Mogadishu",
          "Way imaan hadda.",
          "Wuu tag iskuulka berri.",
          "Way cunay cuntada habaa dhan."
        ],
        "correctAnswer": "Way imaan hadda.",
        "explanation": "Time adverbs come after the verb!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m18-d3",
        "type": "fill-blank",
        "prompt": "Use place adverbs in sentences:",
        "options": [
          "Wuu joog guriga.",
          "Way socdeen suuqa.",
          "Miyaad tag iskuulka?",
          "wuu"
        ],
        "correctAnswer": "Wuu joog guriga.",
        "explanation": "Place adverbs indicate LOCATION!"
      },
      {
        "id": "m18-d4",
        "type": "fill-blank",
        "prompt": "Use frequency adverbs in sentences:",
        "options": [
          "Wuu tag iskuulka marmar.",
          "Ma arkis marjoga.",
          "Way imaan si xasil.",
          "Way cunay cuntada habaa dhan."
        ],
        "correctAnswer": "Way cunay cuntada habaa dhan.",
        "explanation": "Frequency shows HOW OFTEN!"
      }
    ],
    "gateDrills": [
      {
        "id": "m18-d4",
        "type": "fill-blank",
        "prompt": "Use frequency adverbs in sentences:",
        "options": [
          "Wuu tag iskuulka marmar.",
          "Ma arkis marjoga.",
          "Way imaan si xasil.",
          "Way cunay cuntada habaa dhan."
        ],
        "correctAnswer": "Way cunay cuntada habaa dhan.",
        "explanation": "Frequency shows HOW OFTEN!"
      }
    ]
  },
  {
    "id": 19,
    "title": "Copular & Existential",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Copular & Existential",
      "content": "Notice the different WAYS TO SAY \"IS\": Notice: DIFFERENT COPULAS for DIFFERENT MEANINGS!",
      "examples": [
        {
          "somali": "Waa macalim.",
          "breakdown": "",
          "english": "He is a teacher."
        },
        {
          "somali": "Magacaygu waa Fatima.",
          "breakdown": "",
          "english": "My name is Fatima."
        },
        {
          "somali": "Gabar-ta way qurux.",
          "breakdown": "",
          "english": "The girl is beautiful."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m19-d1",
        "type": "fill-blank",
        "prompt": "Choose WAA (identity) or TAHAY (state):  \"She is a teacher.\" → ?",
        "options": [
          "Way qurux TAHAY.",
          "Wuu WAA ardii.",
          "laba",
          "Way WAA macallimad."
        ],
        "correctAnswer": "Way WAA macallimad.",
        "explanation": "WAA for identity, TAHAY for state!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m19-d2",
        "type": "fill-blank",
        "prompt": "Form sentences using the given copula:",
        "options": [
          "Magacaygu waa Ahmed.",
          "Wiil-ka wuu noqon doona macalim.",
          "Caruurta jira dugsi-ga.",
          "Gabar-ta way qurux tahay."
        ],
        "correctAnswer": "Magacaygu waa Ahmed.",
        "explanation": "Each copula serves DIFFERENT PURPOSE!"
      }
    ],
    "gateDrills": [
      {
        "id": "m19-d3",
        "type": "fill-blank",
        "prompt": "Form negative versions:  Waa macalim. → ?",
        "options": [
          "Ma qurux tahay.",
          "Ma ahaa macalim.",
          "daal",
          "Waxna jira = Ma jira cidina."
        ],
        "correctAnswer": "Ma ahaa macalim.",
        "explanation": "Copular negation requires learning special forms!"
      }
    ]
  },
  {
    "id": 20,
    "title": "Special Topics (Advanced Agreement, Focus, Topicalization)",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Special Topics (Advanced Agreement, Focus, Topicalization)",
      "content": "Complex sentences require AGREEMENT across multiple elements: Advanced agreement = precision across ALL elements!",
      "examples": [
        {
          "somali": "Basic agreement: Gabar-ta (feminine singular) + way (3sg fem) + cunaysay",
          "breakdown": "",
          "english": "fem sing"
        },
        {
          "somali": "Gabar-ta (fem sing) + way (3sg fem) + cunaysay (fem sing) + cuntada",
          "breakdown": "",
          "english": "fem sing def"
        },
        {
          "somali": "Gabar-ta oo qurux",
          "breakdown": "",
          "english": "agreement on both"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m20-d1",
        "type": "fill-blank",
        "prompt": "Identify the advanced technique in each sentence:  \"Cuntada baa gabar-ta cunaysay.\" → ?",
        "options": [
          "Technique: ____ Focus",
          "Topicalization"
        ],
        "correctAnswer": "Technique: ____ Focus",
        "explanation": "Each technique SHIFTS MEANING subtly!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m20-d1",
        "type": "fill-blank",
        "prompt": "Identify the advanced technique in each sentence:  \"Cuntada baa gabar-ta cunaysay.\" → ?",
        "options": [
          "Technique: ____ Focus",
          "Topicalization"
        ],
        "correctAnswer": "Technique: ____ Focus",
        "explanation": "Each technique SHIFTS MEANING subtly!"
      }
    ],
    "gateDrills": [
      {
        "id": "m20-d1",
        "type": "fill-blank",
        "prompt": "Identify the advanced technique in each sentence:  \"Cuntada baa gabar-ta cunaysay.\" → ?",
        "options": [
          "Technique: ____ Focus",
          "Topicalization"
        ],
        "correctAnswer": "Technique: ____ Focus",
        "explanation": "Each technique SHIFTS MEANING subtly!"
      }
    ]
  },
  {
    "id": 21,
    "title": "Derivational Morphology",
    "subtitle": "Phase: Sentence Structure & Grammar",
    "color": "#06b6d4",
    "rule": {
      "title": "Derivational Morphology",
      "content": "Notice how RELATED WORDS come from same ROOTS: Notice: ONE ROOT creates MANY RELATED WORDS!",
      "examples": [
        {
          "somali": "qor",
          "breakdown": "",
          "english": "write"
        },
        {
          "somali": "Qor = write",
          "breakdown": "",
          "english": "verb"
        },
        {
          "somali": "Qore = writer",
          "breakdown": "",
          "english": "agent noun"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m21-d1",
        "type": "fill-blank",
        "prompt": "Form agent nouns (one who does X) from these verbs:  arki (see) → ?",
        "options": [
          "macquul-ka",
          "arki-ye",
          "socod-ka",
          "bar-e"
        ],
        "correctAnswer": "arki-ye",
        "explanation": "Agent nouns add -E, -OOL, or -KA to the verb!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m21-d2",
        "type": "fill-blank",
        "prompt": "Form patient nouns (thing that is X-ed) from these verbs:  qor (write) → ?",
        "options": [
          "qoraal",
          "carood",
          "dhaqin",
          "magaalo"
        ],
        "correctAnswer": "qoraal",
        "explanation": "Patient nouns add -AAL, -OD, or -ID to the verb!"
      }
    ],
    "gateDrills": [
      {
        "id": "m21-d3",
        "type": "fill-blank",
        "prompt": "Form abstract nouns from these verbs:  socod (walk) → ?",
        "options": [
          "arkiga-mo",
          "jooga-sho",
          "saal",
          "socdaa-sho"
        ],
        "correctAnswer": "socdaa-sho",
        "explanation": "Abstract nouns add -ASHO, -AMO, or -NAG to verbs!"
      }
    ]
  },
  {
    "id": 22,
    "title": "Lexicon & Semantic Fields",
    "subtitle": "Phase: Application & Integration",
    "color": "#22c55e",
    "rule": {
      "title": "Lexicon & Semantic Fields",
      "content": "ESSENTIAL vocabulary organized by TOPIC: Semantic fields help you LEARN CLUSTERS of related words!",
      "examples": [
        {
          "somali": "Lexicon & Semantic Fields",
          "breakdown": "",
          "english": "Application & Integration"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m22-d1",
        "type": "fill-blank",
        "prompt": "For each situation, choose the most appropriate word:",
        "options": [
          "\"He TAG to school.\"",
          "\"I HAYAA my family.\"",
          "nin weyn",
          "\"She CUNSO food.\""
        ],
        "correctAnswer": "\"He TAG to school.\"",
        "explanation": "Choose word based on CONTEXT and NUANCE!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m22-d1",
        "type": "fill-blank",
        "prompt": "For each situation, choose the most appropriate word:",
        "options": [
          "\"He TAG to school.\"",
          "\"I HAYAA my family.\"",
          "nin weyn",
          "\"She CUNSO food.\""
        ],
        "correctAnswer": "\"He TAG to school.\"",
        "explanation": "Choose word based on CONTEXT and NUANCE!"
      }
    ],
    "gateDrills": [
      {
        "id": "m22-d1",
        "type": "fill-blank",
        "prompt": "For each situation, choose the most appropriate word:",
        "options": [
          "\"He TAG to school.\"",
          "\"I HAYAA my family.\"",
          "nin weyn",
          "\"She CUNSO food.\""
        ],
        "correctAnswer": "\"He TAG to school.\"",
        "explanation": "Choose word based on CONTEXT and NUANCE!"
      }
    ]
  },
  {
    "id": 23,
    "title": "Practical Communication",
    "subtitle": "Phase: Application & Integration",
    "color": "#22c55e",
    "rule": {
      "title": "Practical Communication",
      "content": "GREETINGS are the FOUNDATION of social interaction: Greetings are RESPECTFUL and IMPORTANT!",
      "examples": [
        {
          "somali": "Salaam alaikum = Hi",
          "breakdown": "",
          "english": "shortened"
        },
        {
          "somali": "Iska warran? = How are you?",
          "breakdown": "",
          "english": "singular"
        },
        {
          "somali": "Iskaa warran? = How are you?",
          "breakdown": "",
          "english": "formal"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m23-d1",
        "type": "fill-blank",
        "prompt": "Complete these greeting dialogues:",
        "options": [
          "Waan fiicanyahay.",
          "Wuu WAA ardii.",
          "Mahadsanid.",
          "Wa alaikum assalam."
        ],
        "correctAnswer": "Wa alaikum assalam.",
        "explanation": "Greetings are FORMULAIC and RESPECTFUL!"
      }
    ],
    "unguidedDrills": [
      {
        "id": "m23-d2",
        "type": "fill-blank",
        "prompt": "Create introduction dialogues:",
        "options": [
          "marno",
          "wiil",
          "Magacaygu waa [your name].",
          "Taas waa [friend's name]. Waxaa ahaa..."
        ],
        "correctAnswer": "Magacaygu waa [your name].",
        "explanation": "Introductions are DIRECT and SIMPLE!"
      }
    ],
    "gateDrills": [
      {
        "id": "m23-d3",
        "type": "fill-blank",
        "prompt": "Ask these questions in Somali:  \"Where is the school?\" → ?",
        "options": [
          "Hadda saacad maxay tahay?",
          "magaalo wanaagsan",
          "Iskuulka halkee baa jira?",
          "Yay tahay?"
        ],
        "correctAnswer": "Iskuulka halkee baa jira?",
        "explanation": "Questions use correct interrogatives!"
      }
    ]
  },
  {
    "id": 24,
    "title": "Texts & Discourse (Overview)",
    "subtitle": "Phase: Application & Integration",
    "color": "#22c55e",
    "rule": {
      "title": "Texts & Discourse (Overview)",
      "content": "NARRATIVES follow a predictable STRUCTURE: Narratives move through TIME and CAUSE-EFFECT!",
      "examples": [
        {
          "somali": "Waxaa jiri gabar-gaaban oo magaceedu ay ahaa Fatima.",
          "breakdown": "",
          "english": "There was a young girl named Fatima."
        },
        {
          "somali": "Markaasay dhowr-jeer door-dor-jay iskuulka.",
          "breakdown": "",
          "english": "Then she struggled to go to school."
        },
        {
          "somali": "Waxay curin muuqaal ay raadinaysay.",
          "breakdown": "",
          "english": "She was pursuing something she wanted."
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m24-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Texts & Discourse (Overview)?",
        "options": [
          "Texts & Discourse (Overview)",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Texts & Discourse (Overview)",
        "explanation": "This lesson covers Texts & Discourse (Overview)."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m24-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Texts & Discourse (Overview)?",
        "options": [
          "Texts & Discourse (Overview)",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Texts & Discourse (Overview)",
        "explanation": "This lesson covers Texts & Discourse (Overview)."
      }
    ],
    "gateDrills": [
      {
        "id": "m24-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Texts & Discourse (Overview)?",
        "options": [
          "Texts & Discourse (Overview)",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Texts & Discourse (Overview)",
        "explanation": "This lesson covers Texts & Discourse (Overview)."
      }
    ]
  },
  {
    "id": 25,
    "title": "Stylistic & Register",
    "subtitle": "Phase: Application & Integration",
    "color": "#22c55e",
    "rule": {
      "title": "Stylistic & Register",
      "content": "SOMALI has distinct FORMAL and INFORMAL STYLES: Register is chosen based on CONTEXT!",
      "examples": [
        {
          "somali": "Waxaan doon inaan ogaado su'asha.",
          "breakdown": "",
          "english": "I desire to understand the question. — formal, literary"
        },
        {
          "somali": "Waxaan raba inaan garto su'aasha.",
          "breakdown": "",
          "english": "I want to get the question. — conversational"
        },
        {
          "somali": "Mahadsanid aad u mahadsanid.",
          "breakdown": "",
          "english": "I thank you very much. — formal, elaborate"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m25-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Stylistic & Register?",
        "options": [
          "Stylistic & Register",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Stylistic & Register",
        "explanation": "This lesson covers Stylistic & Register."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m25-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Stylistic & Register?",
        "options": [
          "Stylistic & Register",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Stylistic & Register",
        "explanation": "This lesson covers Stylistic & Register."
      }
    ],
    "gateDrills": [
      {
        "id": "m25-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Stylistic & Register?",
        "options": [
          "Stylistic & Register",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Stylistic & Register",
        "explanation": "This lesson covers Stylistic & Register."
      }
    ]
  },
  {
    "id": 26,
    "title": "Comprehensive Review & Mastery",
    "subtitle": "Phase: Application & Integration",
    "color": "#22c55e",
    "rule": {
      "title": "Comprehensive Review & Mastery",
      "content": "26 MODULES across 4 PHASES: 500+ slides, 100+ exercises, complete coverage!",
      "examples": [
        {
          "somali": "PHASE 1: FOUNDATIONS",
          "breakdown": "",
          "english": "Modules 1-7"
        },
        {
          "somali": "Modules 2-7: Parts of Speech",
          "breakdown": "",
          "english": "nouns, articles, pronouns, adjectives, numerals, prepositions"
        },
        {
          "somali": "PHASE 2: VERB SYSTEM",
          "breakdown": "",
          "english": "Modules 8-12"
        }
      ]
    },
    "guidedDrills": [
      {
        "id": "m26-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Comprehensive Review & Mastery?",
        "options": [
          "Comprehensive Review & Mastery",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Comprehensive Review & Mastery",
        "explanation": "This lesson covers Comprehensive Review & Mastery."
      }
    ],
    "unguidedDrills": [
      {
        "id": "m26-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Comprehensive Review & Mastery?",
        "options": [
          "Comprehensive Review & Mastery",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Comprehensive Review & Mastery",
        "explanation": "This lesson covers Comprehensive Review & Mastery."
      }
    ],
    "gateDrills": [
      {
        "id": "m26-d0",
        "type": "fill-blank",
        "prompt": "Review: which relates to Comprehensive Review & Mastery?",
        "options": [
          "Comprehensive Review & Mastery",
          "Application & Integration",
          "None",
          "All"
        ],
        "correctAnswer": "Comprehensive Review & Mastery",
        "explanation": "This lesson covers Comprehensive Review & Mastery."
      }
    ]
  },
];

// Silence "unused import" if Exercise type is only referenced structurally.
export type _DrillExercise = Exercise;
