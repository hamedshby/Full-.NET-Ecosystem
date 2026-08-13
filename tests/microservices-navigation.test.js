const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('Microservices catalog preserves every source heading and availability state', () => {
  const { microservicesChapters, availableLessons } = require('../courses/microservices/course-navigation.js');
  const lessons = microservicesChapters.flatMap(chapter => chapter.lessons);

  assert.equal(microservicesChapters.length, 18);
  assert.equal(lessons.length, 151);
  assert.equal(new Set(lessons.map(lesson => lesson.id)).size, 151);
  assert.equal(availableLessons.length, 23);
  assert.equal(lessons.filter(lesson => !lesson.available).length, 128);
  assert.deepEqual(
    microservicesChapters.map(chapter => chapter.title),
    [
      '1 - Relationship between Microservices', '2 - Synchronous Communication',
      '3 - Asynchronous Communication', '4 - RabbitMQ', '5 - Apache Kafka',
      '6 - RabbitMQ vs Kafka', '7 - MassTransit', '8 - Messaging Patterns',
      '9 - Reliability Patterns', '10 - Distributed Transactions', '11 - Outbox Pattern',
      '12 - Inbox Pattern', '13 - Saga Pattern', '14 - Idempotency', '15 - Monitoring',
      '16 - Security', '17 - Performance', '18 - Practical Project'
    ]
  );
});

test('navigation renders available lessons as links and upcoming lessons as disabled rows', () => {
  const { renderMicroservicesNavigation } = require('../courses/microservices/course-navigation.js');
  const html = renderMicroservicesNavigation('ch1-1');

  assert.match(html, /href="ch1-1\.html"[^>]+aria-current="page"/);
  assert.match(html, /data-lesson-id="ch4-7"[^>]*>[\s\S]*Dead Letter Queue[\s\S]*به‌زودی/);
  assert.doesNotMatch(html, /href="ch4-7\.html"/);
  assert.equal((html.match(/class="course-chapter"/g) || []).length, 18);
});

test('navigation hides the lesson count and numeric lesson prefixes', () => {
  const { renderMicroservicesNavigation } = require('../courses/microservices/course-navigation.js');
  const html = renderMicroservicesNavigation('ch1-1');

  assert.doesNotMatch(html, /درس در دسترس از/);
  assert.match(html, />Monolith vs Microservices<\/bdi>/);
  assert.match(html, />Communication Between Microservices<\/bdi>/);
  assert.doesNotMatch(html, />1\.1 Monolith vs Microservices<\/bdi>/);
  assert.doesNotMatch(html, />1\.2 Communication Between Microservices<\/bdi>/);
});

test('every available catalog lesson has a source chapter file', () => {
  const { availableLessons } = require('../courses/microservices/course-navigation.js');
  for (const lesson of availableLessons) {
    assert.ok(
      fs.existsSync(path.join(root, '..', 'MicroService', 'chapters', `${lesson.id}.html`)),
      lesson.id
    );
  }
});
