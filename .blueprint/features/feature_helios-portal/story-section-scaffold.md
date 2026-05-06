# User Story — Section Scaffold

## Story

As a developer,
I want a consistent HTML/CSS structural scaffold for all eight narrative sections,
so that each section follows a predictable layout pattern and can be styled and populated uniformly.

---

## Acceptance Criteria

**AC1 — Eight sections present in DOM order**
Given the portal HTML,
When I inspect the document structure,
Then sections 1 through 8 appear in the DOM in the order: Hero, The Problem, The Vision, The Core Concept, The Architecture, The Roadmap, What This Means, Next Steps — and this order cannot be altered by any user action or configuration.

**AC2 — Each section has a consistent layout structure**
Given any one of sections 1–8,
When I inspect its HTML,
Then it contains at minimum: a section heading element, a body text container, and at least one callout/visual element (bold statistic, diagram placeholder, or numbered list).

**AC3 — Sections are hidden on page load**
Given the portal has not been unlocked,
When the page loads,
Then all sections 1–8 have a hidden state applied (e.g. `display:none` or equivalent CSS class) and no section content is visible to the reader.

**AC4 — Sections become visible after unlock**
Given I enter the correct password and unlock the portal,
When the gate dismisses,
Then all sections 1–8 transition to a visible state and the reader is positioned at Section 1 (Hero).

**AC5 — Each section is individually addressable**
Given the section scaffold,
When I inspect the HTML,
Then each section element has a unique `id` attribute corresponding to its section number or slug (e.g. `id="section-1"` or `id="hero"`), enabling anchor-based jump navigation.

**AC6 — Section layout is stable across viewport widths**
Given the portal is viewed on a desktop viewport (1280px wide) and a tablet viewport (768px wide),
When I resize the browser,
Then no section content overflows its container, text remains readable, and no horizontal scrollbar appears.

---

## Out of Scope

- Real (non-placeholder) copy in any section — all text is lorem ipsum at this stage
- Mobile breakpoints below 768px (not broken, but not optimised)
- Reordering or hiding individual sections via user action
- CMS or template-driven section generation
