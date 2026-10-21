import type { Project } from '$lib/types';

// To add a project: append an entry below and drop its screenshot into
// /static. `featured: true` puts it in the home page strip; every project
// shows on /projects, newest first by `year`.
export const projects: Project[] = [
  {
    slug: 'human-activity',
    title: 'Teaching models to understand human activity',
    shortTitle: 'Human activity models',
    type: 'M.S. Thesis',
    category: 'M.S. Thesis / Machine Learning',
    date: 'Now',
    year: 2026,
    summary:
      'My M.S. thesis: models that understand everyday human activity from multimodal biosignals. Still training, details soon.',
    description:
      'My M.S. thesis on teaching models to understand everyday human activity from multimodal biosignals. It is still training, details soon.',
    sections: [
      {
        title: 'Dataset',
        body: 'The work uses the EASE Table Setting Dataset (Meier et al., Scientific Data, 2026): 78 sessions of people setting a table, each recorded with eight synchronized streams, including motion capture, first-person and room video, eye tracking, EMG, EDA, acceleration, audio, and EEG. It is annotated by phase, activity, motion, and the objects people interact with.',
      },
    ],
    stack: ['Python', 'Multimodal biosignals', 'Representation learning'],
    dataset: 'https://www.nature.com/articles/s41597-026-07077-7',
    status: 'wip',
    featured: true,
  },
  {
    slug: 'certificate-automation',
    title: 'Certificate Automation System',
    shortTitle: 'Certificate Automation',
    type: 'Automation',
    category: 'Internal Tool / UAA Dean’s Office',
    date: 'Aug. 2026',
    year: 2026,
    summary:
      'An internal tool for UAA’s Dean’s Office that turns a roster and a template into 100+ personalized certificate PDFs. Cut a ~3 hour manual batch to ~5 minutes.',
    description:
      'An internal automation tool for the University of Alaska Anchorage Dean’s Office that reduced a repetitive certificate-generation workflow from approximately 3 hours of manual work to about 5 minutes.',
    sections: [
      {
        title: 'The problem',
        body: 'I was tasked with generating individual certificates for more than 100 students. The existing process was almost entirely manual: take a template, type each student’s name, export a PDF, name the file, and repeat for every recipient. A single batch took about three hours.',
      },
      {
        title: 'The solution',
        body: 'Staff now drop the student roster and certificate template into a Google Drive folder and hand that folder to the app. It verifies the files, reads and normalizes names, finds the name placeholder in the template, generates a PDF for every student, and organizes the results into an output folder. It is built for non-technical staff: a few clicks, file validation, progress, clear error messages, retries, and the ability to stop and resume a batch.',
      },
      {
        title: 'Impact',
        body: 'The tool is now used by the Dean’s Office for certificate generation, freeing staff time for higher-value work.',
      },
    ],
    metrics: [
      { value: '3h → 5min', label: 'per batch' },
      { value: '~97%', label: 'less processing time' },
      { value: '~36×', label: 'faster workflow' },
      { value: '100+', label: 'certificates per batch' },
    ],
    stack: ['Google Apps Script', 'JavaScript', 'HTML/CSS', 'Google Drive API'],
    img: 'certificate-generator.png',
    featured: true,
  },
  {
    slug: 'pomofriends',
    title: 'PomoFriends',
    type: 'Product',
    category: 'Product / Full-stack',
    date: '2022 – now',
    year: 2026,
    summary:
      'A free Pomodoro timer with a social twist: focus solo, or with friends in shared focus rooms with a synced timer, chat, tasks, and streaks.',
    description:
      'PomoFriends is a free, ad-free Pomodoro timer built around accountability. You can focus solo, or open a focus room and work alongside friends, "study with me" style. I first built it in 2022 and rebuilt it from scratch in 2026 with SvelteKit.',
    sections: [
      {
        title: 'The problem',
        body: 'There are plenty of Pomodoro apps, but almost none of them are social. The few that support groups have no shared timer, no chat, and no way to see who else is working, so nothing keeps you accountable.',
      },
      {
        title: 'The solution',
        body: 'Focus rooms come in two modes. Sync rooms share one timer that the whole group follows; async rooms let everyone run their own timer while still seeing who is focusing. Chat opens during breaks and closes during focus, so it never becomes the distraction. Built-in tasks let you estimate and track pomodoros per task.',
      },
      {
        title: 'Today',
        body: 'The 2026 revamp put rooms at the center of the app and added stats, streaks that follow your timezone, a leaderboard, themes, and guided tours. The timer, tasks, and stats work without an account; signing up adds rooms and syncs your data across devices. Product usage is measured with PostHog.',
      },
    ],
    metrics: [
      { value: '2', label: 'room modes, sync & async' },
      { value: '5', label: 'releases since the Aug 2026 revamp' },
      { value: '0', label: 'ads, free to use' },
      { value: 'v3.2', label: 'current version' },
    ],
    stack: ['TypeScript', 'SvelteKit', 'Firebase', 'PostHog'],
    img: 'pomofriends.png',
    live: 'https://pomofriends.com',
    // original 2022 Next.js version, not shown on the site right now:
    // github: 'https://github.com/PomoFriends/pomofriends-app',
    featured: true,
  },
  {
    slug: 'sup4bubb4',
    title: 'sup4bubb4',
    type: 'Platform',
    category: 'Web Platform / Full-stack',
    date: 'Sep. 2022',
    year: 2022,
    summary:
      'Compiles song requests from Amelia Watson’s livestreams and syncs them with the YouTube VODs, so fans can follow the queue after the stream.',
    description:
      'A web platform for the VTuber community that compiles song requests from Amelia Watson’s superchat-reading streams and syncs them with the recorded VODs on YouTube.',
    sections: [
      {
        title: 'The problem',
        body: 'During these streams, song requests come in through bubb4bot (Twitch channel). Once the stream ends, the request queue is gone, and anyone watching the VOD later has no way to see which songs were requested and when.',
      },
      {
        title: 'The solution',
        body: 'A Firebase Cloud Function checks for new livestreams and triggers collection of the request queue from the StreamElements API. The site pairs each VOD with its queue: pick a VOD, and the embedded YouTube player and the bubb4bot queue sync up for you.',
      },
      {
        title: 'Details',
        body: 'Fully automated after setup, with no manual work per stream. The interface is responsive, so it works on phones as well as desktops.',
      },
    ],
    stack: [
      'TypeScript',
      'Svelte',
      'Firebase',
      'Cloud Functions',
      'Tailwind',
      'StreamElements API',
      'YouTube embed',
    ],
    img: 'sup4bubb4.png',
    live: 'https://sup4bubb4.com',
    github: 'https://github.com/vadimegorov13/sup4bubb4',
    featured: true,
  },
  {
    slug: 'predicting-student-learning-outcomes-using-eeg-correlation',
    title:
      'Predicting Student Learning Outcomes using EEG Correlation with Teacher/Expert Neural Activity',
    shortTitle: 'EEG Learning Outcomes',
    type: 'Research',
    category: 'Research / Study Design',
    date: 'Dec. 2022',
    year: 2022,
    summary:
      'A study design that asks whether a student’s brain-to-brain EEG correlation with the teacher can predict how much they learn.',
    description:
      'A research study design exploring whether a student’s learning outcomes can be predicted from how closely their brain activity tracks the teacher’s and experts’, measured with wireless EEG in a naturalistic setting.',
    sections: [
      {
        title: 'The question',
        body: 'An fMRI study (Nguyen et al., 2022) showed that learning is reflected in brain-to-brain correlation between teachers and students. It was still open whether the same holds with wireless EEG outside a scanner, and whether that correlation can predict a student’s learning outcomes.',
      },
      {
        title: 'Study design',
        body: 'Record the teacher’s EEG while giving a lecture and two experts’ EEG while watching it. 100 students watch either the original lecture, a shortened version, or a scrambled version, with tests before and after. Inter-subject correlation (ISC) between each student and the teacher and experts is then compared with their learning gains.',
      },
      {
        title: 'Why EEG',
        body: 'EEG has lower spatial resolution than fMRI, but millisecond timing, low cost, and portability mean it can run in a real classroom. If the correlation predicts learning, it could help evaluate teaching strategies and personalize learning plans.',
      },
    ],
    metrics: [
      { value: '100', label: 'students, planned' },
      { value: '3', label: 'lecture conditions' },
      { value: '1 + 2', label: 'teacher + expert recordings' },
      { value: 'ISC', label: 'core measure' },
    ],
    stack: ['EEG', 'Inter-subject correlation', 'Neuroscience', 'Study design'],
    img: 'eeg.jpeg',
    read: 'https://docs.google.com/document/d/e/2PACX-1vRhIXIMdK_THCrDiCFVUoPwRJJx9idk9eNi3z67r_S1mKSYXECP9I7q8scigBF9Og/pub',
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// order used on /projects and in the sidebar: in-progress first, then newest
export const orderedProjects = [...projects].sort(
  (a, b) =>
    Number(b.status === 'wip') - Number(a.status === 'wip') || b.year - a.year
);

export const projectLinks = (p: Project) =>
  [
    p.live && { label: 'Live', href: p.live },
    p.github && { label: 'GitHub', href: p.github },
    p.read && { label: 'Read', href: p.read },
    p.dataset && { label: 'Dataset', href: p.dataset },
  ].filter((l): l is { label: string; href: string } => Boolean(l));
