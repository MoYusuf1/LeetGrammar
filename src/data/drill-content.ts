/**
 * Drill Content — Complete exercise data for the 7-level Somali grammar drill system.
 * Each level isolates one grammar skill from the workbook.
 */

// ─── Exercise Types ─────────────────────────────────────────────────────────

export type ExerciseType =
  | 'marker-tap'           // L1: tap the marker word in a sentence
  | 'marker-classify'      // L1: classify marker type (STATEMENT/QUESTION/FOCUS/SPOTLIGHT)
  | 'fill-blank'           // L2,L5,L6: choose correct word to fill blank
  | 'three-ways'           // L2: write sentence 3 ways (waa/baa/waxa)
  | 'contraction-decompose'// L3: break contraction into parts
  | 'contraction-build'    // L3: build contraction from marker + pronoun
  | 'word-scramble'        // L4: drag words into correct SOV order
  | 'blueprint-build'      // L4: build Somali from labeled blueprint
  | 'pick-preposition'     // L5: choose u/ku/ka/la
  | 'add-direction'        // L5: choose soo/sii
  | 'full-stack'           // L5: full preposition + direction + verb
  | 'pick-connector'       // L6: choose iyo/-na/-se/oo
  | 'combine-sentences'    // L6: combine two Somali sentences
  | 'free-build';          // L7: English → Somali free translation

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  somaliSentence?: string;
  englishHint?: string;
  scrambledWords?: string[];
  blueprint?: { subject?: string; marker?: string; object?: string; verb?: string };
  sentenceA?: string;
  sentenceB?: string;
  connectorType?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface LevelData {
  id: number;
  title: string;
  subtitle: string;
  color: string;
  rule: {
    title: string;
    content: string;
    examples: { somali: string; breakdown: string; english: string }[];
  };
  guidedDrills: Exercise[];
  unguidedDrills: Exercise[];
  gateDrills: Exercise[];
}

// ─── Reference Tables ───────────────────────────────────────────────────────

export const MARKER_TYPES = [
  {
    value: 'STATEMENT',
    label: 'Statement (waa)',
    description: 'waa — focus on the action. Plain declaration: "He ATE."',
  },
  {
    value: 'QUESTION',
    label: 'Question (ma)',
    description: 'ma — asking yes/no. "Did he eat?"',
  },
  {
    value: 'FOCUS',
    label: 'Focus (baa/ayaa)',
    description: 'baa/ayaa — highlighting who/what. "ALI ate."',
  },
  {
    value: 'SPOTLIGHT',
    label: 'Spotlight (waxa)',
    description: 'waxa — what ___ was... "What he ate was rice."',
  },
] as const;

export const CONTRACTION_TABLE = [
  { contraction: 'waan', marker: 'waa', pronoun: 'aan', english: 'I am / I (statement)' },
  { contraction: 'waad', marker: 'waa', pronoun: 'aad', english: 'you are / you (statement)' },
  { contraction: 'wuu', marker: 'waa', pronoun: 'uu', english: 'he is / he (statement)' },
  { contraction: 'way', marker: 'waa', pronoun: 'ay', english: 'she/they are / she (statement)' },
  { contraction: 'baan', marker: 'baa', pronoun: 'aan', english: 'It is I who... (focus)' },
  { contraction: 'baad', marker: 'baa', pronoun: 'aad', english: 'It is you who... (focus)' },
  { contraction: 'buu', marker: 'baa', pronoun: 'uu', english: 'It is he who... (focus)' },
  { contraction: 'bay', marker: 'baa', pronoun: 'ay', english: 'It is she who... (focus)' },
  { contraction: 'waxaan', marker: 'waxa', pronoun: 'aan', english: 'What I... (spotlight)' },
  { contraction: 'waxaad', marker: 'waxa', pronoun: 'aad', english: 'What you... (spotlight)' },
  { contraction: 'wuxuu', marker: 'waxa', pronoun: 'uu', english: 'What he... (spotlight)' },
  { contraction: 'waxay', marker: 'waxa', pronoun: 'ay', english: 'What she... (spotlight)' },
] as const;

export const PREPOSITIONS = [
  { word: 'u', meaning: 'to / for', example: 'Wuu u tegay suuqa. (He went to the market.)' },
  { word: 'ku', meaning: 'in / at / by means of', example: 'Waan ku qoray buugga. (I wrote in the book.)' },
  { word: 'ka', meaning: 'from / about', example: 'Wuu ka yimid dugsiga. (He came from school.)' },
  { word: 'la', meaning: 'with / one (passive)', example: 'Way la shaqeysay. (She worked with him.)' },
] as const;

export const DIRECTIONS = [
  { word: 'soo', meaning: 'toward speaker', mentalImage: 'Imagine bringing something toward yourself' },
  { word: 'sii', meaning: 'away from speaker', mentalImage: 'Imagine sending something away from yourself' },
  { word: 'wada', meaning: 'together', mentalImage: 'Two people doing something as one' },
  { word: 'kala', meaning: 'apart / separately', mentalImage: 'Things splitting into separate parts' },
] as const;

export const CONNECTORS = [
  { word: 'iyo', role: 'and (nouns)', english: 'and', example: 'Cali iyo Sahra (Ali and Sahra)' },
  { word: '-na', role: 'and / also (sentences)', english: 'and / also', example: 'Wuu cunay, waadna cuntay. (He ate, and you ate too.)' },
  { word: '-se', role: 'but / however', english: 'but', example: 'Wuu tegay, naagtase way joogtay. (He went, but the woman stayed.)' },
  { word: 'oo', role: 'which / that (relative)', english: 'which / that', example: 'Buug oo weyn (a book which is big)' },
] as const;

// ─── Vocabulary Bank ────────────────────────────────────────────────────────

export const VOCAB_BANK = {
  nouns: [
    { somali: 'nin / ninka', meaning: 'man / the man' },
    { somali: 'naag / naagta', meaning: 'woman / the woman' },
    { somali: 'wiil / wiilka', meaning: 'boy / the boy' },
    { somali: 'gabadh / gabadha', meaning: 'girl / the girl' },
    { somali: 'hooyo / hooyada', meaning: 'mother / the mother' },
    { somali: 'aabo / aabaha', meaning: 'father / the father' },
    { somali: 'macallin / macallinka', meaning: 'teacher / the teacher' },
    { somali: 'ardayga', meaning: 'the student' },
    { somali: 'buug / buugga', meaning: 'book / the book' },
    { somali: 'cunto / cuntada', meaning: 'food / the food' },
    { somali: 'biyo', meaning: 'water' },
    { somali: 'guri / guriga', meaning: 'house / the house' },
    { somali: 'dugsi / dugsiga', meaning: 'school / the school' },
    { somali: 'suuq / suuqa', meaning: 'market / the market' },
    { somali: 'hilib', meaning: 'meat' },
    { somali: 'bariis', meaning: 'rice' },
    { somali: 'shaah', meaning: 'tea' },
    { somali: 'lacag', meaning: 'money' },
  ],
  verbs: [
    { somali: 'cunay / cunayaa', meaning: 'ate / is eating' },
    { somali: 'tegay / tegayaa', meaning: 'went / is going' },
    { somali: 'yimid / imanayaa', meaning: 'came / is coming' },
    { somali: 'keenay / keenayaa', meaning: 'brought / is bringing' },
    { somali: 'akhriyay / akhriyaa', meaning: 'read / is reading' },
    { somali: 'qoray / qorayaa', meaning: 'wrote / is writing' },
    { somali: 'shaqeeyay / shaqeeyaa', meaning: 'worked / is working' },
    { somali: 'ciyaaray / ciyaaraa', meaning: 'played / is playing' },
    { somali: 'galay / galayaa', meaning: 'entered / is entering' },
    { somali: 'seexday / seexdaa', meaning: 'slept / is sleeping' },
    { somali: 'cabay / cabayaa', meaning: 'drank / is drinking' },
    { somali: 'joogay / joogaa', meaning: 'stayed / stays' },
    { somali: 'yiri / yiraahdaa', meaning: 'said / says' },
    { somali: 'sameeyay / sameeyaa', meaning: 'made / is making' },
    { somali: 'booqday / booqdaa', meaning: 'visited / visits' },
    { somali: 'dhigtay / dhigtaa', meaning: 'cooked / is cooking' },
    { somali: 'helay / helaa', meaning: 'found / finds' },
    { somali: 'bixiyay / bixiyaa', meaning: 'paid / is paying' },
  ],
} as const;

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL 1: Marker Identification
// ═════════════════════════════════════════════════════════════════════════════

const level1: LevelData = {
  id: 1,
  title: 'Marker Identification',
  subtitle: 'Find the marker word and name its job',
  color: '#3b82f6',
  rule: {
    title: 'The One-Marker Rule',
    content: 'Every Somali sentence has exactly one marker. Your job: find it and name its job.\n\nFour marker types exist:\n- STATEMENT (waa/waan/wuu/way...) — focus on the ACTION\n- QUESTION (ma/miyaad/miyuu...) — asking yes/no\n- FOCUS (baa/bay/buu...) — highlighting WHO or WHAT did it\n- SPOTLIGHT (waxa/waxaan/wuxuu...) — "What ___ was..." construction',
    examples: [
      { somali: 'Cali wuu tegay.', breakdown: 'wuu = waa + uu (STATEMENT + he)', english: 'Ali went. (focus on the going)' },
      { somali: 'Hooyada bay cuntay.', breakdown: 'bay = baa + ay (FOCUS + she)', english: 'It was mother who ate. (focus on mother)' },
      { somali: 'Ma cunaysaa?', breakdown: 'ma (QUESTION marker)', english: 'Are you eating?' },
      { somali: 'Waxaan akhriyay buug.', breakdown: 'Waxaan = waxa + aan (SPOTLIGHT + I)', english: 'What I read was a book.' },
    ],
  },
  guidedDrills: [
    // ─── Guided: marker-tap (15) ───
    { id: 'l1-g-01', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Cali wuu tegay.', correctAnswer: 'wuu', explanation: 'wuu = waa + uu. This is the statement marker fused with the pronoun "he".' },
    { id: 'l1-g-02', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Hooyada bay cuntay.', correctAnswer: 'bay', explanation: 'bay = baa + ay. This is the focus marker fused with the pronoun "she".' },
    { id: 'l1-g-03', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Ma cunaysaa?', correctAnswer: 'Ma', explanation: 'ma is the standalone question marker for yes/no questions.' },
    { id: 'l1-g-04', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Waxaan akhriyay buug.', correctAnswer: 'Waxaan', explanation: 'Waxaan = waxa + aan. Spotlight marker fused with "I".' },
    { id: 'l1-g-05', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Ninka baa lacag bixiyay.', correctAnswer: 'baa', explanation: 'baa is the focus marker that highlights the noun before it (ninka).' },
    { id: 'l1-g-06', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Wiilka wuu ciyaaray.', correctAnswer: 'wuu', explanation: 'wuu = waa + uu (statement + he). Focuses on the action of playing.' },
    { id: 'l1-g-07', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Miyaad seexatay?', correctAnswer: 'Miyaad', explanation: 'Miyaad = miyaa + aad (question marker + you).' },
    { id: 'l1-g-08', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Gabadha ayaa shaah cabay.', correctAnswer: 'ayaa', explanation: 'ayaa is an alternative form of baa — both are focus markers.' },
    { id: 'l1-g-09', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Waxay keentay cunto.', correctAnswer: 'Waxay', explanation: 'Waxay = waxa + ay (spotlight + she). "What she brought was food."' },
    { id: 'l1-g-10', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Macallinka wuu shaqeeyay.', correctAnswer: 'wuu', explanation: 'wuu = waa + uu (statement marker + he). Focus on the action of working.' },
    { id: 'l1-g-11', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Miyuu yimid?', correctAnswer: 'Miyuu', explanation: 'Miyuu = miyaa + uu (question marker + he). "Did he come?"' },
    { id: 'l1-g-12', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Aabo baa guriga galay.', correctAnswer: 'baa', explanation: 'baa focuses on the noun before it — here highlighting "aabo" (father).' },
    { id: 'l1-g-13', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Waan cabay biyo.', correctAnswer: 'Waan', explanation: 'Waan = waa + aan (statement + I). Focus on the action of drinking.' },
    { id: 'l1-g-14', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Ma tegaysaa dugsiga?', correctAnswer: 'Ma', explanation: 'ma is the standalone question marker. "Are you going to school?"' },
    { id: 'l1-g-15', type: 'marker-tap', prompt: 'Tap the marker word in this sentence:', somaliSentence: 'Waxuu qoray warqad.', correctAnswer: 'Waxuu', explanation: 'Waxuu = waxa + uu (spotlight + he). "What he wrote was a letter."' },
    // ─── Guided: marker-classify (15) ───
    { id: 'l1-g-16', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Cali wuu tegay.', correctAnswer: 'STATEMENT', explanation: 'wuu = waa + uu. The waa family are STATEMENT markers — they focus on the action.' },
    { id: 'l1-g-17', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Hooyada bay cuntay.', correctAnswer: 'FOCUS', explanation: 'bay = baa + ay. The baa family are FOCUS markers — they highlight who/what.' },
    { id: 'l1-g-18', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Ma cunaysaa?', correctAnswer: 'QUESTION', explanation: 'ma is a QUESTION marker used for yes/no questions.' },
    { id: 'l1-g-19', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Waxaan akhriyay buug.', correctAnswer: 'SPOTLIGHT', explanation: 'Waxaan = waxa + aan. The waxa family are SPOTLIGHT markers — cleft construction.' },
    { id: 'l1-g-20', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Ninka baa lacag bixiyay.', correctAnswer: 'FOCUS', explanation: 'baa is a FOCUS marker. It highlights the noun before it: "It was THE MAN who paid."' },
    { id: 'l1-g-21', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Wiilka wuu ciyaaray.', correctAnswer: 'STATEMENT', explanation: 'wuu = waa + uu. STATEMENT — focuses on the action of playing.' },
    { id: 'l1-g-22', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Miyaad seexatay?', correctAnswer: 'QUESTION', explanation: 'Miyaad = miyaa + aad. QUESTION — asking "Did you sleep?"' },
    { id: 'l1-g-23', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Gabadha ayaa shaah cabay.', correctAnswer: 'FOCUS', explanation: 'ayaa is an alternative form of baa — also a FOCUS marker.' },
    { id: 'l1-g-24', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Waxay keentay cunto.', correctAnswer: 'SPOTLIGHT', explanation: 'Waxay = waxa + ay. SPOTLIGHT — "What she brought was food."' },
    { id: 'l1-g-25', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Macallinka wuu shaqeeyay.', correctAnswer: 'STATEMENT', explanation: 'wuu = waa + uu. STATEMENT — "The teacher worked." Focus on the action.' },
    { id: 'l1-g-26', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Miyuu yimid?', correctAnswer: 'QUESTION', explanation: 'Miyuu = miyaa + uu. QUESTION — "Did he come?"' },
    { id: 'l1-g-27', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Aabo baa guriga galay.', correctAnswer: 'FOCUS', explanation: 'baa is FOCUS — highlighting "father" as the one who entered.' },
    { id: 'l1-g-28', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Waan cabay biyo.', correctAnswer: 'STATEMENT', explanation: 'Waan = waa + aan. STATEMENT — "I drank water." Focus on the action.' },
    { id: 'l1-g-29', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Ma tegaysaa dugsiga?', correctAnswer: 'QUESTION', explanation: 'ma is the QUESTION marker — "Are you going to school?"' },
    { id: 'l1-g-30', type: 'marker-classify', prompt: 'What type of marker is in this sentence?', somaliSentence: 'Waxuu qoray warqad.', correctAnswer: 'SPOTLIGHT', explanation: 'Waxuu = waxa + uu. SPOTLIGHT — "What he wrote was a letter."' },
  ],
  unguidedDrills: [
    { id: 'l1-u-01', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Naagta way cabay shaah.', correctAnswer: 'way', explanation: 'way = waa + ay. STATEMENT marker — "The woman drank tea."' },
    { id: 'l1-u-02', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Naagta way cabay shaah.', correctAnswer: 'STATEMENT', explanation: 'way is from the waa family — STATEMENT marker.' },
    { id: 'l1-u-03', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Buugga baa wiilka akhriyay.', correctAnswer: 'baa', explanation: 'baa — FOCUS marker highlighting the book (unusual subject-object order for emphasis).' },
    { id: 'l1-u-04', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Buugga baa wiilka akhriyay.', correctAnswer: 'FOCUS', explanation: 'baa is always a FOCUS marker.' },
    { id: 'l1-u-05', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Miyey keentay cunto?', correctAnswer: 'Miyey', explanation: 'Miyey = miyaa + ay. QUESTION marker — "Did she bring food?"' },
    { id: 'l1-u-06', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Miyey keentay cunto?', correctAnswer: 'QUESTION', explanation: 'Miyey starts with miyaa — QUESTION marker.' },
    { id: 'l1-u-07', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Waxaa dhigtay bariis.', correctAnswer: 'Waxaa', explanation: 'Waxaa = waxa + a (copula). SPOTLIGHT marker.' },
    { id: 'l1-u-08', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Waxaa dhigtay bariis.', correctAnswer: 'SPOTLIGHT', explanation: 'Waxaa is from the waxa family — SPOTLIGHT.' },
    { id: 'l1-u-09', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Ardayga wuu galay dugsiga.', correctAnswer: 'wuu', explanation: 'wuu = waa + uu. STATEMENT — "The student entered the school."' },
    { id: 'l1-u-10', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Ardayga wuu galay dugsiga.', correctAnswer: 'STATEMENT', explanation: 'wuu = waa + uu — STATEMENT marker.' },
  ],
  gateDrills: [
    { id: 'l1-q-01', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Cali wuu tegay.', correctAnswer: 'wuu', explanation: 'wuu = waa + uu (STATEMENT + he).' },
    { id: 'l1-q-02', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Hooyada bay cuntay.', correctAnswer: 'FOCUS', explanation: 'bay = baa + ay — FOCUS marker.' },
    { id: 'l1-q-03', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Ma cunaysaa?', correctAnswer: 'Ma', explanation: 'ma is the standalone QUESTION marker.' },
    { id: 'l1-q-04', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Waxaan akhriyay buug.', correctAnswer: 'SPOTLIGHT', explanation: 'Waxaan = waxa + aan — SPOTLIGHT marker.' },
    { id: 'l1-q-05', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Wiilka wuu ciyaaray.', correctAnswer: 'wuu', explanation: 'wuu = waa + uu — STATEMENT marker.' },
    { id: 'l1-q-06', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Miyaad seexatay?', correctAnswer: 'QUESTION', explanation: 'Miyaad = miyaa + aad — QUESTION marker.' },
    { id: 'l1-q-07', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Ninka baa lacag bixiyay.', correctAnswer: 'baa', explanation: 'baa — FOCUS marker highlighting the man.' },
    { id: 'l1-q-08', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Gabadha ayaa shaah cabay.', correctAnswer: 'FOCUS', explanation: 'ayaa is a variant of baa — FOCUS marker.' },
    { id: 'l1-q-09', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Waan cabay biyo.', correctAnswer: 'Waan', explanation: 'Waan = waa + aan — STATEMENT marker.' },
    { id: 'l1-q-10', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Miyuu yimid?', correctAnswer: 'QUESTION', explanation: 'Miyuu = miyaa + uu — QUESTION marker.' },
    { id: 'l1-q-11', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Waxay keentay cunto.', correctAnswer: 'Waxay', explanation: 'Waxay = waxa + ay — SPOTLIGHT marker.' },
    { id: 'l1-q-12', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Aabo baa guriga galay.', correctAnswer: 'FOCUS', explanation: 'baa — FOCUS marker highlighting father.' },
    { id: 'l1-q-13', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Macallinka wuu shaqeeyay.', correctAnswer: 'wuu', explanation: 'wuu = waa + uu — STATEMENT marker.' },
    { id: 'l1-q-14', type: 'marker-classify', prompt: 'Classify the marker:', somaliSentence: 'Ma tegaysaa dugsiga?', correctAnswer: 'QUESTION', explanation: 'ma — standalone QUESTION marker.' },
    { id: 'l1-q-15', type: 'marker-tap', prompt: 'Find the marker:', somaliSentence: 'Waxuu qoray warqad.', correctAnswer: 'Waxuu', explanation: 'Waxuu = waxa + uu — SPOTLIGHT marker.' },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL 2: waa vs baa vs waxa
// ═════════════════════════════════════════════════════════════════════════════

const level2: LevelData = {
  id: 2,
  title: 'waa vs baa vs waxa',
  subtitle: 'Choose the correct marker based on emphasis',
  color: '#8b5cf6',
  rule: {
    title: 'The Three-Way Distinction',
    content: 'The core three-way distinction that controls every sentence:\n\n- waa = focus on the ACTION (the verb). "He ATE."\n- baa / ayaa = focus on the NOUN. "ALI ate."\n- waxa = spotlight/cleft. "What he ate was..."\n\nOnly ONE marker per main clause. They are mutually exclusive.\n\nUse waa when the action itself is the news. Use baa when WHO did it is the news. Use waxa when you want to spotlight a specific element.',
    examples: [
      { somali: 'Cali wuu cunay.', breakdown: 'wuu = waa + uu', english: 'Ali ATE. (emphasis on the eating)' },
      { somali: 'Cali baa cuntay.', breakdown: 'baa = focus marker', english: 'It was ALI who ate. (emphasis on Ali)' },
      { somali: 'Waxuu cunay waa hilib.', breakdown: 'Waxuu = waxa + uu', english: 'What he ate was meat. (spotlight)' },
    ],
  },
  guidedDrills: [
    // ─── Guided: fill-blank (12) ───
    { id: 'l2-g-01', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Cali _____ cunay.', englishHint: 'Ali ate. (emphasis on the action of eating)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'wuu', explanation: 'wuu = statement, verb focus. "Ali ATE." The action is the news.' },
    { id: 'l2-g-02', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Cali _____ cuntada cunay.', englishHint: 'It was ALI who ate the food. (emphasis on Ali)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'baa', explanation: 'baa = focus on the noun (Cali). "It was ALI who ate the food."' },
    { id: 'l2-g-03', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: '_____ Cali cunay waa hilib.', englishHint: 'What Ali ate was meat. (spotlight construction)', options: ['Waxuu', 'bay', 'wuu'], correctAnswer: 'Waxuu', explanation: 'Waxuu = spotlight/cleft construction. "What Ali ate was meat."' },
    { id: 'l2-g-04', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Hooyada _____ keentay cunto.', englishHint: 'Mother brought food. (emphasis: she BROUGHT it)', options: ['way', 'baa', 'Waxay'], correctAnswer: 'way', explanation: 'way = waa + ay (statement + she). Focus on the action of bringing.' },
    { id: 'l2-g-05', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: '_____ cunto keentay.', englishHint: 'It was MOTHER who brought food. (emphasis on mother)', options: ['Hooyada baa', 'Hooyada wuu', 'Waxay'], correctAnswer: 'Hooyada baa', explanation: 'baa focuses on the noun (Hooyada). The person is the news.' },
    { id: 'l2-g-06', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Wiilka _____ buugga akhriyay.', englishHint: 'It was THE BOY who read the book. (emphasis on boy)', options: ['baa', 'wuu', 'Waxuu'], correctAnswer: 'baa', explanation: 'baa/ayaa focuses on the noun (wiilka). "It was THE BOY who read."' },
    { id: 'l2-g-07', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Wiilka _____ akhriyay.', englishHint: 'The boy READ. (emphasis on the reading)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'wuu', explanation: 'wuu = statement, verb focus. The action of reading is the news.' },
    { id: 'l2-g-08', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: '_____ akhriyay waa buug.', englishHint: 'What he read was a book. (spotlight)', options: ['Waxuu', 'bay', 'wuu'], correctAnswer: 'Waxuu', explanation: 'Waxuu = spotlight/cleft. "What he read was a book."' },
    { id: 'l2-g-09', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Macallinka _____ shaqeeyay.', englishHint: 'The teacher WORKED. (emphasis on working)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'wuu', explanation: 'wuu = statement, verb focus. The action of working is the news.' },
    { id: 'l2-g-10', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: '_____ shaqeeyay waa macallinka.', englishHint: 'The one who worked was the teacher. (spotlight)', options: ['Waxaa', 'baa', 'wuu'], correctAnswer: 'Waxaa', explanation: 'Waxaa = spotlight with copula (waa). "The one who worked was the teacher."' },
    { id: 'l2-g-11', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Gabadha _____ shaah cabay.', englishHint: 'The girl DRANK tea. (emphasis on drinking)', options: ['way', 'baa', 'Waxay'], correctAnswer: 'way', explanation: 'way = statement, verb focus. The action of drinking is the news.' },
    { id: 'l2-g-12', type: 'fill-blank', prompt: 'Fill in the correct marker for this emphasis:', somaliSentence: 'Gabadha _____ shaah cabay.', englishHint: 'It was THE GIRL who drank tea. (emphasis on girl)', options: ['baa', 'way', 'Waxay'], correctAnswer: 'baa', explanation: 'baa focuses on the noun (gabadha). "It was THE GIRL who drank tea."' },
    // ─── Guided: three-ways (5) ───
    { id: 'l2-g-13', type: 'three-ways', prompt: 'Write this sentence three ways: using waa (verb focus), baa (noun focus), and waxa (spotlight).', englishHint: 'Ali / ate / the food', correctAnswer: ['Cali wuu cunay cuntada.', 'Cali baa cuntada cunay.', 'Waxuu Cali cunay waa cuntada.'], explanation: 'waa: Ali ATE the food (action is news). baa: It was ALI who ate (person is news). waxa: What Ali ate was food (spotlight construction).' },
    { id: 'l2-g-14', type: 'three-ways', prompt: 'Write this sentence three ways: using waa, baa, and waxa.', englishHint: 'The boy / read / a book', correctAnswer: ['Wiilka wuu akhriyay buug.', 'Wiilka baa buug akhriyay.', 'Waxuu wiilka akhriyay waa buug.'], explanation: 'Same words, different marker, different emphasis. Word order shifts with each marker type.' },
    { id: 'l2-g-15', type: 'three-ways', prompt: 'Write this sentence three ways: using waa, baa, and waxa.', englishHint: 'Mother / cooked / rice', correctAnswer: ['Hooyada way dhigtay bariis.', 'Hooyada baa bariis dhigtay.', 'Waxay hooyada dhigtay waa bariis.'], explanation: 'way = verb focus, baa = noun focus, waxa = spotlight. Note the SOV word order with baa.' },
    { id: 'l2-g-16', type: 'three-ways', prompt: 'Write this sentence three ways: using waa, baa, and waxa.', englishHint: 'The teacher / brought / money', correctAnswer: ['Macallinka wuu keenay lacag.', 'Macallinka baa lacag keenay.', 'Waxuu macallinka keenay waa lacag.'], explanation: 'Same pattern: waa emphasizes the action, baa the person, waxa spotlights the object.' },
    { id: 'l2-g-17', type: 'three-ways', prompt: 'Write this sentence three ways: using waa, baa, and waxa.', englishHint: 'Father / entered / the house', correctAnswer: ['Aabo wuu galay guriga.', 'Aabo baa guriga galay.', 'Waxuu aabo galay waa guriga.'], explanation: 'Statement: focus on entering. Focus: it was father who entered. Spotlight: what father entered was the house.' },
  ],
  unguidedDrills: [
    { id: 'l2-u-01', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Naagta _____ biyo cabay.', englishHint: 'The woman DRANK water. (emphasis on drinking)', options: ['bay', 'way', 'Waxay'], correctAnswer: 'way', explanation: 'way = statement (waa + ay). Focus on the action of drinking.' },
    { id: 'l2-u-02', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: '_____ biyo cabay waa naagta.', englishHint: 'The one who drank water was the woman. (spotlight)', options: ['Waxay', 'bay', 'way'], correctAnswer: 'Waxay', explanation: 'Waxay = spotlight (waxa + ay). "What she drank was water."' },
    { id: 'l2-u-03', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Ninka _____ lacag bixiyay.', englishHint: 'The man PAID money. (emphasis on paying)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'wuu', explanation: 'wuu = statement. Focus on the action of paying.' },
    { id: 'l2-u-04', type: 'three-ways', prompt: 'Write three ways:', englishHint: 'The girl / went / to school', correctAnswer: ['Gabadha way tegay dugsiga.', 'Gabadha baa dugsiga tegay.', 'Waxay gabadha tegay waa dugsiga.'], explanation: 'way = action focus, baa = noun focus, waxa = spotlight on destination.' },
    { id: 'l2-u-05', type: 'three-ways', prompt: 'Write three ways:', englishHint: 'The student / read / the book', correctAnswer: ['Ardayga wuu akhriyay buugga.', 'Ardayga baa buugga akhriyay.', 'Wuxuu ardayga akhriyay waa buugga.'], explanation: 'wuu emphasizes reading, baa emphasizes the student, waxa spotlights the book.' },
    { id: 'l2-u-06', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: '_____ lacag keenay waa macallinka.', englishHint: 'The one who brought money was the teacher. (spotlight)', options: ['Waxaa', 'wuu', 'baa'], correctAnswer: 'Waxaa', explanation: 'Waxaa = spotlight with copula. "The one who brought money was the teacher."' },
    { id: 'l2-u-07', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Ardayga _____ buugga akhriyay.', englishHint: 'It was THE STUDENT who read the book. (emphasis on student)', options: ['baa', 'wuu', 'Waxuu'], correctAnswer: 'baa', explanation: 'baa focuses on the noun (ardayga). "It was THE STUDENT who read."' },
    { id: 'l2-u-08', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Aabo _____ guriga galay.', englishHint: 'Father ENTERED the house. (emphasis on entering)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'wuu', explanation: 'wuu = statement. Focus on the action of entering.' },
  ],
  gateDrills: [
    { id: 'l2-q-01', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Cali _____ cunay.', englishHint: 'Ali ate. (emphasis on the action)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'wuu', explanation: 'wuu = statement, verb focus.' },
    { id: 'l2-q-02', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Cali _____ cuntada cunay.', englishHint: 'It was ALI who ate the food.', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'baa', explanation: 'baa = focus on the noun.' },
    { id: 'l2-q-03', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: '_____ Cali cunay waa hilib.', englishHint: 'What Ali ate was meat.', options: ['Waxuu', 'bay', 'wuu'], correctAnswer: 'Waxuu', explanation: 'Waxuu = spotlight construction.' },
    { id: 'l2-q-04', type: 'three-ways', prompt: 'Write three ways — waa, baa, waxa:', englishHint: 'Ali / ate / the food', correctAnswer: ['Cali wuu cunay cuntada.', 'Cali baa cuntada cunay.', 'Waxuu Cali cunay waa cuntada.'], explanation: 'waa = action focus, baa = noun focus, waxa = spotlight.' },
    { id: 'l2-q-05', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Wiilka _____ akhriyay.', englishHint: 'The boy READ. (emphasis on reading)', options: ['wuu', 'baa', 'Waxuu'], correctAnswer: 'wuu', explanation: 'wuu = statement, verb focus.' },
    { id: 'l2-q-06', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Wiilka _____ buugga akhriyay.', englishHint: 'It was THE BOY who read the book.', options: ['baa', 'wuu', 'Waxuu'], correctAnswer: 'baa', explanation: 'baa = focus on the noun.' },
    { id: 'l2-q-07', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: '_____ akhriyay waa buug.', englishHint: 'What he read was a book.', options: ['Waxuu', 'bay', 'wuu'], correctAnswer: 'Waxuu', explanation: 'Waxuu = spotlight construction.' },
    { id: 'l2-q-08', type: 'three-ways', prompt: 'Write three ways — waa, baa, waxa:', englishHint: 'Mother / cooked / rice', correctAnswer: ['Hooyada way dhigtay bariis.', 'Hooyada baa bariis dhigtay.', 'Waxay hooyada dhigtay waa bariis.'], explanation: 'way = verb focus, baa = noun focus, waxa = spotlight.' },
    { id: 'l2-q-09', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Gabadha _____ shaah cabay.', englishHint: 'The girl DRANK tea. (action focus)', options: ['way', 'baa', 'Waxay'], correctAnswer: 'way', explanation: 'way = statement (waa + ay), verb focus.' },
    { id: 'l2-q-10', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Gabadha _____ shaah cabay.', englishHint: 'It was THE GIRL who drank tea.', options: ['baa', 'way', 'Waxay'], correctAnswer: 'baa', explanation: 'baa = focus on the noun (gabadha).' },
    { id: 'l2-q-11', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: '_____ shaqeeyay waa macallinka.', englishHint: 'The one who worked was the teacher.', options: ['Waxaa', 'baa', 'wuu'], correctAnswer: 'Waxaa', explanation: 'Waxaa = spotlight with copula.' },
    { id: 'l2-q-12', type: 'three-ways', prompt: 'Write three ways — waa, baa, waxa:', englishHint: 'The teacher / brought / money', correctAnswer: ['Macallinka wuu keenay lacag.', 'Macallinka baa lacag keenay.', 'Waxuu macallinka keenay waa lacag.'], explanation: 'wuu = action, baa = noun, waxa = spotlight.' },
    { id: 'l2-q-13', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: 'Hooyada _____ keentay cunto.', englishHint: 'Mother BROUGHT food. (action focus)', options: ['way', 'baa', 'Waxay'], correctAnswer: 'way', explanation: 'way = statement (waa + ay), verb focus.' },
    { id: 'l2-q-14', type: 'fill-blank', prompt: 'Fill in the correct marker:', somaliSentence: '_____ cunto keentay.', englishHint: 'It was MOTHER who brought food.', options: ['Hooyada baa', 'Hooyada wuu', 'Waxay'], correctAnswer: 'Hooyada baa', explanation: 'baa focuses on the noun (Hooyada).' },
    { id: 'l2-q-15', type: 'three-ways', prompt: 'Write three ways — waa, baa, waxa:', englishHint: 'Father / entered / the house', correctAnswer: ['Aabo wuu galay guriga.', 'Aabo baa guriga galay.', 'Waxuu aabo galay waa guriga.'], explanation: 'wuu = action, baa = noun, waxa = spotlight.' },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// LEVELS array + helpers
// ═════════════════════════════════════════════════════════════════════════════

export type Phase = 'map' | 'rule' | 'guided' | 'unguided' | 'gate' | 'complete';

// ─── Utility functions ──────────────────────────────────────────────────────

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function checkAnswer(user: string, correct: string): boolean {
  return user.trim().toLowerCase().replace(/[.!?]/g, '') ===
    correct.trim().toLowerCase().replace(/[.!?]/g, '');
}

export const TYPE_LABELS: Record<ExerciseType, string> = {
  'marker-tap': 'Marker Tap',
  'marker-classify': 'Marker Classify',
  'fill-blank': 'Fill Blank',
  'three-ways': 'Three Ways',
  'contraction-decompose': 'Decompose',
  'contraction-build': 'Build Contraction',
  'word-scramble': 'Word Scramble',
  'blueprint-build': 'Blueprint Build',
  'pick-preposition': 'Pick Preposition',
  'add-direction': 'Add Direction',
  'full-stack': 'Full Stack',
  'pick-connector': 'Pick Connector',
  'combine-sentences': 'Combine Sentences',
  'free-build': 'Free Build',
};

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL 3: Subject Pronoun Contractions
// ═════════════════════════════════════════════════════════════════════════════

const level3: LevelData = {
  id: 3,
  title: 'Subject Pronoun Contractions',
  subtitle: 'Decode and build fused marker+pronoun forms',
  color: '#06b6d4',
  rule: {
    title: 'The Contraction Table',
    content: 'Somali fuses the marker with the subject pronoun into a single word.\n\nwaa family (STATEMENT):\n  waa + aan → waan  |  waa + aad → waad  |  waa + uu → wuu  |  waa + ay → way\n\nbaa family (FOCUS):\n  baa + aan → baan  |  baa + aad → baad  |  baa + uu → buu  |  baa + ay → bay\n\nwaxa family (SPOTLIGHT):\n  waxa + aan → waxaan  |  waxa + aad → waxaad  |  waxa + uu → wuxuu  |  waxa + ay → waxay',
    examples: [
      { somali: 'waan', breakdown: 'waa + aan', english: 'I am / I (statement)' },
      { somali: 'bay', breakdown: 'baa + ay', english: 'It is she who... (focus)' },
      { somali: 'wuxuu', breakdown: 'waxa + uu', english: 'What he... (spotlight)' },
      { somali: 'waxaad', breakdown: 'waxa + aad', english: 'What you... (spotlight)' },
    ],
  },
  guidedDrills: [
    // ─── Guided: contraction-decompose (12) ───
    { id: 'l3-g-01', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'waan', correctAnswer: ['waa', 'aan'], explanation: 'waan = waa + aan. Statement marker (waa) + pronoun "I" (aan).' },
    { id: 'l3-g-02', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'bay', correctAnswer: ['baa', 'ay'], explanation: 'bay = baa + ay. Focus marker (baa) + pronoun "she/they" (ay).' },
    { id: 'l3-g-03', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'waxaad', correctAnswer: ['waxa', 'aad'], explanation: 'waxaad = waxa + aad. Spotlight marker (waxa) + pronoun "you" (aad).' },
    { id: 'l3-g-04', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'buu', correctAnswer: ['baa', 'uu'], explanation: 'buu = baa + uu. Focus marker (baa) + pronoun "he" (uu). Note: baa + uu → buu (vowel change).' },
    { id: 'l3-g-05', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'way', correctAnswer: ['waa', 'ay'], explanation: 'way = waa + ay. Statement marker (waa) + pronoun "she/they" (ay).' },
    { id: 'l3-g-06', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'waxaan', correctAnswer: ['waxa', 'aan'], explanation: 'waxaan = waxa + aan. Spotlight marker (waxa) + pronoun "I" (aan).' },
    { id: 'l3-g-07', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'baad', correctAnswer: ['baa', 'aad'], explanation: 'baad = baa + aad. Focus marker (baa) + pronoun "you" (aad).' },
    { id: 'l3-g-08', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'wuxuu', correctAnswer: ['waxa', 'uu'], explanation: 'wuxuu = waxa + uu. Spotlight marker (waxa) + pronoun "he" (uu). Note: waxa + uu → wuxuu (vowel change).' },
    { id: 'l3-g-09', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'waxay', correctAnswer: ['waxa', 'ay'], explanation: 'waxay = waxa + ay. Spotlight marker (waxa) + pronoun "she/they" (ay).' },
    { id: 'l3-g-10', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'baan', correctAnswer: ['baa', 'aan'], explanation: 'baan = baa + aan. Focus marker (baa) + pronoun "I" (aan).' },
    { id: 'l3-g-11', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'waad', correctAnswer: ['waa', 'aad'], explanation: 'waad = waa + aad. Statement marker (waa) + pronoun "you" (aad).' },
    { id: 'l3-g-12', type: 'contraction-decompose', prompt: 'Break this contraction into marker + pronoun:', somaliSentence: 'wuu', correctAnswer: ['waa', 'uu'], explanation: 'wuu = waa + uu. Statement marker (waa) + pronoun "he" (uu).' },
    // ─── Guided: contraction-build (12) ───
    { id: 'l3-g-13', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'statement (waa) + I (aan)', correctAnswer: 'waan', explanation: 'waa + aan = waan. The statement marker waa fuses with the pronoun aan.' },
    { id: 'l3-g-14', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'focus (baa) + she/they (ay)', correctAnswer: 'bay', explanation: 'baa + ay = bay. The focus marker baa fuses with the pronoun ay.' },
    { id: 'l3-g-15', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'spotlight (waxa) + he (uu)', correctAnswer: 'wuxuu', explanation: 'waxa + uu = wuxuu. Note the vowel change: waxa + uu → wuxuu.' },
    { id: 'l3-g-16', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'statement (waa) + you (aad)', correctAnswer: 'waad', explanation: 'waa + aad = waad. The statement marker fuses with the pronoun aad.' },
    { id: 'l3-g-17', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'focus (baa) + I (aan)', correctAnswer: 'baan', explanation: 'baa + aan = baan. The focus marker fuses with the pronoun aan.' },
    { id: 'l3-g-18', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'spotlight (waxa) + she/they (ay)', correctAnswer: 'waxay', explanation: 'waxa + ay = waxay. The spotlight marker fuses with the pronoun ay.' },
    { id: 'l3-g-19', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'statement (waa) + he (uu)', correctAnswer: 'wuu', explanation: 'waa + uu = wuu. The statement marker fuses with the pronoun uu.' },
    { id: 'l3-g-20', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'focus (baa) + you (aad)', correctAnswer: 'baad', explanation: 'baa + aad = baad. The focus marker fuses with the pronoun aad.' },
    { id: 'l3-g-21', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'spotlight (waxa) + I (aan)', correctAnswer: 'waxaan', explanation: 'waxa + aan = waxaan. The spotlight marker fuses with the pronoun aan.' },
    { id: 'l3-g-22', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'statement (waa) + she/they (ay)', correctAnswer: 'way', explanation: 'waa + ay = way. The statement marker fuses with the pronoun ay.' },
    { id: 'l3-g-23', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'focus (baa) + he (uu)', correctAnswer: 'buu', explanation: 'baa + uu = buu. Note the vowel change: baa + uu → buu.' },
    { id: 'l3-g-24', type: 'contraction-build', prompt: 'Build the contraction from marker + pronoun:', englishHint: 'spotlight (waxa) + you (aad)', correctAnswer: 'waxaad', explanation: 'waxa + aad = waxaad. The spotlight marker fuses with the pronoun aad.' },
  ],
  unguidedDrills: [
    { id: 'l3-u-01', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'baad', correctAnswer: ['baa', 'aad'], explanation: 'baad = baa + aad (focus + you).' },
    { id: 'l3-u-02', type: 'contraction-build', prompt: 'Build the contraction:', englishHint: 'focus (baa) + she (ay)', correctAnswer: 'bay', explanation: 'baa + ay = bay.' },
    { id: 'l3-u-03', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'wuxuu', correctAnswer: ['waxa', 'uu'], explanation: 'wuxuu = waxa + uu (spotlight + he).' },
    { id: 'l3-u-04', type: 'contraction-build', prompt: 'Build the contraction:', englishHint: 'statement (waa) + I (aan)', correctAnswer: 'waan', explanation: 'waa + aan = waan.' },
    { id: 'l3-u-05', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'waad', correctAnswer: ['waa', 'aad'], explanation: 'waad = waa + aad (statement + you).' },
    { id: 'l3-u-06', type: 'contraction-build', prompt: 'Build the contraction:', englishHint: 'spotlight (waxa) + I (aan)', correctAnswer: 'waxaan', explanation: 'waxa + aan = waxaan.' },
    { id: 'l3-u-07', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'buu', correctAnswer: ['baa', 'uu'], explanation: 'buu = baa + uu (focus + he). Vowel change: aa + u → u.' },
    { id: 'l3-u-08', type: 'contraction-build', prompt: 'Build the contraction:', englishHint: 'statement (waa) + he (uu)', correctAnswer: 'wuu', explanation: 'waa + uu = wuu.' },
  ],
  gateDrills: [
    { id: 'l3-q-01', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'waan', correctAnswer: ['waa', 'aan'], explanation: 'waan = waa + aan (statement + I).' },
    { id: 'l3-q-02', type: 'contraction-build', prompt: 'Build:', englishHint: 'focus (baa) + she (ay)', correctAnswer: 'bay', explanation: 'baa + ay = bay.' },
    { id: 'l3-q-03', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'waxaad', correctAnswer: ['waxa', 'aad'], explanation: 'waxaad = waxa + aad (spotlight + you).' },
    { id: 'l3-q-04', type: 'contraction-build', prompt: 'Build:', englishHint: 'spotlight (waxa) + he (uu)', correctAnswer: 'wuxuu', explanation: 'waxa + uu = wuxuu.' },
    { id: 'l3-q-05', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'wuu', correctAnswer: ['waa', 'uu'], explanation: 'wuu = waa + uu (statement + he).' },
    { id: 'l3-q-06', type: 'contraction-build', prompt: 'Build:', englishHint: 'statement (waa) + you (aad)', correctAnswer: 'waad', explanation: 'waa + aad = waad.' },
    { id: 'l3-q-07', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'baan', correctAnswer: ['baa', 'aan'], explanation: 'baan = baa + aan (focus + I).' },
    { id: 'l3-q-08', type: 'contraction-build', prompt: 'Build:', englishHint: 'focus (baa) + he (uu)', correctAnswer: 'buu', explanation: 'baa + uu = buu.' },
    { id: 'l3-q-09', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'way', correctAnswer: ['waa', 'ay'], explanation: 'way = waa + ay (statement + she/they).' },
    { id: 'l3-q-10', type: 'contraction-build', prompt: 'Build:', englishHint: 'spotlight (waxa) + she (ay)', correctAnswer: 'waxay', explanation: 'waxa + ay = waxay.' },
    { id: 'l3-q-11', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'waxaan', correctAnswer: ['waxa', 'aan'], explanation: 'waxaan = waxa + aan (spotlight + I).' },
    { id: 'l3-q-12', type: 'contraction-build', prompt: 'Build:', englishHint: 'focus (baa) + you (aad)', correctAnswer: 'baad', explanation: 'baa + aad = baad.' },
    { id: 'l3-q-13', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'waxay', correctAnswer: ['waxa', 'ay'], explanation: 'waxay = waxa + ay (spotlight + she/they).' },
    { id: 'l3-q-14', type: 'contraction-build', prompt: 'Build:', englishHint: 'statement (waa) + she (ay)', correctAnswer: 'way', explanation: 'waa + ay = way.' },
    { id: 'l3-q-15', type: 'contraction-decompose', prompt: 'Decompose:', somaliSentence: 'baad', correctAnswer: ['baa', 'aad'], explanation: 'baad = baa + aad (focus + you).' },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL 4: SOV Word Order Assembly
// ═════════════════════════════════════════════════════════════════════════════

const level4: LevelData = {
  id: 4,
  title: 'SOV Word Order',
  subtitle: 'Arrange words in correct Somali order',
  color: '#22c55e',
  rule: {
    title: 'Subject – Object – Verb (SOV)',
    content: 'Somali uses SOV word order — the verb comes LAST.\n\nBasic pattern:\n  Subject + Marker + Object + Verb\n\nWith focus marker (baa):\n  Subject + baa + Object + Verb\n\nWith spotlight (waxa):\n  Waxa+pronoun + Subject + Verb + Object\n\nThe marker always comes early — right after the subject (or at the start in waxa constructions).',
    examples: [
      { somali: 'Cali wuu cunay cuntada.', breakdown: 'Subject + Marker + Verb + Object', english: 'Ali ate the food.' },
      { somali: 'Wiilka baa buugga akhriyay.', breakdown: 'Subject + Focus + Object + Verb', english: 'It was the boy who read the book.' },
      { somali: 'Waxuu wiilka akhriyay buug.', breakdown: 'Spotlight + Subject + Verb + Object', english: 'What the boy read was a book.' },
    ],
  },
  guidedDrills: [
    // ─── Guided: word-scramble (12) ───
    { id: 'l4-g-01', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['cunay', 'Cali', 'wuu'], englishHint: 'Ali ate.', correctAnswer: 'Cali wuu cunay.', explanation: 'Subject + Marker + Verb. No object in this sentence.' },
    { id: 'l4-g-02', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['baa', 'buugga', 'akhriyay', 'wiilka'], englishHint: 'It was the boy who read the book.', correctAnswer: 'Wiilka baa buugga akhriyay.', explanation: 'Subject + Focus Marker + Object + Verb.' },
    { id: 'l4-g-03', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['tegay', 'way', 'dugsiga', 'gabadha'], englishHint: 'The girl went to school.', correctAnswer: 'Gabadha way tegay dugsiga.', explanation: 'Subject + Statement Marker + Verb + Object.' },
    { id: 'l4-g-04', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['waxay', 'bariis', 'hooyada', 'dhigtay'], englishHint: 'What mother cooked was rice.', correctAnswer: 'Hooyada waxay dhigtay bariis.', explanation: 'Subject + Spotlight + Verb + Object.' },
    { id: 'l4-g-05', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['ciyaaray', 'wiilka', 'wuu'], englishHint: 'The boy played.', correctAnswer: 'Wiilka wuu ciyaaray.', explanation: 'Subject + Marker + Verb.' },
    { id: 'l4-g-06', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['suuqa', 'baa', 'ninka', 'tegay'], englishHint: 'It was the man who went to the market.', correctAnswer: 'Ninka baa suuqa tegay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 'l4-g-07', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['waan', 'biyo', 'cabay'], englishHint: 'I drank water.', correctAnswer: 'Waan cabay biyo.', explanation: 'Marker + Verb + Object. (Subject is inside the contraction waan.)' },
    { id: 'l4-g-08', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['keenay', 'cunto', 'waxaan'], englishHint: 'What I brought was food.', correctAnswer: 'Waxaan keenay cunto.', explanation: 'Spotlight + Verb + Object.' },
    { id: 'l4-g-09', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['shaah', 'bay', 'cabay', 'naagta'], englishHint: 'The woman drank tea.', correctAnswer: 'Naagta bay cabay shaah.', explanation: 'Subject + Focus + Verb + Object.' },
    { id: 'l4-g-10', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['wuu', 'aabo', 'guriga', 'galay'], englishHint: 'Father entered the house.', correctAnswer: 'Aabo wuu galay guriga.', explanation: 'Subject + Marker + Verb + Object.' },
    { id: 'l4-g-11', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['shaqeeyay', 'macallinka', 'baa'], englishHint: 'It was the teacher who worked.', correctAnswer: 'Macallinka baa shaqeeyay.', explanation: 'Subject + Focus + Verb.' },
    { id: 'l4-g-12', type: 'word-scramble', prompt: 'Drag the words into correct Somali word order:', scrambledWords: ['waxuu', 'buug', 'qoray', 'wiilka'], englishHint: 'What the boy wrote was a book.', correctAnswer: 'Waxuu wiilka qoray buug.', explanation: 'Spotlight + Subject + Verb + Object.' },
    // ─── Guided: blueprint-build (8) ───
    { id: 'l4-g-13', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { subject: 'the man (ninka)', marker: 'statement + he (wuu)', object: 'the food (cuntada)', verb: 'ate (cunay)' }, englishHint: 'The man ate the food.', correctAnswer: 'Ninka wuu cunay cuntada.', explanation: 'Subject + Marker + Object + Verb. Standard SOV order.' },
    { id: 'l4-g-14', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { marker: 'spotlight + I (waxaan)', verb: 'read (akhriyay)', object: 'a book (buug)' }, englishHint: 'What I read was a book.', correctAnswer: 'Waxaan akhriyay buug.', explanation: 'Spotlight + Verb + Object. The subject "I" is inside waxaan.' },
    { id: 'l4-g-15', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { subject: 'the girl (gabadha)', marker: 'focus (baa)', object: 'tea (shaah)', verb: 'drank (cabay)' }, englishHint: 'It was the girl who drank tea.', correctAnswer: 'Gabadha baa shaah cabay.', explanation: 'Subject + Focus + Object + Verb. With baa, object comes before the verb.' },
    { id: 'l4-g-16', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { subject: 'mother (hooyada)', marker: 'statement + she (way)', object: 'rice (bariis)', verb: 'cooked (dhigtay)' }, englishHint: 'Mother cooked rice.', correctAnswer: 'Hooyada way dhigtay bariis.', explanation: 'Subject + Marker + Object + Verb. Standard SOV.' },
    { id: 'l4-g-17', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { marker: 'spotlight + he (wuxuu)', verb: 'entered (galay)', object: 'the house (guriga)' }, englishHint: 'What he entered was the house.', correctAnswer: 'Wuxuu galay guriga.', explanation: 'Spotlight + Verb + Object. Subject "he" is inside wuxuu.' },
    { id: 'l4-g-18', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { subject: 'the teacher (macallinka)', marker: 'statement + he (wuu)', verb: 'worked (shaqeeyay)' }, englishHint: 'The teacher worked.', correctAnswer: 'Macallinka wuu shaqeeyay.', explanation: 'Subject + Marker + Verb. No object in this sentence.' },
    { id: 'l4-g-19', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { subject: 'father (aabo)', marker: 'focus (baa)', object: 'money (lacag)', verb: 'paid (bixiyay)' }, englishHint: 'It was father who paid money.', correctAnswer: 'Aabo baa lacag bixiyay.', explanation: 'Subject + Focus + Object + Verb. baa highlights the subject.' },
    { id: 'l4-g-20', type: 'blueprint-build', prompt: 'Build the Somali sentence from this blueprint:', blueprint: { marker: 'spotlight + she (waxay)', verb: 'brought (keentay)', object: 'water (biyo)' }, englishHint: 'What she brought was water.', correctAnswer: 'Waxay keentay biyo.', explanation: 'Spotlight + Verb + Object. Subject "she" is inside waxay.' },
  ],
  unguidedDrills: [
    { id: 'l4-u-01', type: 'word-scramble', prompt: 'Unscramble:', scrambledWords: ['cuntada', 'hooyada', 'way', 'cunay'], englishHint: 'Mother ate the food.', correctAnswer: 'Hooyada way cuntada cunay.', explanation: 'Subject + Marker + Object + Verb.' },
    { id: 'l4-u-02', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'the woman (naagta)', marker: 'focus (baa)', object: 'the book (buugga)', verb: 'read (akhriyay)' }, englishHint: 'It was the woman who read the book.', correctAnswer: 'Naagta baa buugga akhriyay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 'l4-u-03', type: 'word-scramble', prompt: 'Unscramble:', scrambledWords: ['tegay', 'suuqa', 'ninka', 'wuu'], englishHint: 'The man went to the market.', correctAnswer: 'Ninka wuu tegay suuqa.', explanation: 'Subject + Marker + Verb + Object.' },
    { id: 'l4-u-04', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'Ali (Cali)', marker: 'statement + he (wuu)', object: 'tea (shaah)', verb: 'drank (cabay)' }, englishHint: 'Ali drank tea.', correctAnswer: 'Cali wuu cabay shaah.', explanation: 'Subject + Marker + Verb + Object.' },
    { id: 'l4-u-05', type: 'word-scramble', prompt: 'Unscramble:', scrambledWords: ['lacag', 'baa', 'macallinka', 'bixiyay'], englishHint: 'It was the teacher who paid money.', correctAnswer: 'Macallinka baa lacag bixiyay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 'l4-u-06', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { marker: 'spotlight + I (waxaan)', verb: 'found (helay)', object: 'money (lacag)' }, englishHint: 'What I found was money.', correctAnswer: 'Waxaan helay lacag.', explanation: 'Spotlight + Verb + Object.' },
    { id: 'l4-u-07', type: 'word-scramble', prompt: 'Unscramble:', scrambledWords: ['dugsiga', 'gabadha', 'tegay', 'way'], englishHint: 'The girl went to school.', correctAnswer: 'Gabadha way tegay dugsiga.', explanation: 'Subject + Marker + Verb + Object.' },
    { id: 'l4-u-08', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'the boy (wiilka)', marker: 'statement + he (wuu)', verb: 'played (ciyaaray)' }, englishHint: 'The boy played.', correctAnswer: 'Wiilka wuu ciyaaray.', explanation: 'Subject + Marker + Verb.' },
  ],
  gateDrills: [
    { id: 'l4-q-01', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['cunay', 'Cali', 'wuu'], englishHint: 'Ali ate.', correctAnswer: 'Cali wuu cunay.', explanation: 'Subject + Marker + Verb.' },
    { id: 'l4-q-02', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'the boy (wiilka)', marker: 'focus (baa)', object: 'the book (buugga)', verb: 'read (akhriyay)' }, englishHint: 'It was the boy who read the book.', correctAnswer: 'Wiilka baa buugga akhriyay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 'l4-q-03', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['tegay', 'way', 'dugsiga', 'gabadha'], englishHint: 'The girl went to school.', correctAnswer: 'Gabadha way tegay dugsiga.', explanation: 'Subject + Marker + Verb + Object.' },
    { id: 'l4-q-04', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'mother (hooyada)', marker: 'spotlight + she (waxay)', object: 'rice (bariis)', verb: 'cooked (dhigtay)' }, englishHint: 'What mother cooked was rice.', correctAnswer: 'Hooyada waxay dhigtay bariis.', explanation: 'Subject + Spotlight + Verb + Object.' },
    { id: 'l4-q-05', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['wuu', 'aabo', 'guriga', 'galay'], englishHint: 'Father entered the house.', correctAnswer: 'Aabo wuu galay guriga.', explanation: 'Subject + Marker + Verb + Object.' },
    { id: 'l4-q-06', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { marker: 'spotlight + he (wuxuu)', verb: 'entered (galay)', object: 'the house (guriga)' }, englishHint: 'What he entered was the house.', correctAnswer: 'Wuxuu galay guriga.', explanation: 'Spotlight + Verb + Object.' },
    { id: 'l4-q-07', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['suuqa', 'baa', 'ninka', 'tegay'], englishHint: 'It was the man who went to the market.', correctAnswer: 'Ninka baa suuqa tegay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 'l4-q-08', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'the teacher (macallinka)', marker: 'statement + he (wuu)', verb: 'worked (shaqeeyay)' }, englishHint: 'The teacher worked.', correctAnswer: 'Macallinka wuu shaqeeyay.', explanation: 'Subject + Marker + Verb.' },
    { id: 'l4-q-09', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['waan', 'biyo', 'cabay'], englishHint: 'I drank water.', correctAnswer: 'Waan cabay biyo.', explanation: 'Marker + Verb + Object.' },
    { id: 'l4-q-10', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'father (aabo)', marker: 'focus (baa)', object: 'money (lacag)', verb: 'paid (bixiyay)' }, englishHint: 'It was father who paid money.', correctAnswer: 'Aabo baa lacag bixiyay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 'l4-q-11', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['waxaan', 'buug', 'akhriyay'], englishHint: 'What I read was a book.', correctAnswer: 'Waxaan akhriyay buug.', explanation: 'Spotlight + Verb + Object.' },
    { id: 'l4-q-12', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { subject: 'the girl (gabadha)', marker: 'focus (baa)', object: 'tea (shaah)', verb: 'drank (cabay)' }, englishHint: 'It was the girl who drank tea.', correctAnswer: 'Gabadha baa shaah cabay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 'l4-q-13', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['keenay', 'cunto', 'waxaan'], englishHint: 'What I brought was food.', correctAnswer: 'Waxaan keenay cunto.', explanation: 'Spotlight + Verb + Object.' },
    { id: 'l4-q-14', type: 'blueprint-build', prompt: 'Build from blueprint:', blueprint: { marker: 'spotlight + she (waxay)', verb: 'brought (keentay)', object: 'water (biyo)' }, englishHint: 'What she brought was water.', correctAnswer: 'Waxay keentay biyo.', explanation: 'Spotlight + Verb + Object.' },
    { id: 'l4-q-15', type: 'word-scramble', prompt: 'Unscramble into correct order:', scrambledWords: ['ciyaaray', 'wiilka', 'wuu'], englishHint: 'The boy played.', correctAnswer: 'Wiilka wuu ciyaaray.', explanation: 'Subject + Marker + Verb.' },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL 5: Prepositions + Direction
// ═════════════════════════════════════════════════════════════════════════════

const level5: LevelData = {
  id: 5,
  title: 'Prepositions + Direction',
  subtitle: 'Stack u/ku/ka/la and soo/sii before the verb',
  color: '#f59e0b',
  rule: {
    title: 'Prepositions & Direction Words',
    content: 'Prepositions and direction words stack BEFORE the verb:\n\nSubject + MARKER + [preposition] + [direction] + VERB + Object\n\nPrepositions:\n  u = to / for\n  ku = in / at / by means of\n  ka = from / about\n  la = with / one (passive)\n\nDirection words:\n  soo = toward speaker\n  sii = away from speaker\n  wada = together\n  kala = apart\n\nWhen stacking: preposition comes first, then direction.\nExample: Wuu u soo keenay = He for+toward brought = He brought it over.',
    examples: [
      { somali: 'Wuu u tegay suuqa.', breakdown: 'Marker + u (to) + verb + object', english: 'He went to the market.' },
      { somali: 'Way ka soo noqotay dugsiga.', breakdown: 'Marker + ka (from) + soo (toward) + verb + object', english: 'She came back from school.' },
      { somali: 'Waan u sii diray.', breakdown: 'Marker + u (for) + sii (away) + verb', english: 'I sent it away (for him).' },
    ],
  },
  guidedDrills: [
    // ─── Guided: pick-preposition (8) ───
    { id: 'l5-g-01', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Wuu _____ tegay suuqa.', englishHint: 'He went TO the market.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'u', explanation: 'u = to/for. Use u when expressing movement toward a destination or for a beneficiary.' },
    { id: 'l5-g-02', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Waan _____ joogaa guriga.', englishHint: 'I am staying IN the house.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'ku', explanation: 'ku = in/at. Use ku for location or position inside/at a place.' },
    { id: 'l5-g-03', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Wuu _____ yimid dugsiga.', englishHint: 'He came FROM school.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'ka', explanation: 'ka = from. Use ka for origin or source — where something came from.' },
    { id: 'l5-g-04', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Way _____ shaqeysay Cali.', englishHint: 'She worked WITH Ali.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'la', explanation: 'la = with. Use la for accompaniment or the impersonal passive ("one" does something).' },
    { id: 'l5-g-05', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Waan _____ qoray buugga.', englishHint: 'I wrote IN the book.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'ku', explanation: 'ku = in/at. Use ku when the action happens within or at a location.' },
    { id: 'l5-g-06', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Gabadha waxay _____ keentay hooyada.', englishHint: 'The girl brought (it) FOR mother.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'u', explanation: 'u = to/for. Use u when indicating a beneficiary — doing something for someone.' },
    { id: 'l5-g-07', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Ninka wuu _____ baxay guriga.', englishHint: 'The man left FROM the house.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'ka', explanation: 'ka = from. Use ka for departure or origin — leaving from somewhere.' },
    { id: 'l5-g-08', type: 'pick-preposition', prompt: 'Choose the correct preposition (u, ku, ka, la):', somaliSentence: 'Wiilka wuu _____ ciyaaray Maxamed.', englishHint: 'The boy played WITH Mohamed.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'la', explanation: 'la = with. Use la for doing something together with someone.' },
    // ─── Guided: add-direction (6) ───
    { id: 'l5-g-09', type: 'add-direction', prompt: 'Choose soo (toward speaker) or sii (away from speaker):', somaliSentence: 'Wuu _____ tegay.', englishHint: 'He kept going (away).', options: ['soo', 'sii'], correctAnswer: 'sii', explanation: 'sii = away from speaker. Use when movement is going farther away.' },
    { id: 'l5-g-10', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Way _____ gashay guriga.', englishHint: 'She came INTO the house (toward speaker).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker. Use when movement comes closer to where the speaker is.' },
    { id: 'l5-g-11', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Waan _____ keenay cunto.', englishHint: 'I brought food (toward here).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker. Bringing something to where you are.' },
    { id: 'l5-g-12', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Wuu _____ socday.', englishHint: 'He kept walking (away).', options: ['soo', 'sii'], correctAnswer: 'sii', explanation: 'sii = away from speaker. Ongoing movement away.' },
    { id: 'l5-g-13', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Waxay _____ noqotay.', englishHint: 'She came back (toward speaker).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker. Returning to where the speaker is.' },
    { id: 'l5-g-14', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Wiilka wuu _____ diray.', englishHint: 'The boy sent (it away).', options: ['soo', 'sii'], correctAnswer: 'sii', explanation: 'sii = away from speaker. Sending something away from you.' },
    // ─── Guided: full-stack (6) ───
    { id: 'l5-g-15', type: 'full-stack', prompt: 'Write the full Somali with preposition AND direction in correct order:', englishHint: 'He brought (it) to me (toward speaker)', correctAnswer: 'Wuu u soo keenay.', explanation: 'Marker + u (for) + soo (toward) + keenay (brought). Preposition comes before direction.' },
    { id: 'l5-g-16', type: 'full-stack', prompt: 'Write the full Somali with preposition AND direction in correct order:', englishHint: 'She came back from school', correctAnswer: 'Way ka soo noqotay dugsiga.', explanation: 'Marker + ka (from) + soo (toward) + noqotay (came back) + dugsiga (school). ka comes before soo.' },
    { id: 'l5-g-17', type: 'full-stack', prompt: 'Write the full Somali with preposition AND direction in correct order:', englishHint: 'I sent (it away) for him', correctAnswer: 'Waan u sii diray.', explanation: 'Marker + u (for) + sii (away) + diray (sent). u comes before sii.' },
    { id: 'l5-g-18', type: 'full-stack', prompt: 'Write the full Somali with preposition AND direction in correct order:', englishHint: 'He went on (away) to the market', correctAnswer: 'Wuu u sii tegay suuqa.', explanation: 'Marker + u (to) + sii (away) + tegay (went) + suuqa (market). Direction stacks after preposition.' },
    { id: 'l5-g-19', type: 'full-stack', prompt: 'Write the full Somali with preposition AND direction in correct order:', englishHint: 'They brought water from the well (toward here)', correctAnswer: 'Way ka soo keeneen biyo.', explanation: 'Marker + ka (from) + soo (toward) + keeneen (brought) + biyo (water).' },
    { id: 'l5-g-20', type: 'full-stack', prompt: 'Write the full Somali with preposition AND direction in correct order:', englishHint: 'She kept working with him (ongoing away)', correctAnswer: 'Way la sii shaqaysay.', explanation: 'Marker + la (with) + sii (ongoing away) + shaqaysay (worked). la before sii.' },
  ],
  unguidedDrills: [
    { id: 'l5-u-01', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Waan _____ akhriyay buugga.', englishHint: 'I read FROM the book.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'ka', explanation: 'ka = from. Reading from a source.' },
    { id: 'l5-u-02', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Wuu _____ keenay hilib.', englishHint: 'He brought meat (toward here).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker. Bringing meat here.' },
    { id: 'l5-u-03', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'He entered into the house', correctAnswer: 'Wuu ku galay guriga.', explanation: 'Marker + ku (in) + galay (entered) + guriga (house). Direction only, no soo/sii needed here.' },
    { id: 'l5-u-04', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Way _____ shaqeeyay macallinka.', englishHint: 'She worked WITH the teacher.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'la', explanation: 'la = with. Working alongside someone.' },
    { id: 'l5-u-05', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Hooyada way _____ keentay cunto.', englishHint: 'Mother brought food (toward speaker).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker. Mother brought food here.' },
    { id: 'l5-u-06', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'I came from the market (toward here)', correctAnswer: 'Waan ka soo yimid suuqa.', explanation: 'Marker + ka (from) + soo (toward) + yimid (came) + suuqa (market).' },
    { id: 'l5-u-07', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Wuu _____ bixiyay lacag hooyada.', englishHint: 'He paid money FOR mother.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'u', explanation: 'u = for. Paying money on behalf of mother.' },
    { id: 'l5-u-08', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'She went away to school', correctAnswer: 'Way u sii tegay dugsiga.', explanation: 'Marker + u (to) + sii (away) + tegay (went) + dugsiga (school).' },
  ],
  gateDrills: [
    { id: 'l5-q-01', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Wuu _____ tegay suuqa.', englishHint: 'He went TO the market.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'u', explanation: 'u = to. Movement toward destination.' },
    { id: 'l5-q-02', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Wuu _____ tegay.', englishHint: 'He kept going (away).', options: ['soo', 'sii'], correctAnswer: 'sii', explanation: 'sii = away from speaker.' },
    { id: 'l5-q-03', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'He brought (it) to me (toward speaker)', correctAnswer: 'Wuu u soo keenay.', explanation: 'Marker + u + soo + keenay.' },
    { id: 'l5-q-04', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Waan _____ joogaa guriga.', englishHint: 'I am staying IN the house.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'ku', explanation: 'ku = in/at. Location.' },
    { id: 'l5-q-05', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Way _____ gashay guriga.', englishHint: 'She came INTO the house (toward).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker.' },
    { id: 'l5-q-06', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'She came back from school', correctAnswer: 'Way ka soo noqotay dugsiga.', explanation: 'Marker + ka + soo + noqotay + dugsiga.' },
    { id: 'l5-q-07', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Wuu _____ yimid dugsiga.', englishHint: 'He came FROM school.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'ka', explanation: 'ka = from. Origin.' },
    { id: 'l5-q-08', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Waan _____ keenay cunto.', englishHint: 'I brought food (toward here).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker.' },
    { id: 'l5-q-09', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'I sent (it away) for him', correctAnswer: 'Waan u sii diray.', explanation: 'Marker + u + sii + diray.' },
    { id: 'l5-q-10', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Way _____ shaqeysay Cali.', englishHint: 'She worked WITH Ali.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'la', explanation: 'la = with. Accompaniment.' },
    { id: 'l5-q-11', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Wuu _____ socday.', englishHint: 'He kept walking (away).', options: ['soo', 'sii'], correctAnswer: 'sii', explanation: 'sii = away from speaker.' },
    { id: 'l5-q-12', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'He went on (away) to the market', correctAnswer: 'Wuu u sii tegay suuqa.', explanation: 'Marker + u + sii + tegay + suuqa.' },
    { id: 'l5-q-13', type: 'pick-preposition', prompt: 'Pick the preposition:', somaliSentence: 'Wiilka wuu _____ ciyaaray Maxamed.', englishHint: 'The boy played WITH Mohamed.', options: ['u', 'ku', 'ka', 'la'], correctAnswer: 'la', explanation: 'la = with.' },
    { id: 'l5-q-14', type: 'add-direction', prompt: 'Choose soo or sii:', somaliSentence: 'Waxay _____ noqotay.', englishHint: 'She came back (toward speaker).', options: ['soo', 'sii'], correctAnswer: 'soo', explanation: 'soo = toward speaker.' },
    { id: 'l5-q-15', type: 'full-stack', prompt: 'Write the full sentence:', englishHint: 'She kept working with him (ongoing away)', correctAnswer: 'Way la sii shaqaysay.', explanation: 'Marker + la + sii + shaqaysay.' },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL 6: Connectors + Compound Sentences
// ═════════════════════════════════════════════════════════════════════════════

const level6: LevelData = {
  id: 6,
  title: 'Connectors + Compound Sentences',
  subtitle: 'Join clauses with iyo, -na, -se, oo',
  color: '#ef4444',
  rule: {
    title: 'Four Connectors',
    content: 'Somali has four main connectors, each with a specific role:\n\n- iyo = and (joins NOUNS only): Cali iyo Sahra = Ali and Sahra\n- -na = and (joins SENTENCES, attaches to first word of next clause): waad-na = you too\n- -se = but (contrast, attaches to first word of contrasting clause): naagta-se = but the woman\n- oo = which/that (links relative clauses): guri oo weyn = a house which is big\n\nKey rule: iyo only joins nouns. For joining sentences, use -na. For contrast, use -se.',
    examples: [
      { somali: 'Cali iyo Sahra way tegeen dugsiga.', breakdown: 'iyo joins two nouns', english: 'Ali and Sahra went to school.' },
      { somali: 'Wuu cunay, waadna cuntay.', breakdown: '-na attaches to waad', english: 'He ate, and you ate too.' },
      { somali: 'Buug oo weyn baan akhriyay.', breakdown: 'oo links relative clause', english: 'I read a book which (was) big.' },
    ],
  },
  guidedDrills: [
    // ─── Guided: pick-connector (8) ───
    { id: 'l6-g-01', type: 'pick-connector', prompt: 'Fill in the correct connector (iyo, -na, -se, oo):', somaliSentence: 'Cali _____ Sahra way tegeen dugsiga.', englishHint: 'Ali AND Sahra went to school.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'iyo', explanation: 'iyo joins nouns. Cali and Sahra are both nouns (people).' },
    { id: 'l6-g-02', type: 'pick-connector', prompt: 'Fill in the correct connector:', somaliSentence: 'Wuu cunay, waad_____ cuntay.', englishHint: 'He ate, AND you ate too.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-na', explanation: '-na joins sentences. It attaches to the first word of the second clause: waad-na.' },
    { id: 'l6-g-03', type: 'pick-connector', prompt: 'Fill in the correct connector:', somaliSentence: 'Ninka wuu tegay, naagta_____ way joogtay.', englishHint: 'The man went, BUT the woman stayed.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-se', explanation: '-se means "but" and attaches to the first word of the contrasting clause: naagta-se.' },
    { id: 'l6-g-04', type: 'pick-connector', prompt: 'Fill in the correct connector:', somaliSentence: 'Buug _____ weyn baan akhriyay.', englishHint: 'I read a book WHICH (was) big.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'oo', explanation: 'oo links a relative clause to the noun it describes (book which is big).' },
    { id: 'l6-g-05', type: 'pick-connector', prompt: 'Fill in the correct connector:', somaliSentence: 'Hooyo _____ aabo way shaqeeyeen.', englishHint: 'Mother AND father worked.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'iyo', explanation: 'iyo joins nouns. Hooyo and aabo are both nouns.' },
    { id: 'l6-g-06', type: 'pick-connector', prompt: 'Fill in the correct connector:', somaliSentence: 'Waan cunay bariis, biyo_____ aan cabay.', englishHint: 'I ate rice, AND I drank water.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-na', explanation: '-na joins sentences: biyona = biyo + -na. "And water I drank."' },
    { id: 'l6-g-07', type: 'pick-connector', prompt: 'Fill in the correct connector:', somaliSentence: 'Gabadha way akhrisay, wiilka_____ wuu ciyaaray.', englishHint: 'The girl read, BUT the boy played.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-se', explanation: '-se for contrast: wiilkase = wiilka + -se. "But the boy played."' },
    { id: 'l6-g-08', type: 'pick-connector', prompt: 'Fill in the correct connector:', somaliSentence: 'Guri _____ cusub buu galay.', englishHint: 'He entered a house WHICH (was) new.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'oo', explanation: 'oo links a relative clause: guri oo cusub = a house which is new.' },
    // ─── Guided: combine-sentences (5) ───
    { id: 'l6-g-09', type: 'combine-sentences', prompt: 'Combine using -na ("and also"):', sentenceA: 'Cali wuu cunay.', sentenceB: 'Sahra way cuntay.', connectorType: '-na', englishHint: 'Ali ate, AND Sahra ate too.', correctAnswer: 'Cali wuu cunay, Sahra-wayna way cuntay.', explanation: 'Attach -na to the first word of the second clause: way-na (she-too).' },
    { id: 'l6-g-10', type: 'combine-sentences', prompt: 'Combine using -se ("but"):', sentenceA: 'Wiilka wuu tegay.', sentenceB: 'Gabadha way joogtay.', connectorType: '-se', englishHint: 'The boy went, BUT the girl stayed.', correctAnswer: 'Wiilka wuu tegay, gabadha-se way joogtay.', explanation: 'Attach -se to the first word of the contrasting clause: gabadha-se.' },
    { id: 'l6-g-11', type: 'combine-sentences', prompt: 'Combine using oo ("which/that"):', sentenceA: 'Waan akhriyay buug.', sentenceB: 'Buuggu waa weyn yahay.', connectorType: 'oo', englishHint: 'I read a book which was big.', correctAnswer: 'Waan akhriyay buug oo weyn.', explanation: 'oo links the relative description to the noun: buug oo weyn = a book which (is) big.' },
    { id: 'l6-g-12', type: 'combine-sentences', prompt: 'Combine using -se ("but"):', sentenceA: 'Hooyo way shaqaysay.', sentenceB: 'Aabo wuu seexday.', connectorType: '-se', englishHint: 'Mother worked, BUT father slept.', correctAnswer: 'Hooyo way shaqaysay, aabo-se wuu seexday.', explanation: '-se for contrast between clauses: aabo-se = aabo + -se.' },
    { id: 'l6-g-13', type: 'combine-sentences', prompt: 'Combine using -na ("and also"):', sentenceA: 'Waan cabay shaah.', sentenceB: 'Waan cunay hilib.', connectorType: '-na', englishHint: 'I drank tea, AND I ate meat.', correctAnswer: 'Waan cabay shaah, hilibna waan cunay.', explanation: '-na attaches to the first relevant word: hilib-na. "And meat I ate."' },
  ],
  unguidedDrills: [
    { id: 'l6-u-01', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Wiilka _____ gabadha way ciyaareen.', englishHint: 'The boy AND the girl played.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'iyo', explanation: 'iyo joins nouns (wiilka and gabadha).' },
    { id: 'l6-u-02', type: 'combine-sentences', prompt: 'Combine using -na:', sentenceA: 'Ninka wuu shaqeeyay.', sentenceB: 'Naagtu way shaqaysay.', connectorType: '-na', englishHint: 'The man worked, AND the woman worked too.', correctAnswer: 'Ninka wuu shaqeeyay, naagtu-na way shaqaysay.', explanation: '-na attaches to the first word of the second clause: naagtu-na.' },
    { id: 'l6-u-03', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Wuu keenay cunto, lacag_____ wuu bixiyay.', englishHint: 'He brought food, AND he paid money.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-na', explanation: '-na joins sentences: lacag-na = lacag + -na.' },
    { id: 'l6-u-04', type: 'combine-sentences', prompt: 'Combine using -se:', sentenceA: 'Gabadha way akhriyay.', sentenceB: 'Wiilka wuu seexday.', connectorType: '-se', englishHint: 'The girl read, BUT the boy slept.', correctAnswer: 'Gabadha way akhriyay, wiilkase wuu seexday.', explanation: '-se for contrast: wiilkase = wiilka + -se.' },
    { id: 'l6-u-05', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Buug _____ dheer baan helay.', englishHint: 'I found a book WHICH (was) tall/long.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'oo', explanation: 'oo links relative clause: buug oo dheer = a book which (is) long.' },
    { id: 'l6-u-06', type: 'combine-sentences', prompt: 'Combine using oo:', sentenceA: 'Waan arkey guri.', sentenceB: 'Gurigu waa weyn yahay.', connectorType: 'oo', englishHint: 'I saw a house which was big.', correctAnswer: 'Waan arkey guri oo weyn.', explanation: 'oo links the description to the noun: guri oo weyn = house which (is) big.' },
    { id: 'l6-u-07', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Macallin _____ arday way galay dugsiga.', englishHint: 'The teacher AND the student entered the school.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'iyo', explanation: 'iyo joins nouns: macallin iyo arday.' },
    { id: 'l6-u-08', type: 'combine-sentences', prompt: 'Combine using -na:', sentenceA: 'Hooyo way dhigtay bariis.', sentenceB: 'Aabo wuu cunay cuntada.', connectorType: '-na', englishHint: 'Mother cooked rice, AND father ate the food.', correctAnswer: 'Hooyo way dhigtay bariis, aabona wuu cunay cuntada.', explanation: '-na attaches to aabo: aabona = aabo + -na.' },
  ],
  gateDrills: [
    { id: 'l6-q-01', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Cali _____ Sahra way tegeen dugsiga.', englishHint: 'Ali AND Sahra went to school.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'iyo', explanation: 'iyo joins nouns.' },
    { id: 'l6-q-02', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Wuu cunay, waad_____ cuntay.', englishHint: 'He ate, AND you ate too.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-na', explanation: '-na joins sentences (waadna).' },
    { id: 'l6-q-03', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Ninka wuu tegay, naagta_____ way joogtay.', englishHint: 'The man went, BUT the woman stayed.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-se', explanation: '-se for contrast (naagtase).' },
    { id: 'l6-q-04', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Buug _____ weyn baan akhriyay.', englishHint: 'I read a book WHICH was big.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'oo', explanation: 'oo links relative clauses.' },
    { id: 'l6-q-05', type: 'combine-sentences', prompt: 'Combine using -na:', sentenceA: 'Cali wuu cunay.', sentenceB: 'Sahra way cuntay.', connectorType: '-na', englishHint: 'Ali ate, AND Sahra ate.', correctAnswer: 'Cali wuu cunay, Sahra-wayna way cuntay.', explanation: '-na attaches to first word of second clause.' },
    { id: 'l6-q-06', type: 'combine-sentences', prompt: 'Combine using -se:', sentenceA: 'Wiilka wuu tegay.', sentenceB: 'Gabadha way joogtay.', connectorType: '-se', englishHint: 'The boy went, BUT the girl stayed.', correctAnswer: 'Wiilka wuu tegay, gabadha-se way joogtay.', explanation: '-se attaches to contrasting clause.' },
    { id: 'l6-q-07', type: 'combine-sentences', prompt: 'Combine using oo:', sentenceA: 'Waan akhriyay buug.', sentenceB: 'Buuggu waa weyn yahay.', connectorType: 'oo', englishHint: 'I read a book which was big.', correctAnswer: 'Waan akhriyay buug oo weyn.', explanation: 'oo links description to noun.' },
    { id: 'l6-q-08', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Hooyo _____ aabo way shaqeeyeen.', englishHint: 'Mother AND father worked.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'iyo', explanation: 'iyo joins nouns.' },
    { id: 'l6-q-09', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Gabadha way akhrisay, wiilka_____ wuu ciyaaray.', englishHint: 'The girl read, BUT the boy played.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-se', explanation: '-se for contrast (wiilkase).' },
    { id: 'l6-q-10', type: 'combine-sentences', prompt: 'Combine using -se:', sentenceA: 'Hooyo way shaqaysay.', sentenceB: 'Aabo wuu seexday.', connectorType: '-se', englishHint: 'Mother worked, BUT father slept.', correctAnswer: 'Hooyo way shaqaysay, aabo-se wuu seexday.', explanation: '-se for contrast.' },
    { id: 'l6-q-11', type: 'combine-sentences', prompt: 'Combine using -na:', sentenceA: 'Waan cabay shaah.', sentenceB: 'Waan cunay hilib.', connectorType: '-na', englishHint: 'I drank tea, AND I ate meat.', correctAnswer: 'Waan cabay shaah, hilibna waan cunay.', explanation: '-na attaches to first word: hilibna.' },
    { id: 'l6-q-12', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Guri _____ cusub buu galay.', englishHint: 'He entered a house WHICH was new.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'oo', explanation: 'oo links relative clauses.' },
    { id: 'l6-q-13', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Waan cunay bariis, biyo_____ aan cabay.', englishHint: 'I ate rice, AND I drank water.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: '-na', explanation: '-na joins sentences (biyona).' },
    { id: 'l6-q-14', type: 'combine-sentences', prompt: 'Combine using iyo:', sentenceA: 'Cali wuu shaqeeyay.', sentenceB: 'Sahra way shaqaysay.', connectorType: 'iyo', englishHint: 'Ali AND Sahra worked (restructure as noun phrase).', correctAnswer: 'Cali iyo Sahra way shaqeeyeen.', explanation: 'iyo joins nouns: restructure as subject noun phrase + verb.' },
    { id: 'l6-q-15', type: 'pick-connector', prompt: 'Pick the connector:', somaliSentence: 'Wiilka _____ gabadha way ciyaareen.', englishHint: 'The boy AND the girl played.', options: ['iyo', '-na', '-se', 'oo'], correctAnswer: 'iyo', explanation: 'iyo joins nouns (wiilka and gabadha).' },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL 7: Full Sentence Construction
// ═════════════════════════════════════════════════════════════════════════════

const level7: LevelData = {
  id: 7,
  title: 'Full Sentence Construction',
  subtitle: 'English → Somali from scratch',
  color: '#ffa116',
  rule: {
    title: 'Putting It All Together',
    content: 'You now have all the building blocks:\n\n1. Choose the marker (waa/baa/waxa) based on emphasis\n2. Contract it with the subject pronoun\n3. Place prepositions and direction words before the verb\n4. Use connectors (iyo/-na/-se/oo) to join ideas\n5. Remember SOV word order — verb goes LAST\n\nChecklist for every sentence:\n☑ One marker only\n☑ Correct contraction (waan/bay/wuxuu etc.)\n☑ SOV order\n☑ Prepositions before direction before verb',
    examples: [
      { somali: 'Cali iyo Sahra way tegeen dugsiga.', breakdown: 'iyo (nouns) + way (waa+ay) + verb + object', english: 'Ali and Sahra went to school.' },
      { somali: 'Hooyada way ka soo keentay cunto suuqa.', breakdown: 'way (waa+ay) + ka (from) + soo (toward) + verb + object + object', english: 'Mother brought food from the market (toward here).' },
      { somali: 'Wiilka wuu akhriyay buug, gabadha-se way ciyaartay.', breakdown: 'wuu (waa+uu) + verb + object + -se (contrast) + verb', english: 'The boy read a book, but the girl played.' },
    ],
  },
  guidedDrills: [
    // ─── Guided: free-build simple (10) ───
    { id: 'l7-g-01', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'I ate rice.', correctAnswer: 'Waan cunay bariis.', explanation: 'Statement: waan (waa+aan) + cunay (ate) + bariis (rice). Simple SOV.' },
    { id: 'l7-g-02', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'The teacher worked.', correctAnswer: 'Macallinka wuu shaqeeyay.', explanation: 'Subject + statement marker (wuu = waa+uu) + verb.' },
    { id: 'l7-g-03', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'It was the boy who drank water.', correctAnswer: 'Wiilka baa biyo cabay.', explanation: 'Subject + focus marker (baa) + object + verb. FOCUS = who did it matters.' },
    { id: 'l7-g-04', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'Did mother cook?', correctAnswer: 'Ma hooyadu wax dhigtay?', explanation: 'Question marker (ma) + subject + verb. Yes/no question.' },
    { id: 'l7-g-05', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'What father brought was meat.', correctAnswer: 'Waxuu aabo keenay waa hilib.', explanation: 'Spotlight (waxuu = waxa+uu) + subject + verb + copula + object.' },
    { id: 'l7-g-06', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'The girl is reading a book.', correctAnswer: 'Gabadha way akhriyaysaa buug.', explanation: 'Subject + statement marker (way) + progressive verb + object.' },
    { id: 'l7-g-07', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'He went to school.', correctAnswer: 'Wuu tegay dugsiga.', explanation: 'Statement marker (wuu) + verb + object. Destination after verb.' },
    { id: 'l7-g-08', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'It was eaten. (use waa la)', correctAnswer: 'Waa la cunay.', explanation: 'Impersonal construction: waa la + verb. "One ate" = passive-like.' },
    { id: 'l7-g-09', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'Did you come from the market?', correctAnswer: 'Miyaad ka timid suuqa?', explanation: 'Question (Miyaad = miyaa+aad) + ka (from) + verb + object.' },
    { id: 'l7-g-10', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'She found money.', correctAnswer: 'Way helay lacag.', explanation: 'Statement marker (way = waa+ay) + verb + object.' },
    // ─── Guided: free-build complex (10) ───
    { id: 'l7-g-11', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'Ali and Sahra went to school.', correctAnswer: 'Cali iyo Sahra way tegeen dugsiga.', explanation: 'iyo joins nouns; way = statement + they. "Ali and Sahra — they went to school."' },
    { id: 'l7-g-12', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'The boy read a book, but the girl played.', correctAnswer: 'Wiilka wuu akhriyay buug, gabadha-se way ciyaartay.', explanation: '-se for contrast between clauses. wiilka (boy) vs gabadha (girl).' },
    { id: 'l7-g-13', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'What I drank was tea, and I also ate rice.', correctAnswer: 'Waxaan cabay waa shaah, bariisna waan cunay.', explanation: 'Spotlight + copula; bariis-na = bariis + -na ("and also rice").' },
    { id: 'l7-g-14', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'Mother brought food from the market (toward here).', correctAnswer: 'Hooyada way ka soo keentay cunto suuqa.', explanation: 'way (statement+she) + ka (from) + soo (toward) + keentay + cunto + suuqa.' },
    { id: 'l7-g-15', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'It was father who worked with the teacher.', correctAnswer: 'Aabo baa la shaqeeyay macallinka.', explanation: 'baa for focus on "father"; la = with. Subject + focus + la + verb + object.' },
    { id: 'l7-g-16', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'He came back from school and entered the house.', correctAnswer: 'Wuu ka soo noqday dugsiga wuuna galay guriga.', explanation: 'ka soo (from + toward) + -na (and, attached as -na → wuuna = wuu + -na).' },
    { id: 'l7-g-17', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'The woman cooked rice for the children (use u).', correctAnswer: 'Naagta way u dhigtay bariis carruurta.', explanation: 'way (she) + u (for) + dhigtay + bariis. u indicates beneficiary.' },
    { id: 'l7-g-18', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'Did Ali bring the book which was big?', correctAnswer: 'Cali miyuu keenay buugga oo weynaa?', explanation: 'oo for relative clause: buugga oo weynaa = the book which (is) big.' },
    { id: 'l7-g-19', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'She kept going to the market (away, ongoing).', correctAnswer: 'Way u sii joogtay inay suuqa tegayso.', explanation: 'u sii = to + away (ongoing). joogtay = kept (ongoing).' },
    { id: 'l7-g-20', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'What the teacher wrote was read. (two clauses)', correctAnswer: 'Waxuu macallinku qoray waa la akhriyay.', explanation: 'Spotlight on teacher; la = impersonal passive. "What the teacher wrote — it was read."' },
  ],
  unguidedDrills: [
    { id: 'l7-u-01', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'The man paid money.', correctAnswer: 'Ninka wuu bixiyay lacag.', explanation: 'Subject + wuu (statement+he) + verb + object.' },
    { id: 'l7-u-02', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'It was the woman who cooked rice.', correctAnswer: 'Naagta baa bariis dhigtay.', explanation: 'Subject + baa (focus) + object + verb.' },
    { id: 'l7-u-03', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'Did you drink tea?', correctAnswer: 'Ma cabday shaah?', explanation: 'ma (question) + verb + object. Simple question.' },
    { id: 'l7-u-04', type: 'free-build', prompt: 'Translate to Somali (use connectors):', englishHint: 'Father and mother entered the house.', correctAnswer: 'Aabo iyo hooyo way galeen guriga.', explanation: 'iyo joins nouns (aabo iyo hooyo); way = waa + ay (they).' },
    { id: 'l7-u-05', type: 'free-build', prompt: 'Translate to Somali (use prepositions):', englishHint: 'I came from school (toward here).', correctAnswer: 'Waan ka soo yimid dugsiga.', explanation: 'waan (I) + ka (from) + soo (toward) + yimid (came) + dugsiga (school).' },
    { id: 'l7-u-06', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'The girl played with the boy.', correctAnswer: 'Gabadha way la ciyaartay wiilka.', explanation: 'way (she) + la (with) + ciyaartay (played) + wiilka (boy).' },
    { id: 'l7-u-07', type: 'free-build', prompt: 'Translate to Somali (use connectors):', englishHint: 'He ate, but she slept.', correctAnswer: 'Wuu cunay, wayse seextay.', explanation: '-se for contrast: way-se = way + -se ("but she").' },
    { id: 'l7-u-08', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'What the boy found was money.', correctAnswer: 'Wuxuu wiilka helay waa lacag.', explanation: 'Spotlight (wuxuu) + subject + verb + copula + object.' },
  ],
  gateDrills: [
    // Gate = ALL 20 guided exercises (90% = 18/20 to pass)
    { id: 'l7-q-01', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'I ate rice.', correctAnswer: 'Waan cunay bariis.', explanation: 'waan (waa+aan) + cunay + bariis.' },
    { id: 'l7-q-02', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'The teacher worked.', correctAnswer: 'Macallinka wuu shaqeeyay.', explanation: 'Subject + wuu + verb.' },
    { id: 'l7-q-03', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'It was the boy who drank water.', correctAnswer: 'Wiilka baa biyo cabay.', explanation: 'Subject + baa + object + verb.' },
    { id: 'l7-q-04', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'Did mother cook?', correctAnswer: 'Ma hooyadu wax dhigtay?', explanation: 'ma + subject + verb.' },
    { id: 'l7-q-05', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'What father brought was meat.', correctAnswer: 'Waxuu aabo keenay waa hilib.', explanation: 'Spotlight + subject + verb + copula + object.' },
    { id: 'l7-q-06', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'The girl is reading a book.', correctAnswer: 'Gabadha way akhriyaysaa buug.', explanation: 'Subject + way + progressive verb + object.' },
    { id: 'l7-q-07', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'He went to school.', correctAnswer: 'Wuu tegay dugsiga.', explanation: 'wuu + verb + object.' },
    { id: 'l7-q-08', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'It was eaten. (use waa la)', correctAnswer: 'Waa la cunay.', explanation: 'Impersonal: waa la + verb.' },
    { id: 'l7-q-09', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'Did you come from the market?', correctAnswer: 'Miyaad ka timid suuqa?', explanation: 'Miyaad + ka + verb + object.' },
    { id: 'l7-q-10', type: 'free-build', prompt: 'Translate to Somali:', englishHint: 'She found money.', correctAnswer: 'Way helay lacag.', explanation: 'way + verb + object.' },
    { id: 'l7-q-11', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'Ali and Sahra went to school.', correctAnswer: 'Cali iyo Sahra way tegeen dugsiga.', explanation: 'iyo + way + verb + object.' },
    { id: 'l7-q-12', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'The boy read a book, but the girl played.', correctAnswer: 'Wiilka wuu akhriyay buug, gabadha-se way ciyaartay.', explanation: 'wuu + -se contrast.' },
    { id: 'l7-q-13', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'What I drank was tea, and I also ate rice.', correctAnswer: 'Waxaan cabay waa shaah, bariisna waan cunay.', explanation: 'Spotlight + copula + -na.' },
    { id: 'l7-q-14', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'Mother brought food from the market (toward here).', correctAnswer: 'Hooyada way ka soo keentay cunto suuqa.', explanation: 'ka soo stacked before verb.' },
    { id: 'l7-q-15', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'It was father who worked with the teacher.', correctAnswer: 'Aabo baa la shaqeeyay macallinka.', explanation: 'baa + la (with).' },
    { id: 'l7-q-16', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'He came back from school and entered the house.', correctAnswer: 'Wuu ka soo noqday dugsiga wuuna galay guriga.', explanation: 'ka soo + -na.' },
    { id: 'l7-q-17', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'The woman cooked rice for the children.', correctAnswer: 'Naagta way u dhigtay bariis carruurta.', explanation: 'u = for (beneficiary).' },
    { id: 'l7-q-18', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'Did Ali bring the book which was big?', correctAnswer: 'Cali miyuu keenay buugga oo weynaa?', explanation: 'oo relative clause.' },
    { id: 'l7-q-19', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'She kept going to the market (away).', correctAnswer: 'Way u sii joogtay inay suuqa tegayso.', explanation: 'u sii = to + away.' },
    { id: 'l7-q-20', type: 'free-build', prompt: 'Translate to Somali (use everything):', englishHint: 'What the teacher wrote was read.', correctAnswer: 'Waxuu macallinku qoray waa la akhriyay.', explanation: 'Spotlight + la passive.' },
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// EXPORT
// ═════════════════════════════════════════════════════════════════════════════

export const LEVELS: LevelData[] = [level1, level2, level3, level4, level5, level6, level7];

// Helper: get level by id
export function getLevelById(id: number): LevelData | undefined {
  return LEVELS.find((l) => l.id === id);
}

// Helper: get next level id
export function getNextLevelId(currentId: number): number | undefined {
  const idx = LEVELS.findIndex((l) => l.id === currentId);
  return LEVELS[idx + 1]?.id;
}

// Helper: get total exercise count per level
export function getLevelExerciseCount(levelId: number): { guided: number; unguided: number; gate: number } | undefined {
  const level = getLevelById(levelId);
  if (!level) return undefined;
  return {
    guided: level.guidedDrills.length,
    unguided: level.unguidedDrills.length,
    gate: level.gateDrills.length,
  };
}

// Helper: sample N random exercises from a drill set
export function sampleExercises(exercises: Exercise[], count: number): Exercise[] {
  const shuffled = [...exercises].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get gate exercises (can be used to generate a randomized gate quiz)
export function getGateDrills(levelId: number): Exercise[] {
  return getLevelById(levelId)?.gateDrills ?? [];
}

// Get exercises for a specific phase
export function getDrillsForPhase(levelId: number, phase: 'guided' | 'unguided' | 'gate'): Exercise[] {
  const level = getLevelById(levelId);
  if (!level) return [];
  if (phase === 'guided') return level.guidedDrills;
  if (phase === 'unguided') return level.unguidedDrills;
  return level.gateDrills;
}
