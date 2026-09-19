/**
 * The lesson wrap-up: title, then prose.
 */

import { motion } from 'framer-motion';
import type { Card as TeachingCard } from '@/data/types';
import Prose from '../Prose';
import { contentStagger } from '../motion';

export default function SummaryCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-5">
      <motion.h2
        custom={0}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="text-title1 font-bold text-label"
      >
        {card.title}
      </motion.h2>

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.content} />
        </motion.div>
      )}
    </div>
  );
}
