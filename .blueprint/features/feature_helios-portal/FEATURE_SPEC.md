# Feature Specification — Helios Portal

## 1. Feature Intent
**Why this feature exists.**

- **Problem being addressed:** There is no existing vehicle for HMCTS to communicate the Project Helios transformation strategy to senior stakeholders in a way that is visually authoritative, narratively coherent, and controlled in its access. Standard document formats (slide decks, Word documents) do not convey the strategic weight or deliberate design intent of the programme.
- **User need:** Senior Civil Servants and Judiciary need to be able to read a curated, self-contained narrative about the Helios transformation — what it is, why it exists, how it will be delivered, and what is being asked of them — without requiring a facilitated briefing.
- **System alignment:** This feature is the entirety of the Helios Portal system at initial launch. It delivers the password gate, the curated linear journey, and the visual/technical foundation on which the `real-content` feature will build.

> This feature directly realises the system purpose. No alignment tension exists at this stage.

---

## 2. Scope

### In Scope
- Static HTML/CSS/JS portal — no framework, no build pipeline
- Client-side password gate (Section 0) with a single shared access code
- Eight narrative sections (1–8) presenting the Helios strategy in a defined order
- Fixed progress indicator (scroll-driven) with jump navigation to any section
- Subtle scroll-triggered entrance animations on section content
- Dark consultancy visual design: navy (#0A1628) background, white body text, gold/amber accent
- Typography: Inter/geometric sans for body text, Sora or DM Sans for headings
- Lorem ipsum placeholder content throughout all narrative sections
- Deployment configuration for Azure Static Web Apps (`staticwebapp.config.json`)

### Out of Scope
- Real (non-placeholder) copy — deferred to `real-content` feature
- Server-side logic, backend API, or session persistence
- User accounts, personalisation, or role-based access
- Feedback forms or interactive input beyond the password gate
- Analytics, tracking, or logging
- WCAG 2.1 AA compliance (explicitly deferred — see Open Questions)
- Mobile-first optimisation (desktop primary; tablet reasonable; mobile not broken)
- Custom domain configuration (operator responsibility post-deployment)

---

## 3. Actors Involved

### Senior Civil Servant (Reader — Primary)
- **Can do:** Enter the correct password and gain access; scroll through sections in order; jump to any section via the progress indicator; re-read sections freely.
- **Cannot do:** Access content without the correct password; modify content; submit feedback; persist their session across browser refreshes.

### Judiciary (Reader — Secondary)
- **Can do:** Same as Senior Civil Servant.
- **Cannot do:** Same exclusions as Senior Civil Servant.

### Developer / Administrator (Operator)
- **Can do:** Edit HTML/CSS/JS files directly to update content or change the password; deploy to Azure Static Web Apps; modify section structure.
- **Cannot do:** Use a CMS or admin interface (none exists by design).

---

## 4. Behaviour Overview
**What the feature does, conceptually.**

### Happy Path
1. Reader arrives at the portal URL. Only the password gate (Section 0) is visible. All other content is hidden.
2. Reader enters the correct shared access code and submits.
3. The password gate dismisses and the main journey is revealed, beginning at Section 1 (Hero).
4. The progress indicator appears (fixed position — side rail or top bar) and reflects Section 1 as active.
5. Reader scrolls down through sections in order. As each section enters the viewport, its content animates in subtly.
6. The progress indicator updates as the reader scrolls, reflecting the current section.
7. Reader completes the journey at Section 8 (Next Steps) and understands what is being asked of them.

### Key Alternatives
- **Jump navigation:** At any point after unlocking, the reader can click a section marker on the side rail progress indicator to jump directly to that section. The indicator updates to reflect the new position.
- **Re-entry:** If the reader refreshes or closes the tab, the password gate is shown again. There is no "remember me" or session persistence.
- **Wrong password:** If an incorrect password is entered, an error state is shown on the gate. The reader can try again. There is no lockout.

### Section Content Summary
| # | Title | Content Summary |
|---|-------|-----------------|
| 0 | Password Gate | Access code entry. Single shared password. No content visible until unlocked. |
| 1 | Hero | Statement of intent. Bold headline. Establishes tone and purpose. |
| 2 | The Problem | Current state of HMCTS Civil case management. Why Caseman is insufficient. Why change is needed now. |
| 3 | The Vision | The product-centred delivery model. What Helios proposes at a strategic level. |
| 4 | The Core Concept | Single data source (Core Civil database). Core case model. API-first architecture. |
| 5 | The Architecture | Core API endpoints (Orders, Judgements, Parties, Claims, Enforcements, Applications). Case-type inheritance/extension model. Actor product surfaces. |
| 6 | The Roadmap | Four-step delivery sequence: Step 1 (Re-platform DB), Step 2 (API & Core Endpoints), Step 3 (Caseworker reskin), Step 4 (To be defined). |
| 7 | What This Means | Impact through four stakeholder lenses: Judicial, Citizen, Caseworker, Professional. |
| 8 | Next Steps | What is being asked of the reader. Call to action or invitation. |

---

## 5. State & Lifecycle Interactions

This feature implements the entire session lifecycle described in the System Specification.

- **State-creating:** Creates the session-local `Locked` → `Unlocked` transition.
- **State-transitioning:** Scroll and jump navigation transition the reader's active section (reflected in the progress indicator).
- **State-constraining:** The password gate constrains access to all content until the correct code is entered.

### States
| State | Entry Condition | Exit Condition |
|-------|----------------|----------------|
| Locked | Page load / refresh | Correct password entered |
| Unlocked | Correct password entered | Tab closed / page refreshed |
| Active Navigation | Any unlocked state | — (non-terminal within session) |

No persistent state is written (no cookies, no localStorage unless used for the password check implementation — see Rules).

---

## 6. Rules & Decision Logic

### Rule 1: Password Gate Enforcement
- **Description:** All content in sections 1–8 must be hidden until the correct password is entered.
- **Inputs:** User-entered access code string.
- **Output:** If match → reveal journey, hide gate. If no match → display error, gate remains.
- **Deterministic:** Yes. Single correct value.
- **Implementation note:** The password value is `helios2025` (lowercase, case-sensitive). It is stored in a separate `config.js` file (not inline in the main JS) to make rotation easy. The `.env` convention is adapted here as a plain JS config module since there is no build pipeline.

### Rule 2: Section Order Immutability
- **Description:** Sections 1–8 always appear in the defined order. No feature, user action, or configuration may reorder them.
- **Inputs:** None (structural invariant).
- **Output:** DOM order is always 1 → 8.
- **Deterministic:** Yes.

### Rule 3: Progress Indicator Accuracy
- **Description:** The active section indicator must reflect the section currently occupying the majority of the viewport.
- **Inputs:** Scroll position.
- **Output:** Corresponding section marker highlighted on progress indicator.
- **Deterministic:** Yes (IntersectionObserver or scroll event logic).

### Rule 4: Wrong Password Handling
- **Description:** An incorrect password entry must result in a visible, non-destructive error. No lockout. The input is cleared or retained (developer choice) for retry.
- **Inputs:** Incorrect password string.
- **Output:** Error message visible on gate. Gate remains. No content revealed.
- **Deterministic:** Yes.

### Rule 5: Roadmap Step 4 Placeholder
- **Description:** Roadmap Step 4 must be presented as "To be defined" and must not be filled with fabricated content.
- **Inputs:** Section 6 content.
- **Output:** Step 4 label reads "To be defined" or equivalent.
- **Deterministic:** Yes (content rule, not logic rule).

---

## 7. Dependencies

### System Components
- Static file server (Azure Static Web Apps) — required for deployment
- Modern browser with JavaScript enabled — required for password gate and progress indicator

### External Systems
- Azure Static Web Apps — deployment target. No runtime API dependency.
- Font loading (Google Fonts CDN or self-hosted) — Inter, Sora, DM Sans. If CDN-loaded, this creates a soft runtime dependency. Developer should document the choice.

### Policy / Operational Dependencies
- Shared password must be communicated to intended readers out-of-band (email, verbal). The portal does not distribute it.
- Azure Static Web Apps account/subscription must be available to the operator.

### Technical Dependencies
- No npm packages, no framework, no build tool required. Vanilla HTML/CSS/JS only.
- `staticwebapp.config.json` required for correct routing on Azure Static Web Apps (particularly to avoid 404 on direct URL access).

---

## 8. Non-Functional Considerations

- **Performance:** No large images or heavy assets at initial build (placeholder content only). Load time should be sub-2 seconds on office broadband. Fonts must not block render.
- **Audit/logging:** None required or appropriate. The portal collects no user data.
- **Error tolerance:** The only runtime failure mode is an incorrect password entry, which is handled gracefully (Rule 4). If fonts or CDN assets fail to load, the site should degrade gracefully (system fonts as fallback).
- **Security:** The password is visible in source. This is accepted. No other sensitive data is present. HTTPS is provided by Azure Static Web Apps by default.
- **Scroll performance:** Animations must not cause layout thrashing or janky scroll. CSS transitions preferred over JS-driven property manipulation where possible. Scroll animations must respect the `prefers-reduced-motion` media query (omit animations when preference is set to reduce).

---

## 9. Assumptions & Open Questions

### Assumptions (explicit)
1. The audience is accessing the portal on a desktop or laptop, on a modern browser, in a professional context (good connection, full-screen or near-full-screen viewport).
2. The shared password is a human-readable word or phrase (not a UUID or hash) so it can be communicated verbally or in an email.
3. Section content (even placeholder) should follow the structural pattern: section heading, supporting body text, and at least one callout/visual element (e.g. a bold statistic, a diagram placeholder, or a numbered list).
4. The progress indicator labels sections by number and/or short title (e.g. "3 — The Vision"), not by icon alone.
5. The gold/amber accent colour is used sparingly — for key callouts, highlights, and interactive elements — not as a background colour for large areas.

### Open Questions
1. ~~**Password value:**~~ **RESOLVED:** Password is `helios2025` (case-sensitive), stored in `config.js`.
2. ~~**Progress indicator placement:**~~ **RESOLVED:** Side rail (vertical). Collapses gracefully on narrow viewports.
3. **Section 8 (Next Steps) call to action:** What action is being requested of the reader? Placeholder lorem ipsum will stand in, but this is the most important section for real content — it should be prioritised in the `real-content` feature.
4. ~~**Animations on reduced-motion preference:**~~ **RESOLVED:** Scroll animations respect `prefers-reduced-motion` (required, not optional).
5. ~~**Password in source code:**~~ **RESOLVED:** Password stored in separate `config.js` file.

---

## 10. Impact on System Specification

This feature **reinforces** all existing system assumptions. It is the initial and complete realisation of the system at v1.

No contradictions identified.

One observation worth recording: the feature confirms that the system's access control model (client-side password gate) is appropriate for the stated use case, but the System Spec correctly flags the limitation. This feature must not strengthen the language around security — the gate is a deterrent, not a control.

---

## 11. Handover to BA (Cass)

### Story Themes
Cass should expect to write stories across the following themes:

1. **Password gate** — Entry flow (correct password), error flow (wrong password), structural enforcement (content hidden until unlocked).
2. **Section scaffold** — The HTML/CSS structure for all eight sections, with consistent layout patterns.
3. **Visual design system** — Palette, typography, spacing, component patterns (headings, callouts, body text).
4. **Progress indicator** — Scroll-driven tracking, jump navigation, section labelling.
5. **Scroll animations** — Entrance animations for section content as it enters the viewport.
6. **Deployment** — Azure Static Web Apps configuration, routing, HTTPS.
7. **Placeholder content** — Ensuring all sections have structurally correct lorem ipsum that signals where real content will go.

### Expected Story Boundaries
- Stories should be deliverable as standalone HTML/CSS/JS changes to a single file or a small set of related files.
- The password gate should be a discrete story — it has logic and therefore needs clear acceptance criteria.
- The progress indicator is likely 2 stories: the structural/visual component, and the scroll-driven behaviour.
- Section content stories can be grouped by section (one story per section, or one story for the full section scaffold).

### Areas Needing Careful Story Framing
- **Password gate security language:** Stories must not imply this is a secure authentication system. Acceptance criteria should describe it as "access deterrent" behaviour.
- **Roadmap Step 4:** The acceptance criterion for the Roadmap section must explicitly require Step 4 to read "To be defined" — not a placeholder that could be mistaken for intent.
- **Placeholder vs. real content:** Stories should distinguish between "structurally correct placeholder" (required now) and "real copy" (deferred). Acceptance criteria for section stories close when the structure is correct, not when real content is present.

---

## 12. Change Log (Feature-Level)
| Date       | Change                                       | Reason                              | Raised By |
|------------|----------------------------------------------|-------------------------------------|-----------|
| 2026-05-06 | Initial feature specification created       | First pass — helios-portal feature  | Alex      |
