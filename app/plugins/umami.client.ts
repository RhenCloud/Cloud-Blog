import { defineNuxtPlugin } from "#app";
import { VueUmamiPlugin } from "@jaseeey/vue-umami-plugin";
import type { Router } from "vue-router";
import siteConfig from "~/config";

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return;
  if (!siteConfig.umami?.enable) return;

  // 跳过在 localhost 环境下加载 Umami
  if (
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ) {
    console.log("Umami plugin skipped on localhost");
    return;
  }

  const router = nuxtApp.$router as Router | undefined;
  if (!router) return;

  nuxtApp.vueApp.use(
    VueUmamiPlugin({
      websiteID: siteConfig.umami.websiteId,
      scriptSrc: siteConfig.umami.scriptUrl,
      router,
    }),
  );
});
