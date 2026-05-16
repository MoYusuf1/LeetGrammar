# LeetGrammar — Supabase Database Guide

## Quick Start

```bash
# 1. Link your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# 2. Push the schema + seed data
supabase db push

# 3. Verify
supabase studio
```

Or run the migrations manually in the Supabase SQL Editor:
1. `20250517000000_full_schema.sql` — creates all tables, RLS, functions
2. `20250517000002_seed_curriculum.sql` — seeds 8 levels, 30 lessons, 179 exercises

---

## Schema Overview (15 Tables)

### Curriculum (Public Read)
| Table | Records | Description |
|-------|---------|-------------|
| `levels` | 8 | Curriculum levels (Foundations → Mastery) |
| `lessons` | 30 | Grammar lessons |
| `exercises` | 179 | Individual exercises |
| `exercise_options` | 244 | Multiple choice options |
| `achievements` | 12 | Achievement definitions |

### User Data (RLS Protected)
| Table | Description |
|-------|-------------|
| `profiles` | User profile (extends auth.users) |
| `user_settings` | Preferences (theme, goals, notifications) |
| `lesson_progress` | Which lesson/card the user is on |
| `exercise_results` | Individual exercise attempt history |
| `daily_activity` | Daily XP/streak tracking (for heatmap) |
| `user_achievements` | Unlocked achievements |

### Social (RLS Protected)
| Table | Description |
|-------|-------------|
| `comments` | Lesson comments + replies |
| `comment_likes` | Comment likes |
| `leaderboard` | Weekly/monthly rankings |
| `notifications` | In-app notifications |

---

## Key Queries

### Get all levels with lesson counts
```sql
SELECT l.*, COUNT(ls.id) as lesson_count
FROM levels l
LEFT JOIN lessons ls ON ls.level_id = l.id
GROUP BY l.id
ORDER BY l.order_index;
```

### Get lesson with exercises
```sql
SELECT 
  ls.*,
  json_agg(
    json_build_object(
      'id', e.id,
      'type', e.type,
      'question', e.question,
      'correct_answer', e.correct_answer,
      'hint', e.hint,
      'explanation', e.explanation,
      'points', e.points,
      'options', (
        SELECT json_agg(json_build_object('text', eo.option_text, 'is_correct', eo.is_correct))
        FROM exercise_options eo WHERE eo.exercise_id = e.id
      )
    ) ORDER BY e.order_index
  ) FILTER (WHERE e.id IS NOT NULL) as exercises
FROM lessons ls
LEFT JOIN exercises e ON e.lesson_id = ls.id
WHERE ls.id = 1
GROUP BY ls.id;
```

### Get user progress for a lesson
```sql
SELECT * FROM lesson_progress
WHERE user_id = auth.uid() AND lesson_id = 1;
```

### Save card position (upsert)
```sql
INSERT INTO lesson_progress (user_id, lesson_id, current_card, status, started_at)
VALUES (auth.uid(), 1, 3, 'in_progress', NOW())
ON CONFLICT (user_id, lesson_id)
DO UPDATE SET 
  current_card = EXCLUDED.current_card,
  status = EXCLUDED.status,
  last_attempted_at = NOW();
```

### Complete a lesson
```sql
UPDATE lesson_progress
SET 
  status = 'completed',
  stars = 3,
  score = 30,
  completed_at = NOW()
WHERE user_id = auth.uid() AND lesson_id = 1;
```

### Get daily activity (for heatmap)
```sql
SELECT date, xp_earned, lessons_completed
FROM daily_activity
WHERE user_id = auth.uid()
  AND date >= CURRENT_DATE - INTERVAL '365 days'
ORDER BY date;
```

### Get leaderboard (weekly)
```sql
SELECT 
  p.username,
  p.display_name,
  p.avatar_url,
  l.xp_amount,
  l.lessons_completed,
  l.rank
FROM leaderboard l
JOIN profiles p ON p.id = l.user_id
WHERE l.period_type = 'weekly' 
  AND l.period_value = to_char(CURRENT_DATE, 'YYYY-IW')
ORDER BY l.rank;
```

### Get comments for a lesson
```sql
SELECT 
  c.*,
  p.username,
  p.display_name,
  p.avatar_url,
  (SELECT COUNT(*) FROM comment_likes cl WHERE cl.comment_id = c.id) as likes
FROM comments c
JOIN profiles p ON p.id = c.user_id
WHERE c.lesson_id = 1 AND c.parent_id IS NULL
ORDER BY c.is_pinned DESC, c.created_at DESC;
```

---

## Auto-Generated Profile

When a user signs up via Supabase Auth, a trigger automatically creates:
- A `profiles` row with default username and display name
- A `user_settings` row with default preferences

No manual setup needed — just sign up and start learning.

---

## From Your Frontend

```typescript
import { supabase } from '@/lib/supabase';

// Fetch lessons for a level
const { data } = await supabase
  .from('lessons')
  .select('*, exercises(*)')
  .eq('level_id', 1)
  .order('order_index');

// Save card position
await supabase
  .from('lesson_progress')
  .upsert({
    user_id: (await supabase.auth.getUser()).data.user!.id,
    lesson_id: 1,
    current_card: 3,
    status: 'in_progress',
  }, { onConflict: 'user_id,lesson_id' });

// Get where user left off
const { data } = await supabase
  .from('lesson_progress')
  .select('current_card, status')
  .eq('lesson_id', 1)
  .single();

// Log daily activity
await supabase
  .from('daily_activity')
  .upsert({
    user_id: userId,
    date: new Date().toISOString().split('T')[0],
    xp_earned: 10,
    exercises_completed: 1,
  }, { onConflict: 'user_id,date' });
```

---

## RLS Policies

All user tables have Row Level Security enabled:
- **Users can only read/write their own data**
- **Curriculum is public** (anyone can read levels, lessons, exercises)
- **Comments are public read** (anyone can read, only owner can edit/delete)
- **Leaderboard is public read**

---

## Seed Data Summary

| Content | Count |
|---------|-------|
| Levels | 8 |
| Lessons | 30 |
| Exercises | 179 |
| MC Options | 244 |
| Achievements | 12 |

All content sourced from *Colloquial Somali* by Martin Orwin (Routledge, 1995).
