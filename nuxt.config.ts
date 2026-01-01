import siteConfig from "./app/config";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-20",
  srcDir: "app",
  css: ["./app/assets/css/main.css"],

  site: {
    // url: siteConfig.siteMeta.url,
    url: "https://blog.rhen.cloud",
    // name: siteConfig.siteMeta.title,
    name: "RhenCloud's Blog",
    description: siteConfig.siteMeta.description,
    author: siteConfig.siteMeta.author,
  },

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
    },
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

  // robots: { groups: [{ userAgent: ["GPTBot", "ChatGPT-User"], disallow: ["/"] }] },

  sitemap: {
    sitemapsPathPrefix: "/",
    zeroRuntime: true,
    sitemaps: {
      posts: {
        include: ["/blog/**"],
      },
    },
    autoLastmod: true,
    // sources: ["/api/sitemap"],
    // sources: ["/api/__sitemap__/urls"],
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
      routes: ["/", "/sitemap.xml"],
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
