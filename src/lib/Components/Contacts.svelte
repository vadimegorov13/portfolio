<script lang="ts">
  import type { Link } from 'src/types';
  import Icon from '@iconify/svelte';

  const contacts: Link[] = [
    {
      icon: 'carbon:email',
      name: 'vadegor00@gmail.com',
    },
    {
      href: 'https://www.linkedin.com/in/vadimegorov13/',
      icon: 'carbon:logo-linkedin',
      name: 'LinkedIn',
    },
    {
      icon: 'carbon:logo-discord',
      name: 'VadimLovesTea#9562',
    },
  ];
</script>

<div>
  <h1 class="flex flex-row w-full justify-end text-primary text-xl">
    ------------- #<span class="text-white">contacts</span>
  </h1>
  <div
    class="flex flex-col group sm:flex-row sm:justify-between justify-center gap-6 mt-10 "
  >
    <div class="text-sm text-zinc-400 max-w-[40rem]">
      I'm always happy to connect with other professionals in the industry. You
      can reach me through <span class="group-hover:gr-animation">email</span>,
      connect with me on <span class="group-hover:gr-animation">LinkedIn</span>,
      or even drop me a message on
      <span class="group-hover:gr-animation">Discord</span>. Don't hesitate to
      reach out if you have any questions or just want to chat about a project.
      My contact information is readily available for you to reach out to me.
    </div>
    <div
      class="flex flex-col gap-2 p-2 text-sm my-auto border border-border group-hover:-translate-y-2 duration-200"
    >
      <p class="w-full flex justify-center">Message me here</p>
      {#each contacts as contact}
        <div class="flex flex-row items-center text-zinc-400 gap-2">
          <Icon icon={contact.icon} class="text-2xl" />

          {#if contact.href}
            <a
              class="group-hover:gr-animation"
              href={contact.href}
              target={`_blank`}
            >
              {contact.name}
            </a>
          {:else}
            <p class="group-hover:gr-animation">{contact.name}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
