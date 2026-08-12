const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.join(__dirname,'..');
const css=fs.readFileSync(path.join(root,'courses/dotnet-senior/course.css'),'utf8');
const courseRoot=path.join(root,'courses/dotnet-senior/csharp');
const pages=fs.readdirSync(courseRoot,{recursive:true}).filter(file=>file.endsWith('.html'));
const levels=['مقدماتی','متوسط','ارشد'];

function luminance(hex){
  const channels=hex.match(/[a-f\d]{2}/gi).map(value=>parseInt(value,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4);
  return .2126*channels[0]+.7152*channels[1]+.0722*channels[2];
}

function contrast(a,b){
  const values=[luminance(a),luminance(b)].sort((x,y)=>y-x);
  return (values[0]+.05)/(values[1]+.05);
}

function tokenValues(name){
  return [...css.matchAll(new RegExp(`--${name}:(#[a-f\\d]{6})`,'gi'))].map(match=>match[1]);
}

test('every sidebar question exposes its difficulty as a badge',()=>{
  for(const file of pages){
    const html=fs.readFileSync(path.join(courseRoot,file),'utf8');
    const badges=[...html.matchAll(/<small data-level="([^"]+)">/g)].map(match=>match[1]);
    assert.equal(badges.length,30,`${file}: sidebar badge count`);
    assert.deepEqual([...new Set(badges)].sort(),[...levels].sort(),`${file}: difficulty variants`);
  }
});

test('difficulty badges use three distinct accessible palettes in both themes',()=>{
  const backgrounds=[];
  for(const level of ['beginner','intermediate','senior']){
    const text=tokenValues(`level-${level}-text`);
    const start=tokenValues(`level-${level}-bg-start`);
    const end=tokenValues(`level-${level}-bg-end`);
    assert.equal(text.length,2,`${level}: light and dark text tokens`);
    assert.equal(start.length,2,`${level}: light and dark gradient starts`);
    assert.equal(end.length,2,`${level}: light and dark gradient ends`);
    for(let theme=0;theme<2;theme++){
      assert.ok(contrast(text[theme],start[theme])>=4.5,`${level} text on gradient start`);
      assert.ok(contrast(text[theme],end[theme])>=4.5,`${level} text on gradient end`);
      backgrounds.push(`${start[theme]}-${end[theme]}`);
    }
  }
  assert.equal(new Set(backgrounds).size,6,'each level and theme needs a distinct palette');
});
