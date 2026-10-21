import type { StackGroup } from '$lib/types';

// Icons live in /static/stack (Devicon / Iconify "logos" SVGs). Items without
// an icon render as text tiles. `invert` is for black logos on the dark theme.
export const stackGroups: StackGroup[] = [
  {
    title: 'Languages',
    items: [
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Python', icon: 'python' },
      { name: 'Swift', icon: 'swift' },
      { name: 'Java', icon: 'java' },
      { name: 'SQL', icon: 'sql', invert: true },
    ],
  },
  {
    title: 'Web',
    items: [
      { name: 'Svelte', icon: 'svelte' },
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'nextjs', invert: true },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'GraphQL', icon: 'graphql' },
      { name: 'Tailwind', icon: 'tailwindcss' },
    ],
  },
  {
    title: 'Data & Cloud',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Google Cloud', icon: 'googlecloud' },
      { name: 'Firebase', icon: 'firebase' },
      { name: 'PostHog', icon: 'posthog' },
    ],
  },
  {
    title: 'Machine Learning',
    items: [
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'NumPy', icon: 'numpy' },
      { name: 'pandas', icon: 'pandas' },
      { name: 'Matplotlib', icon: 'matplotlib' },
      { name: 'Jupyter', icon: 'jupyter' },
    ],
  },
  {
    title: 'AI Tools',
    items: [
      { name: 'Claude', icon: 'claude' },
      { name: 'ChatGPT', icon: 'openai', invert: true },
      { name: 'GitHub Copilot', icon: 'copilot', invert: true },
      { name: 'Hugging Face', icon: 'huggingface' },
      { name: 'MCP servers', icon: 'mcp', invert: true },
    ],
  },
  {
    title: 'Tools',
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'Xcode', icon: 'xcode' },
      { name: 'Docker', icon: 'docker' },
      // { name: 'Figma', icon: 'figma' },
    ],
  },
];
