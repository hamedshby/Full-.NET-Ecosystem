# Dotnet Academy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ساخت یک صفحهٔ فارسی، واکنش‌گرا و حرفه‌ای برای معرفی دوره‌های آکادمی دات‌نت با تم روشن/تاریک و زیرساخت چندزبانه.

**Architecture:** صفحه به‌صورت progressive enhancement ساخته می‌شود: محتوای اصلی و چهار دوره مستقیماً در HTML قرار می‌گیرند، CSS مسئول هویت بصری و واکنش‌گرایی است و JavaScript فقط تعاملات تکمیلی را فعال می‌کند. تنظیم تم در `localStorage` ذخیره می‌شود و متن‌های تعاملی از دیکشنری ترجمه خوانده می‌شوند.

**Tech Stack:** HTML5، CSS3 و JavaScript استاندارد (ES2020)، بدون فریم‌ورک، build tool، بک‌اند یا وابستگی بیرونی.

## Global Constraints

- تمام محتوای قابل مشاهده در نسخهٔ نخست فارسی و جهت سند `rtl` است.
- فقط فایل‌های HTML، CSS و JavaScript ساخته می‌شوند.
- ورود، ثبت‌نام، پرداخت، پخش ویدئو، صفحهٔ جزئیات و اجرای آزمون در دامنهٔ نسخهٔ نخست نیستند.
- چهار دورهٔ مشخص‌شده در سند طراحی باید نمایش داده شوند.
- محتوای اصلی بدون JavaScript نیز خوانا باقی می‌ماند.
- طراحی از عرض ۳۲۰ پیکسل به بالا و در هر دو تم قابل استفاده است.
- هیچ وابستگی شبکه‌ای برای نمایش درست صفحه لازم نیست.
- پوشهٔ فعلی مخزن Git نیست؛ گام‌های commit فقط پس از راه‌اندازی Git توسط مالک پروژه اجرا می‌شوند.

## File Map

- `index.html`: ساختار معنایی صفحه، سئوی پایه و محتوای ثابت چهار دوره.
- `styles.css`: توکن‌های طراحی، تم‌ها، اجزای بصری، انیمیشن و breakpointها.
- `script.js`: تم، منوی موبایل، اعلان، انتخاب زبان و فرم خبرنامه.
- `tests/smoke.ps1`: آزمون‌های ایستای ساختار HTML/CSS و قراردادهای محتوایی.
- `tests/interactions.test.js`: آزمون‌های بدون وابستگی برای توابع خالص تعاملی صادرشده از `script.js`.

---

### Task 1: Semantic page and content contract

**Files:**
- Create: `tests/smoke.ps1`
- Create: `index.html`

**Interfaces:**
- Produces: شناسه‌های `courses`, `resources`, `newsletter`؛ کنترل‌های `theme-toggle`, `language-toggle`, `menu-toggle`؛ ناحیهٔ اعلان `toast`; فرم `newsletter-form`.
- Produces: stylesheet reference به `styles.css` و deferred script reference به `script.js`.

- [ ] **Step 1: Write the failing structural smoke test**

در `tests/smoke.ps1` بررسی‌های صریح زیر نوشته شوند: وجود `lang="fa"` و `dir="rtl"`، وجود دقیق چهار `article.course-card`، وجود عنوان هر چهار دوره، وجود شناسه‌های رابط، وجود `<meta name="description">` و عدم وجود واژه‌های Login/ورود/ثبت‌نام در هدر.

```powershell
$html = Get-Content -Raw (Join-Path $PSScriptRoot '..\index.html')
$failures = [System.Collections.Generic.List[string]]::new()
function Assert-Contains([string]$pattern, [string]$message) {
  if ($html -notmatch $pattern) { $failures.Add($message) }
}
Assert-Contains '<html[^>]+lang="fa"[^>]+dir="rtl"' 'سند باید فارسی و راست‌چین باشد.'
Assert-Contains '<meta\s+name="description"' 'توضیح متا موجود نیست.'
foreach ($id in 'courses','resources','newsletter','theme-toggle','language-toggle','menu-toggle','toast','newsletter-form') {
  Assert-Contains "id=`"$id`"" "شناسه $id موجود نیست."
}
foreach ($title in 'مسیر حرفه‌ای Senior در','راهنمای طراحی سیستم','آزمون رایگان مصاحبه','دورهٔ ایمیلی Claude Code') {
  Assert-Contains [regex]::Escape($title) "عنوان دوره موجود نیست: $title"
}
$count = ([regex]::Matches($html, '<article[^>]+class="[^"]*course-card')).Count
if ($count -ne 4) { $failures.Add("تعداد کارت‌ها باید ۴ باشد؛ مقدار فعلی: $count") }
if ($failures.Count) { $failures | ForEach-Object { Write-Error $_ }; exit 1 }
Write-Host 'Static smoke checks passed.'
```

- [ ] **Step 2: Run the smoke test and verify failure**

Run: `powershell -ExecutionPolicy Bypass -File tests/smoke.ps1`

Expected: FAIL زیرا `index.html` هنوز وجود ندارد.

- [ ] **Step 3: Create the semantic HTML**

`index.html` شامل skip link، هدر و navigation، hero، بخش چهار کارت، بخش سه ارزش پیشنهادی، بخش منابع، فرم خبرنامه، footer و toast live region باشد. همهٔ دکمه‌های غیرارسالی `type="button"` داشته باشند، فرم label واقعی داشته باشد و کارت‌ها از heading مرتب استفاده کنند. متن، آمار و وضعیت دوره‌ها عین سند طراحی باشد.

- [ ] **Step 4: Run the smoke test**

Run: `powershell -ExecutionPolicy Bypass -File tests/smoke.ps1`

Expected: `Static smoke checks passed.`

- [ ] **Step 5: Commit when Git is available**

```powershell
git add index.html tests/smoke.ps1
git commit -m "feat: add semantic academy landing page"
```

### Task 2: Visual system, responsive layout, and themes

**Files:**
- Modify: `tests/smoke.ps1`
- Create: `styles.css`

**Interfaces:**
- Consumes: کلاس‌ها و شناسه‌های ایجادشده در `index.html`.
- Produces: توکن‌های CSS در `:root` و overrideهای `[data-theme="dark"]`؛ breakpointهای 1024، 760 و 480 پیکسل.

- [ ] **Step 1: Extend the failing smoke test**

`tests/smoke.ps1` محتوای `styles.css` را نیز بخواند و وجود قراردادهای زیر را بررسی کند:

```powershell
$css = Get-Content -Raw (Join-Path $PSScriptRoot '..\styles.css')
foreach ($pattern in ':root','\[data-theme="dark"\]','@media\s*\(max-width:\s*760px\)','prefers-reduced-motion','\.course-grid','\.course-card:focus-within') {
  if ($css -notmatch $pattern) { $failures.Add("قرارداد CSS موجود نیست: $pattern") }
}
```

- [ ] **Step 2: Run the test and verify failure**

Run: `powershell -ExecutionPolicy Bypass -File tests/smoke.ps1`

Expected: FAIL زیرا `styles.css` هنوز وجود ندارد.

- [ ] **Step 3: Implement the visual system**

`styles.css` باید شامل این موارد باشد: reset کوچک، فونت‌های سیستمی فارسی، توکن‌های رنگ/فاصله/شعاع/سایه، هدر sticky با backdrop، hero دو ناحیه‌ای، کارت‌های سه‌ستونه، artwork اختصاصی با CSS، نشان‌های وضعیت، buttons، toast، footer و focus ring. تم تاریک فقط از طریق توکن‌ها override شود. در 1024px hero فشرده، در 760px منوی موبایل و grid تک‌ستونه/دوستونه، و در 480px اقدامات تمام‌عرض شوند. `prefers-reduced-motion: reduce` همهٔ حرکت‌های غیرضروری را حذف کند.

- [ ] **Step 4: Run the smoke test**

Run: `powershell -ExecutionPolicy Bypass -File tests/smoke.ps1`

Expected: `Static smoke checks passed.`

- [ ] **Step 5: Commit when Git is available**

```powershell
git add styles.css tests/smoke.ps1
git commit -m "feat: add responsive light and dark visual system"
```

### Task 3: Pure interaction helpers and behavior

**Files:**
- Create: `tests/interactions.test.js`
- Create: `script.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `normalizeTheme(value, systemDark): 'light'|'dark'`.
- Produces: `isValidEmail(value): boolean`.
- Produces: `messages.fa` با کلیدهای `englishSoon`, `courseSoon`, `resourceSoon`, `invalidEmail`, `newsletterDemo`.
- Consumes: شناسه‌های DOM تعریف‌شده در Task 1.

- [ ] **Step 1: Write failing helper tests**

```javascript
const assert = require('node:assert/strict');
const { normalizeTheme, isValidEmail, messages } = require('../script.js');

assert.equal(normalizeTheme('dark', false), 'dark');
assert.equal(normalizeTheme('light', true), 'light');
assert.equal(normalizeTheme('broken', true), 'dark');
assert.equal(normalizeTheme(null, false), 'light');
assert.equal(isValidEmail('learner@example.com'), true);
assert.equal(isValidEmail('learner@'), false);
assert.equal(isValidEmail(''), false);
assert.ok(messages.fa.englishSoon);
assert.ok(messages.fa.newsletterDemo);
console.log('Interaction helper tests passed.');
```

- [ ] **Step 2: Run tests and verify failure**

Run: `node tests/interactions.test.js`

Expected: FAIL با خطای نبودن `script.js` یا exportها.

- [ ] **Step 3: Implement helpers and browser initialization**

در `script.js` توابع خالص بالای فایل تعریف و برای Node با `module.exports` صادر شوند. کد مرورگر تنها داخل guard زیر اجرا شود:

```javascript
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initApp);
}
```

`initApp()` این رفتارها را متصل کند: خواندن امن theme از `localStorage` با fallback به `matchMedia`، تغییر `data-theme` و `aria-pressed`، باز/بسته‌شدن منوی موبایل و Escape، بستن منو پس از انتخاب پیوند، نمایش toast با timer قابل تمدید، پیام نسخهٔ انگلیسی، پیام جزئیات دوره/منابع، و اعتبارسنجی فرم خبرنامه. انتخاب زبان رابط را انگلیسی نکند.

- [ ] **Step 4: Add early theme bootstrap**

در `<head>` یک اسکریپت کوتاه و مستقل اضافه شود که پیش از paint، تم ذخیره‌شده یا تم سیستم را روی `document.documentElement.dataset.theme` قرار دهد و خطای storage را نادیده بگیرد تا flash تم کاهش یابد.

- [ ] **Step 5: Run syntax and helper tests**

Run: `node --check script.js`

Expected: بدون خروجی و exit code صفر.

Run: `node tests/interactions.test.js`

Expected: `Interaction helper tests passed.`

- [ ] **Step 6: Run all static tests**

Run: `powershell -ExecutionPolicy Bypass -File tests/smoke.ps1`

Expected: `Static smoke checks passed.`

- [ ] **Step 7: Commit when Git is available**

```powershell
git add index.html script.js tests/interactions.test.js
git commit -m "feat: add theme language menu and newsletter interactions"
```

### Task 4: Final accessibility and cross-width verification

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `script.js`
- Modify: `tests/smoke.ps1`

**Interfaces:**
- Consumes: صفحه و تعاملات کامل Tasks 1–3.
- Produces: نسخهٔ نهایی قابل تحویل که مستقیم با `index.html` اجرا می‌شود.

- [ ] **Step 1: Add final accessibility assertions**

به `tests/smoke.ps1` بررسی وجود skip link، `aria-live="polite"`، label ایمیل، `aria-expanded` منوی موبایل، `aria-pressed` تم و `type="button"` برای کنترل‌ها اضافه شود.

- [ ] **Step 2: Run smoke test and confirm any missing contract fails**

Run: `powershell -ExecutionPolicy Bypass -File tests/smoke.ps1`

Expected: اگر قراردادی از HTML حذف باشد FAIL؛ در غیر این صورت PASS و گام بعد مستقیماً به بازبینی دستی می‌رود.

- [ ] **Step 3: Perform manual browser verification**

`index.html` مستقیماً باز و این ماتریس بررسی شود:

- عرض 320px: بدون اسکرول افقی، منو قابل بازشدن با keyboard و touch.
- عرض 768px: کارت‌ها بدون هم‌پوشانی و متن‌ها خوانا.
- عرض 1440px: grid سه‌ستونه و حداکثر عرض محتوا متعادل.
- تم روشن و تاریک: متن، border، badge و focus ring قابل تشخیص.
- JavaScript خاموش: هدر، hero، چهار دوره، ارزش‌ها و فوتر قابل خواندن.
- keyboard: Tab order منطقی، Escape منو را می‌بندد، Enter/Space کنترل‌ها را فعال می‌کند.
- language: پیام «نسخهٔ انگلیسی به‌زودی» نمایش داده شود.
- newsletter: ایمیل نامعتبر رد و ایمیل معتبر پیام نمایشی دریافت کند.

- [ ] **Step 4: Fix only observed defects and rerun full verification**

Run: `node --check script.js`

Run: `node tests/interactions.test.js`

Run: `powershell -ExecutionPolicy Bypass -File tests/smoke.ps1`

Expected: هر سه فرمان با exit code صفر پایان یابند و موارد ماتریس دستی بدون نقص مشاهده‌شده باشند.

- [ ] **Step 5: Commit when Git is available**

```powershell
git add index.html styles.css script.js tests
git commit -m "test: verify academy landing page experience"
```
