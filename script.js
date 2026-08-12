const messages = {
  fa: {
    englishSoon: 'نسخهٔ انگلیسی سایت به‌زودی آماده می‌شود.',
    courseSoon: 'جزئیات این دوره به‌زودی منتشر می‌شود.',
    resourceSoon: 'منابع آموزشی تازه به‌زودی منتشر می‌شوند.',
    invalidEmail: 'لطفاً یک نشانی ایمیل معتبر وارد کنید.',
    newsletterDemo: 'ثبت‌نام خبرنامه در این نسخه نمایشی است و اطلاعاتی ذخیره نمی‌شود.'
  }
};

function normalizeTheme(value, systemDark) {
  if (value === 'dark' || value === 'light') {
    return value;
  }

  return systemDark ? 'dark' : 'light';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeTheme, isValidEmail, messages };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initApp);
}

function initApp() {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNavigation = document.getElementById('primary-navigation');
  const languageToggle = document.getElementById('language-toggle');
  const toast = document.getElementById('toast');
  const newsletterForm = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const newsletterSubmit = document.getElementById('newsletter-submit');
  const themeStorageKey = 'dotnet-academy-theme';
  let toastTimer;

  root.classList.add('js');

  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(themeStorageKey);
  } catch (_) {
    // Theme preference remains available for this page even when storage is blocked.
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }

  applyTheme(normalizeTheme(storedTheme, systemDark));

  function showToast(message) {
    if (!toast) {
      return;
    }

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toastTimer = window.setTimeout(() => {
      toast.textContent = '';
    }, 5000);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);

      try {
        window.localStorage.setItem(themeStorageKey, nextTheme);
      } catch (_) {
        // Changing the page theme does not depend on persistent storage access.
      }
    });
  }

  function closeMenu(restoreFocus = false) {
    const focusWasInNavigation = restoreFocus
      && primaryNavigation
      && primaryNavigation.contains(document.activeElement);
    const wasExpanded = menuToggle && menuToggle.getAttribute('aria-expanded') === 'true';

    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (wasExpanded && focusWasInNavigation) {
      menuToggle.focus();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu(true);
    }
  });

  if (primaryNavigation) {
    primaryNavigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        closeMenu();
      }
    });
  }

  if (menuToggle && primaryNavigation) {
    root.classList.add('js-ready');
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', () => showToast(messages.fa.englishSoon));
  }

  document.querySelectorAll('[data-course]').forEach((button) => {
    button.addEventListener('click', () => showToast(messages.fa.courseSoon));
  });

  document.querySelectorAll('[data-resource]').forEach((button) => {
    button.addEventListener('click', () => showToast(messages.fa.resourceSoon));
  });

  if (newsletterForm && emailInput) {
    function handleNewsletter(event) {
      event.preventDefault();

      if (!isValidEmail(emailInput.value)) {
        emailInput.setAttribute('aria-invalid', 'true');
        showToast(messages.fa.invalidEmail);
        emailInput.focus();
        return;
      }

      emailInput.removeAttribute('aria-invalid');
      newsletterForm.reset();
      showToast(messages.fa.newsletterDemo);
    }

    newsletterForm.addEventListener('submit', handleNewsletter);
    if (newsletterSubmit) {
      newsletterSubmit.addEventListener('click', handleNewsletter);
    }
    emailInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleNewsletter(event);
      }
    });
  }
}
