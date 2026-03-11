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
    <div class="relative h-full w-full">
      {#if !hasLoaded}
        <div
          class={`${classProps} flex items-center justify-center bg-black/30 text-center`}
        >
          <div class="flex flex-col items-center gap-3 px-4">
            <div
              class="h-9 w-9 animate-pulse rounded-full border border-primary/50"
            ></div>
            <div class="space-y-1">
              <p class="text-xs uppercase tracking-[0.18em] text-primary">
                {loadingLabel}
              </p>
              <p class="text-xs text-zinc-400">{src}</p>
            </div>
          </div>
        </div>
      {/if}

      <img
        {src}
        {alt}
        loading="lazy"
        onload={() => (hasLoaded = true)}
        onerror={() => (hasLoaded = true)}
        class={`${classProps} transition-opacity duration-300 ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  {/if}
</IntersectionObserver>
