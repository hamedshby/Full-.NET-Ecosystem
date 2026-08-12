const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const base = path.join(root, 'courses', 'dotnet-senior', 'csharp');

function pages() {
  if (!fs.existsSync(base)) return [];
  return fs.readdirSync(base, { recursive: true }).filter(x => x.endsWith('.html')).map(x => path.join(base, x));
}

test('course has exactly 30 independent complete question pages', () => {
  const files = pages();
  assert.equal(files.length, 30);
  const levels = { 'مقدماتی': 0, 'متوسط': 0, 'ارشد': 0 };
  const titles = new Set();
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /<html lang="fa" dir="rtl">/);
    assert.match(html, /<meta name="description" content="[^"]{30,}"/);
    const h1 = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(h1.length, 1, file);
    assert.ok(!titles.has(h1[0][1]), `duplicate h1: ${file}`); titles.add(h1[0][1]);
    for (const heading of ['پاسخ کوتاه مصاحبه‌ای','توضیح کامل','اشتباهات رایج','در پروژهٔ واقعی','جمع‌بندی برای مصاحبه']) assert.ok(html.includes(heading), `${heading}: ${file}`);
    assert.match(html, /<pre[^>]*><code[\s\S]*?<\/code><\/pre>/);
    assert.match(html, /data-current-question="[^"]+"/);
    const pageBadge = html.match(/class="level-badge" data-level="([^"]+)"/);
    const level = pageBadge?.[1];
    assert.ok(level, `level missing: ${file}`); levels[level]++;
  }
  assert.deepEqual(levels, { 'مقدماتی': 8, 'متوسط': 15, 'ارشد': 7 });
});

test('six topics each contain five pages', () => {
  const counts = {};
  for (const file of pages()) counts[path.basename(path.dirname(file))] = (counts[path.basename(path.dirname(file))] || 0) + 1;
  assert.deepEqual(counts, { collections:5, generics:5, oop:5, operators:5, records:5, types:5 });
});
