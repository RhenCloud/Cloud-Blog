<script lang="ts" setup>
const { data } = await useAsyncData("all-blog-post-by-tags", () =>
  queryCollection("content").select("path", "tags").where("published", "=", true).all(),
);

const allTags = new Map();

data.value?.forEach((blog) => {
  const tags: Array<string> = (blog.tags as string[]) || [];
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
      content: "浏览所有我写过的文章的标签。",
    },
  ],
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 py-12">
    <div class="flex flex-col items-center mb-12">
      <div class="p-3 bg-primary-10 rounded-2xl mb-4">
        <Icon name="fa-solid:tags" size="2.5em" class="text-primary" />
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
        标签
      </h1>
      <p class="text-zinc-600 dark:text-zinc-400 text-center max-w-md">
        浏览所有我写过的文章的标签。
      </p>
    </div>

    <div class="flex flex-wrap justify-center gap-4">
      <NuxtLink
        v-for="[tag, count] in allTags"
        :key="tag"
        :to="`/tags/${tag.toLocaleLowerCase()}`"
        class="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <span
          class="text-lg font-bold text-zinc-700 dark:text-zinc-200 group-text-primary transition-colors">
          #{{ tag }}
        </span>
        <span
          class="flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-primary-10 text-primary dark:text-primary text-xs font-bold border border-primary">
          {{ count }}
        </span>
      </NuxtLink>
    </div>
  </main>
</template>
