<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import Badge from '$lib/components/common/Badge.svelte';
  import { MetaTags } from 'svelte-meta-tags';

  const softwareInterests = [
    'Product systems',
    'Web architecture',
    'Backend integration',
    'State management',
  ];

  const mlInterests = [
    'Applied machine learning',
    'Brain activity data',
    'Representation learning',
    'Experimental workflows',
  ];

  const stackGroups = [
    {
      title: 'Languages',
      items: ['TypeScript', 'Python', 'SQL', 'Java'],
    },
    {
      title: 'Frameworks',
      items: ['React', 'Svelte', 'Next.js', 'GraphQL', 'Firebase'],
    },
    {
      title: 'Engineering',
      items: [
        'Application architecture',
        'State management',
        'API development',
        'Backend integration',
      ],
    },
    {
      title: 'Machine Learning',
      items: [
        'Data analysis',
        'Representation learning',
        'Signal-based research',
        'Experimental workflows',
      ],
    },
  ];
</script>

<MetaTags title="About me" description="Vadim Egorov's about me page" />

<div class="flex flex-col gap-14 sm:gap-18">
  <section id="about" class="scroll-mt-20 flex flex-col gap-4">
    <div use:reveal={{ type: 'up' }}>
      <h1 class="text-xl font-semibold tracking-tight sm:text-2xl">
        <span class="text-primary">/</span>about
      </h1>
      <p class="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
        A little more about who I am, what I work on, and what I care about.
      </p>
    </div>
    <article
      use:reveal={{ type: 'scale', delay: 70 }}
      class="motion-card md:mx-4 max-w-5xl border border-border bg-black/20 p-5 sm:p-6"
    >
      <p class="max-w-4xl text-sm leading-8 text-zinc-200 sm:text-base">
        I'm Vadim Egorov, a software engineer currently pursuing an M.S. in
        Artificial Intelligence, Data Science, and Engineering at the University
        of Alaska Anchorage.
      </p>

      <p class="mt-6 max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base">
        My background includes professional experience building large-scale web
        applications and complex business systems, along with personal and
        research work in product development, machine learning, and brain signal
        modeling. I enjoy working on software that sits at the intersection of
        strong engineering, practical functionality, and thoughtful design.
      </p>
    </article>
  </section>

  <section id="experience" class="scroll-mt-20 flex flex-col gap-4">
    <h2 use:reveal={{ type: 'up' }} class="text-lg font-semibold sm:text-xl">
      <span class="text-primary">#</span>experience
    </h2>
    <p
      use:reveal={{ type: 'scale', delay: 50 }}
      class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base"
    >
      Professionally, I've worked on cloud-based business software that supports
      real operational workflows. That experience gave me the opportunity to
      work on application architecture, backend integration, structured state
      management, and systems that need to remain reliable while supporting
      complex user and business requirements. I'm especially drawn to work that
      involves turning complicated processes into software that feels clear,
      maintainable, and useful.
    </p>
    <article
      use:reveal={{ type: 'up', delay: 110 }}
      class="motion-card md:mx-4 max-w-5xl border border-border bg-zinc-900/20 p-5 sm:p-6"
    >
      <p class="text-xs uppercase tracking-[0.2em] text-primary">
        Flyntlok - Software Engineer
      </p>
      <p class="mt-4 max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base">
        At Flyntlok, I worked on a cloud-based dealership management platform
        built to support complex operational workflows. I contributed to product
        functionality across quoting, purchasing, approvals, and sales
        processes, with a focus on building systems that were both reliable and
        practical for real business use.
      </p>
      <p class="mt-5 max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base">
        A major part of my work centered on Sales Project, a large module that
        supported quoting and sales coordination across multiple stages of the
        workflow. Working on it deepened my interest in application
        architecture, structured state management, backend integration, and the
        challenge of designing software that can handle complexity without
        becoming difficult to use or maintain.
      </p>
    </article>
  </section>

  <section id="projects" class="scroll-mt-20 flex flex-col gap-4">
    <h2 use:reveal={{ type: 'up' }} class="text-lg font-semibold sm:text-xl">
      <span class="text-primary">#</span>projects
    </h2>
    <p
      use:reveal={{ type: 'scale', delay: 50 }}
      class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base"
    >
      Alongside professional development, I've continued building personal
      projects that reflect both my technical interests and the kinds of
      products I enjoy creating. I like building applications that solve real
      problems, whether that means productivity tools, collaborative platforms,
      or projects that explore machine learning and data-driven ideas. For me,
      the most rewarding work usually combines engineering depth with a strong
      sense of purpose and usability.
    </p>
    <div use:reveal={{ type: 'up', delay: 100 }} class="md:mx-4">
      <a
        href="/projects"
        class="motion-link border border-primary/70 px-4 py-2 text-sm text-primary transition-colors duration-200 hover:bg-primary/10"
      >
        View Projects
      </a>
    </div>
  </section>

  <section id="education" class="scroll-mt-20 flex flex-col gap-4">
    <h2 use:reveal={{ type: 'up' }} class="text-lg font-semibold sm:text-xl">
      <span class="text-primary">#</span>education
    </h2>

    <p
      use:reveal={{ type: 'scale', delay: 50 }}
      class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base"
    >
      My graduate studies have given me the chance to explore machine learning
      more deeply, especially in research involving brain activity data and
      representation learning. That side of my work has pushed me to think not
      only about building systems, but also about how models learn, how data
      should be structured, and how technical ideas can be translated into
      meaningful experiments.
    </p>

    <div
      use:reveal={{ type: 'stagger', delay: 40 }}
      class="reveal-stagger md:mx-4 grid gap-5 md:grid-cols-2"
    >
      <article
        class="stagger-item motion-card border border-border bg-zinc-900/25 p-5 sm:p-6"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-primary">Education</p>
        <div
          class="mt-4 space-y-4 text-sm leading-7 text-zinc-300 sm:text-base"
        >
          <p>
            M.S. in Artificial Intelligence, Data Science, and Engineering at
            the University of Alaska Anchorage
          </p>
          <p>B.S. in Computer Science with a minor in Mathematics</p>
        </div>
      </article>

      <article
        class="stagger-item motion-card border border-border bg-zinc-900/25 p-5 sm:p-6"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-primary">
          Current Focus
        </p>
        <p class="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
          Product systems, machine learning, backend logic, application
          architecture, and practical software design.
        </p>
      </article>
    </div>
  </section>

  <section id="interests" class="scroll-mt-20 flex flex-col gap-4">
    <h2 use:reveal={{ type: 'up' }} class="text-lg font-semibold sm:text-xl">
      <span class="text-primary">#</span>interests
    </h2>
    <p
      use:reveal={{ type: 'scale', delay: 50 }}
      class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base"
    >
      I'm especially interested in software that solves real problems, whether
      through user-facing products, data-driven systems, or thoughtful backend
      and application design.
    </p>
    <div
      use:reveal={{ type: 'stagger', delay: 40 }}
      class="reveal-stagger md:mx-4 grid gap-5 md:grid-cols-2"
    >
      <article
        class="stagger-item motion-card border border-border bg-zinc-900/25 p-5 sm:p-6"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-primary">
          Software Engineering
        </p>
        <ul class="mt-4 flex flex-col gap-2 text-sm text-zinc-300 sm:text-base">
          {#each softwareInterests as item (item)}
            <li class="flex items-start gap-2">
              <span class="text-primary">-</span>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </article>

      <article
        class="stagger-item motion-card border border-border bg-zinc-900/25 p-5 sm:p-6"
      >
        <p class="text-xs uppercase tracking-[0.2em] text-primary">
          Machine Learning
        </p>
        <ul class="mt-4 flex flex-col gap-2 text-sm text-zinc-300 sm:text-base">
          {#each mlInterests as item (item)}
            <li class="flex items-start gap-2">
              <span class="text-primary">-</span>
              <span>{item}</span>
            </li>
          {/each}
        </ul>
      </article>
    </div>
  </section>

  <section id="skills" class="scroll-mt-20 flex flex-col gap-4">
    <h2 use:reveal={{ type: 'up' }} class="text-lg font-semibold sm:text-xl">
      <span class="text-primary">#</span>skills
    </h2>
    <p
      use:reveal={{ type: 'scale', delay: 50 }}
      class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base"
    >
      Technologies and areas I work with most often.
    </p>

    <div
      use:reveal={{ type: 'stagger', delay: 40 }}
      class="reveal-stagger md:mx-4 grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      {#each stackGroups as group (group.title)}
        <div
          class="stagger-item motion-card border border-border bg-black/20 p-4"
        >
          <p class="text-primary text-xs uppercase">{group.title}</p>
          <div class="flex flex-wrap gap-2 mt-3">
            {#each group.items as item (item)}
              <Badge text={item} size="sm" />
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </section>

  <section id="outside-of-work" class="scroll-mt-20 flex flex-col gap-4">
    <h2 use:reveal={{ type: 'up' }} class="text-lg font-semibold sm:text-xl">
      <span class="text-primary">#</span>outside-of-work
    </h2>
    <p
      use:reveal={{ type: 'scale', delay: 50 }}
      class="max-w-4xl text-sm leading-8 text-zinc-300 sm:text-base"
    >
      Outside of work and school, I'm also interested in education, history,
      music, and art. Those interests shape the way I think about creativity,
      communication, and the experience of using technology. I care about
      building software that is not only functional, but also thoughtful,
      well-structured, and enjoyable to interact with.
    </p>
  </section>
</div>
