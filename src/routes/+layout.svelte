<script lang="ts">
  import { onMount } from 'svelte';
  import { afterNavigate, onNavigate } from '$app/navigation';
  import { pageFlash } from '$lib/pageFlash';
  import Footer from '$components/Layout/Footer.svelte';
  import Sidebar from '$components/Layout/Sidebar.svelte';
  import SoundToggle from '$components/SoundToggle.svelte';
  import { initializeIconify } from '$lib/iconify';
  import { initSound } from '$lib/sound.svelte';
  import { runBlueprint } from '$lib/blueprint';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../app.css';

  let { children } = $props();
  initializeIconify();
  injectAnalytics();

  onMount(() => {
    initSound();
    void runBlueprint();
  });

  // flash the new page in blueprint blue when moving between pages (not on
  // the first load, not for #hash jumps within a page)
  let main: HTMLElement | undefined = $state();
  const pageChange = (from?: URL | null, to?: URL | null) =>
    !!from && !!to && from.pathname !== to.pathname;

  // html has scroll-behavior: smooth for #section links; a new page should
  // start at the top right away, not scroll up from where the last one was
  onNavigate((nav) => {
    if (pageChange(nav.from?.url, nav.to?.url))
      document.documentElement.style.scrollBehavior = 'auto';
  });
  afterNavigate((nav) => {
    requestAnimationFrame(
      () => (document.documentElement.style.scrollBehavior = '')
    );
    if (!main || nav.type === 'enter') return;
    if (pageChange(nav.from?.url, nav.to?.url)) pageFlash(main);
  });
</script>

<div class="min-h-screen">
  <Sidebar />
  <main bind:this={main} class="lg:ml-68">
    {@render children?.()}
    <Footer />
  </main>
  <SoundToggle />
</div>
