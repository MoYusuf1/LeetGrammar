/**
 * ExplainCard — Clean, readable teaching content.
 *
 * Interlinear gloss rendered naturally: word (tag) = meaning
 * No vertical stacking. Readable at a glance.
 */

import { Ear, Table2 } from 'lucide-react';

interface GlossExample {
  somali: string;
  english: string;
  breakdown: string; // "word1 (tag) word2 (tag)" format
  note: string;
}

interface RefRow {
  col1: string;
  col2: string;
  col3?: string;
  bold1?: boolean;
}

interface LevelExplain {
  id: number;
  title: string;
  rule: string;
  ruleDetail: string;
  examples: GlossExample[];
  refTitle: string;
  refHeaders: string[];
  refRows: RefRow[];
  listeningNote: string;
}

const EXPLAINS: Record<number, LevelExplain> = {
  1: {
    id: 1,
    title: 'Marker Identification',
    rule: 'Every Somali sentence has exactly one marker. Find it.',
    ruleDetail: 'The marker is a small word near the front. It tells you what TYPE of sentence you are in. There are four types. Your job is to see any sentence and instantly name which one it is.',
    examples: [
      {
        somali: 'Cali wuu tegay.',
        english: 'Ali went.',
        breakdown: 'Cali (subject) wuu (STATEMENT marker + he) tegay (went)',
        note: 'STATEMENT — wuu focuses on the action',
      },
      {
        somali: 'Hooyada bay cuntay.',
        english: 'It was MOTHER who ate.',
        breakdown: 'Hooyada (mother) bay (FOCUS marker + she) cuntay (ate)',
        note: 'FOCUS — bay highlights the noun before it',
      },
      {
        somali: 'Ma cunaysaa?',
        english: 'Are you eating?',
        breakdown: 'Ma (QUESTION marker) cunaysaa (eating + you)',
        note: 'QUESTION — ma turns any statement into yes/no',
      },
      {
        somali: 'Waxaan akhriyay buug.',
        english: 'What I read was a book.',
        breakdown: 'Waxaan (SPOTLIGHT marker + I) akhriyay (read) buug (a book)',
        note: 'SPOTLIGHT — waxa zooms in on one element',
      },
    ],
    refTitle: 'The four marker types',
    refHeaders: ['Marker', 'Type', 'Focus is on'],
    refRows: [
      { col1: 'waa / wuu / way / waan', col2: 'STATEMENT', col3: 'the action (verb)', bold1: true },
      { col1: 'ma / miyaa / miyuu', col2: 'QUESTION', col3: 'yes/no answer', bold1: true },
      { col1: 'baa / ayaa / buu / bay', col2: 'FOCUS', col3: 'the noun before it', bold1: true },
      { col1: 'waxa / waxaan / wuxuu', col2: 'SPOTLIGHT', col3: '"what ___ was..."', bold1: true },
    ],
    listeningNote:
      'In a Somali movie, a sentence flies by in under 2 seconds. Your ear needs to catch the marker in the first half-second. Recognition before meaning.',
  },

  2: {
    id: 2,
    title: 'waa vs baa vs waxa',
    rule: 'Same words. Different marker. Completely different meaning.',
    ruleDetail: 'The marker decides where the weight lands. waa focuses on the ACTION. baa focuses on the NOUN. waxa spotlights one part. One sentence, three ways to say it.',
    examples: [
      {
        somali: 'Cali wuu cunay.',
        english: 'Ali ate.',
        breakdown: 'Cali (subject) wuu (STATEMENT) cunay (ate)',
        note: 'Neutral — the eating is the point',
      },
      {
        somali: 'Cali baa cunay.',
        english: 'It was ALI who ate.',
        breakdown: 'Cali (subject) baa (FOCUS) cunay (ate)',
        note: 'Spotlight is on ALI, not someone else',
      },
      {
        somali: 'Waxuu cunay waa hilib.',
        english: 'What he ate was meat.',
        breakdown: 'Waxuu (SPOTLIGHT + he) cunay (ate) waa (is) hilib (meat)',
        note: 'Zoom in on the object — MEAT, not rice',
      },
    ],
    refTitle: 'The three-way distinction',
    refHeaders: ['Marker', 'Answers', 'Example'],
    refRows: [
      { col1: 'waa', col2: 'What happened?', col3: 'Cali wuu cunay = Ali ATE', bold1: true },
      { col1: 'baa / ayaa', col2: 'Who did it?', col3: 'Cali baa cunay = ALI ate', bold1: true },
      { col1: 'waxa', col2: 'What was it?', col3: 'Waxuu cunay... = ...was MEAT', bold1: true },
    ],
    listeningNote: 'When you hear baa or ayaa, the speaker is emphasizing a noun. When you hear waxa, they are zooming in. Train your ear to catch these distinctions every time.',
  },

  3: {
    id: 3,
    title: 'Subject Pronoun Contractions',
    rule: 'Somali fuses marker + pronoun into one word. You must split them apart instantly.',
    ruleDetail:
      'In fast speech, waa + uu becomes wuu. baa + ay becomes bay. waxa + aan becomes waxaan. This is how Somali actually sounds. Fast speech will blur without this skill.',
    examples: [
      {
        somali: 'Wuu tegay.',
        english: 'He went.',
        breakdown: 'Wuu (waa + uu = STATEMENT + he) tegay (went)',
        note: 'The fusion is automatic in native speech',
      },
      {
        somali: 'Bay cuntay.',
        english: 'It was SHE who ate.',
        breakdown: 'Bay (baa + ay = FOCUS + she) cuntay (ate)',
        note: 'Native speakers never say "baa ay" — always "bay"',
      },
      {
        somali: 'Waxaan rabaa biyo.',
        english: 'What I want is water.',
        breakdown: 'Waxaan (waxa + aan = SPOTLIGHT + I) rabaa (want) biyo (water)',
        note: 'Three-part fusion: all happens in one word',
      },
    ],
    refTitle: 'The contraction table',
    refHeaders: ['Fused', 'Splits into', 'Meaning'],
    refRows: [
      { col1: 'waan', col2: 'waa + aan', col3: 'statement — I' },
      { col1: 'wuu', col2: 'waa + uu', col3: 'statement — he', bold1: true },
      { col1: 'way', col2: 'waa + ay', col3: 'statement — she/they', bold1: true },
      { col1: 'buu', col2: 'baa + uu', col3: 'focus — he', bold1: true },
      { col1: 'bay', col2: 'baa + ay', col3: 'focus — she/they', bold1: true },
      { col1: 'waxaan', col2: 'waxa + aan', col3: 'spotlight — I', bold1: true },
      { col1: 'wuxuu', col2: 'waxa + uu', col3: 'spotlight — he', bold1: true },
    ],
    listeningNote: 'A native speaker never says "waa uu cunay." They say "wuu cunay." Fast Somali depends on hearing these fused forms and instantly decomposing them.',
  },

  4: {
    id: 4,
    title: 'SOV Word Order',
    rule: 'The verb comes last. Every time.',
    ruleDetail: 'English is SVO: "Ali ate meat." Somali is SOV: "Ali meat ate." Once this locks in, you stop reaching for the verb too early.',
    examples: [
      {
        somali: 'Cali wuu hilib cunay.',
        english: 'Ali ate meat.',
        breakdown: 'Cali (subject) wuu (marker) hilib (object) cunay (VERB.LAST)',
        note: 'Subject → Marker → Object → VERB (always last)',
      },
      {
        somali: 'Cali baa cuntada cunay.',
        english: 'It was ALI who ate the food.',
        breakdown: 'Cali (subject) baa (focus) cuntada (object) cunay (VERB)',
        note: 'Focus type — verb still lands at the end',
      },
      {
        somali: 'Waxaan biyo cabay.',
        english: 'What I drank was water.',
        breakdown: 'Waxaan (spotlight) biyo (object) cabay (VERB)',
        note: 'Even with spotlight, the verb closes the sentence',
      },
    ],
    refTitle: 'Word order by sentence type',
    refHeaders: ['Type', 'Order'],
    refRows: [
      { col1: 'Statement', col2: 'Subject → waa → Object → VERB', bold1: true },
      { col1: 'Focus', col2: 'Subject → baa → Object → VERB', bold1: true },
      { col1: 'Spotlight', col2: 'waxa+pronoun → Object → VERB', bold1: true },
      { col1: 'Question', col2: 'ma → Subject → Object → VERB?', bold1: true },
    ],
    listeningNote: 'Train your ear to wait. The sentence is not finished until the verb lands. This is the biggest difference from English.',
  },

  5: {
    id: 5,
    title: 'Prepositions + Direction',
    rule: 'Four prepositions and two direction words carry the spatial logic.',
    ruleDetail: 'u, ku, ka, la tell you the relationship. soo and sii add direction. These tiny words are fast in speech but they carry the whole picture.',
    examples: [
      {
        somali: 'Wuu u soo keenay.',
        english: 'He brought it over (to me).',
        breakdown: 'Wuu (he declares) u (to/for) soo (toward here) keenay (brought)',
        note: 'u + soo stack together: "for + toward here"',
      },
      {
        somali: 'Waan ku joogaa guriga.',
        english: 'I am in the house.',
        breakdown: 'Waan (I declare) ku (in/at) joogaa (am staying) guriga (the house)',
        note: 'ku before the verb, then the location after',
      },
      {
        somali: 'Way ka soo noqotay.',
        english: 'She came back.',
        breakdown: 'Way (she declares) ka (from) soo (toward here) noqotay (returned)',
        note: 'ka + soo = "from + toward here" = came back',
      },
    ],
    refTitle: 'Prepositions and directions',
    refHeaders: ['Word', 'Meaning'],
    refRows: [
      { col1: 'u', col2: 'to / for', bold1: true },
      { col1: 'ku', col2: 'in / at / using', bold1: true },
      { col1: 'ka', col2: 'from', bold1: true },
      { col1: 'la', col2: 'with', bold1: true },
      { col1: 'soo', col2: '← toward speaker' },
      { col1: 'sii', col2: '→ away from speaker' },
    ],
    listeningNote: 'These words blur into the verb phrase in fast speech. But they carry the whole spatial picture. Train your ear to catch them before the verb.',
  },

  6: {
    id: 6,
    title: 'Connectors',
    rule: 'Four connectors join ideas. Each encodes a different relationship.',
    ruleDetail: 'iyo links nouns. -na continues. -se contrasts. oo links relative clauses. Without them, you hear isolated sentences. With them, you hear the full thought.',
    examples: [
      {
        somali: 'Cali iyo Sahra way tegeen.',
        english: 'Ali and Sahra went.',
        breakdown: 'Cali (Ali) iyo (and) Sahra (Sahra) way (they declare) tegeen (went)',
        note: 'iyo — links two nouns into one subject',
      },
      {
        somali: 'Wuu cunay, waadna cuntay.',
        english: 'He ate, and you also ate.',
        breakdown: 'Wuu (he) cunay (ate), waadna (and you also = waa+aad+-na) cuntay (ate)',
        note: '-na attaches to the next clause, means "and also"',
      },
      {
        somali: 'Wuu tegay, naagtase way joogtay.',
        english: 'He went, but the woman stayed.',
        breakdown: 'Wuu (he) tegay (went), naagtase (but the woman = naagta+-se) way (she) joogtay (stayed)',
        note: '-se introduces contrast, attaches to first word',
      },
    ],
    refTitle: 'Connector types',
    refHeaders: ['Connector', 'Role'],
    refRows: [
      { col1: 'iyo', col2: 'and (nouns)', bold1: true },
      { col1: '-na', col2: 'and also (sentences)', bold1: true },
      { col1: '-se', col2: 'but / however', bold1: true },
      { col1: 'oo', col2: 'which / that (relative)', bold1: true },
    ],
    listeningNote: 'Somali chains ideas fast. Missing iyo means you lose who you are talking about. Missing -se means you miss the contrast. Hearing connectors correctly is how you follow stories.',
  },

  7: {
    id: 7,
    title: 'Full Sentence Construction',
    rule: 'You have all the pieces. Build any Somali sentence from scratch.',
    ruleDetail: 'This level closes the loop. If you can build it, you will hear it. Production and comprehension reinforce each other.',
    examples: [
      {
        somali: 'Hooyada way ka soo keentay cunto suuqa.',
        english: 'Mother brought food from the market.',
        breakdown: 'Hooyada (mother) way (she declares) ka (from) soo (toward) keentay (brought) cunto (food) suuqa (market)',
        note: 'Subject + marker + prepositions + verb + objects',
      },
      {
        somali: 'Cali iyo Sahra waxay la shaqeeyeen macallinka.',
        english: 'Ali and Sahra worked with the teacher.',
        breakdown: 'Cali iyo Sahra (Ali and Sahra) waxay (they spotlight) la (with) shaqeeyeen (worked) macallinka (teacher)',
        note: 'Connector + marker + preposition + verb = full stack',
      },
    ],
    refTitle: 'The full skeleton',
    refHeaders: ['Slot', 'What goes here'],
    refRows: [
      { col1: '1. Subject', col2: 'Noun or name', bold1: true },
      { col1: '2. Marker', col2: 'waa/baa/waxa + pronoun', bold1: true },
      { col1: '3. Preposition', col2: 'u / ku / ka / la' },
      { col1: '4. Direction', col2: 'soo / sii' },
      { col1: '5. Verb', col2: '← ALWAYS LAST', bold1: true },
      { col1: '6. Object', col2: 'Noun' },
    ],
    listeningNote: 'You now have the full grammar skeleton. Go back to your Listening Guide. Open a Somali video. Pause every 15 seconds. Decode one sentence using the 6-step decoder. You are parsing, not guessing.',
  },
};

interface ExplainCardProps {
  levelId: number;
  onStart: () => void;
}

/** Parse "word (gloss) word (gloss)" into interlinear token pairs. */
function parseGloss(breakdown: string): { word: string; gloss: string }[] {
  const tokens: { word: string; gloss: string }[] = [];
  const re = /([^()]+?)\s*\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(breakdown)) !== null) {
    tokens.push({ word: m[1].trim(), gloss: m[2].trim() });
  }
  return tokens;
}

export default function ExplainCard({ levelId, onStart }: ExplainCardProps) {
  const data = EXPLAINS[levelId];
  if (!data) return null;

  const titleCase = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  return (
    <div className="pb-4">
      {/* Header */}
      <header className="space-y-4 mb-12">
        <p className="text-xs font-semibold text-[#ffa116]">Level {data.id}</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#f5f6f8] tracking-tight leading-[1.1]">
          {data.title}
        </h1>
        <p className="text-lg text-[#c8cad0] leading-relaxed max-w-2xl font-light">
          {data.rule}
        </p>
        <p className="text-[15px] text-[#8c8c8c] leading-relaxed max-w-2xl">
          {data.ruleDetail}
        </p>
      </header>

      {/* Examples */}
      <section className="mb-12">
        <h2 className="text-xs font-semibold text-[#6c6c6c] uppercase tracking-wider mb-5">
          Examples
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {data.examples.map((ex, i) => {
            const rawLabel = ex.note.split(' — ')[0] || '';
            const noteText = ex.note.split(' — ')[1] || ex.note;
            return (
              <div key={i} className="rounded-2xl bg-[#161616] p-5 flex flex-col">
                {/* Type */}
                <p className="text-xs font-semibold text-[#ffa116] mb-4">
                  {titleCase(rawLabel)}
                </p>

                {/* Somali */}
                <p className="text-xl font-semibold text-[#f5f6f8] leading-snug">
                  {ex.somali}
                </p>

                {/* Interlinear gloss */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                  {parseGloss(ex.breakdown).map((tok, ti) => (
                    <div key={ti} className="flex flex-col">
                      <span className="text-sm font-medium text-[#c8cad0] leading-tight">
                        {tok.word}
                      </span>
                      <span className="text-[11px] text-[#6c6c6c] leading-tight mt-0.5">
                        {tok.gloss}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Translation */}
                <div className="mt-auto pt-5">
                  <p className="text-[15px] text-[#c8cad0] leading-relaxed">{ex.english}</p>
                  <p className="text-[13px] text-[#6c6c6c] mt-1.5 leading-relaxed">{noteText}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reference + Listening */}
      <div className="grid gap-10 md:grid-cols-2 mb-12">
        {/* Reference table */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Table2 size={13} className="text-[#6c6c6c]" />
            <h2 className="text-xs font-semibold text-[#6c6c6c] uppercase tracking-wider">
              {data.refTitle}
            </h2>
          </div>
          <div className="rounded-2xl bg-[#161616] divide-y divide-[#ffffff08]">
            {data.refRows.map((row, i) => (
              <div key={i} className="flex items-baseline gap-4 px-5 py-3.5">
                <span
                  className="font-mono text-sm font-semibold whitespace-nowrap min-w-[6rem]"
                  style={{ color: row.bold1 ? '#ffa116' : '#c8cad0' }}
                >
                  {row.col1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-sm text-[#c8cad0]">{row.col2}</span>
                  {row.col3 && (
                    <span className="block text-[13px] text-[#6c6c6c] mt-0.5 leading-snug">
                      {row.col3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Listening note */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Ear size={13} className="text-[#22c55e]" />
            <h2 className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider">
              For listening
            </h2>
          </div>
          <div className="rounded-2xl bg-[#161616] p-5 h-[calc(100%-2.25rem)]">
            <p className="text-[15px] text-[#9ca99c] leading-relaxed">{data.listeningNote}</p>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-16 py-3.5 rounded-xl font-bold text-base transition-all active:scale-[0.98] hover:brightness-110"
          style={{ backgroundColor: '#ffa116', color: '#0f0f0f' }}
        >
          Start Drills
        </button>
      </div>
    </div>
  );
}
