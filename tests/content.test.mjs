import test from 'node:test';
import assert from 'node:assert/strict';

import {
  advisers,
  cfpTopics,
  importantDates,
  organizers,
  researchQuestions,
  schedule,
  speakers,
  workshop,
} from '../app/workshop-data.mjs';
import {
  escapeHtml,
  renderDates,
  renderPeople,
  renderSchedule,
} from '../app/workshop-render.mjs';

test('accepted workshop content has the exact public workshop contract', () => {
  assert.equal(workshop.title, 'LLM Agents Under Threat in Cyberspace');
  assert.equal(workshop.status, 'AAAI-27 Workshop');
  assert.equal(workshop.location, 'Montréal, Canada');
  assert.equal(workshop.date, 'February 22 or 23, 2027');
  assert.equal(workshop.contact, 'llm-agents-under-threat@googlegroups.com');
  assert.equal(researchQuestions.length, 3);
  assert.equal(cfpTopics.length, 10);
  assert.equal(importantDates.length, 4);
  assert.equal(schedule.length, 13);
  assert.equal(speakers.length, 4);
  assert.equal(organizers.length, 4);
  assert.equal(advisers.length, 6);

  const publicContent = JSON.stringify({
    workshop,
    researchQuestions,
    cfpTopics,
    importantDates,
    schedule,
    speakers,
    organizers,
    advisers,
  });
  assert.doesNotMatch(publicContent, /phone|postal|room\s+\d|street address/i);
  assert.doesNotMatch(publicContent, /openreview|hotcrp|register now|submit now/i);
  assert.doesNotMatch(publicContent, /tentative|proposed|under review|pending confirmation|after workshop confirmation|subject to change/i);
});

test('full-day schedule follows the AAAI workshop time requirements', () => {
  assert.deepEqual(
    schedule.map(({ time, title }) => [time, title]),
    [
      ['09:00–09:15', 'Opening remarks'],
      ['09:15–10:00', 'Keynote 1'],
      ['10:00–10:30', 'Paper session 1'],
      ['10:30–11:00', 'Coffee break'],
      ['11:00–11:30', 'Invited talk 1'],
      ['11:30–12:30', 'Paper session 2'],
      ['12:30–14:00', 'Lunch break'],
      ['14:00–14:45', 'Keynote 2'],
      ['14:45–15:30', 'Paper session 3'],
      ['15:30–16:00', 'Coffee break & poster session'],
      ['16:00–16:30', 'Invited talk 2'],
      ['16:30–17:10', 'Panel discussion'],
      ['17:10–17:15', 'Closing remarks & award'],
    ],
  );
});

test('event-specific records no longer carry proposal-stage flags', () => {
  for (const records of [importantDates, schedule, speakers, organizers, advisers]) {
    assert.ok(records.every((record) => !('tentative' in record)));
  }
});

test('render helpers escape content and preserve semantic labels', () => {
  assert.equal(escapeHtml('<script>"x" & y</script>'), '&lt;script&gt;&quot;x&quot; &amp; y&lt;/script&gt;');

  const datesMarkup = renderDates([
    { label: '<Deadline>', value: 'Nov 20', note: 'Anywhere on Earth' },
  ]);
  assert.match(datesMarkup, /&lt;Deadline&gt;/);
  assert.doesNotMatch(datesMarkup, /Tentative/i);

  const scheduleMarkup = renderSchedule([
    { time: '08:30–08:45', title: 'Opening', type: 'Workshop' },
  ]);
  assert.match(scheduleMarkup, /<time[^>]*>08:30–08:45<\/time>/);
  assert.doesNotMatch(scheduleMarkup, /Tentative/i);

  const peopleMarkup = renderPeople([
    { name: 'A. Researcher', affiliation: 'Example University', role: 'Program Chair' },
  ], 'organizer');
  assert.match(peopleMarkup, /data-kind="organizer"/);
  assert.match(peopleMarkup, /Program Chair/);
  assert.doesNotMatch(peopleMarkup, /Tentative/i);
});
