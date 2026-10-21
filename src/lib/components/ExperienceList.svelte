<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { experience } from '$lib/data/experience';

  // compact on the home page (summary only), full bullet points on /about
  let { detailed = false }: { detailed?: boolean } = $props();
</script>

<ol class="flex flex-col border-l border-line">
  {#each experience as job, i (job.role + job.dates)}
    <li
      use:reveal={{ type: 'up', delay: i * 40 }}
      class="relative flex flex-col gap-1.5 pb-8 pl-6 last:pb-0"
    >
      <span
        class={`absolute top-2.5 -left-[4.5px] size-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-line ring-1 ring-ink-3'}`}
      ></span>
      <p class="font-mono text-xs text-ink-3 tabular-nums">{job.dates}</p>
      <h3 class="font-mono text-lg leading-snug font-medium">{job.role}</h3>
      {#if job.href}
        <a
          href={job.href}
          target="_blank"
          rel="noopener noreferrer"
          class="w-fit font-mono text-sm text-primary hover:underline"
          >{job.org} ↗</a
        >
      {:else}
        <p class="font-mono text-sm text-primary">{job.org}</p>
      {/if}
      {#if detailed}
        <ul class="mt-1 flex flex-col gap-1.5 text-ink-2">
          {#each job.points as point (point)}
            <li
              class="relative pl-4 before:absolute before:left-0 before:text-ink-3 before:content-['–']"
            >
              {point}
            </li>
          {/each}
        </ul>
      {:else}
        <p class="text-ink-2">{job.summary}</p>
      {/if}
    </li>
  {/each}
</ol>
