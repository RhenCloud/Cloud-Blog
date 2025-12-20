<script setup lang="ts">
const { path } = useRoute();
const articles = await queryCollection("content").path(path).first();

const links = articles?.body?.toc?.links || [];

const activeId = ref("");

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    { rootMargin: "-100px 0% -80% 0%" },
  );

  links.forEach((link) => {
    const el = document.getElementById(link.id);
    if (el) observer.observe(el);
  });

  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <div class="lg:col-span-4 sticky top-28 h-fit hidden lg:block">
    <div
      class="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-sm">
      <h3
        class="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
        <Icon name="heroicons:list-bullet" class="w-4 h-4" />
        Table Of Content
      </h3>
      <nav class="space-y-1">
        <NuxtLink
          v-for="link in links"
          :key="link.id"
          :to="`#${link.id}`"
          class="block text-sm py-1.5 px-3 rounded-xl transition-all duration-200"
          :class="[
            activeId === link.id
              ? 'text-violet-600 dark:text-violet-400 bg-violet-500/10 font-bold translate-x-1'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5',
          ]">
          {{ link.text }}
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
