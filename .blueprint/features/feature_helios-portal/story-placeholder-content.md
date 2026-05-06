# User Story — Placeholder Content

## Story

As a developer,
I want all eight narrative sections populated with structurally correct lorem ipsum placeholder content,
so that the portal's layout, typography, and design system can be validated before real copy is written.

---

## Acceptance Criteria

**AC1 — All eight sections contain placeholder text**
Given the portal is unlocked and I scroll through sections 1–8,
When I read the content of each section,
Then every section contains lorem ipsum placeholder text in its heading, body text, and callout/visual element positions — no section is empty or shows only structural HTML with no visible text.

**AC2 — Each section heading uses a placeholder that signals its purpose**
Given sections 1–8,
When I inspect the heading of each section,
Then the heading either uses the section's defined title (e.g. "The Problem", "The Vision") or lorem ipsum text — in no case is a section heading left as a blank element or generic "Heading" text.

**AC3 — Roadmap Step 4 reads "To be defined"**
Given Section 6 (The Roadmap),
When I inspect the content for the fourth roadmap step,
Then the step label or title reads exactly "To be defined" — it is not filled with lorem ipsum, a fabricated label, or any other placeholder text.

**AC4 — Roadmap Steps 1–3 use placeholder labels**
Given Section 6 (The Roadmap),
When I inspect the content for roadmap steps 1, 2, and 3,
Then each step uses its defined label: Step 1 (Re-platform DB), Step 2 (API & Core Endpoints), Step 3 (Caseworker reskin), with lorem ipsum body text beneath each where body text is structurally expected.

**AC5 — Each section has at least one callout or visual element placeholder**
Given any section from 1–8,
When I inspect its content,
Then at least one element serves as a callout, diagram placeholder, bold statistic, or numbered list — the section is not composed of body paragraphs alone.

**AC6 — No placeholder content implies finalised copy**
Given any lorem ipsum text in sections 1–8,
When I read or review the content,
Then no placeholder text is presented or styled in a way that could be mistaken for finalised, approved programme content — all non-titled body copy is recognisable as lorem ipsum.

---

## Out of Scope

- Real (non-placeholder) copy for any section — all copy is deferred to the `real-content` feature
- Section 8 (Next Steps) call to action — placeholder lorem ipsum stands in; the real content is flagged as highest priority for the next feature
- Translation or localisation of placeholder text
- Populated diagrams, charts, or data visualisations (diagram placeholder elements are sufficient)
