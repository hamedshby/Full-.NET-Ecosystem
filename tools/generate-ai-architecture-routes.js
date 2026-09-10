const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'courses', 'ai-driven-software-architecture');
const lessonsRoot = path.join(courseRoot, 'lessons');
const indexPath = path.join(courseRoot, 'index.html');
const navigationPath = path.join(courseRoot, 'course-navigation.js');

const authoredLessonMoves = new Map([
  ['lessons/software-architecture.html', 'lessons/ch1-1.html'],
  ['lessons/software-architect-role.html', 'lessons/ch1-2.html'],
  ['lessons/architecture-as-decisions.html', 'lessons/ch1-3.html'],
  ['lessons/adr.html', 'lessons/ch1-4.html'],
  ['lessons/requirements-engineering.html', 'lessons/ch2-1.html'],
  ['lessons/functional-requirements.html', 'lessons/ch2-2.html'],
  ['lessons/spec-driven-development.html', 'lessons/ch2-8.html'],
]);

const decodeText = html => html
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .trim();

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const originalIndex = fs.readFileSync(indexPath, 'utf8');
const learningPathMatch = originalIndex.match(/<section class="learning-path"[\s\S]*?<\/section>/);
if (!learningPathMatch) throw new Error('AI architecture learning path was not found.');

const chapters = [];
let chapterNumber = 0;
const updatedLearningPath = learningPathMatch[0].replace(
  /<details class="chapter"[^>]*>[\s\S]*?<\/details>/g,
  chapterHtml => {
    chapterNumber += 1;
    const chapterTitle = decodeText(chapterHtml.match(/<span class="chapter-title">([\s\S]*?)<\/span>/)?.[1] ?? '');
    const items = [];
    let lessonNumber = 0;
    const updatedChapter = chapterHtml.replace(
      /<li><a href="([^"]+)">([\s\S]*?)<\/a><\/li>/g,
      (lessonHtml, oldHref, titleHtml) => {
        lessonNumber += 1;
        const href = `lessons/ch${chapterNumber}-${lessonNumber}.html`;
        const title = decodeText(titleHtml);
        items.push({ href, title });
        return lessonHtml.replace(oldHref, href);
      },
    );
    chapters.push({ title: chapterTitle, items });
    return updatedChapter;
  },
);

if (chapters.length !== 12) throw new Error(`Expected 12 chapters, found ${chapters.length}.`);
const lessons = chapters.flatMap((chapter, chapterIndex) => chapter.items.map((item, lessonIndex) => ({
  ...item,
  chapter: chapterIndex + 1,
  lesson: lessonIndex + 1,
})));
if (lessons.length !== 95) throw new Error(`Expected 95 lessons, found ${lessons.length}.`);

for (const [oldHref, newHref] of authoredLessonMoves) {
  const source = path.join(courseRoot, oldHref);
  const target = path.join(courseRoot, newHref);
  if (fs.existsSync(source) && !fs.existsSync(target)) fs.renameSync(source, target);
}

const placeholderPage = (current, previous, next) => `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="درس ${escapeHtml(current.title)} از دورهٔ AI-Driven Software Architecture در آکادمی دات‌نت.">
  <title>${escapeHtml(current.title)} | آکادمی دات‌نت</title>
  <script>
    (() => {
      document.documentElement.classList.add('js');
      let storedTheme = null;
      try { storedTheme = localStorage.getItem('dotnet-academy-theme'); } catch (_) {}
      const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : systemDark ? 'dark' : 'light';
    })();
  </script>
  <link rel="stylesheet" href="../../../styles.css">
  <link rel="stylesheet" href="../course.css">
  <script src="../../../script.js" defer></script>
  <script src="../course-navigation.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#lesson-content">پرش به محتوای درس</a>
  <header class="course-header">
    <nav class="course-nav" aria-label="ناوبری درس">
      <a class="course-brand" href="../../../index.html">آکادمی دات‌نت</a>
      <span class="course-name"><bdi>AI-Driven Software Architecture</bdi></span>
      <a class="back-link" href="../index.html">بازگشت به سرفصل‌های دوره</a>
      <button id="theme-toggle" class="icon-button" type="button" aria-label="فعال‌کردن تم تیره" title="فعال‌کردن تم تیره" aria-pressed="false">
        <svg class="nav-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.6 8.6 0 1 0 20.4 15.2Z"></path></svg>
        <svg class="nav-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.7"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
      </button>
    </nav>
  </header>
  <div class="docs-layout">
    <aside id="course-sidebar" class="learning-path docs-sidebar" aria-label="فهرست مطالب دوره"></aside>
    <main id="lesson-content" class="lesson-page">
      <nav class="lesson-breadcrumb" aria-label="مسیر راهنما">
        <a href="../index.html">AI-Driven Software Architecture</a>
        <span aria-hidden="true">/</span>
        <span>فصل ${current.chapter}، درس ${current.lesson}</span>
      </nav>
      <article class="lesson-card">
        <p class="eyebrow">AI-Driven Software Architecture</p>
        <h1>${escapeHtml(current.title)}</h1>
        <p class="lesson-status">محتوای آموزشی این درس در این صفحه قرار خواهد گرفت.</p>
        <nav class="lesson-pager" aria-label="درس قبلی و بعدی">
          ${previous ? `<a href="${path.basename(previous.href)}">درس قبلی: ${escapeHtml(previous.title)}</a>` : '<a href="../index.html">بازگشت به فهرست دوره</a>'}
          ${next ? `<a href="${path.basename(next.href)}">درس بعدی: ${escapeHtml(next.title)}</a>` : '<a href="../index.html">بازگشت به فهرست دوره</a>'}
        </nav>
      </article>
    </main>
  </div>
</body>
</html>
`;

for (const [index, lesson] of lessons.entries()) {
  const filePath = path.join(courseRoot, lesson.href);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, placeholderPage(lesson, lessons[index - 1], lessons[index + 1]), 'utf8');
  }
}

const authoredReferenceReplacements = new Map(
  [...authoredLessonMoves].map(([oldHref, newHref]) => [path.basename(oldHref), path.basename(newHref)]),
);
for (const lesson of lessons) {
  const filePath = path.join(courseRoot, lesson.href);
  let html = fs.readFileSync(filePath, 'utf8');
  for (const [oldName, newName] of authoredReferenceReplacements) html = html.replaceAll(oldName, newName);
  html = html.replace(
    /\.\.\/lesson\.html\?chapter=1&amp;lesson=1&amp;title=AI-Driven%20Software%20Architecture%20%DA%86%DB%8C%D8%B3%D8%AA%D8%9F/g,
    'ch1-5.html',
  );
  html = html.replace(
    /\.\.\/lesson\.html\?chapter=2&amp;lesson=1&amp;title=Non-Functional%20Requirements/g,
    'ch2-3.html',
  );
  fs.writeFileSync(filePath, html, 'utf8');
}

const updatedIndex = originalIndex.replace(learningPathMatch[0], updatedLearningPath);
fs.writeFileSync(indexPath, updatedIndex, 'utf8');

const navigationData = JSON.stringify(chapters).replace(/</g, '\\u003c');
const navigationScript = `(() => {
  const container = document.getElementById('course-sidebar');
  if (!container) return;
  const chapters = ${navigationData};
  const scriptUrl = new URL(document.currentScript.src);
  const courseBase = new URL('./', scriptUrl);
  const currentPath = window.location.pathname;
  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  container.innerHTML = \`
    <div class="section-heading"><p class="eyebrow">فهرست مطالب</p></div>
    <div class="chapters">
      \${chapters.map((chapter, chapterIndex) => \`
        <details class="chapter" \${chapterIndex === 0 ? 'open' : ''}>
          <summary><span class="chapter-title">\${escapeHtml(chapter.title)}</span></summary>
          <ol>\${chapter.items.map(item => {
            const url = new URL(item.href, courseBase);
            const active = url.pathname === currentPath ? ' aria-current="page"' : '';
            return \`<li><a href="\${url.href}"\${active}>\${escapeHtml(item.title)}</a></li>\`;
          }).join('')}</ol>
        </details>\`).join('')}
    </div>\`;

  const activeLink = container.querySelector('[aria-current="page"]');
  if (activeLink) {
    const activeChapter = activeLink.closest('details');
    activeChapter.open = true;
    requestAnimationFrame(() => activeLink.scrollIntoView({ block: 'nearest' }));
  }
})();
`;
fs.writeFileSync(navigationPath, navigationScript, 'utf8');

console.log(`Generated ${lessons.length} file-based AI architecture lesson routes.`);
