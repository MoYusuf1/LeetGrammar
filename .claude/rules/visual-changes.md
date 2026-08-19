---
paths:
  - "src/components/**/*.tsx"
  - "src/pages/**/*.tsx"
  - "src/index.css"
  - "tailwind.config.*"
---

# You are touching something visual

**Read [docs/UI_CONVENTIONS.md](../../docs/UI_CONVENTIONS.md) before proposing a
change to how this looks.** It is the settled taste of this app *and* a list of
what has already been tried and rejected, with the reason each one went.

The short version, so you do not have to open it for small edits:

- **iOS, monochrome, system theme only.** Black and white with neutral greys. No
  theme toggle — `prefers-color-scheme` decides.
- **Right and wrong are not colour-coded.** The palette has no hue; the ✓/✕ glyph
  and the wording carry the verdict. This is deliberate and better for a
  colourblind learner than the green/red it replaced.
- **Glass is on floating chrome only** — the ⋯/close circles and toolbar
  capsules, never on cards.
- **Nothing on screen that is not needed.** Home is a contents page: no cards,
  chevrons, containers or fills.

Already tried and rejected — do not re-propose without reading why: a warm
palette, a coloured accent, a theme toggle, swipe paging, a "swipe to continue"
label, a hint animation, bento tiles, a bottom action sheet from the ⋯ button,
lettered A/B/C/D badges, a "you are here" marker, unit names as headings, rules
between sections.

Two traps that have each cost a debugging pass:

- **Class strings have no specificity.** Only stylesheet order decides. A
  compound selector like `.list-row + .list-row` out-specifies a single utility
  class, which is why body text rendered grey for the life of one component.
- **Tailwind 3 silently emits nothing** for an opacity modifier on a `var()`
  colour. It fails quiet — check the compiled CSS, not the class string.

**A change here is visible in the browser, so open the browser and drive it.**
A green build has never once proven a visual change works.
