const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = process.env.RABBITMQ_SITE_ROOT || path.resolve(__dirname, '..');
const pagePath = path.join(root, 'courses/rabbitmq/index.html');

test('RabbitMQ is reachable from the homepage with an honest learning status', () => {
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const card = home.match(/<article[^>]*course-card--rabbitmq[\s\S]*?<\/article>/)?.[0];
  assert.ok(card, 'The homepage must expose RabbitMQ');
  assert.match(card, /href="courses\/rabbitmq\/"/);
  assert.match(card, /در حال تکمیل/);
  assert.ok(fs.existsSync(pagePath), 'The study link must open an existing page');
});

test('every RabbitMQ navigation anchor and local resource resolves', () => {
  assert.ok(fs.existsSync(pagePath), 'RabbitMQ study page must exist');
  const html = fs.readFileSync(pagePath, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, new Set(ids).size, 'IDs must be unique');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^https?:/.test(url)) continue;
    const [file, anchor] = url.split('#');
    if (file) assert.ok(fs.existsSync(path.resolve(path.dirname(pagePath), file)), url);
    else if (anchor) assert.ok(ids.includes(anchor), `Missing anchor: ${anchor}`);
  }
  assert.match(html, /href="\.\.\/\.\.\/books\/RabbitMQ_01\.pdf"/);
  assert.equal((html.match(/data-source-section="\d+"/g) || []).length, 11);
});

test('completed study content stops at mandatory and separates future topics', () => {
  assert.ok(fs.existsSync(pagePath), 'RabbitMQ study page must exist');
  const html = fs.readFileSync(pagePath, 'utf8');
  assert.match(html, /lang="fa" dir="rtl"/);
  assert.match(html, /data-course-menu-toggle[^>]+aria-controls="course-sidebar"/);
  for (const concept of ['ConnectionFactory', 'CreateChannelAsync', 'QueueBindAsync',
    'Persistent', 'ReceivedAsync', 'BasicAckAsync', 'BasicNackAsync', 'mandatory']) {
    assert.ok(html.includes(concept), `Missing studied concept: ${concept}`);
  }
  assert.match(html, /id="producer-code"[\s\S]*?BasicPublishAsync/);
  assert.match(html, /id="consumer-code"[\s\S]*?BasicConsumeAsync/);
  const future = html.match(/<section[^>]+id="next-steps"[\s\S]*?<\/section>/)?.[0];
  assert.ok(future);
  for (const topic of ['BasicReturn', 'Publisher Confirms', 'Prefetch', 'Dead Letter', 'Idempotency']) {
    assert.ok(future.includes(topic), `Future topic must remain in the roadmap: ${topic}`);
  }
  assert.match(future, /هنوز مطالعه نشده/);
});
