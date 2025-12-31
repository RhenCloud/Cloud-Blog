<script setup lang="ts">
import { computed } from "vue";

type AlertType = "question" | "info" | "warning" | "error";

interface Props {
  type?: AlertType;
  title?: string;
  icon?: string;
  color?: string;
  card?: boolean;
  flat?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  card: false,
  flat: false,
});

const typeConfig = {
  question: {
    bgLight: "bg-blue-500/10",
    bgDark: "bg-blue-500/20",
    borderColor: "border-blue-500/50",
    textColor: "text-blue-400",
    accentColor: "text-blue-300",
    icon: "mdi:help-circle",
  },
  info: {
    bgLight: "bg-cyan-500/10",
    bgDark: "bg-cyan-500/20",
    borderColor: "border-cyan-500/50",
    textColor: "text-cyan-400",
    accentColor: "text-cyan-300",
    icon: "mdi:information",
  },
  warning: {
    bgLight: "bg-amber-500/10",
    bgDark: "bg-amber-500/20",
    borderColor: "border-amber-500/50",
    textColor: "text-amber-400",
    accentColor: "text-amber-300",
    icon: "mdi:alert",
  },
  error: {
    bgLight: "bg-red-500/10",
    bgDark: "bg-red-500/20",
    borderColor: "border-red-500/50",
    textColor: "text-red-400",
    accentColor: "text-red-300",
    icon: "mdi:close-circle",
  },
};

const config = computed(() => typeConfig[props.type]);

const defaultTitles = {
  question: "问题",
  info: "提示",
  warning: "警告",
  error: "错误",
};

const displayTitle = computed(() => props.title || defaultTitles[props.type]);

const containerClasses = computed(() => {
  const base = "rounded-lg transition-all duration-200";
  const background = props.flat ? "bg-transparent" : config.value.bgLight;
  const border = `border ${config.value.borderColor}`;

  if (props.card) {
    return `${base} ${border} ${background} p-4 shadow-md hover:shadow-lg`;
  }

  return `${base} ${border} ${background} p-3`;
});

const iconName = computed(() => props.icon || config.value.icon);
</script>

<template>
  <div :class="containerClasses">
    <div class="flex gap-3">
      <!-- Icon -->
      <div class="shrink-0 w-5 h-5 mt-0.5">
        <Icon :name="iconName" :class="config.textColor" />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <!-- Title -->
        <div :class="[config.textColor, 'font-semibold text-sm mb-1']">
          <slot name="title">{{ displayTitle }}</slot>
        </div>

        <!-- Description -->
        <div class="text-sm text-white/85 leading-relaxed">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
