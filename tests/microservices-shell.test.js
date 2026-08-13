const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const courseRoot = path.join(__dirname, '..', 'courses', 'microservices');

test('Microservices shell places navigation on the right and content on the left', () => {
  const css = fs.readFileSync(path.join(courseRoot, 'course.css'), 'utf8');
  assert.match(css, /\.course-shell\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+360px/);
  assert.match(css, /\.course-sidebar\s*\{[^}]*grid-column:\s*2/);
  assert.match(css, /\.lesson-content\s*\{[^}]*grid-column:\s*1/);
  assert.match(css, /@media\s*\(max-width:\s*800px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.callout\s*\{[^}]*border-inline-start/);
  assert.match(css, /\.code-block\s+pre\s*\{/);
  assert.match(css, /\.article-meta\s*\{[^}]*flex-wrap/);
});

test('Microservices interactions progressively enhance navigation and theme controls', () => {
  const script = fs.readFileSync(path.join(courseRoot, 'course.js'), 'utf8');
  assert.match(script, /renderMicroservicesNavigation/);
  assert.match(script, /course-ready/);
  assert.match(script, /aria-expanded/);
  assert.match(script, /prefers-color-scheme:\s*dark/);
  assert.match(script, /data-copy-code/);
});
