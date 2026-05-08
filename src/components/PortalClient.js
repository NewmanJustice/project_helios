'use client';

import { useEffect, useRef, useState } from 'react';
import { animateSection } from '@/lib/animations';
import { initSectionBackgrounds } from '@/lib/sectionBackgrounds';

const SECTIONS = [
  { id: 1, title: 'Project Helios' },
  { id: 2, title: 'The Problem' },
  { id: 3, title: 'The Vision' },
  { id: 4, title: 'The Core Concept' },
  { id: 5, title: 'What This Means' },
  { id: 6, title: 'The Architecture' },
  { id: 7, title: 'The Roadmap' },
  // { id: 8, title: 'Next Steps' },
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

    const diagram = document.getElementById('arch-diagram');
    if (diagram) {
      const diagObs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            diagram.classList.add('is-visible');
            diagObs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      diagObs.observe(diagram);
      observers.push(diagObs);
    }

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
          <p>The vision for Helios is Civil Core — a central, product driven, extensible technical platform built around the shared concerns of the Civil jurisdiction. Not a monolith, and not another point solution: a coherent foundation that every future Civil programme can build on, extend, and rely on.</p>
          <p>With Civil Core in place, the Civil jurisdiction would be fully digitised and operationally coherent. Case data would flow through a single, authoritative platform — making holistic reporting across case types possible for the first time, and giving decision-makers an accurate, real-time picture of the estate.</p>
          <p>Operational staff would have the tools they actually need: modern, integrated interfaces built on reliable data rather than workarounds. And new programmes would inherit a working foundation rather than starting from scratch — meaning delivery gets faster and cheaper, not slower and more expensive, as the jurisdiction grows.</p>
          <div className="callout">
            <p>Civil Core is not just a technical upgrade. It is the infrastructure for a jurisdiction that works — for the people it serves, and the people who run it.</p>
          </div>
        </div>
      </section>

      <section id="section-4" data-section="4" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Core Concept</h2>
          <p>Civil Core starts with a simple but important insight: the knowledge we need already exists. Caseman — the system that has managed Civil cases for years — contains a wealth of domain understanding built up over decades. What has changed is our ability to interrogate it. Using agentic AI tooling, we have been able to analyse Caseman's inner workings in greater depth and precision than was previously possible — extracting the concepts and building blocks that genuinely matter.</p>
          <p>Civil Core takes those building blocks and reengineers them into two components: a Civil Core database, and a Civil Core API. The database is the single, authoritative store of Civil case data — parties, claims, orders, enforcements, applications, judgements — held once and shared across the jurisdiction. The API is the interface through which products read and write that data, consistently and reliably.</p>
          <p>What Civil Core does not do is equally important. It has no user interface — that is for products to build. It carries no logic specific to individual case types — the rules and workflows that distinguish Money Claims from Probate from any other service stay in the products that serve those needs. Civil Core provides the foundation. Everything built on top of it inherits that foundation without having to recreate it.</p>
          <div className="callout">
            <p>Parties held once. Cases recorded once. A single API through which the whole jurisdiction operates.</p>
          </div>
          <video src="/casemancoreapi.mp4" controls playsInline className="section-video" />
        </div>
      </section>

      <section id="section-5" data-section="5" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">What This Means</h2>
          <p>Civil Core represents a clear answer to a question that has shaped Civil programme planning for years: how do we build services that work together, rather than alongside each other? For the first time, there is a defined direction of travel — a technical strategy grounded in the Civil jurisdiction's actual needs, not a product-by-product response to immediate demand.</p>
          <p>That clarity has direct implications for how current and future work is planned and sequenced. Programmes already in flight will need to consider how they align to Civil Core — and where appropriate, phase their work to take advantage of the foundation rather than duplicate it.</p>
          <div className="outcome-grid">
            <div className="outcome-card">
              <div className="outcome-label">Faster delivery</div>
              <p>New services inherit Civil Core rather than rebuilding from scratch. Delivery teams start from a working foundation, not a blank page.</p>
            </div>
            <div className="outcome-card">
              <div className="outcome-label">Better reporting</div>
              <p>A single authoritative data source makes holistic reporting across Civil case types possible for the first time.</p>
            </div>
            <div className="outcome-card">
              <div className="outcome-label">Consistent development</div>
              <p>A shared API and data model means teams work to a common pattern — less duplication, fewer integration problems, lower cost.</p>
            </div>
            <div className="outcome-card">
              <div className="outcome-label">Extensible by design</div>
              <p>New case types and digitisation programmes plug in to Civil Core rather than standing up new infrastructure each time.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="section-6" data-section="6" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Product Architecture</h2>
          <p>Civil Core sits at the centre of the Civil technical landscape. Products — whether they serve judges, citizens, caseworkers, or legal professionals — connect to a single API layer. That API layer reads and writes from a single authoritative database. One source of truth, consistently accessed.</p>
          <div className="arch-diagram" id="arch-diagram">
            <svg className="arch-svg" viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg">

              {/* --- DB box (delay 0) --- */}
              <g data-delay="0" style={{transform: 'translateY(8px)'}}>
                <rect x="200" y="316" width="200" height="52" rx="6" fill="rgba(245,166,35,0.12)" stroke="#F5A623" strokeWidth="1.5" />
                <text x="300" y="337" textAnchor="middle" fill="#F5A623" fontFamily="Sora,sans-serif" fontWeight="700" fontSize="11" letterSpacing="0.08em" textDecoration="none">CIVIL CORE DB</text>
                <text x="300" y="356" textAnchor="middle" fill="rgba(245,166,35,0.6)" fontFamily="Inter,sans-serif" fontSize="9.5">Caseman schema · re-platformed</text>
              </g>

              {/* --- DB → API line (delay 1) --- */}
              <line data-delay="1" x1="300" y1="316" x2="300" y2="266" stroke="#F5A623" strokeWidth="1.5" strokeDasharray="50" strokeDashoffset="50" />

              {/* --- API box (delay 2) --- */}
              <g data-delay="2" style={{transform: 'translateY(8px)'}}>
                <rect x="100" y="190" width="400" height="76" rx="6" fill="#0d1e35" stroke="rgba(245,166,35,0.35)" strokeWidth="1.5" />
                <text x="300" y="212" textAnchor="middle" fill="#F5A623" fontFamily="Sora,sans-serif" fontWeight="700" fontSize="11" letterSpacing="0.08em">CIVIL CORE API</text>
                {/* endpoint pills */}
                {['Parties','Claims','Orders','Judgements','Enforcements','Applications'].map((label, i) => {
                  const pillW = 82; const gap = 8;
                  const totalW = 3 * pillW + 2 * gap;
                  const col = i % 3; const row = Math.floor(i / 3);
                  const x = 300 - totalW / 2 + col * (pillW + gap);
                  const y = 222 + row * 22;
                  return (
                    <g key={label}>
                      <rect x={x} y={y} width={pillW} height="16" rx="3" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                      <text x={x + pillW / 2} y={y + 11} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontFamily="Inter,sans-serif" fontSize="8.5">{label}</text>
                    </g>
                  );
                })}
              </g>

              {/* --- API → fan stem (delay 3) --- */}
              <line data-delay="3" x1="300" y1="190" x2="300" y2="162" stroke="#F5A623" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="28" />

              {/* --- Fan lines to product tiles (delays 4–8) --- */}
              {[66, 174, 300, 426, 534].map((cx, i) => {
                const len = Math.hypot(cx - 300, 90);
                return <line key={i} data-delay={String(4 + i)} x1="300" y1="162" x2={cx} y2="100" stroke="rgba(245,166,35,0.5)" strokeWidth="1" strokeDasharray={len} strokeDashoffset={len} />;
              })}

              {/* --- Product tiles (delays 9–13) --- */}
              {[
                { cx: 66,  label: 'Judicial' },
                { cx: 174, label: 'Citizen' },
                { cx: 300, label: 'Caseworker' },
                { cx: 426, label: 'Professional' },
                { cx: 534, label: 'External API' },
              ].map(({ cx, label }, i) => (
                <g key={label} data-delay={String(9 + i)} style={{transform: 'translateY(8px)'}}>
                  <rect x={cx - 52} y="46" width="104" height="36" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  <text x={cx} y="69" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontFamily="Sora,sans-serif" fontWeight="600" fontSize="10">{label}</text>
                </g>
              ))}

            </svg>
          </div>
        </div>
      </section>

      <section id="section-7" data-section="7" className="animate-in">
        <div className="section-inner">
          <h2 className="section-heading">The Roadmap</h2>
          <p>Civil Core will be delivered in phases. Each phase builds on the last — establishing the foundation before building on top of it.</p>
          <ul className="roadmap-list">
            <li>
              <span className="step-number">1</span>
              <div><span className="roadmap-label">Re-platform the Civil Core DB</span><p>The starting point is the data. The Civil Core database re-platforms the Caseman schema onto a modern foundation — establishing the single authoritative store of Civil case data that everything else depends on.</p></div>
            </li>
            <li>
              <span className="step-number">2</span>
              <div><span className="roadmap-label">Build the Civil Core API</span><p>With the database in place, the Civil Core API exposes that data through a consistent, well-documented interface. This is the layer all products will build on — parties, claims, orders, judgements, enforcements, applications, all accessible through a single API.</p></div>
            </li>
            <li>
              <span className="step-number">3</span>
              <div><span className="roadmap-label">Caseworker</span><p>The first product to be built on Civil Core. A reskinned caseworker interface — modern, integrated, and built on reliable data rather than workarounds. Proof that the foundation works, and the first step toward a consistent experience for operational staff.</p></div>
            </li>
            <li>
              <span className="step-number">4</span>
              <div><span className="roadmap-label step-tbd">To be defined</span><p>Future phases will extend Civil Core to support further digitisation across the Civil jurisdiction — new case types, new services, new audiences. The scope will be defined once the foundation is in place and validated.</p></div>
            </li>
          </ul>
        </div>
      </section>

      {/* <section id="section-8" data-section="8" className="animate-in">
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
      </section> */}
    </>
  );
}
