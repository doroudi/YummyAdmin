
# YummyAdmin

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/24e54305-5d97-447e-adba-ed0a7c18513e/deploy-status)](https://app.netlify.com/sites/yummy-admin/deploys)

Vue 3 and Naive UI-based Admin Panel. almost complete, with supporting RTL, beautiful design, free, ready to use, and expandable for any other use cases

![Preview](/docs/banner.png "Preview")

> **Note**: 🚧 This Project is under active construction and not 100 percent ready.

<br>
<p align='center'>
   <a href="https://yummyadmin.netlify.app/">🌏 Live Demo</a>
</p>

<br>

> **Note**: This project build using [ViteSSE](https://github.com/antfu/vitesse/) template and uses [NaiveUI](https://github.com/tusen-ai/naive-ui) as Component Library.


## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness
- 🛒 eCommerce ready sections (products, category, orders, customers)

- 🔐 

- 🗂 [File based routing](./src/pages)

- 📦 [Components auto importing](./src/components)

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 📑 [Layout system](./src/layouts)

- 📲 [PWA](https://github.com/antfu/vite-plugin-pwa)

- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

- 🌍 [I18n ready](./locales)


- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)

- ☁️ Deploy on Netlify, zero-config

<br>




## Try it now!

> YummyAdmin requires Node >=18.18



### Clone to local

```bash
npx degit https://github.com/doroudi/yummyadmin my-yummy-admin
cd my-yummy-admin
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
pnpm dev:mock
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
