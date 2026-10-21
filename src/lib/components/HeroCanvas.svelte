<script lang="ts">
  import { onMount } from 'svelte';

  // Dot field that ripples slowly and pushes away from the cursor.
  let canvas: HTMLCanvasElement;

  onMount(() => {
    const g = canvas.getContext('2d');
    if (!g) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const host = canvas.parentElement!;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let w = 0;
    let h = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const draw = (t: number) => {
      g.clearRect(0, 0, w, h);
      const gap = 26;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const wave =
            Math.sin(x * 0.012 + t * 0.8) * Math.cos(y * 0.014 - t * 0.6);
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const d = Math.hypot(dx, dy);
          const f = Math.max(0, 1 - d / 180);
          const px = x + (d ? dx / d : 0) * f * 22;
          const py = y + (d ? dy / d : 0) * f * 22 + wave * 3;
          const s = 1 + (wave + 1) * 0.6 + f * 2;
          g.fillStyle =
            f > 0.02
              ? `rgba(247,64,128,${0.35 + f * 0.65})`
              : `rgba(140,150,170,${0.12 + (wave + 1) * 0.1})`;
          g.fillRect(px - s / 2, py - s / 2, s, s);
        }
      }
    };

    const loop = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      if (mouse.tx < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      if (visible) draw(now / 1000);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.tx = mouse.ty = -9999;
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    resize();
    window.addEventListener('resize', resize);
    if (!reduce) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="pointer-events-none absolute inset-0 block size-full"
  aria-hidden="true"
></canvas>
