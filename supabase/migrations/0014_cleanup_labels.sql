-- Migration: 0014_cleanup_labels
-- Fixes graph_nodes.label_default values that contain raw ID prefixes.
-- Safe to re-run. Only updates rows where cleaning would change the value.

DO $$
DECLARE
  v_updated int := 0;
  rec record;
  v_cleaned text;
BEGIN
  FOR rec IN
    SELECT id, label_default
    FROM public.graph_nodes
    WHERE label_default ~ '^(concept|example|word|morpheme|rule|lesson|textbook):'
  LOOP
    -- Strip prefix: "concept:interrogative-marker" → "interrogative-marker"
    v_cleaned := regexp_replace(rec.label_default, '^(concept|example|word|morpheme|rule|lesson|textbook):', '');

    -- Replace hyphens and underscores with spaces: "interrogative-marker" → "interrogative marker"
    v_cleaned := regexp_replace(v_cleaned, '[-_]', ' ', 'g');

    -- Title case each word: "interrogative marker" → "Interrogative Marker"
    v_cleaned := initcap(v_cleaned);

    IF v_cleaned <> rec.label_default THEN
      UPDATE public.graph_nodes
      SET label_default = v_cleaned
      WHERE id = rec.id;
      v_updated := v_updated + 1;
    END IF;
  END LOOP;

  RAISE NOTICE 'Cleaned % label_default values.', v_updated;
END $$;
