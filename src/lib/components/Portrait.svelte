<script lang="ts">
  // My photo on a small field of pink dots, offset to the bottom right.
  type Props = { square?: boolean };
  let { square = false }: Props = $props();
</script>

<figure class="relative mr-3 mb-3">
  <span class="dots" aria-hidden="true"></span>
  <img
    src="/headshot.jpeg"
    alt="Vadim Egorov"
    class="relative block w-full border border-line bg-surface object-cover object-top {square
      ? 'aspect-square'
      : 'aspect-[4/5]'}"
  />
</figure>

<style>
  .dots {
    position: absolute;
    inset: 12px -12px -12px 12px;
    background-image: radial-gradient(
      color-mix(in srgb, var(--color-primary) 65%, transparent) 1px,
      transparent 1.4px
    );
    background-size: 9px 9px;
  }
</style>
