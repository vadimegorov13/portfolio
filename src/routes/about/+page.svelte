<script lang="ts">
  import type { SkillList } from 'src/types';
  import Icon from '@iconify/svelte';

  const skills: SkillList = {
    langs: [
      {
        name: 'TypeScript',
        icon: 'logos:typescript-icon',
      },
      {
        name: 'JavaScript',
        icon: 'logos:javascript',
      },
      {
        name: 'Python',
        icon: 'logos:python',
      },
      {
        name: 'Java',
        icon: 'logos:java',
      },
      {
        name: 'GO',
        icon: 'vscode-icons:file-type-go',
      },
      {
        name: 'C',
        icon: 'logos:c',
      },
      {
        name: 'C++',
        icon: 'logos:c-plusplus',
      },
      {
        name: 'C#',
        icon: 'logos:c-sharp',
      },
      {
        name: 'Lua',
        icon: 'logos:lua',
      },
      {
        name: 'Haskell',
        icon: 'logos:haskell-icon',
      },
    ],
    technologies: [
      {
        name: 'ReactJS',
        icon: 'logos:react',
      },
      {
        name: 'NextJS',
        icon: 'logos:nextjs-icon',
      },
      {
        name: 'Svelte',
        icon: 'logos:svelte-icon',
      },
      {
        name: 'VueJS',
        icon: 'logos:vue',
      },
      {
        name: 'NodeJS',
        icon: 'logos:nodejs',
      },
      {
        name: 'Firebase',
        icon: 'logos:firebase',
      },
      {
        name: 'AWS',
        icon: 'logos:aws',
      },
      {
        name: 'Azure',
        icon: 'logos:microsoft-azure',
      },
      {
        name: 'Docker',
        icon: 'logos:docker-icon',
      },
      {
        name: 'Linux',
        icon: 'logos:linux-tux',
      },
      {
        name: 'MongoDB',
        icon: 'vscode-icons:file-type-mongo',
      },
      {
        name: 'PostgreSQL',
        icon: 'logos:postgresql',
      },
      {
        name: 'GraphQL',
        icon: 'logos:graphql',
      },
      {
        name: 'MySQL',
        icon: 'logos:mysql',
      },
      {
        name: 'Tensorflow',
        icon: 'logos:tensorflow',
      },
      {
        name: 'Jupyter',
        icon: 'logos:jupyter',
      },
      {
        name: 'Git',
        icon: 'logos:git-icon',
      },
      {
        name: 'HTML',
        icon: 'logos:html-5',
      },
      {
        name: 'CSS',
        icon: 'logos:css-3',
      },
      {
        name: 'Tailwindcss',
        icon: 'logos:tailwindcss-icon',
      },
    ],
  };
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="flex flex-col gap-20">
  <div>
    <h1 class="text-xl font-semibold">
      <span class="text-primary">/</span>about-me
    </h1>
    <div class="text-zinc-400 flex flex-col gap-10">
      <p>Hi there,</p>
      <p>
        I am Vadim Egorov, a recent computer science graduate with a minor in
        mathematics from University of Alaska Anchorage. My education has
        provided me with proficiency in Python and Java and hands-on experience
        in data analysis and machine learning. Additionally, I am a self-taught
        web developer with strong skills in TypeScript and various web dev
        frameworks. I am capable of building and maintaining modern web
        applications, with a focus on back-end development and server-side
        logic.
      </p>

      <p>
        I have a deep passion for technology and a drive to stay up-to-date with
        the latest advancements in the field. In addition to technology, I am
        also interested in education, history, music, and art.
      </p>

      <p>
        I am seeking a software development role where I can put my technical
        skills and passion to use and continue to learn and grow as a developer.
      </p>
    </div>
  </div>

  <div class="flex flex-col gap-10">
    <h1 class="text-xl font-semibold">
      <span class="text-primary">#</span>skills
    </h1>

    <div class="flex flex-col gap-10">
      <p class="flex justify-start">
        <span class="text-primary">-</span>Programming Languages
      </p>
      <div class="flex justify-center">
        <div class="grid grid-cols-4 smd:grid-cols-5 gap-8">
          {#each skills.langs as lang}
            <div class="flex flex-col gap-1 justify-center items-center">
              <Icon icon={lang.icon} class="text-5xl text-zinc-400" />
              <p class="text-sm">{lang.name}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-10">
      <p class="flex justify-start">
        <span class="text-primary">-</span>Technologies
      </p>
      <div class="flex justify-center">
        <div class="grid grid-cols-4 smd:grid-cols-5 gap-8">
          {#each skills.technologies as tech}
            <div class="flex flex-col gap-1 justify-center items-center">
              <Icon icon={tech.icon} class="text-5xl" />
              <p class="text-sm">{tech.name}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
