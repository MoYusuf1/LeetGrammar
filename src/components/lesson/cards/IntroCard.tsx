/**
 * The opening prose cards — blueprint, connect, promise, payoff, predict.
 * The lesson title leads the first of them; everything else is prose.
 */

import { motion } from 'framer-motion';
import type { Card as TeachingCard } from '@/data/types';
import Prose from '../Prose';
import { stripBoxArt } from '../box-art';
import { contentStagger } from '../motion';

export default function IntroCard({
  card,
  lessonTitle,
  showTitle,
}: {
  card: TeachingCard;
  lessonTitle: string;
  showTitle: boolean;
}) {
  return (
    <div className="space-y-5">
      {showTitle && (
        <motion.h1
          custom={0}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="text-title1 font-bold text-label"
        >
          {lessonTitle}
        </motion.h1>
      )}

      {card.prompt && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.prompt} />
        </motion.div>
      )}

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={stripBoxArt(card.content)} />
        </motion.div>
      )}
    </div>
  );
}
