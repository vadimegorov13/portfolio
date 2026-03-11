<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';

  let open = $state(false);

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
</script>

<header
  class="bg-background border-b border-border fixed top-0 left-0 right-0 z-50"
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
              class="font-mono text-xs text-gray-300 hover:text-primary no-underline transition-colors"
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
              class="font-mono text-xs text-gray-300 hover:text-primary no-underline transition-colors"
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
              class="font-mono text-sm text-gray-300 hover:text-primary no-underline transition-colors"
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
              class="font-mono text-sm text-gray-300 hover:text-primary no-underline transition-colors"
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
