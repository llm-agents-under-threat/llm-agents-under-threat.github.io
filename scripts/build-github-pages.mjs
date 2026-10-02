import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  advisers,
  cfpTopics,
  importantDates,
  organizers,
  schedule,
  speakers,
  submissionPolicy,
  workshop,
} from '../app/workshop-data.mjs';
import { escapeHtml } from '../app/workshop-render.mjs';

const outputDirectory = resolve(process.argv[2] ?? 'dist-pages');
const projectRoot = resolve(import.meta.dirname, '..');

const initials = (name) =>
  name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const portraitMarkup = (person) => person.imageAvailable && person.image
  ? `<img src=".${escapeHtml(person.image)}" alt="Portrait of ${escapeHtml(person.name)}">`
  : `<span aria-label="Portrait placeholder for ${escapeHtml(person.name)}">${escapeHtml(initials(person.name))}</span>`;

const peopleMarkup = (records) => records.map((person) => `
  <article class="person-card">
    <div class="person-portrait">${portraitMarkup(person)}</div>
    <h3>${escapeHtml(person.name)}</h3>
    <p>${escapeHtml(person.affiliation)}</p>
    <small>${escapeHtml(person.role)}</small>
  </article>`).join('');

const scheduleRows = schedule.map((item, index) => ({
  ...item,
  session: index < 6 ? 'morning' : 'afternoon',
}));

const scheduleMarkup = (session) => scheduleRows
  .filter((item) => item.session === session)
  .map((item) => `<tr><th scope="row"><time>${escapeHtml(item.time)}</time></th><td>${escapeHtml(item.title)} <small>(${escapeHtml(item.type)})</small></td></tr>`)
  .join('');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(workshop.title)} · ${escapeHtml(workshop.status)}</title>
  <meta name="description" content="Call for papers for the AAAI-27 workshop on adversarial threats and defenses for LLM agents.">
  <link rel="icon" href="./favicon.svg">
  <link rel="stylesheet" href="./styles.css">
  <script src="./menu.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header class="site-header">
    <a class="site-name" href="#top">Agents Under Threat Workshop</a>
    <nav class="desktop-nav" aria-label="Primary navigation">
      <a href="#about">About</a><a href="#cfp">Call for Papers</a><a href="#schedule">Schedule</a><a href="#speakers">Speakers</a><a href="#organizers">Organizers</a>
    </nav>
    <div class="mobile-controls">
      <a href="#about">About</a>
      <button class="menu-button" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-navigation"><span data-menu-icon aria-hidden="true">☰</span></button>
    </div>
    <nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation" hidden>
      <a href="#about">About</a><a href="#cfp">Call for Papers</a><a href="#schedule">Schedule</a><a href="#speakers">Speakers</a><a href="#organizers">Organizers</a><a href="mailto:${escapeHtml(workshop.contact)}">Contact</a>
    </nav>
  </header>

  <main id="main-content">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <img class="hero-image" src="./hero-montreal.jpg" alt="Panoramic view of Montréal and the Saint Lawrence River">
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="hero-content">
        <p class="workshop-status">${escapeHtml(workshop.status)}</p>
        <h1 id="hero-title">LLM Agents Under Threat in Cyberspace</h1>
        <p>AAAI-27 · ${escapeHtml(workshop.date)}</p>
        <p>${escapeHtml(workshop.location)} · ${escapeHtml(workshop.format)}</p>
        <p class="hero-contact">Contact: <a href="mailto:${escapeHtml(workshop.contact)}">${escapeHtml(workshop.contact)}</a></p>
      </div>
      <p class="hero-credit">Photo: Arild Vågen · CC BY-SA 4.0</p>
    </section>

    <div class="reading-column">
      <section class="content-section news-section" id="news" aria-labelledby="news-title">
        <h2 id="news-title">News</h2>
        <ul class="news-list"><li><strong>[October 2026]</strong> LLM Agents Under Threat in Cyberspace has been accepted for AAAI-27.</li></ul>
      </section>

      <section class="content-section" id="about" aria-labelledby="about-title">
        <h2 id="about-title">About</h2>
        <p>${escapeHtml(workshop.summary)}</p>
        <p>LLM agents increasingly observe, remember, plan, coordinate, and act through external tools. These capabilities create attack surfaces across input channels, tool use, memory, identity, and multi-agent communication.</p>
        <p>This workshop brings together researchers and practitioners working on realistic attacks, evaluations, secure agent architectures, and responsible defenses for agents operating in adversarial environments.</p>
      </section>

      <section class="content-section" id="cfp" aria-labelledby="cfp-title">
        <h2 id="cfp-title">Call for Papers</h2>
        <p>LLM Agents Under Threat in Cyberspace invites submissions from researchers and practitioners studying how autonomous LLM agents behave when their observations, memories, tools, identities, and collaborators may be adversarial or compromised. As agents gain the ability to browse the web, execute code, call APIs, use credentials, access external services, and coordinate with other agents, traditional language-model vulnerabilities can become concrete security failures with consequences beyond the model interface.</p>
        <p>The workshop connects research on attacks, defenses, evaluation, and secure system design. We welcome empirical studies, new benchmarks, red-teaming methods, secure architectures, position papers, datasets, and lessons from deployed systems. We are especially interested in work that develops realistic threat models, evaluates end-to-end agent behavior, and proposes defenses that remain effective against adaptive attackers.</p>
        <p>Topics include, but are not limited to:</p>
        <ul class="topic-list-simple">${cfpTopics.map((topic) => `<li><strong>${escapeHtml(topic.title)}.</strong> ${escapeHtml(topic.text)}</li>`).join('')}</ul>
      </section>

      <section class="content-section" id="dates" aria-labelledby="dates-title">
        <h2 id="dates-title">Important Dates</h2>
        <ul class="date-list">${importantDates.map((date) => `<li><strong>${escapeHtml(date.label)}:</strong><span>${escapeHtml(date.value)}</span><small>${escapeHtml(date.note)}</small></li>`).join('')}</ul>
      </section>

      <section class="content-section" id="submissions" aria-labelledby="submissions-title">
        <h2 id="submissions-title">Submission Guidelines</h2>
        <p><strong>Status:</strong> ${escapeHtml(submissionPolicy.destination)}</p>
        <ul class="guideline-list">
          <li><strong>Length:</strong> ${escapeHtml(submissionPolicy.format)}</li>
          <li><strong>Format:</strong> ${escapeHtml(submissionPolicy.style)}</li>
          <li><strong>Review:</strong> ${escapeHtml(submissionPolicy.review)}</li>
          <li><strong>Publication:</strong> ${escapeHtml(submissionPolicy.publication)}</li>
          <li><strong>Responsible disclosure:</strong> ${escapeHtml(submissionPolicy.disclosure)}</li>
        </ul>
      </section>

      <section class="content-section" id="schedule" aria-labelledby="schedule-title">
        <h2 id="schedule-title">Schedule</h2>
        <p class="section-note">All times are local.</p>
        <div class="schedule-table-wrapper">
          <table class="schedule-table">
            <thead class="sr-only"><tr><th scope="col">Time</th><th scope="col">Activity</th></tr></thead>
            <tbody>
              <tr class="session-heading"><th scope="rowgroup" colspan="2">Morning Session</th></tr>${scheduleMarkup('morning')}
              <tr class="session-heading"><th scope="rowgroup" colspan="2">Afternoon Session</th></tr>${scheduleMarkup('afternoon')}
            </tbody>
          </table>
        </div>
      </section>

      <section class="content-section people-section" id="speakers" aria-labelledby="speakers-title">
        <h2 id="speakers-title">Invited Speakers</h2>
        <div class="people-grid">${peopleMarkup(speakers)}</div>
      </section>

      <section class="content-section people-section" id="organizers" aria-labelledby="organizers-title">
        <h2 id="organizers-title">Workshop Organizers</h2>
        <div class="people-grid">${peopleMarkup(organizers)}</div>
      </section>

      <section class="content-section" id="advisers" aria-labelledby="advisers-title">
        <h2 id="advisers-title">Advisory Board</h2>
        <div class="adviser-grid">${advisers.map((person) => `<article><h3>${escapeHtml(person.name)}</h3><p>${escapeHtml(person.affiliation)}</p></article>`).join('')}</div>
      </section>

      <section class="content-section contact-section" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <p>Questions about scope or fit can be sent to <a href="mailto:${escapeHtml(workshop.contact)}">${escapeHtml(workshop.contact)}</a>.</p>
      </section>
    </div>
  </main>

  <footer class="site-footer">
    <p>${escapeHtml(workshop.title)} · ${escapeHtml(workshop.status)}</p>
    <p>Montréal photograph by <a href="https://commons.wikimedia.org/wiki/File:Montreal_August_2017_01.jpg">Arild Vågen</a>, licensed <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</p>
  </footer>
</body>
</html>`;

const sourceStyles = await readFile(resolve(projectRoot, 'app/globals.css'), 'utf8');
const standaloneStyles = `
:root { --font-geist-sans: Arial, Helvetica, sans-serif; }
html { -webkit-text-size-adjust: 100%; }
body, h1, h2, h3, p { margin-block-start: 0; }
img { display: block; max-width: 100%; }
button { font: inherit; }
[hidden] { display: none !important; }
.menu-button [data-menu-icon] { font-size: 1.45rem; line-height: 1; }
${sourceStyles.replace(/^@import[^\n]*\n/gm, '')}`;

const menuScript = `const button = document.querySelector('.menu-button');
const navigation = document.querySelector('#mobile-navigation');
const icon = button?.querySelector('[data-menu-icon]');

function setMenu(open) {
  if (!button || !navigation) return;
  navigation.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  if (icon) icon.textContent = open ? '×' : '☰';
}

button?.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && button?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    button.focus();
  }
});
`;

await mkdir(outputDirectory, { recursive: true });
await mkdir(resolve(outputDirectory, 'people'), { recursive: true });
await Promise.all([
  writeFile(resolve(outputDirectory, 'index.html'), html),
  writeFile(resolve(outputDirectory, 'styles.css'), standaloneStyles),
  writeFile(resolve(outputDirectory, 'menu.js'), menuScript),
  copyFile(resolve(projectRoot, 'public/hero-montreal.jpg'), resolve(outputDirectory, 'hero-montreal.jpg')),
  copyFile(resolve(projectRoot, 'public/people/xinfeng-li.png'), resolve(outputDirectory, 'people/xinfeng-li.png')),
  copyFile(resolve(projectRoot, 'public/favicon.svg'), resolve(outputDirectory, 'favicon.svg')),
  writeFile(resolve(outputDirectory, '.nojekyll'), ''),
]);

console.log(outputDirectory);
