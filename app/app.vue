<script setup lang="ts">
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
</script>

<template>
  <UApp>
    <meta name="color-scheme" content="light dark" />
    <div class="relative">
      <!-- Desktop Background -->
      <div
        v-if="desktopBg"
        class="fixed inset-0 -z-20 bg-cover bg-center pointer-events-none hidden md:block"
        :style="{ backgroundImage: `url(${desktopBg})` }" />

      <!-- Mobile Background -->
      <div
        v-if="mobileBg"
        class="fixed inset-0 -z-20 bg-cover bg-center pointer-events-none block md:hidden"
        :style="{ backgroundImage: `url(${mobileBg})` }" />

      <!-- Fallback if mobileBg is missing but desktopBg exists -->
      <div
        v-if="!mobileBg && desktopBg"
        class="fixed inset-0 -z-20 bg-cover bg-center pointer-events-none block md:hidden"
        :style="{ backgroundImage: `url(${desktopBg})` }" />

      <div class="dark:text-zinc-300">
        <NuxtLoadingIndicator />
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </div>
  </UApp>
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
