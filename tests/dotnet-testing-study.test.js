const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = process.env.DOTNET_TESTING_SITE_ROOT || path.resolve(__dirname, '..');
const pagePath = path.join(root, 'courses/dotnet-testing/index.html');

test('thematic tutorials link to the .NET testing course', () => {
  const topics = fs.readFileSync(path.join(root, 'topics/index.html'), 'utf8');
  const card = topics.match(/<article[^>]+course-card--dotnet-testing[\s\S]*?<\/article>/)?.[0];

  assert.ok(card, 'The topics page must expose the .NET testing course');
  assert.match(card, /در دسترس/);
  assert.match(card, /۲۵ درس/);
  assert.match(card, /href="\.\.\/courses\/dotnet-testing\/"/);
  assert.ok(fs.existsSync(pagePath), 'The .NET testing course page must exist');
});

test('.NET testing course contains 25 lessons and all local links resolve', () => {
  const html = fs.readFileSync(pagePath, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

  assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
  assert.equal((html.match(/class="lesson-section"/g) || []).length, 25);
  assert.equal((html.match(/<details>/g) || []).length, 25);
  assert.match(html, /href="\.\.\/\.\.\/index\.html"/);
  assert.match(html, /href="\.\.\/\.\.\/topics\/"/);

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|data:)/.test(url)) continue;
    const [file, anchor] = url.split('#');
    if (file) assert.ok(fs.existsSync(path.resolve(path.dirname(pagePath), file)), url);
    if (anchor) assert.ok(ids.includes(anchor), `Missing anchor: ${anchor}`);
  }
});
