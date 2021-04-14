/* eslint-env node */

import path from 'path'
import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
// @ts-ignore
import ViteComponents from 'vite-plugin-components'
import { VitePWA } from 'vite-plugin-pwa'

import pkg from './package.json'

const config: UserConfig = {
  resolve: {
    alias: {
      '/~/': `${path.resolve(__dirname, 'src')}/`
    }
  },

  server: {
    port: pkg.config.devPort,
    strictPort: true
  },
  plugins: [
    Vue({
      ssr: !!process.env.SSG
    }),

    // https://github.com/vamplate/vite-plugin-voie
    // Voie({
    //   // load index page sync and bundled with the landing page to improve first loading time.
    //   // feel free to remove if you don't need it
    //   importMode(path: string) {
    //     return path === '/src/pages/index.vue' ? 'sync' : 'async'
    //   },
    //   extensions: ['vue', 'md']
    // }),

    // https://github.com/antfu/vite-plugin-md
    // Markdown({
    //   // for https://github.com/tailwindlabs/tailwindcss-typography
    //   wrapperClasses: 'prose prose-sm m-auto'
    //   // markdownItSetup(md) {
    //   //   // https://prismjs.com/
    //   // }
    // }),

    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: (id) => id.endsWith('.md'),

      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        // ViteIconsResolver({
        //   componentPrefix: ''
        //   // enabledCollections: ['carbon']
        // })
      ]
    }),

    // https://github.com/antfu/vite-plugin-icons
    // ViteIcons(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      manifest: {
        name: 'Pathicles',
        short_name: 'Pathicles',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/manifest-icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/manifest-icon-192-maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },

          {
            src: '/icons/manifest-icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })

    // // https://github.com/intlify/vite-plugin-vue-i18n
    // VueI18n({
    //   include: [path.resolve(__dirname, 'locales/**')]
    // })
  ]
}

export default config
