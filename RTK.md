# قوانین دائمی پروژه آکادمی دات‌نت

## روش اجرا

- تمام برنامه‌ها و تغییرات به‌صورت پیش‌فرض با روش «اجرا در همین جلسه» انجام شوند.
- از Subagent یا اجرای چندعاملی استفاده نشود، مگر اینکه کاربر صریحاً همان روش را درخواست کند.
- پس از تأیید طرح، کار تا پیاده‌سازی و Verification در همین جلسه ادامه پیدا کند.

## قانون اصطلاحات فنی

اصطلاحات رسمی .NET و C# ترجمه نمی‌شوند. متن توضیحی فارسی است، اما نام رسمی هر concept، keyword، type، API، runtime component، language feature، pattern و design principle با شکل متعارف انگلیسی باقی می‌ماند.

نمونهٔ درست:

> `Boxing` فرایندی است که طی آن یک `Value Type` در قالب `object` قرار می‌گیرد.

نمونهٔ نادرست:

> جعبه‌سازی فرایندی است که طی آن یک نوع مقداری در قالب شیء قرار می‌گیرد.

### قواعد الزامی

- از شکل‌های رسمی مانند `Value Type`، `Reference Type`، `Boxing`، `Unboxing`، `Nullable Reference Type`، `Runtime Polymorphism`، `Composition`، `Inheritance`، `Value Equality`، `Anonymous Type`، `Generic`، `Generic Constraint`، `Covariance`، `Contravariance`، `Invariance`، `Collection`، `Concurrent Collection` و `Immutable Collection` استفاده شود.
- keywordها و identifierها با casing رسمی نوشته شوند: `class`، `struct`، `record`، `object`، `string`، `IEnumerable<T>`.
- keywords، types و APIها در HTML داخل `code` و سایر نام‌های انگلیسی داخل `bdi` قرار گیرند، هرجا برای جهت RTL لازم است.
- توضیح مفهوم و مزایا و معایب فارسی بماند؛ فقط نام رسمی ترجمه نشود.
- عبارت‌های عمومی که نام رسمی نیستند، مانند «حافظه»، «خوانایی»، «پیمایش» و «هزینه»، فارسی باقی بمانند.
- شکل‌های آوانویسی‌شده مانند «جنریک» و «کالکشن» نیز استفاده نشوند؛ `Generic` و `Collection` نوشته شود.
- در صورت تردید، نام به‌کاررفته در مستندات رسمی Microsoft Learn و .NET ملاک است؛ ترجمهٔ حدسی ممنوع است.

### واژه‌نامهٔ پایه

| شکل رسمی | جایگزین فارسی ممنوع به‌عنوان نام اصطلاح |
|---|---|
| `Value Type` | نوع مقداری، نوع مقدار |
| `Reference Type` | نوع ارجاعی، نوع مرجعی |
| `Boxing` / `Unboxing` | جعبه‌سازی / جعبه‌گشایی |
| `Nullable Value Type` / `Nullable Reference Type` | نوع nullable ترجمه‌شده |
| `Short-Circuit Evaluation` | ارزیابی اتصال کوتاه |
| `Conditional Operator` | عملگر سه‌تایی، وقتی نام feature مدنظر است |
| `Overflow` | سرریز، وقتی runtime concept مدنظر است |
| `Overloading` / `Overriding` / `Method Hiding` | سربارگذاری / بازنویسی / پنهان‌سازی متد |
| `Runtime Polymorphism` | چندریختی زمان اجرا |
| `Composition` / `Inheritance` | ترکیب / وراثت، وقتی OOP concept مدنظر است |
| `Value Equality` / `Reference Equality` | برابری مقداری / ارجاعی |
| `Anonymous Type` | نوع ناشناس |
| `Covariance` / `Contravariance` / `Invariance` | هم‌وردایی / پادوردایی / ناوردایی |
| `Concurrent Collection` / `Immutable Collection` | مجموعهٔ هم‌زمان / تغییرناپذیر |
| `Garbage Collector` / `GC` | زباله‌روب |
| `Managed Heap`, `Stack`, `Heap` | ترجمهٔ نام ناحیهٔ حافظه |

این فهرست بسته نیست. قانون نام رسمی انگلیسی برای اصطلاحات جدید نیز اجرا می‌شود.
