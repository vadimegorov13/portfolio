<script lang="ts">
  import IntersectionObserver from './IntersectionObserver.svelte';
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string;
  export let classProps: string;
  export let loadingLabel: string = 'Loading image';

  let nativeLoading = false;
  let hasLoaded = false;

  // Determine whether to bypass our intersecting check
  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      nativeLoading = true;
    }
  });
</script>

<IntersectionObserver once={true} let:intersecting>
  {#if intersecting || nativeLoading}
    <!-- the placeholder overlays the image, so nothing jumps when it loads -->
    <div class="relative h-full w-full">
      <img
        {src}
        {alt}
        loading="lazy"
        onload={() => (hasLoaded = true)}
        onerror={() => (hasLoaded = true)}
        class={`${classProps} transition-opacity duration-700 ease-out ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {#if !hasLoaded}
        <div
          class="absolute inset-0 flex items-center justify-center bg-surface-2 text-center"
        >
          <p class="font-mono text-xs tracking-[0.18em] text-ink-3 uppercase">
            {loadingLabel}
          </p>
        </div>
      {/if}
    </div>
  {/if}
</IntersectionObserver>
