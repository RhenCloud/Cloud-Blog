import type { SiteConfig } from "~/types/nav";

const siteConfig: SiteConfig = {
  siteMeta: {
    title: "RhenCloud's Blog",
    description: "一个普普通通的技术博客，分享技术，记录日常，传递一些有趣的想法。",
    keywords: ["Technology", "Blog", "Development", "Programming"],
    author: "RhenCloud",
    url: "https://blog.rhen.cloud",
    email: "i@rhen.cloud",
    lang: "zh-CN",
    favicon: "/favicon.svg",
    startTime: "2025-10-01",
    // GitHub repository URL (used for commit links in the footer)
    repo: "https://github.com/RhenCloud/Cloud-Blog",
  },

  hero: {
    title: "RhenCloud's Blog",
    description: ["Your Solution Answer Exists And Only.", "趁世界还未重启之前 约一次爱恋"],
    typed: {
      enable: true,
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
      backDelay: 2000,
    },
  },

  profile: {
    avatar: "/avatar.webp",
    birthday: "2010-03-28",
  },

  socialLinks: [
    { name: "GitHub", url: "https://github.com/RhenCloud" },
    { name: "Email", url: "mailto:i@rhen.cloud" },
    { name: "Telegram", url: "https://t.me/RhenCloud" },
    { name: "Bilibili", url: "https://space.bilibili.com/1502883335" },
    { name: "X", url: "https://x.com/RhenCloud75" },
  ],

  navbar: {
    links: [
      // { name: "Home", path: "/", icon: "fa6-solid:house" },
      { name: "归档", path: "/archive", icon: "fa-solid:newspaper" },
      {
        name: "分类",
        path: "/categories",
        icon: "fa-solid:folder",
        // children: [
        //   { name: "前端", path: "/categories/frontend", icon: "fa-solid:code" },
        //   { name: "后端", path: "/categories/backend", icon: "fa-solid:server" },
        // ],
      },
      { name: "标签", path: "/tags", icon: "fa-solid:tags" },
      { name: "关于", path: "/about", icon: "fa-solid:user" },
    ],
  },

  lines: [
    { name: "EdgeOne", url: "https://blog.rhen.cloud", ping: true },
    { name: "Vercel", url: "https://blog.rhencloud.dev", ping: true },
    { name: "Dev", url: "http://localhost:3000", ping: false },
  ],

  theme: {
    background: "/background.webp",
    backgroundMobile: "https://www.loliapi.com/acg/pe",
    color: "#bd83f3",
  },

  footer: {
    beian: "津ICP备2025039003号-2",
    beianLink: "https://beian.miit.gov.cn/",
    customHtml: "",
    hitokoto: {
      enable: true,
      type: "a&b&c&d&j",
    },
  },

  traceConfig: {
    enable: true,
    script: `<script charset="UTF-8" id="MXA_COLLECT" src="//mxana.tacool.com/sdk.js"></script>
<script>MXA.init({ id: "c2-G6ouenNf" })</script>`,
  },

  comment: {
    twikoo: {
      enable: true,
      envId: "https://twikoo.rhen.cloud",
    },
  },

  ad: {
    enable: true,
    ads: [
      {
        body: '<p><span class="inline-flex items-center gap-2">本网站由 <img src="/ads/upyun.png" class="h-7 w-auto" alt="Upyun" /> 提供云存储服务</span></p>',
        link: "https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral",
      },
    ],
  },
};
export default siteConfig;
