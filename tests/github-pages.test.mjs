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
  assert.match(html, /accepted for AAAI-27/);
  assert.doesNotMatch(html, /tentative|proposed workshop|under review|pending workshop confirmation|after workshop confirmation|subject to change/i);
  assert.match(html, /<table class="schedule-table">/);
  assert.match(html, /Niloofar Mireshghallah/);
  assert.match(html, /src="\.\/hero-montreal\.jpg"/);
  assert.match(html, /src="\.\/people\/xinfeng-li\.png" alt="Portrait of Xinfeng Li"/);
  assert.match(html, /Portrait placeholder for Aditi Raghunathan/);
  assert.match(html, /href="\.\/favicon\.svg"/);
  assert.doesNotMatch(html, /\/_next\/|chatgpt\.site/);

  assert.match(styles, /\.hero\s*{/);
  assert.doesNotMatch(styles, /@import\s+['"]tailwindcss/);
  assert.match(menuScript, /aria-expanded/);

  assert.ok((await stat(join(outputDirectory, 'hero-montreal.jpg'))).size > 100_000);
  assert.ok((await stat(join(outputDirectory, 'people', 'xinfeng-li.png'))).size > 10_000);
  assert.ok((await stat(join(outputDirectory, 'favicon.svg'))).size > 0);
});
