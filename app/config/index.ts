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
  },

  hero: {
    title: "RhenCloud's Blog",
    description: "Your Solution Answer Exists And Only.",
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
    enable: false,
    url: "https://cloud.umami.is/script.js",
    websiteId: "ddcd51c3-ccc7-45e4-81e6-11567027f69b",
    apiBase: "https://api.umami.is",
  },
};

export default siteConfig;
