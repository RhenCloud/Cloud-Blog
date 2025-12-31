<script setup lang="ts">
import { computed, ref, onMounted } from "vue";

interface CodeblockMeta {
  icon?: string;
  wrap?: boolean;
  indent?: string | boolean;
  expand?: boolean;
  [meta: string]: string | boolean | undefined;
}

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: "text",
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
  class: {
    type: String,
    default: null,
  },
});

const meta = computed(() => {
  if (!props.meta) return {};

  return props.meta.split(" ").reduce((acc: CodeblockMeta, item) => {
    const [key, value] = item.split("=");
    acc[key!] = value ?? true;
    return acc;
  }, {});
});

const rows = computed(() => props.code.split("\n").length - 1);
const collapsible = computed(() => !meta.value.expand && rows.value > 20);
const [isCollapsed, toggleCollapsed] = useToggle(collapsible.value);

const isWrap = ref(meta.value.wrap ?? false);

const codeblock = useTemplateRef("codeblock");
const copied = ref(false);

async function copy() {
  if (!codeblock.value) return;
  try {
    const text = codeblock.value.textContent || "";
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    console.error("复制失败:", error);
  }
}

function getFileIcon(filename?: string): string | undefined {
  if (!filename) return undefined;

  const ext = filename.split(".").pop()?.toLowerCase();
  const iconMap: Record<string, string> = {
    json: "i-ph-file-json",
    ts: "i-ph-file-ts",
    js: "i-ph-file-js",
    vue: "i-ph-file-vue",
    py: "i-ph-file-py",
    sh: "i-ph-terminal-window-duotone",
    bash: "i-ph-terminal-window-duotone",
    yml: "i-ph-file-yaml",
    yaml: "i-ph-file-yaml",
    md: "i-ph-file-md",
    html: "i-ph-file-html",
    css: "i-ph-file-css",
    xml: "i-ph-file-xml",
  };

  return iconMap[ext!];
}

function getLangIcon(language?: string): string | undefined {
  if (!language) return undefined;

  const iconMap: Record<string, string> = {
    javascript: "i-ph-file-js",
    typescript: "i-ph-file-ts",
    python: "i-ph-file-py",
    json: "i-ph-file-json",
    bash: "i-ph-terminal-window-duotone",
    shell: "i-ph-terminal-window-duotone",
    sh: "i-ph-terminal-window-duotone",
    vue: "i-ph-file-vue",
    html: "i-ph-file-html",
    css: "i-ph-file-css",
    scss: "i-ph-file-css",
    yaml: "i-ph-file-yaml",
    yml: "i-ph-file-yaml",
    xml: "i-ph-file-xml",
    markdown: "i-ph-file-md",
    md: "i-ph-file-md",
  };

  return iconMap[language];
}

const icon = computed(() => {
  return meta.value.icon || getFileIcon(props.filename) || getLangIcon(props.language);
});

// 为每一行添加 data-line 属性并隐藏首尾空行
if (import.meta.client) {
  onMounted(() => {
    if (!codeblock.value) return;

    const lines = codeblock.value.querySelectorAll(".line");
    let firstNonEmptyIndex = -1;
    let lastNonEmptyIndex = -1;

    // 找到第一个和最后一个非空行
    lines.forEach((line, index) => {
      const text = (line.textContent || "").trim();
      if (text) {
        if (firstNonEmptyIndex === -1) firstNonEmptyIndex = index;
        lastNonEmptyIndex = index;
      }
    });

    // 隐藏首尾空行
    lines.forEach((line, index) => {
      // 设置行号
      if (!line.getAttribute("data-line")) {
        line.setAttribute("data-line", String(index + 1));
      }

      // 隐藏首尾空行
      if (index < firstNonEmptyIndex || index > lastNonEmptyIndex) {
        (line as HTMLElement).style.display = "none";
      }
    });
  });
}
</script>

<template>
  <figure
    class="group relative overflow-hidden my-4 rounded-lg bg-(--c-bg-2,#0f1419) text-sm leading-relaxed border border-(--c-border,#2a2e38)"
    :class="{
      'is-collapsed': collapsible && isCollapsed,
      'is-collapsible': collapsible,
    }"
    :style="{ '--tab-size': (meta.indent as string) || 4 }">
    <!-- 顶部标题栏 -->
    <figcaption
      class="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-2.5 bg-(--c-bg-2,#0f1419) border-b border-(--c-border,#2a2e38) backdrop-blur-sm">
      <div class="flex items-center gap-2.5 flex-1 min-w-0">
        <!-- 文件名 -->
        <span
          v-if="filename"
          class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-(--c-bg-3,#1a1f2e) text-xs font-mono text-(--c-text-1,#e8eaed) whitespace-nowrap border border-(--c-border,#2a2e38)">
          <Icon v-if="icon" :name="icon" class="w-3.5 h-3.5 shrink-0 opacity-80" />
          <span class="truncate font-semibold">{{ filename }}</span>
        </span>
        <!-- 语言标签 -->
        <span
          v-if="language"
          class="text-xs text-(--c-text-2,#a8adb8) font-mono font-medium tracking-wide">
          {{ language }}
        </span>
      </div>
      <!-- 操作按钮 -->
      <div class="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <button
          class="px-2.5 py-1.5 rounded-md text-xs font-mono bg-(--c-bg-3,#1a1f2e) hover:bg-(--c-border,#2a2e38) transition-colors text-(--c-text-2,#a8adb8) hover:text-(--c-text-1,#e8eaed) border border-transparent hover:border-(--c-border,#2a2e38)"
          title="切换代码换行"
          @click="isWrap = !isWrap">
          {{ isWrap ? "换行" : "滚动" }}
        </button>
        <button
          class="px-2.5 py-1.5 rounded-md text-xs font-mono bg-(--c-bg-3,#1a1f2e) hover:bg-(--c-border,#2a2e38) transition-colors text-(--c-text-2,#a8adb8) hover:text-(--c-text-1,#e8eaed) border border-transparent hover:border-(--c-border,#2a2e38)"
          title="复制代码"
          @click="copy()">
          {{ copied ? "✓ 已复制" : "复制" }}
        </button>
      </div>
    </figcaption>

    <!-- 代码块 -->
    <pre
      ref="codeblock"
      class="overflow-auto m-0 text-(--c-text-1,#e8eaed) shiki"
      :style="{
        paddingLeft: '1rem',
        paddingRight: '1rem',
        paddingTop: '0.3rem',
        paddingBottom: '0.3rem',
        // paddingBottom: collapsible ? '3rem' : '0.5rem',
        fontSize: '14px',
        tabSize: (meta.indent as string) || '4',
        lineHeight: '1.5',
      }"
      :class="[props.class, { 'whitespace-pre-wrap': isWrap }]">
      <slot />
    </pre>

    <!-- 折叠/展开按钮 -->
    <button
      v-if="collapsible"
      class="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg bg-(--c-bg-3,#1a1f2e) border border-(--c-border,#2a2e38) text-(--c-text-2,#a8adb8) hover:text-(--c-text-1,#e8eaed) hover:bg-(--c-border,#2a2e38) transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-mono font-medium"
      :aria-label="isCollapsed ? '展开代码块' : '折叠代码块'"
      @click="toggleCollapsed()">
      <Icon
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isCollapsed }"
        name="ph:caret-down-bold" />
      <span>{{ rows }} 行</span>
    </button>
  </figure>
</template>

<style scoped>
.is-collapsed {
  :deep(pre) {
    max-height: calc(1.5em * 20 + 3.5rem);
    overflow: hidden;
    position: relative;
  }

  :deep(pre::after) {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3.5rem;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(15, 20, 25, 0.3) 60%,
      var(--c-bg-2, #0f1419) 100%
    );
    pointer-events: none;
  }
}

:deep(.line) {
  position: relative;
  display: block;
  padding-left: 3.5rem;
}

:deep(.line::before) {
  content: attr(data-line);
  position: absolute;
  left: 0;
  width: 3rem;
  padding-right: 0.5rem;
  text-align: right;
  color: var(--c-text-3, #6c7280);
  user-select: none;
  font-size: 0.85em;
  font-family: "Fira Code", "Monaco", monospace;
  font-weight: 500;
  letter-spacing: 0.02em;
}

:deep(.line:empty) {
  display: none;
}

:deep(.line.highlight) {
  background-color: rgba(248, 113, 113, 0.08);
  border-left: 2px solid rgba(248, 113, 113, 0.3);
  margin-left: -3.5rem;
  padding-left: calc(3.5rem - 2px);
}

:deep(.line.highlight::before) {
  color: var(--c-text-2, #a8adb8);
  font-weight: 700;
}

:deep(code) {
  font-family: "Fira Code", "Monaco", monospace;
  font-size: 0.95em;
  letter-spacing: 0.01em;
  font-variant-ligatures: common-ligatures;
}
</style>
