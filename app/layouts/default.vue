<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <!-- <UContainer> -->
  <div class="font-spacegrotesk relative overflow-x-hidden">
    <MainHeader />
    <main>
      <slot />
    </main>
    <footer>
      <MainFooter />
    </footer>

    <!-- 全局遮罩 -->
    <div
      class="absolute inset-0 pointer-events-none -z-10 transition-all duration-700 ease-in-out"
      :style="route.path === '/' ? { clipPath: 'inset(100vh 0 0 0)' } : {}">
      <div
        class="absolute inset-0 bg-linear-to-b from-white/40 via-white/40 to-white/70 dark:from-slate-900/40 dark:via-slate-900/40 dark:to-slate-900/70 backdrop-blur-xs"></div>
      <!-- <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div> -->
    </div>
  </div>
  <!-- </UContainer> -->
</template>

<style scoped>
.gd-container {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 100vh;
}
</style>
