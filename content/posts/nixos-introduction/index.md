---
title: "NixOS 种草指南"
published: true
date: 2026-04-21
updatedDate: 2026-04-21
description: "结合我的真实经历，聊聊为什么 NixOS 值得尝试。"
# image: https://img.rhen.cloud/file/Blog/1761401028478_PixPin_2025-10-03_15-44-52.png
# alt: "NixOS 种草指南"
tags: ["Linux", "NixOS"]
categories: ["Technology"]
---

如果你和我一样，经历过这些场景：

- 新机器重装后，环境要手动配半天。
- 某次升级后系统抽风，不知道是哪个包或配置导致的。
- 同一份 dotfiles 在不同机器上总会有“玄学偏差” ~~（在我的机器上能跑啊.jpg）~~
- 系统维护一段时间之后，完全忘了自己做过哪些更改，成为“黑箱”系统。

那么快来试试 NixOS 吧（

## Why NixOS?

NixOS 最核心的魅力，不是“包多”，而是这三件事：

1. **声明式配置**：你描述“我想要什么”，系统去构建“如何做到”。
2. **可复现**：同一份配置，在不同机器上尽量得到一致结果。
3. **可回滚**：每次系统切换都保留 generation，翻车可以一键回退。

在日常使用里，这些特性会直接转化为：

- 换机器时迁移成本非常低。
- 可以通过 `generations` 或是版本管理工具（如 `git`）回退系统状态。
- ~~妈妈再也不用担心我的系统爆炸啦。~~

## NixOS 的几个关键概念

### 1. Flakes：把依赖和入口规范化

Flakes 的作用很简单：

- 统一定义输入依赖（inputs）和输出（outputs）。
- 配合 `flake.lock` 锁定版本，提升复现性 ~~（虽然说对于我这种每天跑若干次 `sudo nix flake update` 的人来说没什么意义吧）~~

借助 Flakes 还能实现一些神奇的功能，包括但不限于：

- 同时使用多个版本的 Nixpkgs 中的包。
- 在项目目录中通过 `flake.nix` 定义当前项目的开发环境，并通过 `direnv` 自动激活。

### 2. NixOS Module + Home Manager：系统层和用户层分治

我的仓库里就是这种分层思路：

- `modules/nixos/*`：系统级配置（服务、内核、网络、桌面会话等）。
- `modules/home/*`：用户级配置（shell、编辑器、应用、主题、开发工具等）。

这个拆分的好处是：

- 系统策略和个人习惯解耦，便于同时管理日用配置和服务器配置。
- 目录结构清晰，后续维护更轻松。

### 3. generation 与回滚

NixOS 的每次切换都会生成一份可启动快照（generation）。

可以直接在 `grub` 中选择启动项，也可以用 `nixos-rebuild switch --rollback` 回滚到上一次。

如果改完配置，发现系统炸了，可以直接 rollback 回去。

相比文件系统快照，generation 更轻量。

## NixOS 的优缺点

### 优点

- 配置可追踪、可回滚、可复现。
- 新机迁移速度快，多机器部署简单。
- 对“折腾党”极其友好，试错成本低。

### 缺点

- 学习曲线陡，尤其是 Nix 语言表达方式 ~~（Nix 的报错信息真的不是给人看的）~~
- 某些小众场景仍需要额外适配。
- 相比 Arch Linux 的 AUR，Nixpkgs 的包生态还是不够丰富，偶尔还是需要自己打包。

如果你愿意接受前期投入，长期回报非常可观。

## 结语

NixOS 不一定适合所有人，但它非常适合：

- 希望完完全全掌控自己系统的人。
- 经常重装、换机、跨设备同步环境的人。

我的配置仓库会持续更新，欢迎参考或提 issue：

- <https://github.com/RhenCloud/NixOS-Config>

## 参考链接

- NixOS Wiki: <https://wiki.nixos.org>
- NixOS & Flakes Book: <https://nixos-and-flakes.thiscute.world/>
- 我的配置仓库：<https://github.com/RhenCloud/NixOS-Config>
