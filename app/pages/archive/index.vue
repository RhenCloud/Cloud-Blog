<script lang="ts" setup>
import type { BlogPost } from "~/types/blog";
import { formatDate } from "~/utils/helper";

const { data } = await useAsyncData("all-archive-post", () =>
  queryCollection("content").order("date", "DESC").all(),
);

// const sortedData = computed(() => {
const posts = computed(() => {
  return data.value?.map((articles) => {
    const meta = articles.meta as unknown as BlogPost;
    return {
      path: articles.path,
      title: articles.title || "no-title available",
      description: articles.description || "no-description available",
      image: meta.image || "/not-found.jpg",
      alt: meta.alt || "no alter data available",
      date: formatDate(articles.date) || "not-date-available",
      tags: meta.tags || [],
      published: meta.published || false,
    };
  });
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <h1 class="text-3xl font-bold my-6">Archive</h1>

    <div v-auto-animate class="space-y-5 my-5 px-4">
      <template v-for="post in posts" :key="post.title">
        <ArchiveCard
          :path="post.path"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :alt="post.alt"
          :tags="post.tags"
          :published="post.published" />
      </template>
    </div>
  </main>
</template>
