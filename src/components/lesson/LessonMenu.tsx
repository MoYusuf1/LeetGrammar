/**
 * Lesson options — an iOS MENU, anchored to the ⋯ button.
 *
 * WAS A BOTTOM ACTION SHEET, WHICH WAS THE WRONG COMPONENT. Apple's guidance
 * splits them by who initiated: an action sheet is for choices that clarify an
 * action *you already took*, whereas "people expect a menu to appear when they
 * choose to reveal it". Tapping ⋯ is choosing to reveal. Since iOS 14 the
 * system apps have moved this kind of overflow off action sheets and onto
 * menus that open next to the button, so the eye and the thumb do not have to
 * cross the screen.
 *
 * So it opens from the top-right corner it belongs to, at menu size, rather
 * than as a full-width panel at the bottom with a Cancel button.
 *
 * Icons sit on the RIGHT. That is the iOS menu convention and it is not
 * arbitrary — labels left-align into a readable column instead of being
 * indented past a gutter of glyphs.
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookA } from 'lucide-react';

export interface LessonMenuProps {
  onClose: () => void;
  onGlossary: () => void;
}

export default function LessonMenu({ onClose, onGlossary }: LessonMenuProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Tap anywhere to dismiss. No dark scrim — a menu is not modal in the
          way a sheet is, and dimming the whole lesson to show four options
          overstates it. */}
      <button aria-label="Close menu" onClick={onClose} className="absolute inset-0" />

      <motion.div
        role="menu"
        aria-label="Lesson options"
        initial={{ opacity: 0, scale: 0.9, y: -6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 34 }}
        /* Grows out of the ⋯ button rather than appearing from nowhere. */
        style={{ transformOrigin: 'top right', top: 'calc(var(--safe-t) + 60px)' }}
        className="glass absolute right-4 w-60 overflow-hidden rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
      >
        {/* No "Leave lesson". The X in the top-left already does it, and a
            menu item duplicating a visible control is the kind of furniture
            this app keeps removing. "Print a worksheet" went the same way when
            the worksheet did — see App.tsx. One item is a short menu, not a
            broken one. */}
        <Item icon={<BookA className="h-[18px] w-[18px]" />} label="Glossary" onClick={onGlossary} first />
      </motion.div>
    </div>
  );
}

function Item({
  icon,
  label,
  onClick,
  first,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  first?: boolean;
}) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={`flex min-h-[46px] w-full items-center justify-between gap-3 px-4 py-2.5 text-left active:bg-fill ${
        first ? '' : 'border-t border-separator'
      }`}
    >
      <span className="text-callout text-label">{label}</span>
      <span className="flex-shrink-0 text-label">{icon}</span>
    </button>
  );
}
