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

// 移动端子菜单展开状态
const mobileOpen = ref<Record<string, boolean>>({});
function toggleMobileSubmenu(path: string) {
  mobileOpen.value[path] = !mobileOpen.value[path];
}

// 路由变化时关闭菜单
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
    // 关闭所有移动端子菜单
    mobileOpen.value = {};
  },
);
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 h-16 lg:h-20 backdrop-blur-sm font-semibold px-3 sm:px-4 lg:px-8">
    <div class="flex justify-center items-center h-full w-full relative">
      <nav class="flex items-center justify-center w-full">
        <!-- 移动端导航栏 -->
        <div
          class="flex lg:hidden items-center justify-between w-full h-12 rounded-full glass-panel px-2">
          <NuxtLink
            to="/"
            class="min-w-0 flex-1 flex items-center gap-2 h-10 px-2 transition-transform active:scale-95">
            <!-- <Icon name="fa-solid:cat" size="18" class="text-primary flex items-center" /> -->
            <span class="truncate text-sm font-bold text-primary">{{
              siteConfig.siteMeta.title
            }}</span>
          </NuxtLink>

          <div class="shrink-0 flex items-center gap-1.5">
            <!-- <ClientOnly> -->
            <button
              class="h-9 w-9 rounded-full bg-white/45 dark:bg-white/5 flex items-center justify-center transition-all active:scale-90"
              :title="colorMode.value === 'light' ? '切换到深色模式' : '切换到浅色模式'"
              @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')">
              <Icon
                :name="colorMode.value === 'light' ? 'fa-regular:moon' : 'fa-regular:sun'"
                size="18"
                :class="colorMode.value === 'light' ? 'text-zinc-700' : 'text-yellow-400'" />
            </button>
            <!-- </ClientOnly> -->

            <button
              class="h-9 w-9 rounded-full bg-white/45 dark:bg-white/5 flex items-center justify-center transition-all active:scale-90"
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
        <div class="hidden lg:flex items-center justify-center w-full relative h-14">
          <!-- 桌面端导航栏logo (左上角) -->
          <div
            class="absolute left-0 h-14 flex items-center rounded-full glass-panel transition-transform px-1"
            :class="{
              'bg-primary-10 shadow-sm font-bold': isActive('/'),
              'hover:bg-zinc-100 dark:hover:bg-white/10': !isActive('/'),
            }">
            <NuxtLink to="/" class="flex h-12 duration-200 items-center gap-2 px-4 text-lg">
              <!-- <Icon name="fa-solid:cat" size="20" class="flex items-center text-primary" /> -->
              <span class="font-bold text-primary">{{ siteConfig.siteMeta.title }}</span>
            </NuxtLink>
          </div>

          <!-- 桌面端导航栏 (居中) -->
          <div
            class="inline-flex items-center h-14 glass-panel rounded-full px-1.5 transition-all duration-300 hover:shadow-[0_18px_55px_rgba(var(--site-primary-rgb),0.16)]">
            <ul class="flex items-center space-x-1.5 text-lg">
              <template v-for="link in siteConfig.navbar.links" :key="link.path">
                <li v-if="!link.children">
                  <NuxtLink
                    :to="link.path"
                    class="relative h-12 px-3 rounded-full transition-all duration-200 flex items-center text-zinc-700 dark:text-zinc-200"
                    :class="{
                      'bg-primary-10 text-primary shadow-sm font-bold': isActive(link.path),
                      'hover:bg-zinc-100 dark:hover:bg-white/10': !isActive(link.path),
                    }">
                    <Icon
                      v-if="link.icon"
                      :name="link.icon"
                      size="20"
                      class="mr-2 flex items-center" />
                    <span>{{ link.name }}</span>
                  </NuxtLink>
                </li>
                <li v-else class="relative group">
                  <div
                    class="relative h-12 px-3 rounded-full transition-all duration-200 flex items-center cursor-pointer text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10"
                    :class="{
                      'bg-primary-10 text-primary shadow-sm font-bold': isActive(link.path),
                    }">
                    <Icon
                      v-if="link.icon"
                      :name="link.icon"
                      size="20"
                      class="mr-2 flex items-center" />
                    <span>{{ link.name }}</span>
                    <Icon name="fa6-solid:chevron-down" size="14" class="ml-1 opacity-60" />
                  </div>
                  <ul
                    class="absolute left-0 top-full mt-0 min-w-32 bg-white dark:bg-slate-900 border border-zinc-200/50 dark:border-white/10 rounded-xl shadow-lg z-50 hidden group-hover:block hover:block pointer-events-auto">
                    <li v-for="child in link.children" :key="child.path">
                      <NuxtLink
                        :to="child.path"
                        class="block px-4 py-2 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-xl transition-colors">
                        <div class="flex items-center gap-2">
                          <Icon
                            v-if="child.icon"
                            :name="child.icon"
                            size="14"
                            class="mr-2 opacity-60" />
                          <span>{{ child.name }}</span>
                        </div>
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </template>
            </ul>
          </div>

          <!-- 桌面端主题切换 (右上角) -->
          <div class="absolute right-0 flex items-center gap-3">
            <ClientOnly>
              <button
                :title="colorMode.value === 'light' ? '切换到深色模式' : '切换到浅色模式'"
                class="relative h-14 w-14 rounded-full glass-panel flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')">
                <Icon
                  name="fa-regular:moon"
                  size="20"
                  class="icon-svg transition-all duration-300 text-zinc-700 dark:text-zinc-100"
                  :class="
                    colorMode.value === 'light'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75 -translate-y-1'
                  " />

                <Icon
                  name="fa-regular:sun"
                  size="20"
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
            class="lg:hidden absolute left-0 right-0 top-full mt-2 max-h-[calc(100svh-5rem)] overflow-y-auto glass-panel rounded-3xl z-50 origin-top">
            <div class="p-2">
              <ul class="space-y-1">
                <li v-for="link in siteConfig.navbar.links" :key="link.path">
                  <template v-if="!link.children">
                    <NuxtLink
                      :to="link.path"
                      class="flex items-center justify-between px-4 py-3.5 rounded-2xl text-zinc-700 dark:text-zinc-200 transition-all active:scale-[0.98]"
                      :class="
                        isActive(link.path)
                          ? 'bg-primary-10 text-primary font-bold'
                          : 'hover:bg-zinc-100 dark:hover:bg-white/5'
                      "
                      @click="isMenuOpen = false">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                          :class="
                            isActive(link.path)
                              ? 'bg-primary-10 text-primary'
                              : 'bg-zinc-100 dark:bg-white/5'
                          ">
                          <Icon v-if="link.icon" :name="link.icon" size="16" />
                        </div>
                        <span class="text-sm">{{ link.name }}</span>
                      </div>
                      <Icon name="fa6-solid:chevron-right" size="10" class="opacity-30" />
                    </NuxtLink>
                  </template>

                  <template v-else>
                    <div
                      class="flex items-center justify-between px-4 py-3.5 rounded-2xl text-zinc-700 dark:text-zinc-200 transition-all active:scale-[0.98]"
                      :class="
                        isActive(link.path)
                          ? 'bg-primary-10 text-primary font-bold'
                          : 'hover:bg-zinc-100 dark:hover:bg-white/5'
                      "
                      @click="toggleMobileSubmenu(link.path)">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
                          :class="
                            isActive(link.path)
                              ? 'bg-primary-10 text-primary'
                              : 'bg-zinc-100 dark:bg-white/5'
                          ">
                          <Icon v-if="link.icon" :name="link.icon" size="16" />
                        </div>
                        <span class="text-sm">{{ link.name }}</span>
                      </div>
                      <Icon
                        name="fa6-solid:chevron-right"
                        size="10"
                        :class="[
                          'opacity-30 transition-transform',
                          mobileOpen[link.path] ? 'rotate-90' : '',
                        ]" />
                    </div>

                    <transition
                      enter-active-class="transition duration-200"
                      leave-active-class="transition duration-150">
                      <ul v-if="mobileOpen[link.path]" class="pl-12 pr-3 pb-2 pt-2 space-y-1">
                        <li v-for="child in link.children" :key="child.path">
                          <NuxtLink
                            :to="child.path"
                            class="block px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5"
                            @click="isMenuOpen = false">
                            <div class="flex items-center gap-2">
                              <Icon
                                v-if="child.icon"
                                :name="child.icon"
                                size="14"
                                class="mr-2 opacity-60" />
                              <span>{{ child.name }}</span>
                            </div>
                          </NuxtLink>
                        </li>
                      </ul>
                    </transition>
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </nav>
    </div>
  </header>

  <!-- 菜单遮罩 -->
  <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-black/5" @click="isMenuOpen = false"></div>

  <!-- Spacer to prevent page content being hidden under fixed header -->
  <div class="h-16 lg:h-20" aria-hidden="true"></div>
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

/* 调整顶栏logo和主题切换键距离屏幕两端的距离 */
header .absolute.left-0 {
  margin-left: -15px; /* 减小左侧距离 */
}

header .absolute.right-0 {
  margin-right: -15px; /* 减小右侧距离 */
}

/* 解决 navbar 子菜单 hover 闪烁问题，提升可用性 */
.navbar-dropdown-group {
  position: relative;
}
.navbar-dropdown-toggle {
  cursor: pointer;
}
.navbar-dropdown-list {
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  margin-top: 0.5rem;
  min-width: 8rem;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.18);
  z-index: 50;
  border: 1px solid rgba(200, 200, 200, 0.15);
}
.dark .navbar-dropdown-list {
  background: #18181b;
  border-color: rgba(255, 255, 255, 0.08);
}
.navbar-dropdown-group:hover .navbar-dropdown-list,
.navbar-dropdown-list:hover {
  display: block;
}
</style>
