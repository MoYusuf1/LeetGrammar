---
name: source-a-form
description: Verify a Somali word or grammatical form against the project's published sources before it reaches a learner. Use whenever adding vocabulary, authoring lesson content, resolving a validate:course S3/S4/S5 warning, or deciding whether a form can be taught.
---

Read `docs/SOURCING.md` and follow it.

That file is the canonical procedure and is kept tool-neutral so non-Claude
agents reach the same instructions via `AGENTS.md`. This skill exists only to
surface it at the right moment — do not duplicate its contents here.

Start with `node scripts/lookup.mjs <word>`.
