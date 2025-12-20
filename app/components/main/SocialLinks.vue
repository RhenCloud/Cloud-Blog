<template>
  <section class="flex flex-col gap-2.5">
    <div class="flex flex-wrap gap-2.5">
      <template v-for="link in links" :key="link.url">
        <NuxtLink
          :to="link.url"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/40 text-zinc-700 text-sm font-semibold transition-all duration-300 hover:bg-white/60 hover:border-white/60 hover:text-violet-600 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800/40 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-slate-800/60 dark:hover:text-white">
          <span v-if="iconFor(link)" class="inline-flex items-center justify-center w-5 h-5">
            <Icon
              v-if="iconFor(link).name"
              :name="iconFor(link).name"
              size="16"
              class="text-current" />
            <NuxtImg
              v-else
              :src="iconFor(link).src"
              :alt="link.name"
              loading="lazy"
              class="w-full h-full" />
          </span>
          <span>{{ link.name }}</span>
        </NuxtLink>
      </template>
    </div>
  </section>
</template>

<script setup>
import siteConfig from "~/config";

import { onMounted } from "vue";
const links = siteConfig.socialLinks;

const iconMap = {
  bilibili: "simple-icons:bilibili",
  github: "fa-brands:github",
  blog: "fa-solid:rss",
  email: "fa-solid:envelope",
  mail: "fa-solid:envelope",
  telegram: "fa-brands:telegram",
  twitter: "fa-brands:twitter",
  x: "fa-brands:twitter",
  linkedin: "fa-brands:linkedin",
  youtube: "fa-brands:youtube",
  facebook: "fa-brands:facebook",
  instagram: "fa-brands:instagram",
  reddit: "fa-brands:reddit",
  discord: "fa-brands:discord",
  weibo: "fa-brands:weibo",
  zhihu: "fa-brands:zhihu",
  wechat: "fa-brands:weixin",
  weixin: "fa-brands:weixin",
  qq: "fa-brands:qq",
};

const iconFor = (link) => {
  const key = (link.name || "").toLowerCase();
  if (iconMap[key]) return { name: iconMap[key] };
  if (link.icon) return { src: link.icon };
  return null;
};
onMounted(() => {
  const id = "fa-cdn";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css?font-display=swap";
  link.crossOrigin = "anonymous";
  link.referrerPolicy = "no-referrer";
  document.head.appendChild(link);
});
</script>
