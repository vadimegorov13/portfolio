<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import { reveal } from '$lib/actions/reveal';
  import { decode } from '$lib/actions/decode';
  import { wobble } from '$lib/actions/wobble';
  import { featuredProjects } from '$lib/data/projects';
  import Badge from '$components/common/Badge.svelte';
  import LinkBlock from '$components/common/LinkBlock.svelte';
  import Section from '$components/common/Section.svelte';
  import HeroCanvas from '$components/HeroCanvas.svelte';
  import ProjectStrip from '$components/ProjectStrip.svelte';
  import StackGrid from '$components/StackGrid.svelte';
  import ContactPad from '$components/ContactPad.svelte';
  import ExperienceList from '$components/ExperienceList.svelte';
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

  const facts = [
    {
      label: 'Education',
      text: 'M.S. in AI, Data Science, and Engineering at UAA',
      href: MS_PROGRAM_URL,
    },
    {
      label: 'Experience',
      text: 'Large-scale web apps, product systems, and workflow-heavy software',
    },
    {
      label: 'Focus',
      text: 'Web apps, ML, backend logic, and application design',
    },
  ];

  const headshotSrc = 'headshot.jpeg';
  const capybaraSrc = 'coding_capybara.png';

  let roleIndex = $state(0);
  let showAltImage = $state(false);
  let headshotLoaded = $state(false);
  let capybaraLoaded = $state(false);

  const currentImageSrc = $derived(showAltImage ? capybaraSrc : headshotSrc);
  const currentImageAlt = $derived(
    showAltImage ? 'Coding Capybara Illustration' : 'Vadim Egorov Headshot'
  );
  const currentImageLoaded = $derived(
    showAltImage ? capybaraLoaded : headshotLoaded
  );

  function markImageLoaded(src: string) {
    if (src === headshotSrc) headshotLoaded = true;
    if (src === capybaraSrc) capybaraLoaded = true;
  }

  function preloadImage(src: string) {
    const image = new window.Image();
    image.onload = () => markImageLoaded(src);
    image.onerror = () => markImageLoaded(src);
    image.src = src;
    if (image.complete) markImageLoaded(src);
  }

  onMount(() => {
    preloadImage(headshotSrc);
    preloadImage(capybaraSrc);
    const timer = setInterval(
      () => (roleIndex = (roleIndex + 1) % roles.length),
      3200
    );
    return () => clearInterval(timer);
  });

  let photoBox: HTMLElement | undefined = $state();

  // swap pictures with a little pop
  function swapImage() {
    showAltImage = !showAltImage;
    if (!photoBox) return;
    photoBox.classList.remove('is-popping');
    void photoBox.offsetWidth;
    photoBox.classList.add('is-popping');
  }
</script>

<MetaTags title="Vadim Egorov" description="Vadim Egorov's portfolio" />

<section
  id="home"
  class="relative flex min-h-[min(92svh,860px)] items-center overflow-hidden border-b border-line"
>
  <HeroCanvas />
  <div
    class="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/10 lg:bg-linear-to-r lg:via-background/60 lg:to-transparent"
  ></div>

  <div
    class="relative mx-auto grid w-full max-w-260 grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:px-10"
  >
    <div class="flex flex-col gap-6">
      <p class="font-mono text-sm text-ink-3">
        <span class="text-primary">/</span><span
          use:decode={{ text: 'vadim-egorov', duration: 800 }}
          >vadim-egorov</span
        >
      </p>
      <h1
        class="font-mono text-5xl leading-[0.95] font-semibold tracking-[-0.035em] sm:text-6xl xl:text-7xl"
        use:decode={{ text: 'Vadim Egorov', duration: 1100, delay: 150 }}
      >
        Vadim Egorov
      </h1>
      <p class="flex items-center gap-3 font-mono text-lg font-medium">
        <span class="h-px w-9 bg-primary"></span>
        <span use:decode={{ text: roles[roleIndex], duration: 700 }}
          >{roles[0]}</span
        >
      </p>
      <p class="max-w-[46ch] text-lg text-ink-2">
        I build web products and machine learning systems. Software engineer and
        <a
          href={MS_PROGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          class="text-ink-1 underline decoration-primary/60 underline-offset-4 hover:text-primary"
          >M.S. student in AI</a
        >.
      </p>
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
      <div class="flex flex-wrap gap-2">
        {#each techRow as tech (tech)}
          <Badge text={tech} />
        {/each}
      </div>
    </div>

    <!-- no scroll reveal: the blueprint intro brings this in -->
    <div>
      <!-- plain figure: the photo plus a mono caption, no frame -->
      <figure class="flex flex-col gap-3">
        <div
          bind:this={photoBox}
          class="relative flex min-h-80 items-center justify-center"
        >
          {#if !currentImageLoaded}
            <p
              class="absolute inset-0 flex items-center justify-center font-mono text-xs tracking-[0.18em] text-primary uppercase"
            >
              Loading image
            </p>
          {/if}
          <img
            src={currentImageSrc}
            alt={currentImageAlt}
            onload={() => markImageLoaded(currentImageSrc)}
            class={`max-h-96 w-full object-contain transition-opacity duration-300 ${currentImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        <figcaption
          class="flex items-center justify-between gap-3 font-mono text-xs text-ink-3"
        >
          <span class="truncate"
            ><span class="text-primary">/</span>{currentImageSrc}</span
          >
          <button
            type="button"
            class="inline-flex shrink-0 cursor-pointer items-center gap-1.5 hover:text-primary"
            onclick={swapImage}
            aria-label="Show the other picture"
            use:wobble
          >
            {showAltImage ? 'show me' : 'show capybara'}
            <Icon icon="carbon:arrow-right" width="14" />
          </button>
        </figcaption>
      </figure>
    </div>
  </div>
</section>

<Section id="about">
  <p use:reveal={{ type: 'up' }} class="lead">
    I'm a software engineer currently pursuing an M.S. in Artificial
    Intelligence, Data Science, and Engineering at the University of Alaska
    Anchorage.
  </p>
  <p use:reveal={{ type: 'up', delay: 60 }} class="text-ink-2">
    My work spans product development, business systems, and machine learning,
    with a focus on building software that is practical, reliable, and well
    designed.
  </p>
  <dl
    use:reveal={{ type: 'up', delay: 100 }}
    class="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-3"
  >
    {#each facts as fact (fact.label)}
      <div class="flex flex-col gap-1 bg-background p-5">
        <dt class="font-mono text-xs tracking-widest text-ink-3 uppercase">
          {fact.label}
        </dt>
        <dd class="text-base leading-snug text-ink-1">
          {#if fact.href}
            <a
              href={fact.href}
              target="_blank"
              rel="noopener noreferrer"
              class="underline decoration-primary/60 underline-offset-4 hover:text-primary"
              >{fact.text} ↗</a
            >
          {:else}
            {fact.text}
          {/if}
        </dd>
      </div>
    {/each}
  </dl>
  <div>
    <LinkBlock
      href="/about"
      label="Read more"
      icon="carbon:arrow-right"
      noBorder
    />
  </div>
</Section>

<Section id="experience">
  <p use:reveal={{ type: 'up' }} class="text-ink-2">
    Professional work focused on business systems, product logic, and
    large-scale web applications.
  </p>
  <ExperienceList />
  <div class="flex flex-wrap gap-2">
    <Badge text="application architecture" />
    <Badge text="backend integration" />
    <Badge text="structured state management" />
    <Badge text="workflow-heavy business logic" />
    <Badge text="bug fixes" />
    <Badge text="product analytics" />
  </div>
  <div>
    <LinkBlock
      href="/about#experience"
      label="Full experience"
      icon="carbon:arrow-right"
      noBorder
    />
  </div>
</Section>

<ProjectStrip id="projects" projects={featuredProjects} />

<Section id="stack" wide>
  <p use:reveal={{ type: 'up' }} class="lead">Tools I reach for.</p>
  <StackGrid />
</Section>

<Section id="contacts">
  <p
    use:reveal={{ type: 'up' }}
    class="font-mono text-4xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl"
  >
    Have a role or an idea? <span class="text-primary">Let's talk.</span>
  </p>
  <p class="text-ink-2">
    If you'd like to connect, discuss a project, or just reach out, I'd be glad
    to hear from you. Email is the easiest way to reach me, and you can also
    find me on GitHub and LinkedIn.
  </p>
  <div use:reveal={{ type: 'scale' }}>
    <ContactPad />
  </div>
</Section>
