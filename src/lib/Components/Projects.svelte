<script lang="ts">
  import type { ProjectCard } from 'src/types';
  import Card from '$lib/Components/ProjectCard.svelte';

  const projects: ProjectCard[] = [
    {
      slug: 'sup4bubb4',
      title: 'sup4bubb4',
      description:
        "A simple app that compiles song requests from bubb4bot and Amelia Watson's superchat reading streams.",
      github: 'https://github.com/vadimegorov13/sup4bubb4',
      stack: ['TypeScript', 'Firebase', 'Svelte', 'Tailwind'],
      img: 'https://images.unsplash.com/photo-1611621052831-4fe109be83a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80',
      link: 'https://sup4bubb4.com',
    },
    {
      slug: 'pomofriends',
      title: 'PomoFriends',
      description:
        'PomoFriends is an innovative web application that promotes a healthy and productive environment by introducing social features that other Pomodoro apps lack. With messaging and task sharing capabilities, PomoFriends encourages accountability amongst its users, especially when working with others or in a group setting.',
      github: 'https://github.com/PomoFriends/pomofriends-app',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'https://images.unsplash.com/photo-1513544705284-99373737fab6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1162&q=80',
      link: 'https://pomofriends.app',
    },

    {
      slug: 'pomofriends',
      title: 'PomoFriends',
      description:
        'PomoFriends is an innovative web application that promotes a healthy and productive environment by introducing social features that other Pomodoro apps lack. With messaging and task sharing capabilities, PomoFriends encourages accountability amongst its users, especially when working with others or in a group setting.',
      github: 'https://github.com/PomoFriends/pomofriends-app',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'https://images.unsplash.com/photo-1513544705284-99373737fab6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1162&q=80',
      link: 'https://pomofriends.app',
    },
  ];

  $: current = 0;
  setInterval(() => {
    if (current == projects.length - 1) {
      current = 0;
    } else {
      current++;
    }
  }, 3000);
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
