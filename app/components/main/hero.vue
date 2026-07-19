<script setup lang="ts">
import siteConfig from "~/config";
import SocialLinks from "./SocialLinks.vue";
import Typed from "typed.js";

// Normalize `siteConfig.hero.description` to a string[] to satisfy TypeScript
const rawDescription = siteConfig.hero?.description;
let descriptions: string[] = [];
if (Array.isArray(rawDescription)) {
  descriptions = rawDescription.filter((d) => typeof d === "string" && d.length > 0) as string[];
} else if (typeof rawDescription === "string" && rawDescription.length > 0) {
  descriptions = [rawDescription];
} else if (typeof siteConfig.hero?.title === "string" && siteConfig.hero.title.length > 0) {
  descriptions = [siteConfig.hero.title];
} else {
  descriptions = [""];
}

const typedElement = ref<HTMLElement | null>(null);
const randomDescription = ref(descriptions[0] || "");
let typed: Typed | null = null;

onMounted(() => {
  if (siteConfig.hero.typed?.enable && typedElement.value) {
    typed = new Typed(typedElement.value, {
      strings: descriptions,
      typeSpeed: siteConfig.hero.typed.typeSpeed || 100,
      backSpeed: siteConfig.hero.typed.backSpeed || 50,
      loop: siteConfig.hero.typed.loop ?? true,
      backDelay: siteConfig.hero.typed.backDelay || 2000,
    });
  } else {
    randomDescription.value = descriptions[Math.floor(Math.random() * descriptions.length)] || "";
  }
});

onUnmounted(() => {
  if (typed) {
    typed.destroy();
  }
});
</script>

<template>
  <section
    class="relative w-full min-h-[calc(100svh-4rem)] lg:min-h-[calc(100vh-4rem)] overflow-hidden bg-transparent">
    <div
      class="pointer-events-none absolute left-1/2 top-16 hidden h-136 w-136 -translate-x-1/2 rounded-full bg-primary-10 blur-3xl sm:block"></div>
    <!-- <div
      class="pointer-events-none absolute right-[8%] top-28 hidden h-44 w-44 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm dark:border-white/10 md:block"></div> -->
    <div
      class="pointer-events-none absolute bottom-24 left-[10%] hidden h-24 w-24 rotate-12 rounded-3xl border border-primary bg-primary-10 opacity-50 blur-[1px] md:block"></div>
    <div
      class="container max-w-5xl mx-auto px-4 sm:px-6 min-h-[calc(100svh-4rem)] lg:min-h-[calc(100vh-4rem)] flex items-center justify-center py-6 sm:py-0">
      <div class="relative z-10 flex w-full flex-col items-center text-center animate-rise-in">
        <div class="mb-5 sm:mb-7">
          <div class="relative h-28 w-28 group sm:h-40 sm:w-40">
            <div
              class="absolute -inset-4 hidden bg-primary-gradient rounded-full blur-2xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 sm:block"></div>
            <div
              class="absolute -inset-2 rounded-full border border-white/60 dark:border-white/10 opacity-70 transition-transform duration-700 group-hover:scale-110"></div>
            <NuxtImg
              :src="siteConfig.profile.avatar"
              alt="avatar"
              class="relative h-full w-full object-cover rounded-full border-4 border-white/85 dark:border-slate-800/85 shadow-[0_18px_60px_rgba(45,20,90,0.22)] transition-transform duration-500 group-hover:scale-105"
              width="160px"
              height="160px"
              loading="eager" />
          </div>
        </div>

        <div
          class="group glass-panel relative w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.6rem] px-5 py-6 sm:w-auto sm:max-w-none sm:rounded-[2rem] sm:px-10 sm:py-9 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(64,35,128,0.18)]">
          <div
            class="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent dark:via-white/20"></div>
          <div
            class="pointer-events-none absolute -right-20 -top-20 hidden h-40 w-40 rounded-full bg-primary-10 blur-2xl transition-transform duration-700 group-hover:scale-125 sm:block"></div>
          <h1
            class="relative max-w-2xl text-balance text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-[-0.06em] text-zinc-900 drop-shadow-sm dark:text-white">
            {{ siteConfig.hero.title }}
          </h1>

          <div class="mt-4 flex justify-center">
            <div
              class="h-1 w-16 bg-primary-gradient-r rounded-full opacity-70 shadow-[0_0_24px_rgba(var(--site-primary-rgb),0.45)]"></div>
          </div>

          <p
            class="mt-5 max-w-2xl text-balance text-sm sm:text-xl text-zinc-600 dark:text-zinc-300 relative font-medium leading-relaxed min-h-[1.5em]">
            <span v-if="siteConfig.hero.typed?.enable" ref="typedElement"></span>
            <span v-else>{{ randomDescription }}</span>
          </p>
        </div>

        <div class="mt-5 sm:mt-6 w-full flex items-center justify-center">
          <SocialLinks />
        </div>
      </div>
    </div>

    <!-- Decorative wave -->
    <!-- <div class="pointer-events-none absolute inset-x-0 bottom-0 -mb-1">
      <svg viewBox="0 0 1440 120" class="w-full h-20" preserveAspectRatio="none">
        <path
          d="M0,32L48,42.7C96,53,192,75,288,90.7C384,107,480,117,576,117.3C672,117,768,107,864,101.3C960,96,1056,96,1152,80C1248,64,1344,32,1392,16L1440,0L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="rgba(255,255,255,0.14)"
        />
      </svg>
    </div> -->
  </section>
</template>
