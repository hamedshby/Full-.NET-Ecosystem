# GitLab CI/CD Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an integrated «آموزش یک‌روزه CI/CD در GitLab» course card, course landing page, and ten empty but fully navigable lesson HTML pages to the academy.

**Architecture:** Keep the site buildless and file-based. A focused Node generator owns the ten lesson definitions and emits static, progressively enhanced HTML; the landing page and homepage card link directly to those files. Course-specific CSS and JavaScript provide responsive presentation and optional mobile navigation without making the content or core links depend on JavaScript.

**Tech Stack:** Static HTML5, CSS custom properties and responsive media queries, vanilla JavaScript, Node.js built-in `fs`/`path`, Node test runner.

**Spec:** `docs/superpowers/specs/2026-09-22-gitlab-cicd-course-design.md`

## Global Constraints

- The course title is exactly «آموزش یک‌روزه CI/CD در GitLab».
- Add the course beside the existing .NET, Microservices, and other course cards in the homepage `course-grid`.
- Create exactly ten lesson pages under `courses/gitlab-cicd/lessons/`.
- Lesson pages contain the shell, exact title, navigation, and an empty `.lesson-body`; they contain no invented educational copy.
- Preserve Persian RTL presentation while keeping official technical terms such as CI/CD, GitLab, Pipeline, .NET, Docker, Kubernetes, Variables, Secrets, and Branch Rules in English.
- Core navigation remains usable without JavaScript.
- Do not add dependencies, a backend, progress tracking, quiz behavior, `.gitlab-ci.yml`, publishing, or deployment.

## Review Focus

- A homepage visitor must see one new card whose CTA resolves to `courses/gitlab-cicd/index.html`.
- The landing-page lesson list must contain exactly ten unique, file-based URLs and every URL must exist.
- A visitor with JavaScript disabled must still see every lesson link, the back link, and previous/next lesson links.
- The first lesson must not render a nonexistent previous link, and the last lesson must not render a nonexistent next link.
- At widths at or below 760px, the layout must collapse without horizontal overflow and the optional menu button must accurately expose `aria-expanded`.

---

### Task 1: Pin the integrated course contract with a failing structural test

**Files:**
- Create: `tests/gitlab-cicd-course.test.js`

**Interfaces:**
- Consumes: filesystem paths rooted at the repository.
- Produces: a structural test contract for the homepage card, landing page, ten lesson routes, progressive navigation, and empty lesson bodies.

- [ ] **Step 1: Write the failing integration test**

Create `tests/gitlab-cicd-course.test.js` with this contract:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'courses', 'gitlab-cicd');
const expectedTitles = [
  'مفاهیم CI/CD، Pipeline، Stage، Job و Runner',
  'Build و Restore پروژهٔ .NET',
  'اجرای Unit Test در Pipeline',
  'ساخت Docker Image',
  'Push کردن Image به Docker Registry',
  'Environmentهای Dev، Stage و Production',
  'Deploy خودکار',
  'Variables، Secrets و Branch Rules',
  'ساخت Pipeline واقعی برای .NET',
  'Deploy در Kubernetes و مرور مصاحبه‌ای',
];

test('homepage integrates the GitLab CI/CD course', () => {
  const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(homepage, /آموزش یک‌روزه <bdi>CI\/CD<\/bdi> در <bdi>GitLab<\/bdi>/);
  assert.match(homepage, /href="courses\/gitlab-cicd\/"/);
});

test('course landing exposes ten unique existing lesson pages', () => {
  const landing = fs.readFileSync(path.join(courseRoot, 'index.html'), 'utf8');
  assert.match(landing, /<html[^>]+lang="fa"[^>]+dir="rtl"/);
  const hrefs = [...landing.matchAll(/href="(lessons\/ch1-\d+\.html)"/g)].map(match => match[1]);
  assert.equal(hrefs.length, 10);
  assert.equal(new Set(hrefs).size, 10);
  hrefs.forEach(href => assert.ok(fs.existsSync(path.join(courseRoot, href)), href));
});

test('lesson shells are titled, empty, progressively navigable, and bounded', () => {
  expectedTitles.forEach((title, index) => {
    const number = index + 1;
    const html = fs.readFileSync(path.join(courseRoot, 'lessons', `ch1-${number}.html`), 'utf8');
    assert.match(html, /<html[^>]+lang="fa"[^>]+dir="rtl"/);
    assert.ok(html.includes(`<h1 id="lesson-title">${title}</h1>`));
    assert.match(html, /<div class="lesson-body" aria-label="محتوای درس"><\/div>/);
    assert.match(html, /href="\.\.\/index\.html"/);
    expectedTitles.forEach((_, itemIndex) => {
      assert.ok(html.includes(`href="ch1-${itemIndex + 1}.html"`));
    });
    if (number === 1) assert.doesNotMatch(html, /class="pager-previous"/);
    if (number === 10) assert.doesNotMatch(html, /class="pager-next"/);
  });
});
```

- [ ] **Step 2: Run the focused test and verify the red state**

Run:

```powershell
node --test tests/gitlab-cicd-course.test.js
```

Expected: FAIL because `courses/gitlab-cicd/index.html` and its lesson files do not exist, and the homepage lacks the new card.

- [ ] **Step 3: Commit the failing contract**

```powershell
git add -- tests/gitlab-cicd-course.test.js
git commit -m "test: define GitLab CI/CD course contract"
```

### Task 2: Generate the static course shell and ten empty lesson pages

**Files:**
- Create: `tools/generate-gitlab-cicd-course.js`
- Create: `courses/gitlab-cicd/index.html`
- Create: `courses/gitlab-cicd/course.css`
- Create: `courses/gitlab-cicd/course-navigation.js`
- Create: `courses/gitlab-cicd/lessons/ch1-1.html` through `courses/gitlab-cicd/lessons/ch1-10.html`

**Interfaces:**
- Consumes: `lessons` array entries shaped as `{ number: number, title: string, time: string }`.
- Produces: direct lesson URLs `lessons/ch1-<number>.html`, static lesson navigation, `.lesson-body`, and `data-current-lesson` values used by `course-navigation.js`.

- [ ] **Step 1: Create the generator with the complete course definition**

Define the source of truth exactly once in `tools/generate-gitlab-cicd-course.js`:

```js
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

const lessonLinks = (prefix = '') => lessons.map(lesson =>
  `<li><a href="${prefix}ch1-${lesson.number}.html">${escapeHtml(lesson.title)}</a></li>`
).join('\n');

fs.mkdirSync(lessonRoot, { recursive: true });
```

Add `renderLanding()` and `renderLesson(lesson, index)` functions that emit full HTML documents. Every document includes UTF-8, viewport metadata, Persian `lang` and `dir`, theme bootstrap, skip link, semantic header/main/footer, local stylesheet references, and global `script.js`. `renderLesson` must emit the following invariant shell:

```html
<aside id="course-sidebar" class="course-sidebar" data-current-lesson="1">
  <nav aria-label="فهرست درس‌های دوره"><ol><!-- all ten static links --></ol></nav>
</aside>
<main id="lesson-content" class="lesson-content">
  <article aria-labelledby="lesson-title">
    <h1 id="lesson-title">عنوان دقیق درس</h1>
    <div class="lesson-body" aria-label="محتوای درس"></div>
    <nav class="lesson-pager" aria-label="درس قبلی و بعدی"><!-- bounded links --></nav>
  </article>
</main>
```

Write the landing page and all lessons only from these render functions:

```js
fs.writeFileSync(path.join(courseRoot, 'index.html'), renderLanding(), 'utf8');
lessons.forEach((lesson, index) => {
  fs.writeFileSync(path.join(lessonRoot, `ch1-${lesson.number}.html`), renderLesson(lesson, index), 'utf8');
});
```

- [ ] **Step 2: Add responsive, accessible course styling**

Create `courses/gitlab-cicd/course.css` with explicit tokens and layout rules for `.course-hero`, `.course-schedule`, `.lesson-list`, `.lesson-shell`, `.course-sidebar`, `.lesson-content`, `.lesson-body`, and `.lesson-pager`. Include:

```css
:root { --cicd-accent: #7c3aed; --cicd-accent-strong: #5b21b6; }
.lesson-shell { display: grid; grid-template-columns: minmax(15rem, 20rem) minmax(0, 1fr); gap: 2rem; }
.lesson-body { min-height: 18rem; }
a:focus-visible, button:focus-visible { outline: 3px solid var(--cicd-accent); outline-offset: 3px; }
@media (max-width: 760px) {
  .lesson-shell { grid-template-columns: 1fr; }
  .course-sidebar[data-collapsed="true"] nav { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
```

Use `overflow-wrap: anywhere`, `min-width: 0`, and responsive padding so long English technical terms cannot cause horizontal overflow.

- [ ] **Step 3: Add optional navigation enhancement**

Create `courses/gitlab-cicd/course-navigation.js` with no content dependency:

```js
(() => {
  const sidebar = document.querySelector('[data-current-lesson]');
  const toggle = document.querySelector('[data-course-menu-toggle]');
  if (!sidebar || !toggle) return;

  const current = sidebar.dataset.currentLesson;
  sidebar.querySelector(`a[href="ch1-${current}.html"]`)?.setAttribute('aria-current', 'page');
  const setExpanded = expanded => {
    toggle.setAttribute('aria-expanded', String(expanded));
    sidebar.dataset.collapsed = String(!expanded);
  };
  setExpanded(false);
  toggle.addEventListener('click', () => setExpanded(toggle.getAttribute('aria-expanded') !== 'true'));
})();
```

The ten links and pager remain present in HTML before this script runs.

- [ ] **Step 4: Generate the pages and inspect their count**

Run:

```powershell
node tools/generate-gitlab-cicd-course.js
(Get-ChildItem courses/gitlab-cicd/lessons -Filter '*.html').Count
```

Expected: `10`.

- [ ] **Step 5: Run the focused test and record the remaining red assertion**

Run:

```powershell
node --test tests/gitlab-cicd-course.test.js
```

Expected: landing and lesson tests PASS; homepage integration test remains FAIL until Task 3.

- [ ] **Step 6: Commit the self-contained course shell**

```powershell
git add -- tools/generate-gitlab-cicd-course.js courses/gitlab-cicd tests/gitlab-cicd-course.test.js
git commit -m "feat: add GitLab CI/CD course shell"
```

### Task 3: Integrate the course card into the academy homepage

**Files:**
- Modify: `index.html:127-143`
- Modify: `styles.css:321`
- Test: `tests/gitlab-cicd-course.test.js`

**Interfaces:**
- Consumes: the public route `courses/gitlab-cicd/` produced by Task 2.
- Produces: one homepage `course-card--gitlab-cicd` entry and a visual `CI/CD` badge.

- [ ] **Step 1: Add the card beside the existing Microservices course**

Insert this article after the Microservices card and before System Design:

```html
<article class="course-card course-card--gitlab-cicd">
  <div class="course-art" aria-hidden="true">CI/CD</div>
  <p class="status">سرفصل‌ها آماده</p>
  <h3>آموزش یک‌روزه <bdi>CI/CD</bdi> در <bdi>GitLab</bdi></h3>
  <p>یک مسیر عملی از Build و Test پروژهٔ <bdi>.NET</bdi> تا ساخت <bdi>Docker Image</bdi> و Deploy در <bdi>Kubernetes</bdi>.</p>
  <ul>
    <li>۱۰ بخش در یک برنامهٔ یک‌روزه</li>
    <li><bdi>GitLab Pipeline</bdi>، <bdi>Runner</bdi>، <bdi>Registry</bdi> و <bdi>Environment</bdi>ها</li>
    <li>سطح: مقدماتی تا متوسط</li>
  </ul>
  <a class="button-link" href="courses/gitlab-cicd/">مشاهدهٔ سرفصل‌ها</a>
</article>
```

- [ ] **Step 2: Give the card a distinct visual identity**

Add to `styles.css` beside the Microservices course-art rule:

```css
.course-card--gitlab-cicd .course-art {
  background: linear-gradient(145deg, #f97316, #7c3aed);
}
```

- [ ] **Step 3: Run the focused test and verify green**

Run:

```powershell
node --test tests/gitlab-cicd-course.test.js
```

Expected: all three subtests PASS.

- [ ] **Step 4: Commit homepage integration**

```powershell
git add -- index.html styles.css tests/gitlab-cicd-course.test.js
git commit -m "feat: integrate GitLab CI/CD course card"
```

### Task 4: Verify links, regression safety, and responsive presentation

**Files:**
- Modify if verification exposes a defect: `courses/gitlab-cicd/index.html`, `courses/gitlab-cicd/course.css`, `courses/gitlab-cicd/course-navigation.js`, `courses/gitlab-cicd/lessons/ch1-*.html`, `index.html`, or `styles.css`
- Test: `tests/gitlab-cicd-course.test.js`

**Interfaces:**
- Consumes: the completed static course and homepage card.
- Produces: verified file links, valid empty lesson bodies, passing project tests, and Desktop/Mobile visual evidence.

- [ ] **Step 1: Check generated output is reproducible**

Run:

```powershell
node tools/generate-gitlab-cicd-course.js
git diff --exit-code -- courses/gitlab-cicd
```

Expected: exit code 0; regeneration produces no uncommitted difference.

- [ ] **Step 2: Run all Node tests**

Run:

```powershell
node --test tests/*.test.js
```

Expected: all tests PASS. If an existing test encodes an obsolete fixed course-card count, update only that expectation to match the actual integrated homepage and rerun the exact command.

- [ ] **Step 3: Run static smoke checks**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
```

Expected: `Static smoke checks passed.` If the only failure is the historical fixed card count, replace the exact expected value with the new actual count and rerun.

- [ ] **Step 4: Serve and inspect Desktop and Mobile layouts**

Start a local static server using an already available project/runtime tool, open `courses/gitlab-cicd/`, and inspect at the normal Desktop viewport and at 390×844. Confirm:

```text
Desktop: hero, schedule, and all ten links are readable; no horizontal overflow.
Mobile: one-column layout; menu button exposes the lesson list; focus remains visible.
Lesson 1: empty lesson body, no previous link, working next link.
Lesson 10: empty lesson body, working previous link, no next link.
```

- [ ] **Step 5: Check the final diff and commit verification fixes if needed**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors and only intentional files. If verification required fixes:

```powershell
git add -- index.html styles.css courses/gitlab-cicd tools/generate-gitlab-cicd-course.js tests/gitlab-cicd-course.test.js tests/smoke.ps1
git commit -m "test: verify GitLab CI/CD course integration"
```

If no fixes were required, do not create an empty commit.

