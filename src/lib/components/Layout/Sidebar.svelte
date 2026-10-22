<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';
  import { replaceState } from '$app/navigation';
  import { sfx } from '$lib/sound.svelte';
  import { wobble } from '$lib/actions/wobble';
  import { copyText, EMAIL } from '$lib/clipboard';
  import { orderedProjects } from '$lib/data/projects';

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
</script>

{#snippet logo()}
  <span
    class="grid size-10 shrink-0 place-items-center bg-primary font-mono text-sm font-semibold text-white"
  >
    ve
  </span>
{/snippet}

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
      <Icon icon={copied ? 'carbon:checkmark' : 'carbon:email'} width="18" />
    </button>
  </div>
{/snippet}

<!-- desktop: fixed sidebar -->
<aside
  class="fixed inset-y-0 left-0 z-40 hidden w-68 flex-col gap-10 border-r border-line bg-background px-7 py-8 lg:flex"
>
  <a href="/" class="flex items-center gap-3 no-underline">
    {@render logo()}
    <span class="flex flex-col font-mono leading-tight">
      <span class="text-sm font-medium text-ink-1">Vadim Egorov</span>
      <span class="mt-0.5 text-xs text-ink-3">software engineer</span>
    </span>
  </a>

  {@render nav()}

  <div class="mt-auto flex flex-col gap-4">
    {@render tools()}
    <p class="font-mono text-xs break-all text-ink-3">
      {copied ? 'email copied' : EMAIL}
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
    <div class="flex flex-col gap-6 border-t border-line px-5 py-6 sm:px-8">
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
