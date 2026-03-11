<script lang="ts">
  import Badge from '$components/common/Badge.svelte';
  import LinkBlock from '$components/common/LinkBlock.svelte';
  import { contacts } from '$lib/data/contacts';
  import Icon from '@iconify/svelte';
  import { MetaTags } from 'svelte-meta-tags';

  type FeaturedProject = {
    type: string;
    title: string;
    description: string;
    stack: string[];
    live?: string;
    github?: string;
    read?: string;
  };

  const featuredProjects: FeaturedProject[] = [
    {
      type: 'Product',
      title: 'PomoFriends',
      description:
        'A productivity platform built around the Pomodoro method with collaboration and accountability features for teams.',
      stack: ['TypeScript', 'Next.js', 'Firebase'],
      live: 'https://pomofriends.app',
      github: 'https://github.com/PomoFriends/pomofriends-app',
    },
    {
      type: 'Research',
      title: 'EEG Learning Outcomes',
      description:
        'Research project exploring student-teacher neural correlation and predicting learning outcomes with EEG data.',
      stack: ['Python', 'EEG', 'Data Analysis'],
      read: 'https://docs.google.com/document/d/e/2PACX-1vRhIXIMdK_THCrDiCFVUoPwRJJx9idk9eNi3z67r_S1mKSYXECP9I7q8scigBF9Og/pub',
    },
    {
      type: 'Platform',
      title: 'sup4bubb4',
      description:
        'A full-stack platform that syncs stream song requests with livestream recordings for creator workflows.',
      stack: ['Svelte', 'Firebase', 'Cloud Functions'],
      live: 'https://sup4bubb4.com',
      github: 'https://github.com/vadimegorov13/sup4bubb4',
    },
  ];

  const techRow = [
    'Software',
    'Product',
    'Web Apps',
    'Backend',
    'Machine Learning',
    'Research',
  ];

  let showAltImage = $state(false);

  function toggleImage() {
    showAltImage = !showAltImage;
  }

  function downloadCV() {
    // download Vadim_Egorov_CV.pdf from the static
    const link = document.createElement('a');
    link.href = '/Vadim_Egorov_CV.pdf';
    link.download = 'Vadim_Egorov_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function isNotExternalMailTo(href?: string) {
    return Boolean(href && !href.startsWith('mailto:'));
  }
</script>

<MetaTags title="Vadim Egorov" description="Vadim Egorov's portfolio" />

<div class="w-full flex flex-col gap-24 pb-8">
  <section
    id="home"
    class="scroll-mt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-10 xl:gap-12"
  >
    <div class="flex flex-col gap-6">
      <h1 class="text-xl font-semibold tracking-tight sm:text-2xl">
        <span class="text-primary">/</span>vadim-egorov
      </h1>
      <div class="flex flex-col gap-3 max-w-2xl">
        <h1
          class="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl leading-tight font-semibold text-white"
        >
          Software engineer building product systems, modern web applications,
          and machine learning projects.
        </h1>
        <p class="text-zinc-400 text-sm sm:text-base leading-7 max-w-xl">
          I work across software engineering, data-heavy business logic, and
          machine learning, with experience in product development, backend
          systems, and research-driven work.
        </p>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          type="button"
          onclick={() => downloadCV()}
          class="inline-flex items-center gap-2 whitespace-nowrap border border-primary bg-primary px-4 py-2 text-sm font-medium text-background shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] hover:bg-primary/10 hover:text-primary active:bg-primary/15 active:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:cursor-pointer"
        >
          <span>Download CV</span>
          <Icon icon="pixelarticons:download-sharp" font-size="16px" />
        </button>

        <LinkBlock
          href="/projects"
          label="View Projects"
          size="lg"
          isPrimaryText
          isPrimaryBorder
        />
        <LinkBlock href="#contacts" label="Get in Touch" size="lg" />
      </div>

      <div class="flex flex-wrap gap-2">
        {#each techRow as tech (tech)}
          <Badge text={tech} />
        {/each}
      </div>
    </div>

    <div>
      <div
        class="md:mx-4 lg:mx-0 min-w-0 overflow-hidden border border-border bg-black/20"
      >
        <div
          class="flex items-center justify-between border border-border border-x-0 border-t-0 px-3 py-2 text-xs text-zinc-400"
        >
          <div class="min-w-0 truncate pr-2">
            {#if !showAltImage}
              headshot.jpeg
            {:else}
              coding_capybara.png
            {/if}
          </div>
          <div class="shrink-0">
            <button type="button" onclick={toggleImage}>
              <Icon
                icon="pixelarticons:arrow-right"
                width="16px"
                class="text-zinc-400 hover:text-primary cursor-pointer"
              />
            </button>
          </div>
        </div>
        <div class="relative flex items-center justify-center p-6">
          <img
            src={!showAltImage ? 'headshot.jpeg' : 'coding_capybara.png'}
            alt={!showAltImage
              ? 'Vadim Egorov Headshot'
              : 'Coding Capybara Illustration'}
            class="h-auto w-full max-h-100 object-contain xl:max-h-140 xl:max-w-100"
          />
        </div>
      </div>
    </div>
  </section>

  <section id="experience" class="scroll-mt-20 flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-semibold text-white">
        <span class="text-primary">#</span>experience
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base">
        Professional work focused on business systems, product logic, and
        large-scale web applications.
      </p>
    </div>

    <article
      class="md:mx-4 border border-border bg-black/20 p-6 flex flex-col gap-4"
    >
      <div class="flex flex-col gap-1">
        <p class="text-white text-lg font-semibold">Software Engineer</p>
        <p class="text-primary text-sm">
          <a
            href="https://www.flyntlok.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary inline-flex items-center gap-1 whitespace-nowrap"
          >
            <span> Flyntlok </span>
            <Icon icon="pixelarticons:external-link-sharp" />
          </a>
        </p>
      </div>
      <p class="text-zinc-300 leading-7 text-sm sm:text-base">
        Built and maintained product functionality for a cloud-based dealership
        management platform. Led development of the Sales Project module
        supporting quoting, purchasing, approvals, and sales workflows.
      </p>
      <p class="text-zinc-400 text-sm">
        Focus areas: application architecture, backend integration, structured
        state management, workflow-heavy business logic, and bug fixes.
      </p>
    </article>
  </section>

  <section id="projects" class="scroll-mt-20 flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-semibold text-white">
        <span class="text-primary">#</span>projects
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base">
        A selection of projects across product development, research, and
        full-stack engineering.
      </p>
    </div>

    <div class="md:mx-4 grid grid-cols-1 lg:grid-cols-3 gap-5">
      {#each featuredProjects as project (project.title)}
        <article
          class="border border-border bg-black/20 p-4 flex flex-col gap-4"
        >
          <p class="text-primary text-xs">{project.type}</p>
          <h3 class="text-white text-lg font-semibold">{project.title}</h3>
          <p class="text-zinc-400 text-sm leading-6">{project.description}</p>

          <div class="flex flex-wrap gap-2">
            {#each project.stack as tag (tag)}
              <Badge text={tag} size="sm" />
            {/each}
          </div>

          <div class="flex flex-wrap gap-2 mt-auto text-sm">
            {#if project.live}
              <LinkBlock
                href={project.live}
                label="Live"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                isPrimaryText
                isExternal
              />
            {/if}
            {#if project.github}
              <LinkBlock
                href={project.github}
                label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                isPrimaryText
                isExternal
              />
            {/if}
            {#if project.read}
              <LinkBlock
                href={project.read}
                label="Read"
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                isPrimaryText
                isExternal
              />
            {/if}
          </div>
        </article>
      {/each}
    </div>

    <div>
      <LinkBlock
        href="/projects"
        label="View all projects"
        icon="pixelarticons:arrow-right"
        isPrimaryText
        noBorder
        size="sm"
      />
    </div>
  </section>

  <section
    id="about"
    class="scroll-mt-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6"
  >
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-semibold text-white">
        <span class="text-primary">#</span>about
      </h2>
      <p class="text-zinc-300 leading-7 text-sm sm:text-base max-w-2xl">
        I'm a software engineer currently pursuing an M.S. in Artificial
        Intelligence, Data Science, and Engineering at the University of Alaska
        Anchorage. My work spans product development, business systems, and
        machine learning, with a focus on building software that is practical,
        reliable, and well designed.
      </p>
    </div>

    <div class="md:mx-4 lg:mx-0 grid grid-cols-1 gap-3">
      <div class="border border-border bg-black/20 p-4">
        <p class="text-primary text-xs">Education</p>
        <p class="text-zinc-300 text-sm mt-2">
          M.S. in AI, Data Science, and Engineering at UAA
        </p>
      </div>
      <div class="border border-border bg-black/20 p-4">
        <p class="text-primary text-xs">Experience</p>
        <p class="text-zinc-300 text-sm mt-2">
          Large-scale web apps, product systems, and workflow-heavy software
        </p>
      </div>
      <div class="border border-border bg-black/20 p-4">
        <p class="text-primary text-xs">Focus</p>
        <p class="text-zinc-300 text-sm mt-2">
          Web apps, ML, backend logic, and application design
        </p>
      </div>
    </div>

    <div>
      <LinkBlock
        href="/about"
        label="Read more"
        icon="pixelarticons:arrow-right"
        isPrimaryText
        noBorder
        size="sm"
      />
    </div>
  </section>

  <section id="contacts" class="scroll-mt-20 flex flex-col gap-6">
    <div class="flex flex-col gap-3 max-w-3xl">
      <h2 class="text-xl font-semibold text-white">
        <span class="text-primary">#</span>contacts
      </h2>
      <p class="text-zinc-400 text-sm sm:text-base">
        If you'd like to connect, discuss a project, or reach out about an
        opportunity, I'd be glad to hear from you.
      </p>
    </div>

    <div class="md:mx-4 lg:mx-0 grid grid-cols-1 lg:grid-cols-3 gap-3">
      {#each contacts as contact (contact.name)}
        <div class="border border-border bg-black/20 p-4 flex gap-3">
          {#if contact.icon}
            <div class="w-9 h-9 min-w-9 flex items-center justify-center">
              <Icon icon={contact.icon} width="34px" class="text-zinc-300" />
            </div>
          {/if}
          <div class="flex flex-col gap-1">
            <p class="text-zinc-200 text-sm">{contact.name}</p>
            <a
              href={contact.href}
              target={isNotExternalMailTo(contact.href) ? '_blank' : undefined}
              rel={isNotExternalMailTo(contact.href)
                ? 'noopener noreferrer'
                : undefined}
              class="text-primary text-sm break-all inline-flex items-center gap-1 whitespace-nowrap"
            >
              <span>
                {contact.value}
              </span>
              {#if isNotExternalMailTo(contact.href)}
                <Icon icon="pixelarticons:external-link-sharp" />
              {/if}
            </a>
          </div>
        </div>
      {/each}
    </div>
  </section>
</div>
