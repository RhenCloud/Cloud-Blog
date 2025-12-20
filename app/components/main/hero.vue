<script setup lang="ts">
import siteConfig from "~/config";
import SocialLinks from "./SocialLinks.vue";
</script>

<template>
  <section class="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-transparent">
    <div
      class="container max-w-5xl mx-auto px-6 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div class="relative z-10 flex flex-col items-center text-center">
        <div class="mb-8">
          <div class="relative h-32 w-32 group">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <NuxtImg
              :src="siteConfig.profile.avatar"
              alt="avatar"
              class="relative h-full w-full object-cover rounded-full border-4 border-white/80 dark:border-slate-800/80 shadow-2xl transition-transform duration-500 group-hover:scale-105"
              loading="eager" />
          </div>
        </div>

        <div
          class="group rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] hover:-translate-y-1">
          <h1
            class="max-w-2xl text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-zinc-800 dark:text-white drop-shadow-sm relative tracking-tight">
            {{ siteConfig.hero.title }}
          </h1>

          <div class="mt-4 flex justify-center">
            <div
              class="h-1 w-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full opacity-60"></div>
          </div>

          <p
            class="mt-4 max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-300 relative font-medium leading-relaxed">
            {{ siteConfig.hero.description }}
          </p>
        </div>

        <div class="mt-6 w-full flex items-center justify-center">
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
