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

  $: textColor = isPrimaryText ? 'text-primary' : 'text-white';

  $: borderColor = isPrimaryBorder
    ? 'border-primary hover:bg-primary/10'
    : 'border-border hover:border-primary';

  $: border = noBorder ? 'border-0' : `border ${borderColor}`;
</script>

<a
  {href}
  {target}
  {rel}
  class={`motion-link inline-flex items-center gap-2 whitespace-nowrap text-sm ${padding} ${textColor} ${border}`}
>
  <span>{label}</span>
  {#if isExternal}
    <Icon icon="pixelarticons:external-link-sharp" />
  {/if}
  {#if icon !== ''}
    <Icon {icon} />
  {/if}
</a>
