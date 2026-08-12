const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {themeButtonState}=require('../courses/dotnet-senior/course.js');

test('theme icon announces the action that clicking will perform',()=>{
  assert.deepEqual(themeButtonState('light'),{
    pressed:'false',
    label:'فعال‌کردن تم تیره',
    title:'فعال‌کردن تم تیره'
  });
  assert.deepEqual(themeButtonState('dark'),{
    pressed:'true',
    label:'فعال‌کردن تم روشن',
    title:'فعال‌کردن تم روشن'
  });
});

test('generated course pages use an icon-only theme control',()=>{
  const page=fs.readFileSync(path.join(__dirname,'../courses/dotnet-senior/csharp/types/value-vs-reference.html'),'utf8');
  const button=page.match(/<button id="theme-toggle"[\s\S]*?<\/button>/)?.[0]||'';
  assert.ok(button.includes('aria-label="فعال‌کردن تم تیره"'));
  assert.equal((button.match(/<svg/g)||[]).length,2);
  assert.ok(button.includes('theme-icon-sun'));
  assert.ok(button.includes('theme-icon-moon'));
  assert.ok(!button.includes('>تغییر پوسته<'));
});
