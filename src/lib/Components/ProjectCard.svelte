<script lang="ts">
  import type { ProjectCard } from 'src/types';

  export let project: ProjectCard;
</script>

<div class="group ">
  <div
    class={`
        flex flex-row md:flex-col border border-border
        group-hover:-translate-y-2 duration-200 h-full`}
  >
    <div class="flex flex-col w-full">
      <img
        alt={project.title}
        src={project.img ? project.img : 'null'}
        class="h-[9rem] w-full object-cover"
      />
      <div
        class="h-full px-2 border border-border border-y-0 border-l-0 border-r-[1px] md:border-r-0 md:border-y-[1px]"
      >
        {#each project.stack as stack}
          <span class="text-xs text-zinc-400">{stack} </span>
        {/each}
      </div>
    </div>
    <div class="flex flex-col gap-2 p-2 justify-between">
      <h1 class="text-white/90 text-md">
        {project.title} - {project.date}
      </h1>
      <p class="text-zinc-400 text-xs">
        {project.description}
      </p>
      <div class="flex h-6 flex-row justify-start gap-2 text-zinc-400">
        {#if project.link}
          <a
            href={project.link}
            target={'_blank'}
            class="border border-border group-hover:gr-animation px-1 text-md"
          >
            {project.link.includes('docs.google.com') ? 'Read' : 'Live'}
          </a>
        {/if}

        {#if project.github}
          <a
            href={project.github}
            target={'_blank'}
            class="border border-border group-hover:gr-animation px-1 text-md"
          >
            {project.github.includes('colab.research.google.com')
              ? 'Code'
              : 'GitHub'}
          </a>
        {/if}
      </div>
    </div>
  </div>
</div>
