# C# Fundamentals Interview Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** افزودن فصل «مبانی C#» با ۳۰ صفحهٔ مستقل سؤال مصاحبه، پاسخ‌های عمیق فارسی، ناوبری فصل و تجربهٔ مطالعهٔ واکنش‌گرا به دورهٔ Senior .NET.

**Architecture:** هر سؤال یک سند HTML مستقل و crawlable است و محتوای پاسخ در همان سند قرار می‌گیرد. `course.css` و `course.js` پوسته و تعامل مشترک را فراهم می‌کنند؛ آزمون‌های Node قرارداد محتوا، لینک‌ها، سطح‌ها، progressive enhancement و کنتراست را کنترل می‌کنند.

**Tech Stack:** HTML5، CSS3، JavaScript ES2020، Node.js built-in test runner، PowerShell؛ بدون وابستگی بیرونی یا build tool.

## Global Constraints

- دقیقاً ۳۰ صفحه و شش موضوع، هر موضوع پنج سؤال.
- هر سؤال URL مستقل و متن اصلی قابل مطالعه بدون JavaScript دارد.
- هر پاسخ شامل پاسخ کوتاه، توضیح کامل، کد، اشتباهات رایج، کاربرد واقعی و جمع‌بندی مصاحبه است.
- تمام رابط و توضیحات فارسی و RTL؛ کد و شناسه‌های فنی LTR هستند.
- سطح‌ها دقیقاً مطابق سند طراحی: ۸ مقدماتی، ۱۵ متوسط، ۷ ارشد.
- هیچ ورود، ذخیرهٔ پیشرفت، یادداشت، بوکمارک، بک‌اند یا وابستگی شبکه‌ای اضافه نمی‌شود.
- تم از کلید `dotnet-academy-theme` استفاده می‌کند و در نبود storage همچنان کار می‌کند.
- ناوبری پایه، پاسخ و لینک قبل/بعد بدون JavaScript قابل استفاده‌اند.
- همهٔ کدهای C# باید از نظر نحوی معقول، موضوع‌محور و غیرتکراری باشند.
- ادعاهای فنی باید دقیق باشند؛ از ذکر نسخهٔ زبان در موارد نامطمئن خودداری شود.

## File Map

- Modify: `index.html` — اتصال کارت Senior به نخستین سؤال.
- Create: `courses/dotnet-senior/course.css` — پوسته، تم، sidebar، پاسخ و responsive.
- Create: `courses/dotnet-senior/course.js` — تم، منوی mobile، گروه‌ها و copy.
- Create: `courses/dotnet-senior/csharp/{types,operators,oop,records,generics,collections}/*.html` — ۳۰ سؤال.
- Create: `tests/course-content.test.js` — شمارش، سطوح، بخش‌ها و یکتایی.
- Create: `tests/course-links.test.js` — صحت hrefها و زنجیرهٔ قبل/بعد.
- Create: `tests/course-interactions.test.js` — helperهای تم و copy.
- Create: `tests/course-contrast.test.js` — نقش‌های رنگی پوستهٔ مطالعه.

---

### Task 1: Course shell contracts and shared assets

**Files:**
- Create: `tests/course-content.test.js`
- Create: `tests/course-interactions.test.js`
- Create: `courses/dotnet-senior/course.css`
- Create: `courses/dotnet-senior/course.js`
- Create: `courses/dotnet-senior/csharp/types/value-vs-reference.html`

**Interfaces:**
- Produces HTML contract: `.course-shell`, `.course-sidebar`, `.answer-content`, `[data-question-link]`, `.level-badge`, `[data-copy-code]`, `#course-menu-toggle`, `#theme-toggle`, `#copy-status`.
- Produces JS exports: `normalizeTheme(value, systemDark)`, `copyFallbackText(code)`, `messages.fa`.

- [ ] **Step 1: Write failing content and helper tests**

Tests must assert the first page exists and contains one unique `h1`, meta description, level text «مقدماتی», all six required answer section headings, at least one `pre><code`, previous/next navigation, all shell IDs/classes, and exports with the same theme cases used by the landing page plus nonempty Persian copy messages.

- [ ] **Step 2: Run RED**

Run: `node --test tests/course-content.test.js tests/course-interactions.test.js`

Expected: FAIL because assets and first page do not exist.

- [ ] **Step 3: Implement shared shell and first question**

Create the two-column desktop shell, mobile progressive-enhancement menu, light/dark variables, accessible code blocks, focus states and reduced-motion rules. Implement guarded JS for theme, menu Escape/links, collapsible groups and clipboard with selection fallback. Write a substantive answer to «تفاوت Value Type و Reference Type چیست؟» covering storage semantics without the false “value types always stack/reference types always heap” rule, copying, parameters, nullability, examples, pitfalls and interview summary.

- [ ] **Step 4: Run GREEN and syntax check**

Run: `node --check courses/dotnet-senior/course.js`

Run: `node --test tests/course-content.test.js tests/course-interactions.test.js`

Expected: all pass.

- [ ] **Step 5: Commit**

`git commit -am "feat: add C# interview course shell"` after adding new files.

### Task 2: Types and type-system pages (questions 2–5)

**Files:**
- Create four remaining files under `courses/dotnet-senior/csharp/types/`.
- Modify: `tests/course-content.test.js`.

**Interfaces:**
- Consumes Task 1 shell/assets.
- Produces five linked type-system pages numbered 1–5.

- [ ] **Step 1: Extend test for exact slugs and levels**

Require `boxing-unboxing.html`, `nullable-types.html`, `var-object-dynamic.html`, `clr-type-system.html`; assert levels متوسط، متوسط، متوسط، ارشد and titles from the design spec.

- [ ] **Step 2: Run RED**, expecting four missing pages.

- [ ] **Step 3: Write four deep answers** covering allocation/performance nuance, nullable flow analysis vs `Nullable<T>`, compile-time/runtime typing, and CTS/CLS/memory representation. Each page receives distinct examples and a correct previous/next link.

- [ ] **Step 4: Run** `node --test tests/course-content.test.js` and expect PASS.

- [ ] **Step 5: Commit** with `feat: add C# type system interview questions`.

### Task 3: Operators, expressions, and statements (questions 6–10)

**Files:**
- Create five files under `courses/dotnet-senior/csharp/operators/`.
- Modify: `tests/course-content.test.js`.

**Interfaces:** Produces slugs `logical-and.html`, `conditional-operator.html`, `null-operators.html`, `foreach-lowering.html`, `checked-unchecked.html` with levels مقدماتی، مقدماتی، متوسط، ارشد، متوسط.

- [ ] **Step 1: Add exact manifest assertions and run RED.**
- [ ] **Step 2: Author answers** distinguishing boolean/bitwise eager semantics, conditional expression target typing, null operators, `foreach` pattern/enumerator/disposal/ref iteration nuance, and compile/runtime overflow behavior. Include side-effect and boundary examples.
- [ ] **Step 3: Link question 5 → 6 and 10 → 11; ensure internal 6–10 chain.**
- [ ] **Step 4: Run content tests and expect PASS.**
- [ ] **Step 5: Commit** with `feat: add C# operators interview questions`.

### Task 4: OOP pages (questions 11–15)

**Files:** Create five files under `courses/dotnet-senior/csharp/oop/`; modify content test.

**Interfaces:** Produces slugs `class-struct-record.html`, `overload-override-hide.html`, `interface-vs-abstract.html`, `runtime-polymorphism.html`, `composition-vs-inheritance.html` with levels متوسط، متوسط، مقدماتی، متوسط، ارشد.

- [ ] **Step 1: Add manifest assertions and run RED.**
- [ ] **Step 2: Author answers** focused on domain modeling, dispatch differences (`virtual`/`override`/`new`), contracts/state/default interface members without overclaiming, virtual dispatch, and substitutability/composition trade-offs.
- [ ] **Step 3: Complete 10 → 11 → … → 16 links and sidebar active state.**
- [ ] **Step 4: Run content tests and expect PASS.**
- [ ] **Step 5: Commit** with `feat: add C# object oriented interview questions`.

### Task 5: Records, anonymous types, and tuples (questions 16–20)

**Files:** Create five files under `courses/dotnet-senior/csharp/records/`; modify content test.

**Interfaces:** Produces slugs `record-vs-class.html`, `record-value-equality.html`, `record-kinds.html`, `anonymous-types.html`, `tuple-choices.html` with levels مقدماتی، متوسط، ارشد، مقدماتی، متوسط.

- [ ] **Step 1: Add manifest assertions and run RED.**
- [ ] **Step 2: Author answers** covering value equality/shallow immutability, equality contracts/inheritance, record kinds and copying, anonymous projection boundaries, Tuple vs ValueTuple allocation/naming/API design.
- [ ] **Step 3: Complete 15 → 16 → … → 21 links.**
- [ ] **Step 4: Run content tests and expect PASS.**
- [ ] **Step 5: Commit** with `feat: add C# records and tuples interview questions`.

### Task 6: Generics and variance (questions 21–25)

**Files:** Create five files under `courses/dotnet-senior/csharp/generics/`; modify content test.

**Interfaces:** Produces slugs `generic-benefits.html`, `generic-constraints.html`, `variance.html`, `list-invariance.html`, `clr-generics.html` with levels مقدماتی، متوسط، ارشد، متوسط، ارشد.

- [ ] **Step 1: Add manifest assertions and run RED.**
- [ ] **Step 2: Author answers** covering type safety/code reuse/boxing, constraint vocabulary and static abstract nuance only where useful, `out`/`in`, mutation safety behind invariance, and CLR sharing/specialization/JIT behavior without absolute performance claims.
- [ ] **Step 3: Complete 20 → 21 → … → 26 links.**
- [ ] **Step 4: Run content tests and expect PASS.**
- [ ] **Step 5: Commit** with `feat: add C# generics interview questions`.

### Task 7: Collections (questions 26–30)

**Files:** Create five files under `courses/dotnet-senior/csharp/collections/`; modify content test.

**Interfaces:** Produces slugs `array-list-linkedlist.html`, `dictionary-hashing.html`, `collection-interfaces.html`, `set-and-map-choices.html`, `concurrent-immutable.html` with levels مقدماتی، متوسط، متوسط، متوسط، ارشد.

- [ ] **Step 1: Add manifest assertions and run RED.**
- [ ] **Step 2: Author answers** covering complexity with real-world cache/locality caveats, equality comparer/hash invariants/collisions, least-powerful interface design, membership/order/key-value decisions, and concurrent vs immutable ownership/snapshot trade-offs.
- [ ] **Step 3: Complete links through question 30; final page has no fabricated next URL and provides return-to-course action.**
- [ ] **Step 4: Run content tests and assert exactly 30 pages and distribution 8/15/7.**
- [ ] **Step 5: Commit** with `feat: add C# collections interview questions`.

### Task 8: Link graph, landing integration, contrast, and final QA

**Files:**
- Modify: `index.html`
- Create: `tests/course-links.test.js`
- Create: `tests/course-contrast.test.js`
- Modify shared course assets/pages only for observed defects.

**Interfaces:** Connects landing card/title to `courses/dotnet-senior/csharp/types/value-vs-reference.html`; validates the complete product.

- [ ] **Step 1: Write failing integration tests**

Assert landing title/action link to the first page; every local href target exists; every page lists all 30 question links; exactly one `aria-current="page"`; previous/next graph matches manifest; no external CSS/JS/font/image; color roles meet 4.5:1 text and 3:1 focus/UI in both themes.

- [ ] **Step 2: Run RED** because landing/link/contrast contracts are incomplete.

- [ ] **Step 3: Implement landing links and fix only test-proven graph/contrast issues.**

- [ ] **Step 4: Run full suite**

```powershell
node --check courses/dotnet-senior/course.js
node --test tests/course-content.test.js tests/course-interactions.test.js tests/course-links.test.js tests/course-contrast.test.js
node --check script.js
node tests/interactions.test.js
node tests/contrast.test.js
node tests/progressive-enhancement.test.js
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
```

Expected: zero failures.

- [ ] **Step 5: Manually sample one page per topic** at 320px, 768px and 1440px in light/dark; verify no page overflow, sidebar/mobile menu, keyboard focus, code copy fallback, no-JS navigation, unique answer content and Persian readability.

- [ ] **Step 6: Commit** with `test: verify C# interview course experience`.
