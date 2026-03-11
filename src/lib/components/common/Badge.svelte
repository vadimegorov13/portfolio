<script lang="ts">
  export let text: string;
  export let size: 'sm' | 'md' | 'lg' = 'md';

  $: paddingClass =
    size === 'sm' ? 'px-2 py-0.5' : size === 'lg' ? 'px-2 py-2' : 'px-2 py-1';
</script>

<span class="border border-border text-zinc-300 text-xs {paddingClass}">
  {text}
</span>
