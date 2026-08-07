/**
 * course-to-app.cjs
 *
 * Converts the authored Somali grammar course (COURSE.md, 26 modules of slides)
 * into the app's data file:
 *
 *   - src/data/teaching-content.ts   (26 card lessons: intro/teach/practice/summary)
 *
 * Mapping (1 module = 1 lesson):
 *   Title + Learning Objectives slide  -> intro card (bullets + culturalNote)
 *   Content / dialogue slides          -> teach cards (somaliText/examples/explanation/tip)
 *   "Exercise N" + "Exercise N Answers"-> practice card (multiple_choice, options + correct)
 *   Summary slide                      -> summary card (takeaways)
 *
 * Re-run after editing COURSE.md:  node scripts/course-to-app.cjs
 * Fails loudly if any module yields zero cards.
 */

const fs = require('fs');
const path = require('path');

/* ─── Paths ──────────────────────────────────────────────────────────────── */

const REPO = path.resolve(__dirname, '..');
const SRC_MD =
  process.env.COURSE_MD ||
  path.resolve(REPO, 'COURSE.md');
const OUT_TEACHING = path.resolve(REPO, 'src/data/teaching-content.ts');

/* ─── Phase metadata (by module number) ──────────────────────────────────── */

const PHASES = [
  { max: 7, name: 'Foundations & Phonetics', color: '#3b82f6' },
  { max: 12, name: 'Core Verb System', color: '#8b5cf6' },
  { max: 21, name: 'Sentence Structure & Grammar', color: '#06b6d4' },
  { max: 26, name: 'Application & Integration', color: '#22c55e' },
];
function phaseFor(moduleNum) {
  return PHASES.find((p) => moduleNum <= p.max) || PHASES[PHASES.length - 1];
}

/* ─── Text helpers ───────────────────────────────────────────────────────── */

function stripInline(s) {
  return String(s)
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^[•\-•]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Remove emoji / decorative symbols for short labels.
function plain(s) {
  return stripInline(s)
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️✅❌⭐]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstBold(line) {
  const m = line.match(/\*\*(.+?)\*\*/);
  return m ? m[1].trim() : null;
}

// Clean an answer/option token: drop a leading "a) " / "b) " and a trailing gloss.
function cleanToken(s) {
  let t = stripInline(s);
  t = t.replace(/^[a-eA-E]\)\s*/, '');
  // Drop a trailing "(...)" gloss only if there's content before it.
  const g = t.match(/^(.+?)\s*\(([^)]*)\)\s*$/);
  if (g && g[1].trim().length > 0) t = g[1].trim();
  return t.trim();
}

// Extract an English gloss "(...)" if present.
function glossOf(s) {
  const g = stripInline(s).match(/\(([^)]+)\)\s*$/);
  return g ? g[1].trim() : '';
}

/* ─── Markdown structure parsing ─────────────────────────────────────────── */

function splitModules(md) {
  const lines = md.split('\n');
  const mods = [];
  let cur = null;
  for (const line of lines) {
    const m = line.match(/^# MODULE (\d+):\s*(.+?)\s*$/);
    if (m) {
      cur = { num: parseInt(m[1], 10), title: plain(m[2]), lines: [] };
      mods.push(cur);
      continue;
    }
    if (/^# PHASE /.test(line)) {
      cur = null; // phase banner; not part of a module body
      continue;
    }
    if (cur) cur.lines.push(line);
  }
  return mods;
}

function splitSlides(moduleLines) {
  const slides = [];
  let cur = null;
  for (const line of moduleLines) {
    const m = line.match(/^## Slide \d+:\s*(.+?)\s*$/);
    if (m) {
      cur = { heading: plain(m[1]), raw: m[1].trim(), body: [] };
      slides.push(cur);
      continue;
    }
    if (cur) cur.body.push(line);
  }
  return slides;
}

function fencesOf(body) {
  const blocks = [];
  let inside = false;
  let buf = [];
  for (const line of body) {
    if (/^```/.test(line.trim())) {
      if (inside) {
        blocks.push(buf);
        buf = [];
        inside = false;
      } else {
        inside = true;
      }
      continue;
    }
    if (inside) buf.push(line);
  }
  return blocks;
}

// Parse "Somali text (English gloss)" pairs from a set of lines.
// Handles two formats:
//   (a) same line:  "tag (to go)"  or  "NAME: Somali (English)"
//   (b) dialogue:   "NAME: Somali sentence"
//                   "        (English gloss)"   <- gloss on the next line
function pairsFromLines(lines) {
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/^\s*[A-Z][A-Z \-']*:\s*/, ''); // drop speaker label
    const glossOnly = stripInline(lines[i]).match(/^\(([^)]+)\)$/);
    if (glossOnly) continue; // consumed by the previous line's lookahead
    line = stripInline(line);
    if (!line) continue;

    const m = line.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (m && m[1].trim() && m[2].trim()) {
      const somali = m[1].trim();
      const english = m[2].trim();
      if (somali.length <= 80 && english.length <= 80) out.push({ somali, english });
      continue;
    }

    // Lookahead: next non-empty line is a parenthetical gloss.
    let j = i + 1;
    while (j < lines.length && stripInline(lines[j]) === '') j++;
    const next = j < lines.length ? stripInline(lines[j]).match(/^\(([^)]+)\)$/) : null;
    if (next && line.length <= 80 && next[1].trim().length <= 80) {
      out.push({ somali: line, english: next[1].trim() });
    }
  }
  return out;
}

// Parse markdown table rows -> {somali, english} from first two columns.
function pairsFromTables(body) {
  const out = [];
  for (const line of body) {
    if (!/^\s*\|/.test(line)) continue;
    if (/^\s*\|?[\s:|-]+\|?\s*$/.test(line)) continue; // separator
    const cells = line.split('|').map((c) => stripInline(c)).filter((c) => c.length);
    if (cells.length >= 2) {
      const somali = cells[0];
      const english = cells[1];
      if (/header|type|pattern|form|meaning|example/i.test(somali)) continue;
      if (somali && english && somali.length <= 60 && english.length <= 80) {
        out.push({ somali, english });
      }
    }
  }
  return out;
}

/* ─── Slide classification ───────────────────────────────────────────────── */

// Only skip true navigation / meta slides. Review-module recap slides are kept
// as teach cards (they carry real content: tables, examples, checklists).
const SKIP_HEADING = /^(Self-Check|Quick Reference|What's Next|Bridge to|Phase \d+ Completion|Course Completion|Course Complete|Certificate|Mahadsanid)/i;

function isExercise(h) {
  return /^Exercise\b/i.test(h) && !/Answers/i.test(h);
}
function isAnswers(h) {
  return /^Exercise\b/i.test(h) && /Answers/i.test(h);
}

/* ─── Practice / drill extraction ────────────────────────────────────────── */

// Numbered list items "1. ..." from a slide body (returns array of strings).
function numberedItems(body) {
  const items = [];
  for (const line of body) {
    const m = line.match(/^\s*(\d+)\.\s+(.*)$/);
    if (m) items.push(m[2].trim());
  }
  return items;
}

// Inline option set from a single exercise item line.
//   "a) cat (dew) | b) caat (problem)"  -> ['cat','caat']
//   "→ tag / tags / tageen"             -> ['tag','tags','tageen']
//   "(WAA / TAHAY)"                     -> ['WAA','TAHAY']
function inlineOptions(itemLine) {
  const line = stripInline(itemLine);
  // lettered "a) .. | b) .."
  if (/\b[a-e]\)\s/.test(line) && line.includes('|')) {
    return line
      .split('|')
      .map((p) => cleanToken(p))
      .filter(Boolean);
  }
  // arrow then slash list
  const arrow = line.split(/→|->/);
  const tail = arrow[arrow.length - 1];
  if (tail && tail.includes('/')) {
    const opts = tail
      .replace(/[()]/g, '')
      .split('/')
      .map((p) => cleanToken(p))
      .filter(Boolean);
    if (opts.length >= 2) return opts;
  }
  // parenthetical "(X / Y)"
  const par = line.match(/\(([^)]*\/[^)]*)\)/);
  if (par) {
    const opts = par[1].split('/').map((p) => cleanToken(p)).filter(Boolean);
    if (opts.length >= 2) return opts;
  }
  return [];
}

// Deterministic shuffle (seeded) so output is stable across runs.
function seededShuffle(arr, seed) {
  const a = arr.slice();
  let s = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uniq(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    const k = x.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      out.push(x);
    }
  }
  return out;
}

/**
 * Build one practice exercise from an Exercise slide + its Answers slide.
 * Uses sub-item 1 as the focused question; sibling answers become distractors.
 * Returns null if it cannot be made valid.
 */
function buildPractice(exSlide, ansSlide, moduleNum, idx, globalPool) {
  const exItems = numberedItems(exSlide.body);
  const ansItems = numberedItems(ansSlide.body);
  if (ansItems.length === 0) return null;

  // Instruction: first bold line, else heading after an em dash.
  let instruction = '';
  for (const l of exSlide.body) {
    const b = firstBold(l);
    if (b && /[?:]/.test(b)) {
      instruction = stripInline(b);
      break;
    }
  }
  if (!instruction) {
    const dash = exSlide.raw.split(/—|-/).slice(1).join('—').trim();
    instruction = plain(dash || exSlide.heading.replace(/^Exercise\s+\d+\s*/i, ''));
  }
  if (!instruction) instruction = 'Choose the correct answer.';

  // Correct answer = cleaned bold of answer item 1 (or item 1 text).
  const ans1 = ansItems[0];
  const correctRaw = firstBold(ans1) || ans1;
  const correct = cleanToken(correctRaw);
  if (!correct || correct.length > 60) return null;

  // Question stem: include item-1 prompt if it carries a "X → ?" shape.
  let question = instruction;
  if (exItems[0]) {
    const stem = stripInline(exItems[0]).replace(/→.*$/, '→ ?').trim();
    if (/→/.test(stem) && stem.length <= 70) question = `${instruction}  ${stem}`;
  }

  // Options.
  let options = [];
  const inl = exItems[0] ? inlineOptions(exItems[0]) : [];
  if (inl.length >= 2) {
    // Align correct to the matching inline option (exact string the user taps).
    const match = inl.find(
      (o) => o.toLowerCase() === correct.toLowerCase() ||
             o.toLowerCase().includes(correct.toLowerCase()) ||
             correct.toLowerCase().includes(o.toLowerCase())
    );
    options = inl.slice(0, 4);
    if (match) {
      // ensure the correct token is exactly present
      if (!options.some((o) => o === match)) options[0] = match;
      return finalizePractice(question, options, match, exSlide, ansSlide, ans1);
    }
    // no match -> fall through to sibling-based options
  }

  // Sibling answers as distractors.
  const siblings = ansItems
    .slice(1)
    .map((it) => cleanToken(firstBold(it) || it))
    .filter((t) => t && t.length <= 60 && t.toLowerCase() !== correct.toLowerCase());
  let pool = uniq([correct, ...siblings]);
  if (pool.length < 4) {
    const extra = globalPool.filter(
      (t) => !pool.some((p) => p.toLowerCase() === t.toLowerCase())
    );
    pool = pool.concat(seededShuffle(extra, moduleNum * 100 + idx).slice(0, 4 - pool.length));
  }
  options = seededShuffle(uniq(pool).slice(0, 4), moduleNum * 7 + idx);
  if (!options.some((o) => o === correct)) options[0] = correct;
  if (options.length < 2) return null;

  return finalizePractice(question, options, correct, exSlide, ansSlide, ans1);
}

function finalizePractice(question, options, correct, exSlide, ansSlide, ans1) {
  // Hint: explicit "Hint" line if present, else generic.
  let hint = '';
  for (const l of exSlide.body.concat(ansSlide.body)) {
    if (/hint/i.test(l)) {
      hint = stripInline(l).replace(/^.*hint[:\s]*/i, '').trim();
      if (hint) break;
    }
  }
  if (!hint) hint = 'Look back at the examples taught in this lesson.';

  // Explanation: trailing "Key:" / "Why" line of the answers slide, else gloss.
  let explanation = '';
  for (const l of ansSlide.body) {
    const b = firstBold(l);
    if (b && /^(Key|Why|Note|Remember|Important)/i.test(b)) {
      explanation = stripInline(l).replace(/^[^:]*:\s*/, '').trim();
    }
  }
  if (!explanation) {
    const g = glossOf(ans1);
    explanation = g
      ? `Correct answer: ${correct} (${g}).`
      : `Correct answer: ${correct}.`;
  }

  return {
    question: question.slice(0, 240),
    options,
    correctAnswer: correct,
    hint: hint.slice(0, 200),
    explanation: explanation.slice(0, 300),
  };
}

/* ─── Teach card builder ─────────────────────────────────────────────────── */

function buildTeach(slide) {
  const fences = fencesOf(slide.body);
  let examples = [];
  for (const f of fences) examples = examples.concat(pairsFromLines(f));
  examples = examples.concat(pairsFromTables(slide.body));
  examples = examples.slice(0, 4);

  // Prose: non-list, non-table, non-fence lines.
  let inFence = false;
  const prose = [];
  for (const line of slide.body) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (/^\s*\|/.test(line)) continue;
    if (/^\s*\d+\.\s/.test(line)) continue;
    if (/^\s*[-•]\s/.test(line)) continue;
    const t = stripInline(line);
    if (t) prose.push(t);
  }

  // Tip: a Key/Notice/Important line.
  let tip = '';
  for (const line of slide.body) {
    const b = firstBold(line);
    if (b && /^(Key|Notice|Tip|Important|Remember)/i.test(b)) {
      tip = stripInline(line).replace(/^[^:]*:\s*/, '').trim();
      break;
    }
  }

  const explanation = prose
    .filter((p) => p.length > 12 && !/^(Listen|Your job|Observations)/i.test(p))
    .join(' ')
    .slice(0, 320);

  // somaliText only when there is a short single featured phrase.
  let somaliText;
  let englishText;
  if (fences.length && fences[0].length) {
    const firstLine = fences[0].map((l) => l.trim()).filter(Boolean)[0] || '';
    const cleaned = firstLine.replace(/\s*\(.*\)\s*$/, '').trim();
    if (cleaned && cleaned.length <= 40 && !/[:]/.test(cleaned) && fences[0].filter((l) => l.trim()).length <= 3) {
      somaliText = cleaned;
      const g = glossOf(firstLine);
      if (g) englishText = g;
    }
  }

  const card = { type: 'teach' };
  const badge = plain(slide.heading).slice(0, 34);
  if (badge) card.conceptBadge = badge;
  if (somaliText) card.somaliText = somaliText;
  if (englishText) card.englishText = englishText;
  if (explanation) card.explanation = explanation;
  if (examples.length) card.examples = examples;
  if (tip) card.tip = tip.slice(0, 200);

  // Drop empty teach cards.
  if (!card.explanation && !card.examples && !card.somaliText) return null;
  return card;
}

/* ─── Module -> lesson + level ───────────────────────────────────────────── */

function buildLesson(mod, globalPool) {
  const slides = splitSlides(mod.lines);
  const phase = phaseFor(mod.num);
  const cards = [];
  const practices = []; // raw practice exercises for drills

  // Intro from Learning Objectives slide.
  const objSlide = slides.find((s) => /^Learning Objectives/i.test(s.heading));
  let bullets = [];
  let culturalNote;
  if (objSlide) {
    bullets = numberedItems(objSlide.body).map((b) => stripInline(b)).slice(0, 6);
    for (const l of objSlide.body) {
      if (/^Key approach/i.test(stripInline(l))) {
        culturalNote = stripInline(l).replace(/^Key approach:?\s*/i, '').trim();
      }
    }
  }
  if (bullets.length === 0) bullets = [`Learn the essentials of ${mod.title}.`];
  const intro = { type: 'intro', title: mod.title, bullets };
  if (culturalNote) intro.culturalNote = culturalNote;
  cards.push(intro);

  // Walk slides; pair exercises with their answers.
  let exIdx = 0;
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i];
    if (/^Title$/i.test(s.heading) || /^Learning Objectives/i.test(s.heading)) continue;
    if (/^Summary/i.test(s.heading)) continue; // handled at end
    if (SKIP_HEADING.test(s.heading)) continue;

    if (isExercise(s.heading)) {
      // find the next Answers slide
      const ans = slides.slice(i + 1).find((x) => isAnswers(x.heading));
      if (ans) {
        const p = buildPractice(s, ans, mod.num, exIdx++, globalPool);
        if (p) {
          cards.push({ type: 'practice', exercise: { type: 'multiple_choice', ...p } });
          practices.push(p);
        }
      }
      continue;
    }
    if (isAnswers(s.heading)) continue;

    const teach = buildTeach(s);
    if (teach) cards.push(teach);
  }

  // Summary.
  const sumSlide = slides.find((s) => /^Summary/i.test(s.heading));
  let takeaways = [];
  if (sumSlide) {
    for (const l of sumSlide.body) {
      const t = stripInline(l);
      if (/^✅|^- |^\d+\./.test(l.trim()) && t.length > 4) takeaways.push(plain(t));
    }
    takeaways = takeaways.slice(0, 6);
  }
  if (takeaways.length === 0) takeaways = [`You completed ${mod.title}.`];
  cards.push({ type: 'summary', title: `You learned ${mod.title}!`, takeaways });

  const lesson = { lessonId: mod.num, title: mod.title, cards };

  // Drill level from the same practices + a rule card from first teach.
  const firstTeach = cards.find((c) => c.type === 'teach');
  const ruleExamples = (firstTeach && firstTeach.examples ? firstTeach.examples : [])
    .slice(0, 3)
    .map((e) => ({ somali: e.somali, breakdown: '', english: e.english }));
  const rule = {
    title: mod.title,
    content:
      (firstTeach && firstTeach.explanation) ||
      `Key patterns for ${mod.title}.`,
    examples: ruleExamples.length
      ? ruleExamples
      : [{ somali: mod.title, breakdown: '', english: phase.name }],
  };

  const drills = practices.map((p, k) => ({
    id: `m${mod.num}-d${k + 1}`,
    type: 'fill-blank',
    prompt: p.question,
    options: p.options,
    correctAnswer: p.correctAnswer,
    explanation: p.explanation,
  }));
  // Guarantee non-empty buckets.
  const fallback = {
    id: `m${mod.num}-d0`,
    type: 'fill-blank',
    prompt: `Review: which relates to ${mod.title}?`,
    options: [mod.title, phase.name, 'None', 'All'],
    correctAnswer: mod.title,
    explanation: `This lesson covers ${mod.title}.`,
  };
  const safe = drills.length ? drills : [fallback];
  const third = Math.max(1, Math.ceil(safe.length / 3));
  const guided = safe.slice(0, third);
  const unguided = safe.slice(third, third * 2);
  const gate = safe.slice(third * 2);

  const level = {
    id: mod.num,
    title: mod.title,
    subtitle: `Phase: ${phase.name}`,
    color: phase.color,
    rule,
    guidedDrills: guided.length ? guided : [safe[0]],
    unguidedDrills: unguided.length ? unguided : [safe[0]],
    gateDrills: gate.length ? gate : [safe[safe.length - 1]],
  };

  return { lesson, level, practiceCount: practices.length };
}

/* ─── Emit ───────────────────────────────────────────────────────────────── */

function emitTeaching(lessons) {
  const entries = lessons
    .map((l) => `  ${l.lessonId}: ${JSON.stringify(l, null, 2).replace(/\n/g, '\n  ')},`)
    .join('\n');
  return `/**
 * Teaching Content — Card-based lesson material for all ${lessons.length} lessons.
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
${entries}
};

export const MAX_LESSON_ID = ${lessons.length};

export interface LessonSummary {
  lessonId: number;
  title: string;
  cardCount: number;
}

export const LESSON_LIST: LessonSummary[] = [
${lessons.map((l) => `  { lessonId: ${l.lessonId}, title: ${JSON.stringify(l.title)}, cardCount: ${l.cards.length} },`).join('\n')}
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
`;
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

function main() {
  if (!fs.existsSync(SRC_MD)) {
    console.error(`✖ COURSE.md not found at ${SRC_MD}\n  Set COURSE_MD=/path/to/COURSE.md`);
    process.exit(1);
  }
  const md = fs.readFileSync(SRC_MD, 'utf8');
  const mods = splitModules(md);
  if (mods.length === 0) {
    console.error('✖ No "# MODULE" sections found.');
    process.exit(1);
  }

  // Pass 1: collect a global distractor pool of clean answer tokens.
  const globalPool = [];
  for (const mod of mods) {
    for (const s of splitSlides(mod.lines)) {
      if (!isAnswers(s.heading)) continue;
      for (const it of numberedItems(s.body)) {
        const t = cleanToken(firstBold(it) || it);
        if (t && t.length >= 2 && t.length <= 24 && /[a-z]/i.test(t)) globalPool.push(t);
      }
    }
  }

  // Pass 2: build lessons.
  const lessons = [];
  const report = [];
  let failed = false;

  for (const mod of mods) {
    const { lesson, practiceCount } = buildLesson(mod, uniq(globalPool));
    const teachCount = lesson.cards.filter((c) => c.type === 'teach').length;
    if (lesson.cards.length <= 2) {
      console.error(`✖ Module ${mod.num} (${mod.title}) produced too few cards.`);
      failed = true;
    }
    lessons.push(lesson);
    report.push(
      `  M${String(mod.num).padStart(2)} ${mod.title.slice(0, 38).padEnd(38)} ` +
        `cards=${String(lesson.cards.length).padStart(2)} teach=${String(teachCount).padStart(2)} practice=${String(practiceCount).padStart(2)}`
    );
  }

  if (failed) {
    console.error('\nAborting: some modules did not parse cleanly.');
    process.exit(1);
  }

  fs.writeFileSync(OUT_TEACHING, emitTeaching(lessons), 'utf8');

  console.log('Somali course → app conversion complete.\n');
  console.log(report.join('\n'));
  console.log(`\n✔ ${lessons.length} lessons → ${path.relative(REPO, OUT_TEACHING)}`);
}

main();
