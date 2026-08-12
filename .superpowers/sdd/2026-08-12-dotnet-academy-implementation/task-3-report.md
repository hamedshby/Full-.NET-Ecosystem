# Task 3 report: interaction helpers and browser behavior

## RED evidence

Created `tests/interactions.test.js` before any `script.js` existed. The test requires `../script.js` and asserts the required theme normalization cases, email validation cases, and nonempty Persian message keys.

Ran `node tests/interactions.test.js` while `script.js` was absent. It exited with code `1` and the expected `MODULE_NOT_FOUND` error for `../script.js`.

## GREEN evidence

Created `script.js` only after the RED run. It provides and CommonJS-exports `normalizeTheme`, `isValidEmail`, and `messages`; its DOM behavior is guarded by `typeof document !== 'undefined'` and starts through `DOMContentLoaded`.

Ran `node tests/interactions.test.js` after implementation. It exited with code `0` and printed `Interaction helper tests passed.`

## Delivered files

- `script.js`: pure helpers plus guarded theme, menu, toast, language, course/resource, and newsletter interactions.
- `tests/interactions.test.js`: Node assertions for the required pure helper and Persian-message contracts.
- `index.html`: a safe, inline early-theme selection script before the stylesheet and an initial `aria-pressed` state for the theme control.

## Verification

Ran successfully:

```text
node --check script.js
node tests/interactions.test.js
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
git diff --check
```

The interaction tests printed `Interaction helper tests passed.` and the smoke script printed `Static smoke checks passed.`

## Self-review

- Stored `dark` and `light` values override the system preference; invalid or missing storage uses the current system preference.
- Storage reads and writes are protected with `try/catch`; unavailable storage leaves the page theme usable.
- The theme applies `data-theme` and keeps the toggle's `aria-pressed` in sync.
- The menu toggles `aria-expanded`, closes on Escape and navigation selection, and keeps the existing DOM/CSS selector relationship intact.
- Toast output uses the existing polite live region and clears/restarts its timer on each message.
- Language, course, resource, and newsletter feedback stays in Persian. Newsletter validation focuses invalid input; a valid submission resets the form and explains it is a demo.
- The early head script contains only safe theme selection to prevent a flash and does not install duplicate event behavior.

## Concerns

None. Browser interaction wiring uses existing selectors and no CSS contracts were changed.
