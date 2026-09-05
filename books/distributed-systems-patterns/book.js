(function () {
  const root = document.documentElement;
  const sidebar = document.getElementById('book-sidebar');
  const menuToggle = document.getElementById('book-menu-toggle');
  const themeToggle = document.getElementById('theme-toggle');

  if (sidebar && window.distributedSystemsBook) {
    sidebar.innerHTML = window.distributedSystemsBook.renderNavigation(
      sidebar.dataset.currentChapter || '',
      sidebar.dataset.linkPrefix || ''
    );
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (!themeToggle) return;
    const nextTheme = theme === 'dark' ? 'روشن' : 'تیره';
    themeToggle.setAttribute('aria-label', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('title', `فعال‌کردن تم ${nextTheme}`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  applyTheme(root.dataset.theme || 'light');
  root.classList.add('book-ready');

  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    root.classList.toggle('book-menu-open', !expanded);
  });

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('dotnet-academy-theme', nextTheme); } catch {}
  });
})();
