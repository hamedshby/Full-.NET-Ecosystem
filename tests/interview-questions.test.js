const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const interviewRoot = path.join(root, 'interview-questions');
const landingPath = path.join(interviewRoot, 'index.html');
const sectionPath = path.join(interviewRoot, 'section-1.html');
const firstAnswerPath = path.join(interviewRoot, 'answers', '01-dotnet-core-vs-framework.html');

test('interview questions are linked from the home navigation', () => {
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(home, /<a href="interview-questions\/">سوالات مصاحبه<\/a>/);
});

test('the interview landing presents section one as a collection card', () => {
  const landing = fs.readFileSync(landingPath, 'utf8');
  assert.match(landing, /class="collection-grid"/);
  assert.match(landing, /class="collection-card" href="section-1\.html"/);
  assert.match(landing, /سوالات بخش اول/);
  assert.match(landing, /<strong>۲۵<\/strong><span>سوال<\/span>/);
  assert.ok(fs.existsSync(sectionPath));
});

test('section one renders 25 self-contained question-and-answer accordions', () => {
  const section = fs.readFileSync(sectionPath, 'utf8');
  const cards = section.match(/<details class="qa-card">/g) ?? [];
  const toggles = section.match(/<summary class="question-pane">/g) ?? [];
  const answerPanes = section.match(/<div class="answer-pane">/g) ?? [];
  const answerSources = [...section.matchAll(/data-answer-src="(answers\/[^"]+\.html)"/g)].map((match) => match[1]);

  assert.equal(cards.length, 25);
  assert.equal(toggles.length, 25);
  assert.equal(answerPanes.length, 25);
  assert.equal(answerSources.length, 25);
  assert.equal(new Set(answerSources).size, 25);
  assert.doesNotMatch(section, /<details class="qa-card" open>/);
  assert.doesNotMatch(section, />سوال<\/span>/);
  assert.doesNotMatch(section, /صفحهٔ کامل پاسخ/);
  assert.doesNotMatch(section, /href="questions\//);
  assert.equal(fs.existsSync(path.join(interviewRoot, 'questions')), false);

  answerSources.forEach((source, index) => {
    assert.match(source, new RegExp(`answers/${String(index + 1).padStart(2, '0')}-`));
    assert.ok(fs.existsSync(path.join(interviewRoot, source)), `missing answer source: ${source}`);
  });
});

test('section one keeps collection navigation without a right sidebar', () => {
  const section = fs.readFileSync(sectionPath, 'utf8');
  assert.doesNotMatch(section, /<aside class="chapter-sidebar"/);
  assert.doesNotMatch(section, /بخش‌های سوالات/);
  assert.match(section, /<a class="back-link" href="index\.html">همهٔ مجموعه‌ها<\/a>/);
});

test('the first accordion contains a complete international interview answer', () => {
  const section = fs.readFileSync(sectionPath, 'utf8');
  const firstCard = section.split('<details class="qa-card">')[1].split('</details>')[0];
  const answer = fs.readFileSync(firstAnswerPath, 'utf8');

  assert.match(section, /<script src="answers\.js" defer><\/script>/);
  assert.match(firstCard, /data-answer-src="answers\/01-dotnet-core-vs-framework\.html"/);
  assert.doesNotMatch(firstCard, /پاسخ کوتاه مناسب مصاحبه/);
  assert.match(answer, /data-answer-content/);
  assert.match(answer, /پاسخ کوتاه مناسب مصاحبه/);
  assert.match(answer, /After \.NET Core 3\.1/);
  assert.match(answer, /تفاوت‌های اصلی/);
  assert.match(answer, /برای پروژهٔ جدید کدام را انتخاب کنیم؟/);
  assert.match(answer, /جمع‌بندی نهایی برای مصاحبه/);
  assert.match(answer, /learn\.microsoft\.com\/dotnet\/core\/introduction/);
  assert.doesNotMatch(firstCard, /پاسخ کامل این سوال در این قسمت قرار می‌گیرد/);
});

test('answer files 02 through 25 have an empty editable answer container', () => {
  const files = fs.readdirSync(path.join(interviewRoot, 'answers'))
    .filter((file) => file.endsWith('.html'))
    .sort();

  assert.equal(files.length, 25);
  files.slice(1).forEach((file) => {
    const html = fs.readFileSync(path.join(interviewRoot, 'answers', file), 'utf8');
    assert.match(html, /<main data-answer-content>/);
    assert.match(html, /<div class="answer-content"><\/div>/);
  });
});
