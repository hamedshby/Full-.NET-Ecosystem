(function () {
  const root = document.documentElement;
  const sidebar = document.getElementById('course-sidebar');
  const menuToggle = document.getElementById('course-menu-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const copyStatus = document.getElementById('copy-status');

  function preferredTheme() {
    try {
      const saved = localStorage.getItem('dotnet-academy-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateThemeControl(theme) {
    if (!themeToggle) return;
    const nextTheme = theme === 'dark' ? 'روشن' : 'تیره';
    themeToggle.setAttribute('aria-label', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('title', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    updateThemeControl(theme);
  }

  if (sidebar && window.microservicesCourse) {
    sidebar.innerHTML = window.microservicesCourse.renderMicroservicesNavigation(sidebar.dataset.currentLesson);
  }

  applyTheme(root.dataset.theme || preferredTheme());
  root.classList.add('course-ready');

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    root.classList.toggle('menu-open', !expanded);
  });

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('dotnet-academy-theme', nextTheme); } catch {}
  });

  document.querySelectorAll('[data-copy-code]').forEach(button => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-head')?.nextElementSibling?.textContent || '';
      try {
        await navigator.clipboard.writeText(code);
        if (copyStatus) copyStatus.textContent = 'کد کپی شد.';
      } catch {
        if (copyStatus) copyStatus.textContent = 'کپی خودکار انجام نشد.';
      }
      setTimeout(() => { if (copyStatus) copyStatus.textContent = ''; }, 1800);
    });
  });
})();
