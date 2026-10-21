<script lang="ts">
  import { stackGroups } from '$lib/data/stack';
  import { sfx } from '$lib/sound.svelte';
  import { reveal } from '$lib/actions/reveal';

  // running index so each tile plays the next note of the scale
  let n = 0;
  const groups = stackGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, note: n++ })),
  }));
</script>

<div class="flex flex-col gap-8">
  {#each groups as group (group.title)}
    <div>
      <h3
        class="mb-3 font-mono text-xs font-medium tracking-[0.12em] text-ink-3 uppercase"
      >
        {group.title}
      </h3>
      <div
        use:reveal={{ type: 'stagger' }}
        class="reveal-stagger grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2.5"
      >
        {#each group.items as item, i (item.name)}
          <div class="stagger-item" style={`--stagger-delay: ${i * 40}ms`}>
            <div
              class="tile"
              role="img"
              aria-label={item.name}
              onmouseenter={() => sfx.pluck(item.note)}
            >
              {#if item.icon}
                <img
                  src={`/stack/${item.icon}.svg`}
                  alt=""
                  class:invert={item.invert}
                  width="36"
                  height="36"
                  loading="lazy"
                />
              {/if}
              <span class:text-only={!item.icon}>{item.name}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    aspect-ratio: 1;
    padding: 0.5rem;
    border: 1px solid var(--color-line);
    background: var(--color-surface);
    transition:
      transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1),
      border-color 200ms ease,
      background-color 200ms ease;
  }

  .tile img {
    width: 36px;
    height: 36px;
    transition: transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tile img.invert {
    filter: invert(1);
  }

  .tile span {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    line-height: 1.2;
    text-align: center;
    color: var(--color-ink-3);
  }

  .tile span.text-only {
    font-size: 0.72rem;
    overflow-wrap: anywhere;
    hyphens: auto;
    color: var(--color-ink-2);
  }

  .tile:hover {
    transform: translateY(-4px);
    border-color: var(--color-primary);
    background: var(--color-surface-2);
  }

  .tile:hover img {
    transform: scale(1.12) rotate(-4deg);
  }

  .tile:hover span {
    color: var(--color-ink-1);
  }
</style>
