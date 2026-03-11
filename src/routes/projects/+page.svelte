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
    // {
    //   id: 1,
    //   slug: 'portfolio',
    //   title: 'Portfolio',
    //   category: 'Product / Personal Site',
    //   description:
    //     'My personal website built with Svelte, TypeScript, and Tailwind. It serves as a home for my projects, experience, and background, with a focus on clean design, responsiveness, and a developer-oriented presentation.',
    //   github: 'https://github.com/vadimegorov13/portfolio',
    //   stack: ['TypeScript', 'Svelte', 'Tailwind'],
    //   img: 'portfolio.png',
    //   link: '/',
    //   date: 'Jan. 2023',
    // },
    {
      id: 2,
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
    {
      id: 3,
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
      id: 4,
      slug: 'flower-classification-using-convolutional-neural-networks',
      title: 'Flower Classification using Convolutional Neural Networks',
      category: 'Machine Learning / Computer Vision',
      description:
        'A machine learning project using a convolutional neural network to classify 14 flower species. The model was developed in Python and Jupyter Notebook, with training, tuning, and evaluation focused on improving classification accuracy across the dataset.',
      github:
        'https://colab.research.google.com/drive/1b_KxwB7gffG31p4ktXyIo97GHr-TJKLQ?usp=sharing',
      stack: [
        'Python',
        'Jupyter Notebook',
        'scikit_learn',
        'Tensorflow',
        'Keras',
      ],
      img: 'flower.png',
      link: 'https://docs.google.com/document/d/e/2PACX-1vTBbsT5xHYT0DGv4XjO32TLpsjwWtzTBOXgWZFKjW0bhJHMDU-cWIs0Ey75Ngvv1ORU6V6fGLQAsdIY/pub',
      date: 'May 2022',
    },
    {
      id: 5,
      slug: 'pomofriends',
      title: 'PomoFriends',
      category: 'Product / Full-stack',
      description:
        'A productivity web application built around the Pomodoro Technique, designed to support focus, accountability, and collaboration. It includes features such as group creation, messaging, authentication, and real-time data handling using Next.js and Firebase.',
      github: 'https://github.com/PomoFriends/pomofriends-app',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'pomofriends.png',
      link: 'https://pomofriends.app',
      date: 'May 2022',
    },
  ];

  const categories = ['Product', 'Research', 'Full-stack', 'Experimental'];

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
            <ImageLoader
              src={project.img ? project.img : 'null'}
              alt={project.title}
              classProps={`motion-card-image aspect-[16/9] w-full object-cover ${
                project.img?.includes('flower') ? 'bg-white' : ''
              }`}
            />
          </div>
        </div>
      </article>
    {/each}

    <p
      use:reveal={{ type: 'up', delay: 80 }}
      class="text-center text-sm leading-7 text-zinc-400"
    >
      This is a small selection of projects from personal work, research, and
      technical experiments developed over time.
    </p>
  </section>
</div>
