(() => {
  const sidebar = document.querySelector('[data-current-lesson]');
  const toggle = document.querySelector('[data-course-menu-toggle]');

  if (!sidebar || !toggle) return;

  const desktopQuery = window.matchMedia('(min-width: 761px)');

  const setExpanded = expanded => {
    toggle.setAttribute('aria-expanded', String(expanded));
    sidebar.dataset.collapsed = String(!expanded);
  };

  const syncWithViewport = event => setExpanded(event.matches);

  syncWithViewport(desktopQuery);
  toggle.addEventListener('click', () => {
    setExpanded(toggle.getAttribute('aria-expanded') !== 'true');
  });
  desktopQuery.addEventListener?.('change', syncWithViewport);
})();
