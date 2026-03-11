<script lang="ts">
  import Icon from '@iconify/svelte';

  let open = $state(false);

  const navLinks = [
    { href: '#home', label: 'home' },
    { href: '#experience', label: 'experience' },
    { href: '#projects', label: 'projects' },
    { href: '#about', label: 'about' },
    { href: '#contacts', label: 'contacts' },
  ];
</script>

<header
  class="bg-background border-b border-border fixed top-0 left-0 right-0 z-50"
>
  <div class="mx-auto max-w-350 px-4 sm:px-10 md:px-20 lg:px-40">
    <div class="flex flex-row justify-between items-center h-5 sm:h-10">
      <a
        href="#home"
        class="font-mono text-sm font-semibold text-white hover:text-primary no-underline transition-colors"
      >
        VE
      </a>

      <nav class="hidden sm:flex flex-row items-center gap-6">
        {#each navLinks as link (link.href)}
          <a
            href={link.href}
            class="font-mono text-xs text-gray-300 hover:text-primary no-underline transition-colors"
          >
            <span class="text-primary">#</span>{link.label}
          </a>
        {/each}
      </nav>

      <button
        class="block sm:hidden p-2 hover:text-primary transition-colors"
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
      <nav class="sm:hidden pb-4 flex flex-col gap-3">
        {#each navLinks as link (link.href)}
          <a
            href={link.href}
            class="font-mono text-sm text-gray-300 hover:text-primary no-underline transition-colors"
            onclick={() => (open = false)}
          >
            <span class="text-primary">#</span>{link.label}
          </a>
        {/each}
      </nav>
    {/if}
  </div>
</header>
