# C# Course Content Quality Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** بازنویسی مستقل هر ۳۰ پاسخ فصل مبانی C# با مدل ذهنی روشن، مثال توضیح‌داده‌شده و عمق متناسب با سطح.

**Architecture:** دادهٔ محتوا از generator تک‌خطی به module ساختاریافتهٔ `course-content.js` منتقل می‌شود. generator فقط rendering و navigation را انجام می‌دهد و آزمون‌ها استقلال فیلدها، نبود تکرار و سلامت ۳۰ خروجی را کنترل می‌کنند.

**Tech Stack:** JavaScript، HTML، CSS، Node.js test runner.

## Global Constraints

- اجرای کامل در همین جلسه و بدون Subagent.
- رعایت کامل `RTK.md` و عدم ترجمهٔ terminology رسمی.
- حفظ ۳۰ URL، ترتیب، سطح و navigation فعلی.
- هر پاسخ دارای `shortAnswer`, `mentalModel`, `deepDive`, `examples`, `keyPoints`, `pitfalls`, `realWorld`, `interviewAnswer`, `furtherDetails` مستقل است.
- هیچ boilerplate مشترک به‌عنوان محتوای آموزشی تولید نمی‌شود.

### Task 1: Quality contract and content architecture

- [ ] آزمون failing برای schema، استقلال فیلدها، نبود پاراگراف تکراری، examples دارای explanation و دو pitfall بنویس.
- [ ] RED را ثبت کن.
- [ ] `tools/course-content.js` و renderer جدید را ایجاد کن.
- [ ] سؤال اول را کامل بازنویسی و GREEN را ثبت کن.

### Task 2: Types and operators

- [ ] سؤال‌های ۲ تا ۱۰ را با محتوای مستقل بازنویسی کن.
- [ ] ادعاهای type system، nullable، operators، foreach و overflow را با منابع رسمی تطبیق بده.
- [ ] صفحات را تولید و آزمون‌های quality/content/link را اجرا کن.

### Task 3: OOP and records

- [ ] سؤال‌های ۱۱ تا ۲۰ را بازنویسی کن.
- [ ] تفاوت dispatch، equality، record copying و tuple behavior را دقیق توضیح بده.
- [ ] صفحات را تولید و آزمون‌ها را اجرا کن.

### Task 4: Generics and collections

- [ ] سؤال‌های ۲۱ تا ۳۰ را بازنویسی کن.
- [ ] variance، CLR generics، hashing و concurrent/immutable trade-offها را دقیق توضیح بده.
- [ ] صفحات را تولید و آزمون‌ها را اجرا کن.

### Task 5: Full verification

- [ ] نبود متن تکراری و terminology ممنوع را بررسی کن.
- [ ] syntax، quality، content، links، contrast و آزمون‌های قبلی سایت را اجرا کن.
- [ ] شش صفحهٔ نماینده و سؤال اول را انسانی بازبینی کن.
- [ ] نتیجه را commit و پس از verification به main ادغام کن.
