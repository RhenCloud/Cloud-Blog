<script lang="ts" setup>
import type { BlogPost } from "~/types/blog";

// Function to parse dates in the format "1st Mar 2023"
function parseCustomDate(dateStr: string): Date {
  // Remove ordinal indicators (st, nd, rd, th)
  const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
  // Parse the date
  return new Date(cleanDateStr);
}

// Get Last 6 Publish Post from the content/blog directory
const { data } = await useAsyncData("recent-post", () =>
  queryCollection("content")
    .all()
    .then((data) => {
      return data
        .sort((a, b) => {
          const aDate = parseCustomDate(a.meta.date as string);
          const bDate = parseCustomDate(b.meta.date as string);
          return bDate.getTime() - aDate.getTime();
        })
        .slice(0, 3);
    }),
);

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    const meta = articles.meta as unknown as BlogPost;
    return {
      path: articles.path,
      title: articles.title || "no-title available",
      description: articles.description || "no-description available",
      image: meta.image || "/not-found.jpg",
      alt: meta.alt || "no alter data available",
      ogImage: meta.ogImage || "/not-found.jpg",
      date: meta.date || "not-date-available",
      tags: meta.tags || [],
      published: meta.published || false,
    };
  });
});

useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content:
        "Welcome To My Blog Site. Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.",
    },
  ],
});
</script>

<template>
  <section class="pb-10 px-4">
    <div class="flex flex-row items-center justify-between pt-10 pb-6">
      <div class="flex items-center space-x-3">
        <div class="p-2 bg-violet-500/10 rounded-lg">
          <Icon
            name="mdi:star-three-points-outline"
            size="1.5em"
            class="text-violet-600 dark:text-violet-400" />
        </div>
        <h2 class="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
          Recent Posts
        </h2>
      </div>
      <NuxtLink
        to="/blogs"
        class="group flex items-center gap-1 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors">
        查看全部文章
        <Icon
          name="heroicons:arrow-right-20-solid"
          class="transition-transform group-hover:translate-x-1" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <template v-for="post in formattedData" :key="post.title">
        <div
          class="transition-transform transform hover:scale-[1.02] hover:shadow-lg rounded-lg overflow-hidden">
          <BlogCard
            :path="post.path"
            :title="post.title"
            :date="post.date"
            :description="post.description"
            :image="post.image"
            :alt="post.alt"
            :og-image="post.ogImage"
            :tags="post.tags"
            :published="post.published" />
        </div>
      </template>
      <template v-if="data?.length === 0">
        <BlogEmpty />
      </template>
    </div>
  </section>
</template>
