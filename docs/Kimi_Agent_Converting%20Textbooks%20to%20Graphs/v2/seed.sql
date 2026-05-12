-- SOMALI GRAMMAR v2 — CLEAN NORMALIZED SEED

BEGIN;

-- ─── graph_lessons ───
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:colloquial:unit-01', 'colloquial-somali-1995', 'Unit 1', 'Greetings and Introductions', '14-16', '0.1', '30', '1', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:colloquial:unit-10', 'colloquial-somali-1995', 'Unit 10', 'Relative Clauses and waxaa Focus', '100-110', '0.6', '45', '10', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:colloquial:unit-02', 'colloquial-somali-1995', 'Unit 2', 'Good Morning', '17-20', '0.15', '25', '2', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:colloquial:unit-03', 'colloquial-somali-1995', 'Unit 3', 'Focus Markers baa and ayaa', '50-55', '0.3', '40', '3', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:colloquial:unit-04', 'colloquial-somali-1995', 'Unit 4', 'Djibouti Hotel', '30-35', '0.25', '30', '4', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:colloquial:unit-07', 'colloquial-somali-1995', 'Unit 7', 'Seasons and Negation', '50-55', '0.35', '35', '7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:colloquial:unit-08', 'colloquial-somali-1995', 'Unit 8', 'Telephone Call', '56-60', '0.4', '35', '8', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:ch7', 'zorc-iss-1990', 'Chapter 7', 'Imperative Verb Forms', '73-80', '0.3', '30', '7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:ch8', 'zorc-iss-1990', 'Chapter 8', 'Past Tense Verbs and Verbal Pronouns', '81-92', '0.35', '35', '8', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:ch-08', 'zorc-iss-1990', 'Chapter 8', 'Past Tense Verbs and Verbal Pronouns', '55-65', '0.3', '30', '8', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:chapter-12', 'zorc-somali-textbook', 'Chapter 12', 'Subject, Topic, Focus & Word Order', '107-114', '0.4', '50', '12', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:chapter-02', 'zorc-somali-textbook', 'Chapter 2', 'Basic Statements and Questions', '35-40', '0.1', '30', '2', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:chapter-04', 'zorc-somali-textbook', 'Chapter 4', 'Noun Gender: K-class and T-class', '40-55', '0.20', '25', '4', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:chapter-05', 'zorc-somali-textbook', 'Chapter 5', 'Changes Affecting Masculine Nouns', '58-63', '0.30', '30', '5', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_lessons (id, textbook_id, chapter, title, page_range, difficulty, estimated_minutes, sort_key, previous_lesson, next_lesson) VALUES ('lesson:zorc:chapter-06', 'zorc-somali-textbook', 'Chapter 6', 'Changes Affecting Feminine Nouns', '64-69', '0.30', '30', '6', NULL, NULL) ON CONFLICT (id) DO NOTHING;
-- 15

-- ─── graph_nodes ───
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:focus-marker', 'CONCEPT', 'Focus Marker', 'caláaamadda xusuusta', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"definition": "Grammatical particle that highlights or emphasizes a particular noun phrase in a sentence. Every declarative sentence in Somali requires either a focus marker or a declarative mood classifier."}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declarative-marker', 'CONCEPT', 'Declarative Marker', 'caláaamadda sheegashada', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"definition": "Particle used for positive declarative statements, the most common being waa."}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:interrogative-marker', 'CONCEPT', 'concept:interrogative-marker', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-fiicanahay', 'EXAMPLE', 'Waan fiicanahay', 'Waan fiicanahay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "I am fine", "source": "colloquial-somali-1995", "page": "14"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:wuu-cunay', 'EXAMPLE', 'Wuu cunay', 'Wuu cunay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "He ate it", "source": "colloquial-somali-1995", "page": "14"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:miyaad-baxday', 'EXAMPLE', 'Miyaad baxday?', 'Miyaad baxday?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "Did you leave?", "source": "colloquial-somali-1995", "page": "15"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:gabadhu-bariis-bay-cuntay', 'EXAMPLE', 'Gabadhu bariis bay cuntay', 'Gabadhu bariis bay cuntay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "The girl ate the rice (object-focused, the rice is what she ate)", "source": "colloquial-somali-1995", "page": "50", "focus": "bariis"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:gabadha-baa-bariiska-cuntay', 'EXAMPLE', 'Gabadha baa bariiska cuntay', 'Gabadha baa bariiska cuntay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "The girl ate the rice (subject-focused, it was the girl who ate)", "source": "colloquial-somali-1995", "page": "51", "focus": "gabadha"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:inanka-baa-koobka-jabiyay', 'EXAMPLE', 'Inanka baa koobka jabiyay', 'Inanka baa koobka jabiyay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "The boy broke the cup", "source": "colloquial-somali-1995", "page": "51", "focus": "inanka"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ninkaa-tagay', 'EXAMPLE', 'Ninkaa tagay', 'Ninkaa tagay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "The man went (contracted from Ninka baa tagay)", "source": "colloquial-somali-1995", "page": "52", "focus": "ninka", "note": "Demonstrates baa contraction"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:qolka-waxaan-u-galay', 'EXAMPLE', 'Qolka waxaan u galay aan helo shandadayda', 'Qolka waxaan u galay aan helo shandadayda', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "I entered the room in order to find my suitcase", "source": "colloquial-somali-1995", "page": "103", "focus": "qolka"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waa-nabad', 'EXAMPLE', 'Waa nabad', 'Waa nabad', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "It is peace / I am fine", "source": "zorc-somali-textbook", "page": "35", "note": "Basic declarative with waa"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ma-nabad-baa', 'EXAMPLE', 'Ma nabad baa?', 'Ma nabad baa?', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "Is it peace? / How are you?", "source": "zorc-somali-textbook", "page": "35", "note": "Question with ma...baa pattern"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:hilibka-baan-cuney', 'EXAMPLE', 'Hilibka baan cuney', 'Hilibka baan cuney', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "I ate the meat (object-focused)", "source": "zorc-somali-textbook", "page": "111", "focus": "hilibka"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:naagtii-baa-tagtey', 'EXAMPLE', 'Naagtii baa tagtey', 'Naagtii baa tagtey', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "It was the woman who left (subject-focused)", "source": "zorc-somali-textbook", "page": "114", "focus": "naagtii"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ninkii-naagtii-buu-arkey', 'EXAMPLE', 'Ninkii naagtii buu arkey', 'Ninkii naagtii buu arkey', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "It was the woman whom the man saw (object-focused)", "source": "zorc-somali-textbook", "page": "113", "focus": "naagtii", "note": "buu = baa + uu for object focus"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:wiilka-baa-shimbirta-diley', 'EXAMPLE', 'Wiilka baa shimbirta diley', 'Wiilka baa shimbirta diley', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "It was the boy who killed the bird (subject-focused)", "source": "zorc-somali-textbook", "page": "113", "focus": "wiilka"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waxaan-u-galay', 'EXAMPLE', 'Waxaan u galay', 'Waxaan u galay', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"english": "I entered it (for a purpose)", "source": "colloquial-somali-1995", "page": "103"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:waa-obligatory', 'RULE', 'WAA is obligatory', 'waa waa looma baahnaa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"description": "Every positive declarative sentence must have waa or a focus marker. Without it, the sentence is incorrect.", "source": "colloquial-somali-1995", "page": "14"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:baa-subject-absolutive', 'RULE', 'Subject focus uses absolutive case', 'xusuusta falgaliyaha waxay isticmaashaa xaaladda qummaysan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"description": "When the subject is focused with baa/ayaa, the subject noun must be in the absolutive case (not subject case with -u).", "source": "colloquial-somali-1995", "page": "51"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:baa-no-subject-marker', 'RULE', 'No subject marker with baa', 'caláaamad falgaliye ma laha baa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"description": "When the subject is focused with baa alone (subject focus), the verbal subject pronoun is NOT used with the focus marker.", "source": "zorc-somali-textbook", "page": "114"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:object-focus-derived-forms', 'RULE', 'Object focus uses derived forms', 'xusuusta ujeeddada waxay isticmaashaa noocyada ka soo jeeda', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"description": "If focus is on the object, a derived form of baa is used (buu, bey, baan, baad, etc.). If focus is on the subject, baa is used alone.", "source": "zorc-somali-textbook", "page": "113"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:baa-ayaa-interchangeable', 'RULE', 'baa and ayaa are interchangeable', 'baa iyo ayaa isku beddeli karaan', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{"description": "The focus markers baa and ayaa are used in exactly the same way with no difference in meaning.", "source": "colloquial-somali-1995", "page": "50"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:waa', 'WORD', 'waa', 'waa', NULL, 'particle', NULL, NULL, NULL, NULL, NULL, '{"function": "declarative mood classifier"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:baa', 'WORD', 'baa', 'baa', NULL, 'particle', NULL, NULL, NULL, NULL, NULL, '{"function": "focus marker"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:ayaa', 'WORD', 'ayaa', 'ayaa', NULL, 'particle', NULL, NULL, NULL, NULL, NULL, '{"function": "focus marker"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:ma', 'WORD', 'ma', 'ma', NULL, 'particle', NULL, NULL, NULL, NULL, NULL, '{"function": "interrogative/negative marker"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:verb-conjugation', 'CONCEPT', 'verb conjugation', NULL, 'system of verb inflection for person, gender, number, and tense', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "verb-morphology", "source": "both-textbooks"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:past-tense', 'CONCEPT', 'past tense', 'waqti gudud', 'simple past tense for completed actions', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "tense", "conjugation": "1-2-3", "source": "both-textbooks"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:present-habitual', 'CONCEPT', 'present habitual', NULL, 'general present tense for regular/habitual actions', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "tense", "aka": "general-present"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:present-progressive', 'CONCEPT', 'present progressive', 'hadda-wada', 'ongoing actions in present (-ayaa/-aysaa)', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "tense-aspect", "suffix": "-ayaa"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:future-tense', 'CONCEPT', 'future tense', 'mustaqbal', 'future actions using doon auxiliary', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "tense", "auxiliary": "doon"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:negative-past', 'CONCEPT', 'negative past', NULL, 'negation of past tense with ma...-in', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "negation", "marker": "ma", "suffix": "-in"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:negative-present', 'CONCEPT', 'negative present', NULL, 'negation of present tense with ma...-o', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "negation", "marker": "ma", "ending": "-o"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:negative-imperative', 'CONCEPT', 'negative imperative', NULL, 'prohibitive command (ha + infinitive)', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "mood", "prefix": "ha", "usage": "commands"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:optative-mood', 'CONCEPT', 'optative mood', NULL, 'wish/desire expressed with -to/-tee', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "mood", "suffixes": "-to,-tee"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:past-habitual', 'CONCEPT', 'past habitual', NULL, 'used to (habitual past with jir auxiliary)', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "tense-aspect", "auxiliary": "jir"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:past-progressive', 'CONCEPT', 'past progressive', NULL, 'ongoing actions in the past', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "tense-aspect", "pattern": "progressive-marker-plus-past-endings"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:infinitive', 'CONCEPT', 'infinitive', NULL, 'verb form ending in -i, used with auxiliaries', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "verb-form", "suffix": "-i"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:keenay', 'MORPHEME', 'keenay', 'keenay', 'brought (1SG/3SG.M past)', NULL, NULL, FALSE, NULL, NULL, NULL, '{"root": "keen", "person": "1sg/3sg.m", "tense": "past"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ay', 'MORPHEME', '-ay', '-ay', 'past tense suffix (1SG/3SG.M)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "past", "person": "1sg/3sg.m", "alt_form": "-ey"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-tay', 'MORPHEME', '-tay', '-tay', 'past tense suffix (2SG/3SG.F)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "past", "person": "2sg/3sg.f"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-nay', 'MORPHEME', '-nay', '-nay', 'past tense suffix (1PL)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "past", "person": "1pl"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-teen', 'MORPHEME', '-teen', '-teen', 'past tense suffix (2PL)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "past", "person": "2pl"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-een', 'MORPHEME', '-een', '-een', 'past tense suffix (3PL)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "past", "person": "3pl"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-aa', 'MORPHEME', '-aa', '-aa', 'present habitual suffix', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "present-habitual"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ayaa', 'MORPHEME', '-ayaa', '-ayaa', 'present progressive suffix (1SG/3SG.M)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "present-progressive", "person": "1sg/3sg.m", "component": "ay+aa"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-aysaa', 'MORPHEME', '-aysaa', '-aysaa', 'present progressive suffix (2SG/3SG.F)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "present-progressive", "person": "2sg/3sg.f", "component": "ay+s+aa"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-aynaa', 'MORPHEME', '-aynaa', '-aynaa', 'present progressive suffix (1PL)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "present-progressive", "person": "1pl"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-aysaan', 'MORPHEME', '-aysaan', '-aysaan', 'present progressive suffix (2PL)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "present-progressive", "person": "2pl"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ayaan', 'MORPHEME', '-ayaan', '-ayaan', 'present progressive suffix (3PL)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"tense": "present-progressive", "person": "3pl"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:doon', 'MORPHEME', 'doon', 'doon', 'future auxiliary; also to want', NULL, NULL, FALSE, NULL, NULL, NULL, '{"function": "future-auxiliary", "position": "follows-infinitive"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:ha', 'MORPHEME', 'ha', 'ha', 'negative imperative prefix (do not!)', NULL, NULL, FALSE, NULL, NULL, NULL, '{"function": "prohibitive", "position": "pre-verbal"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-to', 'MORPHEME', '-to', '-to', 'optative suffix (wish/desire)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"mood": "optative", "alt_form": "-tee"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:jir', 'MORPHEME', 'jir', 'jir', 'past habitual auxiliary; also to exist/be in a place', NULL, NULL, FALSE, NULL, NULL, NULL, '{"function": "past-habitual-auxiliary", "position": "follows-infinitive", "tense": "general-past"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:ma-neg', 'MORPHEME', 'ma', 'ma', 'negative particle (with verb negation forms)', NULL, NULL, FALSE, 'negative', NULL, NULL, '{"function": "negation"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-in', 'MORPHEME', '-in', '-in', 'negative past verb ending', NULL, NULL, TRUE, NULL, NULL, NULL, '{"function": "negative-past", "note": "same for all persons"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-o', 'MORPHEME', '-o', '-o', 'negative present verb ending', NULL, NULL, TRUE, NULL, NULL, NULL, '{"function": "negative-present"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:waan', 'MORPHEME', 'waan', 'waan', 'declarative + I (waa+aan)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"fusion": "waa+aan", "person": "1sg"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:wuu', 'MORPHEME', 'wuu', 'wuu', 'declarative + he (waa+uu)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"fusion": "waa+uu", "person": "3sg.m"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:way', 'MORPHEME', 'way', 'way', 'declarative + she/they (waa+ay)', NULL, NULL, TRUE, NULL, NULL, NULL, '{"fusion": "waa+ay", "person": "3sg.f/3pl"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:keen', 'WORD', 'keen', 'keen', 'to bring', NULL, NULL, NULL, NULL, NULL, NULL, '{"root": "keen", "conjugation": 1, "transitive": true}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:tag', 'WORD', 'tag', 'tag', 'to go', NULL, NULL, NULL, NULL, NULL, NULL, '{"root": "tag", "conjugation": 1, "intransitive": true}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:cun', 'WORD', 'cun', 'cun', 'to eat', NULL, NULL, NULL, NULL, NULL, NULL, '{"root": "cun", "conjugation": 1, "transitive": true}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:akhri', 'WORD', 'akhri', 'akhri', 'to read', NULL, NULL, NULL, NULL, NULL, NULL, '{"root": "akhri", "conjugation": 1, "ends_in_i": true, "transitive": true}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:dhis', 'WORD', 'dhis', 'dhis', 'to build', NULL, NULL, NULL, NULL, NULL, NULL, '{"root": "dhis", "conjugation": 1, "transitive": true}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:qor', 'WORD', 'qor', 'qor', 'to write', NULL, NULL, NULL, NULL, NULL, NULL, '{"root": "qor", "conjugation": 1, "transitive": true}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:past-tense-conjugation-1', 'RULE', 'past tense conjugation 1', NULL, 'general past tense formed by adding endings to imperative stem', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "stem + past-ending", "endings": "-ay,-tay,-nay,-teen,-een", "source": "colloquial-somali-1995", "page": "18"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:present-progressive-formation', 'RULE', 'present progressive formation', NULL, 'basic verb + progressive marker -ay- + present endings', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "stem + -ay- + present-ending", "source": "colloquial-somali-1995", "page": "30"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:future-doon-auxiliary', 'RULE', 'future with doon auxiliary', NULL, 'infinitive + doon in general present tense', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "infinitive + doon-conjugated", "auxiliary": "doon", "source": "colloquial-somali-1995", "page": "109"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:past-habitual-jir', 'RULE', 'past habitual with jir', NULL, 'infinitive + jir in general past tense', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "infinitive + jir-past", "auxiliary": "jir", "source": "colloquial-somali-1995", "page": "110"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:negative-imperative-ha', 'RULE', 'negative imperative with ha', NULL, 'ha + infinitive + -n (conj1) or ha + infinitive (conj2/3)', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "ha + infinitive[-n]", "source": "colloquial-somali-1995", "page": "111"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:negative-past-ma-in', 'RULE', 'negative past with ma...-in', NULL, 'ma + negative verb form (-in ending), same for all persons', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "ma + verb-in", "source": "colloquial-somali-1995", "page": "112"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:negative-present-ma-o', 'RULE', 'negative present with ma...-o', NULL, 'change -aa to -o, with sound changes preserved', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "ma + verb-o", "source": "colloquial-somali-1995", "page": "123"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:optative-formation', 'RULE', 'optative formation', NULL, 'verb stem + -to/-tee for wishes/desires (let us...)', NULL, NULL, NULL, NULL, NULL, NULL, '{"suffixes": "-to,-tee", "source": "colloquial-somali-1995", "page": "46"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-keenay', 'EXAMPLE', 'Waan keenay.', 'Waan keenay.', 'I brought it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "person": "1sg", "tense": "past", "page": "18", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waad-keentay', 'EXAMPLE', 'Waad keentay.', 'Waad keentay.', 'You (sg.) brought it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "person": "2sg", "tense": "past", "page": "18", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:wuu-keenay', 'EXAMPLE', 'Wuu keenay.', 'Wuu keenay.', 'He brought it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "person": "3sg.m", "tense": "past", "page": "18", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:way-keentay', 'EXAMPLE', 'Way keentay.', 'Way keentay.', 'She brought it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "person": "3sg.f", "tense": "past", "page": "18", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waannu-keennay', 'EXAMPLE', 'Waannu keennay.', 'Waannu keennay.', 'We brought it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "person": "1pl", "tense": "past", "page": "18", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waydin-keenteen', 'EXAMPLE', 'Waydin keenteen.', 'Waydin keenteen.', 'You (pl.) brought it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "person": "2pl", "tense": "past", "page": "18", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:way-keeneen', 'EXAMPLE', 'Way keeneen.', 'Way keeneen.', 'They brought it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "person": "3pl", "tense": "past", "page": "18", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-cunayaa', 'EXAMPLE', 'Waan cunayaa.', 'Waan cunayaa.', 'I am eating it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "cun", "tense": "present-progressive", "page": "30", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:way-ka-baxaysaa', 'EXAMPLE', 'Way ka baxaysaa.', 'Way ka baxaysaa.', 'She is leaving.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "bax", "tense": "present-progressive", "page": "30", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-akhriyayaa', 'EXAMPLE', 'Waan akhriyayaa.', 'Waan akhriyayaa.', 'I am reading.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "akhri", "tense": "present-progressive", "page": "30", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waynu-akhriyaynaa', 'EXAMPLE', 'Waynu akhriyaynaa.', 'Waynu akhriyaynaa.', 'We are reading.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "akhri", "tense": "present-progressive", "page": "30", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-helidoonaa', 'EXAMPLE', 'Waan heli doonaa.', 'Waan heli doonaa.', 'I will find it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "hel", "tense": "future", "page": "109", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:wuu-tegidoonaa', 'EXAMPLE', 'Wuu tegi doonaa.', 'Wuu tegi doonaa.', 'He will go.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "tag", "tense": "future", "page": "109", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-joogidoonaa', 'EXAMPLE', 'Toddobaad keliya baan joogi doonaa.', 'Toddobaad keliya baan joogi doonaa.', 'I will stay only one week.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "joog", "tense": "future", "page": "107", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-barajiray', 'EXAMPLE', 'Waan baran jiray.', 'Waan baran jiray.', 'I used to learn it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "bar", "tense": "past-habitual", "page": "110", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:wuu-tegijiray', 'EXAMPLE', 'Wuu tegi jiray.', 'Wuu tegi jiray.', 'He used to go.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "tag", "tense": "past-habitual", "page": "110", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waydin-karinjirteen', 'EXAMPLE', 'Waydin karin jirteen.', 'Waydin karin jirteen.', 'You (pl.) used to cook it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "kar", "tense": "past-habitual", "page": "110", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ha-keenin', 'EXAMPLE', 'Ha keenin!', 'Ha keenin!', 'Do not bring it! (sg.)', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "mood": "negative-imperative", "page": "111", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ha-tegin', 'EXAMPLE', 'Ha tegin!', 'Ha tegin!', 'Do not go! (sg.)', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "tag", "mood": "negative-imperative", "page": "111", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ha-keenina', 'EXAMPLE', 'Ha keenina!', 'Ha keenina!', 'Do not bring it! (pl.)', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "mood": "negative-imperative", "number": "plural", "page": "111", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:maan-cunin', 'EXAMPLE', 'Maan cunin.', 'Maan cunin.', 'I did not eat it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "cun", "tense": "negative-past", "page": "112", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ma-qabin', 'EXAMPLE', 'Ma qabin.', 'Ma qabin.', 'He/she did not catch it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "qab", "tense": "negative-past", "page": "112", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:maan-keeno', 'EXAMPLE', 'Maan keeno.', 'Maan keeno.', 'I do not bring it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "keen", "tense": "negative-present", "page": "123", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:maynu-tagne', 'EXAMPLE', 'Maynu tagne.', 'Maynu tagne.', 'We do not go.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "tag", "tense": "negative-present", "page": "123", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:aynu-gallo', 'EXAMPLE', 'Haa aynu gallo.', 'Haa aynu gallo.', 'Yes, let us enter.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "gal", "mood": "optative", "page": "46", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:zorc-cuntada-waan-cuney', 'EXAMPLE', 'Cuntada waan cuney.', 'Cuntada waan cuney.', 'I ate the food.', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "cun", "tense": "past", "page": "94", "source": "zorc-iss-1990"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:zorc-muqdisho-maan-tagey', 'EXAMPLE', 'Muqdisho maan tagey?', 'Muqdisho maan tagey?', 'Did I go to Mogadishu?', NULL, NULL, NULL, NULL, NULL, NULL, '{"verb": "tag", "tense": "past", "mood": "interrogative", "page": "94", "source": "zorc-iss-1990"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:noun-gender', 'CONCEPT', 'Noun Gender', 'noocka lab iyo dhedig', 'grammatical gender system (masculine/feminine)', NULL, NULL, NULL, NULL, NULL, NULL, '{"gender_type": "grammatical", "values": ["masculine", "feminine"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:k-class', 'CONCEPT', 'K-class nouns', 'nooc-k-ka lab', 'masculine nouns taking article suffix beginning with -k', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"article_consonant": "k"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:t-class', 'CONCEPT', 'T-class nouns', 'nooc-t-ka dhedig', 'feminine nouns taking article suffix beginning with -t', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"article_consonant": "t"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:definite-article', 'CONCEPT', 'Definite Article', 'magaca guud', 'suffix marking definite nouns: -ka/-ta and variants', NULL, NULL, NULL, NULL, NULL, NULL, '{"forms": ["-ka", "-ta", "-kii", "-tii"], "function": "marks definiteness and new/known information"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:indefinite-article', 'CONCEPT', 'Indefinite Article (bare noun)', 'magaca aan guud ahayn', 'bare noun without article suffix indicates indefiniteness', NULL, NULL, NULL, NULL, NULL, NULL, '{"form": "bare noun", "function": "marks indefiniteness, new information"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:plural-formation', 'CONCEPT', 'Plural Formation', 'tirka badan', 'multiple strategies for forming noun plurals', NULL, NULL, NULL, NULL, NULL, NULL, '{"suffixes": ["-o", "-yo"], "other_strategies": ["consonant gemination", "consonant mutation", "vowel deletion"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:genitive-case', 'CONCEPT', 'Genitive Case', 'xaaladda leeyid', 'possessive construction indicating ownership or association', NULL, NULL, NULL, NULL, NULL, NULL, '{"form": "stress-tone on final vowel", "function": "indicates possession", "special_suffixes": ["-eed", "-yeéd", "-od", "-aad"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:possessive-suffix', 'CONCEPT', 'Possessive Suffix', 'dhibcoodka leeyidka', 'suffix attached to possessed noun indicating possessor', NULL, NULL, NULL, NULL, NULL, NULL, '{"structure": "possessive_suffix + definite_article", "persons": ["1st", "2nd", "3rd"], "numbers": ["singular", "plural"], "types": ["long_form_with_article", "short_form_without_article"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:vowel-harmony', 'CONCEPT', 'Vowel Harmony', 'isku-dhafka dhawaaqyada', 'vowel assimilation affecting noun suffixes', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "root_final_vowel matches suffix vowel", "affects": ["definite_article", "demonstratives", "possessive_suffixes"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:demonstrative', 'CONCEPT', 'Demonstratives', 'tusmooyinka', 'proximal/distal demonstrative suffixes', NULL, NULL, NULL, NULL, NULL, NULL, '{"masculine": ["-kan", "-kaa", "-kaas", "-kéer"], "feminine": ["-tan", "-taa", "-taas", "-téer"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-system', 'CONCEPT', 'Noun Declensions', 'noocyada magacyada', 'eight declension classes grouping nouns by plural formation, gender, and tone', NULL, NULL, NULL, NULL, NULL, NULL, '{"count": 8, "criteria": ["plural_formation", "gender_singular", "gender_plural", "stress_tone"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:absolutive-case', 'CONCEPT', 'Absolutive Case', 'xaaladda bure', 'default citation form used for objects and with prepositions', NULL, NULL, NULL, NULL, NULL, NULL, '{"form": "citation form", "use": "direct/indirect objects, with prepositions"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:subject-case', 'CONCEPT', 'Subject Case', 'xaaladda fal-celinta', 'case marking the grammatical subject of a sentence', NULL, NULL, NULL, NULL, NULL, NULL, '{"form": "no stress-tone; feminine -i suffix", "use": "subject of sentence"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ka', 'MORPHEME', '-ka', '-ka', 'definite article (masculine, absolutive, new information)', NULL, 'masculine', NULL, 'neutral', NULL, NULL, '{"case": "absolutive", "definiteness": "new_info"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ta', 'MORPHEME', '-ta', '-ta', 'definite article (feminine, absolutive, new information)', NULL, 'feminine', NULL, 'neutral', NULL, NULL, '{"case": "absolutive", "definiteness": "new_info"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ga', 'MORPHEME', '-ga', '-ga', 'article allomorph (masculine, after vowels g/i/w/y)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"allomorph_type": "vowel_assimilation", "trigger": "preceding sound g/i/w/y"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ha', 'MORPHEME', '-ha', '-ha', 'article allomorph (masculine, after vowels e/o and for relatives/body parts)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"allomorph_type": "vowel_assimilation", "trigger": "preceding vowel e or o"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-da', 'MORPHEME', '-da', '-da', 'feminine article allomorph (after vowels o/i and consonants d/h/kh/x/w/y)', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"allomorph_type": "consonant_assimilation", "trigger": "preceding vowel o/i or consonants d/h/kh/x/w/y/glottal_stop"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-i', 'MORPHEME', '-i', '-i', 'genitive marker / possessive construction marker', NULL, NULL, NULL, NULL, NULL, NULL, '{"function": "genitive_case", "uses": ["genitive_construction", "causative_verb"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-e', 'MORPHEME', '-e', '-e', 'feminine genitive marker, also noun ending', NULL, NULL, NULL, NULL, NULL, NULL, '{"function": "feminine_genitive", "use_with": "feminine nouns not ending in -o"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-eed', 'MORPHEME', '-eed', '-eed', '3rd person possessive suffix (feminine possessor)', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"function": "possessive_suffix", "person": "3rd"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-ayga', 'MORPHEME', '-ayga', '-ayga', '1st person possessive suffix (masculine possessed noun)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"function": "possessive_suffix", "person": "1st", "form": "long (with article)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-kii', 'MORPHEME', '-kii', '-kii', 'definite article (masculine, known/referred information)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"case": "absolutive", "definiteness": "known_info"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-tii', 'MORPHEME', '-tii', '-tii', 'definite article (feminine, known/referred information)', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"case": "absolutive", "definiteness": "known_info"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-kan', 'MORPHEME', '-kan', '-kan', 'demonstrative suffix: this (masculine, proximal)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"proximity": "proximal", "type": "demonstrative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-tan', 'MORPHEME', '-tan', '-tan', 'demonstrative suffix: this (feminine, proximal)', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"proximity": "proximal", "type": "demonstrative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-kaas', 'MORPHEME', '-kaas', '-kaas', 'demonstrative suffix: that (masculine, distal near)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"proximity": "distal_near", "type": "demonstrative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:-taas', 'MORPHEME', '-taas', '-taas', 'demonstrative suffix: that (feminine, distal near)', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"proximity": "distal_near", "type": "demonstrative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:bariis', 'WORD', 'bariis', 'bariis', 'rice', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"declension": 2, "noun_type": "mass"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:caano', 'WORD', 'caano', 'caano', 'milk', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"declension": 1, "noun_type": "collective"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:naag', 'WORD', 'naag', 'naag', 'woman', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"declension": 1, "plural": "naago", "plural_gender": "masculine"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:nin', 'WORD', 'nin', 'nin', 'man', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"declension": 4, "plural": "niman"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:guri', 'WORD', 'guri', 'guri', 'house', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"declension": 1, "plural": "guriyo"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:subax', 'WORD', 'subax', 'subax', 'morning', NULL, 'feminine', NULL, NULL, NULL, NULL, '{"declension": 2}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:habeen', 'WORD', 'habeen', 'habeen', 'night', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"declension": 2}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:geel', 'WORD', 'geel', 'geel', 'camel (collective)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"declension": "collective", "noun_type": "collective"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:guriga-waa-tegey', 'EXAMPLE', 'Guriga wuu tegey.', 'Guriga wuu tegey.', 'He went to the house.', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "definite_article_masculine", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:naago-naagaha', 'EXAMPLE', 'naago / naagaha', 'naago / naagaha', 'women / the women', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "plural_formation_and_definite_article", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:buuggii-waan-akhriyay', 'EXAMPLE', 'Buuggii waan akhriyay.', 'Buuggii waan akhriyay.', 'I read the book. (-kii = known/past)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "definite_article_known_info", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:dukaanka-waan-tagayaa', 'EXAMPLE', 'Dukaanka waan tagayaa.', 'Dukaanka waan tagayaa.', 'I am going to the shop. (-ka = new/present)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "definite_article_new_info", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:buuggii-maxamed', 'EXAMPLE', 'Buuggii Maxamed', 'Buuggii Maxamed', 'Maxamed''s book (genitive construction)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "genitive_case", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:xanuun-lugeed', 'EXAMPLE', 'xanuun lugeed', 'xanuun lugeed', 'foot pain (genitive with -eéd suffix)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "genitive_suffix_eed", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:nin-ka-nin', 'EXAMPLE', 'nin / nin-ka', 'nin / nin-ka', 'a man / the man (k-class)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "k_class_noun", "source": "zorc"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:naag-ta-naag', 'EXAMPLE', 'naag / naag-ta', 'naag / naag-ta', 'a woman / the woman (t-class)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "t_class_noun", "source": "zorc"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:guri-ka-guriga', 'EXAMPLE', 'guri / guri-ka / guriga', 'guri / guri-ka / guriga', 'house / the house (article change: k>g after i)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "article_allomorph_ka_to_ga", "source": "zorc"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:bare-ka-baraha', 'EXAMPLE', 'bare / baraha', 'bare / baraha', 'teacher / the teacher (article change: k>h after e)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "article_allomorph_ka_to_ha", "source": "zorc"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:saaxiibkayga', 'EXAMPLE', 'saaxiibkayga', 'saaxiibkayga', 'my friend (possessive suffix -ayga)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "possessive_suffix_1st_person", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:magacaygu-waa-rooble', 'EXAMPLE', 'Magacaygu waa Rooble.', 'Magacaygu waa Rooble.', 'My name is Rooble. (possessive suffix in subject case)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "possessive_suffix_subject_case", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ninkay-iyo-caruurtay', 'EXAMPLE', 'Ninkay iyo caruurtay', 'Ninkay iyo caruurtay', 'My husband and my children (short possessive for relatives)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "possessive_suffix_short_form_relatives", "source": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:naag-waa-tan', 'EXAMPLE', 'Naagtii waa tan.', 'Naagtii waa tan.', 'The woman is here. (demonstrative: feminine proximal)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "demonstrative_feminine", "source": "zorc"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:bare-waa-kan', 'EXAMPLE', 'Kani waa bare.', 'Kani waa bare.', 'This is a teacher. (demonstrative: masculine proximal)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "demonstrative_masculine", "source": "zorc"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:macallinkii-waa-kaas', 'EXAMPLE', 'Macallinkii waa kaas.', 'Macallinkii waa kaas.', 'The teacher is that one. (demonstrative: masculine distal)', NULL, NULL, NULL, NULL, NULL, NULL, '{"topic": "demonstrative_masculine_distal", "source": "zorc"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:article-allomorph-ka-to-ga', 'RULE', 'Article: -ka becomes -ga', '-ka waxay noqonaysaa -ga', 'Masculine article -ka changes to -ga after g, i, w, y', NULL, NULL, NULL, NULL, NULL, NULL, '{"trigger": "preceding sound is g, i, w, or y", "change": "k > g", "example": "guri+ka > guriga"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:article-allomorph-ka-to-ha', 'RULE', 'Article: -ka becomes -ha', '-ka waxay noqonaysaa -ha', 'Masculine article -ka changes to -h after vowels e, o; final vowel changes to match suffix vowel', NULL, NULL, NULL, NULL, NULL, NULL, '{"trigger": "preceding vowel is e or o", "change": "k > h; root vowel changes to match suffix", "example": "bare+ka > baraha"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:article-allomorph-ka-to-zero', 'RULE', 'Article: -ka disappears after gutturals', '-ka way iska tagtaa ka dib xarafka c, h, q, kh, x', 'Masculine article -k is lost after guttural consonants c, h, q, kh, x', NULL, NULL, NULL, NULL, NULL, NULL, '{"trigger": "preceding consonant is c, h, q, kh, or x", "change": "k > zero", "example": "madax+ka > madaxa"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:article-allomorph-ta-to-da', 'RULE', 'Article: -ta becomes -da', '-ta waxay noqonaysaa -da', 'Feminine article -ta changes to -da after vowels o/i and consonants d, h, kh, x, w, y, glottal stop', NULL, NULL, NULL, NULL, NULL, NULL, '{"trigger": "preceding vowel o/i or consonants d/h/kh/x/w/y/glottal_stop", "change": "t > d", "example": "cunto+ta > cuntada, subax+ta > subaxda"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:plural-o-suffix', 'RULE', 'Plural: add -o suffix', 'tirka badan: -o', 'Form plural by adding -o (declensions 1, 2, 3)', NULL, NULL, NULL, NULL, NULL, NULL, '{"applies_to": "declensions 1, 2, 3", "suffix": "-o", "sound_changes": ["-i > -yo", "guttural+yo", "consonant gemination for b/d/dh/r/l/n/m"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:possessive-suffix-formation', 'RULE', 'Possessive suffix formation', 'dhibcoodka leeyidka', 'Possessive suffix = possessive pronoun base + definite article (-ka/-ta/-kii/-tii)', NULL, NULL, NULL, NULL, NULL, NULL, '{"structure": "possessive_base + definite_article", "short_forms": "no article for relatives and body parts", "case_variants": "absolutive -a / subject -u / known -ii"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('lesson:colloquial:unit-03', 'LESSON', 'Unit 3: Noun Declensions', 'Qodobka 3: Noocyada Magacyada', 'Nouns in Somali: gender, declensions, plural formation', NULL, NULL, NULL, NULL, NULL, NULL, '{"textbook": "colloquial-somali-1995", "page_range": "21-35", "topics": ["noun_gender", "declensions", "plural_formation"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('lesson:colloquial:unit-04', 'LESSON', 'Unit 4: Definite Article and Cases', 'Qodobka 4: Magaca Guud iyo Xaaladaha', 'Definite article, cases, genitive, possessive suffixes', NULL, NULL, NULL, NULL, NULL, NULL, '{"textbook": "colloquial-somali-1995", "page_range": "37-45,71-73", "topics": ["definite_article", "cases", "genitive", "possessive_suffixes"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('lesson:zorc:chapter-04', 'LESSON', 'Chapter 4: Noun Gender (K-class and T-class)', 'Qodobka 4: Nooc-k-ka iyo Nooc-t-ka', 'Somali nouns and grammatical gender: masculine (k-class) and feminine (t-class)', NULL, NULL, NULL, NULL, NULL, NULL, '{"textbook": "zorc-somali-textbook", "page_range": "40-55", "topics": ["noun_gender", "k_class", "t_class", "article_allomorphs"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('lesson:zorc:chapter-05', 'LESSON', 'Chapter 5: Changes Affecting Masculine Nouns', 'Qodobka 5: Isbeddelada Nooc-k-ka Lab', 'Sound changes with masculine article -ka/-kii', NULL, NULL, NULL, NULL, NULL, NULL, '{"textbook": "zorc-somali-textbook", "page_range": "58-63", "topics": ["article_allomorphs", "vowel_harmony", "consonant_assimilation"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('lesson:zorc:chapter-06', 'LESSON', 'Chapter 6: Changes Affecting Feminine Nouns', 'Qodobka 6: Isbeddelada Nooc-t-ka Dhedig', 'Sound changes with feminine article -ta/-tii', NULL, NULL, NULL, NULL, NULL, NULL, '{"textbook": "zorc-somali-textbook", "page_range": "64-69", "topics": ["article_allomorphs_feminine", "vowel_harmony", "consonant_assimilation"]}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:sov-word-order', 'CONCEPT', 'SOV Word Order', NULL, 'Subject-Object-Verb word order', NULL, NULL, NULL, NULL, NULL, NULL, '{"language": "Somali", "order": "SOV"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:subject-clitic', 'CONCEPT', 'Subject Clitic', NULL, 'Bound pronominal subject markers that attach to mood classifiers', NULL, NULL, NULL, NULL, NULL, NULL, '{"examples": "waan, waad, wuu, way, waannu, weynu, weydin"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:object-clitic', 'CONCEPT', 'Object Clitic', NULL, 'Bound pronominal object markers (i, ku, ka, la, na, idin)', NULL, NULL, NULL, NULL, NULL, NULL, '{"position": "preverbal", "usage": "direct/indirect object"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:cliticization', 'CONCEPT', 'Cliticization', NULL, 'Process by which bound morphemes attach to host words', NULL, NULL, NULL, NULL, NULL, NULL, '{"applies_to": "pronouns, prepositions, directional particles", "host": "verb or classifier"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:preverbal-preposition', 'CONCEPT', 'Preverbal Preposition', NULL, 'Prepositions that occur before the verb: u, ku, ka, la', NULL, NULL, NULL, NULL, NULL, NULL, '{"position": "immediately before verb", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:directional-particle', 'CONCEPT', 'Directional Particle', NULL, 'Directional particles indicating motion toward/away from speaker', NULL, NULL, NULL, NULL, NULL, NULL, '{"hither": "soo (toward speaker)", "thither": "sii (away from speaker)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:preposition-fusion', 'CONCEPT', 'Preposition Fusion', NULL, 'Fusion of preposition + object pronoun into single form', NULL, NULL, NULL, NULL, NULL, NULL, '{"examples": "kuula (ku+u+la), loola (la+u+la), kugu (ku+ku), kaga (ka+ka), ii (i+u)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:independent-pronoun', 'CONCEPT', 'Independent Pronoun', NULL, 'Standalone pronouns used for emphasis or disambiguation', NULL, NULL, NULL, NULL, NULL, NULL, '{"forms": "aniga, adiga, isaga, iyaga", "usage": "emphasis, contrast"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:uu', 'MORPHEME', 'uu', 'uu', '3sg masculine subject clitic', NULL, 'masculine', TRUE, 'positive', NULL, NULL, '{"person": "3", "number": "singular"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:ay', 'MORPHEME', 'ay', 'ay', '3sg feminine / 3pl subject clitic', NULL, 'feminine', TRUE, 'positive', NULL, NULL, '{"person": "3", "number": "singular/plural"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:waad', 'MORPHEME', 'waad', 'waad', '2sg positive declarative clitic', NULL, NULL, TRUE, 'positive', NULL, NULL, '{"person": "2", "number": "singular", "fused": "waa + aad"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:u', 'MORPHEME', 'u', 'u', 'preposition: to, for', NULL, NULL, TRUE, NULL, NULL, NULL, '{"position": "preverbal", "gloss": "to, for (dative)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:ku', 'MORPHEME', 'ku', 'ku', 'preposition: in, at, by means of', NULL, NULL, TRUE, NULL, NULL, NULL, '{"position": "preverbal", "gloss": "in, at, with (instrumental)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:ka', 'MORPHEME', 'ka', 'ka', 'preposition: from, about', NULL, NULL, TRUE, NULL, NULL, NULL, '{"position": "preverbal", "gloss": "from, about (ablative)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:la', 'MORPHEME', 'la', 'la', 'preposition: with; impersonal pronoun: one', NULL, NULL, TRUE, NULL, NULL, NULL, '{"position": "preverbal", "gloss": "with (comitative); impersonal one"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:soo', 'MORPHEME', 'soo', 'soo', 'directional particle: hither, toward speaker', NULL, NULL, FALSE, NULL, NULL, NULL, '{"direction": "toward_speaker", "gloss": "hither"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('morpheme:sii', 'MORPHEME', 'sii', 'sii', 'directional particle: thither, away from speaker', NULL, NULL, FALSE, NULL, NULL, NULL, '{"direction": "away_from_speaker", "gloss": "thither"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:aniga', 'WORD', 'aniga', 'aniga', 'I (independent pronoun)', NULL, NULL, NULL, NULL, NULL, NULL, '{"person": "1", "number": "singular", "type": "independent_pronoun", "usage": "emphasis"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:adiga', 'WORD', 'adiga', 'adiga', 'you (independent pronoun)', NULL, NULL, NULL, NULL, NULL, NULL, '{"person": "2", "number": "singular", "type": "independent_pronoun", "usage": "emphasis"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:isaga', 'WORD', 'isaga', 'isaga', 'he (independent pronoun)', NULL, 'masculine', NULL, NULL, NULL, NULL, '{"person": "3", "number": "singular", "type": "independent_pronoun", "usage": "emphasis"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:iyaga', 'WORD', 'iyaga', 'iyaga', 'they (independent pronoun)', NULL, NULL, NULL, NULL, NULL, NULL, '{"person": "3", "number": "plural", "type": "independent_pronoun", "usage": "emphasis"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:sov-order', 'RULE', 'SOV Word Order Rule', NULL, 'Somali follows SOV word order', NULL, NULL, NULL, NULL, NULL, NULL, '{"pattern": "[Subject][Object][Prepositions][Verb]", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:subject-clitic-fusion', 'RULE', 'Subject Clitic Fusion', NULL, 'Subject clitics fuse with mood classifiers (waa, baa, ma)', NULL, NULL, NULL, NULL, NULL, NULL, '{"examples": "waan=waa+aan, waad=waa+aad, wuu=waa+uu, way=waa+ay", "source": "zorc-iss-1990"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:object-pronoun-position', 'RULE', 'Object Pronoun Position', NULL, 'Object pronoun comes before preverbal prepositions', NULL, NULL, NULL, NULL, NULL, NULL, '{"order": "OBJECT PRONOUN + PREVERBAL PREPOSITION + VERB", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('rule:preposition-fusion', 'RULE', 'Preposition Fusion Rule', NULL, 'Preposition + object pronoun fuse into single form', NULL, NULL, NULL, NULL, NULL, NULL, '{"examples": "ku+u+la=kuula, ka+ka=kaga, ku+ku=kugu, i+u=ii, ku+iidin=kiidin", "source": "colloquial-somali-1995"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:wuu-baxay', 'EXAMPLE', 'wuu baxay', 'Wuu baxay.', 'He left.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "wuu=waa+uu (3sg.m), baxay=left", "page": "14"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:way-tegeen', 'EXAMPLE', 'way tegeen', 'Way tegeen shaleyto.', 'They went yesterday.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "way=waa+ay (3sg.f/3pl), tegeen=went, shaleyto=yesterday", "page": "9"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waan-akhriyay', 'EXAMPLE', 'waan akhriyay', 'Waan akhriyay.', 'I read it.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "waan=waa+aan (1sg), akhriyay=read", "page": "15"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waad-ka-baxday', 'EXAMPLE', 'waad ka baxday', 'Waad ka baxday.', 'You left (from there).', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "waad=waa+aad (2sg), ka=from, baxday=left", "page": "15"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:soo-dhowow', 'EXAMPLE', 'soo dhowow', 'Soo dhowow!', 'Come in! (Come hither near!)', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "soo=hither, dhowow=come near", "page": "10"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:u-sheegayaa', 'EXAMPLE', 'u sheegayaa', 'Maxmuud waan u sheegayaa.', 'I am telling (it to) Maxmuud.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "waan=waa+aan (1sg), u=to/for, sheegayaa=am telling", "page": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ka-duushay', 'EXAMPLE', 'ka duushay', 'Shimbirtu geedka way ka duushay.', 'The bird flew from the tree.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "way=waa+ay (3sg.f), ka=from, duushay=flew", "page": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ku-shub', 'EXAMPLE', 'ku shub', 'Caano koobka ku shub.', 'Pour the milk into the cup.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "ku=in/at, shub=pour", "page": "colloquial"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waa-la-fiicanyahay', 'EXAMPLE', 'waa la fiicanyahay', 'Waa la fiicanyahay.', 'I am well (lit. one is well).', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "waa=positive declarative, la=impersonal one, fiicanyahay=is well", "page": "10"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:wax-bay-cuntay', 'EXAMPLE', 'wax bay cuntay', 'Wax bay cuntay.', 'She ate something.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "wax=something, bay=baa+ay (focus+3sg.f), cuntay=ate", "source": "zorc", "page": "55"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ninkii-buu-arkay', 'EXAMPLE', 'ninkii buu arkay', 'Ninkii buu arkay.', 'He saw the man.', NULL, NULL, NULL, NULL, NULL, NULL, '{"components": "ninkii=the man, buu=baa+uu (focus+3sg.m), arkay=saw", "source": "zorc", "page": "55"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:fiican', 'WORD', 'fiican', 'fiican', 'well, good', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:nabad', 'WORD', 'nabad', 'nabad', 'peace', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:waryaa', 'WORD', 'waryaa', 'waryaa', 'hi (greeting to men)', 'interjection', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:shaah', 'WORD', 'shaah', 'shaah', 'tea', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:ey', 'WORD', 'éy', 'éy', 'dog', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:sonkor', 'WORD', 'sonkor', 'sonkor', 'sugar', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:sug', 'WORD', 'sug', 'sug', 'to wait', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:fur', 'WORD', 'fur', 'fur', 'to open', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:warran', 'WORD', 'warran', 'warran', 'to give news', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:jooji', 'WORD', 'jooji', 'jooji', 'to stop', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:Canab', 'WORD', 'Canab', 'Canab', 'Canab (woman''''s name)', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:Maxamed', 'WORD', 'Maxamed', 'Maxamed', 'Mohamed (man''''s name)', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:somali-greetings', 'CONCEPT', 'Somali greetings', NULL, 'Somali greetings', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "pragmatics", "description": "The system of greetings and responses in Somali, including time-specific greetings and the cultural importance of greeting rituals"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:vocative-form', 'CONCEPT', 'Vocative form', NULL, 'Vocative form', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "The morphological form used for direct address in Somali, formed with -ay (feminine) and -éw/-ow (masculine) suffixes"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:imperative-mood', 'CONCEPT', 'Imperative mood', NULL, 'Imperative mood', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "The verb mood used for commands and requests in Somali, formed with the basic verb stem; singular and plural forms"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:third-person-object-pronouns', 'CONCEPT', 'Third person object pronouns', NULL, 'Third person object pronouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "syntax", "description": "The absence of overt third person object pronouns in Somali; pronouns are implied in context"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:question-ma-baa', 'CONCEPT', 'Question formation with ma...baa', NULL, 'Question formation with ma...baa', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "syntax", "description": "The question construction Ma + [noun] + baa? meaning ''''Is it...?'''' with waa as the positive answer"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:positive-interrogative', 'CONCEPT', 'Positive interrogative classifier ma', NULL, 'Positive interrogative classifier ma', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "The question particle ma used for forming yes-no questions in Somali"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:time-greetings', 'CONCEPT', 'Time-specific greetings', NULL, 'Time-specific greetings', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "pragmatics", "description": "Greetings used at particular times of day: subax wanaagsan, galab wanaagsan, habeen wanaagsan, maalin wanaagsan"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:question-miyaa', 'CONCEPT', 'Question formation with miyaa', NULL, 'Question formation with miyaa', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "syntax", "description": "Alternative question construction using miyaa suffix, equivalent to ma...baa"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:somali-nouns', 'CONCEPT', 'Somali nouns', NULL, 'Somali nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Overview of Somali noun system: gender (masculine/feminine), declensions, and grammatical characteristics"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-1', 'CONCEPT', 'Declension 1 nouns', NULL, 'Declension 1 nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Noun declension: mostly feminine singular, always masculine plural; add -o for plural; -iyo after -i"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-2', 'CONCEPT', 'Declension 2 nouns', NULL, 'Declension 2 nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Noun declension: mostly masculine singular, always feminine plural; various sound changes in plural formation"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-3', 'CONCEPT', 'Declension 3 nouns', NULL, 'Declension 3 nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Noun declension: masculine or feminine singular, always masculine plural; ChV(V)CVC pattern; final vowel deleted in plural"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-4', 'CONCEPT', 'Declension 4 nouns', NULL, 'Declension 4 nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Noun declension: always masculine; one syllable ending in consonant; plural by adding -a + copied consonant"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-5', 'CONCEPT', 'Declension 5 nouns', NULL, 'Declension 5 nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Noun declension: masculine singular, feminine plural; gender and stress-tone change only (no written plural marker)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-6', 'CONCEPT', 'Declension 6 nouns', NULL, 'Declension 6 nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Noun declension: always feminine singular, always masculine plural; ends in -o; plural with -oyin"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:declension-7', 'CONCEPT', 'Declension 7 nouns', NULL, 'Declension 7 nouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Noun declension: always masculine singular, always feminine plural; ends in -e; plural with -ayaal"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:conjugation-1', 'CONCEPT', 'Conjugation 1 verbs', NULL, 'Conjugation 1 verbs', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "The most basic verb conjugation in Somali; includes general past and present progressive tenses"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:conjugation-2a', 'CONCEPT', 'Conjugation 2A verbs', NULL, 'Conjugation 2A verbs', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Causative verbs formed by adding -i to the basic verb; transitive verbs from intransitive verbs"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:conjugation-2b', 'CONCEPT', 'Conjugation 2B verbs', NULL, 'Conjugation 2B verbs', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Verbs formed by adding -ee to nouns and adjectives; meaning ''''to make like the adjective/noun''''"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:conjugation-3a', 'CONCEPT', 'Conjugation 3A verbs', NULL, 'Conjugation 3A verbs', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Autobenefactive verbs ending in -o; ''''doing the action for oneself''''"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:conjunction-and', 'CONCEPT', 'Conjunction ''''and'''' in Somali', NULL, 'Conjunction ''''and'''' in Somali', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "syntax", "description": "Two forms: iyo (joins noun phrases) and -na (clitic joining sentences), with distinct usage patterns"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:word-order-sov', 'CONCEPT', 'SOV word order', NULL, 'SOV word order', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "syntax", "description": "The basic Subject-Object-Verb word order of Somali, with mood classifiers positioned close to the verb"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:somali-case-system', 'CONCEPT', 'Somali case system', NULL, 'Somali case system', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Four cases in Somali: absolutive, subject, genitive, and vocative; their forms and functions"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:question-what-is-it', 'CONCEPT', 'Asking ''''What is it?''''', NULL, 'Asking ''''What is it?''''', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "syntax", "description": "The question pattern Waa maxay? with answer Waa... for identifying unknown objects"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:days-of-week', 'CONCEPT', 'Days of the week', NULL, 'Days of the week', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "lexicon", "description": "Somali names for days of the week borrowed from Arabic; usage with definite articles"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:somali-adjectives', 'CONCEPT', 'Somali adjectives', NULL, 'Somali adjectives', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Two types: basic (standalone) and derived (-an and -san suffixes); position after noun; plural forms; subject case marking"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:somali-numbers', 'CONCEPT', 'Numbers in Somali', NULL, 'Numbers in Somali', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Numbers are nouns; 1-8 feminine, 9+ masculine; used with genitive case nouns; hal/mid/kow for ''''one''''"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:ka-warran-idiom', 'CONCEPT', 'ka warran idiomatic usage', NULL, 'ka warran idiomatic usage', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "pragmatics", "description": "Extended uses of ka warran beyond Is ka warran to inquire about various topics (work, family, etc.)"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('concept:verbal-subject-pronouns', 'CONCEPT', 'Verbal subject pronouns', NULL, 'Verbal subject pronouns', NULL, NULL, NULL, NULL, NULL, NULL, '{"domain": "morphology", "description": "Pronoun forms that attach to mood classifiers: -aan, -aad, -uu, -ay, -aynu, -aannu, -aydin"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:galab', 'WORD', 'galab', 'galab', 'afternoon', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:miyaa', 'WORD', 'miyaa', 'miyaa', 'question word: Is it...?', 'particle', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:soo', 'WORD', 'soo', 'soo', 'particle: towards the speaker', 'particle', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:dhow', 'WORD', 'dhow', 'dhow', 'near', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:fadhiiso', 'WORD', 'fadhiiso', 'fadhiiso', 'to sit down', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:koob', 'WORD', 'koob', 'koob', 'cup', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:ah', 'WORD', 'ah', 'ah', 'which is, that is (relative)', 'particle', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:doon', 'WORD', 'doon', 'doon', 'to want', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:yar', 'WORD', 'yar', 'yar', 'small', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:kan', 'WORD', 'kan', 'kan', 'this (masculine)', 'demonstrative', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:mahadsanid', 'WORD', 'mahadsanid', 'mahadsanid', 'thank you', 'phrase', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:maalin', 'WORD', 'maalin', 'maalin', 'day', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:hilib', 'WORD', 'hilib', 'hilib', 'meat', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:khudrad', 'WORD', 'khudrad', 'khudrad', 'vegetables', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:iibso', 'WORD', 'iibso', 'iibso', 'to buy', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:wax', 'WORD', 'wax', 'wax', 'thing', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:dukaan', 'WORD', 'dukaan', 'dukaan', 'shop', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:buug', 'WORD', 'buug', 'buug', 'book', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:laybreeri', 'WORD', 'laybreeri', 'laybreeri', 'library', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:iyo', 'WORD', 'iyo', 'iyo', 'and (joins noun phrases)', 'conjunction', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:na', 'WORD', '-na', '-na', 'and (joins sentences)', 'clitic', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:haa', 'WORD', 'haa', 'haa', 'yes', 'particle', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:maya', 'WORD', 'maya', 'maya', 'no', 'particle', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:boosto', 'WORD', 'boosto', 'boosto', 'post office', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:xaggee', 'WORD', 'xaggee', 'xaggee', 'where', 'interrogative', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:suuq', 'WORD', 'suuq', 'suuq', 'market', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:adigu', 'WORD', 'adigu', 'adigu', 'you (independent pronoun)', 'pronoun', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:saaxiib', 'WORD', 'saaxiib', 'saaxiib', 'friend', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:raac', 'WORD', 'raac', 'raac', 'to accompany', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:u', 'WORD', 'u', 'u', 'to, for (preverbal preposition)', 'preposition', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:dir', 'WORD', 'dir', 'dir', 'to send', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:ka', 'WORD', 'ka', 'ka', 'from (preverbal preposition)', 'preposition', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:ku', 'WORD', 'ku', 'ku', 'in, at, by means of (preverbal preposition)', 'preposition', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:la', 'WORD', 'la', 'la', 'with (preverbal preposition)', 'preposition', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:warqad', 'WORD', 'warqad', 'warqad', 'letter', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:wiil', 'WORD', 'wiil', 'wiil', 'boy, son', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:gabadh', 'WORD', 'gabadh', 'gabadh', 'girl', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:mindi', 'WORD', 'mindi', 'mindi', 'knife', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:albaab', 'WORD', 'albaab', 'albaab', 'door', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:baabuur', 'WORD', 'baabuur', 'baabuur', 'lorry, car', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:kursi', 'WORD', 'kursi', 'kursi', 'chair', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:kibis', 'WORD', 'kibis', 'kibis', 'bread', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:qalin', 'WORD', 'qalin', 'qalin', 'pen', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:tagsi', 'WORD', 'tagsi', 'tagsi', 'taxi', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:gees', 'WORD', 'gees', 'gees', 'horn', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:macallin', 'WORD', 'macallin', 'macallin', 'teacher', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:af', 'WORD', 'af', 'af', 'mouth, language', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:Soomaali', 'WORD', 'Soomaali', 'Soomaali', 'Somali', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:waayo', 'WORD', 'waayo', 'waayo', 'because', 'conjunction', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:bil', 'WORD', 'bil', 'bil', 'month', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:dugsi', 'WORD', 'dugsi', 'dugsi', 'school', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:magaalo', 'WORD', 'magaalo', 'magaalo', 'town', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:dal', 'WORD', 'dal', 'dal', 'country', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:carruur', 'WORD', 'carruur', 'carruur', 'children', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:qosol', 'WORD', 'qosol', 'qosol', 'to laugh', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:walaal', 'WORD', 'walaal', 'walaal', 'brother', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:hooyo', 'WORD', 'hooyo', 'hooyo', 'mother', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:aabbe', 'WORD', 'aabbe', 'aabbe', 'father', 'noun', 'masculine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:waddo', 'WORD', 'waddo', 'waddo', 'road', 'noun', 'feminine', NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:samee', 'WORD', 'samee', 'samee', 'to do, make', 'verb', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:fog', 'WORD', 'fog', 'fog', 'far', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:culus', 'WORD', 'culus', 'culus', 'heavy', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:dheer', 'WORD', 'dheer', 'dheer', 'tall, long', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:weyn', 'WORD', 'weyn', 'weyn', 'big', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:cusub', 'WORD', 'cusub', 'cusub', 'new', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:gaaban', 'WORD', 'gaaban', 'gaaban', 'short', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:quruxsan', 'WORD', 'quruxsan', 'quruxsan', 'beautiful', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('word:faraxsan', 'WORD', 'faraxsan', 'faraxsan', 'happy', 'adjective', NULL, NULL, NULL, NULL, NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waryaa-bill-subax-wanaagsan', 'EXAMPLE', 'Waryaa Bill, subax wanaagsan.', 'Waryaa Bill, subax wanaagsan.', 'Hi Bill, good morning.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "greeting"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:is-ka-warran', 'EXAMPLE', 'Is ka warran!', 'Is ka warran!', 'How are you? (lit.: give news about yourself!)', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "greeting"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:canabay', 'EXAMPLE', 'Canabay!', 'Canabay!', 'Canab! (vocative)', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "vocative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:maxamedew', 'EXAMPLE', 'Maxamedéw!', 'Maxamedéw!', 'Mohamed! (vocative)', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "vocative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:keen-bring', 'EXAMPLE', 'Kéen!', 'Kéen!', 'Bring it! (sg. imperative)', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "imperative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:warrama-plural', 'EXAMPLE', 'Warrama!', 'Warrama!', 'Give news! (pl. imperative)', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "imperative"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ma-shaah-baa', 'EXAMPLE', 'Ma shaah baa?', 'Ma shaah baa?', 'Is it tea?', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "question"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waa-ey', 'EXAMPLE', 'Waa éy.', 'Waa éy.', 'It is a dog.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "statement"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:nabad-miyaa', 'EXAMPLE', 'Nabad miyaa?', 'Nabad miyaa?', 'Is it peace?', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "question"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waa-maxay', 'EXAMPLE', 'Waa maxay?', 'Waa maxay?', 'What is it?', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "question"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:waa-qalin', 'EXAMPLE', 'Waa qalin.', 'Waa qalin.', 'It is a pen.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "statement"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:qoyska-ka-warran', 'EXAMPLE', 'Qoyska ka warran.', 'Qoyska ka warran.', 'How is the family?', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "inquiry"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:guri-cusub', 'EXAMPLE', 'Guri cusub.', 'Guri cusub.', 'A new house.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "adjective"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:afar-dal', 'EXAMPLE', 'Afar dal.', 'Afar dal.', 'Four countries.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "number"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:hal-buug', 'EXAMPLE', 'Hal buug.', 'Hal buug.', 'One book.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "number"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:ninku-waa-tagay', 'EXAMPLE', 'Ninku waa tagay.', 'Ninku waa tagay.', 'The man went.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "sentence"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:subax-wanaagsan', 'EXAMPLE', 'Subax wanaagsan.', 'Subax wanaagsan.', 'Good morning.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "greeting"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:galab-wanaagsan', 'EXAMPLE', 'Galab wanaagsan.', 'Galab wanaagsan.', 'Good afternoon.', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "greeting"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:nabad-gelyo', 'EXAMPLE', 'Nabad gelyo.', 'Nabad gelyo.', 'Goodbye. (lit.: go in peace)', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "greeting"}', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default, label_somali, label_english, pos, gender, bound, polarity, verb_class, dialect, extra_attrs, definition_cids) VALUES ('example:koob-shaah-ah', 'EXAMPLE', 'Koob shaah ah.', 'Koob shaah ah.', 'A cup of tea. (lit.: a cup which is tea)', NULL, NULL, NULL, NULL, NULL, NULL, '{"type": "relative"}', NULL) ON CONFLICT (id) DO NOTHING;
-- 330

-- ─── graph_nodes (stubs) ───
INSERT INTO graph_nodes (id, type, label_default) VALUES ('word:adag', 'WORD', 'Adag') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:focus-negative', 'RULE', 'Focus Negative') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:waxaan', 'MORPHEME', 'Waxaan') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:sov-declarative', 'RULE', 'Sov Declarative') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:buu', 'MORPHEME', 'Buu') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:focus-interrogative', 'RULE', 'Focus Interrogative') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('word:fudud', 'WORD', 'Fudud') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('concept:object-focus', 'CONCEPT', 'Object Focus') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('concept:information-structure', 'CONCEPT', 'Information Structure') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:focus-contraction', 'RULE', 'Focus Contraction') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:focus-object', 'RULE', 'Focus Object') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:focus-declarative-positive', 'RULE', 'Focus Declarative Positive') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('concept:verb-focus', 'CONCEPT', 'Verb Focus') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('word:kow', 'WORD', 'Kow') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:waa', 'MORPHEME', 'Waa') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('word:dhig', 'WORD', 'Dhig') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:miyaa', 'MORPHEME', 'Miyaa') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:focus-clause', 'RULE', 'Focus Clause') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('concept:negative-marker', 'CONCEPT', 'Negative Marker') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:waxaad', 'MORPHEME', 'Waxaad') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:baa', 'MORPHEME', 'Baa') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('word:-na', 'WORD', ' Na') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('construction:focus-subject', 'RULE', 'Focus Subject') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('concept:subject-focus', 'CONCEPT', 'Subject Focus') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:ayaa', 'MORPHEME', 'Ayaa') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:ma', 'MORPHEME', 'Ma') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:bay', 'MORPHEME', 'Bay') ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_nodes (id, type, label_default) VALUES ('morpheme:waxaa', 'MORPHEME', 'Waxaa') ON CONFLICT (id) DO NOTHING;
-- 28 stubs

-- ─── graph_constructions ───
INSERT INTO graph_constructions (id, name, members, source_page, source_textbook) VALUES ('construction:focus-negative', 'Negative Focus', '{"pattern": "ma + [verb-negative-form]", "example": "Ma doonayo", "note": "ma also serves as the negative marker"}', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_constructions (id, name, members, source_page, source_textbook) VALUES ('construction:focus-subject', 'Subject Focus Construction', '{"pattern": "[subject-absolutive] + baa/ayaa + [verb-reduced-paradigm]", "example": "Gabadha baa bariiska cuntay", "note": "Subject in absolutive case, no verbal pronoun attached to baa, reduced verb paradigm"}', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_constructions (id, name, members, source_page, source_textbook) VALUES ('construction:focus-object', 'Object Focus Construction', '{"pattern": "waxaa + [subject-clitic] + [verb] + [object]", "example": "Waxaan u galay", "note": "Object is fronted; subject clitic attaches to waxaa"}', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_constructions (id, name, members, source_page, source_textbook) VALUES ('construction:focus-contraction', 'Focus Contraction', '{"pattern": "[noun-ending-in-short-vowel] + baa -> [noun] + aa", "example": "Ninkaa tagay (from Ninka baa tagay)", "note": "When noun ends in short vowel (esp. definite article), baa contracts"}', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_constructions (id, name, members, source_page, source_textbook) VALUES ('construction:sov-declarative', 'construction:sov-declarative', '[{"role": "subject", "element": "subject-clitic", "position": "preverbal"}, {"role": "object", "element": "noun-phrase", "position": "preverbal"}, {"role": "preposition", "element": "preverbal-preposition", "position": "preverbal"}, {"role": "verb", "element": "verb", "position": "final"}]', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_constructions (id, name, members, source_page, source_textbook) VALUES ('construction:focus-clause', 'construction:focus-clause', '[{"role": "focused-constituent", "element": "noun-phrase", "position": "initial"}, {"role": "focus-marker", "element": "baa/ayaa", "position": "post-focus"}, {"role": "subject-clitic", "element": "clitic", "position": "post-focus"}, {"role": "verb", "element": "verb", "position": "final"}]', NULL, NULL) ON CONFLICT (id) DO NOTHING;
-- 6

-- ─── graph_chunks ───
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:waa-explanation', 'lesson:colloquial:unit-01', 'text/markdown', 'EThe positive declarative mood classifier **waa** is used for making positive declarative statements. The classifier for this mood in Somali is **waa**. This may be replaced by a focus marker, which will be discussed later. The stress-tone pattern for waa is the see-saw pattern.\n\nThe use of either the positive declarative mood classifier or a focus marker is **obligatory** in a positive declarative sentence in Somali. If you say a positive declarative sentence without waa or a focus marker then it is incorrect.', NULL, 'grammar', '{"conceptId": "concept:declarative-marker", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:waa-pronoun-combinations', 'lesson:colloquial:unit-01', 'text/markdown', 'E**waa** combines with verbal subject pronouns by adding **w-** to the beginning of the pronoun form. The long vowel **-aa** of waa is deleted. The stress-tone pattern is the see-saw pattern.\n\n| Pronoun | Combination | Form |\n|---------|-------------|------|\n| I | waa + aan | waan |\n| you (sg.) | waa + aad | waad |\n| he, it (m.) | waa + uu | wuu |\n| she, it (f.) | waa + ay | way |\n| we (incl.) | waa + aynu | waynu |\n| we (excl.) | waa + aannu | waannu |\n| you (pl.) | waa + aydin | waydin |\n| they | waa + ay | way |', NULL, 'grammar', '{"conceptId": "morpheme:waa", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:ma-explanation', 'lesson:colloquial:unit-01', 'text/markdown', 'EThe mood classifier **ma** is used in positive yes-no questions. These are questions to which the answer "yes" or "no" may be given. Like waa, ma also has the see-saw stress-tone pattern.\n\nThe verbal subject pronouns combine with ma by replacing the **a** in ma with **iy** and adding the verbal subject pronoun. The stress-tone pattern on these combined forms is assigned to the penultimate vowel.', NULL, 'grammar', '{"conceptId": "concept:interrogative-marker", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:ma-pronoun-combinations', 'lesson:colloquial:unit-01', 'text/markdown', 'E**ma** combines with verbal subject pronouns to form interrogative questions. The **a** in ma is replaced by **iy** and the verbal subject pronoun is added.\n\n| Pronoun | Combination | Form |\n|---------|-------------|------|\n| I | ma + aan | miyaan |\n| you (sg.) | ma + aad | miyaad |\n| he, it (m.) | ma + uu | miyuu |\n| she, it (f.) | ma + ay | miyay |\n| we (incl.) | ma + aynu | miyaynu |\n| we (excl.) | ma + aannu | miyaannu |\n| you (pl.) | ma + aydin | miyaydin |\n| they | ma + ay | miyay |', NULL, 'grammar', '{"conceptId": "morpheme:miyaa", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:waa-example-sentences', 'lesson:colloquial:unit-01', 'text/markdown', 'EExample sentences with **waa** (positive declarative):\n\n- **Waan fiicanahay.** "I am fine."\n- **Wuu cunay.** "He ate it."\n- **Waan baxay.** "I left."\n- **Way direen.** "She sent them."\n- **Waannu hellay.** "We (excl.) found it."\n- **Wuu keenay.** "He brought her."', NULL, 'grammar', '{"conceptId": "concept:declarative-marker", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:ma-example-sentences', 'lesson:colloquial:unit-01', 'text/markdown', 'EExample questions with **ma** (interrogative):\n\n- **Dukaanka ma tagtay?** "Did you go to the shop?"\n- **Buuggii miyaad akhriday?** "Did you read the book?"\n- **Guriga miyay heshay?** "Did she find the house?"\n- **Laybreeriga miyuu galay?** "Did he enter the library?"\n\nExample answers (positive declarative with waa):\n- **Haa, waan tegey.** "Yes, I went."\n- **Haa, waan akhriyay.** "Yes, I read it."', NULL, 'grammar', '{"conceptId": "concept:interrogative-marker", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:focus-markers-intro', 'lesson:colloquial:unit-03', 'text/markdown', 'E**Using Focus Markers**\n\nThe focus markers **baa** and **ayaa** are used to emphasize or highlight a particular noun or noun phrase in the sentence. In English this is generally done by intonation.\n\nThe first thing to be said about baa and ayaa is that they are **interchangeable**. They are used in exactly the same way with no difference in meaning, and what is said of one is true of the other.', NULL, 'grammar', '{"conceptId": "concept:focus-marker", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:focus-understanding', 'lesson:colloquial:unit-03', 'text/markdown', 'E**Understanding Focus through Questions and Answers**\n\nUnderstanding focus through the use of questions and answers is important because it is important to focus the correct part of an answer to a question. In Somali if a question is asking for a particular new piece of information then that information is focused in the answer. If this is not done then the answer may be grammatically correct but it would sound odd.\n\nCompare these different ways of saying "The girl ate the rice":\n\n1. **The girl** ate the rice. (Who ate it? Not someone else)\n2. The girl ate **the rice**. (What did she eat? Not something else)\n3. The girl **ate** the rice. (What did she do? Not something else)\n\nIn Somali, sentences 1 and 2 use focus markers; sentence 3 uses the mood classifier waa.', NULL, 'grammar', '{"conceptId": "concept:focus-marker", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:focus-non-subject', 'lesson:colloquial:unit-03', 'text/markdown', 'E**Focusing any noun phrase other than the subject**\n\nTo focus a noun phrase the focus marker **baa** or **ayaa** is used immediately following the noun phrase it is focusing. As with the mood classifier waa, the verbal subject pronoun may be attached to the focus marker.\n\nThe combinations are formed as follows:\n\n| Pronoun | baa form | ayaa form |\n|---------|----------|-----------|\n| I | baan | ayaan |\n| you (sg.) | baad | ayaad |\n| he, it (m.) | buu | ayuu |\n| she, it (f.) | bay | ayay |\n| we (incl.) | baynu | ayaynu |\n| we (excl.) | baannu | ayaannu |\n| you (pl.) | baydin | ayaydin |\n| they | bay | ayay |', NULL, 'grammar', '{"conceptId": "concept:object-focus", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:focus-subject', 'lesson:colloquial:unit-03', 'text/markdown', 'E**Focusing the Subject**\n\nWhen the subject is focused, some aspects of the sentence are different:\n\n- The subject is in the **absolutive case** (not the subject case with -u).\n- The subject verbal pronoun is **not used** with the focus marker.\n- The **reduced verb paradigm** is used.\n\nExamples:\n\n- **Gabadha baa bariiska cuntay.** "The girl ate the rice." (gabadha = absolutive)\n- **Inanka baa koobka jabiyay.** "The boy broke the cup."\n- **Nimanka baa guriga ka baxay.** "The men left the house."', NULL, 'grammar', '{"conceptId": "concept:subject-focus", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:focus-contraction', 'lesson:colloquial:unit-03', 'text/markdown', 'E**Contractions of baa**\n\nWhen a noun phrase ends in a short vowel, particularly the short vowel of the definite article, it is possible for baa to become part of the noun it is focusing. When this happens, the **b** is deleted and all that remains is the vowel **aa**.\n\nExample:\n\n**Ninkaa tagay.** "The man went."\n\nThis is from: **Ninka baa tagay.** (the definite article -ka + baa -> -kaa)\n\nThis contraction may also be made when there is a subject verbal pronoun with the focus marker:\n\n**Ninkiu arkay.** "He saw the man." (from Ninka buu arkay)', NULL, 'grammar', '{"conceptId": "morpheme:baa", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u10:waxaa-construction', 'lesson:colloquial:unit-10', 'text/markdown', 'E**The waxaa Construction (Object Focus)**\n\nThe **waxaa** construction is used to focus the object or to express purpose ("in order to"). The pattern is:\n\n**waxaa + [subject-clitic] + [verb] + [object]**\n\nThis construction is also used with the preverbal preposition **u** ("for") to express purpose:\n\n- **Qolka waxaan u galay aan helo shandadayda.** "I entered the room in order to find my suitcase."\n- **Af Soomaaliga waxaan u baranayaa inaan suugaanta Soomaaliyeed garto.** "I am learning Somali in order to understand Somali literature."\n\nNote: **waxaan** = waxaa + aan (1st person singular subject clitic). Similarly, **waxaad** = waxaa + aad.', NULL, 'grammar', '{"conceptId": "concept:object-focus", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u10:waxaa-newspaper-examples', 'lesson:colloquial:unit-10', 'text/markdown', 'EExamples of the **waxaa** construction from newspaper texts:\n\n- **Wasiirada Arrimaha Dibadda ee waddamada galbeedka Afrika ayaa ku kulmaya... waxana halkaas ay ku yeelanayaan shir...** "The Foreign Ministers of the West African countries are meeting... and there they are holding a conference..."\n- **Barlamaanka Jabaan waxaa uu oggolaaday sharci oggolaanaya...** "The Japanese Parliament approved a law permitting..."\n- **Sharcigu waxaa uu oggolaanayaa in Jabaan ciidamo nabad ilaalin u diro.** "The law permits Japan to send peacekeeping forces."\n\nIn these examples, **waxaa** + subject clitic (**uu**) introduces the main action, placing focus on what follows.', NULL, 'grammar', '{"conceptId": "concept:object-focus", "source": "colloquial-somali-1995"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch02:ma-baa-waa-intro', 'lesson:zorc:chapter-02', 'text/markdown', 'E**The Three Most Important Grammatical Markers**\n\nThe three most important grammatical markers in Somali are:\n\n1. **Ma** marks POSITIVE (non-negative) QUESTIONS [see SRG: 5, 207f, 219-221]\n2. **Baa** marks FOCUS (new or emphasized information) [see Chapters 12 and 23; SRG: 5, 6, 62-64, 205f]\n3. **Waa** marks positive (non-negative) DECLARATIVE STATEMENTS [see Chapter 12; SRG: 5, 23, 69-73, 207f]\n\nEvery declarative sentence must have either **waa** or a **focus marker**. Without one of these, the sentence is ungrammatical.', NULL, 'grammar', '{"conceptId": "concept:focus-marker", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch02:waa-example', 'lesson:zorc:chapter-02', 'text/markdown', 'E**Declarative Statements with waa**\n\n- **Waa buug.** "It is a book."\n- **Waa laabbis.** "It is a pencil."\n- **Waa koob.** "It is a cup."\n- **Isagu waa macallin.** "He is a teacher."\n- **Iyadu waa macallimad.** "She is a teacher."\n- **Ruush waa waddan weyn.** "Russia is a big country."', NULL, 'grammar', '{"conceptId": "concept:declarative-marker", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch02:ma-example', 'lesson:zorc:chapter-02', 'text/markdown', 'E**Questions with ma**\n\n- **Ma buug baa?** "Is it a book?"\n- **Ma laabbis baa?** "Is it a pencil?"\n- **Soomaaliya ma waddan weyn baa?** "Is Somalia a big country?"\n- **Iyadu ma macallimad baa?** "Is she a teacher?"\n- **Isagu ma dhakhtar baa?** "Is he a doctor?"\n- **Ma qabow baa?** "Is it cold?"\n- **Ma kulayl baa?** "Is it hot?"\n\nNote the pattern: **Ma [noun/adjective] baa?** for yes-no questions.', NULL, 'grammar', '{"conceptId": "concept:interrogative-marker", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch12:focus-topic-explanation', 'lesson:zorc:chapter-12', 'text/markdown', 'E**Focus and Topic in Somali**\n\n**Focus** is the highlighting of new or crucial information, either that being introduced (in declaratives) or sought (in questions). In Somali, Focus is marked by **baa** or its derivatives (**baan, baad, buu, bey**, etc.), which follow the noun in focus.\n\n**Baa may be compared to a cursor on a computer.** It is moved around to point out a noun which has special importance or relevance in a sentence.\n\n**Topic** is what the sentence is about; in Somali, it is the **first word** in the sentence. Do not confuse this with the grammatical role of Subject!\n\n**The (Direct) Object** is the receiver of the action; it can only occur with a transitive verb.\n\nExample sentence structure:\n\n**Anigu hilibka baan cuney.** "I ate the meat."\n- Anigu = SUBJECT\n- hilibka = OBJECT\n- baan = FOCUS + pro\n- cuney = VERB\n- (Anigu is also the TOPIC as first word)', NULL, 'grammar', '{"conceptId": "concept:information-structure", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch12:focus-nonfocus-declaratives', 'lesson:zorc:chapter-12', 'text/markdown', 'E**Focus and Non-Focus Declaratives**\n\nConversations or stories generally begin with a phrase marked by **baa** which introduces the main characters or information; these are then followed by **waa** declaratives.\n\nExamples:\n\n- **Lacag baan arkey.** "I found money." (Focus introduces new info)\n- **Lacagta waan qaadey.** "I took the money." (waa for known info)\n\nPattern: When participants are fully known in both question and answer, and there is no need for emphasis, use waa forms. When new information is introduced, use baa.', NULL, 'grammar', '{"conceptId": "concept:focus-marker", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch12:subject-focus-rule', 'lesson:zorc:chapter-12', 'text/markdown', 'E**Critical Rule: Subject Focus vs. Object Focus**\n\nIf **FOCUS is put on the SUBJECT**, **baa** is used alone (without verbal subject pronoun attached).\n\nIf **FOCUS is on the OBJECT**, a **derived form** (**buu, bey, baan, baad**, etc.) is used.\n\nExamples:\n\n1. **Ninkii naagtii buu arkey.** "It was the woman whom the man saw."\n   - SUBJECT = ninkii (topic), OBJECT = naagtii (focus with buu)\n\n2. **Ninkii baa naagtii arkey.** "It was the man who saw the woman."\n   - SUBJECT = ninkii (focus with baa alone), OBJECT = naagtii\n\n3. **Ninkii bey naagtii aragtey.** "As for the man, it was the man whom the woman saw."\n   - OBJECT-FOC (bey = baa + ay) on ninkii', NULL, 'grammar', '{"conceptId": "concept:subject-focus", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch12:waa-baa-additional-rules', 'lesson:zorc:chapter-12', 'text/markdown', 'E**Additional Grammar Notes on waa and baa**\n\n- **Waa** does not usually have an indefinite subject. A noun standing by itself is indefinite, and baa is used instead.\n- **baa** is **never** used with a topic phrase marked with **-u**.\n\nExamples:\n\n- **Waa faras.** "It is a horse." [DECLARATIVE with waa]\n- **Faras baa ordey.** "A horse ran away." [INDEFINITE with baa]\n- **Farasku wuu ordey.** "The horse ran away." [DEFINITE with wuu]\n- **Naagtii baa tagtey.** "It was the woman who left." [FOCUS on subject]\n- **\*Naagtu baa tagtey.** WRONG! [Cannot use -u SUBJECT MARKER with baa]', NULL, 'grammar', '{"conceptId": "concept:focus-marker", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch12:focus-practice-sentences', 'lesson:zorc:chapter-12', 'text/markdown', 'E**Practice Sentences with Focus Markers**\n\n- **Wiilka baa shimbirta diley.** "It was the boy who killed the bird." (Subject focused)\n- **Wiilku shimbir buu dilay.** "The boy killed a bird." (Object focused with buu)\n- **Wiilku shimbir wuu dilay.** "The boy killed a bird." (Neutral with wuu)\n- **Wiilku ma shimbir buu diley?** "Did the boy kill a bird?" (Question)\n- **Magacaygu waa Maxamed.** "My name is Maxamed." (Declarative)\n- **Ardeyga cusub baan ahay.** "I am the new student." (Focus on "new student")', NULL, 'grammar', '{"conceptId": "concept:focus-marker", "source": "zorc-somali-textbook"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:past-tense-explanation', 'lesson:colloquial:unit-01', 'text/markdown', 'The general past tense of conjugation 1 is used for actions that have been completed in the past. The tense is formed by adding the general past tense endings to the imperative form of the verb. Each verb tense and mood has its own stress-tone pattern, and the pattern for the general past tense in main clauses is no stress-tone on any of the vowels. Using the verb keen (to bring) as an example: I = keenay, you (sg.) = keentay, he = keenay, she = keentay, we = keennay, you (pl.) = keenteen, they = keeneen. The final -ay ending may equally be written -ey. Sound changes: (a) t changes to d after guttural consonants (q, kh, c, x, h, hamza); (b) t changes to dh after dh; (c) m changes to n after n and to r after r (optional); (d) lt sequence becomes sh; (e) y is inserted after verb-ending -i.', NULL, 'grammar', '{"conceptId": "concept:past-tense"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:present-progressive-explanation', 'lesson:colloquial:unit-02', 'text/markdown', 'The present progressive tense is used for actions that are currently in progress. In English this is rendered by the verb form ''I am running''. This tense may also be used for an action that is to happen in the near future, for example ''Waan cunayaa'' may mean ''I am eating it'' or ''I will eat it (very soon)''. The form of the present progressive in conjugation 1 is made up of the basic form of the verb plus the progressive marker -ay- followed by the present tense endings. Using keen as example: I = keenayaa, you (sg.) = keenaysaa, he = keenayaa, she = keenaysaa, we = keenaynaa, you (pl.) = keenaysaan, they = keenayaan. The stress-tone is placed on the vowel immediately preceding the progressive marker. When a present tense ending beginning with -t- follows the progressive marker -ay-, the -t- changes to -s-. When added to a verb ending in -i, y is inserted.', NULL, 'grammar', '{"conceptId": "concept:present-progressive"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u08:future-explanation', 'lesson:colloquial:unit-08', 'text/markdown', 'The future tense may be expressed in two ways in Somali. The first is the future meaning of the present progressive (already met). The other way is to use the verb doon. On its own doon means ''to want''. However, when it is used with the infinitive of another verb it conveys the future tense. When used in this way the verb doon is always in the general present tense and is preceded by the infinitive of the verb you are using. Using dhis (to build) as example: I = dhisi doonaa, you (sg.) = dhisi doontaa, he = dhisi doonaa, she = dhisi doontaa, we = dhisi doonnaa, you (pl.) = dhisi doontaan, they = dhisi doonaan.', NULL, 'grammar', '{"conceptId": "concept:future-tense"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u08:past-habitual-explanation', 'lesson:colloquial:unit-08', 'text/markdown', 'The habitual past is the tense which in English is expressed by ''used to''. This is expressed in Somali by using the verb jir. When used on its own this means ''to be in a place''. The verb jir is used with the infinitive of the verb you want to use, and the tense of jir is the general past, no other. Examples: Waan baran jiray (I used to learn it), Waydin karin jirteen (You (pl.) used to cook it), Wuu tegi jiray (He used to go).', NULL, 'grammar', '{"conceptId": "concept:past-habitual"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u08:negative-imperative-explanation', 'lesson:colloquial:unit-08', 'text/markdown', 'The negative imperative is used when you want to tell somebody not to do something. It is formed by using the negative imperative form of the verb preceded by the negative imperative word ha. For conjugation 1 verbs: add -n to the infinitive. Examples: Ha keenin! (Do not bring it! sg.), Ha tegin! (Do not go! sg.). For conjugations 2 and 3: use the infinitive form. Examples: Ha karin! (Do not cook!), Ha qadeyn! (Do not have lunch!). There is an additional optional ending -nin, which must be used in the plural: Ha karinin! (sg. optional, pl. required). The plural of the negative imperative is formed by adding -a: Ha keenina! (Do not bring (pl.)!), Ha tegina! (Do not go (pl.)!), Ha karinina! (Do not cook (pl.)!). Ha comes before any prepositions, object pronouns or deictics.', NULL, 'grammar', '{"conceptId": "concept:negative-imperative"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u08:negative-past-explanation', 'lesson:colloquial:unit-08', 'text/markdown', 'The negative form of the general past tense is easy to learn because there is only one form for all persons and numbers. For all conjugations the form of the verb is the same as the short version of the negative imperative verb form. This is used with the negative ma, which is placed before the verb. The only difference in conjugation 1 is the stress-tone: there is a stress-tone on the final vowel in the negative general past. Examples: Ma cunin (I/you/he/she/we/you(pl.)/they did not eat it), Ma qabin (I/you/he/she/we/you(pl.)/they did not catch it). When ma occurs in a sentence it comes after preverbal prepositions and object pronouns but before deictic words. Subject verbal pronouns may be used: Maan cunin (I did not eat it), May qaban (She/they did not catch it), Ku maannu arkin (We did not see you).', NULL, 'grammar', '{"conceptId": "concept:negative-past"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u08:negative-present-explanation', 'lesson:colloquial:unit-08', 'text/markdown', 'The negative of the general present is formed by using the negative word ma and the negative general present form of the verb. The difference between the negative and the positive is only in the final vowel; any sound changes that occur in the positive also occur in the negative. To form the negative you change the -aa ending to -o, except for the second and third person plural forms which simply change the stress-tone pattern. Using keen as example: I = ma keeno, you (sg.) = ma keento, he = ma keeno, she = ma keento, we = ma keenne, you (pl.) = ma keentaan, they = ma keendan. There is another optional form for 2nd singular: ma keentid (same meaning). The auxiliary verb doon in the future tense, when negated, simply takes the negative general present form: ma cuni doondean (they will not eat it).', NULL, 'grammar', '{"conceptId": "concept:negative-present"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:optative-explanation', 'lesson:colloquial:unit-04', 'text/markdown', 'The optative mood in Somali expresses a wish or desire, often translated as ''let us...'' or ''may...''. It is formed with the suffix -to/-tee on the verb stem. Example from the dialogue: ''Haa aynu gallo'' (Yes, let us enter), where gallo is the optative form of gal (to enter). The optative is used for proposals and suggestions, often in the first person plural with aynu (let us).', NULL, 'grammar', '{"conceptId": "concept:optative-mood"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u08:past-progressive-explanation', 'lesson:colloquial:unit-08', 'text/markdown', 'The past progressive tense is used for actions that were in progress at some time in the past, translating English ''I was going'', ''they were talking'', etc. The formation is easy: it is formed in the same way as the present progressive except that the past tense endings are used instead of the present tense endings. Using keen as example: I = keenayay, you (sg.) = keenaysay, he = keenayay, she = keenaysay, we = keenaynay, you (pl.) = keenayseen, they = keenayeen. For conjugations 2 and 3 the infinitive is used as the stem: karinayay (I was cooking), sameynayay (I was making), joogsanayay (I was stopping).', NULL, 'grammar', '{"conceptId": "concept:past-progressive"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:noun-gender-intro', 'lesson:colloquial:unit-03', 'text/markdown', '## Nouns in Somali: Gender

There are two genders for nouns in Somali: **masculine** and **feminine**. For some words the gender is obvious, e.g. **naag** (woman) is feminine, whereas **nin** (man) is masculine. In other cases, the gender must be learnt with the noun.

Note that in the plural the gender of a noun is often different to that of the singular. For example, the word **naag** (woman) is feminine in the singular but the plural **naago** is grammatically masculine. Equally **inan** (boy) is masculine in the singular but the plural **inammo** is grammatically feminine.', NULL, 'grammar', '{"conceptId": "concept:noun-gender", "key_terms": ["masculine", "feminine", "grammatical gender"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:declensions-1-2-3', 'lesson:colloquial:unit-03', 'text/markdown', '## Declensions 1, 2 and 3

Nouns are classified into groups called **declensions**. Members of a declension share: stress-tone pattern, gender in singular and plural, word shape, and plural formation.

**Declension 1:** mostly feminine singular, always masculine plural, word does not end in -o, plural adds -o. Examples: **warqad** (letter) → **wargado** (letters), **naag** (woman) → **naago** (women). Sound change: singular ending in -i → -yo in plural: **mindi** (knife) → **mindiyo**, **guri** (house) → **guriyo**.

**Declension 2:** mostly masculine singular, always feminine plural, more than one syllable, does not end in -e, plural adds -o. Sound changes include: -i → -yo (**tagsi** → **tagsiyo**), guttural+j/s → -yo (**sac** → **sacyo**), b/d/dh/r/l/n/m → geminate (**albaab** → **albaabbo**).

**Declension 3:** masculine or feminine singular, always masculine plural, word shape CVCV(C), plural adds -o and deletes final vowel. Examples: **galab** → **galbo**, **maalin** → **maalmo**, **hilib** → **hilbo**.', NULL, 'grammar', '{"conceptId": "concept:plural-formation", "declensions": [1, 2, 3]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:word-list-gender', 'lesson:colloquial:unit-03', 'text/markdown', '## Key Vocabulary with Gender

| Somali | English | Gender | Declension |
|--------|---------|--------|-----------|
| **bariis** | rice | masculine | d2 mass |
| **caano** | milk | feminine | d1 collective |
| **naag** | woman | feminine | d1 |
| **nin** | man | masculine | d4 |
| **guri** | house | masculine | d1 |
| **subax** | morning | feminine | d2 |
| **habeen** | night | masculine | d2 |
| **geel** | camel (collective) | masculine | collective |

Note: When a noun is given in a vocabulary list from now on, the gender and declension will be provided. **collective** = collective noun, **mass** = mass noun.', NULL, 'grammar', '{"conceptId": "concept:noun-gender"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:definite-article', 'lesson:colloquial:unit-04', 'text/markdown', '## The Definite Article in Somali

In English the definite article is the word **the**. In Somali, this is expressed by a **suffix** which begins with **k-** for masculine nouns and **t-** for feminine nouns.

| | Absolutive | Subject |
|---|---|---|
| Masculine | **-ka** | **-ku** |
| Feminine | **-ta** | **-tu** |

There are two main article forms:
- **-ka/-ta** (new information): used when a noun is referred to for the first time or in the present/future. *Dukaanka waan tagayaa.* (I am going to the shop.)
- **-kii/-tii** (known information): used when a noun has been previously referred to or is in the past. *Buuggii waan akhriyay.* (I read the book.)

Note: When the definite article is added to a noun, the noun must be in the **premodifier form**.

Examples with article:
- **dukaan** (a shop) → **dukaanka** (the shop)
- **koob** (a cup) → **koobka** (the cup)
- **galab** (an afternoon) → **galabta** (the afternoon)
- **naago** (women) → **naagaha** (the women)', NULL, 'grammar', '{"conceptId": "concept:definite-article"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:article-sound-changes', 'lesson:colloquial:unit-04', 'text/markdown', '## Sound Changes with the Definite Article

### Feminine Article Changes
The changes that occur with the feminine article are similar to verb changes. If a noun ends in **-o**, the **t** changes to **d** and the **o** changes to **a**: **casharro** (lessons) → **casharrada** (the lessons).

Other examples:
- **nabad + ta → nabadda** (the peace)
- **gabadh + tii → gabartii** (the girl)
- **mindi + ta → mindida** (the knife)  
- **subax + ta → subaxda** (the morning)
- **inammo + ta → inammada** (the boys)

### Masculine Article Changes
**(a) k disappears after gutturals (q, kh, c, x, h):**
- **madax + ka → madaxa** (the head)
- **suuq + kii → suuqii** (the market)

**(b) k changes to h after vowels (except i):**
- **bare + ka → baraha** (the teacher)
- **gacmo + kii → gacmihii** (the hands)

**(c) k changes to g after g, i, w, y:**
- **guri + kii → gurigii** (the house)
- **ey + ka → eyga** (the dog)
- **cadow + kii → cadowgii** (the enemy)', NULL, 'grammar', '{"conceptId": "concept:vowel-harmony"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:genitive-case', 'lesson:colloquial:unit-04', 'text/markdown', '## The Genitive Case

The genitive case in Somali is used to indicate **possession**. It is the possessor in the phrase that is in the genitive case. So, for example, **Maxamed''s book** is translated with **Maxamed** in the genitive case.

The form of the genitive case differs from the absolutive primarily in the **stress-tone pattern**: stress-tone on the final or only vowel.

Example: **buuggii Maxaméd** (Maxamed''s book)

### Special Genitive Suffixes
(a) Nouns that are feminine in the singular and do not end in -o often add **-eéd** (which becomes **-yeéd** following **i**):
- **xanuun lugeéd** (foot pain)
- **Af shimbireéd** (a bird''s mouth, beak)

Note: the use of this suffix tends to imply that the genitive is less specific: **dhar naageéd** can mean women''s clothes in general, whereas **dhér naag** means a particular woman''s clothes.

(b) Nouns that are feminine in the singular and form the plural in -o add **-od** when the plural is in the genitive case.

Nouns for domestic animals add **-aad**: **lo''** (cattle) → **lo''aad** (of cattle).', NULL, 'grammar', '{"conceptId": "concept:genitive-case"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u07:possessive-suffixes', 'lesson:colloquial:unit-04', 'text/markdown', '## The Possessive Suffixes

In Somali possession in phrases such as **her house**, **their shoes** is indicated by possessive suffixes added to the noun possessed.

### Long Forms (with definite article)

| | Masculine | Feminine |
|---|---|---|
| My | **kayga** | **tayda** |
| Your (sg) | **káaga** | **táada** |
| His/its (m.) | **kíisa** | **tíisa** |
| Her/its (f.) | **kéeda** | **téeda** |
| Our (incl.) | **kéenna** | **téenna** |
| Our (excl.) | **kayaga** | **tayada** |
| Your (pl.) | **kiinna** | **tiinna** |
| Their | **kéoda** | **téoda** |

These suffixes are made up of two parts: the possessive suffix proper and the definite article suffix. The article part shows case: absolutive **-a**, subject **-u**, known **-ii**.

Examples:
- **dalkéoda** (their country)
- **lacagtaada** (your money)
- **biuggiisa** (his book)
- **magacayga** (my name)

### Short Forms (without article)
When the possessive suffix is added to a noun denoting a relative or body part, the shorter form is used:
- **hooyaday** (my mother)
- **aabbahay** (my father)
- **fartay** (my finger)

### Alternative Genitive Construction
Possession may also be expressed with possessive suffixes:
- **Jawadhir gurigéeda** (Jawaahir''s house, lit. Jawaahir her-house)', NULL, 'grammar', '{"conceptId": "concept:possessive-suffix"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch04:k-class-intro', 'lesson:zorc:chapter-04', 'text/markdown', '## Pattern 1: Masculine or K-class Nouns

Masculine nouns take a suffix beginning with **-k**. The standard form (found in a dictionary) is **-ka** the, which is used to mark **new information** or something just being introduced in a conversation.

Once something has been introduced or is generally known, the suffix is **-kii**.

Examples:
- **nin** (a man) → **ninka** (the man)
- **Ninkii meeyey?** (Where is the man?)
- **Ninkii waa kan.** (The man is here.)

Matching definite article suffixes are DEMONSTRATIVE forms:
- **-kan** (this)
- **-kaa** or **-kaas** (that, not far away)
- **-kéer** (that, far away)

**Meeyey** means *where is he/it?* and can only be used with masculine nouns.', NULL, 'grammar', '{"conceptId": "concept:k-class"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch04:t-class-intro', 'lesson:zorc:chapter-04', 'text/markdown', '## Pattern 2: Feminine or T-class Nouns

Feminine nouns take a suffix beginning with **-t**. The standard form has **-ta** the, marking new information. Once known, the suffix is **-tii**.

Examples:
- **naag** (a woman) → **naagta** (the woman)
- **Naagtii mee?** (Where is the woman?)
- **Naagtii waa tan.** (The woman is here.)

Matching definite article suffixes are DEMONSTRATIVE forms:
- **-tan** (this)
- **-taa** or **-taas** (that, not far away)
- **-téer** (that, far away)

**Meeyey** (or **mee**) means *where is she/it?* and can only be used with feminine nouns.', NULL, 'grammar', '{"conceptId": "concept:t-class"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch04:grammatical-gender', 'lesson:zorc:chapter-04', 'text/markdown', '## Somali Nouns and Grammatical Gender

Although this has traditionally been called **GENDER** (masculine and feminine), it may be more helpful to think of **CLASSES OF NOUNS**: one being a **k-class** and the other a **t-class**.

In Somali, gender has a far-reaching grammatical impact on patterns such as **plural forms** and **verb agreement**.

Each Somali noun has these characteristics:
1. **GENDER** — MASCULINE (k-marked) or FEMININE (t-marked)
2. **NUMBER** — SINGULAR or PLURAL (most common plural endings are -o or -yo)
3. **DECLENSION** — the way a noun is inflected based on plural form, gender, and tone; altogether there are eight noun declensions

### Natural Gender
Many Somali nouns follow natural gender:
- **aabbe** (/ha) father — masculine
- **hooyo** (/da) mother — feminine
- **nin** (ka) man — masculine
- **wiil** (ka) boy — masculine
- **gabadh** (dha) girl — feminine

### Grammatical Gender
However, Somali is a language based on **grammatical gender**. The way a noun is handled does not always make sense — it is simply a means of marking words.

Examples of grammatical (not semantic) gender:
- **beri** (ga) day — masculine
- **maalin** (ta) day — feminine
- **jid** (ka) road — masculine
- **waddo** (/da) road — feminine
- **subax** (da) morning — feminine
- **habeen** (ka) night — masculine

Sometimes gender is used to keep words that would otherwise be identical (homonyms) distinct:
- **ey** (ga) dog — masculine vs **ey** (da) bitch/dogs — feminine
- **inan** (ka) boy — masculine vs **inan** (ta) girl — feminine', NULL, 'grammar', '{"conceptId": "concept:noun-gender"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch05:masculine-article-changes', 'lesson:zorc:chapter-05', 'text/markdown', '## Changes Affecting Masculine Nouns

### Exercise 1: Change of -e to -a and of -ka to -ha
With masculine nouns ending in a vowel, the k- ending changes to **-h-**, and the vowel will match that of the suffix.

For nouns ending in **-e**, change final -e to -a and -ka to -ha:
- **dukaanle** (shopkeeper) → **dukaanlaha**
- **aabbe** (father) → **aabbaha**
- **bare** (teacher) → **baraha**

### Exercise 3: Change of -o to -a and of -ka to -ha
Same rule for nouns ending in **-o**:
- **biyo** (water) → **biyaha**
- **ilmo** (child) → **ilmaha**
- **gacmo** (hands) → **gacmaha**

### Exercise 5: Change of -ka to -ga
If a masculine noun ends in **-g, -w, -y,** or **-i**, the **k changes to g**:
- **buug** (book) → **buugga**
- **ilig** (tooth) → **iligga**
- **ey** (dog) → **eyga**
- **oday** (old man) → **odayga**
- **askari** (soldier) → **askariga**
- **beri** (day) → **beriga**
- **guri** (house) → **guriga**
- **Soomaali** (Somali man) → **Soomaaliga**
- **taksi** (taxi) → **taksiga**

### Exercise 7: Change of -ka to -a (k disappears)
If a masculine noun ends in **-c, -h, -q, -kh,** or **-x**, the **k is lost**, leaving only the vowel **-a**:
- **dhinac** (side) → **dhinaca**
- **magac** (name) → **magaca**
- **sac** (cow) → **saca**
- **rah** (frog) → **raha**
- **shaah** (tea) → **shaaha**
- **dariiq** (road) → **dariiqa**
- **suuq** (market) → **suuqga**
- **libaax** (lion) → **libaaxa**
- **madax** (head) → **madaxa**', NULL, 'grammar', '{"conceptId": "concept:vowel-harmony"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('zorc:ch06:feminine-article-changes', 'lesson:zorc:chapter-06', 'text/markdown', '## Changes Affecting Feminine Nouns

### Exercise 1: Change of -o to -a and of -ta to -da
With feminine nouns ending in **-o**, the t-ending changes to **-d**, and the vowel matches that of the suffix.

Examples:
- **cunto** (food) → **cuntada**
- **hooyo** (mother) → **hooyada**
- **magaalo** (city) → **magaalada**
- **shaqo** (work) → **shaqada**
- **waddo** (road) → **waddada**

### Exercise 3: Change of -ta to -dha
In dialects with feminine nouns ending in **-dh**, the -ta suffix changes to **-dha**:
- **gabadh** (girl) → **gabadhdha** (alt: **gabar** → **gabarta**)

### Exercise 4: Change of -ta to -da
If a feminine noun ends in a vowel (other than -o) or with **d, h, kh, x, w, y**, or glottal stop, the **t changes to d**:
- **duni** (world) → **dunida**
- **mindi** (knife) → **mindida**
- **Soomaali** (Somali people) → **Soomaalida**
- **dawlad** (government) → **dawladda**
- **dayuurad** (airplane) → **dayuuradda**
- **nabad** (peace) → **nabadda**
- **warqad** (letter) → **warqadda**
- **subax** (morning) → **subaxda**

### Exercise 5: Change of -l + -ta to -sha
A common change involves words ending in **-l**, where the combination of **-l + -t** changes both sounds to **sh**:
- **wil** (boy) → **wiilasha** (the boys — with stress-tone on premodifier form).', NULL, 'grammar', '{"conceptId": "concept:vowel-harmony"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:sov-word-order-explanation', 'lesson:colloquial:unit-04', 'text/markdown', 'Somali follows **SOV (Subject-Object-Verb)** word order. The basic declarative sentence structure is: **[Subject clitic] + [Object] + [Preverbal prepositions] + [Verb]**. For example: *Waan akhriyay* (I read it), *Way ka baxday* (She left from there), *Wuu tegey* (He went). The mood classifier (waa, baa, ma) comes as close to the verb as possible, carrying the subject clitic fused to it.', NULL, 'grammar', '{"conceptId": "concept:sov-word-order"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:subject-clitic-explanation', 'lesson:colloquial:unit-01', 'text/markdown', '**Subject clitics** are bound pronominal forms that attach to mood classifiers (waa, baa, ma). They fuse with the classifier to indicate the subject of the sentence. Common forms: **waan** (I), **waad** (you sg.), **wuu** (he/it m.), **way** (she/it f. / they), **waannu** (we excl.), **weynu** (we incl.), **weydin** (you pl.). These are found on pages 14-16 of Colloquial Somali. For example: *Wuu baxay* "He left", *Way tegeen* "They went".', NULL, 'grammar', '{"conceptId": "concept:subject-clitic"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:object-clitic-explanation', 'lesson:colloquial:unit-04', 'text/markdown', '**Object clitics** are bound pronominal object markers that appear before the verb, after any preverbal prepositions. Somali object pronouns include: **i** (me), **ku** (you sg.), **ka** (him/it), **na** (us), **idin** (you pl.). Third person object pronouns are usually null (implied). Object pronouns fuse with prepositions: **ii** (to me = i+u), **kuu** (to you = ku+u), **kugu** (in you = ku+ku), **kaga** (from him = ka+ka), **kuula** (to you with = ku+u+la).', NULL, 'grammar', '{"conceptId": "concept:object-clitic"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:cliticization-explanation', 'lesson:colloquial:unit-04', 'text/markdown', '**Cliticization** is the process by which bound morphemes (clitics) attach to host words. In Somali, subject pronouns cliticize to mood classifiers: waa+aan → waan, waa+uu → wuu, baa+uu → buu. Object pronouns cliticize to prepositions: i+u → ii, ku+u → kuu. Directional particles (soo, sii) also cliticize to the verb stem. This process is central to Somali grammar and must be understood early.', NULL, 'grammar', '{"conceptId": "concept:cliticization"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:preverbal-prep-explanation', 'lesson:colloquial:unit-04', 'text/markdown', '**Preverbal prepositions** in Somali are short bound morphemes that occur immediately before the verb: **u** (to, for — dative), **ku** (in, at, by means of — locative/instrumental), **ka** (from, about — ablative), **la** (with — comitative, or impersonal "one"). These prepositions cliticize to the verb and fuse with object pronouns that precede them. Example: *Maxmuud waan u sheegayaa* "I am telling (it to) Maxmuud", *Caano koobka ku shub* "Pour the milk into the cup".', NULL, 'grammar', '{"conceptId": "concept:preverbal-preposition"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:directional-particle-explanation', 'lesson:colloquial:unit-01', 'text/markdown', '**Directional particles** indicate motion relative to the speaker: **soo** means "hither" (toward the speaker) and **sii** means "thither" (away from the speaker). These particles precede the verb and are an important part of Somali verbal syntax. Example: *Soo dhowow!* "Come in!" (lit. come hither near), *Soo fadhiiso* "Sit down!" (lit. come hither sit). Directionals are frequently used in imperatives and with motion verbs.', NULL, 'grammar', '{"conceptId": "concept:directional-particle"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:preposition-fusion-explanation', 'lesson:colloquial:unit-03', 'text/markdown', '**Preposition fusion** occurs when a preverbal preposition combines with an object pronoun to form a single fused word. Examples: **ii** (to me = i+u), **kuu** (to you = ku+u), **kugu** (in/on you = ku+ku), **kaga** (from him = ka+ka), **kula** (with you = ku+la), **kuula** (to you with = ku+u+la), **loola** (to one with = la+u+la), **kiidin** (from you pl. = ka+idin). These fused forms must be memorized as they are used constantly in natural speech.', NULL, 'grammar', '{"conceptId": "concept:preposition-fusion"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:independent-pronoun-explanation', 'lesson:colloquial:unit-01', 'text/markdown', '**Independent pronouns** are standalone pronouns used for emphasis, contrast, or disambiguation. They are not bound to the verb or classifier. Forms: **aniga** (I), **adiga** (you sg.), **isaga** (he), **iyaga** (they). Independent pronouns are used when the regular clitic pronouns would be ambiguous or when special emphasis is needed. They are much less common than clitic pronouns in everyday Somali.', NULL, 'grammar', '{"conceptId": "concept:independent-pronoun"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:example-greeting-dialogue', 'lesson:colloquial:unit-01', 'text/markdown', '**Greeting dialogue (Yoonis and Bill):** Yoonis: *Waryaa Bill, subax wanaagsan.* Bill: *Waryaa Yoonis, subax wanaagsan, ma nabad baa?* Yoonis: *Waa nabad. Is ka warran!* Bill: *Waa la fiicanyahay.* Translation: "Hi Bill, good morning. Hi Yoonis, good morning, are things well? Things are well. How are you? I am well." Note the use of *waa* (declarative) and *la* (impersonal "one") in *Waa la fiicanyahay*.', NULL, 'grammar', '{"conceptIds": ["concept:subject-clitic", "concept:impersonal-pronoun"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:example-shopping-dialogue', 'lesson:colloquial:unit-03', 'text/markdown', '**Shopping dialogue:** Yoonis: *Dukaanka ma tagtay?* Bill: *Haa, waan tegey.* Yoonis: *Caleen shaah ma ka keentay?* Bill: *Haa, caleen shaah iyo caano iyo sonkorba waan ka keenay.* Yoonis: *Wax kale ma ka keentay?* Bill: *Maya; laybreerigase waan tegey buugna waan ka keenay.* Translation: "Did you go to the shop? Yes, I went. Did you bring tea leaves? Yes, I brought tea leaves, milk and sugar. Anything else? No; but I went to the library and brought a book." Note *waan tegey* (I went), *waan ka keenay* (I brought from there), *buugna* (book + and).', NULL, 'grammar', '{"conceptIds": ["concept:subject-clitic", "concept:preverbal-preposition"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:example-bill-afrika', 'lesson:colloquial:unit-03', 'text/markdown', '**Bill in Africa narrative:** *Bill geeska Afrika wuu tegi doonaa. Bill waa macallin. Af ingiriisiga wuu dhigaa. Imminkase af Soomaaliga buu bartaa, waayo geeska Afrika ayuu tegi doonaa laba bilood ka dib. Af ingiriisiga buu ka dhigi doonaa dugsi ku yaal magaalada Burco.* Translation: "Bill is going to go to the Horn of Africa. Bill is a teacher. He teaches English. But now he is learning Somali because he is going to the Horn of Africa in two months. He will teach English at a school in the town of Burco." Note the focus construction *buu* (baa+uu) and preverbal *ka* (from) in *ka dhigi doonaa*.', NULL, 'grammar', '{"conceptIds": ["concept:subject-clitic", "concept:preverbal-preposition"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:example-monday-morning', 'lesson:colloquial:unit-03', 'text/markdown', '**Monday morning routine:** *Waa isniin, subaxnimo. Canabi waa toostay. Shaaha way sameynaysaa. Qol kale way galaysaa. Caruurta way toosinaysaa. Ninkeedu masaajidka ayuu tagay, imminkana guriga wuu galayaa. Dabadeedna qoysku waa wada quraacanayaa. Shaah way cabbayaan kibis subaglehna way cunayaan.* Translation: "It is Monday morning. Canab has got up. She is making tea. She goes into another room. She is waking the children. Her husband went to the mosque, and now he is entering the house. Then the family is having breakfast together. They are drinking tea and eating bread with butter."', NULL, 'grammar', '{"conceptIds": ["concept:subject-clitic", "concept:sov-word-order"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:example-zorc-basic', 'lesson:zorc:ch-08', 'text/markdown', '**Zorc Chapter 8 — Past Tense and Verbal Pronouns:** From the Zorc textbook (pp. 55-65), we learn the system of **pronoun fusion** with classifiers. The declarative marker *waa* combines with subject pronouns: *waan* (I), *waad* (you), *wuu* (he), *way* (she/they). The focus marker *baa* combines: *baan* (I), *baad* (you), *buu* (he), *bey* (she/they). The question marker *ma* combines: *maan* (I), *maad* (you), *muu* (he), *mey* (she/they). This fusion is a defining feature of Somali clausal syntax.', NULL, 'grammar', '{"conceptIds": ["concept:subject-clitic", "concept:cliticization"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:example-preverb-paradigm', 'lesson:colloquial:unit-04', 'text/markdown', '**Preverbal preposition examples from Colloquial Somali:** *Maxmuud waan u sheegayaa* "I am telling (it to) Maxmuud" — *u* = to/for. *Shimbirtu geedka way ka duushay* "The bird flew from the tree" — *ka* = from. *Caano koobka ku shub* "Pour the milk into the cup" — *ku* = in/into. *Waa la fiicanyahay* "One is well/I am well" — *la* = impersonal "one". The order is always: [subject clitic] + [object pronoun] + [preposition] + [verb].', NULL, 'grammar', '{"conceptId": "concept:preverbal-preposition"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('syntax:example-waa-pronoun-combo', 'lesson:colloquial:unit-01', 'text/markdown', '**waa + subject pronoun combinations (p. 16):** The declarative particle *waa* fuses with subject pronouns to form single words: **waan** (waa+aan, I), **waad** (waa+aad, you sg.), **wuu** (waa+uu, he/it m.), **way** (waa+ay, she/it f. / they), **waynu** (waa+aynu, we incl.), **waannu** (waa+aannu, we excl.), **weydin** (waa+aydin, you pl.). These fused forms are obligatory in positive declarative sentences.', NULL, 'grammar', '{"conceptId": "concept:subject-clitic"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:dialogue', 'lesson:colloquial:unit-01', 'text/markdown', 'E**Setting:** Bill is learning Somali in London in preparation for a trip to the Horn of Africa. He meets a Somali friend called Yoonis.

**Yoonis:** Waryaa Bill, subax wanaagsan.
**Bill:** Waryaa Yoonis, subax wanaagsan, ma nabad baa?
**Yoonis:** Waa nabad. Is ka warran!
**Bill:** Waa la fiicanyahay.

**English:**
**Yoonis:** Hi, Bill. Good morning.
**Bill:** Hi, Yoonis! Good morning. Are things well? (lit.: is it peace?)
**Yoonis:** Things are well. (lit.: it is peace) How are you?
**Bill:** I am well. (lit.: one is well)', NULL, 'grammar', '{"speakers": ["Yoonis", "Bill"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:vocabulary', 'lesson:colloquial:unit-01', 'text/markdown', 'E**Key vocabulary introduced in Unit 1**

| Somali | English | POS | Notes |
|--------|---------|-----|-------|
| fiican | well, good | adj | |
| yahay | he/it (m.) is | verb | conj 1 |
| waryaa | hi (greeting) | interj | used to address men |
| subax | morning (f. d2) | noun | |
| wanaagsan | good | adj | |
| nabad | peace | noun | |
| waa | positive declarative/focus marker | particle | see grammar |
| is ka warran | give news about oneself | phrase | greeting: "How are you?" |
| la | impersonal pronoun "one" | pronoun | |
| -ay | vocative suffix (female names) | suffix | |
| -éw / -ow | vocative suffix (male names) | suffix | |
| Canab | Canab (woman''s name) | noun | |
| Faadumo | Faadumo (woman''s name) | noun | |
| Yoonis | Yoonis (man''s name) | noun | |
| Maxamed | Mohamed (man''s name) | noun | |
| warran | give news! (sg. imperative) | verb | |
| keen | bring! (sg. imperative) | verb | conj 1 |
| tag | go! (sg. imperative) | verb | conj 1 |
| cun | eat! (sg. imperative) | verb | conj 1 |
| jooji | stop! (sg. imperative) | verb | conj 2A |
| sug | wait! (sg. imperative) | verb | conj 1 |
| akhri | read! (sg. imperative) | verb | conj 1 |
| qor | write! (sg. imperative) | verb | conj 1 |
| fur | open! (sg. imperative) | verb | conj 1 |
| shaah | tea (m.) | noun | |
| éy | dog (m. d5) | noun | |
| sonkor | sugar (m.) | noun | |
| ma | question marker / positive interrogative classifier | particle | |', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:grammar-greetings', 'lesson:colloquial:unit-01', 'text/markdown', 'E## Using greetings and replying to them

There are quite a few greetings and responses to greetings in Somali. The ones given above are very commonly used, especially: **Is ka warran!**

We shall learn other greetings during the course.

There is **no distinction** in Somali between informal and formal address. This means that you greet and address all people in the same way whether they are young or old, prime minister or cleaner.

The word **waryaa** is not used to address women. If you know a woman''s name you use that in the vocative (or address) form given below. If you do not know her name you simply use the greetings straight away.

**Key greeting phrases:**
- *Subax wanaagsan* — Good morning
- *Ma nabad baa?* — Are things well? (lit.: is it peace?)
- *Waa nabad* — Things are well (lit.: it is peace)
- *Is ka warran!* — How are you? (lit.: give news about yourself!)
- *Waa la fiicanyahay / Waa la wanaagsanyahay* — I am well (lit.: one is well)
- *Nabad gelyo* — Goodbye (lit.: go in peace)

**Cultural note:** Always use these greetings, as well as the other ones you will come to learn, when you meet Somali friends. Greetings are an essential part of Somali social interaction.', NULL, 'grammar', '{"conceptId": "concept:somali-greetings"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:grammar-vocative', 'lesson:colloquial:unit-01', 'text/markdown', 'E## The vocative form

The vocative form in Somali is formed by the addition of:
- **-ay** on female names and nouns
- **-éw / -ow** on male names and nouns

**Examples:**
- Canab → **Canabay!** (Canab!)
- Faadumo → **Faadumay!** (Faadumo!)
- Yoonis → **Yooniséw!** (Yoonis!)
- Maxamed → **Maxamedéw!** (Mohamed!)

If the word ends in a vowel then that vowel is deleted and the vocative ending added straight after the final consonant.

**Examples from exercise:**
- Women: Maryan → Maryanay, Zaynab → Zaynabay, Jawaahir → Jawaahiray
- Men: Cartan → Cartanow, Maxmuud → Maxmuudow, Cabdinuur → Cabdinuurew', NULL, 'grammar', '{"conceptId": "concept:vocative-form"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:grammar-imperative', 'lesson:colloquial:unit-01', 'text/markdown', 'E## The imperative

**Example:** Wérran! ''Give news!''

The singular imperative (or order form) in Somali is the **basic form of the verb**. This means that it is the form found in dictionary entries. Also, it is the form we need to know in order to build any other mood or tense of the verb.

**Key points about the imperative in Somali:**

1. **No formality distinction**: Whereas in English we might use a form such as ''Would you please...?'' when speaking to somebody formally, in Somali the imperative is used when speaking to everybody.

2. **No word for ''please''**: There is no word for ''please'' in Somali. This widespread use of the imperative does not imply being blunt or rude — it is simply a fact of the Somali language.

3. **Stress-tone pattern**: Stress-tone on the penultimate vowel, or the only vowel if there is only one.

**Plural imperative formation:**
Add **-a** to the singular imperative. If the verb ends in **-i** then **y** is inserted. The stress-tone in plural imperatives is also on the penultimate vowel, but on the plural form.

**Examples:**
- Warran! (sg.) → Warrama! (pl.) — Give news!
- Kéen! (sg.) → Keéna! (pl.) — Bring it!
- Tag! (sg.) → Tag! (pl.) — Go! (no ending needed)
- Cun! (sg.) → Cuna! (pl.) — Eat it!
- Jooji! (sg.) → Joojiya! (pl.) — Stop!
- Sug! (sg.) → Suga! (pl.) — Wait!', NULL, 'grammar', '{"conceptId": "concept:imperative-mood"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:grammar-object-pronouns', 'lesson:colloquial:unit-01', 'text/markdown', 'E## Third person object pronouns

The third person object pronouns in English (it/him/her/them) **do not have any overt translation** in Somali. This means that there are no actual words which are the Somali equivalents of ''it'', ''him'', ''her'' or ''them''.

**Examples:**
- English: ''Bring it!'', ''Bring him!'', ''Bring her!'', ''Bring them!'' — All translated as **Kéen!**

This applies not just to the imperative but to **all forms of verbs**, as well as to other types of words such as prepositions.

The context invariably provides the means to understanding which pronoun is meant. If an ambiguity is possible, then you may use an independent pronoun (covered later in the course).', NULL, 'grammar', '{"conceptId": "concept:third-person-object-pronouns"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:grammar-questions', 'lesson:colloquial:unit-01', 'text/markdown', 'E## Asking the question ''Is it...?''

The construction **ma ... baa** is used to ask any question of the form ''Is it...?''

**Pattern:** Ma + [noun] + baa?

**Examples:**
- Ma nabad baa? — Is it peace? (Are things well?)
- Ma shaah baa? — Is it tea?
- Ma éy baa? — Is it a dog?

**Answering:** To answer a question of this sort we use the word **waa**. This translates the phrase ''It is...''

**Examples:**
- Waa shaah. — It is tea.
- Waa éy. — It is a dog.
- Waa nabad. — It is peace.

Note: In the dialogue we learnt the sentence *Ma nabad baa?*, literally ''Is it peace?''. This type of construction may be used to ask any question of the form ''Is it...?''.', NULL, 'grammar', '{"conceptId": "concept:question-ma-baa"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:exercises', 'lesson:colloquial:unit-01', 'text/markdown', 'E## Exercises

**Exercise 1** — Reply to the following greetings:
1. Ma nabad baa?
2. Is ka warran!

**Exercise 2** — Give the vocative forms of the following names:
1. Women: Maryan, Zaynab, Jawaahir.
2. Men: Cartan, Maxmuud, Cabdinuur.

**Exercise 3** — Practise saying the following imperative verbs. Pay attention to the stress-tone pattern; convert the singular imperatives into plural imperatives:
1. Keen! Bring it!
2. Tag! Go!
3. Cun! Eat it!
4. Jooji! Stop!
5. Sug! Wait!

**Exercise 4** — Write down all the possible English translations of the following Somali sentences. The meanings of the verbs are given in brackets:
1. Akhri! (read)
2. Cun! (eat)
3. Eeg! (look at)
4. Qor! (write)
5. Fur! (open)

**Exercise 5** — Fill in the blanks:
1. Ma shaah ___? Is it tea?
2. ___ shaah. It is tea.
3. Ma ___? Is it peace?
4. ___ nabad. It is peace.
5. Ma sonkor ___? Is it sugar?
6. ___ sonkor. It is sugar.', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u01:reading', 'lesson:colloquial:unit-01', 'text/markdown', 'E## Reading practice

**Vocabulary:**
- halkaas — there
- qoray — I wrote
- ka — from
- nin — man
- buug fiican — a good book
- aammusa — be quiet (pl.)
- dabadeedna — and then
- aammus — to be quiet
- warqad — letter
- akhriyayaa — I am reading

**Text:**
Maryan guriga way ka baxday, laybreerigana way tagtay. Halkaas buug way ka heshay, wayna akhriday. Maxamed laybreeriga wuu galay.

**Maxamed:** Maryanay, is ka warran!
**Maryan:** Waryaa Maxamed, waa la wanaagsanyahay. Ma nabad baa?
**Maxamed:** Waa nabad. Ma buug fiican baa?
**Maryan:** Haa, waa buug fiican. Waan akhriyay, dabadeedna warqad waan qoray.
**Maxamed:** Waa yahay, Maryan, nabad gelyo.
**Maryan:** Nabad gelyo, Maxamed.
**Nin kale:** Aammusa! Waan akhriyayaa.

**English:**
Maryan left the house and went to the library. She took a book and read it. Maxamed entered the library:

**Maxamed:** Maryan, how are you?
**Maryan:** Hi, Maxamed, I am well. How are you?
**Maxamed:** I am well. Is it a good book?
**Maryan:** Yes, it is a good book. I read it then I wrote a letter.
**Maxamed:** Right. Goodbye, Maryan.
**Maryan:** Goodbye, Maxamed.
**Another man:** Be quiet! I am reading.

**Notes:**
1. Note that this verb is one which ends in an n which is also an m: see the pronunciation guide.
2. Note that when a verb is given in its basic form in vocabularies and the glossary there will be no stress-tone given, since this is added according to the mood and tense of the verb.
3. Note that this is only with the conjugation 1 verbs which rarely end in i. Conjugation 2A verbs also end in -i and another sound change occurs with them.', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:dialogue', 'lesson:colloquial:unit-02', 'text/markdown', 'E**Setting:** Zaynab visits Canab at home

**Vocabulary:**
- galab — afternoon
- miyaa — question word: ''Is it...?''
- maxaad — what + you
- sheegtay — you told
- maxaad sheegtay — how are you (lit. ''what did you tell?'')
- waa la wanaagsanyahay — I am well (lit: ''one is well'')
- soo — a particle meaning towards the speaker
- dhowow — to move nearer
- soo dhowow — come in
- ayey — focus marker (ayaa) + ''they''; here the word guriga is focused
- galaan — they enter
- fadhiiso — to sit down
- soo fadhiiso — sit down (most common phrase used)
- koob shaah ah — ''a cup of tea'' (lit: ''a cup which is tea''; the word ah is needed here)
- doonaysaa — you want, you are wanting
- in — part, amount
- yar — small
- ka dib — after
- kan — this
- waa kan — here it is (lit.: it is this)
- mahadsanid — thank you

**Dialogue:**
**Canab:** Zaynabay, galab wanaagsan. Nabad miyaa?
**Zaynab:** Waa nabad. Maxaad sheegtay?
**Canab:** Waa la wanaagsanyahay.
**Zaynab:** Soo dhowow.

*Guriga ayay galaan.* (They enter the house.)

**Zaynab:** Soo fadhiiso. Koob shaah ah ma doonaysaa?
**Canab:** Haa.
**Zaynab:** (In yar ka dib) Waa kan.
**Canab:** Mahadsanid.

**English:**
**Canab:** Zaynab, good afternoon. Are things well?
**Zaynab:** Things are well. How are you?
**Canab:** I am well. (lit. one is well)
**Zaynab:** Come in.
*They enter the house.*
**Zaynab:** Sit down. Would you like a cup of tea?
**Canab:** Yes.
**Zaynab:** (After a short while) Here it is.
**Canab:** Thank you.', NULL, 'grammar', '{"speakers": ["Canab", "Zaynab"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:vocabulary', 'lesson:colloquial:unit-02', 'text/markdown', 'E**Key vocabulary introduced in Unit 2**

| Somali | English | POS | Gender/Class |
|--------|---------|-----|-------------|
| galab | afternoon (f. d3) | noun | fem |
| miyaa | question word: ''Is it...?'' | particle | |
| maxaad | what + you | pronoun | |
| sheeg(tay) | to tell | verb | conj 1 |
| soo | particle: towards speaker | particle | |
| dhowow | to move nearer | verb | |
| fadhiiso | to sit down | verb | conj 2A |
| koob | cup (m. d2) | noun | masc |
| ah | which is, that is (relative) | particle | |
| doon(aysaa) | to want | verb | conj 1 |
| in | part, amount | noun | |
| yar | small (adj.) | adjective | |
| ka dib | after | phrase | |
| kan | this (m.) | demonstrative | |
| mahadsanid | thank you | phrase | |
| habeen | evening/night (m.) | noun | masc |
| maalin | day (f. d3) | noun | fem |
| subaxnimo | in the morning | noun | |
| hilib | meat (m. d3) | noun | masc |
| bariis | rice (m. d2 mass) | noun | masc |
| khudrad | vegetables (f. d1 collec.) | noun | fem |
| iibso | to buy | verb | conj 3A |
| wax | thing (m.; pl. waxyaabo m.) | noun | masc |
| dukaan | shop (m. d2) | noun | masc |
| buug | book (m. d2) | noun | masc |
| laybreeri | library (f. d2) | noun | fem |
| caleen | leaves | noun | |
| caano | milk | noun | fem |
| sonkor | sugar (m.) | noun | masc |
| iyo | and (joins noun phrases) | conjunction | |
| -na | and (joins sentences) | clitic | |
| nabad gelyo | goodbye | phrase | |
| maya | no | particle | |
| haa | yes | particle | |
| fiican | well, good | adjective | |
| nin | man (m. d4) | noun | masc |
| naag | woman (f. d1) | noun | fem |
| guri | house (m. d1) | noun | masc |
| akhri | to read | verb | conj 1 |
| keen | to bring | verb | conj 1 |
| tag | to go | verb | conj 1 |
| qor | to write | verb | conj 1 |
| samee | to do, make | verb | conj 2B |
| fuul | to climb | verb | conj 1 |
| bar | to teach | verb | conj 1 |
| fur | to open | verb | conj 1 |
| xidh | to close | verb | conj 1 |
| gal | to enter | verb | conj 1 |
| bax | to leave, go out | verb | conj 1 |
| qaado | to take | verb | conj 3A |
| dhig | to put down, teach | verb | conj 1 |
| doon | to want, look for | verb | conj 1 |
| gaadh | to arrive, reach | verb | conj 1 |
| heshay | you/she found | verb | past |
| tegey | I/he went | verb | past |
| keentay | you brought | verb | past |
| qortay | you/she wrote | verb | past |
| akhriday | you/she read | verb | past |
| waa yahay | right, OK (lit.: it is) | phrase | |', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-time-greetings', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Greetings for particular times of the day

**When meeting someone:**
- **subax wanaagsan** — good morning
- **galab wanaagsan** — good afternoon
- **habeen wanaagsan** — good evening
- **maalin wanaagsan** — good day

**When leaving:**
- **nabad ku bari** — good night (lit.: ''break the day in peace'')
- **nabad ma ku bariday?** — good morning response (lit.: ''did you break the day in peace?'')

Note: Habéen wanaagsan may also be used when you are leaving somebody in the evening. All of these greetings are used when meeting someone.', NULL, 'grammar', '{"conceptId": "concept:time-greetings"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-miyaa', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Using miyaa

The use of **miyaa** is equivalent to the use of **ma ... baa** learned in Unit 1.

**Pattern:** [Noun] miyaa?

**Examples:**
- Nabad miyaa? — Is it peace?
- Shimbir miyaa? — Is it a bird?
- Karsi miyaa? — Is it a chair?
- Kubbad miyaa? — Is it a ball?

**Answering:** Use waa.
- Shimbir miyaa? — Waa shimbir. (Is it a bird? — It is a bird.)
- Karsi miyaa? — Waa karsi. (Is it a chair? — It is a chair.)
- Kubbad miyaa? — Waa kubbad. (Is it a ball? — It is a ball.)

In the dialogue, Canab says *Nabad miyaa* which is the same structure as *Ma nabad baa?* from Unit 1.', NULL, 'grammar', '{"conceptId": "concept:question-miyaa"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-present-progressive', 'lesson:colloquial:unit-02', 'text/markdown', 'E## The present progressive of conjugation 1

Of the two present tenses, the present progressive is probably used more in general conversation than the general present. The present progressive tense is used for actions that are currently in progress. In English this is rendered by the verb form, for example, ''I am running''. This tense may also be used for an action that is to happen in the near future, for example the sentence *Waan cunayaa* may mean ''I am eating it'' or ''I will eat it (very soon)'', i.e. ''I am about to eat it''.

**Formation:** The basic form of the verb + progressive marker **-ay-** + present tense endings.

**With keen (to bring):**

| Person | Stem | Prog. | Ending | Form |
|--------|------|-------|--------|------|
| I | keen | ay | aa | keenayaa |
| you (sg.) | keen | ay | taa | keenaysaa |
| he, it (m.) | keen | ay | aa | keenayaa |
| she, it (f.) | keen | ay | taa | keenaysaa |
| we | keen | ay | naa | keenaynaa |
| you (pl.) | keen | ay | taan | keenaysaan |
| they | keen | ay | aan | keenayaan |

**Stress-tone:** Placed on the vowel immediately preceding the progressive marker.

**Important sound change:** When a present tense ending beginning with **-t-** follows the progressive marker **-ay-**, the **-t- changes to -s-**.

**With dhis (to build):**

| Person | Stem | Prog. | Ending | Form |
|--------|------|-------|--------|------|
| I | dhis | ay | aa | dhisayaa |
| you (sg.) | dhis | ay | taa | dhisaysaa |
| he, it (m.) | dhis | ay | aa | dhisayaa |
| she, it (f.) | dhis | ay | taa | dhisaysaa |
| we | dhis | ay | naa | dhisaynaa |
| you (pl.) | dhis | ay | taan | dhisaysaan |
| they | dhis | ay | aan | dhisayaan |

**With akhri (to read):** When the progressive ending is added to a verb ending in **-i**, the letter **y** is inserted between **i** and **a**.

- Waan akhriyayaa. — I am reading.', NULL, 'grammar', '{"conceptId": "concept:present-progressive"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-nouns', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Nouns in Somali

### Gender
There are two genders for nouns in Somali: **masculine** and **feminine**. For some words the gender is obvious, e.g. naag (woman) is feminine, whereas nin (man) is masculine. In other cases, the gender must be learnt with the noun.

**Important:** In the plural the gender of a noun is often different to that of the singular. For example, the word **naag** (woman) is feminine in the singular but the plural **naago** is grammatically masculine. Equally **inan** (boy) is masculine in the singular but the plural **inammo** is grammatically feminine.

### Declensions
Nouns are classified into groups called declensions. The members of a particular declension share certain characteristics: the way the plural is formed, the gender of plural nouns, and the stress-tone pattern.

**Characteristics given for each declension:**
- Stress-tone pattern in singular and plural
- Gender in singular and plural
- Word shape in the singular
- Plural formation', NULL, 'grammar', '{"conceptId": "concept:somali-nouns"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-declension1', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Declension 1

**Stress-tone pattern:**
- Singular masculine: on the penultimate vowel
- Singular feminine: on the final vowel
- Plural: no stress-tone on any vowel

**Gender:** Singular mostly feminine; plural always masculine
**Word shape in singular:** Do not end in -o
**Plural formation:** Add -o

**Sound change:** If the singular ends in -i, add -yo in the plural.

**Examples:**
| Singular | English | Plural | English |
|----------|---------|--------|---------|
| warqad | letter | warqado | letters |
| saacad | hour, clock, watch | saacado | hours, clocks, watches |
| naag | woman | naago | women |
| shimbir | bird | shimbiro | birds |
| mindi | knife | mindiyo | knives |
| guri | house | guriyo | houses |', NULL, 'grammar', '{"conceptId": "concept:declension-1"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-declension2', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Declension 2

**Stress-tone pattern:**
- Singular masculine: on the penultimate vowel
- Singular feminine: on the final vowel
- Plural: no stress-tone on any vowel

**Gender:** Singular mostly masculine; plural always feminine
**Word shape in singular:** Mostly more than one syllable, do not end in -e
**Plural formation:** Add -o (with sound changes)

**Sound changes:**
(a) If singular ends in -i → add -yo: tagsi → tagsiyo (taxis)
(b) If singular ends in guttural consonant, j or s → add -yo: sac → sacyo (cows), nacas → nacasyo (fools), dariiq → dariiqyo (roads)
(c) If singular ends in b, d, dh, r, l, or n → consonant is doubled: albaab → albaabbo (doors), baabuur → baabuurro (lorries), sanad → sanaddo (years)
(d) If singular ends in n (changes to m) → m is geminated: inan → inammo (boys)', NULL, 'grammar', '{"conceptId": "concept:declension-2"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-declension3', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Declension 3

**Stress-tone pattern:**
- Singular masculine: on the penultimate vowel
- Singular feminine: on the final vowel
- Plural: no stress-tone on any vowel

**Gender:** Singular masculine or feminine; plural always masculine
**Word shape in singular:** ChV(V)CVC pattern (C=consonant, V=vowel)
**Plural formation:** Add -o and delete the final vowel of the singular

**Sound changes:** Sometimes the singular noun''s final consonant changes because the sound of the basic form is not one that can occur at the end of a syllable.

**Examples:**
| Singular | English | Plural | English |
|----------|---------|--------|---------|
| ilig | tooth | ilko | teeth |
| qalin | pen | qalmo | pens |
| galab | afternoon | galbo | afternoons |
| maalin | day | maalmo | days |
| hilib | meat | hilbo | meats |
| xadhig | rope | xadhko | ropes |
| gabadh | girl | gabdhaha | girls |', NULL, 'grammar', '{"conceptId": "concept:declension-3"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:grammar-and', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Saying ''and''

Two words meaning ''and'' in Somali: **-na** and **iyo**.

### -na
This word is attached to other words. It is used to join two positive declarative or imperative sentences together and is added to the first grammatical unit of the second sentence.

**Example:**
- Guriga wuu tegey wuuna galay. — He went to the house and entered it.

### iyo
This word is used to join nouns or noun phrases together.

**Example:**
- nabad iyo caano — peace and milk

When there is a list of more than two nouns, **iyo** is generally placed between the final two members of the list only, as in English.

**Example:**
- Maxamed, Idriis iyo Maxmuud way sugeen. — Maxamed, Idriis and Maxmuud waited.

Other words meaning ''and'' which join other types of phrase will be learned later in the course.', NULL, 'grammar', '{"conceptId": "concept:conjunction-and"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:exercises', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Exercises

**Exercise 3** — Write out all the forms of the present progressive tense of the following verbs:
1. xidh — to close
2. dhig — to put down, teach
3. bar — to teach
4. doon — to want, wish
5. gaadh — to arrive, reach, catch up with
6. akhri — to read

**Exercise 4** — Reply positively to the following questions:
1. Guriga miyay ka baxayaan?
2. Laybreeriga miyaydin tegaysaan?
3. Buug miyay akhriyaysaa?
4. Shandadda miyaad furaysaa?
5. Warqad miyuu qorayaa?

**Exercise 5** — Translate the following sentences into Somali:
1. Maxamed is eating.
2. Ruqiya is entering the house.
3. Cali is reading it.
4. They reached the library.
5. Did he take the chair?
6. They are building the house.

**Exercise 6** — Give the plural form of the following nouns (declension 1):
1. beer — garden, farm
2. sabab — reason
3. daar — stone building
4. kab — shoe
5. qayb — part, share
6. saaxiibad — female friend

**Exercise 7** — Give the singular form of the following plural nouns (declension 1):
1. saacado — hours, clocks
2. jidho — bodies
3. dayuurado — aeroplanes
4. su''aalo — questions
5. dhakhtarado — female doctors
6. bilo — months

**Exercise 8** — Give the plural forms (declension 2):
1. gidaar — wall
2. barnaamij — programme
3. madax — head
4. bangi — bank
5. subax — morning
6. laybreeri — library

**Exercise 9** — Give the singular form (declension 2):
1. dukaammo — shops
2. kursiyo — chairs
3. casharro — lessons
4. dhakhtarro — doctors
5. baabuurro — cars, lorries
6. laabbisyo — pencils

**Exercise 10** — Change singular nouns to plurals and plural nouns to singular (declension 3):
1. gabadh — girl
2. gacmo — hands
3. garab — shoulder
4. jilib — knee
5. kibis — bread
6. warmo — spears

**Exercise 11** — Translate into Somali:
1. They built roads.
2. Today they are going to markets.
3. They took chairs.
4. She brought pencils.
5. Will you bring shoes?

**Exercise 12** — Join together the following words or sentences in the correct manner and translate:
1. buug qalin
2. Guriga waan galay. Shaah waan cabbay.
3. Hargeysa Muqdishu Baydhaba Harar
4. Guriga waydin ka baxdeen. Albaabka waydin xidheen.
5. Buug waan akhriyay. Warqad waan qoray.
6. kibis subag shaah sonkor', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u02:reading', 'lesson:colloquial:unit-02', 'text/markdown', 'E## Reading practice: Shamis sees Idil

**Vocabulary:**
- fiicanahay — I am well
- Illaah mahaddi — thanks be to God
- qoyska — the family
- maxaad sameynaysaa? — what are you doing?
- mahaddi — to thank
- ninkay — my husband
- carruurtay — my children
- xeebta — the coast

**Dialogue:**
**Shamis:** Idilay! Is ka warran.
**Idil:** Waa la wanaagsanyahay. Ma nabad baa?
**Shamis:** Waan fiicanahay, Illaah mahaddi.
**Idil:** Qoyska ka warran.
**Shamis:** Way fiicanyihiin.
**Idil:** Maxaad sameynaysaa?
**Shamis:** Ninkay iyo carruurtay baan sugayaa. Xeebta bay tegeen.

**English:**
**Shamis:** Idil! How are you?
**Idil:** I am well. How are things?
**Shamis:** I am well, thanks be to God.
**Idil:** How is the family?
**Shamis:** They are well.
**Idil:** What are you doing?
**Shamis:** I am waiting for my husband and my children. They went to the coast.', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:dialogue', 'lesson:colloquial:unit-03', 'text/markdown', 'E**Setting:** Bill is going to the post office and meets Zaynab

**Vocabulary:**
- boosto (f. d6) — post office
- boosteda — the post office
- xaggee — where (lit.: ''which direction'')
- baad — focus marker baa + pronoun -aad ''you''
- adigu — you (independent pronoun, emphatic)
- suuq (m. d2) — market
- baan — focus marker baa + pronoun -aan ''I''
- ku — you (object pronoun)
- raac — to accompany
- maxaad soo iibsanaysaa — what will you buy?
- hilib (m. d3) — meat
- bariis (m. d2 mass) — rice
- khudrad (f. d1 collec.) — vegetables
- waa tan — here is (f.) (lit.: ''it is this'')
- saaxiibkayga — my friend
- u — to (preverbal preposition)
- dir — send

**Dialogue:**
**Zaynab:** Waryaa, Bill.
**Bill:** Zaynabay, is ka warran.
**Zaynab:** Waa la wanaagsanyahay. Xaggee baad tagaysaa?
**Bill:** Boosta baan tagayaa. Xaggee baad tagaysaa, adigu?
**Zaynab:** Suuqa baan tagayaa.
**Bill:** Waa yahay. Waan ku raacayaa. Maxaad soo iibsanaysaa?
**Zaynab:** Hilib, bariis, sonkor iyo khudradba waan soo iibsanayaa.
**Bill:** Waa yahay. Waa tan boostadu. Warqad baan saaxiibkayga u dirayaa. Nabad gelyo, Zaynab.
**Zaynab:** Nabad gelyo, Bill.

**English:**
**Zaynab:** Hi, Bill.
**Bill:** Hi, Zaynab, how are you?
**Zaynab:** I am well. Where are you going?
**Bill:** I am going to the post office. Where are you going?
**Zaynab:** I am going to the market.
**Bill:** Right. I''ll accompany you. What are you going to buy?
**Zaynab:** I''m going to buy meat, rice, sugar and vegetables.
**Bill:** Right, here''s the post office. I am sending a letter to my friend. Goodbye, Zaynab.
**Zaynab:** Goodbye, Bill.', NULL, 'grammar', '{"speakers": ["Zaynab", "Bill"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:vocabulary', 'lesson:colloquial:unit-03', 'text/markdown', 'E**Key vocabulary introduced in Unit 3**

| Somali | English | POS | Class |
|--------|---------|-----|-------|
| boosto | post office (f. d6) | noun | fem d6 |
| xaggee | where (which direction) | interrogative | |
| suuq | market (m. d2) | noun | masc d2 |
| adigu | you (independent pronoun) | pronoun | emphatic |
| saaxiib | friend (m. d2) | noun | masc d2 |
| raac | to accompany | verb | conj 1 |
| iibso | to buy | verb | conj 3A |
| hilib | meat (m. d3) | noun | masc d3 |
| bariis | rice (m. d2 mass) | noun | masc mass |
| khudrad | vegetables (f. d1 collec.) | noun | fem collec |
| waa tan | here it is (f.) | phrase | |
| u | to (preverbal preposition) | preposition | |
| dir | to send | verb | conj 1 |
| ka | from (preverbal preposition) | preposition | |
| ku | in/at (preverbal preposition) | preposition | |
| la | with (preverbal preposition) | preposition | |
| baan | focus marker baa + -aan ''I'' | particle | |
| baad | focus marker baa + -aad ''you'' | particle | |
| buug | book (m. d2) | noun | masc d2 |
| dukaan | shop (m. d2) | noun | masc d2 |
| guri | house (m. d1) | noun | masc d1 |
| koob | cup (m. d2) | noun | masc d2 |
| warqad | letter (f. d1) | noun | fem d1 |
| shaah | tea (m.) | noun | masc |
| sonkor | sugar (m.) | noun | masc |
| caano | milk (f.) | noun | fem |
| caleen | leaves | noun | |
| caano | milk | noun | fem |
| ka | from | preposition | preverbal |
| ku | in, at, by means of | preposition | preverbal |
| u | to, for | preposition | preverbal |
| la | with | preposition | preverbal |
| -kayga / -tayda | my (possessive suffix m/f) | suffix | |
| nin | man (m. d4) | noun | masc d4 |
| naag | woman (f. d1) | noun | fem d1 |
| wiil | boy, son (m. d4) | noun | masc d4 |
| gabadh | girl (f. d3) | noun | fem d3 |
| mindi | knife (f. d1) | noun | fem d1 |
| albaab | door (m. d2) | noun | masc d2 |
| baabuur | lorry, car (m. d2) | noun | masc d2 |
| kursi | chair (m.) | noun | masc |
| kibis | bread (m. d3) | noun | masc d3 |
| qalin | pen (m. d3) | noun | masc d3 |
| tagsi | taxi (m. d2) | noun | masc d2 |
| taageer | to support | verb | conj 1 |
| keeno | to bring (for oneself) | verb | conj 3 |
| gal | to enter | verb | conj 1 |
| bax | to leave, go out | verb | conj 1 |
| fur | to open | verb | conj 1 |
| xidh | to close | verb | conj 1 |
| qaado | to take (for oneself) | verb | conj 3A |
| keen | to bring | verb | conj 1 |
| tag | to go | verb | conj 1 |
| cun | to eat | verb | conj 1 |
| cab | to drink | verb | conj 1 |
| akhri | to read | verb | conj 1 |
| qor | to write | verb | conj 1 |
| samee | to do, make | verb | conj 2B |
| bar | to teach | verb | conj 1 |
| dhig | to put down, teach | verb | conj 1 |
| hel | to find | verb | conj 1 |
| qaado | to take | verb | conj 3A |
| heshay | found (past) | verb | past |
| tegey | went (past) | verb | past |
| keentay | brought (past) | verb | past |', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-case', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Case in Somali nouns

There are **four cases** in Somali: the absolutive case, the subject case, the genitive case and the vocative case. The vocative case was covered in Unit 1.

### The absolutive case
**Use:** Used in all instances other than when any one of the other cases is used. The citation form (when you say a word on its own) is in the absolutive case. Direct and indirect objects are in the absolutive case. Nouns associated with prepositions are also in this case.
**Form:** The absolutive case is as the citation form. For nouns of declensions 1, 2 and 3 we already know the absolutive form.

Examples: mindi (knife), naag (woman), baabuur (car)

### The subject case
**Use:** Used when the noun is the subject of a sentence. There are two particular cases when subjects are not marked for this case, which will be covered later.
**Form:** When a noun is on its own, without any definite article or other suffix or adjective or genitive noun after it, the form of the subject case is marked by **no stress-tone on any vowels in the word**. Also, on feminine nouns ending in a consonant you must also add **-i**; this also includes women''s names, although with these it is optional.

Examples: mindi (knife, subject), naagi (woman, subject), baabuur (car, subject)

### The premodifier form
**Use:** The form a noun takes when it is part of a noun phrase in which something comes after it (grammatical suffix, another noun, or an adjective).
**Form:** For most nouns the premodifier form is the same as the absolutive form, but for some it is marked by a particular stress-tone pattern.', NULL, 'grammar', '{"conceptId": "concept:somali-case-system"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-word-order', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Word order in Somali

The basic word order in Somali is:

**SUBJECT — OBJECT — VERB**

However, you must not forget to use a mood classifier or one of the focus constructions.

**Examples:**
- Nin waa tegey. — A man went. (subject + mood cl. + verb)
- Nin shiah wuu cabbay. — A man drank tea. (subject + object + mood cl. + pronoun + verb)

The positive declarative mood classifier generally comes **after the subject and object**, as close to the verb as possible.

It is also possible to put objects and nouns associated with preverbal prepositions after the verb.

This word order also holds for imperative sentences:
- Koob keen! — Bring a cup! (object + verb)

**Adverbial words** such as time adverbials come generally at the beginning of the sentence, although they may also come at the end:
- Shaleyto bariis waan cunay. — Yesterday I ate rice. (adverb + object + mood cl. + I + verb)', NULL, 'grammar', '{"conceptId": "concept:word-order-sov"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-definite-article', 'lesson:colloquial:unit-03', 'text/markdown', 'E## The definite article in Somali

In Somali, the definite article is expressed by a **suffix** which begins with **k-** for masculine nouns and **t-** for feminine nouns.

**Forms:**

| | Absolutive | Subject |
|---|-----------|---------|
| Masculine singular | -ka | -ku |
| Feminine singular | -ta | -tu |
| Masculine plural | -ka | -ku |
| Feminine plural | -ta | -tu |

### -kii/-tii (definite article for known/past reference)
This article is used when the noun has previously been referred to in the conversation or if the noun is referred to in the past. It may sometimes be more appropriately translated with the demonstrative ''that'' or ''those''.

**Example:** Buuggii waan akhriyay. — ''I read the book.'' (-kii is used because ''the book'' is referred to in the past; it is presumably a book known to the speaker and hearer.)

### -ka/-ta (definite article for general/first-time reference)
This article is used more generally: when a noun is referred to for the first time, or if the noun is not known to the speaker. It is also generally used when referring to nouns in the future or present.

**Example:** Dukaanka waan tagayaa. — ''I am going to the shop.'' (-ka is used because the shop is generally being referred to in the present/near future.)

**Important sound changes** occur when the definite article is added to nouns ending in vowels and certain consonants. Feminine article changes mirror the verb sound changes from Unit 1.

**Examples with feminine article:**
- nabad + ta → nabadda (the peace)
- gabadh + ta → gabadha (the girl)
- subax + ta → subaxda (the morning)
- inammo + ta → inammada (the boys)

**Examples with masculine article:**
- k disappears after guttural consonants: madax + ka → madaxa (the head), suuq + ki → suuqii (the market)
- k changes to h after vowels (except i): bare + ka → baraha (the teacher), gacmo + ki → gacmihii (the hands)
- k changes to g after g, i, w, y: guri + ki → gurigii (the house), ey + ka → eyga (the dog)', NULL, 'grammar', '{"conceptId": "concept:definite-article"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-declension4', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Declension 4

**Stress-tone pattern:** Singular — on the penultimate or only vowel; Plural — no stress-tone
**Gender:** Singular always masculine; Plural always masculine
**Word shape in singular:** One syllable ending in a consonant
**Plural formation:** Add -a and a copy of the consonant
**Premodifier form:** Singular as absolutive; Plural stress-tone on final vowel

**Note:** There is one exception to the plural gender. The noun **wiil** (boy, son) becomes **wiilal** in the plural but is **feminine** in gender, thus with the definite article becomes **wiilasha**.

**Examples:**
| Singular | English | Plural | English |
|----------|---------|--------|---------|
| miis | table | miisas | tables |
| af | mouth, language | afaf | mouths, languages |
| qoys | family | qoysas | families |
| nin | man | niman | men |
| dab | fire | dabab | fires |
| buug | book | buugag | books |
| koob | cup | koobab | cups |
| dal | country | dalal | countries |
| jir | time, body | jirar | times, bodies |', NULL, 'grammar', '{"conceptId": "concept:declension-4"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-declension5', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Declension 5

**Stress-tone pattern:** Singular — on the penultimate vowel; Plural — on the final vowel
**Gender:** Singular always masculine; Plural always feminine
**Word shape in singular:** 1-3 syllables but never 1 syllable with 1 short vowel
**Plural formation:** Change the gender and stress-tone pattern only
**Premodifier form:** As absolutive in both singular and plural

**Important:** The only difference between singular and plural is in the gender and stress-tone pattern. In writing there is no difference. The definite article and/or verbal agreement shows the gender and therefore the number.

**Examples:**
| Singular | English | Plural | English |
|----------|---------|--------|---------|
| ey | dog | ey | dogs |
| Soomaali | a Somali | Soomaali | Somalis |
| madax | head | madax | heads |
| ardey | student | ardey | students |
| cadey | tooth-brushing stick | cadey/cadayo | tooth-brushing sticks |

**Note:** ''Head'' (madax) is also a declension 2 noun and thus also has the plural form madaxyo. This is an example of a noun with two possibilities.', NULL, 'grammar', '{"conceptId": "concept:declension-5"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-conjugation2a', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Conjugation 2A

This conjugation is formed by adding the suffix **-i** to the basic verb form. The -i makes the verb into a **causative form**: transitive verbs from intransitive verbs.

**Examples:**
- toos (get up) → toosi (cause to get up, wake up trans.)
- kar (boil intr.) → kari (boil trans., cook)
- jab (break intr.) → jabi (break trans.)

**Sound changes when -i is added:**
(a) g or q → j: daag → daaji (cause to graze), hagaag → hagaaji (straighten)
(b) a + guttural consonant → i (vowel assimilation): bax → bixi (cause to leave), ba'' → bi''i (destroy)

### Plural imperative
Add -ya to the base form (same as conjugation 1 verbs ending in -i):
- Bixiya! (Pay! pl.), Kariya! (Cook! pl.)

### General past

| Person | Stem | Ending | Form |
|--------|------|--------|------|
| I | kari | ay | kariyay |
| you (sg.) | kari | tay | karisay |
| he, it (m.) | kari | ay | kariyay |
| she, it (f.) | kari | tay | karisay |
| we | kari | nay | karinnay |
| you (pl.) | kari | teen | kariseen |
| they | kari | een | kariyeen |

**Sound changes:** t→s; y inserted between i and a; n of 1st pl. geminated.

### Present progressive
The base form is the **infinitive** (add -n to base form, stress-tone on i): kari → karin (infinitive)

| Person | Stem | Prog. | Ending | Form |
|--------|------|-------|--------|------|
| I | karin | ay | aa | karinayaa |
| you (sg.) | karin | ay | taa | karinaysaa |
| he, it (m.) | karin | ay | aa | karinayaa |
| she, it (f.) | karin | ay | taa | karinaysaa |
| we | karin | ay | naa | karinaynaa |
| you (pl.) | karin | ay | taan | karinaysaan |
| they | karin | ay | aan | karinayaan |', NULL, 'grammar', '{"conceptId": "concept:conjugation-2a"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-what-is-it', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Asking ''What is it?''

The way to ask ''What is it?'' in Somali is **Waa maxay?**

The reply: **Waa...** (It is...)

**Example:**
- Waa maxay? — What is it?
- Waa qalin. — It is a pen.

Practise using this expression whenever you have the opportunity.', NULL, 'grammar', '{"conceptId": "concept:question-what-is-it"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:grammar-days', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Days of the week

The days of the week in Somali are taken from Arabic names:

| English | Somali | With definite article |
|---------|--------|---------------------|
| Sunday | axad | axadda |
| Monday | isniin | isniinta |
| Tuesday | salaasa | salaasada (sometimes: talaada) |
| Wednesday | arbaca | arbacada |
| Thursday | khamiis | khamiista |
| Friday | jimce | jimcaha |
| Saturday | sabti | sabtida |

**Usage notes:**
- When referring to a particular day, you must use the definite article.
- If referring to a day in the past, use the **-kii/-tii** article.
- If referring to a day in the future or present, use the **-ka/-ta** article.

**Examples:**
- Jimceha waan tagayaa. — I am going on Friday.
- Khamiistii waan helay. — I found it on Thursday.', NULL, 'grammar', '{"conceptId": "concept:days-of-week"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:exercises', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Exercises

**Exercise 6** — Make singular nouns plural and plural nouns singular (declension 4):
1. dab — fire
2. buugag — books
3. koob — cup
4. roobab — rains
5. dal — country
6. sanan — noses

**Exercise 7** — Make singular nouns plural and plural nouns singular. Put in stress-tone marks (declension 5):
1. madax — heads
2. ey — dog
3. awr — burden camel
4. haad — large birds (especially birds of prey)
5. Carab — Arabs
6. dibi — bulls

**Exercise 8** — Translate into Somali:
1. Read the books.
2. He brought the cups.
3. The students entered the university.
4. They reached the country.
5. The birds of prey are waiting.
6. The female doctor refused the letter.

**Exercise 9** — Write out in full the forms of the following verbs in the general past and present progressive:
1. bixi — to cause to leave, extract, pay
2. jooji — to stop
3. dhoofi — to export

**Exercise 10** — Translate into Somali:
1. The woman woke the boy.
2. The man is pasturing the burden camels.
3. Maxamed broke the table.
4. Canab paid.
5. A woman cooked the meat.
6. The enemy destroyed the farm.

**Exercise 11** — Put in the correct endings:
1. Waad keen___. ''You brought it.''
2. Mindi waa jab___. ''The knife broke.''
3. Maanta inamm___ magaal___ way teg___. ''Today the boys went to the town.''
4. Maxamed awr___ wuu daaj___. ''Maxamed grazed the burden camels.''
5. Niman way ka bex___. ''The men left.''

**Exercise 12** — Translate into Somali:
1. Sabtidii awrta way daajiyeen.
2. Khamiistii guriga waan ka baxay.
3. Arbacadii wuu bukay.
4. Isniintii way hagaajisay.
5. Salaasada waan akhriyayaa.', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u03:reading', 'lesson:colloquial:unit-03', 'text/markdown', 'E## Reading practice: Monday morning

**Vocabulary:**
- maanta — today
- isniin — Monday
- jaamacad — university (f. d6)
- jaamacadda — the university
- ardey — student
- saaxiibkiisa — his friend (subject case)
- saaxiibkiisuna — and his friend (subject case)
- magaciisu — his name (subject case)
- buu — focus marker baa + uu ''he''
- raacayaa — is accompanying
- wada — together
- quraacdeen — they had breakfast
- shaah — tea
- cabbeen — they drank
- kibis — bread
- subagleh — with butter (lit.: owning butter)
- cuneen — they ate
- shaleyto — yesterday
- subaxdii — in the morning
- galabtii — in the afternoon
- walaalkay — my brother
- booqday — I visited

**Text:**
Maanta waa isniin. Maxamed waa tagayaa jaamacadda. Maxamed waa ardey saaxiibkiisuna waa ardey. Magaciisu waa Yoonis. Maxamed buu raacayaa. Maanta way wada quraacdeen. Shaah way cabbeen, kibis subaglehna way cuneen.

**Maxamed:** Shaleyto jaamacadda miyaad tagtay?
**Yoonis:** Haa subaxdii waan tagay. Galabtiina walaalkay baan booqday.

**English:**
Today is Monday. Maxamed is going to the university. Maxamed is a student and his friend is a student. His name is Yoonis. He is accompanying Maxamed. Today they had breakfast together. They drank tea and ate bread with butter.

**Maxamed:** Did you go to the university yesterday?
**Yoonis:** Yes, I went in the morning. In the afternoon I visited my brother.', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:dialogue', 'lesson:colloquial:unit-04', 'text/markdown', 'E**Setting:** Bill plans to go to the Horn of Africa

**Vocabulary:**
- buu — focus marker baa + uu ''he''
- tegi doonaa — he will go to
- doon — want, auxiliary verb for the future tense
- gees — horn (m. d1)
- macallin — teacher (m. d2)
- dhig — to teach
- af — mouth, language (m. d4)
- Ingiriisi — English
- af Ingiriisiga — the English language
- imminka — now
- se — but
- bartaa — he learns (from baro, ''to learn'', conj 3B)
- waayo — because
- laba — two
- bil — month (f. d1)
- bilo — months
- laba bilood ka dib — in two months
- ka dhigi doonaa — he will teach at
- dugsi — school (m. d2)
- magaalo — town (f. d6)
- ku yaal — which is in (f.)
- waqooyi — north
- dal — country (m. d4)
- carruur — children (f. d1 collec.)
- waxbarasho — teaching/learning
- macallinkiisu — his teacher (subj.)
- la yidhaahdo — called (lit.: which one says to)
- saaxiibkiisa — his friend
- jeer — time, occasion (m. d4)
- toddobaad — week (m. d2)
- toddobaadkiiba — each week
- ayuu — focus marker ayaa + uu ''he''
- la kulmaa — he meets with (general present of kulan)
- kulan — to meet; la: with
- hadal — to speak; la: with; ku: in
- wuxuu yidhaahdaa — he says (focus construction)
- adag — difficult (adj.)
- waxuu ku celiyaa — he replies (general present of ku celi)
- ku celi — to reply
- maya — no
- walaal — brother (m. d1); used to address any man
- fudud — easy (adj.)
- qoslaan — they laugh (general present of qosol)
- qosol — to laugh

**Dialogue:**
Bill geeska Afrika wuu tegi doonaa. Bill waa macallin. Af Ingiriisiga wuu dhigaa. Imminkase af Soomaaliga buu bartaa, waayo geeska Afrika ayuu tegi doonaa laba bilood ka dib. Af Ingiriisiga buu ka dhigi doonaa dugsi ku yaal magaalada Burco. Burco waa magaalo waqooyiga dalka Soomaaliya/dalka Somaliland ku taal. Wuxuu waxbari doonaa carruurta magaalada Burco. Macallinkiisa af Soomaaligu waa nin Yoonis, la yidhaahdo. Yoonis waa saaxiibkiisa. Laba jeer toddobaadkiiba ayuu Yoonis la kulmaa. Wayna ku wada hadlaan af Soomaaliga.

Bill wuxuu yidhaahdaa:
''Af Soomaaligu waa af adag!''

Yoonisna wuxuu ku celiyaa:
''Maya walaal af Soomaaligu waa af fudud. Af Ingiriisiguse waa af adag!''

Wayna wada qoslaan.

**English:**
Bill is going to go to the Horn of Africa. Bill is a teacher. He teaches the English language. But now he is learning the Somali language because he is going to go to the Horn of Africa in two months. He will teach the English language at a school in the town of Burco. Burco is a town in the north of Somalia/Somaliland. He will teach the children of the town of Burco. His Somali teacher is a man called Yoonis. Yoonis is his friend. Twice a week he meets with Yoonis. They speak in Somali.

Bill says: ''Somali is a difficult language!''

And Yoonis replies: ''No, brother, Somali is an easy language. But English is a difficult language!''

And they laugh together.', NULL, 'grammar', '{"speakers": ["Bill", "Yoonis"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:vocabulary', 'lesson:colloquial:unit-04', 'text/markdown', 'E**Key vocabulary introduced in Unit 4**

| Somali | English | POS | Class |
|--------|---------|-----|-------|
| doon | want, future auxiliary | verb | auxiliary |
| gees | horn (m. d1) | noun | masc |
| macallin | teacher (m. d2) | noun | masc d2 |
| dhig | to teach | verb | conj 1 |
| af | mouth, language (m. d4) | noun | masc d4 |
| Ingiriisi | English (language) | noun | |
| Soomaali | Somali (language/noun d5) | noun | masc d5 |
| baro | to learn | verb | conj 3B |
| bartaa | he learns | verb | pres gen |
| waayo | because | conjunction | |
| bil | month (f. d1) | noun | fem d1 |
| dugsi | school (m. d2) | noun | masc d2 |
| magaalo | town (f. d6) | noun | fem d6 |
| waqooyi | north | noun | |
| dal | country (m. d4) | noun | masc d4 |
| carruur | children (f. d1 collec.) | noun | fem collec |
| waxbaro | to teach/learn | verb | conj 3A |
| yidhaahdo | called (lit. which is said) | verb | relative |
| jeer | time, occasion (m. d4) | noun | masc d4 |
| toddobaad | week (m. d2) | noun | masc d2 |
| kulan | to meet (with la) | verb | conj 1 |
| hadal | to speak | verb | conj 1 |
| adag | difficult, strong | adjective | basic |
| fudud | easy, light | adjective | basic |
| qosol | to laugh | verb | conj 1 |
| walaal | brother (m. d1) | noun | masc d1 |
| walaal | sister (f. d1) | noun | fem d1 |
| ku celi | to reply | verb | conj 2 |
| hooyo | mother (f. d6) | noun | fem d6 |
| aabbe | father (m. d7) | noun | masc d7 |
| waddo | road (f. d6) | noun | fem d6 |
| sheeko | tale, story (f. d6) | noun | fem d6 |
| dawo | medicine (f. d6) | noun | fem d6 |
| kiilo | kilo (f. d6) | noun | fem d6 |
| ayeeyo | grandmother (f. d6) | noun | fem d6 |
| shaneemo | film (f. d6) | noun | fem d6 |
| bare | teacher (m. d7) | noun | masc d7 |
| fure | key (m. d7) | noun | masc d7 |
| danjire | ambassador (m. d7) | noun | masc d7 |
| xoghaye | secretary (m. d7) | noun | masc d7 |
| madaxweyne | president (m. d7) | noun | masc d7 |
| gol | committee (m. d7) | noun | masc d7 |
| waraabe | hyena (m. d7) | noun | masc d7 |
| samee | to do, make | verb | conj 2B |
| safee | to clean | verb | conj 2B |
| cashee | to eat dinner | verb | conj 2B |
| caddee | to explain, make white/clear | verb | conj 2B |
| malee | to suppose | verb | conj 2B |
| cawee | to spend the evening | verb | conj 2B |
| dhammee | to finish | verb | conj 2B |
| qadee | to have lunch | verb | conj 2B |
| kexe | to drive | verb | conj 2B |
| fog | far | adjective | basic |
| dhow | near | adjective | basic |
| culus | heavy | adjective | basic |
| dheer | tall, long | adjective | basic |
| weyn | big | adjective | basic |
| cusub | new | adjective | basic |
| gaaban | short | adjective | basic |
| jaban | broken | adjective | derived |
| laaban | folded | adjective | derived |
| xidhan | closed | adjective | derived |
| furan | open | adjective | derived |
| guban | burnt | adjective | derived |
| ballaadhan | broad | adjective | derived |
| faraxsan | happy | adjective | derived |
| dheregsan | satisfied, full | adjective | derived |
| quruxsan | beautiful | adjective | derived |
| cadhosan | angry | adjective | derived |
| khamiis | Thursday (f.) | noun | fem |
| maalintii | today | noun | |
| iibso | to buy | verb | conj 3A |
| iibi | to sell | verb | conj 2A |
| qasacado | tins (f. d1) | noun | fem |
| weli | yet | adverb | |
| gaajeysan | hungry | adjective | derived |
| makhaayad | restaurant (f. d1) | noun | fem d1 |
| shaqo | work (f. d6) | noun | fem d6 |
| tagsi | taxi (m. d2) | noun | masc d2 |
| badan | many | adjective | basic |
| tegi doonaa | he will go | verb | future |
| waxbarid | teaching | noun | |
| waxbarido | to teach | verb | infinitive |
| waxbaro | to learn/teach | verb | conj 3 |
| wuxuu yidhaahdaa | he says | phrase | focus |', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:grammar-declension6', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Declension 6

**Stress-tone pattern:**
- Singular: on the penultimate vowel
- Plural: on the penultimate vowel

**Gender:** Singular always feminine; Plural always masculine
**Word shape in singular:** Ends in -o
**Plural formation:** Add -yin
**Premodifier form:** Singular — stress-tone moves to the final vowel; Plural — as absolutive

**Examples:**
| Singular | English | Plural | English |
|----------|---------|--------|---------|
| hooyo | mother | hoyooyin | mothers |
| waddo | road | waddooyin | roads |
| sheeko | tale, story | sheekooyin | tales, stories |
| dawo | medicine | dawooyin | medicines |
| magaalo | town | magaalooyin | towns |
| kiilo | kilo | kiilooyin | kilos |
| ayeeyo | grandmother | ayeeyooyin | grandmothers |
| shaneemo | film | shaneemooyin | films |

**With definite article:**
- waddada — the road (absolutive)
- waddooyinka — the roads', NULL, 'grammar', '{"conceptId": "concept:declension-6"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:grammar-declension7', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Declension 7

**Stress-tone pattern:**
- Singular: on the penultimate vowel
- Plural: no stress-tone

**Gender:** Singular always masculine; Plural always feminine
**Word shape in singular:** Ends in -e
**Plural formation:** Delete -e and add -ayaal
**Premodifier form:** Stress-tone on final vowel in both singular and plural

**Examples:**
| Singular | English | Plural | English |
|----------|---------|--------|---------|
| aabbe | father | aabbayaal | fathers |
| bare | teacher | barayaal | teachers |
| fure | key | furayaal | keys |
| danjire | ambassador | danjirayaal | ambassadors |
| xoghaye | secretary | xoghayayaal | secretaries |
| madaxweyne | president | madaxweynayaal | presidents |
| gol | committee | golayaal | committees |
| waraabe | hyena | waraabayaal | hyenas |

**With definite article:**
- baraha — the teacher (absolutive)
- barayaasha — the teachers

**Two exceptions** that do not end in -e but are declension 7 nouns:
- oday — old man, elder → odayaal
- biyo — water → biyayaal', NULL, 'grammar', '{"conceptId": "concept:declension-7"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:grammar-conjugation2b', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Conjugation 2B

This conjugation is made up of verbs formed by adding the suffix **-ee** to nouns and adjectives.

**With adjectives:** The meaning is ''to make like the adjective''.
- cas (red) → casee (to make red, redden)
- cad (white, clear) → caddee (to make white, make clear → to explain)

**With nouns:** The meaning is not always clear; learn the individual verbs.

**Examples:** samee (to do, make), safee (to clean), cashee (to eat dinner), caddee (to explain), malee (to suppose), cawee (to spend the evening), dhammee (to finish), qadee (to have lunch), kexee (to drive)

### Plural imperative
Add -ya (same as 2A): Sameeya! (Make! pl.), Casheeya! (Have dinner! pl.)

### General past

| Person | Stem | Ending | Form |
|--------|------|--------|------|
| I | samee | ay | sameeyay |
| you (sg.) | samee | tay | sameysay |
| he, it (m.) | samee | ay | sameeyay |
| she, it (f.) | samee | tay | sameysay |
| we | samee | nay | sameynay |
| you (pl.) | samee | teen | sameyseen |
| they | samee | een | sameeyeen |

**Sound changes:**
(a) -ee → -ey when ending beginning with consonant is added
(b) t → s when it follows y
(c) y is inserted between e and a

### Present progressive
The infinitive: ee changes to ey + n (sameeyn, casheyn)

| Person | Stem | Prog. | Ending | Form |
|--------|------|-------|--------|------|
| I | sameyn | ay | aa | sameynayaa |
| you (sg.) | sameyn | ay | taa | sameynaysaa |
| he, it (m.) | sameyn | ay | aa | sameynayaa |
| she, it (f.) | sameyn | ay | taa | sameynaysaa |
| we | sameyn | ay | naa | sameynaynaa |
| you (pl.) | sameyn | ay | taan | sameynaysaan |
| they | sameyn | ay | aan | sameynayaan |', NULL, 'grammar', '{"conceptId": "concept:conjugation-2b"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:grammar-ka-warran', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Using ka warran

We have already seen that **ka warran** means in the phrase **Is ka warran**, ''Give news about oneself''.

The phrase may be used to ask about other things as well:
- **Shaqada ka warran** — give news about the work / How is your work?
- **Qoyska ka warran** — How is the family?
- **Carruurta ka warran** — How are the children?

The pattern is: [Noun phrase] ka warran — ''Give news about [noun phrase]''', NULL, 'grammar', '{"conceptId": "concept:ka-warran-idiom"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:grammar-adjectives', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Adjectives

There are two main types of adjective in Somali: **basic adjectives** and **derived adjectives**.

### Basic adjectives
These stand on their own and are not formed from any other word; there are about 45 such adjectives.

**Common basic adjectives:**
- fog — far
- dhow — near
- fudud — light, easy
- culus — heavy
- adag — difficult, strong
- cusub — new
- dheer — long, tall
- weyn — big
- gaaban — short
- yar — small
- fiican — good, well

### Derived adjectives
Formed by adding endings to nouns and verbs.

**-an** (added to verbs and nouns; means ''being in the state described''):
- xidh (close) → xidhan (closed)
- fur (open) → furan (open)
- gub (burn) → guban (burnt)
- ballaadh (broadness) → ballaadhan (broad)
- gaab (shortness) → gaaban (short)

**-san** (forms adjectives from nouns and verbs; implies being in the state described):
- farax (be happy) → faraxsan (happy)
- dhereg (be satisfied) → dheregsan (satisfied, full)
- qurux (beauty) → quruxsan (beautiful)
- cadho (anger) → cadhosan (angry)

**Position:** The adjective **follows** the noun it describes.
- guri cusub — a new house
- shimbir yar — a small bird
- albaab cas — a red door

**With definite article:** The article is attached **only to the noun**.
- guriga cusub — the new house
- shimbirtii yar — the small bird
- albaabka cas — the red door

**Stress-tone:** Adjectives, whether derived or basic, almost always have stress-tone on the final vowel.

**Subject case:** Adjectives mark the subject case by lack of stress-tone, and they add -i.

**Examples:**
- Ninku waa tagay. — The man went.
- Ninka dheer(u) waa tagay. — The tall man went.
- Gabadhu waa tagtay. — The girl went.
- Gabadha yar(i) waa toostay. — The small girl got up.

### Plural form of adjectives
Formed by taking the largest possible syllable from the beginning and adding to the beginning of the singular form.

**Examples:**
- cusub → cuscusub (new pl.)
- yar → yaryar (small pl.)
- quruxsan → qurquruxsan (beautiful pl.)
- fudud → fudfudud (easy pl.)
- adag → adadag (difficult pl.)

**Irregular plural forms:**
- dheer → dhaadheer (long/tall pl.)
- weyn → waaweyn (big pl.)

Plural forms are not always used when describing plural nouns. Short adjective plurals tend to be used more often than long adjective plurals.', NULL, 'grammar', '{"conceptId": "concept:somali-adjectives"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:grammar-genitive', 'lesson:colloquial:unit-04', 'text/markdown', 'E## The genitive case

The genitive case is used to indicate **possession**. It is the possessor that is in the genitive case.

**Example:** ''Maxamed''s book'' → **buuggii Maxaméd** (Maxamed is in the genitive case)

**Stress-tone pattern:** Stress-tone on the **final or only vowel**.

### Nouns with extra parts in the genitive

**(a) Feminine singular nouns not ending in -o** often add **-eéd** (-yeéd after i):
- xanuun lugeéd — foot pain
- af shimbireéd — a mouth of a bird, beak

**Note:** The -eéd suffix implies the genitive is less specific: dhar naageéd = ''women''s clothes'' (in general), vs. dhar naag = ''a woman''s clothes'' (particular woman).

**(b) Feminine singular nouns forming plural in -o** add **-od** when plural is in genitive.

**Domestic animals** use **-aad** instead of -eéd or -od:
- harag lo''aad — cow''s hide
- caané riyaad — goats'' milk

### Definite article in genitive constructions
When the definite article is added, the noun must be in the **premodifier form** and the article in the absolutive or subject case.

**Examples:**
- qalinka ardeyga — the student''s pen
- barayaasha dugsigu — the teachers of the school went

### Adjectives with genitive constructions

If the adjective describes the **possessor**, the phrase is straightforward:
- qalinka macallinka cusub — the pen of the new teacher

If the adjective describes the **possessed** noun, use **ee**:
- qalinka cusub ee macallinka — the new pen of the teacher', NULL, 'grammar', '{"conceptId": "concept:genitive-case"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:grammar-numbers', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Numbers

All numbers in Somali are **nouns** and share all characteristics of nouns.

**Gender:** All numbers up to and including eight are **feminine**; all the rest are **masculine**.

### Numbers one to ten

| Number | Somali | Gender |
|--------|--------|--------|
| 1 | kow | feminine |
| 2 | laba | feminine |
| 3 | saddex | feminine |
| 4 | afar | feminine |
| 5 | shan | feminine |
| 6 | lix | feminine |
| 7 | toddoba | feminine |
| 8 | siddeed | feminine |
| 9 | sagaal | masculine |
| 10 | toban | masculine |

### Using numbers with nouns
The number is in the **premodifier form** and the noun being counted is in the **genitive case**.

**Important rule:** Nouns with numbers are in the **genitive singular** unless the noun is from declension 1, 2 or 3, in which case it is in the **genitive plural** (except with the number one).

**Examples:**
- afar dal — four countries
- laba kabood — two shoes
- saddex buug — three books
- toddoba nin — seven men
- sagaal riyadd — nine goats
- laba naagoéd — two women

**With definite article:** The article is added to the **number**.
- saddexda buug — the three books
- toddobada nin — the seven men

### Number ''one''
- **kow** — used in counting
- **hal** — used to count a noun: hal buug (one book), hal naag (one woman)
- **mid** — used on its own: Mid bay cuneen. (They ate one.)', NULL, 'grammar', '{"conceptId": "concept:somali-numbers"}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:dialogue2', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Dialogue: Maxamed and Axmed decide to have something to eat

**Vocabulary:**
- dukaan — shop (m. d2)
- waddo — street, road (f. d6)
- shaqo — work (f. d6)
- subaxdii — in the morning (lit.: the morning)
- tagsigayga — my taxi
- taxi — taxi (m. d2)
- baan — focus marker baa + -aan ''I''
- watay — I drove
- iibis — trade (m. d2)
- wax — thing (m.; pl. waxyaabo m.)
- soo iibsadeen — they bought
- iibso — to buy (3A)
- iibi — to sell (2A)
- badan — many (adj.)
- qasacado — tins (f. d1)
- khudrad — vegetables (f. d1 collec.)
- weli — yet
- waa yahay — right (lit.: ''it is'')
- ma qadeyn doontaa? — do you want to have lunch?
- qadee — to have lunch (2B)
- waan gaajeysanahay — I am hungry
- xidh — to close (1)
- makhaayad — restaurant (f. d1)

**Dialogue:**
Maxamed wuu ka baxayaa dukaanka. Axmedna waddada buu soo marayaa.

**Maxamed:** Waryaa, Axmed. Iska warran.
**Axmed:** Waryaa, Maxamed. Waa la wanaagsanyahay. Iska warran adigu.
**Maxamed:** Waan fiicanahay. Shaqadana ka warran. Maxaad sameysey subaxdii?
**Axmed:** Tagsigayga baan watay. Iibiska ka warran, dad badan wax miyay soo iibsadeen?
**Maxamed:** Haa maanta dad badan ayaa yimi, waxyaabo badanna way soo iibsadeen. Qasacado iyo khudrad badan baan iibiyay.
**Axmed:** Waa yahay. Weli ma qadeysay?
**Maxamed:** Maya.
**Axmed:** Imminka ma qadeyn doontaa?
**Maxamed:** Haa waan gaajeysanahay. Dukaanka waan xidhayaa makhaayadana waynu tagaynaa.
**Axmed:** Waa yahay.

**English:**
Maxamed comes out of the shop. And Axmed is passing along the street.

**Maxamed:** Hi, Axmed. How are you?
**Axmed:** Hi, Maxamed. I am well. How are you?
**Maxamed:** I am well. How is work? What did you do this morning?
**Axmed:** I drove my taxi. How is trade? Did many people buy something?
**Maxamed:** Yes, today many people came and they bought many things. I sold tins and many vegetables.
**Axmed:** Right. Have you had lunch yet?
**Maxamed:** No.
**Axmed:** Do you want to have lunch now?
**Maxamed:** Yes, I am hungry. I will close the shop and we will go to the restaurant.
**Axmed:** Right.', NULL, 'grammar', '{"speakers": ["Maxamed", "Axmed"]}') ON CONFLICT (cid) DO NOTHING;
INSERT INTO graph_chunks (cid, lesson_id, content_type, payload, source_page, chunk_type, extra_qualifiers) VALUES ('colloquial:u04:exercises', 'lesson:colloquial:unit-04', 'text/markdown', 'E## Exercises

**Exercise 1** — Make singular nouns plural and plural nouns singular (declension 6):
1. sheekooyin — tales, stories
2. dawo — medicine
3. magaalooyin — towns
4. shaneemo — film
5. kiilooyin — kilos
6. ayeeyo — grandmother

**Exercise 2** — Make singular nouns plural and plural nouns singular (declension 7):
1. fure — key
2. danjirayaal — ambassadors
3. xoghaye — secretary
4. golayaal — committees
5. waraabayaal — hyenas
6. madaxweyne — president

**Exercise 3** — Write out in full the general past and present progressive forms of:
1. malee — to suppose
2. caddee — to explain, make white/clear
3. cawee — to spend the evening

**Exercise 4** — Translate into Somali (use appropriate 2B verb):
1. He is driving the burden camels. (kexee)
2. The children are cleaning the tables. (safee)
3. She is explaining the book. (caddee)
4. They finished the house yesterday. (dhammee)
5. Will you eat lunch today? (qadee)

**Exercise 5** — Translate into Somali:
1. The tall man ate the meat.
2. The beautiful girl drank the milk. (For ''drink'' use dhan/dhamaa)
3. They are reading the easy book.
4. You are taking the heavy suitcase.
5. They broke the new door.
6. She wrote the good book.

**Exercise 6** — Translate into Somali:
1. The tall men went to the town.
2. Look at the large birds.
3. Are you (pl.) going to the far towns?
4. He found the broken cups.
5. I am bringing the heavy suitcases.
6. The girls are reading good books.

**Exercise 7** — Make genitive constructions:
1. door the house
2. the Horn of Africa the coast
3. the week the day
4. Cali pen
5. meat cow
6. language Arabs

**Exercise 8** — Translate into Somali:
1. Cali broke Jawaahir''s pen.
2. She explained Samatar''s good book.
3. They cleaned the elder''s shoes.
4. The ambassador''s new secretary is going to the capital city of the country.
5. You (pl.) went to the centre of the city.

**Exercise 9** — Combine number + noun:
1. hal guri
2. sagaal bil
3. shan baabuur
4. saddex koob
5. toban kab

**Exercise 10** — Translate into Somali:
1. Take two shoes!
2. How are the three schools?
3. They built seven houses.
4. The teacher teaches eight students.
5. He brought five donkeys.
6. Cali is pasturing nine burden camels.', NULL, 'grammar', NULL) ON CONFLICT (cid) DO NOTHING;
-- 101

-- ─── lesson_chunks ───
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'syntax:subject-clitic-explanation', 1, 'Subject Clitics') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:past-tense-explanation', 1, 'Past Tense') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:dialogue', 1, 'Dialogue') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:waa-explanation', 1, 'The Positive Declarative Classifier waa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:waa-pronoun-combinations', 2, 'waa + Verbal Subject Pronouns Paradigm') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:vocabulary', 2, 'Vocabulary') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'syntax:directional-particle-explanation', 2, 'Directional Particles') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:grammar-greetings', 3, 'Language in use: Greetings') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'syntax:independent-pronoun-explanation', 3, 'Independent Pronouns') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:waa-example-sentences', 3, 'Example Sentences with waa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:ma-explanation', 4, 'The Positive Interrogative Classifier ma') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'syntax:example-greeting-dialogue', 4, 'Dialogue: Greetings') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:grammar-vocative', 4, 'The vocative form') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:grammar-imperative', 5, 'The imperative') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'syntax:example-waa-pronoun-combo', 5, 'Paradigm: waa + Pronouns') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:ma-pronoun-combinations', 5, 'ma + Verbal Subject Pronouns Paradigm') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:ma-example-sentences', 6, 'Example Questions with ma') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:grammar-object-pronouns', 6, 'Third person object pronouns') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:exercises', 8, 'Exercises') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-01', 'colloquial:u01:reading', 9, 'Reading practice') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:present-progressive-explanation', 1, 'Present Progressive') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:dialogue', 1, 'Dialogue') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:vocabulary', 2, 'Vocabulary') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:grammar-time-greetings', 3, 'Greetings for particular times of the day') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:grammar-miyaa', 4, 'Using miyaa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:grammar-present-progressive', 5, 'The present progressive of conjugation 1') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:grammar-nouns', 6, 'Nouns in Somali') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:grammar-declension1', 7, 'Declension 1') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:grammar-declension2', 8, 'Declension 2') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:grammar-declension3', 9, 'Declension 3') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:exercises', 11, 'Exercises') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-02', 'colloquial:u02:reading', 12, 'Reading practice') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:noun-gender-intro', 1, 'Noun Gender') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:focus-markers-intro', 1, 'Introduction to Focus Markers') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:dialogue', 1, 'Dialogue') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'syntax:preposition-fusion-explanation', 1, 'Preposition Fusion') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:vocabulary', 2, 'Vocabulary') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:focus-understanding', 2, 'Understanding Focus through Questions') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:declensions-1-2-3', 2, 'Declensions 1, 2 and 3') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'syntax:example-shopping-dialogue', 2, 'Dialogue: Shopping') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'syntax:example-bill-afrika', 3, 'Reading: Bill in Africa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:word-list-gender', 3, 'Key Vocabulary with Gender') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:grammar-case', 3, 'Case in Somali nouns') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:focus-non-subject', 3, 'Focusing Non-Subject Noun Phrases') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'syntax:example-monday-morning', 4, 'Reading: Monday Morning') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:focus-subject', 4, 'Focusing the Subject') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:grammar-word-order', 4, 'Word order in Somali') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:focus-contraction', 5, 'Contractions of baa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:grammar-definite-article', 5, 'The definite article in Somali') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:grammar-declension4', 6, 'Declension 4') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:grammar-declension5', 7, 'Declension 5') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:grammar-conjugation2a', 8, 'Conjugation 2A') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:grammar-days', 10, 'Days of the week') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:exercises', 11, 'Exercises') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-03', 'colloquial:u03:reading', 12, 'Reading practice') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:definite-article', 1, 'The Definite Article') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'syntax:sov-word-order-explanation', 1, 'SOV Word Order') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:dialogue', 1, 'Dialogue') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:optative-explanation', 1, 'Optative Mood') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:article-sound-changes', 2, 'Sound Changes with the Definite Article') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:vocabulary', 2, 'Vocabulary') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'syntax:object-clitic-explanation', 2, 'Object Clitics') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:genitive-case', 3, 'The Genitive Case') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:grammar-declension6', 3, 'Declension 6') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'syntax:cliticization-explanation', 3, 'Cliticization') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:grammar-declension7', 4, 'Declension 7') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'syntax:preverbal-prep-explanation', 4, 'Preverbal Prepositions') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u07:possessive-suffixes', 4, 'Possessive Suffixes') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'syntax:example-preverb-paradigm', 5, 'Preverbal Preposition Examples') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:grammar-conjugation2b', 5, 'Conjugation 2B') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:grammar-ka-warran', 6, 'Using ka warran') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:grammar-adjectives', 7, 'Adjectives') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:grammar-genitive', 8, 'The genitive case') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:grammar-numbers', 9, 'Numbers') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:dialogue2', 10, 'Dialogue: Maxamed and Axmed') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-04', 'colloquial:u04:exercises', 11, 'Exercises') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-08', 'colloquial:u08:future-explanation', 1, 'Future Tense') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-08', 'colloquial:u08:past-habitual-explanation', 2, 'Past Habitual') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-08', 'colloquial:u08:negative-imperative-explanation', 3, 'Negative Imperative') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-08', 'colloquial:u08:negative-past-explanation', 4, 'Negative Past') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-08', 'colloquial:u08:negative-present-explanation', 5, 'Negative Present') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-08', 'colloquial:u08:past-progressive-explanation', 6, 'Past Progressive') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-10', 'colloquial:u10:waxaa-construction', 1, 'The waxaa Object Focus Construction') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:colloquial:unit-10', 'colloquial:u10:waxaa-newspaper-examples', 2, 'Authentic Examples with waxaa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:ch-08', 'syntax:example-zorc-basic', 1, 'Pronoun Fusion Paradigm') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-02', 'zorc:ch02:ma-baa-waa-intro', 1, 'The Three Most Important Grammatical Markers') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-02', 'zorc:ch02:waa-example', 2, 'Declarative Statements with waa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-02', 'zorc:ch02:ma-example', 3, 'Questions with ma') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-04', 'zorc:ch04:k-class-intro', 1, 'K-class Nouns (Masculine)') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-04', 'zorc:ch04:t-class-intro', 2, 'T-class Nouns (Feminine)') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-04', 'zorc:ch04:grammatical-gender', 3, 'Grammatical Gender System') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-05', 'zorc:ch05:masculine-article-changes', 1, 'Changes Affecting Masculine Nouns') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-06', 'zorc:ch06:feminine-article-changes', 1, 'Changes Affecting Feminine Nouns') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-12', 'zorc:ch12:focus-topic-explanation', 1, 'Focus and Topic in Somali') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-12', 'zorc:ch12:focus-nonfocus-declaratives', 2, 'Focus and Non-Focus Declaratives') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-12', 'zorc:ch12:subject-focus-rule', 3, 'Subject Focus vs. Object Focus') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-12', 'zorc:ch12:waa-baa-additional-rules', 4, 'Additional Grammar Notes on waa and baa') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
INSERT INTO lesson_chunks (lesson_id, chunk_cid, section_order, section_title) VALUES ('lesson:zorc:chapter-12', 'zorc:ch12:focus-practice-sentences', 5, 'Practice Sentences with Focus Markers') ON CONFLICT (lesson_id, chunk_cid) DO NOTHING;
-- 98

-- ─── concept_edges ───
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waa-is-declarative', 'morpheme:waa', 'concept:declarative-marker', 'IS_A', '0.98', '14', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waa-is-focus', 'morpheme:waa', 'concept:focus-marker', 'RELATED_TO', '0.85', '14', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:baa-is-focus', 'morpheme:baa', 'concept:focus-marker', 'IS_A', '0.98', '50', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:baa-is-subject-focus', 'morpheme:baa', 'concept:subject-focus', 'REALIZES', '0.90', '51', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ayaa-is-focus', 'morpheme:ayaa', 'concept:focus-marker', 'IS_A', '0.98', '50', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ayaa-is-subject-focus', 'morpheme:ayaa', 'concept:subject-focus', 'REALIZES', '0.90', '51', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaa-is-focus', 'morpheme:waxaa', 'concept:focus-marker', 'IS_A', '0.95', '103', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaa-is-object-focus', 'morpheme:waxaa', 'concept:object-focus', 'REALIZES', '0.95', '103', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ma-is-interrogative', 'morpheme:ma', 'concept:interrogative-marker', 'IS_A', '0.95', '35', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ma-is-negative', 'morpheme:ma', 'concept:negative-marker', 'IS_A', '0.95', '15', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:miyaa-is-interrogative', 'morpheme:miyaa', 'concept:interrogative-marker', 'IS_A', '0.92', '15', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:buu-is-focus', 'morpheme:buu', 'concept:focus-marker', 'IS_A', '0.95', '113', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:buu-is-object-focus', 'morpheme:buu', 'concept:object-focus', 'REALIZES', '0.92', '113', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:bay-is-focus', 'morpheme:bay', 'concept:focus-marker', 'IS_A', '0.95', '113', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:bay-is-object-focus', 'morpheme:bay', 'concept:object-focus', 'REALIZES', '0.92', '113', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaan-is-focus', 'morpheme:waxaan', 'concept:focus-marker', 'IS_A', '0.93', '103', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaan-is-object-focus', 'morpheme:waxaan', 'concept:object-focus', 'REALIZES', '0.92', '103', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaad-is-focus', 'morpheme:waxaad', 'concept:focus-marker', 'IS_A', '0.93', '103', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaad-is-object-focus', 'morpheme:waxaad', 'concept:object-focus', 'REALIZES', '0.92', '103', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:declarative-subtype-focus', 'concept:declarative-marker', 'concept:focus-marker', 'SUBTYPE_OF', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:interrogative-related-focus', 'concept:interrogative-marker', 'concept:focus-marker', 'RELATED_TO', '0.70', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:subject-focus-subtype', 'concept:subject-focus', 'concept:focus-marker', 'SUBTYPE_OF', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:verb-focus-subtype', 'concept:verb-focus', 'concept:focus-marker', 'SUBTYPE_OF', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:object-focus-subtype', 'concept:object-focus', 'concept:focus-marker', 'SUBTYPE_OF', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:negative-related-interrogative', 'concept:negative-marker', 'concept:interrogative-marker', 'RELATED_TO', '0.75', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:focus-part-of-info-structure', 'concept:focus-marker', 'concept:information-structure', 'PART_OF', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:declarative-construction-uses-waa', 'construction:focus-declarative-positive', 'concept:declarative-marker', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:interrogative-construction-uses-ma', 'construction:focus-interrogative', 'concept:interrogative-marker', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:negative-construction-uses-ma', 'construction:focus-negative', 'concept:negative-marker', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:subject-construction-uses-baa', 'construction:focus-subject', 'concept:subject-focus', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:object-construction-uses-waxaa', 'construction:focus-object', 'concept:object-focus', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:contraction-construction-uses-baa', 'construction:focus-contraction', 'concept:focus-marker', 'USES', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:word-waa-is-morpheme', 'word:waa', 'morpheme:waa', 'IS_A', '0.99', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:word-baa-is-morpheme', 'word:baa', 'morpheme:baa', 'IS_A', '0.99', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:word-ayaa-is-morpheme', 'word:ayaa', 'morpheme:ayaa', 'IS_A', '0.99', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:word-ma-is-morpheme', 'word:ma', 'morpheme:ma', 'IS_A', '0.99', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-fiicanahay-uses-waa', 'example:waan-fiicanahay', 'morpheme:waa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-fiicanahay-is-declarative', 'example:waan-fiicanahay', 'concept:declarative-marker', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wuu-cunay-uses-waa', 'example:wuu-cunay', 'morpheme:waa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-miyaad-baxday-uses-ma', 'example:miyaad-baxday', 'morpheme:ma', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-miyaad-baxday-is-question', 'example:miyaad-baxday', 'concept:interrogative-marker', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-gabadhu-bariis-bay-uses-bay', 'example:gabadhu-bariis-bay-cuntay', 'morpheme:bay', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-gabadhu-bariis-bay-is-object-focus', 'example:gabadhu-bariis-bay-cuntay', 'concept:object-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-gabadha-baa-uses-baa', 'example:gabadha-baa-bariiska-cuntay', 'morpheme:baa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-gabadha-baa-is-subject-focus', 'example:gabadha-baa-bariiska-cuntay', 'concept:subject-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-inanka-baa-uses-baa', 'example:inanka-baa-koobka-jabiyay', 'morpheme:baa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-inanka-baa-is-subject-focus', 'example:inanka-baa-koobka-jabiyay', 'concept:subject-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ninkaa-uses-baa-contract', 'example:ninkaa-tagay', 'morpheme:baa', 'ILLUSTRATES', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ninkaa-is-focus-contraction', 'example:ninkaa-tagay', 'construction:focus-contraction', 'ILLUSTRATES', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waxaan-u-galay-uses-waxaan', 'example:qolka-waxaan-u-galay', 'morpheme:waxaan', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waxaan-u-galay-is-object-focus', 'example:qolka-waxaan-u-galay', 'concept:object-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waxaan-u-galay-simple', 'example:waxaan-u-galay', 'morpheme:waxaan', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waxaan-u-galay-simple-objfocus', 'example:waxaan-u-galay', 'concept:object-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waa-nabad-uses-waa', 'example:waa-nabad', 'morpheme:waa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waa-nabad-is-declarative', 'example:waa-nabad', 'concept:declarative-marker', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ma-nabad-baa-uses-ma', 'example:ma-nabad-baa', 'morpheme:ma', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ma-nabad-baa-uses-baa', 'example:ma-nabad-baa', 'morpheme:baa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ma-nabad-baa-is-interrogative', 'example:ma-nabad-baa', 'concept:interrogative-marker', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-hilibka-baan-uses-baan', 'example:hilibka-baan-cuney', 'morpheme:waxaan', 'ILLUSTRATES', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-hilibka-baan-is-object-focus', 'example:hilibka-baan-cuney', 'concept:object-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-naagtii-baa-uses-baa', 'example:naagtii-baa-tagtey', 'morpheme:baa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-naagtii-baa-is-subject-focus', 'example:naagtii-baa-tagtey', 'concept:subject-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ninkii-buu-uses-buu', 'example:ninkii-naagtii-buu-arkey', 'morpheme:buu', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ninkii-buu-is-object-focus', 'example:ninkii-naagtii-buu-arkey', 'concept:object-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wiilka-baa-uses-baa', 'example:wiilka-baa-shimbirta-diley', 'morpheme:baa', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wiilka-baa-is-subject-focus', 'example:wiilka-baa-shimbirta-diley', 'concept:subject-focus', 'ILLUSTRATES', '0.90', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-waa-obligatory-applies-to', 'rule:waa-obligatory', 'concept:declarative-marker', 'APPLIES_TO', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-baa-subj-abs-applies-to', 'rule:baa-subject-absolutive', 'concept:subject-focus', 'APPLIES_TO', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-baa-no-subj-marker-applies', 'rule:baa-no-subject-marker', 'concept:subject-focus', 'APPLIES_TO', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-object-focus-derived-applies', 'rule:object-focus-derived-forms', 'concept:object-focus', 'APPLIES_TO', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-baa-ayaa-same-applies', 'rule:baa-ayaa-interchangeable', 'concept:focus-marker', 'APPLIES_TO', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:miyaa-composed-of-ma', 'morpheme:miyaa', 'morpheme:ma', 'COMPOSED_OF', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:buu-composed-of-baa', 'morpheme:buu', 'morpheme:baa', 'COMPOSED_OF', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:bay-composed-of-baa', 'morpheme:bay', 'morpheme:baa', 'COMPOSED_OF', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaan-composed-of-waxaa', 'morpheme:waxaan', 'morpheme:waxaa', 'COMPOSED_OF', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waxaad-composed-of-waxaa', 'morpheme:waxaad', 'morpheme:waxaa', 'COMPOSED_OF', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:baa-variant-ayaa', 'morpheme:baa', 'morpheme:ayaa', 'VARIANT_OF', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:past-req-conjugation', 'concept:past-tense', 'concept:verb-conjugation', 'REQUIRES', '0.9', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:present-hab-req-conjugation', 'concept:present-habitual', 'concept:verb-conjugation', 'REQUIRES', '0.9', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:present-prog-req-conjugation', 'concept:present-progressive', 'concept:verb-conjugation', 'REQUIRES', '0.9', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:future-req-conjugation', 'concept:future-tense', 'concept:verb-conjugation', 'REQUIRES', '0.9', '109', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:neg-past-req-conjugation', 'concept:negative-past', 'concept:verb-conjugation', 'REQUIRES', '0.85', '112', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:neg-present-req-conjugation', 'concept:negative-present', 'concept:verb-conjugation', 'REQUIRES', '0.85', '123', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:neg-imp-req-conjugation', 'concept:negative-imperative', 'concept:verb-conjugation', 'REQUIRES', '0.85', '111', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:optative-req-conjugation', 'concept:optative-mood', 'concept:verb-conjugation', 'REQUIRES', '0.85', '46', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:past-hab-req-conjugation', 'concept:past-habitual', 'concept:verb-conjugation', 'REQUIRES', '0.9', '110', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:keenay-is-past', 'morpheme:keenay', 'concept:past-tense', 'IS_A', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ay-is-past', 'morpheme:-ay', 'concept:past-tense', 'IS_A', '0.98', '18', 'both-textbooks', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-tay-is-past', 'morpheme:-tay', 'concept:past-tense', 'IS_A', '0.98', '18', 'both-textbooks', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-nay-is-past', 'morpheme:-nay', 'concept:past-tense', 'IS_A', '0.98', '18', 'both-textbooks', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-teen-is-past', 'morpheme:-teen', 'concept:past-tense', 'IS_A', '0.98', '18', 'both-textbooks', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-een-is-past', 'morpheme:-een', 'concept:past-tense', 'IS_A', '0.98', '18', 'both-textbooks', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-aa-is-present-habitual', 'morpheme:-aa', 'concept:present-habitual', 'IS_A', '0.95', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ayaa-is-present-prog', 'morpheme:-ayaa', 'concept:present-progressive', 'IS_A', '0.98', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:doon-is-future', 'morpheme:doon', 'concept:future-tense', 'IS_A', '0.98', '109', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ha-is-neg-imp', 'morpheme:ha', 'concept:negative-imperative', 'IS_A', '0.98', '111', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-to-is-optative', 'morpheme:-to', 'concept:optative-mood', 'IS_A', '0.95', '46', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:jir-is-past-habitual', 'morpheme:jir', 'concept:past-habitual', 'IS_A', '0.98', '110', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ma-neg-is-neg-past', 'morpheme:ma-neg', 'concept:negative-past', 'IS_A', '0.95', '112', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-in-is-neg-past', 'morpheme:-in', 'concept:negative-past', 'IS_A', '0.95', '112', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-o-is-neg-present', 'morpheme:-o', 'concept:negative-present', 'IS_A', '0.95', '123', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-past-teaches-past', 'rule:past-tense-conjugation-1', 'concept:past-tense', 'TEACHES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-prog-teaches-prog', 'rule:present-progressive-formation', 'concept:present-progressive', 'TEACHES', '0.95', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-future-teaches-future', 'rule:future-doon-auxiliary', 'concept:future-tense', 'TEACHES', '0.95', '109', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-habitual-teaches-habitual', 'rule:past-habitual-jir', 'concept:past-habitual', 'TEACHES', '0.95', '110', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-neg-imp-teaches-neg-imp', 'rule:negative-imperative-ha', 'concept:negative-imperative', 'TEACHES', '0.95', '111', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-neg-past-teaches-neg-past', 'rule:negative-past-ma-in', 'concept:negative-past', 'TEACHES', '0.95', '112', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-neg-pres-teaches-neg-pres', 'rule:negative-present-ma-o', 'concept:negative-present', 'TEACHES', '0.95', '123', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-opt-teaches-opt', 'rule:optative-formation', 'concept:optative-mood', 'TEACHES', '0.95', '46', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:keen-is-verb', 'word:keen', 'concept:verb-conjugation', 'EXEMPLIFIES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:tag-is-verb', 'word:tag', 'concept:verb-conjugation', 'EXEMPLIFIES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:cun-is-verb', 'word:cun', 'concept:verb-conjugation', 'EXEMPLIFIES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:dhis-is-verb', 'word:dhis', 'concept:verb-conjugation', 'EXEMPLIFIES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:future-req-infinitive', 'concept:future-tense', 'concept:infinitive', 'REQUIRES', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:past-hab-req-infinitive', 'concept:past-habitual', 'concept:infinitive', 'REQUIRES', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:neg-imp-req-infinitive', 'concept:negative-imperative', 'concept:infinitive', 'REQUIRES', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:past-prog-req-conjugation', 'concept:past-progressive', 'concept:verb-conjugation', 'REQUIRES', '0.85', '121', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:past-prog-req-present-prog', 'concept:past-progressive', 'concept:present-progressive', 'REQUIRES', '0.9', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-keenay-past', 'example:waan-keenay', 'concept:past-tense', 'ILLUSTRATES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waad-keentay-past', 'example:waad-keentay', 'concept:past-tense', 'ILLUSTRATES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wuu-keenay-past', 'example:wuu-keenay', 'concept:past-tense', 'ILLUSTRATES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-way-keentay-past', 'example:way-keentay', 'concept:past-tense', 'ILLUSTRATES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waannu-keennay-past', 'example:waannu-keennay', 'concept:past-tense', 'ILLUSTRATES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waydin-keenteen-past', 'example:waydin-keenteen', 'concept:past-tense', 'ILLUSTRATES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-way-keeneen-past', 'example:way-keeneen', 'concept:past-tense', 'ILLUSTRATES', '0.95', '18', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-keenay-word', 'example:waan-keenay', 'word:keen', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waad-keentay-word', 'example:waad-keentay', 'word:keen', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wuu-keenay-word', 'example:wuu-keenay', 'word:keen', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-way-keentay-word', 'example:way-keentay', 'word:keen', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waannu-keennay-word', 'example:waannu-keennay', 'word:keen', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waydin-keenteen-word', 'example:waydin-keenteen', 'word:keen', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-way-keeneen-word', 'example:way-keeneen', 'word:keen', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-cunayaa-prog', 'example:waan-cunayaa', 'concept:present-progressive', 'ILLUSTRATES', '0.95', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-way-baxaysaa-prog', 'example:way-ka-baxaysaa', 'concept:present-progressive', 'ILLUSTRATES', '0.95', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-akhriyayaa-prog', 'example:waan-akhriyayaa', 'concept:present-progressive', 'ILLUSTRATES', '0.95', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-helidoonaa-fut', 'example:waan-helidoonaa', 'concept:future-tense', 'ILLUSTRATES', '0.95', '109', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wuu-tegidoonaa-fut', 'example:wuu-tegidoonaa', 'concept:future-tense', 'ILLUSTRATES', '0.95', '109', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-joogidoonaa-fut', 'example:waan-joogidoonaa', 'concept:future-tense', 'ILLUSTRATES', '0.95', '107', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-barajiray-hab', 'example:waan-barajiray', 'concept:past-habitual', 'ILLUSTRATES', '0.95', '110', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wuu-tegijiray-hab', 'example:wuu-tegijiray', 'concept:past-habitual', 'ILLUSTRATES', '0.95', '110', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waydin-karinjirteen-hab', 'example:waydin-karinjirteen', 'concept:past-habitual', 'ILLUSTRATES', '0.95', '110', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ha-keenin-neg-imp', 'example:ha-keenin', 'concept:negative-imperative', 'ILLUSTRATES', '0.95', '111', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ha-tegin-neg-imp', 'example:ha-tegin', 'concept:negative-imperative', 'ILLUSTRATES', '0.95', '111', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ha-keenina-neg-imp', 'example:ha-keenina', 'concept:negative-imperative', 'ILLUSTRATES', '0.95', '111', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-maan-cunin-neg-past', 'example:maan-cunin', 'concept:negative-past', 'ILLUSTRATES', '0.95', '112', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ma-qabin-neg-past', 'example:ma-qabin', 'concept:negative-past', 'ILLUSTRATES', '0.95', '112', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-maan-keeno-neg-pres', 'example:maan-keeno', 'concept:negative-present', 'ILLUSTRATES', '0.95', '123', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-maynu-tagne-neg-pres', 'example:maynu-tagne', 'concept:negative-present', 'ILLUSTRATES', '0.95', '123', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-aynu-gallo-opt', 'example:aynu-gallo', 'concept:optative-mood', 'ILLUSTRATES', '0.95', '46', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-zorc-cuntada-past', 'example:zorc-cuntada-waan-cuney', 'concept:past-tense', 'ILLUSTRATES', '0.9', '94', 'zorc-iss-1990', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-zorc-muqdisho-past', 'example:zorc-muqdisho-maan-tagey', 'concept:past-tense', 'ILLUSTRATES', '0.9', '94', 'zorc-iss-1990', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-keenay-uses-keenay', 'example:waan-keenay', 'morpheme:keenay', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-maan-cunin-uses-in', 'example:maan-cunin', 'morpheme:-in', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ha-keenin-uses-ha', 'example:ha-keenin', 'morpheme:ha', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-helidoonaa-uses-doon', 'example:waan-helidoonaa', 'morpheme:doon', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-barajiray-uses-jir', 'example:waan-barajiray', 'morpheme:jir', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-cunayaa-uses-ayaa', 'example:waan-cunayaa', 'morpheme:-ayaa', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-aysaa-is-prog', 'morpheme:-aysaa', 'concept:present-progressive', 'IS_A', '0.98', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-aysaan-is-prog', 'morpheme:-aysaan', 'concept:present-progressive', 'IS_A', '0.98', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-aynaa-is-prog', 'morpheme:-aynaa', 'concept:present-progressive', 'IS_A', '0.98', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ayaan-is-prog', 'morpheme:-ayaan', 'concept:present-progressive', 'IS_A', '0.98', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waan-is-decl-1sg', 'morpheme:waan', 'concept:past-tense', 'USED_IN', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:wuu-is-decl-3sgm', 'morpheme:wuu', 'concept:past-tense', 'USED_IN', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:way-is-decl-3sgf', 'morpheme:way', 'concept:past-tense', 'USED_IN', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:akhri-is-verb', 'word:akhri', 'concept:verb-conjugation', 'EXEMPLIFIES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:qor-is-verb', 'word:qor', 'concept:verb-conjugation', 'EXEMPLIFIES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waynu-akhriyaynaa-prog', 'example:waynu-akhriyaynaa', 'concept:present-progressive', 'ILLUSTRATES', '0.95', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waynu-akhriyaynaa-word', 'example:waynu-akhriyaynaa', 'word:akhri', 'USES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:k-class-is-noun-gender', 'concept:k-class', 'concept:noun-gender', 'IS_A', '0.95', '51', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:t-class-is-noun-gender', 'concept:t-class', 'concept:noun-gender', 'IS_A', '0.95', '51', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:k-class-contrasts-t-class', 'concept:k-class', 'concept:t-class', 'CONTRASTS_WITH', '0.95', '51', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:t-class-contrasts-k-class', 'concept:t-class', 'concept:k-class', 'CONTRASTS_WITH', '0.95', '51', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:def-article-applies-k-class', 'concept:definite-article', 'concept:k-class', 'APPLIES_TO', '0.95', '44', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:def-article-applies-t-class', 'concept:definite-article', 'concept:t-class', 'APPLIES_TO', '0.95', '44', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:def-article-contrasts-indef', 'concept:definite-article', 'concept:indefinite-article', 'CONTRASTS_WITH', '0.95', '44', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:plural-applies-noun-gender', 'concept:plural-formation', 'concept:noun-gender', 'APPLIES_TO', '0.90', '34', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:genitive-is-case', 'concept:genitive-case', 'concept:noun-gender', 'RELATED_TO', '0.85', '67', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:possessive-suffix-is-genitive', 'concept:possessive-suffix', 'concept:genitive-case', 'IS_A_VARIANT_OF', '0.90', '133', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:vowel-harmony-affects-def-article', 'concept:vowel-harmony', 'concept:definite-article', 'AFFECTS', '0.95', '58', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:vowel-harmony-affects-demonstrative', 'concept:vowel-harmony', 'concept:demonstrative', 'AFFECTS', '0.90', '58', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:vowel-harmony-affects-possessive', 'concept:vowel-harmony', 'concept:possessive-suffix', 'AFFECTS', '0.90', '133', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:demonstrative-applies-k-class', 'concept:demonstrative', 'concept:k-class', 'APPLIES_TO', '0.95', '49', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:demonstrative-applies-t-class', 'concept:demonstrative', 'concept:t-class', 'APPLIES_TO', '0.95', '50', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:declension-classifies-nouns', 'concept:declension-system', 'concept:noun-gender', 'RELATED_TO', '0.85', '34', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:absolutive-contrasts-subject', 'concept:absolutive-case', 'concept:subject-case', 'CONTRASTS_WITH', '0.95', '40', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ka-is-def-article', 'morpheme:-ka', 'concept:definite-article', 'IS_A', '0.98', '44', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ta-is-def-article', 'morpheme:-ta', 'concept:definite-article', 'IS_A', '0.98', '44', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ga-is-allomorph-of-ka', 'morpheme:-ga', 'morpheme:-ka', 'VARIES_BY', '0.95', '59', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ha-is-allomorph-of-ka', 'morpheme:-ha', 'morpheme:-ka', 'VARIES_BY', '0.95', '58', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-da-is-allomorph-of-ta', 'morpheme:-da', 'morpheme:-ta', 'VARIES_BY', '0.95', '66', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-o-is-plural-marker', 'morpheme:-o', 'concept:plural-formation', 'IS_A', '0.95', '34', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-i-is-genitive-marker', 'morpheme:-i', 'concept:genitive-case', 'IS_A', '0.90', '67', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-e-is-feminine-genitive', 'morpheme:-e', 'concept:genitive-case', 'IS_A', '0.90', '67', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-eed-is-possessive', 'morpheme:-eed', 'concept:possessive-suffix', 'IS_A', '0.90', '67', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-ayga-is-possessive', 'morpheme:-ayga', 'concept:possessive-suffix', 'IS_A', '0.95', '133', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-kii-is-def-article-known', 'morpheme:-kii', 'concept:definite-article', 'IS_A', '0.98', '49', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-tii-is-def-article-known', 'morpheme:-tii', 'concept:definite-article', 'IS_A', '0.98', '50', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-kan-is-demonstrative', 'morpheme:-kan', 'concept:demonstrative', 'IS_A', '0.95', '49', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-tan-is-demonstrative', 'morpheme:-tan', 'concept:demonstrative', 'IS_A', '0.95', '50', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-kaas-is-demonstrative', 'morpheme:-kaas', 'concept:demonstrative', 'IS_A', '0.95', '49', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:-taas-is-demonstrative', 'morpheme:-taas', 'concept:demonstrative', 'IS_A', '0.95', '50', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:bariis-is-k-class', 'word:bariis', 'concept:k-class', 'HAS_PROPERTY', '0.95', '39', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:caano-is-t-class', 'word:caano', 'concept:t-class', 'HAS_PROPERTY', '0.95', '229', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:naag-is-t-class', 'word:naag', 'concept:t-class', 'HAS_PROPERTY', '0.95', '34', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:nin-is-k-class', 'word:nin', 'concept:k-class', 'HAS_PROPERTY', '0.95', '51', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:guri-is-k-class', 'word:guri', 'concept:k-class', 'HAS_PROPERTY', '0.95', '34', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:subax-is-t-class', 'word:subax', 'concept:t-class', 'HAS_PROPERTY', '0.95', '53', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:habeen-is-k-class', 'word:habeen', 'concept:k-class', 'HAS_PROPERTY', '0.95', '53', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:geel-is-k-class', 'word:geel', 'concept:k-class', 'HAS_PROPERTY', '0.95', '68', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:guriga-ex-def-article', 'example:guriga-waa-tegey', 'morpheme:-ka', 'ILLUSTRATES', '0.95', '30', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:naago-ex-plural', 'example:naago-naagaha', 'concept:plural-formation', 'ILLUSTRATES', '0.95', '34', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:buuggii-ex-known-info', 'example:buuggii-waan-akhriyay', 'morpheme:-kii', 'ILLUSTRATES', '0.95', '44', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:dukaanka-ex-new-info', 'example:dukaanka-waan-tagayaa', 'morpheme:-ka', 'ILLUSTRATES', '0.95', '44', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:buuggii-maxamed-ex-genitive', 'example:buuggii-maxamed', 'concept:genitive-case', 'ILLUSTRATES', '0.95', '67', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:xanuun-lugeed-ex-genitive-suffix', 'example:xanuun-lugeed', 'morpheme:-eed', 'ILLUSTRATES', '0.95', '67', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:nin-ka-ex-k-class', 'example:nin-ka-nin', 'concept:k-class', 'ILLUSTRATES', '0.95', '49', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:naag-ta-ex-t-class', 'example:naag-ta-naag', 'concept:t-class', 'ILLUSTRATES', '0.95', '50', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:guri-guriga-ex-ga-allomorph', 'example:guri-ka-guriga', 'rule:article-allomorph-ka-to-ga', 'ILLUSTRATES', '0.95', '59', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:bare-baraha-ex-ha-allomorph', 'example:bare-ka-baraha', 'rule:article-allomorph-ka-to-ha', 'ILLUSTRATES', '0.95', '58', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:saaxiibkayga-ex-possessive', 'example:saaxiibkayga', 'morpheme:-ayga', 'ILLUSTRATES', '0.95', '39', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:magacaygu-ex-possessive-subject', 'example:magacaygu-waa-rooble', 'concept:possessive-suffix', 'ILLUSTRATES', '0.95', '133', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ninkay-ex-possessive-short', 'example:ninkay-iyo-caruurtay', 'rule:possessive-suffix-formation', 'ILLUSTRATES', '0.90', '36', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:naag-waa-tan-ex-demonstrative', 'example:naag-waa-tan', 'morpheme:-tan', 'ILLUSTRATES', '0.95', '50', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:bare-kani-ex-demonstrative', 'example:bare-waa-kan', 'morpheme:-kan', 'ILLUSTRATES', '0.95', '62', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:macallinkii-kaas-ex-demonstrative-distal', 'example:macallinkii-waa-kaas', 'morpheme:-kaas', 'ILLUSTRATES', '0.95', '49', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-ka-to-ga-applies-to-k-class', 'rule:article-allomorph-ka-to-ga', 'concept:k-class', 'APPLIES_TO', '0.95', '59', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-ka-to-ha-applies-to-k-class', 'rule:article-allomorph-ka-to-ha', 'concept:k-class', 'APPLIES_TO', '0.95', '58', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-ka-to-zero-applies-to-k-class', 'rule:article-allomorph-ka-to-zero', 'concept:k-class', 'APPLIES_TO', '0.95', '60', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-ta-to-da-applies-to-t-class', 'rule:article-allomorph-ta-to-da', 'concept:t-class', 'APPLIES_TO', '0.95', '66', 'zorc-somali-textbook', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:rule-plural-o-applies-to-nouns', 'rule:plural-o-suffix', 'concept:plural-formation', 'IS_A_STRATEGY_FOR', '0.95', '34', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-k-class-before-def-article', 'concept:definite-article', 'concept:k-class', 'REQUIRES', '0.95', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-t-class-before-def-article', 'concept:definite-article', 'concept:t-class', 'REQUIRES', '0.95', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-def-article-before-possessive', 'concept:possessive-suffix', 'concept:definite-article', 'REQUIRES', '0.95', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-noun-gender-before-plural', 'concept:plural-formation', 'concept:noun-gender', 'REQUIRES', '0.90', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-vowel-harmony-before-allomorphs', 'morpheme:-ga', 'concept:vowel-harmony', 'REQUIRES', '0.85', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-genitive-before-possessive-suffix', 'concept:possessive-suffix', 'concept:genitive-case', 'REQUIRES', '0.80', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-noun-gender-before-k-class', 'concept:k-class', 'concept:noun-gender', 'REQUIRES', '0.95', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:requires-noun-gender-before-t-class', 'concept:t-class', 'concept:noun-gender', 'REQUIRES', '0.95', NULL, 'learning-path', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:sov-requires-cliticization', 'concept:sov-word-order', 'concept:cliticization', 'REQUIRES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:subject-clitic-is-cliticization', 'concept:subject-clitic', 'concept:cliticization', 'IS_A', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:object-clitic-is-cliticization', 'concept:object-clitic', 'concept:cliticization', 'IS_A', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:preverbal-prep-is-cliticization', 'concept:preverbal-preposition', 'concept:cliticization', 'IS_A', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:preposition-fusion-is-cliticization', 'concept:preposition-fusion', 'concept:cliticization', 'IS_A', '0.9', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:preposition-fusion-requires-preverbal', 'concept:preposition-fusion', 'concept:preverbal-preposition', 'REQUIRES', '0.9', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:directional-is-cliticization', 'concept:directional-particle', 'concept:cliticization', 'IS_A', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:subject-clitic-requires-sov', 'concept:subject-clitic', 'concept:sov-word-order', 'REQUIRES', '0.75', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:object-clitic-requires-preverbal', 'concept:object-clitic', 'concept:preverbal-preposition', 'REQUIRES', '0.8', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:independent-pronoun-is-pronoun', 'concept:independent-pronoun', 'concept:subject-clitic', 'VARIES_BY', '0.85', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:uu-is-subject-clitic', 'morpheme:uu', 'concept:subject-clitic', 'IS_A', '0.98', '14', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ay-is-subject-clitic', 'morpheme:ay', 'concept:subject-clitic', 'IS_A', '0.98', '14', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waan-is-subject-clitic', 'morpheme:waan', 'concept:subject-clitic', 'IS_A', '0.98', '16', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waad-is-subject-clitic', 'morpheme:waad', 'concept:subject-clitic', 'IS_A', '0.98', '16', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:way-is-subject-clitic', 'morpheme:way', 'concept:subject-clitic', 'IS_A', '0.98', '16', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:u-is-preverbal-prep', 'morpheme:u', 'concept:preverbal-preposition', 'IS_A', '0.95', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ku-is-preverbal-prep', 'morpheme:ku', 'concept:preverbal-preposition', 'IS_A', '0.95', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ka-is-preverbal-prep', 'morpheme:ka', 'concept:preverbal-preposition', 'IS_A', '0.95', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:la-is-preverbal-prep', 'morpheme:la', 'concept:preverbal-preposition', 'IS_A', '0.95', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:soo-is-directional', 'morpheme:soo', 'concept:directional-particle', 'IS_A', '0.95', '10', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:sii-is-directional', 'morpheme:sii', 'concept:directional-particle', 'IS_A', '0.95', '55', 'zorc-iss-1990', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:aniga-is-independent', 'word:aniga', 'concept:independent-pronoun', 'IS_A', '0.98', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:adiga-is-independent', 'word:adiga', 'concept:independent-pronoun', 'IS_A', '0.98', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:isaga-is-independent', 'word:isaga', 'concept:independent-pronoun', 'IS_A', '0.98', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:iyaga-is-independent', 'word:iyaga', 'concept:independent-pronoun', 'IS_A', '0.98', 'colloquial', 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:sov-decl-requires-sov', 'construction:sov-declarative', 'concept:sov-word-order', 'REQUIRES', '0.95', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:focus-clause-requires-focus', 'construction:focus-clause', 'concept:subject-clitic', 'REQUIRES', '0.9', NULL, NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:sov-rule-applies-to', 'rule:sov-order', 'concept:sov-word-order', 'CITES', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:clitic-fusion-rule-applies', 'rule:subject-clitic-fusion', 'concept:cliticization', 'CITES', '0.95', NULL, 'zorc-iss-1990', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:obj-position-rule-applies', 'rule:object-pronoun-position', 'concept:preverbal-preposition', 'CITES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:prep-fusion-rule-applies', 'rule:preposition-fusion', 'concept:preposition-fusion', 'CITES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wuu-baxay-is-clitic', 'example:wuu-baxay', 'concept:subject-clitic', 'IS_A', '0.85', '14', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wuu-baxay-exemplifies-sov', 'example:wuu-baxay', 'concept:sov-word-order', 'CITES', '0.75', '14', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-way-tegeen-is-clitic', 'example:way-tegeen', 'concept:subject-clitic', 'IS_A', '0.85', '9', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waan-akhriyay-is-clitic', 'example:waan-akhriyay', 'concept:subject-clitic', 'IS_A', '0.85', '15', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waad-ka-baxday-is-clitic', 'example:waad-ka-baxday', 'concept:subject-clitic', 'IS_A', '0.85', '15', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waad-ka-baxday-exemplifies-prep', 'example:waad-ka-baxday', 'concept:preverbal-preposition', 'CITES', '0.75', '15', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-soo-dhowow-is-directional', 'example:soo-dhowow', 'concept:directional-particle', 'IS_A', '0.9', '10', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-u-sheegayaa-is-prep', 'example:u-sheegayaa', 'concept:preverbal-preposition', 'IS_A', '0.85', 'colloquial', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ka-duushay-is-prep', 'example:ka-duushay', 'concept:preverbal-preposition', 'IS_A', '0.85', 'colloquial', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ku-shub-is-prep', 'example:ku-shub', 'concept:preverbal-preposition', 'IS_A', '0.85', 'colloquial', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-waa-la-fiicanyahay-is-la', 'example:waa-la-fiicanyahay', 'concept:preverbal-preposition', 'IS_A', '0.85', '10', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-wax-bay-cuntay-is-focus', 'example:wax-bay-cuntay', 'concept:subject-clitic', 'IS_A', '0.85', '55', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ninkii-buu-arkay-is-focus', 'example:ninkii-buu-arkay', 'concept:subject-clitic', 'IS_A', '0.85', '55', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ex-ninkii-buu-arkay-exemplifies-sov', 'example:ninkii-buu-arkay', 'concept:sov-word-order', 'CITES', '0.75', '55', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:greetings-include-time', 'concept:time-greetings', 'concept:somali-greetings', 'IS_A', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:ma-baa-is-question', 'concept:question-ma-baa', 'concept:positive-interrogative', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:miyaa-is-question', 'concept:question-miyaa', 'concept:positive-interrogative', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:waa-is-focus-marker', 'concept:focus-marker', 'concept:positive-interrogative', 'RELATED_TO', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:decl1-is-noun', 'concept:declension-1', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:decl2-is-noun', 'concept:declension-2', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:decl3-is-noun', 'concept:declension-3', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:decl4-is-noun', 'concept:declension-4', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:decl5-is-noun', 'concept:declension-5', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:decl6-is-noun', 'concept:declension-6', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:decl7-is-noun', 'concept:declension-7', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:absolutive-is-case', 'concept:somali-case-system', 'concept:somali-nouns', 'APPLIES_TO', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:conj1-is-verb', 'concept:conjugation-1', 'concept:present-progressive', 'FORMS', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:conj2a-is-causative', 'concept:conjugation-2a', 'concept:conjugation-1', 'DERIVED_FROM', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:conj2b-is-factitive', 'concept:conjugation-2b', 'concept:conjugation-2a', 'RELATED_TO', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:vocative-is-form', 'concept:vocative-form', 'concept:somali-case-system', 'IS_A', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:imperative-is-mood', 'concept:imperative-mood', 'concept:conjugation-1', 'EXPRESSES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:adjectives-describe-nouns', 'concept:somali-adjectives', 'concept:somali-nouns', 'DESCRIBES', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:sov-is-basic', 'concept:word-order-sov', 'concept:somali-case-system', 'REQUIRES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:article-agrees-case', 'concept:definite-article', 'concept:somali-case-system', 'AGREES_WITH', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:future-uses-doon', 'concept:future-tense', 'concept:conjugation-1', 'DERIVED_FROM', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:numbers-are-nouns', 'concept:somali-numbers', 'concept:somali-nouns', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:and-joins-phrases', 'concept:conjunction-and', 'concept:word-order-sov', 'OPERATES_IN', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waryaa-bill-subax-wanaagsan-illustrates', 'example:waryaa-bill-subax-wanaagsan', 'concept:somali-greetings', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:ma-nabad-baa-illustrates', 'example:ma-nabad-baa', 'concept:question-ma-baa', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waa-nabad-illustrates', 'example:waa-nabad', 'concept:focus-marker', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:is-ka-warran-illustrates', 'example:is-ka-warran', 'concept:somali-greetings', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waa-la-fiicanyahay-illustrates', 'example:waa-la-fiicanyahay', 'concept:somali-greetings', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:canabay-illustrates', 'example:canabay', 'concept:vocative-form', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:maxamedew-illustrates', 'example:maxamedew', 'concept:vocative-form', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:keen-bring-illustrates', 'example:keen-bring', 'concept:imperative-mood', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:warrama-plural-illustrates', 'example:warrama-plural', 'concept:imperative-mood', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:ma-shaah-baa-illustrates', 'example:ma-shaah-baa', 'concept:question-ma-baa', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waa-ey-illustrates', 'example:waa-ey', 'concept:focus-marker', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:nabad-miyaa-illustrates', 'example:nabad-miyaa', 'concept:question-miyaa', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waan-cunayaa-illustrates', 'example:waan-cunayaa', 'concept:present-progressive', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:buuggii-waan-akhriyay-illustrates', 'example:buuggii-waan-akhriyay', 'concept:definite-article', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:dukaanka-waan-tagayaa-illustrates', 'example:dukaanka-waan-tagayaa', 'concept:definite-article', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waa-maxay-illustrates', 'example:waa-maxay', 'concept:question-what-is-it', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waa-qalin-illustrates', 'example:waa-qalin', 'concept:question-what-is-it', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:qoyska-ka-warran-illustrates', 'example:qoyska-ka-warran', 'concept:ka-warran-idiom', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:guri-cusub-illustrates', 'example:guri-cusub', 'concept:somali-adjectives', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:buuggii-maxamed-illustrates', 'example:buuggii-maxamed', 'concept:genitive-case', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:afar-dal-illustrates', 'example:afar-dal', 'concept:somali-numbers', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:hal-buug-illustrates', 'example:hal-buug', 'concept:somali-numbers', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:ninku-waa-tagay-illustrates', 'example:ninku-waa-tagay', 'concept:word-order-sov', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:subax-wanaagsan-illustrates', 'example:subax-wanaagsan', 'concept:time-greetings', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:galab-wanaagsan-illustrates', 'example:galab-wanaagsan', 'concept:time-greetings', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:nabad-gelyo-illustrates', 'example:nabad-gelyo', 'concept:somali-greetings', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:waan-fiicanahay-illustrates', 'example:waan-fiicanahay', 'concept:somali-greetings', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('example:koob-shaah-ah-illustrates', 'example:koob-shaah-ah', 'concept:somali-adjectives', 'ILLUSTRATES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:subax', 'word:subax', 'concept:time-greetings', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:waryaa', 'word:waryaa', 'concept:somali-greetings', 'EXEMPLIFIES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:mahadsanid', 'word:mahadsanid', 'concept:somali-greetings', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:nabad', 'word:nabad', 'concept:somali-greetings', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:waa-focus', 'word:waa', 'concept:focus-marker', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:ma-question', 'word:ma', 'concept:positive-interrogative', 'IS_A', '0.95', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:Canab-voc', 'word:Canab', 'concept:vocative-form', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:Maxamed-voc', 'word:Maxamed', 'concept:vocative-form', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:keen-imp', 'word:keen', 'concept:imperative-mood', 'EXPRESSES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:tag-imp', 'word:tag', 'concept:imperative-mood', 'EXPRESSES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:cun-imp', 'word:cun', 'concept:imperative-mood', 'EXPRESSES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:sug-imp', 'word:sug', 'concept:imperative-mood', 'EXPRESSES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:guri-d1', 'word:guri', 'concept:declension-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:naag-d1', 'word:naag', 'concept:declension-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:warqad-d1', 'word:warqad', 'concept:declension-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:mindi-d1', 'word:mindi', 'concept:declension-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:dukaan-d2', 'word:dukaan', 'concept:declension-2', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:baabuur-d2', 'word:baabuur', 'concept:declension-2', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:koob-d2', 'word:koob', 'concept:declension-2', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:albaab-d2', 'word:albaab', 'concept:declension-2', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:gabadh-d3', 'word:gabadh', 'concept:declension-3', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:hilib-d3', 'word:hilib', 'concept:declension-3', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:maalin-d3', 'word:maalin', 'concept:declension-3', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:galab-d3', 'word:galab', 'concept:declension-3', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:nin-d4', 'word:nin', 'concept:declension-4', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:dal-d4', 'word:dal', 'concept:declension-4', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:af-d4', 'word:af', 'concept:declension-4', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:buug-d4', 'word:buug', 'concept:declension-4', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:Soomaali-d5', 'word:Soomaali', 'concept:declension-5', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:gees-d1', 'word:gees', 'concept:declension-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:hooyo-d6', 'word:hooyo', 'concept:declension-6', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:magaalo-d6', 'word:magaalo', 'concept:declension-6', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:waddo-d6', 'word:waddo', 'concept:declension-6', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:aabbe-d7', 'word:aabbe', 'concept:declension-7', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:macallin-d2', 'word:macallin', 'concept:declension-2', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:cusub-adj', 'word:cusub', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:yar-adj', 'word:yar', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:adag-adj', 'word:adag', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:fudud-adj', 'word:fudud', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:dheer-adj', 'word:dheer', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:weyn-adj', 'word:weyn', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:fog-adj', 'word:fog', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:dhow-adj', 'word:dhow', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:culus-adj', 'word:culus', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:gaaban-adj', 'word:gaaban', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:quruxsan-adj', 'word:quruxsan', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:faraxsan-adj', 'word:faraxsan', 'concept:somali-adjectives', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:iyo-conj', 'word:iyo', 'concept:conjunction-and', 'IS_A', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:na-conj', 'word:-na', 'concept:conjunction-and', 'IS_A', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:u-prep', 'word:u', 'concept:word-order-sov', 'OPERATES_IN', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:ka-prep', 'word:ka', 'concept:word-order-sov', 'OPERATES_IN', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:ku-prep', 'word:ku', 'concept:word-order-sov', 'OPERATES_IN', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:la-prep', 'word:la', 'concept:word-order-sov', 'OPERATES_IN', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:tag-c1', 'word:tag', 'concept:conjugation-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:akhri-c1', 'word:akhri', 'concept:conjugation-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:qor-c1', 'word:qor', 'concept:conjugation-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:cun-c1', 'word:cun', 'concept:conjugation-1', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:samee-c2b', 'word:samee', 'concept:conjugation-2b', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:iibso-c3a', 'word:iibso', 'concept:conjugation-3a', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:kow-num', 'word:kow', 'concept:somali-numbers', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:warran-verb', 'word:warran', 'concept:ka-warran-idiom', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:maxamed-gen', 'word:Maxamed', 'concept:genitive-case', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('wce:dhig-teach', 'word:dhig', 'concept:word-order-sov', 'EXEMPLIFIES', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:fiican-somali-adjectives', 'word:fiican', 'concept:somali-adjectives', 'IS_A', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:adigu-somali-nouns', 'word:adigu', 'concept:somali-nouns', 'IS_A', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:ah-somali-adjectives', 'word:ah', 'concept:somali-adjectives', 'RELATED_TO', '0.7', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:bariis-declension-2', 'word:bariis', 'concept:declension-2', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:bil-declension-1', 'word:bil', 'concept:declension-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:boosto-declension-6', 'word:boosto', 'concept:declension-6', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:carruur-declension-1', 'word:carruur', 'concept:declension-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:dir-conjugation-1', 'word:dir', 'concept:conjugation-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:doon-future-tense', 'word:doon', 'concept:future-tense', 'EXEMPLIFIES', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:dugsi-declension-2', 'word:dugsi', 'concept:declension-2', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:ey-declension-5', 'word:ey', 'concept:declension-5', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:fadhiiso-conjugation-2a', 'word:fadhiiso', 'concept:conjugation-2a', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:fur-conjugation-1', 'word:fur', 'concept:conjugation-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:haa-somali-greetings', 'word:haa', 'concept:somali-greetings', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:habeen-time-greetings', 'word:habeen', 'concept:time-greetings', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:jooji-imperative-mood', 'word:jooji', 'concept:imperative-mood', 'EXEMPLIFIES', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:kan-definite-article', 'word:kan', 'concept:definite-article', 'RELATED_TO', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:khudrad-declension-1', 'word:khudrad', 'concept:declension-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:kibis-declension-3', 'word:kibis', 'concept:declension-3', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:kursi-declension-2', 'word:kursi', 'concept:declension-2', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:laybreeri-declension-2', 'word:laybreeri', 'concept:declension-2', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:maya-somali-greetings', 'word:maya', 'concept:somali-greetings', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:miyaa-question-miyaa', 'word:miyaa', 'concept:question-miyaa', 'IS_A', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:-na-conjunction-and', 'word:-na', 'concept:conjunction-and', 'IS_A', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:qalin-declension-3', 'word:qalin', 'concept:declension-3', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:qosol-conjugation-1', 'word:qosol', 'concept:conjugation-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:raac-conjugation-1', 'word:raac', 'concept:conjugation-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:saaxiib-declension-2', 'word:saaxiib', 'concept:declension-2', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:shaah-somali-greetings', 'word:shaah', 'concept:somali-greetings', 'EXEMPLIFIES', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:sonkor-somali-greetings', 'word:sonkor', 'concept:somali-greetings', 'EXEMPLIFIES', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:soo-word-order-sov', 'word:soo', 'concept:word-order-sov', 'OPERATES_IN', '0.7', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:suuq-declension-2', 'word:suuq', 'concept:declension-2', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:tagsi-declension-2', 'word:tagsi', 'concept:declension-2', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:waayo-word-order-sov', 'word:waayo', 'concept:word-order-sov', 'OPERATES_IN', '0.7', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:walaal-declension-1', 'word:walaal', 'concept:declension-1', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:wax-somali-nouns', 'word:wax', 'concept:somali-nouns', 'IS_A', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:wiil-declension-4', 'word:wiil', 'concept:declension-4', 'EXEMPLIFIES', '0.8', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:xaggee-question-what-is-it', 'word:xaggee', 'concept:question-what-is-it', 'RELATED_TO', '0.75', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:verbal-pronouns-focus', 'concept:verbal-subject-pronouns', 'concept:focus-marker', 'RELATED_TO', '0.85', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('fix:na-conjunction', 'word:na', 'concept:conjunction-and', 'IS_A', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO concept_edges (id, from_node, to_node, type, weight, source_page, source_textbook, confidence) VALUES ('edge:na-is-conjunction', 'word:na', 'concept:conjunction-and', 'IS_A', '0.9', NULL, 'colloquial-somali-1995', NULL) ON CONFLICT (id) DO NOTHING;
-- 438

-- ─── content_edges ───
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waa-explanation-teaches-declarative', 'colloquial:u01:waa-explanation', 'concept:declarative-marker', 'TEACHES', '0.95', '14', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waa-explanation-teaches-waa', 'colloquial:u01:waa-explanation', 'morpheme:waa', 'TEACHES', '0.95', '14', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waa-explanation-teaches-rule', 'colloquial:u01:waa-explanation', 'rule:waa-obligatory', 'TEACHES', '0.95', '14', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waa-pronouns-teaches-waa', 'colloquial:u01:waa-pronoun-combinations', 'morpheme:waa', 'TEACHES', '0.95', '14', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ma-explanation-teaches-interrogative', 'colloquial:u01:ma-explanation', 'concept:interrogative-marker', 'TEACHES', '0.95', '15', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ma-explanation-teaches-ma', 'colloquial:u01:ma-explanation', 'morpheme:ma', 'TEACHES', '0.95', '15', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ma-pronouns-teaches-miyaa', 'colloquial:u01:ma-pronoun-combinations', 'morpheme:miyaa', 'TEACHES', '0.95', '15', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ma-pronouns-teaches-ma', 'colloquial:u01:ma-pronoun-combinations', 'morpheme:ma', 'TEACHES', '0.90', '15', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waa-examples-teaches-declarative', 'colloquial:u01:waa-example-sentences', 'concept:declarative-marker', 'EXEMPLIFIES', '0.90', '14', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waa-examples-teaches-waa', 'colloquial:u01:waa-example-sentences', 'morpheme:waa', 'EXEMPLIFIES', '0.90', '14', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ma-examples-teaches-interrogative', 'colloquial:u01:ma-example-sentences', 'concept:interrogative-marker', 'EXEMPLIFIES', '0.90', '15', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ma-examples-teaches-ma', 'colloquial:u01:ma-example-sentences', 'morpheme:ma', 'EXEMPLIFIES', '0.90', '15', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-intro-teaches-focus', 'colloquial:u03:focus-markers-intro', 'concept:focus-marker', 'TEACHES', '0.95', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-intro-teaches-baa', 'colloquial:u03:focus-markers-intro', 'morpheme:baa', 'TEACHES', '0.95', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-intro-teaches-ayaa', 'colloquial:u03:focus-markers-intro', 'morpheme:ayaa', 'TEACHES', '0.95', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-intro-teaches-rule', 'colloquial:u03:focus-markers-intro', 'rule:baa-ayaa-interchangeable', 'TEACHES', '0.95', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-understanding-teaches-focus', 'colloquial:u03:focus-understanding', 'concept:focus-marker', 'TEACHES', '0.90', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-nonsubject-teaches-objfocus', 'colloquial:u03:focus-non-subject', 'concept:object-focus', 'TEACHES', '0.95', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-nonsubject-teaches-baa', 'colloquial:u03:focus-non-subject', 'morpheme:baa', 'TEACHES', '0.90', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-nonsubject-teaches-bay', 'colloquial:u03:focus-non-subject', 'morpheme:bay', 'TEACHES', '0.85', '50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-subject-teaches-subjfocus', 'colloquial:u03:focus-subject', 'concept:subject-focus', 'TEACHES', '0.95', '51', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-subject-teaches-rule-abs', 'colloquial:u03:focus-subject', 'rule:baa-subject-absolutive', 'TEACHES', '0.95', '51', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-subject-teaches-rule-nopron', 'colloquial:u03:focus-subject', 'rule:baa-no-subject-marker', 'TEACHES', '0.95', '51', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-contraction-teaches-baa', 'colloquial:u03:focus-contraction', 'morpheme:baa', 'TEACHES', '0.85', '52', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:focus-contraction-teaches-construction', 'colloquial:u03:focus-contraction', 'construction:focus-contraction', 'TEACHES', '0.85', '52', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waxaa-construction-teaches-objfocus', 'colloquial:u10:waxaa-construction', 'concept:object-focus', 'TEACHES', '0.95', '103', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waxaa-construction-teaches-waxaa', 'colloquial:u10:waxaa-construction', 'morpheme:waxaa', 'TEACHES', '0.95', '103', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waxaa-construction-teaches-waxaan', 'colloquial:u10:waxaa-construction', 'morpheme:waxaan', 'TEACHES', '0.95', '103', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waxaa-construction-teaches-waxaad', 'colloquial:u10:waxaa-construction', 'morpheme:waxaad', 'TEACHES', '0.90', '103', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waxaa-construction-exemplifies', 'colloquial:u10:waxaa-construction', 'construction:focus-object', 'EXEMPLIFIES', '0.90', '103', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waxaa-newspaper-teaches-waxaa', 'colloquial:u10:waxaa-newspaper-examples', 'morpheme:waxaa', 'EXEMPLIFIES', '0.85', '107', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waxaa-newspaper-teaches-objfocus', 'colloquial:u10:waxaa-newspaper-examples', 'concept:object-focus', 'EXEMPLIFIES', '0.85', '107', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ma-baa-waa-teaches-focus', 'zorc:ch02:ma-baa-waa-intro', 'concept:focus-marker', 'TEACHES', '0.95', '35', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ma-baa-waa-teaches-declarative', 'zorc:ch02:ma-baa-waa-intro', 'concept:declarative-marker', 'TEACHES', '0.90', '35', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ma-baa-waa-teaches-interrogative', 'zorc:ch02:ma-baa-waa-intro', 'concept:interrogative-marker', 'TEACHES', '0.90', '35', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-waa-examples-teaches-declarative', 'zorc:ch02:waa-example', 'concept:declarative-marker', 'EXEMPLIFIES', '0.90', '37', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ma-examples-teaches-interrogative', 'zorc:ch02:ma-example', 'concept:interrogative-marker', 'EXEMPLIFIES', '0.90', '37', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ma-examples-teaches-baa', 'zorc:ch02:ma-example', 'morpheme:baa', 'EXEMPLIFIES', '0.80', '37', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-topic-teaches-infostructure', 'zorc:ch12:focus-topic-explanation', 'concept:information-structure', 'TEACHES', '0.95', '111', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-topic-teaches-focus', 'zorc:ch12:focus-topic-explanation', 'concept:focus-marker', 'TEACHES', '0.95', '111', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-topic-teaches-baa', 'zorc:ch12:focus-topic-explanation', 'morpheme:baa', 'TEACHES', '0.90', '111', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-topic-teaches-objectfocus', 'zorc:ch12:focus-topic-explanation', 'concept:object-focus', 'TEACHES', '0.85', '111', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-nonfocus-teaches-focus', 'zorc:ch12:focus-nonfocus-declaratives', 'concept:focus-marker', 'TEACHES', '0.90', '111', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-nonfocus-teaches-declarative', 'zorc:ch12:focus-nonfocus-declaratives', 'concept:declarative-marker', 'TEACHES', '0.85', '111', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-subj-focus-rule-teaches-subjfocus', 'zorc:ch12:subject-focus-rule', 'concept:subject-focus', 'TEACHES', '0.95', '113', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-subj-focus-rule-teaches-objfocus', 'zorc:ch12:subject-focus-rule', 'concept:object-focus', 'TEACHES', '0.95', '113', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-subj-focus-rule-teaches-buu', 'zorc:ch12:subject-focus-rule', 'morpheme:buu', 'TEACHES', '0.90', '113', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-subj-focus-rule-teaches-rule', 'zorc:ch12:subject-focus-rule', 'rule:object-focus-derived-forms', 'TEACHES', '0.95', '113', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-waa-baa-rules-teaches-focus', 'zorc:ch12:waa-baa-additional-rules', 'concept:focus-marker', 'TEACHES', '0.90', '114', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-waa-baa-rules-teaches-subjfocus', 'zorc:ch12:waa-baa-additional-rules', 'concept:subject-focus', 'TEACHES', '0.85', '114', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-practice-teaches-focus', 'zorc:ch12:focus-practice-sentences', 'concept:focus-marker', 'EXEMPLIFIES', '0.90', '113', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-focus-practice-teaches-subjfocus', 'zorc:ch12:focus-practice-sentences', 'concept:subject-focus', 'EXEMPLIFIES', '0.85', '113', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-past-explanation', 'colloquial:u01:past-tense-explanation', 'concept:past-tense', 'TEACHES', '0.95', '18', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-prog-explanation', 'colloquial:u02:present-progressive-explanation', 'concept:present-progressive', 'TEACHES', '0.95', '30', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-future-explanation', 'colloquial:u08:future-explanation', 'concept:future-tense', 'TEACHES', '0.95', '109', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-habitual-explanation', 'colloquial:u08:past-habitual-explanation', 'concept:past-habitual', 'TEACHES', '0.95', '110', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-neg-imp-explanation', 'colloquial:u08:negative-imperative-explanation', 'concept:negative-imperative', 'TEACHES', '0.95', '111', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-neg-past-explanation', 'colloquial:u08:negative-past-explanation', 'concept:negative-past', 'TEACHES', '0.95', '112', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-neg-pres-explanation', 'colloquial:u08:negative-present-explanation', 'concept:negative-present', 'TEACHES', '0.95', '123', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-optative-explanation', 'colloquial:u04:optative-explanation', 'concept:optative-mood', 'TEACHES', '0.95', '46', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-past-prog-explanation', 'colloquial:u08:past-progressive-explanation', 'concept:past-progressive', 'TEACHES', '0.95', '121', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-past-teaches-ay', 'colloquial:u01:past-tense-explanation', 'morpheme:-ay', 'TEACHES', '0.9', '18', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-prog-teaches-ayaa', 'colloquial:u02:present-progressive-explanation', 'morpheme:-ayaa', 'TEACHES', '0.9', '30', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-future-teaches-doon', 'colloquial:u08:future-explanation', 'morpheme:doon', 'TEACHES', '0.9', '109', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-habitual-teaches-jir', 'colloquial:u08:past-habitual-explanation', 'morpheme:jir', 'TEACHES', '0.9', '110', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-neg-imp-teaches-ha', 'colloquial:u08:negative-imperative-explanation', 'morpheme:ha', 'TEACHES', '0.9', '111', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-neg-past-teaches-in', 'colloquial:u08:negative-past-explanation', 'morpheme:-in', 'TEACHES', '0.9', '112', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u08-neg-pres-teaches-o', 'colloquial:u08:negative-present-explanation', 'morpheme:-o', 'TEACHES', '0.9', '123', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-optative-teaches-to', 'colloquial:u04:optative-explanation', 'morpheme:-to', 'TEACHES', '0.9', '46', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-gender-teaches-noun-gender', 'colloquial:u03:noun-gender-intro', 'concept:noun-gender', 'TEACHES', '0.95', '31', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-gender-teaches-k-class', 'colloquial:u03:noun-gender-intro', 'concept:k-class', 'TEACHES', '0.85', '31', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-gender-teaches-t-class', 'colloquial:u03:noun-gender-intro', 'concept:t-class', 'TEACHES', '0.85', '31', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-declensions-teaches-plural', 'colloquial:u03:declensions-1-2-3', 'concept:plural-formation', 'TEACHES', '0.95', '34', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-vocab-teaches-gender', 'colloquial:u03:word-list-gender', 'concept:noun-gender', 'TEACHES', '0.95', '39', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-vocab-teaches-words', 'colloquial:u03:word-list-gender', 'word:bariis', 'MENTIONS', '0.95', '39', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-article-teaches-def-article', 'colloquial:u04:definite-article', 'concept:definite-article', 'TEACHES', '0.95', '44', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-article-sound-teaches-vowel-harmony', 'colloquial:u04:article-sound-changes', 'concept:vowel-harmony', 'TEACHES', '0.95', '45', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-article-sound-teaches-allomorph-ga', 'colloquial:u04:article-sound-changes', 'morpheme:-ga', 'TEACHES', '0.95', '45', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-article-sound-teaches-allomorph-ha', 'colloquial:u04:article-sound-changes', 'morpheme:-ha', 'TEACHES', '0.95', '45', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-genitive-teaches-genitive', 'colloquial:u04:genitive-case', 'concept:genitive-case', 'TEACHES', '0.95', '67', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u07-possessive-teaches-possessive', 'colloquial:u07:possessive-suffixes', 'concept:possessive-suffix', 'TEACHES', '0.95', '133', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ch04-k-teaches-k-class', 'zorc:ch04:k-class-intro', 'concept:k-class', 'TEACHES', '0.95', '49', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ch04-k-teaches-demonstrative', 'zorc:ch04:k-class-intro', 'concept:demonstrative', 'TEACHES', '0.85', '49', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ch04-t-teaches-t-class', 'zorc:ch04:t-class-intro', 'concept:t-class', 'TEACHES', '0.95', '50', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ch04-t-teaches-demonstrative', 'zorc:ch04:t-class-intro', 'concept:demonstrative', 'TEACHES', '0.85', '50', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ch04-gender-teaches-noun-gender', 'zorc:ch04:grammatical-gender', 'concept:noun-gender', 'TEACHES', '0.95', '51', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ch05-changes-teaches-vowel-harmony', 'zorc:ch05:masculine-article-changes', 'concept:vowel-harmony', 'TEACHES', '0.95', '58', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-ch06-changes-teaches-vowel-harmony', 'zorc:ch06:feminine-article-changes', 'concept:vowel-harmony', 'TEACHES', '0.95', '66', 'zorc-somali-textbook') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:sov-explanation-teaches-sov', 'syntax:sov-word-order-explanation', 'concept:sov-word-order', 'TEACHES', '0.95', '36-50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:subject-clitic-explanation-teaches', 'syntax:subject-clitic-explanation', 'concept:subject-clitic', 'TEACHES', '0.95', '14-16', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:object-clitic-explanation-teaches', 'syntax:object-clitic-explanation', 'concept:object-clitic', 'TEACHES', '0.9', '36-50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:cliticization-explanation-teaches', 'syntax:cliticization-explanation', 'concept:cliticization', 'TEACHES', '0.95', '36-50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:preverb-explanation-teaches', 'syntax:preverbal-prep-explanation', 'concept:preverbal-preposition', 'TEACHES', '0.95', '36-50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:directional-explanation-teaches', 'syntax:directional-particle-explanation', 'concept:directional-particle', 'TEACHES', '0.95', '10-16', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:prep-fusion-explanation-teaches', 'syntax:preposition-fusion-explanation', 'concept:preposition-fusion', 'TEACHES', '0.9', '30-35', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:independent-pronoun-teaches', 'syntax:independent-pronoun-explanation', 'concept:independent-pronoun', 'TEACHES', '0.9', '10-16', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:greeting-exemplifies-clitic', 'syntax:example-greeting-dialogue', 'concept:subject-clitic', 'EXEMPLIFIES', '0.75', '10', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:shopping-exemplifies-clitic', 'syntax:example-shopping-dialogue', 'concept:subject-clitic', 'EXEMPLIFIES', '0.75', '13', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:shopping-exemplifies-prep', 'syntax:example-shopping-dialogue', 'concept:preverbal-preposition', 'EXEMPLIFIES', '0.75', '13', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:bill-exemplifies-clitic', 'syntax:example-bill-afrika', 'concept:subject-clitic', 'EXEMPLIFIES', '0.8', '32', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:bill-exemplifies-prep', 'syntax:example-bill-afrika', 'concept:preverbal-preposition', 'EXEMPLIFIES', '0.8', '32', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:monday-exemplifies-sov', 'syntax:example-monday-morning', 'concept:sov-word-order', 'EXEMPLIFIES', '0.75', '31', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:monday-exemplifies-clitic', 'syntax:example-monday-morning', 'concept:subject-clitic', 'EXEMPLIFIES', '0.75', '31', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:zorc-exemplifies-clitic', 'syntax:example-zorc-basic', 'concept:cliticization', 'EXEMPLIFIES', '0.8', '55-65', 'zorc-iss-1990') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:preverb-paradigm-exemplifies', 'syntax:example-preverb-paradigm', 'concept:preverbal-preposition', 'EXEMPLIFIES', '0.85', '36-50', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:waa-combo-exemplifies', 'syntax:example-waa-pronoun-combo', 'concept:subject-clitic', 'EXEMPLIFIES', '0.9', '16', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-soo-dhowow-defines', 'syntax:example-greeting-dialogue', 'example:soo-dhowow', 'DEFINES', '0.8', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-wuu-baxay-exemplifies', 'syntax:example-monday-morning', 'example:wuu-baxay', 'EXEMPLIFIES', '0.7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-waa-la-fiic-defines', 'syntax:example-greeting-dialogue', 'example:waa-la-fiicanyahay', 'DEFINES', '0.8', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-wax-bay-exemplifies', 'syntax:example-zorc-basic', 'example:wax-bay-cuntay', 'EXEMPLIFIES', '0.7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-ninkii-buu-exemplifies', 'syntax:example-zorc-basic', 'example:ninkii-buu-arkay', 'EXEMPLIFIES', '0.7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-prep-exemplifies', 'syntax:example-preverb-paradigm', 'example:u-sheegayaa', 'EXEMPLIFIES', '0.7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-prep2-exemplifies', 'syntax:example-preverb-paradigm', 'example:ka-duushay', 'EXEMPLIFIES', '0.7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:ex-prep3-exemplifies', 'syntax:example-preverb-paradigm', 'example:ku-shub', 'EXEMPLIFIES', '0.7', NULL, NULL) ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-dialogue-greetings', 'colloquial:u01:dialogue', 'concept:somali-greetings', 'TEACHES', '0.95', '10', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-vocab-greetings', 'colloquial:u01:vocabulary', 'concept:somali-greetings', 'TEACHES', '0.85', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-grammar-greetings', 'colloquial:u01:grammar-greetings', 'concept:somali-greetings', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-grammar-vocative', 'colloquial:u01:grammar-vocative', 'concept:vocative-form', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-grammar-imperative', 'colloquial:u01:grammar-imperative', 'concept:imperative-mood', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-grammar-pronouns', 'colloquial:u01:grammar-object-pronouns', 'concept:third-person-object-pronouns', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-grammar-questions', 'colloquial:u01:grammar-questions', 'concept:question-ma-baa', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-exercises-practice', 'colloquial:u01:exercises', 'concept:imperative-mood', 'PRACTICES', '0.9', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u01-reading-review', 'colloquial:u01:reading', 'concept:somali-greetings', 'REVIEWS', '0.85', '16', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-dialogue-greetings', 'colloquial:u02:dialogue', 'concept:time-greetings', 'TEACHES', '0.95', '17', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-time', 'colloquial:u02:grammar-time-greetings', 'concept:time-greetings', 'TEACHES', '0.95', '18', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-miyaa', 'colloquial:u02:grammar-miyaa', 'concept:question-miyaa', 'TEACHES', '0.95', '18', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-progressive', 'colloquial:u02:grammar-present-progressive', 'concept:present-progressive', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-nouns', 'colloquial:u02:grammar-nouns', 'concept:somali-nouns', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-d1', 'colloquial:u02:grammar-declension1', 'concept:declension-1', 'TEACHES', '0.95', '20', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-d2', 'colloquial:u02:grammar-declension2', 'concept:declension-2', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-d3', 'colloquial:u02:grammar-declension3', 'concept:declension-3', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-grammar-and', 'colloquial:u02:grammar-and', 'concept:conjunction-and', 'TEACHES', '0.95', '22', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u02-exercises-practice', 'colloquial:u02:exercises', 'concept:present-progressive', 'PRACTICES', '0.9', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-case', 'colloquial:u03:grammar-case', 'concept:somali-case-system', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-word-order', 'colloquial:u03:grammar-word-order', 'concept:word-order-sov', 'TEACHES', '0.95', '25', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-article', 'colloquial:u03:grammar-definite-article', 'concept:definite-article', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-d4', 'colloquial:u03:grammar-declension4', 'concept:declension-4', 'TEACHES', '0.95', '27', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-d5', 'colloquial:u03:grammar-declension5', 'concept:declension-5', 'TEACHES', '0.95', '28', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-c2a', 'colloquial:u03:grammar-conjugation2a', 'concept:conjugation-2a', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-what', 'colloquial:u03:grammar-what-is-it', 'concept:question-what-is-it', 'TEACHES', '0.95', '30', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-grammar-days', 'colloquial:u03:grammar-days', 'concept:days-of-week', 'TEACHES', '0.95', '30', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u03-exercises-practice', 'colloquial:u03:exercises', 'concept:conjugation-2a', 'PRACTICES', '0.9', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-grammar-d6', 'colloquial:u04:grammar-declension6', 'concept:declension-6', 'TEACHES', '0.95', '33', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-grammar-d7', 'colloquial:u04:grammar-declension7', 'concept:declension-7', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-grammar-c2b', 'colloquial:u04:grammar-conjugation2b', 'concept:conjugation-2b', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-grammar-ka-warran', 'colloquial:u04:grammar-ka-warran', 'concept:ka-warran-idiom', 'TEACHES', '0.95', '35', 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-grammar-adjectives', 'colloquial:u04:grammar-adjectives', 'concept:somali-adjectives', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-grammar-genitive', 'colloquial:u04:grammar-genitive', 'concept:genitive-case', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-grammar-numbers', 'colloquial:u04:grammar-numbers', 'concept:somali-numbers', 'TEACHES', '0.95', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
INSERT INTO content_edges (id, content_id, concept_id, type, weight, source_page, source_textbook) VALUES ('ce:u04-exercises-practice', 'colloquial:u04:exercises', 'concept:somali-adjectives', 'PRACTICES', '0.9', NULL, 'colloquial-somali-1995') ON CONFLICT (id) DO NOTHING;
-- 150

-- ─── graph_exercises ───
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:past-conjugation', 'lesson:colloquial:unit-01', 'Past Tense Conjugation Practice', 'Write out all the forms of the general past tense of the following verbs:', 0.3) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u02:present-progressive', 'lesson:colloquial:unit-02', 'Present Progressive Practice', 'Write out all the forms of the present progressive tense of the following verbs:', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u08:future-tense', 'lesson:colloquial:unit-08', 'Future Tense with doon', 'Translate the following sentences into Somali, using the construction with doon to express the future:', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u08:past-habitual', 'lesson:colloquial:unit-08', 'Past Habitual with jir', 'Translate the following sentences into Somali using the past habitual:', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u08:negative-commands', 'lesson:colloquial:unit-08', 'Negative Commands', 'Change these positive imperatives into negative imperatives and translate into English:', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u08:negation-past', 'lesson:colloquial:unit-08', 'Negating Past Tense', 'Convert the following sentences into negative sentences:', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u08:negation-present', 'lesson:colloquial:unit-08', 'Negating Present Tense', 'Change the following sentences from the positive into the negative:', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:zorc:ch8:past-tense-conjugation', 'lesson:zorc:ch8', 'Past Tense Conjugation (Zorc)', 'Form past tense sentences using the given verbs and subjects:', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u03:plural-formation', 'lesson:colloquial:unit-03', 'Plural Formation Practice', 'Give the plural form of the following declension 1 nouns:', 0.25) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u03:gender-identification', 'lesson:colloquial:unit-03', 'Noun Gender Identification', 'Identify the grammatical gender (masculine or feminine) of each noun. Remember: gender is grammatical, not semantic.', 0.2) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:definite-article', 'lesson:colloquial:unit-04', 'Definite Article Application', 'Add the appropriate definite article (-ka, -ta, -kii, -tii) to each noun. Consider whether the noun is new information or known/referred information.', 0.3) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:zorc:ch05:article-allomorphs', 'lesson:zorc:chapter-05', 'Masculine Article Allomorphs', 'Apply the correct definite article form to each masculine noun. Remember the sound changes: -ka → -ga (after g,i,w,y), -ka → -ha (after vowels e,o), -ka disappears (after c,h,q,kh,x).', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:zorc:ch06:feminine-article-allomorphs', 'lesson:zorc:chapter-06', 'Feminine Article Allomorphs', 'Apply the correct definite article form to each feminine noun. Remember: -ta → -da (after o, and after consonants d,h,kh,x,w,y).', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:genitive-construction', 'lesson:colloquial:unit-04', 'Genitive Construction Practice', 'Translate the following possessive phrases into Somali using the genitive case.', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u07:possessive-suffixes', 'lesson:colloquial:unit-04', 'Possessive Suffix Practice', 'Add the appropriate possessive suffix to each noun and translate into English.', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:zorc:ch04:demonstratives', 'lesson:zorc:chapter-04', 'Demonstrative Suffixes', 'Identify the correct demonstrative suffix for each description.', 0.25) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:clitics01', 'lesson:colloquial:unit-01', 'Subject Clitic Recognition', 'Identify the subject clitic in each sentence and state its person, number, and gender.', 0.25) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:directional01', 'lesson:colloquial:unit-01', 'Directional Particle Usage', 'Translate the following into Somali using directional particles soo (hither) or sii (thither).', 0.2) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:sov01', 'lesson:colloquial:unit-04', 'SOV Word Order Practice', 'Rearrange the following words into correct Somali SOV order: [Subject clitic] [Object] [Preposition] [Verb].', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:preverb01', 'lesson:colloquial:unit-04', 'Preverbal Preposition Identification', 'Identify the preverbal preposition in each sentence and state its meaning.', 0.3) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:zorc:ch08:fusion01', 'lesson:zorc:ch-08', 'Pronoun Fusion with Classifiers', 'Fill in the fused form for each classifier + pronoun combination.', 0.3) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:zorc:ch08:sov01', 'lesson:zorc:ch-08', 'Focus Construction Word Order', 'Identify the focused constituent and the focus marker in each sentence.', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:ex01', 'lesson:colloquial:unit-01', 'Greeting responses', 'Reply to the following greetings.', 0.1) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:ex02', 'lesson:colloquial:unit-01', 'Vocative forms', 'Give the vocative forms of the following names.', 0.15) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:ex03', 'lesson:colloquial:unit-01', 'Imperative practice', 'Convert the singular imperatives into plural imperatives.', 0.2) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:ex04', 'lesson:colloquial:unit-01', 'Third person pronoun translations', 'Write down all the possible English translations.', 0.2) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u01:ex05', 'lesson:colloquial:unit-01', 'Fill in the blanks (Is it...?)', 'Fill in the blanks.', 0.15) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u02:ex03', 'lesson:colloquial:unit-02', 'Present progressive forms', 'Write out all forms of the present progressive.', 0.25) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u02:ex05', 'lesson:colloquial:unit-02', 'Translation to Somali', 'Translate the following sentences into Somali.', 0.3) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u03:ex09', 'lesson:colloquial:unit-03', 'Conjugation 2A verb forms', 'Write out in full the general past and present progressive forms.', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u03:ex10', 'lesson:colloquial:unit-03', 'Translation with conjugation 2A', 'Translate into Somali.', 0.35) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:ex03', 'lesson:colloquial:unit-04', 'Conjugation 2B verb forms', 'Write out in full the general past and present progressive forms.', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:ex05', 'lesson:colloquial:unit-04', 'Translation with adjectives', 'Translate into Somali.', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:ex07', 'lesson:colloquial:unit-04', 'Genitive constructions', 'Translate the following pairs of nouns into genitive constructions.', 0.4) ON CONFLICT (id) DO NOTHING;
INSERT INTO graph_exercises (id, lesson_id, title, instruction, difficulty) VALUES ('ex:colloquial:u04:ex10', 'lesson:colloquial:unit-04', 'Translation with numbers', 'Translate into Somali.', 0.4) ON CONFLICT (id) DO NOTHING;
-- 35

-- ─── exercise_items ───
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:past-conjugation', 0, 'diid (refuse)', 'diiday, diidtay, diiday, diidtay, diidnay, diidteen, diideen', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:past-conjugation', 1, 'akhri (read)', 'akhriyay, akhriday, akhriyay, akhriday, akhriyay (akhriyeen for 1pl), akhriyeen', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:past-conjugation', 2, 'tag (go)', 'tegey, tagtay/tegtay, tegey, tagtay/tegtay, tegnay, tagteen, tegeen', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u02:present-progressive', 0, 'xidh (to close)', 'xidhayaa, xidhaysaa, xidhayaa, xidhaysaa, xidhaynaa, xidhaysaan, xidhayaan', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u02:present-progressive', 1, 'akhri (to read)', 'akhriyayaa, akhrisaysaa, akhriyayaa, akhrisaysaa, akhriyaynaa, akhrisaysaan, akhriyayaan', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:future-tense', 0, 'He will have lunch tomorrow.', 'Berri wuu qadi doonaa.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:future-tense', 1, 'I will teach them the lesson.', 'Cashadda waan bari doonaa.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:future-tense', 2, 'They will send many letters.', 'Waxay dir doonaan warqado badan.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:past-habitual', 0, 'I used to drink a lot of tea.', 'Shaah badan waan cabbi jiray.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:past-habitual', 1, 'She used to bring rice and meat.', 'Bariis iyo hilib way keeni jirtay.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:past-habitual', 2, 'Did you used to learn easy languages?', 'Luuqado fudud ma baran jirtey?', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negative-commands', 0, 'Keen! (Bring it!)', 'Ha keenin! (Do not bring it!)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negative-commands', 1, 'Tag! (Go!)', 'Ha tegin! (Do not go!)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negative-commands', 2, 'Suga! (Wait!)', 'Ha sugin! (Do not wait!)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negation-past', 0, 'Dugsiga waan tagay. (I went to the school.)', 'Dugsiga maan tagin.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negation-past', 1, 'Wax baan arkay. (I saw something.)', 'Waxba maan arkin.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negation-past', 2, 'Bill basaboorkii wuu helay. (Bill found the passport.)', 'Bill basaboorkii ma uu helin.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negation-present', 0, 'Afaaf badan way dhigaan. (They write many languages.)', 'Afaaf badan ma dhigo.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u08:negation-present', 1, 'Waqooyiga dalka wuu tagaa. (He goes to the north of the country.)', 'Waqooyiga dalka ma tago.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch8:past-tense-conjugation', 0, 'I + eat + the food (cun)', 'Cuntada waan cuney.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch8:past-tense-conjugation', 1, 'He + go + Mogadishu (tag)', 'Muqdisho wuu tagey.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch8:past-tense-conjugation', 2, 'She + read + the book (akhri)', 'Buugga way akhrisay/akhriday.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:plural-formation', 0, 'beer (garden, farm)', 'beero', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:plural-formation', 1, 'sabab (reason)', 'sababbo', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:plural-formation', 2, 'daar (stone building)', 'daaro', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:plural-formation', 3, 'kab (shoe)', 'kabo', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:plural-formation', 4, 'qayb (part, share)', 'qaybo', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:gender-identification', 0, 'naag (woman)', 'feminine', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:gender-identification', 1, 'nin (man)', 'masculine', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:gender-identification', 2, 'bariis (rice)', 'masculine', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:gender-identification', 3, 'caano (milk)', 'feminine', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:gender-identification', 4, 'subax (morning)', 'feminine', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:gender-identification', 5, 'habeen (night)', 'masculine', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:definite-article', 0, 'dukaan (shop) — new info, masculine', 'dukaanka', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:definite-article', 1, 'suuq (market) — known, masculine', 'suuqii', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:definite-article', 2, 'naag (woman) — new info, feminine', 'naagta', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:definite-article', 3, 'bariis (rice) — known, masculine', 'bariiskii', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:definite-article', 4, 'subax (morning) — new info, feminine', 'subaxda', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch05:article-allomorphs', 0, 'guri (house) + -ka', 'guriga', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch05:article-allomorphs', 1, 'bare (teacher) + -ka', 'baraha', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch05:article-allomorphs', 2, 'madax (head) + -ka', 'madaxa', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch05:article-allomorphs', 3, 'buug (book) + -ka', 'buugga', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch05:article-allomorphs', 4, 'biyo (water) + -ka', 'biyaha', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch05:article-allomorphs', 5, 'ey (dog) + -ka', 'eyga', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch06:feminine-article-allomorphs', 0, 'cunto (food) + -ta', 'cuntada', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch06:feminine-article-allomorphs', 1, 'magaalo (city) + -ta', 'magaalada', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch06:feminine-article-allomorphs', 2, 'subax (morning) + -ta', 'subaxda', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch06:feminine-article-allomorphs', 3, 'nabad (peace) + -ta', 'nabadda', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch06:feminine-article-allomorphs', 4, 'warqad (letter) + -ta', 'warqadda', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch06:feminine-article-allomorphs', 5, 'mindi (knife) + -ta', 'mindida', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:genitive-construction', 0, 'Maxamed''s book', 'buuggii Maxamed', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:genitive-construction', 1, 'foot pain (lit. pain of foot)', 'xanuun lugeed', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:genitive-construction', 2, 'the teacher''s pen', 'qalinka macallinka', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:genitive-construction', 3, 'the pen of the new teacher', 'qalinka macallinka cusub', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:genitive-construction', 4, 'the new pen of the teacher', 'qalinka cusub ee macallinka', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u07:possessive-suffixes', 0, 'Koob... waan buuxsaday. (my)', 'Koobkayga waan buuxsaday.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u07:possessive-suffixes', 1, 'Bariis... ma karin. (their)', 'Bariiskooda ma karin.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u07:possessive-suffixes', 2, 'Baabuur... cusub buu wadanayaa. (your sg.)', 'Baabuurkaaga cusub buu wadanayaa.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u07:possessive-suffixes', 3, 'Magac... waa Rooble. (my, subject case)', 'Magacaygu waa Rooble.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch04:demonstratives', 0, 'this (masculine, proximal)', '-kan', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch04:demonstratives', 1, 'that (feminine, not far away)', '-taas', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch04:demonstratives', 2, 'this (feminine, proximal)', '-tan', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch04:demonstratives', 3, 'that (masculine, far away)', '-kéer', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch04:demonstratives', 4, 'that (feminine, far away)', '-téer', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:clitics01', 0, 'Wuu baxay.', 'wuu = waa + uu (3sg masculine)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:clitics01', 1, 'Way tegeen.', 'way = waa + ay (3sg feminine / 3pl)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:clitics01', 2, 'Waan akhriyay.', 'waan = waa + aan (1sg)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:clitics01', 3, 'Waad ka baxday.', 'waad = waa + aad (2sg)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:directional01', 0, 'Come in! (toward speaker)', 'Soo dhowow!', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:directional01', 1, 'Sit down! (toward speaker)', 'Soo fadhiiso!', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:directional01', 2, 'Go away! (away from speaker)', 'Sii bax!', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:sov01', 0, 'waan / buug / akhriyay', 'Waan buug akhriyay.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:sov01', 1, 'way / geedka / ka / duushay', 'Way geedka ka duushay.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:sov01', 2, 'wuu / jaamacadda / u / tagay', 'Wuu jaamacadda u tagay.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:sov01', 3, 'waad / caano / koobka / ku / shub', 'Waad caano koobka ku shub.', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:preverb01', 0, 'Maxmuud waan u sheegayaa.', 'u = to/for (dative)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:preverb01', 1, 'Shimbirtu geedka way ka duushay.', 'ka = from (ablative)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:preverb01', 2, 'Caano koobka ku shub.', 'ku = in/into (locative)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:preverb01', 3, 'Waa la fiicanyahay.', 'la = impersonal one', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:fusion01', 0, 'waa + aan (1sg declarative)', 'waan', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:fusion01', 1, 'baa + uu (3sg.m focus)', 'buu', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:fusion01', 2, 'ma + aad (2sg question)', 'maad', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:fusion01', 3, 'waa + aynu (1pl.incl declarative)', 'weynu', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:fusion01', 4, 'baa + aannu (1pl.excl focus)', 'baannu', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:sov01', 0, 'Ninkii buu arkay.', 'ninkii (the man) is focused; buu = baa + uu (focus marker + 3sg.m clitic)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:sov01', 1, 'Wax bay cuntay.', 'wax (something) is focused; bay = baa + ay (focus marker + 3sg.f clitic)', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:zorc:ch08:sov01', 2, 'Gabadhu bariis baa bay cuntay.', 'bariis (rice) is focused; baa = focus marker; bay = baa + ay', NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex01', 0, 'Ma nabad baa?', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex01', 1, 'Is ka warran!', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex02', 0, 'Women: Maryan', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex02', 1, 'Women: Zaynab', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex02', 2, 'Women: Jawaahir', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex02', 3, 'Men: Cartan', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex02', 4, 'Men: Maxmuud', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex02', 5, 'Men: Cabdinuur', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex03', 0, 'Keen! (Bring it!)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex03', 1, 'Tag! (Go!)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex03', 2, 'Cun! (Eat it!)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex03', 3, 'Jooji! (Stop!)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex03', 4, 'Sug! (Wait!)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex04', 0, 'Akhri! (read)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex04', 1, 'Cun! (eat)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex04', 2, 'Eeg! (look at)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex04', 3, 'Qor! (write)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex04', 4, 'Fur! (open)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex05', 0, 'Ma shaah ____? (Is it tea?)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex05', 1, '____ shaah. (It is tea.)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex05', 2, 'Ma ____? (Is it peace?)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex05', 3, '____ nabad. (It is peace.)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex05', 4, 'Ma sonkor ____? (Is it sugar?)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u01:ex05', 5, '____ sonkor. (It is sugar.)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u02:ex03', 0, 'xidh (to close)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u02:ex03', 1, 'dhig (to put down, teach)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u02:ex05', 0, 'Maxamed is eating.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u02:ex05', 1, 'Ruqiya is entering the house.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u02:ex05', 2, 'Cali is reading it.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:ex09', 0, 'bixi (to cause to leave, extract, pay)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:ex10', 0, 'The woman woke the boy.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:ex10', 1, 'Maxamed broke the table.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u03:ex10', 2, 'A woman cooked the meat.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex03', 0, 'malee (to suppose)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex03', 1, 'caddee (to explain)', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex05', 0, 'The tall man ate the meat.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex05', 1, 'The beautiful girl drank the milk.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex05', 2, 'They are reading the easy book.', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex07', 0, 'door the house', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex07', 1, 'the Horn of Africa the coast', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex07', 2, 'Cali pen', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex10', 0, 'Take two shoes!', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex10', 1, 'How are the three schools?', NULL, NULL);
INSERT INTO exercise_items (exercise_id, item_order, prompt, answer, hint) VALUES ('ex:colloquial:u04:ex10', 2, 'They built seven houses.', NULL, NULL);
-- 131

-- ─── exercise_concepts ───
-- 0

COMMIT;
