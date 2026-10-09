<script lang="ts">
  import Footer from '$components/Layout/Footer.svelte';
  import Navbar from '$components/Layout/Navbar.svelte';
  import { initializeIconify } from '$lib/iconify';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../app.css';

  let { children } = $props();
  initializeIconify();
  injectAnalytics();
</script>

<div class="min-h-screen text-white">
  <Navbar />
  <div
    class="mx-auto max-w-300 px-4 pt-10 md:pt-20 lg:pt-40 pb-5 md:pb-10 lg:pb-20 sm:px-10 md:px-20"
  >
    {@render children?.()}
  </div>
  <Footer />
</div>
