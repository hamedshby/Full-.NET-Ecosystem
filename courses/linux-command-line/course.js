(() => {
  const root = document.documentElement;
  const menuToggle = document.getElementById('course-menu-toggle');
  const themeToggle = document.getElementById('theme-toggle');

  const applyTheme = theme => {
    root.dataset.theme = theme;
    if (!themeToggle) return;
    const nextTheme = theme === 'dark' ? 'روشن' : 'تیره';
    themeToggle.setAttribute('aria-label', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('title', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  };

  let storedTheme = null;
  try { storedTheme = localStorage.getItem('dotnet-academy-theme'); } catch (_) { }
  applyTheme(storedTheme === 'dark' || storedTheme === 'light'
    ? storedTheme
    : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.classList.add('course-ready');

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    root.classList.toggle('menu-open', !expanded);
  });
  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('dotnet-academy-theme', nextTheme); } catch (_) { }
  });
})();
