(function (globalScope) {
  const availableIds = new Set([
    'ch1-1', 'ch1-2', 'ch1-3', 'ch1-4',
    'ch2-1', 'ch2-2', 'ch2-2-1', 'ch2-3', 'ch2-4',
    'ch3-1', 'ch3-2', 'ch3-3', 'ch3-4', 'ch3-5',
    'ch4-1', 'ch4-2', 'ch4-3', 'ch4-4', 'ch4-5', 'ch4-6',
    'ch5-1', 'ch5-2', 'ch5-3'
  ]);

  const chapterData = [
    ['1 - Relationship between Microservices', [
      ['ch1-1', '1.1 Monolith vs Microservices'], ['ch1-2', '1.2 Communication Between Microservices'],
      ['ch1-3', '1.3 CAP Theorem'], ['ch1-4', '1.4 Distributed System Challenges']]],
    ['2 - Synchronous Communication', [
      ['ch2-1', '2.1 HTTP REST'], ['ch2-2', '2.2 gRPC'], ['ch2-2-1', '2.2.1 gRPC Interview'],
      ['ch2-3', '2.3 GraphQL'], ['ch2-4', '2.4 Sync Communication Problems']]],
    ['3 - Asynchronous Communication', [
      ['ch3-1', '3.1 What is Message Broker'], ['ch3-2', '3.2 Message Queue'], ['ch3-3', '3.3 Event'],
      ['ch3-4', '3.4 Event Driven Architecture'], ['ch3-5', '3.5 Message Driven Architecture']]],
    ['4 - RabbitMQ', [
      ['ch4-1', '4.1 Introduction to RabbitMQ'], ['ch4-2', '4.2 Installing RabbitMQ'],
      ['ch4-3', '4.3 RabbitMQ Concepts'], ['ch4-4', '4.4 Types of Exchange'], ['ch4-5', '4.5 Queue'],
      ['ch4-6', '4.6 Ack'], ['ch4-7', '4.7 Dead Letter Queue'], ['ch4-8', '4.8 Retry Queue'],
      ['ch4-9', '4.9 Priority Queue'], ['ch4-10', '4.10 Delayed Message'], ['ch4-11', '4.11 TTL'],
      ['ch4-12', '4.12 Prefetch Count'], ['ch4-13', '4.13 Publisher Confirm'],
      ['ch4-14', '4.14 Mandatory Message'], ['ch4-15', '4.15 Performance Tuning'],
      ['ch4-16', '4.16 Monitoring RabbitMQ']]],
    ['5 - Apache Kafka', [
      ['ch5-1', '5.1 Introduction to Kafka'], ['ch5-2', '5.2 Kafka Architecture'], ['ch5-3', '5.3 Producer'],
      ['ch5-4', '5.4 Consumer'], ['ch5-5', '5.5 Consumer Group'], ['ch5-6', '5.6 Offset'],
      ['ch5-7', '5.7 Ordering'], ['ch5-8', '5.8 Replication'], ['ch5-9', '5.9 Leader Election'],
      ['ch5-10', '5.10 Exactly Once'], ['ch5-11', '5.11 Kafka Streams'], ['ch5-12', '5.12 Performance'],
      ['ch5-13', '5.13 Monitoring']]],
    ['6 - RabbitMQ vs Kafka', [
      ['ch6-1', '6.1 Architecture'], ['ch6-2', '6.2 Speed'], ['ch6-3', '6.3 Throughput'],
      ['ch6-4', '6.4 Latency'], ['ch6-5', '6.5 Ordering'], ['ch6-6', '6.6 Retry'],
      ['ch6-7', '6.7 Persistence'], ['ch6-8', '6.8 Scalability'], ['ch6-9', '6.9 Use Cases']]],
    ['7 - MassTransit', [
      ['ch7-1', '7.1 Introduction'], ['ch7-2', '7.2 Why MassTransit'], ['ch7-3', '7.3 Installation'],
      ['ch7-4', '7.4 Configuration'], ['ch7-5', '7.5 Publish'], ['ch7-6', '7.6 Send'],
      ['ch7-7', '7.7 Consume'], ['ch7-8', '7.8 Consumer Definition'], ['ch7-9', '7.9 Retry'],
      ['ch7-10', '7.10 Delayed Retry'], ['ch7-11', '7.11 Redelivery'], ['ch7-12', '7.12 Fault'],
      ['ch7-13', '7.13 Scheduling'], ['ch7-14', '7.14 Saga'], ['ch7-15', '7.15 State Machine'],
      ['ch7-16', '7.16 Courier Routing Slip'], ['ch7-17', '7.17 Observability'], ['ch7-18', '7.18 Health Check']]],
    ['8 - Messaging Patterns', [
      ['ch8-1', '8.1 Publish / Subscribe'], ['ch8-2', '8.2 Request / Response'],
      ['ch8-3', '8.3 Competing Consumer'], ['ch8-4', '8.4 Work Queue'], ['ch8-5', '8.5 Routing'],
      ['ch8-6', '8.6 Fanout'], ['ch8-7', '8.7 Topic'], ['ch8-8', '8.8 Saga'],
      ['ch8-9', '8.9 Process Manager'], ['ch8-10', '8.10 Choreography'], ['ch8-11', '8.11 Orchestration']]],
    ['9 - Reliability Patterns', [
      ['ch9-1', '9.1 Retry'], ['ch9-2', '9.2 Exponential Backoff'], ['ch9-3', '9.3 Circuit Breaker'],
      ['ch9-4', '9.4 Timeout'], ['ch9-5', '9.5 Bulkhead'], ['ch9-6', '9.6 Rate Limiting'],
      ['ch9-7', '9.7 Idempotency'], ['ch9-8', '9.8 Duplicate Detection'], ['ch9-9', '9.9 Poison Message'],
      ['ch9-10', '9.10 Dead Letter Queue']]],
    ['10 - Distributed Transactions', [
      ['ch10-1', '10.1 Transaction Problem in Microservices'], ['ch10-2', '10.2 Two Phase Commit'],
      ['ch10-3', '10.3 Why We Should Not Use It'], ['ch10-4', '10.4 Eventually Consistency']]],
    ['11 - Outbox Pattern', [
      ['ch11-1', '11.1 Dual Write Problem'], ['ch11-2', '11.2 What is Outbox'],
      ['ch11-3', '11.3 Creating Outbox Table'], ['ch11-4', '11.4 Background Publisher'],
      ['ch11-5', '11.5 Transaction'], ['ch11-6', '11.6 Outbox with EF Core'],
      ['ch11-7', '11.7 Outbox with MassTransit'], ['ch11-8', '11.8 Cleanup'], ['ch11-9', '11.9 Performance']]],
    ['12 - Inbox Pattern', [
      ['ch12-1', '12.1 Duplicate Message'], ['ch12-2', '12.2 What is Inbox'], ['ch12-3', '12.3 Inbox Table'],
      ['ch12-4', '12.4 Duplicate Detection'], ['ch12-5', '12.5 Exactly Once Processing'],
      ['ch12-6', '12.6 Inbox + Outbox']]],
    ['13 - Saga Pattern', [
      ['ch13-1', '13.1 Long Running Transaction'], ['ch13-2', '13.2 Choreography Saga'],
      ['ch13-3', '13.3 Orchestration Saga'], ['ch13-4', '13.4 Implementation in MassTransit']]],
    ['14 - Idempotency', [
      ['ch14-1', '14.1 Concept'], ['ch14-2', '14.2 API Design'], ['ch14-3', '14.3 Consumer Design'],
      ['ch14-4', '14.4 Database Design'], ['ch14-5', '14.5 Token'], ['ch14-6', '14.6 Unique Constraint']]],
    ['15 - Monitoring', [
      ['ch15-1', '15.1 Logging'], ['ch15-2', '15.2 Correlation Id'], ['ch15-3', '15.3 Trace Id'],
      ['ch15-4', '15.4 Distributed Tracing'], ['ch15-5', '15.5 OpenTelemetry'],
      ['ch15-6', '15.6 Prometheus'], ['ch15-7', '15.7 Grafana'], ['ch15-8', '15.8 Jaeger'],
      ['ch15-9', '15.9 Seq']]],
    ['16 - Security', [
      ['ch16-1', '16.1 SSL'], ['ch16-2', '16.2 TLS'], ['ch16-3', '16.3 Authentication'],
      ['ch16-4', '16.4 Authorization'], ['ch16-5', '16.5 JWT'], ['ch16-6', '16.6 Message Encryption'],
      ['ch16-7', '16.7 Message Signing']]],
    ['17 - Performance', [
      ['ch17-1', '17.1 Batch'], ['ch17-2', '17.2 Compression'], ['ch17-3', '17.3 Prefetch'],
      ['ch17-4', '17.4 Parallel Consumer'], ['ch17-5', '17.5 Async Consumer'], ['ch17-6', '17.6 Partitioning']]],
    ['18 - Practical Project', [
      ['ch18-1', '18.1 API Gateway'], ['ch18-2', '18.2 Identity Service'],
      ['ch18-3', '18.3 Customer Service'], ['ch18-4', '18.4 Product Service'],
      ['ch18-5', '18.5 Inventory Service'], ['ch18-6', '18.6 Order Service'],
      ['ch18-7', '18.7 Payment Service'], ['ch18-8', '18.8 Shipping Service'],
      ['ch18-9', '18.9 Notification Service']]]
  ];

  const escapeHtml = value => value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  const microservicesChapters = chapterData.map(([title, lessons]) => ({
    title,
    lessons: lessons.map(([id, lessonTitle]) => ({ id, title: lessonTitle, available: availableIds.has(id) }))
  }));
  const availableLessons = microservicesChapters.flatMap(chapter => chapter.lessons).filter(lesson => lesson.available);
  const displayLessonTitle = title => title.replace(/^\d+(?:\.\d+)+\s+/, '');

  function renderMicroservicesNavigation(currentLessonId) {
    return `
      <h2>راهنمای جامع <bdi>Microservices</bdi></h2>
      ${microservicesChapters.map(chapter => {
        const containsCurrent = chapter.lessons.some(lesson => lesson.id === currentLessonId);
        return `<details class="course-chapter"${containsCurrent ? ' open' : ''}>
          <summary><bdi>${escapeHtml(chapter.title)}</bdi></summary>
          <ol>${chapter.lessons.map(lesson => {
            const title = `<bdi>${escapeHtml(displayLessonTitle(lesson.title))}</bdi>`;
            if (lesson.available) {
              return `<li><a href="${lesson.id}.html"${lesson.id === currentLessonId ? ' aria-current="page"' : ''}>${title}</a></li>`;
            }
            return `<li><span class="lesson-soon" data-lesson-id="${lesson.id}">${title}<span class="soon-badge">به‌زودی</span></span></li>`;
          }).join('')}</ol>
        </details>`;
      }).join('')}`;
  }

  const api = { microservicesChapters, availableLessons, renderMicroservicesNavigation };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  globalScope.microservicesCourse = api;
})(typeof window !== 'undefined' ? window : globalThis);
