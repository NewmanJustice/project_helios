# User Story — Design System

## Story

As a developer,
I want a defined set of visual design tokens and component patterns applied consistently across the portal,
so that the site presents a visually authoritative and coherent appearance to senior stakeholders.

---

## Acceptance Criteria

**AC1 — Background colour is navy #0A1628**
Given any page of the portal,
When I inspect the computed style of the `body` or root container element,
Then the background colour is `#0A1628`.

**AC2 — Body text colour is white**
Given body text in any section,
When I inspect the computed colour,
Then the text colour is `#FFFFFF` or equivalent full-white value.

**AC3 — Accent colour is gold/amber, used sparingly**
Given interactive elements, key callouts, and highlights across the portal,
When I inspect their computed colour or border/background value,
Then the accent colour applied is exactly `#F5A623` and it is not used as a large-area background fill.

**AC4 — Heading font is Sora or DM Sans**
Given any section heading (h1, h2, h3),
When I inspect the computed `font-family`,
Then the resolved font is Sora or DM Sans; a system geometric sans (e.g. `sans-serif`) is acceptable as a fallback if the CDN font fails to load.

**AC5 — Body font is Inter**
Given any body text element,
When I inspect the computed `font-family`,
Then the resolved font is Inter; a system sans-serif is acceptable as a fallback if the CDN font fails to load.

**AC6 — Fonts do not block render**
Given a page load with a slow or unavailable font CDN,
When the page renders,
Then body text and headings are visible using fallback system fonts — no blank or invisible text while fonts load (font-display: swap or equivalent strategy applied).

**AC7 — Component patterns are consistent**
Given all section headings, body text blocks, and callout elements across sections 1–8,
When I compare the visual treatment of equivalent elements across sections,
Then the same CSS classes or design tokens are applied: headings share a single heading style, body paragraphs share a single body style, callouts share a single callout style.

---

## Out of Scope

- WCAG 2.1 AA colour contrast compliance (explicitly deferred)
- Dark/light mode toggle
- Custom icon set or illustration assets
- Print stylesheet
- Component library or design token export for external tools
