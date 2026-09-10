const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'courses', 'ai-driven-software-architecture');

test('every AI architecture lesson has a predictable file-based URL', () => {
  const index = fs.readFileSync(path.join(courseRoot, 'index.html'), 'utf8');
  const courseList = index.match(/<section class="learning-path"[\s\S]*?<\/section>/)?.[0] ?? '';
  const lessonHrefs = [...courseList.matchAll(/<li><a href="([^"]+)"/g)].map(match => match[1]);

  assert.equal(lessonHrefs.length, 95);
  assert.equal(new Set(lessonHrefs).size, 95);
  assert.ok(lessonHrefs.every(href => /^lessons\/ch\d+-\d+\.html$/.test(href)));
  assert.ok(lessonHrefs.every(href => fs.existsSync(path.join(courseRoot, href))));
  assert.ok(lessonHrefs.every(href => !fs.readFileSync(path.join(courseRoot, href), 'utf8').includes('lesson.html?')));
  assert.ok(lessonHrefs.includes('lessons/ch4-1.html'));
});

test('AI architecture sidebar uses the same file-based URLs as the course index', () => {
  const navigation = fs.readFileSync(path.join(courseRoot, 'course-navigation.js'), 'utf8');

  assert.doesNotMatch(navigation, /lesson\.html\?/);
  assert.match(navigation, /"href":"lessons\/ch4-1\.html"/);
});
