import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import Unocss from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// import { partytownVite } from '@builder.io/partytown/utils'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  server: {
    port: 7000,
    host: true,
    hmr: {
      host: 'localhost',
    },
  },
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },

  plugins: [
    VueMacros({
      plugins: {
        vue: Vue({
          include: [/\.vue$/],
        }),
      },
    }),

    // VueRouter({
    //   extensions: ['.vue'],
    //   dts: 'src/typed-router.d.ts',
    // }),
    Pages({
      extensions: ['vue'],
      importMode: 'async',
      syncIndex: false,
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDirs: 'src/layouts',
      pagesDirs: 'src/pages',
      defaultLayout: 'default',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
            'usePopover',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/store',
      ],
      vueTemplate: true,
    }),

    Components({
      extensions: ['vue'],
      resolvers: [NaiveUiResolver()],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['/favicon/favicon.ico'],
      manifest: {
        name: 'Yummy Admin',
        short_name: 'YummyAdmin',
        theme_color: '#459858',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    // partytownVite({
    //   dest: path.join(__dirname, 'dist', '~partytown'),
    // }),

    // https://github.com/webfansplz/vite-plugin-vue-devtools
    VueDevTools(),
  ],

  // https://github.com/vitest-dev/vitest
  // test: {
  //   include: ['test/**/*.test.ts'],
  //   environment: 'jsdom',
  //   deps: {
  //     inline: ['@vue', '@vueuse', 'vue-demi'],
  //   },
  // },
  define: { 'process.env': {} },
})
