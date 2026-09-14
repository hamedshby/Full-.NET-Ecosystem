const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const landing = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const index = fs.readFileSync(path.join(root, 'articles', 'index.html'), 'utf8');
const article = fs.readFileSync(path.join(root, 'articles', 'kafka-financial-blueprint.html'), 'utf8');

test('the landing page exposes a real articles section and route', () => {
  assert.match(landing, /<section id="articles"/);
  assert.match(landing, /href="articles\/kafka-financial-blueprint\.html"/);
  assert.ok(fs.existsSync(path.join(root, 'articles', 'index.html')));
  assert.ok(fs.existsSync(path.join(root, 'articles', 'kafka-financial-blueprint.html')));
});

test('the articles index links to the Kafka financial blueprint', () => {
  assert.match(index, /href="kafka-financial-blueprint\.html"/);
  assert.match(index, /پایداری تراکنش‌ها/);
});

test('the article preserves the source and explains the end-to-end reliability boundary', () => {
  for (const requiredConcept of [
    'Immutable Log',
    'Manual Commit',
    'Idempotent Consumer',
    'Transactional Outbox',
    'Event Sourcing',
    'CQRS',
    'Poison Pill',
    'DLQ'
  ]) {
    assert.match(article, new RegExp(requiredConcept));
  }

  assert.match(article, /\.\.\/docs\/1788862848657\.pdf/);
  assert.match(article, /lang="fa" dir="rtl"/);
  assert.match(article, /<main id="article-content">/);
  assert.match(article, /processed_messages/);
});
