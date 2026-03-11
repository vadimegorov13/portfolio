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
  <h1 class="flex flex-row w-full justify-end text-primary text-xl">
    ------------- #<span class="text-white">contacts</span>
  </h1>
  <div
    class="flex flex-col group md:flex-row md:justify-between justify-center gap-4 mt-10"
  >
    <div class="text-sm text-zinc-400 max-w-160">
      If you’d like to connect, discuss a project, or just reach out, I’d be
      glad to hear from you. Email is the easiest way to reach me, and you can
      also find me on GitHub and LinkedIn.
    </div>
    <div>
      <div
        class="w-50 flex flex-col gap-2 p-2 text-sm my-auto border border-border"
      >
        <p class="w-full flex justify-center">Get in touch</p>
        {#each contacts as contact (contact.name)}
          <div
            id={contact.name}
            class="flex flex-row items-center text-zinc-400 gap-2"
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
                class="text-primary underline"
                href={contact.href}
                target={isExternalHref(contact.href) ? '_blank' : undefined}
                rel={isExternalHref(contact.href)
                  ? 'noopener noreferrer'
                  : undefined}
              >
                {contact.name}
              </a>
            {:else}
              <p class="text-primary">{contact.name}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
