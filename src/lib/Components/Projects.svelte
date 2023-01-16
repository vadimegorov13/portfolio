<script lang="ts">
  import type { ProjectCard } from 'src/types';
  import Card from '$lib/Components/ProjectCard.svelte';

  const projects: ProjectCard[] = [
    {
      slug: 'pomofriends',
      title: 'PomoFriends',
      description:
        "PomoFriends is a responsive web application for productivity built using the Pomodoro Technique, it includes features such as group creation and messaging to encourage accountability among users and facilitate collaboration, user authentication and authorization using Firebase authentication. To enhance performance, it uses NextJS for server-rendering pages and preloading data, and Firebase's real-time database to store and manage user data and app functionality.",
      github: 'https://github.com/PomoFriends/pomofriends-app',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'src/lib/img/pomofriends.png',
      link: 'https://pomofriends.app',
      date: 'May 2022',
    },
    {
      slug: 'predicting-student-learning-outcomes-using-eeg-correlation',
      title: 'Predicting Student Learning Outcomes with EEG Correlation',
      description:
        "I designed a study which aimed to investigate the relationship between student learning outcomes and brain activity correlation between a student and a teacher using electroencephalography (EEG). The findings have the potential to inform the development of more effective teaching strategies and personalized learning plans, improving the overall quality of education and student's learning.",
      github: '',
      stack: ['Neuroscience', 'Electroencephalography'],
      img: 'src/lib/img/eeg.jpeg',
      link: 'https://docs.google.com/document/d/e/2PACX-1vRhIXIMdK_THCrDiCFVUoPwRJJx9idk9eNi3z67r_S1mKSYXECP9I7q8scigBF9Og/pub',
      date: 'Dec. 2022',
    },
    {
      slug: 'sup4bubb4',
      title: 'sup4bubb4',
      description:
        'sup4bubb4 is a website that allows users to compile song requests from the StreamElements API and syncs them with the recording of a livestream. It includes a cloud function that checks for new livestreams and triggers the compilation of song requests from StreamElements. It was built with a responsive design to ensure that it can be used on a variety of devices, it was developed using Svelte, Tailwind, Firebase, and Firebase Cloud Functions.',
      github: 'https://github.com/vadimegorov13/sup4bubb4',
      stack: ['TypeScript', 'Firebase', 'Svelte', 'Tailwind'],
      img: 'src/lib/img/sup4bubb4.png',
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
