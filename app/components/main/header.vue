<script setup lang="ts">
import { ref, watch } from "vue";
import siteConfig from "~/config";

const colorMode = useColorMode();
function onClick(val: string) {
  colorMode.preference = val;
}

const route = useRoute();
function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + "/");
}

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// 路由变化时关闭菜单
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-sm font-semibold px-4 sm:px-8">
    <div class="flex justify-center items-center h-full w-full relative">
      <nav class="flex items-center justify-center w-full">
        <!-- 移动端导航栏 -->
        <div class="flex sm:hidden items-center justify-between w-full">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 h-10 px-4 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm backdrop-blur-xl transition-transform active:scale-95">
            <Icon
              name="fa-solid:cat"
              size="18"
              class="text-zinc-700 dark:text-zinc-200 flex items-center" />
            <span
              class="text-base font-bold bg-linear-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent"
              >{{ siteConfig.siteMeta.title }}</span
            >
          </NuxtLink>

          <div class="flex items-center gap-2">
            <ClientOnly>
              <button
                class="h-10 w-10 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm flex items-center justify-center transition-all active:scale-90"
                :title="colorMode.value === 'light' ? '切换到深色模式' : '切换到浅色模式'"
                @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')">
                <Icon
                  :name="colorMode.value === 'light' ? 'fa-regular:moon' : 'fa-regular:sun'"
                  size="18"
                  :class="colorMode.value === 'light' ? 'text-zinc-700' : 'text-yellow-400'" />
              </button>
            </ClientOnly>

            <button
              class="h-10 w-10 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm flex items-center justify-center transition-all active:scale-90"
              aria-label="菜单"
              @click="toggleMenu">
              <Icon
                :name="isMenuOpen ? 'fa6-solid:xmark' : 'fa6-solid:bars'"
                size="18"
                class="text-zinc-800 dark:text-zinc-100" />
            </button>
          </div>
        </div>

        <!-- 桌面端导航栏 -->
        <div class="hidden sm:flex items-center justify-center w-full relative h-12">
          <!-- 桌面端导航栏logo (左上角) -->
          <div
            class="absolute left-0 h-12 flex items-center rounded-full border bg-white/80 dark:bg-slate-900/80 border-zinc-200/50 dark:border-white/10 shadow-sm backdrop-blur-xl transition-transform px-1"
            :class="{
              'bg-white dark:bg-slate-800 shadow-sm font-bold': isActive('/'),
              'hover:bg-zinc-100 dark:hover:bg-white/10': !isActive('/'),
            }">
            <NuxtLink to="/" class="flex h-10 duration-200 items-center gap-2 px-4 text-base">
              <Icon
                name="fa-solid:cat"
                size="18"
                class="flex items-center text-zinc-700 dark:text-zinc-200" />
              <span
                class="font-bold bg-linear-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent"
                >{{ siteConfig.siteMeta.title }}</span
              >
            </NuxtLink>
          </div>

          <!-- 桌面端导航栏 (居中) -->
          <div
            class="inline-flex items-center h-12 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-zinc-200/50 dark:border-white/5 rounded-full px-1.5 transition-all duration-300 hover:shadow-xl">
            <ul class="flex items-center space-x-1.5 text-base">
              <li v-for="link in siteConfig.navbar.links" :key="link.path">
                <NuxtLink
                  :to="link.path"
                  class="relative h-10 px-5 rounded-full transition-all duration-200 flex items-center text-zinc-700 dark:text-zinc-200"
                  :class="{
                    'bg-white dark:bg-slate-800 shadow-sm font-bold': isActive(link.path),
                    'hover:bg-zinc-100 dark:hover:bg-white/10': !isActive(link.path),
                  }">
                  <Icon
                    v-if="link.icon"
                    :name="link.icon"
                    size="18"
                    class="mr-2 flex items-center" />
                  <span>{{ link.name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 桌面端主题切换 (右上角) -->
          <div class="absolute right-0 flex items-center">
            <ClientOnly>
              <button
                :title="colorMode.value === 'light' ? '切换到深色模式' : '切换到浅色模式'"
                class="relative h-12 w-12 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-xl"
                @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')">
                <Icon
                  name="fa-regular:moon"
                  size="18"
                  class="icon-svg transition-all duration-300 text-zinc-700 dark:text-white-200"
                  :class="
                    colorMode.value === 'light'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75 -translate-y-1'
                  " />

                <Icon
                  name="fa-regular:sun"
                  size="18"
                  class="icon-svg absolute transition-all duration-300 text-yellow-400"
                  :class="
                    colorMode.value === 'dark'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75 translate-y-1'
                  " />
              </button>
            </ClientOnly>
          </div>
        </div>

        <!-- 移动端下拉菜单 -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-2 opacity-0 scale-95"
          enter-to-class="translate-y-0 opacity-100 scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100 scale-100"
          leave-to-class="translate-y-2 opacity-0 scale-95">
          <div
            v-if="isMenuOpen"
            class="sm:hidden absolute top-full right-0 mt-3 w-56 overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-zinc-200/60 dark:border-white/10 rounded-3xl shadow-2xl z-50 origin-top-right">
            <div class="p-2">
              <ul class="space-y-1">
                <li v-for="link in siteConfig.navbar.links" :key="link.path">
                  <NuxtLink
                    :to="link.path"
                    class="flex items-center justify-between px-4 py-3.5 rounded-2xl text-zinc-700 dark:text-zinc-200 transition-all active:scale-[0.98]"
                    :class="
                      isActive(link.path)
                        ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold'
                        : 'hover:bg-zinc-100 dark:hover:bg-white/5'
                    ">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                        :class="
                          isActive(link.path) ? 'bg-violet-500/20' : 'bg-zinc-100 dark:bg-white/5'
                        ">
                        <Icon v-if="link.icon" :name="link.icon" size="16" />
                      </div>
                      <span class="text-sm">{{ link.name }}</span>
                    </div>
                    <Icon name="fa6-solid:chevron-right" size="10" class="opacity-30" />
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </nav>
    </div>
  </header>

  <!-- 移动端菜单遮罩 -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-40 bg-black/5 sm:hidden"
    @click="isMenuOpen = false"></div>

  <!-- Spacer to prevent page content being hidden under fixed header -->
  <div class="h-16" aria-hidden="true"></div>
</template>

<style scoped>
.icon-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.125rem;
  /*ms-px */
  height: 1.125rem;
}

.icon-svg svg {
  width: 100%;
  height: 100%;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease,
    fill 0.25s ease;
}

.icon-svg.opacity-0 {
  pointer-events: none;
}
</style>
