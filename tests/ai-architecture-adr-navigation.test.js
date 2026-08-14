const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'courses', 'ai-driven-software-architecture');

test('ADR lesson is reachable in sequence from the first chapter', () => {
  const index = fs.readFileSync(path.join(courseRoot, 'index.html'), 'utf8');
  const decisions = fs.readFileSync(
    path.join(courseRoot, 'lessons', 'architecture-as-decisions.html'),
    'utf8',
  );
  const adr = fs.readFileSync(path.join(courseRoot, 'lessons', 'adr.html'), 'utf8');

  assert.match(index, /href="lessons\/adr\.html"[^>]*>[^<]*<bdi>ADR<\/bdi> چیست\؟<\/a>/);
  assert.match(decisions, /href="adr\.html"[^>]*>درس بعدی: <bdi>ADR<\/bdi> چیست\؟<\/a>/);
  assert.match(adr, /href="architecture-as-decisions\.html"[^>]*>درس قبلی:/);
  assert.match(adr, /درس بعدی: <bdi>AI-Driven Software Architecture<\/bdi> چیست\؟/);
});

test('ADR lesson exposes accessible article landmarks and navigation', () => {
  const adr = fs.readFileSync(path.join(courseRoot, 'lessons', 'adr.html'), 'utf8');

  assert.match(adr, /<html lang="fa" dir="rtl">/);
  assert.match(adr, /<main id="lesson-content"/);
  assert.match(adr, /<h1><bdi>ADR<\/bdi> چیست\؟<\/h1>/);
  assert.match(adr, /<nav class="lesson-pager" aria-label="درس قبلی و بعدی">/);
});
