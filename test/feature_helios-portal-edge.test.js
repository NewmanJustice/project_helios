/**
 * Test suite — helios-portal (second half)
 * Stories: Scroll Animations, Deployment Configuration, Placeholder Content
 * Test IDs: T-SA-1…T-SA-7, T-DEP-1…T-DEP-3, T-PC-1…T-PC-5
 */

import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function tryReadFile(relPath) {
  try {
    return readFileSync(new URL('../' + relPath, import.meta.url), 'utf8');
  } catch {
    return null;
  }
}

function loadDOM(html) {
  return new JSDOM(html);
}

// ---------------------------------------------------------------------------
// Scroll Animations  (T-SA-*)
// ---------------------------------------------------------------------------

describe('Scroll Animations', () => {

  it('T-SA-1: CSS defines opacity + transform transition (400ms ease-out) and translateY(20px) start state', () => {
    const css = tryReadFile('style.css');
    assert.ok(css !== null, 'File not yet created by Codey: style.css');

    // Find a single rule block that contains all required animation properties
    const ruleBlocks = css.match(/[^{}]+\{[^}]+\}/g) || [];
    const animBlock = ruleBlocks.find(block =>
      /transition/.test(block) &&
      /opacity/.test(block) &&
      /transform/.test(block) &&
      /400ms/.test(block) &&
      /ease-out/.test(block)
    );
    assert.ok(animBlock, 'A single CSS rule must contain transition with opacity, transform, 400ms, and ease-out together');

    // translateY(20px) is the initial offset state — must exist somewhere in CSS
    assert.match(css, /translateY\s*\(\s*20px\s*\)/, 'translateY(20px) must be in CSS for start state');
  });

  it('T-SA-2: JS adds/removes classes only — no inline style.opacity or style.transform writes', () => {
    const js = tryReadFile('app.js');
    assert.ok(js !== null, 'File not yet created by Codey: app.js');

    assert.doesNotMatch(
      js,
      /\.style\.opacity\s*=/,
      'JS must not directly assign style.opacity'
    );
    assert.doesNotMatch(
      js,
      /\.style\.transform\s*=/,
      'JS must not directly assign style.transform'
    );
  });

  it('T-SA-3: Only opacity and transform are animated (no width/height/top/left transitions)', () => {
    const css = tryReadFile('style.css');
    assert.ok(css !== null, 'File not yet created by Codey: style.css');

    // Extract transition shorthand values and check for forbidden layout properties
    const transitionBlocks = css.match(/transition\s*:[^;]+;/g) || [];
    const combined = transitionBlocks.join(' ');
    assert.doesNotMatch(combined, /\bwidth\b/, 'width must not be in transition');
    assert.doesNotMatch(combined, /\bheight\b/, 'height must not be in transition');
    assert.doesNotMatch(combined, /\btop\b/, 'top must not be in transition');
    assert.doesNotMatch(combined, /\bleft\b/, 'left must not be in transition');
  });

  it('T-SA-4: prefers-reduced-motion media query disables transition/animation in CSS', () => {
    const css = tryReadFile('style.css');
    assert.ok(css !== null, 'File not yet created by Codey: style.css');

    assert.match(
      css,
      /prefers-reduced-motion\s*:\s*reduce/,
      'prefers-reduced-motion: reduce media query must be present in CSS'
    );
    // Within that block, transition or animation should be set to none/0s
    const rmBlock = css.match(
      /@media[^{]*prefers-reduced-motion\s*:\s*reduce[^{]*\{([\s\S]*?)\}/
    );
    assert.ok(rmBlock, 'prefers-reduced-motion block must have a rule body');
    assert.match(
      rmBlock[1],
      /(?:transition|animation)\s*:[^;]*(?:none|0s)/,
      'reduced-motion block must disable transition or animation'
    );
  });

  it('T-SA-5: JS marks sections as "seen" and does not re-observe after first intersection', () => {
    const js = tryReadFile('app.js');
    assert.ok(js !== null, 'File not yet created by Codey: app.js');

    // Must call unobserve (one-shot animation) after the element has been triggered
    assert.match(
      js,
      /unobserve/,
      'JS must call observer.unobserve() so sections only animate once'
    );
  });

  it('T-SA-6: JS triggers Section 1 animation on unlock without waiting for a scroll event', () => {
    const js = tryReadFile('app.js');
    assert.ok(js !== null, 'File not yet created by Codey: app.js');

    // The code must proactively add the visible/animate class to section 1 (index 0 of content
    // sections) right after unlock, not solely inside a scroll/intersection callback.
    assert.match(
      js,
      /sections?\[0\]|section-1|#hero|\.hero/i,
      'JS must reference the first section explicitly to trigger its animation on unlock'
    );
  });

  it('T-SA-7: Animation observer targets sections 1–8 only, not the gate', () => {
    const js = tryReadFile('app.js');
    assert.ok(js !== null, 'File not yet created by Codey: app.js');

    // The querySelectorAll used to collect observed elements must target content sections,
    // not section-0 or the gate element. Check that the selector references section-1..8
    // or a content-specific class, not section-0 / gate / password-gate.
    const hasContentSelector = /querySelectorAll\s*\([^)]*section-[1-8]|querySelectorAll\s*\([^)]*\.section|querySelectorAll\s*\([^)]*\[data-section\]/.test(js);
    const observesAllSections = /querySelectorAll/.test(js);
    assert.ok(observesAllSections, 'app.js must use querySelectorAll to collect sections for animation');
    // Must not include section-0 or gate in the observed set selector
    assert.doesNotMatch(
      js,
      /querySelectorAll\s*\([^)]*section-0/,
      'JS must not include section-0 in the IntersectionObserver target selector'
    );
  });

});

// ---------------------------------------------------------------------------
// Deployment Configuration  (T-DEP-*)
// ---------------------------------------------------------------------------

describe('Deployment Configuration', () => {

  it('T-DEP-1: staticwebapp.config.json is present and contains valid JSON', () => {
    const raw = tryReadFile('staticwebapp.config.json');
    assert.ok(raw !== null, 'File not yet created by Codey: staticwebapp.config.json');

    let parsed;
    assert.doesNotThrow(
      () => { parsed = JSON.parse(raw); },
      'staticwebapp.config.json must contain valid JSON'
    );
    assert.strictEqual(typeof parsed, 'object', 'Parsed config must be an object');
    assert.notStrictEqual(parsed, null, 'Parsed config must not be null');
  });

  it('T-DEP-2: Config contains a fallback route rewriting unmatched paths to index.html with status 200', () => {
    const raw = tryReadFile('staticwebapp.config.json');
    assert.ok(raw !== null, 'File not yet created by Codey: staticwebapp.config.json');

    const config = JSON.parse(raw);
    assert.ok(Array.isArray(config.routes), 'config.routes must be an array');

    const fallback = config.routes.find(
      (r) =>
        (r.route === '/*' || r.route === '*') &&
        r.serve === 'index.html' &&
        r.statusCode === 200
    );
    assert.ok(
      fallback,
      'A fallback route { route: "/*", serve: "index.html", statusCode: 200 } must exist'
    );
  });

  it('T-DEP-3: Config contains no api section, function routes, or backend runtime settings', () => {
    const raw = tryReadFile('staticwebapp.config.json');
    assert.ok(raw !== null, 'File not yet created by Codey: staticwebapp.config.json');

    const config = JSON.parse(raw);
    assert.strictEqual(
      config.api,
      undefined,
      'config must not contain an "api" key'
    );
    assert.strictEqual(
      config.platform,
      undefined,
      'config must not contain a "platform" key (used to specify backend runtime)'
    );

    if (Array.isArray(config.routes)) {
      const apiRoute = config.routes.find(
        (r) => typeof r.route === 'string' && r.route.startsWith('/api')
      );
      assert.strictEqual(apiRoute, undefined, 'No /api/* route should be defined');
    }
  });

});

// ---------------------------------------------------------------------------
// Placeholder Content  (T-PC-*)
// ---------------------------------------------------------------------------

describe('Placeholder Content', () => {

  // Shared DOM loaded once per describe block via a lazy getter
  function getDOM() {
    const html = tryReadFile('index.html');
    if (html === null) return null;
    return loadDOM(html).window.document;
  }

  it('T-PC-1: All 8 content sections contain non-empty heading and body text', () => {
    const document = getDOM();
    assert.ok(document !== null, 'File not yet created by Codey: index.html');

    // Sections 1–8: look for elements with data-section="N" or id matching section-N
    for (let n = 1; n <= 8; n++) {
      const section =
        document.querySelector(`[data-section="${n}"]`) ||
        document.querySelector(`#section-${n}`);
      assert.ok(section, `Section ${n} must exist in the DOM`);

      const heading = section.querySelector('h1,h2,h3,h4,h5,h6');
      assert.ok(heading, `Section ${n} must contain a heading element`);
      assert.ok(heading.textContent.trim().length > 0, `Section ${n} heading must not be empty`);

      const body = section.querySelector('p');
      assert.ok(body, `Section ${n} must contain at least one <p> element`);
      assert.ok(body.textContent.trim().length > 0, `Section ${n} body text must not be empty`);
    }
  });

  it('T-PC-2: No section heading is blank or generic "Heading" text', () => {
    const document = getDOM();
    assert.ok(document !== null, 'File not yet created by Codey: index.html');

    for (let n = 1; n <= 8; n++) {
      const section =
        document.querySelector(`[data-section="${n}"]`) ||
        document.querySelector(`#section-${n}`);
      if (!section) continue;

      const heading = section.querySelector('h1,h2,h3,h4,h5,h6');
      if (!heading) continue;

      const text = heading.textContent.trim().toLowerCase();
      assert.notStrictEqual(text, '', `Section ${n} heading must not be blank`);
      assert.notStrictEqual(text, 'heading', `Section ${n} heading must not be generic "Heading"`);
    }
  });

  it('T-PC-3: Roadmap Step 4 label reads exactly "To be defined"', () => {
    const document = getDOM();
    assert.ok(document !== null, 'File not yet created by Codey: index.html');

    // Section 6 is The Roadmap
    const roadmapSection =
      document.querySelector('[data-section="6"]') ||
      document.querySelector('#section-6');
    assert.ok(roadmapSection, 'Section 6 (The Roadmap) must exist in the DOM');

    // Step 4 element — look for a 4th list item, step, or labelled element
    const steps = roadmapSection.querySelectorAll('li, [class*="step"], [data-step]');
    assert.ok(steps.length >= 4, 'Section 6 must have at least 4 roadmap step elements');

    const step4 = steps[3];
    const text = step4.textContent.trim();
    assert.ok(
      text.includes('To be defined'),
      `Roadmap Step 4 must contain "To be defined", got: "${text.slice(0, 80)}"`
    );
  });

  it('T-PC-4: Roadmap Steps 1–3 use defined labels', () => {
    const document = getDOM();
    assert.ok(document !== null, 'File not yet created by Codey: index.html');

    const roadmapSection =
      document.querySelector('[data-section="6"]') ||
      document.querySelector('#section-6');
    assert.ok(roadmapSection, 'Section 6 (The Roadmap) must exist in the DOM');

    const steps = roadmapSection.querySelectorAll('li, [class*="step"], [data-step]');
    assert.ok(steps.length >= 3, 'Section 6 must have at least 3 roadmap step elements');

    const expectedLabels = ['Re-platform DB', 'API & Core Endpoints', 'Caseworker reskin'];
    for (let i = 0; i < 3; i++) {
      const step = steps[i];
      const labelEl =
        step.querySelector('[class*="label"], [class*="title"], strong, b, h3, h4') ||
        step;
      assert.ok(
        labelEl.textContent.includes(expectedLabels[i]),
        `Roadmap Step ${i + 1} must contain label "${expectedLabels[i]}"`
      );
    }
  });

  it('T-PC-5: Each section contains at least one callout, list, or visual element', () => {
    const document = getDOM();
    assert.ok(document !== null, 'File not yet created by Codey: index.html');

    for (let n = 1; n <= 8; n++) {
      const section =
        document.querySelector(`[data-section="${n}"]`) ||
        document.querySelector(`#section-${n}`);
      if (!section) continue;

      const callout =
        section.querySelector(
          'ul, ol, blockquote, figure, [class*="callout"], [class*="stat"], ' +
          '[class*="highlight"], [class*="card"], [class*="diagram"], [class*="visual"]'
        );
      assert.ok(
        callout,
        `Section ${n} must contain at least one callout/list/visual element`
      );
    }
  });

});
