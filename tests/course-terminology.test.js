const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const forbidden=['نوع مقداری','نوع‌های مقداری','نوع ارجاعی','جعبه‌سازی','جعبه‌گشایی','چندریختی زمان اجرا','سربارگذاری','بازنویسی متد','پنهان‌سازی متد','برابری مقداری','نوع ناشناس','انواع ناشناس','استنتاج نوع ایستا','شی‌گرایی','هم‌وردایی','پادوردایی','ناوردایی','مجموعهٔ هم‌زمان','مجموعهٔ تغییرناپذیر','زباله‌روب','پشتهٔ مدیریت‌شده'];

test('project permanently loads terminology and inline-execution rules',()=>{
  assert.match(read('AGENTS.md'),/@RTK\.md/);
  const rules=read('RTK.md');
  for(const phrase of ['اصطلاحات رسمی .NET و C# ترجمه نمی‌شوند','Value Type','Reference Type','Boxing','Unboxing','Runtime Polymorphism','Generic','Collection','اجرا در همین جلسه']) assert.ok(rules.includes(phrase),phrase);
});

test('course source and generated pages never substitute Persian translations for official terms',()=>{
  const base=path.join(root,'courses/dotnet-senior/csharp');
  const pages=fs.readdirSync(base,{recursive:true}).filter(x=>x.endsWith('.html')).map(x=>path.join(base,x));
  const files=[path.join(root,'tools/generate-course.js'),path.join(root,'tools/course-content.js'),...pages];
  const violations=[];
  for(const file of files){const text=fs.readFileSync(file,'utf8');for(const term of forbidden)if(text.includes(term))violations.push(`${path.relative(root,file)}: ${term}`)}
  assert.deepEqual(violations,[]);
});

test('canonical terms remain present in relevant pages',()=>{
  const checks={
    'courses/dotnet-senior/csharp/types/value-vs-reference.html':['Value Type','Reference Type'],
    'courses/dotnet-senior/csharp/types/boxing-unboxing.html':['Boxing','Unboxing'],
    'courses/dotnet-senior/csharp/oop/runtime-polymorphism.html':['Runtime Polymorphism'],
    'courses/dotnet-senior/csharp/generics/variance.html':['Covariance','Contravariance'],
    'courses/dotnet-senior/csharp/collections/concurrent-immutable.html':['Concurrent Collection','Immutable Collection']
  };
  for(const [file,terms] of Object.entries(checks)){const text=read(file);for(const term of terms)assert.ok(text.includes(term),`${file}: ${term}`)}
});
