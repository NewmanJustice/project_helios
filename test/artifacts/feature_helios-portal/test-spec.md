# Test Specification — helios-portal

## What Is Being Tested

The helios-portal is a static HTML/CSS/JS site with no backend or framework. It presents a
narrative portal gated behind a password (`helios2025` from `config.js`). On correct entry,
eight content sections are revealed with scroll-triggered animations and a fixed side-rail
progress indicator. Tests parse the HTML/CSS/JS files directly using jsdom, inspect the
staticwebapp.config.json for routing correctness, and simulate DOM interactions for the
password gate and scroll observer logic. Animation behaviour is validated by asserting CSS
class presence and stylesheet rules, including `prefers-reduced-motion` media query handling.

ASSUMPTION: jsdom is available as a dev dependency (`npm install --save-dev jsdom`).
ASSUMPTION: Tests run under Node.js built-in test runner (`node --test`), Node 18+.
ASSUMPTION: All portal source files live under a `src/` or root directory; tests resolve
paths relative to the project root.
ASSUMPTION: The CSS file is linkable/readable from disk for property-value assertions.
ASSUMPTION: `staticwebapp.config.json` is at the project root.

---

## AC to Test ID Mapping

| Test ID   | Story | AC  | Description |
|-----------|-------|-----|-------------|
| T-PG-1    | Password Gate | AC1 | On load, only Section 0 (gate) is visible; sections 1–8 are hidden |
| T-PG-2    | Password Gate | AC2 | Correct password (`helios2025`) hides gate and reveals sections 1–8 |
| T-PG-3    | Password Gate | AC3 | Wrong password shows error message; gate remains visible; no sections revealed |
| T-PG-4    | Password Gate | AC4 | After wrong password, re-entry is possible without page reload; no lockout |
| T-PG-5    | Password Gate | AC5 | `helios2025` is defined in `config.js`, not inline in main JS |
| T-PG-6    | Password Gate | AC6 | Sections 1–8 present in DOM but hidden (not removed) in locked state |
| T-PG-7    | Password Gate | AC7 | No session persistence — refresh returns to locked state (no localStorage/sessionStorage set) |
| T-PG-8    | Password Gate | AC8 | Enter key on input triggers same submit behaviour as button click |
| T-SS-1    | Section Scaffold | AC1 | Eight sections present in DOM in correct order (Hero → Next Steps) |
| T-SS-2    | Section Scaffold | AC2 | Each section contains a heading, body text container, and at least one callout/visual element |
| T-SS-3    | Section Scaffold | AC3 | Sections 1–8 have hidden state applied on initial load |
| T-SS-4    | Section Scaffold | AC4 | After unlock, all sections 1–8 have visible state |
| T-SS-5    | Section Scaffold | AC5 | Each section element has a unique `id` attribute |
| T-SS-6    | Section Scaffold | AC6 | CSS does not set overflow-x on sections (no horizontal scroll risk) |
| T-DS-1    | Design System | AC1 | `body` or root container background-color is `#0A1628` in CSS |
| T-DS-2    | Design System | AC2 | Body text color is `#ffffff` in CSS |
| T-DS-3    | Design System | AC3 | Accent color `#F5A623` is present in CSS; not applied as large-area background fill |
| T-DS-4    | Design System | AC4 | Heading elements have `font-family` including Sora or DM Sans in CSS |
| T-DS-5    | Design System | AC5 | Body/paragraph elements have `font-family` including Inter in CSS |
| T-DS-6    | Design System | AC6 | Font `@font-face` or `<link>` uses `font-display: swap` or equivalent |
| T-DS-7    | Design System | AC7 | Heading, body, and callout elements share consistent CSS class usage across sections |
| T-PI-1    | Progress Indicator | AC1 | Side rail element exists in DOM; hidden in locked state |
| T-PI-2    | Progress Indicator | AC2 | Side rail is not visible while gate is shown (hidden class or display:none) |
| T-PI-3    | Progress Indicator | AC3 | Each of 8 markers contains section number and short title text |
| T-PI-4    | Progress Indicator | AC4 | IntersectionObserver threshold 0.5 used in JS; active class toggled on scroll |
| T-PI-5    | Progress Indicator | AC5 | Each marker is a link/button with href or data attribute pointing to its section |
| T-PI-6    | Progress Indicator | AC6 | CSS hides or collapses side rail below breakpoint (max-width media query present) |
| T-SA-1    | Scroll Animations | AC1 | CSS defines transition for opacity (0→1) and transform (translateY 20px→0) over 400ms ease-out |
| T-SA-2    | Scroll Animations | AC2 | JS adds/removes trigger classes only; no inline `style.opacity` or `style.transform` manipulation |
| T-SA-3    | Scroll Animations | AC3 | Only `opacity` and `transform` are animated (no width/height/top/left) |
| T-SA-4    | Scroll Animations | AC4 | `prefers-reduced-motion: reduce` media query in CSS disables transition/animation |
| T-SA-5    | Scroll Animations | AC5 | JS observer marks section as "seen" after first intersection; does not re-add class |
| T-SA-6    | Scroll Animations | AC6 | Section 1 animation triggered on unlock without waiting for scroll event |
| T-SA-7    | Scroll Animations | AC7 | Animation classes/observers not applied to gate (Section 0) elements |
| T-DEP-1   | Deployment | AC1 | `staticwebapp.config.json` is present and contains valid JSON |
| T-DEP-2   | Deployment | AC3 | Config contains a fallback route rewriting unmatched paths to `index.html` with status 200 |
| T-DEP-3   | Deployment | AC5 | Config contains no `api` section, no function routes, no backend runtime settings |
| T-PC-1    | Placeholder Content | AC1 | All 8 sections contain non-empty heading and body text |
| T-PC-2    | Placeholder Content | AC2 | No section heading is blank or generic "Heading" text |
| T-PC-3    | Placeholder Content | AC3 | Roadmap Step 4 text is exactly "To be defined" |
| T-PC-4    | Placeholder Content | AC4 | Roadmap Steps 1–3 use defined labels: Re-platform DB, API & Core Endpoints, Caseworker reskin |
| T-PC-5    | Placeholder Content | AC5 | Each section contains at least one callout/visual/list element |

---

## Key Assumptions

- ASSUMPTION: jsdom (npm dev dependency) is used for all HTML/DOM parsing in tests.
- ASSUMPTION: CSS assertions read the stylesheet file as text and check for property/value patterns; computed styles are not available without a full browser engine.
- ASSUMPTION: AC2 (HTTPS) and AC4 (direct URL) for Deployment are live-environment checks — these are excluded from the offline test suite and noted as manual/CI-only tests. T-DEP-2 and T-DEP-3 cover the config file assertions that are automatable offline.
- ASSUMPTION: Scroll/viewport behaviour (T-SS-6 overflow, T-PI-6 breakpoint, T-SA-4 motion) is tested by inspecting CSS rules in the stylesheet, not by simulating a real browser resize.
- ASSUMPTION: AC7 (refresh resets state) is tested by asserting no `localStorage.setItem` or `sessionStorage.setItem` calls in the JS source, not by running a real browser refresh cycle.
