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
        image: articles.image || getRandomFallbackImage(articles.path),
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
  <section class="relative pb-14 px-2 sm:px-4">
    <div
      class="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-primary-10 blur-3xl"></div>
    <div
      class="relative flex flex-col gap-4 pt-8 pb-6 sm:flex-row sm:items-end sm:justify-between sm:pt-10 sm:pb-7">
      <div class="flex flex-col gap-2">
        <span class="text-xs font-bold uppercase tracking-[0.35em] text-primary"
          >Latest Dispatch</span
        >
        <h2
          class="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-[-0.05em]">
          Recent Posts
        </h2>
      </div>
      <NuxtLink
        to="/archive"
        class="group inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/45 px-4 py-2 text-sm font-semibold text-zinc-800 shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary-10 dark:border-white/10 dark:bg-white/5 dark:text-zinc-100">
        查看全部文章
        <Icon
          name="heroicons:arrow-right-20-solid"
          class="transition-transform group-hover:translate-x-1" />
      </NuxtLink>
    </div>

    <div class="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
      <template v-for="post in formattedData" :key="post.title">
        <div
          class="h-full rounded-[1.75rem] transition-transform duration-500 hover:-translate-y-1">
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
