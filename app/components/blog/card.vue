<script lang="ts" setup>
import { useState } from "#app";

interface Props {
  path?: string;
  title?: string;
  date?: string;
  description?: string;
  image?: string | null;
  alt?: string;
  tags?: Array<string>;
  categories?: Array<string>;
  published?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  path: "/",
  title: "no-title",
  date: "no-date",
  description: "no-description",
  image: null,
  alt: "no-alt",
  tags: () => [],
  categories: () => [],
  published: false,
});

// Use a per-card state key so the chosen fallback is the same on server and client
const imageStateKey = `card-image-${props.path}`;
const imageSrc = useState<string>(imageStateKey, () => {
  return props.image || getRandomFallbackImage();
});
</script>

<template>
  <article
    class="group glass-panel relative overflow-hidden rounded-[1.75rem] text-zinc-700 transition-all duration-500 h-full flex flex-col hover:-translate-y-1 dark:text-zinc-300">
    <div
      class="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-white/20"></div>
    <NuxtLink :to="path" class="flex flex-col h-full">
      <div class="relative overflow-hidden aspect-video">
        <div
          class="absolute inset-0 z-10 bg-linear-to-t from-zinc-950/20 via-transparent to-white/10 opacity-80 transition-opacity duration-500 group-hover:opacity-60"></div>
        <NuxtImg
          class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          :src="imageSrc"
          :alt="props.alt || 'no-alt'" />
      </div>
      <div class="px-4 py-4 sm:px-5 sm:py-5 flex flex-col grow">
        <div class="flex items-center justify-between mb-3">
          <div
            class="flex items-center text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400 whitespace-nowrap shrink-0">
            <Icon name="mdi:calendar" class="mr-1.5 opacity-70 w-4 h-4" />
            {{ date }}
          </div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <template v-if="categories && categories.length > 0">
              <template v-for="category in categories.slice(0, 2)" :key="category">
                <span
                  class="bg-primary-10 text-primary rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-primary">
                  {{ category }}
                </span>
              </template>
            </template>
            <template v-else>
              <template v-for="tag in tags.slice(0, 2)" :key="tag">
                <span
                  class="bg-primary-10 text-primary rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-primary">
                  {{ tag }}
                </span>
              </template>
            </template>
          </div>
        </div>
        <h2
          class="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2 group-text-primary transition-colors line-clamp-1 tracking-[-0.03em]">
          {{ title }}
        </h2>
        <p
          class="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
          {{ description }}
        </p>
        <div
          class="mt-auto flex items-center gap-1 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span>Read More</span>
          <Icon name="mdi:arrow-right" class="w-4 h-4" />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
