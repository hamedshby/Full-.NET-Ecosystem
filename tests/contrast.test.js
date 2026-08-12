const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

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

const light = tokensFor(':root');
const dark = tokensFor('\\[data-theme="dark"\\]');
const newsletterFocus = focusOutlineFor('#newsletter\\s+:focus-visible');

assert.ok(contrast(light.aqua, light.surface) >= 4.5, 'Light-theme eyebrow text must reach 4.5:1 on its light surface.');
assert.ok(contrast(light.aqua, light.canvas) >= 3, 'Light-theme focus outline must reach 3:1 against the canvas.');
assert.ok(contrast(light.gold, mix(light.gold, light.surface, 0.16)) >= 4.5, 'Light-theme soon badge text must reach 4.5:1 against its tinted surface.');
assert.ok(contrast(dark.aqua, dark.surface) >= 4.5, 'Dark-theme aqua text must remain readable on the surface.');
assert.ok(contrast(dark.gold, mix(dark.gold, dark.surface, 0.16)) >= 4.5, 'Dark-theme soon badge text must remain readable against its tinted surface.');
for (const gradientStop of [light.brand, '#266fd3', light.aqua]) {
  assert.ok(contrast(newsletterFocus, gradientStop) >= 3, `Newsletter focus outline must reach 3:1 against gradient stop ${gradientStop}.`);
}

console.log('Color contrast checks passed.');
