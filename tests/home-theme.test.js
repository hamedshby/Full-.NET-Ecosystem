const assert = require('node:assert/strict');
const {
  normalizeHomeTheme,
  nextHomeTheme,
  homeThemeControlCopy
} = require('../home-theme.js');

assert.equal(normalizeHomeTheme('modern'), 'modern', 'the saved modern theme must be restored');
assert.equal(normalizeHomeTheme('classic'), 'classic', 'the saved classic theme must be restored');
assert.equal(normalizeHomeTheme('unknown'), 'modern', 'an invalid saved value must fall back to the new theme');
assert.equal(normalizeHomeTheme(null), 'modern', 'first-time visitors must see the new theme');

assert.equal(nextHomeTheme('modern'), 'classic', 'the theme control must return to the untouched classic theme');
assert.equal(nextHomeTheme('classic'), 'modern', 'the theme control must reactivate the new theme');

assert.deepEqual(homeThemeControlCopy('modern'), {
  label: 'نمای کلاسیک',
  assistiveLabel: 'فعال‌کردن تم کلاسیک صفحهٔ اصلی'
});
assert.deepEqual(homeThemeControlCopy('classic'), {
  label: 'پنل آبی',
  assistiveLabel: 'فعال‌کردن تم پنل آبی صفحهٔ اصلی'
});

console.log('Home theme behavior tests passed.');
