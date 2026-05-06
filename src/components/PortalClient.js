'use client';

import { useEffect, useRef, useState } from 'react';
import { animateSection } from '@/lib/animations';
import { initSectionBackgrounds } from '@/lib/sectionBackgrounds';

const SECTIONS = [
  { id: 1, title: 'Project Helios' },
  { id: 2, title: 'The Problem' },
  { id: 3, title: 'The Vision' },
  { id: 4, title: 'The Core Concept' },
  { id: 5, title: 'The Architecture' },
  { id: 6, title: 'The Roadmap' },
  { id: 7, title: 'What This Means' },
  { id: 8, title: 'Next Steps' },
];

export default function PortalClient() {
  const [activeSection, setActiveSection] = useState(1);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observers = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(`section-${id}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
            if (!el.dataset.animated) {
              el.dataset.animated = 'true';
              animateSection(el);
            }
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    initSectionBackgrounds();

    // Animate section 1 immediately — it's already in the viewport
    const first = document.getElementById('section-1');
    if (first && !first.dataset.animated) {
      first.dataset.animated = 'true';
      animateSection(first);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function jumpTo(id) {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <nav className="progress-rail" aria-label="Section navigation">
        {SECTIONS.map(({ id, title }) => (
          <a
            key={id}
            href={`#section-${id}`}
            data-section={id}
            className={activeSection === id ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); jumpTo(id); }}
          >
            <span className="rail-dot" />
            {title}
          </a>
        ))}
      </nav>

      <section id="section-1" data-section="1" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">Project Helios</h2>
          <p className="section-tagline">Taking a fresh look at the technical landscape underpinning the Civil jurisdiction. To ensure what we build is coherent, maintainable, and driven by product thinking.</p>
          <p>The Civil jurisdiction processes hundreds of thousands of cases each year — from money claims to property disputes. The systems that support this work have grown incrementally over decades, shaped by individual programmes rather than a shared technical Civil focused vision.</p>
          <p>Project Helios steps back from that history. It takes a high-level view of the technical landscape and asks a fundamental question: are the solutions we have — and the solutions we are building — the right ones? And do they add up to something coherent, maintainable, and easily extendable?</p>
          <ul className="callout-list">
            <li>A clear-eyed assessment of the current technical estate</li>
            <li>A direction of travel grounded in product thinking and shared foundations</li>
            <li>A framework for making better, more joined-up decisions about what to build next</li>
          </ul>
        </div>
      </section>

      <section id="section-2" data-section="2" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Problem</h2>
          <p>The Civil jurisdiction is supported by a mix of legacy and reformed systems that do not share data. Each holds its own version of the truth — creating inconsistencies in reporting, and making it difficult to get a clear, reliable picture of case activity across the estate.</p>
          <p>As new digital services have been introduced, each has largely rebuilt core case management functionality in isolation. Rather than extending a shared foundation, they sit alongside it — producing a fragmented technical landscape and an inconsistent experience for the people who use and operate them.</p>
          <p>To keep things working, workarounds and tactical solutions have accumulated over time. These keep processes moving but introduce fragility. The result is a technical estate where adding new capability is slow, expensive, and invariably involves compromise.</p>
          <div className="callout">
            <p>The cost of building on what we have is no longer just technical. It is measured in slower delivery, reduced quality, and services that fall short of what users and the organisation needs.</p>
          </div>
        </div>
      </section>

      <section id="section-3" data-section="3" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Vision</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</p>
          <p>Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.</p>
          <div className="card highlight-card">
            <p>A unified, cloud-native platform that empowers caseworkers with real-time data, intelligent workflows, and a user experience designed for the demands of modern public service.</p>
          </div>
        </div>
      </section>

      <section id="section-4" data-section="4" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Core Concept</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Curabitur sodales ligula in libero.</p>
          <p>Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.</p>
          <ul className="callout-list">
            <li>Single source of truth for all case data</li>
            <li>Event-driven architecture enabling real-time updates</li>
            <li>Modular microservices for independent deployment cycles</li>
            <li>Role-based access control with full audit trail</li>
          </ul>
        </div>
      </section>

      <section id="section-5" data-section="5" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Architecture</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper.</p>
          <figure className="diagram architecture-diagram">
            <figcaption>High-level architecture: API Gateway → Core Services → Event Bus → Data Layer</figcaption>
            <ul className="diagram-list">
              <li><strong>API Gateway</strong> — centralised ingress, authentication and rate limiting</li>
              <li><strong>Core Services</strong> — domain-aligned services with independent deployments</li>
              <li><strong>Event Bus</strong> — asynchronous communication and audit logging</li>
              <li><strong>Data Layer</strong> — re-platformed database with read replicas</li>
            </ul>
          </figure>
        </div>
      </section>

      <section id="section-6" data-section="6" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Roadmap</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero.</p>
          <ul className="roadmap-list">
            <li>
              <span className="step-number">1</span>
              <div><span className="roadmap-label">Re-platform DB</span><p>Migrate the legacy database to a modern cloud-native data platform with full replication and disaster recovery.</p></div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div><span className="roadmap-label">API &amp; Core Endpoints</span><p>Build the foundational API layer and core service endpoints that all downstream consumers will depend on.</p></div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div><span className="roadmap-label">Caseworker reskin</span><p>Redesign the caseworker interface with the new design system, improving usability across all workflows.</p></div>
            </li>
            <li>
              <span className="step-number">4</span>
              <div><span className="roadmap-label step-tbd">To be defined</span><p>Future phases to be scoped following completion of the first three milestones and stakeholder review.</p></div>
            </li>
          </ul>
        </div>
      </section>

      <section id="section-7" data-section="7" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">What This Means</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.</p>
          <p>Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.</p>
          <div className="stat-grid">
            <div className="stat-card"><div className="stat-number">40%</div><p>reduction in case processing time</p></div>
            <div className="stat-card"><div className="stat-number">60%</div><p>fewer manual data entry errors</p></div>
            <div className="stat-card"><div className="stat-number">3×</div><p>improvement in system availability</p></div>
          </div>
        </div>
      </section>

      <section id="section-8" data-section="8" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">Next Steps</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.</p>
          <p>Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis.</p>
          <ol className="next-steps-list">
            <li>Schedule stakeholder review with senior leadership</li>
            <li>Confirm budget allocation and procurement timeline</li>
            <li>Stand up the programme delivery team</li>
            <li>Initiate discovery for Phase 1 database re-platform</li>
          </ol>
        </div>
      </section>
    </>
  );
}
