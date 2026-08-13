const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const css = fs.readFileSync(
  path.join(__dirname, '../courses/dotnet-senior/course.css'),
  'utf8'
);

test('course tables remain readable and horizontally scrollable on narrow screens', () => {
  assert.match(css, /\.answer-content table\{[^}]*display:block[^}]*overflow-x:auto/);
  assert.match(css, /\.answer-content th,\.answer-content td\{[^}]*border-bottom:1px solid var\(--line\)/);
  assert.match(css, /\.answer-content th\{[^}]*background:var\(--soft\)/);
  assert.match(css, /\.answer-content tbody tr:hover\{[^}]*background:/);
});
