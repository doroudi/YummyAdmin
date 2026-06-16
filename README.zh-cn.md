# Yummy Admin - 美味管理员

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/24e54305-5d97-447e-adba-ed0a7c18513e/deploy-status)](https://app.netlify.com/sites/yummy-admin/deploys)
[![Static Badge](https://img.shields.io/badge/Fa-IR?style=flat&label=Lang)](https://github.com/doroudi/YummyAdmin/blob/main/README.fa-ir.md)
[![Static Badge](https://img.shields.io/badge/Zh-CN?style=flat&label=Lang&color=red)](https://github.com/doroudi/YummyAdmin/blob/main/README.zh-cn.md)
<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" height="20px"></a>

> #### Nuxt 版本
> 我决定将 YummyAdmin 迁移到 Nuxt，并使用 SSR 及其其他功能，同时继续在 Nuine 中进行开发。: https://github.com/doroudi/YummyAdmin.Nuxt
[![Preview](/docs/nuxt_version.webp "Preview")](https://github.com/doroudi/YummyAdmin.Nuxt)

基于 Naive UI 和 Tailwind CSS 的免费 Vue 管理面板。功能齐全，设计精美，完全支持 RTL 语言和多语言。
采用 Pinia、TypeScript、MockServiceWorker (MSW)、UnoCSS 和 WebSocket 等现代 Web 技术构建。

![Preview](/docs/banner-dark.png "Preview")

<p align='center'>
   <a href="https://yummy-admin.netlify.app?lang=zh">🌏 在线演示</a>
   <a href="https://yummy-admin.netlify.app?lang=zh&theme=dark">🌑 深色模式</a>
   <br>
   其他语言演示:<br />
   <a href="https://yummy-admin.netlify.app?lang=fa"> 波斯语</a> |
   <a href="https://yummy-admin.netlify.app?lang=en"> 英语</a>
</p>

![Preview](/docs/banner-light.png "Preview Light")

## 特征

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - 天生速度快
- 🛒 电子商务就绪版块（产品、类别、订单、客户）

- 🎭 支持 MockServiceWorker (MSW) 和 FakerJs 以获取类似生产环境的数据
- 🗂 基于文件的路由

- 📦 组件自动导入

- 🍍 [通过皮尼亚进行状态管理](https://pinia.vuejs.org/)

- 📑 布局系统

- 🌍 使用 I18n 的多语言支持

- ☁️ 部署在 Netlify 上，零配置

## 立即尝试

> Yummy Admin requires Node >=20.0

### 克隆到本地

```bash
npx degit https://github.com/doroudi/yummyadmin yummy-admin
cd yummy-admin
pnpm i
```

## 检查清单

使用此模板时，请务必按照清单正确更新您的信息。

- [ ] 更改作者姓名 `LICENSE`
- [ ] 更改标题 `locales/en.yaml`
- [ ] 更改主机名 `vite.config.ts`
- [ ] 更改网站图标 `public`
- [ ] 删除包含资金信息的 `.github` 文件夹
- [ ] 清理 README 文件并删除路由

尽情享受吧 :)

### 支持此项目

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>

### 开发

直接跑去看看吧 http://localhost:7000

```bash
pnpm dev
```

### 建设

要构建应用程序，请运行

```bash
pnpm build
```

您将在以下位置看到生成的文件： `dist`, 已准备好上菜.

### 部署到 Netlify

前往 [Netlify](https://app.netlify.com/start) 并选择你的克隆体, `OK` 路走来，你的应用很快就能上线了。.
