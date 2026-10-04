export const boodaBikeStudy = {
  title: 'Booda Bike Help Center',
  category: 'Customer support · Design engineering',
  summary: 'I designed and shipped a self-service support system that connects scattered guidance, customer questions and the forms that reach Booda Bike’s team.',
  context: 'Independent design and build · roughly three weeks · live production',
  contribution: 'Product framing, Figma contact flow, UI, frontend, content system, analytics, form infrastructure and deployment.',
  stack: 'Astro, Starlight, Vue, MDX, Pages CMS, Umami, Bunny and GitHub Actions.',
  cover: {
    src: '/api/booda-bike/images/contact-flow',
    mobileSrc: '/api/booda-bike/images/contact-flow-mobile',
    alt: 'Booda Bike contact form with customer-worded topics beside the fields they configure',
    caption: 'The contact experience connects a customer’s question to the details the team needs, captured September 2026.'
  },
  sections: [
    {
      id: 'the-problem',
      title: 'Recurring questions were costing attention on both sides',
      paragraphs: [
        'Customers had to piece together product information, service guidance and business policies to answer questions about orders, repairs, shipping, returns or warranty. Those recurring questions also created avoidable support work for the business.',
        'I treated the goal as helping riders resolve routine questions independently and giving the team better context when a person was needed. I did not have a measured baseline of support volume or resolution time.'
      ]
    },
    {
      id: 'product-framing',
      title: 'I connected answers and requests in one support journey',
      paragraphs: [
        'A useful answer might be an article, an order-status link, a warranty explanation or a request that includes a photo. The Help Center connected these routes in one journey.',
        'I used Starlight for search and article navigation, then designed the Booda-specific homepage, content patterns and contact flow around what the customer was trying to do.'
      ],
      flow: {
        label: 'The customer support journey',
        steps: [
          { title: 'Question', detail: 'An order, product, repair or policy issue' },
          { title: 'Find a route', detail: 'Search, familiar topics and common tasks' },
          { title: 'Act on guidance', detail: 'Steps, safety advice, policies or relevant parts' },
          { title: 'Get help', detail: 'A request shaped by the customer’s intent' }
        ],
        caption: 'The product connects self-service guidance with a contextual route to human support.'
      },
      figures: [
        {
          src: '/api/booda-bike/images/help-center-home',
          alt: 'Booda Bike Help Center homepage with search, customer topics and direct support routes',
          caption: 'The Help Center entry point pairs search with seven topics and common tasks, captured September 2026.',
          label: 'Entry point',
          takeaway: 'Search, familiar topics and common tasks give different questions a clear place to start.'
        }
      ]
    },
    {
      id: 'content-decisions',
      title: 'The article system brings decisions into context',
      paragraphs: [
        'Seven homepage topics and search give riders a starting point without exposing the structure of the underlying MDX library. Within an article, the next action depends on the question: the shipping guide separates delayed, damaged and missing deliveries, while troubleshooting can surface a warranty option before repair steps.',
        'I built reusable notices, related-product cards and references to shared Terms & Conditions clauses. Editors can add these through structured Pages CMS fields, so product, policy and support guidance can stay connected without building a custom page each time.'
      ],
      figures: [
        {
          src: '/api/booda-bike/images/shipping-article',
          alt: 'Shipping Issues article with category navigation and guidance for different delivery problems',
          caption: 'Different shipping problems lead to different next steps, captured September 2026.',
          label: '01 / Task guidance',
          takeaway: 'The article splits a broad shipping question into the situations a rider can actually recognise.'
        },
        {
          src: '/api/booda-bike/images/warranty-notice',
          mobileSrc: '/api/booda-bike/images/warranty-notice-mobile',
          alt: 'Shimano rear-wheel guide showing a warranty notice before the repair steps',
          caption: 'A reusable warranty notice appears before the repair steps, captured October 2026.',
          label: '02 / Warranty notice',
          takeaway: 'The warranty option appears before a rider commits to a repair, where it can change the next decision.'
        },
        {
          src: '/api/booda-bike/images/related-products',
          mobileSrc: '/api/booda-bike/images/related-products-mobile',
          alt: 'Shimano rear-wheel guide showing three related product cards after the instructions',
          caption: 'Relevant parts appear after the guidance, captured October 2026.',
          label: '03 / Related products',
          takeaway: 'Relevant parts follow the instructions, keeping the article useful before it asks for a purchase.'
        }
      ]
    },
    {
      id: 'contact-flow',
      title: 'The form asks for the right context, then adapts',
      paragraphs: [
        'I designed the contact journey in Figma and built it in Vue. People choose a topic in their own terms, such as “Where is my order?” or “Return a product.” That choice determines the guidance and details the form asks for. Returns open a dedicated flow; an order question can point to the account before a message is sent.',
        'A small rules-based check can suggest a different topic as someone writes, while preserving their draft if they accept. This connects support triage to the customer’s words without silently rerouting their request.'
      ],
      walkthrough: {
        label: 'Select a route, then see what changes',
        frames: [
          {
            title: 'Choose a question',
            description: 'Customer-worded topics sit beside the form they configure.',
            src: '/api/booda-bike/images/contact-flow',
            mobileSrc: '/api/booda-bike/images/contact-flow-mobile',
            alt: 'Contact form before a topic is selected, showing ten customer-worded choices'
          },
          {
            title: 'See the relevant route',
            description: 'Selecting “Return a product” reveals policy context and the return details to provide.',
            src: '/api/booda-bike/images/return-flow',
            mobileSrc: '/api/booda-bike/images/return-flow-mobile',
            alt: 'Contact form with Return a product selected and relevant policy and form fields visible'
          }
        ],
        caption: 'Still captures of the live interface, September–October 2026.'
      }
    },
    {
      id: 'production',
      title: 'The same design decisions reached production',
      paragraphs: [
        'I owned the interface and the implementation. Astro and Starlight supplied the documentation foundation; custom Vue pages and MDX components carried the Booda-specific interactions. Pages CMS lets editors change article content, and a GitHub workflow builds and deploys the static site to Bunny. I used LLM assistance throughout exploration and implementation while making and reviewing the product decisions myself.',
        'The contact flow also needed to handle large photos and videos. I built a Bunny Edge Script that validates requests, issues short-lived upload URLs for private storage and sends protected file links rather than email attachments. An invisible ALTCHA proof-of-work challenge limits automated form abuse. Rate limiting was documented as a deployment control, not a result I can verify here.'
      ],
      system: {
        paths: [
          {
            label: 'Content path',
            steps: ['Pages CMS', 'MDX + components', 'GitHub Actions', 'Bunny CDN']
          },
          {
            label: 'Contact path',
            steps: ['Vue form', 'ALTCHA', 'Bunny Edge Script', 'Private uploads']
          }
        ],
        caption: 'I designed and implemented both paths; the shared aim was to make support useful to customers and maintainable after handoff.'
      }
    },
    {
      id: 'iteration',
      title: 'Session replays exposed a noisy first selector',
      paragraphs: [
        'I instrumented page entry, topic choice, form starts, submissions and outcomes with Umami. Reviewing those signals and session replays was especially useful while developing the contact experience.',
        'The first selector used ten cards with category tags, titles and explanatory text, followed by a separate form that automatically scrolled into view. Replays showed that presentation was too noisy. I shortened the labels, removed the extra card copy, placed the choices inside the form and removed the automatic scroll. The number of topics did not change; the decision became easier to scan.'
      ],
      comparison: {
        before: {
          label: 'Earlier implementation',
          title: 'More to read before choosing',
          details: ['Category tag, heading and description on each card', 'Selector and form in separate sections', 'Automatic scroll after choosing a topic'],
          sample: { tag: 'Order Status', title: 'Where is my order?', description: 'Order tracking' },
          placement: 'Choose topic → scroll to separate form'
        },
        after: {
          label: 'Revised implementation',
          title: 'Short choices in the form',
          details: ['Customer-worded labels without extra card copy', 'Choices beside the fields they configure', 'No automatic scroll'],
          sample: { title: 'Where is my order?' },
          placement: 'Choose topic → fields adapt in place'
        },
        caption: 'Source-based reconstruction of one card from the July 2026 selector revision. The live screenshot above shows the revised interface; no earlier screenshot is available.'
      }
    },
    {
      id: 'impact',
      title: 'The system shipped; business impact still needs measurement',
      paragraphs: [
        'The live product now offers search, task guidance, policy context, contextual contact and return flows, and an editing path for future content owners. The replay-led selector change is one documented example of evidence-informed iteration.',
        'The intended business value is fewer repetitive support questions and more complete requests when customers do need help. I do not have verified ticket-deflection, response-time, task-success or conversion data, so I cannot claim those outcomes.'
      ],
      evidence: [
        { label: 'Shipped', detail: 'Search, task guidance, reusable article components, contextual forms and an editing path are live.' },
        { label: 'Learned', detail: 'Umami events and session replays informed the selector simplification during development.' },
        { label: 'Not measured', detail: 'Ticket deflection, response time, task completion and conversion have no verified results here.' }
      ]
    },
    {
      id: 'after-handoff',
      title: 'An operating loop would sustain the Help Center',
      paragraphs: [
        'I left Pages CMS fields, an editor guide and a deployment workflow so a content owner could continue the library without editing frontend code. My collaboration later ended, so I cannot verify how the system was used or maintained afterward.',
        'I would next finish incomplete articles, keep product and policy details current, compare Umami paths with real support themes, and test whether riders complete common tasks. I would also confirm operational controls such as rate limits and file-retention handling before treating the support system as mature.'
      ]
    }
  ]
} as const
