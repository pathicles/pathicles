/* eslint-env node */

import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

const alias = {
  '/~/': path.resolve(__dirname, 'src')
}

const config = {
  // alias,
  plugins: [
    // Voie(),
    // ViteComponents({
    //   // currently, vite does not provide an API for plugins to get the config https://github.com/vitejs/vite/issues/738
    //   // as the `alias` changes the behavior of middlewares, you have to pass it to ViteComponents to do the resolving
    //   alias
    // }),
    // PurgeIcons()
    // VitePWA({
    //   manifest: {
    //     name: 'pathicles.net',
    //     short_name: 'pathicles',
    //     theme_color: '#2174a8',
    //     background_color: '#f9f9f9',
    //     display: 'minimal-ui',
    //     scope: '/',
    //     lang: 'en',
    //     start_url: '/',
    //     icons: [
    //       {
    //         src: 'icons/manifest-icon-192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: 'icons/manifest-icon-512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ],
    //     splash_pages: null
    //   },
    //
    //   workbox: true
    //   // {
    //   //     importWorkboxFrom: 'local',
    //   //     //globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff2,bib}'],
    //   //     globIgnores: ['**/icons/**.*'],
    //   //     dontCacheBustURLsMatching: /\.\w{8}\./,
    //   //     cleanupOutdatedCaches: true,
    //   //     skipWaiting: true
    //   //   }
    // })
  ]
}

export default config
