<script setup lang="ts">
import { computed, toRef } from "vue";
import type { RepoInfo } from "~/composables/useGithubRepo";

const props = defineProps<{ repo: string }>();

const { data, loaded } = useGithubRepo(toRef(props, "repo"), "github");

const repoData = computed<RepoInfo | null>(() => data.value);
const pending = computed(() => !loaded.value);
</script>

<template>
  <ClientOnly>
    <div
      v-if="!pending && repoData"
      class="github-card block rounded-xl p-3.5 md:p-4 bg-linear-to-b from-white/2 to-white/1 text-white/90 border border-white/4 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-180">
      <a
        :href="repoData.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex flex-col gap-0 no-underline hover:no-underline text-inherit cursor-pointer">
        <div class="flex-1">
          <div class="flex justify-between items-start gap-3">
            <div class="flex flex-col flex-1">
              <p class="inline-block no-underline text-inherit cursor-pointer group">
                <strong
                  class="text-sm font-semibold leading-tight group-hover:text-blue-400 transition-colors"
                  >{{ repoData.fullName }}</strong
                >
              </p>
            </div>
            <div class="flex gap-2 items-center">
              <span
                v-if="repoData.language"
                class="inline-block bg-white/3 bg-linear-to-r from-white/2 to-white/1 text-white/90 px-2 py-0.5 rounded-full text-xs"
                >{{ repoData.language }}</span
              >
              <span
                v-if="repoData.convertStars"
                class="inline-block bg-white/3 text-white/90 px-2 py-0.5 rounded-full text-xs"
                >★ {{ repoData.convertStars }}</span
              >
              <span
                v-if="repoData.convertForks"
                class="inline-block bg-white/3 text-white/90 px-2 py-0.5 rounded-full text-xs"
                >⑂ {{ repoData.convertForks }}</span
              >
            </div>
            <a
              :href="repoData.url"
              target="_blank"
              rel="noopener noreferrer"
              class="shrink-0 flex items-center justify-center p-1 no-underline hover:no-underline text-inherit cursor-pointer hover:opacity-100 transition-all duration-180">
              <svg
                class="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-180"
                viewBox="0 0 16 16"
                width="28"
                height="28"
                fill="currentColor">
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </a>
          </div>

          <div v-if="repoData.description" class="mt-2 text-white/85 text-sm line-clamp-3">
            {{ repoData.description }}
          </div>

          <div class="mt-2.5 text-xs text-white/60 flex gap-2.5">
            <span v-if="repoData.license?.name">{{ repoData.license.name }}</span>
            <span v-if="repoData.updatedAt"
              >· 更新于 {{ new Date(repoData.updatedAt).toLocaleDateString() }}</span
            >
          </div>
        </div>
      </a>
    </div>

    <div
      v-else-if="pending"
      class="block rounded-xl p-3.5 md:p-4 bg-linear-to-b from-white/2 to-white/1 text-center text-white/60 text-sm">
      加载 GitHub 仓库信息...
    </div>

    <div v-else class="block rounded-xl p-3.5 md:p-4 bg-white/1 text-center text-white/60 text-sm">
      无法获取仓库信息（{{ props.repo }}）。
    </div>
  </ClientOnly>
</template>

<style scoped>
:global(.prose .github-card a) {
  text-decoration: none !important;
}

:global(.prose .github-card a:hover) {
  text-decoration: none !important;
}
</style>
