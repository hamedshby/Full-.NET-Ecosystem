const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'courses', 'gitlab-cicd');
const lessonRoot = path.join(courseRoot, 'lessons');

const lessons = [
  { number: 1, time: '09:00–10:00', title: 'مفاهیم CI/CD، Pipeline، Stage، Job و Runner' },
  { number: 2, time: '10:00–11:00', title: 'Build و Restore پروژهٔ .NET' },
  { number: 3, time: '11:00–12:00', title: 'اجرای Unit Test در Pipeline' },
  { number: 4, time: '12:00–13:00', title: 'ساخت Docker Image' },
  { number: 5, time: '14:00–15:00', title: 'Push کردن Image به Docker Registry' },
  { number: 6, time: '15:00–16:00', title: 'Environmentهای Dev، Stage و Production' },
  { number: 7, time: '16:00–17:00', title: 'Deploy خودکار' },
  { number: 8, time: '17:00–18:00', title: 'Variables، Secrets و Branch Rules' },
  { number: 9, time: '18:00–19:00', title: 'ساخت Pipeline واقعی برای .NET' },
  { number: 10, time: '19:00–20:00', title: 'Deploy در Kubernetes و مرور مصاحبه‌ای' },
];

const escapeHtml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const themeBootstrap = `
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

const lessonLinks = (prefix = '', current = null) => lessons.map(lesson => {
  const currentAttribute = current === lesson.number ? ' aria-current="page"' : '';
  return `              <li><a href="${prefix}ch1-${lesson.number}.html"${currentAttribute}><span>${String(lesson.number).padStart(2, '0')}</span>${escapeHtml(lesson.title)}</a></li>`;
}).join('\n');

function renderLanding() {
  const schedule = lessons.map(lesson => `
          <li>
            <a href="lessons/ch1-${lesson.number}.html">
              <span class="lesson-number">${String(lesson.number).padStart(2, '0')}</span>
              <span class="lesson-copy"><strong>${escapeHtml(lesson.title)}</strong><small dir="ltr">${lesson.time}</small></span>
              <span class="lesson-arrow" aria-hidden="true">←</span>
            </a>
          </li>`).join('');

  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="سرفصل‌های آموزش یک‌روزه CI/CD در GitLab؛ از Build و Test پروژهٔ .NET تا Docker Registry و Deploy در Kubernetes.">
  <title>آموزش یک‌روزه CI/CD در GitLab | آکادمی دات‌نت</title>
  <script>${themeBootstrap}
  </script>
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="course.css">
  <script src="../../script.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#course-content">پرش به محتوای دوره</a>
  <header class="course-header">
    <nav class="course-nav" aria-label="ناوبری دوره">
      <a class="course-brand" href="../../index.html">آکادمی دات‌نت</a>
      <span class="course-name"><bdi>GitLab CI/CD</bdi></span>
      <a class="back-link" href="../../index.html#courses">بازگشت به دوره‌ها</a>${themeButton}
    </nav>
  </header>
  <main id="course-content">
    <section class="course-hero" aria-labelledby="course-title">
      <div class="course-badge" aria-hidden="true">CI/CD</div>
      <div>
        <p class="eyebrow">مسیر فشرده و عملی DevOps برای توسعه‌دهندگان .NET</p>
        <h1 id="course-title">آموزش یک‌روزه <bdi>CI/CD</bdi> در <bdi>GitLab</bdi></h1>
        <p class="course-lead">از لحظهٔ Push شدن کد تا Build، Test، ساخت Docker Image، انتشار در Registry و Deploy در Kubernetes را در یک مسیر روشن دنبال کنید.</p>
      </div>
      <ul class="course-facts" aria-label="مشخصات دوره">
        <li><strong>۱۰</strong><span>بخش</span></li>
        <li><strong>۱</strong><span>روز آموزشی</span></li>
        <li><strong>.NET</strong><span>پروژهٔ هدف</span></li>
      </ul>
    </section>

    <section class="course-overview" aria-labelledby="overview-title">
      <div class="section-heading">
        <p class="eyebrow">برنامهٔ یادگیری</p>
        <h2 id="overview-title">سرفصل‌های دوره</h2>
        <p>هر بخش یک صفحهٔ مستقل دارد تا محتوای آموزشی آن به‌مرور تکمیل شود.</p>
      </div>
      <ol class="lesson-list">${schedule}
      </ol>
    </section>
  </main>
  <footer class="course-footer">
    <a href="../../index.html#courses">بازگشت به فهرست دوره‌ها</a>
    <p>آکادمی دات‌نت؛ آموزش برای کار واقعی</p>
  </footer>
</body>
</html>
`;
}

function renderPager(index) {
  const previous = lessons[index - 1];
  const next = lessons[index + 1];
  return [
    previous ? `<a class="pager-previous" href="ch1-${previous.number}.html"><span>درس قبلی</span><strong>${escapeHtml(previous.title)}</strong></a>` : '<span></span>',
    next ? `<a class="pager-next" href="ch1-${next.number}.html"><span>درس بعدی</span><strong>${escapeHtml(next.title)}</strong></a>` : '<span></span>',
  ].join('\n          ');
}

function renderLessonContent(lesson) {
  if (lesson.number === 1) return `
          <section class="lesson-section lesson-intro" aria-labelledby="start-title">
            <p class="section-kicker">از یک رفتار قابل مشاهده شروع کنیم</p>
            <h2 id="start-title">بعد از <bdi>git push</bdi> چه اتفاقی می‌افتد؟</h2>
            <p>فرض کنید یک تغییر کوچک در پروژهٔ <bdi>ASP.NET Core</bdi> ایجاد کرده‌اید. بدون <bdi>CI/CD</bdi>، یک نفر باید کد را دریافت کند، Packageها را Restore کند، پروژه را Build کند، Testها را اجرا کند و در نهایت نسخهٔ جدید را روی Server قرار دهد. این فرایند دستی است؛ بنابراین ممکن است یک مرحله فراموش شود یا نتیجه روی کامپیوتر افراد مختلف یکسان نباشد.</p>
            <div class="process-flow" aria-label="فرایند دستی انتشار نرم‌افزار">
              <span>Push کد</span><b aria-hidden="true">←</b><span>Restore</span><b aria-hidden="true">←</b><span>Build</span><b aria-hidden="true">←</b><span>Test</span><b aria-hidden="true">←</b><span>Deploy</span>
            </div>
            <p><bdi>CI/CD</bdi> این زنجیره را به یک فرایند تعریف‌شده، قابل‌تکرار و تا حد ممکن خودکار تبدیل می‌کند. هدف فقط سریع‌ترشدن نیست؛ هدف این است که هر تغییر از کنترل‌های مشخصی عبور کند و نتیجهٔ اجرای آن ثبت و قابل مشاهده باشد.</p>
          </section>

          <section class="lesson-section" aria-labelledby="ci-cd-title">
            <p class="section-kicker">مفهوم اول</p>
            <h2 id="ci-cd-title"><bdi>CI/CD</bdi> چیست؟</h2>
            <div class="concept-grid">
              <article>
                <span class="concept-mark">CI</span>
                <h3><bdi>Continuous Integration</bdi></h3>
                <p>Developerها تغییرات خود را مرتب با Repository مشترک ادغام می‌کنند و سیستم پس از رویدادهایی مانند Push یا Merge Request، بررسی‌هایی مثل Build و Test را خودکار اجرا می‌کند.</p>
                <p class="concept-result"><strong>نتیجهٔ قابل مشاهده:</strong> اگر تغییر جدید Compile نشود یا Test را خراب کند، Pipeline شکست می‌خورد و مشکل پیش از رسیدن به محیط بعدی دیده می‌شود.</p>
              </article>
              <article>
                <span class="concept-mark">CD</span>
                <h3><bdi>Continuous Delivery / Deployment</bdi></h3>
                <p>در <bdi>Continuous Delivery</bdi>، نسخهٔ معتبر همیشه آمادهٔ انتشار است، اما ورود به Production می‌تواند نیازمند تأیید دستی باشد. در <bdi>Continuous Deployment</bdi>، نسخه‌ای که تمام کنترل‌ها را با موفقیت رد کرده است به‌صورت خودکار Deploy می‌شود.</p>
                <p class="concept-result"><strong>نکته:</strong> خودکاربودن Build و Test به‌تنهایی به معنی Deploy خودکار در Production نیست.</p>
              </article>
            </div>
            <aside class="lesson-note">
              <strong>مدل ذهنی:</strong>
              <span><bdi>CI</bdi> می‌پرسد «آیا این تغییر سالم و قابل ادغام است؟» و <bdi>CD</bdi> می‌پرسد «چگونه این خروجی سالم را با روشی کنترل‌شده به محیط مقصد برسانیم؟»</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="five-parts-title">
            <p class="section-kicker">اجزای اصلی GitLab CI/CD</p>
            <h2 id="five-parts-title">از <bdi>Pipeline</bdi> تا <bdi>Runner</bdi></h2>
            <dl class="definition-list">
              <div>
                <dt><span>۱</span><bdi>Pipeline</bdi></dt>
                <dd>کل فرایند خودکاری است که برای یک Commit، Merge Request، Schedule یا اجرای دستی ساخته می‌شود. Pipeline مجموعه‌ای از Jobهاست که در Stageها سازمان‌دهی شده‌اند.</dd>
              </div>
              <div>
                <dt><span>۲</span><bdi>Stage</bdi></dt>
                <dd>یک گروه منطقی و ترتیبی از Jobهاست؛ مانند <code>build</code>، <code>test</code> و <code>deploy</code>. در Pipeline پایه، Stageها به ترتیب اجرا می‌شوند و Stage بعدی معمولاً پس از موفقیت Stage قبلی آغاز می‌شود.</dd>
              </div>
              <div>
                <dt><span>۳</span><bdi>Job</bdi></dt>
                <dd>یک واحد اجرایی مستقل است که Commandهای مشخصی را انجام می‌دهد؛ برای مثال <code>dotnet build</code> یا <code>dotnet test</code>. هر Job دارای Log و وضعیت مستقل مانند Pending، Running، Passed یا Failed است.</dd>
              </div>
              <div>
                <dt><span>۴</span><bdi>Runner</bdi></dt>
                <dd>Agent اجرایی است که Job را از GitLab دریافت می‌کند، محیط اجرا را آماده می‌کند، Commandهای بخش <code>script</code> را اجرا می‌کند و نتیجه را به GitLab برمی‌گرداند. Runner می‌تواند توسط GitLab میزبانی شود یا روی Infrastructure خودتان نصب شده باشد.</dd>
              </div>
              <div>
                <dt><span>۵</span><code>.gitlab-ci.yml</code></dt>
                <dd>فایل Configuration در ریشهٔ Repository است که Pipeline، Stageها، Jobها و Commandها را با Syntax زبان YAML تعریف می‌کند. GitLab این فایل را می‌خواند، اما Commandهای آن روی Runner اجرا می‌شوند.</dd>
              </div>
            </dl>
          </section>

          <section class="lesson-section" aria-labelledby="relationship-title">
            <p class="section-kicker">رابطهٔ مفاهیم</p>
            <h2 id="relationship-title">چه کسی چه کاری انجام می‌دهد؟</h2>
            <div class="architecture-stack" role="img" aria-label="GitLab Pipeline را می‌سازد، Stageها ترتیب را مشخص می‌کنند، Jobها کارها را تعریف می‌کنند و Runner آن‌ها را اجرا می‌کند">
              <div><strong>GitLab</strong><span>رویداد Push را دریافت می‌کند و Pipeline را می‌سازد</span></div>
              <b aria-hidden="true">↓</b>
              <div><strong>Pipeline</strong><span>فرایند کامل Build، Test و Deploy</span></div>
              <b aria-hidden="true">↓</b>
              <div><strong>Stage</strong><span>ترتیب گروه‌های کاری: build → test → deploy</span></div>
              <b aria-hidden="true">↓</b>
              <div><strong>Job</strong><span>Commandهای قابل اجرا مانند dotnet build</span></div>
              <b aria-hidden="true">↓</b>
              <div><strong>Runner</strong><span>ماشین یا محیطی که Commandها را واقعاً اجرا می‌کند</span></div>
            </div>
            <aside class="lesson-warning">
              <strong>اشتباه رایج:</strong>
              <span>GitLab Server الزاماً محل اجرای Build نیست. GitLab Job را زمان‌بندی می‌کند؛ Runner محاسبات واقعی را روی VM، Server، Docker Container یا Kubernetes انجام می‌دهد.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="yaml-title">
            <p class="section-kicker">نمونهٔ کوچک اما واقعی</p>
            <h2 id="yaml-title">یک <bdi>Pipeline</bdi> ساده برای پروژهٔ <bdi>.NET</bdi></h2>
            <p>فایل زیر را با نام <code>.gitlab-ci.yml</code> در ریشهٔ Repository قرار می‌دهیم:</p>
            <div class="code-block">
              <div class="code-label"><span>.gitlab-ci.yml</span><span>YAML</span></div>
              <pre dir="ltr"><code>stages:
  - build
  - test

build-app:
  stage: build
  image: mcr.microsoft.com/dotnet/sdk:10.0
  script:
    - dotnet restore
    - dotnet build --configuration Release --no-restore

test-app:
  stage: test
  image: mcr.microsoft.com/dotnet/sdk:10.0
  script:
    - dotnet test --configuration Release</code></pre>
            </div>
            <div class="explanation-steps">
              <article><span>۱</span><div><h3>Pipeline ساخته می‌شود</h3><p>Push شدن Commit می‌تواند باعث شود GitLab فایل Configuration را بخواند و دو Job به نام‌های <code>build-app</code> و <code>test-app</code> بسازد.</p></div></article>
              <article><span>۲</span><div><h3>Stage اول اجرا می‌شود</h3><p>یک Runner مناسب Job اول را می‌گیرد، Docker Image مربوط به <bdi>.NET SDK</bdi> را آماده می‌کند و Commandهای Restore و Build را به‌ترتیب اجرا می‌کند.</p></div></article>
              <article><span>۳</span><div><h3>شکست زودهنگام رخ می‌دهد</h3><p>اگر Build شکست بخورد، Stage بعدی در Pipeline پایه اجرا نمی‌شود. به این رفتار <bdi>Fail Fast</bdi> می‌گوییم؛ کد خراب نباید بی‌دلیل به مرحلهٔ بعد برسد.</p></div></article>
              <article><span>۴</span><div><h3>Test اجرا می‌شود</h3><p>پس از موفقیت Stage اول، Runner Job مربوط به Test را اجرا می‌کند و نتیجه و Log آن در صفحهٔ Pipeline قابل مشاهده است.</p></div></article>
            </div>
            <aside class="lesson-note">
              <strong>مرز این مثال:</strong>
              <span>هر Job محیط مستقلی دارد. در درس‌های بعدی یاد می‌گیریم خروجی Build را با <bdi>Artifact</bdi> بین Jobها منتقل کنیم تا Test یا Deploy مجبور به تولید دوبارهٔ خروجی نباشد.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="parallel-title">
            <p class="section-kicker">ترتیب و هم‌زمانی</p>
            <h2 id="parallel-title"><bdi>Stage</bdi>ها ترتیبی‌اند؛ <bdi>Job</bdi>های یک Stage می‌توانند موازی باشند</h2>
            <p>اگر دو Job در Stage برابر <code>test</code> داشته باشیم، Runnerهای آزاد می‌توانند آن‌ها را هم‌زمان اجرا کنند. این کار زمان Pipeline را کاهش می‌دهد، اما نباید بین این دو Job ترتیب پنهان فرض کنیم.</p>
            <div class="parallel-example" aria-label="نمونه اجرای موازی Jobها">
              <div><strong>build</strong><span>build-app</span></div>
              <b aria-hidden="true">←</b>
              <div class="parallel-jobs"><strong>test</strong><span>unit-tests</span><span>integration-tests</span></div>
              <b aria-hidden="true">←</b>
              <div><strong>deploy</strong><span>deploy-staging</span></div>
            </div>
            <ul class="key-points">
              <li>Jobهای یک Stage مستقل‌اند و در صورت وجود Runner کافی می‌توانند موازی اجرا شوند.</li>
              <li>Stage بعدی در حالت پایه منتظر موفقیت Jobهای Stage قبلی می‌ماند.</li>
              <li>برای تعریف وابستگی مستقیم و اجرای زودتر Jobها می‌توان از <code>needs</code> استفاده کرد؛ این موضوع در Pipelineهای پیشرفته مهم می‌شود.</li>
            </ul>
          </section>

          <section class="lesson-section" aria-labelledby="runner-title">
            <p class="section-kicker">نگاه دقیق‌تر به Runner</p>
            <h2 id="runner-title">وقتی Job در وضعیت <bdi>Pending</bdi> می‌ماند</h2>
            <p>Pending بودن طولانی Job معمولاً به معنی خراب‌بودن Commandهای داخل آن نیست؛ Job هنوز اجرا نشده است. GitLab باید Runner فعال و سازگاری پیدا کند که ظرفیت و Tagهای مورد نیاز Job را داشته باشد.</p>
            <div class="runner-cards">
              <article><h3><bdi>GitLab-hosted Runner</bdi></h3><p>Infrastructure آن توسط GitLab مدیریت می‌شود و برای شروع سریع و Jobهای استاندارد مناسب است.</p></article>
              <article><h3><bdi>Self-managed Runner</bdi></h3><p>روی Infrastructure خودتان نصب می‌شود و برای شبکهٔ خصوصی، Configuration اختصاصی یا کنترل امنیتی بیشتر مناسب است.</p></article>
            </div>
            <p>Runner می‌تواند از Executorهای مختلف استفاده کند. برای مثال Docker executor هر Job را در Container اجرا می‌کند؛ در نتیجه Environment اجرای Build قابل‌تکرارتر و وابستگی آن به نرم‌افزارهای نصب‌شده روی Host کمتر می‌شود.</p>
          </section>

          <section class="lesson-section" aria-labelledby="mistakes-title">
            <p class="section-kicker">رفع سوءبرداشت‌ها</p>
            <h2 id="mistakes-title">اشتباهات رایج</h2>
            <div class="mistake-list">
              <article><h3>Pipeline و Job یکی نیستند</h3><p>Pipeline کل جریان است؛ Job فقط یکی از واحدهای اجرایی درون آن است.</p></article>
              <article><h3>Stage یک Server نیست</h3><p>Stage فقط گروه‌بندی و ترتیب منطقی Jobها را تعیین می‌کند. Runner محیط اجرای واقعی را فراهم می‌کند.</p></article>
              <article><h3>وجود Runner کافی نیست</h3><p>Runner باید فعال، دارای ظرفیت و با Tagها و قابلیت‌های مورد نیاز Job سازگار باشد.</p></article>
              <article><h3>Jobهای موازی حافظهٔ مشترک ندارند</h3><p>برای اشتراک خروجی باید از سازوکاری مانند Artifact یا Cache با هدف درست استفاده شود.</p></article>
              <article><h3>CD همیشه Deploy مستقیم به Production نیست</h3><p>ممکن است انتشار Production یک Manual Job و نیازمند تأیید انسان باشد.</p></article>
              <article><h3>سبزشدن Pipeline پایان مسئولیت نیست</h3><p>Monitoring، Rollback، Security و بررسی رفتار برنامه در محیط مقصد همچنان ضروری‌اند.</p></article>
            </div>
          </section>

          <section class="lesson-section lesson-summary" aria-labelledby="summary-title">
            <p class="section-kicker">جمع‌بندی</p>
            <h2 id="summary-title">پاسخ کوتاه برای مصاحبه</h2>
            <blockquote>
              <bdi>CI/CD</bdi> روشی برای خودکارسازی Integration و Delivery نرم‌افزار است. در GitLab، فایل <code>.gitlab-ci.yml</code> یک Pipeline شامل Stageها و Jobها را تعریف می‌کند. Stageها ترتیب کلی را می‌سازند، Jobها Commandهای مستقل را مشخص می‌کنند و Runnerها آن Commandها را روی Infrastructure واقعی اجرا کرده و نتیجه را به GitLab گزارش می‌دهند.
            </blockquote>
            <h3>اکنون باید بتوانید توضیح دهید:</h3>
            <ul class="key-points">
              <li>CI چه مشکلی را حل می‌کند و با CD چه تفاوتی دارد.</li>
              <li>Pipeline، Stage و Job چگونه به یکدیگر مرتبط‌اند.</li>
              <li>چرا بدون Runner، Job اجرا نمی‌شود.</li>
              <li>چرا Jobهای یک Stage می‌توانند موازی باشند.</li>
              <li>پس از Push شدن کد، GitLab چگونه Build و Test را آغاز می‌کند.</li>
            </ul>
          </section>

          <section class="lesson-section sources-section" aria-labelledby="sources-title">
            <h2 id="sources-title">منابع رسمی</h2>
            <ul>
              <li><a href="https://docs.gitlab.com/ci/pipelines/">GitLab Docs — CI/CD pipelines</a></li>
              <li><a href="https://docs.gitlab.com/ci/jobs/">GitLab Docs — CI/CD jobs</a></li>
              <li><a href="https://docs.gitlab.com/ci/runners/">GitLab Docs — Runners</a></li>
              <li><a href="https://docs.gitlab.com/ci/yaml/">GitLab Docs — CI/CD YAML syntax reference</a></li>
            </ul>
          </section>`;

  if (lesson.number === 2) return `
          <section class="lesson-section lesson-intro" aria-labelledby="restore-start-title">
            <p class="section-kicker">از رفتار Runner شروع کنیم</p>
            <h2 id="restore-start-title">چرا پروژه بلافاصله بعد از Clone شدن Build نمی‌شود؟</h2>
            <p>وقتی Runner یک Job تازه را شروع می‌کند، Source Code پروژه را دریافت می‌کند؛ اما Packageهای NuGet و خروجی‌های محلی پوشه‌های <code>obj</code> و <code>bin</code> معمولاً داخل Repository نیستند. فایل پروژه فقط اعلام می‌کند به چه Dependencyهایی نیاز داریم.</p>
            <div class="code-block">
              <div class="code-label"><span>Payment.Api.csproj</span><span>XML</span></div>
              <pre dir="ltr"><code>&lt;Project Sdk="Microsoft.NET.Sdk.Web"&gt;
  &lt;PropertyGroup&gt;
    &lt;TargetFramework&gt;net10.0&lt;/TargetFramework&gt;
  &lt;/PropertyGroup&gt;

  &lt;ItemGroup&gt;
    &lt;PackageReference Include="FluentValidation" Version="12.0.0" /&gt;
  &lt;/ItemGroup&gt;
&lt;/Project&gt;</code></pre>
            </div>
            <p>این فایل نام و Version Package را نگه می‌دارد، نه Binary آن را. بنابراین پیش از Compile باید گراف کامل Dependencyها Resolve شود. این مسئولیت <code>dotnet restore</code> است.</p>
            <div class="process-flow" aria-label="جریان Restore و Build پروژه دات نت">
              <span>Clone Repository</span><b aria-hidden="true">←</b><span>dotnet restore</span><b aria-hidden="true">←</b><span>project.assets.json</span><b aria-hidden="true">←</b><span>dotnet build</span><b aria-hidden="true">←</b><span>DLL و فایل‌های Build</span>
            </div>
          </section>

          <section class="lesson-section" aria-labelledby="restore-title">
            <p class="section-kicker">مرحلهٔ اول</p>
            <h2 id="restore-title"><code>dotnet restore</code> دقیقاً چه کاری انجام می‌دهد؟</h2>
            <p><code>dotnet restore</code> از NuGet برای آماده‌کردن Dependencyهای پروژه استفاده می‌کند. Restore فقط Packageهای مستقیم را نمی‌بیند؛ Dependencyهای وابسته به آن Packageها را نیز Resolve می‌کند تا یک گراف سازگار با Target Framework پروژه ساخته شود.</p>
            <div class="explanation-steps">
              <article><span>۱</span><div><h3>پروژه و تنظیمات خوانده می‌شوند</h3><p>فایل‌های <code>.csproj</code>، Solution، Target Frameworkها، <code>PackageReference</code>ها و Sourceهای تعریف‌شده در <code>NuGet.Config</code> بررسی می‌شوند.</p></div></article>
              <article><span>۲</span><div><h3>گراف Dependency Resolve می‌شود</h3><p>NuGet Versionهای لازم و سازگاری آن‌ها را محاسبه می‌کند. اگر یک Package به Package دیگری وابسته باشد، آن Dependency انتقالی نیز وارد گراف می‌شود.</p></div></article>
              <article><span>۳</span><div><h3>Packageهای لازم فراهم می‌شوند</h3><p>NuGet ابتدا Cacheهای محلی را بررسی می‌کند و در صورت نیاز Package را از Source پیکربندی‌شده دریافت می‌کند. مسیر پیش‌فرض Global Packages Folder معمولاً پوشهٔ <code>.nuget/packages</code> کاربر است.</p></div></article>
              <article><span>۴</span><div><h3>فایل Assets تولید می‌شود</h3><p>برای پروژه‌های مبتنی بر <code>PackageReference</code>، فایل <code>obj/project.assets.json</code> ساخته می‌شود. Build از این فایل می‌فهمد برای هر Target Framework و Runtime به کدام Assemblyها نیاز دارد.</p></div></article>
            </div>
            <aside class="lesson-note">
              <strong>Restore چه کاری نمی‌کند؟</strong>
              <span>Source Code را Compile نمی‌کند، خروجی نهایی برنامه را نمی‌سازد و PackageReference جدیدی به پروژه اضافه نمی‌کند. Restore وضعیت تعریف‌شده در فایل‌های پروژه را بازسازی می‌کند.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="build-title">
            <p class="section-kicker">مرحلهٔ دوم</p>
            <h2 id="build-title"><code>dotnet build</code> چه می‌سازد؟</h2>
            <p><code>dotnet build</code> از MSBuild استفاده می‌کند تا پروژه، Project Referenceها و Source Code را Compile کند. نتیجه معمولاً شامل Assemblyهای IL با پسوند DLL، فایل‌های Symbol با پسوند PDB و Metadataهای Runtime مانند <code>.deps.json</code> و <code>.runtimeconfig.json</code> است.</p>
            <div class="concept-grid command-comparison">
              <article>
                <span class="concept-mark">Restore</span>
                <h3>Dependencyها را آماده می‌کند</h3>
                <ul class="key-points">
                  <li>ورودی اصلی: Project/Solution و NuGet Configuration</li>
                  <li>خروجی مهم: <code>obj/project.assets.json</code></li>
                  <li>Packageها را Resolve و در Cache محلی آماده می‌کند</li>
                  <li>Source Code برنامه را Compile نمی‌کند</li>
                </ul>
              </article>
              <article>
                <span class="concept-mark">Build</span>
                <h3>کد را Compile می‌کند</h3>
                <ul class="key-points">
                  <li>ورودی اصلی: Source Code، پروژه و گراف Dependency</li>
                  <li>خروجی معمول: <code>bin/Release/net10.0/</code></li>
                  <li>خطاهای Compiler و Analyzer را گزارش می‌کند</li>
                  <li>به‌صورت پیش‌فرض Restore ضمنی هم انجام می‌دهد</li>
                </ul>
              </article>
            </div>
            <aside class="lesson-warning">
              <strong>Build با Publish یکی نیست:</strong>
              <span>Build صحت Compile و تولید Binaryهای پروژه را هدف می‌گیرد. برای آماده‌سازی خروجی قابل استقرار با فایل‌های مورد نیاز Host و تنظیم Deployment معمولاً از <code>dotnet publish</code> استفاده می‌شود.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="implicit-title">
            <p class="section-kicker">رفتار مهم .NET CLI</p>
            <h2 id="implicit-title">Restore صریح یا Restore ضمنی؟</h2>
            <p>Commandهایی مانند <code>dotnet build</code> و <code>dotnet test</code> در صورت نیاز Restore را به‌صورت ضمنی اجرا می‌کنند. بنابراین روی کامپیوتر شخصی، Command زیر اغلب کافی است:</p>
            <div class="code-block">
              <div class="code-label"><span>Build همراه با Restore ضمنی</span><span>CLI</span></div>
              <pre dir="ltr"><code>dotnet build PaymentService.sln --configuration Release</code></pre>
            </div>
            <p>در CI بهتر است این دو مسئولیت را صریح جدا کنیم. در این حالت اگر دریافت Dependency شکست بخورد، Log مرحلهٔ Restore علت را واضح‌تر نشان می‌دهد و Build بدون تکرار Restore اجرا می‌شود:</p>
            <div class="code-block">
              <div class="code-label"><span>Restore و Build صریح</span><span>CLI</span></div>
              <pre dir="ltr"><code>dotnet restore PaymentService.sln
dotnet build PaymentService.sln --configuration Release --no-restore</code></pre>
            </div>
            <aside class="lesson-note">
              <strong>قاعدهٔ استفاده از <code>--no-restore</code>:</strong>
              <span>این گزینه فقط زمانی درست است که Restore همان پروژه با SDK و فایل‌های Dependency مؤثر، قبلاً در همان Workspace با موفقیت انجام شده باشد. روی Runner تازه، حذف Restore می‌تواند باعث خطای نبودن فایل Assets شود.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="pipeline-build-title">
            <p class="section-kicker">پیاده‌سازی در GitLab</p>
            <h2 id="pipeline-build-title"><bdi>Build Job</bdi> برای یک Solution واقعی</h2>
            <p>در این مرحله Restore و Build را داخل یک Job نگه می‌داریم تا هر دو Command در یک Workspace اجرا شوند. انتقال خروجی به Jobهای دیگر را در بخش Artifact بررسی می‌کنیم.</p>
            <div class="code-block">
              <div class="code-label"><span>.gitlab-ci.yml</span><span>YAML</span></div>
              <pre dir="ltr"><code>stages:
  - build

build-app:
  stage: build
  image: mcr.microsoft.com/dotnet/sdk:10.0
  script:
    - dotnet --info
    - dotnet restore PaymentService.sln
    - dotnet build PaymentService.sln --configuration Release --no-restore
  artifacts:
    when: always
    paths:
      - "**/bin/Release/"
    expire_in: 1 day</code></pre>
            </div>
            <div class="explanation-steps">
              <article><span>۱</span><div><h3>Environment مشخص است</h3><p>Runner Job را با Docker Image حاوی .NET 10 SDK اجرا می‌کند؛ بنابراین ابزار Build مورد نیاز داخل Environment Job حضور دارد.</p></div></article>
              <article><span>۲</span><div><h3>نسخهٔ واقعی SDK ثبت می‌شود</h3><p><code>dotnet --info</code> هنگام عیب‌یابی نشان می‌دهد کدام SDK، Runtime و سیستم‌عامل واقعاً استفاده شده است.</p></div></article>
              <article><span>۳</span><div><h3>Dependencyها یک‌بار Restore می‌شوند</h3><p>اگر Feed خصوصی، Credential یا Package Version مشکل داشته باشد، Job در Command مربوط به Restore متوقف می‌شود.</p></div></article>
              <article><span>۴</span><div><h3>Build در حالت Release انجام می‌شود</h3><p>گزینهٔ <code>--no-restore</code> مانع Restore تکراری می‌شود و خطاهای Compile یا Analyzer باعث شکست Job خواهند شد.</p></div></article>
            </div>
            <aside class="lesson-warning">
              <strong>نکتهٔ امنیتی:</strong>
              <span>Username، Password یا Token مربوط به Feed خصوصی را داخل Repository یا <code>NuGet.Config</code> Commit نکنید. Secret باید از GitLab CI/CD Variables یا Secret Management وارد Job شود و در Log چاپ نشود.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="repeatable-title">
            <p class="section-kicker">قابل‌تکرار کردن Build</p>
            <h2 id="repeatable-title">چگونه نتیجهٔ Local و CI را نزدیک نگه داریم؟</h2>
            <p>یک Pipeline قابل اعتماد نباید به این جمله وابسته باشد که «روی سیستم من کار می‌کند». فایل‌ها و Versionهای مؤثر باید تا حد ممکن در Repository مشخص باشند.</p>
            <dl class="definition-list">
              <div><dt><span>۱</span><code>global.json</code></dt><dd>Version یا Roll-forward Policy مربوط به .NET SDK را مشخص می‌کند تا Developer و Runner از SDKهای ناسازگار استفاده نکنند.</dd></div>
              <div><dt><span>۲</span><code>PackageReference</code></dt><dd>Version Dependencyهای مستقیم را در فایل پروژه یا مدیریت مرکزی Packageها ثبت می‌کند. Version شناور می‌تواند قابلیت بازتولید را کاهش دهد.</dd></div>
              <div><dt><span>۳</span><code>packages.lock.json</code></dt><dd>در صورت فعال‌کردن Lock File، گراف Resolve‌شده را ثبت می‌کند. Restore با <code>--locked-mode</code> اجازه نمی‌دهد CI بی‌صدا Lock File ناسازگار را تغییر دهد.</dd></div>
              <div><dt><span>۴</span><code>NuGet.Config</code></dt><dd>Sourceهای مورد اعتماد و رفتار NuGet را مشخص می‌کند. Secretهای Authentication باید خارج از فایل و از Variables امن تأمین شوند.</dd></div>
            </dl>
            <div class="code-block">
              <div class="code-label"><span>Restore کنترل‌شده با Lock File</span><span>CLI</span></div>
              <pre dir="ltr"><code>dotnet restore PaymentService.sln --locked-mode
dotnet build PaymentService.sln -c Release --no-restore</code></pre>
            </div>
            <aside class="lesson-note">
              <strong>پیش‌شرط:</strong>
              <span><code>--locked-mode</code> زمانی استفاده می‌شود که Lock File معتبر قبلاً تولید و Commit شده باشد. افزودن این گزینه بدون آماده‌سازی Lock File راه‌حل جادویی برای تکرارپذیری نیست.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="cache-title">
            <p class="section-kicker">Performance بدون تغییر معنا</p>
            <h2 id="cache-title">Cache کردن Packageهای NuGet در Runner</h2>
            <p>Runnerهای موقتی ممکن است در هر Job از Environment تازه‌ای شروع کنند. Cache می‌تواند Packageهای دانلودشده را بین اجراها نگه دارد تا Restore سریع‌تر شود، اما Cache منبع حقیقت نیست. اگر Cache وجود نداشته باشد، Restore باید همچنان از Sourceهای معتبر موفق شود.</p>
            <div class="code-block">
              <div class="code-label"><span>نمونهٔ Cache برای NuGet</span><span>YAML</span></div>
              <pre dir="ltr"><code>variables:
  NUGET_PACKAGES: "$CI_PROJECT_DIR/.nuget/packages"

cache:
  key:
    files:
      - packages.lock.json
  paths:
    - .nuget/packages/

build-app:
  stage: build
  image: mcr.microsoft.com/dotnet/sdk:10.0
  script:
    - dotnet restore PaymentService.sln --locked-mode
    - dotnet build PaymentService.sln -c Release --no-restore</code></pre>
            </div>
            <ul class="key-points">
              <li><bdi>Cache</bdi> برای سریع‌ترکردن کار است و ممکن است پاک یا ناموجود باشد.</li>
              <li><bdi>Artifact</bdi> خروجی مشخص یک Job است که Job بعدی یا کاربر به آن نیاز دارد.</li>
              <li>کلید Cache باید با فایل‌های مؤثر بر Dependency هماهنگ باشد تا Cache قدیمی بی‌دلیل استفاده نشود.</li>
            </ul>
          </section>

          <section class="lesson-section" aria-labelledby="errors-title">
            <p class="section-kicker">عیب‌یابی مرحله‌به‌مرحله</p>
            <h2 id="errors-title">خطاهای رایج Restore و Build</h2>
            <div class="table-wrap" role="region" aria-label="خطاهای رایج Restore و Build" tabindex="0">
              <table class="diagnostic-table">
                <thead><tr><th>نشانه</th><th>معنای محتمل</th><th>اولین بررسی</th></tr></thead>
                <tbody>
                  <tr><td><code>NU1101</code></td><td>Package در Sourceهای فعال پیدا نشده است.</td><td>نام و Version Package و فهرست Sourceهای NuGet را بررسی کنید.</td></tr>
                  <tr><td><code>NU1301</code></td><td>Service Index یک Source قابل دریافت نیست.</td><td>Network، URL، TLS و Credential Feed خصوصی را بررسی کنید.</td></tr>
                  <tr><td><code>NETSDK1004</code></td><td>فایل <code>project.assets.json</code> وجود ندارد.</td><td>Restore را در مسیر و Workspace درست اجرا کنید.</td></tr>
                  <tr><td>SDK سازگار پیدا نشد</td><td>Image یا Runner نسخهٔ مورد انتظار پروژه را ندارد.</td><td>خروجی <code>dotnet --info</code> و فایل <code>global.json</code> را مقایسه کنید.</td></tr>
                  <tr><td>Compiler Error</td><td>Source Code یا Project Reference قابل Compile نیست.</td><td>اولین Error واقعی را بخوانید؛ پیام‌های بعدی ممکن است پیامد همان Error باشند.</td></tr>
                  <tr><td>Local موفق، CI ناموفق</td><td>Dependency پنهان به SDK، فایل، Environment Variable یا Cache سیستم محلی وجود دارد.</td><td>Command، Working Directory، SDK و فایل‌های Commit‌شده را با CI مقایسه کنید.</td></tr>
                </tbody>
              </table>
            </div>
            <div class="code-block">
              <div class="code-label"><span>Commandهای تشخیصی</span><span>CLI</span></div>
              <pre dir="ltr"><code>dotnet --info
dotnet restore PaymentService.sln --verbosity normal
dotnet build PaymentService.sln -c Release --no-restore --verbosity minimal</code></pre>
            </div>
            <p>برای خطاهای پیچیدهٔ MSBuild می‌توان Binary Log تولید کرد، اما Log ممکن است شامل مسیرها، Propertyها و اطلاعات حساس Environment باشد. پیش از اشتراک‌گذاری باید محتوای آن بررسی و پاک‌سازی شود.</p>
          </section>

          <section class="lesson-section" aria-labelledby="build-mistakes-title">
            <p class="section-kicker">رفع سوءبرداشت‌ها</p>
            <h2 id="build-mistakes-title">اشتباهات رایج</h2>
            <div class="mistake-list">
              <article><h3>Commit کردن پوشه‌های <code>bin</code> و <code>obj</code></h3><p>این پوشه‌ها خروجی‌های تولیدشده و وابسته به Build هستند؛ Source of Truth باید پروژه و Source Code باشد.</p></article>
              <article><h3>استفاده از <code>--no-restore</code> روی Runner تازه</h3><p>اگر Assets آماده نشده باشند، Build نمی‌تواند Dependencyها را Resolve کند.</p></article>
              <article><h3>فرض اینکه Cache همیشه وجود دارد</h3><p>Cache یک Optimization است. Pipeline باید با Cache خالی هم نتیجهٔ درست تولید کند.</p></article>
              <article><h3>استفاده از SDK متفاوت در Local و CI</h3><p>تفاوت SDK می‌تواند Analyzer، Compiler یا رفتار MSBuild را تغییر دهد. <code>global.json</code> و Image مشخص این اختلاف را کاهش می‌دهند.</p></article>
              <article><h3>قرار دادن Secret در فایل NuGet</h3><p>Credential باید از Variable امن وارد شود، نه اینکه همراه Source Code نگهداری شود.</p></article>
              <article><h3>Deploy کردن مستقیم پوشهٔ Build</h3><p>برای برنامه‌هایی که منطق Publish دارند، خروجی Build لزوماً Package نهایی استقرار نیست.</p></article>
            </div>
          </section>

          <section class="lesson-section lesson-summary" aria-labelledby="build-summary-title">
            <p class="section-kicker">جمع‌بندی</p>
            <h2 id="build-summary-title">پاسخ کوتاه برای مصاحبه</h2>
            <blockquote>
              <code>dotnet restore</code> Dependencyهای تعریف‌شده در پروژه را با NuGet Resolve می‌کند، Packageهای لازم را آماده می‌کند و فایل <code>obj/project.assets.json</code> را می‌سازد. سپس <code>dotnet build</code> با MSBuild پروژه و Dependencyهای آن را Compile می‌کند. چون Build به‌صورت پیش‌فرض Restore ضمنی دارد، در CI معمولاً Restore را صریح اجرا می‌کنیم و Build را با <code>--no-restore</code> ادامه می‌دهیم تا مرز مراحل و Log خطا روشن باشد.
            </blockquote>
            <h3>اکنون باید بتوانید توضیح دهید:</h3>
            <ul class="key-points">
              <li>چرا Runner تازه پیش از Build به Restore نیاز دارد.</li>
              <li>فایل <code>project.assets.json</code> چه نقشی دارد.</li>
              <li>چرا <code>dotnet build</code> می‌تواند Restore ضمنی انجام دهد.</li>
              <li>چه زمانی استفاده از <code>--no-restore</code> درست یا اشتباه است.</li>
              <li>چگونه SDK، Package Version، Lock File و Cache بر قابلیت تکرار Build اثر می‌گذارند.</li>
            </ul>
          </section>

          <section class="lesson-section sources-section" aria-labelledby="build-sources-title">
            <h2 id="build-sources-title">منابع رسمی</h2>
            <ul>
              <li><a href="https://learn.microsoft.com/dotnet/core/tools/dotnet-restore">Microsoft Learn — dotnet restore</a></li>
              <li><a href="https://learn.microsoft.com/dotnet/core/tools/dotnet-build">Microsoft Learn — dotnet build</a></li>
              <li><a href="https://learn.microsoft.com/nuget/consume-packages/package-restore">Microsoft Learn — NuGet Package Restore</a></li>
              <li><a href="https://learn.microsoft.com/nuget/concepts/dependency-resolution">Microsoft Learn — NuGet dependency resolution</a></li>
            </ul>
          </section>`;

  if (lesson.number === 4) return `
          <section class="lesson-section lesson-intro" aria-labelledby="docker-start-title">
            <p class="section-kicker">از خروجی Build تا واحد قابل اجرا</p>
            <h2 id="docker-start-title"><bdi>Docker Image</bdi> چه مشکلی را حل می‌کند؟</h2>
            <p>خروجی <code>dotnet publish</code> فایل‌های برنامه را آماده می‌کند، اما هنوز باید بدانیم برنامه با کدام Runtime، فایل‌ها، User و Command اجرا شود. Docker Image این قرارداد اجرایی را به‌صورت یک Package لایه‌ای و قابل‌انتقال نگه می‌دارد.</p>
            <div class="concept-grid">
              <article>
                <span class="concept-mark">Image</span>
                <h3>Template فقط‌خواندنی</h3>
                <p>مجموعه‌ای از Layerها، فایل‌های برنامه، Runtime و Metadata اجرای آن است. Image ساخته و Tagگذاری می‌شود و می‌توان آن را در Registry ذخیره کرد.</p>
              </article>
              <article>
                <span class="concept-mark">Container</span>
                <h3>نمونهٔ در حال اجرا</h3>
                <p>وقتی Image را با <code>docker run</code> اجرا می‌کنیم، Docker یک Container با لایهٔ نوشتنی، Process، Network و Resourceهای Runtime ایجاد می‌کند.</p>
              </article>
            </div>
            <div class="process-flow" aria-label="جریان ساخت و اجرای Docker Image">
              <span>Source Code</span><b aria-hidden="true">←</b><span>Dockerfile</span><b aria-hidden="true">←</b><span>docker build</span><b aria-hidden="true">←</b><span>Docker Image</span><b aria-hidden="true">←</b><span>docker run</span><b aria-hidden="true">←</b><span>Container</span>
            </div>
            <aside class="lesson-note">
              <strong>مدل ذهنی:</strong>
              <span>Image را مانند Class و Container را مانند Object در نظر بگیرید. از یک Image ثابت می‌توان چند Container مستقل ساخت.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="dockerfile-title">
            <p class="section-kicker">دستور ساخت Image</p>
            <h2 id="dockerfile-title"><bdi>Dockerfile</bdi> چیست؟</h2>
            <p>Dockerfile یک فایل متنی شامل Instructionهای ساخت Image است. Docker آن‌ها را به‌ترتیب اجرا می‌کند و نتیجهٔ بسیاری از Instructionها را به‌صورت Layer نگه می‌دارد.</p>
            <div class="table-wrap" role="region" aria-label="دستورهای مهم Dockerfile" tabindex="0">
              <table class="diagnostic-table">
                <thead><tr><th>Instruction</th><th>نقش</th><th>نکته</th></tr></thead>
                <tbody>
                  <tr><td><code>FROM</code></td><td>Base Image یا Stage جدید را تعریف می‌کند.</td><td>در Multi-stage Build چند بار استفاده می‌شود.</td></tr>
                  <tr><td><code>WORKDIR</code></td><td>Working Directory دستورهای بعدی را مشخص می‌کند.</td><td>مسیرهای نسبی <code>RUN</code> و <code>COPY</code> از اینجا محاسبه می‌شوند.</td></tr>
                  <tr><td><code>COPY</code></td><td>فایل را از Build Context به Image می‌آورد.</td><td>فقط به فایل‌های داخل Context دسترسی دارد.</td></tr>
                  <tr><td><code>RUN</code></td><td>هنگام Build یک Command اجرا می‌کند.</td><td>نتیجه وارد Layer Image می‌شود.</td></tr>
                  <tr><td><code>USER</code></td><td>User اجرای Instructionهای بعدی و Process نهایی را تعیین می‌کند.</td><td>برای Runtime از User غیر Root استفاده کنید.</td></tr>
                  <tr><td><code>EXPOSE</code></td><td>Port مورد انتظار برنامه را مستند می‌کند.</td><td>به‌تنهایی Port را روی Host منتشر نمی‌کند.</td></tr>
                  <tr><td><code>ENTRYPOINT</code></td><td>Process اصلی Container را مشخص می‌کند.</td><td>برای برنامهٔ .NET معمولاً <code>dotnet App.dll</code> است.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="lesson-section" aria-labelledby="context-title">
            <p class="section-kicker">مرزی که اغلب باعث خطا می‌شود</p>
            <h2 id="context-title"><bdi>Build Context</bdi> چیست؟</h2>
            <p>آخرین Argument در Command ساخت، Build Context را تعیین می‌کند. در Command زیر، نقطه یعنی Repository فعلی Context است. Instructionهای <code>COPY</code> فقط می‌توانند فایل‌های همین Context را ببینند:</p>
            <div class="code-block">
              <div class="code-label"><span>ساخت با Dockerfile داخل زیرپوشه</span><span>CLI</span></div>
              <pre dir="ltr"><code>docker build \
  --file src/Payment.Api/Dockerfile \
  --tag payment-api:local \
  .</code></pre>
            </div>
            <p>مسیر Dockerfile با <code>--file</code> مشخص شده، اما مسیرهای <code>COPY</code> همچنان نسبت به ریشهٔ Context یعنی نقطهٔ پایانی تفسیر می‌شوند.</p>
            <aside class="lesson-warning">
              <strong>خطای رایج:</strong>
              <span>اگر Context را روی <code>src/Payment.Api</code> قرار دهید، Dockerfile دیگر نمی‌تواند Projectهای مشترک بیرون آن پوشه را Copy کند. Context باید فقط به‌اندازهٔ نیاز بزرگ باشد، نه کوچک‌تر و نه کل دیسک.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="multistage-title">
            <p class="section-kicker">الگوی Production برای ASP.NET Core</p>
            <h2 id="multistage-title"><bdi>Multi-stage Dockerfile</bdi> برای .NET 10</h2>
            <p>SDK برای Restore، Compile و Publish لازم است، اما نباید ابزارهای Build را وارد Image نهایی کنیم. Stage اول با Image کامل SDK برنامه را Publish می‌کند و Stage نهایی فقط خروجی Publish را داخل Image کوچک‌تر ASP.NET Runtime قرار می‌دهد.</p>
            <div class="code-block">
              <div class="code-label"><span>src/Payment.Api/Dockerfile</span><span>Dockerfile</span></div>
              <pre dir="ltr"><code># syntax=docker/dockerfile:1

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/Payment.Api/Payment.Api.csproj", "src/Payment.Api/"]
COPY ["src/Payment.Core/Payment.Core.csproj", "src/Payment.Core/"]
RUN dotnet restore "src/Payment.Api/Payment.Api.csproj"

COPY . .
RUN dotnet publish "src/Payment.Api/Payment.Api.csproj" \
    --configuration Release \
    --output /app/publish \
    --no-restore \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080

COPY --from=build /app/publish .
USER $APP_UID
ENTRYPOINT ["dotnet", "Payment.Api.dll"]</code></pre>
            </div>
            <div class="explanation-steps">
              <article><span>۱</span><div><h3>Stage ساخت از SDK استفاده می‌کند</h3><p>Image نوع <code>sdk</code> شامل .NET CLI، Compiler و MSBuild است و برای Restore و Publish طراحی شده است.</p></div></article>
              <article><span>۲</span><div><h3>فایل‌های پروژه زودتر Copy می‌شوند</h3><p>تا وقتی <code>.csproj</code>ها تغییر نکرده‌اند، Layer مربوط به Restore می‌تواند از Build Cache استفاده شود؛ تغییر یک فایل C# نباید همیشه Download Packageها را تکرار کند.</p></div></article>
              <article><span>۳</span><div><h3>Source Code بعد از Restore وارد می‌شود</h3><p><code>COPY . .</code> تمام فایل‌های مجاز Context را وارد Stage ساخت می‌کند و سپس Publish با Configuration برابر Release انجام می‌شود.</p></div></article>
              <article><span>۴</span><div><h3>Stage نهایی فقط Runtime دارد</h3><p>Image نوع <code>aspnet</code> برای اجرای ASP.NET Core بهینه شده و SDK یا Source Code را حمل نمی‌کند؛ در نتیجه Image نهایی کوچک‌تر و سطح حمله محدودتر است.</p></div></article>
              <article><span>۵</span><div><h3>Process با User غیر Root اجرا می‌شود</h3><p>Imageهای رسمی جدید .NET متغیر <code>APP_UID</code> را برای User داخلی فراهم می‌کنند. این کار ریسک اجرای Process برنامه با دسترسی Root را کاهش می‌دهد.</p></div></article>
            </div>
            <aside class="lesson-note">
              <strong>اگر Project Reference بیشتری دارید:</strong>
              <span>پیش از Restore باید فایل <code>.csproj</code> هر Project مورد نیاز را با همان ساختار مسیر Copy کنید؛ وگرنه Restore نمی‌تواند گراف Projectها را کامل Evaluate کند.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="dockerignore-title">
            <p class="section-kicker">Context کوچک‌تر، Build سریع‌تر و امن‌تر</p>
            <h2 id="dockerignore-title">فایل <code>.dockerignore</code></h2>
            <p>Docker پیش از ارسال Context به Builder، الگوهای <code>.dockerignore</code> را اعمال می‌کند. فایل‌های غیرضروری نه‌تنها Build را کند می‌کنند، بلکه ممکن است ناخواسته وارد Context یا Layerهای Image شوند.</p>
            <div class="code-block">
              <div class="code-label"><span>.dockerignore</span><span>Text</span></div>
              <pre dir="ltr"><code>**/bin/
**/obj/
**/TestResults/
.git/
.vs/
.idea/
*.user
*.suo
.env
.env.*
README.md</code></pre>
            </div>
            <ul class="key-points">
              <li>پوشه‌های <code>bin</code> و <code>obj</code> باید داخل Container تولید شوند، نه از سیستم Developer کپی شوند.</li>
              <li>پوشهٔ <code>.git</code> معمولاً برای Build برنامه لازم نیست و Context را بزرگ می‌کند.</li>
              <li>فایل‌های Secret مانند <code>.env</code> نباید وارد Context شوند؛ حذف آن‌ها فقط با Dockerfile کافی نیست.</li>
              <li>اگر Build به فایل خاصی نیاز دارد، آن را اشتباهی Ignore نکنید.</li>
            </ul>
          </section>

          <section class="lesson-section" aria-labelledby="layers-title">
            <p class="section-kicker">چرا ترتیب Instructionها مهم است؟</p>
            <h2 id="layers-title"><bdi>Layer</bdi> و <bdi>Build Cache</bdi></h2>
            <p>Docker Image از Layerهای متوالی ساخته می‌شود. Builder می‌تواند Layer بدون تغییر را از Cache بردارد، اما وقتی ورودی یک Instruction تغییر کند، آن Layer و Layerهای بعد از آن دوباره ساخته می‌شوند.</p>
            <div class="layer-stack" aria-label="لایه‌های Docker Image دات نت">
              <div><span>۵</span><strong>ENTRYPOINT و Metadata</strong><small>تغییر کم‌هزینه</small></div>
              <div><span>۴</span><strong>خروجی Publish برنامه</strong><small>با تغییر Source دوباره ساخته می‌شود</small></div>
              <div><span>۳</span><strong>Restore Packageها</strong><small>تا تغییر Project File قابل Cache است</small></div>
              <div><span>۲</span><strong>ASP.NET Runtime</strong><small>Base Image نهایی</small></div>
              <div><span>۱</span><strong>Filesystem پایهٔ Linux</strong><small>پایهٔ Layerها</small></div>
            </div>
            <aside class="lesson-warning">
              <strong>الگوی ضعیف:</strong>
              <span>اگر پیش از <code>dotnet restore</code> از <code>COPY . .</code> استفاده کنید، تغییر هر فایل Source می‌تواند Cache مربوط به Restore را باطل کند. Project Fileها را جداگانه و زودتر Copy کنید.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="tag-title">
            <p class="section-kicker">هویت Image</p>
            <h2 id="tag-title"><bdi>Repository</bdi>، <bdi>Tag</bdi> و <bdi>Digest</bdi></h2>
            <div class="code-block">
              <div class="code-label"><span>نام کامل یک Image</span><span>Text</span></div>
              <pre dir="ltr"><code>registry.example.com/payments/payment-api:4f2a93c</code></pre>
            </div>
            <dl class="definition-list">
              <div><dt><span>۱</span>Registry</dt><dd><code>registry.example.com</code> مکانی است که Image در آن ذخیره و دریافت می‌شود.</dd></div>
              <div><dt><span>۲</span>Repository</dt><dd><code>payments/payment-api</code> مسیر منطقی Image در Registry است.</dd></div>
              <div><dt><span>۳</span>Tag</dt><dd><code>4f2a93c</code> یک Label قابل خواندن و قابل تغییر است. Commit SHA انتخاب مناسبی برای Traceability است.</dd></div>
              <div><dt><span>۴</span>Digest</dt><dd>شناسهٔ محتوایی و تغییرناپذیر Image مانند <code>sha256:...</code> است. دو Image با Content متفاوت Digest یکسان ندارند.</dd></div>
            </dl>
            <aside class="lesson-warning">
              <strong>از <code>latest</code> به‌تنهایی استفاده نکنید:</strong>
              <span>Tag قابل جابه‌جایی است و نمی‌گوید دقیقاً کدام Commit Deploy شده است. Image را حداقل با Commit SHA Tag کنید؛ در محیط‌های حساس، Digest دقیق را نیز ثبت یا Pin کنید.</span>
            </aside>
          </section>

          <section class="lesson-section" aria-labelledby="build-command-title">
            <p class="section-kicker">ساخت و بررسی محلی</p>
            <h2 id="build-command-title">اجرای <code>docker build</code></h2>
            <div class="code-block">
              <div class="code-label"><span>Build، Inspect و Run</span><span>CLI</span></div>
              <pre dir="ltr"><code>docker build \
  --pull \
  --file src/Payment.Api/Dockerfile \
  --tag payment-api:local \
  .

docker image inspect payment-api:local

docker run --rm \
  --name payment-api \
  --publish 8080:8080 \
  payment-api:local</code></pre>
            </div>
            <ul class="key-points">
              <li><code>--pull</code> Builder را وادار می‌کند نسخهٔ تازه‌تر Base Image مربوط به Tag را بررسی کند؛ برای بازتولید دقیق می‌توان Base Image را با Digest Pin کرد.</li>
              <li><code>--file</code> مسیر Dockerfile را تعیین می‌کند و نقطهٔ انتهایی، Context را روی ریشهٔ Repository قرار می‌دهد.</li>
              <li><code>--tag</code> یک نام محلی قابل استفاده برای Inspect و Run می‌سازد.</li>
              <li><code>--publish 8080:8080</code> Port میزبان را به Port Container وصل می‌کند؛ Instruction نوع <code>EXPOSE</code> به‌تنهایی این اتصال را ایجاد نمی‌کند.</li>
            </ul>
          </section>

          <section class="lesson-section" aria-labelledby="gitlab-docker-title">
            <p class="section-kicker">ساخت Image در Pipeline</p>
            <h2 id="gitlab-docker-title"><bdi>GitLab Job</bdi> برای ساخت Docker Image</h2>
            <p>این مثال یک Self-managed Runner با Shell executor و Docker Engine آماده را فرض می‌کند. Runner با Tag برابر <code>docker-builder</code> مشخص شده است. این Job فقط Image را می‌سازد و بررسی می‌کند؛ Push در بخش بعدی انجام می‌شود.</p>
            <div class="code-block">
              <div class="code-label"><span>.gitlab-ci.yml</span><span>YAML</span></div>
              <pre dir="ltr"><code>stages:
  - docker

build-container-image:
  stage: docker
  tags:
    - docker-builder
  variables:
    IMAGE_TAG: "$CI_PROJECT_NAME:$CI_COMMIT_SHA"
  before_script:
    - docker version
    - docker info
  script:
    - docker build
      --pull
      --file src/Payment.Api/Dockerfile
      --tag "$IMAGE_TAG"
      .
    - docker image inspect "$IMAGE_TAG"</code></pre>
            </div>
            <aside class="lesson-warning">
              <strong>Runner باید برای Docker آماده شده باشد:</strong>
              <span>وجود Docker CLI در Job کافی نیست؛ Job باید به یک Builder یا Docker daemon مجاز دسترسی داشته باشد. Shell executor، Docker-in-Docker، Socket Binding و Rootless BuildKit مدل‌های متفاوتی با Trade-offهای امنیتی متفاوت هستند.</span>
            </aside>
            <p>دادن دسترسی Docker daemon یا Privileged Mode به Job سطح دسترسی بالایی ایجاد می‌کند. Runnerهای Build Image باید Isolated و فقط برای Projectهای مورد اعتماد باشند. در محیط‌هایی که Privileged Mode مجاز نیست، GitLab استفاده از گزینه‌هایی مانند Rootless BuildKit یا Buildah را پشتیبانی می‌کند.</p>
          </section>

          <section class="lesson-section" aria-labelledby="docker-security-title">
            <p class="section-kicker">امنیت و قابلیت تکرار</p>
            <h2 id="docker-security-title">Image فقط وقتی قابل اعتماد است که ورودی‌هایش کنترل شوند</h2>
            <div class="mistake-list">
              <article><h3>Secret در <code>ARG</code> یا <code>ENV</code></h3><p>Secret ممکن است در History، Layer یا Metadata باقی بماند. برای Secret زمان Build از Secret Mountهای BuildKit و Variableهای محافظت‌شده استفاده کنید.</p></article>
              <article><h3>SDK در Image نهایی</h3><p>Image نهایی بزرگ‌تر می‌شود و ابزارهای غیرضروری بیشتری در Production قرار می‌گیرند. Multi-stage Build فقط خروجی Publish را منتقل می‌کند.</p></article>
              <article><h3>اجرای برنامه با Root</h3><p>در صورت آسیب‌پذیری برنامه، Process دسترسی بیشتری داخل Container خواهد داشت. User غیر Root اصل امن‌تری است.</p></article>
              <article><h3>Base Image بدون Version</h3><p>Tagهایی مانند <code>latest</code> می‌توانند بدون تغییر Dockerfile به محتوای دیگری اشاره کنند. Version و در صورت نیاز Digest را Pin کنید.</p></article>
              <article><h3>Context بزرگ</h3><p>سرعت Build کاهش می‌یابد و احتمال ورود فایل حساس بالا می‌رود. از <code>.dockerignore</code> و Context محدود استفاده کنید.</p></article>
              <article><h3>معماری CPU اشتباه</h3><p>Image ساخته‌شده برای <code>amd64</code> لزوماً روی Node نوع <code>arm64</code> اجرا نمی‌شود. Platform مقصد را در Build و Deploy در نظر بگیرید.</p></article>
            </div>
          </section>

          <section class="lesson-section lesson-summary" aria-labelledby="docker-summary-title">
            <p class="section-kicker">جمع‌بندی</p>
            <h2 id="docker-summary-title">پاسخ کوتاه برای مصاحبه</h2>
            <blockquote>
              Docker Image یک Package فقط‌خواندنی و لایه‌ای از برنامه، Runtime و Metadata اجراست. برای پروژهٔ ASP.NET Core از Multi-stage Dockerfile استفاده می‌کنیم: Stage اول با Image نوع SDK برنامه را Restore و Publish می‌کند و Stage نهایی فقط خروجی Publish را داخل Image کوچک‌تر ASP.NET Runtime قرار می‌دهد. سپس Image را با Tag یکتا مانند Commit SHA می‌سازیم تا هر خروجی به Source Code مشخصی قابل ردیابی باشد.
            </blockquote>
            <h3>اکنون باید بتوانید توضیح دهید:</h3>
            <ul class="key-points">
              <li>تفاوت Image و Container چیست.</li>
              <li>Build Context چگونه روی Instruction نوع <code>COPY</code> اثر می‌گذارد.</li>
              <li>چرا Multi-stage Build برای .NET مناسب است.</li>
              <li>چگونه ترتیب Instructionها روی Build Cache اثر می‌گذارد.</li>
              <li>چرا <code>.dockerignore</code>، User غیر Root و Tag یکتا مهم‌اند.</li>
              <li>Runner برای اجرای <code>docker build</code> به چه Infrastructureای نیاز دارد.</li>
            </ul>
          </section>

          <section class="lesson-section sources-section" aria-labelledby="docker-sources-title">
            <h2 id="docker-sources-title">منابع رسمی</h2>
            <ul>
              <li><a href="https://docs.docker.com/build/concepts/dockerfile/">Docker Docs — Dockerfile overview</a></li>
              <li><a href="https://docs.docker.com/build/concepts/context/">Docker Docs — Build context و .dockerignore</a></li>
              <li><a href="https://docs.docker.com/build/building/multi-stage/">Docker Docs — Multi-stage builds</a></li>
              <li><a href="https://learn.microsoft.com/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-10.0">Microsoft Learn — ASP.NET Core Docker images</a></li>
              <li><a href="https://docs.gitlab.com/ci/docker/using_docker_build/">GitLab Docs — Build Docker images</a></li>
              <li><a href="https://docs.gitlab.com/ci/docker/using_buildkit/">GitLab Docs — BuildKit</a></li>
            </ul>
          </section>`;


  return '';

}

function renderLesson(lesson, index) {
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(lesson.title)}؛ بخشی از آموزش یک‌روزه CI/CD در GitLab.">
  <title>${escapeHtml(lesson.title)} | آموزش CI/CD در GitLab</title>
  <script>${themeBootstrap}
  </script>
  <link rel="stylesheet" href="../../../styles.css">
  <link rel="stylesheet" href="../course.css">
  <script src="../../../script.js" defer></script>
  <script src="../course-navigation.js" defer></script>
</head>
<body class="lesson-page">
  <a class="skip-link" href="#lesson-content">پرش به محتوای درس</a>
  <header class="course-header">
    <nav class="course-nav" aria-label="ناوبری دوره">
      <a class="course-brand" href="../../../index.html">آکادمی دات‌نت</a>
      <span class="course-name"><bdi>GitLab CI/CD</bdi></span>
      <a class="back-link" href="../index.html">سرفصل‌های دوره</a>
      <button class="course-menu-button" type="button" data-course-menu-toggle aria-expanded="true" aria-controls="course-sidebar">فهرست درس‌ها</button>${themeButton}
    </nav>
  </header>
  <div class="lesson-shell">
    <aside id="course-sidebar" class="course-sidebar" data-current-lesson="${lesson.number}">
      <div class="sidebar-heading">
        <span>برنامهٔ یک‌روزه</span>
        <strong>۱۰ بخش آموزشی</strong>
      </div>
      <nav aria-label="فهرست درس‌های دوره">
        <ol>
${lessonLinks('', lesson.number)}
        </ol>
      </nav>
    </aside>
    <main id="lesson-content" class="lesson-content">
      <article aria-labelledby="lesson-title">
        <nav class="breadcrumb" aria-label="مسیر راهنما"><a href="../index.html">آموزش CI/CD در GitLab</a><span aria-hidden="true">/</span><span>بخش ${lesson.number}</span></nav>
        <p class="lesson-time" dir="ltr">${lesson.time}</p>
        <h1 id="lesson-title">${escapeHtml(lesson.title)}</h1>
        <div class="lesson-body" aria-label="محتوای درس">${renderLessonContent(lesson)}
        </div>
        <nav class="lesson-pager" aria-label="درس قبلی و بعدی">
          ${renderPager(index)}
        </nav>
      </article>
    </main>
  </div>
</body>
</html>
`;
}

fs.mkdirSync(lessonRoot, { recursive: true });
fs.writeFileSync(path.join(courseRoot, 'index.html'), renderLanding(), 'utf8');
lessons.forEach((lesson, index) => {
  fs.writeFileSync(path.join(lessonRoot, `ch1-${lesson.number}.html`), renderLesson(lesson, index), 'utf8');
});

console.log(`Generated ${lessons.length} GitLab CI/CD lesson pages.`);
