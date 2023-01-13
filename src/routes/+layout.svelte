<script lang="ts">
  import Footer from '$lib/Footer.svelte';
  import Navbar from '$lib/Navbar.svelte';
  import '../app.css';
</script>

<div class="h-screen text-white">
  <Navbar />
  <div
    class="mx-auto max-w-[70rem] px-4 pt-40 pb-20 sm:px-10 md:px-20 lg:px-40"
  >
    <slot />
  </div>
  <Footer />
</div>
