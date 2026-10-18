import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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
} from '../app/workshop-data.mjs';
import { escapeHtml } from '../app/workshop-render.mjs';

const outputDirectory = resolve(process.argv[2] ?? 'dist-pages');
const projectRoot = resolve(import.meta.dirname, '..');
const deadline = importantDates[0];

const initials = (name) => name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

const portraitMarkup = (person) => person.imageAvailable && person.image
  ? `<img src=".${escapeHtml(person.image)}" alt="Portrait of ${escapeHtml(person.name)}">`
  : `<span aria-label="Portrait placeholder for ${escapeHtml(person.name)}">${escapeHtml(initials(person.name))}</span>`;

const peopleMarkup = (records, { showRoles = true } = {}) => records.map((person) => `
  <article class="person-card">
    <div class="person-portrait">${portraitMarkup(person)}</div>
    <div class="person-copy"><h3>${escapeHtml(person.name)}</h3><p>${escapeHtml(person.affiliation)}</p>${showRoles ? `<small>${escapeHtml(person.role)}</small>` : ''}</div>
  </article>`).join('');

const scheduleRows = schedule.map((item, index) => ({ ...item, session: index < 6 ? 'morning' : 'afternoon' }));
const scheduleMarkup = (session) => scheduleRows.filter((item) => item.session === session).map((item) => `<tr><th scope="row"><time>${escapeHtml(item.time)}</time></th><td><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.type)}</small></td></tr>`).join('');

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
    <a class="site-name" href="#top"><span aria-hidden="true">AUT</span><span>Agents Under Threat</span></a>
    <nav class="desktop-nav" aria-label="Primary navigation"><a href="#about">Overview</a><a href="#cfp">CFP</a><a href="#dates">Dates</a><a href="#schedule">Program</a><a href="#organizers">People</a></nav>
    <div class="mobile-controls"><a href="#cfp">CFP</a><button class="menu-button" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-navigation"><span data-menu-icon aria-hidden="true">☰</span></button></div>
    <nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation" hidden><a href="#about">Overview</a><a href="#cfp">CFP</a><a href="#dates">Dates</a><a href="#schedule">Program</a><a href="#organizers">People</a><a href="mailto:${escapeHtml(workshop.contact)}">Contact</a></nav>
  </header>

  <main id="main-content">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="editorial-shell hero-layout">
        <aside class="hero-folio" aria-label="Conference details"><span>AAAI-27</span><span aria-hidden="true" class="folio-rule"></span><span>2027</span><span aria-hidden="true" class="folio-rule"></span><span>Montréal</span></aside>
        <div class="hero-copy">
          <p class="section-kicker">AAAI-27 Workshop</p>
          <h1 id="hero-title">LLM Agents Under Threat in Cyberspace</h1>
          <p class="hero-deck">Attacks, defenses, and evaluation for deployed language-model agents.</p>
          <div class="event-meta" aria-label="Workshop date and format"><p><span class="meta-icon" aria-hidden="true">○</span><span><strong>${escapeHtml(workshop.date)}</strong><small>${escapeHtml(workshop.location)}</small></span></p><p><span class="meta-icon" aria-hidden="true">◇</span><span><strong>${escapeHtml(workshop.format)}</strong><small>Montréal · Canada</small></span></p></div>
          <div class="deadline-panel"><div><span>${escapeHtml(deadline.label)}</span><strong>${escapeHtml(deadline.value)}</strong><small>${escapeHtml(deadline.note)}</small></div><a href="#cfp">Read the Call for Papers <span aria-hidden="true">→</span></a></div>
        </div>
        <figure class="hero-artwork"><img src="./agent-threat-surface.png" alt="Abstract layered system diagram showing an adversarial path crossing agent inputs, tools, memory, and actions"><figcaption><span>Inputs</span><span>Tools</span><span>Memory</span><span>Actions</span></figcaption></figure>
      </div>
    </section>

    <div class="editorial-shell">
      <section class="status-strip" id="news" aria-labelledby="news-title"><h2 id="news-title">Latest</h2><p><time datetime="2026-10">October 2026</time> · LLM Agents Under Threat in Cyberspace has been accepted for AAAI-27.</p></section>

      <section class="content-section about-section" id="about" aria-labelledby="about-title">
        <div class="section-heading"><p class="section-kicker">01 / Research focus</p><h2 id="about-title">The threat surface</h2></div>
        <div class="about-intro"><p class="lead">${escapeHtml(workshop.summary)}</p><div><p>LLM agents increasingly observe, remember, plan, coordinate, and act through external tools. These capabilities create attack surfaces across input channels, tool use, memory, identity, and multi-agent communication.</p><p>This workshop brings together researchers and practitioners working on realistic attacks, evaluations, secure agent architectures, and responsible defenses for agents operating in adversarial environments.</p></div></div>
        <div class="research-questions">${researchQuestions.map((question) => `<article><p><span>${escapeHtml(question.index)}</span><small>${escapeHtml(question.tag)}</small></p><h3>${escapeHtml(question.title)}</h3><p>${escapeHtml(question.text)}</p></article>`).join('')}</div>
      </section>

      <section class="content-section cfp-section" id="cfp" aria-labelledby="cfp-title">
        <div class="section-heading"><p class="section-kicker">02 / Call for Papers</p><h2 id="cfp-title">Research at the agent boundary</h2></div>
        <div class="cfp-intro"><p>LLM Agents Under Threat in Cyberspace invites submissions from researchers and practitioners studying how autonomous LLM agents behave when their observations, memories, tools, identities, and collaborators may be adversarial or compromised. As agents gain the ability to browse the web, execute code, call APIs, use credentials, access external services, and coordinate with other agents, traditional language-model vulnerabilities can become concrete security failures with consequences beyond the model interface.</p><p>The workshop connects research on attacks, defenses, evaluation, and secure system design. We welcome empirical studies, new benchmarks, red-teaming methods, secure architectures, position papers, datasets, and lessons from deployed systems. We are especially interested in work that develops realistic threat models, evaluates end-to-end agent behavior, and proposes defenses that remain effective against adaptive attackers.</p></div>
        <p class="scope-label">Topics include, but are not limited to</p>
        <ol class="topic-index">${cfpTopics.map((topic) => `<li><span>${escapeHtml(topic.number)}</span><div><h3>${escapeHtml(topic.title)}</h3><p>${escapeHtml(topic.text)}</p></div></li>`).join('')}</ol>
      </section>

      <section class="content-section dates-section" id="dates" aria-labelledby="dates-title"><div class="section-heading compact-heading"><p class="section-kicker">03 / Milestones</p><h2 id="dates-title">Important dates</h2></div><ol class="date-rail">${importantDates.map((date, index) => `<li${index === 0 ? ' class="primary-date"' : ''}><span>0${index + 1}</span><small>${escapeHtml(date.label)}</small><strong>${escapeHtml(date.value)}</strong><p>${escapeHtml(date.note)}</p></li>`).join('')}</ol></section>

      <section class="content-section guidelines-section" id="submissions" aria-labelledby="submissions-title">
        <div class="section-heading"><p class="section-kicker">04 / Submissions</p><h2 id="submissions-title">Submission guidelines</h2></div>
        <div class="submission-status"><span>Status</span><p>${escapeHtml(submissionPolicy.destination)}</p></div>
        <dl class="guideline-grid"><div><dt>Length</dt><dd>${escapeHtml(submissionPolicy.format)}</dd></div><div><dt>Format</dt><dd>${escapeHtml(submissionPolicy.style)}</dd></div><div><dt>Review</dt><dd>${escapeHtml(submissionPolicy.review)}</dd></div><div><dt>Publication</dt><dd>${escapeHtml(submissionPolicy.publication)}</dd></div><div><dt>Responsible disclosure</dt><dd>${escapeHtml(submissionPolicy.disclosure)}</dd></div></dl>
      </section>

      <section class="content-section schedule-section" id="schedule" aria-labelledby="schedule-title"><div class="section-heading compact-heading"><p class="section-kicker">05 / Program</p><h2 id="schedule-title">Workshop schedule</h2><p class="section-note">All times are local.</p></div><div class="schedule-table-wrapper"><table class="schedule-table"><thead class="sr-only"><tr><th scope="col">Time</th><th scope="col">Activity</th></tr></thead><tbody><tr class="session-heading"><th scope="rowgroup" colspan="2">Morning Session</th></tr>${scheduleMarkup('morning')}<tr class="session-heading"><th scope="rowgroup" colspan="2">Afternoon Session</th></tr>${scheduleMarkup('afternoon')}</tbody></table></div></section>

      <section class="content-section people-section" id="organizers" aria-labelledby="organizers-title"><div class="section-heading compact-heading"><p class="section-kicker">06 / People</p><h2 id="organizers-title">Workshop organizers</h2></div><div class="people-grid organizers-grid">${peopleMarkup(organizers)}</div></section>
      <section class="content-section people-section advisory-section" id="advisers" aria-labelledby="advisers-title"><div class="section-heading compact-heading"><p class="section-kicker">Advisory</p><h2 id="advisers-title">Advisory board</h2></div><div class="people-grid people-grid-secondary">${peopleMarkup(advisers, { showRoles: false })}</div></section>
      <section class="content-section people-section student-section" id="student-organizers" aria-labelledby="student-organizers-title"><div class="section-heading compact-heading"><p class="section-kicker">Student team</p><h2 id="student-organizers-title">Student organizers</h2></div><div class="people-grid people-grid-secondary student-grid">${peopleMarkup(studentOrganizers, { showRoles: false })}</div></section>

      <section class="contact-section" id="contact" aria-labelledby="contact-title"><p class="section-kicker">Contact</p><h2 id="contact-title">Questions about scope or fit?</h2><a href="mailto:${escapeHtml(workshop.contact)}">${escapeHtml(workshop.contact)} <span aria-hidden="true">→</span></a></section>
    </div>
  </main>
  <footer class="site-footer editorial-shell"><p>${escapeHtml(workshop.title)}</p><p>${escapeHtml(workshop.status)} · ${escapeHtml(workshop.location)}</p></footer>
</body>
</html>`;

const sourceStyles = await readFile(resolve(projectRoot, 'app/globals.css'), 'utf8');
const standaloneStyles = `
:root { --font-geist-sans: Arial, Helvetica, sans-serif; --font-editorial: Georgia, 'Times New Roman', serif; }
html { -webkit-text-size-adjust: 100%; }
body, h1, h2, h3, p { margin-block-start: 0; }
img { display: block; max-width: 100%; }
button { font: inherit; }
[hidden] { display: none !important; }
.menu-button [data-menu-icon] { font-size: 1.35rem; line-height: 1; }
.meta-icon { display: inline-grid; place-items: center; width: 24px; height: 24px; font-family: Arial, sans-serif; }
${sourceStyles.replace(/^@import[^\n]*\n/gm, '')}`;

const menuScript = `const button = document.querySelector('.menu-button');
const navigation = document.querySelector('#mobile-navigation');
const icon = button?.querySelector('[data-menu-icon]');
function setMenu(open) { if (!button || !navigation) return; navigation.hidden = !open; button.setAttribute('aria-expanded', String(open)); button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); if (icon) icon.textContent = open ? '×' : '☰'; }
button?.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && button?.getAttribute('aria-expanded') === 'true') { setMenu(false); button.focus(); } });`;

await mkdir(outputDirectory, { recursive: true });
await mkdir(resolve(outputDirectory, 'people'), { recursive: true });
await Promise.all([
  writeFile(resolve(outputDirectory, 'index.html'), html),
  writeFile(resolve(outputDirectory, 'styles.css'), standaloneStyles),
  writeFile(resolve(outputDirectory, 'menu.js'), menuScript),
  copyFile(resolve(projectRoot, 'public/agent-threat-surface.png'), resolve(outputDirectory, 'agent-threat-surface.png')),
  ...['xinfeng-li.png', 'aditi-raghunathan.jpg', 'xinyue-shen.jpg', 'wenbo-pan.jpg', 'xin-gao.jpg', 'can-shen.jpg', 'xinzuo-wang.jpg', 'florian-tramer.jpg', 'neil-gong.jpg', 'virginia-smith.jpg', 'tongliang-liu.jpg', 'z-jane-wang.jpg', 'junhao-dong.jpg'].map((file) => copyFile(resolve(projectRoot, 'public', 'people', file), resolve(outputDirectory, 'people', file))),
  copyFile(resolve(projectRoot, 'public/favicon.svg'), resolve(outputDirectory, 'favicon.svg')),
  writeFile(resolve(outputDirectory, '.nojekyll'), ''),
]);

console.log(outputDirectory);
