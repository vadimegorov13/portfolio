<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { experience } from '$lib/data/experience';
  import { projects } from '$lib/data/projects';
  import { duration, jobColor, orgInitials } from '$lib/portrait';

  // Jobs as rows with a colored monogram tile. Compact (summary only) on the
  // home page; on /about with the bullet points and pictures of the work.
  type Props = { detailed?: boolean; limit?: number };
  let { detailed = false, limit = experience.length }: Props = $props();

  // pictures of what I built in a job (by position in data/experience.ts)
  const WORK: Record<number, string[]> = {
    0: ['certificate-automation', 'ar-sandbox-kit'],
    1: ['product-telemetry'],
  };
  const work = (i: number) =>
    (WORK[i] ?? [])
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter((p) => p?.img);
</script>

<ol class="flex flex-col gap-12 md:gap-14">
  {#each experience.slice(0, limit) as job, i (job.role + job.dates)}
    <li
      use:reveal={{ type: 'up', delay: i * 40 }}
      class="grid grid-cols-1 gap-4 md:grid-cols-[84px_minmax(0,1fr)] md:gap-7"
      style="--c: {jobColor(i)}"
    >
      <span
        class="grid size-14 place-items-center bg-(--c) font-display text-lg font-extrabold tracking-tight text-background md:size-21 md:text-2xl"
        aria-hidden="true">{orgInitials(job.org)}</span
      >
      <div class="flex min-w-0 flex-col gap-2.5">
        <p class="font-mono text-[13px] text-ink-3">
          {#if job.href}
            <a
              href={job.href}
              target="_blank"
              rel="noopener noreferrer"
              class="text-(--c) hover:underline">{job.org} ↗</a
            >
          {:else}
            <span class="text-ink-2">{job.org}</span>
          {/if}
          · {job.dates} · {duration(job.dates)}
        </p>
        <h3
          class="font-display text-[1.6rem] leading-[1.1] font-bold tracking-[-0.02em] md:text-[1.85rem]"
        >
          {job.role}
        </h3>
        <p class="max-w-[60ch] text-[1.08rem] text-ink-1">{job.summary}</p>
        {#if detailed}
          <ul class="flex max-w-[64ch] flex-col gap-1.5 text-ink-2">
            {#each job.points as point (point)}
              <li class="relative pl-5">
                <span
                  class="absolute top-[0.8em] left-0 h-0.5 w-2 bg-(--c)"
                  aria-hidden="true"
                ></span>
                {point}
              </li>
            {/each}
          </ul>
          {#if work(i).length}
            <div class="mt-2 flex flex-wrap gap-4">
              {#each work(i) as p (p!.slug)}
                <a href="/projects#{p!.slug}" class="shot">
                  <img src="/{p!.img}" alt={p!.title} loading="lazy" />
                  <span>{p!.shortTitle ?? p!.title} →</span>
                </a>
              {/each}
            </div>
          {/if}
        {/if}
      </div>
    </li>
  {/each}
</ol>

<style>
  .shot {
    display: flex;
    width: 260px;
    max-width: 100%;
    flex-direction: column;
    gap: 6px;
    text-decoration: none;
  }

  .shot img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    object-position: top;
    border: 1px solid var(--color-line);
    transition:
      transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
      border-color 200ms,
      box-shadow 300ms;
  }

  /* lift on hover (motion pick 8A) */
  .shot:hover img {
    transform: translateY(-4px);
    border-color: var(--c);
    box-shadow: 0 12px 24px rgb(0 0 0 / 0.45);
  }

  .shot span {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-ink-2);
  }

  .shot:hover span {
    color: var(--c);
  }
</style>
