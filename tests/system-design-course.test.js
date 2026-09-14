const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const landing = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const coursePath = path.join(root, 'courses', 'system-design', 'index.html');
const course = fs.readFileSync(coursePath, 'utf8');

test('the System Design card opens the syllabus page', () => {
  assert.match(landing, /href="courses\/system-design\/"[^>]*>مشاهدهٔ سرفصل‌ها<\/a>/);
  assert.ok(fs.existsSync(coursePath));
});

test('the System Design syllabus has ten numbered chapters and 66 topics', () => {
  assert.equal((course.match(/<details class="chapter(?: chapter-practice)?"/g) || []).length, 10);
  assert.equal((course.match(/<li class="course-topic">/g) || []).length, 66);

  for (let chapter = 1; chapter <= 10; chapter += 1) {
    assert.match(course, new RegExp(`<span class="chapter-number">${String(chapter).padStart(2, '0')}<\\/span>`));
  }
});

test('the syllabus preserves every requested area and practical design', () => {
  for (const heading of [
    'Fundamentals',
    'Networking &amp; Request Flow',
    'Database',
    'Caching',
    'Messaging',
    'Distributed Systems',
    'Reliability',
    'Microservices Design',
    'Observability',
    'تمرین‌های واقعی'
  ]) {
    assert.match(course, new RegExp(heading));
  }

  for (const design of [
    'URL Shortener',
    'Notification System',
    'Order Management',
    'Wallet',
    'Payment Gateway',
    'Banking Transaction System'
  ]) {
    assert.match(course, new RegExp(design));
  }
});

test('every syllabus topic links to an existing placeholder page', () => {
  const syllabus = course.match(/<section class="learning-path"[\s\S]*?<\/section>/)?.[0] || '';
  const links = [...syllabus.matchAll(/href="(lessons\/ch\d+-\d+\.html)"/g)].map(match => match[1]);

  assert.equal(links.length, 66);
  assert.equal(new Set(links).size, 66);
  for (const href of links) {
    assert.ok(fs.existsSync(path.join(root, 'courses', 'system-design', href)), href);
  }
});

test('unpublished lesson pages have an empty content container and every lesson has navigation', () => {
  const lessonsRoot = path.join(root, 'courses', 'system-design', 'lessons');
  const files = fs.readdirSync(lessonsRoot).filter(file => file.endsWith('.html'));

  assert.equal(files.length, 66);
  for (const file of files) {
    const html = fs.readFileSync(path.join(lessonsRoot, file), 'utf8');
    assert.match(html, /<aside id="course-sidebar"/);
    assert.match(html, /<script src="\.\.\/course-navigation\.js" defer><\/script>/);
    if (file !== 'ch1-1.html') {
      assert.match(html, /<div id="lesson-body" class="lesson-empty" data-content-status="empty" aria-label="محتوای آموزشی درس"><\/div>/);
    }
    assert.match(html, /<nav class="lesson-pager" aria-label="درس قبلی و بعدی">/);
  }
});

test('the Scalability lesson is published with measurable concepts and a learning check', () => {
  const lesson = fs.readFileSync(
    path.join(root, 'courses', 'system-design', 'lessons', 'ch1-1.html'),
    'utf8'
  );

  assert.doesNotMatch(lesson, /data-content-status="empty"/);
  assert.match(lesson, /<main id="lesson-content" class="lesson-page lesson-article">/);
  assert.match(lesson, /<h1><bdi>Scalability<\/bdi><\/h1>/);
  assert.match(lesson, /<bdi>Workload<\/bdi>/);
  assert.match(lesson, /<bdi>SLO<\/bdi>/);
  assert.match(lesson, /<bdi>Bottleneck<\/bdi>/);
  assert.match(lesson, /<bdi>Vertical Scaling<\/bdi>/);
  assert.match(lesson, /<bdi>Horizontal Scaling<\/bdi>/);
  assert.match(lesson, /<details class="lesson-answer">/);
  assert.match(lesson, /class="lesson-section lesson-summary"/);
});

test('the generator preserves lesson files that already exist', () => {
  const generator = fs.readFileSync(path.join(root, 'tools', 'generate-system-design-placeholders.js'), 'utf8');
  assert.match(generator, /if \(fs\.existsSync\(outputPath\)\)/);
  assert.match(generator, /preserved \+= 1/);
});
