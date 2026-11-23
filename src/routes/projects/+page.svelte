<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import { reveal } from '$lib/actions/reveal';
  import { vibrate } from '$lib/actions/vibrate';
  import Badge from '$components/common/Badge.svelte';
  import LinkBlock from '$components/common/LinkBlock.svelte';
  import { orderedProjects, projectLinks } from '$lib/data/projects';
  import { projectColor } from '$lib/portrait';
</script>

<MetaTags
  title="Projects"
  description="List of the projects built by Vadim Egorov"
/>

<header class="border-b border-line">
  <div
    class="mx-auto flex max-w-[1100px] flex-col gap-4 px-5 pt-20 pb-14 sm:px-8 md:pt-24 lg:px-10"
  >
    <p class="section-label"><span class="text-primary">/</span>projects</p>
    <h1
      class="font-display text-[3.2rem] leading-[0.95] font-extrabold tracking-[-0.045em] md:text-[5.6rem]"
    >
      Things I've built
    </h1>
    <p class="max-w-[52ch] text-xl text-ink-2">
      Product development, machine learning, research, and web development. Some
      are polished applications, others are experiments, studies, and technical
      exploration.
    </p>
  </div>
</header>

<!-- every project as a case study -->
<div class="mx-auto flex max-w-[1100px] flex-col px-5 sm:px-8 lg:px-10">
  {#each orderedProjects as p, i (p.slug)}
    {@const wip = p.status === 'wip'}
    <article
      id={p.slug}
      class="flex scroll-mt-16 flex-col gap-8 py-16 md:py-20 lg:scroll-mt-0 {i
        ? 'border-t border-line'
        : ''}"
      style="--c: {projectColor(p)}"
    >
      <div
        class="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12"
      >
        <div use:reveal={{ type: 'up' }} class="flex flex-col gap-4">
          <p
            class="flex items-center gap-2.5 font-mono text-[12.5px] tracking-[0.06em] text-(--c) uppercase"
          >
            <span class="size-2.5 bg-(--c)"></span>
            {p.type} · {p.date}{wip ? ' · in progress' : ''}
          </p>
          <h2
            class="font-display text-[2.2rem] leading-none font-extrabold tracking-[-0.035em] text-balance md:text-[3.1rem]"
          >
            {p.title}{#if wip}<span class="wip-cursor ml-1"></span>{/if}
          </h2>
          <p class="max-w-[58ch] text-[1.15rem] leading-normal text-ink-1">
            {p.description}
          </p>
          {#if projectLinks(p).length}
            <div class="flex flex-wrap gap-2">
              {#each projectLinks(p) as link (link.href)}
                <LinkBlock
                  href={link.href}
                  label={link.label}
                  size="sm"
                  isExternal
                />
              {/each}
            </div>
          {/if}
        </div>

        <!-- the picture hums and shakes on hover, like the old cards -->
        <div
          use:reveal={{ type: 'up', delay: 80 }}
          class="visual relative mr-3 mb-3"
          use:vibrate
        >
          <span class="absolute inset-[12px_-12px_-12px_12px] bg-(--c)"></span>
          <div
            class="relative grid aspect-[16/10] place-items-center overflow-hidden border border-line bg-surface"
          >
            {#if p.img}
              <img
                src="/{p.img}"
                alt={p.title}
                loading={i < 2 ? 'eager' : 'lazy'}
                class="size-full object-cover object-top"
              />
            {:else if p.metrics?.length}
              <div class="flex flex-col items-center gap-2 p-6 text-center">
                <b
                  class="font-display text-5xl font-extrabold tracking-tight text-(--c)"
                  >{p.metrics[0].value}</b
                >
                <span
                  class="font-mono text-xs tracking-widest text-ink-3 uppercase"
                  >{p.metrics[0].label}</span
                >
              </div>
            {:else}
              <div
                class="flex items-center gap-2 font-mono text-sm text-primary"
              >
                <span
                  class="wip-dot inline-block size-2 rounded-full bg-primary"
                ></span>
                training<span class="wip-cursor"></span>
              </div>
            {/if}
          </div>
        </div>
      </div>

      {#if p.metrics?.length}
        <dl
          use:reveal={{ type: 'up' }}
          class="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4"
        >
          {#each p.metrics as m (m.label)}
            <div class="flex flex-col gap-1 bg-background px-5 py-4">
              <dt class="order-2 text-[0.92rem] leading-snug text-ink-2">
                {m.label}
              </dt>
              <dd
                class="font-display text-[1.9rem] leading-none font-extrabold tracking-[-0.03em] text-(--c)"
              >
                {m.value}
              </dd>
            </div>
          {/each}
        </dl>
      {/if}

      {#if p.sections?.length}
        <div
          use:reveal={{ type: 'up' }}
          class="grid grid-cols-1 gap-8 md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]"
        >
          {#each p.sections as block (block.title)}
            <div>
              <h3
                class="mb-2 border-t-2 border-(--c) pt-2.5 font-display text-xl font-bold"
              >
                {block.title}
              </h3>
              <p class="leading-relaxed text-ink-2">{block.body}</p>
            </div>
          {/each}
        </div>
      {/if}

      <div class="flex flex-wrap gap-2">
        {#each p.stack as tech (tech)}
          <Badge text={tech} />
        {/each}
      </div>
    </article>
  {/each}
</div>

<style>
  .visual img {
    transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .visual:hover img {
    transform: scale(1.03);
  }
</style>
