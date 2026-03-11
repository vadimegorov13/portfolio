<script lang="ts">
  import Icon from '@iconify/svelte';

  const socialLinks = [
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
    {
      href: 'mailto:vadegor00@gmail.com',
      icon: 'carbon:email',
      label: 'Email',
    },
  ];
</script>

<footer class="border-t border-border bg-darker/50 mt-20">
  <div class="mx-auto max-w-300 px-4 md:px-10 py-8 md:py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
      <div class="flex flex-col">
        <a
          href="#home"
          class="font-mono text-sm font-semibold text-primary mb-3 no-underline hover:text-white transition-colors"
        >
          /vadim-egorov
        </a>
        <p class="text-sm text-gray-300 leading-relaxed">
          Software engineer working across product systems, web development, and
          machine learning.
        </p>
      </div>

      <div class="flex flex-col md:items-end">
        <div class="flex flex-row gap-6 mb-6">
          {#each socialLinks as link (link.href)}
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              class="font-mono text-xs text-gray-300 hover:text-primary no-underline transition-colors inline-flex items-center gap-1 whitespace-nowrap"
              aria-label={link.label}
            >
              <span>{link.label}</span>
              {#if link.label !== 'Email'}
                <Icon icon="pixelarticons:external-link-sharp" />
              {/if}
            </a>
          {/each}
        </div>
        <p class="text-xs text-gray-500">
          Built with SvelteKit, TypeScript, and Tailwind
        </p>
      </div>
    </div>

    <p class="text-xs text-gray-500 text-center">© 2026 Vadim Egorov</p>
  </div>
</footer>
