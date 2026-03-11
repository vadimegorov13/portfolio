<script lang="ts">
  import { contacts } from '$lib/data/contacts';
  import Icon from '@iconify/svelte';
  import { MetaTags } from 'svelte-meta-tags';

  const isExternalHref = (href?: string) =>
    Boolean(href && !href.startsWith('mailto:'));
</script>

<MetaTags title="Contacts" description="Vadim Egorov's list of contacts" />

<div class="flex flex-col gap-10">
  <div>
    <h1 class="text-xl font-semibold">
      <span class="text-primary">/</span>contacts
    </h1>

    <p class="mt-10">
      I’m always happy to connect with other developers and professionals. If
      you’d like to talk about a project, collaboration, or opportunity, feel
      free to reach out by email or through one of the platforms below.
    </p>
  </div>

  <div class="flex flex-col text-sm gap-4">
    {#each contacts as contact (contact.name)}
      <div class="w-full flex flex-row gap-2 md:gap-6">
        <div
          class="flex items-center justify-center"
          style="width: 80px; height: 80px; min-width: 80px;"
        >
          {#if contact.icon}
            <Icon icon={contact.icon} width="80px" class="text-zinc-400" />
          {/if}
        </div>

        <div class="flex flex-col justify-center gap-1">
          <p class="w-full">{contact.description}</p>
          {#if contact.href && contact.value}
            <a
              class="w-fit text-xs md:text-sm font-mono text-primary underline"
              href={contact.href}
              target={isExternalHref(contact.href) ? '_blank' : undefined}
              rel={isExternalHref(contact.href)
                ? 'noopener noreferrer'
                : undefined}
            >
              {contact.value}
            </a>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>
