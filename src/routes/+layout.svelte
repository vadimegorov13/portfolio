<script lang="ts">
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import Footer from '$components/Layout/Footer.svelte';
  import Navbar from '$components/Layout/Navbar.svelte';
  import OpeningIntro from '$components/Layout/OpeningIntro.svelte';
  import { initializeIconify } from '$lib/iconify';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../app.css';

  const isHomeInitial = page.route.id === '/';

  let { children } = $props();
  let showOpeningIntro = $state(isHomeInitial);
  let introReady = $state(!isHomeInitial);

  initializeIconify();
  injectAnalytics();

  onMount(() => {
    const isHomeRoute = window.location.pathname === '/';
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isHomeRoute && !prefersReducedMotion) {
      showOpeningIntro = true;
      introReady = false;
    } else {
      showOpeningIntro = false;
      introReady = true;
    }
  });

  function handleIntroComplete() {
    showOpeningIntro = false;
    introReady = true;
  }
</script>

{#if showOpeningIntro}
  <OpeningIntro on:complete={handleIntroComplete} />
{/if}

<div
  class={`page-shell min-h-screen text-white ${showOpeningIntro ? 'page-shell-intro-hidden' : 'page-shell-intro-visible'}`}
>
  <Navbar />
  <div
    class="mx-auto max-w-300 px-4 pt-10 md:pt-20 lg:pt-40 pb-5 md:pb-10 lg:pb-20 sm:px-10 md:px-20"
  >
    {#if introReady || !showOpeningIntro}
      {@render children?.()}
    {/if}
  </div>
  <Footer />
</div>
