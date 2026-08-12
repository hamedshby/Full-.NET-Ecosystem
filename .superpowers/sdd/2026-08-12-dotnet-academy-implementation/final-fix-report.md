# Final fix report

## Scope

Addressed only the four final review findings:

1. dark-theme primary-button and newsletter contrast;
2. fail-closed newsletter behavior when JavaScript is unavailable;
3. consistent Persian custom email validation; and
4. progressive-enhancement gating for mobile navigation.

## Root causes

- Semantic brand/text tokens were reused as control backgrounds even though the dark-theme brand color is intentionally light.
- The demo newsletter was a native POST form, so its no-backend guarantee depended on the submit listener running.
- Native `required`/email validation could stop the `submit` event before the Persian validation handler ran.
- The mobile breakpoint hid navigation unconditionally instead of waiting for proof that JavaScript was available.

## RED evidence

Tests were changed before production code and then run against the prior implementation:

```text
node tests/contrast.test.js
```

Result: exit `1`; eight new theme-role checks failed because button, newsletter-copy, and newsletter-button contrast tokens were absent.

```text
node tests/progressive-enhancement.test.js
```

Result: exit `1`; all three tests failed. The newsletter button was still a native submitter, the early script did not set the enhancement class, and enhancement-gated mobile selectors were absent.

```text
node tests/newsletter.integration.test.js
```

Result: exit `1`; clicking the demo button did not reach the custom Persian invalid-email path.

```text
powershell -NoProfile -ExecutionPolicy Bypass -File tests/smoke.ps1
```

Result: exit `1` after changing the contract first; the enhancement-gated expanded-menu selector was absent.

## Implementation

- Added explicit light/dark role tokens for primary controls, newsletter gradient/copy, and the newsletter control, then connected the rendered selectors to those roles.
- Dark primary-button contrast is `5.89:1` normal and `8.40:1` hover. Dark newsletter white-copy contrast across its gradient stops is `8.82:1`, `7.64:1`, and `7.61:1`. Newsletter-button contrast is at least `15.97:1` in both themes.
- Removed the form `action`, `method`, and email `name`; added `novalidate`; changed the demo control to `type="button"`. No email value can be serialized when JavaScript is unavailable.
- Routed button click, Enter in the email field, and defensive form `submit` events through the same handler. Invalid input sets `aria-invalid`, focuses the email field, and announces the Persian error; valid input resets and announces the demo-only message.
- Added the early `html.js` availability marker before the stylesheet is requested, but gate the mobile disclosure styles on `html.js-ready`, which is added only after the menu handlers are installed. Missing/failed initialization therefore leaves links visible and the inert toggle hidden; ready navigation starts collapsed and expands from `aria-expanded`.
- Escape closes an expanded menu and restores focus to the toggle when focus was inside the navigation.

## Regression coverage

- `tests/contrast.test.js`: ten tests cover existing semantic colors, rendered token consumption, primary controls, newsletter copy, newsletter control states, and focus indicators in both themes.
- `tests/progressive-enhancement.test.js`: verifies the fail-closed form markup, executes the early enhancement script, and checks that only handler-ready state collapses mobile navigation.
- `tests/newsletter.integration.test.js`: executes the real application initializer against DOM fixtures and verifies handler readiness, Escape focus restoration, newsletter click/Enter handling, submit prevention, focus, ARIA state, reset, and Persian messages.
- `tests/smoke.ps1`: requires the enhancement-gated expanded-menu selector.

The rendered-token integration assertion also passed a mutation check: temporarily changing the primary control background back to `var(--brand)` made `node tests/contrast.test.js` fail at the expected selector contract; restoring the role token returned it to green.

## Rendered browser verification

At a `375x800` viewport, the live page reported no horizontal overflow; enhancement initialization completed; the menu control was visible; navigation was initially hidden, then became visible with `aria-expanded="true"` after activation. The form had no action, method, or named email control, and its button resolved to `type="button"`.

Entering `learner@` and pressing Enter kept the URL unchanged, focused the email field, set `aria-invalid="true"`, and announced `لطفاً یک نشانی ایمیل معتبر وارد کنید.`. Activating the button with `learner@example.com` kept the URL unchanged, cleared the field/invalid state, and announced that no data is stored.

At `1440x1000`, the rendered page had three cards in its first row and no horizontal overflow. Dark mode resolved primary controls to white on `rgb(46, 98, 185)`, newsletter copy to white across the new dark gradient, and the newsletter control to white on `rgb(20, 33, 61)`. No browser console errors were recorded.

## Independent review follow-up

The first read-only review found two readiness/focus edge cases. Regression tests were added before each fix:

- `node tests/progressive-enhancement.test.js` failed because `.js` collapsed navigation before the external script installed handlers. After introducing the handler-ready gate, the suite passed all three tests.
- `node tests/newsletter.integration.test.js` then failed because Escape closed navigation without restoring focus. After capturing whether focus is inside an expanded navigation and returning it to the toggle, the integration suite passed.

The follow-up read-only review reported no remaining Critical or Important issues and a ready-to-merge verdict.

## Final verification

All commands exited `0` after the review fixes:

```text
node --check script.js
node --check tests/interactions.test.js
node --check tests/contrast.test.js
node --check tests/progressive-enhancement.test.js
node --check tests/newsletter.integration.test.js
node tests/interactions.test.js
node tests/contrast.test.js                 # 10/10 pass
node tests/progressive-enhancement.test.js  # 3/3 pass
node tests/newsletter.integration.test.js
powershell -NoProfile -ExecutionPolicy Bypass -File tests/smoke.ps1
git diff --check
```

## Files

- `index.html`
- `script.js`
- `styles.css`
- `tests/contrast.test.js`
- `tests/newsletter.integration.test.js`
- `tests/progressive-enhancement.test.js`
- `tests/smoke.ps1`
- `.superpowers/sdd/2026-08-12-dotnet-academy-implementation/final-fix-report.md`

## Concerns

- The `AGENTS.md` instruction references `RTK.md`, but no `RTK.md` was present under `D:\Plan`; the supplied final-fix requirements were therefore treated as authoritative.
