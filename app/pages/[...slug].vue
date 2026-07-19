<script setup lang="ts">
useHead({
  title: "404",
  meta: [
    {
      name: "description",
      content: "Page not found",
    },
  ],
});
</script>

<template>
  <div class="py-20">
    <div class="container max-w-xl mx-auto text-center">
      <h1 class="text-6xl font-bold text-zinc-900 dark:text-white mb-4">404</h1>
      <p class="text-xl text-zinc-600 dark:text-zinc-400 mb-8">页面未找到</p>
      <NuxtLink
        to="/"
        class="inline-block bg-primary hover:bg-primary text-white font-semibold py-2 px-6 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(var(--site-primary-rgb),0.24)]">
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>
