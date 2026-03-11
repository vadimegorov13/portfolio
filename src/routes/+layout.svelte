<script lang="ts">
  import { onMount } from 'svelte';
  import Footer from '$components/Layout/Footer.svelte';
  import Navbar from '$components/Layout/Navbar.svelte';
  import OpeningIntro from '$components/Layout/OpeningIntro.svelte';
  import { initializeIconify } from '$lib/iconify';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../app.css';

  let { children } = $props();
  let showOpeningIntro = $state(false);
  let introReady = $state(false);

  initializeIconify();
  injectAnalytics();

  onMount(() => {
    const isHomeRoute = window.location.pathname === '/';
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isHomeRoute && !prefersReducedMotion) {
      showOpeningIntro = true;
    } else {
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
  class={`page-shell h-screen text-white ${showOpeningIntro ? 'page-shell-intro-hidden' : 'page-shell-intro-visible'}`}
>
  <Navbar />
  <div class="mx-auto max-w-300 px-4 pt-40 pb-20 sm:px-10 md:px-20">
    {#if introReady || !showOpeningIntro}
      {@render children?.()}
    {/if}
  </div>
  <Footer />
</div>
