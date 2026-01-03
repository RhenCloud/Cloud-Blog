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

const isLinesOpen = ref(false);
function toggleLines() {
  isLinesOpen.value = !isLinesOpen.value;
}

const linePings = ref<Record<string, number | string>>({});

async function pingLine(url: string) {
  const start = Date.now();
  try {
    // 使用 fetch 测量延迟，no-cors 模式可以避开大部分 CORS 问题
    await fetch(url, { mode: "no-cors", cache: "no-cache" });
    linePings.value[url] = Date.now() - start;
  } catch (e) {
    linePings.value[url] = "Timeout";
    console.error(e);
  }
}

function updateAllPings() {
  if (siteConfig.lines) {
    siteConfig.lines.forEach((line) => {
      if (line.ping !== false) {
        linePings.value[line.url] = "...";
        pingLine(line.url);
      }
    });
  }
}

function getPingColor(ping: number | string | undefined) {
  if (typeof ping !== "number") return "text-zinc-400";
  if (ping < 300) return "text-emerald-500";
  if (ping < 800) return "text-amber-500";
  return "text-rose-500";
}

watch(isLinesOpen, (val) => {
  if (val) {
    updateAllPings();
  }
});

// 路由变化时关闭菜单
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
    isLinesOpen.value = false;
  },
);
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-sm font-semibold px-4 lg:px-8">
    <div class="flex justify-center items-center h-full w-full relative">
      <nav class="flex items-center justify-center w-full">
        <!-- 移动端导航栏 -->
        <div class="flex lg:hidden items-center justify-between w-full">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 h-10 px-4 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm backdrop-blur-xl transition-transform active:scale-95">
            <!-- <Icon name="fa-solid:cat" size="18" class="text-primary flex items-center" /> -->
            <span class="text-base font-bold text-primary">{{ siteConfig.siteMeta.title }}</span>
          </NuxtLink>

          <div class="flex items-center gap-2">
            <!-- 线路切换 (移动端) -->
            <div v-if="siteConfig.lines && siteConfig.lines.length > 0" class="relative">
              <button
                class="h-10 w-10 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm flex items-center justify-center transition-all active:scale-90"
                title="切换线路"
                @click="toggleLines">
                <Icon name="fa6-solid:bolt" size="16" class="text-zinc-700 dark:text-zinc-200" />
              </button>

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-1 opacity-0 scale-95"
                enter-to-class="translate-y-0 opacity-100 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100 scale-100"
                leave-to-class="translate-y-1 opacity-0 scale-95">
                <div
                  v-if="isLinesOpen"
                  class="absolute top-full right-0 mt-2 w-32 overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-zinc-200/60 dark:border-white/10 rounded-2xl shadow-xl z-50">
                  <div class="p-1">
                    <a
                      v-for="line in siteConfig.lines"
                      :key="line.url"
                      :href="line.url"
                      class="flex items-center justify-between px-3 py-2 rounded-xl text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                      @click="isLinesOpen = false">
                      <span>{{ line.name }}</span>
                      <span
                        v-if="line.ping !== false && linePings[line.url]"
                        class="text-xs font-mono"
                        :class="getPingColor(linePings[line.url])">
                        {{
                          typeof linePings[line.url] === "number"
                            ? linePings[line.url] + "ms"
                            : linePings[line.url]
                        }}
                      </span>
                    </a>
                  </div>
                </div>
              </transition>
            </div>

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
        <div class="hidden lg:flex items-center justify-center w-full relative h-14">
          <!-- 桌面端导航栏logo (左上角) -->
          <div
            class="absolute left-0 h-14 flex items-center rounded-full border bg-white/80 dark:bg-slate-900/80 border-zinc-200/50 dark:border-white/10 shadow-sm backdrop-blur-xl transition-transform px-1"
            :class="{
              'bg-white dark:bg-slate-800 shadow-sm font-bold': isActive('/'),
              'hover:bg-zinc-100 dark:hover:bg-white/10': !isActive('/'),
            }">
            <NuxtLink to="/" class="flex h-12 duration-200 items-center gap-2 px-4 text-lg">
              <!-- <Icon name="fa-solid:cat" size="20" class="flex items-center text-primary" /> -->
              <span class="font-bold text-primary">{{ siteConfig.siteMeta.title }}</span>
            </NuxtLink>
          </div>

          <!-- 桌面端导航栏 (居中) -->
          <div
            class="inline-flex items-center h-14 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] border border-zinc-200/50 dark:border-white/5 rounded-full px-1.5 transition-all duration-300 hover:shadow-xl">
            <ul class="flex items-center space-x-1.5 text-lg">
              <li v-for="link in siteConfig.navbar.links" :key="link.path">
                <NuxtLink
                  :to="link.path"
                  class="relative h-12 px-3 rounded-full transition-all duration-200 flex items-center text-zinc-700 dark:text-zinc-200"
                  :class="{
                    'bg-white dark:bg-slate-800 shadow-sm font-bold': isActive(link.path),
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
            </ul>
          </div>

          <!-- 桌面端主题切换 (右上角) -->
          <div class="absolute right-0 flex items-center gap-3">
            <!-- 线路切换 (桌面端) -->
            <div v-if="siteConfig.lines && siteConfig.lines.length > 0" class="relative">
              <button
                class="h-14 w-14 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-xl"
                title="切换线路"
                @click="toggleLines">
                <Icon name="fa6-solid:bolt" size="20" class="text-zinc-700 dark:text-zinc-200" />
              </button>

              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="translate-y-2 opacity-0 scale-95"
                enter-to-class="translate-y-0 opacity-100 scale-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100 scale-100"
                leave-to-class="translate-y-2 opacity-0 scale-95">
                <div
                  v-if="isLinesOpen"
                  class="absolute top-full right-0 mt-3 w-36 overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-zinc-200/60 dark:border-white/10 rounded-2xl shadow-2xl z-50">
                  <div class="p-1.5">
                    <a
                      v-for="line in siteConfig.lines"
                      :key="line.url"
                      :href="line.url"
                      class="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
                      @click="isLinesOpen = false">
                      <div class="flex items-center">
                        <Icon name="fa6-solid:link" size="14" class="mr-2 opacity-50" />
                        {{ line.name }}
                      </div>
                      <span
                        v-if="line.ping !== false && linePings[line.url]"
                        class="text-xs font-mono ml-2"
                        :class="getPingColor(linePings[line.url])">
                        {{
                          typeof linePings[line.url] === "number"
                            ? linePings[line.url] + "ms"
                            : linePings[line.url]
                        }}
                      </span>
                    </a>
                  </div>
                </div>
              </transition>
            </div>

            <ClientOnly>
              <button
                :title="colorMode.value === 'light' ? '切换到深色模式' : '切换到浅色模式'"
                class="relative h-14 w-14 rounded-full bg-white/80 dark:bg-slate-900/80 border border-zinc-200/50 dark:border-white/10 shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95 backdrop-blur-xl"
                @click="onClick(colorMode.value === 'light' ? 'dark' : 'light')">
                <Icon
                  name="fa-regular:moon"
                  size="20"
                  class="icon-svg transition-all duration-300 text-zinc-700 dark:text-white-200"
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
            class="lg:hidden absolute top-full right-0 mt-3 w-56 overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-zinc-200/60 dark:border-white/10 rounded-3xl shadow-2xl z-50 origin-top-right">
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

  <!-- 菜单遮罩 -->
  <div
    v-if="isMenuOpen || isLinesOpen"
    class="fixed inset-0 z-40 bg-black/5"
    @click="
      isMenuOpen = false;
      isLinesOpen = false;
    "></div>

  <!-- Spacer to prevent page content being hidden under fixed header -->
  <div class="h-20" aria-hidden="true"></div>
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

/* 强制显示桌面端navbar，隐藏移动端 */
@media (min-width: 769px) and (max-width: 1023px) {
  /* 显示桌面端navbar，隐藏移动端 */
  .hidden.lg\:flex.items-center.justify-center.w-full.relative.h-14 {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  .lg\:hidden {
    display: none !important;
  }
  /* logo和右侧按钮绝对定位，navbar居中 */
  header .absolute.left-0 {
    position: absolute !important;
    left: 0.5rem !important;
    margin-left: 0 !important;
    z-index: 10;
    height: 2.5rem !important;
    display: flex !important;
    align-items: center !important;
  }
  header .absolute.left-0 .h-14 {
    height: 2.5rem !important;
    min-width: 2.5rem !important;
    width: auto !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    display: flex !important;
    align-items: center !important;
  }
  header .absolute.left-0 .h-12 {
    height: 2.5rem !important;
    font-size: 1rem !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    display: flex !important;
    align-items: center !important;
  }
  header .absolute.right-0 {
    position: absolute !important;
    right: 0.5rem !important;
    margin-right: 0 !important;
    z-index: 10;
  }
  /* 缩小主题切换和线路按钮尺寸 */
  header .absolute.right-0 .h-14,
  header .absolute.right-0 .w-14 {
    height: 2.5rem !important;
    width: 2.5rem !important;
  }
  header .absolute.right-0 .gap-3 {
    gap: 0.5rem !important;
  }
  /* navbar最大宽度，居中显示 */
  .inline-flex.items-center.h-14 {
    margin-left: auto !important;
    margin-right: auto !important;
    height: 2.5rem !important;
    border-radius: 1.5rem !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
    min-width: 0;
    max-width: 700px !important;
    justify-content: center !important;
  }
  /* 缩小ul间距和字体 */
  .inline-flex.items-center.h-14 ul.flex.items-center.space-x-1\.5.text-lg {
    gap: 0.25rem !important;
    font-size: 1rem !important;
  }
  /* 缩小每个链接的padding和高度 */
  .inline-flex.items-center.h-14 ul.flex.items-center li .h-12 {
    height: 2rem !important;
  }
  .inline-flex.items-center.h-14 ul.flex.items-center li .px-3 {
    padding-left: 0.75rem !important;
    padding-right: 0.75rem !important;
  }
  /* 缩小图标和文字间距 */
  .inline-flex.items-center.h-14 ul.flex.items-center li .mr-2 {
    margin-right: 0.25rem !important;
  }
}
</style>
