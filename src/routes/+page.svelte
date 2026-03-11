<script lang="ts">
  import About from '$components/About.svelte';
  import Contacts from '$components/Contacts.svelte';
  import Hero from '$components/Hero.svelte';
  import Projects from '$components/Projects.svelte';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="Vadim Egorov" description="Vadim Egorov's portfolio" />

<div class="w-full flex flex-col gap-20">
  <Hero />
  <About />
  <Projects />
  <Contacts />
</div>
