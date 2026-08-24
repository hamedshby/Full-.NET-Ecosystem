const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

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
  assert.deepEqual(dotnetChapters[5].lessons.map(lesson => lesson.title), [
    '6.1 Polymorphism چیست؟'
  ]);
  assert.equal(dotnetChapters[19].lessons.length, 17);
  assert.equal(availableLessons.length, 185);
});

test('navigation opens OOP and marks its first lesson current', () => {
  const html = renderDotnetNavigation('oop-introduction');

  assert.match(html, /<h2>سرفصل‌های آموزش <bdi>\.NET<\/bdi><\/h2>/);
  assert.match(html, /<details class="course-chapter" open>/);
  assert.match(html, /href="\.\.\/oop\/whatisoop\.html" aria-current="page"/);
  assert.match(html, /href="\.\.\/lessons\/basic-concepts\.html"/);
  assert.match(html, /فصل 28 — جمع‌بندی و مسیر ادامه/);
  assert.doesNotMatch(html, /به‌زودی/);
  assert.doesNotMatch(html, /<bdi>\d+(?:\.\d+)+\s+/);
  assert.match(html, /<bdi>OOP چیست\؟<\/bdi>/);
  assert.match(html, /<bdi>تعریف Class<\/bdi>/);
});

test('navigation opens only the chapter containing a middle lesson', () => {
  const html = renderDotnetNavigation('chapter-20-lesson-11');

  assert.equal((html.match(/<details class="course-chapter" open>/g) || []).length, 1);
  assert.match(html, /href="\.\.\/lessons\/chapter-20-lesson-11\.html" aria-current="page"/);
  assert.match(html, /<details class="course-chapter" open>[\s\S]*?<summary>فصل 20 — Design Patterns و OOP<\/summary>/);
});

test('every professional .NET heading links to an existing standalone page', () => {
  const root = path.join(__dirname, '..');
  const navigation = renderDotnetNavigation('basic-concepts');
  const lessons = dotnetChapters.flatMap(chapter => chapter.lessons);

  assert.equal(lessons.length, 185);
  assert.equal(new Set(lessons.map(lesson => lesson.id)).size, 185);

  for (const lesson of lessons) {
    const relativePage = lesson.id === 'oop-introduction'
      ? 'courses/dotnet-path/oop/whatisoop.html'
      : `courses/dotnet-path/lessons/${lesson.id}.html`;
    const href = lesson.id === 'oop-introduction'
      ? '../oop/whatisoop.html'
      : `../lessons/${lesson.id}.html`;

    assert.match(navigation, new RegExp(`href="${href.replaceAll('.', '\\.') }"`), lesson.id);
    assert.ok(fs.existsSync(path.join(root, relativePage)), relativePage);

    const html = fs.readFileSync(path.join(root, relativePage), 'utf8');
    assert.match(html, /<html\b[^>]*\blang="fa"/i);
    assert.match(html, /<html\b[^>]*\bdir="rtl"/i);
    assert.match(html, new RegExp(`data-current-lesson="${lesson.id}"`));
    assert.match(html, /<main\b[^>]*\bid="lesson-content"/i);
    assert.match(html, /<main\b[^>]*\bclass="lesson-content"/i);
  }
});
