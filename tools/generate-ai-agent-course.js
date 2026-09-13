const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const courseRoot = path.join(root, 'courses', 'ai-agent');
const lessonsRoot = path.join(courseRoot, 'lessons');

const parts = [
  {
    title: 'PART 1 — LLM Fundamentals',
    chapters: [
      ['AI & LLM Fundamentals', 'AI، Machine Learning و Generative AI|LLM چیست؟|Token چیست؟|Context Window|System / User / Assistant Messages|Temperature و Sampling|Hallucination|Reasoning Models|Hosted Models vs Local Models|OpenAI / Azure OpenAI / OpenRouter / Ollama|اولین فراخوانی LLM از C#|پروژه: Console Chatbot با .NET'],
      ['LLM Integration in .NET', 'HTTP API vs SDK|OpenAI .NET SDK|Microsoft.Extensions.AI|IChatClient|Dependency Injection|Streaming Response|CancellationToken|Structured Output|JSON Schema|Configuration و API Key Management|Provider Abstraction|پروژه: ASP.NET Core AI API'],
      ['Prompt Engineering for Agents', 'Prompt Anatomy|System Instructions|Developer Instructions|User Input|Context|Few-shot Prompting|Prompt Templates|Role Prompting|Constraints|Output Contract|Structured Prompt|Prompt vs Context|Prompt vs Memory|Prompt vs Tool Description|Prompt Injection|Prompt Versioning|محدود کردن رفتار مدل|پروژه: Payment Rules Agent'],
    ],
  },
  {
    title: 'PART 2 — Building Agents',
    chapters: [
      ['Agent Architecture Fundamentals', 'Agent چیست؟|Chatbot vs Agent|Model|Instructions|Context|Memory|Tools|State|Runtime|Agent Lifecycle|Agent Components|Agent Execution Flow'],
      ['Function & Tool Calling', 'Function Calling چیست؟|Tool چیست؟|Tool Schema|Tool Description Design|Tool Selection|Automatic Tool Calling|Tool Result|Multiple Tools|Parallel Tool Calling|Tool Discovery|Tool Registry|Tool Argument Validation|Tool Result Validation|Tool Error Handling|Timeout|Retry|Cancellation|Authorization|Side Effects|Idempotency|Read-only Tools|Write Tools|Sensitive / Destructive Tools|Tool Execution Policy|Tool Calling vs API Calling|پروژه: Payment Support Agent'],
      ['Agent Loop', 'Goal|Reasoning / Decision|Action|Observation|State Update|Planning|ReAct Pattern|Iterations|Max Iterations|Stop Conditions|Error Recovery|Tool Loop|Final Response|Agent Loop بدون Framework|پروژه: Agent Engine با C#'],
      ['Context & Memory', 'Stateless vs Stateful Agent|Context چیست؟|Memory چیست؟|Context vs Memory|Conversation History|Short-Term Memory|Long-Term Memory|Working Memory|Semantic Memory|Episodic Memory|Session|Conversation State|Memory Architecture|Persist کردن Session|Redis|SQL Server|Context Compaction|Summarization|Token Budget|Memory Retrieval|پروژه: Customer Support Agent'],
    ],
  },
  {
    title: 'PART 3 — Knowledge & External Systems',
    chapters: [
      ['Embeddings & Semantic Search', 'Embedding چیست؟|Vector چیست؟|Embedding Model|Semantic Similarity|Cosine Similarity|Chunking|Chunk Size|Chunk Overlap|Metadata|Vector Store|Vector Database|Semantic Search|Metadata Filtering|Hybrid Search|Qdrant|pgvector|Azure AI Search|Redis Vector Search|Microsoft.Extensions.VectorData|پروژه: Semantic Search روی مستندات'],
      ['RAG', 'RAG چیست؟|Retrieval|Augmentation|Generation|Ingestion Pipeline|Document Loading|Chunking Strategy|Embedding|Indexing|Retrieval|Top-K|Re-ranking|Grounding|Citation|Query Transformation|Query Expansion|Hybrid Retrieval|Agentic RAG|RAG Evaluation|پروژه: Documentation Agent'],
      ['MCP', 'Model Context Protocol چیست؟|مشکل Tool Integration|MCP Architecture|MCP Client|MCP Server|Tools|Resources|Prompts|Transport|stdio|HTTP Transport|Authentication|Authorization|MCP Security|ساخت MCP Server با .NET|اتصال Agent به MCP Server|REST API vs Tool Calling vs MCP|MCP برای Microservices|پروژه: PaymentMcpServer'],
    ],
  },
  {
    title: 'PART 4 — Agent Framework & Orchestration',
    chapters: [
      ['Microsoft Agent Framework', 'Agent Framework چیست؟|AIAgent|ChatClientAgent|Instructions|Tools|Sessions|Memory|Context Providers|Middleware|Agent Runtime|Structured Output|Streaming|Provider Abstraction|Agent Hosting|پروژه: بازنویسی Agent قبلی با Agent Framework'],
      ['Workflows', 'Agent vs Workflow|Deterministic Workflow|Agentic Workflow|Sequential Workflow|Parallel Workflow|Concurrent Workflow|Routing|Conditional Branching|Retry|State|Checkpoint|Resume|Long-running Workflow|Human-in-the-loop|Handoff|Workflow Orchestration|پروژه: Payment Dispute Workflow'],
      ['Multi-Agent Systems', 'Multi-Agent چیست؟|چه زمانی Multi-Agent نیاز داریم؟|Specialized Agents|Coordinator Agent|Supervisor Agent|Agents as Tools|Delegation|Handoff|Routing|Parallel Agents|Group Chat|Shared Context|Shared State|Agent Communication|Conflict Resolution|Multi-Agent Orchestration|پروژه: Payment Operations Multi-Agent System'],
      ['Advanced Agent Patterns', 'Task Decomposition|Dynamic Planning|Plan-and-Execute|ReAct|Reflection|Critic Pattern|Self-Correction|Tool-Using Agent|Router Agent|Agent-as-a-Tool|Supervisor Pattern|Generator / Critic|Evaluator / Optimizer|Orchestrator / Workers|Sequential Agent|Parallel Agent|Handoff Pattern|Map-Reduce Agents|Agent Harness|Skill-Based Agents|پروژه: Coding Agent'],
      ['Human-in-the-Loop', 'Approval|Confirmation|Escalation|Risk-Based Approval|Pause|Resume|Checkpoint|Sensitive Actions|Financial Actions|Manual Review|Approval Policies|پروژه: Refund Approval Agent'],
    ],
  },
  {
    title: 'PART 5 — Production-Grade Agents',
    chapters: [
      ['Agent Security', 'Prompt Injection|Indirect Prompt Injection|Tool Injection|Data Exfiltration|Agent Threat Modeling|Least Privilege|Allow List|Authentication|Authorization|Tool Permissions|Sandboxing|Secret Management|Input Validation|Output Validation|PII Protection|Audit Logging|Sensitive Tool Protection|Security Boundaries'],
      ['Agent Evaluations', 'Eval چیست؟|Test Dataset|Golden Dataset|Exact Match|Semantic Evaluation|LLM-as-a-Judge|Tool Selection Accuracy|Tool Argument Accuracy|Task Completion Rate|Hallucination Rate|RAG Evaluation|Agent Trajectory Evaluation|Regression Testing|Safety Evaluation|Cost Evaluation|Latency Evaluation|پروژه: Agent Evals با xUnit'],
      ['Observability', 'Logging|Metrics|Tracing|OpenTelemetry|Agent Trace|LLM Request Trace|Tool Trace|Agent Step Trace|Token Usage|Cost Tracking|Latency|Failure Analysis|CorrelationId|Distributed Tracing|Dashboard|Alerts'],
      ['Production Architecture', 'ASP.NET Core Hosting|Agent Service|Background Services|Queue-Based Agents|RabbitMQ|Kafka|Redis|SQL Server|Distributed Lock|Idempotency|Retry|Circuit Breaker|Rate Limiting|Timeout|Cancellation|Horizontal Scaling|Stateless Agent Workers|Persistent State|Distributed Agents|Resilience|Docker|Kubernetes|.NET Aspire|OpenTelemetry|Deployment Strategies'],
      ['Cost & Performance Engineering', 'Token Optimization|Token Budget|Context Reduction|Context Compression|Prompt Caching|Semantic Cache|Model Routing|Small Model vs Large Model|Model Fallback|Parallel Tool Calling|Streaming|Batch Processing|Timeout|Agent Step Limit|Cost Budget|Latency Optimization|Cost Monitoring|Performance Benchmarking'],
    ],
  },
  {
    title: 'PART 6 — Final Project',
    chapters: [
      ['AI Payment Operations Agent', 'Solution Architecture|ASP.NET Core|Microsoft.Extensions.AI|Microsoft Agent Framework|LLM Provider|Tool Calling|Agent Loop|Context & Memory|Redis|SQL Server|Embeddings|RAG|MCP|Workflow|Multi-Agent|Human Approval|Security|Evals|Observability|RabbitMQ|OpenTelemetry|Docker|Kubernetes|Cost Management|Production Deployment'],
    ],
  },
];

const chapters = [];
for (const part of parts) {
  for (const [title, outline] of part.chapters) {
    chapters.push({
      part: part.title,
      title,
      items: outline.split('|'),
    });
  }
}

const lessons = chapters.flatMap((chapter, chapterIndex) => chapter.items.map((title, lessonIndex) => ({
  chapter: chapterIndex + 1,
  lesson: lessonIndex + 1,
  part: chapter.part,
  chapterTitle: chapter.title,
  title,
  href: `lessons/ch${chapterIndex + 1}-${lessonIndex + 1}.html`,
})));

const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const themeScript = `
    (() => {
      document.documentElement.classList.add('js');
      let storedTheme = null;
      try { storedTheme = localStorage.getItem('dotnet-academy-theme'); } catch (_) {}
      const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.dataset.theme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : systemDark ? 'dark' : 'light';
    })();`;

const themeButton = `
      <button id="theme-toggle" class="icon-button" type="button" aria-label="فعال‌کردن تم تیره" title="فعال‌کردن تم تیره" aria-pressed="false">
        <svg class="nav-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.6 8.6 0 1 0 20.4 15.2Z"></path></svg>
        <svg class="nav-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.7"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>
      </button>`;

function chapterMarkup(chapter, chapterNumber) {
  const items = chapter.items.map((title, index) => `            <li><a href="lessons/ch${chapterNumber}-${index + 1}.html"><bdi>${escapeHtml(title)}</bdi></a></li>`).join('\n');
  return `        <details class="chapter"${chapterNumber === 1 ? ' open' : ''}>
          <summary>
            <span class="chapter-number">${String(chapterNumber).padStart(2, '0')}</span>
            <span class="chapter-title"><bdi>${escapeHtml(chapter.title)}</bdi></span>
          </summary>
          <ol>
${items}
          </ol>
        </details>`;
}

let chapterNumber = 0;
const partsMarkup = parts.map(part => {
  const partChapters = part.chapters.map(() => chapterMarkup(chapters[chapterNumber], ++chapterNumber)).join('\n');
  return `      <section class="course-part" aria-labelledby="part-${chapterNumber}">
        <div class="part-heading">
          <p class="eyebrow">بخش ${parts.indexOf(part) + 1} از ${parts.length}</p>
          <h2 id="part-${chapterNumber}"><bdi>${escapeHtml(part.title.replace(/^PART \d+ — /, ''))}</bdi></h2>
        </div>
        <div class="chapters">
${partChapters}
        </div>
      </section>`;
}).join('\n');

const indexHtml = `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="سرفصل‌های دورهٔ AI Agent؛ ساخت Agentهای حرفه‌ای و Production-Grade با C# و .NET.">
  <title>AI Agent | آکادمی دات‌نت</title>
  <script>${themeScript}
  </script>
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="course.css">
  <script src="../../script.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#course-content">پرش به محتوای دوره</a>
  <header class="course-header">
    <nav class="course-nav" aria-label="ناوبری دوره">
      <a class="course-brand" href="../../index.html">آکادمی دات‌نت</a>
      <span class="course-name"><bdi>AI Agent</bdi></span>
      <a class="back-link" href="../../index.html#courses">بازگشت به دوره‌ها</a>${themeButton}
    </nav>
  </header>
  <main id="course-content">
    <section class="course-hero" aria-labelledby="course-title">
      <div class="course-badge" aria-hidden="true">AI·AG</div>
      <p class="eyebrow">مسیر جامع ساخت AI Agent با .NET</p>
      <h1 id="course-title"><bdi>AI Agent</bdi></h1>
      <p class="course-lead">از مبانی LLM و اتصال آن به .NET شروع می‌کنید و گام‌به‌گام به Tool Calling، Memory، RAG، MCP، Orchestration، Security، Evals و معماری Production می‌رسید.</p>
      <ul class="course-facts" aria-label="مشخصات دوره">
        <li><strong>${parts.length}</strong><span>بخش</span></li>
        <li><strong>${chapters.length}</strong><span>فصل</span></li>
        <li><strong>${lessons.length}</strong><span>درس و پروژه</span></li>
      </ul>
    </section>
    <section class="learning-path" aria-label="فهرست مطالب دوره">
${partsMarkup}
    </section>
    <section class="course-outcomes" aria-labelledby="outcomes-title">
      <div>
        <p class="eyebrow">پروژهٔ نهایی</p>
        <h2 id="outcomes-title"><bdi>AI Payment Operations Agent</bdi></h2>
        <p>در پایان، یک Agent عملیاتی و Production-Grade می‌سازید که با Toolها، Memory، RAG، MCP و Workflow مسئله‌های واقعی Payment را مدیریت می‌کند.</p>
      </div>
      <ul>
        <li>ASP.NET Core، Microsoft.Extensions.AI و Microsoft Agent Framework</li>
        <li>Tool Calling، Agent Loop، Context و Memory</li>
        <li>Embeddings، RAG، MCP و Multi-Agent Workflow</li>
        <li>Human Approval، Security و Agent Evals</li>
        <li>OpenTelemetry، RabbitMQ، Docker و Kubernetes</li>
        <li>Cost Management و Production Deployment</li>
      </ul>
    </section>
  </main>
  <footer class="course-footer">
    <a href="../../index.html#courses">بازگشت به فهرست دوره‌ها</a>
    <p>آکادمی دات‌نت</p>
  </footer>
</body>
</html>
`;

function lessonPage(current, previous, next) {
  return `<!doctype html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="درس ${escapeHtml(current.title)} از دورهٔ AI Agent در آکادمی دات‌نت.">
  <title>${escapeHtml(current.title)} | AI Agent</title>
  <script>${themeScript}
  </script>
  <link rel="stylesheet" href="../../../styles.css">
  <link rel="stylesheet" href="../course.css">
  <script src="../../../script.js" defer></script>
  <script src="../course-navigation.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#lesson-content">پرش به محتوای درس</a>
  <header class="course-header">
    <nav class="course-nav" aria-label="ناوبری درس">
      <a class="course-brand" href="../../../index.html">آکادمی دات‌نت</a>
      <span class="course-name"><bdi>AI Agent</bdi></span>
      <a class="back-link" href="../index.html">بازگشت به سرفصل‌های دوره</a>${themeButton}
    </nav>
  </header>
  <div class="docs-layout">
    <aside id="course-sidebar" class="learning-path docs-sidebar" aria-label="فهرست مطالب دوره"></aside>
    <main id="lesson-content" class="lesson-page">
      <nav class="lesson-breadcrumb" aria-label="مسیر راهنما">
        <a href="../index.html">AI Agent</a>
        <span aria-hidden="true">/</span>
        <span>فصل ${current.chapter}، درس ${current.lesson}</span>
      </nav>
      <article class="lesson-card">
        <p class="eyebrow"><bdi>${escapeHtml(current.part)}</bdi></p>
        <p class="lesson-chapter"><bdi>${escapeHtml(current.chapterTitle)}</bdi></p>
        <h1><bdi>${escapeHtml(current.title)}</bdi></h1>
        <p class="lesson-status">محتوای آموزشی این درس در این صفحه قرار خواهد گرفت.</p>
        <nav class="lesson-pager" aria-label="درس قبلی و بعدی">
          ${previous ? `<a href="${path.basename(previous.href)}">درس قبلی: <bdi>${escapeHtml(previous.title)}</bdi></a>` : '<a href="../index.html">بازگشت به فهرست دوره</a>'}
          ${next ? `<a href="${path.basename(next.href)}">درس بعدی: <bdi>${escapeHtml(next.title)}</bdi></a>` : '<a href="../index.html">بازگشت به فهرست دوره</a>'}
        </nav>
      </article>
    </main>
  </div>
</body>
</html>
`;
}

const navigationData = JSON.stringify(parts.map(part => ({
  title: part.title,
  chapters: chapters.filter(chapter => chapter.part === part.title).map(chapter => ({
    title: chapter.title,
    chapter: chapters.indexOf(chapter) + 1,
    items: chapter.items.map((title, index) => ({ title, href: `lessons/ch${chapters.indexOf(chapter) + 1}-${index + 1}.html` })),
  })),
}))).replace(/</g, '\\u003c');

const navigationScript = `(() => {
  const container = document.getElementById('course-sidebar');
  if (!container) return;
  const parts = ${navigationData};
  const courseBase = new URL('./', new URL(document.currentScript.src));
  const currentPath = window.location.pathname;
  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  container.innerHTML = \`<div class="chapters">\${parts.flatMap(part => [
      \`<p class="sidebar-part"><bdi>\${escapeHtml(part.title)}</bdi></p>\`,
      ...part.chapters.map(chapter => \`<details class="chapter">
        <summary><span class="chapter-number">\${String(chapter.chapter).padStart(2, '0')}</span><span class="chapter-title"><bdi>\${escapeHtml(chapter.title)}</bdi></span></summary>
        <ol>\${chapter.items.map(item => {
          const url = new URL(item.href, courseBase);
          const active = url.pathname === currentPath ? ' aria-current="page"' : '';
          return \`<li><a href="\${url.href}"\${active}><bdi>\${escapeHtml(item.title)}</bdi></a></li>\`;
        }).join('')}</ol>
      </details>\`),
    ]).join('')}</div>\`;

  const activeLink = container.querySelector('[aria-current="page"]');
  if (activeLink) {
    activeLink.closest('details').open = true;
    requestAnimationFrame(() => activeLink.scrollIntoView({ block: 'nearest' }));
  }
})();
`;

fs.mkdirSync(lessonsRoot, { recursive: true });
fs.writeFileSync(path.join(courseRoot, 'index.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(courseRoot, 'course-navigation.js'), navigationScript, 'utf8');

const sourceCss = fs.readFileSync(path.join(root, 'courses', 'ai-driven-software-architecture', 'course.css'), 'utf8');
const extraCss = `

.course-part + .course-part { margin-top: clamp(2.5rem, 6vw, 4.5rem); }
.part-heading {
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid color-mix(in srgb, var(--brand) 24%, var(--line));
  border-radius: var(--radius-md);
  background: linear-gradient(
    120deg,
    color-mix(in srgb, var(--brand) 13%, var(--surface)),
    color-mix(in srgb, var(--aqua) 10%, var(--surface))
  );
}
.part-heading :is(h2, h3) { margin: 0; font-size: clamp(1.2rem, 3vw, 1.65rem); }
.chapter summary { display: flex; align-items: center; gap: 0.8rem; }
.chapter-number { color: var(--accent); font-variant-numeric: tabular-nums; font-weight: 800; }
.sidebar-part {
  margin: 1.25rem 0 0.65rem;
  padding: 0.8rem 0.9rem;
  border: 1px solid color-mix(in srgb, var(--brand) 22%, var(--line));
  border-radius: var(--radius-sm);
  background: linear-gradient(
    120deg,
    color-mix(in srgb, var(--brand) 14%, var(--surface)),
    color-mix(in srgb, var(--aqua) 10%, var(--surface))
  );
  color: var(--ink);
  font-size: 0.8rem;
  font-weight: 800;
}
.lesson-chapter { margin: 0 0 0.45rem; color: var(--muted); }
.lesson-answer {
  margin-top: 1rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--surface-soft);
}
.lesson-answer summary { cursor: pointer; color: var(--brand); font-weight: 800; }
.lesson-answer ol { margin-bottom: 0; }
.lesson-section .code-block {
  position: relative;
  direction: ltr;
  unicode-bidi: isolate;
  max-width: 100%;
  margin: 1.25rem 0;
  padding: 3.15rem 1.25rem 1.3rem;
  overflow-x: auto;
  border: 1px solid #263244;
  border-radius: var(--radius-md);
  background: #0d1421;
  color: #e6edf3;
  box-shadow: 0 14px 32px rgb(3 8 20 / 18%);
  text-align: left;
  scrollbar-color: #52647c #111b2b;
  tab-size: 4;
}
.lesson-section .code-block::before {
  content: attr(data-language);
  position: absolute;
  inset: 0 0 auto;
  box-sizing: border-box;
  min-height: 2.25rem;
  padding: 0.55rem 1rem;
  border-bottom: 1px solid #263244;
  background: #111b2b;
  color: #91a4bd;
  font: 700 0.75rem/1.2 Consolas, "Cascadia Code", monospace;
  letter-spacing: 0.04em;
}
.lesson-section .code-block code {
  display: block;
  min-width: max-content;
  padding: 0;
  background: transparent;
  color: inherit;
  font: 400 0.92rem/1.8 Consolas, "Cascadia Code", "Courier New", monospace;
  text-align: left;
  white-space: pre;
}
.lesson-section .code-output { border-color: #285b52; background: #0c1b1a; }
.lesson-section .code-output::before { border-color: #285b52; background: #102522; color: #78dcca; }
.lesson-section :not(pre) > code {
  direction: ltr;
  unicode-bidi: isolate;
  padding: 0.12rem 0.38rem;
  border: 1px solid color-mix(in srgb, var(--brand) 18%, var(--line));
  border-radius: 0.35rem;
  background: color-mix(in srgb, var(--brand) 8%, var(--surface-soft));
  color: var(--ink);
  font-family: Consolas, "Cascadia Code", monospace;
  font-size: 0.9em;
}
`;
fs.writeFileSync(path.join(courseRoot, 'course.css'), `${sourceCss.trim()}${extraCss}`, 'utf8');

for (const [index, lesson] of lessons.entries()) {
  const lessonPath = path.join(courseRoot, lesson.href);
  if (!fs.existsSync(lessonPath)) {
    fs.writeFileSync(lessonPath, lessonPage(lesson, lessons[index - 1], lessons[index + 1]), 'utf8');
  }
}

console.log(`Generated AI Agent course: ${parts.length} parts, ${chapters.length} chapters, ${lessons.length} lessons.`);
