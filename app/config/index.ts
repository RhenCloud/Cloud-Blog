const siteConfig = {
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
      { name: "Archive", path: "/archive", icon: "fa-solid:newspaper" },
      { name: "Categories", path: "/categories", icon: "fa-solid:folder" },
      { name: "Tags", path: "/tags", icon: "fa-solid:tags" },
      { name: "About", path: "/about", icon: "fa-solid:user" },
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
    beian: "津ICP备2025039003号-1",
    beianLink: "https://beian.miit.gov.cn/",
    customHtml: '<span style="opacity:.8">© 2025 <a href="https://rhen.cloud">RhenCloud</a></span>',
    hitokoto: {
      enable: true,
      type: "a&b&c&d&j",
    },
  },

  comment: {
    twikoo: {
      enable: true,
      envId: "https://twikoo.rhen.cloud",
    },
  },

  umami: {
    enable: true,
    scriptUrl: "https://cloud.umami.is/script.js",
    apiKey: "api_MGcpRPYMcBmTKZOKdUVpr7mlBoWkck5g",
    websiteId: "b33dfd14-7e62-498b-a199-de0ac38a1d44",
    apiEndpoint: "https://api.umami.is",
  },
};

export default siteConfig;
