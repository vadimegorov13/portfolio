<script lang="ts">
  import type { Link } from 'src/types';
  import Icon from '@iconify/svelte';

  const contacts: Link[] = [
    {
      icon: 'carbon:email',
      name: 'vadegor00@gmail.com',
      description:
        ' I am prompt in responding to emails and will make sure to address all inquiries.',
    },
    {
      icon: 'carbon:logo-discord',
      name: 'VadimLovesTea#9562',
      description:
        'I am active on Discord and will reply to messages as soon as possible.',
    },
    {
      href: 'https://github.com/vadimegorov13',
      icon: 'carbon:logo-github',
      name: 'GitHub',
      description: 'Check out my latest projects on Github.',
    },
    {
      href: 'https://www.linkedin.com/in/vadimegorov13/',
      icon: 'carbon:logo-linkedin',
      name: 'LinkedIn',
      description: 'Connect with me!',
    },
    {
      href: ' https://profile.indeed.com/?hl=en_US&co=US&from=gnav-menu-homepage&_ga=2.198835887.1699684602.1673660855-1317022637.1668652652&_gac=1.262700414.1673129916.Cj0KCQiAzeSdBhC4ARIsACj36uGhZXk1_vv4B5qwVhyCoX2xgUYjjsbYdksOna-TSpas3oBgGRVR7DwaAldlEALw_wcB',
      icon: 'cib:indeed',
      name: 'Indeed',
      description:
        'My Indeed profile has additional information about my experience and skills.',
    },
    {
      href: 'https://devpost.com/vadegor00?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav',
      icon: 'simple-icons:devpost',
      name: 'Devpost',
      description:
        'Check out my Devpost profile for an overview of my hackathon projects and participation.',
    },
  ];
</script>

<svelte:head>
  <title>Contacts</title>
</svelte:head>

<div class="flex flex-col gap-20">
  <div>
    <h1 class="text-xl font-semibold">
      <span class="text-primary">/</span>contacts
    </h1>

    <p class="mt-10 text-zinc-400">
      I'm always happy to connect with other professionals in the industry. You
      can reach me through email, connect with me on LinkedIn, or even drop me a
      message on Discord. Don't hesitate to reach out if you have any questions
      or just want to chat about a project. My contact information is readily
      available for you to reach out to me.
    </p>
  </div>

  <div class="flex flex-col text-sm group gap-6">
    {#each contacts as contact}
      <div class="w-full flex flex-row text-zinc-400 gap-6">
        <Icon
          icon={contact.icon}
          class="text-2xl smd:text-6xl text-zinc-400 mr-2 "
        />

        <div class="flex flex-col justify-center">
          {#if contact.href}
            <a
              class="group-hover:gr-animation justify-start border border-border border-x-0 border-t-0"
              href={contact.href}
              target={`_blank`}
            >
              {contact.name}
            </a>
          {:else}
            <p
              class="group-hover:gr-animation justify-end border border-border border-x-0 border-t-0"
            >
              {contact.name}
            </p>
          {/if}
          <p class="w-full mt-2">{contact.description}</p>
        </div>
      </div>
    {/each}
  </div>

  <div class="flex flex-col">
    <h1 class="text-xl font-semibold">
      <span class="text-primary">#</span>email-me
    </h1>
    <form
      action="https://api.staticforms.xyz/submit"
      method="post"
      class="flex flex-col gap-4 content m-4"
    >
      <input
        type="hidden"
        name="accessKey"
        value="440fea79-fdf4-44b4-b74b-8d4a4c820ee3"
      />
      <div>
        <label for="name" class="mr-5">Name</label>
        <input
          type="text"
          name="name"
          placeholder="name"
          id="name"
          class="pl-1 text-border"
        />
      </div>
      <div>
        <label for="email">E-mail</label>
        <input
          type="text"
          name="email"
          placeholder="email"
          id="email"
          class="pl-1 text-border"
        />
      </div>

      <div class="flex flex-col">
        <label for="subject">Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="subject"
          id="subject"
          class="pl-1 mt-1 text-border"
        />
      </div>

      <div class="flex flex-col">
        <label for="message">Message</label>
        <textarea
          name="message"
          placeholder="message"
          id="message"
          class="pl-1 mt-1 text-border h-40"
        />
      </div>

      <input
        type="hidden"
        name="redirectTo"
        value="http://localhost:5173/contacts"
      />
      <input type="text" name="honeypot" style="display: none;" />
      <div class="flex flex-col justify-center items-center">
        <input
          type="submit"
          value="Send"
          class="w-14 text-lg hover:text-primary cursor-pointer"
        />
      </div>
    </form>
  </div>
</div>
