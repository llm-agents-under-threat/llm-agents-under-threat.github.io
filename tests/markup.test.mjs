import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../app/page.tsx', import.meta.url), 'utf8');
const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8');
const styles = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
const data = await readFile(new URL('../app/workshop-data.mjs', import.meta.url), 'utf8');
const renderedSources = `${page}\n${data}`;

test('document shell publishes accurate metadata and an accessible entry path', () => {
  assert.match(layout, /LLM Agents Under Threat in Cyberspace/);
  assert.match(layout, /AAAI-27 Workshop/);
  assert.match(layout, /icon:\s*['"]\/favicon\.svg['"]/);
  assert.match(page, /href="#main-content"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /aria-expanded=/);
});

test('first viewport states accepted workshop status, date, place, deadline, and editorial hero asset', () => {
  assert.match(renderedSources, /AAAI-27 Workshop/);
  assert.match(page, /accepted for AAAI-27/);
  assert.match(renderedSources, /February 22 or 23, 2027/);
  assert.match(renderedSources, /Montréal, Canada/);
  assert.match(renderedSources, /November 20, 2026/);
  assert.match(page, /\/agent-threat-surface\.png/);
  for (const className of ['hero-folio', 'hero-copy', 'hero-artwork', 'deadline-panel']) {
    assert.match(page, new RegExp(`className="[^"]*${className}`));
  }
  assert.doesNotMatch(page, /hero-montreal\.jpg|Arild Vågen|CC BY-SA 4\.0/);
});

test('academic reading flow exposes the reference-led section order', () => {
  const ids = ['news', 'about', 'cfp', 'dates', 'submissions', 'schedule', 'organizers', 'advisers', 'student-organizers', 'contact'];
  let previous = -1;
  for (const id of ids) {
    const position = page.indexOf(`id="${id}"`);
    assert.ok(position > previous, `${id} must follow the prior section`);
    previous = position;
  }
  assert.match(page, /id="about"/);
  assert.match(page, /id="cfp"/);
  assert.match(page, /cfpTopics\.map/);
});

test('navigation remains keyboard accessible without a reveal dependency', () => {
  assert.match(styles, /position:\s*sticky/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /scroll-margin-top/);
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(page, /hidden={!menuOpen}/);
  assert.match(page, /menuButtonRef\.current\?\.focus\(\)/);
  assert.match(styles, /\.mobile-nav\[hidden\]\s*{\s*display:\s*none\s*!important/);
  assert.doesNotMatch(page, /data-reveal/);
  assert.doesNotMatch(renderedSources, /initRevealEffects|shouldAnimate/);
});

test('complete page exposes public sections while invited speakers remain hidden', () => {
  for (const id of ['dates', 'schedule', 'organizers', 'contact']) {
    assert.match(page, new RegExp(`id=["']${id}["']`));
  }

  assert.doesNotMatch(page, /id=["']speakers["']/);
  assert.doesNotMatch(page, /href=["']#speakers["']/);

  for (const name of [
    'Xinfeng Li', 'Aditi Raghunathan', 'Xinyue Shen', 'Wenbo Pan',
    'Xin Gao', 'Can Shen', 'Xinzuo Wang',
    'Florian Tramèr', 'Neil Gong', 'Virginia Smith', 'Tongliang Liu',
    'Z. Jane Wang', 'Junhao Dong',
  ]) {
    assert.match(renderedSources, new RegExp(name));
  }
});

test('complete page preserves safe public-contact and asset boundaries', () => {
  for (const asset of [
    '/people/xinfeng-li.png', '/people/aditi-raghunathan.jpg', '/people/xinyue-shen.jpg', '/people/wenbo-pan.jpg',
    '/people/xin-gao.jpg', '/people/can-shen.jpg', '/people/xinzuo-wang.jpg',
    '/people/florian-tramer.jpg', '/people/neil-gong.jpg', '/people/virginia-smith.jpg',
    '/people/tongliang-liu.jpg', '/people/z-jane-wang.jpg', '/people/junhao-dong.jpg',
  ]) {
    assert.match(renderedSources, new RegExp(asset.replace('.', '\\.')));
  }
  assert.equal((data.match(/llm-agents-under-threat@googlegroups\.com/g) ?? []).length, 1);
  assert.doesNotMatch(renderedSources, /\b(?:openreview|hotcrp)\b|https?:\/\/[^'"\s]*submit|phone|postal address/i);
});

test('complete page renders every accepted-workshop date and schedule record', () => {
  assert.match(page, /importantDates\.map/);
  assert.match(page, /schedule\.map/);
  assert.doesNotMatch(page, /speakers\.map/);
  assert.match(page, /organizers\.map/);
  assert.match(page, /studentOrganizers\.map/);
  assert.match(page, /advisers\.map/);
  assert.match(page, /advisers\.map\(\(person\) => <PersonCard/);
});

test('public source contains no proposal-stage language', () => {
  assert.doesNotMatch(`${layout}\n${renderedSources}`, /tentative|proposed workshop|under review|pending workshop confirmation|after workshop confirmation|subject to change/i);
});

test('schedule uses a simple semantic table with morning and afternoon groups', () => {
  assert.match(page, /<table[^>]*className="schedule-table"/);
  assert.match(page, /<thead className="sr-only">/);
  assert.match(page, /<th scope="col">Time<\/th>/);
  assert.match(page, /<th scope="col">Activity<\/th>/);
  assert.match(page, /<th scope="row"><time>/);
  assert.match(page, /<tbody>/);
  assert.match(page, /Morning Session/);
  assert.match(page, /Afternoon Session/);
});

test('people use portrait-shaped cells with accessible initials fallbacks', () => {
  assert.match(page, /className="people-grid [^"]+"/);
  assert.match(page, /className="person-portrait"/);
  assert.match(page, /aria-label={`Portrait placeholder for \$\{person\.name\}`}/);
  assert.match(page, /initials\(person\.name\)/);
});

test('visual source exposes the selected proceedings-cover editorial system', () => {
  assert.match(page, /className="editorial-shell"/);
  assert.match(page, /className="research-questions"/);
  assert.match(page, /className="section-kicker"/);
  assert.match(styles, /--ink:/);
  assert.match(styles, /--paper:/);
  assert.match(styles, /--risk:/);
  assert.match(styles, /\.hero-layout\s*{[^}]*grid-template-columns:/s);
  assert.match(styles, /\.person-portrait\s*{[^}]*border-radius:/s);
  assert.doesNotMatch(styles, /--color-cyan|#4fe0d0|reveal-pending/);
});

test('mobile rules protect tables, email, and people from horizontal overflow', () => {
  assert.match(styles, /overflow-wrap:\s*anywhere/);
  assert.match(styles, /\.schedule-table-wrapper\s*{[^}]*overflow-x:\s*auto/);
  assert.match(styles, /@media\s*\(max-width:\s*640px\)/);
  assert.match(styles, /\.people-grid\s*{[^}]*grid-template-columns:/);
});

test('academic lists and small metadata remain visibly accessible', () => {
  assert.match(styles, /\.topic-index\s*{[^}]*list-style:\s*none/s);
  assert.match(styles, /\.person-card small\s*{[^}]*color:\s*var\(--muted\)/s);
  assert.match(styles, /\.site-footer\s*{[^}]*color:\s*var\(--muted\)/s);
});
