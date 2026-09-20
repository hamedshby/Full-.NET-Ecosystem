const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { availableLessons } = require('../courses/microservices/course-navigation.js');

const lessonsRoot = path.join(__dirname, '..', 'courses', 'microservices', 'lessons');

test('every available Microservices lesson is generated as a standalone accessible page', () => {
  const pages = fs.existsSync(lessonsRoot)
    ? fs.readdirSync(lessonsRoot).filter(file => file.endsWith('.html'))
    : [];
  assert.equal(pages.length, 28);

  for (const lesson of availableLessons) {
    const html = fs.readFileSync(path.join(lessonsRoot, `${lesson.id}.html`), 'utf8');
    assert.match(html, /<html lang="fa" dir="rtl">/);
    assert.match(html, /<meta\s+name="description"\s+content="[^"]{30,}"/);
    assert.match(html, /<a class="skip-link" href="#lesson-content">/);
    assert.match(html, new RegExp(`<aside id="course-sidebar" class="course-sidebar"[^>]+data-current-lesson="${lesson.id}"`));
    assert.match(html, /<main id="lesson-content" class="lesson-content">/);
    assert.match(html, /<div class="lesson-body">[\s\S]+<\/div>/);
    assert.match(html, /<nav class="lesson-pager"/);
    assert.doesNotMatch(html, /\.\.\/\.\.\/\.\.\/MicroService/);
  }
});

test('JWT chapter covers fundamentals, ASP.NET Core implementation, refresh lifecycle, and production security', () => {
  const expectations = {
    'ch17-1.html': ['Header', 'Payload', 'Signature', 'Access Token', 'Claim', 'Signed', 'Encrypted'],
    'ch17-2.html': ['AddAuthentication', 'AddJwtBearer', 'TokenValidationParameters', 'JwtSecurityTokenHandler', '[Authorize]', 'ClaimsPrincipal'],
    'ch17-3.html': ['Refresh Token', 'Rotation', 'Reuse Detection', 'Revocation', 'Hash', 'Logout'],
    'ch17-4.html': ['Secret Manager', 'Key Vault', 'HMAC', 'RSA', 'ClockSkew', 'XSS', 'CSRF', 'Integration Test']
  };

  for (const [file, requiredTerms] of Object.entries(expectations)) {
    const html = fs.readFileSync(path.join(lessonsRoot, file), 'utf8');
    for (const term of requiredTerms) {
      assert.ok(html.includes(term), `${file} should include ${term}`);
    }
  }
});

test('generated lesson pager only links between available lessons', () => {
  const availableIds = new Set(availableLessons.map(lesson => lesson.id));
  for (const lesson of availableLessons) {
    const html = fs.readFileSync(path.join(lessonsRoot, `${lesson.id}.html`), 'utf8');
    const pager = html.match(/<nav class="lesson-pager"[\s\S]*?<\/nav>/)?.[0] || '';
    for (const href of [...pager.matchAll(/href="([^"]+\.html)"/g)].map(match => match[1])) {
      if (href === '../../../index.html') continue;
      assert.ok(availableIds.has(path.basename(href, '.html')), `${lesson.id} -> ${href}`);
    }
  }
});
