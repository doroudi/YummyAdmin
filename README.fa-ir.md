<div align="center">

# Yummy Admin — ادمین پنل یامی

**یک پنل مدیریت Vue 3 رایگان و کامل — زیبا به‌صورت پیش‌فرض، با پشتیبانی بومی از راست‌به‌چپ و چندزبانه.**

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/24e54305-5d97-447e-adba-ed0a7c18513e/deploy-status)](https://app.netlify.com/sites/yummy-admin/deploys)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org)
[![Vite](https://img.shields.io/badge/Vite-rolldown-646cff?logo=vite&logoColor=white)](https://vite.dev)
[![Naive UI](https://img.shields.io/badge/Naive%20UI-2-63b3ed)](https://www.naiveui.com)
[![Apache ECharts](https://img.shields.io/badge/ECharts-6-aa344d?logo=apacheecharts&logoColor=white)](https://echarts.apache.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[English](./README.md) · [فارسی](./README.fa-ir.md) · [简体中文](./README.zh-cn.md)

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" height="20px" alt="Buy me a coffee"></a>

<img src="./docs/banner-dark.png" alt="Yummy Admin — حالت تاریک" width="100%" />

<p>
  <a href="https://yummy-admin.netlify.app/?lang=fa"><b>🌏 دموی زنده</b></a> &nbsp;·&nbsp;
  <a href="https://yummy-admin.netlify.app/?lang=fa&theme=dark"><b>🌑 حالت تاریک</b></a> &nbsp;·&nbsp;
  <a href="https://yummy-admin.netlify.app/?lang=en">انگلیسی</a> ·
  <a href="https://yummy-admin.netlify.app/?lang=zh">چینی</a>
</p>

<img src="./docs/banner-light.png" alt="Yummy Admin — حالت روشن" width="100%" />

</div>

<div dir="rtl">

> **به دنبال نسخه Nuxt هستید؟** پروژه YummyAdmin به Nuxt منتقل شده تا از SSR و سایر امکانات آن استفاده کند و توسعه در همان‌جا ادامه دارد.
> → **[github.com/doroudi/YummyAdmin.Nuxt](https://github.com/doroudi/YummyAdmin.Nuxt)**
>
> <a href="https://github.com/doroudi/YummyAdmin.Nuxt"><img src="./docs/nuxt_version.webp" alt="YummyAdmin.Nuxt" width="360" /></a>

## فهرست مطالب

- [معرفی](#معرفی)
- [امکانات](#امکانات)
- [نمودارها](#نمودارها)
- [پشته فناوری](#پشته-فناوری)
- [شروع به کار](#شروع-به-کار)
- [اسکریپت‌ها](#اسکریپتها)
- [ساختار پروژه](#ساختار-پروژه)
- [تم و توکن‌ها](#تم-و-توکنها)
- [چندزبانگی](#چندزبانگی)
- [انتشار](#انتشار)
- [استفاده به عنوان قالب](#استفاده-به-عنوان-قالب)
- [حمایت از پروژه](#حمایت-از-پروژه)
- [مجوز](#مجوز)

## معرفی

Yummy Admin یک پنل مدیریت آماده برای پشتیبان‌های فروشگاهی است: محصولات، دسته‌بندی‌ها، برندها، رنگ‌ها، سفارش‌ها، مشتریان، فاکتورها، نظرات، کامنت‌ها، آنالیتیکس و تنظیمات — همه متصل به یک لایه API ماک‌شده، بنابراین بدون نیاز به بک‌اند می‌توانید کل رابط کاربری را بررسی کنید.

چیدمان کامل **راست‌به‌چپ**، **سه زبان**، **انتخاب رنگ تم در زمان اجرا**، حالت تاریک/روشن و یک گالری کامپوننت (فرم‌ها، تایپوگرافی، نمودارها) که به‌عنوان مستندات زنده کار می‌کند، در این پروژه گنجانده شده است.

## امکانات

**فریم‌ورک و تجربه توسعه**

- ⚡️ **Vue 3.5 + Vite (rolldown) + TypeScript** — سرور توسعه سریع و بیلد سریع
- 🗂 **مسیریابی مبتنی بر فایل** با `vite-plugin-pages` و **سیستم Layout** به سبک Nuxt
- 📦 **ایمپورت خودکار** کامپوننت‌ها، کامپوزابل‌ها، استورها و APIهای Vue
- 🧩 **Vue Macros** (`defineOptions`, `defineSlots`, …) فعال به‌صورت پیش‌فرض
- 🎨 **UnoCSS** با حالت attributify و پریست فونت‌های وب
- 🧹 **Biome** برای لینت و فرمت، به‌همراه **Lefthook** روی هر کامیت

**رابط کاربری و تم**

- 🖼 کتابخانه کامپوننت **[Naive UI](https://www.naiveui.com) 2** با بازنویسی تم در زمان اجرا
- 🌗 حالت‌های **تاریک / روشن / پیروی از سیستم**
- 🎨 **رنگ تم در زمان اجرا** — تغییر رنگ اصلی هم Naive UI و هم تمام نمودارها را دوباره رسم می‌کند
- ↔️ **پشتیبانی کامل RTL** — چیدمان آینه‌ای، استایل‌های RTL نِیو‌یو‌آی و جای‌گذاری افسانه (legend) نمودارها بر اساس زبان، حتی روی بوم‌های ECharts

**داده و مدیریت وضعیت**

- 🍍 **Pinia** به‌همراه `pinia-plugin-persistedstate` برای نگه‌داشتن تنظیمات رابط کاربری
- 🎭 **[MSW](https://mswjs.io/) + Faker** — یک API واقع‌نما با تأخیر طبیعی، کاملاً در مرورگر و بدون بک‌اند
- 🔌 لایه سرویس مبتنی بر **Axios** (`src/common/api`) با `ApiService` تایپ‌شده
- 🔌 اپلیکیشن چت بر پایه **WebSocket**

**آماده برای فروشگاه**

- 🛒 صفحات محصولات، دسته‌بندی‌ها، برندها، رنگ‌ها، سفارش‌ها، مشتریان، فاکتورها، نظرات و کامنت‌ها
- 📊 داشبوردهای **فروشگاهی** و **آنالیتیکس** با کارت‌های KPI و اسپارک‌لاین
- 🧾 جدول‌های داده با فیلتر، مرتب‌سازی، صفحه‌بندی و عملیات گروهی

## نمودارها

نمودارها بر پایه **[Apache ECharts 6](https://echarts.apache.org)** و از طریق رجیستری **[uipkge](https://uipkge.dev/vue/charts)** ساخته شده‌اند — مجموعه‌ای از رَپرهای ECharts که سورس آن‌ها در پروژه کپی می‌شود و با توکن‌های تم کار می‌کنند.

**چرا uipkge به‌جای `apexcharts`؟**

|                        | ApexCharts (قبلی)                        | uipkge + ECharts (فعلی)                                 |
| ---------------------- | ---------------------------------------- | ------------------------------------------------------- |
| نحوه توزیع             | وابستگی npm با API مبتنی بر آبجکت تنظیمات | سورس رجیستری داخل `src/`، متعلق به خودتان و قابل ویرایش |
| توسعه‌پذیری            | محدود به سطح تنظیمات Apex                | دسترسی کامل به تمام گزینه‌های ECharts در هر نمودار      |
| تعداد خانواده نمودارها | حدود ۲۰                                   | ۶۶ — کارتزین، دایره‌ای، سلسله‌مراتبی، جریان، توزیع، نقشه |
| تم‌دهی                 | تنظیم CSS-var برای هر نمودار             | توکن‌های `--chart-1..5` که در زمان اجرا خوانده می‌شوند |
| حالت تاریک و رنگ تم    | بازنویسی دستی                            | خودکار — تغییر یک توکن، همه بوم‌ها را دوباره رسم می‌کند |

نسخه اصلی کامپوننت‌ها در **`src/components/ui/charts/`** قرار دارد (فایل [README](./src/components/ui/charts/README.md) این پوشه منبع و تغییرات اعمال‌شده برای این پروژه را توضیح می‌دهد). رَپرهای سطح اپلیکیشن همان‌جا در `src/components/Charts/chart-components/` باقی مانده‌اند، بنابراین **کد صفحات تحت تأثیر این مهاجرت قرار نگرفته است**.

```vue
<script setup lang="ts">
const months: ChartData = {
  labels: ['Jan', 'Feb', 'Mar'],
  series: [{ name: 'Revenue', data: [1200, 900, 1500] }],
}
</script>

<template>
  <!-- همان پراپ‌های قبلی: data / colors / height / loading / legend-position -->
  <BarChart :data="months" :height="320" legend-position="right" />
</template>
```

هر رَپر هم `ChartData` (`{ labels, series }`) و هم `SimpleChartSeries[]` (`{ name, value }[]`) را می‌پذیرد و از طریق `BaseChart` رندر می‌شود؛ `BaseChart` مسئول حالت‌های بارگذاری، خطا، خالی و فوتر است. اگر چیزی فراتر از رَپرها لازم داشتید، می‌توانید یک آبجکت تنظیمات خام ECharts را با پراپ `options` بفرستید یا مستقیماً از `RawChart` استفاده کنید.

| رَپر            | خروجی                                        |
| --------------- | -------------------------------------------- |
| `<LineChart>` / `<AreaChart>` | خطی چندسری / ناحیه‌ای پرشده    |
| `<BarChart>`    | میله‌ای عمودی، گروهی یا انباشته               |
| `<PieChart>` / `<DonutChart>` | سهم‌از‌کل، با نمایش عدد کل در مرکز |
| `<PolarChart>`  | میله‌ای شعاعی (مختصات قطبی)                   |
| `<RadarChart>`  | نمودار عنکبوتی با محاسبه خودکار بیشینه محورها |
| `<Sparkline>`   | روند کوچک بدون محور، استفاده‌شده در `SummaryStatCard` و کارت درآمد |

> نمودارها روی `<canvas>` رسم می‌شوند و رنگ‌های خود را از متغیرهای CSS زنده می‌خوانند؛ بنابراین تغییر تم یا حالت تاریک بدون نیاز به رندر دوباره کامپوننت اعمال می‌شود.

## پشته فناوری

| لایه            | انتخاب                                                              |
| --------------- | ------------------------------------------------------------------- |
| فریم‌ورک        | Vue 3.5 (`<script setup>`)، TypeScript 5.9                          |
| بیلد            | Vite 7 (rolldown-vite)                                              |
| کتابخانه UI     | Naive UI 2 (با بازنویسی تم در زمان اجرا)                            |
| استایل          | UnoCSS (preset-uno، attributify، icons، typography) + توکن‌های SCSS |
| نمودار          | Apache ECharts 6 + vue-echarts 8، از طریق نسخه کپی‌شده uipkge        |
| مدیریت وضعیت    | Pinia 3 با state پایدار                                             |
| مسیریابی        | `vite-plugin-pages` (مبتنی بر فایل) + `vite-plugin-vue-layouts-next` |
| چندزبانگی       | vue-i18n 9 (انگلیسی، فارسی، چینی)                                   |
| HTTP            | لایه سرویس Axios                                                    |
| ماک             | MSW 2 + Faker                                                       |
| لینت و فرمت     | Biome 2 (با Lefthook قبل از کامیت)                                  |
| تست             | Vitest                                                              |

## شروع به کار

**پیش‌نیازها**

- Node **>= 22.16**
- pnpm **>= 10.22** (`npm install -g pnpm`)

**دریافت سورس و اجرا**

```bash
npx degit https://github.com/doroudi/yummyadmin yummy-admin
cd yummy-admin
pnpm install
pnpm dev          # → http://localhost:7000
```

`pnpm dev` در حالت `development` اجرا می‌شود. کتابخانه **[MSW](https://mswjs.io/)** هنگام شروع در مرورگر بالا می‌آید و تمام APIهای REST را با داده‌های Faker و تأخیر واقع‌نما سرو می‌کند؛ پس **برای بررسی پروژه نیازی به بک‌اند نیست**. فایل‌های env فقط آدرس پایه API را نگه می‌دارند:

```env
VITE_API_URL = /api/
VITE_BASE_URL = localhost:7000   # برای WebSocket چت
```

برای اتصال به بک‌اند واقعی، فراخوانی `initializeMocking()` را در `src/main.ts` حذف کنید.

## اسکریپت‌ها

| دستور              | توضیح                                                        |
| ------------------ | ------------------------------------------------------------ |
| `pnpm dev`         | سرور توسعه با HMR روی پورت 7000 (حالت `development`)          |
| `pnpm dev:mock`    | سرور توسعه در حالت `mocking` — همان اپ، env مخصوص ماک          |
| `pnpm build`       | بیلد نهایی در پوشه `dist/` (حالت `mocking`)                   |
| `pnpm check`       | بررسی و اصلاح خودکار با Biome در `src`                        |
| `pnpm lint`        | لینت با Biome و اعمال اصلاحات                                 |
| `pnpm typecheck`   | اجرای `vue-tsc --noEmit`                                      |
| `pnpm test`        | Vitest (حالت watch) — برای یک‌بار اجرا: `pnpm test:unit`       |
| `pnpm up`          | به‌روزرسانی تعاملی وابستگی‌ها (`taze major -I`)                |

## ساختار پروژه

```
src/
├── common/          # کلاینت API، بازنویسی تم، ولیدیتورها و هلپرها
├── components/      # رابط کاربری با ایمپورت خودکار
│   ├── Charts/      #   رَپرهای نمودار + دموهای گالری
│   ├── Dashboard/   #   داشبورد فروشگاهی و آنالیتیکس
│   ├── ui/charts/   #   کامپوننت‌های پایه ECharts کپی‌شده از uipkge
│   └── shared/      #   Card، SummaryStatCard، فیلترها و …
├── composables/     # useColors، useChartOptions، useFilter و …
├── layouts/         # default، auth، wide، error
├── locales/         # en.yml، fa.yml، zh.yml
├── mocks/           # هندلرهای MSW و داده‌های Faker
├── models/          # DTOها و view modelها
├── pages/           # مسیرها بر اساس ساختار فایل
├── services/        # سرویس‌های API (report، product، order و …)
├── store/           # استورهای Pinia
└── styles/          # توکن‌های SCSS، فونت‌ها، بازنویسی‌ها
```

## تم و توکن‌ها

توکن‌های سراسری در `src/styles/main.scss` تعریف شده‌اند و `src/App.vue` آن‌ها را با انتخاب‌گر رنگ تم هم‌گام نگه می‌دارد:

```scss
:root {
  --primary-color: #00ad4c;
  --background: #eee;
  --main-content: #fff;

  /* نمودارها این‌ها را می‌خوانند؛ App.vue هنگام تغییر تم --chart-1..5 را بازنویسی می‌کند. */
  --chart-1: #00ad4c;
  --chart-2: #008a3c;
  --muted-foreground: #6e6b7b;
}
```

بازنویسی‌های Naive UI در `src/common/theme/theme-overrides.ts` قرار دارند. چون `--chart-*` متغیرهای ساده CSS هستند، یک تغییر رنگ تم هم به کامپوننت‌های Naive UI و هم به بوم‌های ECharts منتقل می‌شود.

## چندزبانگی

سه زبان به‌صورت پیش‌فرض موجود است — `en.yml`، `fa.yml` و `zh.yml` در `src/locales/` که با `@intlify/unplugin-vue-i18n` بارگذاری می‌شوند.

با انتخاب فارسی یا چینی، مقدار `dir="rtl"` تنظیم می‌شود، پکیج‌های استایل RTL نِیو‌یو‌آی اعمال می‌شوند و جای‌گذاری افسانه نمودارها هم برمی‌گردد. برای افزودن زبان جدید کافی است یک فایل YAML در `src/locales/` بسازید و آن را در `src/modules/i18n.ts` ثبت کنید.

## انتشار

دستور `pnpm build` یک SPA استاتیک در `dist/` تولید می‌کند. فایل `netlify.toml` هم در پروژه هست، پس انتشار روی [Netlify](https://app.netlify.com/start) بدون هیچ تنظیم اضافه‌ای انجام می‌شود. برای میزبانی در کانتینر هم `Dockerfile` در اختیار شماست.

## استفاده به عنوان قالب

با دنبال کردن این چک‌لیست، فورک شما تمیز می‌ماند:

- [ ] تغییر نام توسعه‌دهنده در [`LICENSE`](./LICENSE)
- [ ] تغییر عنوان در `src/locales/en.yml`
- [ ] حذف فراخوانی `initializeMocking()` در `src/main.ts` و جایگزینی `src/mocks/` با API خودتان
- [ ] تنظیم `VITE_API_URL` مطابق API شما در فایل‌های `.env*`
- [ ] تغییر آیکن سایت در `public/`
- [ ] حذف پوشه `.github` (اطلاعات حمایت مالی)
- [ ] حذف مسیرها و صفحات غیرلازم و سپس مرتب‌سازی این READMEها

و لذت ببرید :)

## حمایت از پروژه

اگر این پروژه برایتان مفید بود، می‌توانید یک قهوه مهمانم کنید — واقعاً کمک‌کننده است:

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee"></a>

## مجوز

[MIT](./LICENSE)

</div>
