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
| **W-alpha** | Wikipedia, *Somali Latin alphabet*. https://en.wikipedia.org/wiki/Somali_Latin_alphabet |
| **W-gram** | Wikipedia, *Somali grammar*. https://en.wikipedia.org/wiki/Somali_grammar |
| **Wikt** | Wiktionary, Somali entries. https://en.wiktionary.org/ |

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

## Status

- ✅ Alphabet, pronouns, gender, articles, subject case: **2-source verified**
- ✅ 10 example sentences: sourced to N
- ✅ **All Somali in exercise answers and lesson prose is registry-verified**
  and enforced by `npm run validate:course`
- ⚠️ **58 of 79 vocabulary entries still lack sources.** They appear in lesson
  vocab decks, so a learner sees them. The validator reports this every run and
  will keep reporting it until they are checked — that is the next content job.
- ⚠️ 2 registry forms (`nabad`, `subax`) rest on a single source.
