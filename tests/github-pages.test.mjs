import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const projectRoot = new URL('../', import.meta.url);

function runGenerator(outputDirectory) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/build-github-pages.mjs', outputDirectory], {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`GitHub Pages generator exited ${code}: ${stderr}`));
    });
  });
}

test('GitHub Pages generator emits a complete standalone workshop site', async () => {
  const outputDirectory = await mkdtemp(join(tmpdir(), 'agents-under-threat-pages-'));
  await runGenerator(outputDirectory);

  const html = await readFile(join(outputDirectory, 'index.html'), 'utf8');
  const styles = await readFile(join(outputDirectory, 'styles.css'), 'utf8');
  const menuScript = await readFile(join(outputDirectory, 'menu.js'), 'utf8');

  assert.match(html, /LLM Agents Under Threat in Cyberspace/);
  assert.match(html, /AAAI-27 Workshop/);
  assert.match(html, /mailto:llm-agents-under-threat@googlegroups\.com/);
  assert.match(html, /accepted for AAAI-27/);
  assert.doesNotMatch(html, /tentative|proposed workshop|under review|pending workshop confirmation|after workshop confirmation|subject to change/i);
  assert.match(html, /<h1 id="hero-title">LLM Agents Under Threat in Cyberspace<\/h1>/);
  assert.match(html, /class="hero-folio"/);
  assert.match(html, /class="hero-copy"/);
  assert.match(html, /class="hero-artwork"/);
  assert.match(html, /class="deadline-panel"/);
  assert.match(html, /class="reading-column"/);
  assert.match(html, /class="topic-list-simple"/);
  assert.match(html, /February 22 or 23, 2027/);
  assert.match(html, /November 20, 2026/);
  assert.match(html, /Anywhere on Earth/);
  assert.match(html, /href="https:\/\/openreview\.net\/group\?id=AAAI\.org\/2027\/Workshop\/LAUT"/);
  assert.match(html, /Submit on OpenReview/);
  assert.match(html, /institutional email/);
  assert.doesNotMatch(html, /Submission instructions will be announced soon/);

  const cfpSection = html.match(/<section class="content-section" id="cfp"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.ok((cfpSection.match(/<p>/g) ?? []).length >= 3, 'CFP should include a substantial introduction and scope lead-in');
  assert.equal((cfpSection.match(/<li>/g) ?? []).length, 10);

  assert.match(styles, /\.hero-layout\s*{[^}]*grid-template-columns:/s);
  assert.match(styles, /@media\s*\(max-width:\s*760px\)/s);
  assert.match(html, /<table class="schedule-table">/);
  assert.match(html, /id="speakers"/);
  assert.match(html, /href="#speakers"/);
  assert.match(html, /Invited Speakers/);
  assert.match(html, /people-grid people-grid-speakers/);
  for (const [name, url] of [
    ['Yiwei Lu', 'https://www.uottawa.ca/faculty-engineering/school-engineering-design-teaching-innovation/directory/yiwei-lu'],
    ['Sirisha Rambhatla', 'https://sirisharambhatla.com'],
    ['Irina Rish', 'https://www.irina-rish.com'],
    ['David Lie', 'https://www.ece.utoronto.ca/people/lie-d/'],
    ['Yue Zhao', 'https://yuezhao.me/'],
  ]) {
    assert.ok(html.includes(`<a href="${url}" target="_blank" rel="noreferrer">${name}</a>`));
  }
  assert.doesNotMatch(html, /Wenyuan Xu|Bo Li|Nicolas Papernot|Niloofar Mireshghallah/);
  assert.match(html, /src="\.\/agent-threat-surface\.png"/);
  assert.doesNotMatch(html, /hero-montreal\.jpg|Arild Vågen|CC BY-SA 4\.0/);
  assert.match(html, /src="\.\/people\/yiwei-lu\.jpg" alt="Portrait of Yiwei Lu"/);
  assert.match(html, /src="\.\/people\/sirisha-rambhatla\.jpg" alt="Portrait of Sirisha Rambhatla"/);
  assert.match(html, /src="\.\/people\/irina-rish\.jpg" alt="Portrait of Irina Rish"/);
  assert.match(html, /src="\.\/people\/david-lie\.jpg" alt="Portrait of David Lie"/);
  assert.match(html, /src="\.\/people\/yue-zhao\.jpg" alt="Portrait of Yue Zhao"/);
  assert.match(html, /src="\.\/people\/xinfeng-li\.png" alt="Portrait of Xinfeng Li"/);
  assert.match(html, /src="\.\/people\/aditi-raghunathan\.jpg" alt="Portrait of Aditi Raghunathan"/);
  assert.match(html, /src="\.\/people\/xinyue-shen\.jpg" alt="Portrait of Xinyue Shen"/);
  assert.match(html, /src="\.\/people\/wenbo-pan\.jpg" alt="Portrait of Wenbo Pan"/);
  assert.match(html, /Local Arrangement Chair/);
  assert.match(html, /Publicity Chair/);
  assert.match(html, /id="student-organizers"/);
  assert.match(html, /src="\.\/people\/xin-gao\.jpg" alt="Portrait of Xin Gao"/);
  assert.match(html, /src="\.\/people\/can-shen\.jpg" alt="Portrait of Can Shen"/);
  assert.match(html, /src="\.\/people\/xinzuo-wang\.jpg" alt="Portrait of Xinzuo Wang"/);
  assert.match(html, /src="\.\/people\/florian-tramer\.jpg" alt="Portrait of Florian Tramèr"/);
  assert.match(html, /src="\.\/people\/junhao-dong\.jpg" alt="Portrait of Junhao Dong"/);
  assert.ok(html.indexOf('id="advisers"') < html.indexOf('id="student-organizers"'));
  assert.doesNotMatch(html, /Portrait placeholder for (?:Yiwei Lu|Sirisha Rambhatla|Irina Rish|David Lie|Yue Zhao|Aditi Raghunathan|Xinyue Shen|Wenbo Pan)/);
  assert.match(html, /href="\.\/favicon\.svg"/);
  assert.match(html, /href="\.\/styles\.css\?v=[a-f0-9]{8}"/);
  assert.doesNotMatch(html, /\/_next\/|chatgpt\.site/);

  assert.match(styles, /\.hero\s*{/);
  assert.doesNotMatch(styles, /@import\s+['"]tailwindcss/);
  assert.match(menuScript, /aria-expanded/);

  assert.ok((await stat(join(outputDirectory, 'agent-threat-surface.png'))).size > 100_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'yiwei-lu.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'sirisha-rambhatla.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'irina-rish.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'david-lie.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'yue-zhao.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'xinfeng-li.png'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'aditi-raghunathan.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'xinyue-shen.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'wenbo-pan.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'xin-gao.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'can-shen.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'xinzuo-wang.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'florian-tramer.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'junhao-dong.jpg'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'favicon.svg'))).size > 0);
});
