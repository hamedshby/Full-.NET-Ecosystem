const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('home page links to the Java Backend curriculum', () => {
  const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const card = home.match(/<article class="course-card course-card--java">([\s\S]*?)<\/article>/);

  assert.ok(card, 'Java course card must be present');
  assert.match(card[1], /آموزش <bdi>Java Backend<\/bdi>/);
  assert.match(card[1], /۱۵ فصل و ۱۴۹ ریزدرس/);
  assert.match(card[1], /href="courses\/java\/"/);
});

test('Java curriculum exposes all 15 PDF chapters as cards', () => {
  const page = fs.readFileSync(path.join(root, 'courses', 'java', 'index.html'), 'utf8');
  const chapterCards = page.match(/<article class="chapter-card(?: [^"]+)?">/g) || [];

  assert.equal(chapterCards.length, 15);
  assert.match(page, /۱۵ فصل/);
  assert.match(page, /۱۴۹/);
  assert.match(page, /مبانی زبان <bdi>Java<\/bdi>/);
  assert.match(page, /برنامه‌نویسی شی‌گرا در <bdi>Java<\/bdi>/);
  assert.match(page, /<bdi>Spring Framework<\/bdi> و <bdi>Spring Boot<\/bdi>/);
  assert.match(page, /پروژهٔ واقعی و آمادگی ورود به تیم/);
  assert.match(page, /Java_Backend_15_Chapters\.pdf/);
  assert.match(page, /href="chapters\/chapter-01\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_02\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_03\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_04\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_05\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_06\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_07\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_08\.html"/);
  assert.match(page, /href="chapters\/Java_Chapter_09\.html"/);
});

test('Java chapter one contains all 10 supplied lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'chapter-01.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 10);
  assert.match(chapter, /تفاوت JDK، JRE و JVM/);
  assert.match(chapter, /String، StringBuilder و مقایسه رشته‌ها/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter two contains all 10 supplied OOP lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_02.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 10);
  assert.match(chapter, /Class و Object در Java/);
  assert.match(chapter, /Record و Enum در Java/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter three contains all 8 supplied essentials lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_03.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 8);
  assert.match(chapter, /Wrapper Classes و Autoboxing/);
  assert.match(chapter, /Try-with-resources و AutoCloseable/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter four contains all 10 supplied collections lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_04.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 10);
  assert.match(chapter, /Collection Framework و ساختار مجموعه‌ها/);
  assert.match(chapter, /Queue و Deque و الگوی FIFO/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter five contains all 10 supplied stream lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_05.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 10);
  assert.match(chapter, /Lambda Expression و Functional Interface/);
  assert.match(chapter, /تفاوت Stream و Parallel Stream/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter six contains all 8 supplied JVM memory lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_06.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 8);
  assert.match(chapter, /مفهوم Stack و Heap در Java/);
  assert.match(chapter, /ابزارهای عیب‌یابی با Heap Dump و JFR/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter seven contains all 10 supplied concurrency lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_07.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 10);
  assert.match(chapter, /مفهوم Thread و تفاوت start و run/);
  assert.match(chapter, /مفهوم Deadlock و ترتیب دریافت قفل‌ها/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter eight contains all 10 supplied build-tool lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_08.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 10);
  assert.match(chapter, /Maven و Gradle؛ ابزارهای Build/);
  assert.match(chapter, /مفهوم Maven Profile و Spring Profile/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});

test('Java chapter nine contains all 10 supplied Spring lessons', () => {
  const chapter = fs.readFileSync(path.join(root, 'courses', 'java', 'chapters', 'Java_Chapter_09.html'), 'utf8');
  const lessonSections = chapter.match(/class="lesson-section"/g) || [];

  assert.equal(lessonSections.length, 10);
  assert.match(chapter, /تفاوت Spring Framework و Spring Boot/);
  assert.match(chapter, /معماری Controller، Service و Repository در Spring Boot/);
  assert.match(chapter, /href="\.\.\/"[^>]*>بازگشت به سرفصل‌های جاوا/);
  assert.match(chapter, /class="copy-code"/);
});
