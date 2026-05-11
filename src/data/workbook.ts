// ============================================================================
// SOOMAALI GRAMMAR WORKBOOK — Sentence Assembly Workbook
// 7 levels, each isolating one grammar skill.
// ============================================================================

export interface VocabNoun {
  somali: string;
  meaning: string;
}

export interface VocabVerb {
  somali: string;
  meaning: string;
}

export const VOCABULARY_BANK = {
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
  ] as VocabNoun[],
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
  ] as VocabVerb[],
};

// ─── Drill Types ───────────────────────────────────────────────────────────

export type WorkbookDrillType =
  | 'marker_identification'
  | 'fill_blank'
  | 'decomposition'
  | 'build_contraction'
  | 'unscramble'
  | 'blueprint'
  | 'multiple_choice'
  | 'translate'
  | 'same_sentence_three_ways'
  | 'combine_sentences';

export interface WorkbookDrill {
  id: number;
  type: WorkbookDrillType;
  /** The prompt/question text */
  prompt: string;
  /** Somali sentence for marker identification / unscramble */
  somali?: string;
  /** English hint or meaning */
  english?: string;
  /** Scrambled words for unscramble */
  words?: string[];
  /** Blueprint parts for blueprint drills */
  blueprint?: { label: string; value: string }[];
  /** Options for multiple_choice / fill_blank */
  options?: string[];
  /** Correct answer(s) */
  answer: string | string[];
  /** For decomposition: the two parts */
  parts?: [string, string];
  partLabels?: [string, string];
  /** Explanation shown after checking */
  explanation: string;
}

export interface WorkbookLevel {
  id: number;
  title: string;
  skill: string;
  description: string;
  requiredAccuracy: number;
  prerequisiteLevelId: number | null;
  instructions: string[];
  referenceTables?: { title: string; rows: { label: string; value: string }[] }[];
  drills: WorkbookDrill[];
}

// ─── Level 1: Marker Identification ────────────────────────────────────────

const level1: WorkbookLevel = {
  id: 1,
  title: 'Marker Identification',
  skill: 'Recognize the sentence marker and name its function',
  description: 'See a sentence → name the marker and its job.',
  requiredAccuracy: 0.9,
  prerequisiteLevelId: null,
  instructions: [
    'For each sentence, write: (A) the marker word, (B) its type (STATEMENT / QUESTION / FOCUS / SPOTLIGHT), and (C) what the sentence roughly means.',
  ],
  drills: [
    { id: 1, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Cali wuu tegay.', answer: ['wuu', 'STATEMENT', 'Ali went.'], explanation: 'wuu = waa + uu (statement + he). Plain declaration.' },
    { id: 2, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Hooyada bay cuntay.', answer: ['bay', 'FOCUS', 'It was mother who ate.'], explanation: 'bay = baa + ay (focus + she). Highlights the subject.' },
    { id: 3, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Ma cunaysaa?', answer: ['Ma', 'QUESTION', 'Are you eating?'], explanation: 'ma before a verb = yes/no question.' },
    { id: 4, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Waxaan akhriyay buug.', answer: ['Waxaan', 'SPOTLIGHT', 'What I read was a book.'], explanation: 'Waxaan = waxa + aan (spotlight + I). Cleft construction.' },
    { id: 5, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Ninka baa lacag bixiyay.', answer: ['baa', 'FOCUS', 'It was the man who paid money.'], explanation: 'baa focuses on the noun before it (ninka).' },
    { id: 6, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Wiilka wuu ciyaaray.', answer: ['wuu', 'STATEMENT', 'The boy played.'], explanation: 'wuu = waa + uu (statement + he).' },
    { id: 7, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Miyaad seexatay?', answer: ['Miyaad', 'QUESTION', 'Did you sleep?'], explanation: 'Miyaad = miyaa + aad (question + you).' },
    { id: 8, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Gabadha ayaa shaah cabay.', answer: ['ayaa', 'FOCUS', 'It was the girl who drank tea.'], explanation: 'ayaa is an alternative form of baa, focusing on the noun.' },
    { id: 9, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Waxay keentay cunto.', answer: ['Waxay', 'SPOTLIGHT', 'What she brought was food.'], explanation: 'Waxay = waxa + ay (spotlight + she).' },
    { id: 10, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Macallinka wuu shaqeeyay.', answer: ['wuu', 'STATEMENT', 'The teacher worked.'], explanation: 'wuu = waa + uu (statement + he).' },
    { id: 11, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Miyuu yimid?', answer: ['Miyuu', 'QUESTION', 'Did he come?'], explanation: 'Miyuu = miyaa + uu (question + he).' },
    { id: 12, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Aabo baa guriga galay.', answer: ['baa', 'FOCUS', 'It was father who entered the house.'], explanation: 'baa focuses on aabo (father).' },
    { id: 13, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Waan cabay biyo.', answer: ['Waan', 'STATEMENT', 'I drank water.'], explanation: 'Waan = waa + aan (statement + I).' },
    { id: 14, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Ma tegaysaa dugsiga?', answer: ['Ma', 'QUESTION', 'Are you going to school?'], explanation: 'ma = yes/no question marker.' },
    { id: 15, type: 'marker_identification', prompt: 'Identify the marker in this sentence.', somali: 'Waxuu qoray warqad.', answer: ['Waxuu', 'SPOTLIGHT', 'What he wrote was a letter.'], explanation: 'Waxuu = waxa + uu (spotlight + he).' },
  ],
};

// ─── Level 2: waa vs baa vs waxa ───────────────────────────────────────────

const level2: WorkbookLevel = {
  id: 2,
  title: 'waa vs baa vs waxa',
  skill: 'Choose the correct marker based on what you want to emphasize',
  description: 'The core three-way distinction that controls every sentence.',
  requiredAccuracy: 0.9,
  prerequisiteLevelId: 1,
  instructions: [
    'waa = focus on the ACTION (the verb). "He ATE."',
    'baa / ayaa = focus on the NOUN. "ALI ate."',
    'waxa = spotlight/cleft. "What he ate was..."',
    'Only ONE marker per main clause. They are mutually exclusive.',
  ],
  drills: [
    { id: 1, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Cali _____ cunay.', english: 'Ali ate. (emphasis on the action of eating)', options: ['wuu', 'baa', 'Waxuu'], answer: 'wuu', explanation: 'wuu = statement, verb focus. Ali ATE.' },
    { id: 2, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Cali _____ cuntada cunay.', english: 'It was ALI who ate the food. (emphasis on Ali)', options: ['wuu', 'baa', 'Waxuu'], answer: 'baa', explanation: 'baa = focus on the noun (Cali).' },
    { id: 3, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: '_____ Cali cunay waa hilib.', english: 'What Ali ate was meat. (spotlight construction)', options: ['Waxuu', 'bay', 'wuu'], answer: 'Waxuu', explanation: 'Waxuu = spotlight/cleft construction.' },
    { id: 4, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Hooyada _____ keentay cunto.', english: 'Mother brought food. (emphasis: she BROUGHT it)', options: ['way', 'baa', 'Waxay'], answer: 'way', explanation: 'way = waa + ay (statement + she). Focus on the action.' },
    { id: 5, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: '_____ cunto keentay.', english: 'It was MOTHER who brought food. (emphasis on mother)', options: ['Hooyada baa', 'Hooyada wuu', 'Waxay'], answer: 'Hooyada baa', explanation: 'baa focuses on the noun (Hooyada).' },
    { id: 6, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Wiilka _____ buugga akhriyay.', english: 'It was THE BOY who read the book. (emphasis on boy)', options: ['baa', 'wuu', 'Waxuu'], answer: 'baa', explanation: 'baa/ayaa focuses on the noun (wiilka).' },
    { id: 7, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Wiilka _____ akhriyay.', english: 'The boy READ. (emphasis on the reading)', options: ['wuu', 'baa', 'Waxuu'], answer: 'wuu', explanation: 'wuu = statement, verb focus.' },
    { id: 8, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: '_____ akhriyay waa buug.', english: 'What he read was a book. (spotlight)', options: ['Waxuu', 'bay', 'wuu'], answer: 'Waxuu', explanation: 'Waxuu = spotlight/cleft.' },
    { id: 9, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Macallinka _____ shaqeeyay.', english: 'The teacher WORKED. (emphasis on working)', options: ['wuu', 'baa', 'Waxuu'], answer: 'wuu', explanation: 'wuu = statement, verb focus.' },
    { id: 10, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: '_____ shaqeeyay waa macallinka.', english: 'The one who worked was the teacher. (spotlight)', options: ['Waxaa', 'baa', 'wuu'], answer: 'Waxaa', explanation: 'Waxaa = spotlight with copula (waa).' },
    { id: 11, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Gabadha _____ shaah cabay.', english: 'The girl DRANK tea. (emphasis on drinking)', options: ['way', 'baa', 'Waxay'], answer: 'way', explanation: 'way = statement, verb focus.' },
    { id: 12, type: 'fill_blank', prompt: 'Fill in the correct marker.', somali: 'Gabadha _____ shaah cabay.', english: 'It was THE GIRL who drank tea. (emphasis on girl)', options: ['baa', 'way', 'Waxay'], answer: 'baa', explanation: 'baa focuses on the noun (gabadha).' },
    { id: 13, type: 'same_sentence_three_ways', prompt: 'Write the sentence three ways: waa, baa, waxa.', english: 'Ali / ate / the food (Cali, cunay, cuntada)', answer: ['Cali wuu cunay cuntada.', 'Cali baa cuntada cunay.', 'Waxuu Cali cunay waa cuntada.'], explanation: 'waa: Ali ATE the food. baa: It was ALI who ate. waxa: What Ali ate was the food.' },
    { id: 14, type: 'same_sentence_three_ways', prompt: 'Write the sentence three ways: waa, baa, waxa.', english: 'The boy / read / a book (Wiilka, akhriyay, buug)', answer: ['Wiilka wuu akhriyay buug.', 'Wiilka baa buug akhriyay.', 'Waxuu wiilka akhriyay waa buug.'], explanation: 'Same words, different marker, different emphasis.' },
    { id: 15, type: 'same_sentence_three_ways', prompt: 'Write the sentence three ways: waa, baa, waxa.', english: 'Mother / cooked / rice (Hooyada, dhigtay, bariis)', answer: ['Hooyada way dhigtay bariis.', 'Hooyada baa bariis dhigtay.', 'Waxay hooyada dhigtay waa bariis.'], explanation: 'way = verb focus, baa = noun focus, waxa = spotlight.' },
    { id: 16, type: 'same_sentence_three_ways', prompt: 'Write the sentence three ways: waa, baa, waxa.', english: 'The teacher / brought / money (Macallinka, keenay, lacag)', answer: ['Macallinka wuu keenay lacag.', 'Macallinka baa lacag keenay.', 'Waxuu macallinka keenay waa lacag.'], explanation: 'Same pattern applied.' },
    { id: 17, type: 'same_sentence_three_ways', prompt: 'Write the sentence three ways: waa, baa, waxa.', english: 'Father / entered / the house (Aabo, galay, guriga)', answer: ['Aabo wuu galay guriga.', 'Aabo baa guriga galay.', 'Waxuu aabo galay waa guriga.'], explanation: 'Same pattern applied.' },
  ],
};

// ─── Level 3: Subject Pronoun Contractions ─────────────────────────────────

const level3: WorkbookLevel = {
  id: 3,
  title: 'Subject Pronoun Contractions',
  skill: 'Decode and build fused marker+pronoun forms',
  description: 'Break down wuu/bay/waxaan etc. into their components.',
  requiredAccuracy: 0.9,
  prerequisiteLevelId: 2,
  instructions: [
    'waa + aan = waan  |  waa + aad = waad  |  waa + uu = wuu  |  waa + ay = way',
    'baa + aan = baan  |  baa + aad = baad  |  baa + uu = buu  |  baa + ay = bay',
    'waxa + aan = waxaan  |  waxa + aad = waxaad  |  waxa + uu = wuxuu  |  waxa + ay = waxay',
  ],
  referenceTables: [
    {
      title: 'Contraction Reference',
      rows: [
        { label: 'waa + aan', value: 'waan (I am...)' },
        { label: 'waa + aad', value: 'waad (You are...)' },
        { label: 'waa + uu', value: 'wuu (He is...)' },
        { label: 'waa + ay', value: 'way (She/they are...)' },
        { label: 'baa + aan', value: 'baan (It is I who...)' },
        { label: 'baa + aad', value: 'baad (It is you who...)' },
        { label: 'baa + uu', value: 'buu (It is he who...)' },
        { label: 'baa + ay', value: 'bay (It is she who...)' },
        { label: 'waxa + aan', value: 'waxaan (What I...)' },
        { label: 'waxa + aad', value: 'waxaad (What you...)' },
        { label: 'waxa + uu', value: 'wuxuu (What he...)' },
        { label: 'waxa + ay', value: 'waxay (What she...)' },
      ],
    },
  ],
  drills: [
    { id: 1, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'waan', parts: ['waa', 'aan'], partLabels: ['Marker', 'Pronoun'], answer: ['waa', 'aan'], explanation: 'waan = waa + aan (statement + I)' },
    { id: 2, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'bay', parts: ['baa', 'ay'], partLabels: ['Marker', 'Pronoun'], answer: ['baa', 'ay'], explanation: 'bay = baa + ay (focus + she/they)' },
    { id: 3, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'waxaad', parts: ['waxa', 'aad'], partLabels: ['Marker', 'Pronoun'], answer: ['waxa', 'aad'], explanation: 'waxaad = waxa + aad (spotlight + you)' },
    { id: 4, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'buu', parts: ['baa', 'uu'], partLabels: ['Marker', 'Pronoun'], answer: ['baa', 'uu'], explanation: 'buu = baa + uu (focus + he)' },
    { id: 5, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'way', parts: ['waa', 'ay'], partLabels: ['Marker', 'Pronoun'], answer: ['waa', 'ay'], explanation: 'way = waa + ay (statement + she/they)' },
    { id: 6, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'waxaan', parts: ['waxa', 'aan'], partLabels: ['Marker', 'Pronoun'], answer: ['waxa', 'aan'], explanation: 'waxaan = waxa + aan (spotlight + I)' },
    { id: 7, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'baad', parts: ['baa', 'aad'], partLabels: ['Marker', 'Pronoun'], answer: ['baa', 'aad'], explanation: 'baad = baa + aad (focus + you)' },
    { id: 8, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'wuxuu', parts: ['waxa', 'uu'], partLabels: ['Marker', 'Pronoun'], answer: ['waxa', 'uu'], explanation: 'wuxuu = waxa + uu (spotlight + he)' },
    { id: 9, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'waxay', parts: ['waxa', 'ay'], partLabels: ['Marker', 'Pronoun'], answer: ['waxa', 'ay'], explanation: 'waxay = waxa + ay (spotlight + she/they)' },
    { id: 10, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'baan', parts: ['baa', 'aan'], partLabels: ['Marker', 'Pronoun'], answer: ['baa', 'aan'], explanation: 'baan = baa + aan (focus + I)' },
    { id: 11, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'waad', parts: ['waa', 'aad'], partLabels: ['Marker', 'Pronoun'], answer: ['waa', 'aad'], explanation: 'waad = waa + aad (statement + you)' },
    { id: 12, type: 'decomposition', prompt: 'Break this contraction into its two parts.', somali: 'wuu', parts: ['waa', 'uu'], partLabels: ['Marker', 'Pronoun'], answer: ['waa', 'uu'], explanation: 'wuu = waa + uu (statement + he)' },
    { id: 13, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'statement + I', answer: 'waan', explanation: 'waa + aan = waan' },
    { id: 14, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'focus + she/they', answer: 'bay', explanation: 'baa + ay = bay' },
    { id: 15, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'spotlight + he', answer: 'wuxuu', explanation: 'waxa + uu = wuxuu' },
    { id: 16, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'statement + you', answer: 'waad', explanation: 'waa + aad = waad' },
    { id: 17, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'focus + I', answer: 'baan', explanation: 'baa + aan = baan' },
    { id: 18, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'spotlight + she/they', answer: 'waxay', explanation: 'waxa + ay = waxay' },
    { id: 19, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'statement + he', answer: 'wuu', explanation: 'waa + uu = wuu' },
    { id: 20, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'focus + you', answer: 'baad', explanation: 'baa + aad = baad' },
    { id: 21, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'spotlight + I', answer: 'waxaan', explanation: 'waxa + aan = waxaan' },
    { id: 22, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'statement + she/they', answer: 'way', explanation: 'waa + ay = way' },
    { id: 23, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'focus + he', answer: 'buu', explanation: 'baa + uu = buu' },
    { id: 24, type: 'build_contraction', prompt: 'Given the marker type and the subject, write the correct contracted form.', english: 'spotlight + you', answer: 'waxaad', explanation: 'waxa + aad = waxaad' },
  ],
};

// ─── Level 4: SOV Word Order Assembly ──────────────────────────────────────

const level4: WorkbookLevel = {
  id: 4,
  title: 'SOV Word Order Assembly',
  skill: 'Arrange sentence parts in correct Somali order',
  description: 'Assemble scrambled parts into correct Somali order.',
  requiredAccuracy: 0.9,
  prerequisiteLevelId: 3,
  instructions: [
    'Basic: Subject – Object – Verb (SOV)',
    'With focus marker: Subject – MARKER – Object – Verb',
    'With waxa: WAXA+pronoun – Verb – Object',
    'The marker always comes after the subject (or replaces it in waxa constructions).',
  ],
  drills: [
    { id: 1, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['cunay', 'Cali', 'wuu'], english: 'Ali ate.', answer: 'Cali wuu cunay.', explanation: 'Subject + Marker + Verb (no object).' },
    { id: 2, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['baa', 'buugga', 'akhriyay', 'wiilka'], english: 'It was the boy who read the book.', answer: 'Wiilka baa buugga akhriyay.', explanation: 'Subject + Focus Marker + Object + Verb.' },
    { id: 3, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['tegay', 'way', 'dugsiga', 'gabadha'], english: 'The girl went to school.', answer: 'Gabadha way tegay dugsiga.', explanation: 'Subject + Statement Marker + Verb + Object.' },
    { id: 4, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['waxay', 'bariis', 'hooyada', 'dhigtay'], english: 'What mother cooked was rice.', answer: 'Hooyada waxay dhigtay bariis.', explanation: 'Subject + Spotlight + Verb + Object.' },
    { id: 5, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['ciyaaray', 'wiilka', 'wuu'], english: 'The boy played.', answer: 'Wiilka wuu ciyaaray.', explanation: 'Subject + Marker + Verb.' },
    { id: 6, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['suuqa', 'baa', 'ninka', 'tegay'], english: 'It was the man who went to the market.', answer: 'Ninka baa suuqa tegay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 7, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['waan', 'biyo', 'cabay'], english: 'I drank water.', answer: 'Waan cabay biyo.', explanation: 'Marker + Verb + Object.' },
    { id: 8, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['keenay', 'cunto', 'waxaan'], english: 'What I brought was food.', answer: 'Waxaan keenay cunto.', explanation: 'Spotlight + Verb + Object.' },
    { id: 9, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['shaah', 'bay', 'cabay', 'naagta'], english: 'The woman drank tea.', answer: 'Naagta bay cabay shaah.', explanation: 'Subject + Focus + Verb + Object.' },
    { id: 10, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['wuu', 'aabo', 'guriga', 'galay'], english: 'Father entered the house.', answer: 'Aabo wuu galay guriga.', explanation: 'Subject + Marker + Verb + Object.' },
    { id: 11, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['shaqeeyay', 'macallinka', 'baa'], english: 'It was the teacher who worked.', answer: 'Macallinka baa shaqeeyay.', explanation: 'Subject + Focus + Verb.' },
    { id: 12, type: 'unscramble', prompt: 'Unscramble into correct Somali word order.', words: ['waxuu', 'buug', 'qoray', 'wiilka'], english: 'What the boy wrote was a book.', answer: 'Waxuu wiilka qoray buug.', explanation: 'Spotlight + Subject + Verb + Object.' },
    { id: 13, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'SUBJECT', value: 'the man' }, { label: 'MARKER', value: 'statement+he' }, { label: 'OBJECT', value: 'the food' }, { label: 'VERB', value: 'ate' }], english: 'The man ate the food.', answer: 'Ninka wuu cunay cuntada.', explanation: 'Subject + Marker + Object + Verb.' },
    { id: 14, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'MARKER', value: 'spotlight+I' }, { label: 'VERB', value: 'read' }, { label: 'OBJECT', value: 'a book' }], english: 'What I read was a book.', answer: 'Waxaan akhriyay buug.', explanation: 'Spotlight + Verb + Object.' },
    { id: 15, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'SUBJECT', value: 'the girl' }, { label: 'MARKER', value: 'focus' }, { label: 'OBJECT', value: 'tea' }, { label: 'VERB', value: 'drank' }], english: 'It was the girl who drank tea.', answer: 'Gabadha baa shaah cabay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 16, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'SUBJECT', value: 'mother' }, { label: 'MARKER', value: 'statement+she' }, { label: 'OBJECT', value: 'rice' }, { label: 'VERB', value: 'cooked' }], english: 'Mother cooked rice.', answer: 'Hooyada way dhigtay bariis.', explanation: 'Subject + Marker + Object + Verb.' },
    { id: 17, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'MARKER', value: 'spotlight+he' }, { label: 'VERB', value: 'entered' }, { label: 'OBJECT', value: 'the house' }], english: 'What he entered was the house.', answer: 'Wuxuu galay guriga.', explanation: 'Spotlight + Verb + Object.' },
    { id: 18, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'SUBJECT', value: 'the teacher' }, { label: 'MARKER', value: 'statement+he' }, { label: 'VERB', value: 'worked' }], english: 'The teacher worked.', answer: 'Macallinka wuu shaqeeyay.', explanation: 'Subject + Marker + Verb.' },
    { id: 19, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'SUBJECT', value: 'father' }, { label: 'MARKER', value: 'focus' }, { label: 'OBJECT', value: 'money' }, { label: 'VERB', value: 'paid' }], english: 'It was father who paid money.', answer: 'Aabo baa lacag bixiyay.', explanation: 'Subject + Focus + Object + Verb.' },
    { id: 20, type: 'blueprint', prompt: 'Write the Somali sentence from this blueprint.', blueprint: [{ label: 'MARKER', value: 'spotlight+she' }, { label: 'VERB', value: 'brought' }, { label: 'OBJECT', value: 'water' }], english: 'What she brought was water.', answer: 'Waxay keentay biyo.', explanation: 'Spotlight + Verb + Object.' },
  ],
};

// ─── Level 5: Prepositions + Direction ─────────────────────────────────────

const level5: WorkbookLevel = {
  id: 5,
  title: 'Prepositions + Direction',
  skill: 'Correctly place u/ku/ka/la and soo/sii before the verb',
  description: 'Stack u/ku/ka/la and soo/sii before the verb.',
  requiredAccuracy: 0.9,
  prerequisiteLevelId: 4,
  instructions: [
    'Prepositions and direction words go between the marker and the verb:',
    'Subject + MARKER + [preposition] + [direction] + VERB + Object',
    'Order when stacking: preposition first, then direction.',
    'Example: Wuu u soo keenay = He for+toward brought = He brought it over (for someone)',
  ],
  referenceTables: [
    {
      title: 'Prepositions',
      rows: [
        { label: 'u', value: 'to / for' },
        { label: 'ku', value: 'in / at / by means of' },
        { label: 'ka', value: 'from / about' },
        { label: 'la', value: 'with / one (passive)' },
      ],
    },
    {
      title: 'Direction Words',
      rows: [
        { label: 'soo', value: 'toward speaker' },
        { label: 'sii', value: 'away from speaker' },
        { label: 'wada', value: 'together' },
        { label: 'kala', value: 'apart / separately' },
      ],
    },
  ],
  drills: [
    { id: 1, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Wuu _____ tegay suuqa.', english: 'He went TO the market.', options: ['u', 'ku', 'ka', 'la'], answer: 'u', explanation: 'u = to/for. Movement toward a destination.' },
    { id: 2, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Waan _____ joogaa guriga.', english: 'I am staying IN the house.', options: ['u', 'ku', 'ka', 'la'], answer: 'ku', explanation: 'ku = in/at. Location.' },
    { id: 3, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Wuu _____ yimid dugsiga.', english: 'He came FROM school.', options: ['u', 'ku', 'ka', 'la'], answer: 'ka', explanation: 'ka = from. Origin/source.' },
    { id: 4, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Way _____ shaqeysay Cali.', english: 'She worked WITH Ali.', options: ['u', 'ku', 'ka', 'la'], answer: 'la', explanation: 'la = with. Accompaniment.' },
    { id: 5, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Waan _____ qoray buugga.', english: 'I wrote IN the book.', options: ['u', 'ku', 'ka', 'la'], answer: 'ku', explanation: 'ku = in/at. Location within.' },
    { id: 6, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Gabadha waxay _____ keentay hooyada.', english: 'The girl brought (it) FOR mother.', options: ['u', 'ku', 'ka', 'la'], answer: 'u', explanation: 'u = to/for. Beneficiary.' },
    { id: 7, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Ninka wuu _____ baxay guriga.', english: 'The man left FROM the house.', options: ['u', 'ku', 'ka', 'la'], answer: 'ka', explanation: 'ka = from. Leaving/origin.' },
    { id: 8, type: 'fill_blank', prompt: 'Insert the correct preposition (u, ku, ka, la).', somali: 'Wiilka wuu _____ ciyaaray Maxamed.', english: 'The boy played WITH Mohamed.', options: ['u', 'ku', 'ka', 'la'], answer: 'la', explanation: 'la = with. Accompaniment.' },
    { id: 9, type: 'fill_blank', prompt: 'Add soo (toward speaker) or sii (away from speaker).', somali: 'Wuu _____ tegay.', english: 'He kept going (away).', options: ['soo', 'sii'], answer: 'sii', explanation: 'sii = away from speaker.' },
    { id: 10, type: 'fill_blank', prompt: 'Add soo (toward speaker) or sii (away from speaker).', somali: 'Way _____ gashay guriga.', english: 'She came INTO the house (toward speaker).', options: ['soo', 'sii'], answer: 'soo', explanation: 'soo = toward speaker.' },
    { id: 11, type: 'fill_blank', prompt: 'Add soo (toward speaker) or sii (away from speaker).', somali: 'Waan _____ keenay cunto.', english: 'I brought food (toward here).', options: ['soo', 'sii'], answer: 'soo', explanation: 'soo = toward speaker (bringing here).' },
    { id: 12, type: 'fill_blank', prompt: 'Add soo (toward speaker) or sii (away from speaker).', somali: 'Wuu _____ socday.', english: 'He kept walking (away).', options: ['soo', 'sii'], answer: 'sii', explanation: 'sii = away, ongoing movement.' },
    { id: 13, type: 'fill_blank', prompt: 'Add soo (toward speaker) or sii (away from speaker).', somali: 'Waxay _____ noqotay.', english: 'She came back (toward speaker).', options: ['soo', 'sii'], answer: 'soo', explanation: 'soo = toward speaker (returning).' },
    { id: 14, type: 'fill_blank', prompt: 'Add soo (toward speaker) or sii (away from speaker).', somali: 'Wiilka wuu _____ diray.', english: 'The boy sent (it away).', options: ['soo', 'sii'], answer: 'sii', explanation: 'sii = away from speaker (sending away).' },
    { id: 15, type: 'translate', prompt: 'Write the full Somali sentence with preposition AND direction in the correct order.', english: 'He brought (it) to me (toward speaker)', answer: 'Wuu u soo keenay.', explanation: 'Marker + u (for) + soo (toward) + verb.' },
    { id: 16, type: 'translate', prompt: 'Write the full Somali sentence with preposition AND direction in the correct order.', english: 'She came back from school', answer: 'Way ka soo noqotay dugsiga.', explanation: 'Marker + ka (from) + soo (toward) + verb + object.' },
    { id: 17, type: 'translate', prompt: 'Write the full Somali sentence with preposition AND direction in the correct order.', english: 'I sent (it away) for him', answer: 'Waan u sii diray.', explanation: 'Marker + u (for) + sii (away) + verb.' },
    { id: 18, type: 'translate', prompt: 'Write the full Somali sentence with preposition AND direction in the correct order.', english: 'He went on (away) to the market', answer: 'Wuu u sii tegay suuqa.', explanation: 'Marker + u (to) + sii (away) + verb + object.' },
    { id: 19, type: 'translate', prompt: 'Write the full Somali sentence with preposition AND direction in the correct order.', english: 'They brought water from the well (toward here)', answer: 'Way ka soo keeneen biyo.', explanation: 'Marker + ka (from) + soo (toward) + verb + object.' },
    { id: 20, type: 'translate', prompt: 'Write the full Somali sentence with preposition AND direction in the correct order.', english: 'She kept working with him (ongoing away)', answer: 'Way la sii shaqaysay.', explanation: 'Marker + la (with) + sii (ongoing away) + verb.' },
  ],
};

// ─── Level 6: Connectors + Compound Sentences ──────────────────────────────

const level6: WorkbookLevel = {
  id: 6,
  title: 'Connectors + Compound Sentences',
  skill: 'Join clauses and nouns using iyo, -na, -se, oo',
  description: 'Join ideas with iyo, -na, -se, oo.',
  requiredAccuracy: 0.9,
  prerequisiteLevelId: 5,
  instructions: [
    'iyo = and (joins NOUNS only): Cali iyo Sahra',
    '-na = and (joins SENTENCES, attaches to first word of next clause): Wuu tegayna...',
    '-se = but (contrast, attaches to first word of contrasting clause): Isaguse...',
    'oo = which/that/and (links relative clauses): guri oo weyn = a house which is big',
  ],
  referenceTables: [
    {
      title: 'Connectors',
      rows: [
        { label: 'iyo', value: 'and (joins nouns)' },
        { label: '-na', value: 'and / also (joins sentences)' },
        { label: '-se', value: 'but / however (contrast)' },
        { label: 'oo', value: 'which / that / linking (relative)' },
      ],
    },
  ],
  drills: [
    { id: 1, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Cali _____ Sahra way tegeen dugsiga.', english: 'Ali AND Sahra went to school.', options: ['iyo', '-na', '-se', 'oo'], answer: 'iyo', explanation: 'iyo joins nouns (Cali and Sahra).' },
    { id: 2, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Wuu cunay, waad_____ cuntay.', english: 'He ate, AND you ate too.', options: ['iyo', '-na', '-se', 'oo'], answer: '-na', explanation: '-na joins sentences (waadna = waad + -na).' },
    { id: 3, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Ninka wuu tegay, naagta_____ way joogtay.', english: 'The man went, BUT the woman stayed.', options: ['iyo', '-na', '-se', 'oo'], answer: '-se', explanation: '-se attaches to the first word of the contrasting clause (naagtase).' },
    { id: 4, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Buug _____ weyn baan akhriyay.', english: 'I read a book WHICH (was) big.', options: ['iyo', '-na', '-se', 'oo'], answer: 'oo', explanation: 'oo links a relative clause (book which is big).' },
    { id: 5, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Hooyo _____ aabo way shaqeeyeen.', english: 'Mother AND father worked.', options: ['iyo', '-na', '-se', 'oo'], answer: 'iyo', explanation: 'iyo joins nouns.' },
    { id: 6, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Waan cunay bariis, biyo_____ aan cabay.', english: 'I ate rice, AND I drank water.', options: ['iyo', '-na', '-se', 'oo'], answer: '-na', explanation: '-na joins sentences (biyona = biyo + -na).' },
    { id: 7, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Gabadha way akhrisay, wiilka_____ wuu ciyaaray.', english: 'The girl read, BUT the boy played.', options: ['iyo', '-na', '-se', 'oo'], answer: '-se', explanation: '-se for contrast (wiilkase = wiilka + -se).' },
    { id: 8, type: 'fill_blank', prompt: 'Fill in iyo, -na, -se, or oo.', somali: 'Guri _____ cusub buu galay.', english: 'He entered a house WHICH (was) new.', options: ['iyo', '-na', '-se', 'oo'], answer: 'oo', explanation: 'oo for relative clause (house which is new).' },
    { id: 9, type: 'combine_sentences', prompt: 'Combine the two sentences using -na.', english: 'Cali wuu cunay. + Sahra way cuntay. → Join with "and also"', answer: 'Cali wuu cunay, Sahra-wayna way cuntay.', explanation: 'Attach -na to the first word of the second clause.' },
    { id: 10, type: 'combine_sentences', prompt: 'Combine the two sentences using -se.', english: 'Wiilka wuu tegay. + Gabadha way joogtay. → Join with "but"', answer: 'Wiilka wuu tegay, gabadha-se way joogtay.', explanation: 'Attach -se to the first word of the contrasting clause.' },
    { id: 11, type: 'combine_sentences', prompt: 'Combine the two sentences using oo.', english: 'Waan akhriyay buug. + Buuggu waa weyn yahay. → "I read a book which was big"', answer: 'Waan akhriyay buug oo weyn.', explanation: 'oo links the relative description to the noun.' },
    { id: 12, type: 'combine_sentences', prompt: 'Combine the two sentences using -se.', english: 'Hooyo way shaqaysay. + Aabo wuu seexday. → Join with "but"', answer: 'Hooyo way shaqaysay, aabo-se wuu seexday.', explanation: '-se for contrast between two clauses.' },
    { id: 13, type: 'combine_sentences', prompt: 'Combine the two sentences using -na.', english: 'Waan cabay shaah. + Waan cunay hilib. → Join with "and also"', answer: 'Waan cabay shaah, hilibna waan cunay.', explanation: '-na attached to hilib (hilibna).' },
  ],
};

// ─── Level 7: Full Sentence Construction ───────────────────────────────────

const level7: WorkbookLevel = {
  id: 7,
  title: 'Full Sentence Construction',
  skill: 'Translate English to Somali from scratch — no scaffolding',
  description: 'English → Somali from scratch, no scaffolding.',
  requiredAccuracy: 0.9,
  prerequisiteLevelId: 6,
  instructions: [
    'You have the grammar framework. Now put it all together.',
    'For each English sentence, write the full Somali sentence.',
    'Use the vocabulary bank if you need words.',
    'Check your focus marker choice, word order, prepositions, direction, and connectors.',
  ],
  drills: [
    { id: 1, type: 'translate', prompt: 'Translate to Somali.', english: 'I ate rice.', answer: 'Waan cunay bariis.', explanation: 'Statement (waan) + verb + object.' },
    { id: 2, type: 'translate', prompt: 'Translate to Somali.', english: 'The teacher worked.', answer: 'Macallinka wuu shaqeeyay.', explanation: 'Subject + statement marker + verb.' },
    { id: 3, type: 'translate', prompt: 'Translate to Somali.', english: 'It was the boy who drank water.', answer: 'Wiilka baa biyo cabay.', explanation: 'Subject + focus marker (baa) + object + verb.' },
    { id: 4, type: 'translate', prompt: 'Translate to Somali.', english: 'Did mother cook?', answer: 'Ma hooyadu wax dhigtay?', explanation: 'Question marker (ma) + subject + verb.' },
    { id: 5, type: 'translate', prompt: 'Translate to Somali.', english: 'What father brought was meat.', answer: 'Waxuu aabo keenay waa hilib.', explanation: 'Spotlight (waxuu) + subject + verb + copula + object.' },
    { id: 6, type: 'translate', prompt: 'Translate to Somali.', english: 'The girl is reading a book.', answer: 'Gabadha way akhriyaysaa buug.', explanation: 'Subject + marker + progressive verb + object.' },
    { id: 7, type: 'translate', prompt: 'Translate to Somali.', english: 'He went to school.', answer: 'Wuu tegay dugsiga.', explanation: 'Statement + verb + object (destination).' },
    { id: 8, type: 'translate', prompt: 'Translate to Somali.', english: 'It was eaten. (use waa la)', answer: 'Waa la cunay.', explanation: 'Impersonal construction: waa la + verb.' },
    { id: 9, type: 'translate', prompt: 'Translate to Somali.', english: 'Did you come from the market?', answer: 'Miyaad ka timid suuqa?', explanation: 'Question + ka (from) + verb + object.' },
    { id: 10, type: 'translate', prompt: 'Translate to Somali.', english: 'She found money.', answer: 'Way helay lacag.', explanation: 'Statement + verb + object.' },
    { id: 11, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'Ali and Sahra went to school.', answer: 'Cali iyo Sahra way tegeen dugsiga.', explanation: 'iyo joins nouns; way = statement + they.' },
    { id: 12, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'The boy read a book, but the girl played.', answer: 'Wiilka wuu akhriyay buug, gabadha-se way ciyaartay.', explanation: '-se for contrast between clauses.' },
    { id: 13, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'What I drank was tea, and I also ate rice.', answer: 'Waxaan cabay waa shaah, bariisna waan cunay.', explanation: 'Spotlight + copula; -na for "and also".' },
    { id: 14, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'Mother brought food from the market (toward here).', answer: 'Hooyada way ka soo keentay cunto suuqa.', explanation: 'ka (from) + soo (toward speaker) stacked before verb.' },
    { id: 15, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'It was father who worked with the teacher.', answer: 'Aabo baa la shaqeeyay macallinka.', explanation: 'baa for focus; la for "with".' },
    { id: 16, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'He came back from school and entered the house.', answer: 'Wuu ka soo noqday dugsiga wuuna galay guriga.', explanation: 'ka soo (from + toward) + -na (and).' },
    { id: 17, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'The woman cooked rice for the children (use u).', answer: 'Naagta way u dhigtay bariis carruurta.', explanation: 'u = for (beneficiary).' },
    { id: 18, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'Did Ali bring the book which was big?', answer: 'Cali miyuu keenay buugga oo weynaa?', explanation: 'oo for relative clause (book which was big).' },
    { id: 19, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'She kept going to the market (away, ongoing).', answer: 'Way sii joogtay inay suuqa tegayso.', explanation: 'sii = ongoing away movement.' },
    { id: 20, type: 'translate', prompt: 'Translate to Somali (use everything).', english: 'What the teacher wrote was read. (two clauses)', answer: 'Waxuu macallinku qoray waa la akhriyay.', explanation: 'Spotlight on teacher; la = impersonal passive.' },
  ],
};

// ─── Export ────────────────────────────────────────────────────────────────

export const allLevels: WorkbookLevel[] = [level1, level2, level3, level4, level5, level6, level7];

export function getLevelById(id: number): WorkbookLevel | undefined {
  return allLevels.find((l) => l.id === id);
}

export function getNextLevelId(currentId: number): number | undefined {
  const idx = allLevels.findIndex((l) => l.id === currentId);
  return allLevels[idx + 1]?.id;
}

export function getTotalDrillCount(levelId: number): number {
  return getLevelById(levelId)?.drills.length ?? 0;
}
