<script setup lang="ts">
import siteConfig from "~/config";
// import { siteMetaData } from "./data";

useHead({
  htmlAttrs: {
    lang: "en",
  },
  // meta: () => siteMetaData,
});

const desktopBg = siteConfig.theme?.background || "";
const mobileBg = siteConfig.theme?.backgroundMobile || "";

// 将 siteConfig.theme.color 转换为 CSS 变量
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}`
    : "189, 131, 243";
};

const primaryColor = siteConfig.theme?.color || "#bd83f3";
const primaryRgb = hexToRgb(primaryColor);

// Parse traceConfig.script (which may contain raw <script> tags) into
// proper head script entries to avoid inserting raw HTML into a script
// element (which causes JS parse errors like "Unexpected token '<'").
const traceRaw = siteConfig.traceConfig?.script || "";
type TraceScript = { src?: string; children?: string; type?: string };
const traceScripts: TraceScript[] = [];
if (typeof traceRaw === "string" && traceRaw.trim()) {
  // find all <script ... src="..."> tags and extract src
  const srcRegex = /<script[^>]*src=["']([^"']+)["'][^>]*>\s*<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = srcRegex.exec(traceRaw))) {
    let src = m[1];
    if (src?.startsWith("//")) src = `https:${src}`;
    traceScripts.push({ src });
  }

  // find inline script contents
  const inlineRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
  while ((m = inlineRegex.exec(traceRaw))) {
    const content = (m[1] || "").trim();
    if (content) traceScripts.push({ children: content, type: "text/javascript" });
  }
}

useHead({
  style: [
    {
      innerHTML: `:root { --site-primary: ${primaryColor}; --site-primary-rgb: ${primaryRgb}; }`,
    },
  ],
  script: traceScripts,
});
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
