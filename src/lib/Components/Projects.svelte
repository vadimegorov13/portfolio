<script lang="ts">
  import type { ProjectCard } from 'src/types';
  import Card from '$lib/Components/ProjectCard.svelte';

  const projects: ProjectCard[] = [
    {
      slug: 'pomofriends',
      title: 'PomoFriends',
      description:
        'PomoFriends is a web application that helps users increase productivity using the Pomodoro Technique. It includes features such as group creation and messaging to encourage accountability and facilitate collaboration among users.',
      github: 'https://github.com/PomoFriends/pomofriends-app',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'pomofriends.png',
      link: 'https://pomofriends.app',
      date: 'May 2022',
    },
    {
      slug: 'predicting-student-learning-outcomes-using-eeg-correlation',
      title: 'Predicting Student Learning Outcomes with EEG Correlation',
      description:
        'I designed a study which aimed to investigate the relationship between student learning outcomes and brain activity correlation between a student and a teacher using electroencephalography (EEG).',
      github: '',
      stack: ['Neuroscience', 'EEG'],
      img: 'eeg.jpeg',
      link: 'https://docs.google.com/document/d/e/2PACX-1vRhIXIMdK_THCrDiCFVUoPwRJJx9idk9eNi3z67r_S1mKSYXECP9I7q8scigBF9Og/pub',
      date: 'Dec. 2022',
    },
    {
      slug: 'sup4bubb4',
      title: 'sup4bubb4',
      description:
        'sup4bubb4 is a website that allows users to compile song requests from a live stream and sync them with the recording, It has a cloud function that checks for new livestreams, it was built with a responsive design and Svelte, Tailwind, Firebase, and Firebase Cloud Functions.',
      github: 'https://github.com/vadimegorov13/sup4bubb4',
      stack: ['TypeScript', 'Firebase', 'Svelte', 'Tailwind'],
      img: 'sup4bubb4.png',
      link: 'https://sup4bubb4.com',
      date: 'Sep. 2022',
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
