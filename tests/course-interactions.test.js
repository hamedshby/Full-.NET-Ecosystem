const test=require('node:test'),assert=require('node:assert/strict');
const {normalizeTheme,copyFallbackText,messages}=require('../courses/dotnet-senior/course.js');
test('course helpers are safe and deterministic',()=>{assert.equal(normalizeTheme('dark',false),'dark');assert.equal(normalizeTheme(null,true),'dark');assert.equal(normalizeTheme('bad',false),'light');assert.equal(copyFallbackText('  code  '),'code');assert.ok(messages.fa.copied);assert.ok(messages.fa.manual)});
