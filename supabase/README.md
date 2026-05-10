# Supabase Setup

## 1. Run the schema

Open the [Supabase SQL Editor](https://app.supabase.com/project/wikibfhsndlwvfrvtgvu/sql) for your project and run:

```sql
\i supabase/migrations/0001_initial_schema.sql
```

Or copy-paste the contents of `0001_initial_schema.sql` into the editor and click **Run**.

## 2. Tables created

| Table | Purpose |
|-------|---------|
| `profiles` | User profile (username, display name, avatar) |
| `user_progress` | Cloud-synced progress (completed lessons, SRS cards, XP, streak) |

## 3. Verify

After running the migration, check the [Table Editor](https://app.supabase.com/project/wikibfhsndlwvfrvtgvu/editor) — both tables should appear under the `public` schema.
