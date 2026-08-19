#!/usr/bin/env node
/**
 * GATES — run all four checks, print one line unless something breaks.
 *
 * Run:  npm run gates          (add --verbose to see everything)
 *
 * WHY THIS EXISTS. The four gates together emit ~85 lines / ~1,100 tokens on a
 * clean run, almost all of it noise: build asset tables, vitest's banner, the
 * validator's 21 passing checks. An agent runs this after every change, so that
 * noise is paid over and over, and every agent working here had independently
 * started piping it through `grep` to get the three numbers that matter.
 *
 * This does that once, properly. On success it prints a single summary line.
 * On failure it prints the failing gate's full output and nothing else, so the
 * error is not buried in three passing gates' worth of scrollback.
 *
 * TOOL-AGNOSTIC ON PURPOSE. Claude Code's Stop hook, the git pre-commit hook,
 * CI, and a human all call the same `npm run gates`. Do not reimplement the
 * gate list anywhere else — if a gate is added, it is added here.
 */

import { spawnSync } from 'node:child_process';

const verbose = process.argv.includes('--verbose');

/**
 * Each gate names the one fact worth surfacing on success. Everything else
 * from these commands is scrollback nobody reads when it passes.
 */
const GATES = [
  {
    name: 'build',
    cmd: 'npm',
    args: ['run', 'build'],
    // tsc -b is silent on success; vite prints an asset table we don't need.
    summarise: (out) => (/✓ built in/.test(out) ? 'ok' : 'ok'),
  },
  {
    name: 'tests',
    cmd: 'npx',
    args: ['vitest', 'run'],
    summarise: (out) => {
      const m = /Tests\s+(\d+) passed/.exec(out);
      return m ? `${m[1]} passed` : 'passed';
    },
  },
  {
    name: 'validate',
    cmd: 'npm',
    args: ['run', 'validate:course'],
    summarise: (out) => {
      const m = /(\d+) passed · (\d+) warning\(s\) · (\d+) error\(s\)/.exec(out);
      return m ? `${m[1]} checks, ${m[2]} warnings` : 'passed';
    },
  },
  {
    name: 'lint',
    cmd: 'npm',
    args: ['run', 'lint'],
    summarise: () => '0 errors',
  },
];

const results = [];

for (const gate of GATES) {
  const r = spawnSync(gate.cmd, gate.args, { encoding: 'utf8', shell: process.platform === 'win32' });
  const out = `${r.stdout ?? ''}${r.stderr ?? ''}`;

  if (verbose) {
    console.log(`\n─── ${gate.name} ───`);
    console.log(out.trim());
  }

  if (r.status !== 0) {
    // Print the whole failure. This is the one time the detail is the point.
    if (!verbose) {
      console.error(`\n✗ ${gate.name} FAILED\n`);
      console.error(out.trim());
    }
    console.error(`\nGates: ${results.map((x) => `${x.name} ok`).join(' · ')} · ${gate.name} FAILED`);
    process.exit(1);
  }

  results.push({ name: gate.name, detail: gate.summarise(out) });
}

console.log(`Gates green — ${results.map((r) => `${r.name}: ${r.detail}`).join(' · ')}`);
