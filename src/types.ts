export type Link = {
  href?: string;
  icon?: string;
  name?: string;
  description?: string;
};

export type ProjectCard = {
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
