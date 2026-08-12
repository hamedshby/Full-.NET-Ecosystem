const assert = require('node:assert/strict');
const path = require('node:path');

class FakeElement {
  constructor(attributes = {}) {
    this.attributes = new Map(Object.entries(attributes));
    this.listeners = new Map();
    this.textContent = '';
    this.value = '';
    this.focused = false;
    this.resetCount = 0;
    this.descendants = new Set();
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  emit(type, details = {}) {
    const event = {
      defaultPrevented: false,
      key: details.key,
      target: details.target || this,
      preventDefault() { this.defaultPrevented = true; }
    };
    for (const listener of this.listeners.get(type) || []) {
      listener(event);
    }
    return event;
  }

  getAttribute(name) { return this.attributes.get(name) ?? null; }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  removeAttribute(name) { this.attributes.delete(name); }
  focus() {
    this.focused = true;
    global.document.activeElement = this;
  }
  reset() { this.resetCount += 1; }
  closest() { return null; }
  contains(element) { return this.descendants.has(element); }
}

function loadApp() {
  const elements = new Map([
    ['theme-toggle', new FakeElement({ 'aria-pressed': 'false' })],
    ['menu-toggle', new FakeElement({ 'aria-expanded': 'false' })],
    ['primary-navigation', new FakeElement()],
    ['language-toggle', new FakeElement()],
    ['toast', new FakeElement()],
    ['newsletter-form', new FakeElement()],
    ['newsletter-email', new FakeElement()],
    ['newsletter-submit', new FakeElement()]
  ]);
  const documentListeners = new Map();
  const rootClasses = new Set();
  const root = { dataset: {}, classList: { add: (name) => rootClasses.add(name) } };

  global.document = {
    documentElement: root,
    addEventListener(type, listener) { documentListeners.set(type, listener); },
    getElementById(id) { return elements.get(id) || null; },
    querySelectorAll() { return []; }
  };
  global.window = {
    matchMedia: () => ({ matches: false }),
    localStorage: { getItem: () => null, setItem() {} },
    clearTimeout() {},
    setTimeout: () => 1
  };

  const scriptPath = path.join(__dirname, '..', 'script.js');
  delete require.cache[require.resolve(scriptPath)];
  const app = require(scriptPath);
  assert.equal(typeof documentListeners.get('DOMContentLoaded'), 'function', 'The application must register its initializer.');
  documentListeners.get('DOMContentLoaded')();
  return { app, documentListeners, elements, rootClasses };
}

try {
  const { app, documentListeners, elements, rootClasses } = loadApp();
  const form = elements.get('newsletter-form');
  const input = elements.get('newsletter-email');
  const button = elements.get('newsletter-submit');
  const toast = elements.get('toast');

  assert.ok(rootClasses.has('js-ready'), 'Initialization must declare navigation ready only after its event handlers are installed.');

  const navigation = elements.get('primary-navigation');
  const menuToggle = elements.get('menu-toggle');
  const navigationLink = new FakeElement();
  navigation.descendants.add(navigationLink);
  document.activeElement = navigationLink;
  menuToggle.setAttribute('aria-expanded', 'true');
  documentListeners.get('keydown')({ key: 'Escape' });
  assert.equal(menuToggle.getAttribute('aria-expanded'), 'false', 'Escape must close an expanded mobile menu.');
  assert.equal(document.activeElement, menuToggle, 'Escape from within navigation must restore focus to the menu toggle.');

  button.emit('click');
  assert.equal(input.getAttribute('aria-invalid'), 'true', 'Clicking the demo button with invalid input must use custom validation.');
  assert.equal(input.focused, true, 'Custom validation must focus the invalid email field.');
  assert.equal(toast.textContent, app.messages.fa.invalidEmail, 'Custom validation must announce the Persian invalid-email message.');

  input.focused = false;
  input.value = 'learner@example.com';
  button.emit('click');
  assert.equal(input.getAttribute('aria-invalid'), null, 'A valid email must clear the invalid state.');
  assert.equal(form.resetCount, 1, 'A valid demo interaction must reset the form exactly once.');
  assert.equal(toast.textContent, app.messages.fa.newsletterDemo, 'A valid demo interaction must announce that no data is stored.');

  input.value = 'learner@';
  const enter = input.emit('keydown', { key: 'Enter' });
  assert.equal(enter.defaultPrevented, true, 'Enter in the email field must not trigger native submission.');
  assert.equal(toast.textContent, app.messages.fa.invalidEmail, 'Enter must use the same Persian custom validation path.');

  const submit = form.emit('submit');
  assert.equal(submit.defaultPrevented, true, 'Any programmatic submit event must remain fail-closed.');

  console.log('Newsletter integration tests passed.');
} finally {
  delete global.document;
  delete global.window;
}
