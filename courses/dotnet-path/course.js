(function () {
  const root = document.documentElement;
  const sidebar = document.getElementById('course-sidebar');
  const menuToggle = document.getElementById('course-menu-toggle');
  const themeToggle = document.getElementById('theme-toggle');

  function preferredTheme() {
    try {
      const saved = localStorage.getItem('dotnet-academy-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (!themeToggle) return;
    const nextTheme = theme === 'dark' ? 'روشن' : 'تیره';
    themeToggle.setAttribute('aria-label', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('title', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  if (sidebar && window.dotnetCourse) {
    sidebar.innerHTML = window.dotnetCourse.renderDotnetNavigation(sidebar.dataset.currentLesson);
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
})();
