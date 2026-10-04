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
  assert.match(html, /href="\.\.\/\.\.\/books\/RabbitMQ_02\.pdf"/);
  assert.equal((html.match(/data-source-section="\d+"/g) || []).length, 20);
  assert.equal((html.match(/data-source-file="RabbitMQ_02"/g) || []).length, 9);
});

test('study content includes the second book and separates unfinished retry work', () => {
  assert.ok(fs.existsSync(pagePath), 'RabbitMQ study page must exist');
  const html = fs.readFileSync(pagePath, 'utf8');
  assert.match(html, /lang="fa" dir="rtl"/);
  assert.match(html, /data-course-menu-toggle[^>]+aria-controls="course-sidebar"/);
  for (const concept of ['ConnectionFactory', 'CreateChannelAsync', 'QueueBindAsync',
    'Persistent', 'ReceivedAsync', 'BasicAckAsync', 'BasicNackAsync', 'mandatory',
    'BasicReturnAsync', 'CreateChannelOptions', 'publisherConfirmationTrackingEnabled',
    'MessageId', 'UX_Inbox_MessageId', 'x-dead-letter-exchange', 'x-message-ttl',
    'notification.retry', 'payment.notification.retry.5s.v2.queue']) {
    assert.ok(html.includes(concept), `Missing studied concept: ${concept}`);
  }
  assert.match(html, /id="producer-code"[\s\S]*?BasicPublishAsync/);
  assert.match(html, /id="consumer-code"[\s\S]*?BasicConsumeAsync/);
  const future = html.match(/<section[^>]+id="next-steps"[\s\S]*?<\/section>/)?.[0];
  assert.ok(future);
  for (const topic of ['Prefetch', 'QoS', 'Retry', 'شمارنده', 'سقف تلاش‌ها', 'JSON']) {
    assert.ok(future.includes(topic), `Future topic must remain in the roadmap: ${topic}`);
  }
  assert.match(future, /هنوز مطالعه نشده/);
  assert.match(html, /id="implementation-boundary"[\s\S]*?یک سامانهٔ کامل Retry نیستند/);
});
