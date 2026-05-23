# Yummy Admin - ادمین پنل یامی

[![CI](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml/badge.svg)](https://github.com/doroudi/YummyAdmin/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/24e54305-5d97-447e-adba-ed0a7c18513e/deploy-status)](https://app.netlify.com/sites/yummy-admin/deploys)
<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png" height="20px"></a>

<div dir="rtl">
پنل ادمین رایگان VueJs مبتنی بر NaiveUI و TailwindCss. امکانات کامل به همراه طراحی زیبا ، پشتیبانی کامل چیدمان راست به چپ و چندزبانگی.
ساخته شده با استفاده از تکنولوژی های مدرن توسعه وب مانند: Pinia, تایپ اسکریپت ، MSW, UnoCss, WebSocket.


![Preview](/docs/banner-dark.png "Preview")

<p align='center'>
   <a href="https://yummy-admin.netlify.app?lang=fa">🌏 دمو </a>
   <a href="https://yummy-admin.netlify.app?theme=dark">🌑 حالت تاریک </a>
   <br>
   دموی سایر زبان ها:<br />
   <a href="https://yummy-admin.netlify.app?lang=en"> انگلیسی</a> |
   <a href="https://yummy-admin.netlify.app?lang=zh"> چینی</a>
</p>

![Preview](/docs/banner-light.png "Preview Light")

## امکانات


- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - ساخته شده برای سریع بودن
- 🛒 بخش های آماده برای سیستم های فروشگاهی

- 🎭 پشتیبانی از دیتای ماک برای تولید دیتای شبیه محیط عملیاتی
- 🗂 مسیر یابی مبتنی بر فایل

- 📦  auto-import کامپوننت ها

- 🍍 [پشتیبانی از Pinia](https://pinia.vuejs.org/)

- 📑 پشتیبانی از Layout ها

- 🌍 پشتیبانی از چندزبانگی

- ☁️ اتنشار روی Netlify بدون کانفیگ

## هم اکنون امتحان کنید

> Yummy Admin requires Node >=20.0

### دریافت سورس

```bash
npx degit https://github.com/doroudi/yummyadmin yummy-admin
cd yummy-admin
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## چک لیست

هنگام استفاده از این الگو، سعی کنید از چک لیست پیروی کنید تا اطلاعات خود را به درستی به‌روزرسانی کنید.

- [ ] تغییر نام توسعه دهنده در `LICENSE`
- [ ] تغییر عنوان در `locales/en.yaml`
- [ ] تغییر hostname `vite.config.ts`
- [ ] تغییر آیکن `public`
- [ ] حذف پوشه `.github`
- [ ] تغییر محتوای Readme و تمیز کردن Route ها

و لذت ببرید :)

### پشتیبانی از پروژه

<a href="https://coff.ee/doroudi"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"></a>

### حالت توسعه

دستور زیر را اجرا کنید و به این آدرس بروید: http://localhost:7000

```bash
pnpm dev
```

### گرفتن خروجی نهایی

برای دریافت خروجی نهایی دستور زیر را اجرا کنید

```bash
pnpm build
```

خروجی در مسیر `dist`, قابل دسترسی و انتشار خواهد بود.

### انتشار در Netlify

به [Netlify](https://app.netlify.com/start) بروید و سورس خود را انتخاب کنید, بعد از چند دقیقه انتشار به اتمام خواهد رسید..

</div>