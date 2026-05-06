# User Story — Progress Indicator

## Story

As a reader navigating the portal,
I want a fixed progress indicator that shows which section I am currently reading and lets me jump to any section,
so that I can orient myself within the narrative and move freely between sections without losing my place.

---

## Acceptance Criteria

**AC1 — Side rail is visible after unlock**
Given I have entered the correct password and the portal is unlocked,
When the main journey is revealed,
Then a vertical side rail progress indicator is visible at a fixed position on the right (or left) side of the desktop viewport and remains fixed as I scroll.

**AC2 — Side rail is not visible on the locked (gate) state**
Given the portal is in the locked state,
When I view the password gate,
Then the progress indicator side rail is not visible.

**AC3 — Sections are labelled by number and short title**
Given the progress indicator side rail,
When I inspect its content,
Then each of the eight sections is represented by a marker labelled with its section number and a short title (e.g. "1 — Hero", "3 — The Vision") — not by icon alone.

**AC4 — Active section marker is highlighted**
Given the portal is unlocked and I am scrolling through sections,
When a section intersects the viewport with 50% or more of its height visible (IntersectionObserver threshold: 0.5),
Then the corresponding marker on the progress indicator is visually highlighted (e.g. accent colour applied or active class set) and all other markers are in their default state.

**AC5 — Clicking a marker jumps to that section**
Given the portal is unlocked,
When I click any section marker on the progress indicator,
Then the viewport scrolls to (or immediately jumps to) the corresponding section and that marker becomes the active highlighted marker.

**AC6 — Side rail collapses gracefully on narrow viewports**
Given a viewport width below a defined breakpoint (e.g. below 768px),
When the page is displayed at that width,
Then the side rail either collapses, hides, or renders in a non-overlapping compact form — it does not obscure section content or cause horizontal overflow.

---

**AC7 — Touch/tap navigation works on tablet viewports**
Given a tablet viewport (768px–1024px) with touch input,
When the side rail is visible and I tap a section marker,
Then the viewport scrolls to the corresponding section (same behaviour as click on desktop).

---

## Out of Scope

- Top bar / horizontal progress indicator variant
- Animated progress bar showing percentage scrolled
- Section completion tracking or read-state persistence
- Tooltip overlays on hover (nice-to-have, not required)
- Progress indicator visible during the locked/gate state
