---
title: "示例展示：展示本博客所有功能"
published: false
date: 2025-12-31
updatedDate: 2025-12-31
description: "一篇演示文档，展示站点可用的组件、标记和布局用法，方便检视和测试。"
image: https://img.rhen.cloud/file/Blog/1761401028478_PixPin_2025-10-03_15-44-52.png
alt: "示例展示"
tags: ["Demo", "Showcase", "Components"]
categories: ["Development"]
---

## 目录

- 前言
- 组件：Github 卡片
- 提示/警告（Warning）
- 告警框（Alert）
- 代码块与文件名
- 图片与媒体
- 列表与表格
- 结语

---

## 前言

这篇文章用于演示本博客的常用功能与组件。你可以把它当作一个活的测试页来检查组件渲染、样式和 Markdown 支持。

## 组件：Github 卡片

下面使用新增的 `GithubCard` 组件来渲染一个公开仓库的信息（服务器端获取 GitHub API）：

<GithubCard repo="RhenCloud/Cloud-Home" />

你也可以把它嵌入到任意文章中：`<GithubCard repo="owner/repo" />`。

## 告警框（Alert）

`Alert` 组件支持多种类型，可以用来展示不同类型的通知信息：

<Alert type="question" title="这是什么？">
这是一个问题类型的告警框，适合展示常见问题或疑问。
</Alert>

<Alert type="info" title="提示信息">
这是一个信息类型的告警框，适合展示一般性的提示或说明。
</Alert>

<Alert type="warning" title="警告消息" card>
这是一个警告类型的告警框，使用了 `card` 属性来增加视觉突出度。
</Alert>

<Alert type="error" title="错误提示" flat>
这是一个错误类型的告警框，使用了 `flat` 属性来展示扁平风格。
</Alert>

你也可以自定义图标和颜色：

<Alert type="info" icon="ph:files-duotone" color="var(--c-accent)" title="自定义样式">
这个 Alert 使用了自定义的图标和颜色。
</Alert>

## 代码块与文件名

支持带文件名的代码块

以及高亮语言：

```python [test.py]
def hello():
  print("Hello from showcase")

hello()
```

## 图片与媒体

普通图片插入：

![示例截图](https://img.rhen.cloud/file/Blog/1761401002178_PixPin_2025-10-03_15-29-07.png)

如果需要展示外部嵌入或本地图片，确保把资源放入 `public/` 或 `content/` 对应位置。

## 列表与表格

无序列表：

- 项目 A
- 项目 B
  - 子项 B1
- 项目 C

表格示例：

| 名称       | 描述          |
| ---------- | ------------- |
| GithubCard | 渲染仓库信息  |
| Warning    | 显示警告/提示 |
