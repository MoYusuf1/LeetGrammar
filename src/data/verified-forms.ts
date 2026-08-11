/**
 * VERIFIED SOMALI FORMS — the sourcing gate.
 *
 * Every Somali form the course puts in front of a learner must appear here with
 * at least two independent sources. `scripts/validate-course.mjs` checks lesson
 * content and exercise answers against this registry and fails on anything
 * missing.
 *
 * This exists because the previous version of this course was written from
 * model memory and shipped invented forms (a feminine "they" that does not
 * exist, hyphenated articles, wrong pronouns). A registry makes "is this real?"
 * a mechanical question instead of a judgement call.
 *
 * To add a form: verify it in two published sources, record it in
 * docs/SOMALI_SOURCES.md, then add it here. Do not add a form because it looks
 * right.
 *
 * Source keys — see docs/SOMALI_SOURCES.md for full citations:
 *   N       Nilsson, Beginner's Somali Grammar, Univ. of Gothenburg, 2023
 *   W-alpha Wikipedia, Somali Latin alphabet
 *   W-gram  Wikipedia, Somali grammar
 *   Wikt    Wiktionary, Somali entries
 */

export type Gender = 'm' | 'f' | null;

export interface VerifiedForm {
  /** English gloss. */
  gloss: string;
  /** Grammatical gender, where the sources state one. */
  gender?: Gender;
  /** Definite ("the") form, where sources attest it. */
  definite?: string;
  /**
   * Source keys. Two or more = `confirmed`; exactly one = `single`.
   *
   * Record what you actually checked. An earlier draft of this file cited
   * "N (greetings)" and "N §3.2" for `nabad` and `subax` — neither word appears
   * anywhere in Nilsson. Inventing a plausible citation is the same failure as
   * inventing the word.
   */
  sources: string[];
  /** Set explicitly when only one source could be found. */
  confidence?: 'single';
}

export const VERIFIED_FORMS: Record<string, VerifiedForm> = {
  // ── Pronouns: independent (N §5.1, W-gram — tables agree exactly) ────────
  aniga: { gloss: 'I', sources: ['N §5.1', 'W-gram'] },
  adiga: { gloss: 'you (sg)', sources: ['N §5.1', 'W-gram'] },
  isaga: { gloss: 'he', sources: ['N §5.1', 'W-gram'] },
  iyada: { gloss: 'she', sources: ['N §5.1', 'W-gram'] },
  annaga: { gloss: 'we (exclusive)', sources: ['N §5.1', 'W-gram'] },
  innaga: { gloss: 'we (inclusive)', sources: ['N §5.1', 'W-gram'] },
  idinka: { gloss: 'you (pl)', sources: ['N §5.1', 'W-gram'] },
  iyaga: { gloss: 'they', sources: ['N §5.1', 'W-gram'] },

  // ── Pronouns: short subject forms ───────────────────────────────────────
  aan: { gloss: 'I (short subject)', sources: ['N §5.1', 'W-gram'] },
  aad: { gloss: 'you (short subject)', sources: ['N §5.1', 'W-gram'] },
  uu: { gloss: 'he (short subject)', sources: ['N §5.1', 'W-gram'] },
  ay: { gloss: 'she/they (short subject)', sources: ['N §5.1', 'W-gram'] },
  aannu: { gloss: 'we excl. (short subject)', sources: ['N §5.1', 'W-gram'] },
  aynu: { gloss: 'we incl. (short subject)', sources: ['N §5.1', 'W-gram'] },
  aydin: { gloss: 'you pl. (short subject)', sources: ['N §5.1', 'W-gram'] },

  // ── Nouns with attested definite forms (N §6.3) ─────────────────────────
  mas: { gloss: 'snake', gender: 'm', definite: 'maska', sources: ['N §6.3', 'W-gram'] },
  maska: { gloss: 'the snake', gender: 'm', sources: ['N §6.3', 'W-gram'] },
  kab: { gloss: 'shoe', gender: 'f', definite: 'kabta', sources: ['N §6.1', 'N §6.3'] },
  kabta: { gloss: 'the shoe', gender: 'f', sources: ['N §6.3', 'W-gram'] },
  guri: { gloss: 'house', gender: 'm', definite: 'guriga', sources: ['N §6.3', 'Wikt'] },
  guriga: { gloss: 'the house', gender: 'm', sources: ['N §6.3', 'W-gram'] },
  aabbe: { gloss: 'father', gender: 'm', definite: 'aabbaha', sources: ['N §6.3', 'Wikt'] },
  aabbaha: { gloss: 'the father', gender: 'm', sources: ['N §6.3', 'W-gram'] },
  libaax: { gloss: 'lion', gender: 'm', definite: 'libaaxa', sources: ['N §6.3', 'Wikt'] },
  libaaxa: { gloss: 'the lion', gender: 'm', sources: ['N §6.3', 'W-gram'] },
  mindi: { gloss: 'knife', gender: 'f', definite: 'mindida', sources: ['N §6.3', 'Wikt'] },
  mindida: { gloss: 'the knife', gender: 'f', sources: ['N §6.3', 'W-gram'] },
  magaalo: { gloss: 'city, town', gender: 'f', definite: 'magaalada', sources: ['N §6.1', 'N §6.3'] },
  magaalada: { gloss: 'the city', gender: 'f', sources: ['N §6.3', 'W-gram'] },
  gabadh: { gloss: 'girl', gender: 'f', definite: 'gabadha', sources: ['N §6.1', 'N §6.3'] },
  gabadha: { gloss: 'the girl', gender: 'f', sources: ['N §6.3', 'W-gram'] },
  gabar: { gloss: 'girl (variant of gabadh)', gender: 'f', definite: 'gabarta', sources: ['N §8.2', 'N §6.3'] },
  gabarta: { gloss: 'the girl', gender: 'f', sources: ['N §8.2', 'W-gram'] },
  bil: { gloss: 'month, crescent', gender: 'f', definite: 'bisha', sources: ['N §6.3', 'Wikt'] },
  bisha: { gloss: 'the month', gender: 'f', sources: ['N §6.3', 'W-gram'] },
  buug: { gloss: 'book', gender: 'm', definite: 'buugga', sources: ['N §6.7', 'W-gram'] },
  buugga: { gloss: 'the book', gender: 'm', sources: ['N §6.7', 'W-gram'] },
  macallin: { gloss: 'teacher', gender: 'm', definite: 'macallinka', sources: ['N §6.3', 'N §6.7'] },
  macallinka: { gloss: 'the teacher', gender: 'm', sources: ['N §6.3', 'W-gram'] },
  wiil: { gloss: 'boy, son', gender: 'm', definite: 'wiilka', sources: ['N §6.6', 'N §8.2'] },
  wiilka: { gloss: 'the boy', gender: 'm', sources: ['N §8.2', 'W-gram'] },
  nin: { gloss: 'man, husband', gender: 'm', definite: 'ninka', sources: ['N §8.2', 'Wikt'] },
  ninka: { gloss: 'the man', gender: 'm', sources: ['N §6.3', 'Wikt'] },
  naag: { gloss: 'woman', gender: 'f', definite: 'naagta', sources: ['Wikt', 'N §6.3'] },
  naagta: { gloss: 'the woman', gender: 'f', sources: ['Wikt', 'N §6.3'] },
  fure: { gloss: 'key', gender: 'm', definite: 'furaha', sources: ['N §6.3', 'Wikt'] },
  sheeko: { gloss: 'story', gender: 'f', definite: 'sheekada', sources: ['N §6.3', 'Wikt'] },
  bas: { gloss: 'bus', gender: 'm', definite: 'baska', sources: ['N §6.3', 'N §11.1'] },
  miis: { gloss: 'table', gender: 'm', sources: ['N §6.1', 'Wikt'] },
  miiska: { gloss: 'the table', gender: 'm', sources: ['N §6.1', 'N §6.3'] },
  geed: { gloss: 'tree, plant', gender: 'm', sources: ['N §6.1', 'Wikt'] },
  beer: { gloss: 'garden, field, farm', gender: 'f', sources: ['N §6.1', 'Wikt'] },
  kursi: { gloss: 'chair', gender: 'm', sources: ['N §6.1', 'Wikt'] },
  bisad: { gloss: 'cat', gender: 'f', sources: ['N §6.1', 'N §11.1'] },
  nal: { gloss: 'lamp, electric light', gender: 'm', sources: ['N §6.1', 'Wikt'] },
  inan: { gloss: 'boy (masc.) / girl (fem.) — distinguished only by tone', sources: ['N §6.1', 'W-gram'] },

  // ── Subject-case forms (N §11.1) ────────────────────────────────────────
  wiilku: { gloss: 'the boy (subject)', gender: 'm', sources: ['N §11.1', 'W-gram'] },
  anigu: { gloss: 'I (subject)', sources: ['N §11.1', 'W-gram'] },
  gabdhuhu: { gloss: 'the girls (subject)', gender: 'f', sources: ['N §11.1', 'W-gram'] },
  tani: { gloss: 'this (f, subject)', sources: ['N §11.1', 'W-gram'] },
  kani: { gloss: 'this (m, subject)', sources: ['N §11.1', 'W-gram'] },
  magacaygu: { gloss: 'my name (subject)', sources: ['N §11.1', 'W-gram'] },

  // ── Sentence signal ─────────────────────────────────────────────────────
  waa: { gloss: 'statement signal', sources: ['N §11.1', 'W-gram'] },

  // ── Contracted signal + pronoun (N §5.1 "wáa uu → wúu") ─────────────────
  // Second source is W-gram, which lists wuu and way as contractions of waa.
  // It previously cited two Nilsson sections, which is one author twice — see
  // validator check S5.
  wuu: { gloss: 'waa + uu (he) contracted', sources: ['N §5.1', 'W-gram'] },
  way: { gloss: 'waa + ay (she/they) contracted', sources: ['N §5.1', 'W-gram'] },

  // ── UNIT 2: the focus signals (N §12.3 "Sentence particles (b)") ────────
  // Nilsson separates two systems that the course teaches as one row of the
  // blueprint: particles marking the TYPE of clause (waa, ma, ha) and
  // particles marking FOCUS (baa/ayaa, waxa). See docs/SOMALI_SOURCES.md §7.
  baa: { gloss: 'focus signal — highlights the words just before it', sources: ['N §12.3', 'W-gram', 'Wikt'] },
  ayaa: { gloss: 'focus signal — same job as baa, a little more formal', sources: ['N §12.3', 'W-gram'] },
  waxa: { gloss: 'focus signal — highlights what comes at the end', sources: ['N §12.3', 'W-gram'] },
  waxaa: { gloss: 'focus signal — spelling variant of waxa', sources: ['N §12.3', 'W-gram'] },

  // Fusions of a focus signal with a short subject pronoun (N §5.1 table).
  // W-gram independently gives wuxuu and waxay; buu/bay it only implies, so
  // they rest on Nilsson alone and are declared as such.
  wuxuu: { gloss: 'waxa + uu (he) contracted', sources: ['N §5.1', 'W-gram'] },
  waxay: { gloss: 'waxa + ay (she/they) contracted', sources: ['N §5.1', 'W-gram'] },
  buu: { gloss: 'baa + uu (he) contracted', sources: ['N §5.1'], confidence: 'single' },
  bay: { gloss: 'baa + ay (she/they) contracted', sources: ['N §5.1'], confidence: 'single' },

  // ── UNIT 2: the rest of Nilsson's fusion table (N §5.1) ─────────────────
  // W-gram independently attests only wuu, way, wuxuu and waxay, so the rest
  // are single-source and, per check S6, may be read but never asked for as a
  // typed answer.
  waan: { gloss: 'waa + aan (I) contracted', sources: ['N §5.1'], confidence: 'single' },
  waad: { gloss: 'waa + aad (you) contracted', sources: ['N §5.1'], confidence: 'single' },
  waxaan: { gloss: 'waxa + aan (I) contracted', sources: ['N §5.1'], confidence: 'single' },
  waxaad: { gloss: 'waxa + aad (you) contracted', sources: ['N §5.1'], confidence: 'single' },
  baan: { gloss: 'baa + aan (I) contracted', sources: ['N §5.1'], confidence: 'single' },
  baad: { gloss: 'baa + aad (you) contracted', sources: ['N §5.1'], confidence: 'single' },
  ayaan: { gloss: 'ayaa + aan (I) contracted', sources: ['N §5.1'], confidence: 'single' },
  ayaad: { gloss: 'ayaa + aad (you) contracted', sources: ['N §5.1'], confidence: 'single' },
  ayuu: { gloss: 'ayaa + uu (he) contracted', sources: ['N §5.1'], confidence: 'single' },
  ayay: { gloss: 'ayaa + ay (she/they) contracted', sources: ['N §5.1'], confidence: 'single' },

  // ── UNIT 2: words used in Nilsson's focus example (N §12.3) ─────────────
  saaxiib: { gloss: 'friend', gender: 'm', definite: 'saaxiibka', sources: ['N §6.3', 'Wikt'] },
  saaxiibka: { gloss: 'the friend', gender: 'm', sources: ['N §6.3', 'Wikt'] },
  // These four occur only inside the minimal pair at N §12.3. They are shown
  // to the learner as whole sentences, never built from parts — the verb
  // endings belong to Lesson 7 and the possessive to a later unit.
  saaxiibkeed: { gloss: 'her friend', sources: ['N §12.3'], confidence: 'single' },
  saaxiibteed: { gloss: 'her friend (feminine form)', sources: ['N §12.3'], confidence: 'single' },
  salaamaysa: { gloss: 'is greeting', sources: ['N §12.3'], confidence: 'single' },
  salaamaysaa: { gloss: 'is greeting', sources: ['N §12.3'], confidence: 'single' },

  // ── Further nouns attested with definite forms ──────────────────────────
  caano: { gloss: 'milk', definite: 'caanaha', sources: ['N §6.4', 'Wikt'] },
  magac: { gloss: 'name', sources: ['N §11.1', 'Wikt'] },
  carruurtayda: { gloss: 'my children', sources: ['N §11.1', 'W-gram'] },

  // ── Single-source only ──────────────────────────────────────────────────
  // Real words, but attested in only one source consulted. Neither appears
  // anywhere in Nilsson, so they must not carry a Nilsson citation.
  nabad: { gloss: 'peace, wellbeing', gender: 'f', sources: ['Wikt'], confidence: 'single' },
  subax: { gloss: 'morning', gender: 'm', sources: ['Wikt'], confidence: 'single' },
};

/** Proper nouns that appear in sourced example sentences. */
export const VERIFIED_PROPER_NOUNS = new Set(['axmed', 'sahra', 'cali', 'cambara']);

/** Is this form cleared to show a learner? Case-insensitive. */
export function isVerifiedForm(form: string): boolean {
  const key = form.toLowerCase().replace(/[.?!,]+$/, '');
  return key in VERIFIED_FORMS || VERIFIED_PROPER_NOUNS.has(key);
}
