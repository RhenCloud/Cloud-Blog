<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <footer
    class="text-center mt-auto w-full flex flex-col gap-2 py-8 px-4 border-t border-white/10 dark:border-white/5">
    <!-- 一言 -->
    <p v-if="showHitokoto && quote" class="text-text-muted text-sm m-0 italic">
      「{{ quote }}」<span v-if="from" class="ml-1.5">—— {{ from }}</span>
      <span v-if="from && fromWho" class="ml-1.5"> · {{ fromWho }}</span>
    </p>

    <!-- 备案信息 -->
    <p v-if="contact?.beian" class="text-text-muted text-xs m-0">
      <NuxtLink
        :to="contact.beianLink || 'https://beian.miit.gov.cn/'"
        class="opacity-85 transition-all duration-200 hover:text-accent hover:opacity-100">
        {{ contact.beian }}
      </NuxtLink>
    </p>

    <div v-if="adStats && processedAds.length">
      <template v-for="ad in processedAds" :key="ad.link">
        <a
          v-if="isExternal(ad.link)"
          :href="ad.link"
          target="_blank"
          rel="noreferrer"
          class="text-text-muted text-sm m-0">
          <span v-html="ad.html"></span>
        </a>

        <NuxtLink v-else :to="ad.link" class="text-text-muted text-sm m-0">
          <span v-html="ad.html"></span>
        </NuxtLink>
      </template>
    </div>

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

    <p>
      © {{ new Date(siteConfig.siteMeta.startTime).getFullYear() }}-{{ new Date().getFullYear() }}
      {{ siteConfig.siteMeta.author }} |
      <NuxtLink to="/rss.xml" class="text-primary" external>RSS</NuxtLink> |
      <NuxtLink to="/sitemap.xml" class="text-primary" external>Sitemap</NuxtLink>.
    </p>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="contact?.customHtml" v-html="contact.customHtml"></div>
  </footer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import siteConfig from "~/config";
const contact = siteConfig.footer || {};
const quote = ref("");
const from = ref("");
const fromWho = ref("");
const showHitokoto = siteConfig.footer?.hitokoto?.enable;

const adStats = siteConfig.ad?.enable;
const ads = siteConfig.ad?.ads || [];

// processedAds: replace root-relative src ("/...") with full site URL to
// avoid issues when deployed under different hosts/base paths or when
// root-relative assets are unavailable. Keeps existing HTML otherwise.
const processedAds = (ads || []).map((ad) => {
  const html =
    typeof ad.body === "string"
      ? ad.body.replace(/src="\/(?!\/)/g, `src="${siteConfig.siteMeta.url}/`)
      : ad.body;
  return { ...ad, html };
});

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

const isExternal = (url) => {
  return typeof url === "string" && /^https?:\/\//.test(url);
};

onMounted(() => {
  if (showHitokoto) fetchHitokoto();
});
</script>
