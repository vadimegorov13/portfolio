<script lang="ts">
  import type { Link } from 'src/types';
  import Icon from '@iconify/svelte';
  import { slide } from 'svelte/transition';

  let showBg = false;
  let open = false;
  let scrollY = 0;

  const handleShowBg = () => {
    const scrollListener = () => {
      if (scrollY > 30 || open == true) {
        showBg = true;
      } else {
        showBg = false;
      }
    };
    window.addEventListener('scroll', scrollListener);
  };

  $: scrollY && handleShowBg();

  const links: Link[] = [
    {
      slug: '/',
      name: 'home',
    },
    {
      slug: '/about',
      name: 'about-me',
    },
    {
      slug: '/works',
      name: 'works',
    },
    {
      slug: '/contacts',
      name: 'contacts',
    },
  ];
</script>

<svelte:window bind:scrollY />

<div class="w-screen top-0 z-50 fixed">
  <div
    class={`pt-10 sm:pt-0  block sm:flex sm:flex-row items-center justify-center duration-500 
      border border-b-1 border-x-0 border-t-0 ${
        showBg || open
          ? `border-border bg-darker/90 backdrop-blur-xl pt-0 ${
              open ? 'h-[10rem]' : 'h-14'
            }`
          : 'bg-transparent border-transparent h-40'
      }`}
  >
    <div class="w-full mx-auto max-w-[90rem] px-4 sm:px-10 md:px-20 lg:px-40">
      <div class="w-full flex flex-row justify-between items-center">
        <a
          class="p-2 sm:p-0 font-semibold items-center justify-start no-underline"
          href="/"
        >
          VE
        </a>
        <div
          class="hidden sm:flex flex-row items-center justify-center gap-6 transition-all ease-in-out duration-500"
        >
          {#each links as link}
            <a
              href={`${link.slug}`}
              class="duration-200 cursor-pointer hover:text-primary"
            >
              <span class="text-primary">#</span>{`${link.name}`}
            </a>
          {/each}
        </div>
        <div class="block sm:hidden p-2">
          <button
            on:click={() => {
              open = !open;
            }}
          >
            <Icon
              icon={`carbon:${open ? 'close' : 'text-align-justify'}`}
              class="text-white text-3xl duration-200 hover:text-primary"
            />
          </button>
        </div>
      </div>
      <div class="block sm:hidden">
        {#if open}
          <div class="flex flex-col duration-500 transition-all">
            {#each links as link}
              <a
                transition:slide={{ duration: 600 }}
                href={`${link.slug}`}
                class="cursor-pointer hover:text-primary"
              >
                <span class="text-primary">#</span>{`${link.name}`}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
