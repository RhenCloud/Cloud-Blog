<script lang="ts" setup>
import { formatDate, getRandomFallbackImage } from "~/utils/helper";

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
    .where("published", "=", true)
    .all()
    .then((data) => {
      return data
        .sort((a, b) => {
          const aDate = parseCustomDate(a.date as string);
          const bDate = parseCustomDate(b.date as string);
          return bDate.getTime() - aDate.getTime();
        })
        .slice(0, 3);
    }),
);

const formattedData = computed(() => {
  return (
    data.value?.map((articles) => {
      return {
        path: articles.path,
        title: articles.title || "no-title available",
        description: articles.description || "no-description available",
        image: articles.image || getRandomFallbackImage(),
        alt: articles.alt || "no alter data available",
        date: articles.date || "not-date-available",
        tags: articles.tags || [],
        categories: articles.categories || [],
        published: articles.published || false,
      };
    }) || []
  );
});
</script>

<template>
  <section class="pb-10 px-4">
    <div class="flex flex-row items-center justify-between pt-10 pb-6">
      <div class="flex items-center space-x-3">
        <h2 class="text-3xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">
          Recent Posts
        </h2>
      </div>
      <NuxtLink
        to="/blogs"
        class="group flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50 hover-text-primary transition-colors">
        查看全部文章
        <Icon
          name="heroicons:arrow-right-20-solid"
          class="transition-transform group-hover:translate-x-1" />
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <template v-for="post in formattedData" :key="post.title">
        <div
          class="transition-transform transform hover:scale-[1.02] hover:shadow-lg rounded-lg overflow-hidden h-full">
          <BlogCard
            class="h-full"
            :path="post.path"
            :title="post.title"
            :date="formatDate(post.date)"
            :description="post.description"
            :image="post.image"
            :alt="post.alt"
            :categories="post.categories"
            :published="post.published" />
        </div>
      </template>
      <template v-if="data?.length === 0">
        <BlogEmpty />
      </template>
    </div>
  </section>
</template>
