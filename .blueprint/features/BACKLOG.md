# Feature Backlog

## Definitions

| Priority | Meaning |
|----------|---------|
| P0 | Critical — blocker |
| P1 | High — do soon |
| P2 | Medium — planned |
| P3 | Low — future |

| Effort | Meaning |
|--------|---------|
| S | Small — <1 hour |
| M | Medium — 1-3 hours |
| L | Large — 3-8 hours |
| XL | Extra Large — 1+ days |

| Status | Meaning |
|--------|---------|
| ⏳ | Ready to implement |
| 🚧 | In progress |
| ❓ | Needs clarification |

---

## Backlog

| Status | P | E | Slug | Description |
|--------|---|---|------|-------------|
| 🚧 | P0 | XL | helios-portal | Stakeholder communications site — curated linear journey through Project Helios strategy |
| ❓ | P2 | M | real-content | Replace lorem ipsum placeholder content with real copy across all portal sections |

---

## Details

### helios-portal

Full stakeholder portal for Project Helios. Dark consultancy aesthetic (navy/gold). 8-section curated journey:
0. Password gate (shared access code)
1. Hero — statement of intent
2. The Problem — current state, why change is needed
3. The Vision — product-centred delivery model
4. The Core Concept — single data source, core case, API-first
5. The Architecture — core endpoints, case-type inheritance, actor surfaces
6. The Roadmap — 4-step delivery sequence
7. What This Means — impact by stakeholder lens
8. Next Steps — what's being asked of the reader

Static HTML/CSS/JS. Deploy to Azure Static Web Apps. Lorem ipsum content initially.

### real-content

Once the helios-portal structure is approved, replace all placeholder content with real copy.
Covers: Hero tagline, Problem narrative, Vision statement, Architecture explanation, Roadmap rationale, stakeholder impact statements, Next Steps call to action.

**Blocked by:** helios-portal structure sign-off

---

## Notes

- Items removed automatically when pipeline completes successfully
- Run with: `/implement-feature "slug"`
