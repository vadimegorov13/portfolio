export type Link = {
  href?: string;
  icon?: string;
  name?: string;
  value?: string;
  description?: string;
};

export type ProjectCard = {
  id: number;
  slug: string;
  title: string;
  description: string;
  github: string;
  stack: string[];
  date?: string;
  img?: string;
  link?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** used on cards when the full title is too long */
  shortTitle?: string;
  /** one-word tag on cards, e.g. Product, Research */
  type: string;
  /** longer tag on /projects */
  category: string;
  date: string;
  year: number;
  /** one or two sentences for cards */
  summary: string;
  /** full paragraph for /projects */
  description: string;
  stack: string[];
  img?: string;
  live?: string;
  github?: string;
  read?: string;
  /** link to a dataset paper or page */
  dataset?: string;
  status?: 'wip';
  featured?: boolean;
  /** headline numbers, e.g. { value: '3h → 5min', label: 'per batch' } */
  metrics?: { value: string; label: string }[];
  /** extra write-up blocks on /projects (problem, solution, ...) */
  sections?: { title: string; body: string }[];
};

export type Job = {
  role: string;
  org: string;
  href?: string;
  dates: string;
  summary: string;
  points: string[];
};

export type StackItem = {
  name: string;
  /** file name in /static/stack without .svg */
  icon?: string;
  /** for dark logos that vanish on the dark background */
  invert?: boolean;
};

export type StackGroup = {
  title: string;
  items: StackItem[];
};
