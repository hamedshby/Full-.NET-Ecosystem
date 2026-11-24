(() => {
  const chapters = [
    ['Introduction', [
      ['intro', 'Learning Linux command line'],
      ['what-you-should-know', 'What you should know'],
      ['quick-intro-to-linux', 'A very quick intro to Linux']
    ]],
    ['1. Setting Up Your Environment', [
      ['github-codespaces', 'Using GitHub Codespaces with this course'],
      ['linux-virtual-machine', 'Creating a Linux virtual machine'],
      ['other-platforms', 'Following along on other platforms']
    ]],
    ['2. Command-Line Basics', [
      ['what-is-the-command-line', 'What is the command line?'],
      ['command-structure', 'Understand how commands are structured'],
      ['shell-prompt', 'Write commands in a shell at the prompt'],
      ['finding-help', 'Finding help for commands']
    ]]
  ];

  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  const sidebar = document.getElementById('course-sidebar');
  if (!sidebar) return;
  const currentLesson = sidebar.dataset.currentLesson;
  sidebar.innerHTML = `
    <h2 lang="en" dir="ltr">Learning Linux Command Line</h2>
    ${chapters.map(([title, lessons]) => `
      <details class="course-chapter" open>
        <summary lang="en" dir="ltr">${escapeHtml(title)}</summary>
        <ol>${lessons.map(([id, label]) => `
          <li><a href="${id}.html"${id === currentLesson ? ' aria-current="page"' : ''}><bdi>${escapeHtml(label)}</bdi></a></li>
        `).join('')}</ol>
      </details>
    `).join('')}`;
})();
