const assert = require('node:assert/strict');
const { normalizeTheme, isValidEmail, messages } = require('../script.js');

assert.equal(normalizeTheme('dark', false), 'dark', 'stored dark must remain dark');
assert.equal(normalizeTheme('light', true), 'light', 'stored light must override a dark system preference');
assert.equal(normalizeTheme('unexpected', true), 'dark', 'invalid stored themes must use a dark system preference');
assert.equal(normalizeTheme(null, false), 'light', 'missing stored themes must use a light system preference');

assert.equal(isValidEmail('learner@example.com'), true, 'a complete email address must be valid');
assert.equal(isValidEmail('learner@'), false, 'an email without a domain must be invalid');
assert.equal(isValidEmail(''), false, 'an empty email must be invalid');

for (const key of ['englishSoon', 'courseSoon', 'resourceSoon', 'invalidEmail', 'newsletterDemo']) {
  assert.equal(typeof messages.fa[key], 'string', `${key} must be a Persian message`);
  assert.ok(messages.fa[key].trim().length > 0, `${key} must not be empty`);
}

console.log('Interaction helper tests passed.');
