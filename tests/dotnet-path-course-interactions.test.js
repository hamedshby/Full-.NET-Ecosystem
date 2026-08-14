const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

test('the current lesson chapter stays open and scrolls into view in the sidebar', () => {
  let scrolled = false;
  const currentChapter = { open: false };
  const currentLink = {
    closest(selector) {
      assert.equal(selector, 'details.course-chapter');
      return currentChapter;
    },
    scrollIntoView(options) {
      assert.equal(options.block, 'center');
      scrolled = true;
    }
  };
  const sidebar = {
    dataset: { currentLesson: 'chapter-20-lesson-11' },
    innerHTML: '',
    querySelector(selector) {
      assert.equal(selector, 'a[aria-current="page"]');
      return currentLink;
    }
  };
  const root = {
    dataset: { theme: 'light' },
    classList: { add() {}, toggle() {} }
  };
  const context = {
    document: {
      documentElement: root,
      getElementById(id) {
        return id === 'course-sidebar' ? sidebar : null;
      }
    },
    window: {
      dotnetCourse: {
        renderDotnetNavigation(currentLessonId) {
          assert.equal(currentLessonId, 'chapter-20-lesson-11');
          return '<nav>rendered</nav>';
        }
      }
    },
    requestAnimationFrame(callback) { callback(); },
    localStorage: { getItem() { return null; }, setItem() {} },
    matchMedia(query) { return { matches: query === '(min-width: 861px)' }; }
  };

  const source = fs.readFileSync(
    path.join(__dirname, '..', 'courses', 'dotnet-path', 'course.js'),
    'utf8'
  );
  vm.runInNewContext(source, context);

  assert.equal(currentChapter.open, true);
  assert.equal(scrolled, true);
});
