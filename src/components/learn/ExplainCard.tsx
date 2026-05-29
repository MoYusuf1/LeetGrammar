/**
 * ExplainCard — the centrepiece of the rebuild.
 *
 * This is the "teach" phase. It's opinionated, hardcoded, and written
 * in the same voice used in the workbook: direct, anatomy-first, connected
 * to real listening. No generic "Here is the rule" — actual explanation.
 *
 * Structure per level:
 *   1. Rule  — one tight principle
 *   2. Anatomy — interlinear gloss of key sentences
 *   3. Reference — the table they'll keep consulting
 *   4. Listening note — why this matters in the wild
 */

import { ArrowRight, Ear, Table2 } from 'lucide-react';

/* ─── Types ────────────────────────────────────────────────────────────────── */

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
  rule: string;          // one clear statement
  ruleDetail: string;    // 2-3 sentences of explanation
  glossTitle: string;
  gloss: GlossLine[];
  refTitle: string;
  refHeaders: string[];
  refRows: RefRow[];
  listeningNote: string;
}

/* ─── Hardcoded teaching content ───────────────────────────────────────────── */

const EXPLAINS: Record<number, LevelExplain> = {
  1: {
    id: 1,
    color: '#3b82f6',
    title: 'Marker Identification',
    rule: 'Every Somali sentence has exactly one marker. Find it. Name its job.',
    ruleDetail:
      'The marker is a small word near the front of the sentence. It tells you what TYPE of sentence you are in before you even process the meaning. There are four types. Your job at this level is to see any sentence and instantly name which one it is.',
    glossTitle: 'Each marker type looks like this in a sentence:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'wuu', tag: 'waa+uu', english: '(he declares)' },
          { somali: 'tegay.', tag: 'verb.past', english: 'went' },
        ],
        translation: 'Ali went.',
        note: 'STATEMENT — wuu focuses on the action of going',
      },
      {
        parts: [
          { somali: 'Hooyada', tag: 'noun.def', english: 'the mother' },
          { somali: 'bay', tag: 'baa+ay', english: '(she is the focus)' },
          { somali: 'cuntay.', tag: 'verb.past', english: 'ate' },
        ],
        translation: 'It was MOTHER who ate.',
        note: 'FOCUS — bay shifts emphasis onto the noun before it',
      },
      {
        parts: [
          { somali: 'Ma', tag: 'question', english: '(asking yes/no)' },
          { somali: 'cunaysaa?', tag: 'verb.pres+you', english: 'are you eating?' },
        ],
        translation: 'Are you eating?',
        note: 'QUESTION — ma turns any statement into a yes/no question',
      },
      {
        parts: [
          { somali: 'Waxaan', tag: 'waxa+aan', english: '(what I...)' },
          { somali: 'akhriyay', tag: 'verb.past', english: 'read' },
          { somali: 'buug.', tag: 'noun', english: 'a book' },
        ],
        translation: 'What I read was a book.',
        note: 'SPOTLIGHT — waxa zooms in on one element of the sentence',
      },
    ],
    refTitle: 'The four marker types',
    refHeaders: ['You hear', 'Type', 'Focus is on'],
    refRows: [
      { col1: 'waa / wuu / way / waan', col2: 'STATEMENT', col3: 'the action (verb)', bold1: true },
      { col1: 'ma / miyaa / miyuu', col2: 'QUESTION', col3: 'yes/no answer', bold1: true },
      { col1: 'baa / ayaa / buu / bay', col2: 'FOCUS', col3: 'the noun before it', bold1: true },
      { col1: 'waxa / waxaan / wuxuu', col2: 'SPOTLIGHT', col3: '"what ___ was..."', bold1: true },
    ],
    listeningNote:
      'In a Somali movie, a sentence flies by in under 2 seconds. You will not have time to parse every word. But you can train your ear to catch the marker in the first half-second — and that alone tells you what type of sentence you are in. Recognition before meaning. That is the whole game at this level.',
  },

  2: {
    id: 2,
    color: '#8b5cf6',
    title: 'waa vs baa vs waxa',
    rule: 'Same words. Different marker. Completely different emphasis.',
    ruleDetail:
      'This is the most important distinction in Somali grammar. The three markers waa, baa/ayaa, and waxa can appear in sentences with identical vocabulary — but they shift the meaning completely. The marker decides where the weight lands.',
    glossTitle: 'The same sentence, three ways:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'wuu', tag: 'waa+uu', english: '(he declares)' },
          { somali: 'cuntay.', tag: 'verb.past', english: 'ate' },
        ],
        translation: 'Ali ate.',
        note: 'STATEMENT — neutral. The eating is the point.',
      },
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'baa', tag: 'focus', english: '(ALI is focus)' },
          { somali: 'cunay.', tag: 'verb.past', english: 'ate' },
        ],
        translation: 'It was ALI who ate.',
        note: 'FOCUS — baa puts the spotlight on the noun before it. Ali, not someone else.',
      },
      {
        parts: [
          { somali: 'Waxuu', tag: 'waxa+uu', english: '(what he...)' },
          { somali: 'cunay', tag: 'verb.past', english: 'ate' },
          { somali: 'waa', tag: 'copula', english: 'was' },
          { somali: 'hilib.', tag: 'noun', english: 'meat' },
        ],
        translation: 'What he ate was meat.',
        note: 'SPOTLIGHT — waxa zooms in on the object. Meat, not rice.',
      },
    ],
    refTitle: 'The three-way split',
    refHeaders: ['Marker', 'Question it answers', 'Example'],
    refRows: [
      { col1: 'waa', col2: 'What happened? (the action)', col3: 'Cali wuu cunay = Ali ATE', bold1: true },
      { col1: 'baa / ayaa', col2: 'Who did it? (the noun)', col3: 'Cali baa cunay = ALI ate', bold1: true },
      { col1: 'waxa', col2: 'What was it? (the object/result)', col3: 'Waxuu cunay waa hilib = ...was MEAT', bold1: true },
    ],
    listeningNote:
      'When you hear baa or ayaa in a Somali conversation, the speaker is correcting an assumption or contrasting with something. "No — it was HIM who did it." When you hear waxa, the speaker is zooming in: "and what that was, was X." Your ear needs to hear the difference between these three every single time.',
  },

  3: {
    id: 3,
    color: '#06b6d4',
    title: 'Subject Pronoun Contractions',
    rule: 'Somali fuses the marker and the subject pronoun into one word. You need to split them apart instantly.',
    ruleDetail:
      'In fast speech, waa + uu collapses into wuu. baa + ay collapses into bay. waxa + aan collapses into waxaan. These fused forms are how Somali actually sounds in real life. If you only know the full forms, fast speech will blur. This level trains the unfusing reflex.',
    glossTitle: 'What the fusion looks like:',
    gloss: [
      {
        parts: [
          { somali: 'Wuu', tag: 'waa + uu', english: 'statement + he' },
          { somali: 'tegay.', tag: 'verb.past', english: 'went' },
        ],
        translation: 'He went.',
        note: 'wuu = statement marker + third-person masculine pronoun',
      },
      {
        parts: [
          { somali: 'Bay', tag: 'baa + ay', english: 'focus + she' },
          { somali: 'cuntay.', tag: 'verb.past', english: 'ate' },
        ],
        translation: 'It was SHE who ate.',
        note: 'bay = focus marker + third-person feminine/plural pronoun',
      },
      {
        parts: [
          { somali: 'Waxaan', tag: 'waxa + aan', english: 'spotlight + I' },
          { somali: 'rabaa', tag: 'verb.pres', english: 'want' },
          { somali: 'waa', tag: 'copula', english: 'is' },
          { somali: 'biyo.', tag: 'noun', english: 'water' },
        ],
        translation: 'What I want is water.',
        note: 'waxaan = spotlight marker + first-person pronoun',
      },
    ],
    refTitle: 'The complete contraction table',
    refHeaders: ['Contraction', 'Splits into', 'Means'],
    refRows: [
      { col1: 'waan', col2: 'waa + aan', col3: 'statement — I', bold1: true },
      { col1: 'waad', col2: 'waa + aad', col3: 'statement — you' },
      { col1: 'wuu', col2: 'waa + uu', col3: 'statement — he', bold1: true },
      { col1: 'way', col2: 'waa + ay', col3: 'statement — she/they', bold1: true },
      { col1: 'baan', col2: 'baa + aan', col3: 'focus — I' },
      { col1: 'buu', col2: 'baa + uu', col3: 'focus — he', bold1: true },
      { col1: 'bay', col2: 'baa + ay', col3: 'focus — she/they', bold1: true },
      { col1: 'waxaan', col2: 'waxa + aan', col3: 'spotlight — I', bold1: true },
      { col1: 'wuxuu', col2: 'waxa + uu', col3: 'spotlight — he', bold1: true },
      { col1: 'waxay', col2: 'waxa + ay', col3: 'spotlight — she/they', bold1: true },
    ],
    listeningNote:
      'A native speaker never says "waa uu cunay." They say "wuu cunay." Your ear needs to hear wuu and instantly decode: marker = statement, subject = he. This is the difference between understanding fast Somali and not understanding it. The whole contraction table needs to become automatic.',
  },

  4: {
    id: 4,
    color: '#22c55e',
    title: 'SOV Word Order',
    rule: 'In Somali, the verb comes last. Every time.',
    ruleDetail:
      'English is SVO: Subject-Verb-Object. "Ali ate meat." Somali is SOV: Subject-Object-Verb. "Ali meat ate." The focus marker sits between the subject and the object. Once this order is locked in, you stop reaching for the verb too early and start hearing the sentence correctly.',
    glossTitle: 'The skeleton of a Somali sentence:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'subject', english: 'Ali' },
          { somali: 'wuu', tag: 'marker', english: '(declares, he)' },
          { somali: 'hilib', tag: 'object', english: 'meat' },
          { somali: 'cunay.', tag: 'verb.last', english: 'ate ← VERB LANDS HERE' },
        ],
        translation: 'Ali ate meat.',
        note: 'Subject → Marker → Object → Verb. The verb always closes.',
      },
      {
        parts: [
          { somali: 'Cali', tag: 'subject', english: 'Ali' },
          { somali: 'baa', tag: 'focus.marker', english: '(Ali is focus)' },
          { somali: 'cuntada', tag: 'object.def', english: 'the food' },
          { somali: 'cunay.', tag: 'verb.last', english: 'ate' },
        ],
        translation: 'It was ALI who ate the food.',
        note: 'Focus marker between subject and object — verb still last',
      },
      {
        parts: [
          { somali: 'Waxaan', tag: 'spotlight+I', english: '(what I...)' },
          { somali: 'biyo', tag: 'object', english: 'water' },
          { somali: 'cabay.', tag: 'verb.last', english: 'drank' },
        ],
        translation: 'What I drank was water.',
        note: 'Spotlight: waxa replaces the subject, verb still last',
      },
    ],
    refTitle: 'Word order by sentence type',
    refHeaders: ['Type', 'Order', 'Example'],
    refRows: [
      { col1: 'Statement', col2: 'Subject → waa → Object → Verb', col3: 'Cali wuu hilib cunay', bold1: true },
      { col1: 'Focus', col2: 'Subject → baa → Object → Verb', col3: 'Cali baa cuntada cunay', bold1: true },
      { col1: 'Spotlight', col2: 'waxa+pronoun → Object → Verb', col3: 'Waxaan biyo cabay', bold1: true },
      { col1: 'Question', col2: 'ma → Subject → Object → Verb?', col3: 'Ma Cali hilib cunay?', bold1: true },
    ],
    listeningNote:
      'If you have English word order in your head while listening to Somali, you will always be confused. English gives you the verb in the middle. Somali saves it for the end. Train your ear to wait. The sentence is not finished until the verb lands.',
  },

  5: {
    id: 5,
    color: '#f59e0b',
    title: 'Prepositions + Direction',
    rule: 'Four prepositions and two direction words. They stack before the verb and carry all the spatial logic.',
    ruleDetail:
      'u, ku, ka, la tell you the relationship between the action and the people or places involved. soo and sii add direction. These words are tiny and fast in speech — but without them, you lose WHO got what, WHERE the action happened, and which way things moved.',
    glossTitle: 'How they sit in the sentence:',
    gloss: [
      {
        parts: [
          { somali: 'Wuu', tag: 'statement.he', english: '(he declares)' },
          { somali: 'u', tag: 'prep: to/for', english: 'to / for' },
          { somali: 'soo', tag: 'direction: →here', english: 'toward speaker' },
          { somali: 'keenay.', tag: 'verb.past', english: 'brought' },
        ],
        translation: 'He brought it over (to me).',
        note: 'u + soo stack before the verb — "for [me] + toward [here]"',
      },
      {
        parts: [
          { somali: 'Waan', tag: 'statement.I', english: '(I declare)' },
          { somali: 'ku', tag: 'prep: in/at', english: 'in / at' },
          { somali: 'joogaa', tag: 'verb.pres', english: 'am staying' },
          { somali: 'guriga.', tag: 'noun.def', english: 'the house' },
        ],
        translation: 'I am in the house.',
        note: 'ku comes right before the verb — "at + staying = staying in"',
      },
      {
        parts: [
          { somali: 'Way', tag: 'statement.she', english: '(she declares)' },
          { somali: 'ka', tag: 'prep: from', english: 'from' },
          { somali: 'soo', tag: 'direction: →here', english: 'toward speaker' },
          { somali: 'noqotay.', tag: 'verb.past', english: 'returned' },
        ],
        translation: 'She came back from [there].',
        note: 'ka + soo = "from + toward here" = came back',
      },
    ],
    refTitle: 'Prepositions and directions at a glance',
    refHeaders: ['Word', 'Meaning', 'Think of it as'],
    refRows: [
      { col1: 'u', col2: 'to / for', col3: 'handing something toward someone', bold1: true },
      { col1: 'ku', col2: 'in / at / using', col3: 'located inside or by means of', bold1: true },
      { col1: 'ka', col2: 'from / about', col3: 'coming away from a source', bold1: true },
      { col1: 'la', col2: 'with / one (passive)', col3: 'together with, or anonymous agent', bold1: true },
      { col1: 'soo', col2: 'toward speaker', col3: '← motion coming IN', bold1: true },
      { col1: 'sii', col2: 'away from speaker', col3: '→ motion going OUT', bold1: true },
    ],
    listeningNote:
      'These words are tiny and fast. In a khutbah or a movie dialogue, they blur into the verb phrase. But they carry the whole spatial picture. "Wuu u soo keenay" means something very different from "Wuu ku tegay." Training your ear to catch u, ku, ka, la before the verb is one of the highest-value listening skills you can build.',
  },

  6: {
    id: 6,
    color: '#ef4444',
    title: 'Connectors',
    rule: 'Four connectors join ideas. Each one encodes a different relationship between them.',
    ruleDetail:
      'Without connectors, you hear isolated sentences. With them, you hear the full thought — what goes together, what contrasts, what describes what. iyo links nouns. -na continues a chain. -se introduces a contrast. oo links a relative clause or adds detail.',
    glossTitle: 'Each connector in action:',
    gloss: [
      {
        parts: [
          { somali: 'Cali', tag: 'name', english: 'Ali' },
          { somali: 'iyo', tag: 'connector.nouns', english: 'and' },
          { somali: 'Sahra', tag: 'name', english: 'Sahra' },
          { somali: 'way', tag: 'statement.they', english: '(they declare)' },
          { somali: 'tegeen.', tag: 'verb.past.pl', english: 'went' },
        ],
        translation: 'Ali and Sahra went.',
        note: 'iyo — links two nouns into a paired subject',
      },
      {
        parts: [
          { somali: 'Wuu', tag: 'statement.he', english: '(he)' },
          { somali: 'cunay,', tag: 'verb.past', english: 'ate,' },
          { somali: 'waadna', tag: 'waa+aad+-na', english: 'and you also' },
          { somali: 'cuntay.', tag: 'verb.past', english: 'ate' },
        ],
        translation: 'He ate, and you also ate.',
        note: '-na — attaches to first word of next clause, means "and also"',
      },
      {
        parts: [
          { somali: 'Wuu', tag: 'statement.he', english: '(he)' },
          { somali: 'tegay,', tag: 'verb.past', english: 'went,' },
          { somali: 'naagtase', tag: 'naagta+-se', english: 'but the woman' },
          { somali: 'way', tag: 'statement.she', english: '(she)' },
          { somali: 'joogtay.', tag: 'verb.past', english: 'stayed' },
        ],
        translation: 'He went, but the woman stayed.',
        note: '-se — attaches to first word of contrasting clause',
      },
      {
        parts: [
          { somali: 'Buug', tag: 'noun', english: 'a book' },
          { somali: 'oo', tag: 'connector.relative', english: 'which' },
          { somali: 'weyn', tag: 'adj', english: 'big' },
          { somali: 'baan', tag: 'focus.I', english: '(I as focus)' },
          { somali: 'akhriyay.', tag: 'verb.past', english: 'read' },
        ],
        translation: 'I read a book which was big.',
        note: 'oo — links a relative clause (like "which" or "that")',
      },
    ],
    refTitle: 'Connector reference',
    refHeaders: ['Connector', 'Role', 'Attaches to'],
    refRows: [
      { col1: 'iyo', col2: 'and (nouns)', col3: 'standalone, between two nouns', bold1: true },
      { col1: '-na', col2: 'and also (sentences)', col3: 'first word of second clause', bold1: true },
      { col1: '-se', col2: 'but / however', col3: 'first word of contrasting clause', bold1: true },
      { col1: 'oo', col2: 'which / that / and', col3: 'start of relative clause', bold1: true },
    ],
    listeningNote:
      'In conversation and storytelling, Somali chains ideas together fast. If you miss iyo, you lose who you are talking about. If you miss -se, you think both things happened — but actually one was the contrast. Hearing connectors correctly is the difference between following a story and getting lost in it.',
  },

  7: {
    id: 7,
    color: '#ffa116',
    title: 'Full Sentence Construction',
    rule: 'You now have all the pieces. Build any Somali sentence from scratch.',
    ruleDetail:
      'This level is production: English into Somali, no scaffolding. Levels 1-6 trained your recognition and your understanding of structure. Level 7 closes the loop. Production and comprehension reinforce each other — if you can build it, you will hear it.',
    glossTitle: 'A complex sentence, fully assembled:',
    gloss: [
      {
        parts: [
          { somali: 'Hooyada', tag: 'subject', english: 'Mother' },
          { somali: 'way', tag: 'waa+ay', english: '(she declares)' },
          { somali: 'ka', tag: 'prep: from', english: 'from' },
          { somali: 'soo', tag: 'direction: →here', english: 'toward' },
          { somali: 'keentay', tag: 'verb.past', english: 'brought' },
          { somali: 'cunto', tag: 'object', english: 'food' },
          { somali: 'suuqa.', tag: 'noun.def', english: 'the market' },
        ],
        translation: 'Mother brought food from the market (here).',
        note: 'Subject + marker + preposition + direction + verb + object + location',
      },
      {
        parts: [
          { somali: 'Cali', tag: 'subject', english: 'Ali' },
          { somali: 'iyo', tag: 'connector', english: 'and' },
          { somali: 'Sahra', tag: 'name', english: 'Sahra' },
          { somali: 'waxay', tag: 'waxa+ay', english: '(what they...)' },
          { somali: 'la', tag: 'prep: with', english: 'with' },
          { somali: 'shaqeeyeen', tag: 'verb.past.pl', english: 'worked' },
          { somali: 'macallinka.', tag: 'noun.def', english: 'the teacher' },
        ],
        translation: 'What Ali and Sahra did was work with the teacher.',
        note: 'iyo + spotlight + preposition + verb + object = full stack',
      },
    ],
    refTitle: 'The full sentence skeleton',
    refHeaders: ['Slot', 'What goes here', 'Required?'],
    refRows: [
      { col1: '1. Subject', col2: 'Noun or name', col3: 'Usually', bold1: true },
      { col1: '2. Marker', col2: 'waa/baa/waxa + pronoun', col3: 'Always', bold1: true },
      { col1: '3. Preposition', col2: 'u / ku / ka / la', col3: 'When needed' },
      { col1: '4. Direction', col2: 'soo / sii', col3: 'When needed' },
      { col1: '5. Connector', col2: 'iyo / oo / -na / -se', col3: 'When joining' },
      { col1: '6. Object', col2: 'Noun (definite or indefinite)', col3: 'When needed' },
      { col1: '7. Verb', col2: 'Conjugated verb — ALWAYS LAST', col3: 'Always', bold1: true },
    ],
    listeningNote:
      'By the time you finish this level, you have the full grammar skeleton of Somali WB1. Go back to your Listening Guide. Open Page 1. Put on a Somali YouTube video. Pause every 15 seconds. Run the 6-step sentence decoder from Page 5. You are not guessing anymore — you are parsing.',
  },
};

/* ─── Components ───────────────────────────────────────────────────────────── */

function InterlinearGloss({ parts, color }: { parts: GlossWord[]; color: string }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex items-start gap-0 min-w-max">
        {parts.map((w, i) => (
          <div key={i} className="flex flex-col items-start pr-5 last:pr-0">
            <span className="text-sm font-bold text-[#eff1f6] font-mono leading-snug whitespace-nowrap">
              {w.somali}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wide leading-tight mt-0.5 whitespace-nowrap"
              style={{ color: `${color}88` }}>
              {w.tag}
            </span>
            <span className="text-[10px] italic text-[#5c5c5c] leading-tight mt-0.5 whitespace-nowrap">
              {w.english}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */

interface ExplainCardProps {
  levelId: number;
  onStart: () => void;
}

export default function ExplainCard({ levelId, onStart }: ExplainCardProps) {
  const data = EXPLAINS[levelId];
  if (!data) return null;
  const { color } = data;

  return (
    <div className="space-y-5 pb-4">

      {/* Rule */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-3">
        <span className="inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: `${color}15`, color, border: `1px solid ${color}30` }}>
          The Rule
        </span>
        <p className="text-base font-bold text-[#eff1f6] leading-snug">{data.rule}</p>
        <p className="text-sm text-[#8c8c8c] leading-relaxed">{data.ruleDetail}</p>
      </div>

      {/* Anatomy — interlinear gloss */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider px-1">
          {data.glossTitle}
        </p>
        {data.gloss.map((line, i) => (
          <div key={i} className="rounded-xl bg-[#1a1a1a] border border-[#ffffff06] p-4 space-y-3">
            <InterlinearGloss parts={line.parts} color={color} />
            <div className="flex items-start gap-2 pt-1 border-t border-[#ffffff06]">
              <ArrowRight size={11} className="flex-shrink-0 mt-0.5" style={{ color }} />
              <div>
                <span className="text-xs font-semibold" style={{ color }}>{line.translation}</span>
                {line.note && (
                  <span className="text-[10px] text-[#4a4a4a] ml-2">— {line.note}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reference table */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 px-1">
          <Table2 size={11} color="#5c5c5c" />
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">{data.refTitle}</p>
        </div>
        <div className="rounded-xl border border-[#ffffff08] overflow-hidden">
          {/* Header */}
          <div className="grid px-3 py-2 bg-[#1f1f1f]"
            style={{ gridTemplateColumns: data.refHeaders.length === 3 ? '1fr 1fr 1.5fr' : '1fr 1fr' }}>
            {data.refHeaders.map((h, i) => (
              <span key={i} className="text-[9px] font-bold text-[#5c5c5c] uppercase tracking-wider">{h}</span>
            ))}
          </div>
          {/* Rows */}
          {data.refRows.map((row, i) => (
            <div key={i}
              className="grid px-3 py-2.5 border-t border-[#ffffff05]"
              style={{
                backgroundColor: i % 2 === 0 ? '#141414' : '#171717',
                gridTemplateColumns: data.refHeaders.length === 3 ? '1fr 1fr 1.5fr' : '1fr 1fr',
              }}>
              <span className={`text-xs font-mono ${row.bold1 ? 'font-bold text-[#eff1f6]' : 'text-[#8c8c8c]'}`}
                style={{ color: row.bold1 ? color : undefined }}>
                {row.col1}
              </span>
              <span className="text-xs text-[#8c8c8c]">{row.col2}</span>
              {row.col3 && <span className="text-xs text-[#5c5c5c] italic">{row.col3}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Listening note */}
      <div className="rounded-xl bg-[#0d1a0d] border border-[#22c55e15] p-4">
        <div className="flex items-start gap-2.5">
          <Ear size={13} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] font-bold text-[#22c55e] uppercase tracking-wider mb-1.5">
              Why this matters when listening
            </p>
            <p className="text-xs text-[#4a7a4a] leading-relaxed">{data.listeningNote}</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button onClick={onStart}
        className="w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] hover:opacity-90"
        style={{ backgroundColor: color, color: '#0f0f0f' }}>
        I understand — Start Drills
      </button>
    </div>
  );
}
