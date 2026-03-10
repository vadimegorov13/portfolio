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

type Skill = {
  icon?: string;
  name: string;
};

export type SkillList = {
  langs: Skill[];
  technologies: Skill[];
};
