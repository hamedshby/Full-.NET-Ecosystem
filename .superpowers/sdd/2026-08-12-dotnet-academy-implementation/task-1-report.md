# Task 1 Report: Semantic page and content contract

## RED

Created `tests/smoke.ps1` before any production HTML.

Command:

```powershell
powershell -ExecutionPolicy Bypass -File tests\smoke.ps1
```

Observed output (expected failure):

```text
Get-Content : Cannot find path '...\dotnet-academy\index.html' because it does not exist.
```

The command exited with code 1 because `index.html` had not yet been created.

## GREEN

Created `index.html` with the required Persian RTL semantic structure, content, accessibility hooks, and static asset references.

Command:

```powershell
powershell -ExecutionPolicy Bypass -File tests\smoke.ps1
```

Output:

```text
Static smoke checks passed.
```

Additional static review confirmed all nine button elements declare an explicit type (eight `button`, one `submit`) and that the page includes the stylesheet, deferred script, skip link, and polite live region.

## Files

- `index.html`
- `tests/smoke.ps1`
- `.superpowers/sdd/2026-08-12-dotnet-academy-implementation/task-1-report.md`

## Commit

`feat: add semantic academy landing page`

## Self-review

- The document declares `lang="fa"` and `dir="rtl"`, includes a Persian meta description, and keeps primary content available without JavaScript.
- The header supplies navigation and all required controls without login or registration copy.
- The main content contains the requested hero, exactly four semantic course cards with specified facts, three value propositions, resources, a labelled newsletter form, footer, and accessible toast region.
- Every non-submit button has `type="button"`; the newsletter button is the only submit button.

## Concerns

None. CSS and JavaScript behavior are intentionally deferred to later tasks.

## Round 1 Fix: Persian language-control copy

Added a smoke assertion requiring the `language-toggle` button to display `انگلیسی`.

RED command:

```powershell
powershell -ExecutionPolicy Bypass -File tests\smoke.ps1
```

RED output:

```text
The language control must use Persian visible copy.
```

Updated the visible button label from `English` to `انگلیسی` without changing its required identifier.

GREEN command:

```powershell
powershell -ExecutionPolicy Bypass -File tests\smoke.ps1
```

GREEN output:

```text
Static smoke checks passed.
```
