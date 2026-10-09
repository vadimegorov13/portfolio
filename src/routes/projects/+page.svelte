<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { MetaTags } from 'svelte-meta-tags';
  import ImageLoader from '$components/Image/ImageLoader.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import LinkBlock from '$lib/components/common/LinkBlock.svelte';

  type ProjectEntry = {
    id: number;
    slug: string;
    title: string;
    category: string;
    description: string;
    github: string;
    stack: string[];
    img: string;
    link: string;
    date: string;
  };

  const projects: ProjectEntry[] = [
    {
      id: 1,
      slug: 'pomofriends',
      title: 'PomoFriends',
      category: 'Product / Full-stack',
      description:
        'A productivity web application built around the Pomodoro Technique, designed to support focus, accountability, and collaboration. It includes features such as group creation, messaging, authentication, and real-time data handling using Next.js and Firebase.',
      github: '',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'pomofriends.png',
      link: 'https://pomofriends.com',
      date: 'May 2022',
    },
    {
      id: 2,
      slug: 'sup4bubb4',
      title: 'sup4bubb4',
      category: 'Web Platform / Full-stack',
      description:
        'A web platform that compiles song requests from livestreams and syncs them with recorded content. It uses StreamElements data, Firebase services, and cloud functions to automate collection and processing, while providing a responsive interface built with Svelte and Tailwind.',
      github: 'https://github.com/vadimegorov13/sup4bubb4',
      stack: ['TypeScript', 'Firebase', 'Svelte', 'Tailwind'],
      img: 'sup4bubb4.png',
      link: 'https://sup4bubb4.com',
      date: 'Sep. 2022',
    },
    {
      id: 3,
      slug: 'predicting-student-learning-outcomes-using-eeg-correlation',
      title:
        'Predicting Student Learning Outcomes using EEG Correlation with Teacher/Expert Neural Activity',
      category: 'Research / Brain Activity Data',
      description:
        'A research study exploring how student learning outcomes may relate to correlations in brain activity between students and teachers. The project focused on using brain activity data to better understand learning dynamics and support more effective educational strategies.',
      github: '',
      stack: ['Neuroscience', 'Electroencephalography'],
      img: 'eeg.jpeg',
      link: 'https://docs.google.com/document/d/e/2PACX-1vRhIXIMdK_THCrDiCFVUoPwRJJx9idk9eNi3z67r_S1mKSYXECP9I7q8scigBF9Og/pub',
      date: 'Dec. 2022',
    },
  ];

  const categories = ['Product', 'Research', 'Full-stack'];

  const actionLabel = (url: string, fallback = 'Live') => {
    if (!url) {
      return fallback;
    }

    if (url.includes('docs.google.com')) {
      return 'Read';
    }

    if (url.includes('colab.research.google.com')) {
      return 'Code';
    }

    return fallback;
  };
</script>

<!-- <svelte:head>
  <title>Works</title>
</svelte:head> -->

<MetaTags
  title="Projects"
  description="List of the projects built by Vadim Egorov"
/>

<div class="flex flex-col gap-14 sm:gap-18">
  <section class="flex flex-col gap-4">
    <h1
      use:reveal={{ type: 'up' }}
      class="text-xl font-semibold tracking-tight sm:text-2xl"
    >
      <span class="text-primary">/</span>projects
    </h1>
    <p
      use:reveal={{ type: 'scale', delay: 50 }}
      class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base"
    >
      This page highlights a selection of projects across product development,
      machine learning, research, and web development. Some are polished
      applications, while others reflect experiments, studies, and technical
      exploration across different areas of my work.
    </p>
    <div
      use:reveal={{ type: 'stagger', delay: 30 }}
      class="reveal-stagger mt-2 flex flex-wrap gap-2"
    >
      {#each categories as category (category)}
        <span
          class="stagger-item border border-border bg-zinc-900/30 px-3 py-1 text-xs uppercase tracking-[0.18em] text-zinc-300"
        >
          {category}
        </span>
      {/each}
    </div>
  </section>

  <section class="flex flex-col gap-10">
    <article
      use:reveal={{ type: 'up', delay: 80 }}
      class="flex flex-col gap-3 border border-dashed border-primary/40 bg-primary/5 px-4 py-5 sm:px-6 sm:py-6"
    >
      <p class="text-primary text-xs uppercase flex items-center gap-2">
        <span class="wip-dot inline-block h-2 w-2 rounded-full bg-primary"
        ></span>
        In progress
      </p>
      <h2 class="text-xl font-semibold text-zinc-100 sm:text-2xl">
        Teaching models to understand human activity<span
          class="wip-cursor ml-1"
        ></span>
      </h2>
      <p class="max-w-4xl text-sm leading-8 text-zinc-400 sm:text-base">
        My current machine learning project. Still training, details soon.
      </p>
    </article>

    {#each projects as project, index (project.title)}
      <article
        use:reveal={{ type: 'up', delay: index * 90 }}
        class="motion-card border border-border bg-zinc-900/20 px-4 py-5 sm:px-6 sm:py-6"
      >
        <div class="flex flex-col gap-5">
          <div
            class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
          >
            <h2
              class="max-w-4xl text-xl font-semibold leading-tight text-zinc-100 sm:text-2xl"
            >
              {project.title}
            </h2>
            <p
              class="shrink-0 text-xs uppercase tracking-[0.2em] text-zinc-500 sm:pt-1"
            >
              {project.date}
            </p>
          </div>

          <p
            class="w-fit border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-primary"
          >
            {project.category}
          </p>

          <p class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base">
            {project.description}
          </p>

          <div class="flex flex-wrap gap-2">
            {#each project.stack as tech (tech)}
              <Badge text={tech} size="md" />
            {/each}
          </div>

          <div class="flex flex-wrap gap-2">
            {#if project.link}
              <LinkBlock
                href={project.link}
                label={actionLabel(project.link, 'Live')}
                size="md"
                isPrimaryText
                isPrimaryBorder
                isExternal
              />
            {/if}

            {#if project.github}
              <LinkBlock
                href={project.github}
                label={actionLabel(project.github, 'GitHub')}
                size="md"
                isExternal
              />
            {/if}
          </div>

          <div
            class="motion-card-image-wrap overflow-hidden border border-border"
          >
            {#if project.img}
              <ImageLoader
                src={project.img}
                alt={project.title}
                classProps="motion-card-image aspect-[16/9] w-full object-cover"
              />
            {:else}
              <div
                class="flex aspect-[16/9] w-full items-center justify-center bg-black/30 text-xs uppercase tracking-[0.2em] text-zinc-500"
              >
                Screenshot coming soon
              </div>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </section>
</div>
