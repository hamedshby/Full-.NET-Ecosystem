const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const css = fs.readFileSync(path.join(__dirname, '../styles.css'), 'utf8');

test('every course artwork spans its card content width', () => {
  assert.match(
    css,
    /(?:^|\n)\.course-art\s*\{[^}]*width:\s*100%[^}]*aspect-ratio:\s*auto/
  );
});

test('course card action links stay aligned at the bottom of equal-height cards', () => {
  assert.match(
    css,
    /\.course-card\s*\{[^}]*display:\s*flex[^}]*flex-direction:\s*column/
  );
  assert.match(
    css,
    /\.course-card\s*>\s*\.button-link[^}]*\{[^}]*align-self:\s*stretch[^}]*margin-top:\s*auto/
  );
});
