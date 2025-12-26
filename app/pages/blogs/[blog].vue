<script setup lang="ts">
import type { BlogPost } from "@/types/blog";
import { seoData } from "~/data";

const { path } = useRoute();

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () =>
  queryCollection("content").path(path).first(),
);

if (error.value) navigateTo("/404");

const data = computed<BlogPost>(() => {
  const meta = articles?.value?.meta as unknown as BlogPost;
  return {
    title: articles.value?.title || "no-title available",
    description: articles.value?.description || "no-description available",
    image: meta?.image || "/not-found.jpg",
    alt: meta?.alt || "no alter data available",
    ogImage: (articles?.value?.ogImage as unknown as string) || "/not-found.jpg",
    date: meta?.date || "not-date-available",
    tags: meta?.tags || [],
    published: meta?.published || false,
    categories: meta?.categories || [],
    meta: meta || {},
    path: path || "",
  };
});

useHead({
  title: data.value.title || "",
  meta: [
    { name: "description", content: data.value.description },
    {
      name: "description",
      content: data.value.description,
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${seoData.mySite}/${path}`,
    },
  ],
});

// console.log(articles.value)
</script>

<template>
  <div class="px-6 container max-w-6xl mx-auto sm:grid grid-cols-12 gap-x-12">
    <div class="col-span-12 lg:col-span-8">
      <BlogHeader
        :title="data.title"
        :image="data.image"
        :alt="data.alt"
        :date="data.date"
        :description="data.description"
        :tags="data.tags" />
      <div
        class="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-28 prose-headings:tracking-tight prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-violet-500/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-img:rounded-3xl prose-img:shadow-xl prose-code:text-violet-600 dark:prose-code:text-violet-400 prose-code:bg-violet-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:border prose-pre:border-white/5">
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </div>
    </div>

    <!-- 侧边目录 -->
    <BlogToc />
  </div>
</template>
