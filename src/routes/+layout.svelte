<script lang="ts">
  import { onMount } from 'svelte';
  import Footer from '$components/Layout/Footer.svelte';
  import Sidebar from '$components/Layout/Sidebar.svelte';
  import SoundToggle from '$components/SoundToggle.svelte';
  import { initializeIconify } from '$lib/iconify';
  import { initSound } from '$lib/sound.svelte';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../app.css';

  let { children } = $props();
  initializeIconify();
  injectAnalytics();

  onMount(initSound);
</script>

<div class="min-h-screen">
  <Sidebar />
  <main class="lg:ml-68">
    {@render children?.()}
    <Footer />
  </main>
  <SoundToggle />
</div>
