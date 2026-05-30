/**
 * ExplainCard — Clean, readable teaching content.
 *
 * Interlinear gloss rendered naturally: word (tag) = meaning
 * No vertical stacking. Readable at a glance.
 */

import { ArrowRight, Ear, Table2 } from 'lucide-react';

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

export default function ExplainCard({ levelId, onStart }: ExplainCardProps) {
  const data = EXPLAINS[levelId];
  if (!data) return null;

  return (
    <div className="space-y-4 pb-2">
      {/* Rule */}
      <div className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4 space-y-2">
        <p className="text-base font-bold text-[#eff1f6] leading-snug">{data.rule}</p>
        <p className="text-xs text-[#8c8c8c] leading-relaxed">{data.ruleDetail}</p>
      </div>

      {/* Examples */}
      <div className="space-y-2">
        <p className="text-[9px] font-bold text-[#5c5c5c] uppercase tracking-wider px-1">Examples</p>
        {data.examples.map((ex, i) => (
          <div key={i} className="rounded-xl bg-[#1a1a1a] border border-[#ffffff06] p-3 space-y-2">
            {/* Natural layout */}
            <div>
              <p className="text-xs font-bold text-[#eff1f6] leading-relaxed">{ex.somali}</p>
              <p className="text-[10px] text-[#5c5c5c] mt-1">{ex.breakdown}</p>
            </div>

            {/* Translation */}
            <div className="flex items-start gap-2 pt-1 border-t border-[#ffffff06]">
              <ArrowRight size={10} className="flex-shrink-0 mt-0.5" style={{ color: '#ffa116' }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: '#ffa116' }}>
                  {ex.english}
                </p>
                <p className="text-[9px] text-[#4a4a4a] mt-0.5">— {ex.note}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reference */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 px-1">
          <Table2 size={10} color="#5c5c5c" />
          <p className="text-[9px] font-bold text-[#5c5c5c] uppercase tracking-wider">
            {data.refTitle}
          </p>
        </div>
        <div className="rounded-xl border border-[#ffffff08] overflow-hidden text-[10px]">
          <div className="grid px-2.5 py-1.5 bg-[#1f1f1f] gap-2" style={{ gridTemplateColumns: data.refHeaders.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr' }}>
            {data.refHeaders.map((h, i) => (
              <span key={i} className="font-bold text-[#5c5c5c]">
                {h}
              </span>
            ))}
          </div>
          {data.refRows.map((row, i) => (
            <div
              key={i}
              className="grid px-2.5 py-1.5 border-t border-[#ffffff05] gap-2"
              style={{
                gridTemplateColumns: data.refHeaders.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr',
                backgroundColor: i % 2 === 0 ? '#141414' : '#171717',
              }}
            >
              <span className={row.bold1 ? 'font-bold text-[#eff1f6] font-mono' : 'text-[#8c8c8c] font-mono'} style={{ color: row.bold1 ? '#ffa116' : undefined }}>
                {row.col1}
              </span>
              <span className="text-[#8c8c8c]">{row.col2}</span>
              {row.col3 && <span className="text-[#5c5c5c] italic">{row.col3}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Listening note */}
      <div className="rounded-xl bg-[#0d1a0d] border border-[#22c55e15] p-3">
        <div className="flex items-start gap-2">
          <Ear size={11} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[9px] font-bold text-[#22c55e] uppercase tracking-wider mb-0.5">For listening</p>
            <p className="text-[9px] text-[#4a7a4a] leading-relaxed">{data.listeningNote}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button onClick={onStart} className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] hover:opacity-90" style={{ backgroundColor: '#ffa116', color: '#0f0f0f' }}>
        Start Drills
      </button>
    </div>
  );
}
