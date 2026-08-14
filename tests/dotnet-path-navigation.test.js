const test = require('node:test');
const assert = require('node:assert/strict');

const {
  dotnetChapters,
  availableLessons,
  renderDotnetNavigation
} = require('../courses/dotnet-path/course-navigation.js');

test('the professional .NET path exposes the approved training headings in order', () => {
  assert.equal(dotnetChapters.length, 28);
  assert.deepEqual(dotnetChapters.slice(0, 4).map(chapter => chapter.title), [
    'فصل 1 — مقدمه‌ای بر Object-Oriented Programming',
    'فصل 2 — Class و Object در C#',
    'فصل 3 — Constructor و چرخه ایجاد Object',
    'فصل 4 — Encapsulation'
  ]);
  assert.equal(dotnetChapters[14].title, 'فصل 15 — SOLID Principles');
  assert.equal(dotnetChapters[19].title, 'فصل 20 — Design Patterns و OOP');
  assert.equal(dotnetChapters[27].title, 'فصل 28 — جمع‌بندی و مسیر ادامه');
  assert.deepEqual(dotnetChapters[0].lessons.map(lesson => lesson.title), [
    '1.1 OOP چیست؟',
    '1.2 مفاهیم پایه'
  ]);
  assert.equal(dotnetChapters[19].lessons.length, 17);
  assert.deepEqual(availableLessons.map(lesson => lesson.id), ['oop-introduction']);
});

test('navigation opens OOP and marks its first lesson current', () => {
  const html = renderDotnetNavigation('oop-introduction');

  assert.match(html, /<h2>سرفصل‌های آموزش <bdi>\.NET<\/bdi><\/h2>/);
  assert.match(html, /<details class="course-chapter" open>/);
  assert.match(html, /href="\.\.\/oop\/index\.html" aria-current="page"/);
  assert.match(html, /data-lesson-id="basic-concepts"/);
  assert.match(html, /فصل 28 — جمع‌بندی و مسیر ادامه/);
  assert.doesNotMatch(html, /به‌زودی/);
  assert.doesNotMatch(html, /<bdi>\d+(?:\.\d+)+\s+/);
  assert.match(html, /<bdi>OOP چیست\؟<\/bdi>/);
  assert.match(html, /<bdi>تعریف Class<\/bdi>/);
});
