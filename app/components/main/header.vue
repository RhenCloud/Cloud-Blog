<script setup lang="ts">
import siteConfig from "~/config";

const colorMode = useColorMode();
function onClick(val: string) {
  colorMode.preference = val;
}

const route = useRoute();
function isActive(path: string) {
  return route.path === path || route.path.startsWith(path + "/");
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-sm font-semibold">
    <div class="flex justify-center px-6 container max-w-5xl mx-auto items-center h-full">
      <nav class="items-center">
        <div
          class="inline-flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-white/40 dark:border-white/5 rounded-full px-3 py-2 transition-all duration-300 hover:shadow-xl">
          <div class="hidden sm:flex items-center justify-center h-8 w-8 rounded-full bg-white/0">
            <NuxtLink
              to="/"
              class="relative rounded-full hover:bg-violet-400/40 dark:hover:bg-violet-200/40 p-1">
              <Icon name="fa-solid:cat" size="16" class="text-zinc-700 dark:text-zinc-200" />
            </NuxtLink>
          </div>

          <ul class="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
            <li v-for="link in siteConfig.navbar.links" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="relative px-2 py-1 rounded-full transition-all duration-200 flex items-center"
                :class="{
                  'bg-gradient-to-r from-violet-500/80 to-fuchsia-500/80 text-white shadow-md scale-105':
                    isActive(link.path),
                  'hover:bg-white/50 dark:hover:bg-white/10': !isActive(link.path),
                }">
                <Icon
                  v-if="link.icon"
                  :name="link.icon"
                  size="16"
                  class="text-zinc-700 dark:text-zinc-200 mr-2" />
                <span class="hidden sm:inline-block px-auto">{{ link.name }}</span>
                <span class="sm:hidden">{{ link.name }}</span>
              </NuxtLink>
            </li>
          </ul>

          <div class="ml-2 flex items-center">
            <ClientOnly>
              <button
                :title="colorMode.value === 'light' ? '切换到深色模式' : '切换到浅色模式'"
                class="relative h-9 w-9 rounded-full bg-white/20 dark:bg-white/5 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/40 dark:hover:bg-white/10 focus:outline-none shadow-sm border border-white/20"
                @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')">
                <Icon
                  name="fa-regular:sun"
                  size="18"
                  class="icon-svg transition-all duration-300 text-yellow-400"
                  :class="
                    colorMode.value === 'light'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75 -translate-y-1'
                  " />

                <Icon
                  name="fa-regular:moon"
                  size="18"
                  class="icon-svg absolute transition-all duration-300 text-indigo-200"
                  :class="
                    colorMode.value === 'dark'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75 translate-y-1'
                  " />
              </button>

              <template #fallback>
                <Icon name="fa-solid:spinner" size="18" class="icon-svg text-zinc-400" />
              </template>
            </ClientOnly>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <!-- Spacer to prevent page content being hidden under fixed header -->
  <div class="h-16" aria-hidden="true"></div>
</template>

<style scoped>
.icon-svg {
  display: inline-block;
  width: 1.125rem;
  /* 18px */
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
