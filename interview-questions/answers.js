(() => {
  'use strict';

  async function loadAnswer(loader) {
    if (!loader || loader.dataset.answerState === 'loaded' || loader.dataset.answerState === 'loading') return;

    const sourcePath = loader.dataset.answerSrc;
    const sourceUrl = new URL(sourcePath, document.baseURI);
    if (sourceUrl.origin !== window.location.origin) {
      loader.innerHTML = '<p class="answer-error" role="alert">آدرس پاسخ معتبر نیست.</p>';
      loader.dataset.answerState = 'error';
      return;
    }

    loader.dataset.answerState = 'loading';
    loader.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch(sourceUrl);
      if (!response.ok) throw new Error(`Answer request failed with status ${response.status}`);

      const html = await response.text();
      const answerDocument = new DOMParser().parseFromString(html, 'text/html');
      const answer = answerDocument.querySelector('[data-answer-content]');
      if (!answer) throw new Error('Answer content was not found');

      loader.replaceChildren(...Array.from(answer.children, (child) => child.cloneNode(true)));
      loader.dataset.answerState = 'loaded';
    } catch (_) {
      loader.innerHTML = '<p class="answer-error" role="alert">بارگذاری پاسخ انجام نشد. لطفاً صفحه را دوباره بارگذاری کنید.</p>';
      loader.dataset.answerState = 'error';
    } finally {
      loader.removeAttribute('aria-busy');
    }
  }

  document.querySelectorAll('[data-answer-src]').forEach((loader) => {
    const accordion = loader.closest('details');
    if (!accordion) return;

    accordion.addEventListener('toggle', () => {
      if (accordion.open) loadAnswer(loader);
    });

    if (accordion.open) loadAnswer(loader);
  });
})();
