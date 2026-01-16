<script lang="ts" setup>
import siteConfig from "~/config";
const { path } = useRoute();

const { data } = await useAsyncData("all-blog-post-by-category", () =>
  queryCollection("content").select("path", "categories").where("published", "=", true).all(),
);

const allCategories = new Map();

data.value?.forEach((blog) => {
  const categories: Array<string> = (blog.categories as string[]) || [];
  categories.forEach((category) => {
    if (allCategories.has(category)) {
      const cnt = allCategories.get(category);
      allCategories.set(category, cnt + 1);
    } else {
      allCategories.set(category, 1);
    }
  });
});

useHead({
  title: `Categories - ${siteConfig.siteMeta.title}`,
  meta: [
    {
      name: "description",
      content: "以下列出了我撰写的文章主题。",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteConfig.siteMeta.url}/${path}`,
    },
  ],
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <div class="flex flex-col items-center mb-12 py-8">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-4">
        <Icon name="heroicons:arrow-left-20-solid" />
        返回首页
      </NuxtLink>
      <div class="p-3 bg-blue-500/10 rounded-2xl mb-4">
        <Icon name="mdi:folder-multiple" size="2.5em" class="text-blue-600 dark:text-blue-400" />
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
        分类
      </h1>
      <p class="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl">
        以下列出了我撰写的文章主题。
      </p>
    </div>
    <div class="flex flex-wrap px-6 mt-12 gap-3">
      <!-- <CategoryCard v-for="topic in allCategories" :key="topic[0]" :title="topic[0]" :count="topic[1]" /> -->
      <div class="flex flex-wrap justify-center gap-4">
        <NuxtLink
          v-for="[category, count] in allCategories"
          :key="category"
          :to="`/categories/${category.toLowerCase()}`"
          class="group relative flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <span
            class="text-lg font-bold text-zinc-700 dark:text-zinc-200 group-text-primary transition-colors">
            #{{ category }}
          </span>
          <span
            class="flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full bg-primary-10 text-primary dark:text-primary text-xs font-bold border border-primary">
            {{ count }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>
