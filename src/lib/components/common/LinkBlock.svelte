<script lang="ts">
  import Icon from '@iconify/svelte';
  import { wobble } from '$lib/actions/wobble';
  import { vibrate } from '$lib/actions/vibrate';

  export let href: string;
  export let label: string;
  export let icon = '';
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let isPrimaryText: boolean = false;
  export let isPrimaryBorder: boolean = false;
  export let isExternal: boolean = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let noBorder: boolean = false;
  /** pulsing glow + vibrate-and-hum on hover, for the most important button */
  export let attention: boolean = false;

  $: padding =
    size === 'sm'
      ? 'px-3 py-1 text-xs'
      : size === 'lg'
        ? 'px-5 py-3 text-sm'
        : 'px-4 py-2 text-sm';

  $: variant = noBorder
    ? 'btn-ghost'
    : isPrimaryText || isPrimaryBorder
      ? 'btn-primary'
      : '';

  $: externalTarget = isExternal ? (target ?? '_blank') : target;
  $: externalRel = isExternal ? (rel ?? 'noopener noreferrer') : rel;
</script>

<a
  {href}
  target={externalTarget}
  rel={externalRel}
  class={`btn ${variant} ${padding} ${attention ? 'attention-glow' : ''}`}
  use:wobble={!attention}
  use:vibrate={attention}
>
  <span>{label}</span>
  {#if isExternal}
    <Icon icon="carbon:arrow-up-right" class="btn-icon" />
  {/if}
  {#if icon !== ''}
    <Icon {icon} class="btn-icon" />
  {/if}
</a>
