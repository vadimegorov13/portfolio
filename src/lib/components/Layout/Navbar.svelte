<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';

  let open = $state(false);
  let activeSection = $state('');

  const homeNavLinks = [
    { href: '#home', label: 'home' },
    { href: '#experience', label: 'experience' },
    { href: '#projects', label: 'projects' },
    { href: '#about', label: 'about' },
    { href: '#contacts', label: 'contacts' },
  ];

  const aboutNavLinks = [
    { href: '#about', label: 'about' },
    { href: '#experience', label: 'experience' },
    { href: '#projects', label: 'projects' },
    { href: '#education', label: 'education' },
    { href: '#interests', label: 'interests' },
    { href: '#skills', label: 'skills' },
  ];

  function getCurrentLinks() {
    if (page.route.id === '/') {
      return homeNavLinks;
    }

    if (page.route.id === '/about') {
      return aboutNavLinks;
    }

    return [];
  }

  function setupSectionTracking() {
    const links = getCurrentLinks();

    if (!links.length || typeof window === 'undefined') {
      activeSection = '';
      return () => {};
    }

    const sections = links
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      activeSection = '';
      return () => {};
    }

    let ticking = false;

    const updateActiveSection = () => {
      const viewportAnchor = Math.min(window.innerHeight * 0.32, 260);

      const inViewSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportAnchor && rect.bottom > viewportAnchor;
      });

      if (inViewSection) {
        activeSection = `#${inViewSection.id}`;
        return;
      }

      const closestSection = sections.reduce<HTMLElement | null>(
        (closest, section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - viewportAnchor);

          if (!closest) {
            return section;
          }

          const closestDistance = Math.abs(
            closest.getBoundingClientRect().top - viewportAnchor
          );

          return distance < closestDistance ? section : closest;
        },
        null
      );

      if (closestSection) {
        activeSection = `#${closestSection.id}`;
      }
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    const setFromHash = () => {
      if (window.location.hash) {
        activeSection = window.location.hash;
        return;
      }

      updateActiveSection();
    };

    setFromHash();
    window.requestAnimationFrame(updateActiveSection);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('hashchange', setFromHash);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', setFromHash);
    };
  }

  $effect(() => {
    const routeId = page.route.id;

    if (!routeId) {
      return;
    }

    return setupSectionTracking();
  });
</script>

<header
  class="sticky top-0 z-50 border-b border-border/70 bg-transparent backdrop-blur-sm"
>
  <div class="mx-auto max-w-300 px-4 md:px-10">
    <div class="flex flex-row justify-between items-center h-10">
      <a
        href="/"
        class="font-mono text-sm font-semibold text-white hover:text-primary no-underline transition-colors"
      >
        VE
      </a>

      {#if page.route.id === '/'}
        <nav class="hidden md:flex flex-row items-center gap-6">
          {#each homeNavLinks as link (link.href)}
            <a
              href={link.href}
              class={`motion-nav-link font-mono text-xs text-gray-300 hover:text-primary no-underline transition-colors ${activeSection === link.href ? 'is-active' : ''}`}
            >
              <span class="text-primary">#</span>{link.label}
            </a>
          {/each}
        </nav>
      {/if}

      {#if page.route.id === '/about'}
        <nav class="hidden md:flex flex-row items-center gap-6">
          {#each aboutNavLinks as link (link.href)}
            <a
              href={link.href}
              class={`motion-nav-link font-mono text-xs text-gray-300 hover:text-primary no-underline transition-colors ${activeSection === link.href ? 'is-active' : ''}`}
            >
              <span class="text-primary">#</span>{link.label}
            </a>
          {/each}
        </nav>
      {/if}

      <button
        class="block md:hidden p-2 hover:text-primary transition-colors"
        aria-label="Toggle menu"
        onclick={() => (open = !open)}
      >
        <Icon
          icon={`carbon:${open ? 'close' : 'text-align-justify'}`}
          class="text-white text-3xl"
        />
      </button>
    </div>

    {#if open}
      <nav class="md:hidden pb-4 flex flex-col gap-3">
        {#if page.route.id === '/'}
          {#each homeNavLinks as link (link.href)}
            <a
              href={link.href}
              class={`motion-nav-link font-mono text-sm text-gray-300 hover:text-primary no-underline transition-colors ${activeSection === link.href ? 'is-active' : ''}`}
              onclick={() => (open = false)}
            >
              <span class="text-primary">#</span>{link.label}
            </a>
          {/each}
        {/if}

        {#if page.route.id === '/about'}
          {#each aboutNavLinks as link (link.href)}
            <a
              href={link.href}
              class={`motion-nav-link font-mono text-sm text-gray-300 hover:text-primary no-underline transition-colors ${activeSection === link.href ? 'is-active' : ''}`}
              onclick={() => (open = false)}
            >
              <span class="text-primary">#</span>{link.label}
            </a>
          {/each}
        {/if}
      </nav>
    {/if}
  </div>
</header>
