---
name: Helios Portal — content and context progress
description: Where we got to on portal content, key decisions made, and what's next
type: project
---

## Content progress: all sections complete

**Why:** User wants to pick up content work in a future session without re-establishing context.

**How to apply:** All sections have real content. Section 8 (Next Steps) is commented out — not enough content yet, easy to restore. Section order was resequenced: What This Means now sits after Core Concept (section 5), Architecture is section 6, Roadmap is section 7.

### Section content status
| # | Title | Status |
|---|-------|--------|
| 1 | Project Helios | ✅ Done |
| 2 | The Problem | ✅ Done |
| 3 | The Vision | ✅ Done |
| 4 | The Core Concept | ✅ Done |
| 5 | What This Means | ✅ Done |
| 6 | The Architecture | ✅ Done |
| 7 | The Roadmap | ✅ Done |
| 8 | Next Steps | ⏸ Commented out — restore when ready |

### Key content decisions made
- Section 1 tagline: "Taking a fresh look at the technical landscape underpinning the Civil jurisdiction. To ensure what we build is coherent, maintainable, and driven by product thinking."
- Section 1 body: frames the problem of incremental, programme-by-programme growth without a shared Civil vision
- Section 2 frames three distinct problems: (1) no data interoperability between legacy/reformed systems, (2) each new service rebuilds Caseman functionality in isolation, (3) workarounds create fragility and make new features slow/expensive
- Section 2 callout: consequence statement format (not a quote) — "The cost of building on what we have is no longer just technical..."
- Section 3: introduces "Civil Core" as the name for the proposed platform — central, extensible, built around shared Civil concerns; ambitious tone, highlight card is a vision statement ("not just a technical upgrade...")
- "Civil Core" is the working name for the proposed platform — use consistently from section 3 onwards
- Audience: senior civil servants and judiciary, completely cold — needs full context from scratch
- Tone: clear and direct but not aggressive; names the problem without blaming individuals or systems explicitly

### Key technical decisions made
- Next.js 14 App Router, server-side auth via httpOnly cookie
- Login at `/`, portal SPA at `/portal`, middleware at `src/middleware.js`
- Password: `helios2025` (set via `HELIOS_PASSWORD` env var in production)
- All content in `src/components/PortalClient.js`
- Styles in `src/app/globals.css`
- Dark navy (#0A1628), white text, gold accent (#F5A623), Sora headings, Inter body

### Look and feel decisions made
- Scroll animations: staggered scale+fade per section child — `src/lib/animations.js` (swappable)
- Section watermark words: oversized faded Civil jurisdiction terms in bottom-right of each section — `src/lib/sectionBackgrounds.js` (swappable)
- Watermark words assigned: CIVIL, CORE CASE, ORDERS, CLAIMS, PARTIES, JUDGEMENTS, ENFORCEMENTS, APPLICATIONS
- Watermark colour: #1a3a5c (close to background, very subtle)
- Font sizes calculated dynamically via canvas to prevent long words from being clipped
- Animation duration: 700ms, stagger: 120ms per child

### Working style notes
- User prefers to draft content collaboratively — propose copy first, get sign-off, then write to file
- User edits markup directly in the IDE for small tweaks — don't re-read files unnecessarily
- User wants swappable/isolated JS files for visual effects so they can be changed independently
- Keep the dev server stopped when not actively testing — user will ask to start it
