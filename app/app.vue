<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import siteConfig from "~/config";
// import { siteMetaData } from "./data";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  // meta: () => siteMetaData,
});

const desktopBg = siteConfig.theme.background || "";
const mobileBg = siteConfig.theme.backgroundMobile || "";
const currentBg = ref<string>(desktopBg);

onMounted(() => {
  if (mobileBg && window.innerWidth <= 768) {
    currentBg.value = mobileBg;
  }
});

const bgStyle = computed(() =>
  currentBg.value ? { backgroundImage: "url(" + currentBg.value + ")" } : {},
);
</script>

<template>
  <link
    rel="stylesheet"
    href="https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Regular/result.css" />
  <div class="relative">
    <div
      v-if="currentBg"
      class="fixed inset-0 -z-20 bg-cover bg-center pointer-events-none"
      :style="bgStyle" />

    <div class="dark:text-zinc-300">
      <NuxtLoadingIndicator />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

html {
  scroll-behavior: smooth;
}

html.dark {
  color-scheme: dark;
}
</style>
