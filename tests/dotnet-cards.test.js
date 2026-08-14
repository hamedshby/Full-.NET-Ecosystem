const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('the interview questions and professional .NET path are separate adjacent cards', () => {
  const landing = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const cards = [...landing.matchAll(/<article class="course-card[^"]*">([\s\S]*?)<\/article>/g)];

  assert.match(cards[0][1], /<h3><a [^>]+>سوالات <bdi>\.NET<\/bdi><\/a><\/h3>/);
  assert.match(cards[0][1], /۸۷۹ پرسش/);

  assert.match(cards[1][1], /<h3>مسیر حرفه‌ای <bdi>\.NET<\/bdi><\/h3>/);
  assert.match(cards[1][1], /<p class="status">در دسترس<\/p>/);
  assert.match(cards[1][1], /<bdi>OOP<\/bdi>/);

  const href = cards[1][1].match(
    /<a class="button-link" href="([^"]+)">شروع مطالعه<\/a>/
  )?.[1];
  assert.equal(href, 'courses/dotnet-path/oop/index.html');
  assert.ok(fs.existsSync(path.resolve(root, href)), 'the OOP starting page must exist');
});
