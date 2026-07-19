<template>
  <section class="flex flex-col gap-2.5">
    <div class="flex flex-wrap justify-center gap-2.5">
      <template v-for="link in links" :key="link.url">
        <UTooltip :text="link.name">
          <NuxtLink
            :to="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel text-zinc-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:text-primary hover:shadow-[0_16px_42px_rgba(var(--site-primary-rgb),0.2)] dark:text-zinc-300 dark:hover:text-white">
            <Icon v-if="iconFor(link)" :name="iconFor(link)" size="22" class="text-current" />
          </NuxtLink>
        </UTooltip>
      </template>
    </div>
  </section>
</template>

<script setup>
import siteConfig from "~/config";

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
  if (iconMap[key]) return iconMap[key];
  if (link.icon) return link.icon;
  return null;
};
</script>
