<script setup>
import { useRoute } from "vue-router";
import TechInfo from "~/components/main/TechInfo.vue";

const route = useRoute();
const { data: content } = await useAsyncData(route.path, () => queryCollection("about").first());
</script>

<template>
  <div class="container mx-auto mt-10 px-6 max-w-6xl">
    <div class="flex gap-8">
      <!-- Main content -->
      <main class="prose prose-zinc dark:prose-invert mx-auto mt-10 px-6 w-half h-full text-left">
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
