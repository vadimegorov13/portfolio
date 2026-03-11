<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string;
  export let classProps: string;

  let loaded = false;
  let thisImage: HTMLImageElement | undefined;

  onMount(() => {
    if (thisImage) {
      thisImage.onload = () => {
        loaded = true;
      };
    }
  });
</script>

<img
  {src}
  {alt}
  class:loaded
  bind:this={thisImage}
  loading="lazy"
  class={`duration-1200 ${loaded ? 'opacity-100' : 'opacity-0'} ${classProps}`}
/>
