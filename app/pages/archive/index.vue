<script lang="ts" setup>
import type { BlogPost } from "~/types/blog";

const { data } = await useAsyncData("all-archive-post", () => queryCollection("content").all());

const sortedData = computed(() => {
  return (
    data.value
      ?.map((articles) => {
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
      })
      .filter((post) => post.published) // Filter out unpublished posts
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [] // Reverse the order
  );
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <h1 class="text-3xl font-bold my-6">Archive</h1>

    <div v-auto-animate class="space-y-5 my-5 px-4">
      <template v-for="post in sortedData" :key="post.title">
        <ArchiveCard
          :path="post.path"
          :title="post.title"
          :date="post.date"
          :description="post.description"
          :alt="post.alt"
          :tags="post.tags"
          :published="post.published" />
      </template>

      <ArchiveCard v-if="sortedData.length <= 0" title="No Post Found" image="/not-found.jpg" />
    </div>
  </main>
</template>
