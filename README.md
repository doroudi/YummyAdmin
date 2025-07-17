# Yummy Admin

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/24e54305-5d97-447e-adba-ed0a7c18513e/deploy-status)](https://app.netlify.com/sites/yummy-admin/deploys)
<a href="https://coff.ee/yummyui"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" height="20px"></a>



Free Vue AdminPanel based on Naive UI and Tailwind CSS. Fairly complete with a beautiful design, RTL, and multilingual support.
Built using modern web technologies like Pinia, TypeScript, MockServiceWorker (MSW), Cypress, Socket

![Preview](/docs/banner-dark.png "Preview")

<p align='center'>
   <a href="https://yummy-admin.netlify.app/">🌏 Live Demo</a>
   <a href="https://yummy-admin.netlify.app?theme=dark">🌑 Dark Mode</a>
   <br>
   Other languages <br />
   <a href="https://yummy-admin.netlify.app?lang=ch">🇨🇳 Chines</a> |
   <a href="https://yummy-admin.netlify.app?lang=fa">🇮🇷 Persian</a> |
   <a href="https://yummy-admin.netlify.app?lang=ar">🇸🇦 Arabic</a> |
   <a href="https://yummy-admin.netlify.app?lang=tr">🇹🇷 Turkish</a> |
   <a href="https://yummy-admin.netlify.app?lang=de">🇩🇪 Germany</a>
</p>

![Preview](/docs/banner-light.png "Preview Light")

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness
- 🛒 eCommerce-ready sections (products, categories, orders, customers)

- 🎭 Supporting MockServiceWorker(MSW) and FakerJs to get production-like data
- 🗂 File based routing

- 📦 Components auto-importing

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)

- 📑 Layout system

- 🌍 Multi-language support using I18n

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/) on [GitHub Actions](https://github.com/features/actions)

- ☁️ Deploy on Netlify, zero-config

## Try it now!

> Yummy Admin requires Node >=18.18

### Clone to local

```bash
npx degit https://github.com/doroudi/yummyadmin yummy-admin
cd yummy-admin
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try to follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `locales/en.yaml`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in `public`
- [ ] Remove the `.github` folder, which contains the funding info
- [ ] Clean up the READMEs and remove routes

And, enjoy :)


### Support this project

<a href="https://www.buymeacoffee.com/ericdolch"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>

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

And you will see the generated file in `dist`, which is ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

```bash
docker buildx build . -t yummyadmin:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 yummyadmin:latest
```

[![StandWithPalestine](https://raw.githubusercontent.com/Safouene1/support-palestine-banner/master/StandWithPalestine.svg)](https://techforpalestine.org/learn-more)
