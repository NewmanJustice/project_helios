# Project Helios — Claude Instructions

## Start here

Read `.claude/memory/project_helios_portal_progress.md` at the start of every session. It contains current content progress, key decisions made, and working style notes that should inform how you collaborate on this project.

## Project summary

A Next.js 14 stakeholder communications portal for Project Helios — HMCTS's Civil jurisdiction transformation programme. Server-side authenticated, dark consultancy aesthetic, 8-section curated narrative.

## Key files

| File | Purpose |
|------|---------|
| `src/components/PortalClient.js` | All portal content and section markup |
| `src/app/globals.css` | All styles |
| `src/lib/animations.js` | Scroll animation logic (swappable) |
| `src/lib/sectionBackgrounds.js` | Section watermark words (swappable) |
| `src/middleware.js` | Auth — protects `/portal` |
| `src/app/api/login/route.js` | Login API route |
| `.blueprint/features/BACKLOG.md` | Feature backlog |

## Dev server

```bash
npm run dev -- --port 3001
```

Password to unlock the portal: `helios2025`
