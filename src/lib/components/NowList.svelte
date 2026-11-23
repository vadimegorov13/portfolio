<script lang="ts">
  import { nowItems } from '$lib/portrait';

  // What I'm doing now, each line with its own color.
  const items = nowItems();
</script>

<ul class="flex flex-col gap-2.5 text-[1.02rem] text-ink-2">
  {#each items as item (item.text)}
    <li class="flex items-center gap-3">
      <span class="size-2.5 shrink-0" style="background: {item.color}"></span>
      {#if item.href}
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          class="underline decoration-primary/60 underline-offset-4 hover:text-primary"
          >{item.text} ↗</a
        >
      {:else}
        {item.text}
      {/if}
    </li>
  {/each}
</ul>
