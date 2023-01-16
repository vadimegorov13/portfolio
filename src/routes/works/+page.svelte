<script lang="ts">
  import type { ProjectCard } from 'src/types';

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
      slug: 'predicting-student-learning-outcomes-using-eeg-correlation',
      title:
        'Predicting Student Learning Outcomes using EEG Correlation with Teacher/Expert Neural Activity',
      description:
        'I produced a study design during my "Neuroscience and Engagement" course at UAA that aims to investigate the relationship between student learning outcomes and brain activity correlation between a student and a teacher using electroencephalography (EEG). The study proposed to record the neural activity of a teacher while giving a lecture and the neural activity of two experts while watching stimuli and to recruit 100 students to participate in the study and watch the lecture in one of three forms: original, shortened, or scrambled version. The student learning outcomes are proposed to be assessed through pre-tests and post-tests. The study proposed to analyze the results to determine if there is a significant relationship between teacher/expert-student brain activity and learning outcomes. The findings have the potential to inform the development of more effective teaching strategies and personalized learning plans, improving the overall quality of education and student learning outcomes. This study is significant because it has the potential to uncover new ways of understanding and enhancing students learning, which can be applied to education.',
      github: '',
      stack: ['Neuroscience', 'Electroencephalography'],
      img: 'src/lib/img/eeg.jpeg',
      link: 'https://docs.google.com/document/d/e/2PACX-1vRhIXIMdK_THCrDiCFVUoPwRJJx9idk9eNi3z67r_S1mKSYXECP9I7q8scigBF9Og/pub',
      date: 'Dec. 2023',
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
      slug: 'flower-classification-using-convolutional-neural-networks',
      title: 'Flower Classification using Convolutional Neural Networks',
      description:
        "This project is a flower classification using convolutional neural network(CNN) that was trained on a dataset from Kaggle, the goal of this project is to classify 14 different flower species with high accuracy. The model was fine-tuned using a custom hyperparameter tuning function, resulting in an accuracy of 92% on the validation set. The project's outcome is a model that able to classify different flower species with a high degree of accuracy.",
      github:
        'https://colab.research.google.com/drive/1b_KxwB7gffG31p4ktXyIo97GHr-TJKLQ?usp=sharing',
      stack: [
        'Python',
        'Jupyter Notebook',
        'scikit_learn',
        'Tensorflow',
        'Keras',
      ],
      img: 'src/lib/img/flower.png',
      link: 'https://docs.google.com/document/d/e/2PACX-1vTBbsT5xHYT0DGv4XjO32TLpsjwWtzTBOXgWZFKjW0bhJHMDU-cWIs0Ey75Ngvv1ORU6V6fGLQAsdIY/pub',
      date: 'May 2022',
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
                  : 'Gitub'}
              </a>
            {/if}
          </div>
          <img
            alt={project.title}
            src={project.img ? project.img : 'null'}
            class={`h-full w-full object-cover ${
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
