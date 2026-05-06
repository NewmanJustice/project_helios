# User Story — Scroll Animations

## Story

As a reader scrolling through the portal,
I want section content to animate subtly into view as each section enters the viewport,
so that the reading experience feels polished and purposeful without distracting from the narrative.

---

## Acceptance Criteria

**AC1 — Content animates in as section enters viewport**
Given the portal is unlocked and I scroll down,
When a section's content enters the visible viewport for the first time,
Then the section's content element(s) perform an entrance animation: opacity transitions from 0 to 1 and transform transitions from `translateY(20px)` to `translateY(0)` over 400ms with ease-out easing.

**AC2 — Animations are CSS-driven, not JS property manipulation**
Given the scroll animation implementation,
When I inspect the animation mechanism,
Then transitions are applied via CSS `transition` or `@keyframes` rules; JavaScript is used only to add/remove trigger classes — not to directly manipulate `opacity`, `transform`, or other visual properties inline.

**AC3 — Animations do not cause layout thrashing**
Given the portal is loaded on a standard desktop browser,
When I scroll continuously through all eight sections,
Then no layout reflow is triggered by the animation (animated properties are limited to `opacity` and `transform`, which do not cause reflow).

**AC4 — Animations respect prefers-reduced-motion**
Given a user's operating system or browser has `prefers-reduced-motion: reduce` set,
When the portal loads and the user scrolls,
Then no entrance animations are applied — content appears immediately at full opacity and in its final position without motion.

**AC5 — Each section animates once per session**
Given I have scrolled past a section and its content has animated in,
When I scroll back up and then back down past the same section,
Then the entrance animation does not repeat for that section within the same session.

**AC6 — Section 1 animates on initial load without scrolling**
Given the portal has just been unlocked and Section 1 (Hero) is visible in the viewport without any scrolling,
When the journey is first revealed,
Then Section 1's content performs the entrance animation immediately — it does not wait for a scroll event that will never arrive.

**AC7 — Animations are absent in the locked state**
Given the portal is in the locked state,
When the password gate is displayed,
Then no scroll-triggered animations are running or queued for section content that is currently hidden.

---

## Out of Scope

- Parallax scrolling effects
- Animations on the password gate itself
- Staggered per-element animations within a single section (section-level trigger is sufficient)
- Scroll-linked progress animations (covered in progress indicator story)
- Animation configuration UI or controls
