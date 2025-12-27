// remember to fix this issue wint the tailwind/nuxt
// https://github.com/tailwindlabs/tailwindcss-intellisense/issues/663#issuecomment-1316788128

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,vue}",
    "./app/components/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/layouts/**/*.vue",
    "./content/**/*.{md,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // spacegrotesk: ["Space Grotesk", "sans-serif"],
        custom: ["Inter"],
        sans: [
          "Maple Mono CN",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        mono: ["Maple Mono CN", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  // layers: ["base", "components", "utilities"],
};
