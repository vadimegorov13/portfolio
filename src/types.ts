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
  img?: string;
  link?: string;
};
