/**
 * Test suite — helios-portal
 * Stories: Design System, Progress Indicator
 * Test IDs: T-DS-1…T-DS-7, T-PI-1…T-PI-7
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tryRead(path) {
  try { return readFileSync(new URL('../' + path, import.meta.url), 'utf8'); } catch { return null; }
}

function loadDOM(html) {
  return new JSDOM(html).window.document;
}

// ---------------------------------------------------------------------------
// Design System  (T-DS-*)
// ---------------------------------------------------------------------------

describe('Design System', () => {

  it('T-DS-1: CSS contains #0A1628 as background-color', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    assert.match(css, /background(?:-color)?\s*:\s*#0A1628/i,
      'background-color #0A1628 must appear in a CSS rule');
  });

  it('T-DS-2: CSS contains #FFFFFF as color for body text', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    assert.match(css, /\bcolor\s*:\s*#(?:FFFFFF|ffffff|FFF|fff)\b/,
      'color: #FFFFFF must appear in a CSS rule for body text');
  });

  it('T-DS-3: CSS contains exactly #F5A623 as accent colour', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    assert.match(css, /#F5A623/i, '#F5A623 accent colour must appear in CSS');
    // Must not be used as a large-area body/section background fill
    const bgAccent = css.match(/background(?:-color)?\s*:[^;]*#F5A623[^;]*;/gi) || [];
    const bodyBg = bgAccent.filter(r => /body|section|main|\.container|\.wrapper/i.test(r));
    assert.strictEqual(bodyBg.length, 0, '#F5A623 must not be used as a large-area background-color');
  });

  it('T-DS-4: CSS contains Sora or DM Sans in a font-family rule for headings', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    assert.match(css, /font-family\s*:[^;]*(?:Sora|DM\s+Sans)/i,
      'A font-family rule containing Sora or DM Sans must exist in CSS');
  });

  it('T-DS-5: CSS contains Inter in a font-family rule for body', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    assert.match(css, /font-family\s*:[^;]*Inter/i,
      'A font-family rule containing Inter must exist in CSS');
  });

  it('T-DS-6: CSS contains font-display: swap for render-blocking prevention', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    assert.match(css, /font-display\s*:\s*swap/,
      'font-display: swap must appear in CSS to prevent render-blocking fonts');
  });

  it('T-DS-7: All h2 elements inside sections 1–8 share the same CSS class', () => {
    const html = tryRead('index.html');
    assert.ok(html !== null, 'File not yet created: index.html');
    const document = loadDOM(html);
    const sectionH2s = [];
    for (let n = 1; n <= 8; n++) {
      const section = document.querySelector(`[data-section="${n}"]`) || document.querySelector(`#section-${n}`);
      if (!section) continue;
      section.querySelectorAll('h2').forEach(el => sectionH2s.push(el));
    }
    assert.ok(sectionH2s.length > 0, 'At least one h2 must exist across sections 1–8');
    const firstClass = Array.from(sectionH2s[0].classList).sort().join(' ');
    assert.ok(firstClass.length > 0, 'Section h2 elements must have at least one CSS class');
    sectionH2s.forEach((el, i) => {
      const cls = Array.from(el.classList).sort().join(' ');
      assert.strictEqual(cls, firstClass, `h2 in section ${i + 1} must share the same class as the first h2`);
    });
  });

});

// ---------------------------------------------------------------------------
// Progress Indicator  (T-PI-*)
// ---------------------------------------------------------------------------

describe('Progress Indicator', () => {

  it('T-PI-1: Side rail element exists in DOM with a progress/sidebar/rail class', () => {
    const html = tryRead('index.html');
    assert.ok(html !== null, 'File not yet created: index.html');
    const document = loadDOM(html);
    const rail = document.querySelector(
      'nav[class*="progress"], nav[class*="sidebar"], nav[class*="rail"],' +
      'div[class*="progress"], div[class*="sidebar"], div[class*="rail"],' +
      'aside[class*="progress"], aside[class*="sidebar"], aside[class*="rail"]'
    );
    assert.ok(rail, 'A side rail element with class containing progress/sidebar/rail must exist in the DOM');
  });

  it('T-PI-2: Side rail has CSS position: fixed', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    // Find a rule block that references a rail/progress/sidebar selector and contains position: fixed
    assert.match(css, /(?:progress|sidebar|rail)[^{]*\{[^}]*position\s*:\s*fixed/s,
      'The side rail selector must have position: fixed in CSS');
  });

  it('T-PI-3: Side rail contains 8 markers with section number and title text', () => {
    const html = tryRead('index.html');
    assert.ok(html !== null, 'File not yet created: index.html');
    const document = loadDOM(html);
    const rail = document.querySelector(
      '[class*="progress"], [class*="sidebar"], [class*="rail"]'
    );
    assert.ok(rail, 'Side rail element must exist');
    const markers = rail.querySelectorAll('a, button, li, [class*="marker"], [class*="item"], [data-section]');
    assert.ok(markers.length >= 8, `Side rail must contain at least 8 markers, found ${markers.length}`);
    // Each of the first 8 markers must carry a section number (1–8) in its text content
    let numbered = 0;
    markers.forEach(m => { if (/[1-8]/.test(m.textContent)) numbered++; });
    assert.ok(numbered >= 8, `At least 8 markers must contain a section number (1–8), found ${numbered}`);
  });

  it('T-PI-4: app.js uses IntersectionObserver with threshold 0.5', () => {
    const js = tryRead('app.js');
    if (js === null) return it.skip('app.js not yet created');
    assert.match(js, /IntersectionObserver/, 'app.js must use IntersectionObserver');
    assert.match(js, /threshold\s*:\s*0\.5/, 'IntersectionObserver must be configured with threshold: 0.5');
  });

  it('T-PI-5: app.js contains scroll-to or scrollIntoView for jump navigation', () => {
    const js = tryRead('app.js');
    if (js === null) return it.skip('app.js not yet created');
    const hasScrollTo = /scrollTo\s*\(|scrollIntoView\s*\(/.test(js);
    assert.ok(hasScrollTo, 'app.js must call scrollTo() or scrollIntoView() for jump navigation');
  });

  it('T-PI-6: CSS has a media query hiding or transforming the side rail below 768px', () => {
    const css = tryRead('style.css');
    assert.ok(css !== null, 'File not yet created: style.css');
    // Look for a max-width: 767px or max-width: 768px media query that affects the rail
    const mq768 = css.match(/@media[^{]*max-width\s*:\s*(?:767|768)px[^{]*\{([\s\S]*?)\}/g) || [];
    assert.ok(mq768.length > 0, 'A max-width 767/768px media query must exist in CSS');
    const railHidden = mq768.some(block =>
      /(?:progress|sidebar|rail)/.test(block) &&
      /display\s*:\s*none|visibility\s*:\s*hidden|transform\s*:|width\s*:\s*0/.test(block)
    );
    assert.ok(railHidden, 'The side rail must be hidden or transformed inside the 768px media query');
  });

  it('T-PI-7: Side rail markers are clickable anchor, button elements or have data-section attributes', () => {
    const html = tryRead('index.html');
    assert.ok(html !== null, 'File not yet created: index.html');
    const document = loadDOM(html);
    const rail = document.querySelector('[class*="progress"], [class*="sidebar"], [class*="rail"]');
    assert.ok(rail, 'Side rail element must exist');
    const clickable = rail.querySelectorAll('a[href], button, [data-section], [onclick]');
    assert.ok(clickable.length >= 8,
      `At least 8 clickable markers (a/button/data-section) must exist in the rail, found ${clickable.length}`);
  });

});
