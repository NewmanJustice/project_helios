import { describe, it } from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';

function tryRead(path) {
  try { return readFileSync(new URL('../' + path, import.meta.url), 'utf8'); } catch { return null; }
}

const htmlSrc = tryRead('./index.html');
const appSrc  = tryRead('./app.js');
const cfgSrc  = tryRead('./config.js');
const dom = new JSDOM(htmlSrc ?? '');
const doc = dom.window.document;

// Helper: resolve hidden state from inline style or class
function isHidden(el) {
  const style = el.getAttribute('style') ?? '';
  const cls   = el.getAttribute('class') ?? '';
  return style.includes('display:none') || style.includes('display: none') ||
         cls.includes('hidden') || cls.includes('hide');
}

describe('Password Gate', () => {
  it('AC1 — HTML file exists', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
  });

  it('AC1 — sections 1-8 are hidden on load', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
    const sections = [1,2,3,4,5,6,7,8];
    for (const n of sections) {
      const el = doc.querySelector(`[id="section-${n}"], [data-section="${n}"]`);
      assert.ok(el, `section ${n} missing from DOM`);
      assert.ok(isHidden(el), `section ${n} should be hidden on load`);
    }
  });

  it('AC2+AC3 — config.js exists and contains helios2025', () => {
    assert.ok(cfgSrc !== null, 'File not yet created: ./config.js');
    assert.ok(cfgSrc.includes('helios2025'), 'helios2025 not found in config.js');
  });

  it('AC4 — no lockout/attempt-counter logic in app.js', () => {
    assert.ok(appSrc !== null, 'File not yet created: ./app.js');
    assert.ok(!/lockout|attemptCount|maxAttempts|failCount/i.test(appSrc),
      'app.js contains lockout/attempt-counter logic');
  });

  it('AC5 — helios2025 in config.js, NOT inline in app.js', () => {
    assert.ok(cfgSrc !== null, 'File not yet created: ./config.js');
    assert.ok(cfgSrc.includes('helios2025'), 'helios2025 must be in config.js');
    assert.ok(appSrc !== null, 'File not yet created: ./app.js');
    assert.ok(!appSrc.includes('helios2025'), 'helios2025 must not be hardcoded in app.js');
  });

  it('AC6 — sections 1-8 present in DOM even when locked', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
    for (const n of [1,2,3,4,5,6,7,8]) {
      const el = doc.querySelector(`[id="section-${n}"], [data-section="${n}"]`);
      assert.ok(el, `section ${n} must exist in DOM when locked`);
    }
  });

  it('AC7 — no sessionStorage.setItem / localStorage.setItem in app.js', () => {
    assert.ok(appSrc !== null, 'File not yet created: ./app.js');
    assert.ok(!/localStorage\.setItem|sessionStorage\.setItem/.test(appSrc),
      'app.js must not persist session state to storage');
  });

  it('AC8 — form has submit listener or input has keydown/keypress handler', () => {
    assert.ok(appSrc !== null, 'File not yet created: ./app.js');
    const hasSubmit   = /addEventListener\s*\(\s*['"]submit['"]/.test(appSrc);
    const hasKeyEvent = /addEventListener\s*\(\s*['"]key(?:down|press)['"]/.test(appSrc);
    assert.ok(hasSubmit || hasKeyEvent,
      'app.js must handle form submit or keydown/keypress for Enter-key submission');
  });
});

describe('Section Scaffold', () => {
  it('AC1+AC5 — sections with IDs section-1 through section-8 exist', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
    for (const n of [1,2,3,4,5,6,7,8]) {
      const el = doc.querySelector(`[id="section-${n}"], [data-section="${n}"]`);
      assert.ok(el, `section ${n} must have id="section-${n}" or data-section="${n}"`);
    }
  });

  it('AC1 — sections appear in DOM order 1 through 8', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
    const positions = [1,2,3,4,5,6,7,8].map(n => {
      const el = doc.querySelector(`[id="section-${n}"], [data-section="${n}"]`);
      assert.ok(el, `section ${n} missing`);
      const all = Array.from(doc.querySelectorAll('*'));
      return all.indexOf(el);
    });
    for (let i = 1; i < positions.length; i++) {
      assert.ok(positions[i] > positions[i-1],
        `section ${i+1} must appear after section ${i} in DOM`);
    }
  });

  it('AC2 — each section contains a heading element', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
    for (const n of [1,2,3,4,5,6,7,8]) {
      const el = doc.querySelector(`[id="section-${n}"], [data-section="${n}"]`);
      assert.ok(el, `section ${n} missing`);
      assert.ok(el.querySelector('h1,h2,h3'), `section ${n} must contain a heading`);
    }
  });

  it('AC2 — each section has at least one paragraph or list element', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
    for (const n of [1,2,3,4,5,6,7,8]) {
      const el = doc.querySelector(`[id="section-${n}"], [data-section="${n}"]`);
      assert.ok(el, `section ${n} missing`);
      assert.ok(el.querySelector('p,ul,ol'), `section ${n} must have a p, ul, or ol`);
    }
  });

  it('AC5 — sections share a common CSS class on their headings', () => {
    assert.ok(htmlSrc !== null, 'File not yet created: ./index.html');
    const headingClasses = [1,2,3,4,5,6,7,8].map(n => {
      const el = doc.querySelector(`[id="section-${n}"], [data-section="${n}"]`);
      assert.ok(el, `section ${n} missing`);
      const h = el.querySelector('h1,h2,h3');
      assert.ok(h, `section ${n} heading missing`);
      return Array.from(h.classList);
    });
    const shared = headingClasses[0].filter(cls =>
      headingClasses.every(list => list.includes(cls)));
    assert.ok(shared.length > 0,
      'All section headings must share at least one common CSS class');
  });
});
