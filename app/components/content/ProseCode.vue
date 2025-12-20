<script setup lang="ts">
defineProps({
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
</script>

<template>
  <div
    class="group relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
    <!-- 代码块头部 -->
    <div
      v-if="filename || language"
      class="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500/80"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500/80"></div>
        </div>
        <span v-if="filename" class="ml-2 text-xs font-mono text-zinc-400">{{ filename }}</span>
      </div>
      <span v-if="language" class="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{{
        language
      }}</span>
    </div>

    <!-- 代码内容 -->
    <div class="relative">
      <pre class="!m-0 !bg-transparent !p-4 overflow-x-auto custom-scrollbar"><slot /></pre>

      <!-- 复制按钮 (可选实现) -->
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          class="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors">
          <Icon name="heroicons:clipboard" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
