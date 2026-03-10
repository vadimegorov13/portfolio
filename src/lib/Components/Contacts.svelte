<script lang="ts">
  import { contacts as allContacts } from '$lib/data/contacts';
  import Icon from '@iconify/svelte';

  const contacts = allContacts.filter((contact) =>
    ['Email', 'LinkedIn', 'GitHub'].includes(contact.name || '')
  );

  const isExternalHref = (href?: string) =>
    Boolean(href && !href.startsWith('mailto:'));
</script>

<div>
  <h1
    class="flex flex-row w-full justify-end text-primary text-xl animate-slide-in-right"
  >
    ------------- #<span class="text-white">contacts</span>
  </h1>
  <div
    class="flex flex-col group md:flex-row md:justify-between justify-center gap-4 mt-10 animate-slide-in-up"
  >
    <div class="text-sm text-zinc-400 max-w-160">
      If you'd like to connect, discuss a project, or collaborate on something
      interesting, feel free to reach out. The best way to contact me is by
      email, but you can also find me on LinkedIn or explore my work on GitHub.
    </div>
    <div>
      <div
        class="w-50 flex flex-col gap-2 p-2 text-sm my-auto border border-border duration-200"
      >
        <p class="w-full flex justify-center">Message me here</p>
        {#each contacts as contact, index (contact.name)}
          <div
            id={contact.name}
            class="flex flex-row items-center text-zinc-400 gap-2 animate-slide-in-up"
            style="animation-delay: {index * 80}ms"
          >
            {#if contact.icon}
              <div
                class="flex items-center justify-center"
                style="width: 32px; height: 32px; min-width: 32px;"
              >
                <Icon icon={contact.icon} class="text-2xl" width="32px" />
              </div>
            {/if}

            {#if contact.href}
              <a
                class="gr-animation"
                href={contact.href}
                target={isExternalHref(contact.href) ? '_blank' : undefined}
                rel={isExternalHref(contact.href)
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {contact.name}
              </a>
            {:else}
              <p class="gr-animation">{contact.name}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
