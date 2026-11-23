<script lang="ts">
  import { untrack } from 'svelte';
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { replaceState } from '$app/navigation';
  import { sfx } from '$lib/sound.svelte';
  import { wobble } from '$lib/actions/wobble';
  import { copyText, EMAIL } from '$lib/clipboard';
  import { orderedProjects } from '$lib/data/projects';
  import { roll } from '$lib/actions/roll';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  type NavLink = { href: string; label: string };

  const pages: NavLink[] = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/projects', label: 'projects' },
  ];

  const sectionsByRoute: Record<string, NavLink[]> = {
    '/': [
      { href: '#about', label: 'about' },
      { href: '#experience', label: 'experience' },
      { href: '#projects', label: 'projects' },
      { href: '#stack', label: 'stack' },
      { href: '#contacts', label: 'contacts' },
    ],
    '/about': [
      { href: '#about', label: 'about' },
      { href: '#experience', label: 'experience' },
      { href: '#projects', label: 'projects' },
      { href: '#education', label: 'education' },
      { href: '#skills', label: 'skills' },
    ],
    '/projects': orderedProjects.map((p) => ({
      href: `#${p.slug}`,
      label: p.shortTitle ?? p.title,
    })),
  };

  const socials = [
    {
      href: 'https://github.com/vadimegorov13',
      icon: 'carbon:logo-github',
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/vadimegorov13/',
      icon: 'carbon:logo-linkedin',
      label: 'LinkedIn',
    },
  ];

  let open = $state(false);
  let copied = $state(false);
  let activeSection = $state('');

  const sections = $derived(sectionsByRoute[page.route.id ?? ''] ?? []);

  async function copyEmail() {
    copied = await copyText(EMAIL);
    setTimeout(() => (copied = false), 2000);
  }

  // highlight the section currently near the top of the viewport
  $effect(() => {
    const links = sections;
    if (!links.length) {
      activeSection = '';
      return;
    }

    let ticking = false;
    let settle = 0;
    // once scrolling stops, put the current section in the URL (no history
    // entry, no jump) so a refresh comes back to it; the top clears it
    const syncHash = () => {
      const hash = activeSection;
      if (hash === location.hash) return;
      replaceState(location.pathname + location.search + hash, page.state);
    };
    const update = () => {
      ticking = false;
      const anchor = Math.min(window.innerHeight * 0.35, 280);
      let current = '';
      for (const link of links) {
        const el = document.getElementById(link.href.slice(1));
        if (el && el.getBoundingClientRect().top <= anchor) current = link.href;
      }
      activeSection = current;
    };
    const onScroll = () => {
      clearTimeout(settle);
      settle = window.setTimeout(syncHash, 250);
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });

  const isCurrentPage = (href: string) => page.url.pathname === href;

  const pageIcons: Record<string, string> = {
    '/': 'carbon:home',
    '/about': 'carbon:user',
    '/projects': 'carbon:folder',
  };
  const pad = (n: number) => String(n).padStart(2, '0');

  // Desktop: one pink marker for the current page and one for the current
  // section. They slide to the new row instead of popping (motion pick 1A).
  let deskNav: HTMLElement | undefined = $state();
  let pageMark = $state({ top: 0, h: 0, on: false });
  let secMark = $state({ top: 0, h: 0, on: false });
  let marksReady = $state(false);
  $effect(() => {
    void activeSection;
    void page.url.pathname;
    void sections;
    if (!deskNav) return;
    const row = deskNav.querySelector<HTMLElement>('.page-row.is-active');
    pageMark = row
      ? {
          top: row.offsetTop + row.offsetHeight * 0.22,
          h: row.offsetHeight * 0.56,
          on: true,
        }
      : { ...untrack(() => pageMark), on: false };
    const sub = deskNav.querySelector<HTMLElement>('.nav-sub.is-active');
    secMark = sub
      ? {
          top: sub.offsetTop + sub.offsetHeight * 0.2,
          h: sub.offsetHeight * 0.6,
          on: true,
        }
      : { ...untrack(() => secMark), on: false };
    // no slide on the very first placement
    if (!untrack(() => marksReady))
      requestAnimationFrame(() => (marksReady = true));
  });

  // the copy icon spins into a check (motion pick 6A); not on first render
  let copyFlips = $state(0);
  $effect(() => {
    void copied;
    copyFlips = Math.min(untrack(() => copyFlips) + 1, 2);
  });
</script>

{#snippet nav(onNavigate?: () => void)}
  <nav class="flex flex-col gap-0.5 font-mono text-sm" aria-label="Main">
    {#each pages as link (link.href)}
      <a
        href={link.href}
        class={`nav-link ${isCurrentPage(link.href) ? 'is-active' : ''}`}
        aria-current={isCurrentPage(link.href) ? 'page' : undefined}
        onmouseenter={sfx.tick}
        onclick={onNavigate}
      >
        <span class="text-primary">/</span>{link.label}
      </a>
      {#if isCurrentPage(link.href) && sections.length}
        <div class="mb-2 ml-3 flex flex-col border-l border-line pl-3">
          {#each sections as section (section.href)}
            <a
              href={section.href}
              title={section.label}
              class={`nav-link nav-sub ${activeSection === section.href ? 'is-active' : ''}`}
              onmouseenter={sfx.tick}
              onclick={onNavigate}
            >
              <span class="text-primary">#</span><span class="truncate"
                >{section.label}</span
              >
            </a>
          {/each}
        </div>
      {/if}
    {/each}
  </nav>
{/snippet}

{#snippet tools()}
  <div class="flex gap-1.5">
    {#each socials as social (social.href)}
      <a
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        class="icon-btn"
        aria-label={social.label}
        use:wobble
      >
        <Icon icon={social.icon} width="18" />
      </a>
    {/each}
    <button
      type="button"
      class="icon-btn"
      onclick={copyEmail}
      aria-label="Copy email address"
      title="Copy email"
      use:wobble
    >
      {#key copied}
        <span class="copy-icon" class:morph={copyFlips > 1}>
          <Icon
            icon={copied ? 'carbon:checkmark' : 'carbon:email'}
            width="18"
          />
        </span>
      {/key}
    </button>
  </div>
{/snippet}

<!-- desktop: fixed sidebar -->
<aside
  class="fixed inset-y-0 left-0 z-40 hidden w-68 flex-col border-r border-line bg-background lg:flex"
>
  <a
    href="/"
    class="flex items-center gap-3 border-b border-line px-6 py-6 no-underline"
  >
    <img
      src="/headshot.jpeg"
      alt="Vadim Egorov"
      class="size-11 shrink-0 border border-line object-cover"
    />
    <span class="flex min-w-0 flex-col font-mono leading-tight">
      <span class="text-sm font-medium text-ink-1">Vadim Egorov</span>
      <span class="mt-0.5 text-xs text-ink-3">software engineer</span>
      <span
        class="mt-1.5 self-start border border-primary/40 px-1.5 py-px text-[10px] text-primary"
        >M.S. in AI · UAA</span
      >
    </span>
  </a>

  <nav
    bind:this={deskNav}
    class="desk-nav relative flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-5 font-mono text-sm"
    class:marks-ready={marksReady}
    aria-label="Main"
  >
    <span
      class="mark page-mark"
      style="top: {pageMark.top}px; height: {pageMark.h}px; opacity: {pageMark.on
        ? 1
        : 0}"
    ></span>
    <span
      class="mark sec-mark"
      style="top: {secMark.top}px; height: {secMark.h}px; opacity: {secMark.on
        ? 1
        : 0}"
    ></span>
    {#each pages as link (link.href)}
      <a
        href={link.href}
        class={`page-row ${isCurrentPage(link.href) ? 'is-active' : ''}`}
        aria-current={isCurrentPage(link.href) ? 'page' : undefined}
        onmouseenter={sfx.tick}
      >
        <Icon icon={pageIcons[link.href]} width="16" />
        <span><span class="text-primary">/</span>{link.label}</span>
        {#if link.href === '/projects'}
          <span class="ml-auto text-xs text-ink-3 tabular-nums"
            >{pad(orderedProjects.length)}</span
          >
        {/if}
      </a>
      {#if isCurrentPage(link.href) && sections.length}
        <div
          class="mt-1 mb-2 ml-[1.1rem] flex flex-col border-l border-line pl-3"
        >
          {#each sections as section (section.href)}
            <a
              href={section.href}
              title={section.label}
              class={`nav-link nav-sub ${activeSection === section.href ? 'is-active' : ''}`}
              onmouseenter={sfx.tick}
            >
              <span class="text-primary">#</span><span class="truncate"
                >{section.label}</span
              >
            </a>
          {/each}
        </div>
      {/if}
    {/each}
  </nav>

  <div class="flex flex-col gap-3 border-t border-line px-6 py-5">
    {@render tools()}
    <p
      class="font-mono text-xs break-all text-ink-3"
      use:roll={copied ? 'email copied' : EMAIL}
    >
      {EMAIL}
    </p>
  </div>
</aside>

<!-- mobile / tablet: top bar with a menu -->
<header
  class="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur lg:hidden"
>
  <div class="flex h-14 items-center gap-3 px-5 sm:px-8">
    <a href="/" class="flex items-center gap-3 no-underline">
      <span
        class="grid size-8 place-items-center bg-primary font-mono text-xs font-semibold text-white"
        >ve</span
      >
      <span class="font-mono text-sm text-ink-1">Vadim Egorov</span>
    </a>
    <button
      type="button"
      class="icon-btn ml-auto"
      onclick={() => (open = !open)}
      aria-expanded={open}
      aria-label="Toggle menu"
    >
      <Icon icon={open ? 'carbon:close' : 'carbon:menu'} width="20" />
    </button>
  </div>
  {#if open}
    <div
      class="mobile-menu flex flex-col gap-6 border-t border-line px-5 py-6 sm:px-8"
      transition:slide={{ duration: 320, easing: cubicOut }}
    >
      {@render nav(() => (open = false))}
      {@render tools()}
    </div>
  {/if}
</header>

<style>
  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.1rem;
    padding: 0.4rem 0;
    color: var(--color-ink-3);
    text-decoration: none;
    transition:
      color 200ms ease,
      transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nav-link:hover {
    color: var(--color-ink-1);
    transform: translateX(3px);
  }

  .nav-link.is-active {
    color: var(--color-ink-1);
  }

  .nav-sub {
    padding: 0.25rem 0;
    font-size: 0.8rem;
  }

  .nav-sub.is-active::before {
    content: '';
    position: absolute;
    left: calc(-0.75rem - 1px);
    top: 20%;
    bottom: 20%;
    width: 1px;
    background: var(--color-primary);
  }

  /* desktop page links: the current page gets a pink bar */
  .page-row {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.55rem 0.75rem;
    position: relative;
    color: var(--color-ink-3);
    text-decoration: none;
    transition:
      color 200ms ease,
      transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .page-row:hover {
    color: var(--color-ink-1);
    transform: translateX(3px);
  }

  .page-row.is-active {
    color: var(--color-ink-1);
  }

  /* the sliding markers (desktop) */
  .mark {
    position: absolute;
    width: 2px;
    background: var(--color-primary);
    pointer-events: none;
    z-index: 1;
  }

  .page-mark {
    left: 0.75rem;
  }

  /* on the section list's guide line: nav padding + list indent */
  .sec-mark {
    left: calc(0.75rem + 1.1rem - 0.5px);
  }

  .marks-ready .mark {
    transition:
      top 340ms cubic-bezier(0.22, 1, 0.36, 1),
      height 340ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 200ms ease;
  }

  .desk-nav :global(.nav-sub.is-active::before) {
    display: none;
  }

  .copy-icon {
    display: grid;
  }

  .copy-icon.morph {
    animation: copy-morph 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes copy-morph {
    from {
      transform: scale(0) rotate(-90deg);
    }
  }

  /* mobile menu links drop in one after another */
  .mobile-menu :global(.nav-link) {
    animation: menu-drop 280ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  }

  .mobile-menu :global(.nav-link:nth-child(2)) {
    animation-delay: 40ms;
  }

  .mobile-menu :global(.nav-link:nth-child(3)) {
    animation-delay: 80ms;
  }

  .mobile-menu :global(.nav-link:nth-child(4)) {
    animation-delay: 120ms;
  }

  @keyframes menu-drop {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .marks-ready .mark,
    .copy-icon.morph,
    .mobile-menu :global(.nav-link) {
      transition: none;
      animation: none;
    }
  }

  .icon-btn {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--color-line);
    color: var(--color-ink-2);
    cursor: pointer;
    transition:
      color 200ms ease,
      border-color 200ms ease;
  }

  .icon-btn:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
</style>
