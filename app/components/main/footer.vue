<template>
  <footer
    class="text-center mt-auto w-full flex flex-col gap-2 py-8 px-4 border-t border-white/10 dark:border-white/5">
    <!-- 一言 -->
    <p v-if="showHitokoto && quote" class="text-text-muted text-sm m-0 italic">
      「{{ quote }}」<span v-if="from" class="ml-1.5">—— {{ from }}</span>
      <span v-if="from && fromWho" class="ml-1.5"> · {{ fromWho }}</span>
    </p>

    <!-- 访问统计 -->
    <p v-if="showStats && !statsError" class="text-text-muted text-xs m-0">
      👁️ {{ visitors }} · 📊 {{ pageviews }}
    </p>

    <!-- 备案信息 -->
    <p v-if="contact?.beian" class="text-text-muted text-xs m-0">
      <NuxtLink
        :to="contact.beianLink || '/'"
        class="opacity-85 transition-all duration-200 hover:text-primary hover:opacity-100">
        {{ contact.beian }}
      </NuxtLink>
    </p>

    <!-- 框架与技术栈信息 -->
    <p class="text-text-muted text-xs m-0">
      Powered by
      <a
        href="https://nuxt.com"
        target="_blank"
        rel="noreferrer"
        class="text-primary hover:text-accent transition-colors"
        >Nuxt 4</a
      >
      ·
      <a
        href="https://tailwindcss.com"
        target="_blank"
        rel="noreferrer"
        class="text-primary hover:text-accent transition-colors"
        >Tailwind CSS 4</a
      >
      ·
      <a
        href="https://vuejs.org"
        target="_blank"
        rel="noreferrer"
        class="text-primary hover:text-accent transition-colors"
        >Vue 3</a
      >
    </p>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="contact?.customHtml" v-html="contact.customHtml" />
  </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import siteConfig from "~/config";
const contact = siteConfig.footer || {};
const quote = ref("");
const from = ref("");
const fromWho = ref("");
const pageviews = ref(0);
const visitors = ref(0);
const statsError = ref(true);
const showHitokoto = siteConfig.footer?.hitokoto?.enable;
const showStats = ref(siteConfig.umami?.enable);

const buildHitokotoUrl = () => {
  const type = siteConfig.footer?.hitokoto?.type;
  const url = new URL("https://v1.hitokoto.cn/");
  if (Array.isArray(type)) {
    type.filter(Boolean).forEach((t) => url.searchParams.append("c", t));
  } else if (typeof type === "string") {
    type
      .split("&")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => url.searchParams.append("c", t));
  }
  return url.toString();
};

const fetchHitokoto = async () => {
  try {
    const resp = await fetch(buildHitokotoUrl());
    const data = await resp.json();
    quote.value = data.hitokoto || "";
    from.value = data.from || "";
    fromWho.value = data.from_who || "";
  } catch (e) {
    console.warn("Hitokoto fetch failed", e);
  }
};

const fetchStats = async () => {
  try {
    if (!siteConfig.umami?.apiEndpoint || !siteConfig.umami?.websiteId) {
      return;
    }
    const apiEndpoint = siteConfig.umami.apiEndpoint;
    const websiteId = siteConfig.umami.websiteId;
    const apiKey = siteConfig.umami.apiKey;

    if (!apiKey) return;

    // 获取统计数据

    const startAt = new Date(siteConfig.siteMeta.startTime);
    const endAt = Date.now();

    const resp = await fetch(
      `${apiEndpoint}/v1/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!resp.ok) {
      console.warn(`Stats API returned ${resp.status}`);
      statsError.value = true;
      return;
    }

    const data = await resp.json();
    if (data) {
      statsError.value = false;
      pageviews.value = data.pageviews;
      visitors.value = data.visitors;
    }

    if (pageviews.value === 0 && visitors.value === 0) {
      showStats.value = false;
    }
  } catch (e) {
    statsError.value = true;
    console.debug("Stats fetch failed (this is normal if blocked by ad blocker):", e.message);
  }
};

onMounted(() => {
  if (showHitokoto) fetchHitokoto();
  if (showStats.value) fetchStats();
});
</script>
