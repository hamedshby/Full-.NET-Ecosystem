const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const sourcePath = process.argv[2];
if (!sourcePath) throw new Error('Pass the approved outline text file path.');

const source = fs.readFileSync(sourcePath, 'utf8').replace(/\r\n/g, '\n');
const lines = source.split('\n');
const chapters = [];
let currentChapter = null;

for (const line of lines) {
  const chapterMatch = line.match(/^#{1,2}\s+(فصل\s+\d+\s+—\s+.+)$/);
  if (chapterMatch) {
    currentChapter = { title: chapterMatch[1].trim(), lessons: [] };
    chapters.push(currentChapter);
    continue;
  }

  const lessonMatch = line.match(/^###\s+(.+)$/);
  if (lessonMatch && currentChapter) currentChapter.lessons.push(lessonMatch[1].trim());
}

for (const chapter of chapters) {
  if (!chapter.lessons.length) chapter.lessons.push(chapter.title.replace(/^فصل\s+\d+\s+—\s+/, ''));
}

const expectedChapterCount = 28;
if (chapters.length !== expectedChapterCount) {
  throw new Error(`Expected ${expectedChapterCount} chapters, found ${chapters.length}.`);
}

const data = chapters.map((chapter, chapterIndex) => ({
  title: chapter.title,
  lessons: chapter.lessons.map((title, lessonIndex) => ({
    id: chapterIndex === 0 && lessonIndex === 0
      ? 'oop-introduction'
      : chapterIndex === 0 && lessonIndex === 1
        ? 'basic-concepts'
        : `chapter-${chapterIndex + 1}-lesson-${lessonIndex + 1}`,
    title,
    available: chapterIndex === 0 && lessonIndex === 0
  }))
}));

const output = `(function (globalScope) {
  const dotnetChapters = ${JSON.stringify(data, null, 2)};
  const availableLessons = dotnetChapters
    .flatMap(chapter => chapter.lessons)
    .filter(lesson => lesson.available);

  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const displayLessonTitle = title => title.replace(/^\\d+(?:\\.\\d+)+\\s+/, '');

  function renderDotnetNavigation(currentLessonId) {
    return \`
      <h2>سرفصل‌های آموزش <bdi>.NET</bdi></h2>
      \${dotnetChapters.map(chapter => {
        const containsCurrent = chapter.lessons.some(lesson => lesson.id === currentLessonId);
        return \`<details class="course-chapter"\${containsCurrent ? ' open' : ''}>
          <summary>\${escapeHtml(chapter.title)}</summary>
          <ol>\${chapter.lessons.map(lesson => {
            const title = \`<bdi>\${escapeHtml(displayLessonTitle(lesson.title))}</bdi>\`;
            if (lesson.available) {
              return \`<li><a href="../oop/index.html"\${lesson.id === currentLessonId ? ' aria-current="page"' : ''}>\${title}</a></li>\`;
            }
            return \`<li><span class="lesson-soon" data-lesson-id="\${lesson.id}">\${title}</span></li>\`;
          }).join('')}</ol>
        </details>\`;
      }).join('')}\`;
  }

  const api = { dotnetChapters, availableLessons, renderDotnetNavigation };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  globalScope.dotnetCourse = api;
})(typeof window !== 'undefined' ? window : globalThis);
`;

fs.writeFileSync(path.join(root, 'courses/dotnet-path/course-navigation.js'), output, 'utf8');
console.log(`Generated ${data.length} chapters and ${data.reduce((sum, chapter) => sum + chapter.lessons.length, 0)} lessons.`);
