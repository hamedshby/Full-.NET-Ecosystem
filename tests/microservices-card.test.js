const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('the Microservices learning card opens the existing comprehensive guide', () => {
  const landing = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const card = landing.match(
    /<article class="course-card course-card--microservices">([\s\S]*?)<\/article>/
  );

  assert.ok(card, 'Microservices course card must be present');
  assert.match(card[1], /<h3>[^<]*<bdi>Microservices<\/bdi>[^<]*<\/h3>/);
  assert.match(card[1], /<p class="status">در دسترس<\/p>/);
  assert.match(card[1], /<p>[^<]+<bdi>Microservices<\/bdi>[^<]+<\/p>/);

  const href = card[1].match(/<a class="button-link" href="([^"]+)">شروع مطالعه<\/a>/)?.[1];
  assert.equal(href, 'courses/microservices/lessons/ch1-1.html');
  assert.ok(fs.existsSync(path.resolve(root, href)), 'Microservices guide link must resolve');
});

test('the Microservices card appears after the two .NET cards', () => {
  const landing = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const cards = [...landing.matchAll(/<article class="course-card[^"]*">([\s\S]*?)<\/article>/g)];

  assert.match(cards[0][1], />C#<\/div>/);
  assert.match(cards[1][1], />\.NET<\/div>/);
  assert.match(cards[2][1], /<bdi>Microservices<\/bdi>/);
});
