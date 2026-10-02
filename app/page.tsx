'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { nextMenuState } from './workshop-behavior.mjs';
import {
  advisers,
  cfpTopics,
  importantDates,
  organizers,
  schedule,
  speakers,
  submissionPolicy,
  workshop,
} from './workshop-data.mjs';

const primaryLinks = [
  { href: '#about', label: 'About' },
  { href: '#cfp', label: 'Call for Papers' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#speakers', label: 'Speakers' },
  { href: '#organizers', label: 'Organizers' },
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

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="person-card">
      <div className="person-portrait">
        {person.imageAvailable && person.image ? (
          <Image src={person.image} alt={`Portrait of ${person.name}`} fill sizes="(max-width: 640px) 42vw, 180px" />
        ) : (
          <span aria-label={`Portrait placeholder for ${person.name}`}>{initials(person.name)}</span>
        )}
      </div>
      <h3>{person.name}</h3>
      <p>{person.affiliation}</p>
      <small>{person.role}</small>
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
        <a className="site-name" href="#top">Agents Under Threat Workshop</a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="mobile-controls">
          <a href="#about">About</a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => nextMenuState(open, 'toggle'))}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          {primaryLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <a href={`mailto:${workshop.contact}`} onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image className="hero-image" src="/hero-montreal.jpg" alt="Panoramic view of Montréal and the Saint Lawrence River" fill priority sizes="100vw" />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-content">
            <p className="workshop-status">{workshop.status}</p>
            <h1 id="hero-title">LLM Agents Under Threat<br />in Cyberspace</h1>
            <p>AAAI-27 · {workshop.date}</p>
            <p>{workshop.location} · {workshop.format}</p>
            <p className="hero-contact">Contact: <a href={`mailto:${workshop.contact}`}>{workshop.contact}</a></p>
          </div>
          <p className="hero-credit">Photo: Arild Vågen · CC BY-SA 4.0</p>
        </section>

        <div className="reading-column">
          <section className="content-section news-section" id="news" aria-labelledby="news-title">
            <h2 id="news-title">News</h2>
            <ul className="news-list">
              <li><strong>[October 2026]</strong> LLM Agents Under Threat in Cyberspace has been accepted for AAAI-27.</li>
            </ul>
          </section>

          <section className="content-section" id="about" aria-labelledby="about-title">
            <h2 id="about-title">About</h2>
            <p>{workshop.summary}</p>
            <p>LLM agents increasingly observe, remember, plan, coordinate, and act through external tools. These capabilities create attack surfaces across input channels, tool use, memory, identity, and multi-agent communication.</p>
            <p>This workshop brings together researchers and practitioners working on realistic attacks, evaluations, secure agent architectures, and responsible defenses for agents operating in adversarial environments.</p>
          </section>

          <section className="content-section" id="cfp" aria-labelledby="cfp-title">
            <h2 id="cfp-title">Call for Papers</h2>
            <p>We invite technical, empirical, and position work on the security of LLM agents, including but not limited to:</p>
            <ul className="topic-list-simple">
              {cfpTopics.map((topic) => <li key={topic.number}><strong>{topic.title}.</strong> {topic.text}</li>)}
            </ul>
          </section>

          <section className="content-section" id="dates" aria-labelledby="dates-title">
            <h2 id="dates-title">Important Dates</h2>
            <ul className="date-list">
              {importantDates.map((date) => (
                <li key={date.label}>
                  <strong>{date.label}:</strong><span>{date.value}</span><small>{date.note}</small>
                </li>
              ))}
            </ul>
          </section>

          <section className="content-section" id="submissions" aria-labelledby="submissions-title">
            <h2 id="submissions-title">Submission Guidelines</h2>
            <p><strong>Status:</strong> {submissionPolicy.destination}</p>
            <ul className="guideline-list">
              <li><strong>Length:</strong> {submissionPolicy.format}</li>
              <li><strong>Format:</strong> {submissionPolicy.style}</li>
              <li><strong>Review:</strong> {submissionPolicy.review}</li>
              <li><strong>Publication:</strong> {submissionPolicy.publication}</li>
              <li><strong>Responsible disclosure:</strong> {submissionPolicy.disclosure}</li>
            </ul>
          </section>

          <section className="content-section" id="schedule" aria-labelledby="schedule-title">
            <h2 id="schedule-title">Schedule</h2>
            <p className="section-note">All times are local.</p>
            <div className="schedule-table-wrapper">
              <table className="schedule-table">
                <thead className="sr-only">
                  <tr><th scope="col">Time</th><th scope="col">Activity</th></tr>
                </thead>
                <tbody>
                  <tr className="session-heading"><th scope="rowgroup" colSpan={2}>Morning Session</th></tr>
                  {scheduleRows.filter((item) => item.session === 'morning').map((item) => (
                    <tr key={item.time}><th scope="row"><time>{item.time}</time></th><td>{item.title} <small>({item.type})</small></td></tr>
                  ))}
                  <tr className="session-heading"><th scope="rowgroup" colSpan={2}>Afternoon Session</th></tr>
                  {scheduleRows.filter((item) => item.session === 'afternoon').map((item) => (
                    <tr key={item.time}><th scope="row"><time>{item.time}</time></th><td>{item.title} <small>({item.type})</small></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="content-section people-section" id="speakers" aria-labelledby="speakers-title">
            <h2 id="speakers-title">Invited Speakers</h2>
            <div className="people-grid">{speakers.map((person) => <PersonCard key={person.name} person={person} />)}</div>
          </section>

          <section className="content-section people-section" id="organizers" aria-labelledby="organizers-title">
            <h2 id="organizers-title">Workshop Organizers</h2>
            <div className="people-grid">{organizers.map((person) => <PersonCard key={person.name} person={person} />)}</div>
          </section>

          <section className="content-section" id="advisers" aria-labelledby="advisers-title">
            <h2 id="advisers-title">Advisory Board</h2>
            <div className="adviser-grid">
              {advisers.map((person) => <article key={person.name}><h3>{person.name}</h3><p>{person.affiliation}</p></article>)}
            </div>
          </section>

          <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
            <h2 id="contact-title">Contact</h2>
            <p>Questions about scope or fit can be sent to <a href={`mailto:${workshop.contact}`}>{workshop.contact}</a>.</p>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <p>{workshop.title} · {workshop.status}</p>
        <p>Montréal photograph by <a href="https://commons.wikimedia.org/wiki/File:Montreal_August_2017_01.jpg">Arild Vågen</a>, licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</p>
      </footer>
    </>
  );
}
