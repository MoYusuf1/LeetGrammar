# UI conventions

> How this app looks and behaves, and — more usefully — **what has already been
> tried and rejected**. Written after a full interface rebuild so the same
> ground does not get re-argued in a new session.
>
> Read this before changing anything visual. If you are about to propose a
> gradient, a coloured accent, a swipe gesture or a bento grid, it is in the
> rejected list and you should read why first.

---

## The five rules

### 1. iOS, and specifically iOS — not "modern app"

The reference is Apple's own software: Settings, Safari, Notes. Not Duolingo,
not a dashboard, not a design-system showcase. When a pattern is uncertain,
**look up what Apple actually does** rather than guessing — that has already
changed the answer twice (see §Research below).

The previous UI was a LeetCode template — orange `#ffa116`, difficulty tokens,
`.lc-row`, a Novice→Grandmaster rank ladder. All of it is gone. Do not
reintroduce anything that ranks, scores or gamifies the learner.

### 2. Black and white. No hue, anywhere

The palette is ink and paper and nothing else. Apple's own system greys were
rejected too — `#F2F2F7` and `#3C3C43` carry a blue cast; ours are neutral.

**Right and wrong are not colour-coded.** The ✓/✕ glyph and the wording carry
the verdict. This is deliberate and it is better for a colourblind learner than
green/red was. Do not "restore" colour here without saying what it buys that the
glyph does not.

System theme only. There is no toggle and there was one; it was removed.

### 3. Flat. No borders, no shadows, no gradients

Containers are a fill on a background — `bg-elevated` on `bg`. No outlines
around cards, no drop shadows, no tints. The only hairlines in the app are the
separators *between rows inside a group*, because that is what a `UITableView`
does and removing them ran the rows together.

Whitespace separates sections. A rule between them is one more mark doing a job
nothing needed doing.

### 4. Show only what is needed

- A row you cannot press is furniture. A locked unit test is not rendered at
  all until it unlocks.
- A control that duplicates a visible control is furniture. "Leave lesson" left
  the menu because the X already does it.
- An empty bar is furniture. When a step has no button, the bottom bar is not
  rendered.
- **No eyebrows.** No small-caps labels above content — PRACTICE, HINT,
  VOCABULARY, LESSON N. They label what the content beneath them already says.
  Card titles are real headings.
- No counts, no progress bars, no "you are here" labels. State is carried by
  ink weight: done recedes, current is full ink.

### 5. A button means "you must act"

Passive content is paged with the toolbar. A button appears only where the
lesson demands something — an exercise, or the end. This took the course from
179 button presses to 62.

---

## The components

**Glass appears on floating chrome only** — the ⋯/close circles, the toolbar
capsules, the menu. Never on cards. It marks the layer *above* your content; put
it everywhere and the hierarchy it expresses collapses.

It is a **mimic**: blur, saturation, a specular top edge. Real Liquid Glass needs
an SVG displacement map fed into `backdrop-filter`, which Chromium supports and
**Firefox and Safari do not** — and Safari is every iPhone. Do not "upgrade" it
without checking who could see it.

**Toolbars follow Safari and Notes**: a transparent bar with rounded glass
capsules floating over the content, each capsule holding a row of related icons.
`ToolbarGroup` + `ToolbarButton` in `src/components/lesson/LessonToolbar.tsx`;
another action is one more button inside the group, another cluster is one more
group.

**A ⋯ button opens a menu, not an action sheet** — anchored under the button,
icons on the right. Apple's split: an action sheet clarifies an action you
already took; a menu appears when you *choose to reveal it*.

**Feedback is a sheet** that rises over the card with its continue button
inside, so the card stays visible behind it.

---

## Type

Apple's scale under Apple's names — 11/12/13/15/16/17/20/22/28/34, body at 17
(not a rounded 16). `-apple-system` first, so genuine SF Pro on Apple hardware
and Inter everywhere else; Apple does not license SF as a webfont.

**Somali is set in New York**, Apple's system serif — also an iPhone font, so
the target language keeps its own voice without breaking the native feel. Always
via `<Somali>`, never hand-rolled. See `src/components/Somali.tsx`.

The interface is small and grey; the language is large. That scale contrast is
the only visual idea in the app, which is why there is no decoration.

---

## Rejected — do not re-propose without new information

| Tried | Why it went |
| --- | --- |
| Warm paper palette (henna, off-white) | Read as "designed" but generic; superseded by monochrome |
| Coloured accent (iOS blue, henna) | Wanted black and white only |
| Theme toggle | Should match system, full stop |
| Swipe to page through a lesson | Unreliable, and a hidden gesture needs teaching. Replaced by Safari's chevrons |
| "Swipe to continue" label | Describes a gesture instead of demonstrating it, and sat there forever |
| Swipe hint animation | Only existed to teach the gesture; gesture is gone |
| Bento boxes / sub-tiles | Explicitly dropped — "forget bento honestly" |
| Bottom action sheet from ⋯ | Wrong component; menus are for user-revealed overflow |
| Lettered A/B/C/D option badges | Exam convention; no question refers to an option by letter |
| "You are here" marker | One more thing to read; ink weight says it |
| Lesson count under the title | Not needed |
| Unit names as section headings | "Filling the WHO box" means nothing before you have done it |
| Rules/lines between units | Whitespace already separates them |
| Exit confirmation dialog | Position is saved; confirming a free action is a dialog in the way |
| Landing page, Profile, rank ladder, tab bar | No |

---

## Research before implementing a platform pattern

This has changed the answer twice, so it is a rule rather than a suggestion:

- The ⋯ overflow was built as an action sheet. Apple's HIG says a menu.
- The swipe was taught with a permanent label. The researched pattern is hint
  motion, shown once — which then made the gesture's removal the better call.

Do not guess at what iOS does. Look it up, then build it.

---

## Bugs this rebuild produced, as warnings

**Class strings have no specificity — only stylesheet order does.** `Prose`
composed `text-label-2` into its own class list and let callers append
`text-label`. Tailwind emits `.text-label` first, so the dimmer rule always won
and every teach card rendered grey for the life of that component. If a
component has a default that callers override, make it a **prop**, not a class.

The same trap hit print: `.list-row + .list-row` out-specifies
`print:border-black`, so worksheet separators would have printed invisible.
Print rules live in a real `@media print` block in `index.css`.

**Tailwind 3 cannot apply opacity modifiers to `var()` colours.** `bg-surface/85`
silently emits nothing. Use a token with alpha baked in.

**A fixed full-width bar swallows taps behind it.** Pointer events go on the
controls, not the wrapper.

---

## The gates still apply

Nothing here overrides [WORKING_AGREEMENT.md](./WORKING_AGREEMENT.md). A green
build is not evidence the app works, and **the entire interface is still
unverified in a browser by the tool that wrote it** — see debt 10 in
[STATE_OF_PLAY.md](./STATE_OF_PLAY.md).
