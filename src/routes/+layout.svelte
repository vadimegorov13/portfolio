<script lang="ts">
  import Footer from '$components/Layout/Footer.svelte';
  import Navbar from '$components/Layout/Navbar.svelte';
  import '../app.css';
</script>

<div class="h-screen text-white">
  <Navbar />
  <div class="mx-auto max-w-200 px-4 pt-40 pb-20 sm:px-10 md:px-20">
    <slot />
  </div>
  <Footer />
</div>
