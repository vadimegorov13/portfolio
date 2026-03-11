<script lang="ts">
  import { onMount } from 'svelte';
  import { loadIcons } from '@iconify/svelte';
  import { ICONIFY_ICONS } from '$lib/data/iconify-icons';
  import Footer from '$components/Layout/Footer.svelte';
  import Navbar from '$components/Layout/Navbar.svelte';
  import '../app.css';

  onMount(() => {
    loadIcons([...ICONIFY_ICONS]);
  });
</script>

<div class="h-screen text-white">
  <Navbar />
  <div class="mx-auto max-w-300 px-4 pt-40 pb-20 sm:px-10 md:px-20">
    <slot />
  </div>
  <Footer />
</div>
