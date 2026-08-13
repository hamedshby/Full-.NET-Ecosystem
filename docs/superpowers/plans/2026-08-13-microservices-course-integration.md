# Microservices Course Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** انتقال فهرست ۱۵۱ سرفصلی و ۲۳ درس موجود `MicroService` به یک دورهٔ مستقل و واکنش‌گرا در `Full .NET Ecosystem`.

**Architecture:** دادهٔ فهرست در یک ماژول JavaScript مرکزی نگهداری می‌شود و Sidebar تمام صفحات را می‌سازد. یک Generator محتوای ۲۳ فایل منبع را در Shell مشترک دوره قرار می‌دهد تا هر درس URL مستقل داشته باشد؛ موارد فاقد محتوا فقط به‌صورت «به‌زودی» نمایش داده می‌شوند.

**Tech Stack:** HTML5، CSS، JavaScript سازگار با Node.js، `node:test` و PowerShell Smoke Tests.

**Spec:** `docs/superpowers/specs/2026-08-13-microservices-course-integration-design.md`

## Global Constraints

- تمام ۱۵۱ سرفصل فعلی در همان ترتیب و در ۱۸ فصل نمایش داده شوند.
- دقیقاً ۲۳ درس در دسترس و ۱۲۸ درس «به‌زودی» باشند.
- پروژهٔ منبع `../MicroService` ویرایش یا حذف نشود.
- دوره پس از تولید به پروژهٔ منبع وابستگی اجرایی نداشته باشد.
- اصطلاحات رسمی فنی انگلیسی بمانند و الزامات `RTK.md` رعایت شوند.
- بدون JavaScript، فهرست و محتوا قابل استفاده باقی بمانند.
- از Subagent استفاده نشود؛ اجرا Inline و در همین جلسه انجام شود.

---

### Task 1: مدل مرکزی فهرست و قرارداد دسترسی

**Files:**
- Create: `courses/microservices/course-navigation.js`
- Create: `tests/microservices-navigation.test.js`

**Interfaces:**
- Consumes: ترتیب فصل‌ها، عنوان‌ها و شناسه‌های استخراج‌شده از `../MicroService/index.html` و فایل‌های `../MicroService/chapters/*.html`.
- Produces: `microservicesChapters: Array<{ title: string, lessons: Array<{ id: string, title: string, available: boolean }> }>`، `availableLessons` و `renderMicroservicesNavigation(currentLessonId)`.

- [ ] **Step 1: Write the failing navigation contract test**

```js
const { microservicesChapters, availableLessons } = require('../courses/microservices/course-navigation.js');
assert.equal(microservicesChapters.length, 18);
assert.equal(microservicesChapters.flatMap(chapter => chapter.lessons).length, 151);
assert.equal(new Set(microservicesChapters.flatMap(chapter => chapter.lessons.map(lesson => lesson.id))).size, 151);
assert.equal(availableLessons.length, 23);
assert.equal(microservicesChapters.flatMap(chapter => chapter.lessons).filter(lesson => !lesson.available).length, 128);
```

- [ ] **Step 2: Run the test and confirm RED**

Run: `node --test tests/microservices-navigation.test.js`

Expected: FAIL because `course-navigation.js` does not exist.

- [ ] **Step 3: Implement the complete catalog and renderer**

Define all ۱۸ chapter objects and all ۱۵۱ lesson objects using their exact source titles. Mark availability from the explicit ۲۳-ID set. Render available lessons as links to `./<id>.html`; render unavailable lessons as non-interactive rows containing `<span class="soon-badge">به‌زودی</span>`. Add `aria-current="page"` only to the current available lesson and open its containing `<details>`.

- [ ] **Step 4: Run the navigation test and confirm GREEN**

Run: `node --test tests/microservices-navigation.test.js`

Expected: all navigation contract assertions pass.

- [ ] **Step 5: Commit the navigation model**

```powershell
git add courses/microservices/course-navigation.js tests/microservices-navigation.test.js
git commit -m "feat: add Microservices course catalog"
```

### Task 2: Shell مشترک، Layout و تعامل‌ها

**Files:**
- Create: `courses/microservices/course.css`
- Create: `courses/microservices/course.js`
- Create: `tests/microservices-shell.test.js`

**Interfaces:**
- Consumes: عنصر `#course-sidebar` با `data-current-lesson` و تابع `renderMicroservicesNavigation` از Task 1.
- Produces: Sidebar سمت راست، محتوای سمت چپ، تم روشن/تیره، منوی Responsive و Copy Code.

- [ ] **Step 1: Write failing shell tests**

```js
assert.match(css, /grid-template-columns:minmax\(0,1fr\) 360px/);
assert.match(css, /\.course-sidebar\{[^}]*grid-column:2/);
assert.match(css, /@media\(max-width:800px\)/);
assert.match(script, /renderMicroservicesNavigation/);
assert.match(script, /aria-expanded/);
assert.match(script, /prefers-color-scheme/);
```

- [ ] **Step 2: Run the shell test and confirm RED**

Run: `node --test tests/microservices-shell.test.js`

Expected: FAIL because the shared CSS and interaction script do not exist.

- [ ] **Step 3: Implement the shared course shell assets**

Use the proven Senior course layout tokens and structure while keeping Microservices selectors isolated. Desktop uses `direction:ltr` for the grid and restores `direction:rtl` on Sidebar/content. Mobile converts the shell to a column, keeps navigation visible without JavaScript, and collapses it only after `.course-ready` is set. Add focus-visible styles, reduced-motion handling, sticky Sidebar, overflow-safe code blocks and non-clickable styling for upcoming rows.

- [ ] **Step 4: Run shell and existing interaction tests**

Run: `node --test tests/microservices-shell.test.js tests/interactions.test.js tests/progressive-enhancement.test.js`

Expected: all tests pass.

- [ ] **Step 5: Commit shell assets**

```powershell
git add courses/microservices/course.css courses/microservices/course.js tests/microservices-shell.test.js
git commit -m "feat: add responsive Microservices course shell"
```

### Task 3: تولید ۲۳ صفحهٔ درس مستقل

**Files:**
- Create: `tools/generate-microservices-course.js`
- Create: `courses/microservices/lessons/ch1-1.html` and 22 additional available lesson pages.
- Create: `tests/microservices-content.test.js`

**Interfaces:**
- Consumes: `../MicroService/chapters/<id>.html`، `availableLessons` و `microservicesChapters`.
- Produces: ۲۳ فایل HTML مستقل با Header، Sidebar mount point، Breadcrumb، محتوای منتقل‌شده و Pager.

- [ ] **Step 1: Write failing generated-content tests**

```js
assert.equal(generatedPages.length, 23);
for (const lesson of availableLessons) {
  const html = fs.readFileSync(path.join(lessonsRoot, `${lesson.id}.html`), 'utf8');
  assert.match(html, /<html lang="fa" dir="rtl">/);
  assert.match(html, /<aside id="course-sidebar"[^>]+data-current-lesson=/);
  assert.match(html, /<main id="lesson-content" class="lesson-content">/);
  assert.match(html, /<meta name="description" content="[^"]{30,}"/);
}
```

- [ ] **Step 2: Run the content test and confirm RED**

Run: `node --test tests/microservices-content.test.js`

Expected: FAIL because the generated lesson directory/pages do not exist.

- [ ] **Step 3: Implement deterministic generation**

The generator must derive the title from the first `h1` or catalog title, read each available source fragment, and place it inside this semantic shell: Skip Link, Header, menu button, theme button, `.course-shell`, Sidebar mount, `main#lesson-content`, Breadcrumb and Pager. Pager links only traverse `availableLessons`; first/last pages link back to the academy or omit the absent direction. Escape title/description attributes and use only relative internal asset paths.

- [ ] **Step 4: Generate pages and verify GREEN**

Run: `node tools/generate-microservices-course.js`

Run: `node --test tests/microservices-navigation.test.js tests/microservices-shell.test.js tests/microservices-content.test.js`

Expected: ۲۳ pages generated and all assertions pass.

- [ ] **Step 5: Commit generator and generated pages**

```powershell
git add tools/generate-microservices-course.js courses/microservices/lessons tests/microservices-content.test.js
git commit -m "feat: migrate available Microservices lessons"
```

### Task 4: اتصال صفحهٔ اصلی و Verification نهایی

**Files:**
- Modify: `index.html`
- Modify: `tests/microservices-card.test.js`
- Modify: `tests/smoke.ps1`

**Interfaces:**
- Consumes: اولین صفحهٔ داخلی `courses/microservices/lessons/ch1-1.html`.
- Produces: مسیر ورودی دوره از کارت صفحهٔ اصلی و کنترل Smoke ساختار دوره.

- [ ] **Step 1: Change the card test first**

```js
assert.equal(href, 'courses/microservices/lessons/ch1-1.html');
assert.ok(fs.existsSync(path.resolve(root, href)));
```

- [ ] **Step 2: Run the card test and confirm RED**

Run: `node --test tests/microservices-card.test.js`

Expected: FAIL because the card still points to `../MicroService/index.html`.

- [ ] **Step 3: Point the card to the internal course and extend smoke checks**

Change only the card `href`. Add Smoke assertions for the internal first lesson, shared CSS/JS, and exact ۱۸/۱۵۱/۲۳/۱۲۸ catalog counts. Do not alter unrelated Senior course assertions.

- [ ] **Step 4: Run focused and full verification**

Run: `node --test tests/microservices-card.test.js tests/microservices-navigation.test.js tests/microservices-shell.test.js tests/microservices-content.test.js`

Run: `node --test tests`

Run: `powershell.exe -NoProfile -ExecutionPolicy Bypass -File tests/smoke.ps1`

Run: `git diff --check`

Expected: all new Microservices tests pass; any pre-existing unrelated failures are reported separately with their exact names and are not hidden.

- [ ] **Step 5: Commit integration**

```powershell
git add index.html tests/microservices-card.test.js tests/smoke.ps1
git commit -m "feat: integrate Microservices course with academy"
```
