## Handoff Summary
**For:** Nigel
**Feature:** helios-portal

### Key Decisions
- Password is `helios2025` (case-sensitive), stored in `config.js` — not inline in main JS
- Progress indicator is a vertical side rail, fixed on desktop, collapses on narrow viewports
- Scroll animations must respect `prefers-reduced-motion: reduce` — no motion when preference is set
- Password gate is an access deterrent only — stories and ACs explicitly avoid "secure authentication" language
- Roadmap Step 4 must read exactly "To be defined" — this is a content rule, not a placeholder gap

### Files Created
- story-password-gate.md
- story-section-scaffold.md
- story-design-system.md
- story-progress-indicator.md
- story-scroll-animations.md
- story-deployment.md
- story-placeholder-content.md

### Open Questions
- None

### Critical Context
All stories close on structural and behavioural correctness — not on real copy. Tests should assert DOM structure, CSS class application, computed styles (background #0A1628, font-family Inter/Sora/DM Sans), and scroll observer behaviour. The password gate ACs are the only ones with logic to test (correct match, incorrect match, refresh resets state). Animations should be tested with and without `prefers-reduced-motion`. The Roadmap Step 4 "To be defined" text is a hard content assertion, not a flexible placeholder check.
