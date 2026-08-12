# .NET Terminology Policy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ثبت قانون دائمی عدم ترجمهٔ اصطلاحات رسمی .NET/C# و اصلاح منبع و ۳۰ صفحهٔ فصل مبانی C# براساس آن.

**Architecture:** `AGENTS.md` قانون پروژه را فعال و `RTK.md` قرارداد canonical را تعریف می‌کند. آزمون Node ترجمه‌های ممنوع را در generator و خروجی HTML رد می‌کند؛ سپس generator اصلاح و ۳۰ صفحه بدون تغییر URL بازتولید می‌شوند.

**Tech Stack:** Markdown، JavaScript، Node.js test runner، HTML.

## Global Constraints

- اصطلاحات رسمی .NET/C# ترجمه نمی‌شوند؛ توضیح پیرامون آن‌ها فارسی می‌ماند.
- casing رسمی keywords، types، APIs و concepts حفظ می‌شود.
- `AGENTS.md` باید `RTK.md` را به‌عنوان قانون پروژه بارگذاری کند.
- `tools/generate-course.js` منبع اصلی متن صفحات است.
- URL، سطح، ترتیب و لینک‌های ۳۰ صفحه تغییر نمی‌کنند.
- آزمون واژگان باید هم generator و هم HTMLهای تولیدشده را بررسی کند.

---

### Task 1: Permanent project terminology instructions

**Files:**
- Create: `tests/course-terminology.test.js`
- Create: `AGENTS.md`
- Create: `RTK.md`

**Interfaces:**
- Produces: project instruction `@RTK.md`.
- Produces: canonical glossary and `FORBIDDEN_TRANSLATIONS` test contract.

- [ ] **Step 1: Write failing instruction test**

Test must assert `AGENTS.md` contains `@RTK.md`; `RTK.md` includes the rule «اصطلاحات رسمی .NET و C# ترجمه نمی‌شوند» and canonical terms `Value Type`, `Reference Type`, `Boxing`, `Unboxing`, `Runtime Polymorphism`, `Generic`, `Collection`.

- [ ] **Step 2: Run RED**

Run: `node --test tests/course-terminology.test.js`

Expected: FAIL because both instruction files are absent.

- [ ] **Step 3: Create minimal durable instructions**

`AGENTS.md` contains an instruction block importing `@RTK.md`. `RTK.md` contains scope, mandatory writing rules, canonical glossary from the approved spec, valid/invalid examples, and a rule to consult official Microsoft/.NET terminology when uncertain.

- [ ] **Step 4: Run GREEN** and commit `docs: add permanent .NET terminology rules`.

### Task 2: Terminology regression scanner

**Files:**
- Modify: `tests/course-terminology.test.js`

**Interfaces:**
- Produces scanner for `tools/generate-course.js` and all 30 course HTML files.

- [ ] **Step 1: Add forbidden-translation assertions**

At minimum reject: `نوع مقداری`, `نوع ارجاعی`, `جعبه‌سازی`, `جعبه‌گشایی`, `چندریختی زمان اجرا`, `سربارگذاری`, `بازنویسی متد`, `پنهان‌سازی متد`, `برابری مقداری`, `نوع ناشناس`, `هم‌وردایی`, `پادوردایی`, `ناوردایی`, `مجموعهٔ هم‌زمان`, `مجموعهٔ تغییرناپذیر`, `زباله‌روب`, `پشتهٔ مدیریت‌شده` when used in course content.

- [ ] **Step 2: Run RED** and require the failure output to list matching files/terms.

- [ ] **Step 3: Add canonical presence assertions** for the page associated with each core term so deleting terminology cannot make the scanner pass.

### Task 3: Rewrite source terminology and regenerate pages

**Files:**
- Modify: `tools/generate-course.js`
- Regenerate: 30 HTML files under `courses/dotnet-senior/csharp/`.

**Interfaces:**
- Consumes canonical forms in `RTK.md`.
- Preserves question manifest, levels and href graph.

- [ ] **Step 1: Replace forbidden names in generator** with canonical English forms while keeping explanations natural Persian. Wrap technical terms in generated HTML with `bdi` or `code` when direction/readability requires it.

- [ ] **Step 2: Run** `node tools/generate-course.js`.

- [ ] **Step 3: Run terminology test** and expect PASS.

- [ ] **Step 4: Run course content/link tests** and expect exactly 30 pages, 8/15/7 levels and all links valid.

- [ ] **Step 5: Commit** with `fix: preserve official .NET terminology in Persian content`.

### Task 4: Final compatibility verification

**Files:**
- Modify only files implicated by failing regression tests.

**Interfaces:** Produces final policy-compliant site with unchanged behavior.

- [ ] **Step 1: Run full suite**

```powershell
node --check tools/generate-course.js
node --check courses/dotnet-senior/course.js
node --test tests/course-terminology.test.js tests/course-content.test.js tests/course-interactions.test.js tests/course-links.test.js tests/course-contrast.test.js
node --check script.js
node tests/interactions.test.js
node tests/contrast.test.js
node tests/progressive-enhancement.test.js
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
git diff --check
```

Expected: zero failures.

- [ ] **Step 2: Inspect representative pages** from all six topics to verify technical terms are English, Persian prose remains readable, and no URL/heading/navigation regression exists.

- [ ] **Step 3: Commit any test-proven final correction** with `test: verify .NET terminology policy`.
