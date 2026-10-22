<script lang="ts">
  import { onMount } from 'svelte';
  import { stackGroups } from '$lib/data/stack';
  import { say } from '$lib/sound.svelte';
  import { reveal } from '$lib/actions/reveal';

  // how the robot voice should say names it would otherwise spell or mangle
  const PRONOUNCE: Record<string, string> = {
    TypeScript: 'type script',
    JavaScript: 'java script',
    SQL: 'sequel',
    Svelte: 'svelt',
    'Next.js': 'next jay ess',
    'Node.js': 'node jay ess',
    GraphQL: 'graph cue el',
    PostgreSQL: 'post gress',
    MySQL: 'my sequel',
    PostHog: 'post hog',
    PyTorch: 'pie torch',
    TensorFlow: 'tensor flow',
    'scikit-learn': 'sigh kit learn',
    NumPy: 'num pie',
    Matplotlib: 'mat plot lib',
    Jupyter: 'jupiter',
    ChatGPT: 'chat gee pee tee',
    'GitHub Copilot': 'git hub co pilot',
    'MCP servers': 'em see pee servers',
    Xcode: 'ex code',
  };
  const groups = stackGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      spoken: PRONOUNCE[item.name] ?? item.name,
    })),
  }));

  // Only react to a hover the visitor meant: not when the page scrolls a
  // tile under a resting cursor, and not when the cursor just passes over.
  const SCROLL_QUIET = 250; // ms after the last scroll before hovers count
  const DWELL = 120; // ms on a tile before it speaks
  let lastScroll = 0;
  let dwell = 0;

  onMount(() => {
    const onScroll = () => (lastScroll = performance.now());
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function onEnter(e: PointerEvent, spoken: string) {
    clearTimeout(dwell);
    const tile = e.currentTarget as HTMLElement;
    // a tap on a touch screen is always on purpose
    if (
      e.pointerType === 'mouse' &&
      performance.now() - lastScroll < SCROLL_QUIET
    )
      return;
    // same jelly wobble as the buttons (app.css)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tile.classList.remove('is-wobbling');
      void tile.offsetWidth; // restart the animation
      tile.classList.add('is-wobbling');
    }
    dwell = window.setTimeout(() => say(spoken), DWELL);
  }
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
              onpointerenter={(e) => onEnter(e, item.spoken)}
              onpointerleave={() => clearTimeout(dwell)}
              onanimationend={(e) =>
                e.currentTarget.classList.remove('is-wobbling')}
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
    transform-origin: 50% 60%;
    transition:
      border-color 200ms ease,
      background-color 200ms ease;
  }

  .tile img {
    width: 36px;
    height: 36px;
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
    border-color: var(--color-primary);
    background: var(--color-surface-2);
  }

  .tile:hover span {
    color: var(--color-ink-1);
  }
</style>
