import type { Job } from '$lib/types';

// Newest first. `summary` shows on the home page, `points` on /about.
export const experience: Job[] = [
  {
    role: 'Student Assistant II, Dean’s Office',
    org: 'University of Alaska Anchorage, College of Engineering',
    dates: 'Jan 2026 – Present',
    summary:
      'Technical projects and operations for the College of Engineering, including automation tools for repetitive admin work.',
    points: [
      'Built a certificate automation system that cut a 3-hour manual batch to about 5 minutes.',
      'Implemented a backup system for the College of Engineering website.',
      'Restored the Augmented Reality Sandbox and manage its software, documentation, and equipment.',
      'Run college events, student tours, and Professional Development Seminars.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    org: 'Flyntlok',
    href: 'https://www.flyntlok.com',
    dates: 'Jun 2026 – Aug 2026',
    summary:
      'Product telemetry, analytics infrastructure, and developer tooling, built on PostHog.',
    points: [
      'Designed and implemented a product telemetry and analytics system with PostHog.',
      'Built a control system to configure event collection per user, location, and tenant, keeping analytics volume and cost in check.',
      'Made internal tools to review instrumented UI elements and to build PostHog dashboards on usage and adoption.',
      'Developed AI-assisted tools that speed up instrumenting new features and events.',
    ],
  },
  {
    role: 'Software Developer',
    org: 'Flyntlok',
    href: 'https://www.flyntlok.com',
    dates: 'Apr 2023 – Dec 2025',
    summary:
      'Full-stack work on a multi-tenant dealer management platform. Led development of the Sales Project module.',
    points: [
      'Built full-stack features across sales, inventory, service, financial, and purchasing workflows.',
      'Led Sales Project, a large module that carried a deal through quoting, purchasing, approvals, and sales.',
      'React and TypeScript front ends, API layers, and SQL-heavy backend logic focused on data integrity and performance.',
      'State management for data-heavy UIs: mutation-aware workflows, synchronization, and consistency across components.',
      'Relational data modeling and query optimization for high-volume operational data.',
    ],
  },
  {
    role: 'eLearning Technology Student Technician',
    org: 'University of Alaska Anchorage',
    dates: 'Aug 2021 – Dec 2022',
    summary:
      'Technical support for eLearning classrooms in the College of Engineering.',
    points: [
      'Supported students, faculty, and staff with classroom audio/video, recordings, and troubleshooting.',
      'Helped with workstation and website maintenance.',
    ],
  },
  {
    role: 'Student Assistant C',
    org: 'University of Alaska Anchorage',
    dates: 'May 2022 – Aug 2022',
    summary:
      'Classroom support: carried out lesson plans and helped students with assignments.',
    points: [
      'Implemented lead teachers’ lesson plans and kept daily classroom schedules.',
      'Helped students with assignments and kept parents, staff, and faculty updated on progress.',
    ],
  },
];
