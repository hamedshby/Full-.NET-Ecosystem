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

## Review round 1: light-theme contrast

### RED/GREEN evidence

Added `tests/contrast.test.js`, which reads the shipped CSS token blocks and calculates WCAG relative luminance/contrast for the actual rendered color relationships: aqua eyebrow text on the light surface, aqua focus outline against the light canvas, and `status-soon` gold text over its 16% gold-tinted card surface. It also keeps dark-theme aqua and gold relationships covered.

RED command:

```text
node tests/contrast.test.js
```

The command exited `1` at the expected assertion: `Light-theme eyebrow text must reach 4.5:1 on its light surface.` The pre-fix values were 2.92:1 for aqua on white, 2.77:1 for aqua against the canvas, and 2.40:1 for gold on its tinted badge.

Changed only the light-theme tokens:

- `--aqua`: `#00a9a2` to `#05746f`
- `--gold`: `#d88900` to `#955200`

GREEN command:

```text
node tests/contrast.test.js
```

The command exited `0` and printed `Color contrast checks passed.` The resulting light-theme values are 5.62:1 (aqua on white), 5.34:1 (aqua against canvas), and 4.76:1 (gold against its tinted badge). Existing dark tokens remain readable at 10.08:1 for aqua on its surface and 7.30:1 for gold against its tinted badge.

### Round 1 verification

All commands exited `0`:

```text
node --check script.js
node --check tests/contrast.test.js
node tests/interactions.test.js
node tests/contrast.test.js
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
git diff --check
```

### Round 1 files

- `styles.css`
- `tests/contrast.test.js`
- `.superpowers/sdd/2026-08-12-dotnet-academy-implementation/task-4-report.md`

## Review round 2: newsletter focus contrast

### RED/GREEN evidence

Extended `tests/contrast.test.js` to read the actual `#newsletter :focus-visible` outline and calculate it against every newsletter gradient stop: `#1458d4`, `#266fd3`, and the light aqua token `#05746f`. Each relationship must meet the 3:1 non-text focus-indicator threshold.

RED command:

```text
node tests/contrast.test.js
```

The command exited `1` with `Missing #newsletter\s+:focus-visible focus treatment`, proving the shared aqua outline had no newsletter-context override.

Added only this contextual rule:

```css
#newsletter :focus-visible { outline: 3px solid #ffffff; }
```

GREEN command:

```text
node tests/contrast.test.js
```

The command exited `0` and printed `Color contrast checks passed.` White focus contrast is 6.22:1 against `#1458d4`, 4.89:1 against `#266fd3`, and 5.62:1 against `#05746f`; each is above 3:1.

### Round 2 verification

All commands exited `0`:

```text
node --check script.js
node --check tests/contrast.test.js
node tests/interactions.test.js
node tests/contrast.test.js
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
git diff --check
```

### Round 2 files

- `styles.css`
- `tests/contrast.test.js`
- `.superpowers/sdd/2026-08-12-dotnet-academy-implementation/task-4-report.md`

## Review round 3: dark newsletter focus contrast

### RED/GREEN evidence

Extended `tests/contrast.test.js` to require an explicit dark-theme newsletter focus outline and calculate it against the real dark gradient stops: dark `--brand` (`#75a9ff`), the fixed middle stop (`#266fd3`), and dark `--aqua` (`#5cddd4`). Each must reach the 3:1 focus-indicator threshold.

RED command:

```text
node tests/contrast.test.js
```

The command exited `1` with `Missing \[data-theme="dark"\]\s+#newsletter\s+:focus-visible focus treatment`, demonstrating that the light-only white focus outline did not adapt for dark tokens.

Added only this dark-theme override while retaining the white outline for light theme:

```css
[data-theme="dark"] #newsletter :focus-visible { outline: 3px solid #0b1223; }
```

GREEN command:

```text
node tests/contrast.test.js
```

The command exited `0` and printed `Color contrast checks passed.` The deep-navy outline reaches 7.89:1 against `#75a9ff`, 3.82:1 against `#266fd3`, and 11.33:1 against `#5cddd4`.

### Round 3 verification

All commands exited `0`:

```text
node --check script.js
node --check tests/contrast.test.js
node tests/interactions.test.js
node tests/contrast.test.js
powershell -ExecutionPolicy Bypass -File tests/smoke.ps1
git diff --check
```

### Round 3 files

- `styles.css`
- `tests/contrast.test.js`
- `.superpowers/sdd/2026-08-12-dotnet-academy-implementation/task-4-report.md`
