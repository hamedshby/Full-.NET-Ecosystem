const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

function openingTag(tagName, id) {
  const tag = html.match(new RegExp(`<${tagName}\\b(?=[^>]*\\bid="${id}")[^>]*>`, 'i'));
  assert.ok(tag, `Missing ${tagName}#${id}`);
  return tag[0];
}

function declarationsFor(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const block = styles.match(new RegExp(`(?:^|})\\s*${escaped}\\s*\\{([^}]*)\\}`, 'm'));
  assert.ok(block, `Missing CSS rule for ${selector}`);
  return block[1];
}

test('newsletter demo is structurally incapable of transmitting the email without JavaScript', () => {
  const form = openingTag('form', 'newsletter-form');
  const input = openingTag('input', 'newsletter-email');
  const button = openingTag('button', 'newsletter-submit');

  assert.doesNotMatch(form, /\s(?:action|method)\s*=/i, 'The demo form must not declare a submission destination or method.');
  assert.match(form, /\snovalidate(?:\s|>)/i, 'The form must route validation through the Persian custom handler.');
  assert.doesNotMatch(input, /\sname\s*=/i, 'The demo email field must not be a successful form control when scripts are unavailable.');
  assert.match(input, /\stype="email"/i, 'The email field must retain its semantic input type.');
  assert.match(input, /\srequired(?:\s|>)/i, 'The email field must continue to expose its required state.');
  assert.match(button, /\stype="button"/i, 'The demo control must not be a native submit button.');
});

test('the early script marks JavaScript availability without declaring navigation ready', () => {
  const head = html.match(/<head>([\s\S]*?)<\/head>/i);
  assert.ok(head, 'Missing document head.');
  const inlineScript = head[1].match(/<script>([\s\S]*?)<\/script>/i);
  const stylesheetPosition = head[1].search(/<link\b[^>]*rel="stylesheet"/i);
  assert.ok(inlineScript, 'Missing early enhancement script.');
  assert.ok(head[1].indexOf(inlineScript[0]) < stylesheetPosition, 'Enhancement script must run before the stylesheet is requested.');

  const classes = new Set();
  const root = { classList: { add: (name) => classes.add(name) }, dataset: {} };
  vm.runInNewContext(inlineScript[1], {
    document: { documentElement: root },
    localStorage: { getItem: () => null },
    window: { matchMedia: () => ({ matches: false }) }
  });

  assert.ok(classes.has('js'), 'The early script must mark JavaScript availability before CSS applies.');
});

test('mobile navigation is visible by default and collapses only after handlers are ready', () => {
  assert.match(declarationsFor('.nav-links, .nav-actions'), /\bdisplay:\s*flex\b/, 'Base navigation must remain visible.');
  assert.doesNotMatch(declarationsFor('.nav-links'), /\bdisplay:\s*none\b/, 'The no-JavaScript mobile navigation must remain visible.');
  assert.doesNotMatch(styles, /(?:^|})\s*\.js\s+\.nav-links\s*\{[^}]*\bdisplay:\s*none\b/, 'The early availability marker must not collapse navigation before handlers are ready.');
  assert.match(declarationsFor('.js-ready .menu-toggle'), /\bdisplay:\s*inline-flex\b/, 'The menu control must appear only after its handlers are ready.');
  assert.match(declarationsFor('.js-ready .nav-links'), /\bdisplay:\s*none\b/, 'Ready mobile navigation must start collapsed.');
  assert.match(declarationsFor('.js-ready #menu-toggle[aria-expanded="true"] + .nav-links'), /\bdisplay:\s*flex\b/, 'The expanded ready menu must reveal its links.');
});
