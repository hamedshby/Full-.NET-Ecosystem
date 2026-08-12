# Task 4 report: final accessibility and cross-width verification

## Scope

- Extended the static smoke suite with the seven required accessibility and header-control contracts.
- Renamed the newsletter input to `newsletter-email` and updated its JavaScript lookup so the actual label/input relationship meets that contract without changing behavior.
- Performed the required automated checks and a source-level responsive, keyboard, theme, and no-JavaScript integration review.

## RED/GREEN evidence

The pre-extension smoke suite first passed with exit code `0` and `Static smoke checks passed.`

Added assertions for:

- skip link target `#main-content` and an actual `main-content` main landmark;
- polite toast live region;
- matching newsletter label/input identifier `newsletter-email`;
- `aria-expanded` on the explicit mobile-menu button;
- `aria-pressed` on the explicit theme button; and
- `type="button"` on each of the three header controls.

RED command:

```powershell
powershell -ExecutionPolicy Bypass -File tests\smoke.ps1
```

Expected result: exit code `1`, reporting `The newsletter email input must have a matching label.` The new assertion identified the pre-existing `for="email"`/`id="email"` identifier rather than the required `newsletter-email` contract.

GREEN change:

- Changed the label `for` and input `id` to `newsletter-email` in `index.html`.
- Changed `script.js` to look up `newsletter-email`, retaining invalid focus, valid reset, and toast behavior.

GREEN result: the smoke command exited `0` and printed `Static smoke checks passed.`

## Automated verification

All commands completed successfully after the change:

```text
node --check script.js
node tests/interactions.test.js
Interaction helper tests passed.
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
Static smoke checks passed.
git diff --check
```

## Integration review

- At 320px, the mobile breakpoint reduces the content width, collapses the grids and newsletter form to one column, wraps header content, and constrains the hero/actions; no source-level horizontal-overflow risk was found.
- At 768px, the 1024px breakpoint provides two `minmax(0, 1fr)` course columns within the constrained content width; form and resource layouts retain usable inline space without overlap.
- At 1440px, the content cap is 1120px and the course grid uses three equal `minmax(0, 1fr)` columns.
- The light and dark token sets cover page ink, muted text, surfaces, borders, badge colors, and the shared visible focus treatment. Content, navigation links, and the newsletter form are available in the static HTML without JavaScript.
- Source order gives a skip link followed by header controls and main content; the mobile menu closes on Escape, and native buttons provide Enter/Space activation.
- The language control uses the Persian `englishSoon` toast. The newsletter handler focuses an invalid email and, for valid email, resets the form and announces the Persian demo message.

## Files

- `index.html`
- `script.js`
- `tests/smoke.ps1`
- `.superpowers/sdd/2026-08-12-dotnet-academy-implementation/task-4-report.md`

## Self-review

- The test assertions bind the accessibility requirements to the concrete, shipped elements rather than merely matching isolated attribute strings.
- The production rename and selector update are the smallest coordinated change needed for the new label/input contract.
- No dependencies, non-page scope, or unrelated refactoring were introduced.

## Concerns

- The in-app browser's URL policy blocked navigation to the local `file:` page, so a browser-rendered viewport screenshot was not available. The responsive review above is based on the shipped HTML/CSS/JS and automated checks; a final visual spot-check in a normal local browser remains advisable.
