const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('Microservices catalog preserves every source heading and availability state', () => {
  const { microservicesChapters, availableLessons } = require('../courses/microservices/course-navigation.js');
  const lessons = microservicesChapters.flatMap(chapter => chapter.lessons);

  assert.equal(microservicesChapters.length, 19);
  assert.equal(lessons.length, 154);
  assert.equal(new Set(lessons.map(lesson => lesson.id)).size, 154);
  assert.equal(availableLessons.length, 28);
  assert.equal(lessons.filter(lesson => !lesson.available).length, 126);
  assert.deepEqual(
    microservicesChapters.map(chapter => chapter.title),
    [
      '1 - Relationship between Microservices', '2 - Synchronous Communication',
      '3 - Asynchronous Communication', '4 - RabbitMQ', '5 - Apache Kafka',
      '6 - RabbitMQ vs Kafka', '7 - MassTransit', '8 - Messaging Patterns',
      '9 - Reliability Patterns', '10 - Distributed Transactions', '11 - Outbox Pattern',
      '12 - Inbox Pattern', '13 - Saga Pattern', '14 - Idempotency', '15 - Monitoring',
      '16 - Security', '17 - JWT', '18 - Performance', '19 - Practical Project'
    ]
  );

  assert.deepEqual(
    microservicesChapters.find(chapter => chapter.title === '17 - JWT').lessons,
    [
      { id: 'ch17-1', title: '17.1 JWT Fundamentals', available: true },
      { id: 'ch17-2', title: '17.2 JWT Authentication in ASP.NET Core', available: true },
      { id: 'ch17-3', title: '17.3 Refresh Token, Rotation and Revocation', available: true },
      { id: 'ch17-4', title: '17.4 Security Best Practices and Production Readiness', available: true }
    ]
  );
});

test('navigation renders available lessons as links and upcoming lessons as disabled rows', () => {
  const { renderMicroservicesNavigation } = require('../courses/microservices/course-navigation.js');
  const html = renderMicroservicesNavigation('ch1-1');

  assert.match(html, /href="ch1-1\.html"[^>]+aria-current="page"/);
  assert.match(html, /data-lesson-id="ch4-7"[^>]*>[\s\S]*Dead Letter Queue[\s\S]*به‌زودی/);
  assert.doesNotMatch(html, /href="ch4-7\.html"/);
  assert.equal((html.match(/class="course-chapter"/g) || []).length, 19);
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
      fs.existsSync(path.join(root, 'courses', 'microservices', 'content', `${lesson.id}.html`)) ||
      fs.existsSync(path.join(root, '..', 'MicroService', 'chapters', `${lesson.id}.html`)),
      lesson.id
    );
  }
});
