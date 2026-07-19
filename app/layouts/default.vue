<script setup lang="ts"></script>

<template>
  <div class="cloud-shell relative min-h-screen flex flex-col overflow-hidden">
    <MainHeader />
    <main class="flex-1">
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>

    <!-- 全局遮罩 -->
    <div class="absolute inset-0 pointer-events-none -z-10 transition-all duration-700 ease-in-out">
      <div
        class="absolute inset-0 bg-linear-to-b from-white/45 via-white/28 to-white/70 dark:from-slate-950/40 dark:via-slate-900/30 dark:to-slate-950/70 backdrop-blur-xs"></div>
      <!-- <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div> -->
    </div>
  </div>
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
