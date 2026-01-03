<script setup lang="ts">
import type { BlogPost } from "@/types/blog";
import Comment from "~/components/blog/Comment.vue";
import siteConfig from "~/config";

const { path } = useRoute();

const isTocOpen = ref(false);

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () =>
  queryCollection("content").path(path).first(),
);

if (error.value) navigateTo("/404");

const data = computed<BlogPost>(() => {
  return {
    title: articles.value?.title || "no-title available",
    description: articles.value?.description || "no-description available",
    image: articles.value?.image || "",
    alt: articles.value?.alt || "no alter data available",
    date: articles.value?.date || "not-date-available",
    tags: articles.value?.tags || [],
    published: articles.value?.published || false,
    categories: articles.value?.categories || [],
    path: path || "",
  };
});

useHead({
  title: siteConfig.siteMeta.title || "",
  meta: [
    { name: "description", content: siteConfig.siteMeta.description },
    { name: "author", content: siteConfig.siteMeta.author },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteConfig.siteMeta.url}/${path}`,
    },
  ],
});

// console.log(articles.value)
</script>

<template>
  <div
    class="px-4 md:px-6 container max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
    <div class="w-full" :class="{ 'lg:w-2/3': articles?.body?.toc?.links?.length }">
      <BlogHeader
        :title="data.title"
        :image="data.image"
        :alt="data.alt"
        :date="formatDate(data.date)"
        :description="data.description"
        :tags="data.tags" />
      <div
        class="prose prose-zinc dark:prose-invert max-w-none w-full prose-headings:scroll-mt-28 prose-headings:tracking-tight prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:leading-relaxed prose-a:no-underline hover:prose-a:underline prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-img:rounded-3xl prose-img:shadow-xl prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:border prose-pre:border-white/5">
        <ContentRenderer v-if="articles" :value="articles">
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
        <ClientOnly>
          <Comment />
        </ClientOnly>
      </div>
    </div>

    <!-- 侧边目录 -->
    <BlogToc v-if="articles?.body?.toc?.links?.length" :links="articles.body.toc.links" />

    <!-- 移动端目录 -->
    <ClientOnly>
      <div v-if="articles?.body?.toc?.links?.length" class="lg:hidden">
        <!-- 悬浮按钮 -->
        <button
          class="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center transition-all active:scale-90 hover:opacity-90"
          @click="isTocOpen = true">
          <Icon name="heroicons:list-bullet" class="w-6 h-6" />
        </button>

        <!-- 弹出层背景遮罩 -->
        <Teleport to="body">
          <Transition
            enter-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-300"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div
              v-if="isTocOpen"
              class="fixed inset-0 bg-black/50 backdrop-blur-sm z-100"
              @click="isTocOpen = false" />
          </Transition>

          <!-- 弹出层内容 -->
          <Transition
            enter-active-class="transition-transform duration-300 ease-out"
            enter-from-class="translate-y-full"
            enter-to-class="translate-y-0"
            leave-active-class="transition-transform duration-300 ease-in"
            leave-from-class="translate-y-0"
            leave-to-class="translate-y-full">
            <div v-if="isTocOpen" class="fixed bottom-0 left-0 right-0 z-101 max-h-[80vh]">
              <div class="bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl">
                <BlogToc
                  :links="articles.body.toc.links"
                  :is-mobile="true"
                  @close="isTocOpen = false" />
              </div>
            </div>
          </Transition>
        </Teleport>
      </div>
    </ClientOnly>
  </div>
</template>
