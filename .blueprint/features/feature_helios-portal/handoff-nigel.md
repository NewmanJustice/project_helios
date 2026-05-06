## Handoff Summary
**For:** Codey
**Feature:** helios-portal

### Key Decisions
- Tests use jsdom for HTML/DOM parsing; CSS assertions read stylesheet text directly (no computed styles)
- Password gate logic (AC2–AC4, AC8) is simulated by manipulating the jsdom document and dispatching events
- Deployment ACs for HTTPS and live URL (DEP AC2, AC4) are excluded from the offline suite — only config file structure is tested
- `prefers-reduced-motion` is tested by asserting the `@media (prefers-reduced-motion: reduce)` rule exists in CSS with the correct property overrides
- AC7 (refresh = locked state) is tested by asserting absence of `localStorage.setItem` / `sessionStorage.setItem` in JS source

### Files to Create
- `test/artifacts/feature_helios-portal/test-spec.md` (written)
- `test/feature_helios-portal.test.js` (next step)

### Test Structure
- `describe('Password Gate')` — 8 tests (T-PG-1 to T-PG-8)
- `describe('Section Scaffold')` — 6 tests (T-SS-1 to T-SS-6)
- `describe('Design System')` — 7 tests (T-DS-1 to T-DS-7)
- `describe('Progress Indicator')` — 6 tests (T-PI-1 to T-PI-6)
- `describe('Scroll Animations')` — 7 tests (T-SA-1 to T-SA-7)
- `describe('Deployment Config')` — 3 tests (T-DEP-1 to T-DEP-3)
- `describe('Placeholder Content')` — 5 tests (T-PC-1 to T-PC-5)
- **Total: 42 tests**

### Open Questions
- None

### Critical Context
Source files expected: `index.html`, `config.js`, main JS file, CSS file, `staticwebapp.config.json`
all resolvable from project root. The password is `helios2025` (from `config.js`, not inline).
Roadmap Step 4 must assert exactly "To be defined" — hard string match, not a contains check.
Section order is fixed: Hero, The Problem, The Vision, The Core Concept, The Architecture,
The Roadmap, What This Means, Next Steps. CSS class-based animation trigger (JS adds class,
CSS does transition) — assert no inline style manipulation in JS.
