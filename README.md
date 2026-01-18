# RhenCloud's Blog

一个基于 Nuxt 3 + Vue 3 + Tailwind CSS 构建的现代化技术博客平台。

[![Build and Deploy](https://github.com/RhenCloud/Cloud-Blog/actions/workflows/build.yml/badge.svg)](https://github.com/RhenCloud/Cloud-Blog/actions/workflows/build.yml)

![License](https://img.shields.io/badge/License-MIT-green)
![Node](https://img.shields.io/badge/Node-24.12.0-blue)
![Nuxt](https://img.shields.io/badge/Nuxt-4.2.2-brightgreen)
![Vue](https://img.shields.io/badge/Vue-3.5.26-brightgreen)

## ✨ 特性

- 🚀 **高性能** - 基于 Nuxt 4，支持 SSR/SSG
- 🎨 **现代化设计** - Tailwind CSS + 深色模式支持
- 📝 **内容管理** - 使用 Nuxt Content 管理 Markdown 文章
- 🔍 **搜索功能** - 集成 Fuse.js 实现模糊搜索
- 📱 **响应式设计** - 完美适配各种设备
- 🌐 **SEO 优化** - 完整的 meta 标签、sitemap、RSS 支持
- 💬 **评论系统** - 集成 Twikoo 评论服务
- 🎯 **分类/标签** - 灵活的文章分类与标签系统
- 📊 **统计分析** - 支持 Umami 分析
- 🎭 **主题切换** - 自动亮/暗色主题切换

## 📂 项目结构

```plaintext
.
├── app/                          # 应用根目录
│   ├── assets/                   # 静态资源
│   │   ├── css/                  # 样式文件
│   │   └── images/               # 图片资源
│   ├── components/               # Vue 组件
│   │   ├── archive/              # 归档相关组件
│   │   ├── posts/                 # 博客相关组件
│   │   ├── category/             # 分类相关组件
│   │   ├── content/              # 内容组件
│   │   └── main/                 # 主要组件
│   ├── config/                   # 配置文件
│   ├── data/                     # 数据文件
│   ├── layouts/                  # 布局组件
│   ├── pages/                    # 页面路由
│   │   ├── archive/              # 归档页面
│   │   ├── posts/                # 博客列表页面
│   │   ├── categories/           # 分类页面
│   │   ├── tags/                 # 标签页面
│   │   └── about.vue             # 关于页面
│   ├── plugins/                  # 插件
│   ├── types/                    # TypeScript 类型定义
│   ├── utils/                    # 工具函数
│   ├── app.config.ts             # 应用配置
│   ├── app.vue                   # 根组件
│   └── router.options.ts         # 路由配置
├── content/                      # 文章内容
│   ├── about.md                  # 关于页内容
│   └── posts/                    # 博客文章目录
├── public/                       # 公共资源
├── server/                       # 服务端代码
│   └── api/                      # API 路由
├── nuxt.config.ts                # Nuxt 配置
├── tailwind.config.js            # Tailwind 配置
├── tsconfig.json                 # TypeScript 配置
├── content.config.ts             # Content 配置
└── package.json                  # 依赖管理
```

## 🛠 技术栈

### 核心框架

- **Nuxt 4.2.2** - Vue 3 框架
- **Vue 3.5.26** - 前端框架
- **TypeScript 5.9.3** - 类型安全

### 样式与 UI

- **Tailwind CSS 4.1.18** - 原子化 CSS 框架
- **@tailwindcss/typography** - 排版样式
- **@tailwindcss/forms** - 表单样式
- **@nuxt/ui** - UI 组件库

### 内容与 SEO

- **@nuxt/content 3.8.2** - 内容管理
- **@nuxtjs/sitemap 7.5.0** - Sitemap 生成
- **nuxt-og-image 5.1.13** - OG 图片生成
- **fuse.js** - 模糊搜索

### 图标与字体

- **@nuxt/icon 2.1.1** - 图标库
- **@nuxt/fonts 0.12.1** - 字体管理
- **@iconify-json/** - Iconify 图标集

### 其他功能

- **@nuxt/image 2.0.0** - 图片优化
- **@nuxtjs/color-mode 4.0.0** - 暗黑模式
- **@vueuse/nuxt 14.1.0** - Vue Hooks 库
- **@formkit/auto-animate 0.9.0** - 自动动画
- **twikoo 1.6.44** - 评论系统
- **feed 5.1.0** - RSS 生成

## 🚀 快速开始

### 前置要求

- Node.js 24.12.0 或更高版本
- Bun（推荐）或 npm

### 安装依赖

```bash
# 使用 Bun（推荐）
bun install

# 或使用 npm
npm install
```

### 开发模式

```bash
bun dev
# 访问 http://localhost:3000
```

### 生产构建

```bash
# 构建应用
bun run build

# 预览构建结果
bun run preview
```

### 生成静态网站

```bash
bun run generate
```

## 📝 配置指南

### 站点配置

编辑 `app/config/index.ts` 自定义网站配置：

```typescript
const siteConfig = {
  siteMeta: {
    title: "你的博客标题",
    description: "你的博客描述",
    author: "你的名字",
    url: "https://你的域名",
    keywords: ["关键词 1", "关键词 2"],
    email: "你的邮箱",
    lang: "zh-CN",
    favicon: "/favicon.svg",
  },
  // ... 其他配置
};
```

### 评论系统

在 `app/config/index.ts` 配置 Twikoo：

```typescript
comment: {
  twikoo: {
    enable: true,
    envId: "你的 Twikoo 环境 ID",
  },
}
```

## 📄 文章格式

在 `content/blogs/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
description: "文章描述"
date: "2026-01-01"
image: "/blogs-img/example.jpg"
alt: "图片描述"
tags: ["标签 1", "标签 2"]
categories: ["分类 1"]
published: true
---

文章内容。..
```

### Front Matter 字段说明

| 字段          | 类型    | 说明                  |
| ------------- | ------- | --------------------- |
| `title`       | string  | 文章标题              |
| `description` | string  | 文章描述              |
| `date`        | string  | 发布日期 (YYYY-MM-DD) |
| `image`       | string  | 文章封面图            |
| `alt`         | string  | 图片描述              |
| `tags`        | array   | 文章标签              |
| `categories`  | array   | 文章分类              |
| `published`   | boolean | 是否发布              |

## 🎨 自定义样式

项目使用 Tailwind CSS，全局样式在 `app/assets/css/main.css` 中定义。

修改 `tailwind.config.js` 可自定义：

- 颜色方案
- 排版
- 间距
- 响应式断点
- 等等

## 📊 SEO 优化

项目内置完整的 SEO 优化：

- ✅ Meta 标签（title, description, keywords）
- ✅ hreflang 标签（多语言）
- ✅ Canonical 标签
- ✅ Sitemap 自动生成
- ✅ RSS 订阅源

## 🔧 常用命令

```bash
# 开发
bun dev              # 启动开发服务器
bun run build        # 构建生产版本
bun run preview      # 预览生产版本
bun run generate     # 生成静态网站

# 代码质量
bun run lint         # 检查代码
bun run lint:fix     # 修复代码问题
bun run format       # 检查代码格式
bun run format:fix   # 格式化代码
```

## 📱 浏览器支持

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 👤 作者

## RhenCloud

- GitHub: [@RhenCloud](https://github.com/RhenCloud)
- Email: <i@rhen.cloud>
- Website: [https://rhen.cloud](https://rhen.cloud)
- Telegram: [@RhenCloud](https://t.me/RhenCloud)
- Bilibili: [RhenCloud](https://space.bilibili.com/1502883335)
- X: [@RhenCloud75](https://x.com/RhenCloud75)

## 🔗 相关链接

- 博客地址：[https://blog.rhen.cloud](https://blog.rhen.cloud)
- Nuxt 文档：[https://nuxt.com](https://nuxt.com)
- Tailwind CSS: [https://tailwindcss.com](https://tailwindcss.com)
- Nuxt Content: [https://content.nuxt.com](https://content.nuxt.com)
- Twikoo 评论：[https://twikoo.js.org](https://twikoo.js.org)

## 📝 更新日志

### 2026-01-01

- ✨ 初始化项目
- ✅ 完整的 SEO 优化
- ✅ 搜索功能
- ✅ 深色模式支持
- ✅ 评论系统集成
- ✅ Sitemap 和 RSS 支持

---
