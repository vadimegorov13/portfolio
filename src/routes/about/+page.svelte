<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import { reveal } from '$lib/actions/reveal';
  import { vibrate } from '$lib/actions/vibrate';
  import LinkBlock from '$components/common/LinkBlock.svelte';
  import PageSection from '$components/common/PageSection.svelte';
  import NowList from '$components/NowList.svelte';
  import Portrait from '$components/Portrait.svelte';
  import JobList from '$components/JobList.svelte';
  import StackGrid from '$components/StackGrid.svelte';
  import { education } from '$lib/data/education';
  import { featuredProjects } from '$lib/data/projects';
  import { ACCENT, projectColor } from '$lib/portrait';

  const picks = featuredProjects
    .filter((p) => p.spotlight)
    .sort((a, b) => a.spotlight! - b.spotlight!);
</script>

<MetaTags title="About me" description="Vadim Egorov's about me page" />

<section id="about" class="scroll-mt-16 border-b border-line lg:scroll-mt-0">
  <div
    class="mx-auto flex max-w-[1100px] flex-col gap-20 px-5 py-20 sm:px-8 md:py-24 lg:px-10"
  >
    <div
      class="grid grid-cols-1 items-center gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14"
    >
      <div class="mx-auto w-full max-w-sm pr-4 md:max-w-none">
        <Portrait />
      </div>
      <div class="flex flex-col gap-5">
        <p class="font-mono text-[13px] text-primary">/about</p>
        <h1
          class="font-display text-[3.2rem] leading-[0.95] font-extrabold tracking-[-0.04em] md:text-[5.2rem]"
        >
          Hi, I'm Vadim.
        </h1>
        <p class="max-w-[30ch] text-2xl leading-snug text-balance text-ink-1">
          A software engineer who likes turning messy problems into things that
          are simple to use.
        </p>
        <NowList />
      </div>
    </div>

    <div class="grid gap-8 md:grid-cols-2 md:gap-10">
      <p
        use:reveal={{ type: 'up' }}
        class="text-[1.12rem] leading-relaxed text-ink-2 first-line:text-ink-1"
      >
        I spent my first job building a dealership platform where one wrong
        assumption could break a whole sales workflow. It taught me to care
        about structure early, and to keep things boring where they should be
        boring.
      </p>
      <p
        use:reveal={{ type: 'up', delay: 60 }}
        class="text-[1.12rem] leading-relaxed text-ink-2"
      >
        These days I'm doing a master's in AI and pointing that same mindset at
        machine learning, from brain signals to human activity. I also build
        small products on the side, mostly because I want to use them.
      </p>
    </div>
  </div>
</section>

<PageSection id="experience" title="Where I've worked">
  <JobList detailed />
</PageSection>

<PageSection
  id="projects"
  title="Things I've built"
  sub="Products, research, and tools, from a focus timer for working with friends to an EEG study on how students learn."
>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {#each picks as p, i (p.slug)}
      <a
        href="/projects#{p.slug}"
        class="pick"
        style="--c: {projectColor(p)}"
        use:reveal={{ type: 'up', delay: i * 60 }}
        use:vibrate={{ target: '.pick' }}
      >
        <img src="/{p.img}" alt={p.title} loading="lazy" />
        <span class="kind">{p.type}</span>
        <span class="title">{p.shortTitle ?? p.title}</span>
      </a>
    {/each}
  </div>
  <div>
    <LinkBlock
      href="/projects"
      label="See all projects"
      icon="carbon:arrow-right"
      size="lg"
      isPrimaryBorder
    />
  </div>
</PageSection>

<PageSection id="education" title="Education">
  <div class="grid gap-5 md:grid-cols-2">
    {#each education as ed, i (ed.degree)}
      <div
        use:reveal={{ type: 'up', delay: i * 60 }}
        class="flex items-center gap-5 border border-line border-t-4 bg-surface p-7"
        style="border-top-color: {i === 0 ? ACCENT.pink : ACCENT.green}"
      >
        <span
          class="font-display text-[3.2rem] leading-none font-extrabold tracking-[-0.04em]"
          style="color: {i === 0 ? ACCENT.pink : ACCENT.green}"
          >{ed.degree}</span
        >
        <div class="min-w-0">
          <h3 class="font-display text-lg leading-snug font-bold">
            {#if ed.href}
              <a
                href={ed.href}
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary">{ed.field} ↗</a
              >
            {:else}
              {ed.field}
            {/if}
          </h3>
          <p class="mt-1 font-mono text-xs text-ink-3">
            {ed.school} · {ed.dates}
          </p>
        </div>
      </div>
    {/each}
  </div>
</PageSection>

<PageSection
  id="skills"
  title="Skills"
  sub="Languages, frameworks, and tools I use. With sound on, every tile says its own name."
>
  <StackGrid />
</PageSection>

<style>
  .pick {
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-decoration: none;
  }

  .pick img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
    border: 1px solid var(--color-line);
    border-top: 4px solid var(--c);
    margin-bottom: 6px;
    transition:
      transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
      box-shadow 300ms;
  }

  /* lift on hover (motion pick 8A); the card also hums and shakes */
  .pick:hover img {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgb(0 0 0 / 0.45);
  }

  .kind {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--c);
  }

  .title {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--color-ink-1);
  }
</style>
