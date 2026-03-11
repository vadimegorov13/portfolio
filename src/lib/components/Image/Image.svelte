<script lang="ts">
  export let src: string;
  export let alt: string;
  export let classProps: string;
</script>

<img {src} {alt} loading="lazy" class={classProps} />
