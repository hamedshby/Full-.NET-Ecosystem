const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'courses/dotnet-path/oop/index.html'), 'utf8');

test('the OOP start page uses the course shell with sidebar and lesson content', () => {
  assert.match(page, /class="course-header"/);
  assert.match(page, /id="course-sidebar" class="course-sidebar"/);
  assert.match(page, /data-current-lesson="oop-introduction"/);
  assert.match(page, /id="lesson-content" class="lesson-content"/);
  assert.match(page, /سرفصل‌های آموزش <bdi>\.NET<\/bdi>/);
  assert.match(page, /فصل 1 — مقدمه‌ای بر <bdi>Object-Oriented Programming<\/bdi>/);
  assert.match(page, /<h1><bdi>1\.1 OOP<\/bdi> چیست\؟<\/h1>/);
  assert.match(page, /course-navigation\.js/);
  assert.match(page, /course\.js/);
});
