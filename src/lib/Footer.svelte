<script lang="ts">
  import Icon from '@iconify/svelte';
  import type { Link } from 'src/types';
  const links: Link[] = [
    {
      slug: 'https://github.com/vadimegorov13',
      name: 'github',
    },
    {
      slug: 'https://www.linkedin.com/in/vadimegorov13/',
      name: 'linkedin',
    },
  ];
</script>

<div class="border border-t-1 border-b-0 border-x-0 border-border">
  <div class="flex flex-col pt-10 pb-4 px-4 sm:px-10 md:px-20 lg:px-40">
    <div class="flex flex-row gap-20 justify-between ">
      <div class="flex flex-col ">
        <p class="text-xs text-border">vadegor00@gmail.com</p>
        <p class="text-sm pt-2">Software Engineer and Web Developer</p>
      </div>

      <div class="flex flex-col">
        <p class="flex justify-center">My Media</p>
        <div class="pt-2 flex flex-row">
          {#each links as media}
            <a href={media.slug}>
              <Icon
                icon={`carbon:logo-${media.name}`}
                class="text-white text-4xl mx-2 duration-200 hover:text-primary"
              />
            </a>
          {/each}
        </div>
      </div>
    </div>
    <p class="flex justify-center text-xs text-border pt-4">
      Vadim Egorov @2023
    </p>
  </div>
</div>
