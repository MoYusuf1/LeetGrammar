# Sourcing a Somali form

> **Canonical procedure. Tool-neutral.** Claude Code reaches this through the
> `source-a-form` skill; other agents are pointed here by `AGENTS.md`. Edit this
> file, not a copy.

Two independent published sources, or the form does not ship. `npm run validate:course` enforces this and exits non-zero.

## 1. Locate

```bash
node scripts/lookup.mjs <somali-word> [english-gloss]
```

Searches all five extracted sources at once and resolves printed folios. Run `npm run fetch:sources` first if `sources/*.txt` is missing.

## 2. Pick the right source for the kind of form

| Form | Source | Not |
|---|---|---|
| Content word (noun, adjective, verb stem) | `SA` / `JF`, anchored on the **English** headword | The grammars — they were never a breadth source |
| Paradigm cell (possessive, demonstrative, pronoun, interrogative) | `N` §9.2–9.4 + `O` pp.125/134/216 | Any dictionary — these are not headwords |
| Inflected form (past tense, definite, subject case, fused signal) | A double-attested **rule** + a registered stem → derived tier, check `S7` | A lookup; dictionaries carry `cab`, never `cabbay` |
| Grammatical claim ("`waa` marks X") | `N` + `O`, and expect them to disagree | Dictionaries, absolutely |
| Confirming a Somali headword directly | `AW` (only SO→EN index) | — |

## 3. Confirm on the page before citing

The lookup script **locates**; it does not verify. Read the actual PDF page when:

- the form will appear in lesson prose or an exercise
- sources disagree, or only one returns a hit
- the hit says `(no folio found…)` or `(verify printed folio…)`

PDF and printed page numbers differ per book **and the offset drifts inside a book** (Orwin: +10 near p.125, +12 by p.214). Trust the folio the script reports, never arithmetic.

## 4. Check independence before counting to two

- Two citations of one author are **one** source.
- **`AW` counts as `O`** — Orwin co-authored it. This has cost real work three times.
- Same publisher is a caution (`JF` and `SA` are both HAAN).
- Unknown provenance is not a source.
- Prefer a grammar + a dictionary over two dictionaries.
- **Machine translation is never a source** — not Google Translate, not an LLM, not this one. Somali is low-resource; MT trains on the same small pool and cannot decline, so citing it is circular. This project has already shipped invented citations once.

## 5. Register

Add to `src/data/verified-forms.ts` (or `vocabulary.ts` for deck entries) with both citations, then run the gates.

Dictionary citations use `s.v. "headword"` — the folios are not in those scans' text layers.

## Known traps

- **Compounds sort before headwords.** `habeen badh` (midnight) precedes `habeen` (night). The script's gutter-split handles this; a hand-rolled grep does not.
- **`mahadnaq` ≠ `mahadsanid`** — the verb "to thank" is not the fixed phrase "thank you".
- **`salaan` ≠ `sallaan`** — greeting vs ladder. `AW` conflates them.
- **Phonetic respellings look like Somali.** In `SA`, `cub (kab) n. Libaax yar` — that `kab` is the respelling of English *cub*, not Somali `kab` (shoe).
- **A form can be root notation, not a word.** `xarf` was taught for a week; Nilsson §4.3 gives the singular as `xaraf`, since a Somali syllable cannot end in two consonants.

Full reasoning, findings and the remaining gaps: `docs/SOMALI_SOURCES.md`.
