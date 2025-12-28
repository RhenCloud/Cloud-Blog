<script setup lang="ts">
import { formatDate } from "~/utils/helper";
interface Props {
  title?: string;
  image?: string;
  alt?: string;
  description?: string;
  date?: string;
  tags?: Array<string>;
}

withDefaults(defineProps<Props>(), {
  title: "no-title",
  image: "#",
  alt: "no-img",
  description: "no description",
  date: "no-date",
  tags: () => [],
});
</script>

<template>
  <header class="py-12">
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-3 mb-6">
        <div
          class="flex items-center text-sm font-bold text-violet-600 dark:text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
          <LogoDate class="mr-2 w-4 h-4" />
          {{ formatDate(date) }}
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <template v-for="tag in tags" :key="tag">
            <NuxtLink :to="`/tags/${tag.toLocaleLowerCase()}`">
              <span
                class="bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-full px-3 py-1 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300"
                >#{{ tag }}</span
              >
            </NuxtLink>
          </template>
        </div>
      </div>

      <h1
        class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-800 dark:text-zinc-100 mb-6 tracking-tight leading-tight">
        {{ title }}
      </h1>

      <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed italic">
        「{{ description }}」
      </p>
    </div>

    <div class="relative group max-w-4xl mx-auto mb-12">
      <div
        class="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <NuxtImg
        :src="image || ''"
        :alt="alt || ''"
        width="1200"
        class="relative rounded-3xl shadow-2xl w-full aspect-[21/9] object-cover border border-white/20 dark:border-white/5 transition-transform duration-700 group-hover:scale-[1.01]" />
    </div>
  </header>
</template>
