export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function renderDates(records) {
  return records
    .map(
      (record) => `<article class="date-card">
  <span class="eyebrow">${escapeHtml(record.label)}</span>
  <strong>${escapeHtml(record.value)}</strong>
  <span>${escapeHtml(record.note)}</span>
</article>`,
    )
    .join('');
}

export function renderSchedule(records) {
  return records
    .map(
      (record) => `<li class="schedule-row">
  <time>${escapeHtml(record.time)}</time>
  <span>${escapeHtml(record.title)}</span>
  <small>${escapeHtml(record.type)}</small>
</li>`,
    )
    .join('');
}

export function renderPeople(records, kind) {
  return records
    .map(
      (record) => `<article class="person-card" data-kind="${escapeHtml(kind)}">
  <h3>${escapeHtml(record.name)}</h3>
  <p>${escapeHtml(record.affiliation)}</p>
  <span>${escapeHtml(record.role)}</span>
</article>`,
    )
    .join('');
}
