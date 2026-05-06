// Oversized faded watermark words for each section background.
// Each word is drawn from the Civil jurisdiction domain — specifically
// the core API endpoints — creating a subtle visual connection to the
// architecture narrative.
//
// To remove: delete this file and remove the import + initSectionBackgrounds()
// call from PortalClient.js.
// To change words: edit SECTION_WORDS below.
// To adjust opacity/size: edit STYLES below.

const SECTION_WORDS = {
  1: 'CIVIL',
  2: 'CORE CASE',
  3: 'ORDERS',
  4: 'CLAIMS',
  5: 'PARTIES',
  6: 'JUDGEMENTS',
  7: 'ENFORCEMENTS',
  8: 'APPLICATIONS',
};

const BASE_STYLES = {
  opacity: '0.04',
  fontFamily: "'Sora', 'DM Sans', system-ui, sans-serif",
  fontWeight: '800',
  color: '#1a3a5c',
  position: 'absolute',
  bottom: '-2rem',
  right: '0',
  left: '0',
  lineHeight: '1',
  pointerEvents: 'none',
  userSelect: 'none',
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
  textAlign: 'right',
  zIndex: '0',
};

// Measure the font size that makes a word fill a given pixel width.
function fitFontSize(word, targetWidth, fontFamily, fontWeight) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const testSize = 100; // reference size in px
  ctx.font = `${fontWeight} ${testSize}px ${fontFamily}`;
  const textWidth = ctx.measureText(word).width;
  // Scale proportionally, then cap at 80% of target width so it never fully bleeds
  return Math.floor((targetWidth / textWidth) * testSize * 0.8);
}

function applyWatermark(section, word) {
  if (getComputedStyle(section).position === 'static') {
    section.style.position = 'relative';
  }
  section.style.overflow = 'hidden';

  const watermark = document.createElement('span');
  watermark.textContent = word;
  watermark.setAttribute('aria-hidden', 'true');
  Object.assign(watermark.style, BASE_STYLES);

  const fontSize = fitFontSize(word, section.offsetWidth, BASE_STYLES.fontFamily, BASE_STYLES.fontWeight);
  watermark.style.fontSize = `${fontSize}px`;

  section.appendChild(watermark);
  return watermark;
}

export function initSectionBackgrounds() {
  const entries = Object.entries(SECTION_WORDS);

  entries.forEach(([id, word]) => {
    const section = document.getElementById(`section-${id}`);
    if (!section) return;
    applyWatermark(section, word);
  });

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      entries.forEach(([id, word]) => {
        const section = document.getElementById(`section-${id}`);
        if (!section) return;
        const existing = section.querySelector('[aria-hidden="true"]');
        if (existing) existing.remove();
        applyWatermark(section, word);
      });
    }, 150);
  });
}
