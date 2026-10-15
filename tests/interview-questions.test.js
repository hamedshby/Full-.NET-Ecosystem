const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const interviewRoot = path.join(root, 'interview-questions');
const landingPath = path.join(interviewRoot, 'index.html');
const sectionPath = path.join(interviewRoot, 'section-1.html');
const oopSectionPath = path.join(interviewRoot, 'section-2.html');
const behpardazPrepPath = path.join(interviewRoot, 'behpardaz-interview-prep.html');
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

test('the interview landing presents the ChatGPT OOP collection as a second card', () => {
  const landing = fs.readFileSync(landingPath, 'utf8');
  assert.match(landing, /class="collection-card" href="section-2\.html"/);
  assert.match(landing, /سوالات مصاحبه OOP از چت جی پی تی/);
  assert.match(landing, /<strong>۳۱<\/strong><span>سوال<\/span>/);
  assert.match(landing, /<strong>۹<\/strong><span>دسته<\/span>/);
  assert.ok(fs.existsSync(oopSectionPath));
});

test('the interview landing presents the Behpardaz preparation collection as a third card', () => {
  const landing = fs.readFileSync(landingPath, 'utf8');
  const prep = fs.readFileSync(behpardazPrepPath, 'utf8');
  const cards = landing.match(/class="collection-card"/g) ?? [];

  assert.equal(cards.length, 3);
  assert.match(landing, /class="collection-card" href="behpardaz-interview-prep\.html"/);
  assert.match(landing, /آمادگی مصاحبه به‌پرداز/);
  assert.match(landing, /<strong>۸۴<\/strong><span>سوال<\/span>/);
  assert.match(landing, /<strong>۱۹<\/strong><span>بخش<\/span>/);
  assert.match(landing, /<span class="collection-count">۳ مجموعه<\/span>/);
  assert.match(prep, /<h1>آمادگی مصاحبه \.NET Developer — بهپرداز همراه سامانه اول<\/h1>/);
  assert.equal((prep.match(/<details class="q">/g) ?? []).length, 84);
});

test('the interview landing uses the shared light and dark theme control', () => {
  const landing = fs.readFileSync(landingPath, 'utf8');
  const styles = fs.readFileSync(path.join(interviewRoot, 'styles.css'), 'utf8');

  assert.match(landing, /localStorage\.getItem\('dotnet-academy-theme'\)/);
  assert.match(landing, /dataset\.theme\s*=/);
  assert.match(landing, /id="theme-toggle"/);
  assert.doesNotMatch(landing, /id="home-theme-toggle"|data-home-theme-label/);
  assert.match(landing, /theme-icon-moon/);
  assert.match(landing, /theme-icon-sun/);
  assert.match(landing, /<script src="\.\.\/script\.js" defer><\/script>/);
  assert.match(styles, /\[data-theme="light"\]/);
  assert.match(styles, /\[data-theme="dark"\] \.theme-icon-sun\s*\{\s*display: block/);
  assert.match(styles, /\[data-home-theme="modern"\]/);
  assert.match(styles, /\[data-home-theme="classic"\]\s*\{[^}]*color-scheme:\s*light/);
  assert.match(styles, /\[data-home-theme="classic"\]\s+\.collection-card\s*\{/);
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

test('the OOP collection renders all 31 questions from both PDFs in nine topic groups', () => {
  const section = fs.readFileSync(oopSectionPath, 'utf8');
  const cards = section.match(/<details class="qa-card">/g) ?? [];
  const answerSources = [...section.matchAll(/data-answer-src="(oop-answers\/[^\"]+\.html)"/g)]
    .map((match) => match[1]);

  assert.equal(cards.length, 31);
  assert.equal(answerSources.length, 31);
  assert.equal(new Set(answerSources).size, 31);
  assert.match(section, /Classes, Objects, State, and Encapsulation/);
  assert.match(section, /Inheritance and Polymorphism/);
  assert.match(section, /Abstraction, Interfaces, and Composition/);
  assert.match(section, /Dependency Injection in \.NET/);
  assert.match(section, /Encapsulation vs Abstraction/);
  assert.match(section, /Object Relationships/);
  assert.match(section, /Design Quality/);
  assert.match(section, /Equality and Hashing/);
  assert.match(section, /Value Types, Reference Types, and Records/);
  assert.match(section, /What is the difference between a class and an object\?/);
  assert.match(section, /What is the difference between Encapsulation and Abstraction\?/);
  assert.match(section, /What is the difference between Association, Aggregation, and Composition in OOP\?/);
  assert.match(section, /What is the difference between record class and record struct in C#\?/);

  answerSources.forEach((source) => {
    assert.ok(fs.existsSync(path.join(interviewRoot, source)), `missing OOP answer source: ${source}`);
  });
});

test('every OOP answer contains the interview answer from the PDF', () => {
  const files = fs.readdirSync(path.join(interviewRoot, 'oop-answers'))
    .filter((file) => file.endsWith('.html'))
    .sort();

  assert.equal(files.length, 31);
  files.forEach((file) => {
    const html = fs.readFileSync(path.join(interviewRoot, 'oop-answers', file), 'utf8');
    assert.match(html, /<main data-answer-content>/);
    assert.match(html, /class="interview-short"/);
    assert.match(html, /class="answer-note"/);
    assert.doesNotMatch(html, /<div class="answer-content"><\/div>/);
  });

  const bankAccount = fs.readFileSync(path.join(interviewRoot, 'oop-answers', '04-bank-account-encapsulation.html'), 'utf8');
  const scopedSingleton = fs.readFileSync(path.join(interviewRoot, 'oop-answers', '18-scoped-inside-singleton.html'), 'utf8');
  assert.match(bankAccount, /public void Withdraw\(decimal amount\)/);
  assert.match(scopedSingleton, /IServiceScopeFactory/);
});

test('every OOP interview answer shows one Persian translation below the English answer', () => {
  const files = fs.readdirSync(path.join(interviewRoot, 'oop-answers'))
    .filter((file) => file.endsWith('.html'))
    .sort();

  assert.equal(files.length, 31);
  files.forEach((file) => {
    const html = fs.readFileSync(path.join(interviewRoot, 'oop-answers', file), 'utf8');
    const englishAnswerIndex = html.indexOf('class="interview-short"');
    const persianTranslationIndex = html.indexOf('class="interview-translation"');

    assert.ok(englishAnswerIndex >= 0, `missing English interview answer: ${file}`);
    assert.ok(persianTranslationIndex > englishAnswerIndex, `Persian translation must follow the English answer: ${file}`);
    assert.equal((html.match(/class="interview-translation"/g) ?? []).length, 1, `expected one Persian translation: ${file}`);
    assert.match(html, /class="interview-translation" lang="fa" dir="rtl"/);
  });

  const firstAnswer = fs.readFileSync(path.join(interviewRoot, 'oop-answers', '01-class-vs-object.html'), 'utf8');
  const lastAnswer = fs.readFileSync(path.join(interviewRoot, 'oop-answers', '31-record-class-vs-record-struct.html'), 'utf8');
  assert.match(firstAnswer, /نمونه‌ای از آن <bdi>Class<\/bdi> در زمان اجرا/);
  assert.match(lastAnswer, /یکی <bdi>Reference Type<\/bdi> و دیگری <bdi>Value Type<\/bdi> است/);
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

test('answer files 03 through 25 have an empty editable answer container', () => {
  const files = fs.readdirSync(path.join(interviewRoot, 'answers'))
    .filter((file) => file.endsWith('.html'))
    .sort();

  assert.equal(files.length, 25);
  files.slice(2).forEach((file) => {
    const html = fs.readFileSync(path.join(interviewRoot, 'answers', file), 'utf8');
    assert.match(html, /<main data-answer-content>/);
    assert.match(html, /<div class="answer-content"><\/div>/);
  });
});
