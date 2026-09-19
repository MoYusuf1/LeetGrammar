/**
 * A short, real text — the unit the whole lesson is built around.
 *
 * Glosses sit behind a tap, per line. That is LingQ's in-context help rather
 * than a parallel translation: the learner commits to the gist first (the
 * very next card asks for it), and help is available but costs a deliberate
 * action. Showing the English open would make every gist question answerable
 * without reading any Somali at all.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Card as TeachingCard } from '@/data/types';
import Prose from '../Prose';
import Somali from '@/components/Somali';
import { contentStagger } from '../motion';

export default function PassageCard({ card }: { card: TeachingCard }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const passage = card.passage!;
  return (
    <div className="space-y-5">
      <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="list-group">
        {passage.lines.map((line, i) => {
          const shown = Boolean(revealed[i]);
          return (
            <div key={i} className="list-row px-4 py-4">
              <button
                onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                aria-expanded={shown}
                aria-label={shown ? `Hide the meaning of line ${i + 1}` : `Show the meaning of line ${i + 1}`}
                className="w-full text-left"
              >
                <Somali size="lg">{line.somali}</Somali>
                {shown ? (
                  <p className="mt-1.5 text-subhead text-label-2">{line.gloss}</p>
                ) : (
                  <p className="mt-1.5 text-footnote text-label-3">Tap for the meaning</p>
                )}
                {shown && line.note && <p className="mt-1 text-footnote text-label-3">{line.note}</p>}
              </button>
            </div>
          );
        })}
      </motion.div>

      {card.content && (
        <motion.div custom={2} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.content} />
        </motion.div>
      )}
    </div>
  );
}
