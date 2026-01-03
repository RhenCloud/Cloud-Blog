<script setup>
import { useRoute } from "vue-router";
import TechInfo from "~/components/main/TechInfo.vue";
import siteConfig from "~/config";

const route = useRoute();
const { data: content } = await useAsyncData(route.path, () => queryCollection("about").first());

useHead({
  title: `About - ${siteConfig.siteMeta.title}`,
  meta: [
    { name: "description", content: siteConfig.siteMeta.description },
    { name: "author", content: siteConfig.siteMeta.author },
  ],
});
</script>

<template>
  <div class="container mx-auto mt-10 px-6 max-w-6xl">
    <div class="flex gap-8">
      <!-- Main content -->
      <main class="prose prose-zinc dark:prose-invert mt-10 w-2/3 text-left">
        <ContentRenderer v-if="content" :value="content" />
      </main>

      <!-- Sidebar tech/build info -->
      <aside class="w-1/3 hidden lg:block">
        <div class="sticky top-24">
          <TechInfo />
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 767px) {
  .container {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    max-width: 100vw !important;
  }
  .flex.gap-8 {
    flex-direction: column !important;
    gap: 1.5rem !important;
  }
  .prose {
    word-break: break-word;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal !important;
    line-break: auto;
    hyphens: auto;
    font-size: 1.05rem;
  }
  .prose p,
  .prose ul,
  .prose li,
  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4,
  .prose h5,
  .prose h6 {
    word-break: break-word;
    white-space: normal !important;
    line-break: auto;
    hyphens: auto;
  }
  main.prose {
    width: 100% !important;
    margin-top: 1.5rem !important;
  }
  aside.w-1\/3 {
    display: none !important;
  }
}
</style>
