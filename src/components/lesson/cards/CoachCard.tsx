/**
 * The learning move — a reusable thinking move, not a new Somali rule. The
 * one tinted card in the flow, so it reads as a coach's aside rather than
 * as more content.
 */

import { motion } from 'framer-motion';
import type { Card as TeachingCard } from '@/data/types';
import Prose from '../Prose';
import { contentStagger } from '../motion';

export default function CoachCard({ card }: { card: TeachingCard }) {
  return (
    <motion.aside
      custom={0}
      variants={contentStagger}
      initial="hidden"
      animate="visible"
      className="learning-move rounded-2xl border border-accent/20 bg-accent/[0.08] p-5 sm:p-6"
    >
      <p className="mb-2 text-caption1 font-semibold uppercase tracking-[0.14em] text-accent">
        Learning move
      </p>
      {card.title && <h2 className="text-title2 font-semibold text-label">{card.title}</h2>}
      {card.content && (
        <div className="mt-3">
          <Prose text={card.content} />
        </div>
      )}
    </motion.aside>
  );
}
