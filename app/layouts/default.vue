<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div class="gd-container font-spacegrotesk relative">
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
        class="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80 dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-900/90 backdrop-blur-xl"></div>
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay"></div>
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
