const siteConfig = {
  siteMeta: {
    title: "RhenCloud's Blog",
    description:
      "Welcome To My Blog Site. Get Web Development, Javascript, Typescript, NodeJs, Vue, and Nuxt, Related Articles, Tips, Learning resources and more.",
    author: "RhenCloud",
    url: "https://blog.rhen.cloud",
  },

  hero: {
    title: "RhenCloud's Blog",
    description: "Your Solution Answer Exists And Only.",
  },

  profile: {
    avatar: "/avatar.webp",
    bio: "",
    email: "i@rhen.cloud",
    birthday: "2010-03-28",
  },

  socialLinks: [
    { name: "GitHub", url: "https://github.com/RhenCloud" },
    { name: "Email", url: "mailto:i@rhen.cloud" },
    { name: "Telegram", url: "https://t.me/RhenCloud" },
    { name: "Bilibili", url: "https://space.bilibili.com/1502883335" },
    { name: "Blog", url: "https://blog.rhen.cloud" },
  ],

  navbar: {
    links: [
      // { name: "Home", path: "/", icon: "fa6-solid:house" },
      { name: "Blogs", path: "/blogs", icon: "fa-solid:newspaper" },
      { name: "Categories", path: "/categories", icon: "fa-solid:folder" },
      { name: "Tags", path: "/tags", icon: "fa-solid:tags" },
      { name: "About", path: "/about", icon: "fa-solid:user" },
    ],
  },

  theme: {
    background: "/background.webp",
    backgroundMobile: "",
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

  umami: {
    enable: false,
    url: "https://cloud.umami.is/script.js",
    websiteId: "ddcd51c3-ccc7-45e4-81e6-11567027f69b",
    apiBase: "https://api.umami.is",
  },
};

export default siteConfig;
