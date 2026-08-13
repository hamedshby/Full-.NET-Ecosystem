(() => {
  const params = new URLSearchParams(window.location.search);
  const title = (params.get('title') || 'عنوان درس').trim();
  const chapter = params.get('chapter');
  const lesson = params.get('lesson');
  const titleElement = document.getElementById('lesson-title');
  const positionElement = document.getElementById('lesson-position');

  titleElement.textContent = title;
  document.title = `${title} | آکادمی دات‌نت`;

  if (chapter && lesson) {
    positionElement.textContent = `فصل ${chapter}، درس ${lesson}`;
  }
})();
