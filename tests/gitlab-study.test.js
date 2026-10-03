const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = process.env.STUDY_SITE_ROOT || path.resolve(__dirname, '..');
const pagePath = path.join(root, 'courses/gitlab-cicd/index.html');

test('homepage opens GitLab learning notes and accurately describes their status', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const card = html.match(/<article[^>]+course-card--gitlab-cicd[\s\S]*?<\/article>/)?.[0];
  assert.ok(card);
  assert.match(card, /در حال تکمیل/);
  assert.match(card, /href="courses\/gitlab-cicd\/"/);
  assert.doesNotMatch(card, /یک‌روزه/);
  const page = fs.readFileSync(pagePath, 'utf8');
  assert.match(page, /data-study-notes="gitlab-cicd"/);
});

test('study notes cover both PDFs and all local links and anchors resolve', () => {
  const html = fs.readFileSync(pagePath, 'utf8');
  assert.match(html, /href="\.\.\/\.\.\/books\/CI-CD-01\.pdf"/);
  assert.match(html, /href="\.\.\/\.\.\/books\/CI-CD-02\.pdf"/);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length, new Set(ids).size);
  assert.equal((html.match(/data-source-section="\d+"/g)||[]).length, 37);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^https?:/.test(match[1])) continue;
    const [file, anchor] = match[1].split('#');
    if (file) assert.ok(fs.existsSync(path.resolve(path.dirname(pagePath),file)), match[1]);
    else if (anchor) assert.ok(ids.includes(anchor), `Missing anchor: ${anchor}`);
  }
  assert.doesNotMatch(html, /(?:صفحات|صفحهٔ) [۰-۹]+ جزوه|جزوهٔ [۰-۹]+ صفحه‌ای/);
  assert.match(html, /id="nuget-cache"/);
  assert.match(html, /id="rollback-image"/);
  assert.match(html, /id="part-two-interview"/);
  assert.doesNotMatch(html, /ساخت Docker Image، Push به Registry و Deploy واقعی هنوز/);
});

test('the teaching examples do not print secrets or reuse absent build output', () => {
  const html = fs.readFileSync(pagePath, 'utf8');
  assert.doesNotMatch(html, /echo\s+["']?\$DB_PASSWORD/);
  const summary = html.match(/<section[^>]+id="summary-pipeline"[\s\S]*?<\/section>/)?.[0];
  assert.ok(summary, 'The summary pipeline must be present');
  assert.match(summary, /dotnet test -c Release/);
  assert.doesNotMatch(summary.match(/<pre[\s\S]*?<\/pre>/)?.[0]||'', /--no-build/);
  assert.match(summary, /نمونهٔ آموزشی/);
});
