<script setup lang="ts">
import { ref } from "vue";
import siteConfig from "~/config";

const showMore = ref(false);

const { data: sysInfo } = await useFetch("/sys-info");

const techStack = computed(() => {
  const platform = sysInfo.value?.platform || {
    name: "Detecting...",
    icon: "heroicons:arrow-path",
  };
  return [
    { label: "构建平台", value: platform.name, icon: platform.icon },
    { label: "图片存储", value: "Cloudflare R2", icon: "heroicons:photo" },
    { label: "软件协议", value: "MIT", icon: "heroicons:document-text" },
    { label: "文章许可", value: "CC BY-NC-SA 4.0", icon: "fa-brands:creative-commons" },
    {
      label: "规范域名",
      value: siteConfig.siteMeta.url.replace("https://", ""),
      icon: "heroicons:globe-alt",
    },
  ];
});

const versions = computed(() => {
  if (!sysInfo.value) return [];
  const v = sysInfo.value.versions;
  return [
    { label: "Vue", value: v.vue },
    { label: "Nuxt", value: v.nuxt },
    { label: "Content", value: v.content },
    { label: "Node", value: v.node },
    { label: "OS", value: v.os },
    { label: "Arch", value: v.arch },
  ];
});
</script>

<template>
  <section class="py-12 px-4">
    <div class="max-w-xl mx-auto">
      <div class="flex items-center gap-3 mb-6">
        <div class="p-2 bg-violet-500/10 rounded-lg">
          <Icon
            name="heroicons:cpu-chip"
            size="1.5em"
            class="text-violet-600 dark:text-violet-400" />
        </div>
        <h2 class="text-2xl font-bold text-zinc-800 dark:text-zinc-100 tracking-tight">技术信息</h2>
      </div>

      <div
        class="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 rounded-3xl p-6 shadow-sm">
        <!-- 基础信息列表 -->
        <div class="space-y-4">
          <div
            v-for="item in techStack"
            :key="item.label"
            class="flex items-center justify-between group">
            <span class="text-zinc-500 dark:text-zinc-400 text-sm font-medium">{{
              item.label
            }}</span>
            <div class="flex items-center gap-2">
              <Icon
                v-if="item.icon"
                :name="item.icon"
                class="w-4 h-4 text-zinc-400 group-hover:text-violet-500 transition-colors" />
              <span class="text-zinc-800 dark:text-zinc-200 text-sm font-bold">{{
                item.value
              }}</span>
            </div>
          </div>
        </div>

        <!-- 详细版本信息网格 -->
        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
          <div v-for="v in versions" :key="v.label" class="text-center">
            <div
              class="text-[10px] uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-bold mb-1">
              {{ v.label }}
            </div>
            <div class="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
              {{ v.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
