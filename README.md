
# Yummy Admin

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/24e54305-5d97-447e-adba-ed0a7c18513e/deploy-status)](https://app.netlify.com/sites/yummy-admin/deploys)

Free Admin Panel based on the Vue3 and Naive UI. fairly completed with beautiful design,RTL support and multilingual, State management using Pinia, TypeScript, MockServiceWorker, Cypress and easily Customizable. 

![Preview](/docs/banner.png "Preview")


<p align='center'>
   <a href="https://yummy-admin.netlify.app/">🌏 Live Demo</a>
</p>

<br>

> **Note**: This project build using [ViteSSE](https://github.com/antfu/vitesse/) template and uses [NaiveUI](https://github.com/tusen-ai/naive-ui) as Component Library.

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness
- 🛒 eCommerce ready sections (products, category, orders, customers)

- 🎭 Supporting MockServiceWorker(MSW) and FakerJs to get production like data
- 🗂 File based routing

- 📦 Components auto importing

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 📑 Layout system

- 🌍 MultiLanguage support using I18n

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)

- ☁️ Deploy on Netlify, zero-config

<br>

## Try it now!

> YummyAdmin requires Node >=18.18
> 
### Clone to local

```bash
npx degit https://github.com/doroudi/yummyadmin yummy-admin
cd yummy-admin
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `locales/en.yaml`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in `public`
- [ ] Remove the `.github` folder which contains the funding info
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

### Development

Just run and visit http://localhost:7000

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

### Docker Production Build

First, build the vitesse image by opening the terminal in the project's root directory.

```bash
docker buildx build . -t yummyadmin:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 yummyadmin:latest
```
