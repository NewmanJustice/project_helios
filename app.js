import { PASSWORD } from './config.js';

// ---------------------------------------------------------------------------
// Element references
// ---------------------------------------------------------------------------

const gate      = document.getElementById('section-0');
const gateForm  = document.getElementById('gate-form');
const gateInput = document.getElementById('gate-input');
const gateError = document.getElementById('gate-error');
const rail      = document.querySelector('.progress-rail');
const sections  = Array.from(document.querySelectorAll('[data-section]'));

// ---------------------------------------------------------------------------
// Scroll animation — IntersectionObserver
// ---------------------------------------------------------------------------

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function observeSections() {
  sections.forEach((section) => observer.observe(section));
}

// ---------------------------------------------------------------------------
// Jump navigation — rail anchor clicks
// ---------------------------------------------------------------------------

function initRailNavigation() {
  rail.querySelectorAll('a[href]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = anchor.getAttribute('href').replace('#', '');
      const target   = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Unlock — show content sections and trigger section-1 animation
// ---------------------------------------------------------------------------

function unlock() {
  gate.classList.add('hidden');

  sections.forEach((section) => section.classList.remove('hidden'));
  rail.classList.remove('hidden');

  // Trigger section-1 animation immediately without waiting for scroll
  sections[0].classList.add('visible');

  observeSections();
  initRailNavigation();
}

// ---------------------------------------------------------------------------
// Password gate — form submit handler (covers Enter key + button click)
// ---------------------------------------------------------------------------

gateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const attempt = gateInput.value.trim();

  if (attempt === PASSWORD) {
    gateError.classList.remove('visible');
    gateError.textContent = '';
    unlock();
  } else {
    gateError.textContent = 'Incorrect access code. Please try again.';
    gateError.classList.add('visible');
    gateInput.value = '';
    gateInput.focus();
  }
});
