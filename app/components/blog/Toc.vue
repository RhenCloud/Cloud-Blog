<script setup lang="ts">
interface TocLink {
  id: string;
  text: string;
  children?: TocLink[];
}

const props = defineProps<{
  links: TocLink[];
  isMobile?: boolean;
}>();

const emit = defineEmits(["close"]);

const activeId = ref("");

const flattenLinks = (links: TocLink[]) => {
  let flat: TocLink[] = [];
  links.forEach((link) => {
    flat.push(link);
    if (link.children) {
      flat = flat.concat(flattenLinks(link.children));
    }
  });
  return flat;
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    { rootMargin: "-100px 0% -80% 0%" },
  );

  flattenLinks(props.links).forEach((link) => {
    const el = document.getElementById(link.id);
    if (el) observer.observe(el);
  });

  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <div v-if="!isMobile" class="w-full lg:w-1/3 hidden lg:block sticky top-28">
    <div
      class="h-fit max-h-[calc(100vh-8rem)] overflow-y-auto bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-white/5 p-6 rounded-3xl shadow-sm">
      <h3
        class="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 flex items-center gap-2">
        <Icon name="heroicons:list-bullet" class="w-4 h-4" />
        Table Of Content
      </h3>
      <nav class="space-y-1">
        <template v-for="link in props.links" :key="link.id">
          <NuxtLink
            :to="`#${link.id}`"
            class="block text-sm py-1.5 px-3 rounded-xl transition-all duration-200"
            :class="[
              activeId === link.id
                ? 'text-violet-600 dark:text-violet-400 bg-violet-500/10 font-bold translate-x-1'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5',
            ]">
            {{ link.text }}
          </NuxtLink>

          <div v-if="link.children" class="ml-3 space-y-1">
            <template v-for="child in link.children" :key="child.id">
              <NuxtLink
                :to="`#${child.id}`"
                class="block text-xs py-1.5 px-3 rounded-xl transition-all duration-200"
                :class="[
                  activeId === child.id
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-500/10 font-bold translate-x-1'
                    : 'text-zinc-500 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5',
                ]">
                {{ child.text }}
              </NuxtLink>

              <div v-if="child.children" class="ml-3 space-y-1">
                <NuxtLink
                  v-for="grandchild in child.children"
                  :key="grandchild.id"
                  :to="`#${grandchild.id}`"
                  class="block text-xs py-1.5 px-3 rounded-xl transition-all duration-200"
                  :class="[
                    activeId === grandchild.id
                      ? 'text-violet-600 dark:text-violet-400 bg-violet-500/10 font-bold translate-x-1'
                      : 'text-zinc-400 dark:text-zinc-600 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5',
                  ]">
                  {{ grandchild.text }}
                </NuxtLink>
              </div>
            </template>
          </div>
        </template>
      </nav>
    </div>
  </div>

  <div v-else class="w-full">
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3
          class="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
          <Icon name="heroicons:list-bullet" class="w-4 h-4" />
          Table Of Content
        </h3>
        <button
          class="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-full transition-colors"
          @click="emit('close')">
          <Icon name="heroicons:x-mark" class="w-5 h-5 text-zinc-500" />
        </button>
      </div>
      <div class="max-h-[60vh] overflow-y-auto pr-2">
        <nav class="space-y-1">
          <template v-for="link in props.links" :key="link.id">
            <NuxtLink
              :to="`#${link.id}`"
              class="block text-sm py-1.5 px-3 rounded-xl transition-all duration-200"
              :class="[
                activeId === link.id
                  ? 'text-violet-600 dark:text-violet-400 bg-violet-500/10 font-bold translate-x-1'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5',
              ]"
              @click="emit('close')">
              {{ link.text }}
            </NuxtLink>

            <div v-if="link.children" class="ml-3 space-y-1">
              <template v-for="child in link.children" :key="child.id">
                <NuxtLink
                  :to="`#${child.id}`"
                  class="block text-xs py-1.5 px-3 rounded-xl transition-all duration-200"
                  :class="[
                    activeId === child.id
                      ? 'text-violet-600 dark:text-violet-400 bg-violet-500/10 font-bold translate-x-1'
                      : 'text-zinc-500 dark:text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5',
                  ]"
                  @click="emit('close')">
                  {{ child.text }}
                </NuxtLink>

                <div v-if="child.children" class="ml-3 space-y-1">
                  <NuxtLink
                    v-for="grandchild in child.children"
                    :key="grandchild.id"
                    :to="`#${grandchild.id}`"
                    class="block text-xs py-1.5 px-3 rounded-xl transition-all duration-200"
                    :class="[
                      activeId === grandchild.id
                        ? 'text-violet-600 dark:text-violet-400 bg-violet-500/10 font-bold translate-x-1'
                        : 'text-zinc-400 dark:text-zinc-600 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/5',
                    ]"
                    @click="emit('close')">
                    {{ grandchild.text }}
                  </NuxtLink>
                </div>
              </template>
            </div>
          </template>
        </nav>
      </div>
    </div>
  </div>
</template>
