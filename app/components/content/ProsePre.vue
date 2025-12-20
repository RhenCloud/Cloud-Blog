<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
});

const { copy, copied } = useClipboard({ source: props.code });
</script>

<template>
  <div
    class="group relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#282a36] shadow-2xl line-numbers">
    <!-- 代码块头部 -->
    <div
      v-if="filename || language"
      class="flex items-center justify-between px-4 py-2 bg-black/20 border-b border-white/5">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.2)]"></div>
          <div
            class="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.2)]"></div>
          <div class="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.2)]"></div>
        </div>
        <span v-if="filename" class="ml-2 text-xs font-mono text-zinc-400 truncate max-w-[200px]">{{
          filename
        }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span
          v-if="language"
          class="text-[10px] font-bold uppercase tracking-widest text-zinc-500"
          >{{ language }}</span
        >
        <!-- 复制按钮 -->
        <button
          class="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-all duration-200 active:scale-95"
          :class="{ 'text-emerald-400': copied }"
          @click="copy()">
          <Icon :name="copied ? 'heroicons:check' : 'heroicons:clipboard'" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- 代码内容 -->
    <div class="relative group/code">
      <pre
        class="!m-0 !bg-transparent !p-4 overflow-x-auto custom-scrollbar font-mono text-sm leading-relaxed selection:bg-violet-500/30"><slot /></pre>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
}

/* 行号实现 */
.line-numbers :deep(code) {
  counter-reset: step;
  counter-increment: step 0;
  display: grid;
  min-width: 100%;
}

.line-numbers :deep(.line) {
  display: inline-flex;
  min-height: 1.5rem;
}

.line-numbers :deep(.line::before) {
  content: counter(step);
  counter-increment: step;
  width: 2rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  color: rgba(255, 255, 255, 0.15);
  user-select: none;
  font-size: 0.75rem;
  flex-shrink: 0;
}

/* 高亮行样式 */
.line-numbers :deep(.line.highlight) {
  background-color: rgba(139, 92, 246, 0.1);
  margin: 0 -1rem;
  padding: 0 1rem;
  border-left: 2px solid #bd93f9;
  width: calc(100% + 2rem);
}
</style>
