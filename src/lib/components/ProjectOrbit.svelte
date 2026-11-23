<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '$lib/types';
  import { projectLinks } from '$lib/data/projects';
  import { sfx } from '$lib/sound.svelte';
  import { roll } from '$lib/actions/roll';
  import { typeOn } from '$lib/actions/typeOn';
  import { projectColor } from '$lib/portrait';
  import LinkBlock from '$components/common/LinkBlock.svelte';
  import {
    CARD_H,
    CARD_W,
    focusAt,
    isResting,
    panelBox,
    place,
    project as flatten,
    smooth,
    spotlight,
    mix,
    type Geo,
    type Slot,
  } from '$lib/projectOrbit';

  // Scroll-driven projects section; the layout math lives in
  // src/lib/projectOrbit.ts. Projects with `spotlight` set get their own stop
  // in front (in that order), every other project ends up in the grid.
  type Props = { id: string; projects: Project[] };
  let { id, projects }: Props = $props();

  const picks = $derived(
    projects
      .filter((p) => p.spotlight)
      .sort((a, b) => a.spotlight! - b.spotlight!)
      .map((p) => p.slug)
  );
  const pickOf = (slug: string) => picks.indexOf(slug);

  let section: HTMLElement;
  let stage: HTMLElement;
  let area: HTMLElement;
  const els: HTMLElement[] = $state([]);

  let geo: Geo = $state({ w: 1200, h: 700, mobile: false });
  let reduced = $state(false);
  let p = $state(0);
  let focus = $state({ idx: -1, amt: 0 });

  // clicking a card brings it to the spotlight, like the picks
  let opened = $state(-1); // card in (or flying to) the spotlight
  let openOn = $state(false); // true = opening/open, false = closing
  let openT = $state(0); // 0..1
  let openedAtY = 0;

  // hover grow: only once the grid is done AND the mouse really moved
  let armed = $state(false);

  // all cards in their slots (hover grow and the hint only then)
  const done = $derived(isResting(p, picks.length));
  const focused = $derived(
    focus.idx >= 0
      ? (projects.find((pr) => pickOf(pr.slug) === focus.idx) ?? null)
      : null
  );
  const shown = $derived(opened >= 0 && openT > 0 ? projects[opened] : focused);
  const shownAmt = $derived(
    opened >= 0 && openT > 0 ? openT * openT * (3 - 2 * openT) : focus.amt
  );
  const panel = $derived(panelBox(geo));

  const pad = (n: number) => String(n).padStart(2, '0');

  function openCard(i: number) {
    if (i === opened && openOn) return;
    opened = i;
    openT = 0;
    openOn = true;
    armed = false;
    openedAtY = window.scrollY;
    sfx.tick();
  }
  const closeCard = () => (openOn = false);

  onMount(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const phone = window.matchMedia('(max-width: 767px)');
    reduced = motion.matches;

    const measure = () => {
      geo = {
        w: area.clientWidth,
        h: area.clientHeight,
        mobile: phone.matches,
      };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(area);

    let last = performance.now();
    let raf = 0;
    let lastFocus = -1;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const rect = section.getBoundingClientRect();
      const span = rect.height - stage.clientHeight;
      p = reduced
        ? 1
        : Math.min(1, Math.max(0, -rect.top / (span > 0 ? span : 1)));

      // open / close (~0.45s)
      const step = reduced ? 1 : dt / 0.45;
      if (openOn) openT = Math.min(1, openT + step);
      else if (openT > 0) openT = Math.max(0, openT - step);
      if (!openOn && openT === 0) opened = -1;

      const n = projects.length;
      const kn = n - picks.length;
      const dim = smooth(0, 1, openT);
      let k = 0;
      for (let i = 0; i < n; i++) {
        const el = els[i];
        if (!el) continue;
        const pick = pickOf(projects[i].slug);
        const slot: Slot = {
          i,
          n,
          pick,
          picks: picks.length,
          k: pick < 0 ? k++ : -1,
          kn,
          p,
        };
        const placed = place(geo, slot);
        let pose = { ...placed } as typeof placed;
        let zi = placed.zi;

        if (i === opened) {
          pose = { ...pose, ...mix(pose, spotlight(geo), dim) };
          if (openT > 0) zi = 6000;
        } else if (dim > 0) {
          pose.o *= 1 - 0.94 * dim;
        }

        const f = flatten(pose);
        el.style.transform = `translate(${f.x}px, ${f.y}px) scale(${f.s})`;
        el.style.opacity = String(pose.o);
        el.style.zIndex = String(zi);
        el.dataset.on = placed.on ? '1' : '';
        el.dataset.open = i === opened ? '1' : '';
      }

      const fo = focusAt(p, picks.length);
      if (fo.idx !== focus.idx || Math.abs(fo.amt - focus.amt) > 0.01)
        focus = fo;
      if (fo.idx !== lastFocus && fo.idx >= 0) sfx.tick();
      lastFocus = fo.idx;
      if (armed && !done) armed = false;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // a still cursor ends up over cards while scrolling; only a real mouse
    // move (new coordinates) at the end of the section unlocks hover grow
    let mx = NaN;
    let my = NaN;
    const onMove = (e: MouseEvent) => {
      if (e.clientX === mx && e.clientY === my) return;
      mx = e.clientX;
      my = e.clientY;
      if (done) armed = true;
    };
    const onScroll = () => {
      armed = false;
      if (openOn && Math.abs(window.scrollY - openedAtY) > 40) closeCard();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && openOn) closeCard();
    };
    const onMotion = () => (reduced = motion.matches);

    // The browser jumps to a #hash (e.g. #contacts) before this section's
    // height is final, which can leave the target too high up. Jump to
    // anything below the section again, unless the visitor already scrolled.
    let userScrolled = false;
    const markScrolled = () => (userScrolled = true);
    const fixHashJump = () => {
      const target = decodeURIComponent(location.hash.slice(1));
      const el = target && document.getElementById(target);
      if (
        !userScrolled &&
        el &&
        section.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING
      ) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    };
    requestAnimationFrame(fixHashJump);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', markScrolled, {
      once: true,
      passive: true,
    });
    window.addEventListener('touchmove', markScrolled, {
      once: true,
      passive: true,
    });
    window.addEventListener('load', fixHashJump);
    motion.addEventListener('change', onMotion);
    phone.addEventListener('change', measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', markScrolled);
      window.removeEventListener('touchmove', markScrolled);
      window.removeEventListener('load', fixHashJump);
      motion.removeEventListener('change', onMotion);
      phone.removeEventListener('change', measure);
    };
  });
</script>

<section
  {id}
  bind:this={section}
  class="relative"
  style="height: {reduced ? 100 : geo.mobile ? 420 : 460}svh"
>
  <!-- tapping/clicking empty space closes an open card -->
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    bind:this={stage}
    class="sticky top-[57px] flex h-[calc(100svh-57px)] flex-col overflow-hidden lg:top-0 lg:h-svh"
    onclick={(e) => {
      if (
        openOn &&
        !(e.target as HTMLElement).closest('.orbit-card, .spot-panel')
      )
        closeCard();
    }}
  >
    <div
      class="mx-auto flex w-full max-w-260 flex-wrap items-end justify-between gap-x-4 gap-y-3 px-5 pt-5 sm:px-8 md:pt-12 lg:px-10"
    >
      <div>
        <h2 class="section-label">
          <span class="text-primary">#</span>projects
        </h2>
        <p
          class="mt-2 font-display text-[2.4rem] leading-none font-extrabold tracking-[-0.035em] md:text-[3.4rem]"
        >
          Things I've built
        </p>
      </div>
      <div class="flex items-center gap-5">
        <span class="font-mono text-xs text-ink-3 tabular-nums md:text-sm">
          {#if focus.idx >= 0 && opened < 0}
            featured <b
              class="font-medium text-ink-1"
              use:roll={pad(focus.idx + 1)}
            ></b>
            / {pad(picks.length)}
          {:else}
            <b class="font-medium text-ink-1">{pad(projects.length)}</b> projects
          {/if}
        </span>
        <LinkBlock
          href="/projects"
          label="All projects"
          icon="carbon:arrow-right"
          size="sm"
        />
      </div>
    </div>

    <!-- the cards live here; positions are relative to its center -->
    <div bind:this={area} class="relative mx-2 my-3 min-h-0 flex-1 md:mx-8">
      <div
        class="absolute top-1/2 left-1/2 h-0 w-0"
        class:armed={armed && !openOn}
        class:has-open={openOn}
      >
        {#each projects as project, i (project.slug)}
          {@const pick = pickOf(project.slug)}
          <button
            type="button"
            bind:this={els[i]}
            onclick={() => openCard(i)}
            aria-label={`Open ${project.title}`}
            class="orbit-card absolute cursor-pointer text-left"
            style="width: {CARD_W}px; height: {CARD_H}px; top: {-CARD_H /
              2}px; left: {-CARD_W / 2}px; opacity: 0"
          >
            <!-- the face is the blueprint piece; the button moves -->
            <div
              data-bp-piece
              style="--c: {projectColor(project)}"
              class="face flex size-full flex-col overflow-hidden border border-t-[3px] border-t-(--c) bg-surface {pick >=
              0
                ? 'border-ink-3/40'
                : 'border-line'} {project.status === 'wip' ? 'wip' : ''}"
            >
              <div class="relative h-[92px] shrink-0 bg-surface-2">
                {#if project.img}
                  <img
                    src={`/${project.img}`}
                    alt=""
                    class="size-full object-cover object-top"
                    draggable="false"
                  />
                {:else if project.metrics?.length}
                  <div
                    class="flex size-full flex-col items-center justify-center gap-0.5"
                  >
                    <span class="font-mono text-lg font-semibold text-ink-1"
                      >{project.metrics[0].value}</span
                    >
                    <span
                      class="font-mono text-[8px] tracking-widest text-ink-3 uppercase"
                      >{project.metrics[0].label}</span
                    >
                  </div>
                {:else if project.status === 'wip'}
                  <div
                    class="flex size-full items-center justify-center gap-1.5 font-mono text-[10px] text-primary"
                  >
                    <span
                      class="wip-dot inline-block size-1.5 rounded-full bg-primary"
                    ></span>
                    training<span class="wip-cursor"></span>
                  </div>
                {:else}
                  <div
                    class="flex size-full items-center justify-center font-mono text-[9px] tracking-[0.2em] text-ink-3 uppercase"
                  >
                    {project.type}
                  </div>
                {/if}
                {#if pick >= 0}
                  <span
                    class="badge absolute top-1.5 left-1.5 bg-primary px-1.5 py-0.5 font-mono text-[9px] font-semibold text-background"
                    >★ {pad(pick + 1)}</span
                  >
                {/if}
              </div>
              <div class="flex flex-1 flex-col justify-center gap-0.5 px-2.5">
                <p
                  class="truncate font-display text-[14px] font-bold tracking-[-0.01em] text-ink-1"
                >
                  {project.shortTitle ?? project.title}
                </p>
                <p class="truncate font-mono text-[9px] text-(--c) uppercase">
                  {project.type} · {project.date}
                </p>
              </div>
            </div>
          </button>
        {/each}
      </div>

      <!-- text for the card in the spotlight -->
      {#if shown}
        {@const pickNo = pickOf(shown.slug)}
        <div
          class="spot-panel absolute z-[7000] flex flex-col gap-3 overflow-y-auto md:gap-4"
          style="left: {panel.left}px; top: {panel.top}px; width: {panel.width}px; max-height: {panel.maxHeight}px; opacity: {shownAmt}; transform: translateY(calc({panel.center
            ? '-50%'
            : '0px'} + {(1 - shownAmt) * 20}px)); pointer-events: {shownAmt >
          0.5
            ? 'auto'
            : 'none'}"
        >
          <p class="font-mono text-xs tracking-widest text-ink-2 uppercase">
            {pickNo >= 0
              ? `Featured ${pad(pickNo + 1)} / ${pad(picks.length)}`
              : 'Project'} · {shown.type}
          </p>
          <!-- typeOn types the title in and sets its aria-label -->
          <!-- svelte-ignore a11y_missing_content -->
          <h3
            class="font-display text-2xl leading-none font-extrabold tracking-[-0.03em] md:text-[2.6rem]"
            use:typeOn={shown.title}
          ></h3>
          <p
            class="line-clamp-3 text-sm text-ink-2 md:line-clamp-none md:text-base"
          >
            {shown.summary}
          </p>
          {#if shown.stack.length}
            <!-- no room for the stack on phones -->
            <div class="hidden flex-wrap gap-1.5 md:flex">
              {#each shown.stack as tech (tech)}
                <span class="chip">{tech}</span>
              {/each}
            </div>
          {/if}
          <div class="flex flex-wrap items-center gap-2">
            <LinkBlock
              href={`/projects#${shown.slug}`}
              label="Read more"
              icon="carbon:arrow-right"
              size="sm"
              isPrimaryBorder
            />
            {#each projectLinks(shown) as link (link.href)}
              <LinkBlock
                href={link.href}
                label={link.label}
                size="sm"
                isExternal
              />
            {/each}
          </div>
          {#if openOn}
            <button
              type="button"
              class="cursor-pointer self-start font-mono text-xs text-ink-3 hover:text-primary"
              onclick={closeCard}>✕ close</button
            >
          {/if}
        </div>
      {/if}
    </div>

    <div class="mx-auto w-full max-w-260 px-5 pb-5 sm:px-8 lg:px-10">
      <div class="h-px bg-line">
        <div class="h-px bg-primary" style="width: {p * 100}%"></div>
      </div>
      <p
        class="mt-2 h-4 font-mono md:text-center text-[11px] text-ink-3 transition-opacity duration-500 {done &&
        !openOn
          ? 'opacity-100'
          : 'opacity-0'}"
      >
        <span class="md:hidden">tap a project to open it</span>
        <span class="hidden md:inline">click any project to open it</span>
      </p>
    </div>
  </div>
</section>

<style>
  .orbit-card {
    transform-origin: center;
  }
  .badge {
    opacity: 0;
    transition: opacity 0.3s;
  }
  :global(.orbit-card[data-on='1']) .badge {
    opacity: 1;
  }
  .face {
    transition:
      transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.3),
      border-color 0.15s,
      box-shadow 0.25s;
  }
  .orbit-card:focus-visible {
    outline: none;
  }
  .orbit-card:focus-visible .face {
    border-color: var(--color-primary);
  }
  .wip {
    border-style: dashed;
    border-color: color-mix(in srgb, var(--color-primary) 40%, transparent);
  }
  /* while a card is open the others ignore clicks; a click anywhere else
     lands on the stage and closes it */
  .has-open :global(.orbit-card:not([data-open='1'])) {
    pointer-events: none;
  }
  /* small grid cards grow on hover (mouse only, after the grid is done) */
  @media (hover: hover) and (pointer: fine) {
    .armed :global(.orbit-card:hover) {
      z-index: 99999 !important;
    }
    .armed .orbit-card:hover .face {
      transform: scale(1.45);
      border-color: var(--color-primary);
      box-shadow: 0 20px 50px rgb(0 0 0 / 0.55);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .face,
    .badge {
      transition: none;
    }
  }
</style>
