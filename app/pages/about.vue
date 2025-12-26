<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const content = ref(null);

onMounted(async () => {
  const route = useRoute();

  const { data: pageData } = await useAsyncData(route.path, () =>
    queryCollection("content").path(route.path).first(),
  );

  if (pageData.value) {
    content.value = pageData.value;
  }
});
</script>

<template>
  <div class="prose prose-lg dark:prose-invert mx-auto px-6 max-w-4xl mt-0 text-left">
    <ContentRenderer v-if="content" :value="content" />
  </div>
</template>
