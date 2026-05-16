# LeetGrammar — Teaching Mode Integration Guide

## What You Are Getting

A **card-based teaching experience** that replaces your current lesson page. When users tap a lesson, they get:

- **Intro card** — "In this lesson you will learn..." + cultural note
- **Teaching cards** — Large Somali text + pronunciation + examples + tips
- **Practice cards** — Gentle exercises with **hints always visible**, no scoring pressure
- **Summary card** — Key takeaways + next lesson button

Plus: **resume where you left off**, PWA support, and full progress tracking.

---

## Files Created / Modified

### NEW FILES (9)

| # | File | Description |
|---|------|-------------|
| 1 | `src/data/teaching-content.ts` | Teaching content for all 30 lessons (from textbook) |
| 2 | `src/components/lesson/LessonCards.tsx` | Main card-based teaching engine |
| 3 | `src/components/lesson/CardProgressDots.tsx` | Progress dots at top of lesson |
| 4 | `src/hooks/useLessonProgress.ts` | Hook for resume tracking + Supabase sync |
| 5 | `src/pages/Lesson.tsx` | Updated lesson page wrapper |
| 6 | `supabase/migrations/20250517000001_lesson_progress.sql` | DB migration for card positions |
| 7 | `public/manifest.json` | PWA manifest |
| 8 | `public/sw.js` | Service worker for offline |

### MODIFIED FILES (4)

| # | File | Changes |
|---|------|---------|
| 9 | `src/stores/progress-store.ts` | Added `lessonCardPositions` + actions |
| 10 | `index.html` | Added PWA meta tags |
| 11 | `src/main.tsx` | Service worker registration |

---

## Step-by-Step Integration

### Step 1: Install Dependencies

```bash
npm install react-swipeable
# or
yarn add react-swipeable
```

### Step 2: Copy New Files

Copy all 8 new files into your repo at the paths shown above.

### Step 3: Run the Supabase Migration

```bash
supabase db push
```

Or run the SQL directly in your Supabase dashboard:
```sql
-- From: supabase/migrations/20250517000001_lesson_progress.sql
```

### Step 4: Apply Modified Files

The following files have been modified in this package. **Apply these changes** to your existing files:

**`src/stores/progress-store.ts`** — Added 3 new fields/methods:
- `lessonCardPositions: Record<number, number>` — tracks current card per lesson
- `setLessonCardPosition(lessonId, cardIndex)` — save position
- `getLessonCardPosition(lessonId)` → number — read position
- `clearLessonCardPosition(lessonId)` — remove position (on completion)

**`index.html`** — Added PWA meta tags:
- `apple-mobile-web-app-capable`
- `apple-mobile-web-app-status-bar-style`
- `apple-mobile-web-app-title`
- `manifest.json` link

**`src/main.tsx`** — Added service worker registration at the bottom.

### Step 5: Build and Test

```bash
npm run build
npm run preview
```

Tap a lesson → you should see the card-based teaching flow.

### Step 6: Deploy

```bash
git add .
git commit -m "feat: card-based teaching mode with resume tracking"
git push
```

---

## How It Works

### User Flow

```
User taps lesson node on Learn page
  ↓
Navigates to /lesson/:id
  ↓
LessonCards loads teaching content for that lesson
  ↓
  ┌──────────────────────────────────────┐
  │ Card 1: INTRO                        │
  │   "In this lesson you will learn:"   │
  │   • Bullet points                    │
  │   [ Cultural Note box ]              │
  │   [     Start Learning    ]          │
  └──────────────────────────────────────┘
  ↓
  ┌──────────────────────────────────────┐
  │ Card 2-4: TEACH                      │
  │   [ Concept Badge ]                  │
  │                                        │
  │      Large Somali Text               │
  │      English translation             │
  │                                        │
  │   Explanation paragraph              │
  │   [ Pronunciation Guide ]            │
  │   Examples:                          │
  │     • Somali → English               │
  │     • Somali → English               │
  │   [💡 Tip box]                        │
  │   [       Got it!       ]            │
  └──────────────────────────────────────┘
  ↓
  ┌──────────────────────────────────────┐
  │ Card 5-6: PRACTICE                   │
  │   Question text                      │
  │   [A] Option 1    [B] Option 2       │
  │   [C] Option 3    [D] Option 4       │
  │                                        │
  │   [ Hint (always visible) ]          │
  │   [    Check Answer     ]            │
  │   → "Correct!" or "Not quite..."     │
  │   → Explanation                      │
  │   [      Continue       ]            │
  └──────────────────────────────────────┘
  ↓
  ┌──────────────────────────────────────┐
  │ Card 7: SUMMARY                      │
  │   🎉 Lesson Complete!                │
  │   ✓ Takeaway 1                       │
  │   ✓ Takeaway 2                       │
  │   ✓ Takeaway 3                       │
  │   [   Practice More   ] [Next Lesson]│
  └──────────────────────────────────────┘
```

### Resume Logic

```
User leaves lesson at card 3
  ↓
Position saved to localStorage + Supabase
  ↓
User returns later
  ↓
Lesson loads at card 3 (not card 1!)
```

The position is saved:
- **Immediately** to localStorage (works offline)
- **Async** to Supabase `lesson_progress` table (syncs across devices)

---

## Teaching Content (30 Lessons)

| Level | Lesson | Cards | Key Concepts |
|-------|--------|-------|-------------|
| 1 | The Somali Alphabet | 8 | x, c, q, dh gutturals |
| 1 | Greetings & Introductions | 7 | Iska warran, Nabad, Subax wanaagsan |
| 1 | Basic Sounds | 5 | Vowels, see-saw stress pattern |
| 2 | Noun Gender | 5 | Masculine/feminine patterns |
| 2 | Definite Article | 6 | -ka/-ga, -ta/-da suffixes |
| 2 | Plural Formation | 5 | -o, -yaal, vowel changes |
| 2 | Noun Cases | 5 | Subject (-u), object, genitive |
| 3 | SOV Word Order | 5 | Waxaan...cunay pattern |
| 3 | Personal Pronouns | 5 | aan, aad, uu, ay, aynu/aannu |
| 3 | Copula "Waa" | 5 | waan, waad, wuu, way combinations |
| 3 | Negation | 5 | ma...ee/ayn, yes/no questions |
| 4 | Focus: baa | 4 | Emphasizes what comes BEFORE |
| 4 | Focus: ayaa | 5 | Emphasizes what comes AFTER |
| 4 | Question Words | 4 | maxay, kuma, sidee, goorma, xagee |
| 4 | Yes/No Questions | 4 | Miy- + pronoun |
| 4 | Interrogative Pronouns | 4 | miy-aan, miy-aad, miy-uu, miy-ay |
| 5 | Verb Conjugations | 5 | 3 groups, imperative as base |
| 5 | Past Tense | 5 | -ay/-ey endings |
| 5 | Present Habitual | 5 | -aa/-taa habitual |
| 5 | Future Tense | 5 | doon + infinitive |
| 6 | Prepositions | 5 | ka, ku, la, u as clitics |
| 6 | Adjectives | 5 | yahay predicative form |
| 6 | Demonstratives | 4 | kan, tan, kuwan, kuwaas |
| 6 | Adverbs | 5 | hadda, halkan, si fiican |
| 7 | Relative Clauses | 4 | -kii/-tii forms |
| 7 | Voice Transformation | 4 | Passive with "la" |
| 7 | Verbal Nouns | 4 | -is/-in gerunds |
| 7 | Conditionals | 4 | haddii...waa... |
| 8 | Complex Translation | 4 | Combined grammar |
| 8 | Free Composition | 5 | Self-introduction, stock phrases |

---

## Data Flow

```
LessonCards.tsx
  ├── Reads: teaching-content.ts (static content)
  ├── Reads: progress-store.ts (card position)
  ├── Writes: progress-store.ts (save position)
  ├── Writes: Supabase lesson_progress table (sync)
  └── On complete: progress-store.completeLesson() + clear position
```

---

## Mobile-First Design

| Feature | Implementation |
|---------|---------------|
| Touch targets | Min 56px height |
| Swipe gestures | react-swipeable (left/right) |
| No pull-to-refresh | `overscroll-behavior-y: none` |
| Hidden scrollbars | `.hide-scrollbar` utility |
| Safe area | `env(safe-area-inset-bottom)` |
| Card width | Full-width, max 600px centered |
| Bottom action | Sticky bottom bar |
| Tap highlight | Removed (`-webkit-tap-highlight-color: transparent`) |

---

## PWA Checklist

- [x] `manifest.json` with icons, theme, display mode
- [x] Service worker for offline caching
- [x] `theme-color` meta tag
- [x] `apple-mobile-web-app-capable` meta tag
- [x] Service worker registration in main.tsx
- [ ] **You need**: 192x192 and 512x512 icons at `/public/leetgram-icon-small.png` and `/public/leetgram-icon.png`

Generate icons from your existing `leetgram-icon.png`:
```bash
# Use sharp or any image tool to resize
npx sharp leetgram-icon.png resize 192 192 leetgram-icon-small.png
```

---

## Database Schema (New Table)

```sql
lesson_progress
├── user_id (UUID) — links to auth.users
├── lesson_id (INTEGER) — which lesson
├── current_card (INTEGER) — which card they're on
├── completed (INTEGER) — 0 = in progress, 1 = done
├── updated_at (TIMESTAMP) — last update
└── PRIMARY KEY (user_id, lesson_id)
```

---

## Next Steps (Your Call)

1. **Audio** — Add pronunciation audio for each Somali word/phrase
2. **More practice types** — Matching, fill-in-blank, sentence building
3. **Backend sync** — Fully wire up the useLessonProgress hook to Supabase
4. **Social** — Comments on each lesson (database already ready)
5. **Leaderboard** — Weekly XP rankings

---

## Quick Test

After integration, tap any lesson node. You should see:
1. Intro card with cultural note → tap "Start Learning"
2. Teaching card with large Somali text + examples → tap "Got it!"
3. Practice card with options + visible hint → select answer → "Check Answer"
4. Summary card with takeaways → "Next Lesson"

Leave mid-lesson, come back — you should resume at the exact card.
