<script lang="ts">
  import { onMount } from 'svelte';

  // A row of mono glyphs that keeps flickering, like a decode that never
  // settles. ASCII only so the width stays fixed; a couple of chars go pink.

  const length = 22;
  const GLYPHS = '#*+-_<>/\\|=:.~^01';
  const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

  let chars = $state(Array.from({ length }, pick));
  let pink = $state(new Set([0, Math.floor(length / 2)]));

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => {
      // only a few positions change per tick, so it shimmers instead of strobing
      for (let n = 0; n < 3; n++) {
        chars[Math.floor(Math.random() * length)] = pick();
      }
      // hold the pink still during the blueprint intro so it stays blue
      const intro = document.documentElement.classList.contains('blueprint');
      if (!intro && Math.random() < 0.15) {
        pink = new Set([0, Math.floor(Math.random() * length)]);
      }
    }, 90);
    return () => clearInterval(timer);
  });
</script>

<p
  class="w-fit font-mono text-sm tracking-[0.2em] whitespace-pre text-ink-3 select-none"
  aria-hidden="true"
  data-bp-piece
>
  {#each chars as c, i (i)}<span class:text-primary={pink.has(i)}>{c}</span
    >{/each}
</p>
