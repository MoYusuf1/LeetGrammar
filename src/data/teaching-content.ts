/**
 * Teaching Content — Card-based lesson material for all 26 lessons.
 *
 * AUTO-GENERATED from ../somali-grammar-course/COURSE.md by scripts/course-to-app.cjs.
 * Do not edit by hand — re-run the converter instead.
 *
 * Each lesson: intro -> teach cards -> practice cards -> summary.
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
  title?: string;
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

const lessons: Record<number, LessonContent> = {
  1: {
    "lessonId": 1,
    "title": "Foundations & Phonetics",
    "cards": [
      {
        "type": "intro",
        "title": "Foundations & Phonetics",
        "bullets": [
          "Recognize how Somali sounds (consonants, vowels, stress)",
          "Understand that vowel LENGTH changes word meaning",
          "Identify Somali's unique deep-throat sounds (Q, X, DH, KH)",
          "Read and segment Somali words into syllables",
          "Write Somali using the Latin alphabet correctly"
        ],
        "culturalNote": "You'll learn by listening to real Somali dialogue, then extracting the rules from what you hear."
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Listen First",
        "explanation": "No explanation yet. Just notice the sounds.",
        "examples": [
          {
            "somali": "Mahadsanid! Magacaagu waa maxay?",
            "english": "Thank you! What is your name?"
          },
          {
            "somali": "Walaalkaa xaal iska kuule?",
            "english": "My name is Amina. How is your brother?"
          },
          {
            "somali": "Hadii xaali! Iskuulka wuu socdaa.",
            "english": "He is fine. He goes to school."
          },
          {
            "somali": "Waxa aad shaqaysaa?",
            "english": "What do you do?"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Do You Hear?",
        "explanation": "Quick listen: Find two words that have the SAME vowel sound but different meanings because of LENGTH. Hint: Listen to \"xaal\" and similar words."
      },
      {
        "type": "teach",
        "conceptBadge": "Somali Vowels — The 5 Basic Sounds",
        "explanation": "Somali has 5 vowels: THE CRITICAL DIFFERENCE: Same vowel. Different length. Different word.",
        "examples": [
          {
            "somali": "Vowel",
            "english": "English Sound"
          },
          {
            "somali": "A",
            "english": "as in \"FATHER\""
          },
          {
            "somali": "E",
            "english": "as in \"BED\""
          },
          {
            "somali": "I",
            "english": "as in \"KEEP\""
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Which word has the LONG vowel?",
          "options": [
            "cat",
            "caat"
          ],
          "correctAnswer": "caat",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "In Somali, vowel length creates different words with different meanings. When you write aa, ee, ii, oo, uu → hold that vowel longer."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Somali Consonants — The Regular On",
        "explanation": "From our dialogue, we heard many consonants. Let's identify them: Consonants are sounds WITH obstacles to airflow: Some consonants are familiar. Some are unique to Somali. Next slides: we focus on those.",
        "examples": [
          {
            "somali": "Stops (air blocked)",
            "english": "B, D, G, K, P, T"
          },
          {
            "somali": "Fricatives (air hisses)",
            "english": "F, H, S, Z, J, SH"
          },
          {
            "somali": "Nasals (air through nose)",
            "english": "M, N"
          },
          {
            "somali": "Approximants (smooth)",
            "english": "L, R, W, Y"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Find these words in the dialogue. What's the FIRST consonant sound?  Magacaagu → ?",
          "options": [
            "Shaqaysaa",
            "Magaalada",
            "Magacaagu",
            "Joogaa"
          ],
          "correctAnswer": "Magacaagu",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: Magacaagu (magaca = name)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Deep Throat Sounds — Somali Origin",
        "explanation": "Somali has sounds that don't exist in English. They come from deep in the throat: Q — Deep K (very back of throat) X — Harsh H (deep and forceful) DH — Soft D + H blend (single sound) KH — Guttural (like German \"Bach\") These sounds DEFINE Somali's character."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Deep Sounds Discrimination  kan (this) vs. qan → ?",
          "options": [
            "dar",
            "Time clause:",
            "hal",
            "kan"
          ],
          "correctAnswer": "kan",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: kan."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Stress & Rhythm — Where's the Emph",
        "explanation": "In English, stress is unpredictable: In Somali, stress is more regular: From our dialogue:"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identifying Stress  SANnad (year) → ?",
          "options": [
            "SANnad",
            "UBAX",
            "HAween",
            "maGAAla"
          ],
          "correctAnswer": "SANnad",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "When you hear a Somali word, expect the FIRST SYLLABLE to be emphasized. This helps you recognize word boundaries in speech."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Syllable Structure — How Words Are",
        "explanation": "Words are built from syllables. Somali follows predictable patterns: Pattern NOT allowed: CC alone — Somali doesn't start words with two consonants without a vowel between.",
        "examples": [
          {
            "somali": "V",
            "english": "Vowel alone"
          },
          {
            "somali": "CV",
            "english": "Consonant + Vowel"
          },
          {
            "somali": "CVC",
            "english": "C + V + C"
          },
          {
            "somali": "CVVC",
            "english": "C + V + V + C"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Segment these words using hyphens:  saakin (quiet) → ?",
          "options": [
            "IS-kuul",
            "SAN-nad",
            "SAA-kin",
            "CAA-no"
          ],
          "correctAnswer": "SAA-kin",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: SAA-kin (long vowel stays together as one unit)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Dialogue Revisited — With Anal",
        "explanation": "Now that you know the sounds, here's the dialogue with annotations: Observation: The dialogue uses ALL the sounds we learned. Short vowels, long vowels, regular consonants, deep sounds."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "For each phrase from the dialogue, identify:  Magacaagu → ?",
          "options": [
            "Magacaagu",
            "Iskuulka",
            "Xaal iska kuule",
            "Hadii xaali"
          ],
          "correctAnswer": "Magacaagu",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: Magacaagu."
        }
      },
      {
        "type": "summary",
        "title": "You learned Foundations & Phonetics!",
        "takeaways": [
          "VOWELS: 5 sounds (a, e, i, o, u) | Each SHORT or LONG | Length changes word meaning",
          "CONSONANTS: ~22-25 sounds | Regular: B, D, G, K, M, N, L, R, S, T, etc. | Special: Q, X, DH, KH, SH",
          "STRESS: Usually on FIRST syllable | Regular and predictable",
          "SYLLABLES: Predictable patterns | CV, CVC, CVVC, CVCC, etc. | Long vowels group together",
          "WRITING: Latin alphabet (26 letters) | Phonetic | Vowel length essential"
        ]
      }
    ]
  },
  2: {
    "lessonId": 2,
    "title": "Nouns — Gender, Number & Agreement",
    "cards": [
      {
        "type": "intro",
        "title": "Nouns — Gender, Number & Agreement",
        "bullets": [
          "Recognize the two noun genders in Somali (masculine and feminine)",
          "Identify gender markers (suffixes and patterns)",
          "Form plurals from singular nouns",
          "Apply gender-number agreement with modifiers",
          "Understand noun classes and morphological patterns"
        ],
        "culturalNote": "We'll extract gender and number patterns from real dialogue, then practice applying them."
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Introducing Nou",
        "explanation": "Notice: Some words describe people (naag, wiil, gabar, nin). Others describe places (magaalada). Some describe qualities (weyn = big, yar = small).",
        "examples": [
          {
            "somali": "Salaam, walaalkay! Sidee tahay?",
            "english": "Hello, my brother! How are you?"
          },
          {
            "somali": "Waa iska warran. Naag iyo wiil baa jira.",
            "english": "I'm fine. There's a woman and a boy."
          },
          {
            "somali": "Magaalo baa jirtaa?",
            "english": "Is there a city?"
          },
          {
            "somali": "Hah, magaalada Mogadishu waa weyn.",
            "english": "Yes, the city of Mogadishu is big."
          }
        ],
        "tip": "Some words describe people (naag, wiil, gabar, nin). Others describe places (magaalada). Some describe qualities (weyn = big, yar = small)."
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Nouns?",
        "explanation": "Nouns are words that name: In Somali, EVERY noun has a GENDER. Either masculine or feminine. This is FUNDAMENTAL to how Somali works."
      },
      {
        "type": "teach",
        "conceptBadge": "The Gender System — Introduction",
        "explanation": "Somali nouns are either MASCULINE or FEMININE. This is not random — there are patterns and rules. Gender affects: Gender is PERMANENT for each noun."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "From the dialogue, identify which words are NOUNS:  \"salaam\" (greeting) → ?",
          "options": [
            "gabar",
            "yar",
            "salaam",
            "wadaali"
          ],
          "correctAnswer": "salaam",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Nouns NAME things. Adjectives DESCRIBE things."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Masculine Nouns — Recognition & Ma",
        "explanation": "Masculine nouns often have these patterns: Examples from dialogue: How to recognize: No special feminine marker (like -a or -ta at the end)"
      },
      {
        "type": "teach",
        "conceptBadge": "Feminine Nouns — Recognition & Mar",
        "explanation": "Feminine nouns often end in these patterns: Examples from dialogue: Pattern: Many feminine nouns end in -a or -o."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Classify these nouns as MASCULINE or FEMININE based on their form:  nin (man) → ?",
          "options": [
            "MASCULINE",
            "FEMININE"
          ],
          "correctAnswer": "FEMININE",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "The ENDING of a noun usually tells you its gender. Learn to recognize the patterns!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Gender Markers in Context",
        "explanation": "When a noun is DEFINITE (the + noun), gender shows in the marker: Important: The -ka and -ta are not part of the noun itself. They're ARTICLE markers.",
        "examples": [
          {
            "somali": "Gender",
            "english": "Marker"
          },
          {
            "somali": "MASCULINE",
            "english": "-ka"
          },
          {
            "somali": "MASCULINE",
            "english": "-ka"
          },
          {
            "somali": "FEMININE",
            "english": "-ta"
          }
        ],
        "tip": "The -ka and -ta are not part of the noun itself. They're ARTICLE markers."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Add the correct definite marker (-ka for masculine, -ta for feminine):  naag (woman) → ?",
          "options": [
            "naag",
            "wiil",
            "magaalo",
            "nin"
          ],
          "correctAnswer": "naag",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: naag (the woman)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Pluralization — From Singular to P",
        "explanation": "In Somali, plurals are formed by CHANGING the noun's ending. Most common pluralization patterns: Key: Plurals are NOT just adding 's'. The ENTIRE ending changes.",
        "examples": [
          {
            "somali": "Singular",
            "english": "Plural"
          },
          {
            "somali": "nin",
            "english": "niman"
          },
          {
            "somali": "wiil",
            "english": "wiilal"
          },
          {
            "somali": "gabar",
            "english": "gabar-yaal"
          }
        ],
        "tip": "Plurals are NOT just adding 's'. The ENTIRE ending changes."
      },
      {
        "type": "teach",
        "conceptBadge": "Masculine Plurals",
        "explanation": "Masculine nouns commonly pluralize with:"
      },
      {
        "type": "teach",
        "conceptBadge": "Feminine Plurals",
        "explanation": "Feminine nouns commonly pluralize with:"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form the plural of these nouns:  nin (man) → ?",
          "options": [
            "gabar",
            "wiil",
            "magaalo",
            "nin"
          ],
          "correctAnswer": "nin",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Masculine nouns often pluralize with -an or -aal. Feminine nouns often pluralize with -yaal or -o."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Gender & Number in Action",
        "explanation": "When a noun is both GENDERED and NUMBERED (plural), the markers combine: Notice: Even plural nouns get the definite marker (-ka or -ta).",
        "examples": [
          {
            "somali": "Singular",
            "english": "Plural (Indefinite)"
          },
          {
            "somali": "nin-ka (the man)",
            "english": "niman (men)"
          },
          {
            "somali": "gabar-ta (the girl)",
            "english": "gabar-yaal (girls)"
          },
          {
            "somali": "wiil-ka (the boy)",
            "english": "wilal (boys)"
          }
        ],
        "tip": "Even plural nouns get the definite marker (-ka or -ta)."
      },
      {
        "type": "teach",
        "conceptBadge": "Adjective Agreement — Nouns & Adje",
        "explanation": "Adjectives MUST AGREE with nouns in GENDER and NUMBER. When you add an adjective, BOTH the noun and adjective must show the same gender.",
        "examples": [
          {
            "somali": "Noun",
            "english": "Adjective"
          },
          {
            "somali": "nin weyn",
            "english": "—"
          },
          {
            "somali": "gabar yar",
            "english": "—"
          },
          {
            "somali": "niman waaweyn",
            "english": "—"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose the correct adjective form to match each noun:  gabar (girl) → ?",
          "options": [
            "gabar cusub",
            "gabar-yaal yar",
            "niman waaweyn",
            "nin madow"
          ],
          "correctAnswer": "gabar cusub",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Adjectives change to match the noun's gender AND number."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Dialogue Revisited — Seeing Ge",
        "explanation": "Now let's see how gender and number work in real sentences: Notice: Everything agrees — noun, adjective, verb form, pronoun.",
        "examples": [
          {
            "somali": "Nin weyn baa jira.",
            "english": "A big man exists/is there."
          },
          {
            "somali": "Gabar yar baa jirtaa.",
            "english": "A small girl exists/is there."
          },
          {
            "somali": "Niman baa socdaan?",
            "english": "Do men go?"
          },
          {
            "somali": "Gabar-yaal ayaa socdaan.",
            "english": "The girls go."
          }
        ],
        "tip": "Everything agrees — noun, adjective, verb form, pronoun."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create phrases using noun + adjective (consider gender and number):",
          "options": [
            "Joogaa",
            "magaalo weyn",
            "wiil yar",
            "naag-yaal cusub"
          ],
          "correctAnswer": "magaalo weyn",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Agreement happens automatically once you know the noun's gender and number."
        }
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form complete noun phrases (noun + adjective) using:",
          "options": [
            "nin gaduud",
            "gabar qurux badan",
            "niman badan",
            "Way socdatay si deg-deg."
          ],
          "correctAnswer": "nin gaduud",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Once you choose a noun, the adjective must match its gender."
        }
      },
      {
        "type": "summary",
        "title": "You learned Nouns — Gender, Number & Agreement!",
        "takeaways": [
          "GENDER: Every Somali noun is masculine OR feminine. Recognize by ending patterns.",
          "DEFINITE MARKERS: Masculine gets -ka, feminine gets -ta (the noun)",
          "PLURALIZATION: Change the ending: -an, -aal, -yaal, -o patterns. Even plurals get definite markers.",
          "AGREEMENT: Adjectives, pronouns, and verbs MUST agree with the noun's gender and number.",
          "PATTERNS: The ending of a word tells you its gender and number. Learn to spot them."
        ]
      }
    ]
  },
  3: {
    "lessonId": 3,
    "title": "Articles & Determiners",
    "cards": [
      {
        "type": "intro",
        "title": "Articles & Determiners",
        "bullets": [
          "Recognize the Somali articles and how they connect to gender (from Module 2)",
          "Distinguish between definite and indefinite nouns",
          "Use demonstratives (this, that, these, those) correctly",
          "Apply determiners in real sentences",
          "Understand how articles and gender work together"
        ],
        "culturalNote": "Articles build directly on the gender system you learned in Module 2."
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Articles in Use",
        "explanation": "Question: What's the difference between \"nin\" and \"nin-ka\"?",
        "examples": [
          {
            "somali": "Nin-ka baa yimid.",
            "english": "THE man came."
          },
          {
            "somali": "Notice: nin-ka uses -ka",
            "english": "definite masculine"
          },
          {
            "somali": "Gabar-ta waxay aragtay.",
            "english": "THE girl saw [something]."
          },
          {
            "somali": "Notice: gabar-ta uses -ta",
            "english": "definite feminine"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Definite vs. Indefinite — The Core",
        "explanation": "Every Somali noun is either DEFINITE or INDEFINITE. DEFINITE: The speaker is talking about a SPECIFIC noun (the one both people know about) INDEFINITE: The speaker is talking about ANY noun of that type (not a specific one) How you show it: This is the ARTICLE SYSTEM in Somali."
      },
      {
        "type": "teach",
        "conceptBadge": "The Article System — Gender Determ",
        "explanation": "Remember from Module 2: Gender shows in articles! The article marker tells you both the gender AND whether it's definite.",
        "examples": [
          {
            "somali": "Gender",
            "english": "Definite Singular"
          },
          {
            "somali": "MASCULINE",
            "english": "nin-ka"
          },
          {
            "somali": "FEMININE",
            "english": "gabar-ta"
          }
        ],
        "tip": "Gender shows in articles!"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Is each noun DEFINITE (the) or INDEFINITE (a/any)?  nin → ?",
          "options": [
            "nin-ka",
            "gabar-ta",
            "naag-yaal",
            "nin"
          ],
          "correctAnswer": "nin",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "-ka and -ta make nouns DEFINITE. Without them, the noun is INDEFINITE."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Demonstratives — This, That, These",
        "explanation": "Demonstratives are words that POINT to specific nouns: NEAR (this, these): FAR (that, those): Notice: Demonstratives REPLACE the definite article, not add to it."
      },
      {
        "type": "teach",
        "conceptBadge": "Demonstratives in Dialogue",
        "explanation": "Notice: Demonstratives show DISTANCE (near vs. far) and GENDER.",
        "examples": [
          {
            "somali": "Waa ku jira nin-kan.",
            "english": "This man is here."
          },
          {
            "somali": "nin-kan = this specific man",
            "english": "near"
          },
          {
            "somali": "Nin-kaas baa roon.",
            "english": "That man is nice."
          },
          {
            "somali": "nin-kaas = that man over there",
            "english": "far"
          }
        ],
        "tip": "Demonstratives show DISTANCE (near vs. far) and GENDER."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose the correct demonstrative (near or far) for each context:",
          "options": [
            "Nin-kan",
            "Niman-kuwan",
            "Gabar-yaal-kuwaas",
            "Gabar-taas"
          ],
          "correctAnswer": "Nin-kan",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: Nin-kan (this man — near you)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "How Articles & Demonstratives Conn",
        "explanation": "Three ways to specify a noun: All three are \"ways of showing you know which noun you mean\" — just at different levels.",
        "examples": [
          {
            "somali": "Indefinite",
            "english": "a/any"
          },
          {
            "somali": "Definite article",
            "english": "the"
          },
          {
            "somali": "Demonstrative",
            "english": "this/that"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Articles in C",
        "explanation": "Now let's see articles and demonstratives in full sentences:",
        "examples": [
          {
            "somali": "Ahmed: Nin baa timid!",
            "english": "A man came!"
          },
          {
            "somali": "Indefinite = \"some man\"",
            "english": "not specific"
          },
          {
            "somali": "Ahmed: Nin-ka baa roon.",
            "english": "The man is nice."
          },
          {
            "somali": "Ahmed: Nin-kan baa roon!",
            "english": "This man is nice!"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Complete these sentences with the correct noun form:",
          "options": [
            "Gabar-ta",
            "Gabar",
            "Marno ma tagi karno.",
            "Gabar-tan"
          ],
          "correctAnswer": "Gabar",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "The article form tells the listener whether you're introducing a NEW noun or referring to one already KNOWN."
        }
      },
      {
        "type": "summary",
        "title": "You learned Articles & Determiners!",
        "takeaways": [
          "DEFINITE ARTICLES: -ka (masculine), -ta (feminine)",
          "INDEFINITE: No marker",
          "DEMONSTRATIVES: kan/tan/kuwan (near), kaas/taas/kuwaas (far)",
          "GENDER AGREEMENT: Articles change based on noun gender",
          "FUNCTION: Articles tell listeners whether a noun is NEW information or OLD/KNOWN information"
        ]
      }
    ]
  },
  4: {
    "lessonId": 4,
    "title": "Pronouns — Comprehensive System",
    "cards": [
      {
        "type": "intro",
        "title": "Pronouns — Comprehensive System",
        "bullets": [
          "Recognize all personal pronouns in Somali (I, you, he, she, we, they)",
          "Distinguish between subject and object pronouns",
          "Apply possessive pronouns (my, your, his, her, our, their)",
          "Use pronouns with correct gender agreement",
          "Understand reflexive pronouns (myself, yourself, etc.)"
        ],
        "culturalNote": "Pronouns AGREE with gender, just like articles and adjectives from Modules 2-3."
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Pronouns in Use",
        "explanation": "Question: Do pronouns change based on gender like nouns do?",
        "examples": [
          {
            "somali": "Ani waxaan malaha.",
            "english": "I think..."
          },
          {
            "somali": "ani = I",
            "english": "subject pronoun"
          },
          {
            "somali": "Isaga waa roon.",
            "english": "He is nice."
          },
          {
            "somali": "isaga = he",
            "english": "subject pronoun with emphasis"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Pronouns?",
        "explanation": "Pronouns are words that REPLACE nouns. Instead of saying: Why use pronouns? Types of pronouns in Somali:"
      },
      {
        "type": "teach",
        "conceptBadge": "Personal Pronouns — Subject Forms",
        "explanation": "Subject pronouns are who is DOING the action: Key insight: \"They\" (iyaga) is the SAME for both masculine and feminine plural! In sentences: Notice the verb changes with the pronoun!",
        "examples": [
          {
            "somali": "Person",
            "english": "Singular"
          },
          {
            "somali": "1st",
            "english": "ani (I)"
          },
          {
            "somali": "2nd",
            "english": "adiga (you)"
          },
          {
            "somali": "3rd Masc",
            "english": "isaga (he)"
          }
        ],
        "tip": "\"They\" (iyaga) is the SAME for both masculine and feminine plural!"
      },
      {
        "type": "teach",
        "conceptBadge": "Personal Pronouns — Object Forms",
        "explanation": "Object pronouns are who is RECEIVING the action: In sentences: Notice: Object pronouns are usually placed AFTER the verb in Somali.",
        "examples": [
          {
            "somali": "Person",
            "english": "Singular"
          },
          {
            "somali": "1st",
            "english": "ina (me)"
          },
          {
            "somali": "2nd",
            "english": "kaa (you)"
          },
          {
            "somali": "3rd Masc",
            "english": "isaga (him)"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify whether each pronoun is a SUBJECT or OBJECT pronoun:  Ani waxaan joogaa. (I am here.) → ?",
          "options": [
            "ani = SUBJECT",
            "OBJECT"
          ],
          "correctAnswer": "ani = SUBJECT",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: ani = SUBJECT (I am the one doing the action)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Pronoun Agreement — Gender Matters",
        "explanation": "Remember from Module 2: Some things agree with gender, others don't. Pronouns for HE vs. SHE: When replacing a masculine noun (like nin = man): When replacing a feminine noun (like gabar = girl): BUT: When you don't know the gender or are talking about multiple people, use iyaga (they).",
        "tip": "Some things agree with gender, others don't."
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose the correct pronoun (he or she) to replace each noun:  Nin-ka wuu socdaa. → ?",
          "options": [
            "Isaga",
            "Iyada wuu socdaa."
          ],
          "correctAnswer": "Isaga",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "The pronoun's gender matches the NOUN'S gender, not the person's actual gender."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Possessive Pronouns — My, Your, Hi",
        "explanation": "Possessive pronouns show OWNERSHIP or RELATIONSHIP:",
        "examples": [
          {
            "somali": "Person",
            "english": "Singular"
          },
          {
            "somali": "1st",
            "english": "inaagu (my)"
          },
          {
            "somali": "2nd",
            "english": "iyaagu (your)"
          },
          {
            "somali": "3rd Masc",
            "english": "isaga (his)"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Possessive Pronouns in Sentences",
        "explanation": "Notice how possessive pronouns work with nouns: Pattern: Possessive pronouns come BEFORE the noun they modify.",
        "examples": [
          {
            "somali": "Inaagu magaca waa Ahmed.",
            "english": "My name is Ahmed."
          },
          {
            "somali": "inaagu = my",
            "english": "possessive"
          },
          {
            "somali": "Iyaagu guriga wuu weyn.",
            "english": "Your house is big."
          },
          {
            "somali": "iyaagu = your",
            "english": "possessive"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Fill in the correct possessive pronoun:  ___ kitaab (my book) → ?",
          "options": [
            "inaagu",
            "iyaagu"
          ],
          "correctAnswer": "inaagu",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Possessive pronouns agree with the person (my, your, his, her) not the noun's gender."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Reflexive Pronouns — Myself, Yours",
        "explanation": "Reflexive pronouns show that the subject is ACTING ON THEMSELVES: Key difference from object pronouns: Reflexives emphasize \"DOING IT YOURSELF\" not just \"receiving the action.\"",
        "examples": [
          {
            "somali": "Person",
            "english": "Singular"
          },
          {
            "somali": "1st",
            "english": "inaangoo (myself)"
          },
          {
            "somali": "2nd",
            "english": "adiga (yourself)"
          },
          {
            "somali": "3rd Masc",
            "english": "isaga (himself)"
          }
        ],
        "tip": "Reflexives emphasize \"DOING IT YOURSELF\" not just \"receiving the action.\""
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify the pronoun type:  Ani waxaan shaqeynaa. (I work.) → ?",
          "options": [
            "ani = SUBJECT",
            "OBJECT",
            "POSSESSIVE",
            "REFLEXIVE"
          ],
          "correctAnswer": "ani = SUBJECT",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Same pronouns can have different functions depending on how they're used in the sentence!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — All Pronoun T",
        "explanation": "Now let's see all pronoun types together:",
        "examples": [
          {
            "somali": "Ani waxaan malaha.",
            "english": "I think..."
          },
          {
            "somali": "Inaagu fikir waa roon.",
            "english": "Your thinking is good."
          },
          {
            "somali": "Ina eeg!",
            "english": "Look at me!"
          },
          {
            "somali": "Isaga ayaa noo dhamaystir.",
            "english": "He finished it for us."
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Pronouns — Comprehensive System!",
        "takeaways": [
          "SUBJECT PRONOUNS: Doers of the action (ani, adiga, isaga, iyada, innaga, idinka, iyaga)",
          "OBJECT PRONOUNS: Receivers of the action (ina, kaa, isaga, iyada, iyaga)",
          "POSSESSIVE PRONOUNS: Show ownership (inaagu, iyaagu, isaga, iyada, innaga, idinka, iyaga)",
          "REFLEXIVE PRONOUNS: Emphasize \"doing it yourself\" (inaangoo, adiga, isaga, iyada)",
          "GENDER AGREEMENT: 3rd person (he/she) pronouns change: isaga (he) vs. iyada (she)"
        ]
      }
    ]
  },
  5: {
    "lessonId": 5,
    "title": "Adjectives & Descriptors",
    "cards": [
      {
        "type": "intro",
        "title": "Adjectives & Descriptors",
        "bullets": [
          "Recognize adjectives and different types (descriptive, comparative, superlative)",
          "Apply gender-number agreement with nouns (from Module 2)",
          "Form comparative and superlative expressions",
          "Place adjectives correctly in Somali sentences",
          "Derive adjectives from other words"
        ],
        "culturalNote": "Adjectives MUST AGREE with noun gender and number — same rule as articles and pronouns."
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Adjectives in U",
        "explanation": "Question: Why does \"big\" change from weyn to weyn depending on the noun?",
        "examples": [
          {
            "somali": "Nin weyn baa jira.",
            "english": "A big man exists."
          },
          {
            "somali": "weyn = big",
            "english": "masculine form"
          },
          {
            "somali": "Gabar yar baa jirtaa.",
            "english": "A small girl exists."
          },
          {
            "somali": "yar = small",
            "english": "feminine form"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Adjectives?",
        "explanation": "Adjectives are words that DESCRIBE nouns. They answer questions like: In Somali, adjectives come AFTER the noun they describe (opposite of English):"
      },
      {
        "type": "teach",
        "conceptBadge": "Adjective Agreement — Gender & Num",
        "explanation": "CRITICAL: Adjectives MUST AGREE with the noun's GENDER and NUMBER. This is the same rule as Articles (Module 3) and Pronouns (Module 4)! Example with \"big\" (weyn): Pattern: The SAME adjective can have different forms depending on the noun!",
        "examples": [
          {
            "somali": "Noun",
            "english": "Adjective"
          },
          {
            "somali": "nin (man)",
            "english": "weyn"
          },
          {
            "somali": "gabar (girl)",
            "english": "weyn"
          },
          {
            "somali": "niman (men)",
            "english": "waaweyn"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Adjective Forms by Gender",
        "explanation": "Somali adjectives have different forms for different genders: Notice: Some adjectives change a lot, others barely change. You need to learn each adjective's forms!",
        "examples": [
          {
            "somali": "big",
            "english": "weyn"
          },
          {
            "somali": "small",
            "english": "yar"
          },
          {
            "somali": "good",
            "english": "wanaagsan"
          },
          {
            "somali": "new",
            "english": "cusub"
          }
        ],
        "tip": "Some adjectives change a lot, others barely change. You need to learn each adjective's forms!"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose the correct adjective form for each noun:  nin (man) __ (big) → ?",
          "options": [
            "weyn",
            "waaweyn"
          ],
          "correctAnswer": "weyn",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Always match the adjective form to the noun's gender and number!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Comparative Adjectives — Bigger, S",
        "explanation": "Comparative adjectives compare TWO things: In Somali, comparatives use the pattern: Noun + adjective + \"ka\" + other noun Pattern: Object + ka + Adjective = \"more adjective than\"",
        "examples": [
          {
            "somali": "Nin-ka nin-kaas ka weyn.",
            "english": "The man [is] than that man big."
          },
          {
            "somali": "Gabar-ta gabar-taas ka yar.",
            "english": "The girl [is] than that girl small."
          },
          {
            "somali": "Magaalo-ta magaalo-taas ka weyn.",
            "english": "The city [is] than that city big."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create comparative expressions:",
          "options": [
            "Nin-ka nin-kaas ka weyn",
            "Gabar-ta gabar-taas ka yar",
            "Kitaab-ka kitaab-kaas ka cusub",
            "Canaa-sha waa la cunay."
          ],
          "correctAnswer": "Nin-ka nin-kaas ka weyn",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "The order is: Subject + Comparison Target + \"ka\" + Adjective"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Superlative Adjectives — The Bigge",
        "explanation": "Superlative adjectives express the EXTREME: In Somali, you can say: Pattern: \"ugu\" + adjective = the most/the ___est",
        "examples": [
          {
            "somali": "Nin-ka waa ugu weyn.",
            "english": "The man is the biggest."
          },
          {
            "somali": "Gabar-ta waa ugu yar.",
            "english": "The girl is the smallest."
          },
          {
            "somali": "Kitaab-ka waa ugu cusub.",
            "english": "The book is the newest."
          },
          {
            "somali": "Magaalo-ta waa ugu wanaagsan.",
            "english": "The city is the best."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create superlative expressions:",
          "options": [
            "Gabar-ta waa ugu yar",
            "Kitaab-ka waa ugu cusub",
            "saal",
            "Nin-ka waa ugu weyn"
          ],
          "correctAnswer": "Nin-ka waa ugu weyn",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "\"ugu\" + adjective = superlative (the most, the ___est)"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Adjective Position — After the Nou",
        "explanation": "Remember: In Somali, adjectives come AFTER the noun, not before! This is opposite of English! Many learners make this mistake:",
        "examples": [
          {
            "somali": "English Order",
            "english": "Somali Order"
          },
          {
            "somali": "big man",
            "english": "nin weyn"
          },
          {
            "somali": "small girl",
            "english": "gabar yar"
          },
          {
            "somali": "new book",
            "english": "kitaab cusub"
          }
        ],
        "tip": "In Somali, adjectives come AFTER the noun, not before!"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Fix the word order to put adjectives in the correct position:  ❌ weyn nin → ?",
          "options": [
            "nin weyn",
            "gabar-yaal yar",
            "magaalo wanaagsan",
            "kitaab cusub"
          ],
          "correctAnswer": "nin weyn",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: nin weyn (man big)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Adjectives in",
        "explanation": "See how adjectives work in full sentences: Notice: Every noun has an adjective AFTER it that agrees in gender and number!",
        "examples": [
          {
            "somali": "Nin weyn baa timid.",
            "english": "A big man came."
          },
          {
            "somali": "Gabar yar ayaa arki jiray.",
            "english": "A small girl was seeing [something]."
          },
          {
            "somali": "Niman cusub baa socdaan.",
            "english": "New men are going."
          },
          {
            "somali": "Magaalo waaweyn baa jirtaa.",
            "english": "A very big city exists."
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Adjectives & Descriptors!",
        "takeaways": [
          "POSITION: Adjectives come AFTER the noun (opposite of English)",
          "AGREEMENT: Adjectives must match noun gender and number",
          "TYPES: Descriptive, comparative (ka adjective), superlative (ugu adjective)",
          "FORMS: Same adjective has different forms for masculine, feminine, plural",
          "PATTERNS: Some adjectives change a lot, others barely change — learn each one!"
        ]
      }
    ]
  },
  6: {
    "lessonId": 6,
    "title": "Numerals & Quantifiers",
    "cards": [
      {
        "type": "intro",
        "title": "Numerals & Quantifiers",
        "bullets": [
          "Count from 1-100+ in Somali (cardinal numbers)",
          "Order things (ordinal numbers: 1st, 2nd, 3rd, etc.)",
          "Express quantities (some, many, few, all, none)",
          "Use numbers with nouns correctly",
          "Understand number phrases in context"
        ],
        "culturalNote": "Numbers are one of the few things in Somali that DON'T require gender agreement!"
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Numbers in Use",
        "explanation": "Notice: Numbers don't change based on the noun's gender!",
        "examples": [
          {
            "somali": "Laba wiil baa jira.",
            "english": "There are two boys."
          },
          {
            "somali": "Sadex gabar baa timideen.",
            "english": "Three girls came."
          },
          {
            "somali": "Toban min baa waxaan leeyahay.",
            "english": "I have ten things."
          },
          {
            "somali": "Dhamaantood ayaa aad yihiin.",
            "english": "All of them are many."
          }
        ],
        "tip": "Numbers don't change based on the noun's gender!"
      },
      {
        "type": "teach",
        "conceptBadge": "Cardinal Numbers 1-10",
        "explanation": "The basic numbers you use for counting: Key: Somali counts by adding: 9 = \"eight and one\", 11 = \"ten and one\"",
        "examples": [
          {
            "somali": "Number",
            "english": "Somali"
          },
          {
            "somali": "1",
            "english": "mid"
          },
          {
            "somali": "2",
            "english": "laba"
          },
          {
            "somali": "3",
            "english": "sadex"
          }
        ],
        "tip": "Somali counts by adding: 9 = \"eight and one\", 11 = \"ten and one\""
      },
      {
        "type": "teach",
        "conceptBadge": "Cardinal Numbers 11-20",
        "explanation": "Continuing the count: Pattern: After 10, you say \"10 + [number]\" until you reach 20 (laab).",
        "examples": [
          {
            "somali": "Number",
            "english": "Somali"
          },
          {
            "somali": "11",
            "english": "toban iyo mid (10+1)"
          },
          {
            "somali": "12",
            "english": "toban iyo laba (10+2)"
          },
          {
            "somali": "13",
            "english": "toban iyo sadex (10+3)"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify these numbers in Somali:",
          "options": [
            "laba",
            "toban",
            "shan",
            "sadex"
          ],
          "correctAnswer": "laba",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: laba."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Larger Numbers — Tens, Hundreds, T",
        "explanation": "Building bigger numbers: How to combine:",
        "examples": [
          {
            "somali": "Number",
            "english": "Somali"
          },
          {
            "somali": "20",
            "english": "laab"
          },
          {
            "somali": "30",
            "english": "soddon"
          },
          {
            "somali": "40",
            "english": "afodan"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Write these numbers in Somali:",
          "options": [
            "konton",
            "laab iyo shan",
            "kun",
            "boqol"
          ],
          "correctAnswer": "laab iyo shan",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: laab iyo shan (20 + 5)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Numbers with Nouns",
        "explanation": "When using numbers with nouns, the number comes BEFORE the noun: Important: The noun stays SINGULAR after the number, even though it means plural!",
        "examples": [
          {
            "somali": "Laba wiil",
            "english": "two boys"
          },
          {
            "somali": "Sadex gabar-yaal",
            "english": "three girls"
          },
          {
            "somali": "Toban nin",
            "english": "ten men"
          },
          {
            "somali": "Boqol guri",
            "english": "one hundred houses"
          }
        ],
        "tip": "The noun stays SINGULAR after the number, even though it means plural!"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create phrases with numbers and nouns:",
          "options": [
            "Shan kitaab",
            "Toban nin",
            "Sadex gabar",
            "way"
          ],
          "correctAnswer": "Sadex gabar",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Number + SINGULAR noun form, even though it describes multiple items."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Ordinal Numbers — First, Second, T",
        "explanation": "Ordinal numbers express position or order: Pattern: Add -aad to the cardinal number to make it ordinal.",
        "examples": [
          {
            "somali": "Ordinal",
            "english": "Somali"
          },
          {
            "somali": "1st",
            "english": "1-aad"
          },
          {
            "somali": "2nd",
            "english": "2-aad"
          },
          {
            "somali": "3rd",
            "english": "3-aad"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create ordinal numbers:",
          "options": [
            "shan-aad",
            "toban-aad",
            "laba-aad",
            "mid-aad"
          ],
          "correctAnswer": "mid-aad",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: mid-aad (1st)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Quantifiers — Some, Many, Few, All",
        "explanation": "Quantifiers express amounts (not exact numbers):",
        "examples": [
          {
            "somali": "Quantifier",
            "english": "Somali"
          },
          {
            "somali": "some",
            "english": "qaar"
          },
          {
            "somali": "many",
            "english": "badan"
          },
          {
            "somali": "few",
            "english": "yar"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Fill in the correct quantifier:",
          "options": [
            "Badan wiil",
            "Yar mid",
            "Dhamaantood niman",
            "Qaar gabar"
          ],
          "correctAnswer": "Badan wiil",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: Badan wiil (many boys)."
        }
      },
      {
        "type": "summary",
        "title": "You learned Numerals & Quantifiers!",
        "takeaways": [
          "CARDINAL NUMBERS: 1-10, tens, hundreds, thousands",
          "WITH NOUNS: Number comes BEFORE noun; noun stays SINGULAR",
          "ORDINAL NUMBERS: Add -aad to cardinal (mid-aad = 1st, laba-aad = 2nd)",
          "QUANTIFIERS: Some, many, few, all, none",
          "NO GENDER AGREEMENT: Unlike nouns and adjectives, numbers DON'T change based on gender!"
        ]
      }
    ]
  },
  7: {
    "lessonId": 7,
    "title": "Prepositions & Spatial Relations",
    "cards": [
      {
        "type": "intro",
        "title": "Prepositions & Spatial Relations",
        "bullets": [
          "Recognize common Somali prepositions (in, on, at, to, from, etc.)",
          "Use locative prepositions to describe location",
          "Apply temporal prepositions for time expressions",
          "Understand prepositional phrases",
          "Build sentences with prepositions"
        ],
        "culturalNote": "Prepositions complete Phase 1 — the foundational word classes!"
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Prepositions in",
        "explanation": "Notice: Prepositions show WHERE and WHEN!",
        "examples": [
          {
            "somali": "Waxaan ku jira guriga.",
            "english": "I am in the house."
          },
          {
            "somali": "Isagu waa magaaladii.",
            "english": "He is in the city."
          },
          {
            "somali": "magaaladii = the city",
            "english": "with -ii = locative"
          },
          {
            "somali": "Waxaa dhex jira miiska.",
            "english": "It is on the table."
          }
        ],
        "tip": "Prepositions show WHERE and WHEN!"
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Prepositions?",
        "explanation": "Prepositions are words that show RELATIONSHIPS between nouns: They answer questions like:"
      },
      {
        "type": "teach",
        "conceptBadge": "Locative Prepositions — WHERE Thin",
        "explanation": "Prepositions that describe LOCATION: Note: Some prepositions change based on what follows (similar to articles)!",
        "examples": [
          {
            "somali": "Preposition",
            "english": "Meaning"
          },
          {
            "somali": "ku",
            "english": "in, at, on"
          },
          {
            "somali": "ka",
            "english": "from, at"
          },
          {
            "somali": "u",
            "english": "to, toward"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Prepositions + Definite Nouns",
        "somaliText": "ku guriga = in THE house",
        "englishText": "not \"a house\"",
        "explanation": "Important: When a preposition comes before a noun, the noun is usually DEFINITE:",
        "examples": [
          {
            "somali": "ku guriga = in THE house",
            "english": "not \"a house\""
          },
          {
            "somali": "u nin-ka = to THE man",
            "english": "with -ka article"
          }
        ],
        "tip": "When a preposition comes before a noun, the noun is usually DEFINITE:"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify the preposition in each phrase:  ku guriga → ?",
          "options": [
            "ku",
            "ka",
            "u"
          ],
          "correctAnswer": "ku",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: ku (in)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Temporal Prepositions — WHEN Thing",
        "explanation": "Prepositions that describe TIME:",
        "examples": [
          {
            "somali": "Preposition",
            "english": "Meaning"
          },
          {
            "somali": "intii",
            "english": "while, when"
          },
          {
            "somali": "markaa",
            "english": "when, then"
          },
          {
            "somali": "ka hor",
            "english": "before"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Match the preposition to its meaning:  intii → ?",
          "options": [
            "ka dib",
            "ka hor",
            "intii",
            "markaa"
          ],
          "correctAnswer": "intii",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: intii."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Other Common Prepositions",
        "explanation": "Prepositions showing different relationships: These prepositions are often more about GRAMMAR than pure location/time.",
        "examples": [
          {
            "somali": "Preposition",
            "english": "Meaning"
          },
          {
            "somali": "la",
            "english": "with, together"
          },
          {
            "somali": "oo",
            "english": "and/with"
          },
          {
            "somali": "isaga",
            "english": "from him/her"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Prepositional Phrases",
        "explanation": "A preposition + noun creates a PREPOSITIONAL PHRASE: These phrases act as MODIFIERS or add INFORMATION to sentences:",
        "examples": [
          {
            "somali": "ku guriga",
            "english": "in + the house"
          },
          {
            "somali": "ka magaalada",
            "english": "from + the city"
          },
          {
            "somali": "u nin-ka",
            "english": "to + the man"
          },
          {
            "somali": "intii socdaa",
            "english": "while + [he] walks"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify the preposition in each sentence:  Waxaan ku jira magaalada. (I am in the city.) → ?",
          "options": [
            "u",
            "ku",
            "intii",
            "ka dib"
          ],
          "correctAnswer": "ku",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: ku (in/at)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Prepositions ",
        "explanation": "See prepositions in full sentences:",
        "examples": [
          {
            "somali": "Ku jira guriga baa waan arkaa.",
            "english": "In the house is where I see it."
          },
          {
            "somali": "Intii uu socdaa, waxuu arkaa magaalada.",
            "english": "While he walks, he sees the city."
          },
          {
            "somali": "Ka dib timida, buu ku jira suuqa.",
            "english": "After coming, he is at the market."
          },
          {
            "somali": "Magaalada u socod!",
            "english": "Go to the city!"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create prepositional phrases with these prepositions:",
          "options": [
            "ku guriga",
            "ka magaalada",
            "u suuqa",
            "intii uu socdaa"
          ],
          "correctAnswer": "ku guriga",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: ku guriga (in the house)."
        }
      },
      {
        "type": "summary",
        "title": "You learned Prepositions & Spatial Relations!",
        "takeaways": [
          "LOCATIVE PREPOSITIONS: Show WHERE — in (ku), from (ka), to (u), on (dhex)",
          "TEMPORAL PREPOSITIONS: Show WHEN — while (intii), after (ka dib), before (ka hor)",
          "OTHER PREPOSITIONS: Show RELATIONSHIPS — with (la), about (iyada), that (inaan)",
          "STRUCTURE: Preposition + definite noun = prepositional phrase",
          "FUNCTION: Modify verbs and add information about location, time, or relationships"
        ]
      }
    ]
  },
  8: {
    "lessonId": 8,
    "title": "Verbs — Introduction & Foundation",
    "cards": [
      {
        "type": "intro",
        "title": "Verbs — Introduction & Foundation",
        "bullets": [
          "Understand Somali's triliteral verb root system",
          "Classify verbs as transitive, intransitive, or stative",
          "Recognize verb stems and their forms",
          "Apply subject agreement (person & number)",
          "Build basic verb conjugations"
        ],
        "culturalNote": "Verbs are the HEART of Somali grammar. Everything you learned in Phase 1 now serves the verb!"
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Verbs in Action",
        "explanation": "Notice: Verbs CHANGE based on WHO is doing the action and WHEN!",
        "examples": [
          {
            "somali": "Ani waxaan tag.",
            "english": "I go."
          },
          {
            "somali": "tag = to go",
            "english": "verb"
          },
          {
            "somali": "Isagu wuu socdaa.",
            "english": "He walks."
          },
          {
            "somali": "socdaa = walks",
            "english": "verb with agreement marker"
          }
        ],
        "tip": "Verbs CHANGE based on WHO is doing the action and WHEN!"
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Verbs?",
        "explanation": "Verbs are words that EXPRESS ACTIONS or STATES: In Somali, verbs are incredibly IMPORTANT because: Without understanding verbs, you cannot build sentences!"
      },
      {
        "type": "teach",
        "conceptBadge": "The Triliteral Root System",
        "explanation": "Somali verbs are built on THREE-CONSONANT ROOTS: From ONE root, you create many FORMS: Example with ROOT t-g (TAG = go): One root, MANY possibilities!",
        "examples": [
          {
            "somali": "Root: C-C-C",
            "english": "three consonants"
          },
          {
            "somali": "Example: t-g",
            "english": "TAG = to go"
          },
          {
            "somali": "Example: s-c-d",
            "english": "SOCOD = to walk"
          },
          {
            "somali": "Example: c-n",
            "english": "CUN = to eat"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Verb Stems",
        "explanation": "A VERB STEM is the basic form of a verb you build from the root: Common stem patterns: Each stem has its own: You must LEARN individual verb stems — there's no universal formula!",
        "examples": [
          {
            "somali": "Simple (CVC-V)",
            "english": "tag"
          },
          {
            "somali": "Double (CVCC-V)",
            "english": "socod"
          },
          {
            "somali": "Long (CVVC-V)",
            "english": "caaf"
          },
          {
            "somali": "Extended (CVC-VCC-V)",
            "english": "ciyaar"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Extract the THREE-CONSONANT ROOT from these verbs:  tag (go) → ?",
          "options": [
            "tag",
            "socod",
            "cun",
            "joog"
          ],
          "correctAnswer": "tag",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "The ROOT contains the CONSONANTS; the VOWELS are added to create different forms."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Verb Classification — What Kind of",
        "explanation": "Verbs are classified by what KIND of action they express: TRANSITIVE VERBS: Action directed AT SOMEONE/SOMETHING INTRANSITIVE VERBS: Action does NOT require an object STATIVE VERBS: Express a STATE or CONDITION"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Classify each verb as TRANSITIVE (T), INTRANSITIVE (I), or STATIVE (S):  tag (go) → ?",
          "options": [
            "T",
            "I",
            "S"
          ],
          "correctAnswer": "T",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Transitive verbs REQUIRE an object. Intransitive verbs DON'T. Stative verbs express STATES."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Subject Agreement — Person & Numbe",
        "explanation": "Verbs AGREE with their subjects in PERSON and NUMBER: The SUBJECT can be: Verbs CHANGE to match: Notice: The SUBJECT pronouns and the VERB both agree!"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Match the verb form to the correct subject:  Ani waan ____ → ?",
          "options": [
            "tag",
            "tags",
            "tageen"
          ],
          "correctAnswer": "tag",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "The SAME verb form \"tag\" works for all persons in present tense! (Somali doesn't conjugate present tense the way English does with \"go, goes\")"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Verb Agreement Markers",
        "explanation": "Somali marks subject agreement with PREFIXES and AUXILIARIES: Present tense markers before the VERB: These markers show WHO is doing the action!",
        "examples": [
          {
            "somali": "Subject",
            "english": "Marker"
          },
          {
            "somali": "ani (I)",
            "english": "waan"
          },
          {
            "somali": "adiga (you)",
            "english": "waad"
          },
          {
            "somali": "isagu (he)",
            "english": "wuu"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Fill in the correct agreement marker:  ____ waxaan tag. (I go) → ?",
          "options": [
            "waan",
            "waad",
            "wuu"
          ],
          "correctAnswer": "waan",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Each subject has its SPECIFIC agreement marker!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Verbs in Full",
        "explanation": "Now see verbs with all their parts: Notice: Every verb has an agreement marker showing WHO!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Isagu wuu socdaa.",
            "english": "He walks."
          },
          {
            "somali": "isagu = subject, wuu = agreement marker, socdaa = verb",
            "english": "present"
          },
          {
            "somali": "Gabar-ta way cuneen.",
            "english": "The girls ate."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Break down each verb phrase into: SUBJECT + AGREEMENT MARKER + VERB  Ani waan tag. → ?",
          "options": [
            "iyada",
            "isagu",
            "ani",
            "innaga"
          ],
          "correctAnswer": "ani",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Every Somali verb sentence has this THREE-PART structure!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Infinitives — The Base Form of Ver",
        "explanation": "The INFINITIVE is the dictionary form of a verb (the base form): You use infinitives to: Infinitive examples in sentences:",
        "examples": [
          {
            "somali": "tag = to go",
            "english": "infinitive"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Verbs — Introduction & Foundation!",
        "takeaways": [
          "ROOTS & STEMS: Verbs built from 3-consonant roots; stems define conjugation patterns",
          "CLASSIFICATION: Transitive (with object), intransitive (without), stative (states)",
          "AGREEMENT: Verbs agree with subject in person (1st, 2nd, 3rd) and number (singular, plural)",
          "AGREEMENT MARKERS: Prefixes like waan, waad, wuu, way show WHO is doing the action",
          "STRUCTURE: Subject + Agreement Marker + Verb = complete verb phrase",
          "INFINITIVE: Base form used in dictionary and for expressing purpose"
        ]
      }
    ]
  },
  9: {
    "lessonId": 9,
    "title": "Tense & Aspect System",
    "cards": [
      {
        "type": "intro",
        "title": "Tense & Aspect System",
        "bullets": [
          "Distinguish tense (WHEN: past, present, future) from aspect (HOW: completed, ongoing)",
          "Form all three tenses with correct markers",
          "Recognize perfective, imperfective, and habitual aspects",
          "Combine tense + aspect for precise meanings",
          "Apply tense/aspect in realistic sentences"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Tense & Aspect ",
        "explanation": "Notice the VERB CHANGES to show time and nature of action: Notice: The SAME ROOT (tag, socod, cun) but DIFFERENT MARKERS show different times and natures!",
        "examples": [
          {
            "somali": "Ani waxaan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani waxaan tagay.",
            "english": "I went."
          },
          {
            "somali": "Ani waxaan tagi doonaa.",
            "english": "I will go."
          },
          {
            "somali": "Isagu wuu socdaa.",
            "english": "He walks/is walking."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Tense vs. Aspect — Understanding t",
        "explanation": "TENSE = WHEN the action happens (time location) ASPECT = HOW the action is viewed (completion/duration) Key difference: They work TOGETHER to create precise meanings!",
        "examples": [
          {
            "somali": "Tense",
            "english": "Aspect"
          },
          {
            "somali": "Past",
            "english": "Perfective"
          },
          {
            "somali": "Past",
            "english": "Imperfective"
          },
          {
            "somali": "Present",
            "english": "Habitual"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Three Tenses",
        "explanation": "SOMALI HAS THREE MAIN TENSES: 1. PRESENT TENSE — Actions now or habitual 2. PAST TENSE — Actions completed 3. FUTURE TENSE — Actions upcoming"
      },
      {
        "type": "teach",
        "conceptBadge": "The Present Tense",
        "explanation": "PRESENT TENSE = actions happening now OR actions done regularly Formation: Subject + Agreement Marker + Verb Stem Present tense has NO SUFFIX — it's the base verb stem!",
        "examples": [
          {
            "somali": "ani waan tag",
            "english": "I go / I am going"
          },
          {
            "somali": "adiga waad tag",
            "english": "you go"
          },
          {
            "somali": "isagu wuu tag",
            "english": "he goes"
          },
          {
            "somali": "iyada way tag",
            "english": "she goes"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form the present tense with these verbs:  ani + ciyaar (I play) → ?",
          "options": [
            "isagu wuu arki",
            "innaga waannu joog",
            "ani waan ciyaar",
            "iyaga way socod"
          ],
          "correctAnswer": "ani waan ciyaar",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Present tense = verb stem with NO suffix!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Past Tense",
        "explanation": "PAST TENSE = actions already completed Formation: Subject + Agreement Marker + Verb Stem + -ay (or -ey/-ay variants) Notice: The suffix changes by subject!",
        "examples": [
          {
            "somali": "ani waan tagay",
            "english": "I went"
          },
          {
            "somali": "adiga waad tagay",
            "english": "you went"
          },
          {
            "somali": "isagu wuu tagay",
            "english": "he went"
          },
          {
            "somali": "iyada way tagay",
            "english": "she went"
          }
        ],
        "tip": "The suffix changes by subject!"
      },
      {
        "type": "teach",
        "conceptBadge": "Past Tense Patterns",
        "explanation": "WATCH THE SUFFIX CHANGE with different subjects: Important: The past tense SUFFIX carries information about WHO did the action! This is why agreement matters!",
        "examples": [
          {
            "somali": "ani waan tagay",
            "english": "I went — finished"
          },
          {
            "somali": "iyada way tagay",
            "english": "she went — finished"
          },
          {
            "somali": "iyaga way tageen",
            "english": "they went — finished"
          },
          {
            "somali": "Notice: -ay (singular), -een",
            "english": "plural"
          }
        ],
        "tip": "The past tense SUFFIX carries information about WHO did the action!"
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form the past tense (completed action):  ani + tag → ?",
          "options": [
            "iyada way ciyaartay",
            "isagu wuu cunay",
            "ani waan tagay",
            "iyaga way arkeen"
          ],
          "correctAnswer": "ani waan tagay",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Past tense uses -ay/-ey/-een suffix to show COMPLETED action!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Future Tense",
        "explanation": "FUTURE TENSE = actions that will happen (intended or planned) Formation: Subject + Agreement Marker + Verb Stem + doonaa/doona/doonaan Notice: The auxiliary changes by subject!",
        "examples": [
          {
            "somali": "ani waan tagi doonaa",
            "english": "I will go"
          },
          {
            "somali": "adiga waad tagi doontaa",
            "english": "you will go"
          },
          {
            "somali": "isagu wuu tagi donaa",
            "english": "he will go"
          },
          {
            "somali": "iyada way tagi doontaa",
            "english": "she will go"
          }
        ],
        "tip": "The auxiliary changes by subject!"
      },
      {
        "type": "teach",
        "conceptBadge": "Future vs. Habitual Present",
        "explanation": "Don't confuse future with present habitual: Subtle but important!",
        "examples": [
          {
            "somali": "Tense",
            "english": "Form"
          },
          {
            "somali": "Present habitual",
            "english": "stem alone"
          },
          {
            "somali": "Future",
            "english": "stem + doonaa"
          },
          {
            "somali": "Past habitual",
            "english": "stem + -ay"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form the future tense:  ani + tag → ?",
          "options": [
            "iyada way arki doontaa",
            "iyaga way socodka doonaan",
            "isagu wuu cuni donaa",
            "ani waan tagi doonaa"
          ],
          "correctAnswer": "ani waan tagi doonaa",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Future uses doonaa/doontaa/donaa auxiliary!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Aspects — How Actions Are View",
        "explanation": "ASPECT describes the CHARACTER of the action, not WHEN it happens. SOMALI HAS THREE MAIN ASPECTS: 1. PERFECTIVE ASPECT — Action is COMPLETED, viewed as whole 2. IMPERFECTIVE ASPECT — Action is ONGOING, NOT completed 3. HABITUAL ASPECT — Action HAPPENS REGULARLY or repeatedly"
      },
      {
        "type": "teach",
        "conceptBadge": "Perfective vs. Imperfective — Prac",
        "explanation": "These SOUND similar but mean DIFFERENT things: In Somali, the MARKER tells the listener WHAT IS DONE and WHAT IS ONGOING!",
        "examples": [
          {
            "somali": "Ani waan cunay.",
            "english": "I ate. — finished eating"
          },
          {
            "somali": "Ani waan cuna.",
            "english": "I am eating. — still eating"
          },
          {
            "somali": "Ani waan cunaa.",
            "english": "I eat. — usually, habitually"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Combining Tense + Aspect",
        "explanation": "The REAL POWER: Combine tense (when) + aspect (how) for precise meanings: This is how Somali speakers express PRECISE TIME and ACTION NATURE!",
        "examples": [
          {
            "somali": "ani waan cunay",
            "english": "I ate — in the past, finished"
          },
          {
            "somali": "ani waan cunaya",
            "english": "I was eating — in the past, ongoing"
          },
          {
            "somali": "ani waan cunaa",
            "english": "I eat — now, habitually"
          },
          {
            "somali": "ani waan cuni doonaa",
            "english": "I will eat — in the future, will finish"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "For each sentence, identify TENSE (P=past, PR=present, F=future) and ASPECT (perf=perfective, imperf=imperfective, hab=habitual):  Ani waan cunay. → ?",
          "options": [
            "Ani waan cunay.",
            "Ani waan cunaya.",
            "Ani waan cuni doonaa.",
            "Ani waan cuna."
          ],
          "correctAnswer": "Ani waan cunay.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: Ani waan cunay. (I ate)."
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Tense & Aspect Quick Reference",
        "explanation": "TENSE + ASPECT COMBINATIONS: Every cell = a different shade of meaning!",
        "examples": [
          {
            "somali": "When",
            "english": "Completed (Perfective)"
          },
          {
            "somali": "Past",
            "english": "cunay (ate)"
          },
          {
            "somali": "Present",
            "english": "(rare)"
          },
          {
            "somali": "Future",
            "english": "cuni doonaa (will eat)"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — All Tenses & ",
        "explanation": "Now understand EVERY verb form: Every verb now makes SENSE!",
        "examples": [
          {
            "somali": "Ani waxaan tag.",
            "english": "I go. — present habitual"
          },
          {
            "somali": "Ani waxaan tagay.",
            "english": "I went. — past perfective"
          },
          {
            "somali": "tagay = past, perfective",
            "english": "finished"
          },
          {
            "somali": "Ani waxaan tagi doonaa.",
            "english": "I will go. — future"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "For each sentence, translate and identify TENSE + ASPECT:  Ani waan socdaa. → ?",
          "options": [
            "Ani waan socday.",
            "arki-ye",
            "Ani waan socdaa.",
            "Ani waan socdi doonaa."
          ],
          "correctAnswer": "Ani waan socdaa.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Correct answer: Ani waan socdaa.."
        }
      },
      {
        "type": "summary",
        "title": "You learned Tense & Aspect System!",
        "takeaways": [
          "Subject pronoun",
          "Agreement marker (waan, wuu, way, etc.)",
          "Verb stem (tag, cun, socod, etc.)"
        ]
      }
    ]
  },
  10: {
    "lessonId": 10,
    "title": "Mood & Modality",
    "cards": [
      {
        "type": "intro",
        "title": "Mood & Modality",
        "bullets": [
          "Understand mood (attitudes toward actions: real, wished, commanded)",
          "Form conditional sentences (if-then statements)",
          "Create subjunctive forms (expressing desire, necessity, purpose)",
          "Give direct imperative commands",
          "Express wishes, hopes, and optatives",
          "Distinguish mood from tense and aspect"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Moods in Action",
        "explanation": "Notice the ATTITUDE change toward the action: Notice: SAME VERB ROOT (tag) but DIFFERENT MOODS express different attitudes!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go. — This is a fact."
          },
          {
            "somali": "Waxaan doon tag!",
            "english": "I want to go! — Expressing desire"
          },
          {
            "somali": "Tag!",
            "english": "Go! — Telling someone to do it"
          },
          {
            "somali": "Hadii aad tag, buu imaan.",
            "english": "If you go, he will come. — Possibility"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Is Mood?",
        "explanation": "MOOD = the ATTITUDE or RELATIONSHIP toward an action Four questions mood answers: Each mood has different FORMS and FUNCTIONS!"
      },
      {
        "type": "teach",
        "conceptBadge": "The Indicative Mood (Reality)",
        "explanation": "INDICATIVE MOOD = statements about WHAT IS REAL, ACTUAL, TRUE This is what you've been learning so far! The indicative mood DOES NOT CHANGE FORM — it's what you already know!",
        "examples": [
          {
            "somali": "Present: Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Past: Ani waan tagay.",
            "english": "I went."
          },
          {
            "somali": "Future: Ani waan tagi doonaa.",
            "english": "I will go."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Imperative Mood (Commands)",
        "explanation": "IMPERATIVE MOOD = direct commands or instructions Formation: VERB STEM ALONE (no subject pronoun, no agreement marker) Important: Imperatives are COMMANDS, so no subject needed — the listener IS the subject!",
        "examples": [
          {
            "somali": "Tag!",
            "english": "Go! — singular"
          },
          {
            "somali": "Socda!",
            "english": "Walk! — singular"
          },
          {
            "somali": "Cun!",
            "english": "Eat! — singular"
          },
          {
            "somali": "Tagna!",
            "english": "Go! — plural, softly"
          }
        ],
        "tip": "Imperatives are COMMANDS, so no subject needed — the listener IS the subject!"
      },
      {
        "type": "teach",
        "conceptBadge": "Forming Singular Imperatives",
        "explanation": "For SINGULAR commands (talking to ONE person): Formation: Just the VERB STEM — nothing else needed Examples in sentences: That's it — imperatives are SIMPLE!",
        "examples": [
          {
            "somali": "tag",
            "english": "go!"
          },
          {
            "somali": "socod",
            "english": "walk!"
          },
          {
            "somali": "cun",
            "english": "eat!"
          },
          {
            "somali": "arki",
            "english": "see!"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Forming Plural Imperatives",
        "explanation": "For PLURAL commands (talking to MULTIPLE people): Formation: VERB STEM + -a (or -ta) for plural)",
        "examples": [
          {
            "somali": "tagna",
            "english": "go! — plural"
          },
          {
            "somali": "socda",
            "english": "walk! — plural"
          },
          {
            "somali": "cunta",
            "english": "eat! — plural"
          },
          {
            "somali": "arkida",
            "english": "see! — plural"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Subjunctive Mood (Desire, Nece",
        "explanation": "SUBJUNCTIVE MOOD = expressing: Formation: Subject + Agreement Marker + VERB STEM + -o (or -aa) Notice: The -o suffix marks SUBJUNCTIVE!",
        "examples": [
          {
            "somali": "Waxaan doon (inaan) tago.",
            "english": "I want to go."
          },
          {
            "somali": "Waad baahan tahay (inaad) tago.",
            "english": "You need to go."
          },
          {
            "somali": "Wuu rabo (inuu) tago.",
            "english": "He wants to go."
          },
          {
            "somali": "Way raba (inay) tago.",
            "english": "She wants to go."
          }
        ],
        "tip": "The -o suffix marks SUBJUNCTIVE!"
      },
      {
        "type": "teach",
        "conceptBadge": "Subjunctive vs. Indicative",
        "explanation": "Compare the DIFFERENCE between indicative and subjunctive: The SUBJUNCTIVE shifts from FACT to DESIRE/NECESSITY!",
        "examples": [
          {
            "somali": "Mood",
            "english": "Form"
          },
          {
            "somali": "Indicative",
            "english": "tagi doonaa"
          },
          {
            "somali": "Subjunctive",
            "english": "tago"
          },
          {
            "somali": "Indicative",
            "english": "tag"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form subjunctive phrases expressing desire:  ani + doon + tag → ?",
          "options": [
            "Way doona inay arkaan.",
            "Waxaan doon inaan tago.",
            "Wuu raba inuu socdo.",
            "Way rabtaa inay cunto."
          ],
          "correctAnswer": "Waxaan doon inaan tago.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Subjunctive uses -o suffix to show DESIRE or NECESSITY!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Conditional Mood (If-Then)",
        "explanation": "CONDITIONAL MOOD = expressing HYPOTHETICAL or POSSIBLE situations Formation: Hadii (if) + present + past or future",
        "examples": [
          {
            "somali": "Hadii aad tag, buu imaan.",
            "english": "If you go, he will come. — possibility"
          },
          {
            "somali": "Hadii aad socdo, buu ku arkan.",
            "english": "If you walk, he will see you. — condition"
          },
          {
            "somali": "Hadii uu cunay, wuu buuxdan.",
            "english": "If he ate, he would be full. — past condition"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Conditional Patterns",
        "explanation": "CONDITIONAL structures use PAIRED TENSES: The TENSE in both clauses shows the RELATIONSHIP!",
        "examples": [
          {
            "somali": "Hadii aad tag, buu imaan.",
            "english": "If you go now, he will come."
          },
          {
            "somali": "Hadii aad tagay, wuu imaan.",
            "english": "If you went, he came."
          },
          {
            "somali": "Hadii aad tagi lahayd, buu ku arkan lahayd.",
            "english": "If you could go, he would see you."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form conditional sentences:",
          "options": [
            "Hadii aad ____ cun, ____ buu",
            "imaan."
          ],
          "correctAnswer": "imaan.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Conditionals use hadii (if) + matched tenses for condition-result!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Optative Mood (Wishes & Hopes)",
        "somaliText": "Exa aad ta caafi!",
        "englishText": "May you be well!",
        "explanation": "OPTATIVE MOOD = expressing WISHES, HOPES, and DESIRES for outcomes Formation: Expressions like \"Exa\" (may), \"Illaahi\" (God willing), or subjunctive forms",
        "examples": [
          {
            "somali": "Exa aad ta caafi!",
            "english": "May you be well!"
          },
          {
            "somali": "Illaahi aay caafi tahay!",
            "english": "God willing, she is well!"
          },
          {
            "somali": "Waxaan rabtaa inaan labo lahayn.",
            "english": "I wish I had two."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Mood vs. Tense vs. Aspect",
        "explanation": "Don't confuse these three grammar systems: They work TOGETHER to create complete meaning! Example with all three:",
        "examples": [
          {
            "somali": "TENSE = WHEN",
            "english": "past, present, future"
          },
          {
            "somali": "Ani waan tagay.",
            "english": "I went — past tense"
          },
          {
            "somali": "ASPECT = HOW COMPLETED",
            "english": "perfective, imperfective, habitual"
          },
          {
            "somali": "Ani waan cunay.",
            "english": "I ate — perfective aspect"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Moods in Cont",
        "explanation": "Now see all moods together: Every mood serves a different purpose in communication!",
        "examples": [
          {
            "somali": "Ani waan tag!",
            "english": "Indicative — I go."
          },
          {
            "somali": "Tag!",
            "english": "Imperative — Go!"
          },
          {
            "somali": "Waxaan doon inaan tag.",
            "english": "Subjunctive — I want to go."
          },
          {
            "somali": "Hadii aad tag, maxaa kuu dhacay?",
            "english": "Conditional — If you go, what happened to you?"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify the MOOD of each verb:  \"Ani waan ciyaaray.\" → ?",
          "options": [
            "Indicative",
            "Conditional",
            "Subjunctive",
            "Imperative"
          ],
          "correctAnswer": "Indicative",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Each mood shifts the communicative purpose!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Special Moods — Negative Imperativ",
        "explanation": "To say \"DON'T DO THIS!\" use a different form: Negative imperatives use HA + infinitive + -n",
        "examples": [
          {
            "somali": "Tag!",
            "english": "Do go!"
          },
          {
            "somali": "Ha tago!",
            "english": "Don't go! — negative"
          },
          {
            "somali": "Cun!",
            "english": "Do eat!"
          },
          {
            "somali": "Ha cunin!",
            "english": "Don't eat! — negative"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form negative imperatives (commands not to do something):  tag (go) → ?",
          "options": [
            "Ha qorin!",
            "Ha tagin!",
            "Ha cunin!",
            "Ha socdina!"
          ],
          "correctAnswer": "Ha tagin!",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Negative imperatives use ha + infinitive + -n suffix!"
        }
      },
      {
        "type": "summary",
        "title": "You learned Mood & Modality!",
        "takeaways": [
          "You completed Mood & Modality."
        ]
      }
    ]
  },
  11: {
    "lessonId": 11,
    "title": "Verb Extensions & Voice",
    "cards": [
      {
        "type": "intro",
        "title": "Verb Extensions & Voice",
        "bullets": [
          "Understand verb extensions (modifications to verb meaning)",
          "Form causative verbs (make/cause someone to do something)",
          "Create passive voice (focus on receiver, not doer)",
          "Build reflexive verbs (action to oneself)",
          "Express iterative/repetitive actions",
          "Recognize how extensions change verb meaning"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Verb Extensions",
        "explanation": "Notice how ONE VERB ROOT appears in DIFFERENT FORMS: Notice: SAME ROOT (tag) but DIFFERENT EXTENSIONS show different relationships!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani waan tagin.",
            "english": "I make/send."
          },
          {
            "somali": "Ani waa la tagin.",
            "english": "I am made to go."
          },
          {
            "somali": "Ani waan is tag.",
            "english": "I go by myself."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Verb Extensions?",
        "explanation": "VERB EXTENSIONS are MODIFICATIONS to a verb that change its MEANING or RELATIONSHIP Extensions answer these questions: Somali uses PREFIXES and SUFFIXES to create extensions:",
        "examples": [
          {
            "somali": "Prefix: la-",
            "english": "marks passive and applicative"
          },
          {
            "somali": "Prefix: is-",
            "english": "marks reflexive"
          },
          {
            "somali": "Suffix: -in or -i",
            "english": "marks causative"
          },
          {
            "somali": "Suffix: -aa",
            "english": "marks intensive"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Causative Extension (Make/Caus",
        "explanation": "CAUSATIVE = making or causing someone to do something Formation: VERB STEM + -in (causative suffix) In sentences:",
        "examples": [
          {
            "somali": "Basic: tag",
            "english": "go"
          },
          {
            "somali": "Causative: tagin",
            "english": "make/send go"
          },
          {
            "somali": "Basic: cun",
            "english": "eat"
          },
          {
            "somali": "Causative: cunin",
            "english": "make eat, feed"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Causative Examples in Context",
        "explanation": "Causative verbs FOCUS on the person DOING THE CAUSING: The causative EXTENDS the verb to express a NEW relationship!",
        "examples": [
          {
            "somali": "Wiil-ka wuu tag.",
            "english": "The boy goes."
          },
          {
            "somali": "Gabar-ka way tagin wiil-ka.",
            "english": "The girl makes/sends the boy."
          },
          {
            "somali": "Caruurta way cuna.",
            "english": "The children eat."
          },
          {
            "somali": "Hooyo way cunin caruurta.",
            "english": "Mother feeds the children."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form the causative by adding -in to each verb:  tag (go) → ?",
          "options": [
            "cunin",
            "socdin",
            "arkin",
            "tagin"
          ],
          "correctAnswer": "tagin",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Causative simply adds -in to the verb stem!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Passive Voice (Focus on Receiv",
        "explanation": "PASSIVE VOICE = focusing on WHO/WHAT RECEIVES the action, NOT who does it Formation: Subject + la- prefix + VERB STEM The la- prefix marks passive!",
        "examples": [
          {
            "somali": "Wiil-ka wuu cunay caruur.",
            "english": "The boy ate food."
          },
          {
            "somali": "Caruur-ka waa la cunay.",
            "english": "The food was eaten."
          },
          {
            "somali": "Gabar-ta way arkisay ninka.",
            "english": "The girl saw the man."
          },
          {
            "somali": "Ninka waa la arkisay.",
            "english": "The man was seen."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Passive Voice in Context",
        "explanation": "PASSIVE focuses the LISTENER'S ATTENTION on the RECEIVER: Passive shifts FOCUS and EMPHASIS!",
        "examples": [
          {
            "somali": "Macalimka wuu qoray xariif.",
            "english": "The teacher wrote the letter."
          },
          {
            "somali": "Focus: Teacher",
            "english": "DOER"
          },
          {
            "somali": "Xariifka waa la qoray.",
            "english": "The letter was written."
          },
          {
            "somali": "Focus: Letter",
            "english": "RECEIVER"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form the passive by using la- prefix:  Wiil-ka wuu qoray. (The boy wrote.) → ?",
          "options": [
            "Xariif-ka waa la qoray.",
            "Dugsi-ga waa la arkay.",
            "Joogaa",
            "Canaa-sha waa la cunay."
          ],
          "correctAnswer": "Xariif-ka waa la qoray.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Passive uses la- prefix with normal verb agreement markers!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Reflexive Extension (To Onesel",
        "explanation": "REFLEXIVE = action directed TOWARD ONESELF or DONE BY ONESELF Formation: Subject + is- prefix + VERB STEM The is- prefix marks reflexive!",
        "examples": [
          {
            "somali": "Ani waan caashi garuur.",
            "english": "I wash the child."
          },
          {
            "somali": "Ani waan is caashi.",
            "english": "I wash myself."
          },
          {
            "somali": "Wuu barbar qor.",
            "english": "He teaches the people."
          },
          {
            "somali": "Wuu is bar.",
            "english": "He teaches himself."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Reflexive Examples",
        "explanation": "REFLEXIVE actions are personal or independent:",
        "examples": [
          {
            "somali": "Gabar-ta way barayed caruurta.",
            "english": "The girl taught the children."
          },
          {
            "somali": "Gabar-ta way is baraysay.",
            "english": "The girl taught herself."
          },
          {
            "somali": "Ninka wuu qoray mahadsantii.",
            "english": "The man wrote the thank-you."
          },
          {
            "somali": "Ninka wuu is qoray.",
            "english": "The man wrote for himself / self-wrote."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form reflexive verbs using is- prefix:  caashi (wash) → ?",
          "options": [
            "way is bar",
            "ani waan is caashi",
            "way is cun",
            "wuu is qor"
          ],
          "correctAnswer": "ani waan is caashi",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Reflexive uses is- prefix to mark action toward self!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Iterative/Repetitive Extension",
        "explanation": "ITERATIVE = action done REPEATEDLY, CONTINUOUSLY, or HABITUALLY Formation: VERB ROOT + VERB ROOT (doubling) or special suffixes ROOT DOUBLING marks iterative/habitual repetition!",
        "examples": [
          {
            "somali": "Ani waan socod.",
            "english": "I walk. — one instance"
          },
          {
            "somali": "Ani waan socod-socod.",
            "english": "I walk-walk. — repeatedly/continuously"
          },
          {
            "somali": "Gabar-ta way cun.",
            "english": "The girl eats. — one meal"
          },
          {
            "somali": "Gabar-ta way cun-cun.",
            "english": "The girl eats-eats. — keeps eating"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Iterative in Context",
        "explanation": "ITERATIVE emphasizes CONTINUOUS or REPEATED ACTION:",
        "examples": [
          {
            "somali": "Buu socod.",
            "english": "He walks. — one trip"
          },
          {
            "somali": "Buu socod-socod.",
            "english": "He walks-walks. — habitually, keeps walking"
          },
          {
            "somali": "Wuu ciyaar.",
            "english": "He plays. — one time"
          },
          {
            "somali": "Wuu ciyaar-ciyaar.",
            "english": "He plays-plays. — keeps playing, repeatedly"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form iterative verbs by doubling the root:  socod → ?",
          "options": [
            "ciyaar-ciyaar",
            "cun-cun",
            "socod-socod",
            "tag-tag"
          ],
          "correctAnswer": "socod-socod",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Iterative uses root doubling to show repeated/continuous action!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Combining Extensions with Tense",
        "explanation": "Extensions work with ALL TENSES: Tense and extension work TOGETHER!",
        "examples": [
          {
            "somali": "Ani waan is tag doona.",
            "english": "I will go myself."
          },
          {
            "somali": "Waa la socod.",
            "english": "It is being walked."
          },
          {
            "somali": "Buu tag-tag ay.",
            "english": "He kept going. — past"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Extensions in",
        "explanation": "Now see all extensions together: One root, FIVE different relationships!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani waan tagin gabar-ta.",
            "english": "I send the girl."
          },
          {
            "somali": "Gabar-ta waa la tagin.",
            "english": "The girl is sent."
          },
          {
            "somali": "Ani waan is tag.",
            "english": "I go myself."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify which extension is used:  Ani waan is caashi. → ?",
          "options": [
            "Ani waan cunin caruurta.",
            "Wuu socod-socod.",
            "Xariif-ka waa la qoray.",
            "Ani waan is caashi."
          ],
          "correctAnswer": "Ani waan is caashi.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Each extension changes the verb's RELATIONSHIP to the action!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Special: Multiple Extensions",
        "explanation": "Somali can COMBINE extensions: Complex structures stack extensions!",
        "examples": [
          {
            "somali": "Ninka wuu is tagin.",
            "english": "The man makes himself go. / sends himself"
          },
          {
            "somali": "Wuu is cun-cun.",
            "english": "He eats to himself repeatedly. / snacks on his own"
          },
          {
            "somali": "Waa la socod-socod.",
            "english": "It is being walked-walked. / habitually traveled"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Verb Extensions & Voice!",
        "takeaways": [
          "You completed Verb Extensions & Voice."
        ]
      }
    ]
  },
  12: {
    "lessonId": 12,
    "title": "Complex Verb Forms & Irregularities",
    "cards": [
      {
        "type": "intro",
        "title": "Complex Verb Forms & Irregularities",
        "bullets": [
          "Recognize irregular verbs that don't follow normal conjugation patterns",
          "Understand gemination (double consonants) and what they signal",
          "Master suppletive forms (different roots for different tenses)",
          "Identify archaic and dialectal forms",
          "Use irregular verbs correctly in context",
          "Navigate the exceptions that make Somali authentic"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Irregularities ",
        "explanation": "Notice the UNUSUAL PATTERNS: Notice: Irregular verbs are COMMON and IMPORTANT!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani waan tagay.",
            "english": "I went."
          },
          {
            "somali": "Ani waan tagi doonaa.",
            "english": "I will go."
          },
          {
            "somali": "Ani waan imid.",
            "english": "I came. — Note: imid, not imdaa"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Makes a Verb Irregular?",
        "explanation": "An IRREGULAR VERB breaks the normal conjugation patterns. Typical patterns you expect (regular verbs): What makes a verb IRREGULAR: Result: You can't PREDICT the form — you must LEARN IT!"
      },
      {
        "type": "teach",
        "conceptBadge": "Major Irregular Verbs",
        "explanation": "SOMALI HAS SEVERAL HIGHLY IRREGULAR BUT VERY COMMON VERBS: These are the MOST common irregular verbs in Somali!",
        "examples": [
          {
            "somali": "Infinitive",
            "english": "Meaning"
          },
          {
            "somali": "imid",
            "english": "come"
          },
          {
            "somali": "jid",
            "english": "go/depart"
          },
          {
            "somali": "ahaa",
            "english": "be"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Verb IMID (Come) — Highly Irre",
        "explanation": "IMID is one of the most irregular verbs in Somali. Formation by tense: Notice: Three different roots for three different tenses!",
        "examples": [
          {
            "somali": "Ani waan imaa.",
            "english": "I come. — habitual"
          },
          {
            "somali": "Isagu wuu imaa.",
            "english": "He comes."
          },
          {
            "somali": "Iyada way imaa.",
            "english": "She comes."
          },
          {
            "somali": "Ani waan imid.",
            "english": "I came. — not \"imay\"!"
          }
        ],
        "tip": "Three different roots for three different tenses!"
      },
      {
        "type": "teach",
        "conceptBadge": "IMID Conjugation Patterns",
        "explanation": "Why is IMID so irregular? This is SUPPLETIVE — using different verb roots for different tenses!",
        "examples": [
          {
            "somali": "Past: tagay",
            "english": "add -ay"
          },
          {
            "somali": "Future: tagi doonaa",
            "english": "add doonaa"
          },
          {
            "somali": "Present: imaa",
            "english": "different root"
          },
          {
            "somali": "Past: imid",
            "english": "different root again"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Verb AHAA (Be) — Stative Irreg",
        "explanation": "AHAA (be/exist) is another highly irregular verb. AHAA has an unusual feature: Present and past use SAME FORM! The future uses a completely different verb (noqon = become)!",
        "examples": [
          {
            "somali": "Ani waan ahaa.",
            "english": "I am."
          },
          {
            "somali": "Isagu wuu ahaa.",
            "english": "He is."
          },
          {
            "somali": "Ani waan ahaa.",
            "english": "I was. — Same form as present!"
          },
          {
            "somali": "Isagu wuu ahaa.",
            "english": "He was."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "AHAA Usage Examples",
        "explanation": "AHAA is used for describing states and characteristics: AHAA + NOQON combination is how Somali expresses being/becoming!",
        "examples": [
          {
            "somali": "Gabar-ta way ahaa macallima.",
            "english": "The girl is/was a teacher."
          },
          {
            "somali": "Ninka wuu ahaa cariim.",
            "english": "The man is/was strong."
          },
          {
            "somali": "Waxani waa roon.",
            "english": "This is wrong. — state"
          },
          {
            "somali": "Gabar-ta way noqon doontaa macallima.",
            "english": "The girl will become a teacher."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Fill in the correct form:",
          "options": [
            "Gabar-ta way ahaa macallima.",
            "Ani waan socdi doonaa.",
            "Buu imaan hadii aad yeelaato.",
            "Ani waan imaa inaan socdo."
          ],
          "correctAnswer": "Ani waan imaa inaan socdo.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Irregular verbs require direct memorization, not pattern rules!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Gemination (Double Consonants)",
        "explanation": "GEMINATION = doubling a consonant to change verb meaning or intensity Gemination adds EMPHASIS or INTENSITY!",
        "examples": [
          {
            "somali": "waxaan qor",
            "english": "I write — normal"
          },
          {
            "somali": "waxaan socod",
            "english": "I walk — normal"
          },
          {
            "somali": "waxaan cun",
            "english": "I eat — normal"
          },
          {
            "somali": "waxaan qooor",
            "english": "I write intensely / keep writing"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Gemination Examples",
        "explanation": "Double consonants create SUBTLE MEANING SHIFTS: Gemination = INTENSITY, EMPHASIS, or REPETITION!",
        "examples": [
          {
            "somali": "Tag hadda!",
            "english": "Go now. — normal command"
          },
          {
            "somali": "Taag hadda!",
            "english": "Go right now! — urgent, emphatic"
          },
          {
            "somali": "Wuu joog.",
            "english": "He stays. — regular"
          },
          {
            "somali": "Wuu jooj!",
            "english": "He stays put! / He stops! — emphatic"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify which form is GEMINATED (doubled consonant) and explain the meaning shift:  tag vs. taag → ?",
          "options": [
            "taag",
            "jooj",
            "cuun",
            "soocod"
          ],
          "correctAnswer": "taag",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Gemination adds INTENSITY and EMPHASIS to verbs!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Suppletive Verbs (Different Roots)",
        "explanation": "SUPPLETIVE VERBS use DIFFERENT ROOTS for different tenses. Most famous example: TAG (go) and JIDA/JID (depart) Somali sometimes uses different verbs to express fine distinctions!",
        "examples": [
          {
            "somali": "TAG (go): ani waan tag (I go), ani waan tagay",
            "english": "I went"
          },
          {
            "somali": "JID (depart): buu jid (he departed), way jiden",
            "english": "they departed"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Common Suppletive Distinctions",
        "explanation": "SOMALI uses different verb roots to express DIFFERENT RELATIONSHIPS: Suppletive forms give NUANCE to expressions!",
        "examples": [
          {
            "somali": "Relationship",
            "english": "Verb Root"
          },
          {
            "somali": "Going (general)",
            "english": "tag"
          },
          {
            "somali": "Departing (purposeful)",
            "english": "jid"
          },
          {
            "somali": "Coming (general)",
            "english": "imid"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Match the verb to the meaning:  Ani waan tag. → ?",
          "options": [
            "I depart",
            "She arrived",
            "I go",
            "She came"
          ],
          "correctAnswer": "I go",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Suppletive verbs use different roots to express DIFFERENT SHADES OF MEANING!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Archaic & Dialectal Forms",
        "explanation": "SOMALI has regional variations and archaic forms you'll hear in literature and older speech. These aren't WRONG — they're just REGIONAL or OLD!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani waxaan tag.",
            "english": "variant, regional"
          },
          {
            "somali": "Ani waa tag.",
            "english": "very archaic, poetic"
          },
          {
            "somali": "Waxaan cunay.",
            "english": "I ate."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "When to Expect Irregularities",
        "explanation": "You'll encounter irregular verbs in these situations: Irregularities are FEATURES, not FLAWS!"
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Irregularitie",
        "explanation": "Now see irregular verbs in authentic dialogue: Irregular forms make Somali AUTHENTIC and EXPRESSIVE!",
        "examples": [
          {
            "somali": "Buu timid markuu maqal.",
            "english": "He came when he heard."
          },
          {
            "somali": "Way ahaa macallima.",
            "english": "She was a teacher."
          },
          {
            "somali": "Wuu jid inuu iskuulka gasho.",
            "english": "He departed to enter school."
          },
          {
            "somali": "Hadii aad imaan, baa la cuni.",
            "english": "If you come, we will eat."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "For each sentence, identify: (1) the verb, (2) is it regular or irregular?, (3) the tense:  \"Ani waan tagay.\" → ?",
          "options": [
            "tag",
            "ahaa",
            "imid",
            "Caruurta jira dugsi-ga."
          ],
          "correctAnswer": "tag",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Recognize irregularities and treat them as SPECIAL CASES!"
        }
      },
      {
        "type": "summary",
        "title": "You learned Complex Verb Forms & Irregularities!",
        "takeaways": [
          "IRREGULAR VERBS: Break normal conjugation rules",
          "IMID (come): imaa imid imaan (three different roots)",
          "AHAA (be): ahaa ahaa noqon (present/past/future use different roots)",
          "GEMINATION: Double consonants add intensity",
          "tag taag (go RIGHT NOW!)",
          "cun cuun (eat greedily!)"
        ]
      }
    ]
  },
  13: {
    "lessonId": 13,
    "title": "Word Order & Simple Sentences",
    "cards": [
      {
        "type": "intro",
        "title": "Word Order & Simple Sentences",
        "bullets": [
          "Understand Somali word order patterns (SVO and VSO)",
          "Build simple sentences with subject, verb, object",
          "Recognize focus and topicalization shifts",
          "Use word order for emphasis and clarity",
          "Distinguish Somali word order from English",
          "Apply correct word order in context"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Word Order in A",
        "explanation": "Notice how WORD ORDER changes MEANING and EMPHASIS: Notice: SAME WORDS, DIFFERENT ORDER = DIFFERENT MEANING!",
        "examples": [
          {
            "somali": "Gabar-ta way cunay cambuula.",
            "english": "The girl ate the food."
          },
          {
            "somali": "Way cunay gabar-ta cambuula.",
            "english": "The food ATE the girl. — focus on the eating, unusual"
          },
          {
            "somali": "Cambuula baa gabar-ta cunaysay.",
            "english": "FOOD is what the girl was eating. — emphasizing the food"
          },
          {
            "somali": "Cambuula baa gabar-ta cunaysay.",
            "english": "It is the FOOD that the girl ate. — fronting the object"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Is Word Order?",
        "explanation": "WORD ORDER = the sequence in which subject, verb, and object appear in a sentence Three main patterns exist in world languages: Somali is PRIMARILY SVO but allows VSO with special meaning! Basic structure:",
        "examples": [
          {
            "somali": "Ani + waan cun + cambuula.",
            "english": "I + eat + food."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The SVO Pattern (Subject-Verb-Obje",
        "explanation": "SVO is the NEUTRAL, NORMAL word order in Somali. This is what you've been building so far: SVO is NEUTRAL — no special emphasis.",
        "examples": [
          {
            "somali": "Subject (S) + Verb (V) + Object",
            "english": "O"
          },
          {
            "somali": "Ani waan cun cambuula.",
            "english": "I eat food."
          },
          {
            "somali": "Gabar-ta way arkis ninka.",
            "english": "The girl sees the man."
          },
          {
            "somali": "Wiil-ka wuu qor xariif.",
            "english": "The boy writes a letter."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Build complete SVO sentences with subject, verb, object:  (subject: ani) + (verb: tag) + (object: iskuulka) → ?",
          "options": [
            "Iyaga way cun cuntada.",
            "Ani waan tag iskuulka.",
            "Gabar-ta way arki ninka.",
            "Wiil-ka wuu qor xariif."
          ],
          "correctAnswer": "Ani waan tag iskuulka.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "SVO is the BASIC, NEUTRAL word order!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The VSO Pattern (Verb-Subject-Obje",
        "explanation": "VSO is used when you want to EMPHASIZE the ACTION or CHANGE FOCUS. Formation: Verb + Subject + Object VSO shifts focus to the VERB/ACTION!",
        "examples": [
          {
            "somali": "Gabar-ta way cunay cuntada.",
            "english": "The girl ate the food."
          },
          {
            "somali": "Way cunay gabar-ta cuntada.",
            "english": "ATE the girl the food. — emphasizing the eating action"
          },
          {
            "somali": "Cunay! Gabar-ta cunay cuntada!",
            "english": "ATE! The girl ate the food! — very emphatic"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "VSO in Context",
        "explanation": "VSO is used in STORYTELLING, DRAMA, and EMOTIONAL CONTEXTS: VSO creates ENERGY and EMPHASIS!",
        "examples": [
          {
            "somali": "Gabar-ta way socdatay suuqa.",
            "english": "The girl walked to the market."
          },
          {
            "somali": "Way socdatay gabar-ta suuqa!",
            "english": "WALKED the girl to the market! — dramatic"
          },
          {
            "somali": "Ninka wuu timid markay arkis.",
            "english": "The man came when she saw."
          },
          {
            "somali": "Timid! Ninka timid markay arkis!",
            "english": "HE CAME! The man came when she saw! — drama"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Convert these SVO sentences to VSO (emphasizing the action):  Ani waan tag. → ?",
          "options": [
            "Way tag ani.",
            "Way cun gabar-ta.",
            "Wuu arkis wiil-ka.",
            "caat"
          ],
          "correctAnswer": "Way tag ani.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "VSO emphasizes the ACTION by fronting the verb!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Focus Marker BAA — The Game Change",
        "explanation": "The focus marker BAA is how Somali signals what is MOST IMPORTANT in a sentence. BAA has multiple uses: BAA moves the focused element to the FRONT of the sentence!",
        "examples": [
          {
            "somali": "Qurux baa gabar-ta.",
            "english": "BEAUTIFUL the girl is. — focus on the quality"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "BAA Structure and Rules",
        "explanation": "BAA creates CLEFT SENTENCES (focusing one element): Formation: [FOCUSED ELEMENT] baa [REST OF SENTENCE] BAA lets you emphasize ANY element!",
        "examples": [
          {
            "somali": "Gabar-ta way cunay cuntada.",
            "english": "The girl ate the food."
          },
          {
            "somali": "Gabar-ta baa way cunay cuntada.",
            "english": "It is the GIRL who ate the food."
          },
          {
            "somali": "Cuntada baa gabar-ta cunaysay.",
            "english": "It is the FOOD the girl was eating."
          },
          {
            "somali": "Mooday baa ay socdeen.",
            "english": "It was YESTERDAY they walked."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Add BAA to emphasize the underlined element:  Gabar-ta way cun. (GABAR-TA) → ?",
          "options": [
            "Ninka baa way arkis.",
            "Iskuulka baa wuu tag.",
            "Ha tagin!",
            "Gabar-ta baa way cun."
          ],
          "correctAnswer": "Gabar-ta baa way cun.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "BAA marks the FOCUSED/MOST IMPORTANT element!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Adjuncts — Adding Extra Informatio",
        "explanation": "Adjuncts are OPTIONAL phrases that add TIME, PLACE, or MANNER information. Adjuncts usually go at the END of the sentence: Adjuncts provide CONTEXT without changing the core meaning!",
        "examples": [
          {
            "somali": "Basic: Gabar-ta way cunay.",
            "english": "The girl ate."
          },
          {
            "somali": "+ Time: Gabar-ta way cunay marka dhexe.",
            "english": "The girl ate at noon."
          },
          {
            "somali": "+ Place: Gabar-ta way cunay guriga.",
            "english": "The girl ate at home."
          },
          {
            "somali": "+ Manner: Gabar-ta way cunay si deg-deg.",
            "english": "The girl ate quickly."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Adjunct Types",
        "explanation": "ADJUNCTS answer the questions: WHERE? WHEN? HOW? WHY? WITH WHOM? Each adjunct adds RICHNESS to the sentence!",
        "examples": [
          {
            "somali": "Temporal",
            "english": "When?"
          },
          {
            "somali": "Locative",
            "english": "Where?"
          },
          {
            "somali": "Manner",
            "english": "How?"
          },
          {
            "somali": "Comitative",
            "english": "With whom?"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Expand each sentence by adding the adjunct in parentheses:  Ani waan tag. (iskuulka) → ?",
          "options": [
            "Ani waan tag iskuulka.",
            "Wuu qor si deg-deg.",
            "Ani waan socdaa.",
            "Way cun guriga mara dhexe."
          ],
          "correctAnswer": "Ani waan tag iskuulka.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Adjuncts provide CONTEXT and DETAIL!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Negation in Word Order",
        "explanation": "Negation CHANGES word order patterns. Somali uses MA to negate verbs: MA negation removes the agreement marker and uses different verb forms! (Detailed negation comes in Module 15 — this is preview!)",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani ma tag.",
            "english": "I don't go. — note: no agreement marker!"
          },
          {
            "somali": "Ani ma tagin.",
            "english": "I am not going. — infinitive form"
          },
          {
            "somali": "Gabar-ta way cunay cuntada.",
            "english": "The girl ate the food."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Simple Sentence Template",
        "explanation": "EVERY Somali simple sentence follows this TEMPLATE: Every element has its PLACE!",
        "examples": [
          {
            "somali": "Ani + waan + tag + iskuulka + hadda",
            "english": "I + go + to school + now"
          },
          {
            "somali": "Gabar-ta + way + cunay + cuntada + guriga + mara dhexe",
            "english": "The girl + ate + food + at home + at noon"
          },
          {
            "somali": "Wiil-ka + wuu + qoray + xariif + si deg-deg",
            "english": "The boy + wrote + letter + quickly"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Break down each sentence into: SUBJECT | AGREEMENT | VERB | OBJECT | ADJUNCTS:",
          "options": [
            "Gabar-ta | way | cun | guriga | —",
            "Ani | waan | tag | iskuulka | hadda",
            "Ha socdina!",
            "Wiil-ka | wuu | qor | xariif | si deg-deg"
          ],
          "correctAnswer": "Ani | waan | tag | iskuulka | hadda",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Every sentence part has a FUNCTION!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Word Order in",
        "explanation": "Now see word order choices in authentic dialogue: Word order choices create NUANCE and EMPHASIS!",
        "examples": [
          {
            "somali": "Gabar-ta way cunay.",
            "english": "The girl ate."
          },
          {
            "somali": "Way cunay gabar-ta!",
            "english": "The girl ATE!"
          },
          {
            "somali": "Gabar-ta baa way cunay.",
            "english": "It was the GIRL who ate."
          },
          {
            "somali": "Cuntada baa gabar-ta cunaysay.",
            "english": "It was the FOOD she was eating."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose the sentence that correctly emphasizes what's described:",
          "options": [
            "Gabar-ta way cunay.",
            "Way cunay gabar-ta.",
            "Gabar-ta baa way cunay.",
            "wuu"
          ],
          "correctAnswer": "Gabar-ta baa way cunay.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Word order carries COMMUNICATIVE MEANING!"
        }
      },
      {
        "type": "summary",
        "title": "You learned Word Order & Simple Sentences!",
        "takeaways": [
          "SVO (NEUTRAL): Subject-Verb-Object is the default word order",
          "Gabar-ta way cunay cuntada. (The girl ate the food.)",
          "VSO (EMPHATIC): Verb-Subject-Object emphasizes the action",
          "Way cunay gabar-ta cuntada. (The girl ATE the food!)",
          "BAA (FOCUS): Moves focused element to front",
          "Cuntada baa gabar-ta cunaysay. (It's the FOOD she ate.)"
        ]
      }
    ]
  },
  14: {
    "lessonId": 14,
    "title": "Complex Sentences",
    "cards": [
      {
        "type": "intro",
        "title": "Complex Sentences",
        "bullets": [
          "Combine two sentences using coordination",
          "Create dependent clauses using subordination",
          "Build relative clauses to describe nouns",
          "Embed clauses within clauses",
          "Use appropriate connectors and markers",
          "Distinguish when to coordinate vs. subordinate"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Complex Sentenc",
        "explanation": "Notice how sentences COMBINE and RELATE to each other: Notice: COMBINING SENTENCES creates TEXTURE and MEANING!",
        "examples": [
          {
            "somali": "Ani waan tag iskuulka.",
            "english": "I go to school."
          },
          {
            "somali": "Macalimka wuu baro.",
            "english": "The teacher teaches."
          },
          {
            "somali": "Ani waan tag iskuulka oo macalimka baa baro.",
            "english": "I go to school and the teacher teaches."
          },
          {
            "somali": "Markii ani aad tag iskuulka, macalimka baa baro.",
            "english": "When I go to school, the teacher teaches."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Complex Sentences?",
        "explanation": "A COMPLEX SENTENCE combines TWO or MORE simple sentences or clauses. Three main ways to combine: Each strategy has DIFFERENT CONNECTORS and WORD ORDERS!"
      },
      {
        "type": "teach",
        "conceptBadge": "Coordination — Joining Equal Ideas",
        "explanation": "COORDINATION connects sentences of EQUAL importance using CONNECTORS. Main Somali coordinators: Coordinators join EQUAL clauses!",
        "examples": [
          {
            "somali": "OO = and",
            "english": "links two complete thoughts"
          },
          {
            "somali": "LAAKIIN = but",
            "english": "contrasts two ideas"
          },
          {
            "somali": "HADII KALE = otherwise",
            "english": "provides alternative"
          },
          {
            "somali": "AMI = or",
            "english": "offers choice"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Coordination Patterns",
        "explanation": "COORDINATION doesn't change WORD ORDER — just adds a connector: Each clause keeps its OWN SUBJECT and VERB!",
        "examples": [
          {
            "somali": "Gabar-ta way cunay OO wiil-ka wuu socdaa.",
            "english": "The girl ate AND the boy walks. — both unchanged"
          },
          {
            "somali": "Gabar-ta way cunay LAAKIIN wiil-ka ma cunin.",
            "english": "The girl ate BUT the boy didn't eat. — equal clauses"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Combine each pair using the given coordinator:",
          "options": [
            "Ani waan tag iskuulka oo adiga waad joog guriga.",
            "Way socdeen suuqa hadii kale guriga.",
            "Ani waan cunaya.",
            "Gabar-ta way cunay laakiin wiil-ka ma cunin."
          ],
          "correctAnswer": "Ani waan tag iskuulka oo adiga waad joog guriga.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Coordinators join EQUAL, INDEPENDENT clauses!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Subordination — One Clause Depends",
        "explanation": "SUBORDINATION makes one clause DEPENDENT on another using SUBORDINATORS. Main Somali subordinators: Subordinators create DEPENDENCY relationships!",
        "examples": [
          {
            "somali": "MARKII = when",
            "english": "time"
          },
          {
            "somali": "HADII = if",
            "english": "condition"
          },
          {
            "somali": "SABABTOO AH = because",
            "english": "reason"
          },
          {
            "somali": "INAAN/INAAD/ETC. = that",
            "english": "purpose/result"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Main vs. Dependent Clauses",
        "explanation": "In subordination, you have TWO clauses: The main clause is the \"heart\"; dependent clauses ADD information!",
        "examples": [
          {
            "somali": "When you go + she will come",
            "english": "Complete thought: \"When you go, she will come\""
          },
          {
            "somali": "She will come + when you go",
            "english": "Same meaning, different order"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Combine using the given subordinator:",
          "options": [
            "Sababtoo ah way caafi, way socdeen.",
            "Markii aad tag, way imaan.",
            "arkiga-mo",
            "Way tag hadii aad rabo inay tag."
          ],
          "correctAnswer": "Markii aad tag, way imaan.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Subordinators LINK dependent to main clauses!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Relative Clauses — Describing Noun",
        "explanation": "A RELATIVE CLAUSE adds information about a NOUN. Pattern: [NOUN] + [RELATIVE MARKER] + [DESCRIPTIVE CLAUSE] Relative clauses describe WHICH ONE or ADD DETAILS about nouns!",
        "examples": [
          {
            "somali": "Basic noun: Gabar-ta",
            "english": "The girl"
          },
          {
            "somali": "Gabar-ta oo qurux",
            "english": "The girl who is beautiful"
          },
          {
            "somali": "Gabar-ta oo qurux ama way tag iskuulka",
            "english": "The girl who is beautiful and goes to school"
          },
          {
            "somali": "Gabar-ta oo qurux baa waxaan arki.",
            "english": "The girl WHO IS BEAUTIFUL is what I see."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Relative Clause Markers",
        "explanation": "Somali uses specific markers for relative clauses: OO is the most common relative marker!",
        "examples": [
          {
            "somali": "OO = who/which",
            "english": "most common"
          },
          {
            "somali": "Ninka oo qor xariif.",
            "english": "The man who writes letters."
          },
          {
            "somali": "Dugsi-ga oo wara caruur.",
            "english": "The school which has children."
          },
          {
            "somali": "Cuntada oo caasaladig.",
            "english": "The food which is rice."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Add relative clauses to describe each noun:  Gabar-ta (beautiful) → ?",
          "options": [
            "Iskuulka oo weyn.",
            "Ninka oo qor si deg-deg.",
            "Gabar-ta oo qurux.",
            "Iskuulka"
          ],
          "correctAnswer": "Gabar-ta oo qurux.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Relative clauses use OO to link noun to description!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Embedding Clauses — Multiple Level",
        "explanation": "EMBEDDED CLAUSES nest SMALLER clauses INSIDE LARGER ones. Simple example: Each embedding adds a LAYER OF MEANING!",
        "examples": [
          {
            "somali": "Level 1 (Main): Way imaan.",
            "english": "She will come."
          },
          {
            "somali": "Level 2 (add when): Markii aad tag, way imaan.",
            "english": "When you go, she will come."
          },
          {
            "somali": "Level 3 (add where): Markii aad tag iskuulka, way imaan.",
            "english": "When you go to school, she will come."
          },
          {
            "somali": "Level 4 (add who): Markii aad tag iskuulka oo macalim jira, way imaan.",
            "english": "When you go to school where there is a teacher, she will come."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Complex Embedding Example",
        "explanation": "Real Somali has RICH EMBEDDING: This is SOPHISTICATED, LAYERED Somali!",
        "examples": [
          {
            "somali": "Main: way cunay",
            "english": "she ate"
          },
          {
            "somali": "Relative on \"gabar\": oo qurux",
            "english": "who is beautiful"
          },
          {
            "somali": "Time: markii ay tag",
            "english": "when she went"
          },
          {
            "somali": "Locative: iskuulka oo waxbar jira",
            "english": "school where teaching is"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify the parts of this sentence:",
          "options": [
            "Relative on \"ninka\":",
            "Relative on \"gabar-ta\":",
            "Time clause:",
            "Main clause:"
          ],
          "correctAnswer": "Main clause:",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Embedded sentences have MULTIPLE LAYERS of meaning!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Complex Sente",
        "explanation": "Now see complex sentences in authentic dialogue: Complex sentences create NATURAL, FLOWING Somali!",
        "examples": [
          {
            "somali": "Ani waan tag iskuulka OO Fatima waad joog guriga.",
            "english": "I go to school AND Fatima stays home."
          },
          {
            "somali": "Markii aad tag, way imaan.",
            "english": "WHEN you go, she will come."
          },
          {
            "somali": "Ninka oo macalim baa waxaan arki.",
            "english": "The man WHO IS A TEACHER is what I see."
          },
          {
            "somali": "Markii ninka oo macalim timid iskuulka, way cunay cuntada.",
            "english": "WHEN the man who is a teacher came to school, she ate food."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose the structure that fits the meaning:",
          "options": [
            "Coordination",
            "Hadii xaali",
            "Relative clause",
            "Subordination"
          ],
          "correctAnswer": "Coordination",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Choose structure based on RELATIONSHIP between ideas!"
        }
      },
      {
        "type": "summary",
        "title": "You learned Complex Sentences!",
        "takeaways": [
          "COORDINATION: Join EQUAL clauses with OO, LAAKIIN, HADII KALE, AMI",
          "Ani waan tag OO adiga waad joog. (I go AND you stay.)",
          "SUBORDINATION: Make clauses DEPENDENT with MARKII, HADII, SABABTOO AH, INAAN",
          "Markii aad tag, way imaan. (When you go, she comes.)",
          "RELATIVE CLAUSES: Describe NOUNS with OO",
          "Gabar-ta oo qurux. (The girl who is beautiful.)"
        ]
      }
    ]
  },
  15: {
    "lessonId": 15,
    "title": "Negation",
    "cards": [
      {
        "type": "intro",
        "title": "Negation",
        "bullets": [
          "Form negative statements using MA and other negators",
          "Negate verbs in past, present, and future tenses",
          "Recognize how negation changes verb forms",
          "Use double negatives (standard in Somali)",
          "Create negative imperatives and questions",
          "Express indefinites with negation (nobody, nothing, never)"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Negation in Act",
        "explanation": "Notice how negation CHANGES the sentence: Notice: Negation TRANSFORMS the verb form!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani ma tag.",
            "english": "I don't go."
          },
          {
            "somali": "Gabar-ta way cunay cuntada.",
            "english": "The girl ate the food."
          },
          {
            "somali": "Gabar-ta ma cunin cuntada.",
            "english": "The girl didn't eat the food."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Negation Particle MA",
        "explanation": "MA is the primary NEGATION PARTICLE in Somali. Key properties of MA: Basic pattern: MA is like an ERASER for the agreement marker!",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Ani ma tag.",
            "english": "I don't go."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Present Tense Negation",
        "explanation": "PRESENT NEGATION uses the infinitive form: Present negation: subject + ma + INFINITIVE",
        "examples": [
          {
            "somali": "Ani waan tag.",
            "english": "I go."
          },
          {
            "somali": "Isagu wuu arki.",
            "english": "He sees."
          },
          {
            "somali": "Way cun.",
            "english": "She eats."
          },
          {
            "somali": "Ani ma tag.",
            "english": "I don't go. — infinitive"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Past Tense Negation",
        "explanation": "PAST NEGATION uses a DIFFERENT verb form (often infinitive or special past negative): Past negation: subject + ma + special negative form (-n often added)",
        "examples": [
          {
            "somali": "Ani waan tagay.",
            "english": "I went."
          },
          {
            "somali": "Gabar-ta way cunay.",
            "english": "The girl ate."
          },
          {
            "somali": "Wiil-ka wuu arkay.",
            "english": "The boy saw."
          },
          {
            "somali": "Ani ma tagin.",
            "english": "I didn't go. — special form"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Future Tense Negation",
        "explanation": "FUTURE NEGATION uses MA + special future negative forms: Future negation: subject + ma + infinitive + negative future marker",
        "examples": [
          {
            "somali": "Ani waan tagi doonaa.",
            "english": "I will go."
          },
          {
            "somali": "Gabar-ta way cuni doontaa.",
            "english": "The girl will eat."
          },
          {
            "somali": "Wiil-ka wuu arkin donaa.",
            "english": "The boy will see."
          },
          {
            "somali": "Ani ma tagi doona.",
            "english": "I won't go. — future marker changed"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form negative future sentences:  Ani waan tagi doonaa. (I will go.) → ?",
          "options": [
            "Wuu ma arkin donaa.",
            "Wuu qor si deg-deg.",
            "Ani ma tagi doona.",
            "Way ma cuni doontaa."
          ],
          "correctAnswer": "Ani ma tagi doona.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Future negation changes the auxiliary marker!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Negation Summary by Tense",
        "explanation": "Negation changes EVERYTHING about the verb structure!",
        "examples": [
          {
            "somali": "Tense",
            "english": "Positive Form"
          },
          {
            "somali": "Present",
            "english": "waan tag"
          },
          {
            "somali": "Past",
            "english": "waan tagay"
          },
          {
            "somali": "Future",
            "english": "waan tagi doonaa"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Negative Imperatives",
        "explanation": "Negative IMPERATIVES (commands not to do something) use HA: Negative imperatives use HA instead of MA!",
        "examples": [
          {
            "somali": "Tag!",
            "english": "Go!"
          },
          {
            "somali": "Cun!",
            "english": "Eat!"
          },
          {
            "somali": "Arki!",
            "english": "See!"
          },
          {
            "somali": "Ha tagin!",
            "english": "Don't go!"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form negative commands:  Tag! (Go!) → ?",
          "options": [
            "qorin",
            "tagin",
            "cunin",
            "arkin"
          ],
          "correctAnswer": "tagin",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Negative imperatives use HA + infinitive + -n!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Double Negatives in Somali",
        "explanation": "Somali USES DOUBLE NEGATIVES as standard, unlike English! Somali LOVES double negatives for EMPHASIS!",
        "examples": [
          {
            "somali": "Kuma arki wax midna.",
            "english": "I don't see nothing = I see nothing = correct!"
          },
          {
            "somali": "Ma arkimo hadii cidina.",
            "english": "I don't see if nobody = correct!"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Common Double Negative Patterns",
        "explanation": "SOMALI DOUBLE NEGATIVES: Double negatives are STANDARD, NOT WRONG!",
        "examples": [
          {
            "somali": "Ma jira wax midna.",
            "english": "Nothing exists. — literally \"there is not anything\""
          },
          {
            "somali": "Ma tagi karno.",
            "english": "We won't go. — double emphasis"
          },
          {
            "somali": "Ma arkimo cidina.",
            "english": "I don't see nobody = I see nobody."
          },
          {
            "somali": "Cidina ma jira.",
            "english": "Nobody doesn't exist = nobody is here. — double negative for emphasis"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Translate these double negatives (understanding them as Somali-correct):  Ma arkimo cidina. → ?",
          "options": [
            "Ma arkimo cidina.",
            "Marno ma tagi karno.",
            "Waxna ma jira.",
            "Caruurta jira dugsi-ga."
          ],
          "correctAnswer": "Ma arkimo cidina.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Somali double negatives are CORRECT and COMMON!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Indefinites with Negation",
        "explanation": "Negation affects indefinite pronouns: Negation TRANSFORMS indefinites!",
        "examples": [
          {
            "somali": "Cidna",
            "english": "anyone, somebody"
          },
          {
            "somali": "Wax",
            "english": "something, anything"
          },
          {
            "somali": "Mar",
            "english": "sometimes, ever"
          },
          {
            "somali": "Cidina",
            "english": "nobody, no one"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose the correct indefinite:",
          "options": [
            "marno",
            "shan-aad",
            "kan",
            "cidina"
          ],
          "correctAnswer": "cidina",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Different indefinites for different situations!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Negation in U",
        "explanation": "Now see negation in authentic dialogue: Negation creates OPPOSITION and EMPHASIS!",
        "examples": [
          {
            "somali": "Ani waan tag iskuulka.",
            "english": "I go to school."
          },
          {
            "somali": "Walaaca, ma tag!",
            "english": "Friend, you don't go!"
          },
          {
            "somali": "Ma tagin karaa?",
            "english": "Don't you go?"
          },
          {
            "somali": "Cidina ma tag, waxna ma cuno.",
            "english": "Nobody goes, nothing is eaten — emphasis!"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Negation!",
        "takeaways": [
          "MA NEGATION: Present and past tenses",
          "Ani ma tag (I don't go)",
          "Ani ma tagin (I didn't go)",
          "FUTURE NEGATION: Future markers change",
          "Ani ma tagi doona (I won't go)",
          "HA IMPERATIVES: Commands not to do something"
        ]
      }
    ]
  },
  16: {
    "lessonId": 16,
    "title": "Questions & Interrogatives",
    "cards": [
      {
        "type": "intro",
        "title": "Questions & Interrogatives",
        "bullets": [
          "Ask yes/no questions using word order and particles",
          "Form wh-questions (who, what, where, when, why, how)",
          "Use interrogative words correctly",
          "Embed questions within larger sentences",
          "Recognize question particles and intonation patterns",
          "Answer questions appropriately"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Questions in Ac",
        "explanation": "Notice the different question types: Notice: Questions use SPECIFIC WORDS and PATTERNS!",
        "examples": [
          {
            "somali": "Aad tag iskuulka?",
            "english": "Do you go to school?"
          },
          {
            "somali": "Response: Haa, waan tag.",
            "english": "Yes, I go."
          },
          {
            "somali": "Waa maxay?",
            "english": "What is it?"
          },
          {
            "somali": "Response: Waa xariif.",
            "english": "It's a letter."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Two Types of Questions",
        "explanation": "Somali has TWO main question types: Each type has DIFFERENT STRUCTURES!"
      },
      {
        "type": "teach",
        "conceptBadge": "Yes/No Questions",
        "explanation": "YES/NO QUESTIONS change WORD ORDER or use QUESTION PARTICLES. Pattern 1: Simple inversion (verb before subject): Question particle MIY- marks yes/no questions!",
        "examples": [
          {
            "somali": "Aad tag iskuulka.",
            "english": "You go to school. — statement"
          },
          {
            "somali": "Tag iskuulka?",
            "english": "Do you go to school? — question"
          },
          {
            "somali": "Aad tag iskuulka?",
            "english": "Are you going to school?"
          },
          {
            "somali": "Miyaad tag iskuulka?",
            "english": "Do you go to school? — with question particle"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Question Particles for Yes/No",
        "explanation": "MIY- is the PRIMARY yes/no question particle: MIY- replaces or combines with the agreement marker!",
        "examples": [
          {
            "somali": "Isagu wuu tag iskuulka.",
            "english": "He goes to school."
          },
          {
            "somali": "Miyuu tag iskuulka?",
            "english": "Does he go to school?"
          },
          {
            "somali": "Miyad tag?",
            "english": "Are you going?"
          },
          {
            "somali": "Miyay tag?",
            "english": "Is she going?"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Convert statements to yes/no questions using MIY-:  Ani waan tag. (I go.) → ?",
          "options": [
            "Miyaan tag?",
            "Miyuu arki?",
            "Miyay cunay?",
            "\"He TAG to school.\""
          ],
          "correctAnswer": "Miyaan tag?",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "MIY- combines with subject and agreement markers!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Wh-Questions — Information Questio",
        "explanation": "WH-QUESTIONS ask for SPECIFIC INFORMATION: who, what, where, when, why, how Main interrogatives in Somali: Each interrogative has its OWN POSITION in the sentence!",
        "examples": [
          {
            "somali": "Question",
            "english": "Interrogative"
          },
          {
            "somali": "Who?",
            "english": "Yuu / Yay"
          },
          {
            "somali": "What?",
            "english": "Waa maxay?"
          },
          {
            "somali": "Where?",
            "english": "Halkee?"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Interrogative YUU/YAY (Who?)",
        "explanation": "YUU/YAY is the interrogative for \"who\": YUU/YAY replace the subject!",
        "examples": [
          {
            "somali": "Yuu = who",
            "english": "masculine subject"
          },
          {
            "somali": "Yay = who",
            "english": "feminine subject"
          },
          {
            "somali": "Yuu tag?",
            "english": "Who went? — masculine"
          },
          {
            "somali": "Yay cunay?",
            "english": "Who ate? — feminine"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Interrogative WAA MAXAY (What?",
        "explanation": "WAA MAXAY is the interrogative for \"what\": WAA MAXAY asks about IDENTITY or NATURE!",
        "examples": [
          {
            "somali": "Waa maxay?",
            "english": "What is it? — general"
          },
          {
            "somali": "Waa maxay xariif-ka?",
            "english": "What is the letter? — what about the letter?"
          },
          {
            "somali": "Waxaan cunaya waa maxay?",
            "english": "What am I eating?"
          },
          {
            "somali": "Waa xariif.",
            "english": "It's a letter."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Interrogative HALKEE (Where?)",
        "explanation": "HALKEE is the interrogative for \"where\": HALKEE asks about LOCATION!",
        "examples": [
          {
            "somali": "Halkee buu joog?",
            "english": "Where does he stay?"
          },
          {
            "somali": "Halkee way socdeen?",
            "english": "Where did they go?"
          },
          {
            "somali": "Halkee baa xariif-ka?",
            "english": "Where is the letter?"
          },
          {
            "somali": "Guriga.",
            "english": "At home."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form wh-questions using the given interrogative:",
          "options": [
            "Waa maxay baa guriga?",
            "Halkee buu joog?",
            "niman waaweyn",
            "Yuu qoray xariif-ka?"
          ],
          "correctAnswer": "Yuu qoray xariif-ka?",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Wh-interrogatives have specific positions in sentences!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Questions About Time and Manner",
        "explanation": "GORMEE (when) and SIDEE (how) ask about time and manner: GORMEE and SIDEE add TEMPORAL and MODAL information!",
        "examples": [
          {
            "somali": "Gormee way imaan?",
            "english": "When will she come?"
          },
          {
            "somali": "Gormee buu timid?",
            "english": "When did he come?"
          },
          {
            "somali": "Sidee buu qor?",
            "english": "How does he write?"
          },
          {
            "somali": "Sidee bay socdeen?",
            "english": "How did they go?"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form questions about time and manner:",
          "options": [
            "Gormee way imaan?",
            "isagu wuu cunay",
            "Gabar-taas",
            "Sidee buu qor?"
          ],
          "correctAnswer": "Gormee way imaan?",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Time and manner questions follow wh-question patterns!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Embedded Questions",
        "explanation": "EMBEDDED QUESTIONS are questions WITHIN larger sentences: Embedded questions add a LAYER of meaning!",
        "examples": [
          {
            "somali": "Yuu tag?",
            "english": "Who went?"
          },
          {
            "somali": "Waxaan doon inaan ogaado yuu tag.",
            "english": "I want to know who went."
          },
          {
            "somali": "Halkee buu joog?",
            "english": "Where is he staying?"
          },
          {
            "somali": "Su'aasha waad jeclid halkee buu joog?",
            "english": "Don't you like the question where is he staying?"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Embed the question within the larger sentence:",
          "options": [
            "Macalimka waxuu su'aali waa maxay.",
            "Waxaan doon inaan ogaado yuu tag.",
            "dhex",
            "SAA-kin"
          ],
          "correctAnswer": "Waxaan doon inaan ogaado yuu tag.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Embedded questions preserve wh-word position!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Questions in ",
        "explanation": "Now see questions in authentic dialogue: Questions drive CONVERSATION and INTERACTION!",
        "examples": [
          {
            "somali": "Miyaad tag iskuulka?",
            "english": "Do you go to school?"
          },
          {
            "somali": "Yuu tag?",
            "english": "Who went?"
          },
          {
            "somali": "Waa maxay xariif-ka?",
            "english": "What is the letter?"
          },
          {
            "somali": "Halkee buu joog?",
            "english": "Where does he stay?"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Questions & Interrogatives!",
        "takeaways": [
          "YES/NO QUESTIONS: Use MIY- particle",
          "Miyaad tag? (Do you go?)",
          "WHO QUESTIONS: Use YUU/YAY",
          "Yuu tag? (Who went?)",
          "WHAT QUESTIONS: Use WAA MAXAY",
          "Waa maxay? (What is it?)"
        ]
      }
    ]
  },
  17: {
    "lessonId": 17,
    "title": "Conjunctions & Discourse",
    "cards": [
      {
        "type": "intro",
        "title": "Conjunctions & Discourse",
        "bullets": [
          "Use coordinating conjunctions to link equal ideas",
          "Use subordinating conjunctions to link dependent ideas",
          "Recognize discourse markers that signal relationships",
          "Build coherent discourse (connected speech)",
          "Understand when to use each type of connector",
          "Create natural-sounding Somali dialogue"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Conjunctions in",
        "explanation": "Notice how ideas are CONNECTED: Notice: Conjunctions CREATE CONNECTIONS and FLOW!",
        "examples": [
          {
            "somali": "Ani waan tag iskuulka OO adiga waad joog guriga.",
            "english": "I go to school AND you stay home. — equal ideas"
          },
          {
            "somali": "MARKII ani tag iskuulka, way imaan.",
            "english": "WHEN I go to school, she will come. — dependent"
          },
          {
            "somali": "Markaa buu tag iskuulka oo way socdeen suuqa.",
            "english": "THEN he went to school AND they went to the market. — sequence"
          },
          {
            "somali": "Ani waan tag iskuulka LAAKIIN adiga ma tagi karaa.",
            "english": "I go to school BUT you can't go. — contrast"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Three Types of Connectors",
        "explanation": "SOMALI has three types of words that connect ideas: Each type serves DIFFERENT PURPOSES!"
      },
      {
        "type": "teach",
        "conceptBadge": "Coordinating Conjunctions",
        "explanation": "Coordinating conjunctions link EQUAL ideas (you learned these in Module 14!): Coordinating conjunctions preserve both clauses' independence!",
        "examples": [
          {
            "somali": "Ani waan tag OO adiga waad joog.",
            "english": "I go AND you stay. — both equally important"
          },
          {
            "somali": "Gabar-ta way cunay LAAKIIN wiil-ka ma cunin.",
            "english": "The girl ate BUT the boy didn't. — contrast"
          },
          {
            "somali": "Way tagi doonaan iskuulka AMI guriga.",
            "english": "They will go to school OR home. — choice"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Subordinating Conjunctions",
        "explanation": "Subordinating conjunctions create DEPENDENCY (you learned these in Module 14!): Subordinating conjunctions create UNEQUAL relationships!",
        "examples": [
          {
            "somali": "INAAN/INAAD = that",
            "english": "purpose"
          },
          {
            "somali": "MARKII aad tag, way imaan.",
            "english": "WHEN you go, she will come. — time dependent"
          },
          {
            "somali": "HADII uu jiro, buu imaan.",
            "english": "IF he exists, he will come. — conditional"
          },
          {
            "somali": "SABABTOO AH way caafi, way socdeen.",
            "english": "BECAUSE she was well, they walked. — reason"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Discourse Markers — Building Coher",
        "explanation": "DISCOURSE MARKERS signal RELATIONSHIPS between sentences and ideas: Discourse markers keep conversation FLOWING and COHERENT!",
        "examples": [
          {
            "somali": "Marker",
            "english": "Meaning"
          },
          {
            "somali": "MARKAA",
            "english": "then, so"
          },
          {
            "somali": "WALAACANA",
            "english": "so, therefore"
          },
          {
            "somali": "TANA",
            "english": "now, at this point"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Building Coherent Discourse",
        "explanation": "Discourse markers CONNECT separate sentences into a cohesive NARRATIVE: Discourse markers make speech NATURAL and CONNECTED!",
        "examples": [
          {
            "somali": "Ani waan tag iskuulka. Way imaan. Way cunay. Way socdeen suuqa.",
            "english": "I went to school. She came. She ate. They went to the market. — disconnected"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Add appropriate discourse markers to make the narrative coherent:",
          "options": [
            "Way socdatay si deg-deg.",
            "Markaa",
            "qoraal",
            "jooj"
          ],
          "correctAnswer": "Markaa",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Discourse markers create FLOW and CONNECTION!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Comparing Subordination vs. Discou",
        "explanation": "Don't confuse SUBORDINATION with DISCOURSE MARKERS: Discourse markers are the RHYTHM of natural speech!",
        "examples": [
          {
            "somali": "Markii ani tag iskuulka, way imaan.",
            "english": "When I went to school, she came. — one complex sentence"
          },
          {
            "somali": "Ani waan tag iskuulka. Markaa way imaan.",
            "english": "I went to school. Then she came. — two sentences linked"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify whether each is COORDINATION, SUBORDINATION, or DISCOURSE MARKER:  Ani waan tag OO adiga waad joog. → ?",
          "options": [
            "Discourse Marker",
            "Subordination",
            "Coordination",
            "Waxaan doon inaan tago."
          ],
          "correctAnswer": "Coordination",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Each connector type has DIFFERENT FUNCTION!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Conjunctions ",
        "explanation": "Now see all three connector types together: Mixing all three creates NATURAL, SOPHISTICATED Somali!",
        "examples": [
          {
            "somali": "Ani waan tag iskuulka OO macalimka baa baro.",
            "english": "I go to school AND the teacher teaches. — coordination"
          },
          {
            "somali": "Markii aad tag iskuulka, way imaan.",
            "english": "When you go to school, she will come. — subordination"
          },
          {
            "somali": "Way imaan markaa. Walaacana way cunay cuntada.",
            "english": "She came then. So she ate the food. — discourse marker"
          },
          {
            "somali": "Tana way socdeen suuqa LAAKIIN ma arkimo cidina.",
            "english": "Now they went to the market BUT I didn't see anybody. — mixed"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Conjunctions & Discourse!",
        "takeaways": [
          "COORDINATING CONJUNCTIONS: Link equal ideas",
          "OO (and), LAAKIIN (but), HADII KALE (otherwise), AMI (or)",
          "SUBORDINATING CONJUNCTIONS: Create dependent clauses",
          "MARKII (when), HADII (if), SABABTOO AH (because), INTAAD (while)",
          "DISCOURSE MARKERS: Signal relationships between sentences",
          "MARKAA (then), WALAACANA (so/therefore), TANA (now), SIDAAS (like that)"
        ]
      }
    ]
  },
  18: {
    "lessonId": 18,
    "title": "Adverbs",
    "cards": [
      {
        "type": "intro",
        "title": "Adverbs",
        "bullets": [
          "Understand what adverbs are and their functions",
          "Recognize different types of adverbs (manner, time, place, frequency)",
          "Form and use adverbs correctly in sentences",
          "Position adverbs in the correct places",
          "Distinguish adverbs from adjectives and other parts of speech",
          "Apply adverbs for precision and detail"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Adverbs in Acti",
        "explanation": "Notice how adverbs DESCRIBE the manner, time, and place of actions: Notice: Adverbs MODIFY VERBS and make meaning MORE PRECISE!",
        "examples": [
          {
            "somali": "Way socdatay si deg-deg.",
            "english": "She walked quickly."
          },
          {
            "somali": "Wuu qor si deg-deg.",
            "english": "He writes carefully."
          },
          {
            "somali": "Hadda way imaan.",
            "english": "She comes now."
          },
          {
            "somali": "Mara jeerkan buu tag.",
            "english": "This time he goes."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Are Adverbs?",
        "explanation": "ADVERBS are words that MODIFY VERBS, ADJECTIVES, or OTHER ADVERBS. They answer questions: Adverbs usually come AFTER the verb (unlike English)!"
      },
      {
        "type": "teach",
        "conceptBadge": "Adverbs of Manner",
        "explanation": "MANNER adverbs describe HOW an action is performed: Manner = SI + ADJECTIVE pattern!",
        "examples": [
          {
            "somali": "Way socdatay si deg-deg.",
            "english": "She walked quickly."
          },
          {
            "somali": "Wuu qor si qurux.",
            "english": "He writes beautifully."
          },
          {
            "somali": "Way cunay si cadhis.",
            "english": "She ate angrily — with anger"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create manner adverbs and use them in sentences:  SI + deg-deg (quickly) → ?",
          "options": [
            "Way imaan si xasil.",
            "Inaagu",
            "Way socdatay si deg-deg.",
            "Wuu qor si qurux."
          ],
          "correctAnswer": "Way socdatay si deg-deg.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Manner uses SI + adjective formula!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Adverbs of Time",
        "explanation": "TIME adverbs describe WHEN an action happens: Time adverbs show WHEN actions occur!",
        "examples": [
          {
            "somali": "Hadda way imaan.",
            "english": "She comes now."
          },
          {
            "somali": "Berri buu tag iskuulka.",
            "english": "Tomorrow he goes to school."
          },
          {
            "somali": "Habaa dhan way cunay cuntada.",
            "english": "She always ate food."
          },
          {
            "somali": "Marjoga ma tag.",
            "english": "He never goes."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Use time adverbs in sentences:",
          "options": [
            "Mogadishu",
            "Way imaan hadda.",
            "Wuu tag iskuulka berri.",
            "Way cunay cuntada habaa dhan."
          ],
          "correctAnswer": "Way imaan hadda.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Time adverbs come after the verb!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Adverbs of Place",
        "explanation": "PLACE adverbs describe WHERE an action happens: Place adverbs show LOCATION!",
        "examples": [
          {
            "somali": "Wuu joog guriga.",
            "english": "He stays at home."
          },
          {
            "somali": "Way socdeen suuqa.",
            "english": "They went to the market."
          },
          {
            "somali": "Halkan baa ay jiraan.",
            "english": "They are here."
          },
          {
            "somali": "Buu tag ku iskuulka.",
            "english": "He went toward school."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Use place adverbs in sentences:",
          "options": [
            "Wuu joog guriga.",
            "Way socdeen suuqa.",
            "Miyaad tag iskuulka?",
            "wuu"
          ],
          "correctAnswer": "Wuu joog guriga.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Place adverbs indicate LOCATION!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Adverbs of Frequency",
        "explanation": "FREQUENCY adverbs describe HOW OFTEN an action happens: Frequency adverbs show REPETITION and REGULARITY!",
        "examples": [
          {
            "somali": "Waligeed = never",
            "english": "ever"
          },
          {
            "somali": "Way cunaa habaa dhan.",
            "english": "She always eats."
          },
          {
            "somali": "Wuu tag marmar.",
            "english": "He sometimes goes."
          },
          {
            "somali": "Marjoga ma arkis.",
            "english": "He never sees."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Use frequency adverbs in sentences:",
          "options": [
            "Wuu tag iskuulka marmar.",
            "Ma arkis marjoga.",
            "Way imaan si xasil.",
            "Way cunay cuntada habaa dhan."
          ],
          "correctAnswer": "Way cunay cuntada habaa dhan.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Frequency shows HOW OFTEN!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Adverbs vs. Adjectives",
        "explanation": "Don't confuse ADVERBS with ADJECTIVES: Different functions, different placement!",
        "examples": [
          {
            "somali": "Gabar-ta oo qurux.",
            "english": "The beautiful girl."
          },
          {
            "somali": "Xariif-ka oo weyn.",
            "english": "The big letter."
          },
          {
            "somali": "Way socdatay si qurux.",
            "english": "She walked beautifully. — how she walked"
          },
          {
            "somali": "Wuu qor si weyn.",
            "english": "He writes in a big way. — modifying the verb"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Dialogue Revisited — Adverbs in Us",
        "explanation": "Now see adverbs in authentic dialogue: Adverbs layer PRECISION onto actions!",
        "examples": [
          {
            "somali": "Way socdatay si deg-deg iskuulka guriga.",
            "english": "She walked quickly from home to school. — manner + place"
          },
          {
            "somali": "Hadda wuu joog guriga.",
            "english": "Now he is staying at home. — time + place"
          },
          {
            "somali": "Way cunay cuntada habaa dhan berri.",
            "english": "She always ate food tomorrow. — frequency + time"
          },
          {
            "somali": "Marjoga buu tag iskuulka marmar.",
            "english": "He never goes to school sometimes. — frequency contradiction for emphasis"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Adverbs!",
        "takeaways": [
          "MANNER: SI + adjective (si deg-deg = quickly)",
          "TIME: Hadda (now), berri (tomorrow), jiro (yesterday)",
          "PLACE: Guriga (home), suuqa (market), iskuulka (school)",
          "FREQUENCY: Habaa dhan (always), marjoga (never), marmar (sometimes)",
          "POSITION: Adverbs usually come AFTER the verb",
          "FUNCTION: Modify verbs and add PRECISION and TEXTURE"
        ]
      }
    ]
  },
  19: {
    "lessonId": 19,
    "title": "Copular & Existential",
    "cards": [
      {
        "type": "intro",
        "title": "Copular & Existential",
        "bullets": [
          "Understand copular verbs (linking \"to be\")",
          "Distinguish between identity, predication, and existence",
          "Form copular sentences with tahay, waa, noqon",
          "Express existence with jira",
          "Use existential negation correctly",
          "Apply copulars in context for identification and description"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Copular Verbs i",
        "explanation": "Notice the different WAYS TO SAY \"IS\": Notice: DIFFERENT COPULAS for DIFFERENT MEANINGS!",
        "examples": [
          {
            "somali": "Waa macalim.",
            "english": "He is a teacher."
          },
          {
            "somali": "Magacaygu waa Fatima.",
            "english": "My name is Fatima."
          },
          {
            "somali": "Gabar-ta way qurux.",
            "english": "The girl is beautiful."
          },
          {
            "somali": "Wiil-ka wuu cariin.",
            "english": "The boy is strong."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Types of Copular Verbs",
        "explanation": "SOMALI HAS THREE MAIN COPULAR VERBS: Each has SPECIFIC uses and DIFFERENT CONJUGATION patterns!",
        "examples": [
          {
            "somali": "Copula",
            "english": "Meaning"
          },
          {
            "somali": "WAA",
            "english": "is (identification)"
          },
          {
            "somali": "TAHAY",
            "english": "am/is/are (state)"
          },
          {
            "somali": "NOQON",
            "english": "become (change)"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Copula WAA (Identity/Definitio",
        "explanation": "WAA is used to IDENTIFY or DEFINE what something IS: WAA = DEFINITION and IDENTIFICATION!",
        "examples": [
          {
            "somali": "Waa macalim.",
            "english": "He/She is a teacher. — what is he/she?"
          },
          {
            "somali": "Magacaygu waa Ahmed.",
            "english": "My name is Ahmed. — what is my name?"
          },
          {
            "somali": "Taas waa duul.",
            "english": "That is a lie. — what is that?"
          },
          {
            "somali": "Waxaan ahaa xoolo-dheer.",
            "english": "I was a tall one = I was tall. — state"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Copula TAHAY (State/Condition)",
        "explanation": "TAHAY is used for STATES, CONDITIONS, and QUALITIES: TAHAY = CONDITION and QUALITY!",
        "examples": [
          {
            "somali": "Gabar-ta way qurux tahay.",
            "english": "The girl is beautiful. — state of being"
          },
          {
            "somali": "Wiil-ka wuu cariin tahay.",
            "english": "The boy is strong. — state"
          },
          {
            "somali": "Way caafi tahay.",
            "english": "She is well. — state of health"
          },
          {
            "somali": "Wuu bogad tahay.",
            "english": "He is tired. — state"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Choose WAA (identity) or TAHAY (state):  \"She is a teacher.\" → ?",
          "options": [
            "Way qurux TAHAY.",
            "Wuu WAA ardii.",
            "laba",
            "Way WAA macallimad."
          ],
          "correctAnswer": "Way WAA macallimad.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "WAA for identity, TAHAY for state!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "The Copula NOQON (Becoming/Change)",
        "explanation": "NOQON expresses CHANGE or BECOMING: NOQON = CHANGE and BECOMING!",
        "examples": [
          {
            "somali": "Wuu noqon doona macalim.",
            "english": "He will become a teacher. — change"
          },
          {
            "somali": "Way noqon jirtay macallimad.",
            "english": "She became a teacher. — changed"
          },
          {
            "somali": "Wuu noqon donaa cariin.",
            "english": "He will become strong. — change over time"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "The Existential JIRA (Existence)",
        "explanation": "JIRA is used to express EXISTENCE or PRESENCE: JIRA = EXISTENCE and PRESENCE!",
        "examples": [
          {
            "somali": "Jira macalim dugsi-ga.",
            "english": "There is a teacher at school. — exists"
          },
          {
            "somali": "Jira caruur badan.",
            "english": "There are many children. — exist"
          },
          {
            "somali": "Ma jira cidina.",
            "english": "Nobody exists = There is nobody. — double negative"
          },
          {
            "somali": "Waxna ma jira.",
            "english": "Nothing doesn't exist = There's nothing. — emphasis"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form sentences using the given copula:",
          "options": [
            "Magacaygu waa Ahmed.",
            "Wiil-ka wuu noqon doona macalim.",
            "Caruurta jira dugsi-ga.",
            "Gabar-ta way qurux tahay."
          ],
          "correctAnswer": "Magacaygu waa Ahmed.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Each copula serves DIFFERENT PURPOSE!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Negation of Copular Verbs",
        "explanation": "Negating copular verbs follows similar patterns to regular verbs: Each copula's NEGATION has SPECIAL FORMS!",
        "examples": [
          {
            "somali": "Waa macalim.",
            "english": "He is a teacher."
          },
          {
            "somali": "Ma ahaa macalim.",
            "english": "He is not a teacher. — special form"
          },
          {
            "somali": "Way qurux tahay.",
            "english": "She is beautiful."
          },
          {
            "somali": "Ma qurux tahay.",
            "english": "She is not beautiful. — similar to regular verb negation"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form negative versions:  Waa macalim. → ?",
          "options": [
            "Ma qurux tahay.",
            "Ma ahaa macalim.",
            "daal",
            "Waxna jira = Ma jira cidina."
          ],
          "correctAnswer": "Ma ahaa macalim.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Copular negation requires learning special forms!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Predicate Nominatives (Noun + Copu",
        "explanation": "PREDICATE NOMINATIVES link two nouns: Predicate nominatives IDENTIFY one noun as another!",
        "examples": [
          {
            "somali": "Fatima waa macallimad.",
            "english": "Fatima is a teacher. — person + is + profession"
          },
          {
            "somali": "Taas waa duul.",
            "english": "That is a lie. — thing + is + quality"
          },
          {
            "somali": "Magacayga waa Ahmed.",
            "english": "My name is Ahmed. — thing + is + name"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Copular & Existential!",
        "takeaways": [
          "WAA: Identity and definition",
          "Waa macalim. (He is a teacher.)",
          "TAHAY: States, conditions, qualities",
          "Way qurux tahay. (She is beautiful.)",
          "NOQON: Change and becoming",
          "Way noqon doontaa macallimad. (She will become a teacher.)"
        ]
      }
    ]
  },
  20: {
    "lessonId": 20,
    "title": "Special Topics (Advanced Agreement, Focus, Topicalization)",
    "cards": [
      {
        "type": "intro",
        "title": "Special Topics (Advanced Agreement, Focus, Topicalization)",
        "bullets": [
          "Understand advanced agreement patterns",
          "Use focus and emphasis strategically",
          "Recognize topicalization and its effects",
          "Distinguish formal vs. informal registers",
          "Apply these techniques for sophisticated speech",
          "Navigate style and register choices"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Advanced Agreement Patterns",
        "explanation": "Complex sentences require AGREEMENT across multiple elements: Advanced agreement = precision across ALL elements!",
        "examples": [
          {
            "somali": "Basic agreement: Gabar-ta (feminine singular) + way (3sg fem) + cunaysay",
            "english": "fem sing"
          },
          {
            "somali": "Gabar-ta (fem sing) + way (3sg fem) + cunaysay (fem sing) + cuntada",
            "english": "fem sing def"
          },
          {
            "somali": "Gabar-ta oo qurux",
            "english": "agreement on both"
          },
          {
            "somali": "Gabar weyn oo qurux",
            "english": "gabar = fem, but can be used generically"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Focus Strategies Beyond BAA",
        "explanation": "You learned BAA for focus (Module 13), but Somali has MORE focus strategies: Focus strategies create DIFFERENT LEVELS of EMPHASIS!",
        "examples": [
          {
            "somali": "Ani WAA ay tag.",
            "english": "It is I who went. — me, not someone else"
          },
          {
            "somali": "Gabar-ta BAA BAA cunaysay.",
            "english": "The girl REALLY was eating. — double BAA for emphasis"
          },
          {
            "somali": "Cuntada gabar-ta cunaysay.",
            "english": "The food, the girl was eating it. — topicalization"
          },
          {
            "somali": "Gabar-ta oo cunaysay cuntada baa ah.",
            "english": "The girl who was eating the food is what it is. — complex focus"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Topicalization — Making Sentences ",
        "explanation": "TOPICALIZATION moves a topic to the FRONT for emphasis: Topicalization = telling what the sentence is ABOUT!",
        "examples": [
          {
            "somali": "Gabar-ta way cunay cuntada.",
            "english": "The girl ate food. — neutral"
          },
          {
            "somali": "Gabar-ta, way cunay cuntada.",
            "english": "The girl, she ate food. — about the girl"
          },
          {
            "somali": "Cuntada, gabar-ta way cunaysay.",
            "english": "The food, the girl was eating it. — about the food"
          },
          {
            "somali": "Gabar-ta oo cunaysay, taas waa mesha ay joogato.",
            "english": "The girl who was eating, that's where she stays. — long topic"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Register and Style — Formal vs. In",
        "explanation": "Somali has FORMAL and INFORMAL registers: Native speakers CODE-SWITCH between registers!",
        "examples": [
          {
            "somali": "Magacaagu maxaa ah?",
            "english": "What is your name? — formal question"
          },
          {
            "somali": "Waxaan sugayaa hadda markaa.",
            "english": "I am waiting, then. — formal/literary"
          },
          {
            "somali": "Magacaagu waa maxay?",
            "english": "What's your name? — conversational"
          },
          {
            "somali": "Sugaya hadda.",
            "english": "Waiting now. — casual"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Identify the advanced technique in each sentence:  \"Cuntada baa gabar-ta cunaysay.\" → ?",
          "options": [
            "Technique: ____ Focus",
            "Topicalization"
          ],
          "correctAnswer": "Technique: ____ Focus",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Each technique SHIFTS MEANING subtly!"
        }
      },
      {
        "type": "summary",
        "title": "You learned Special Topics (Advanced Agreement, Focus, Topicalization)!",
        "takeaways": [
          "ADVANCED AGREEMENT: Multiple elements match gender/number/person",
          "FOCUS STRATEGIES: BAA, contrast, intensive double markers",
          "TOPICALIZATION: Moving elements to the front for emphasis",
          "REGISTER: Formal (literary) vs. informal (conversational)",
          "CODE-SWITCHING: Native speakers mix formal and informal"
        ]
      }
    ]
  },
  21: {
    "lessonId": 21,
    "title": "Derivational Morphology",
    "cards": [
      {
        "type": "intro",
        "title": "Derivational Morphology",
        "bullets": [
          "Understand how Somali creates new words from existing roots",
          "Recognize derivational suffixes and their functions",
          "Form agent nouns (one who does X)",
          "Form patient nouns (thing affected by X)",
          "Derive adjectives from nouns and verbs",
          "Expand vocabulary through morphological processes"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Opening Dialogue — Derivations in ",
        "explanation": "Notice how RELATED WORDS come from same ROOTS: Notice: ONE ROOT creates MANY RELATED WORDS!",
        "examples": [
          {
            "somali": "qor",
            "english": "write"
          },
          {
            "somali": "Qor = write",
            "english": "verb"
          },
          {
            "somali": "Qore = writer",
            "english": "agent noun"
          },
          {
            "somali": "Qoraal = writing/manuscript",
            "english": "patient noun"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What Is Derivational Morphology?",
        "explanation": "DERIVATIONAL MORPHOLOGY is how Somali CREATES NEW WORDS from existing roots and stems. Three main processes: Suffixes are the KEY — adding suffixes changes MEANING and PART OF SPEECH!"
      },
      {
        "type": "teach",
        "conceptBadge": "Agent Nouns — \"One Who Does X\"",
        "explanation": "AGENT NOUN SUFFIXES create words for people who do actions: Agent suffixes PERSONIFY actions!",
        "examples": [
          {
            "somali": "Qore-ta baa xariif-ka qorya.",
            "english": "The writer writes the letter."
          },
          {
            "somali": "Cunay-da baa cuntada cunaysay.",
            "english": "The eater was eating food."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form agent nouns (one who does X) from these verbs:  arki (see) → ?",
          "options": [
            "macquul-ka",
            "arki-ye",
            "socod-ka",
            "bar-e"
          ],
          "correctAnswer": "arki-ye",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Agent nouns add -E, -OOL, or -KA to the verb!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Patient Nouns — \"Thing That Is X-e",
        "explanation": "PATIENT NOUN SUFFIXES create words for things affected by actions: Patient suffixes OBJECTIFY actions!",
        "examples": [
          {
            "somali": "Qoraal = writing/manuscript/script",
            "english": "thing written"
          },
          {
            "somali": "Cuntada = food",
            "english": "thing eaten"
          },
          {
            "somali": "Carood = plantation",
            "english": "place planted"
          },
          {
            "somali": "Qoraal-ka baa xariif-ka.",
            "english": "The manuscript is the letter."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form patient nouns (thing that is X-ed) from these verbs:  qor (write) → ?",
          "options": [
            "qoraal",
            "carood",
            "dhaqin",
            "magaalo"
          ],
          "correctAnswer": "qoraal",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Patient nouns add -AAL, -OD, or -ID to the verb!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Abstract Nouns — States and Action",
        "explanation": "ABSTRACT NOUN SUFFIXES create nouns for states, actions, and qualities: Abstract suffixes NOMINALIZE VERBS into concepts!",
        "examples": [
          {
            "somali": "Cunasho = eating",
            "english": "the action of eating"
          },
          {
            "somali": "Baramo = teaching",
            "english": "the action"
          },
          {
            "somali": "Caafimad = wellness",
            "english": "the state"
          },
          {
            "somali": "Cunasho-da baa necebtay.",
            "english": "The eating was tasty."
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Form abstract nouns from these verbs:  socod (walk) → ?",
          "options": [
            "arkiga-mo",
            "jooga-sho",
            "saal",
            "socdaa-sho"
          ],
          "correctAnswer": "socdaa-sho",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Abstract nouns add -ASHO, -AMO, or -NAG to verbs!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Derived Adjectives",
        "explanation": "DERIVED ADJECTIVES are created from nouns using specific patterns: Derived adjectives EXPAND DESCRIPTIVE VOCABULARY!",
        "examples": [
          {
            "somali": "Cariin = strong",
            "english": "from caar = strength"
          },
          {
            "somali": "Qurux = beautiful",
            "english": "from qur = beauty"
          },
          {
            "somali": "Caafi = well",
            "english": "from caaf = wellness"
          },
          {
            "somali": "Baadi-bay = pastoral",
            "english": "from baad = pastoralism"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Diminutives and Augmentatives",
        "explanation": "DIMINUTIVE and AUGMENTATIVE SUFFIXES change the SIZE or INTENSITY: Size suffixes add NUANCE and DIMINISHMENT/ENLARGEMENT!",
        "examples": [
          {
            "somali": "Gabar-oog baa ciyaartay.",
            "english": "The little girl played."
          },
          {
            "somali": "Ninka weyn baa baro.",
            "english": "The big man teaches."
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Derivational Morphology!",
        "takeaways": [
          "AGENT NOUNS: -E, -OOL, -KA (one who does)",
          "Qore = writer, Socod-ka = walker",
          "PATIENT NOUNS: -AAL, -OD, -ID (thing affected)",
          "Qoraal = manuscript, Cuntada = food",
          "ABSTRACT NOUNS: -ASHO, -AMO (action/state)",
          "Cunasho = eating, Baramo = teaching"
        ]
      }
    ]
  },
  22: {
    "lessonId": 22,
    "title": "Lexicon & Semantic Fields",
    "cards": [
      {
        "type": "intro",
        "title": "Lexicon & Semantic Fields",
        "bullets": [
          "Learn 100+ core Somali words",
          "Recognize semantic fields (word families grouped by topic)",
          "Understand synonyms and subtle differences",
          "Use words in context",
          "Build vocabulary through semantic relationships",
          "Apply core vocabulary in conversation"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Core Semantic Fields",
        "explanation": "ESSENTIAL vocabulary organized by TOPIC: Semantic fields help you LEARN CLUSTERS of related words!"
      },
      {
        "type": "teach",
        "conceptBadge": "Family (Ilmaha) — Complete Network",
        "explanation": "FAMILY vocabulary is ESSENTIAL: Family words are HIGH FREQUENCY!",
        "examples": [
          {
            "somali": "Eedo = aunt (mother's sister), Auntie = uncle",
            "english": "mother's brother"
          },
          {
            "somali": "Odey = uncle (father's brother), Habaryar = aunt",
            "english": "father's sister"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Semantic Relationships — Synonyms ",
        "explanation": "MANY Somali words have SIMILAR meanings with subtle differences: Learning synonyms helps you EXPRESS NUANCE!",
        "examples": [
          {
            "somali": "Gaar = arrive, Imid = come, Timid = come",
            "english": "past form of imid"
          },
          {
            "somali": "Fara = swallow, Macaan = sweet",
            "english": "state of eating well"
          },
          {
            "somali": "Dareen = feel, Qalbi = heart",
            "english": "emotional center"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "For each situation, choose the most appropriate word:",
          "options": [
            "\"He TAG to school.\"",
            "\"I HAYAA my family.\"",
            "nin weyn",
            "\"She CUNSO food.\""
          ],
          "correctAnswer": "\"He TAG to school.\"",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Choose word based on CONTEXT and NUANCE!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Numbers and Quantities Vocabulary",
        "explanation": "NUMBERS and QUANTIFIERS are HIGH frequency: Numbers and quantities are EVERYDAY ESSENTIALS!"
      },
      {
        "type": "teach",
        "conceptBadge": "Time Vocabulary",
        "explanation": "TIME words are CRITICAL for conversation: Time vocabulary structures CONVERSATION and NARRATIVE!"
      },
      {
        "type": "summary",
        "title": "You learned Lexicon & Semantic Fields!",
        "takeaways": [
          "SEMANTIC FIELDS: Words grouped by meaning and context",
          "FAMILY VOCABULARY: High-frequency personal relationships",
          "SYNONYMS: Words with similar meanings and subtle differences",
          "NUMBERS & QUANTITIES: Essential for counting and measuring",
          "TIME VOCABULARY: Essential for describing when things happen",
          "CONTEXT-BASED LEARNING: Words easier to learn in meaningful clusters"
        ]
      }
    ]
  },
  23: {
    "lessonId": 23,
    "title": "Practical Communication",
    "cards": [
      {
        "type": "intro",
        "title": "Practical Communication",
        "bullets": [
          "Greet people appropriately in different contexts",
          "Introduce yourself and others",
          "Ask for information and directions",
          "Handle basic transactions (shopping, money)",
          "Discuss family and relationships",
          "Navigate common social situations"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Greetings — Assalaamu Alaikum",
        "explanation": "GREETINGS are the FOUNDATION of social interaction: Greetings are RESPECTFUL and IMPORTANT!",
        "examples": [
          {
            "somali": "Salaam alaikum = Hi",
            "english": "shortened"
          },
          {
            "somali": "Iska warran? = How are you?",
            "english": "singular"
          },
          {
            "somali": "Iskaa warran? = How are you?",
            "english": "formal"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Complete these greeting dialogues:",
          "options": [
            "Waan fiicanyahay.",
            "Wuu WAA ardii.",
            "Mahadsanid.",
            "Wa alaikum assalam."
          ],
          "correctAnswer": "Wa alaikum assalam.",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Greetings are FORMULAIC and RESPECTFUL!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Introductions",
        "explanation": "INTRODUCTIONS are crucial for meeting people: Introductions establish IDENTITY and RELATIONSHIP!",
        "examples": [
          {
            "somali": "Magacaygu waa Ahmed.",
            "english": "My name is Ahmed."
          },
          {
            "somali": "Anigu waxaan ahaa...",
            "english": "I am..."
          },
          {
            "somali": "Magacaagu waa maxay?",
            "english": "What is your name?"
          },
          {
            "somali": "Sidee lagu yiqiin?",
            "english": "How are you called?"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Create introduction dialogues:",
          "options": [
            "marno",
            "wiil",
            "Magacaygu waa [your name].",
            "Taas waa [friend's name]. Waxaa ahaa..."
          ],
          "correctAnswer": "Magacaygu waa [your name].",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Introductions are DIRECT and SIMPLE!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Asking for Information",
        "explanation": "QUESTIONS about locations, times, and facts: Questions SEEK INFORMATION and CLARIFICATION!",
        "examples": [
          {
            "somali": "Iskuulka halkee baa jira?",
            "english": "Where is the school?"
          },
          {
            "somali": "Suuqa intee fog?",
            "english": "How far is the market?"
          },
          {
            "somali": "Gee socdaa [direction]?",
            "english": "How do I get to...?"
          },
          {
            "somali": "Gormee way imaanaan?",
            "english": "When will she come?"
          }
        ]
      },
      {
        "type": "practice",
        "exercise": {
          "type": "multiple_choice",
          "question": "Ask these questions in Somali:  \"Where is the school?\" → ?",
          "options": [
            "Hadda saacad maxay tahay?",
            "magaalo wanaagsan",
            "Iskuulka halkee baa jira?",
            "Yay tahay?"
          ],
          "correctAnswer": "Iskuulka halkee baa jira?",
          "hint": "Look back at the examples taught in this lesson.",
          "explanation": "Questions use correct interrogatives!"
        }
      },
      {
        "type": "teach",
        "conceptBadge": "Shopping and Transactions",
        "explanation": "COMMERCE requires specific VOCABULARY and PHRASES: Shopping is PRACTICAL and FREQUENT!"
      },
      {
        "type": "summary",
        "title": "You learned Practical Communication!",
        "takeaways": [
          "GREETINGS: Assalaamu alaikum, Iska warran?, etc.",
          "INTRODUCTIONS: Magacaygu waa..., Taas waa...",
          "INFORMATION: Asking where, when, what, who, why",
          "SHOPPING: Prices, items, transactions",
          "SOCIAL: Family, relationships, feelings"
        ]
      }
    ]
  },
  24: {
    "lessonId": 24,
    "title": "Texts & Discourse (Overview)",
    "cards": [
      {
        "type": "intro",
        "title": "Texts & Discourse (Overview)",
        "bullets": [
          "Read and understand short Somali texts",
          "Write simple narratives",
          "Create descriptions using rich language",
          "Build coherent discourse (longer speech)",
          "Recognize text types and structures",
          "Apply everything you've learned in extended texts"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Narrative Structure",
        "explanation": "NARRATIVES follow a predictable STRUCTURE: Narratives move through TIME and CAUSE-EFFECT!",
        "examples": [
          {
            "somali": "Waxaa jiri gabar-gaaban oo magaceedu ay ahaa Fatima.",
            "english": "There was a young girl named Fatima."
          },
          {
            "somali": "Markaasay dhowr-jeer door-dor-jay iskuulka.",
            "english": "Then she struggled to go to school."
          },
          {
            "somali": "Waxay curin muuqaal ay raadinaysay.",
            "english": "She was pursuing something she wanted."
          },
          {
            "somali": "Waxaa dhacday inay dhameysatay dugsiga.",
            "english": "It happened that she finished school."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Description in Somali",
        "explanation": "DESCRIPTIONS use ADJECTIVES, ADVERBS, and VIVID IMAGERY: Descriptions CREATE IMAGERY and ATMOSPHERE!",
        "examples": [
          {
            "somali": "Gabar-ta way qurux tahay.",
            "english": "The girl is beautiful."
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Texts & Discourse (Overview)!",
        "takeaways": [
          "NARRATIVE: Stories with plot structure (opening, complication, resolution)",
          "DESCRIPTION: Rich language with adjectives and sensory details",
          "EXPOSITION: Explaining ideas and concepts",
          "DISCOURSE: Extended speech that uses all grammar together",
          "TEXT TYPES: Different structures for different purposes"
        ]
      }
    ]
  },
  25: {
    "lessonId": 25,
    "title": "Stylistic & Register",
    "cards": [
      {
        "type": "intro",
        "title": "Stylistic & Register",
        "bullets": [
          "Distinguish formal from informal language",
          "Adapt speech for different audiences",
          "Use respectful vs. casual language appropriately",
          "Switch between registers naturally",
          "Understand cultural and contextual factors",
          "Apply register control for authentic speech"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Formal vs. Informal Register",
        "explanation": "SOMALI has distinct FORMAL and INFORMAL STYLES: Register is chosen based on CONTEXT!",
        "examples": [
          {
            "somali": "Waxaan doon inaan ogaado su'asha.",
            "english": "I desire to understand the question. — formal, literary"
          },
          {
            "somali": "Waxaan raba inaan garto su'aasha.",
            "english": "I want to get the question. — conversational"
          },
          {
            "somali": "Mahadsanid aad u mahadsanid.",
            "english": "I thank you very much. — formal, elaborate"
          },
          {
            "somali": "Mahadsanid!",
            "english": "Thanks! — quick, casual"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Respectful vs. Casual Language",
        "explanation": "RESPECT is shown through LANGUAGE CHOICES: Respect is SHOWN through grammar and word CHOICE!",
        "examples": [
          {
            "somali": "Aad u mahadsanid.",
            "english": "Thank you very much. — formal"
          },
          {
            "somali": "Hadda af somali ma hadalkara?",
            "english": "Do you speak Somali now? — polite question form"
          },
          {
            "somali": "Waxay filayaa.",
            "english": "She thinks. — respecting her view"
          },
          {
            "somali": "Mahadsanid.",
            "english": "Thanks."
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Written vs. Spoken Register",
        "explanation": "WRITING is more FORMAL than SPEAKING: Writing DEMANDS formality; speaking allows CASUALNESS!",
        "examples": [
          {
            "somali": "Buu tag hadda. Markaa way imaan. Walaacana way cunay.",
            "english": "He went now. Then she came. So she ate. — natural flow"
          },
          {
            "somali": "inay barato caruurta.",
            "english": "When he went to school, she came to teach the children. — complex, formal"
          },
          {
            "somali": "Waad ogsid? = Waxaad ogsid?",
            "english": "shortened"
          },
          {
            "somali": "Buu yimid = Buu timid",
            "english": "variant"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Code-Switching in Native Speech",
        "explanation": "Native speakers naturally SWITCH between registers: Code-switching is NORMAL and STRATEGIC!",
        "examples": [
          {
            "somali": "Assalaamu alaikum, saaxiibkay.",
            "english": "Peace be upon you, my friend. — formal greeting"
          },
          {
            "somali": "Salaam, jaahoy! Iska warran?",
            "english": "Hi buddy! How are you? — casual"
          },
          {
            "somali": "Waxaan doon (formal) inaan raba (casual) su'aasha.",
            "english": "I desire/want the question. — mixing registers"
          }
        ]
      },
      {
        "type": "summary",
        "title": "You learned Stylistic & Register!",
        "takeaways": [
          "FORMAL REGISTER: Academic, official, written language",
          "INFORMAL REGISTER: Conversational, everyday, spoken language",
          "RESPECTFUL LANGUAGE: For elders, authority, strangers",
          "CASUAL LANGUAGE: For friends, peers, familiar people",
          "CODE-SWITCHING: Mixing registers based on context",
          "CULTURAL AWARENESS: Choosing register is culturally important"
        ]
      }
    ]
  },
  26: {
    "lessonId": 26,
    "title": "Comprehensive Review & Mastery",
    "cards": [
      {
        "type": "intro",
        "title": "Comprehensive Review & Mastery",
        "bullets": [
          "Review all 26 modules and major concepts",
          "Assess your progress and mastery level",
          "Identify areas for further study",
          "Apply everything in integrated practice",
          "Plan your next steps",
          "Celebrate your achievements!"
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Course Structure — The Full Journe",
        "explanation": "26 MODULES across 4 PHASES: 500+ slides, 100+ exercises, complete coverage!",
        "examples": [
          {
            "somali": "PHASE 1: FOUNDATIONS",
            "english": "Modules 1-7"
          },
          {
            "somali": "Modules 2-7: Parts of Speech",
            "english": "nouns, articles, pronouns, adjectives, numerals, prepositions"
          },
          {
            "somali": "PHASE 2: VERB SYSTEM",
            "english": "Modules 8-12"
          },
          {
            "somali": "PHASE 3: SENTENCE STRUCTURE",
            "english": "Modules 13-21"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "What You've Learned — Module Highl",
        "explanation": "PHASE 1 MASTERY: ✅ Somali phonetics and sound system ✅ Noun gender, number, and agreement ✅ Article systems and pronouns ✅ Adjectives and agreement patterns ✅ Numerals, quantifiers, and prepositions PHASE 2 MASTERY: ✅ Verb roots, stems, and classification ✅ Tense (past, present, future) and aspect (perfective, imperfec"
      },
      {
        "type": "teach",
        "conceptBadge": "Mastery Self-Assessment",
        "explanation": "Check your proficiency across key areas: Most students completing this course: UPPER INTERMEDIATE level!",
        "examples": [
          {
            "somali": "Area",
            "english": "Beginner"
          },
          {
            "somali": "Phonetics",
            "english": "Recognize sounds"
          },
          {
            "somali": "Nouns/Agreement",
            "english": "Identify gender"
          },
          {
            "somali": "Verbs",
            "english": "Simple forms"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Sample Integrated Practice — Readi",
        "explanation": "Read and understand this short text: Can you identify: ANSWER: Yes — you've learned all of this!"
      },
      {
        "type": "teach",
        "conceptBadge": "Sample Integrated Practice — Writi",
        "explanation": "Write your own short paragraph (3-4 sentences) about: \"Your daily routine\" (I _____ in the morning. Then I _____ to school. Now I _____ writing, so I _____ eating. Tomorrow I want to _____ my siblings.) This integrates TENSE, VERB AGREEMENT, TIME ADVERBS, and PURPOSE CLAUSES!"
      },
      {
        "type": "teach",
        "conceptBadge": "Common Mistakes to Avoid",
        "explanation": "As you continue learning, watch out for: AWARENESS of mistakes helps you AVOID them!",
        "examples": [
          {
            "somali": "Gabar-ta wuu tag.",
            "english": "girl + he = mismatch!"
          },
          {
            "somali": "Gabar-ta way tag.",
            "english": "girl + she = match!"
          },
          {
            "somali": "Ani waan tag hadii aad tag.",
            "english": "present in conditional = awkward"
          },
          {
            "somali": "Hadii aad tag, buu imaan.",
            "english": "present in condition, future in result"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Resources for Continued Learning",
        "explanation": "To continue after this course: Continued exposure is KEY to mastery!",
        "examples": [
          {
            "somali": "BBC Somali service",
            "english": "news"
          },
          {
            "somali": "Somali radio stations",
            "english": "RayaTV, Galkacyo Online"
          },
          {
            "somali": "YouTube channels",
            "english": "Somali songs, poetry"
          },
          {
            "somali": "Somali newspapers",
            "english": "online editions"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Sample Mastery Checklist",
        "explanation": "Check how many you can do: Count your ☐ marks — that's your mastery level!"
      },
      {
        "type": "teach",
        "conceptBadge": "Your Next Steps",
        "explanation": "After completing this course: You've learned the FOUNDATION — now customize your path!",
        "examples": [
          {
            "somali": "Learn technical vocabulary",
            "english": "business, medicine, law"
          },
          {
            "somali": "Study specific genres",
            "english": "poetry, storytelling"
          }
        ]
      },
      {
        "type": "teach",
        "conceptBadge": "Celebrating Your Achievement",
        "explanation": "Congratulations on completing this 26-module course! You now have: ✅ 500+ slides of structured learning ✅ 100+ exercises with answers ✅ Complete grammar from phonetics to discourse ✅ Real-world vocabulary and practical communication ✅ Understanding of how Somali WORKS ✅ Understand Somali speakers at normal speed (with "
      },
      {
        "type": "teach",
        "conceptBadge": "Final Reflection",
        "explanation": "What was your biggest learning? Keep asking questions, keep learning, keep speaking!"
      },
      {
        "type": "summary",
        "title": "You learned Comprehensive Review & Mastery!",
        "takeaways": [
          "You completed Comprehensive Review & Mastery."
        ]
      }
    ]
  },
};

export const MAX_LESSON_ID = 26;

export interface LessonSummary {
  lessonId: number;
  title: string;
  cardCount: number;
}

export const LESSON_LIST: LessonSummary[] = [
  { lessonId: 1, title: "Foundations & Phonetics", cardCount: 16 },
  { lessonId: 2, title: "Nouns — Gender, Number & Agreement", cardCount: 21 },
  { lessonId: 3, title: "Articles & Determiners", cardCount: 12 },
  { lessonId: 4, title: "Pronouns — Comprehensive System", cardCount: 15 },
  { lessonId: 5, title: "Adjectives & Descriptors", cardCount: 14 },
  { lessonId: 6, title: "Numerals & Quantifiers", cardCount: 14 },
  { lessonId: 7, title: "Prepositions & Spatial Relations", cardCount: 14 },
  { lessonId: 8, title: "Verbs — Introduction & Foundation", cardCount: 16 },
  { lessonId: 9, title: "Tense & Aspect System", cardCount: 20 },
  { lessonId: 10, title: "Mood & Modality", cardCount: 20 },
  { lessonId: 11, title: "Verb Extensions & Voice", cardCount: 20 },
  { lessonId: 12, title: "Complex Verb Forms & Irregularities", cardCount: 20 },
  { lessonId: 13, title: "Word Order & Simple Sentences", cardCount: 20 },
  { lessonId: 14, title: "Complex Sentences", cardCount: 18 },
  { lessonId: 15, title: "Negation", cardCount: 17 },
  { lessonId: 16, title: "Questions & Interrogatives", cardCount: 17 },
  { lessonId: 17, title: "Conjunctions & Discourse", cardCount: 12 },
  { lessonId: 18, title: "Adverbs", cardCount: 14 },
  { lessonId: 19, title: "Copular & Existential", cardCount: 13 },
  { lessonId: 20, title: "Special Topics (Advanced Agreement, Focus, Topicalization)", cardCount: 7 },
  { lessonId: 21, title: "Derivational Morphology", cardCount: 12 },
  { lessonId: 22, title: "Lexicon & Semantic Fields", cardCount: 8 },
  { lessonId: 23, title: "Practical Communication", cardCount: 9 },
  { lessonId: 24, title: "Texts & Discourse (Overview)", cardCount: 4 },
  { lessonId: 25, title: "Stylistic & Register", cardCount: 6 },
  { lessonId: 26, title: "Comprehensive Review & Mastery", cardCount: 13 },
];

export function getLessonContent(lessonId: number): LessonContent | undefined {
  return lessons[lessonId];
}

export function getTotalCards(lessonId: number): number {
  return lessons[lessonId]?.cards.length ?? 0;
}

export function getCard(lessonId: number, cardIndex: number): TeachingCard | undefined {
  return lessons[lessonId]?.cards[cardIndex];
}
