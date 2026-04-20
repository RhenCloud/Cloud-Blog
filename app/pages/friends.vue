<script lang="ts" setup>
import siteConfig from "~/config";

const route = useRoute();

const friendLinks = computed(() => {
  return (siteConfig.friendLinks || []).map((item) => {
    let hostname = "";

    try {
      hostname = new URL(item.url).hostname;
    } catch {
      hostname = item.url;
    }

    return {
      ...item,
      hostname,
    };
  });
});

useHead({
  title: `Friends - ${siteConfig.siteMeta.title}`,
  meta: [
    {
      name: "description",
      content: "这里收录了本站的友链站点。",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `${siteConfig.siteMeta.url}/${route.path}`,
    },
  ],
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 py-12">
    <div class="flex flex-col items-center mb-12">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-4">
        <Icon name="heroicons:arrow-left-20-solid" />
        返回首页
      </NuxtLink>
      <div class="p-3 bg-primary-10 rounded-2xl mb-4">
        <Icon name="fa-solid:link" size="2.5em" class="text-primary" />
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
        友链
      </h1>
      <p class="text-zinc-600 dark:text-zinc-400 text-center max-w-2xl">
        感谢这些优秀站点的陪伴与启发。
      </p>
    </div>

    <div v-if="friendLinks.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <a
        v-for="link in friendLinks"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group rounded-2xl border border-zinc-200/70 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div class="flex items-start gap-4">
          <img
            v-if="link.avatar"
            :src="link.avatar"
            :alt="link.name"
            class="w-12 h-12 rounded-xl object-cover border border-zinc-200/70 dark:border-white/10" />
          <div
            v-else
            class="w-12 h-12 rounded-xl bg-primary-10 text-primary flex items-center justify-center border border-primary/30">
            <Icon name="fa-solid:globe" size="18" />
          </div>

          <div class="min-w-0 flex-1">
            <div class="text-lg font-bold text-zinc-800 dark:text-zinc-100 group-text-primary transition-colors">
              {{ link.name }}
            </div>
            <div class="text-sm text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
              {{ link.hostname }}
            </div>
            <p v-if="link.description" class="text-sm text-zinc-600 dark:text-zinc-300 mt-2 leading-relaxed">
              {{ link.description }}
            </p>
          </div>

          <Icon
            name="heroicons:arrow-top-right-on-square-20-solid"
            class="text-zinc-400 group-hover:text-primary transition-colors" />
        </div>
      </a>
    </div>

    <div
      v-else
      class="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 px-6 py-12 text-center bg-white/40 dark:bg-slate-900/40">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-10 text-primary mb-3">
        <Icon name="fa-solid:circle-info" size="18" />
      </div>
      <h2 class="text-xl font-bold text-zinc-800 dark:text-zinc-100">暂未添加友链</h2>
      <p class="text-zinc-600 dark:text-zinc-400 mt-2">
        你可以在 <code>app/config/index.ts</code> 的 <code>friendLinks</code> 中添加站点信息。
      </p>
    </div>
  </main>
</template>
