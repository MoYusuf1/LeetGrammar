# Verified Somali reference

Every Somali fact used by lessons 1–4 must appear here with **two independent
sources** before it can be authored into `src/data/authored-lessons.ts`.

Anything not on this page is unverified and must not ship. If a fact is needed
and cannot be sourced, cut the fact — do not soften it, do not stub it.

**This page is prose; `src/data/verified-forms.ts` is the enforced version.**
`npm run validate:course` checks every Somali string in exercise answers and
lesson prose against that registry and exits non-zero on anything missing. Add
a form to the registry only after recording its sources here.

> ### A correction to this document
> An earlier draft cited "N (greetings)" for `nabad` and "N §3.2" for `subax`.
> **Neither word appears anywhere in Nilsson.** The citations were invented —
> the same failure as inventing a word, one level up. Both are real words
> (Wiktionary attests `nabad` f. "peace, wellbeing" and `subax` m. "morning"),
> but they rest on a **single source** and are now marked as such.
>
> `cod` (voice) and `mahadsanid` (thank you) could not be attested in either
> source consulted, so they were **removed from lesson content** and replaced
> with `caano` and `libaax`, which Nilsson attests directly.

## Sources

| Key | Source |
| --- | --- |
| **N** | Morgan Nilsson, *Beginner's Somali Grammar*, University of Gothenburg, 25 Aug 2023. https://morgannilsson.se/BeginnersSomaliGrammar.Aug2023.pdf |
| **O** | Martin Orwin, *Colloquial Somali: A Complete Language Course*, Routledge (Colloquial Series). **Not redistributable** — supply your own copy, see below. |
| **W-alpha** | Wikipedia, *Somali Latin alphabet*. https://en.wikipedia.org/wiki/Somali_Latin_alphabet |
| **W-gram** | Wikipedia, *Somali grammar*. https://en.wikipedia.org/wiki/Somali_grammar |
| **Wikt** | Wiktionary, Somali entries. https://en.wiktionary.org/ |

### Why a second grammar was necessary

For a long stretch this project effectively had **one** substantive source.
Wikipedia and Wiktionary cover a fraction of the grammar, so every topic they
happen to miss was single-sourced by construction — and they miss a lot. Both
the *Somali grammar* and *Somali language* articles omit **negation and
questions entirely**, which was verified directly rather than assumed. That put
two of Unit 3's three lessons out of reach and would have kept the course
pinned near 31% production for the rest of its life.

Orwin fixes the class of problem rather than one instance of it: it is a
complete modern course, uses the standard post-1972 orthography, and covers
negation, questions, imperatives, the tense system and the three conjugations.

### Working with `O`

`sources/orwin-colloquial-somali.pdf` is a commercial book. It is **not
committed and must not be** — `.gitignore` excludes `sources/` and
`docs/**/*.pdf`. `npm run fetch:sources` cannot download it; put your own copy
at that path and the script will extract the text alongside Nilsson's.

**Verify on the page, not in the text dump.** The PDF is scanned, so
`pdftotext` is reliable for prose and *unreliable for tables* — the verbal
pronoun table on book p. 21 loses its entire Somali column. The method that
works:

1. search `sources/orwin-colloquial-somali.txt` to find roughly where a thing is
2. **read that page of the PDF itself** before citing it
3. cite as `O p.NN` using the book's own printed page number

A word appearing in the text dump is a *candidate*, never a citation. Treating
a grep hit as evidence is how invented citations got into this file once
already.

---

## 1. The alphabet — corrects Lesson 1

**Traditional order** (N §2.1; W-alpha):

```
B T J X KH D R S SH DH C G F Q K L M N W H Y   A E I O U
```

| Fact | Sources |
| --- | --- |
| Uses every English Latin letter **except P, V, Z** | N §2.1, W-alpha |
| Exactly **three digraphs: DH, KH, SH** | N §2.1, W-alpha |
| **C** = /ʕ/ voiced pharyngeal; **X** = /ħ/ voiceless pharyngeal | W-alpha (N §3.2) |
| Long vowels written by doubling: aa ee ii oo uu | N §2.4, W-alpha |
| Only **bb dd gg ll mm nn rr** double as consonants | N §2.4 |
| No diacritics; **tone is not written** | N §2.1, W-alpha |

> ### What Lesson 1 currently says, and why it is wrong
> - ❌ "the same 26 letters as English" — P, V, Z are absent.
> - ❌ "four extra letters: dh, kh, q, x" — conflates digraphs with single
>   letters. DH/KH/SH are the digraphs; Q, X, C are single letters with values
>   unfamiliar to English readers.
> - ❌ **omits C entirely** — /ʕ/ is one of the hardest sounds for learners and
>   appears in very common words (*Cali*, *cunto*, *caano*).
> - ❌ omits SH.
>
> Note: tone is not written, so the tone-based gender rule in §3 below is
> **unteachable in a text-only course**. Say so plainly rather than claiming
> Somali gender has no pattern.

---

## 2. Pronouns — corrects Lesson 4

Independent ("long") and short subject pronouns. N and W-gram agree exactly.

| Person | Independent | Short subject | Sources |
| --- | --- | --- | --- |
| 1sg | aniga | aan | N §5.1, W-gram |
| 2sg | adiga | aad | N §5.1, W-gram |
| 3sg m | isaga | uu | N §5.1, W-gram |
| 3sg f | iyada | ay | N §5.1, W-gram |
| 1pl **excl.** | annaga | aannu | N §5.1, W-gram |
| 1pl **incl.** | innaga | aynu | N §5.1, W-gram |
| 2pl | idinka | aydin | N §5.1, W-gram |
| 3pl | iyaga | ay | N §5.1, W-gram |

`src/data/vocabulary.ts` already matches this table exactly, including the
exclusive/inclusive distinction. **It is the trustworthy artifact; the lesson
prose is not.**

> ### What Lesson 4 currently says, and why it is wrong
> - ❌ `ani` → **aniga**
> - ❌ `isna` "we" → **annaga** (excl.) / **innaga** (incl.)
> - ❌ `inyinku` "you pl." → **idinka**
> - ❌ `iyagoo` "they (feminine)" → **no such form**. Somali 3pl is `iyaga`
>   and is not gendered. This distinction was invented.
> - ❌ `adigoo` listed as a pronoun — it is a converb form ("you being"), not
>   a subject pronoun.

---

## 3. Noun gender — corrects Lesson 2

| Fact | Sources |
| --- | --- |
| Gender is not visible in the bare indefinite noun | N §6.1, W-gram |
| For many nouns gender **is** marked — by **tone**, which is unwritten | N §6.1 |
| Minimal pair: `ínan` boy (m) vs `inán` girl (f) — identical spelling | N §6.1 |
| Where a word has one short vowel, gender is genuinely unpredictable (`nál` lamp m, `káb` shoe f) | N §6.1 |
| Gender polarity: `buugga` book (m sg) → `buugagta` books (f pl) | W-gram, N §6.4 |

**Confirmed genders** (N unless noted):

| Word | Gender | Definite | Source |
| --- | --- | --- | --- |
| wiil boy | m | wiilka | N (`wíil –ka`, §6.6) |
| macallin teacher | m | macallinka | N §6.3, §6.7 |
| buug book | m | buugga | N §6.7, W-gram |
| guri house | m | guriga | N §6.3 |
| aabbe father | m | aabbaha | N §6.3 |
| nin man | m | ninka | N §7 (`nin da' weyn`) |
| gabadh ~ gabar girl | f | gabadha ~ gabarta | N §6.3, §8.2 |
| naag woman | f | naagta | Wikt, N (article rule) |
| magaalo city | f | magaalada | N §6.3 |
| kab shoe | f | kabta | N §6.1, §6.3 |
| mindi knife | f | mindida | N §6.3 |
| bil month | f | bisha | N §6.3 |

`gabadh` and `gabar` are **both correct** (N: "gabádh/gabár girl, daughter";
`gabárta yar` the small girl). Lesson 3's `gabar-ta` had the right stem — only
the hyphen was wrong.

**Register note:** `naag` is the standard dictionary word for "woman"
(feminine, def. `naagta`, pl. `naago` — Wikt) and is needed for the gender
contrast with `nin`. `haweeney` is the more formal/respectful term. Worth a
cultural note; do not present `naag` as the only option.

---

## 4. The definite article — corrects Lesson 3

Somali has **no indefinite article**; the bare noun covers "a/an" (N §6.2).

The definite article is a **suffix**, base `-ka` (m) / `-ta` (f), whose initial
consonant assimilates to the preceding sound (N §6.3, §4.1; W-gram):

### Masculine

| After | Becomes | Example | Source |
| --- | --- | --- | --- |
| default | **-ka** | mas → **maska** the snake | N §6.3 |
| g, aa, i, y, w | **-ga** | guri → **guriga** the house | N §6.3 |
| e, o | **-ha** (e→a) | aabbe → **aabbaha** the father | N §6.3 |
| c, h, x, kh, q, ʼ | **-a** | libaax → **libaaxa** the lion | N §6.3 |

### Feminine

| After | Becomes | Example | Source |
| --- | --- | --- | --- |
| default | **-ta** | kab → **kabta** the shoe | N §6.3 |
| d, i, y, w, c, h, x, kh, q, ʼ | **-da** | mindi → **mindida** the knife | N §6.3 |
| o | **-da** (o→a) | magaalo → **magaalada** the city | N §6.3 |
| dh | **-a** (dh intensified) | gabadh → **gabadha** the girl | N §6.3 |
| l | **-sha** (l drops) | bil → **bisha** the month | N §6.3 |

> ### What Lesson 3 currently says, and why it is wrong
> - ❌ Teaches only `-ka`/`-ta` as if invariant. Five of the eight real
>   outcomes are missing, and a learner applying the simple rule produces
>   *guri-ka, *magaalo-ta, *bil-ta — all wrong.
> - ❌ Writes the article hyphenated (`nin-ka`, `naag-ta`). It is a suffix,
>   written joined: **ninka**, **naagta**.

---

## 5. The subject case — missing from every lesson

**This is obligatory and no lesson mentions it.** Only the *last* word of the
subject noun phrase is marked (N §11.1):

| Rule | Example | Source |
| --- | --- | --- |
| Final `-a` of a determiner/long pronoun → `-u` | wiilka → **Wiilku** waa macallin. | N §11.1 |
| Long pronouns likewise | aniga → **Anigu** | N §11.1 |
| Base form in `-aha` → `-uhu` | gabdhaha → **Gabdhuhu** waa carruurtayda. | N §11.1 |
| Forms not ending in `-a` take `-i` | **Tani** waa kab. / **Kani** waa bas. | N §11.1 |
| High tone drops on the subject's last morpheme | Axmed **wuu** hurdaa. | N §11.1 |

Colloquially, especially in the south, subject marking is often dropped
(N §16.3) — but the course should teach the marked form.

---

## 6. Verified example sentences

Quoted from N §11.1 unless noted. These are safe to author against; anything
else must be sourced first.

| Somali | English | Source |
| --- | --- | --- |
| Wiilku waa macallin. | The boy is a teacher. | N §11.1 |
| Wiilkaygu waa macallin. | My son is a teacher. | N §11.1 |
| Magacaygu waa Sahra. | My name is Sahra. | N §11.1 |
| Tani waa kab. | This is a shoe. | N §11.1 |
| Kani waa bas. | This is a bus. | N §11.1 |
| Gabdhuhu waa carruurtayda. | The girls are my children. | N §11.1 |
| Axmed wuu hurdaa. | Ahmed sleeps. | N §11.1 |
| gabar yar / gabarta yar | a small girl / the small girl | N §8.2 |
| wiil yar / wiilka yar | a small boy / the small boy | N §8.2 |
| laba wiil / labada wiil | two boys / the two boys | N §7.2 |

`Wiilku waa macallin.` is the natural Lesson 2–3 payoff: it is sourced, minimal,
uses only confirmed vocabulary, and previews `waa` for the signal lessons.

---

## 7. Sentences to delete

Currently in `authored-lessons.ts`, unsourced and wrong:

| Current | Problem |
| --- | --- |
| `Nin-ka wanaagsan.` | hyphenated article; no `waa`; adjective needs subject/attributive form |
| `Naag-ta wanaagsan.` | same |
| `Ninki waa macallin.` | `-ki` is the remote-past article, not the subject form → **Ninku waa macallin.** |
| `Gabar-ta waa baristo.` | hyphen; `baristo` "waitress" unattested in any source consulted |
| `Isaga wuu socdaa.` | `wuu` already contains `uu`; with an independent pronoun the subject needs case → **Isagu wuu socdaa.** — verify before use |
| `khamar` (wine) as the Lesson 1 example | unnecessary; alcohol reference in a course for a ~100% Muslim language community. Already replaced with `subax`. |

---

## 8. Additional attested forms

| Form | Gloss | Source |
| --- | --- | --- |
| caano | milk (def. **caanaha**) | N §6.4, Wikt |
| wuu | waa + uu contracted | N §5.1 ("wáa uu → wúu"), N §11.1 |
| Cali | proper noun | N §7 ("Cali wuu bogsán doonaa") |
| miis / geed / kursi / beer / bisad / nal | table, tree, chair, garden, cat, lamp | N §6.1, Wikt |

**Single-source only** — real, but attested in one place:

| Form | Gloss | Source |
| --- | --- | --- |
| nabad | peace, wellbeing (f) | Wiktionary |
| subax | morning (m) | Wiktionary |

---

## 7. The signal system — sourcing for Unit 2

Nilsson §12.3 ("Sentence particles") is the primary treatment. **It divides
into two systems that the course's blueprint presents as one box.**

**(a) Particles marking the TYPE of clause** — N §12.3:

| Form | What Nilsson says | Sources |
| --- | --- | --- |
| `waa` | "expresses that the clause is affirmative" | N §12.3, N §11.1, W-gram |
| `má` | "expresses that the clause is negative"; verb goes to the subjunctive | N §12.3 only |
| `ma`/`má` | "expresses that the clause is a question that requires yes/no" | N §12.3 only |
| *(none)* | no particle = a command; verb in the command form | N §12.3 only |
| `ha` | warnings and prohibitions | N §12.3 only |

**(b) Particles marking FOCUS** — N §12.3:

| Form | What Nilsson says | Sources |
| --- | --- | --- |
| `baa` / `ayaa` | focus "the noun phrase **immediately preceding** the particle"; synonymous and interchangeable, `ayaa` a little more formal | N §12.3, W-gram, Wikt (`baa` = "focus marker") |
| `waxa` / `waxaa` | focus "the noun phrase **at the end** of the clause" | N §12.3, W-gram |

Nilsson's minimal pair, identical words, different signal (N §12.3):

| Somali | English |
| --- | --- |
| Sahra **waxa** ay salaamaysaa saaxiibkeed. | Sahra is greeting her FRIEND. |
| Sahra **baa** salaamaysa saaxiibkeed. | SAHRA is greeting her friend. |

**Fusion with short subject pronouns** — N §5.1, given as a table:

```
wáa aan → wáan      wáxa aan → wáxaan       baa aan → baan      ayáa aan → ayáan
wáa aad → wáad      wáxa aad → wáxaad       baa aad → baad      ayáa aad → ayáad
wáa uu  → wúu       wáxa uu  → wúxuu        baa uu  → buu       ayáa uu  → ayúu
wáa ay  → wáy       wáxa ay  → wáxay        baa ay  → bay       ayáa ay  → ayáy
```

W-gram independently attests `wuu`, `way`, `wuxuu`, `waxay`. It does **not**
list `buu`/`bay`, so those are registered `confidence: 'single'`.

### Three findings that affect what Unit 2 can teach

1. **`waa` is analysed differently by the two sources.** Nilsson calls it a
   *type-of-clause* particle ("affirmative"). Wikipedia calls it a *focus*
   particle that "puts the focus on verbs and verb phrases". Both are
   defensible readings in the literature — Nilsson's own abbreviation list has
   `PR.FOC predicate focus`. The lessons should describe what `waa` *does*
   (marks a plain statement) and not assert which category it belongs to.

2. ~~**`ma` is single-sourced.**~~ **RESOLVED — this was true only while
   Nilsson was the sole grammar.** Orwin covers `ma` in full: it is listed as
   the *positive interrogative mood classifier* (O p.15, p.23) with its own
   fusion table — `ma + aan → miyaan`, `ma + uu → miyuu`, `ma + ay → miyay` —
   and `miyáa` is glossed in the Lesson 2 vocabulary as "question word: 'Is
   it …?'" (O p.26). `ma` is now double-sourced and registrable.

3. **`ma` question and `ma` negative are the same written word — and now
   *both* sources say so.** Nilsson distinguishes them by tone; Orwin
   independently shows `ma` doing both jobs (`ma jiro` "is not", `Ku ma
   arkin.` "…did not [see]", and a whole section on the negative of the
   general present). §2.2 establishes that **tone is not written**.

   This no longer blocks teaching `ma` — it *is* the teaching point, and it is
   now a fact two sources agree on rather than a hazard inferred from one.
   `ma` still does not belong in Lesson 5, but the reason has changed: it is a
   clause-type marker, not a focus marker, and it belongs with negation and
   questions in Unit 3, exactly where the design puts it.

---

## 8. Verbs, and the derived tier — sourcing for Lesson 7

### Why the rule became the unit of verification

Two independent sources give the present tense and **agree on every ending** —
but they illustrate it with different verbs:

| Person | Ending | Nilsson §11.1 (`hees` sing) | W-gram (`keen` bring) |
| --- | --- | --- | --- |
| I | **-aa** | heesaa | (waan) keenaa |
| you | **-taa** | heestaa | (waad) keentaa |
| he | **-aa** | heesaa | (wuu) keenaa |
| she | **-taa** | heestaa | (way) keentaa |
| we | **-naa** | heesnaa | (waan) keennaa |
| you (pl) | **-taan** | heestaan | (waad) keentaan |
| they | **-aan** | heesaan | (way) keenaan |

Nilsson states the morphemes directly: `/aa/` present tense, `/t/` for 2nd
person and 3rd feminine, `/n/` for plural. Wikipedia conjugates `keen` straight
through with identical results. **The rule is doubly attested; almost no
individual form is.**

Under a strict per-form reading of D2, exactly one verb form in the language
would be teachable — `keenaa`, the only one both sources print. Every remaining
grammar lesson (tense, negation, questions) is morphology and would hit the
same wall.

So for morphology the unit of verification is the **rule**. A form may be
marked `confidence: 'derived'` only when a rule in `DERIVATION_RULES` carries
two independent sources *and* the stem it applies to is itself registered.
Validator check **S7** enforces both, and was proven to bite on all three
failure modes: a derived form naming no rule, a rule citing one author twice,
and a derived form whose stem is absent.

This is a deliberate widening of D2, not a relaxation of it. Nothing here rests
on one author, and nothing rests on our own inference about what Somali ought
to do.

### What is registered

| Form | Gloss | Basis |
| --- | --- | --- |
| `keen` | bring (stem) | N §13.1.4a, W-gram |
| `keenaa` | I bring / he brings | N §13.1.4a ("keenaa brings sth. to a place"), W-gram |
| `keentaa` | you bring / she brings | derived — `present-tense` |
| `keennaa` | we bring | derived — `present-tense` |
| `keentaan` | you (pl) bring | derived — `present-tense` |
| `keenaan` | they bring | derived — `present-tense` |

`hees` is **not** registered: only Nilsson uses it, so it would be single-source
and unproducible. Lesson 7 is built on `keen` for exactly that reason.

### One thing the paradigm hides

**`-aa` covers both "I" and "he"; `-taa` covers both "you" and "she".** The
ending alone does not tell you which — the fused signal in front of it does
(`waan keenaa` I bring, `wuu keenaa` he brings). That is the direct payoff of
Lesson 6 and the reason verbs come after fusion rather than before.

---

## 9. The fusion tables, verified against Orwin

Nilsson §5.1 gives these forms; Orwin tabulates them independently. **Every one
below was read on the page**, not matched in the text dump — the dump garbled
`buu` as "buiu" and "bau" and `ayaa` as "ayda", which is exactly why the rule
is to look at the page.

**Orwin p.21** — the mood classifier `wáa` with the verbal subject pronouns:

| | | |
| --- | --- | --- |
| I | wáa + aan | **wáan** |
| you (sg.) | wáa + aad | **wáad** |
| he | wáa + uu | **wúu** |
| she / they | wáa + ay | **wáy** |

**Orwin p.93** — the focus markers `báa` / `ayáa`, same construction:

| | | `baa-` | `ayaa-` |
| --- | --- | --- | --- |
| I | + aan | **báan** | **ayáan** |
| you (sg.) | + aad | **báad** | **ayáad** |
| he | + uu | **búu** | **ayúu** |
| she / they | + ay | **báy** | **ayáy** |

Upgraded from single-source to two independent sources: `waad`, `baan`,
`baad`, `buu`, `bay`, `ayaan`, `ayaad`, `ayuu` — joining `waan` and `ayay`,
done earlier. Registry single-source forms: **17 → 9**.

Under check S6 that also makes them **producible**: an exercise may now ask the
learner to type them, where before they could only be read.

### The nine that remain, and why

| Form(s) | Situation |
| --- | --- |
| `waxaan`, `waxaad` | **Winnable.** Orwin has no `waxa`+pronoun table, but both occur in running text — `waxaan` at text-dump lines 4855 and 6649, `waxaad` in a Reading-practice vocabulary near line 6815 glossed "you need". Each needs its printed page located and read. Note the PDF-to-printed-page offset drifts (+10 early, +12 by p.162), so find the page by its printed header rather than by arithmetic. |
| `saaxiibkeed`, `saaxiibteed`, `salaamaysa`, `salaamaysaa` | Stuck. From Nilsson's focus example §12.3; absent from Orwin. Need a third source. |
| `tegey`, `cabbay`, `koob` | Stuck. From Orwin's word-order examples p.41–42; absent from Nilsson. Need a third source. |

Seven of the nine genuinely cannot be resolved with the two grammars we have.
That is a real limit, not a to-do — it is what a two-source rule costs, and the
alternative is inventing a citation.

---

## Status

- ✅ Alphabet, pronouns, gender, articles, subject case: **2-source verified**
- ✅ Focus signals `baa`, `ayaa`, `waxa`, `waxaa` and fusions `wuu`, `way`,
  `wuxuu`, `waxay`: **2-source verified** and in the registry
- ✅ `ma` and its fusions: **double-sourced** since Orwin was added — see the
  correction at finding 2. Registered, and owed to Unit 3.
- ✅ The fusion tables are now double-sourced — see §9 below.
- ✅ 10 example sentences: sourced to N
- ✅ **All Somali in exercise answers and lesson prose is registry-verified**
  and enforced by `npm run validate:course`
- ⚠️ **58 of 79 vocabulary entries still lack sources.** They appear in lesson
  vocab decks, so a learner sees them. The validator reports this every run and
  will keep reporting it until they are checked — that is the next content job.
- ⚠️ 2 registry forms (`nabad`, `subax`) rest on a single source.
