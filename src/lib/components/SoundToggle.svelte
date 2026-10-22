<script lang="ts">
  import Icon from '@iconify/svelte';
  import { sound, toggleSound } from '$lib/sound.svelte';
</script>

<!-- floating pill in the bottom-right corner, on every page -->
<button
  data-bp-root
  type="button"
  class="fixed right-[calc(1rem+env(safe-area-inset-right,0px))] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-50 flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface/90 px-3.5 py-2 font-mono text-xs text-ink-2 backdrop-blur transition-colors hover:border-primary hover:text-ink-1"
  onclick={toggleSound}
  aria-pressed={sound.on}
  aria-label="Sound effects"
>
  <Icon
    icon={sound.on ? 'carbon:volume-up' : 'carbon:volume-mute'}
    width="16"
    class={sound.on ? `text-primary ${sound.ready ? '' : 'animate-pulse'}` : ''}
  />
  <!-- browsers keep audio locked until the first click/tap; say so -->
  <span
    >{sound.on
      ? sound.ready
        ? 'sound on'
        : 'click for sound'
      : 'sound off'}</span
  >
</button>
