const HOME_THEME_STORAGE_KEY = 'dotnet-academy-home-theme';

function normalizeHomeTheme(value) {
  return value === 'classic' || value === 'modern' ? value : 'modern';
}

function nextHomeTheme(theme) {
  return theme === 'modern' ? 'classic' : 'modern';
}

function homeThemeControlCopy(activeTheme) {
  return activeTheme === 'modern'
    ? {
        label: 'نمای کلاسیک',
        assistiveLabel: 'فعال‌کردن تم کلاسیک صفحهٔ اصلی'
      }
    : {
        label: 'پنل آبی',
        assistiveLabel: 'فعال‌کردن تم پنل آبی صفحهٔ اصلی'
      };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeHomeTheme, nextHomeTheme, homeThemeControlCopy };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const control = document.getElementById('home-theme-toggle');
    const controlLabel = control && control.querySelector('[data-home-theme-label]');

    function applyHomeTheme(theme) {
      const normalizedTheme = normalizeHomeTheme(theme);
      const copy = homeThemeControlCopy(normalizedTheme);
      root.dataset.homeTheme = normalizedTheme;

      if (control) {
        control.setAttribute('aria-pressed', String(normalizedTheme === 'modern'));
        control.setAttribute('aria-label', copy.assistiveLabel);
        control.title = copy.assistiveLabel;
      }

      if (controlLabel) {
        controlLabel.textContent = copy.label;
      }
    }

    applyHomeTheme(root.dataset.homeTheme);

    if (control) {
      control.addEventListener('click', () => {
        const theme = nextHomeTheme(root.dataset.homeTheme);
        applyHomeTheme(theme);

        try {
          window.localStorage.setItem(HOME_THEME_STORAGE_KEY, theme);
        } catch (_) {
          // The theme remains usable for this visit when storage is unavailable.
        }
      });
    }
  });
}
