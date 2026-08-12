const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const styles = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

function tokensFor(selector) {
  const block = styles.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\}`));
  assert.ok(block, `Missing ${selector} token block`);

  return Object.fromEntries([...block[1].matchAll(/--([\w-]+):\s*(#[\da-f]{6})/gi)].map(([, name, value]) => [name, value]));
}

function rgb(hex) {
  return hex.match(/[\da-f]{2}/gi).map((channel) => Number.parseInt(channel, 16));
}

function luminance(hex) {
  const channels = rgb(hex).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function mix(foreground, background, amount) {
  const fore = rgb(foreground);
  const back = rgb(background);
  return `#${fore.map((channel, index) => Math.round(channel * amount + back[index] * (1 - amount)).toString(16).padStart(2, '0')).join('')}`;
}

function focusOutlineFor(selector) {
  const block = styles.match(new RegExp(`${selector}\\s*\\{([\\s\\S]*?)\\}`));
  assert.ok(block, `Missing ${selector} focus treatment`);

  const outline = block[1].match(/outline:\s*\d+px\s+solid\s+(#[\da-f]{6})/i);
  assert.ok(outline, `${selector} must provide a solid hex focus outline`);
  return outline[1];
}

function declarationsFor(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const block = styles.match(new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`));
  assert.ok(block, `Missing CSS rule for ${selector}`);
  return block[1];
}

const light = tokensFor(':root');
const dark = tokensFor('\\[data-theme="dark"\\]');
const newsletterFocus = focusOutlineFor('#newsletter\\s+:focus-visible');
const darkNewsletterFocus = focusOutlineFor('\\[data-theme="dark"\\]\\s+#newsletter\\s+:focus-visible');

function requiredToken(theme, name, description) {
  assert.match(theme[name] || '', /^#[\da-f]{6}$/i, `${description} must use an explicit six-digit color token.`);
  return theme[name];
}

function assertTextContrast(foreground, background, description) {
  const ratio = contrast(foreground, background);
  assert.ok(ratio >= 4.5, `${description} must reach 4.5:1; received ${ratio.toFixed(2)}:1.`);
}

test('existing semantic text and focus colors retain their contrast', () => {
  assert.ok(contrast(light.aqua, light.surface) >= 4.5, 'Light-theme eyebrow text must reach 4.5:1 on its light surface.');
  assert.ok(contrast(light.aqua, light.canvas) >= 3, 'Light-theme focus outline must reach 3:1 against the canvas.');
  assert.ok(contrast(light.gold, mix(light.gold, light.surface, 0.16)) >= 4.5, 'Light-theme soon badge text must reach 4.5:1 against its tinted surface.');
  assert.ok(contrast(dark.aqua, dark.surface) >= 4.5, 'Dark-theme aqua text must remain readable on the surface.');
  assert.ok(contrast(dark.gold, mix(dark.gold, dark.surface, 0.16)) >= 4.5, 'Dark-theme soon badge text must remain readable against its tinted surface.');
});

test('rendered controls and newsletter consume the tested contrast-role tokens', () => {
  const primary = declarationsFor('.button-link, #newsletter-form button, .course-card button, #resources > button');
  const primaryHover = declarationsFor('.button-link:hover, #newsletter-form button:hover, .course-card button:hover, #resources > button:hover');
  const newsletter = declarationsFor('#newsletter');
  const newsletterMutedCopy = declarationsFor('#newsletter .eyebrow, #newsletter .section-heading p:last-child');
  const newsletterButton = declarationsFor('#newsletter-form button');
  const newsletterButtonHover = declarationsFor('#newsletter-form button:hover');

  assert.match(primary, /background:\s*var\(--button-background\)/);
  assert.match(primary, /color:\s*var\(--button-text\)/);
  assert.match(primaryHover, /background:\s*var\(--button-hover\)/);
  assert.match(newsletter, /linear-gradient\([^;]*var\(--newsletter-start\)[^;]*var\(--newsletter-middle\)[^;]*var\(--newsletter-end\)/);
  assert.match(newsletter, /color:\s*var\(--newsletter-text\)/);
  assert.match(newsletterMutedCopy, /color:\s*var\(--newsletter-text\)/);
  assert.match(newsletterButton, /background:\s*var\(--newsletter-button-background\)/);
  assert.match(newsletterButton, /color:\s*var\(--newsletter-button-text\)/);
  assert.match(newsletterButtonHover, /background:\s*var\(--newsletter-button-hover\)/);
});

for (const [themeName, theme] of [['Light', light], ['Dark', dark]]) {
  test(`${themeName.toLowerCase()} primary buttons meet text contrast in normal and hover states`, () => {
    const foreground = requiredToken(theme, 'button-text', `${themeName} primary-button text`);
    for (const state of ['button-background', 'button-hover']) {
      const background = requiredToken(theme, state, `${themeName} primary-button ${state}`);
      assertTextContrast(foreground, background, `${themeName} primary-button ${state}`);
    }
  });

  test(`${themeName.toLowerCase()} newsletter copy meets text contrast across the complete gradient`, () => {
    const foreground = requiredToken(theme, 'newsletter-text', `${themeName} newsletter text`);
    for (const stop of ['newsletter-start', 'newsletter-middle', 'newsletter-end']) {
      const background = requiredToken(theme, stop, `${themeName} ${stop}`);
      assertTextContrast(foreground, background, `${themeName} newsletter text on ${stop}`);
    }
  });

  test(`${themeName.toLowerCase()} newsletter button meets text contrast in normal and hover states`, () => {
    const foreground = requiredToken(theme, 'newsletter-button-text', `${themeName} newsletter-button text`);
    for (const state of ['newsletter-button-background', 'newsletter-button-hover']) {
      const background = requiredToken(theme, state, `${themeName} newsletter-button ${state}`);
      assertTextContrast(foreground, background, `${themeName} newsletter-button ${state}`);
    }
  });

  test(`${themeName.toLowerCase()} newsletter focus indicator contrasts with every gradient stop`, () => {
    const outline = themeName === 'Light' ? newsletterFocus : darkNewsletterFocus;
    for (const stop of ['newsletter-start', 'newsletter-middle', 'newsletter-end']) {
      const background = requiredToken(theme, stop, `${themeName} ${stop}`);
      const ratio = contrast(outline, background);
      assert.ok(ratio >= 3, `${themeName} newsletter focus outline on ${stop} must reach 3:1; received ${ratio.toFixed(2)}:1.`);
    }
  });
}
