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

test('first viewport states accepted workshop status, date, place, and local hero asset', () => {
  assert.match(renderedSources, /AAAI-27 Workshop/);
  assert.match(page, /accepted for AAAI-27/);
  assert.match(renderedSources, /February 22 or 23, 2027/);
  assert.match(renderedSources, /Montréal, Canada/);
  assert.match(page, /\/hero-montreal\.jpg/);
  assert.match(page, /Arild Vågen/);
  assert.match(page, /CC BY-SA 4\.0/);
});

test('academic reading flow exposes the reference-led section order', () => {
  const ids = ['news', 'about', 'cfp', 'dates', 'submissions', 'schedule', 'speakers', 'organizers', 'advisers', 'contact'];
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

test('complete page exposes every public section and proposal-derived person', () => {
  for (const id of ['dates', 'schedule', 'speakers', 'organizers', 'contact']) {
    assert.match(page, new RegExp(`id=["']${id}["']`));
  }

  for (const name of [
    'Wenyuan Xu', 'Bo Li', 'Nicolas Papernot', 'Niloofar Mireshghallah',
    'Xinfeng Li', 'Aditi Raghunathan', 'Xinyue Shen', 'Wenbo Pan',
    'Florian Tramèr', 'Neil Gong', 'Virginia Smith', 'Tongliang Liu',
    'Z. Jane Wang', 'Junhao Dong',
  ]) {
    assert.match(renderedSources, new RegExp(name));
  }
});

test('complete page preserves safe public-contact and asset boundaries', () => {
  for (const asset of ['/people/xinfeng-li.png', '/people/rag.jpg', '/people/shen.jpg', '/people/pan.jpg']) {
    assert.match(renderedSources, new RegExp(asset.replace('.', '\\.')));
  }
  assert.equal((data.match(/xinfeng\.li@polyu\.edu\.hk/g) ?? []).length, 1);
  assert.match(page, /CC BY-SA 4\.0/);
  assert.doesNotMatch(renderedSources, /\b(?:openreview|hotcrp)\b|https?:\/\/[^'"\s]*submit|phone|postal address/i);
});

test('complete page renders every accepted-workshop date and schedule record', () => {
  assert.match(page, /importantDates\.map/);
  assert.match(page, /schedule\.map/);
  assert.match(page, /speakers\.map/);
  assert.match(page, /organizers\.map/);
  assert.match(page, /advisers\.map/);
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
  assert.doesNotMatch(page, /<time dateTime=/);
});

test('people use portrait-shaped cells with accessible initials fallbacks', () => {
  assert.match(page, /className="people-grid"/);
  assert.match(page, /className="person-portrait"/);
  assert.match(page, /aria-label={`Portrait placeholder for \$\{person\.name\}`}/);
  assert.match(page, /initials\(person\.name\)/);
});

test('visual source rejects the discarded security campaign system', () => {
  assert.match(page, /className="reading-column"/);
  assert.match(styles, /\.site-header\s*{[^}]*background:\s*#fff/);
  assert.match(styles, /\.hero\s*{[^}]*height:\s*clamp\(520px,/);
  assert.match(styles, /\.reading-column\s*{[^}]*max-width:\s*880px/);
  assert.match(styles, /\.person-portrait\s*{[^}]*border-radius:\s*50%/);
  assert.doesNotMatch(renderedSources, /threat-map|topic-row|schedule-list|section-index/);
  assert.doesNotMatch(styles, /--color-cyan|#4fe0d0|reveal-pending/);
});

test('mobile rules protect tables, email, and people from horizontal overflow', () => {
  assert.match(styles, /overflow-wrap:\s*anywhere/);
  assert.match(styles, /\.schedule-table-wrapper\s*{[^}]*overflow-x:\s*auto/);
  assert.match(styles, /@media\s*\(max-width:\s*640px\)/);
  assert.match(styles, /\.people-grid\s*{[^}]*grid-template-columns:/);
});

test('academic lists and small metadata remain visibly accessible', () => {
  assert.match(styles, /\.news-list,\s*\.topic-list-simple,\s*\.guideline-list\s*{[^}]*list-style:\s*disc/);
  assert.match(styles, /\.person-card small\s*{[^}]*color:\s*#666/);
  assert.match(styles, /\.site-footer\s*{[^}]*color:\s*#666/);
});
