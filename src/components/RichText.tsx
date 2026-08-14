/**
 * Renders `**bold**` segments as <strong>, everything else as plain text.
 *
 * Authored lesson content uses `**` to mark the form under discussion, which is
 * the single most important thing on the card. Without this the learner reads
 * literal asterisks. Deliberately not a full markdown parser — `**` is the only
 * markup the content uses, and text is never dangerously set.
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
      {text.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
        seg.startsWith('**') && seg.endsWith('**') && seg.length > 4 ? (
          <strong key={i} className="font-semibold text-ink">
            {seg.slice(2, -2)}
          </strong>
        ) : (
          seg
        ),
      )}
    </>
  );
}
