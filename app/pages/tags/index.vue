<script lang="ts" setup>
const { data } = await useAsyncData("all-blog-post-by-tags", () =>
  queryCollection("content").all(),
);

const allTags = new Map();

data.value?.forEach((blog) => {
  const tags: Array<string> = (blog.meta.tags as string[]) || [];
  tags.forEach((tag) => {
    if (allTags.has(tag)) {
      const cnt = allTags.get(tag);
      allTags.set(tag, cnt + 1);
    } else {
      allTags.set(tag, 1);
    }
  });
});

useHead({
  title: "Tags",
  meta: [
    {
      name: "description",
      content: "Explore all the tags used in the blog posts.",
    },
  ],
});

// Generate OG Image
const siteData = useSiteConfig();
defineOgImage({
  props: {
    title: "Tags",
    description: "Explore all the tags used in the blog posts.",
    siteName: siteData.url,
  },
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 py-12">
    <div class="flex flex-col items-center mb-12">
      <div class="p-3 bg-violet-500/10 rounded-2xl mb-4">
        <Icon name="fa-solid:tags" size="2.5em" class="text-violet-600 dark:text-violet-400" />
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
        All Tags
      </h1>
      <p class="text-zinc-600 dark:text-zinc-400 text-center max-w-md">
        Browse through all the topics and technologies I've written about.
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-4">
      <NuxtLink
        v-for="[tag, count] in allTags"
        :key="tag"
        :to="`/tags/${tag.toLocaleLowerCase()}`"
        class="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <span
          class="text-lg font-bold text-zinc-700 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          #{{ tag }}
        </span>
        <span
          class="flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-bold border border-violet-500/20">
          {{ count }}
        </span>
      </NuxtLink>
    </div>
  </main>
</template>
