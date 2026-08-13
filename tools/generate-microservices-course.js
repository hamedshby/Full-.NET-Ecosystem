const fs = require('node:fs');
const path = require('node:path');
const { availableLessons, microservicesChapters } = require('../courses/microservices/course-navigation.js');

const root = path.join(__dirname, '..');
const sourceRoot = path.join(root, '..', 'MicroService', 'chapters');
const outputRoot = path.join(root, 'courses', 'microservices', 'lessons');

function escapeAttribute(value) {
  return value.replace(/[&<>"]/g, character => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' })[character]);
}

function plainText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanSource(source) {
  return source
    .replace(/<!--\s*Breadcrumb\s*-->[\s\S]*?<div class="article-header">/i, '<div class="article-header">')
    .replace(/<!--\s*Navigation Footer\s*-->[\s\S]*?<div class="nav-footer">[\s\S]*?<\/div>\s*<\/a>\s*<\/div>\s*$/i, '')
    .trim();
}

function chapterTitleFor(lessonId) {
  return microservicesChapters.find(chapter => chapter.lessons.some(lesson => lesson.id === lessonId))?.title || '';
}

function pagerLink(lesson, relation, label) {
  if (!lesson) return `<a href="../../../index.html">${label}: صفحهٔ دوره‌ها</a>`;
  return `<a rel="${relation}" href="${lesson.id}.html">${label}: <bdi>${lesson.title}</bdi></a>`;
}

function renderPage(lesson, source, index) {
  const content = cleanSource(source);
  const sourceTitle = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  const title = plainText(sourceTitle || lesson.title);
  const bodyText = plainText(content).replace(title, '').trim();
  const description = `آموزش ${title} در راهنمای جامع Microservices؛ ${bodyText.slice(0, 125)}`;
  const previous = availableLessons[index - 1];
  const next = availableLessons[index + 1];

  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeAttribute(description)}">
  <title>${escapeAttribute(title)} | راهنمای جامع Microservices</title>
  <script>(()=>{document.documentElement.classList.add('js');try{const t=localStorage.getItem('dotnet-academy-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{}})()</script>
  <link rel="stylesheet" href="../course.css">
  <script defer src="../course-navigation.js"></script>
  <script defer src="../course.js"></script>
</head>
<body>
  <a class="skip-link" href="#lesson-content">پرش به محتوای درس</a>
  <header class="course-header">
    <a href="../../../index.html">آکادمی دات‌نت</a>
    <span class="course-name">راهنمای جامع <bdi>Microservices</bdi></span>
    <button id="course-menu-toggle" type="button" aria-expanded="false" aria-controls="course-sidebar">فهرست فصل‌ها</button>
    <button id="theme-toggle" type="button" aria-pressed="false" aria-label="فعال‌کردن تم تیره" title="فعال‌کردن تم تیره">تم</button>
  </header>
  <div class="course-shell">
    <aside id="course-sidebar" class="course-sidebar" aria-label="فهرست درس‌های Microservices" data-current-lesson="${lesson.id}">
      <h2>راهنمای جامع <bdi>Microservices</bdi></h2>
      <p>برای مشاهدهٔ فهرست کامل، JavaScript را فعال کنید.</p>
    </aside>
    <main id="lesson-content" class="lesson-content">
      <nav class="breadcrumb" aria-label="مسیر راهنما"><a href="../../../index.html">دوره‌ها</a><span>/</span><bdi>${chapterTitleFor(lesson.id)}</bdi></nav>
      <div class="lesson-meta"><span class="availability-badge">در دسترس</span></div>
      <div class="lesson-body">
${content}
      </div>
      <nav class="lesson-pager" aria-label="درس قبلی و بعدی">
        ${pagerLink(previous, 'prev', 'درس قبلی')}
        ${pagerLink(next, 'next', 'درس بعدی')}
      </nav>
    </main>
  </div>
  <div id="copy-status" role="status" aria-live="polite"></div>
</body>
</html>`;
}

fs.mkdirSync(outputRoot, { recursive: true });
for (const [index, lesson] of availableLessons.entries()) {
  const sourcePath = path.join(sourceRoot, `${lesson.id}.html`);
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing source chapter: ${sourcePath}`);
  const source = fs.readFileSync(sourcePath, 'utf8');
  fs.writeFileSync(path.join(outputRoot, `${lesson.id}.html`), renderPage(lesson, source, index), 'utf8');
}

console.log(`Generated ${availableLessons.length} Microservices lessons in ${outputRoot}`);
