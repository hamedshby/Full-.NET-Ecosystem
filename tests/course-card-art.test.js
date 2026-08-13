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
