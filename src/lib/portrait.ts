// Shared bits of the "Portrait" page style: a color per kind of project and
// per place of work, the "now" list, and job lengths like "2 yr 9 mo".
import type { Project } from '$lib/types';
import { MS_PROGRAM_URL } from '$lib/data/education';

export const ACCENT = {
  pink: 'var(--color-primary)',
  blue: 'var(--color-accent-blue)',
  amber: 'var(--color-accent-amber)',
  green: 'var(--color-accent-green)',
  violet: 'var(--color-accent-violet)',
};

// the same kind of project gets the same color everywhere
const TYPE_COLOR: Record<string, string> = {
  Product: ACCENT.pink,
  Platform: ACCENT.pink,
  Automation: ACCENT.amber,
  Tooling: ACCENT.green,
  Tool: ACCENT.green,
  Analytics: ACCENT.blue,
  Research: ACCENT.violet,
  'M.S. Thesis': ACCENT.violet,
};
export const projectColor = (p: Project) => TYPE_COLOR[p.type] ?? ACCENT.blue;

// experience is newest first: Dean's Office, Flyntlok intern, Flyntlok dev, …
const JOB_COLORS = [
  ACCENT.pink,
  ACCENT.blue,
  ACCENT.amber,
  ACCENT.green,
  ACCENT.violet,
];
export const jobColor = (i: number) => JOB_COLORS[i % JOB_COLORS.length];

// "University of Alaska Anchorage, …" → "UAA", "Flyntlok" → "FL"
export function orgInitials(org: string) {
  const words = org.split(',')[0].trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0])
    .join('')
    .slice(0, 3);
}

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
/** "Apr 2023 – Dec 2025" → "2 yr 9 mo" */
export function duration(dates: string) {
  const [a, b] = dates.split('–').map((s) => s.trim());
  const toN = (s: string) => {
    if (/present/i.test(s)) {
      const d = new Date();
      return d.getFullYear() * 12 + d.getMonth();
    }
    const [m, y] = s.split(' ');
    return Number(y) * 12 + MONTHS.indexOf(m.slice(0, 3));
  };
  const n = toN(b) - toN(a) + 1;
  const y = Math.floor(n / 12);
  const mo = n % 12;
  return [y && `${y} yr`, mo && `${mo} mo`].filter(Boolean).join(' ');
}

// what I'm doing now (hero on home and about)
export const nowItems = () => [
  { color: ACCENT.pink, text: 'M.S. in AI at UAA', href: MS_PROGRAM_URL },
  { color: ACCENT.green, text: 'Student Assistant II, Dean’s Office' },
  {
    color: ACCENT.blue,
    text: `${duration('Apr 2023 – Present')} shipping software`,
  },
];
