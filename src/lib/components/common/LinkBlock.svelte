<script lang="ts">
  import Icon from '@iconify/svelte';

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

  $: padding =
    size === 'sm' ? 'px-2 py-0.5' : size === 'lg' ? 'px-4 py-2' : 'px-3 py-1';

  $: variant = noBorder
    ? 'btn-ghost'
    : isPrimaryText || isPrimaryBorder
      ? 'btn-primary'
      : '';
</script>

<a {href} {target} {rel} class={`btn ${variant} text-sm ${padding}`}>
  <span>{label}</span>
  {#if isExternal}
    <Icon icon="pixelarticons:external-link-sharp" class="btn-icon" />
  {/if}
  {#if icon !== ''}
    <Icon {icon} class="btn-icon" />
  {/if}
</a>
