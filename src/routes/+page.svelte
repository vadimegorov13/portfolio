<script lang="ts">
  import Contacts from '$components/Contacts.svelte';
  import Hero from '$components/Hero.svelte';
  import Projects from '$components/Projects.svelte';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="Vadim Egorov" description="Vadim Egorov's portfolio" />

<div class="w-full flex flex-col gap-20">
  <Hero />

  <div class="flex flex-col">
    <h1 class="flex flex-row w-full justify-end text-primary text-xl">
      ----------------- #<span class="text-white">about</span>
    </h1>
    <div class="flex flex-col gap-10 mt-10 max-w-160 text-zinc-400 text-sm">
      <p>
        I am Vadim Egorov, a recent computer science graduate with a minor in
        mathematics from University of Alaska Anchorage. My education has
        provided me with proficiency in Python and Java and hands-on experience
        in data analysis and machine learning. Additionally, I am a self-taught
        web developer with strong skills in TypeScript and various web dev
        frameworks. I am capable of building and maintaining modern web
        applications, with a focus on back-end development and server-side
        logic.
      </p>

      <p>
        I have a deep passion for technology and a drive to stay up-to-date with
        the latest advancements in the field. In addition to technology, I am
        also interested in education, history, music, and art.
      </p>

      <p>
        I am seeking a software development role where I can put my technical
        skills and passion to use and continue to learn and grow as a developer.
      </p>
    </div>
  </div>

  <Projects />
  <Contacts />
</div>
