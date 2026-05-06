# System Specification — Project Helios (Helios Portal)

## 1. Purpose & Intent
**Why this system exists.**

- **Problem:** HMCTS needs to communicate a complex, multi-year Civil jurisdiction transformation strategy to senior stakeholders — civil servants and judiciary — in a way that is authoritative, coherent, and visually distinct from standard government communications. There is no existing vehicle for this.
- **Who it exists for:** Senior Civil Servants (primary), Judiciary (secondary), and a small number of internal HMCTS transformation stakeholders. This is not a public-facing product.
- **Success:** A reader who arrives with no prior knowledge of Project Helios completes the linear journey and understands: what problem is being solved, what the proposed solution is, how it will be delivered, and what is being asked of them.
- **What must not be compromised:** The authority and coherence of the narrative. If the structure or aesthetic undermines trust, the communication fails its purpose.

> This section anchors all future decisions.
> If a feature contradicts this, Alex must flag it.

---

## 2. Business & Domain Context
**Grounded in `.business_context`.**

- **Programme:** Project Helios is an internal HMCTS codename for the Civil jurisdiction transformation strategy — England and Wales.
- **Domain:** Civil case management. The current system (Caseman, backed by CORE CIVIL DB) is a legacy monolith that is fragmented, non-API-first, and does not support coherent multi-channel delivery.
- **Strategic direction:** Re-platform to a single source of truth (Core Civil database), expose a Core Civil API, and build distinct product surfaces for each actor group (Judicial, Citizen, Caseworker, Professional, External API).
- **Organisational driver:** The programme needs senior stakeholder alignment and buy-in before delivery commitments are made. The portal is an instrument of that alignment.
- **Regulatory context:** Not applicable to the portal itself. The underlying programme operates within HM Courts & Tribunals Service governance.

**Assumptions**
- The portal is a one-way communication instrument — it does not capture feedback, accept submissions, or persist any user state beyond the session-local password check.
- The password gate is a deterrent, not a security control. The site is not classified and the password is shared informally.
- Real content (copy and visuals) will replace lorem ipsum placeholders in a subsequent update. The portal structure must be approved first.
- The portal is developer-maintained — no CMS, no build pipeline. Content changes require direct file edits.
- Azure Static Web Apps is the mandated deployment target; no alternative has been scoped.

---

## 3. System Boundaries
**What is in scope vs out of scope.**

### In Scope
- A static HTML/CSS/JS website with no server-side processing
- A client-side password gate on the landing page (Section 0)
- Eight ordered content sections presenting the Helios strategy narrative
- A fixed progress indicator (scroll-driven) allowing jump navigation to any section
- Subtle scroll-triggered animations
- Dark consultancy visual aesthetic (navy/gold/white, Inter/Sora typography)
- Deployment configuration for Azure Static Web Apps

### Out of Scope
- Any server-side logic, authentication service, or persistent session management
- User accounts, roles, or personalisation
- Content management system or admin interface
- Analytics or user tracking
- Feedback forms, comments, or interactive input beyond the password gate
- Real (non-lorem ipsum) copy — this is deferred to the `real-content` feature
- Accessibility compliance to WCAG 2.1 AA (this is a stakeholder briefing site, not a public service — however it should not be deliberately inaccessible)
- Mobile-first optimisation (desktop/large-screen primary audience assumed; reasonable responsiveness is expected but not the primary concern)

---

## 4. Actors & Roles
**Who interacts with the system and how.**

### Senior Civil Servant (Reader — Primary)
- **Description:** Director-level and above within HMCTS or sponsoring government departments. Familiar with transformation programmes; unfamiliar with the detail of Helios.
- **Primary goals:** Understand the strategic rationale, validate alignment with organisational priorities, identify what is being asked of them.
- **Authority:** Read-only. Enters password, navigates sections, reads content. Cannot modify anything.
- **Cannot do:** Submit feedback, access without the correct password, modify content.

### Judiciary (Reader — Secondary)
- **Description:** Judges or senior judicial office holders invited to review the transformation direction.
- **Primary goals:** Understand how the proposed architecture affects judicial workflow and data access.
- **Authority:** Same as Senior Civil Servant — read-only.
- **Cannot do:** Same exclusions as above.

### Developer / Administrator (Operator)
- **Description:** The HMCTS developer responsible for maintaining the portal. Direct file access; no UI.
- **Primary goals:** Deploy and update the portal, replace placeholder content, manage the shared password.
- **Authority:** Full — can modify any file, change the password, redeploy.
- **Cannot do:** Use a CMS or admin interface (none exists by design).

---

## 5. Core Domain Concepts
**Shared language and meanings.**

### Helios Portal
The static website that is the subject of this system specification. It is both the product being built and the primary artefact of the Helios communications strategy.

### Password Gate (Section 0)
A client-side challenge presented before any content is visible. The user enters a shared access code. If correct, the main journey is revealed. There is no account or session persistence beyond the current browser tab. This is an access deterrent, not an authentication system.

### Curated Linear Journey
The eight content sections (1–8) are designed to be read in order, forming a coherent narrative arc. The reader is guided through the sections sequentially. Jump navigation is permitted but the default experience is linear.

### Section
A full-width, independently scrollable unit of content within the journey. Sections are numbered 0–8. Section 0 is the password gate; sections 1–8 are narrative content. Each section has a defined thematic purpose (see Feature Spec).

### Progress Indicator
A fixed UI element (side rail or top bar) that reflects the reader's current position within the eight narrative sections. It is scroll-driven and allows direct navigation to any section.

### Scroll Animation
A subtle visual effect triggered as a section or element enters the viewport. Used to reinforce the premium, curated quality of the experience. Animations are cosmetic, not functional.

### Placeholder Content
Lorem ipsum text used in place of real copy during the structural build phase. All narrative sections will contain placeholder content at initial launch. Real content is a deferred feature (`real-content`).

### Core Civil API (Domain concept — not a portal feature)
The API layer proposed under Project Helios. The portal explains this concept; it does not implement or consume it.

---

## 6. High-Level Lifecycle & State Model
**How the system behaves over time.**

The portal is a static site. There is no persistent state model in the traditional sense. However, there is a session-local state machine for the user's journey:

### Session Lifecycle
1. **Locked** — User arrives. Password gate is visible. No content is accessible.
2. **Unlocked** — Correct password entered. Main journey is revealed. This state persists for the browser session only.
3. **Active Navigation** — User scrolls or jumps between sections. Progress indicator reflects position.
4. **Session End** — User closes or refreshes the tab. State resets to Locked.

### Content Lifecycle (Operator-driven)
1. **Placeholder** — Initial state. All narrative sections contain lorem ipsum.
2. **Real Content** — Operator replaces placeholder copy. No structural change required.

Notes:
- There is no terminal state in the user journey — the reader may revisit sections freely once unlocked.
- The password is hardcoded in the static files. Changing it requires a file edit and redeployment.

---

## 7. Governing Rules & Invariants
**What must always be true.**

1. **Gate before content:** No narrative content (sections 1–8) is visible or accessible until the correct password has been entered. This must be enforced in the client-side logic; it must not be bypassable by simply scrolling or inspecting the DOM in ways a non-technical reader would attempt.
2. **Section order is canonical:** The eight sections appear in the defined order (1–8). The order must not be changed by navigation or personalisation.
3. **No server-side dependency at runtime:** The portal must function entirely from static files. No API calls, no backend, no dynamic content injection at runtime.
4. **Single shared password:** There is one password for all readers. There is no per-user credential. If the password needs to change, it changes for everyone.
5. **Progress indicator reflects scroll position:** The indicator must accurately reflect the user's current section. It must not mislead.
6. **Placeholder content must not be presented as real:** If lorem ipsum is visible, it must be obviously placeholder (standard lorem ipsum text). No fabricated strategy content should be inserted as a stand-in.

---

## 8. Cross-Cutting Concerns
**Concerns that affect multiple features.**

### Access Control
The password gate is the sole access control mechanism. It is a soft gate — a technically capable user can bypass it. This is accepted. The goal is to prevent casual access by unintended audiences, not to protect classified information.

### Visual Coherence
The dark consultancy aesthetic (navy #0A1628, white text, gold/amber accent) must be applied consistently across all sections. No section should deviate from the established palette or typographic system. This is a cross-cutting design constraint.

### Typography System
- Body text: Inter or equivalent geometric sans-serif
- Headings: Sora or DM Sans
- These must be applied consistently. Font loading strategy (self-hosted vs CDN) is a developer decision but must not degrade load performance noticeably.

### Scroll Behaviour
Scroll animations and the progress indicator are concerns that span all narrative sections. The animation approach must be consistent in timing and style. The progress indicator must be present on all sections.

### Content Structure
Each section follows a predictable structural pattern (heading, supporting text, visual/callout elements). This structural consistency enables the reader to orient quickly and reduces cognitive load.

### No External Dependencies at Runtime (preferred)
Where possible, the portal should not depend on external CDNs or third-party services at runtime. If fonts or libraries are loaded from CDN, this is a developer trade-off to document; it creates a soft dependency on those services being available.

### Auditability
Not applicable in the traditional sense. There is no logging, no audit trail, no user data collected. The operator is responsible for maintaining the source files as the record of the portal's content.

---

## 9. Non-Functional Expectations (System-Level)

- **Performance:** Page load should feel instant on a standard office broadband connection. No large unoptimised assets. Images (if any) should be compressed.
- **Reliability:** Azure Static Web Apps provides high availability. No additional resilience engineering is required or appropriate for a static site.
- **Security posture:** Low. The site holds no personal data, no credentials beyond the shared password (which is low-sensitivity), and no writable endpoints. The primary security concern is that the password gate is not trivially bypassable by a non-technical reader.
- **Scalability:** Not a concern. Audience is small (tens of readers, not thousands). Azure Static Web Apps handles traffic automatically.
- **Browser support:** Modern browsers (Chrome, Edge, Firefox, Safari — current and one version back). No IE11 support required.
- **Responsiveness:** Designed primarily for desktop/large-screen. Reasonable behaviour on tablet. Mobile is not a primary use case but must not be broken.

---

## 10. Known Gaps, Risks & Open Questions

1. **Password gate security model:** The client-side password check means the password is visible in source. This is accepted for the use case but should be explicitly acknowledged and not treated as secure. If the sensitivity of the content increases, this architecture is not appropriate.
2. **Step 4 of the roadmap is undefined:** The business context explicitly flags this as TBD. The portal must present this honestly (e.g. "To be defined") rather than fabricating content.
3. **Case-type-specific API architecture tension:** The business context flags an open question about whether sub-domains own their own APIs or whether there is a separate extension mechanism. This ambiguity exists in the underlying programme; the portal must not resolve it silently.
4. **Real content dependency:** The portal's narrative sections are meaningless with placeholder content. Approval of the structure and a timeline for real content replacement should be sought before wider stakeholder distribution.
5. **Accessibility:** The site is not a public service and WCAG compliance is out of scope. However, if senior civil servants with accessibility needs are in the audience, this could become a concern.
6. **Password distribution:** There is no defined mechanism for distributing the shared password to intended readers. This is an operational gap outside the system boundary.

---

## 11. Change Log (System-Level)
| Date       | Change                                   | Reason                              | Approved By |
|------------|------------------------------------------|-------------------------------------|-------------|
| 2026-05-06 | Initial system specification created    | First pass — Project Helios Portal  | Alex        |
