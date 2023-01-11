<script lang="ts">
  import Navbar from '$lib/Navbar.svelte';
  import '../app.css';
</script>

<div class="h-screen text-white">
  <Navbar />
  <div class="px-4 py-40 sm:px-10 md:px-20 lg:px-40">
    <slot />
  </div>
</div>
