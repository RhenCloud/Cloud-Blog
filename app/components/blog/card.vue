<script lang="ts" setup>
interface Props {
  path: string;
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  ogImage: string;
  tags: Array<string>;
  published: boolean;
}

withDefaults(defineProps<Props>(), {
  path: "/",
  title: "no-title",
  date: "no-date",
  description: "no-description",
  image: "/blogs-img/blog.jpg",
  alt: "no-alt",
  ogImage: "/blogs-img/blog.jpg",
  tags: () => [],
  published: false,
});
</script>

<template>
  <article
    class="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 m-2 overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 text-zinc-700 dark:text-zinc-300">
    <NuxtLink :to="path">
      <div class="overflow-hidden">
        <NuxtImg
          class="lg:h-48 md:h-36 w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          width="300"
          :src="image"
          :alt="alt" />
      </div>
      <div class="px-5 py-5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <LogoDate class="mr-1.5 opacity-70" />
            {{ date }}
          </div>
          <div class="flex items-center gap-1.5 flex-wrap">
            <template v-for="tag in tags.slice(0, 2)" :key="tag">
              <span
                class="bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-violet-500/20">
                {{ tag }}
              </span>
            </template>
          </div>
        </div>
        <h2
          class="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
          {{ title }}
        </h2>
        <p class="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2 leading-relaxed mb-4">
          {{ description }}
        </p>
        <div
          class="flex items-center gap-1 text-sm font-bold text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span>Read More</span>
          <LogoArrow class="w-4 h-4" />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
