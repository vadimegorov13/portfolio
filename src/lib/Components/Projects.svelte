<script lang="ts">
  import type { ProjectCard } from 'src/types';
  import Card from '$lib/Components/ProjectCard.svelte';

  const projects: ProjectCard[] = [
    {
      slug: 'portfolio',
      title: 'Portfolio',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nibh arcu, volutpat eget blandit at, semper id justo. Etiam sodales dapibus neque in venenatis. Fusce fermentum volutpat vehicula. Duis varius ultricies augue id interdum. Aenean dapibus purus leo, ac rhoncus ligula tristique sed. Nulla hendrerit mi dolor, eget eleifend turpis ultrices sit amet. Mauris ac malesuada lorem. Aenean pellentesque in ipsum id commodo. Pellentesque eros velit, euismod vel tincidunt sit amet, ornare a augue.',
      github: 'https://github.com/vadimegorov13/portfolio',
      stack: ['TypeScript', 'Svelte', 'Tailwind'],
      img: 'src/lib/img/portfolio.png',
      link: '/',
      date: 'Jan. 2023',
    },
    {
      slug: 'sup4bubb4',
      title: 'sup4bubb4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nibh arcu, volutpat eget blandit at, semper id justo. Etiam sodales dapibus neque in venenatis. Fusce fermentum volutpat vehicula. Duis varius ultricies augue id interdum. Aenean dapibus purus leo, ac rhoncus ligula tristique sed. Nulla hendrerit mi dolor, eget eleifend turpis ultrices sit amet. Mauris ac malesuada lorem. Aenean pellentesque in ipsum id commodo. Pellentesque eros velit, euismod vel tincidunt sit amet, ornare a augue.',
      github: 'https://github.com/vadimegorov13/sup4bubb4',
      stack: ['TypeScript', 'Firebase', 'Svelte', 'Tailwind'],
      img: 'src/lib/img/sup4bubb4.png',
      link: 'https://sup4bubb4.com',
      date: 'Sep. 2022',
    },
    {
      slug: 'pomofriends',
      title: 'PomoFriends',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nibh arcu, volutpat eget blandit at, semper id justo. Etiam sodales dapibus neque in venenatis. Fusce fermentum volutpat vehicula. Duis varius ultricies augue id interdum. Aenean dapibus purus leo, ac rhoncus ligula tristique sed. Nulla hendrerit mi dolor, eget eleifend turpis ultrices sit amet. Mauris ac malesuada lorem. Aenean pellentesque in ipsum id commodo. Pellentesque eros velit, euismod vel tincidunt sit amet, ornare a augue.',
      github: 'https://github.com/PomoFriends/pomofriends-app',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'src/lib/img/pomofriends.png',
      link: 'https://pomofriends.app',
      date: 'May 2022',
    },
  ];
</script>

<div>
  <div class="flex flex-col md:flex-row">
    <h1 class="flex flex-row w-full justify-start text-primary text-xl">
      #<span class="text-white pr-2">projects</span> ---------------
    </h1>

    <a
      href="/works"
      class="flex w-full flex-row justify-end text-zinc-400 text-sm hover:gr-animation"
    >
      See more ->
    </a>
  </div>

  <div class="mt-10 grid gap-3 md:grid-cols-3">
    {#each projects as project}
      <Card {project} />
    {/each}
  </div>
</div>
