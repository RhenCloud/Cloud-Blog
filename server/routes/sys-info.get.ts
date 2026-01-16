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
  } else if (process.env.EDGEONE) {
    platform = { name: "Tencent EdgeOne", icon: "simple-icons:tencentcloud" };
  } else if (process.env.ESA) {
    platform = { name: "Aliyun ESA", icon: "simple-icons:alibabacloud" };
  }

  const deps = pkg.dependencies as Record<string, string> | undefined;
  const devDeps = pkg.devDependencies as Record<string, string> | undefined;

  return {
    platform,
    versions: {
      vue: deps?.vue ?? devDeps?.vue,
      nuxt: nuxtVersion,
      content: deps?.["@nuxt/content"] ?? devDeps?.["@nuxt/content"],
      node: process.version,
      os: process.platform,
      arch: process.arch,
    },
  };
});
