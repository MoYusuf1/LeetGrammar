/**
 * The teach and example cards: a real heading, then the body prose.
 */

import { motion } from 'framer-motion';
import type { Card as TeachingCard } from '@/data/types';
import Prose from '../Prose';
import { contentStagger } from '../motion';

export default function TeachCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-4">
      {/* The card's own title is a real heading now, not a grey eyebrow. */}
      {card.title && (
        <motion.h2
          custom={0}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="text-title2 font-semibold text-label"
        >
          {card.title}
        </motion.h2>
      )}

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          {/* Renders white. It rendered grey for the whole life of the previous
              version because `text-label-2` in this component's own class list
              outranked the `text-label` the caller passed — Tailwind emits
              `.text-label` first, and class strings have no specificity. */}
          <Prose text={card.content} />
        </motion.div>
      )}
    </div>
  );
}
