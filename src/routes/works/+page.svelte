<script lang="ts">
  import ImageLoader from '$lib/Components/Image/ImageLoader.svelte';
  import type { ProjectCard } from 'src/types';

  const projects: ProjectCard[] = [
    {
      slug: 'portfolio',
      title: 'Portfolio',
      description:
        'This is my personal website built using Svelte and Typescript, it showcases my skills, experiences, and projects. It has a clean and simple design, and fully responsive. If you like the design and want to build your own, you can check out my repository.',
      github: 'https://github.com/vadimegorov13/portfolio',
      stack: ['TypeScript', 'Svelte', 'Tailwind'],
      img: 'portfolio.png',
      link: '/',
      date: 'Jan. 2023',
    },
    {
      slug: 'predicting-student-learning-outcomes-using-eeg-correlation',
      title:
        'Predicting Student Learning Outcomes using EEG Correlation with Teacher/Expert Neural Activity',
      description:
        "I designed a study which aimed to investigate the relationship between student learning outcomes and brain activity correlation between a student and a teacher using electroencephalography (EEG). The findings have the potential to inform the development of more effective teaching strategies and personalized learning plans, improving the overall quality of education and student's learning.",
      github: '',
      stack: ['Neuroscience', 'Electroencephalography'],
      img: 'eeg.jpeg',
      link: 'https://docs.google.com/document/d/e/2PACX-1vRhIXIMdK_THCrDiCFVUoPwRJJx9idk9eNi3z67r_S1mKSYXECP9I7q8scigBF9Og/pub',
      date: 'Dec. 2022',
    },
    {
      slug: 'sup4bubb4',
      title: 'sup4bubb4',
      description:
        'sup4bubb4 is a website that allows users to compile song requests from the StreamElements API and syncs them with the recording of a livestream. It includes a cloud function that checks for new livestreams and triggers the compilation of song requests from StreamElements. It was built with a responsive design to ensure that it can be used on a variety of devices, it was developed using Svelte, Tailwind, Firebase, and Firebase Cloud Functions',
      github: 'https://github.com/vadimegorov13/sup4bubb4',
      stack: ['TypeScript', 'Firebase', 'Svelte', 'Tailwind'],
      img: 'sup4bubb4.png',
      link: 'https://sup4bubb4.com',
      date: 'Sep. 2022',
    },
    {
      slug: 'flower-classification-using-convolutional-neural-networks',
      title: 'Flower Classification using Convolutional Neural Networks',
      description:
        "I developed a machine learning model using Python and Jupyter Notebooks that utilizes a convolutional neural network (CNN) to classify 14 different flower species with high accuracy. The model was trained on a dataset from Kaggle and fine-tuned using a custom hyperparameter tuning function, resulting in an accuracy of 92% on the validation set. The project's outcome is a model that able to classify different flower species with a high degree of accuracy.",
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
      slug: 'pomofriends',
      title: 'PomoFriends',
      description:
        "PomoFriends is a responsive web application for productivity built using the Pomodoro Technique, it includes features such as group creation and messaging to encourage accountability among users and facilitate collaboration, user authentication and authorization using Firebase authentication. To enhance performance, it uses NextJS for server-rendering pages and preloading data, and Firebase's real-time database to store and manage user data and app functionality.",
      github: 'https://github.com/PomoFriends/pomofriends-app',
      stack: ['TypeScript', 'Firebase', 'Next.js'],
      img: 'pomofriends.png',
      link: 'https://pomofriends.app',
      date: 'May 2022',
    },
  ];
</script>

<svelte:head>
  <title>Works</title>
</svelte:head>

<div class="flex flex-col gap-20">
  <div>
    <h1 class="text-xl font-semibold">
      <span class="text-primary">/</span>works
    </h1>

    <p class="mt-10 text-zinc-400">
      On this page, you will find a range of projects showcasing my skills and
      experience in various fields, including web development, data analysis,
      and research. Explore the live projects to see my work in action, and
      learn more about other projects and papers that showcase my
      problem-solving abilities and technical expertise. Don't hesitate to
      contact me if you have any questions or would like to collaborate on a
      project.
    </p>
  </div>

  <div class="flex flex-col gap-20 text-zinc-400">
    {#each projects as project}
      <div class="group">
        <div
          class="flex flex-col gap-4 p-4 group-hover:-translate-y-2 duration-200"
        >
          <div class="flex flex-row items-center justify-between">
            <h1 class="text-2xl smd:text-3xl text-primary">
              {project.title}
            </h1>
            <p class="text-lg flex flex-col justify-start">
              {project.date}
            </p>
          </div>
          <div class="flex flex-row gap-2 text-white/80">
            {#each project.stack as tech, index}
              <span>{index === 0 ? tech : `| ${tech}`}</span>
            {/each}
          </div>
          <div>{project.description}</div>
          <div class="flex h-6 flex-row justify-start gap-2 text-zinc-400">
            {#if project.link}
              <a
                href={project.link}
                target={'_blank'}
                class="border border-border group-hover:gr-animation px-1 text-md"
              >
                {project.link.includes('docs.google.com') ? 'Read' : 'Live'}
              </a>
            {/if}

            {#if project.github}
              <a
                href={project.github}
                target={'_blank'}
                class="border border-border group-hover:gr-animation px-1 text-md"
              >
                {project.github.includes('colab.research.google.com')
                  ? 'Code'
                  : 'GitHub'}
              </a>
            {/if}
          </div>
          <ImageLoader
            src={project.img ? project.img : 'null'}
            alt={project.title}
            classProps={`h-full w-full object-cover ${
              project.img?.includes('flower') ? 'bg-white' : ''
            }`}
          />
        </div>
      </div>
    {/each}
    <div class="text-sm text-center">
      This represents just a small selection of the projects I have worked on
      over the years. I have many more pieces of personal and university work.
    </div>
  </div>
</div>
