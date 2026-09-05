const fs = require('node:fs');
const path = require('node:path');
const { chapters, chapterFile } = require('../books/distributed-systems-patterns/book-navigation.js');

const root = path.resolve(__dirname, '..');
const outputRoot = path.join(root, 'books', 'distributed-systems-patterns', 'chapters');
const contentRoot = path.join(root, 'books', 'distributed-systems-patterns', 'content');

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

function pagerLink(chapter, relation, label) {
  if (!chapter) return `<a href="../index.html">${label}: صفحهٔ کتاب</a>`;
  return `<a rel="${relation}" href="${chapterFile(chapter)}">${label}: <bdi>${escapeHtml(chapter.title)}</bdi></a>`;
}

function renderPage(chapter, index) {
  const previous = chapters[index - 1];
  const next = chapters[index + 1];
  const contentPath = path.join(contentRoot, `${chapterFile(chapter).replace(/\.html$/, '')}.html`);
  const hasContent = fs.existsSync(contentPath);
  const chapterContent = hasContent
    ? fs.readFileSync(contentPath, 'utf8').trim()
    : `<div class="draft-note">
          <h2>این صفحه برای نگارش آماده است</h2>
          <p>ساختار مستقل این Chapter ایجاد شده و محتوای آموزشی آن در مرحلهٔ بعد اضافه می‌شود.</p>
        </div>`;
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="صفحهٔ Chapter ${chapter.number}: ${escapeHtml(chapter.title)} از کتاب Patterns of Distributed Systems.">
  <title>${escapeHtml(chapter.title)} | Patterns of Distributed Systems</title>
  <script>(()=>{document.documentElement.classList.add('js');try{const t=localStorage.getItem('dotnet-academy-theme');document.documentElement.dataset.theme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch{}})()</script>
  <link rel="stylesheet" href="../../../styles.css">
  <link rel="stylesheet" href="../course.css">
  <script defer src="../book-navigation.js"></script>
  <script defer src="../book.js"></script>
</head>
<body>
  <a class="skip-link" href="#chapter-content">پرش به محتوای Chapter</a>
  <header class="course-header">
    <nav class="course-nav" aria-label="ناوبری کتاب">
      <a class="course-brand" href="../../../index.html">آکادمی دات‌نت</a>
      <span class="course-name"><bdi>Patterns of Distributed Systems</bdi></span>
      <a class="back-link" href="../index.html">صفحهٔ کتاب</a>
      <button id="book-menu-toggle" class="book-menu-toggle" type="button" aria-expanded="false" aria-controls="book-sidebar">فهرست</button>
      <button id="theme-toggle" class="icon-button" type="button" aria-label="فعال‌کردن تم تیره" title="فعال‌کردن تم تیره" aria-pressed="false">
        <svg class="nav-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.6 8.6 0 1 0 20.4 15.2Z"></path></svg>
        <svg class="nav-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.7"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4-1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
      </button>
    </nav>
  </header>

  <div class="book-layout">
    <main id="chapter-content" class="book-main chapter-main">
      <nav class="chapter-breadcrumb" aria-label="مسیر راهنما"><a href="../index.html">کتاب</a><span>/</span><bdi>${escapeHtml(chapter.part.title)}</bdi></nav>
      <article class="chapter-card">
        <p class="chapter-status${hasContent ? ' chapter-status--ready' : ''}">${hasContent ? 'آمادهٔ مطالعه' : 'در حال تدوین'}</p>
        <p class="chapter-number">Chapter ${chapter.number}</p>
        <h1><bdi>${escapeHtml(chapter.title)}</bdi></h1>
        ${chapterContent}
      </article>
      <nav class="chapter-pager" aria-label="Chapter قبلی و بعدی">
        ${pagerLink(previous, 'prev', 'Chapter قبلی')}
        ${pagerLink(next, 'next', 'Chapter بعدی')}
      </nav>
    </main>
    <aside id="book-sidebar" class="book-sidebar" aria-label="فهرست کتاب" data-current-chapter="${chapter.slug}" data-link-prefix="">
      <h2><bdi>Patterns of Distributed Systems</bdi></h2>
      <p>برای مشاهدهٔ فهرست کامل، JavaScript را فعال کنید.</p>
    </aside>
  </div>
</body>
</html>`;
}

fs.mkdirSync(outputRoot, { recursive: true });
for (const [index, chapter] of chapters.entries()) {
  fs.writeFileSync(path.join(outputRoot, chapterFile(chapter)), renderPage(chapter, index), 'utf8');
}

console.log(`Generated ${chapters.length} book chapter pages in ${outputRoot}`);
