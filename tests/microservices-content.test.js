const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { availableLessons } = require('../courses/microservices/course-navigation.js');

const lessonsRoot = path.join(__dirname, '..', 'courses', 'microservices', 'lessons');

test('every available Microservices lesson is generated as a standalone accessible page', () => {
  const pages = fs.existsSync(lessonsRoot)
    ? fs.readdirSync(lessonsRoot).filter(file => file.endsWith('.html'))
    : [];
  assert.equal(pages.length, 23);

  for (const lesson of availableLessons) {
    const html = fs.readFileSync(path.join(lessonsRoot, `${lesson.id}.html`), 'utf8');
    assert.match(html, /<html lang="fa" dir="rtl">/);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/);
    assert.match(html, /<a class="skip-link" href="#lesson-content">/);
    assert.match(html, new RegExp(`<aside id="course-sidebar" class="course-sidebar"[^>]+data-current-lesson="${lesson.id}"`));
    assert.match(html, /<main id="lesson-content" class="lesson-content">/);
    assert.match(html, /<div class="lesson-body">[\s\S]+<\/div>/);
    assert.match(html, /<nav class="lesson-pager"/);
    assert.doesNotMatch(html, /\.\.\/\.\.\/\.\.\/MicroService/);
  }
});

test('generated lesson pager only links between available lessons', () => {
  const availableIds = new Set(availableLessons.map(lesson => lesson.id));
  for (const lesson of availableLessons) {
    const html = fs.readFileSync(path.join(lessonsRoot, `${lesson.id}.html`), 'utf8');
    const pager = html.match(/<nav class="lesson-pager"[\s\S]*?<\/nav>/)?.[0] || '';
    for (const href of [...pager.matchAll(/href="([^"]+\.html)"/g)].map(match => match[1])) {
      if (href === '../../../index.html') continue;
      assert.ok(availableIds.has(path.basename(href, '.html')), `${lesson.id} -> ${href}`);
    }
  }
});
