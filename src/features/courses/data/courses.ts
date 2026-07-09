export type LectureSection = {
  title: string
  body: string
}

export type Course = {
  slug: string
  title: string
  category: string
  module: string
  accent: string
  description: string
  lectureTitle: string
  sections: LectureSection[]
}

export const courses: Course[] = [
  {
    slug: 'visual-architecture',
    title: 'Visual Architecture & Structure',
    category: 'Core Framework',
    module: 'Module 1.1',
    accent: '#18d6a3',
    description:
      'Master alignment rules, whitespace constraints, and information density layouts.',
    lectureTitle:
      'Introduction to Visual Architecture & Clean Structural Engineering',
    sections: [
      {
        title: 'Layout Foundations',
        body: 'Strong interfaces begin with a clear layout system. Before adding more visual treatment, define how content should align, breathe, and guide the reader from one decision to the next.',
      },
      {
        title: 'Whitespace Parameters',
        body: "Whitespace is not empty space. It is a functional component that groups content, lowers friction, and helps students understand which information belongs together.",
      },
      {
        title: 'Content Hierarchies',
        body: 'Every block of lecture content should satisfy one goal. Use headings, spacing, and supporting text to separate ideas instead of overcrowding a single section.',
      },
    ],
  },
  {
    slug: 'advanced-state-management',
    title: 'Advanced State Management',
    category: 'Data Systems',
    module: 'Module 2.1',
    accent: '#9b5cff',
    description:
      'Deep architectural exploration covering immutable global data spaces.',
    lectureTitle: 'Advanced State Management for Predictable Interfaces',
    sections: [
      {
        title: 'State Boundaries',
        body: 'Healthy applications separate local interaction state from shared product state. This keeps components predictable and prevents unrelated screens from rerendering unnecessarily.',
      },
      {
        title: 'Immutable Updates',
        body: 'Immutable updates make state changes easier to track, compare, and test. Treat every update as a new snapshot instead of a mutation of old data.',
      },
      {
        title: 'Data Flow',
        body: 'Data should move through the interface in a direction that developers can reason about. When the flow is clear, debugging becomes dramatically easier.',
      },
    ],
  },
  {
    slug: 'nextjs-fundamentals',
    title: 'Next.js Fundamentals',
    category: 'Web Platform',
    module: 'Module 3.1',
    accent: '#3b82f6',
    description:
      'Learn routing, layouts, pages, styling, and deployment with modern Next.js.',
    lectureTitle: 'Building Pages with the Next.js App Router',
    sections: [
      {
        title: 'Routing Model',
        body: 'The App Router maps folders to URL segments and uses page files to render route content. This makes navigation structure visible directly in your project.',
      },
      {
        title: 'Shared Layouts',
        body: 'Layouts keep persistent interface around changing page content. Use them for navigation, shell structure, and route groups that should feel connected.',
      },
      {
        title: 'Production Readiness',
        body: 'A reliable Next.js page should pass linting, type checking, and a production build before it is considered complete.',
      },
    ],
  },
  {
    slug: 'react-ui-components',
    title: 'React UI Components',
    category: 'Frontend',
    module: 'Module 4.1',
    accent: '#06b6d4',
    description:
      'Build reusable, accessible, and clean components for real projects.',
    lectureTitle: 'Designing Reusable React Component Systems',
    sections: [
      {
        title: 'Component Purpose',
        body: 'A good component has a clear job. It should hide implementation detail without hiding the important decisions a page needs to make.',
      },
      {
        title: 'Props Design',
        body: 'Props are the public API of a component. Keep them explicit, typed, and shaped around real usage instead of future possibilities.',
      },
      {
        title: 'Composition',
        body: 'Composition lets small pieces create flexible experiences. Prefer clear component boundaries over large components with many conditional branches.',
      },
    ],
  },
  {
    slug: 'dashboard-design',
    title: 'Dashboard Design',
    category: 'UI Design',
    module: 'Module 5.1',
    accent: '#f59e0b',
    description:
      'Design clean dashboards with tables, filters, cards, and useful page states.',
    lectureTitle: 'Dashboard Interfaces for Repeated Operational Work',
    sections: [
      {
        title: 'Information Density',
        body: 'Dashboards should help users scan, compare, and act. Use space carefully so repeated tasks remain efficient without becoming visually noisy.',
      },
      {
        title: 'Control Placement',
        body: 'Filters, actions, and navigation should live where users naturally look before making a decision. Avoid hiding core controls behind decorative layouts.',
      },
      {
        title: 'Page States',
        body: 'Loading, empty, filtered, and error states are part of the product. Design them with the same care as the happy path.',
      },
    ],
  },
  {
    slug: 'authentication-flow',
    title: 'Authentication Flow',
    category: 'Full Stack',
    module: 'Module 6.1',
    accent: '#ef4444',
    description:
      'Create login, register, protected pages, and user session handling.',
    lectureTitle: 'Authentication Flows for Product Applications',
    sections: [
      {
        title: 'Entry Points',
        body: 'Authentication begins before the form. Clear entry points, labels, and recovery paths reduce user confusion and support trust.',
      },
      {
        title: 'Session Handling',
        body: 'A session connects identity to product access. Keep protected pages predictable and avoid exposing private views while session state is loading.',
      },
      {
        title: 'Failure Paths',
        body: 'Invalid credentials, expired sessions, and network errors should be handled with precise feedback and a clear next step.',
      },
    ],
  },
]

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug)
}

export function getNextCourse(slug: string) {
  const currentIndex = courses.findIndex((course) => course.slug === slug)

  if (currentIndex === -1) {
    return undefined
  }

  return courses[currentIndex + 1] ?? courses[0]
}
