#!/usr/bin/env node
/**
 * FETCH SOURCES — make the reference grammar searchable, reproducibly.
 *
 * Run:  npm run fetch:sources
 *
 * Why this exists: sourcing is the gate on all new content (rule 5 of
 * docs/WORKING_AGREEMENT.md), and the primary source is a PDF that WebFetch
 * cannot read. Whoever picks this project up next — a person, or a different
 * AI tool — must be able to reproduce the exact text every citation in
 * docs/SOMALI_SOURCES.md points at, without inheriting anyone's session state.
 *
 * Output goes to `sources/` which is gitignored: the PDF is a third-party
 * work and does not belong in this repository. Only our own notes about it
 * (SOMALI_SOURCES.md) and the registry (verified-forms.ts) are committed.
 *
 * Requires `pdftotext` (poppler-utils). The -layout flag is not optional —
 * without it the two-column pages interleave and the wordlists become
 * unreadable.
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'sources');

/** Source key `N` in docs/SOMALI_SOURCES.md. */
const NILSSON = {
  key: 'N',
  url: 'https://morgannilsson.se/BeginnersSomaliGrammar.Aug2023.pdf',
  pdf: resolve(OUT_DIR, 'nilsson-beginners-somali-grammar.pdf'),
  txt: resolve(OUT_DIR, 'nilsson-beginners-somali-grammar.txt'),
  cite: 'Morgan Nilsson, Beginner\'s Somali Grammar, University of Gothenburg, 25 Aug 2023',
};

function have(cmd) {
  try {
    execFileSync('which', [cmd], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function main() {
  if (!have('pdftotext')) {
    console.error(
      '\n  pdftotext not found. It ships with poppler-utils:\n' +
        '    Debian/Ubuntu  sudo apt install poppler-utils\n' +
        '    Arch           sudo pacman -S poppler\n' +
        '    macOS          brew install poppler\n',
    );
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  if (existsSync(NILSSON.txt)) {
    console.log(`  ✓ already extracted: ${NILSSON.txt}`);
    console.log('    delete it and re-run to refresh.');
    return;
  }

  if (!existsSync(NILSSON.pdf)) {
    console.log(`  downloading ${NILSSON.cite}`);
    console.log(`    ${NILSSON.url}`);
    execFileSync('curl', ['-sL', '--fail', '--max-time', '180', '-o', NILSSON.pdf, NILSSON.url], {
      stdio: 'inherit',
    });
    console.log(`    ${(statSync(NILSSON.pdf).size / 1e6).toFixed(1)} MB`);
  }

  // -layout preserves the two-column page structure. Without it the columns
  // interleave line by line and the wordlists cannot be read.
  execFileSync('pdftotext', ['-layout', NILSSON.pdf, NILSSON.txt], { stdio: 'inherit' });

  console.log(`  ✓ ${NILSSON.txt}`);
  console.log('\n  Section numbers cited as "N §x.y" in docs/SOMALI_SOURCES.md are');
  console.log('  the § headings in this text. Find one with, for example:');
  console.log('    grep -n "§ 12.3" sources/nilsson-beginners-somali-grammar.txt');
}

main();
