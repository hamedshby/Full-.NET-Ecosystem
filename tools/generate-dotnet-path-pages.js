const fs = require('node:fs');
const path = require('node:path');
const { dotnetChapters } = require('../courses/dotnet-path/course-navigation.js');

const root = path.join(__dirname, '..');
const lessonsRoot = path.join(root, 'courses', 'dotnet-path', 'lessons');

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

const displayLessonTitle = title => title.replace(/^\d+(?:\.\d+)+\s+/, '');

function renderLessonPage(chapter, lesson) {
  const chapterTitle = escapeHtml(chapter.title);
  const lessonTitle = escapeHtml(displayLessonTitle(lesson.title));

  return `<!doctype html>
<html lang="fa" dir="rtl">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="صفحه درس ${lessonTitle} از مسیر حرفه‌ای .NET.">
  <title>${lessonTitle} | مسیر حرفه‌ای .NET</title>
  <script>(() => { document.documentElement.classList.add('js'); try { const t = localStorage.getItem('dotnet-academy-theme'); document.documentElement.dataset.theme = t === 'dark' || t === 'light' ? t : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' } catch { } })()</script>
  <link rel="stylesheet" href="../../microservices/course.css">
  <script defer src="../course-navigation.js"></script>
  <script defer src="../course.js"></script>
</head>

<body>
  <a class="skip-link" href="#lesson-content">پرش به محتوای درس</a>
  <header class="course-header">
    <a href="../../../index.html">آکادمی دات‌نت</a>
    <span class="course-name">مسیر حرفه‌ای <bdi>.NET</bdi></span>
    <button id="course-menu-toggle" type="button" aria-expanded="false" aria-controls="course-sidebar">فهرست فصل‌ها</button>
    <button id="theme-toggle" type="button" aria-pressed="false" aria-label="فعال‌کردن تم تیره" title="فعال‌کردن تم تیره">تم</button>
  </header>

  <div class="course-shell">
    <aside id="course-sidebar" class="course-sidebar" aria-label="سرفصل‌های آموزش دات‌نت" data-current-lesson="${lesson.id}">
      <h2>سرفصل‌های آموزش <bdi>.NET</bdi></h2>
      <p>برای مشاهدهٔ فهرست کامل، JavaScript را فعال کنید.</p>
    </aside>

    <main id="lesson-content" class="lesson-content">
      <nav class="breadcrumb" aria-label="مسیر راهنما"><a href="../../../index.html#courses">دوره‌ها</a><span>/</span>${chapterTitle}</nav>
      <div class="lesson-meta"><span class="availability-badge">در دسترس</span></div>
      <div class="lesson-body">
        <div class="article-header">
          <h1>${lessonTitle}</h1>
        </div>
        <div class="divider"></div>
        <div class="content"></div>
      </div>
    </main>
  </div>
</body>

</html>
`;
}

fs.mkdirSync(lessonsRoot, { recursive: true });

let generatedCount = 0;
for (const chapter of dotnetChapters) {
  for (const lesson of chapter.lessons) {
    if (lesson.id === 'oop-introduction') continue;
    fs.writeFileSync(
      path.join(lessonsRoot, `${lesson.id}.html`),
      renderLessonPage(chapter, lesson),
      'utf8'
    );
    generatedCount += 1;
  }
}

console.log(`Generated ${generatedCount} empty .NET lesson pages.`);
