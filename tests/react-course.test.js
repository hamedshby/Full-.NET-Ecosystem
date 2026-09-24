const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('React curriculum exposes every supplied chapter and topic in order', () => {
  const { reactChapters, renderReactNavigation } = require('../courses/react/course-navigation.js');
  const topics = reactChapters.flatMap(chapter => chapter.lessons);

  assert.equal(reactChapters.length, 26);
  assert.equal(topics.length, 211);
  assert.equal(new Set(topics.map(topic => topic.id)).size, 211);
  assert.deepEqual(
    reactChapters.map(chapter => chapter.title),
    [
      '1 - Frontend Fundamentals', '2 - JavaScript Fundamentals for React',
      '3 - Modern JavaScript / ES6+', '4 - Asynchronous JavaScript',
      '5 - TypeScript Fundamentals', '6 - Node.js and Frontend Tooling',
      '7 - React Fundamentals', '8 - React State and Events', '9 - Forms in React',
      '10 - React Hooks', '11 - Routing', '12 - Working with ASP.NET Core APIs',
      '13 - Server State Management', '14 - Global State Management',
      '15 - Authentication and Authorization', '16 - Reusable Component Design',
      '17 - Frontend Architecture', '18 - Error Handling', '19 - Performance',
      '20 - Testing', '21 - Styling Approaches', '22 - Real-World CRUD Applications',
      '23 - Production Concerns', '24 - Docker', '25 - CI/CD',
      '26 - Final Project — Payment Admin Dashboard'
    ]
  );
  assert.deepEqual(
    reactChapters[25].lessons.map(topic => topic.title),
    [
      'Login', 'JWT Authentication', 'Role-Based Authorization', 'Dashboard',
      'Transactions list', 'Transaction details', 'Merchant management', 'CRUD',
      'Search', 'Filter', 'Pagination', 'Forms', 'Validation', 'Error handling',
      'Loading states', 'ASP.NET Core integration', 'Clean project structure',
      'Docker', 'CI/CD'
    ]
  );

  const html = renderReactNavigation();
  assert.equal((html.match(/class="course-chapter"/g) || []).length, 26);
  assert.equal((html.match(/class="lesson-soon"/g) || []).length, 211);
  assert.match(html, /آموزش <bdi>React<\/bdi>/);
  assert.match(html, /Frontend Fundamentals/);
  assert.match(html, /Payment Admin Dashboard/);
});

test('React course page uses the Microservices course shell and is linked from home', () => {
  const pagePath = path.join(root, 'courses', 'react', 'index.html');
  const page = fs.readFileSync(pagePath, 'utf8');
  const landing = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const card = landing.match(/<article class="course-card course-card--react">([\s\S]*?)<\/article>/);

  assert.match(page, /class="course-shell"/);
  assert.match(page, /id="course-sidebar"/);
  assert.match(page, /id="course-content"/);
  assert.match(page, /src="course-navigation\.js"/);
  assert.match(page, /src="course\.js"/);
  assert.match(page, /۲۶ فصل/);
  assert.ok(card, 'React course card must be present');
  assert.match(card[1], /<h3>آموزش <bdi>React<\/bdi><\/h3>/);
  assert.match(card[1], /href="courses\/react\/"/);
});
