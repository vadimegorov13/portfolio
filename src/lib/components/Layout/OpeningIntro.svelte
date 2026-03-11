<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher<{ complete: void }>();

  let showLabel = $state(false);
  let showLine = $state(false);
  let showPanel = $state(false);
  let showHeading = $state(false);
  let outro = $state(false);

  const timers: number[] = [];

  function schedule(delay: number, callback: () => void) {
    const timer = window.setTimeout(callback, delay);
    timers.push(timer);
  }

  onMount(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    schedule(80, () => {
      showLabel = true;
    });
    schedule(280, () => {
      showLine = true;
    });
    schedule(480, () => {
      showPanel = true;
    });
    schedule(700, () => {
      showHeading = true;
    });
    schedule(1760, () => {
      outro = true;
    });
    schedule(2100, () => {
      dispatch('complete');
    });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      document.body.style.overflow = previousOverflow;
    };
  });
</script>

<div class:opening-intro-outro={outro} class="opening-intro-overlay">
  <div class="opening-intro-shell">
    <div class="opening-intro-stage">
      <p class:opening-intro-visible={showLabel} class="opening-intro-label">
        <span class="text-primary">/</span>vadim-egorov
      </p>

      <div
        class:opening-intro-visible={showLine}
        class="opening-intro-line"
      ></div>

      <div class:opening-intro-visible={showPanel} class="opening-intro-panel">
        <div class="opening-intro-panel-bar">
          <span>workspace/init</span>
          <span>ready</span>
        </div>

        <div class="opening-intro-panel-body">
          <p class="opening-intro-kicker">Software engineer</p>
          <h2
            class:opening-intro-visible={showHeading}
            class="opening-intro-heading"
          >
            Building product systems, modern web applications, and machine
            learning projects.
          </h2>
        </div>
      </div>
    </div>
  </div>
</div>
