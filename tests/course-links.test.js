const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
test('all local course links resolve and landing opens first question', () => {
  const landing = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.ok(landing.includes('courses/dotnet-senior/csharp/types/value-vs-reference.html'));
  const base = path.join(root, 'courses', 'dotnet-senior', 'csharp');
  const files = fs.readdirSync(base, {recursive:true}).filter(x=>x.endsWith('.html')).map(x=>path.join(base,x));
  for (const file of files) {
    const html=fs.readFileSync(file,'utf8');
    const hrefs=[...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]).filter(h=>!h.startsWith('#'));
    for(const href of hrefs){ const target=path.resolve(path.dirname(file),href.split('#')[0]); assert.ok(fs.existsSync(target),`${file} -> ${href}`); }
    assert.equal((html.match(/data-question-link/g)||[]).length,30,file);
  }
});
