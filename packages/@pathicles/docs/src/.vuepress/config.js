const path = require('path')
const rootPath = path.join("..", "..")

const buildPath = path.join(rootPath, '_build', 'docs')

const version = require(path.join(rootPath, 'package.json')).version

module.exports = ctx => ({
  themeConfig: {
    sidebar: [
      '/',
      '/visual-design/',
    ],
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: 'Guide',
        link: '/guide/'
      },
      {
        text: 'Go to website',
        link: 'https://2019.beschleunigerphysik.de'
      },
    ]
  }
,
  // theme: '@jerrobs/vuepress-theme-jerrobs',
  dest: buildPath,
  
  plugins: {
    '@jerrobs/vuepress-plugin-bibliography': true
  }
  // locales: {
  //   '/': {
  //     version,
  //     lang: 'de',
  //     title: 'Beschleunigerphysik in Deutschland',
  //     description: 'xxxx'
  //   },
  //   // '/en/': {
  //   //   version,
  //   //   lang: 'en-UK',
  //   //   title: 'Accelerator Physics in Germany',
  //   //   description: 'xxx'
  //   // },
  //   // '/de/': {
  //   //   version,
  //   //   lang: 'de-DE',
  //   //   title: 'Beschleunigerphysik in Deutschland',
  //   //   description: 'xxxx'
  //   // }
  // },
  // head: [
  //   // [
  //   //   'link',
  //   //   {
  //   //     rel: 'icon',
  //   //     href: `/logo.png`
  //   //   }
  //   // ],
  //   // [
  //   //   'link',
  //   //   {
  //   //     rel: 'manifest',
  //   //     href: '/manifest.json'
  //   //   }
  //   // ],
  //   // [
  //   //   'meta',
  //   //   {
  //   //     name: 'theme-color',
  //   //     content: '#3eaf7c'
  //   //   }
  //   // ],
  //   // [
  //   //   'meta',
  //   //   {
  //   //     name: 'apple-mobile-web-app-capable',
  //   //     content: 'yes'
  //   //   }
  //   // ],
  //   // [
  //   //   'meta',
  //   //   {
  //   //     name: 'apple-mobile-web-app-status-bar-style',
  //   //     content: 'black'
  //   //   }
  //   // ],
  //   // [
  //   //   'link',
  //   //   {
  //   //     rel: 'apple-touch-icon',
  //   //     href: `/icons/apple-touch-icon-152x152.png`
  //   //   }
  //   // ],
  //   // [
  //   //   'link',
  //   //   {
  //   //     rel: 'mask-icon',
  //   //     href: '/icons/safari-pinned-tab.svg',
  //   //     color: '#3eaf7c'
  //   //   }
  //   // ],
  //   // [
  //   //   'meta',
  //   //   {
  //   //     name: 'msapplication-TileImage',
  //   //     content: '/icons/msapplication-icon-144x144.png'
  //   //   }
  //   // ],
  //   // [
  //   //   'meta',
  //   //   {
  //   //     name: 'msapplication-TileColor',
  //   //     content: '#000000'
  //   //   }
  //   // ]
  // ],
  // themeConfig: {
  //   locales: {
  //     '/en': {
  //       label: 'English',
  //       selectText: 'Languages',
  //       nav: [],
  //       sidebar: {},
  //       dict: {},
  //       copyright:
  //         'This work is licensed under a Creative Commons Attribution 4.0 International License.'
  //     },
  //     '/de': {
  //       label: 'Deutsch',
  //       selectText: 'Sprachen',
  //       nav: [],
  //       sidebar: {},
  //       copyright:
  //         'Dieses Werk ist unter der Creative-Commons-Lizenz CC BY-NC-ND 4.0 verfügbar'
  //     }
  //   }
  // },

  // plugins: [
  //   // ['@vuepress/i18n-ui', !ctx.isProd],
  //   // [rootPath + '/_source/app/.vuepress/plugin-sitemap', true],
  //   // [__dirname + '/lib/plugin-sitemapper', true],
  //   // [__dirname + '/lib/plugin-back-to-top', true],
  //   // [__dirname + '/lib/plugin-pwa', {
  //   //   serviceWorker: true,
  //   //   updatePopup: true,
  //   //   popupComponnt: 'SWUpdatePopup'
  //   // }],
  //   // // ['@vuepress/medium-zoom', true],
  //   // // ['@vuepress/notification', true],
  //   // ['@vuepress/search', {
  //   //   searchMaxSuggestions: 10
  //   // }]
  // ],

  // // evergreen: true,
  // // // clientRootMixin: path.resolve(__dirname, 'mixin.js'),
  // // markdown: {
  // //   // options for markdown-it-anchor
  // //   html: true,
  // //   anchor: {
  // //     permalink: true
  // //   },
  // //   // options for markdown-it-toc
  // //   toc: {
  // //     includeLevel: [1, 2]
  // //   },
  // //   extendMarkdown: md => {
  // //     const mir = require('markdown-it-replacements')
  // //     mir.replacements.push({
  // //       name: 'space commander full space',
  // //       re: /\s+@@\s+/g,
  // //       sub: ' ',
  // //       default: true
  // //     })
  // //     mir.replacements.push({
  // //       name: 'space commander thin space',
  // //       re: /\s+@\s+/g,
  // //       sub: ' ',
  // //       default: true
  // //     })

  // //     // use more markdown-it plugins!#
  // //     md.use(mir)
  // //     require('./lib/md-containers.js')(md)
  // //     md.use(require('markdown-it-attrs'))
  // //     md.use(require('markdown-it-footnote'))
  // //     // md.use(require('markdown-it-header-sections'))
  // //     md.use(require('markdown-it-container'), 'meta', {
  // //       render: (tokens, idx) =>
  // //         tokens[idx].nesting === 1
  // //           ? `<div class="meta" title="${tokens[idx].info
  // //             .trim()
  // //             .slice('upgrade'.length)
  // //             .trim()}">`
  // //           : '</div>'
  // //     })
  // //   }
  // // }
})
