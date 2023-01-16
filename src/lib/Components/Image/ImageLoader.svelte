<script lang="ts">
  import IntersectionObserver from './IntersectionObserver.svelte';
  import Image from './Image.svelte';
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string;
  export let classProps: string;

  let nativeLoading = false;
  // Determine whether to bypass our intersecting check
  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      nativeLoading = true;
    }
  });
</script>

<IntersectionObserver once={true} let:intersecting>
  {#if intersecting || nativeLoading}
    <Image {alt} {src} {classProps} />
  {/if}
</IntersectionObserver>
