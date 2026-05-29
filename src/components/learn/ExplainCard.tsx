/**
 * ExplainCard — Mobile-first teaching view.
 *
 * Optimized for small screens: vertical stacking, readable text, no horizontal scroll.
 */

import { ArrowRight, Ear, Table2 } from 'lucide-react';

interface GlossWord {
  somali: string;
  tag: string;
  english: string;
}

interface GlossLine {
  parts: GlossWord[];
  translation: string;
  note?: string;
}

interface RefRow {
  col1: string;
  col2: string;
  col3?: string;
  bold1?: boolean;
}

interface LevelExplain {
  id: number;
  color: string;
  title: string;
  rule: string;
  ruleDetail: string;
  glossTitle: string;
  gloss: GlossLine[];
  refTitle: string;
  refHeaders: string[];
  refRows: RefRow[];
  listeningNote: string;
}

const EXPLAINS: Record<number, LevelExplain> = {
  1: {
    id: 1,
    color: '#3b82f6',
    title: 'Marker Identification',
    rule: 'Every Somali sentence has exactly one marker. Find it.',
    ruleDetail: 'The marker is a small word near the front. It tells you what TYPE of sentence you are in. There are four types. Your job is to see any sentence and instantly name which one it is.',
    glossTitle: 'Four markers, four sentence types:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'wuu', tag: 'waa+uu', english: '(declares)' },
          { somali: 'tegay.', tag: 'verb', english: 'went' },
        ],
        translation: 'Ali went.',
        note: 'STATEMENT — wuu focuses on action',
      },
      {
        parts: [
          { somali: 'Hooyada', tag: 'noun', english: 'mother' },
          { somali: 'bay', tag: 'baa+ay', english: '(focus)' },
          { somali: 'cuntay.', tag: 'verb', english: 'ate' },
        ],
        translation: 'It was MOTHER who ate.',
        note: 'FOCUS — bay highlights the noun',
      },
      {
        parts: [
          { somali: 'Ma', tag: 'question', english: '(asking)' },
          { somali: 'cunaysaa?', tag: 'verb+you', english: 'eating?' },
        ],
        translation: 'Are you eating?',
        note: 'QUESTION — ma turns any statement into yes/no',
      },
      {
        parts: [
          { somali: 'Waxaan', tag: 'waxa+aan', english: '(spotlight)' },
          { somali: 'akhriyay', tag: 'verb', english: 'read' },
          { somali: 'buug.', tag: 'noun', english: 'a book' },
        ],
        translation: 'What I read was a book.',
        note: 'SPOTLIGHT — waxa zooms in on one element',
      },
    ],
    refTitle: 'The four marker types',
    refHeaders: ['Marker', 'Type', 'Focus'],
    refRows: [
      { col1: 'waa / wuu / way', col2: 'STATEMENT', col3: 'the action', bold1: true },
      { col1: 'ma / miyaa', col2: 'QUESTION', col3: 'yes/no answer' },
      { col1: 'baa / ayaa', col2: 'FOCUS', col3: 'the noun', bold1: true },
      { col1: 'waxa / waxaan', col2: 'SPOTLIGHT', col3: '"what was..."', bold1: true },
    ],
    listeningNote: 'In a Somali movie, a sentence flies by in under 2 seconds. Your ear needs to catch the marker in the first half-second. Recognition before meaning.',
  },

  2: {
    id: 2,
    color: '#8b5cf6',
    title: 'waa vs baa vs waxa',
    rule: 'Same words. Different marker. Completely different meaning.',
    ruleDetail: 'The marker decides where the weight lands. waa focuses on the ACTION. baa focuses on the NOUN. waxa spotlights one part. One sentence, three ways to say it.',
    glossTitle: 'Same sentence, three ways:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'wuu', tag: 'statement', english: '(declares)' },
          { somali: 'cunay.', tag: 'verb', english: 'ate' },
        ],
        translation: 'Ali ate.',
        note: 'STATEMENT — neutral action focus',
      },
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'baa', tag: 'focus', english: '(ALI is focus)' },
          { somali: 'cunay.', tag: 'verb', english: 'ate' },
        ],
        translation: 'It was ALI who ate.',
        note: 'FOCUS — spotlight on the noun',
      },
      {
        parts: [
          { somali: 'Waxuu', tag: 'spotlight', english: '(what he...)' },
          { somali: 'cunay', tag: 'verb', english: 'ate' },
          { somali: 'waa', tag: 'copula', english: 'was' },
          { somali: 'hilib.', tag: 'noun', english: 'meat' },
        ],
        translation: 'What he ate was meat.',
        note: 'SPOTLIGHT — zoom in on object',
      },
    ],
    refTitle: 'The three-way distinction',
    refHeaders: ['Marker', 'Answers', 'Example'],
    refRows: [
      { col1: 'waa', col2: 'What happened?', col3: 'Cali wuu cunay', bold1: true },
      { col1: 'baa / ayaa', col2: 'Who did it?', col3: 'Cali baa cunay', bold1: true },
      { col1: 'waxa', col2: 'What was it?', col3: 'Waxuu cunay...', bold1: true },
    ],
    listeningNote: 'When you hear baa or ayaa, the speaker is emphasizing a noun. When you hear waxa, they are zooming in. Train your ear to catch these distinctions every time.',
  },

  3: {
    id: 3,
    color: '#06b6d4',
    title: 'Subject Pronoun Contractions',
    rule: 'Somali fuses marker + pronoun into one word. You must split them apart instantly.',
    ruleDetail: 'In fast speech, waa + uu becomes wuu. baa + ay becomes bay. waxa + aan becomes waxaan. This is how Somali actually sounds. Fast speech will blur without this skill.',
    glossTitle: 'The fusion in action:',
    gloss: [
      {
        parts: [
          { somali: 'Wuu', tag: 'waa+uu', english: 'statement+he' },
          { somali: 'tegay.', tag: 'verb', english: 'went' },
        ],
        translation: 'He went.',
        note: 'wuu = statement marker + he',
      },
      {
        parts: [
          { somali: 'Bay', tag: 'baa+ay', english: 'focus+she' },
          { somali: 'cuntay.', tag: 'verb', english: 'ate' },
        ],
        translation: 'It was SHE who ate.',
        note: 'bay = focus marker + she/they',
      },
      {
        parts: [
          { somali: 'Waxaan', tag: 'waxa+aan', english: 'spotlight+I' },
          { somali: 'rabaa', tag: 'verb', english: 'want' },
          { somali: 'biyo.', tag: 'noun', english: 'water' },
        ],
        translation: 'What I want is water.',
        note: 'waxaan = spotlight + I',
      },
    ],
    refTitle: 'The contraction table',
    refHeaders: ['Fused', 'Splits into', 'Means'],
    refRows: [
      { col1: 'waan', col2: 'waa + aan', col3: 'statement—I' },
      { col1: 'wuu', col2: 'waa + uu', col3: 'statement—he', bold1: true },
      { col1: 'way', col2: 'waa + ay', col3: 'statement—she/they', bold1: true },
      { col1: 'buu', col2: 'baa + uu', col3: 'focus—he', bold1: true },
      { col1: 'bay', col2: 'baa + ay', col3: 'focus—she/they', bold1: true },
      { col1: 'waxaan', col2: 'waxa + aan', col3: 'spotlight—I', bold1: true },
      { col1: 'wuxuu', col2: 'waxa + uu', col3: 'spotlight—he', bold1: true },
      { col1: 'waxay', col2: 'waxa + ay', col3: 'spotlight—she/they', bold1: true },
    ],
    listeningNote: 'A native speaker never says "waa uu cunay." They say "wuu cunay." Fast Somali depends on hearing these fused forms and instantly decomposing them.',
  },

  4: {
    id: 4,
    color: '#22c55e',
    title: 'SOV Word Order',
    rule: 'The verb comes last. Every time.',
    ruleDetail: 'English is SVO: "Ali ate meat." Somali is SOV: "Ali meat ate." Once this locks in, you stop reaching for the verb too early.',
    glossTitle: 'Subject-Object-VERB:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'subject', english: 'Ali' },
          { somali: 'wuu', tag: 'marker', english: '(declares)' },
          { somali: 'hilib', tag: 'object', english: 'meat' },
          { somali: 'cunay.', tag: 'VERB.LAST', english: 'ate' },
        ],
        translation: 'Ali ate meat.',
        note: 'Subject → Marker → Object → VERB (always last)',
      },
      {
        parts: [
          { somali: 'Cali', tag: 'subject', english: 'Ali' },
          { somali: 'baa', tag: 'focus', english: '(ALI focus)' },
          { somali: 'cuntada', tag: 'object', english: 'the food' },
          { somali: 'cunay.', tag: 'VERB', english: 'ate' },
        ],
        translation: 'It was ALI who ate the food.',
        note: 'Focus type — verb still last',
      },
      {
        parts: [
          { somali: 'Waxaan', tag: 'spotlight', english: '(what I...)' },
          { somali: 'biyo', tag: 'object', english: 'water' },
          { somali: 'cabay.', tag: 'VERB', english: 'drank' },
        ],
        translation: 'What I drank was water.',
        note: 'Spotlight type — verb still last',
      },
    ],
    refTitle: 'Word order by type',
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
    color: '#f59e0b',
    title: 'Prepositions + Direction',
    rule: 'Four prepositions and two direction words carry the spatial logic.',
    ruleDetail: 'u, ku, ka, la tell you the relationship. soo and sii add direction. These tiny words are fast in speech but they carry the whole picture.',
    glossTitle: 'How they stack before the verb:',
    gloss: [
      {
        parts: [
          { somali: 'Wuu', tag: 'statement', english: '(he)' },
          { somali: 'u', tag: 'prep:to/for', english: 'to/for' },
          { somali: 'soo', tag: 'direction:→here', english: 'toward' },
          { somali: 'keenay.', tag: 'VERB', english: 'brought' },
        ],
        translation: 'He brought it over (to me).',
        note: 'u + soo = "for + toward here"',
      },
      {
        parts: [
          { somali: 'Waan', tag: 'statement.I', english: '(I)' },
          { somali: 'ku', tag: 'prep:in/at', english: 'in/at' },
          { somali: 'joogaa', tag: 'VERB', english: 'am staying' },
          { somali: 'guriga.', tag: 'location', english: 'the house' },
        ],
        translation: 'I am in the house.',
        note: 'ku = "in/at + staying = staying in"',
      },
      {
        parts: [
          { somali: 'Way', tag: 'statement', english: '(she)' },
          { somali: 'ka', tag: 'prep:from', english: 'from' },
          { somali: 'soo', tag: 'direction', english: '→here' },
          { somali: 'noqotay.', tag: 'VERB', english: 'returned' },
        ],
        translation: 'She came back.',
        note: 'ka + soo = "from + toward = came back"',
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
    listeningNote: 'These words blur into the verb phrase in fast speech. But they carry the whole spatial picture. Train your ear to catch them.',
  },

  6: {
    id: 6,
    color: '#ef4444',
    title: 'Connectors',
    rule: 'Four connectors join ideas. Each encodes a different relationship.',
    ruleDetail: 'iyo links nouns. -na continues. -se contrasts. oo links relative clauses. Without them, you hear isolated sentences. With them, you hear the full thought.',
    glossTitle: 'Connectors in action:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'iyo', tag: 'connector', english: 'and' },
          { somali: 'Sahra', tag: 'name', english: 'Sahra' },
          { somali: 'way', tag: 'statement', english: '(they)' },
          { somali: 'tegeen.', tag: 'VERB', english: 'went' },
        ],
        translation: 'Ali and Sahra went.',
        note: 'iyo — links two nouns',
      },
      {
        parts: [
          { somali: 'Wuu', tag: 'statement', english: '(he)' },
          { somali: 'cunay,', tag: 'VERB', english: 'ate,' },
          { somali: 'waadna', tag: 'waa+aad+-na', english: 'and you' },
          { somali: 'cuntay.', tag: 'VERB', english: 'ate' },
        ],
        translation: 'He ate, and you also ate.',
        note: '-na — attaches to next clause, means "and also"',
      },
      {
        parts: [
          { somali: 'Wuu', tag: 'statement', english: '(he)' },
          { somali: 'tegay,', tag: 'VERB', english: 'went,' },
          { somali: 'naagtase', tag: 'naagta+-se', english: 'but woman' },
          { somali: 'joogtay.', tag: 'VERB', english: 'stayed' },
        ],
        translation: 'He went, but the woman stayed.',
        note: '-se — contrast, attaches to first word',
      },
      {
        parts: [
          { somali: 'Buug', tag: 'noun', english: 'book' },
          { somali: 'oo', tag: 'connector', english: 'which' },
          { somali: 'weyn', tag: 'adj', english: 'big' },
        ],
        translation: 'A book which was big',
        note: 'oo — relative clause connector',
      },
    ],
    refTitle: 'Connector types',
    refHeaders: ['Connector', 'Role'],
    refRows: [
      { col1: 'iyo', col2: 'and (nouns)', bold1: true },
      { col1: '-na', col2: 'and also (sentences)', bold1: true },
      { col1: '-se', col2: 'but / however', bold1: true },
      { col1: 'oo', col2: 'which / that', bold1: true },
    ],
    listeningNote: 'Somali chains ideas fast. Missing iyo means you lose who you are talking about. Missing -se means you think both things happened when one was a contrast.',
  },

  7: {
    id: 7,
    color: '#ffa116',
    title: 'Full Sentence Construction',
    rule: 'You have all the pieces. Build any Somali sentence from scratch.',
    ruleDetail: 'This level closes the loop. If you can build it, you will hear it. Production and comprehension reinforce each other.',
    glossTitle: 'A complete sentence assembled:',
    gloss: [
      {
        parts: [
          { somali: 'Hooyada', tag: 'subject', english: 'Mother' },
          { somali: 'way', tag: 'statement', english: '(declares)' },
          { somali: 'ka', tag: 'prep:from', english: 'from' },
          { somali: 'soo', tag: 'direction', english: 'toward' },
          { somali: 'keentay', tag: 'VERB', english: 'brought' },
          { somali: 'cunto', tag: 'object', english: 'food' },
          { somali: 'suuqa.', tag: 'location', english: 'market' },
        ],
        translation: 'Mother brought food from the market.',
        note: 'Subject + marker + prep + direction + VERB + object + location',
      },
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'iyo', tag: 'connector', english: 'and' },
          { somali: 'Sahra', tag: 'name', english: 'Sahra' },
          { somali: 'waxay', tag: 'spotlight', english: '(what they...)' },
          { somali: 'la', tag: 'prep:with', english: 'with' },
          { somali: 'shaqeeyeen.', tag: 'VERB', english: 'worked' },
        ],
        translation: 'Ali and Sahra worked together.',
        note: 'iyo + spotlight + preposition + VERB = full stack',
      },
    ],
    refTitle: 'The full skeleton',
    refHeaders: ['Slot', 'What goes here'],
    refRows: [
      { col1: '1. Subject', col2: 'Noun or name', bold1: true },
      { col1: '2. Marker', col2: 'waa/baa/waxa + pronoun', bold1: true },
      { col1: '3. Preposition', col2: 'u / ku / ka / la' },
      { col1: '4. Direction', col2: 'soo / sii' },
      { col1: '5. Object', col2: 'Noun' },
      { col1: '6. VERB', col2: '← ALWAYS LAST', bold1: true },
    ],
    listeningNote: 'You now have the full grammar skeleton. Go back to your Listening Guide. Open a Somali video. Pause every 15 seconds. Decode one sentence using the 6-step decoder. You are parsing, not guessing.',
  },
};

function InterlinearGloss({ parts, color }: { parts: GlossWord[]; color: string }) {
  return (
    <div className="space-y-1">
      {parts.map((w, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-xs font-bold text-[#eff1f6] font-mono min-w-fit">
            {w.somali}
          </span>
          <span className="text-[9px] font-bold text-center min-w-fit" style={{ color: `${color}88` }}>
            {w.tag}
          </span>
          <span className="text-[9px] text-[#5c5c5c] italic">{w.english}</span>
        </div>
      ))}
    </div>
  );
}

interface ExplainCardProps {
  levelId: number;
  onStart: () => void;
}

export default function ExplainCard({ levelId, onStart }: ExplainCardProps) {
  const data = EXPLAINS[levelId];
  if (!data) return null;
  const { color } = data;

  return (
    <div className="space-y-4 pb-2">
      {/* Rule */}
      <div className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4 space-y-2">
        <p className="text-base font-bold text-[#eff1f6] leading-snug">{data.rule}</p>
        <p className="text-xs text-[#8c8c8c] leading-relaxed">{data.ruleDetail}</p>
      </div>

      {/* Anatomy */}
      <div className="space-y-2">
        <p className="text-[9px] font-bold text-[#5c5c5c] uppercase tracking-wider px-1">
          {data.glossTitle}
        </p>
        {data.gloss.map((line, i) => (
          <div key={i} className="rounded-xl bg-[#1a1a1a] border border-[#ffffff06] p-3 space-y-2">
            <InterlinearGloss parts={line.parts} color={color} />
            <div className="flex items-start gap-2 pt-1 border-t border-[#ffffff06]">
              <ArrowRight size={10} className="flex-shrink-0 mt-0.5" style={{ color }} />
              <div>
                <p className="text-xs font-semibold" style={{ color }}>
                  {line.translation}
                </p>
                {line.note && (
                  <p className="text-[9px] text-[#4a4a4a] mt-0.5">— {line.note}</p>
                )}
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
              <span key={i} className="font-bold text-[#5c5c5c]">{h}</span>
            ))}
          </div>
          {data.refRows.map((row, i) => (
            <div key={i} className="grid px-2.5 py-1.5 border-t border-[#ffffff05] gap-2" style={{ gridTemplateColumns: data.refHeaders.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr', backgroundColor: i % 2 === 0 ? '#141414' : '#171717' }}>
              <span className={row.bold1 ? 'font-bold text-[#eff1f6] font-mono' : 'text-[#8c8c8c] font-mono'} style={{ color: row.bold1 ? color : undefined }}>
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
            <p className="text-[9px] font-bold text-[#22c55e] uppercase tracking-wider mb-0.5">
              For listening
            </p>
            <p className="text-[9px] text-[#4a7a4a] leading-relaxed">{data.listeningNote}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onStart}
        className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] hover:opacity-90"
        style={{ backgroundColor: color, color: '#0f0f0f' }}
      >
        Start Drills
      </button>
    </div>
  );
}
