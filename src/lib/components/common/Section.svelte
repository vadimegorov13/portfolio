<script lang="ts">
  import type { Snippet } from 'svelte';
  import { reveal } from '$lib/actions/reveal';

  type Props = {
    id: string;
    label?: string;
    prefix?: string;
    wide?: boolean;
    children: Snippet;
  };

  let {
    id,
    label = id,
    prefix = '#',
    wide = false,
    children,
  }: Props = $props();
</script>

<!-- "#label | content" row. The label sticks while the section scrolls. -->
<section {id} class="scroll-mt-16 border-b border-line lg:scroll-mt-0">
  <div
    class="mx-auto grid max-w-260 grid-cols-1 gap-3 px-5 py-12 sm:px-8 md:grid-cols-[110px_minmax(0,1fr)] md:gap-6 md:py-16 lg:px-10"
  >
    <h2
      use:reveal={{ type: 'up' }}
      class="section-label self-start md:sticky md:top-8 md:pt-2"
    >
      <span class="text-primary">{prefix}</span>{label}
    </h2>
    <div class={`flex min-w-0 flex-col gap-6 ${wide ? '' : 'max-w-[70ch]'}`}>
      {@render children()}
    </div>
  </div>
</section>
