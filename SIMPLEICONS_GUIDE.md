# 在 Markdown 中使用 Simple Icons 指南

## 概述

在这个 Nuxt Content 项目中，可以通过 `@nuxt/icon` 和 Iconify 集成在 Markdown 中使用 Simple Icons。

## 方法 1：直接在 Markdown 中使用图标代码（推荐）

在 Markdown 文本中，使用反引号包裹图标名称，Nuxt Content 会自动渲染为图标。

### 格式

```markdown
`simple-icons:图标名称` **文字**
```

### 常见图标例子

```markdown
`simple-icons:javascript` **JavaScript**
`simple-icons:typescript` **TypeScript**
`simple-icons:python` **Python**
`simple-icons:vuedotjs` **Vue.js**
`simple-icons:react` **React**
`simple-icons:nextdotjs` **Next.js**
`simple-icons:nuxtdotjs` **Nuxt.js**
`simple-icons:html5` **HTML**
`simple-icons:css3` **CSS**
`simple-icons:git` **Git**
`simple-icons:github` **GitHub**
`simple-icons:docker` **Docker**
`simple-icons:vercel` **Vercel**
`simple-icons:netlify` **Netlify**
`simple-icons:cloudflare` **Cloudflare**
`simple-icons:express` **Express**
`simple-icons:django` **Django**
`simple-icons:tailwindcss` **Tailwind CSS**
`simple-icons:markdown` **Markdown**
`simple-icons:nodejs` **Node.js**
```

## 方法 2：在 HTML 中使用 Icon 组件

如果你需要更灵活的控制，可以在 Markdown 中直接使用 HTML：

```html
<Icon name="simple-icons:javascript" size="1.5em" class="text-yellow-500" />
```

## 方法 3：在表格中使用图标

```markdown
| 技术 | 说明 |
|------|------|
| `simple-icons:javascript` JavaScript | 编程语言 |
| `simple-icons:vuedotjs` Vue.js | 前端框架 |
| `simple-icons:nuxtdotjs` Nuxt.js | 全栈框架 |
```

## 方法 4：在列表中使用图标

```markdown
- `simple-icons:github` **GitHub** - 版本控制
- `simple-icons:docker` **Docker** - 容器化
- `simple-icons:vercel` **Vercel** - 部署平台
```

## 查找可用的图标

Simple Icons 有很多可用的图标。查找图标的方式：

1. **访问官方网站**：https://simpleicons.org/
   - 搜索你需要的图标
   - 复制图标名称（通常是 slug 格式）

2. **通用命名规则**：
   - 图标名称通常是品牌名的小写版本
   - 使用 `.` 代替空格或特殊字符（如 `next.js` 变为 `nextdotjs`）
   - 使用 `+` 的地方也用 `plus`（如 `c++` 变为 `cplusplus`）

## 实际应用示例

### 在 about.md 中

```markdown
## 我的技能

### 前端技术
- `simple-icons:html5` **HTML5**
- `simple-icons:css3` **CSS3**
- `simple-icons:javascript` **JavaScript**
- `simple-icons:typescript` **TypeScript**
- `simple-icons:vuedotjs` **Vue.js**
- `simple-icons:react` **React**

### 框架
- `simple-icons:nuxtdotjs` **Nuxt.js**
- `simple-icons:nextdotjs` **Next.js**
- `simple-icons:tailwindcss` **Tailwind CSS**

### 工具
- `simple-icons:git` **Git**
- `simple-icons:github` **GitHub**
- `simple-icons:docker` **Docker**
- `simple-icons:vercel` **Vercel**
```

## 常见问题

### Q: 为什么图标没有显示？
A: 
- 检查图标名称是否正确（区分大小写）
- 确保使用了 `simple-icons:` 前缀
- 检查网络连接（Iconify 需要从 CDN 加载）

### Q: 如何自定义图标的大小和颜色？
A: 在 HTML 中使用完整的 Icon 组件：
```html
<Icon name="simple-icons:javascript" size="2em" class="text-yellow-400" />
```

### Q: 能在代码块中使用图标吗？
A: 是的，可以在代码块外使用，但代码块内的内容会被视为代码。

### Q: 有其他图标库可用吗？
A: 是的！Iconify 支持多个库：
- `fa-solid:` - Font Awesome Solid
- `mdi:` - Material Design Icons
- `heroicons:` - Heroicons
- 等等

## 更多资源

- Simple Icons 官网：https://simpleicons.org/
- Iconify 官网：https://iconify.design/
- Nuxt Icon 文档：https://www.npmjs.com/package/@nuxt/icon

---

现在你可以在 Markdown 中自由使用 Simple Icons 了！🚀
