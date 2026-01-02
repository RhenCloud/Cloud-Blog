// @keep-sorted
export default defineAppConfig({
  ui: {
    container: {
      base: "w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8",
    },
    prose: {
      // pre: {
      //   slots: {
      //     root: "relative my-4 group rounded-lg bg-(--c-bg-2,#0f1419)",
      //     header:
      //       "sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-2.5 bg-(--c-bg-2,#0f1419) border-b border-(--c-border,#2a2e38) backdrop-blur-sm",
      //     filename:
      //       "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-(--c-bg-3,#1a1f2e) text-xs font-mono text-(--c-text-1,#e8eaed) whitespace-nowrap border border-(--c-border,#2a2e38)",
      //     icon: "w-3.5 h-3.5 shrink-0 opacity-80",
      //     copy: "px-2.5 py-1.5 rounded-md text-xs font-mono bg-(--c-bg-3,#1a1f2e) hover:bg-(--c-border,#2a2e38) transition-colors text-(--c-text-2,#a8adb8) hover:text-(--c-text-1,#e8eaed) border border-transparent hover:border-(--c-border,#2a2e38)",
      //     base: "overflow-auto m-0 text-(--c-text-1,#e8eaed) shiki font-mono text-sm leading-relaxed",
      //   },
      // },
      codeIcon: {
        config: "i-lucide-settings",
      },
    },
  },
});
