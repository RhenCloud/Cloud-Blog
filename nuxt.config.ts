import siteConfig from "./app/config";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-20",
  srcDir: "app",
  css: ["./app/assets/css/main.css"],

  components: [
    {
      path: "~/components/content",
      extensions: ["vue"],
      prefix: "",
    },
    {
      path: "~/components",
      extensions: ["vue"],
    },
  ],

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    // "@nuxtjs/tailwindcss",
    "@formkit/auto-animate",
    "@nuxt/ui",
    // '@stefanobartoletti/nuxt-social-share',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      charset: "utf-16",
      viewport: "width=device-width,initial-scale=1",
      title: siteConfig.siteMeta.title,
      titleTemplate: `%s - ${siteConfig.siteMeta.title}`,
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },

  sitemap: {
    sources: [siteConfig.siteMeta.url],
  },

  site: {
    url: siteConfig.siteMeta.url,
    name: siteConfig.siteMeta.title,
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
      routes: ["/", "/rss.xml"],
    },
  },

  // fonts: {},

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  content: {
    experimental: { nativeSqlite: true },
    build: {
      markdown: {
        toc: {
          depth: 4,
        },
        highlight: {
          theme: {
            default: "github-light",
            dark: "github-dark",
            light: "github-light",
          },
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
