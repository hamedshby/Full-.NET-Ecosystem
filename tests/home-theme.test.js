const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {
  normalizeHomeTheme,
  nextHomeTheme,
  homeThemeControlCopy
} = require('../home-theme.js');

assert.equal(normalizeHomeTheme('modern'), 'modern', 'the saved modern theme must be restored');
assert.equal(normalizeHomeTheme('classic'), 'classic', 'the saved classic theme must be restored');
assert.equal(normalizeHomeTheme('unknown'), 'modern', 'an invalid saved value must fall back to the new theme');
assert.equal(normalizeHomeTheme(null), 'modern', 'first-time visitors must see the new theme');

assert.equal(nextHomeTheme('modern'), 'classic', 'the theme control must switch to the classic presentation');
assert.equal(nextHomeTheme('classic'), 'modern', 'the theme control must reactivate the new theme');

assert.deepEqual(homeThemeControlCopy('modern'), {
  label: 'نمای کلاسیک',
  assistiveLabel: 'فعال‌کردن تم کلاسیک صفحهٔ اصلی'
});
assert.deepEqual(homeThemeControlCopy('classic'), {
  label: 'پنل آبی',
  assistiveLabel: 'فعال‌کردن تم پنل آبی صفحهٔ اصلی'
});

const themeCss = fs.readFileSync(path.join(__dirname, '..', 'home-theme.css'), 'utf8');
assert.match(themeCss, /\[data-home-theme="classic"\] \.site-header\s*\{[\s\S]*?border-radius:\s*1\.4rem;/, 'classic navigation must use the framed panel composition');
assert.match(themeCss, /\[data-home-theme="classic"\] \.hero\s*\{[\s\S]*?width:\s*var\(--content\);[\s\S]*?border-radius:\s*2rem;/, 'classic hero must use the same contained panel composition');
assert.match(themeCss, /\[data-home-theme="classic"\] \.hero-visual\s*\{[\s\S]*?border-radius:\s*1\.75rem;/, 'classic artwork must be framed inside the hero panel');
assert.match(themeCss, /@media \(max-width: 860px\)[\s\S]*?\[data-home-theme="classic"\] \.hero\s*\{[\s\S]*?border-radius:\s*1\.4rem;/, 'classic panel composition must adapt on small screens');

console.log('Home theme behavior tests passed.');
