import siteConfig from "./app/config";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-20",
  srcDir: "app",
  css: ["./app/assets/css/main.css"],

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/seo",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    // "@nuxtjs/tailwindcss",
    "@formkit/auto-animate",
    "@nuxt/ui",
    // '@stefanobartoletti/nuxt-social-share',
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       vendor: ["vue", "vue-router", "@nuxt/content"],
      //       ui: ["@nuxt/ui", "@nuxt/icon"],
      //       utils: ["fuse.js"],
      //     },
      //   },
      // },
    },
    // ssr: {
    //   external: ["node:url", "node:fs/promises"],
    //   noExternal: ["@nuxt/ui", "@nuxt/kit"],
    // },
    // optimizeDeps: {
    //   exclude: ["@nuxt/kit", "@nuxt/ui"],
    // },
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width,initial-scale=1,maximum-scale=5",
      title: siteConfig.siteMeta.title,
      titleTemplate: `%s - ${siteConfig.siteMeta.title}`,
      meta: [
        { name: "author", content: siteConfig.siteMeta.author },
        { name: "language", content: "zh-CN" },
        { name: "theme-color", content: siteConfig.theme.color },
      ],
      link: [
        { rel: "canonical", href: siteConfig.siteMeta.url },
        { rel: "alternate", hreflang: "zh-CN", href: siteConfig.siteMeta.url },
        { rel: "dns-prefetch", href: siteConfig.siteMeta.url },
        { rel: "preconnect", href: siteConfig.siteMeta.url },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  robots: { groups: [{ userAgent: ["GPTBot", "ChatGPT-User"], disallow: ["/"] }] },

  site: {
    url: siteConfig.siteMeta.url,
    name: siteConfig.siteMeta.title,
    description: siteConfig.siteMeta.description,
    author: siteConfig.siteMeta.author,
  },

  typescript: {
    strict: true,
  },

  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/rss.xml", "/sitemap.xml"],
      ignore: ["/404"],
    },
    minify: true,
  },

  // fonts: {},

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  // build: {
  //   transpile: ["@nuxt/ui"],
  // },

  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        toc: {
          depth: 4,
        },
        highlight: {
          theme: "github-dark",
          langs: ["bash", "c", "python"],
        },
        remarkPlugins: {
          "remark-gfm": {},
          "remark-rehype": {},
        },
        // rehypePlugins: {
        //   "rehype-prism": {},
        // },
      },
    },
  },
});
