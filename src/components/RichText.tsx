/**
 * Renders `**bold**` as <strong> and `*italic*` as <em>, everything else plain.
 *
 * Authored lesson content uses `**` to mark the form under discussion, which is
 * the single most important thing on the card. Without this the learner reads
 * literal asterisks. Deliberately not a full markdown parser: `**` and `*` are
 * the only markup the content uses, and text is never dangerously set.
 *
 * SINGLE ASTERISKS WERE RENDERING LITERALLY. This only handled `**`, so the 47
 * `*gloss*` spans in the course — English translations like *The boy is a
 * teacher.*, and emphasis like *is* — printed their asterisks on screen. Caught
 * by looking at a phone, not by any test, which is the whole argument for
 * CLAUDE.md's first rule.
 *
 * The alternation order below is load-bearing: `**…**` is tried before `*…*`,
 * so bold is never mis-parsed as italic wrapping a stray asterisk.
 *
 * WHY THIS IS NOT <Somali>. `**` does two jobs in the content: it marks Somali
 * forms (**waxa**, **guriga**, **-ka**) and it marks ordinary English emphasis
 * (**not**, **WHO**, **SIGNAL**, **DO** — the blueprint box labels). Since the
 * serif is reserved for Somali (see src/index.css), rendering all bold in it
 * would tell the learner that "not" is a Somali word. That is worse than the
 * emphasis being plain, so <Somali> is applied only where the data structurally
 * guarantees Somali: the `somali` field on an exercise, unscramble word banks,
 * and vocab entries.
 *
 * This lived in three copies — LessonCards, Homework and UnitTest — before it
 * lived here.
 */
export default function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*)/g).map((seg, i) => {
        if (seg.startsWith('**') && seg.endsWith('**') && seg.length > 4) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {seg.slice(2, -2)}
            </strong>
          );
        }
        // Italic carries English glosses of Somali sentences. It stays sans —
        // the serif is reserved for Somali (src/index.css), and a gloss is the
        // English, so italicising it in serif would say the opposite.
        if (seg.startsWith('*') && seg.endsWith('*') && seg.length > 2) {
          return (
            <em key={i} className="italic">
              {seg.slice(1, -1)}
            </em>
          );
        }
        return seg;
      })}
    </>
  );
}
