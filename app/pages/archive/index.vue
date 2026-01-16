<script lang="ts" setup>
import Fuse from "fuse.js";
import { formatDate } from "~/utils/helper";
import siteConfig from "~/config";
const { path } = useRoute();

useHead({
  title: `Archive - ${siteConfig.siteMeta.title}`,
  meta: [
    {
      name: "description",
      content: "浏览所有已发布的文章，轻松找到您感兴趣的内容。",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteConfig.siteMeta.url}/${path}`,
    },
  ],
});

const { data } = await useAsyncData("all-archive-post", () =>
  queryCollection("content").where("published", "=", true).order("date", "DESC").all(),
);

const searchTest = ref("");

const posts = computed(() => {
  return (
    data.value?.map((articles) => {
      return {
        path: articles.path,
        title: articles.title || "no-title available",
        description: articles.description || "no-description available",
        image: articles.image || "/404/dog.svg",
        alt: articles.alt || "no alter data available",
        date: formatDate(articles.date) || "not-date-available",
        tags: articles.tags || [],
        published: articles.published || false,
      };
    }) || []
  );
});

const fuse = computed(() => {
  return new Fuse(posts.value, {
    keys: ["title", "description"],
    threshold: 0.4,
    includeScore: false,
  });
});

const searchResults = computed(() => {
  if (!searchTest.value.trim()) {
    return posts.value;
  }

  const results = fuse.value.search(searchTest.value);
  return results.map((result) => result.item);
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <!-- Hero 部分 -->
    <div class="w-full py-12 mb-6">
      <div class="container max-w-5xl mx-auto px-6">
        <div class="flex flex-col items-center">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 text-sm font-bold text-violet-600 dark:text-violet-400 hover:underline mb-4">
            <Icon name="heroicons:arrow-left-20-solid" />
            返回首页
          </NuxtLink>
          <div class="p-3 bg-violet-500/10 rounded-2xl mb-4">
            <Icon
              name="mdi:file-document-multiple"
              size="2.5em"
              class="text-violet-600 dark:text-violet-400" />
          </div>
          <h1
            class="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
            归档
          </h1>
          <p class="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl">
            浏览所有已发布的文章，轻松找到您感兴趣的内容。
          </p>
        </div>
      </div>
    </div>

    <!-- 搜索框 -->
    <div class="px-6 mb-6">
      <input
        v-model="searchTest"
        placeholder="Search"
        type="text"
        class="block w-full bg-[#F1F2F4] dark:bg-slate-900 dark:placeholder-zinc-500 text-zinc-300 rounded-md border-gray-300 dark:border-gray-800 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
    </div>

    <!-- 文章列表 -->
    <div v-auto-animate class="space-y-5 my-5 px-4">
      <template v-for="post in searchResults" :key="post.title">
        <ArchiveCard
          :path="post.path"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :alt="post.alt"
          :tags="post.tags"
          :published="post.published" />
      </template>

      <ArchiveCard v-if="searchResults.length <= 0" title="No Post Found" image="/not-found.jpg" />
    </div>
  </main>
</template>
