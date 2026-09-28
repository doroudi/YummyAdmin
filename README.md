<div align="center">

# Yummy Admin

**A free, batteries-included Vue 3 admin panel — beautiful by default, RTL-native, and multilingual.**

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/24e54305-5d97-447e-adba-ed0a7c18513e/deploy-status)](https://app.netlify.com/sites/yummy-admin/deploys)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-rolldown-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![Naive UI](https://img.shields.io/badge/Naive%20UI-2-63b3ed)](https://www.naiveui.com)
[![Apache ECharts](https://img.shields.io/badge/ECharts-6-aa344d?logo=apacheecharts&logoColor=white)](https://echarts.apache.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[English](./README.md) · [فارسی](./README.fa-ir.md) · [简体中文](./README.zh-cn.md)

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" height="20px" alt="Buy me a coffee"></a>

<img src="./docs/banner-dark.png" alt="Yummy Admin — dark mode" width="100%" />

<p>
  <a href="https://yummy-admin.netlify.app/"><b>🌏 Live Demo</b></a> &nbsp;·&nbsp;
  <a href="https://yummy-admin.netlify.app/?theme=dark"><b>🌑 Dark Mode</b></a> &nbsp;·&nbsp;
  <a href="https://yummy-admin.netlify.app/?lang=fa">Persian</a> ·
  <a href="https://yummy-admin.netlify.app/?lang=zh">Chinese</a>
</p>

<img src="./docs/banner-light.png" alt="Yummy Admin — light mode" width="100%" />

</div>

> [!NOTE]
> **Looking for the Nuxt version?** YummyAdmin has been migrated to Nuxt to take advantage of SSR and the rest of its feature set — development continues there.
> → **[github.com/doroudi/YummyAdmin.Nuxt](https://github.com/doroudi/YummyAdmin.Nuxt)**
>
> <a href="https://github.com/doroudi/YummyAdmin.Nuxt"><img src="./docs/nuxt_version.webp" alt="YummyAdmin.Nuxt" width="360" /></a>

## Table of contents

- [Yummy Admin](#yummy-admin)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Charts](#charts)
  - [Tech stack](#tech-stack)
  - [Getting started](#getting-started)
  - [Scripts](#scripts)
  - [Project structure](#project-structure)
  - [Theming \& tokens](#theming--tokens)
  - [Internationalization](#internationalization)
  - [Deployment](#deployment)
  - [Using this as a template](#using-this-as-a-template)
  - [Support](#support)
  - [License](#license)

## Overview

Yummy Admin is a production-shaped admin panel for e-commerce back offices: products, categories, brands, colors, orders, customers, invoices, reviews, comments, analytics and settings — all wired to a mockable API layer so the UI is fully explorable without a backend.

It ships with full **RTL** layout support, **three locales**, a runtime **theme colour picker**, dark/light modes, and a component gallery (forms, typography, charts) that doubles as living documentation.

## Features

**Framework & developer experience**

- ⚡️ **Vue 3.5 + Vite (rolldown) + TypeScript** — fast dev server and fast builds
- 🗂 **File-based routing** via `vite-plugin-pages`, with a Nuxt-style **layout system**
- 📦 **Auto-imports** for components, composables, stores and Vue APIs
- 🧩 **Vue Macros** (`defineOptions`, `defineSlots`, …) enabled out of the box
- 🎨 **UnoCSS** with attributify mode and the web-fonts preset
- 🧹 **Biome** for lint/format, enforced on commit through **Lefthook**

**UI & theming**

- 🖼 **[Naive UI](https://www.naiveui.com) 2** component library with runtime theme overrides
- 🌗 **Dark / light / follow-system** modes
- 🎨 **Runtime theme colour** — switching the accent repaints Naive UI *and* every chart
- ↔️ **Full RTL support**, not an afterthought: mirrored layout, RTL-aware Naive UI styles, and locale-aware chart legends (including ECharts canvases)

**Data & state**

- 🍍 **Pinia** with `pinia-plugin-persistedstate` for durable UI preferences
- 🎭 **[MSW](https://mswjs.io/) + Faker** — a production-like REST API with realistic latency in the browser, zero backend required
- 🔌 **Axios**-based service layer (`src/common/api`) with a typed `ApiService`
- 🔌 **WebSocket**-backed chat app

**E-commerce ready**

- 🛒 Products, categories, brands, colors, orders, customers, invoices, reviews and comments screens
- 📊 Dashboards for **E-commerce** and **Analytics** with KPI cards and sparklines
- 🧾 Data tables with filtering, sorting, pagination and bulk actions

## Charts

Charts are built on **[Apache ECharts 6](https://echarts.apache.org)** through the **[uipkge](https://uipkge.dev/vue/charts) chart registry** — a set of copy-paste, theme-token-driven ECharts wrappers.

**Why uipkge instead of`apexcharts`?**

|                       | ApexCharts (previous)                   | uipkge + ECharts (current)                             |
| --------------------- | --------------------------------------- | ------------------------------------------------------ |
| Distribution          | npm dependency, options-object API      | Registry source vendored into `src/`, yours to edit     |
| Extensibility         | Limited to Apex's option surface        | Full ECharts option escape hatch per chart              |
| Chart families        | ~20                                     | 66 — cartesian, circular, hierarchy, flow, distribution, maps |
| Theming               | CSS-var options per chart               | `--chart-1..5` tokens resolved at runtime               |
| Dark mode / accent    | Manual overrides                        | Automatic — one token change repaints every canvas      |

The primitives live in **`src/components/ui/charts/`** (see its [README](./src/components/ui/charts/README.md) for provenance and the substitutions applied for this project). The app-facing wrappers stay in `src/components/Charts/chart-components/`, so **page code was not affected by the migration**.

```vue
<script setup lang="ts">
const months: ChartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  series: [{ name: 'Revenue', data: [1200, 900, 1500] }],
}
</script>

<template>
  <!-- same props as before: data / colors / height / loading / legend-position -->
  <BarChart :data="months" :height="320" legend-position="right" />
</template>
```

Every wrapper accepts `ChartData` (`{ labels, series }`) or `SimpleChartSeries[]` (`{ name, value }[]`) and renders through `BaseChart`, which also owns the loading, error, empty and footer states. Need something the wrappers don't cover? Pass a raw ECharts option through the `options` prop, or drop to the vendored `RawChart`.

| Wrapper       | Renders                            |
| ------------- | ---------------------------------- |
| `<LineChart>` / `<AreaChart>` | Multi-series line / filled area |
| `<BarChart>`  | Vertical, grouped or stacked bars  |
| `<PieChart>` / `<DonutChart>` | Share-of-total, with centre KPI |
| `<PolarChart>`| Radial bar (polar coordinate bar)  |
| `<RadarChart>`| Spider chart with auto-computed axis maxima |
| `<Sparkline>` | Axis-less mini trend, used by `SummaryStatCard` and the revenue card |

> Charts render to `<canvas>` and resolve their colours from live CSS custom properties, so a theme or dark-mode switch repaints them without a re-mount.

## Tech stack

| Layer          | Choice                                                              |
| -------------- | ------------------------------------------------------------------- |
| Framework      | Vue 3.5 (`<script setup>`), TypeScript 5.9                          |
| Build          | Vite 7 (rolldown-vite)                                              |
| UI kit         | Naive UI 2 (+ runtime theme overrides)                              |
| Styling        | UnoCSS (preset-uno, attributify, icons, typography) + SCSS tokens   |
| Charts         | Apache ECharts 6 + vue-echarts 8, via vendored uipkge primitives    |
| State          | Pinia 3 + persisted state                                           |
| Routing        | `vite-plugin-pages` (file-based) + `vite-plugin-vue-layouts-next`   |
| i18n           | vue-i18n 9 (English, Persian, Chinese)                              |
| HTTP           | Axios service layer                                                 |
| Mocking        | MSW 2 + Faker                                                       |
| Lint / format  | Biome 2 (Lefthook pre-commit)                                       |
| Tests          | Vitest                                                              |

## Getting started

**Requirements**

- Node **>= 22.16**
- pnpm **>= 10.22** (`npm install -g pnpm`)

**Clone and run**

```bash
npx degit https://github.com/doroudi/yummyadmin yummy-admin
cd yummy-admin
pnpm install
pnpm dev          # → http://localhost:7000
```

`pnpm dev` runs in `development` mode. **[MSW](https://mswjs.io/)** boots in the browser on start-up and serves the whole REST surface with Faker-generated data and realistic latency, so **no backend is required** to explore the app. The env files only carry the API base URL:

```env
VITE_API_URL = /api/
VITE_BASE_URL = localhost:7000   # used for the chat WebSocket
```

To point the app at a real backend, drop the `initializeMocking()` call in `src/main.ts`.

## Scripts

| Command             | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `pnpm dev`          | Dev server with HMR on port 7000 (`development` mode)     |
| `pnpm dev:mock`     | Dev server in `mocking` mode — same app, mock-oriented env |
| `pnpm build`        | Production build to `dist/` (`mocking` mode)              |
| `pnpm check`        | Biome check **and** write fixes across `src`              |
| `pnpm lint`         | Biome lint with fixes                                     |
| `pnpm typecheck`    | `vue-tsc --noEmit`                                        |
| `pnpm test`         | Vitest (watch) — `pnpm test:unit` for a single run        |
| `pnpm up`           | Interactive dependency bump (`taze major -I`)             |

## Project structure

```
src/
├── common/          # API client, theme overrides, validators, helpers
├── components/      # auto-imported UI
│   ├── Charts/      #   chart wrappers + gallery demos
│   ├── Dashboard/   #   Ecommerce & Analytics dashboards
│   ├── ui/charts/   #   vendored uipkge ECharts primitives
│   └── shared/      #   Card, SummaryStatCard, filters, …
├── composables/     # useColors, useChartOptions, useFilter, …
├── layouts/         # default, auth, wide, error
├── locales/         # en.yml, fa.yml, zh.yml
├── mocks/           # MSW handlers + Faker fixtures
├── models/          # DTOs and view models
├── pages/           # file-based routes
├── services/        # API services (report, product, order, …)
├── store/           # Pinia stores
└── styles/          # SCSS tokens, fonts, overrides
```

## Theming & tokens

Global tokens live in `src/styles/main.scss`, and `src/App.vue` keeps them in sync with the theme picker:

```scss
:root {
  --primary-color: #00ad4c;
  --background: #eee;
  --main-content: #fff;

  /* Charts read these; App.vue rewrites --chart-1..5 on theme change. */
  --chart-1: #00ad4c;
  --chart-2: #008a3c;
  --muted-foreground: #6e6b7b;
}
```

Naive UI overrides sit in `src/common/theme/theme-overrides.ts`. Because `--chart-*` are plain CSS custom properties, the same accent change flows into Naive UI components **and** the ECharts canvases.

## Internationalization

Three locales ship out of the box — `en.yml`, `fa.yml`, `zh.yml` under `src/locales/`, loaded through `@intlify/unplugin-vue-i18n`.

Switching to Persian or Chinese sets `dir="rtl"`, applies RTL Naive UI style packs, and flips chart legend anchoring. Add a locale by dropping a new YAML file in `src/locales/` and registering it in `src/modules/i18n.ts`.

## Deployment

`pnpm build` emits a static SPA in `dist/`. A `netlify.toml` is included, so [Netlify](https://app.netlify.com/start) deploys it with zero configuration. A `Dockerfile` is provided for container hosting.

## Using this as a template

Working through the checklist keeps the fork clean:

- [ ] Change the author in [`LICENSE`](./LICENSE)
- [ ] Change the title in `src/locales/en.yml`
- [ ] Remove the `initializeMocking()` call in `src/main.ts` and replace `src/mocks/` with your API
- [ ] Point `VITE_API_URL` at your API in `.env*`
- [ ] Change the favicon in `public/`
- [ ] Remove the `.github` folder (funding info)
- [ ] Delete the routes and screens you don't need, then tidy these READMEs

Then enjoy :)

## Support

If this project saves you time, you can buy me a coffee — it genuinely helps:

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee"></a>

## License

[MIT](./LICENSE)
