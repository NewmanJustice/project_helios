## Handoff Summary
**For:** Cass
**Feature:** helios-portal

### Key Decisions
- The password gate is a client-side access deterrent only — not a security control. Stories and ACs must not imply otherwise.
- Roadmap Step 4 must read "To be defined" — this is a content rule, not a placeholder gap.
- All eight sections use lorem ipsum at initial build. Stories close on structural correctness, not real copy.
- Progress indicator placement (side rail vs top bar) is deferred to the developer as a design decision — either is acceptable per spec.
- No framework, no build tool, no npm — vanilla HTML/CSS/JS only. This constrains implementation but not story writing.

### Files Created
- .blueprint/system_specification/SYSTEM_SPEC.md
- .blueprint/features/feature_helios-portal/FEATURE_SPEC.md

### Open Questions
- What is the intended shared access code / password? (Must not be committed to the repo as a default.)
- Should scroll animations respect `prefers-reduced-motion`? Recommended yes — decision needed before animation stories are written.
- Should the password be in a separate `config.js` file to make rotation easier? Recommendation: yes.

### Critical Context
The portal is a one-way stakeholder communication instrument — no user input, no persistence, no backend. The entire experience is: unlock → read → understand what's being asked. Story quality should optimise for narrative coherence and visual authority, not feature richness. The audience (senior civil servants, judiciary) will judge the programme's credibility partly on the quality of this site. Seven story themes: password gate, section scaffold, design system, progress indicator, scroll animations, deployment config, placeholder content.
