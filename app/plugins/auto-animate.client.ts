import { vAutoAnimate } from "@formkit/auto-animate/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("auto-animate", vAutoAnimate);
});
