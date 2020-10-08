import path from 'path'

const alias = {
  '/~/': path.resolve(__dirname, 'src')
}

const config = {
  alias,
  plugins: [
    // Voie(),
    // ViteComponents({
    //   // currently, vite does not provide an API for plugins to get the config https://github.com/vitejs/vite/issues/738
    //   // as the `alias` changes the behavior of middlewares, you have to pass it to ViteComponents to do the resolving
    //   alias
    // }),
    // PurgeIcons()
  ]
}

export default config
