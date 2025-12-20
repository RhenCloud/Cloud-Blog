// remember to fix this issue wint the tailwind/nuxt
// https://github.com/tailwindlabs/tailwindcss-intellisense/issues/663#issuecomment-1316788128

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,vue}",
    "./app/components/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/layouts/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        spacegrotesk: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
  layers: ["base", "components", "utilities"],
};
