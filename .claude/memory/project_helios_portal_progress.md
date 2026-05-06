---
name: Helios Portal — content and context progress
description: Where we got to on portal content, key decisions made, and what's next
type: project
originSessionId: 66bae275-132b-4cf9-aaa7-283cec0fc778
---
## Content progress: sections 1 and 2 done, section 3 next

**Why:** User wants to pick up content work in a future session without re-establishing context.

**How to apply:** Resume from section 3 ("The Vision") in `src/components/PortalClient.js`. Sections 1 and 2 have real content; sections 3–8 are still lorem ipsum.

### Section content status
| # | Title | Status |
|---|-------|--------|
| 1 | Project Helios | ✅ Done |
| 2 | The Problem | ✅ Done |
| 3 | The Vision | ⏳ Next |
| 4 | The Core Concept | ⏳ Todo |
| 5 | The Architecture | ⏳ Todo |
| 6 | The Roadmap | ⏳ Todo |
| 7 | What This Means | ⏳ Todo |
| 8 | Next Steps | ⏳ Todo |

### Key content decisions made
- Section 1 tagline: "Taking a fresh look at the technical landscape underpinning the Civil jurisdiction. To ensure what we build is coherent, maintainable, and driven by product thinking."
- Section 1 body: frames the problem of incremental, programme-by-programme growth without a shared Civil vision
- Section 2 frames three distinct problems: (1) no data interoperability between legacy/reformed systems, (2) each new service rebuilds Caseman functionality in isolation, (3) workarounds create fragility and make new features slow/expensive
- Section 2 callout: consequence statement format (not a quote) — "The cost of building on what we have is no longer just technical..."
- Audience: senior civil servants and judiciary, completely cold — needs full context from scratch
- Tone: clear and direct but not aggressive; names the problem without blaming individuals or systems explicitly

### Key technical decisions made
- Next.js 14 App Router, server-side auth via httpOnly cookie
- Login at `/`, portal SPA at `/portal`, middleware at `src/middleware.js`
- Password: `helios2025` (set via `HELIOS_PASSWORD` env var in production)
- All content in `src/components/PortalClient.js`
- Styles in `src/app/globals.css`
- Dark navy (#0A1628), white text, gold accent (#F5A623), Sora headings, Inter body
