'use client';

import { ArrowRight, CalendarDays, MapPin, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { nextMenuState } from './workshop-behavior.mjs';
import {
  advisers,
  cfpTopics,
  importantDates,
  organizers,
  researchQuestions,
  schedule,
  submissionPolicy,
  studentOrganizers,
  workshop,
} from './workshop-data.mjs';

const primaryLinks = [
  { href: '#about', label: 'Overview' },
  { href: '#cfp', label: 'CFP' },
  { href: '#dates', label: 'Dates' },
  { href: '#schedule', label: 'Program' },
  { href: '#organizers', label: 'People' },
];

type Person = {
  name: string;
  affiliation: string;
  role: string;
  image?: string;
  imageAvailable?: boolean;
};

const initials = (name: string) =>
  name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

function PersonCard({ person, showRole = true }: { person: Person; showRole?: boolean }) {
  return (
    <article className="person-card">
      <div className="person-portrait">
        {person.imageAvailable && person.image ? (
          <Image src={person.image} alt={`Portrait of ${person.name}`} fill sizes="(max-width: 640px) 42vw, 180px" />
        ) : (
          <span aria-label={`Portrait placeholder for ${person.name}`}>{initials(person.name)}</span>
        )}
      </div>
      <div className="person-copy">
        <h3>{person.name}</h3>
        <p>{person.affiliation}</p>
        {showRole ? <small>{person.role}</small> : null}
      </div>
    </article>
  );
}

const scheduleRows = schedule.map((item, index) => ({
  ...item,
  session: index < 6 ? 'morning' : 'afternoon',
}));

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const deadline = importantDates[0];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(nextMenuState(menuOpen, 'close'));
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen((open) => nextMenuState(open, 'close'));

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="site-header">
        <a className="site-name" href="#top"><span aria-hidden="true">AUT</span><span>Agents Under Threat</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="mobile-controls">
          <a href="#cfp">CFP</a>
          <button ref={menuButtonRef} className="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => nextMenuState(open, 'toggle'))}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          {primaryLinks.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
          <a href={`mailto:${workshop.contact}`} onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="editorial-shell hero-layout">
            <aside className="hero-folio" aria-label="Conference details">
              <span>AAAI-27</span><span aria-hidden="true" className="folio-rule" /><span>2027</span><span aria-hidden="true" className="folio-rule" /><span>Montréal</span>
            </aside>
            <div className="hero-copy">
              <p className="section-kicker">AAAI-27 Workshop</p>
              <h1 id="hero-title">LLM Agents Under Threat in Cyberspace</h1>
              <p className="hero-deck">Attacks, defenses, and evaluation for deployed language-model agents.</p>
              <div className="event-meta" aria-label="Workshop date and format">
                <p><CalendarDays aria-hidden="true" /><span><strong>{workshop.date}</strong><small>{workshop.location}</small></span></p>
                <p><MapPin aria-hidden="true" /><span><strong>{workshop.format}</strong><small>Montréal · Canada</small></span></p>
              </div>
              <div className="deadline-panel">
                <div><span>{deadline.label}</span><strong>{deadline.value}</strong><small>{deadline.note}</small></div>
                <a href="#cfp">Read the Call for Papers <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
            <figure className="hero-artwork">
              <Image src="/agent-threat-surface.png" alt="Abstract layered system diagram showing an adversarial path crossing agent inputs, tools, memory, and actions" fill priority sizes="(max-width: 760px) 100vw, 50vw" />
              <figcaption><span>Inputs</span><span>Tools</span><span>Memory</span><span>Actions</span></figcaption>
            </figure>
          </div>
        </section>

        <div className="editorial-shell">
          <section className="status-strip" id="news" aria-labelledby="news-title">
            <h2 id="news-title">Latest</h2>
            <p><time dateTime="2026-10">October 2026</time> · LLM Agents Under Threat in Cyberspace has been accepted for AAAI-27.</p>
          </section>

          <section className="content-section about-section" id="about" aria-labelledby="about-title">
            <div className="section-heading"><p className="section-kicker">01 / Research focus</p><h2 id="about-title">The threat surface</h2></div>
            <div className="about-intro">
              <p className="lead">{workshop.summary}</p>
              <div><p>LLM agents increasingly observe, remember, plan, coordinate, and act through external tools. These capabilities create attack surfaces across input channels, tool use, memory, identity, and multi-agent communication.</p><p>This workshop brings together researchers and practitioners working on realistic attacks, evaluations, secure agent architectures, and responsible defenses for agents operating in adversarial environments.</p></div>
            </div>
            <div className="research-questions">
              {researchQuestions.map((question) => <article key={question.index}><p><span>{question.index}</span><small>{question.tag}</small></p><h3>{question.title}</h3><p>{question.text}</p></article>)}
            </div>
          </section>

          <section className="content-section cfp-section" id="cfp" aria-labelledby="cfp-title">
            <div className="section-heading"><p className="section-kicker">02 / Call for Papers</p><h2 id="cfp-title">Research at the agent boundary</h2></div>
            <div className="cfp-intro">
              <p>LLM Agents Under Threat in Cyberspace invites submissions from researchers and practitioners studying how autonomous LLM agents behave when their observations, memories, tools, identities, and collaborators may be adversarial or compromised. As agents gain the ability to browse the web, execute code, call APIs, use credentials, access external services, and coordinate with other agents, traditional language-model vulnerabilities can become concrete security failures with consequences beyond the model interface.</p>
              <p>The workshop connects research on attacks, defenses, evaluation, and secure system design. We welcome empirical studies, new benchmarks, red-teaming methods, secure architectures, position papers, datasets, and lessons from deployed systems. We are especially interested in work that develops realistic threat models, evaluates end-to-end agent behavior, and proposes defenses that remain effective against adaptive attackers.</p>
            </div>
            <p className="scope-label">Topics include, but are not limited to</p>
            <ol className="topic-index">{cfpTopics.map((topic) => <li key={topic.number}><span>{topic.number}</span><div><h3>{topic.title}</h3><p>{topic.text}</p></div></li>)}</ol>
          </section>

          <section className="content-section dates-section" id="dates" aria-labelledby="dates-title">
            <div className="section-heading compact-heading"><p className="section-kicker">03 / Milestones</p><h2 id="dates-title">Important dates</h2></div>
            <ol className="date-rail">{importantDates.map((date, index) => <li key={date.label} className={index === 0 ? 'primary-date' : undefined}><span>0{index + 1}</span><small>{date.label}</small><strong>{date.value}</strong><p>{date.note}</p></li>)}</ol>
          </section>

          <section className="content-section guidelines-section" id="submissions" aria-labelledby="submissions-title">
            <div className="section-heading"><p className="section-kicker">04 / Submissions</p><h2 id="submissions-title">Submission guidelines</h2></div>
            <div className="submission-status"><span>Status</span><p>{submissionPolicy.destination}</p></div>
            <dl className="guideline-grid">
              <div><dt>Length</dt><dd>{submissionPolicy.format}</dd></div><div><dt>Format</dt><dd>{submissionPolicy.style}</dd></div><div><dt>Review</dt><dd>{submissionPolicy.review}</dd></div><div><dt>Publication</dt><dd>{submissionPolicy.publication}</dd></div><div><dt>Responsible disclosure</dt><dd>{submissionPolicy.disclosure}</dd></div>
            </dl>
          </section>

          <section className="content-section schedule-section" id="schedule" aria-labelledby="schedule-title">
            <div className="section-heading compact-heading"><p className="section-kicker">05 / Program</p><h2 id="schedule-title">Workshop schedule</h2><p className="section-note">All times are local.</p></div>
            <div className="schedule-table-wrapper"><table className="schedule-table"><thead className="sr-only"><tr><th scope="col">Time</th><th scope="col">Activity</th></tr></thead><tbody>
              <tr className="session-heading"><th scope="rowgroup" colSpan={2}>Morning Session</th></tr>
              {scheduleRows.filter((item) => item.session === 'morning').map((item) => <tr key={item.time}><th scope="row"><time>{item.time}</time></th><td><strong>{item.title}</strong><small>{item.type}</small></td></tr>)}
              <tr className="session-heading"><th scope="rowgroup" colSpan={2}>Afternoon Session</th></tr>
              {scheduleRows.filter((item) => item.session === 'afternoon').map((item) => <tr key={item.time}><th scope="row"><time>{item.time}</time></th><td><strong>{item.title}</strong><small>{item.type}</small></td></tr>)}
            </tbody></table></div>
          </section>

          <section className="content-section people-section" id="organizers" aria-labelledby="organizers-title"><div className="section-heading compact-heading"><p className="section-kicker">06 / People</p><h2 id="organizers-title">Workshop organizers</h2></div><div className="people-grid organizers-grid">{organizers.map((person) => <PersonCard key={person.name} person={person} />)}</div></section>
          <section className="content-section people-section advisory-section" id="advisers" aria-labelledby="advisers-title"><div className="section-heading compact-heading"><p className="section-kicker">Advisory</p><h2 id="advisers-title">Advisory board</h2></div><div className="people-grid people-grid-secondary">{advisers.map((person) => <PersonCard key={person.name} person={person} showRole={false} />)}</div></section>
          <section className="content-section people-section student-section" id="student-organizers" aria-labelledby="student-organizers-title"><div className="section-heading compact-heading"><p className="section-kicker">Student team</p><h2 id="student-organizers-title">Student organizers</h2></div><div className="people-grid people-grid-secondary student-grid">{studentOrganizers.map((person) => <PersonCard key={person.name} person={person} showRole={false} />)}</div></section>

          <section className="contact-section" id="contact" aria-labelledby="contact-title"><p className="section-kicker">Contact</p><h2 id="contact-title">Questions about scope or fit?</h2><a href={`mailto:${workshop.contact}`}>{workshop.contact}<ArrowRight aria-hidden="true" /></a></section>
        </div>
      </main>

      <footer className="site-footer editorial-shell"><p>{workshop.title}</p><p>{workshop.status} · {workshop.location}</p></footer>
    </>
  );
}
