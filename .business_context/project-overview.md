# Project Helios — Business Context

## What is Project Helios?

Project Helios is an internal HMCTS programme aimed at defining and communicating the strategic direction for the Civil legal jurisdiction in England and Wales. It articulates a product-centred approach to delivering process digitisation, built on a coordinated "core case" concept with clear data reporting possibilities.

The name "Helios" is an internal codename and is used as the standalone identity for the stakeholder communications site.

---

## The Problem

The current HMCTS Civil case management system (Caseman) is a legacy monolith backed by the CORE CIVIL DB (Caseman schema). It is not structured around products or APIs — it is fragmented, difficult to build from, and does not support a coherent multi-channel experience for Judicial, Citizen, Caseworker, or Professional users.

---

## The Strategic Vision

Project Helios proposes:

1. **A single source of truth** — one Core Civil database re-platformed from Caseman
2. **An API-first architecture** — a Core Civil API with well-defined endpoints covering the common data and operations across all Civil cases
3. **Core + Extension model** — Core endpoints handle what is universal (Orders, Judgements, Parties, Claims, Enforcements, Applications); case-type-specific APIs extend the core without replacing it (e.g. money claims vs. property claims)
4. **Product-centred delivery** — distinct products for each actor group (Judiciary, Citizens, Caseworkers, Legal Professionals, external API consumers) built on top of the shared API layer

---

## Core API Endpoints (Universal Civil)

- Orders
- Judgements
- Parties
- Claims
- Enforcements
- Applications

---

## Actors

| Actor | Role |
|-------|------|
| Judicial | Judges and magistrates consuming case data and issuing orders/judgements |
| Citizen | Members of the public submitting claims or responding to proceedings |
| Caseworker | HMCTS staff managing cases and processing workflow |
| Professional | Solicitors, barristers, and legal professionals acting on behalf of parties |
| API (External) | Third-party systems consuming the public Civil API |

---

## Delivery Roadmap

| Step | Description | Status |
|------|-------------|--------|
| 1 | Re-platform CORE CIVIL DB | Defined |
| 2 | API and Core Endpoints (enhancing current Caseman backend functionality) | Defined |
| 3 | Caseworker (reskin Caseman) | Defined |
| 4 | To be defined | TBD |

---

## Open Questions / Tensions

- How do case-type-specific APIs avoid becoming a bottleneck? Do sub-domains own their own APIs within the monolith, or is there a separate extension mechanism?
- Step 4 of the roadmap is not yet defined — this is intentionally left open.

---

## Audience for Helios Portal

- Senior civil servants (primary)
- Judiciary (secondary)
- Internal stakeholders familiar with HMCTS transformation context

Access is restricted via a simple shared password gate. The site is not public-facing.

---

## Site Aesthetic Direction

- Standalone consultancy/strategy firm aesthetic (not GOV.UK)
- Dark authority palette: deep navy (#0A1628), white body text, gold/amber accent (Helios sun reference)
- Typography: Inter or similar geometric sans for body; Sora or DM Sans for headings
- Full-width sections, bold numerical callouts, subtle scroll animations
- Curated linear journey — stakeholder reads sections in order, with optional jump navigation
- Reference aesthetic: Oliver Wyman, Palantir

---

## Technical Constraints

- Static build (HTML/CSS/JS — no framework)
- Deploy to Azure Static Web Apps
- No build pipeline required — developer-maintained
- Single shared password gate on landing page
- Placeholder (lorem ipsum) content initially; real copy to follow
