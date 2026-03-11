<script lang="ts">
  import Footer from '$components/Layout/Footer.svelte';
  import Navbar from '$components/Layout/Navbar.svelte';
  import { initializeIconify } from '$lib/iconify';
  import { injectAnalytics } from '@vercel/analytics/sveltekit';
  import '../app.css';

  initializeIconify();
  injectAnalytics();
</script>

<div class="h-screen text-white">
  <Navbar />
  <div class="mx-auto max-w-300 px-4 pt-40 pb-20 sm:px-10 md:px-20">
    <slot />
  </div>
  <Footer />
</div>
