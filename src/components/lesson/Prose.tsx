/**
 * Lesson body copy.
 *
 * TONE IS A PROP, NOT A CLASS YOU PASS IN. The previous version composed
 * `text-label-2` into its own class list and let callers append `text-label` to
 * override it. That never worked: Tailwind emits `.text-label` before
 * `.text-label-2`, so the dimmer rule always won no matter what order the
 * strings were in, and every teach card rendered its body in 60% grey instead
 * of white. Class strings do not have specificity — only stylesheet order does.
 *
 * BULLETS ARE RENDERED AS LISTS. The content authors them as lines beginning
 * "• ", and they used to flow as ordinary wrapped text, so a continuation line
 * ran back to the left margin and sat under its own bullet. They now hang.
 */

import RichText from '@/components/RichText';

export type ProseTone = 'primary' | 'secondary';

const TONE: Record<ProseTone, string> = {
  primary: 'text-label',
  secondary: 'text-label-2',
};

/** A line the content authored as a bullet. */
function isBullet(line: string): boolean {
  return /^\s*[•\-*]\s+/.test(line);
}

function bulletBody(line: string): string {
  return line.replace(/^\s*[•\-*]\s+/, '');
}

export default function Prose({
  text,
  tone = 'primary',
}: {
  text: string;
  tone?: ProseTone;
}) {
  const paragraphs = text.split('\n\n').filter((p) => p.trim().length > 0);

  return (
    <div className={`space-y-5 text-title3 leading-[1.45] ${TONE[tone]}`}>
      {paragraphs.map((para, i) => {
        const lines = para.split('\n');
        const bullets = lines.filter(isBullet);

        /* A paragraph that is entirely bullets becomes a list; a mixed one
           keeps its lead line above the list. */
        if (bullets.length > 0) {
          const lead = lines.filter((l) => !isBullet(l));
          return (
            <div key={i} className="space-y-2">
              {lead.length > 0 && (
                <p>
                  {lead.map((l, j) => (
                    <span key={j}>
                      <RichText text={l} />
                      {j < lead.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
              <ul className="space-y-2">
                {bullets.map((l, j) => (
                  <li key={j} className="flex gap-2.5">
                    <span aria-hidden className="flex-shrink-0 text-label-3">
                      •
                    </span>
                    <span className="min-w-0 flex-1">
                      <RichText text={bulletBody(l)} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        return (
          <p key={i}>
            {lines.map((l, j) => (
              <span key={j}>
                <RichText text={l} />
                {j < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
