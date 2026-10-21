<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { MetaTags } from 'svelte-meta-tags';
  import ImageLoader from '$components/Image/ImageLoader.svelte';
  import Badge from '$lib/components/common/Badge.svelte';
  import LinkBlock from '$lib/components/common/LinkBlock.svelte';
  import Section from '$lib/components/common/Section.svelte';
  import { orderedProjects, projectLinks } from '$lib/data/projects';

  const categories = ['Product', 'Research', 'Full-stack'];

  const inProgress = orderedProjects.filter((p) => p.status === 'wip');
  const finished = orderedProjects.filter((p) => p.status !== 'wip');
</script>

<MetaTags
  title="Projects"
  description="List of the projects built by Vadim Egorov"
/>

<Section id="projects" prefix="/">
  <p use:reveal={{ type: 'up' }} class="lead">
    Product development, machine learning, research, and web development.
  </p>
  <p use:reveal={{ type: 'up', delay: 50 }} class="text-ink-2">
    This page highlights a selection of projects across product development,
    machine learning, research, and web development. Some are polished
    applications, while others reflect experiments, studies, and technical
    exploration across different areas of my work.
  </p>
  <div class="flex flex-wrap gap-2">
    {#each categories as category (category)}
      <Badge text={category} />
    {/each}
  </div>

  {#each inProgress as project (project.slug)}
    <article
      id={project.slug}
      use:reveal={{ type: 'up', delay: 80 }}
      class="flex scroll-mt-20 flex-col gap-3 border border-dashed border-primary/40 bg-primary/5 p-5 sm:p-6 lg:scroll-mt-8"
    >
      <p
        class="flex items-center gap-2 font-mono text-xs tracking-widest text-primary uppercase"
      >
        <span class="wip-dot inline-block size-2 rounded-full bg-primary"
        ></span>
        In progress · {project.type}
      </p>
      <h2 class="font-mono text-xl font-medium sm:text-2xl">
        {project.title}<span class="wip-cursor ml-1"></span>
      </h2>
      <p class="text-ink-2">{project.description}</p>
      {#each project.sections ?? [] as block (block.title)}
        <div class="flex flex-col gap-1.5">
          <h3 class="font-mono text-sm font-medium text-ink-1">
            <span class="text-primary">##</span>
            {block.title}
          </h3>
          <p class="text-ink-2">{block.body}</p>
        </div>
      {/each}
      <div class="flex flex-wrap gap-2">
        {#each project.stack as tech (tech)}
          <Badge text={tech} />
        {/each}
      </div>
      {#if projectLinks(project).length}
        <div class="flex flex-wrap gap-2">
          {#each projectLinks(project) as link (link.href)}
            <LinkBlock
              href={link.href}
              label={link.label}
              size="sm"
              isExternal
            />
          {/each}
        </div>
      {/if}
    </article>
  {/each}
</Section>

{#each finished as project (project.slug)}
  <Section id={project.slug} label={project.date} prefix="">
    <article use:reveal={{ type: 'up' }} class="flex flex-col gap-5">
      <p class="font-mono text-xs tracking-widest text-primary uppercase">
        {project.category}
      </p>
      <h2
        class="font-mono text-2xl leading-tight font-medium text-balance sm:text-3xl"
      >
        {project.title}
      </h2>
      <p class="text-ink-2">{project.description}</p>
      {#if project.metrics?.length}
        <dl
          class="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4"
        >
          {#each project.metrics as metric (metric.label)}
            <div class="flex flex-col gap-1 bg-background p-4">
              <dt
                class="order-2 font-mono text-xs tracking-wider text-ink-3 uppercase"
              >
                {metric.label}
              </dt>
              <dd class="font-mono text-xl font-semibold text-ink-1">
                {metric.value}
              </dd>
            </div>
          {/each}
        </dl>
      {/if}
      {#each project.sections ?? [] as block (block.title)}
        <div class="flex flex-col gap-1.5">
          <h3 class="font-mono text-sm font-medium text-ink-1">
            <span class="text-primary">##</span>
            {block.title}
          </h3>
          <p class="text-ink-2">{block.body}</p>
        </div>
      {/each}
      <div class="flex flex-wrap gap-2">
        {#each project.stack as tech (tech)}
          <Badge text={tech} />
        {/each}
      </div>
      {#if projectLinks(project).length}
        <div class="flex flex-wrap gap-2">
          {#each projectLinks(project) as link, i (link.href)}
            <LinkBlock
              href={link.href}
              label={link.label}
              isPrimaryBorder={i === 0}
              isExternal
            />
          {/each}
        </div>
      {/if}
      <!-- projects with metrics but no screenshot skip the placeholder -->
      {#if project.img || !project.metrics}
        <div class="card w-full max-w-xl overflow-hidden">
          {#if project.img}
            <ImageLoader
              src={project.img}
              alt={project.title}
              classProps="aspect-video w-full object-cover object-top"
            />
          {:else}
            <div
              class="flex aspect-video w-full items-center justify-center font-mono text-xs tracking-[0.2em] text-ink-3 uppercase"
            >
              Screenshot coming soon
            </div>
          {/if}
        </div>
      {/if}
    </article>
  </Section>
{/each}
