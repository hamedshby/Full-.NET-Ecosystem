(function (globalScope) {
  const chapterData = [
    ['Frontend Fundamentals', ['HTML basics', 'Semantic HTML', 'Forms', 'CSS basics', 'Box Model', 'Flexbox', 'Grid', 'Responsive Design']],
    ['JavaScript Fundamentals for React', ['Variables', 'Data Types', 'Operators', 'Conditions', 'Loops', 'Functions', 'Scope', 'Objects', 'Arrays']],
    ['Modern JavaScript / ES6+', ['let / const', 'Arrow Functions', 'Template Literals', 'Destructuring', 'Spread / Rest', 'Optional Chaining', 'Nullish Coalescing', 'Modules', 'import / export', 'map / filter / reduce', 'find / some / every']],
    ['Asynchronous JavaScript', ['Callback concept', 'Promise', 'async / await', 'fetch', 'Error Handling', 'try / catch']],
    ['TypeScript Fundamentals', ['Basic Types', 'Type Inference', 'Interfaces', 'Type Aliases', 'Union Types', 'Optional Properties', 'Generics', 'Utility Types', 'Type Narrowing', 'TypeScript with API responses']],
    ['Node.js and Frontend Tooling', ['Node.js basics', 'npm', 'package.json', 'npm scripts', 'dependencies vs devDependencies', 'Vite', 'Project structure', 'Environment variables']],
    ['React Fundamentals', ['What is React?', 'SPA concept', 'Virtual DOM', 'JSX', 'Components', 'Functional Components', 'Props', 'Component composition']],
    ['React State and Events', ['Event Handling', 'useState', 'Updating State', 'Controlled Components', 'Conditional Rendering', 'Lists', 'Keys']],
    ['Forms in React', ['Input handling', 'Form submission', 'Validation basics', 'Controlled vs uncontrolled components', 'React Hook Form', 'Schema validation']],
    ['React Hooks', ['useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'Custom Hooks', 'Hook rules', 'Component lifecycle concepts']],
    ['Routing', ['React Router', 'Routes', 'Navigation', 'Route Parameters', 'Query Parameters', 'Nested Routes', '404 Pages', 'Protected Routes']],
    ['Working with ASP.NET Core APIs', ['HTTP requests', 'REST API integration', 'fetch', 'Axios', 'Request headers', 'DTOs', 'Loading states', 'Error states', 'API service layer']],
    ['Server State Management', ['Client State vs Server State', 'TanStack Query', 'Queries', 'Mutations', 'Caching', 'Refetching', 'Pagination', 'Invalidating Cache']],
    ['Global State Management', ['Context API', 'When to use Context', 'Redux concepts', 'Redux Toolkit', 'Store', 'Slice', 'Reducer', 'Actions', 'Async state']],
    ['Authentication and Authorization', ['Login flow', 'JWT', 'Access Token', 'Refresh Token concept', 'Storing authentication state', 'Authorization header', 'Protected Routes', 'Role-Based Authorization', 'Integration with ASP.NET Core Identity/JWT']],
    ['Reusable Component Design', ['Reusable components', 'Component responsibilities', 'Composition', 'Props design', 'Presentational vs container components', 'Custom Hooks', 'Avoiding duplicated logic']],
    ['Frontend Architecture', ['Feature-based structure', 'Separation of concerns', 'API layer', 'Domain models', 'UI layer', 'State layer', 'Clean Architecture ideas in frontend', 'Dependency direction']],
    ['Error Handling', ['API errors', 'Global error handling', 'Error Boundaries', 'Validation errors', 'Unauthorized responses', 'Network errors']],
    ['Performance', ['React rendering', 'Re-rendering', 'Memoization', 'React.memo', 'useMemo', 'useCallback', 'Lazy Loading', 'Code Splitting', 'Performance profiling']],
    ['Testing', ['Testing fundamentals', 'Unit testing', 'Component testing', 'React Testing Library', 'Mocking APIs', 'Integration testing']],
    ['Styling Approaches', ['CSS', 'CSS Modules', 'Tailwind CSS concept', 'Component libraries', 'Responsive UI', 'Choosing a styling strategy']],
    ['Real-World CRUD Applications', ['Create', 'Read', 'Update', 'Delete', 'Search', 'Filter', 'Sort', 'Pagination', 'Confirmation dialogs']],
    ['Production Concerns', ['Environment configuration', 'Development / Staging / Production', 'Logging', 'Security basics', 'CORS', 'Token security', 'Build optimization']],
    ['Docker', ['Dockerizing React', 'Production Build', 'Nginx basics', 'React + ASP.NET Core containers']],
    ['CI/CD', ['Build pipeline', 'Tests', 'Production build', 'Docker image', 'Deployment', 'GitLab CI/CD concepts for React']],
    ['Final Project — Payment Admin Dashboard', ['Login', 'JWT Authentication', 'Role-Based Authorization', 'Dashboard', 'Transactions list', 'Transaction details', 'Merchant management', 'CRUD', 'Search', 'Filter', 'Pagination', 'Forms', 'Validation', 'Error handling', 'Loading states', 'ASP.NET Core integration', 'Clean project structure', 'Docker', 'CI/CD']]
  ];

  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  const reactChapters = chapterData.map(([title, topics], chapterIndex) => ({
    title: `${chapterIndex + 1} - ${title}`,
    lessons: topics.map((title, topicIndex) => ({
      id: `ch${chapterIndex + 1}-${topicIndex + 1}`,
      title,
      available: false
    }))
  }));

  function renderReactNavigation() {
    return `
      <h2>آموزش <bdi>React</bdi></h2>
      <p>۲۶ فصل از مبانی <bdi>Frontend</bdi> تا پروژهٔ نهایی</p>
      ${reactChapters.map((chapter, index) => `<details class="course-chapter"${index === 0 ? ' open' : ''}>
        <summary><bdi>${escapeHtml(chapter.title)}</bdi></summary>
        <ol>${chapter.lessons.map(lesson => `<li><span class="lesson-soon" data-lesson-id="${lesson.id}"><bdi>${escapeHtml(lesson.title)}</bdi><span class="soon-badge">به‌زودی</span></span></li>`).join('')}</ol>
      </details>`).join('')}`;
  }

  const api = { reactChapters, renderReactNavigation };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  globalScope.reactCourse = api;
})(typeof window !== 'undefined' ? window : globalThis);
