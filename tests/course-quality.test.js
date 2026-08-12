const test=require('node:test');
const assert=require('node:assert/strict');
const content=require('../tools/course-content.js');
const fs=require('node:fs');
const path=require('node:path');

const required=['shortAnswer','mentalModel','deepDive','exampleExplanation','keyPoints','furtherDetails'];

test('all 30 questions have independent educational content',()=>{
  const entries=Object.entries(content);
  assert.equal(entries.length,30);
  for(const [slug,item] of entries){
    for(const field of required)assert.ok(item[field],`${slug}: ${field}`);
    assert.ok(item.mentalModel.length>=100,`${slug}: mental model is shallow`);
    assert.ok(item.deepDive.length>=180,`${slug}: deep dive is shallow`);
    assert.ok(item.exampleExplanation.length>=80,`${slug}: example is unexplained`);
    assert.equal(item.keyPoints.length,3,`${slug}: key points`);
    assert.equal(new Set(item.keyPoints).size,3,`${slug}: duplicate key points`);
    assert.notEqual(item.shortAnswer,item.mentalModel,`${slug}: repeated content`);
    assert.notEqual(item.mentalModel,item.deepDive,`${slug}: repeated content`);
  }
});

test('boilerplate is not reused across questions',()=>{
  for(const field of ['shortAnswer','mentalModel','deepDive','exampleExplanation','furtherDetails']){
    const values=Object.values(content).map(x=>x[field]);
    assert.equal(new Set(values).size,30,`${field} must be unique`);
  }
});

test('first question teaches assignment before memory placement',()=>{
  const first=content['value-vs-reference'];
  assert.match(first.mentalModel,/assign|انتساب/i);
  assert.match(first.deepDive,/a.*b|کپی مستقل/s);
  assert.match(first.exampleExplanation,/Person|object/);
  assert.match(first.furtherDetails,/Stack.*Heap|Heap.*Stack/s);
  assert.ok(first.furtherDetails.indexOf('Stack')>=0);
});

test('every generated page renders the rich teaching structure',()=>{
  const base=path.join(__dirname,'../courses/dotnet-senior/csharp');
  const pages=fs.readdirSync(base,{recursive:true}).filter(file=>file.endsWith('.html'));
  assert.equal(pages.length,30);
  for(const file of pages){
    const html=fs.readFileSync(path.join(base,file),'utf8');
    for(const marker of ['class="mental-model"','class="example-explanation"','class="further-details"']){
      assert.ok(html.includes(marker),`${file}: ${marker}`);
    }
  }
});
