# JWT Course Chapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ساخت فصل مستقل ۱۷ برای آموزش جامع JWT در دوره Microservices و افزایش شمارهٔ فصل‌های بعدی.

**Architecture:** فهرست درس‌ها در `course-navigation.js` منبع navigation است؛ محتوای خام هر درس در مخزن source کنار پروژه نگهداری می‌شود و generator صفحات مستقل داخل این پروژه را می‌سازد. آزمون‌ها ابتدا قرارداد شماره‌گذاری، availability و حداقل پوشش آموزشی را تثبیت می‌کنند.

**Tech Stack:** HTML، JavaScript، Node.js test runner، ASP.NET Core code samples

**Spec:** `docs/superpowers/specs/2026-09-18-jwt-course-chapter-design.md`

## Global Constraints

- اصطلاحات رسمی .NET و C# ترجمه نشوند.
- تغییرهای موجود کاربر در فایل‌های System Design حفظ شوند.
- چهار درس JWT باید از navigation قابل‌دسترسی و توسط generator قابل‌بازتولید باشند.
- هیچ Secret واقعی در مثال‌ها قرار نگیرد.

---

### Task 1: قرارداد فصل و navigation

**Files:**
- Modify: `tests/microservices-navigation.test.js`
- Modify: `courses/microservices/course-navigation.js`

**Interfaces:**
- Consumes: ساختار `chapterData` و `availableIds` موجود.
- Produces: فصل `17 - JWT` با شناسه‌های `ch17-1` تا `ch17-4` و شماره‌های جدید فصل‌های بعدی.

- [x] آزمون تعداد فصل‌ها، عنوان‌ها، شناسه‌ها و availability فصل JWT نوشته و در حالت RED اجرا شود.
- [x] navigation با کمترین تغییر برای عبور آزمون به‌روزرسانی شود.
- [x] آزمون navigation در حالت GREEN اجرا شود.

### Task 2: چهار محتوای آموزشی JWT

**Files:**
- Create: `../MicroService/chapters/ch17-1.html`
- Create: `../MicroService/chapters/ch17-2.html`
- Create: `../MicroService/chapters/ch17-3.html`
- Create: `../MicroService/chapters/ch17-4.html`
- Modify: `tests/microservices-content.test.js`

**Interfaces:**
- Consumes: قرارداد HTML source مورد انتظار `generate-microservices-course.js`.
- Produces: چهار مقالهٔ مستقل شامل Fundamentals، ASP.NET Core implementation، Refresh lifecycle و Production security.

- [x] آزمون پوشش سرفصل‌ها، APIهای اصلی و هشدارهای امنیتی نوشته و در حالت RED اجرا شود.
- [x] چهار فایل source با مثال‌ها و توضیح رفتار آن‌ها ساخته شوند.
- [x] آزمون محتوایی در حالت GREEN اجرا شود.

### Task 3: تولید صفحات و Verification

**Files:**
- Generate: `courses/microservices/lessons/ch17-1.html`
- Generate: `courses/microservices/lessons/ch17-2.html`
- Generate: `courses/microservices/lessons/ch17-3.html`
- Generate: `courses/microservices/lessons/ch17-4.html`

**Interfaces:**
- Consumes: `availableLessons` و چهار source chapter.
- Produces: صفحات standalone با breadcrumb، sidebar و pager.

- [x] generator اجرا شود و چهار صفحهٔ جدید ساخته شود.
- [x] آزمون‌های Microservices اجرا و نتیجه بررسی شود.
- [x] کل مجموعه آزمون‌ها اجرا و failureهای موجود خارج از محدوده از تغییرهای JWT تفکیک شود.
