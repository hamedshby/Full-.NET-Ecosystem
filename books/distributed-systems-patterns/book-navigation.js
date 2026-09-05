(function (globalScope) {
  const parts = [
    {
      number: 'Part I',
      title: 'Narratives',
      chapters: [
        [1, 'promise-and-perils', 'The Promise and Perils of Distributed Systems'],
        [2, 'overview-of-patterns', 'Overview of the Patterns']
      ]
    },
    {
      number: 'Part II',
      title: 'Patterns of Data Replication',
      chapters: [
        [3, 'write-ahead-log', 'Write-Ahead Log'],
        [4, 'segmented-log', 'Segmented Log'],
        [5, 'low-water-mark', 'Low-Water Mark'],
        [6, 'leader-and-followers', 'Leader and Followers'],
        [7, 'heartbeat', 'HeartBeat'],
        [8, 'majority-quorum', 'Majority Quorum'],
        [9, 'generation-clock', 'Generation Clock'],
        [10, 'high-water-mark', 'High-Water Mark'],
        [11, 'paxos', 'Paxos'],
        [12, 'replicated-log', 'Replicated Log'],
        [13, 'singular-update-queue', 'Singular Update Queue'],
        [14, 'request-waiting-list', 'Request Waiting List'],
        [15, 'idempotent-receiver', 'Idempotent Receiver'],
        [16, 'follower-reads', 'Follower Reads'],
        [17, 'versioned-value', 'Versioned Value'],
        [18, 'version-vector', 'Version Vector']
      ]
    },
    {
      number: 'Part III',
      title: 'Patterns of Data Partitioning',
      chapters: [
        [19, 'fixed-partitions', 'Fixed Partitions'],
        [20, 'key-range-partitions', 'Key-Range Partitions'],
        [21, 'two-phase-commit', 'Two-Phase Commit']
      ]
    },
    {
      number: 'Part IV',
      title: 'Patterns of Distributed Time',
      chapters: [
        [22, 'lamport-clock', 'Lamport Clock'],
        [23, 'hybrid-clock', 'Hybrid Clock'],
        [24, 'clock-bound-wait', 'Clock-Bound Wait']
      ]
    },
    {
      number: 'Part V',
      title: 'Patterns of Cluster Management',
      chapters: [
        [25, 'consistent-core', 'Consistent Core'],
        [26, 'lease', 'Lease'],
        [27, 'state-watch', 'State Watch'],
        [28, 'gossip-dissemination', 'Gossip Dissemination'],
        [29, 'emergent-leader', 'Emergent Leader']
      ]
    },
    {
      number: 'Part VI',
      title: 'Patterns of Communication between Nodes',
      chapters: [
        [30, 'single-socket-channel', 'Single-Socket Channel'],
        [31, 'request-batch', 'Request Batch'],
        [32, 'request-pipeline', 'Request Pipeline']
      ]
    }
  ].map(part => ({
    ...part,
    chapters: part.chapters.map(([number, slug, title]) => ({ number, slug, title }))
  }));

  const chapters = parts.flatMap(part => part.chapters.map(chapter => ({ ...chapter, part })));
  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const chapterFile = chapter => `chapter-${String(chapter.number).padStart(2, '0')}-${chapter.slug}.html`;

  function renderNavigation(currentSlug = '', linkPrefix = '') {
    return `
      <div class="sidebar-heading">
        <h2><bdi>Patterns of Distributed Systems</bdi></h2>
      </div>
      <div class="sidebar-parts">
        ${parts.map((part, index) => {
          const containsCurrent = part.chapters.some(chapter => chapter.slug === currentSlug);
          return `<details class="sidebar-part"${containsCurrent || (!currentSlug && index === 0) ? ' open' : ''}>
            <summary><span class="part-label">${escapeHtml(part.number)}</span><bdi>${escapeHtml(part.title)}</bdi></summary>
            <ol start="${part.chapters[0].number}">
              ${part.chapters.map(chapter => `<li><a href="${linkPrefix}${chapterFile(chapter)}"${chapter.slug === currentSlug ? ' aria-current="page"' : ''}><bdi>${escapeHtml(chapter.title)}</bdi></a></li>`).join('')}
            </ol>
          </details>`;
        }).join('')}
      </div>`;
  }

  const api = { parts, chapters, chapterFile, renderNavigation };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  globalScope.distributedSystemsBook = api;
})(typeof window !== 'undefined' ? window : globalThis);
