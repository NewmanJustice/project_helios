'use client';

import { useEffect, useRef, useState } from 'react';

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

      el.classList.add('visible');

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

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
            {id} — {title}
          </a>
        ))}
      </nav>

      <section id="section-1" data-section="1" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">Project Helios</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <ul className="callout-list">
            <li>Transformational digital initiative for caseworker operations</li>
            <li>Modernising legacy infrastructure across all departments</li>
            <li>Delivering measurable outcomes for citizens and staff</li>
          </ul>
        </div>
      </section>

      <section id="section-2" data-section="2" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Problem</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi.</p>
          <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
          <blockquote className="callout">
            <p>"The current system is a patchwork of legacy applications that cannot scale to meet modern demands. Every day we delay costs the organisation time, money, and public trust."</p>
          </blockquote>
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
