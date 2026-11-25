<script lang="ts">
  import { onMount } from 'svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import { reveal } from '$lib/actions/reveal';
  import { featuredProjects } from '$lib/data/projects';
  import Badge from '$components/common/Badge.svelte';
  import LinkBlock from '$components/common/LinkBlock.svelte';
  import PageSection from '$components/common/PageSection.svelte';
  import HeroCanvas from '$components/HeroCanvas.svelte';
  import NowList from '$components/NowList.svelte';
  import Portrait from '$components/Portrait.svelte';
  import JobList from '$components/JobList.svelte';
  import ProjectOrbit from '$components/ProjectOrbit.svelte';
  import StackGrid from '$components/StackGrid.svelte';
  import ContactPad from '$components/ContactPad.svelte';
  import { MS_PROGRAM_URL } from '$lib/data/education';

  const roles = ['Software Engineer', 'ML Researcher', 'Product Builder'];

  const techRow = [
    'Software',
    'Product',
    'Web Apps',
    'Backend',
    'Machine Learning',
    'Research',
    'AI Tools',
    'Data Systems',
    'Automation',
    'macOS Apps',
  ];

  const workTags = [
    'application architecture',
    'backend integration',
    'structured state management',
    'workflow-heavy business logic',
    'bug fixes',
    'product analytics',
  ];

  let roleIndex = $state(0);

  onMount(() => {
    const timer = setInterval(
      () => (roleIndex = (roleIndex + 1) % roles.length),
      3200
    );
    return () => clearInterval(timer);
  });
</script>

<MetaTags title="Vadim Egorov" description="Vadim Egorov's portfolio" />

<section
  id="home"
  class="relative flex min-h-[min(92svh,880px)] items-center overflow-hidden"
>
  <HeroCanvas />
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/10 lg:bg-linear-to-r lg:via-background/60 lg:to-transparent"
  ></div>

  <div
    class="relative mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:px-10"
  >
    <div class="flex flex-col gap-6">
      <h1
        class="font-display text-[3.4rem] leading-[0.92] font-extrabold tracking-[-0.045em] sm:text-7xl xl:text-[6.2rem]"
      >
        Vadim Egorov
      </h1>
      <p class="flex items-center gap-3 font-mono text-lg font-medium">
        <span class="h-0.5 w-9 bg-primary"></span>
        {#key roleIndex}
          <span class="role-swap">{roles[roleIndex]}</span>
        {/key}
      </p>
      <p
        class="max-w-[34ch] text-[1.3rem] leading-[1.45] text-balance text-ink-1"
      >
        I build web products and machine learning systems. Software engineer and
        <a
          href={MS_PROGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="underline decoration-primary/60 underline-offset-4 hover:text-primary"
          >M.S. student in AI</a
        >.
      </p>
      <NowList />
      <div class="flex flex-wrap gap-3">
        <LinkBlock
          href="/projects"
          label="View Projects"
          icon="carbon:arrow-right"
          size="lg"
          isPrimaryBorder
          attention
        />
        <LinkBlock href="#contacts" label="Get in Touch" size="lg" />
      </div>
    </div>

    <!-- no scroll reveal: the blueprint intro brings this in -->
    <div class="mx-auto w-full max-w-sm pr-4 lg:max-w-none">
      <Portrait />
    </div>
  </div>
</section>

<PageSection line={false} id="about" title="A bit about me">
  <div class="grid gap-8 md:grid-cols-2 md:gap-10">
    <p
      use:reveal={{ type: 'up' }}
      class="text-[1.3rem] leading-snug text-balance text-ink-1"
    >
      I'm a software engineer currently pursuing an M.S. in Artificial
      Intelligence, Data Science, and Engineering at the University of Alaska
      Anchorage.
    </p>
    <p
      use:reveal={{ type: 'up', delay: 60 }}
      class="text-[1.08rem] leading-relaxed text-ink-2"
    >
      My work spans product development, business systems, and machine learning,
      with a focus on building software that is practical, reliable, and well
      designed.
    </p>
  </div>
  <div class="flex flex-wrap gap-2">
    {#each techRow as tech (tech)}
      <Badge text={tech} />
    {/each}
  </div>
  <div>
    <LinkBlock
      href="/about"
      label="Read more"
      icon="carbon:arrow-right"
      noBorder
    />
  </div>
</PageSection>

<PageSection
  line={false}
  id="experience"
  title="Where I've worked"
  sub="Business systems, product logic, and large-scale web applications."
>
  <JobList limit={3} />
  <div class="flex flex-wrap gap-2">
    {#each workTags as tag (tag)}
      <Badge text={tag} />
    {/each}
  </div>
  <div>
    <LinkBlock
      href="/about#experience"
      label="Full experience"
      icon="carbon:arrow-right"
      noBorder
    />
  </div>
</PageSection>

<ProjectOrbit id="projects" projects={featuredProjects} />

<PageSection
  line={false}
  id="stack"
  title="Tools I reach for"
  sub="With sound on, every tile says its own name."
>
  <StackGrid />
</PageSection>

<PageSection
  line={false}
  id="contacts"
  title="Let's talk."
  sub="Email is the easiest way to reach me, and you can also find me on GitHub and LinkedIn."
>
  <div use:reveal={{ type: 'scale' }}>
    <ContactPad />
  </div>
</PageSection>

<style>
  /* the role changes with a quiet fade, no scrambling */
  .role-swap {
    animation: role-in 400ms ease-out;
  }

  @keyframes role-in {
    from {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .role-swap {
      animation: none;
    }
  }
</style>
