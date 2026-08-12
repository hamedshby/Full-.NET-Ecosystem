const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const css=fs.readFileSync(path.join(__dirname,'../courses/dotnet-senior/course.css'),'utf8');
function rgb(hex){return hex.match(/[a-f\d]{2}/gi).map(x=>parseInt(x,16)/255)}
function lum(hex){const v=rgb(hex).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2]}
function ratio(a,b){const [hi,lo]=[lum(a),lum(b)].sort((x,y)=>y-x);return (hi+.05)/(lo+.05)}
test('course text and focus roles have accessible contrast in both themes',()=>{
  const pairs=[['#162033','#f6f8fc',4.5],['#08756e','#f6f8fc',3],['#edf3ff','#0c1324',4.5],['#64e0d2','#0c1324',3],['#12633e','#dff8ec',4.5],['#23498d','#e5edff',4.5],['#70298b','#f4e6ff',4.5]];
  for(const [fg,bg,min] of pairs){assert.ok(css.includes(fg)&&css.includes(bg));assert.ok(ratio(fg,bg)>=min,`${fg} on ${bg}: ${ratio(fg,bg)}`)}
});
