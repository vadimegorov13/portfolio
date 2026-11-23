<script lang="ts">
  import type { Snippet } from 'svelte';
  import { reveal } from '$lib/actions/reveal';

  // A page section in the "Portrait" style: a small #tag, a big display
  // heading, an optional line under it, then the content.
  type Props = {
    id: string;
    title: string;
    tag?: string;
    sub?: string;
    /** a line under the section (off on the home page) */
    line?: boolean;
    children: Snippet;
  };
  let {
    id,
    title,
    tag = id,
    sub = '',
    line = true,
    children,
  }: Props = $props();
</script>

<section
  {id}
  class="scroll-mt-16 lg:scroll-mt-0 {line ? 'border-b border-line' : ''}"
>
  <div
    class="mx-auto flex max-w-[1100px] flex-col gap-10 px-5 py-20 sm:px-8 md:py-24 lg:px-10"
  >
    <header use:reveal={{ type: 'up' }} class="flex flex-col gap-2.5">
      <span class="section-label"><span class="text-primary">#</span>{tag}</span
      >
      <h2
        class="font-display text-[2.4rem] leading-none font-extrabold tracking-[-0.035em] text-balance md:text-[3.4rem]"
      >
        {title}
      </h2>
      {#if sub}
        <p class="max-w-[56ch] text-lg text-ink-2">{sub}</p>
      {/if}
    </header>
    {@render children()}
  </div>
</section>
