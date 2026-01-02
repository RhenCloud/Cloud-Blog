<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="font-spacegrotesk relative min-h-screen overflow-x-hidden flex flex-col">
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
        class="absolute inset-0 bg-linear-to-b from-white/40 via-white/40 to-white/70 dark:from-slate-900/40 dark:via-slate-900/40 dark:to-slate-900/70 backdrop-blur-xs"></div>
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
