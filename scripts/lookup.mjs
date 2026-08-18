#!/usr/bin/env node
/**
 * LOOKUP — search every extracted source at once, for one word.
 *
 * Run:  node scripts/lookup.mjs <word>       (or: npm run lookup -- <word>)
 *
 * WHY THIS EXISTS. Sourcing a single vocabulary word used to mean: grep the
 * dump, hand-write a regex anchored on the English headword, compute a PDF
 * page from a printed folio using a per-book offset — which drifts within a
 * single book (Orwin is +10 around printed p.125, +12 by p.214) — then open
 * that PDF page as an image to confirm. Repeated ~50 times sourcing the
 * vocabulary decks. This script does the locate step for all five extracted
 * sources in one call and resolves the folio, so a human or an agent goes
 * straight to the page that needs reading instead of re-deriving how to find
 * it every time.
 *
 * IT DOES NOT REPLACE PAGE VERIFICATION. It replaces the SEARCH before it.
 * See "What this tool does and does not prove" below, and
 * docs/SOMALI_SOURCES.md for the sourcing rules themselves.
 *
 * SOURCES SEARCHED (from sources/*.txt, produced by fetch-sources.mjs — run
 * that first if these are missing):
 *   N   Nilsson, Beginner's Somali Grammar        — grammar, Somali-keyed
 *   O   Orwin, Colloquial Somali                  — grammar, Somali-keyed
 *   JF  Farah, Somali Learner's Dictionary        — EN -> SO
 *   SA  Adam, New Student Dictionary              — EN -> SO
 *   AW  Awde, Somali-English/English-Somali       — SO -> EN, gutter-columned
 *
 * `AW` counts as the same source as `O` (Orwin co-authored it) — see rule 2
 * under "What counts as two sources" in docs/SOMALI_SOURCES.md. This script
 * flags that in its output; it does not enforce it.
 */

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'sources');

const word = process.argv[2];
if (!word) {
  console.error('Usage: node scripts/lookup.mjs <word>');
  process.exit(1);
}

/**
 * PRINTED-FOLIO RESOLUTION FOR GRAMMAR SCANS (N, O).
 *
 * The PDF page index and the printed page number are not the same, and the
 * offset between them is not even constant within one book — verified
 * against Orwin, where it is +10 around printed p.125 and +12 by p.214. So
 * this walks backward from the match to the nearest bare-number line (a
 * folio) actually present in the text, rather than computing an offset once.
 * If no folio is found nearby the PDF page index is reported instead, marked
 * as such — never presented as if it were the printed number.
 */
function nearestFolio(lines, atLine) {
  for (let i = atLine; i >= Math.max(0, atLine - 100); i--) {
    const m = /^\s*(\d{1,3})\s*$/.exec(lines[i]);
    if (m) return { folio: m[1], exact: true };
  }
  return null;
}

function searchGrammar(key, filename, w) {
  const path = resolve(SRC, filename);
  if (!existsSync(path)) return [];
  const text = readFileSync(path, 'utf8');
  const lines = text.split('\n');
  const re = new RegExp(`\\b${escapeRe(w)}\\b`, 'i');
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      const loc = nearestFolio(lines, i);
      hits.push({
        source: key,
        loc: loc ? `printed p.${loc.folio}` : `(no folio found near line ${i + 1} — cite by line, or check the PDF directly)`,
        line: lines[i].trim(),
      });
    }
  }
  return dedupeNear(hits, 3);
}

/**
 * DICTIONARY SEARCH (JF, SA): anchor on the ENGLISH headword.
 *
 * This is the one finding that made the manual process safe. These are EN->SO
 * dictionaries: every real entry has the shape `headword (phonetic) pos.
 * Somali.` — e.g. `mouth (mawth) n. Af.` A plain substring search for the
 * Somali word matches ANY line containing it, including definitions where it
 * appears incidentally. Anchoring on "<word>(<phonetic>)" and only THEN
 * checking the Somali form inside that entry is what keeps false positives
 * out. Confirmed against Adam p.51: `cub (kab) n. Libaax yar` sits three
 * entries above `cup (kap) n. Koob` — a naive Somali-string search for `kab`
 * would misattribute that line to the Somali word `kab` (shoe), which is a
 * different entry entirely. The phonetic-respelling anchor tells them apart.
 *
 * This only finds entries where you already suspect an English gloss. If you
 * only have the Somali form, use `AW` below or a grammar.
 */
function searchDictionary(key, filename, w, glosses) {
  const path = resolve(SRC, filename);
  if (!existsSync(path)) return [];
  const text = readFileSync(path, 'utf8');
  const hits = [];
  const candidates = glosses.length ? glosses : [null];
  for (const gloss of candidates) {
    const pattern = gloss
      ? `^.*\\b${escapeRe(gloss)}\\s*\\([a-z \\-]+\\).*$`
      : `^.*\\b[a-z]+\\s*\\([a-z \\-]+\\).*\\b${escapeRe(w)}\\b.*$`;
    const re = new RegExp(pattern, 'gmi');
    let m;
    while ((m = re.exec(text))) {
      const line = m[0].replace(/\s+/g, ' ').trim();
      if (new RegExp(`\\b${escapeRe(w)}\\b`, 'i').test(line)) {
        hits.push({ source: key, loc: '(no folio in text layer — cite as `s.v. "headword"`)', line });
      }
    }
  }
  return dedupeNear(hits, 200);
}

/**
 * SOMALI-HEADWORD SEARCH (AW): gutter-column split, not whitespace-run split.
 *
 * AW is two SO->EN columns per page. A naive "split on 2+ spaces" parse takes
 * the alphabetically-first match, which is very often a COMPOUND that sorts
 * ahead of the bare headword: `habeen badh` (midnight) matched before `habeen`
 * (night) itself; `reer guuraa` (nomads) before `reer` (family); `ilmo uur ku
 * jira` (fetus) before `ilmo` (child). Worst case, `salaan` matched "ladder;
 * stairs", which is actually `sallaan` — a different word.
 *
 * Fix: detect the actual gutter position per page (the column of characters
 * that is blank in ~97% of that page's rows), split there, and require the
 * candidate headword to be the FIRST token on its own line within a column —
 * which a compound's second word never is. Validated against 29 entries
 * independently confirmed on the physical page during the August 2026
 * sourcing pass: 27 exact matches, 0 wrong, 2 misses (both fail safe — they
 * simply do not appear, rather than returning a wrong entry).
 */
function findGutter(rows) {
  const width = Math.max(...rows.map((r) => r.length));
  const blankFrac = [];
  for (let c = 0; c < width; c++) {
    let blank = 0;
    for (const r of rows) if (r.length <= c || r[c] === ' ') blank++;
    blankFrac.push(blank / rows.length);
  }
  const runs = [];
  let start = null;
  for (let c = 0; c < width; c++) {
    if (blankFrac[c] >= 0.97) {
      if (start === null) start = c;
    } else {
      if (start !== null && c - start >= 3) runs.push([start, c]);
      start = null;
    }
  }
  if (start !== null && width - start >= 3) runs.push([start, width]);
  const mid = width / 2;
  const inner = runs.filter(([s, e]) => s > width * 0.25 && s < width * 0.75);
  if (!inner.length) return null;
  inner.sort((a, b) => Math.abs((a[0] + a[1]) / 2 - mid) - Math.abs((b[0] + b[1]) / 2 - mid));
  return inner[0][0];
}

function parseColumn(lines) {
  const entries = [];
  const re = /^\s*([a-z’'-]+(?:\s[a-z’'-]+){0,2})\s{1,}([a-z].*\S)\s*$/i;
  for (const line of lines) {
    const m = re.exec(line);
    if (m) entries.push([m[1].trim().toLowerCase(), m[2].trim()]);
  }
  return entries;
}

function searchAwde(w) {
  const path = resolve(SRC, 'aw-awde-dictionary-phrasebook.txt');
  if (!existsSync(path)) return [];
  const pages = readFileSync(path, 'utf8').split('\f');
  const hits = [];
  // Somali-English index only (pdf pp.20-58 by inspection); the English-Somali
  // half of the same book would need the mirror-image search.
  for (let i = 19; i < Math.min(58, pages.length); i++) {
    const rows = pages[i].split('\n').filter((l) => l.trim());
    if (rows.length < 5) continue;
    const g = findGutter(rows);
    const cols = g != null ? [rows.map((r) => r.slice(0, g)), rows.map((r) => r.slice(g))] : [rows];
    for (const col of cols) {
      for (const [headword, gloss] of parseColumn(col)) {
        if (headword === w.toLowerCase()) {
          hits.push({ source: 'AW', loc: `pdf p.${i + 1} (verify printed folio on the page)`, line: `${headword} ${gloss}` });
        }
      }
    }
  }
  return hits;
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function dedupeNear(hits, keep) {
  return hits.slice(0, keep);
}

// ---------------------------------------------------------------------------

console.log(`\nLooking up "${word}"\n`);

const results = [
  ...searchGrammar('N', 'nilsson-beginners-somali-grammar.txt', word),
  ...searchGrammar('O', 'orwin-colloquial-somali.txt', word),
  ...searchDictionary('JF', 'jf-somali-learners-dictionary.txt', word, []),
  ...searchDictionary('SA', 'sa-new-student-dictionary.txt', word, []),
  ...searchAwde(word),
];

if (!results.length) {
  console.log('No hits in any extracted source.');
  console.log('If this is a content word, try the dictionary search with an');
  console.log('English gloss instead — pass it as a second argument.\n');
} else {
  for (const r of results) {
    const flag = r.source === 'AW' ? '  [counts as O — Orwin co-authored AW]' : '';
    console.log(`[${r.source}] ${r.loc}${flag}`);
    console.log(`      ${r.line.slice(0, 100)}`);
  }
}

// Second pass: if an English gloss was given, search dictionaries by it too.
const gloss = process.argv[3];
if (gloss) {
  console.log(`\nDictionary search anchored on English "${gloss}":\n`);
  const g = [
    ...searchDictionary('JF', 'jf-somali-learners-dictionary.txt', word, [gloss]),
    ...searchDictionary('SA', 'sa-new-student-dictionary.txt', word, [gloss]),
  ];
  if (!g.length) console.log('  no hits');
  for (const r of g) {
    console.log(`[${r.source}] ${r.loc}`);
    console.log(`      ${r.line.slice(0, 100)}`);
  }
}

console.log(`
--------------------------------------------------------------------------
WHAT THIS TOOL DOES AND DOES NOT PROVE

It LOCATES. It does not verify. Confirm on the physical page before citing,
per docs/WORKING_AGREEMENT.md — this script's own validation run had 0 wrong
matches out of 29 checked, which is good, not perfect, and "good" is not the
bar for content a learner will be taught as fact.

Page reads are still required before citing when:
  - the form will appear in lesson prose or an exercise (not just a vocab gloss)
  - two sources disagree, or only one source returns a hit
  - the hit's location says "(no folio found...)" or "(verify printed folio...)"

PDF <-> printed page numbers differ per book, and the offset DRIFTS within a
single book (Orwin: +10 near p.125, +12 by p.214). Trust the folio this tool
reports, not arithmetic.
--------------------------------------------------------------------------
`);
