import { version as nuxtVersion } from "nuxt/package.json";
import pkg from "~~/package.json";

export default defineEventHandler(async () => {
  let platform = { name: "Local", icon: "heroicons:computer-desktop" };

  if (process.env.VERCEL) {
    platform = { name: "Vercel", icon: "simple-icons:vercel" };
  } else if (process.env.NETLIFY) {
    platform = { name: "Netlify", icon: "simple-icons:netlify" };
  } else if (process.env.CF_PAGES) {
    platform = { name: "Cloudflare", icon: "simple-icons:cloudflare" };
  } else if (process.env.GITHUB_ACTIONS) {
    platform = { name: "GitHub Actions", icon: "simple-icons:githubactions" };
  } else if (process.env.EDGEONE) {
    platform = { name: "Tencent EdgeOne", icon: "simple-icons:tencentcloud" };
  }

  return {
    platform,
    versions: {
      vue: pkg.devDependencies.vue,
      nuxt: nuxtVersion,
      content: pkg.devDependencies["@nuxt/content"],
      node: process.version,
      os: process.platform,
      arch: process.arch,
    },
  };
});
