const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'courses', 'system-design');
const lessonsRoot = path.join(courseRoot, 'lessons');

const chapters = [
  ['Fundamentals', ['Scalability', 'Availability', 'Reliability', 'Latency', 'Throughput', 'Vertical vs Horizontal Scaling', 'Stateless vs Stateful']],
  ['Networking & Request Flow', ['DNS', 'HTTP / HTTPS', 'REST', 'gRPC', 'Reverse Proxy', 'Load Balancer', 'API Gateway']],
  ['Database', ['SQL vs NoSQL', 'Index', 'Replication', 'Read Replica', 'Partitioning', 'Sharding', 'Transactions', 'Isolation Level', 'Optimistic / Pessimistic Concurrency']],
  ['Caching', ['Redis', 'Cache Aside', 'Write Through', 'Cache Invalidation', 'Distributed Cache', 'Cache Stampede']],
  ['Messaging', ['RabbitMQ', 'Kafka', 'Queue vs Pub/Sub', 'At-least-once Delivery', 'Duplicate Message', 'Idempotency', 'Dead Letter Queue']],
  ['Distributed Systems', ['CAP Theorem', 'Strong Consistency', 'Eventual Consistency', 'Distributed Transaction', 'Saga', 'Outbox / Inbox']],
  ['Reliability', ['Retry', 'Timeout', 'Circuit Breaker', 'Rate Limiting', 'Bulkhead', 'Health Check', 'Graceful Degradation']],
  ['Microservices Design', ['Service Boundary', 'Database per Service', 'Sync vs Async Communication', 'API Gateway', 'Service Discovery', 'Event-Driven Architecture']],
  ['Observability', ['Logging', 'Metrics', 'Distributed Tracing', 'Correlation ID', 'OpenTelemetry']],
  ['تمرین‌های واقعی System Design', ['URL Shortener', 'Notification System', 'Order Management', 'Wallet', 'Payment Gateway', 'Banking Transaction System']],
].map(([title, items], chapterIndex) => ({
  number: chapterIndex + 1,
  title,
  items: items.map((title, lessonIndex) => ({
    title,
    lesson: lessonIndex + 1,
    href: `lessons/ch${chapterIndex + 1}-${lessonIndex + 1}.html`,
  })),
}));

const lessons = chapters.flatMap(chapter => chapter.items.map(item => ({
  ...item,
  chapter: chapter.number,
  chapterTitle: chapter.title,
})));

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const themeScript = `
    (() => {
      document.documentElement.classList.add('js');
      let storedTheme = null;
      try { storedTheme = localStorage.getItem('dotnet-academy-theme'); } catch (_) {}
      const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : systemDark ? 'dark' : 'light';
    })();`;

const themeButton = `
      <button id="theme-toggle" class="icon-button" type="button" aria-label="فعال‌کردن تم تیره" title="فعال‌کردن تم تیره" aria-pressed="false">
        <svg class="nav-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.6 8.6 0 1 0 20.4 15.2Z"></path></svg>
        <svg class="nav-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.7"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
      </button>`;

function lessonPage(current, previous, next) {
  const previousLink = previous
    ? `<a href="${path.basename(previous.href)}">درس قبلی: <bdi>${escapeHtml(previous.title)}</bdi></a>`
    : '<a href="../index.html">بازگشت به فهرست دوره</a>';
  const nextLink = next
    ? `<a href="${path.basename(next.href)}">درس بعدی: <bdi>${escapeHtml(next.title)}</bdi></a>`
    : '<a href="../index.html">بازگشت به فهرست دوره</a>';

  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="صفحهٔ درس ${escapeHtml(current.title)} از راهنمای طراحی سیستم در آکادمی دات‌نت.">
  <title>${escapeHtml(current.title)} | راهنمای طراحی سیستم</title>
  <script>${themeScript}
  </script>
  <link rel="stylesheet" href="../../../styles.css">
  <link rel="stylesheet" href="../../ai-agent/course.css">
  <link rel="stylesheet" href="../course.css">
  <script src="../../../script.js" defer></script>
  <script src="../course-navigation.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#lesson-content">پرش به محتوای درس</a>
  <header class="course-header">
    <nav class="course-nav" aria-label="ناوبری درس">
      <a class="course-brand" href="../../../index.html">آکادمی دات‌نت</a>
      <span class="course-name">راهنمای طراحی سیستم</span>
      <a class="back-link" href="../index.html">بازگشت به سرفصل‌های دوره</a>${themeButton}
    </nav>
  </header>
  <div class="docs-layout">
    <aside id="course-sidebar" class="learning-path docs-sidebar" aria-label="فهرست مطالب دوره"></aside>
    <main id="lesson-content" class="lesson-page">
      <nav class="lesson-breadcrumb" aria-label="مسیر راهنما">
        <a href="../index.html">راهنمای طراحی سیستم</a>
        <span aria-hidden="true">/</span>
        <span>فصل ${current.chapter}، درس ${current.lesson}</span>
      </nav>
      <article class="lesson-card">
        <p class="eyebrow">فصل ${current.chapter} از ۱۰</p>
        <p class="lesson-chapter"><bdi>${escapeHtml(current.chapterTitle)}</bdi></p>
        <h1><bdi>${escapeHtml(current.title)}</bdi></h1>
        <div id="lesson-body" class="lesson-empty" data-content-status="empty" aria-label="محتوای آموزشی درس"></div>
        <nav class="lesson-pager" aria-label="درس قبلی و بعدی">
          ${previousLink}
          ${nextLink}
        </nav>
      </article>
    </main>
  </div>
</body>
</html>
`;
}

const navigationData = JSON.stringify(chapters).replace(/</g, '\\u003c');
const navigationScript = `(() => {
  const container = document.getElementById('course-sidebar');
  if (!container) return;
  const chapters = ${navigationData};
  const courseBase = new URL('./', new URL(document.currentScript.src));
  const currentPath = window.location.pathname;
  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  container.innerHTML = \`<div class="section-heading"><p class="eyebrow">فهرست مطالب</p></div>
    <div class="chapters">\${chapters.map(chapter => \`<details class="chapter">
      <summary><span class="chapter-number">\${String(chapter.number).padStart(2, '0')}</span><span class="chapter-title"><bdi>\${escapeHtml(chapter.title)}</bdi></span></summary>
      <ol>\${chapter.items.map(item => {
        const url = new URL(item.href, courseBase);
        const active = url.pathname === currentPath ? ' aria-current="page"' : '';
        return \`<li><a href="\${url.href}"\${active}><bdi>\${escapeHtml(item.title)}</bdi></a></li>\`;
      }).join('')}</ol>
    </details>\`).join('')}</div>\`;

  const activeLink = container.querySelector('[aria-current="page"]');
  if (activeLink) {
    activeLink.closest('details').open = true;
    requestAnimationFrame(() => activeLink.scrollIntoView({ block: 'nearest' }));
  }
})();
`;

function linkSyllabus() {
  const indexPath = path.join(courseRoot, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  for (const chapter of chapters) {
    for (const item of chapter.items) {
      const title = escapeHtml(item.title);
      const statuses = chapter.number === 10 ? ['تمرین', 'محتوا به‌زودی'] : ['به‌زودی', 'محتوا به‌زودی'];
      const unlinked = `<li class="course-topic"><span><bdi>${title}</bdi></span><small>${statuses[0]}</small></li>`;
      const linked = `<li class="course-topic"><a href="${item.href}"><bdi>${title}</bdi></a><small>${statuses[1]}</small></li>`;
      html = html.replace(unlinked, linked);
    }
  }

  fs.writeFileSync(indexPath, html, 'utf8');
}

fs.mkdirSync(lessonsRoot, { recursive: true });
fs.writeFileSync(path.join(courseRoot, 'course-navigation.js'), navigationScript, 'utf8');
linkSyllabus();

let created = 0;
let preserved = 0;
lessons.forEach((lesson, index) => {
  const outputPath = path.join(courseRoot, lesson.href);
  if (fs.existsSync(outputPath)) {
    preserved += 1;
    return;
  }

  fs.writeFileSync(outputPath, lessonPage(lesson, lessons[index - 1], lessons[index + 1]), 'utf8');
  created += 1;
});

console.log(`System Design placeholders: ${created} created, ${preserved} preserved, ${lessons.length} total.`);
