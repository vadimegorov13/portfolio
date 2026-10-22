<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '$lib/types';
  import { projectLinks } from '$lib/data/projects';
  import { sfx } from '$lib/sound.svelte';
  import LinkBlock from '$components/common/LinkBlock.svelte';
  import Icon from '@iconify/svelte';
  import { vibrate } from '$lib/actions/vibrate';

  type Props = { id: string; projects: Project[] };
  let { id, projects }: Props = $props();

  // Pinned horizontal strip: the section is made taller by the track's
  // overflow, and scrolling down slides the track left. Below `md` it is a
  // plain vertical list.
  let section: HTMLElement;
  let track: HTMLElement;
  let progress = $state(0);
  let index = $state(0);

  const pad = (n: number) => String(n).padStart(2, '0');

  onMount(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    let distance = 0;
    let last = -1;

    const layout = () => {
      if (!desktop.matches) {
        section.style.height = '';
        track.style.transform = '';
        return;
      }
      distance = Math.max(
        0,
        track.scrollWidth - track.parentElement!.clientWidth + 48
      );
      section.style.height = `${window.innerHeight + distance}px`;
      onScroll();
    };

    const onScroll = () => {
      if (!desktop.matches) return;
      const top = section.getBoundingClientRect().top;
      progress = Math.min(1, Math.max(0, -top / (distance || 1)));
      track.style.transform = `translate3d(${-progress * distance}px,0,0)`;
      index = Math.min(
        projects.length - 1,
        Math.round(progress * (projects.length - 1))
      );
      if (last !== -1 && index !== last) sfx.tick();
      last = index;
    };

    // The browser jumps to a #hash (e.g. #contacts) before this strip makes
    // the page taller, which leaves the target too high up. Once the height is
    // final, jump to anything below the strip again.
    let userScrolled = false;
    const markScrolled = () => (userScrolled = true);
    const fixHashJump = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = id && document.getElementById(id);
      if (
        !userScrolled &&
        target &&
        section.compareDocumentPosition(target) &
          Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        target.scrollIntoView({ behavior: 'instant' });
      }
    };
    const onLoad = () => {
      layout();
      fixHashJump();
    };

    layout();
    requestAnimationFrame(fixHashJump);
    window.addEventListener('wheel', markScrolled, {
      once: true,
      passive: true,
    });
    window.addEventListener('touchmove', markScrolled, {
      once: true,
      passive: true,
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('wheel', markScrolled);
      window.removeEventListener('touchmove', markScrolled);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
      window.removeEventListener('load', onLoad);
    };
  });
</script>

<section {id} bind:this={section} class="relative border-b border-line">
  <div
    class="flex flex-col justify-center gap-6 overflow-hidden py-16 md:sticky md:top-0 md:h-svh md:py-0"
  >
    <div
      class="mx-auto flex w-full max-w-260 flex-wrap items-end justify-between gap-4 px-5 sm:px-8 lg:px-10"
    >
      <div>
        <h2 class="section-label">
          <span class="text-primary">#</span>projects
        </h2>
        <p
          class="mt-2 font-mono text-3xl leading-none font-semibold tracking-tight md:text-5xl"
        >
          Things I've built
        </p>
      </div>
      <div class="flex items-center gap-5">
        <span
          class="hidden font-mono text-sm text-ink-3 tabular-nums md:inline"
        >
          <b class="font-medium text-ink-1">{pad(index + 1)}</b> / {pad(
            projects.length
          )}
        </span>
        <LinkBlock
          href="/projects"
          label="All projects"
          icon="carbon:arrow-right"
          size="sm"
        />
      </div>
    </div>

    <div
      bind:this={track}
      class="flex flex-col gap-6 px-5 will-change-transform sm:px-8 md:flex-row md:pr-0 md:pl-[max(2rem,calc((100%-65rem)/2+2rem))] lg:pl-[max(2.5rem,calc((100%-65rem)/2+2.5rem))]"
    >
      {#each projects as project (project.slug)}
        <article
          class={`card flex flex-col md:w-[min(500px,70vw)] md:shrink-0 ${project.status === 'wip' ? 'wip' : ''}`}
        >
          <div class="aspect-video overflow-hidden bg-surface-2">
            {#if project.img}
              <img
                src={project.img}
                alt={project.title}
                class="size-full object-cover object-top"
                loading="lazy"
              />
            {:else if project.metrics?.length}
              <div
                class="flex size-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--color-primary)_14%,transparent),transparent_70%)] p-6 text-center"
              >
                <p
                  class="font-mono text-4xl font-semibold tracking-tight text-ink-1 sm:text-5xl"
                >
                  {project.metrics[0].value}
                </p>
                <p
                  class="font-mono text-xs tracking-widest text-ink-3 uppercase"
                >
                  {project.metrics[0].label}
                </p>
              </div>
            {:else}
              <div
                class="flex size-full items-center justify-center gap-2 font-mono text-sm text-primary"
              >
                <span
                  class="wip-dot inline-block size-2 rounded-full bg-primary"
                ></span>
                training<span class="wip-cursor"></span>
              </div>
            {/if}
          </div>
          <div class="flex flex-1 flex-col gap-3 p-6">
            <p
              class="font-mono text-xs tracking-[0.12em] text-primary uppercase"
            >
              {project.type}
            </p>
            <h3 class="font-mono text-xl font-medium">
              {project.shortTitle ?? project.title}
            </h3>
            <p class="text-base leading-relaxed text-ink-2">
              {project.summary}
            </p>
            <p class="font-mono text-xs text-ink-3">
              {project.stack.join(' · ')}
            </p>
            <div class="mt-auto flex flex-wrap gap-2 pt-2">
              <!-- hum + glow, and the whole card vibrates (like View Projects) -->
              <a
                href={`/projects#${project.slug}`}
                class="btn btn-primary glow-on-hover px-3 py-1 text-xs"
                use:vibrate={{ target: 'article' }}
              >
                Read more
                <Icon icon="carbon:arrow-right" class="btn-icon" />
              </a>
              {#each projectLinks(project) as link (link.href)}
                <LinkBlock
                  href={link.href}
                  label={link.label}
                  size="sm"
                  isExternal
                />
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>

    <div class="mx-auto hidden w-full max-w-260 px-5 sm:px-8 md:block lg:px-10">
      <div class="h-px bg-line">
        <div class="h-px bg-primary" style={`width: ${progress * 100}%`}></div>
      </div>
    </div>
  </div>
</section>

<style>
  .wip {
    border-style: dashed;
    border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
    background: color-mix(in srgb, var(--color-primary) 6%, transparent);
  }
</style>
