// Staggered scale+fade animation for section children.
// Each child fades in and scales from 0.97 → 1.0,
// staggered by STAGGER_MS per element.
// To try a different style, replace the body of animateSection.

const STAGGER_MS = 120;
const CHILD_SELECTORS = 'h2, p, ul, ol, blockquote, figure, .callout, .highlight-card, .stat-grid, .roadmap-list';

export function animateSection(sectionEl) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const children = Array.from(sectionEl.querySelectorAll(CHILD_SELECTORS));

  // Set initial hidden state immediately
  children.forEach((child) => {
    child.style.opacity = '0';
    child.style.transform = 'scale(0.97) translateY(12px)';
    child.style.transition = 'none';
  });

  // Trigger transitions on next paint
  requestAnimationFrame(() => {
    children.forEach((child, i) => {
      child.style.transition = `opacity 700ms ease-out ${i * STAGGER_MS}ms, transform 700ms ease-out ${i * STAGGER_MS}ms`;
      child.style.opacity = '1';
      child.style.transform = 'scale(1) translateY(0)';
    });
  });
}
