# طراحی فصل مستقل JWT در دوره Microservices

## هدف

فصل `JWT` از فصل عمومی `Security` جدا شود و به‌عنوان فصل ۱۷، چهار درس پیوسته و قابل‌مطالعه داشته باشد. فصل‌های فعلی بعد از آن یک شماره افزایش پیدا کنند.

## ساختار فصل

1. `17.1 JWT Fundamentals`: مدل ذهنی، ساختار Token، Claimها، Signing و محدودیت‌ها.
2. `17.2 JWT Authentication in ASP.NET Core`: پیکربندی، صدور و اعتبارسنجی Access Token و استفاده از Endpoint محافظت‌شده.
3. `17.3 Refresh Token, Rotation and Revocation`: مدل داده، Hash، Rotation، Reuse Detection، Revocation و Logout.
4. `17.4 Security Best Practices and Production Readiness`: مدیریت Key، انتخاب Algorithm، Browser Security، Logging و آزمون‌های امنیتی.

## شماره‌گذاری

- `17 - Performance` به `18 - Performance` و شناسه‌های درس‌هایش از `ch17-*` به `ch18-*` تبدیل شوند.
- `18 - Practical Project` به `19 - Practical Project` و شناسه‌های درس‌هایش از `ch18-*` به `ch19-*` تبدیل شوند.
- درس قدیمی `16.5 JWT` از فصل `16 - Security` حذف شود. سایر شماره‌های همان فصل برای جلوگیری از تغییر بی‌دلیل حفظ شوند.

## کیفیت محتوا

- متن از یک رفتار قابل مشاهده و مثال ساده آغاز شود و سپس جزئیات فنی را توضیح دهد.
- نام‌های رسمی .NET، APIها و مفاهیم امنیتی انگلیسی باقی بمانند.
- مثال‌ها برای ASP.NET Core و `Microsoft.AspNetCore.Authentication.JwtBearer` باشند.
- نمونه‌ها Secret واقعی نداشته باشند و صریحاً دربارهٔ نگهداری امن Key هشدار دهند.
- تفاوت Access Token، Refresh Token، Cookie و Browser Storage روشن باشد.
- سناریوهای Expiration، Rotation، Reuse Detection، Revocation و Integration Test پوشش داده شوند.

## معیار پذیرش

- navigation شامل ۱۹ فصل و فصل مستقل `17 - JWT` باشد.
- چهار درس JWT در navigation در دسترس و دارای فایل source و صفحهٔ generated باشند.
- pager بین درس‌های در دسترس صحیح باقی بماند.
- آزمون‌های Microservices و مجموعهٔ کامل آزمون‌ها موفق باشند.
