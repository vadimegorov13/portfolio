<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import LinkBlock from '$lib/components/common/LinkBlock.svelte';
  import Section from '$lib/components/common/Section.svelte';
  import StackGrid from '$lib/components/StackGrid.svelte';
  import ExperienceList from '$lib/components/ExperienceList.svelte';
  import { education } from '$lib/data/education';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags title="About me" description="Vadim Egorov's about me page" />

<Section id="about" prefix="/">
  <p use:reveal={{ type: 'up' }} class="lead">
    I'm Vadim, a software engineer who likes turning messy problems into things
    that are simple to use.
  </p>
  <div
    use:reveal={{ type: 'up', delay: 70 }}
    class="flex flex-col gap-5 text-ink-2"
  >
    <p>
      I spent my first job building a dealership platform where one wrong
      assumption could break a whole sales workflow. It taught me to care about
      structure early, and to keep things boring where they should be boring.
    </p>
    <p>
      These days I'm doing a master's in AI and pointing that same mindset at
      machine learning, from brain signals to human activity. I also build small
      products on the side, mostly because I want to use them.
    </p>
  </div>
</Section>

<Section id="experience">
  <ExperienceList detailed />
</Section>

<Section id="projects">
  <p use:reveal={{ type: 'up' }} class="text-ink-2">
    A focus timer for working with friends, a tool that syncs stream song
    requests to recordings, and an EEG study on how students learn.
  </p>
  <div use:reveal={{ type: 'up', delay: 60 }}>
    <LinkBlock
      href="/projects"
      label="See the projects"
      icon="carbon:arrow-right"
      size="lg"
      isPrimaryBorder
    />
  </div>
</Section>

<Section id="education">
  <dl
    use:reveal={{ type: 'up' }}
    class="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2"
  >
    {#each education as item (item.degree)}
      <div class="flex flex-col gap-2 bg-background p-5">
        <dt class="font-mono text-xs tracking-widest text-primary uppercase">
          {item.degree}
        </dt>
        <dd class="text-ink-1">
          {#if item.href}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              class="underline decoration-primary/60 underline-offset-4 hover:text-primary"
              >{item.field} ↗</a
            >
          {:else}
            {item.field}
          {/if}
          <span class="block text-base text-ink-3">{item.school}</span>
          <span class="block font-mono text-xs text-ink-3">{item.dates}</span>
        </dd>
      </div>
    {/each}
  </dl>
</Section>

<Section id="skills" wide>
  <StackGrid />
</Section>
