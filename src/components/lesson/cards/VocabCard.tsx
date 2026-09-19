/**
 * The injected vocabulary deck. Not part of the authored cards — it lands
 * after the second retrieval card (design rule S5, see LessonCards) — but it
 * renders as one more card in the flow.
 */

import { motion } from 'framer-motion';
import type { VocabWord } from '@/data/vocabulary';
import Somali from '@/components/Somali';
import { contentStagger } from '../motion';

export default function VocabCard({ words, lessonTitle }: { words: VocabWord[]; lessonTitle: string }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-caption uppercase tracking-wider text-label-3">Vocabulary in context</p>
        <h2 className="mt-1 text-title2 font-semibold text-label">Words used in {lessonTitle}</h2>
        <p className="mt-2 text-subhead text-label-2">These are the words this lesson uses to carry its pattern. Read them here, then meet them again in the examples and questions.</p>
      </div>
      <motion.div
        custom={0}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="list-group"
      >
      {words.map((w) => (
        <div key={w.rank} className="list-row flex items-baseline justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <Somali size="lg">{w.somali}</Somali>
            <p className="mt-0.5 text-subhead text-label-2">{w.english}</p>
          </div>
          <span className="flex-shrink-0 text-caption2 uppercase tracking-wider text-label-3">
            {w.pos}
          </span>
        </div>
      ))}
      </motion.div>
    </div>
  );
}
