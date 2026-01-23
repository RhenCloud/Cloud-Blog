import { execSync } from "child_process";
import siteConfig from "./app/config";
import tailwindcss from "@tailwindcss/vite";

const envSha = process.env.BUILD_SHA || process.env.GITHUB_SHA || "";
const envShort = process.env.BUILD_SHORT || (envSha ? envSha.slice(0, 7) : "") || "";
const envMessage = process.env.BUILD_MESSAGE || "";
const envDate = process.env.BUILD_DATE || "";

const gitSha = execSync("git rev-parse HEAD").toString().trim();
const gitShort = gitSha.slice(0, 7);
const gitMessage = execSync("git log -1 --pretty=%B").toString().trim();
const gitDate = execSync("git log -1 --format=%cd").toString().trim();

const gitBuild = {
  sha: gitSha,
  envSha,
  short: gitShort,
  envShort,
  message: gitMessage,
  envMessage,
  date: gitDate,
  envDate,
};

export default defineNuxtConfig({
  compatibilityDate: "2025-12-20",
  srcDir: "app/",
  css: ["./app/assets/css/main.css"],

  site: {
    url: siteConfig.siteMeta.url,
    name: siteConfig.siteMeta.title,
    description: siteConfig.siteMeta.description,
    author: siteConfig.siteMeta.author,
  },

  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    // removed @nuxtjs/supabase (using custom pg auth and APIs)
    "@nuxtjs/robots",
    // "@nuxtjs/seo",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@nuxt/ui",
    "@formkit/auto-animate",
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
        { name: "theme-color", content: siteConfig.theme?.color },
        { name: "description", content: siteConfig.siteMeta.description },
        { name: "keywords", content: siteConfig.siteMeta.keywords?.join(",") },
      ],
      link: [
        { rel: "icon", href: siteConfig.siteMeta.favicon, type: "image/svg+xml" },
        { rel: "canonical", href: siteConfig.siteMeta.url },
        { rel: "alternate", hreflang: siteConfig.siteMeta.lang, href: siteConfig.siteMeta.url },
        { rel: "dns-prefetch", href: siteConfig.siteMeta.url },
        { rel: "preconnect", href: siteConfig.siteMeta.url },
        { rel: "stylesheet", href: "/fonts/521/main/result.css" },
      ],
    },
    pageTransition: { name: "page", mode: "in-out" },
    layoutTransition: { name: "layout", mode: "in-out" },
  },

  robots: { groups: [{ userAgent: ["GPTBot", "ChatGPT-User"], disallow: ["/"] }] },

  sitemap: {
    sitemapsPathPrefix: "/",
    autoLastmod: true,
    zeroRuntime: true,
    sitemaps: {
      posts: {
        sources: ["/api/__sitemap__/urls"],
        include: ["/posts/**"],
      },
      tags: {
        sources: ["/api/__sitemap__/urls"],
        include: ["/tags/**"],
      },
      categories: {
        sources: ["/api/__sitemap__/urls"],
        include: ["/categories/**"],
      },
      pages: {
        sources: ["/api/__sitemap__/urls"],
        include: ["/", "/about", "/archive", "/tags", "/categories"],
      },
    },
  },

  typescript: {
    strict: true,
  },

  runtimeConfig: {
    public: {
      build: gitBuild,
    },
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
      ignore: ["/404"],
    },
    minify: true,
  },

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
          theme: "github-dark",
          langs: ["bash", "c", "python"],
        },
        remarkPlugins: {
          "remark-gfm": {},
          "remark-rehype": {},
        },
      },
    },
  },

  experimental: {
    buildCache: true,
  },
});
